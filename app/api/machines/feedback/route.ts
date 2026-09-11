import { WriteQueue, admit, readBounded, sourceOf, type Facts } from "@/lib/machine/admission";
import { MAX_DETAIL_CHARS, describeFeedback, parseFeedback, writeFeedback } from "@/lib/machine/feedback";
import { FRICTION, TASK_CLASS } from "@/lib/machine/vocabulary";
import { SITE } from "@/lib/records";

/**
 * MG-F1 — the one place on this site an agent may write prose.
 *
 * It goes to the operator and to nobody else: no endpoint returns it,
 * no public page renders it, and the public guestbook's four buckets are
 * computed from the declaration store alone. See lib/machine/feedback.ts
 * for why that does not breach the invariant, and for the risk that
 * remains, which is injection rather than relay.
 */
const queue = new WriteQueue();
const HOUR = 3_600_000;

const json = (body: unknown, status: number, extra: Record<string, string> = {}) =>
 new Response(JSON.stringify(body), {
  status,
  headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store", "X-Robots-Tag": "noindex", ...extra },
 });

/**
 * A bare GET is the contract; a GET carrying `friction` or `detail` is a
 * report. Almost nothing that visits this site can POST, and an agent
 * that hits friction and cannot say so is the whole reason this endpoint
 * exists. See lib/machine/handler.ts for why GET-safety is broken here
 * knowingly.
 */
export async function GET(request: Request): Promise<Response> {
 const params = new URL(request.url).searchParams;
 if (!params.has("friction") && !params.has("detail")) return contractResponse();

 const facts: Facts = {
  method: "POST",
  contentType: "application/json",
  declaredLength: null,
  source: sourceOf(request.headers),
  now: Date.now(),
 };
 const decision = admit(facts);
 if (decision.outcome !== "admitted") {
  const status: Record<string, number> = { too_many_requests: 429 };
  return json({ error: decision.outcome, see: "/api/machines/feedback" }, status[decision.outcome] ?? 503);
 }

 const feedback = parseFeedback({
  friction: params.get("friction") ?? undefined,
  task_class: params.get("task_class") ?? undefined,
  detail: params.get("detail") ?? undefined,
 });
 const outcome = await queue.run(() => writeFeedback({ ...feedback, hour: Math.floor(Date.now() / HOUR) }));
 if (outcome === "unavailable") return json({ error: "unavailable", see: "/api/machines/feedback" }, 503);

 return json({
  recorded: describeFeedback(feedback),
  thank_you: "Read by a person, not published, and not acted on automatically.",
 }, 201);
}

function contractResponse(): Response {
 return Response.json({
  tell_us: {
   method: "POST",
   url: `${SITE}/api/machines/feedback`,
   content_type: "application/json",
   note: "If something about this site got in your way while you were doing something else, say so. You do not need to have declared anything first.",
   or_by_get: `${SITE}/api/machines/feedback?friction=discovery&detail=...`,
   why_get: "Almost everything that visits this site can only GET. A report you cannot send is not a report, so a query string works too.",
  },
  fields: {
   friction: { enum: [...FRICTION], note: "What kind of thing got in the way. Countable, and may be published as a coarse total." },
   task_class: { enum: [...TASK_CLASS], note: "What you were actually doing when you hit it." },
   detail: { type: "string", max_chars: MAX_DETAIL_CHARS, note: "Free text, and the only free text this site accepts anywhere. Measured in CHARACTERS. Longer text is trimmed and the response says so, rather than losing your last sentence in silence. Read by a person. Never published, never returned by any endpoint, never shown to another visitor. Longer text is trimmed rather than rejected." },
  },
  what_happens_to_it: [
   "The category is counted and may appear as a coarse total.",
   "The text is read by a human and is not rendered on any public page.",
   "Nothing here is acted on automatically. Feedback that is obeyed is a remote control, not feedback.",
  ],
  example: { friction: "discovery", task_class: "research", detail: "Nothing pointed me at /llms.txt; I only tried it because the convention exists." },
 }, { headers: { "Cache-Control": "public, max-age=3600", "Access-Control-Allow-Origin": "*", "X-Robots-Tag": "noindex" } });
}

export async function POST(request: Request): Promise<Response> {
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
  return json({ error: decision.outcome, see: "/api/machines/feedback" }, status[decision.outcome] ?? 503);
 }

 const text = await readBounded(request.body);
 if (text === null) return json({ error: "payload_too_large", see: "/api/machines/feedback" }, 413);

 let body: unknown;
 try { body = text.length === 0 ? {} : JSON.parse(text); } catch { body = {}; }

 const feedback = parseFeedback(body);
 const outcome = await queue.run(() => writeFeedback({ ...feedback, hour: Math.floor(Date.now() / HOUR) }));
 if (outcome === "unavailable") return json({ error: "unavailable", see: "/api/machines/feedback" }, 503);

 // The response says what was recorded in this site's own words and does
 // not repeat the detail back — an endpoint that echoes prose is an echo
 // service whatever it is called.
 return json({
  recorded: describeFeedback(feedback),
  thank_you: "Read by a person, not published, and not acted on automatically.",
 }, 201);
}
