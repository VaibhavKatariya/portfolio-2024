export function sanitizeMDX(content: string): string {
  if (!content) return "";

  return content
    // Remove script tags (paired, self-closing, or malformed)
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<script\b[^>]*\/?>/gi, "")

    // Remove active inline event handlers (on* with single, double, or no quotes, and spaces)
    .replace(/\bon\w+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, "")

    // Remove javascript:, vbscript:, and dangerous data: URI schemes in href, src, or action
    .replace(/(?:href|src|action)\s*=\s*(?:"\s*(?:javascript|vbscript|data):[^"]*"|'\s*(?:javascript|vbscript|data):[^']*'|\s*(?:javascript|vbscript|data):[^\s>]+)/gi, "")

    // Remove ESM import and export statements (MDX executable syntax)
    .replace(/^\s*(?:import|export)\s.+$/gm, "")

    // Remove dangerous embedding and execution tags (iframe, object, embed, applet, base, form, meta)
    .replace(/<\/?(iframe|object|embed|applet|base|form|meta)\b[^>]*>/gi, "")

    // Remove dangerous React/DOM properties and CSS expressions
    .replace(/dangerouslySetInnerHTML/gi, "")
    .replace(/expression\s*\([^)]*\)/gi, "");
}