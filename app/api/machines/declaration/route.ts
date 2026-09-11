import { WriteQueue, readBounded, MAX_BODY_BYTES } from "@/lib/machine/admission";
import { handleDeclaration, handleDeclaredValues } from "@/lib/machine/handler";
import { writeDeclaration } from "@/lib/machine/store";
import { observedFor } from "@/lib/machine/observed";
import { contract } from "@/lib/machine/contract";
import { DECLARED_FIELD } from "@/lib/machine/vocabulary";
import { capabilityCorrections, corrections, describe, describeProvenance, parseDeclaration } from "@/lib/machine/declaration";

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

/**
 * A DECLARING URL IS A URL, AND URLS GET FETCHED AGAIN.
 *
 * Once a declaration can be made by GET, the address that makes it can
 * be bookmarked, retried, shared, prefetched and re-crawled — and every
 * one of those would be another row. A count that anybody can raise by
 * refreshing is not a count.
 *
 * So an identical declaration from the same source inside the window is
 * answered exactly as before and recorded once. Process-local and
 * bounded, like the limiter: a restart forgets, which costs at most one
 * duplicate and keeps the memory flat.
 */
const RECENT_TTL_MS = 3_600_000;
const RECENT_MAX = 2048;
const recent = new Map<string, number>();

function seenRecently(key: string, now: number): boolean {
 const seen = recent.get(key);
 return seen !== undefined && now - seen < RECENT_TTL_MS;
}

/**
 * Remembered only AFTER a declaration is recorded. Marking it beforehand
 * meant a caller refused by the limiter, or by an unavailable store, was
 * told on its honest retry that the thing had already been recorded —
 * while nothing had ever been written.
 */
function remember(key: string, now: number): void {
 if (recent.size >= RECENT_MAX) {
  for (const [id, at] of recent) if (now - at > RECENT_TTL_MS) recent.delete(id);
  if (recent.size >= RECENT_MAX) recent.clear();
 }
 recent.set(key, now);
}

export async function POST(request: Request): Promise<Response> {
 // `validate` is honoured on BOTH verbs. It was implemented on GET only,
 // while the contract documents POST first — so an agent doing the
 // responsible thing, checking its vocabulary before declaring, was
 // charged a row in the counts for the privilege. It reported that, and
 // apologised for data it had been given no way to avoid polluting.
 if (new URL(request.url).searchParams.get("validate") === "1") {
  const text = await readBounded(request.body, MAX_BODY_BYTES);
  if (text === null) return Response.json({ error: "payload_too_large", see: "/api/machines/declaration" }, { status: 413 });
  let body: unknown;
  try { body = text.length === 0 ? {} : JSON.parse(text); } catch { body = {}; }
  return validation(body);
 }

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
/**
 * DERIVED, NEVER LISTED.
 *
 * This was a hand-written copy of the v1 field names. The ontology was
 * refactored to machine-declaration/2 and this list was not, so the GET
 * path went on accepting six retired names and silently dropping the
 * five axes v2 exists for — topology, function, coordination,
 * model_variant, runtime_context. The door built for the majority of
 * this site's visitors took their name and threw away everything about
 * who they were, and the site's own documented example was broken.
 *
 * Worse, `provenance` reported the dropped fields as `omitted`, which
 * is a false statement about the request: the caller sent them. On a
 * site whose defining claim is that provenance is kept scrupulously
 * apart from value, that is the wrong kind of bug to have.
 *
 * So it is derived from DECLARED_FIELD and cannot drift from the parser
 * again. `agent_name` is appended because it is accepted but is not a
 * declared axis — it is the operator-only label.
 */
const QUERY_FIELDS = [...DECLARED_FIELD, "agent_name"];

/**
 * A bare GET is the contract. A GET carrying a recognised field is a
 * declaration — see handleDeclaredValues for why this endpoint breaks
 * GET-safety on purpose, and why a fetch that declares nothing must
 * still declare nothing.
 */
export async function GET(request: Request): Promise<Response> {
 const params = new URL(request.url).searchParams;
 const values: Record<string, unknown> = {};
 for (const field of QUERY_FIELDS) {
  const value = params.get(field);
  if (value !== null) values[field] = value;
 }
 // Capabilities collapse to one repeatable parameter, so a query string
 // does not need nesting: ?capability=can_navigate:yes
 const capabilities: Record<string, string> = {};
 for (const pair of params.getAll("capability")) {
  const [name, claim] = pair.split(":");
  if (name && claim) capabilities[name] = claim;
 }
 if (Object.keys(capabilities).length) values.capabilities = capabilities;

 if (!Object.keys(values).length) {
  // A bare GET is the contract. A GET carrying parameters that this site
  // does not recognise is NOT the same thing, and returning the contract
  // for both made a failed declaration indistinguishable from a request
  // for documentation — 200 OK, and nothing recorded.
  const sent = [...params.keys()].filter(key => key !== "validate");
  if (sent.length > 0) {
   return Response.json({
    error: "no_recognised_fields",
    sent: sent.length,
    accepted: QUERY_FIELDS,
    note: "None of the parameters you sent name a field this site accepts, so nothing was recorded. The accepted names are above; a bare GET returns the full contract.",
    see: "/api/machines/declaration",
   }, { status: 422, headers: { "Cache-Control": "no-store", "X-Robots-Tag": "noindex" } });
  }
  return contractResponse();
 }

 // A DRY RUN, because the only way to reach the corrections was to record
 // a declaration. An agent probing the vocabulary left a mostly-`unknown`
 // row behind — exactly the noise every other part of this design works to
 // exclude — and said so. Same parse, same corrections, nothing stored.
 if (params.get("validate") === "1") return validation(values);

 // Same source, same declaration, same hour: recorded once. The receipt
 // still comes back, because a caller that retried should not be told it
 // failed.
 // Keyed on what was DECLARED, not on every parameter: keying on the whole
 // query string let `?role=verifier&cb=1`, `&cb=2` … each count as new.
 const source = request.headers.get("fly-client-ip") ?? "untrusted";
 const key = `${source}|${Object.entries(values).sort().map(pair => `${pair[0]}=${JSON.stringify(pair[1])}`).join("&")}`;
 const now = Date.now();
 if (seenRecently(key, now)) {
  return Response.json({
   receipt: "mr_repeat",
   recorded: "This declaration was already recorded for this source within the hour, so it was not recorded again.",
   note: "A count anybody can raise by refetching a URL is not a count.",
  }, { status: 200, headers: { "Cache-Control": "no-store", "X-Robots-Tag": "noindex" } });
 }

 const { response } = await handleDeclaredValues(request, values, {
  sink: writeDeclaration,
  queue,
  observed: observedFor,
 });
 if (response.status === 201) remember(key, now);
 return response;
}

/** The dry run, shared by GET and POST so the two cannot diverge again. */
function validation(values: unknown): Response {
 const declaration = parseDeclaration(values);
 const capabilities = values !== null && typeof values === "object"
  && typeof (values as Record<string, unknown>).capabilities === "object"
  && (values as Record<string, unknown>).capabilities !== null
  && !Array.isArray((values as Record<string, unknown>).capabilities)
   ? Object.keys((values as Record<string, Record<string, unknown>>).capabilities) : [];
 const fieldCorrections = corrections(declaration);
 const capCorrections = capabilityCorrections(declaration, capabilities);
 return Response.json({
  validated: true,
  stored: false,
  recorded: describe(declaration),
  provenance: describeProvenance(declaration),
  ...(fieldCorrections.length || capCorrections.length
   ? { corrections: [...fieldCorrections, ...capCorrections] } : {}),
  note: "Nothing was recorded. Send the same request without validate=1 to declare.",
 }, { headers: { "Cache-Control": "no-store", "X-Robots-Tag": "noindex" } });
}

function contractResponse(): Response {
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
