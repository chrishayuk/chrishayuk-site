import { WriteQueue } from "@/lib/machine/admission";
import { handleDeclaration } from "@/lib/machine/handler";
import { writeDeclaration } from "@/lib/machine/store";
import { observedFor } from "@/lib/machine/observed";
import { contract } from "@/lib/machine/contract";

/**
 * MG-2B — THE TREATMENT.
 *
 * This file is the whole of it. Everything it needs was built, tested
 * and deployed during C0 without a route: admission ordering, the
 * bounded body, the closed vocabulary, the total parser, the bounded
 * write queue, the fail-closed limiter. Mounting is a handful of lines
 * because the difficult parts were finished before there was anywhere
 * to reach them.
 *
 * The deployment that carries this file ENDS C0. scripts/c0-treatment.mjs
 * fails against it by design, and that failure is the boundary;
 * scripts/c1-treatment.mjs asserts the condition that replaces it.
 *
 * One process, one queue. It is module state so that the bound is a
 * bound on the machine rather than on each request.
 */
const queue = new WriteQueue();

export async function POST(request: Request): Promise<Response> {
 const { response } = await handleDeclaration(request, {
  sink: writeDeclaration,
  queue,
  observed: observedFor,
 });
 return response;
}

/**
 * GET SELF-DESCRIBES.
 *
 * Fetching an endpoint to see what it wants is the first thing an agent
 * does, and answering 405 to it wasted a request and taught nothing. It
 * also left the vocabulary available only as prose, which for a site
 * arguing for machine-readability was the wrong way round.
 *
 * This returns the contract: every enum generated from vocabulary.ts,
 * every limit from admission.ts, so it cannot drift from the parser
 * that enforces it. It is site-authored and identical for every caller
 * — a read of this site's own words, not of anything anyone declared —
 * so it is cacheable and reopens nothing.
 */
export function GET(): Response {
 return Response.json(contract(), {
  headers: {
   "Cache-Control": "public, max-age=3600",
   "Access-Control-Allow-Origin": "*",
   "X-Robots-Tag": "noindex",
  },
 });
}

/**
 * Next answers an unexported method itself, with an empty body and no
 * Allow header — so a caller doing the conventional thing got a bare
 * 405 while /llms.txt promised that every refusal carries a pointer to
 * the contract. Exporting them makes the promise true.
 */
const wrongMethod = () =>
 new Response(JSON.stringify({ error: "method_not_allowed", see: "/api/machines/declaration" }), {
  status: 405,
  headers: {
   "Content-Type": "application/json; charset=utf-8",
   Allow: "GET, HEAD, OPTIONS, POST",
   "Cache-Control": "no-store",
   "X-Robots-Tag": "noindex",
  },
 });

export const PUT = wrongMethod;
export const PATCH = wrongMethod;
export const DELETE = wrongMethod;
