import { SITE } from "@/lib/records";

/**
 * WHAT AN API MISS SHOULD COST.
 *
 * An unknown path under /api returned Next's HTML error document —
 * nineteen to twenty-three kilobytes of markup, with a page title and a
 * stylesheet, to a caller that sent `Accept: application/json` and can
 * do nothing with any of it. Two independent blind agents reported it,
 * one noting it had to spend the fetch to learn nothing.
 *
 * A catch-all rather than a per-route fix, because the per-route version
 * is one new endpoint away from being wrong again. Next resolves static
 * segments before dynamic ones, so every real route still answers
 * itself; only genuine misses arrive here.
 *
 * It also points somewhere. A refusal that does not say where the rules
 * are makes the caller guess, and guessing costs it another request and
 * this site another refusal.
 */
const body = (path: string) => ({
 error: "not_found",
 path,
 machine_contract: `${SITE}/api/machines/declaration`,
 discovery: `${SITE}/llms.txt`,
 note: "No such resource. The machine surfaces of this site are indexed at /llms.txt; each endpoint returns its own contract on a bare GET.",
});

function notFound(request: Request): Response {
 return new Response(JSON.stringify(body(new URL(request.url).pathname)), {
  status: 404,
  headers: {
   "Content-Type": "application/json; charset=utf-8",
   "Cache-Control": "no-store",
   "X-Robots-Tag": "noindex",
  },
 });
}

export const GET = notFound;
export const HEAD = notFound;
export const POST = notFound;
export const PUT = notFound;
export const PATCH = notFound;
export const DELETE = notFound;
export const OPTIONS = notFound;
