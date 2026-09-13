import { canonicalPaths, canonicalUrl } from "@/lib/canonical";
import { records, recordPath } from "@/lib/records";
import { pageLastModified } from "@/lib/page-updates";
import { escapeXml } from "@/lib/publication";
export function GET() {
 const revisions = new Map(records.map(record => [recordPath(record), record.revised]));
 const urls = canonicalPaths().map(path => {
  const modified = pageLastModified(path, revisions.get(path));
  return `<url><loc>${escapeXml(canonicalUrl(path))}</loc>${modified ? `<lastmod>${escapeXml(modified)}</lastmod>` : ""}</url>`;
 }).join("");
 return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
}
