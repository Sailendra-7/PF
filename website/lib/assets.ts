/** Prefix site-relative asset paths with the deploy basePath (e.g. "/PF" on github.io). */
export function asset(src: string): string {
  if (!src) return "";
  if (/^(https?:)?\/\//.test(src) || src.startsWith("data:")) return src;
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return `${base}${src.startsWith("/") ? "" : "/"}${src}`;
}
