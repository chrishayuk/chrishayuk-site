import { WriteQueue } from "@/lib/machine/admission";
import { handleDeclaration } from "@/lib/machine/handler";
import { writeDeclaration } from "@/lib/machine/store";
import { observedFor } from "@/lib/machine/observed";

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
 * POST and nothing else, deliberately.
 *
 * An earlier version exported GET so the refusal came from the same
 * contract — which made Next advertise `Allow: GET, HEAD, OPTIONS, POST`
 * while GET answered 405. A blind agent did the conventional thing,
 * fetched the endpoint to see whether it self-described, got a 405, ran
 * OPTIONS, was told GET was allowed, and briefly concluded it was being
 * rate limited. Contradicting yourself is worse than saying less.
 */
