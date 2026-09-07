import { canonicalUrls } from "@/lib/canonical";
import { escapeXml } from "@/lib/publication";
export function GET(){return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${canonicalUrls().map(url=>`<url><loc>${escapeXml(url)}</loc></url>`).join("")}</urlset>`,{headers:{"Content-Type":"application/xml; charset=utf-8"}});}
