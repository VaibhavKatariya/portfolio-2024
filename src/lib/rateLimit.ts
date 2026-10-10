interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
  retryAfter?: number;
}

interface WindowRecord {
  timestamps: number[];
  dailyCount: number;
  dailyReset: number;
}

// Bounded in-memory store for local and single-instance fallback
const memoryStore = new Map<string, WindowRecord>();
const MAX_ENTRIES = 5000;

function pruneStore(now: number) {
  if (memoryStore.size <= MAX_ENTRIES) return;
  for (const [key, record] of memoryStore.entries()) {
    if (now > record.dailyReset && record.timestamps.length === 0) {
      memoryStore.delete(key);
    }
  }
}

/**
 * Checks rate limits using Upstash Redis if configured, otherwise falls back
 * to an in-memory sliding window counter.
 *
 * Default thresholds:
 * - 10 requests per minute
 * - 60 requests per day
 */
export async function checkRateLimit(
  identifier: string,
  minuteLimit = 10,
  dailyLimit = 60
): Promise<RateLimitResult> {
  const upstashUrl = process.env.UPSTASH_REDIS_REST_URL;
  const upstashToken = process.env.UPSTASH_REDIS_REST_TOKEN;

  // Use Upstash Redis REST API if credentials are provided in environment
  if (upstashUrl && upstashToken) {
    try {
      const now = Date.now();
      const minuteKey = `ratelimit:min:${identifier}:${Math.floor(now / 60000)}`;
      const dailyKey = `ratelimit:day:${identifier}:${Math.floor(now / 86400000)}`;

      // Increment minute counter
      const minRes = await fetch(`${upstashUrl}/incr/${encodeURIComponent(minuteKey)}`, {
        headers: { Authorization: `Bearer ${upstashToken}` },
      });
      const minData = await minRes.json();
      const minuteCount = Number(minData.result || 1);

      if (minuteCount === 1) {
        // Expire key after 65 seconds
        await fetch(`${upstashUrl}/expire/${encodeURIComponent(minuteKey)}/65`, {
          headers: { Authorization: `Bearer ${upstashToken}` },
        });
      }

      if (minuteCount > minuteLimit) {
        return {
          success: false,
          limit: minuteLimit,
          remaining: 0,
          reset: Math.ceil(now / 60000) * 60,
          retryAfter: 60 - (Math.floor(now / 1000) % 60),
        };
      }

      // Increment daily counter
      const dayRes = await fetch(`${upstashUrl}/incr/${encodeURIComponent(dailyKey)}`, {
        headers: { Authorization: `Bearer ${upstashToken}` },
      });
      const dayData = await dayRes.json();
      const dailyCount = Number(dayData.result || 1);

      if (dailyCount === 1) {
        // Expire key after 25 hours
        await fetch(`${upstashUrl}/expire/${encodeURIComponent(dailyKey)}/90000`, {
          headers: { Authorization: `Bearer ${upstashToken}` },
        });
      }

      if (dailyCount > dailyLimit) {
        return {
          success: false,
          limit: dailyLimit,
          remaining: 0,
          reset: Math.ceil(now / 86400000) * 86400,
          retryAfter: 3600,
        };
      }

      return {
        success: true,
        limit: minuteLimit,
        remaining: Math.max(0, minuteLimit - minuteCount),
        reset: Math.ceil(now / 60000) * 60,
      };
    } catch (err) {
      console.warn("Upstash rate limit check failed, falling back to memory:", err);
    }
  }

  // In-memory sliding window fallback
  const now = Date.now();
  pruneStore(now);

  let record = memoryStore.get(identifier);
  if (!record) {
    record = {
      timestamps: [],
      dailyCount: 0,
      dailyReset: now + 86400000,
    };
    memoryStore.set(identifier, record);
  }

  // Reset daily count if day has passed
  if (now > record.dailyReset) {
    record.dailyCount = 0;
    record.dailyReset = now + 86400000;
  }

  // Prune timestamps older than 60 seconds
  const windowStart = now - 60000;
  record.timestamps = record.timestamps.filter((t) => t > windowStart);

  // Check minute limit
  if (record.timestamps.length >= minuteLimit) {
    const oldest = record.timestamps[0];
    const retryAfter = Math.max(1, Math.ceil((oldest + 60000 - now) / 1000));
    return {
      success: false,
      limit: minuteLimit,
      remaining: 0,
      reset: Math.ceil((oldest + 60000) / 1000),
      retryAfter,
    };
  }

  // Check daily limit
  if (record.dailyCount >= dailyLimit) {
    const retryAfter = Math.max(1, Math.ceil((record.dailyReset - now) / 1000));
    return {
      success: false,
      limit: dailyLimit,
      remaining: 0,
      reset: Math.ceil(record.dailyReset / 1000),
      retryAfter,
    };
  }

  record.timestamps.push(now);
  record.dailyCount += 1;

  return {
    success: true,
    limit: minuteLimit,
    remaining: minuteLimit - record.timestamps.length,
    reset: Math.ceil((now + 60000) / 1000),
  };
}

/**
 * Extracts a normalized client IP from standard proxy headers.
 */
export function getClientIp(req: Request): string {
  const forwardedFor = req.headers.get("x-forwarded-for");
  if (forwardedFor) {
    const firstIp = forwardedFor.split(",")[0].trim();
    if (firstIp) return firstIp;
  }

  const realIp = req.headers.get("x-real-ip");
  if (realIp) return realIp.trim();

  const cfConnectingIp = req.headers.get("cf-connecting-ip");
  if (cfConnectingIp) return cfConnectingIp.trim();

  return "127.0.0.1";
}

