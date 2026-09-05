import { INDEXABLE } from "@/lib/metadata";
import { SITE } from "@/lib/records";
export function GET(){return new Response(INDEXABLE ? `User-agent: *\nAllow: /\nSitemap: ${SITE}/sitemap.xml\n` : "User-agent: *\nDisallow: /\n",{headers:{"Content-Type":"text/plain; charset=utf-8"}});}
