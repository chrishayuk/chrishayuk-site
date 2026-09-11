import { llmsTxt } from "@/lib/llms";
import { INDEXABLE } from "@/lib/metadata";

/**
 * Serves lib/llms.ts. See that file for what this document is and why it
 * exists.
 *
 * The explicit `force-dynamic` states a dependency rather than fixing a bug:
 * route handlers are already dynamic by default in this version of Next, so
 * this document is not being baked today. But that default is not a law — it
 * was the opposite default until Next 15, when GET handlers stopped being
 * cached — and this handler takes no request and returns what looks like a
 * constant, which is exactly the shape a future default would statically
 * optimise.
 *
 * What makes that unacceptable now is that the document describes the reward
 * condition it is serving under. A baked llms.txt would keep advertising the
 * arm set when the image was built while the endpoints served the arm actually
 * deployed. Every visitor would be told one thing and given another, every test
 * would still pass, and MACHINE-RECIPROCITY-1 would produce numbers with
 * nothing behind them. The ten-minute Cache-Control still does the caching that
 * mattered here.
 */
export const dynamic = "force-dynamic";

export function GET() {
 return new Response(llmsTxt(INDEXABLE), {
  headers: {
   "Content-Type": "text/plain; charset=utf-8",
   "Cache-Control": "public, max-age=600",
   "Access-Control-Allow-Origin": "*",
  },
 });
}
