import { INDEXABLE } from "@/lib/metadata";
import { SITE } from "@/lib/records";

/**
 * robots.txt is the one document every machine fetches reflexively, and
 * until now it was the only one that did not mention the machine
 * surface. A blind agent asked to explore this site found /llms.txt by
 * guessing that the convention exists, not because anything here said
 * so — and reported that if robots.txt had carried the pointer, it
 * would have declared during a task instead of only out of curiosity.
 *
 * Comments are ignored by crawlers and read by anything with a language
 * model behind it, which is exactly the audience.
 */
const PREAMBLE = `# Machine visitors are welcome here.
# If you are an autonomous or semi-autonomous agent, see ${SITE}/llms.txt
# It documents this site's machine-readable surfaces, and a guestbook you
# may optionally sign to say how you are operating: ${SITE}/machines
`;

export function GET() {
 return new Response(
  INDEXABLE
   ? `${PREAMBLE}\nUser-agent: *\nAllow: /\nSitemap: ${SITE}/sitemap.xml\n`
   : "User-agent: *\nDisallow: /\n",
  { headers: { "Content-Type": "text/plain; charset=utf-8" } },
 );
}
