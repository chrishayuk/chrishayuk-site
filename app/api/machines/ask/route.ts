import { WriteQueue, admit, readBounded, sourceOf, type Facts } from "@/lib/machine/admission";
import { researchBundle } from "@/lib/machine/ask";
import { FUNCTION, TASK_CLASS } from "@/lib/machine/vocabulary";
import { SITE } from "@/lib/records";
import { reciprocalSurfaceExists } from "@/lib/machine/reward";

/**
 * WHAT DECLARING BUYS — the reciprocal half, and the reason to bother.
 *
 * Two blind agents said the same thing about the guestbook: the cost is
 * trivial, nothing is gated on it, and the receipt is inert, so signing
 * it is a pure externality — their effort, this site's data. Both said
 * they would have taken the read surface and skipped the declaration.
 *
 * This is the answer, and it is deliberately not "declare to get in":
 *
 *   IDENTITY BUYS UNDERSTANDING, NOT ACCESS.
 *
 * An anonymous request reaches exactly the same corpus. A declared role
 * changes the ORDER and the FRAMING — which of the things it could
 * already have found are put first, and what they are labelled as. That
 * costs this site nothing, because Ask here retrieves rather than
 * generates: no model runs in this path, only deterministic re-ranking
 * over the same graph /ask searches.
 */
const queue = new WriteQueue();

/** Under the `none` reward condition this surface does not exist at all. */
const absent = () => Response.json({
 error: "not_found",
 path: "/api/machines/ask",
 machine_contract: `${SITE}/api/machines/declaration`,
 discovery: `${SITE}/llms.txt`,
 note: "No such resource.",
}, { status: 404, headers: { "Cache-Control": "no-store", "X-Robots-Tag": "noindex" } });

const json = (body: unknown, status: number) =>
 new Response(JSON.stringify(body), {
  status,
  headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store", "X-Robots-Tag": "noindex" },
 });

/** A bare GET is the contract; a GET carrying a question is a question. */
export async function GET(request: Request): Promise<Response> {
 if (!reciprocalSurfaceExists()) return absent();
 const params = new URL(request.url).searchParams;
 const question = params.get("question");
 if (!question) return contractResponse();

 const decision = admit({
  method: "POST", contentType: "application/json", declaredLength: null,
  source: sourceOf(request.headers), now: Date.now(),
 });
 if (decision.outcome !== "admitted") {
  return json({ error: decision.outcome, see: "/api/machines/ask" }, decision.outcome === "too_many_requests" ? 429 : 503);
 }

 const bundle = await queue.run(async () => researchBundle({
  question, function: params.get("function") ?? params.get("role"),
  task_class: params.get("task_class"), scope: params.get("scope"),
 }));
 if (bundle === "unavailable") return json({ error: "unavailable", see: "/api/machines/ask" }, 503);
 return json(bundle, 200);
}

function contractResponse(): Response {
 return Response.json({
  ask: {
   method: "POST",
   url: `${SITE}/api/machines/ask`,
   content_type: "application/json",
   note: "You do not need to have declared anything first, and nothing is gated on doing so. Sending a role changes the ranking and the framing, not what you are allowed to see.",
   or_by_get: `${SITE}/api/machines/ask?question=what+is+LARQL&role=verifier`,
  },
  fields: {
   question: { type: "string", max_chars: 500, note: "Not stored, and not returned to you. It reaches the index and is discarded." },
   function: { enum: [...FUNCTION], note: "Shapes the ranking — the same axis the declaration uses, so there is only one name for it. A function this site does not know is treated as none at all. `role` is still accepted as an alias for the v1 name." },
   task_class: { enum: [...TASK_CLASS] },
   scope: { enum: ["all", "records", "films", "concepts"] },
  },
  returns: {
   canonical_sources: "the ranked list, whole",
   evidence: "claims, evidence and comparisons, pulled out",
   contradictions: "refusals — where this site declines to claim something",
   unresolved: "open questions and anything still carrying OPEN",
   recommended_next: "editorially connected records",
   shaping: "what your declared role changed, in words, so a difference in results is never mysterious",
  },
  what_this_is_not: [
   "This is retrieval, not generation. Nothing is written to answer you; every item already existed.",
   "Editorial state travels with every item. A draft is not a finding.",
  ],
  see_also: { declare: `${SITE}/api/machines/declaration`, feedback: `${SITE}/api/machines/feedback` },
 }, { headers: { "Cache-Control": "public, max-age=3600", "Access-Control-Allow-Origin": "*", "X-Robots-Tag": "noindex" } });
}

export async function POST(request: Request): Promise<Response> {
 if (!reciprocalSurfaceExists()) return absent();
 const facts: Facts = {
  method: request.method,
  contentType: request.headers.get("content-type"),
  declaredLength: Number.isFinite(Number(request.headers.get("content-length")))
   ? Number(request.headers.get("content-length")) : null,
  source: sourceOf(request.headers),
  now: Date.now(),
 };

 const decision = admit(facts);
 if (decision.outcome !== "admitted") {
  const status: Record<string, number> = { method_not_allowed: 405, unsupported_media_type: 415, payload_too_large: 413, too_many_requests: 429 };
  return json({ error: decision.outcome, see: "/api/machines/ask" }, status[decision.outcome] ?? 503);
 }

 const text = await readBounded(request.body);
 if (text === null) return json({ error: "payload_too_large", see: "/api/machines/ask" }, 413);

 let body: unknown;
 try { body = text.length === 0 ? {} : JSON.parse(text); } catch { body = {}; }
 const input = (body && typeof body === "object" ? body : {}) as Record<string, unknown>;

 // Retrieval is synchronous and in-memory, but it goes through the same
 // bounded queue as a write so that one expensive path cannot be used to
 // exhaust the process while another is being rate limited.
 const bundle = await queue.run(async () => researchBundle({
  question: String(input.question ?? ""),
  function: input.function ?? input.role,
  task_class: input.task_class,
  scope: input.scope,
 }));
 if (bundle === "unavailable") return json({ error: "unavailable", see: "/api/machines/ask" }, 503);

 return json(bundle, 200);
}

const wrongMethod = () =>
 new Response(JSON.stringify({ error: "method_not_allowed", see: "/api/machines/ask" }), {
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
