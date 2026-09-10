import { WriteQueue } from "@/lib/machine/admission";
import { handleDeclaration, handleDeclaredValues } from "@/lib/machine/handler";
import { writeDeclaration } from "@/lib/machine/store";
import { observedFor } from "@/lib/machine/observed";
import { contract } from "@/lib/machine/contract";
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
 * The fields a query string may carry. Anything else is ignored, so a
 * URL with tracking parameters or a cache-buster is still just a fetch.
 */
const QUERY_FIELDS = [
 "actor_type", "role", "delegation", "collaboration", "task_class",
 "provider_claim", "transport", "execution", "harness", "model_name",
 "agent_name_kind", "agent_name",
];

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

 if (!Object.keys(values).length) return contractResponse();

 // A DRY RUN, because the only way to reach the corrections was to record
 // a declaration. An agent probing the vocabulary left a mostly-`unknown`
 // row behind — exactly the noise every other part of this design works to
 // exclude — and said so. Same parse, same corrections, nothing stored.
 if (params.get("validate") === "1") {
  const declaration = parseDeclaration(values);
  const capabilityKeys = typeof values.capabilities === "object" && values.capabilities !== null
   ? Object.keys(values.capabilities as Record<string, unknown>) : [];
  const fieldCorrections = corrections(declaration);
  const capCorrections = capabilityCorrections(declaration, capabilityKeys);
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
