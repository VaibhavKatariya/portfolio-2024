export function sanitizeMDX(content: string): string {
  if (!content) return "";

  return content
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")

    .replace(/on\w+="[^"]*"/g, "")

    .replace(/href=["']javascript:[^"']*["']/gi, "")

    .replace(/^\s*import\s.+$/gm, "")
    .replace(/^\s*export\s.+$/gm, "")

    .replace(/<(iframe|object|embed)[\s\S]*?>[\s\S]*?<\/\1>/gi, "")

    .replace(/dangerouslySetInnerHTML/g, "");
}