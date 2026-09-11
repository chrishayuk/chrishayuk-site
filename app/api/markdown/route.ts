import { recordMarkdown } from "@/lib/record-markdown";
import { records, recordPath } from "@/lib/records";
import { INDEXABLE } from "@/lib/metadata";

/**
 * A record as Markdown, for the route agents demonstrably use.
 *
 * Reached two ways, both handled in proxy.ts rather than here: a `.md`
 * suffix on a record URL, and `Accept: text/markdown` content
 * negotiation on the record URL itself. Both rewrite to this.
 *
 * Indexing policy is honoured exactly as robots.txt and /llms.txt honour
 * it: an edition that is not published does not describe its contents to
 * anybody, in any format.
 */
export const dynamic = "force-dynamic";

export function GET(request: Request): Response {
 // Set by proxy.ts. A rewritten handler still sees the original request.url,
 // so the query string of the rewrite target is not readable here; the
 // header is. The query parameter is accepted too, for a direct call.
 const path = request.headers.get("x-markdown-record")
  ?? new URL(request.url).searchParams.get("path") ?? "";
 const record = records.find(r => recordPath(r) === path);

 if (!record || !INDEXABLE) {
  return new Response("Not found.\n", {
   status: 404,
   headers: { "Content-Type": "text/markdown; charset=utf-8", "X-Robots-Tag": "noindex" },
  });
 }
 return new Response(recordMarkdown(record), {
  headers: {
   "Content-Type": "text/markdown; charset=utf-8",
   "Cache-Control": "public, max-age=600",
   "Access-Control-Allow-Origin": "*",
   // The canonical page is the HTML one. This is a representation of it,
   // not a second document competing with it.
   "Link": `<${path}>; rel="canonical"`,
  },
 });
}
