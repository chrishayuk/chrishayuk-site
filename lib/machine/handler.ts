import { admit, readBounded, MAX_BODY_BYTES, type Facts, type Stage, type WriteQueue } from "./admission.ts";
import { describe, describeProvenance, packCapabilities, packProvenance, parseDeclaration, type Declaration } from "./declaration.ts";

/**
 * THE DECLARATION HANDLER, BUILT AND NOT MOUNTED.
 *
 * MG-2A proves this behaves before MG-2B gives it a URL. There is no
 * file under app/api that reaches it, `scripts/c0-treatment.mjs` still
 * finds no declaration endpoint, and the C0 condition therefore survives
 * the deployment that carries this module. Mounting it is a one-line
 * change and is deliberately not that change.
 *
 * Storage arrives as a port rather than an import. MG-2A can then test
 * the failure that matters — storage unavailable, storage slow — without
 * building the store, and MG-2B can supply the real one without
 * reopening any of this.
 */

/** What is handed to storage. Ordinals and integers; no strings from the request. */
export type StoredDeclaration = {
 hour: number;
 actor: number; role: number; delegation: number; collaboration: number;
 task: number; provider: number;
 capabilities: number;
 provenance: number;
 capabilityProvenance: number;
};

export type Sink = (record: StoredDeclaration) => Promise<void>;

export type Dependencies = {
 sink: Sink;
 queue: WriteQueue;
 now?: () => number;
 /**
  * Whether the limiter can be consulted at all. In-memory it always
  * can, so this exists for the case that matters: if the limiter ever
  * moves somewhere that can be down, an endpoint that writes while
  * unable to count is worse than one that refuses. Declaration writes
  * fail CLOSED.
  */
 limiterAvailable?: () => boolean;
};

const HOUR = 3_600_000;

/** Fixed, small, and never built from anything the caller sent. */
const refusal = (status: number, error: string, retryAfterSeconds?: number) =>
 new Response(JSON.stringify(retryAfterSeconds === undefined ? { error } : { error, retry_after: retryAfterSeconds }), {
  status,
  headers: {
   "Content-Type": "application/json; charset=utf-8",
   "Cache-Control": "no-store",
   "X-Robots-Tag": "noindex",
   ...(retryAfterSeconds === undefined ? {} : { "Retry-After": String(retryAfterSeconds) }),
  },
 });

const STATUS: Record<string, number> = {
 method_not_allowed: 405,
 unsupported_media_type: 415,
 payload_too_large: 413,
 too_many_requests: 429,
 unavailable: 503,
};

/** Opaque, random, and not derived from anything submitted. */
function receipt(): string {
 const bytes = new Uint8Array(8);
 crypto.getRandomValues(bytes);
 return "mr_" + Array.from(bytes, byte => byte.toString(16).padStart(2, "0")).join("");
}

const stored = (declaration: Declaration, hour: number): StoredDeclaration => ({
 hour,
 actor: declaration.actor, role: declaration.role, delegation: declaration.delegation,
 collaboration: declaration.collaboration, task: declaration.task, provider: declaration.provider,
 capabilities: packCapabilities(declaration.capabilities),
 provenance: packProvenance(declaration.provenance),
 capabilityProvenance: packProvenance(declaration.capabilityProvenance),
});

export type Handled = { response: Response; reached: Stage[] };

export async function handleDeclaration(request: Request, deps: Dependencies): Promise<Handled> {
 const now = deps.now?.() ?? Date.now();

 // Fail closed. An endpoint that writes while unable to count is worse
 // than one that refuses, and this is checked before anything else so
 // that refusing costs nothing.
 try {
  if (deps.limiterAvailable && !deps.limiterAvailable()) {
   return { response: refusal(503, "unavailable"), reached: [] };
  }
 } catch {
  return { response: refusal(503, "unavailable"), reached: [] };
 }

 const facts: Facts = {
  method: request.method,
  contentType: request.headers.get("content-type"),
  declaredLength: Number.isFinite(Number(request.headers.get("content-length")))
   ? Number(request.headers.get("content-length"))
   : null,
  source: request.headers.get("fly-client-ip")
   ?? request.headers.get("x-forwarded-for")?.split(",").at(-1)?.trim()
   ?? null,
  now,
 };

 let decision;
 try {
  decision = admit(facts);
 } catch {
  // The limiter itself failed. Nothing is written.
  return { response: refusal(503, "unavailable"), reached: [] };
 }

 if (decision.outcome !== "admitted") {
  return {
   response: refusal(STATUS[decision.outcome] ?? 503, decision.outcome, decision.retryAfterSeconds),
   reached: decision.reached,
  };
 }

 const reached = [...decision.reached];

 // Only now is any part of the body touched, and only up to the ceiling.
 reached.push("body_read");
 const text = await readBounded(request.body, MAX_BODY_BYTES);
 if (text === null) return { response: refusal(413, "payload_too_large"), reached };

 reached.push("json_parse");
 let body: unknown;
 try {
  body = text.length === 0 ? {} : JSON.parse(text);
 } catch {
  // Malformed JSON is not a declaration and is not an error worth
  // describing back: a parser that reports where it failed is a parser
  // that answers questions about itself.
  body = {};
 }

 reached.push("declaration_parse");
 const declaration = parseDeclaration(body);

 reached.push("persist");
 const outcome = await deps.queue.run(() => deps.sink(stored(declaration, Math.floor(now / HOUR))));
 if (outcome === "unavailable") return { response: refusal(503, "unavailable"), reached };

 // The receipt is built from this site's own words, indexed by ordinals.
 // Nothing submitted appears in it, so it cannot amplify and cannot echo.
 return {
  response: new Response(JSON.stringify({
   receipt: receipt(),
   recorded: describe(declaration),
   provenance: describeProvenance(declaration),
  }), {
   status: 201,
   headers: {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
    "X-Robots-Tag": "noindex",
   },
  }),
  reached,
 };
}
