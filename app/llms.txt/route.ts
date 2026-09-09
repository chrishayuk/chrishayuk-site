import { llmsTxt } from "@/lib/llms";
import { INDEXABLE } from "@/lib/metadata";

/** Serves lib/llms.ts. See that file for what this document is and why it exists. */
export function GET() {
 return new Response(llmsTxt(INDEXABLE), {
  headers: {
   "Content-Type": "text/plain; charset=utf-8",
   "Cache-Control": "public, max-age=600",
   "Access-Control-Allow-Origin": "*",
  },
 });
}
