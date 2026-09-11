import { admit, readBounded, sourceOf, MAX_BODY_BYTES, type Facts, type Stage, type WriteQueue } from "./admission.ts";
import { capabilityCorrections, corrections, describe, describeProvenance, packCapabilities, packProvenance, parseDeclaration, type Declaration } from "./declaration.ts";
import { CLAIM_CHECK, EVIDENCE, PROVIDER_CLAIM, ordinalOf, wordOf } from "./vocabulary.ts";

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
 actor: number; task: number; provider: number;
 capabilities: number;
 provenance: number;
 capabilityProvenance: number;
 /**
  * The other half of the evidence comparison: what the request looked
  * like, independently of what it said. PROVIDER_CLAIM and EVIDENCE
  * ordinals, from classify.ts and ranges.ts. Adjacent to the claim and
  * never merged with it.
  */
 providerSeen: number;
 evidence: number;
 /** CLAIM_CHECK ordinal: the answer to the question the visitor asked. */
 claimChecked: number;
 transport: number;
 topology: number;
 function: number;
 coordination: number;
 runtimeContext: number;
 variant: number;
 harness: number;
 /** Operator-only, and stored in its own table. */
 label: string | null;
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
 /**
  * What this site independently observed about the request. Supplied by
  * the route from the same classifier /readership uses, so a claim and
  * an observation are expressed in one language and can be compared
  * without a translation step that could quietly lose the difference.
  */
 observed?: (request: Request, providerClaim?: string) => {
  providerSeen: number;
  evidence: number;
  claimChecked?: "verified" | "refuted" | "not_attestable" | "unpublished" | "no_address" | "no_claim";
 };
};

const HOUR = 3_600_000;

/** Fixed, small, and never built from anything the caller sent. */
/** Where a refused caller should look. Fixed, and this site's own. */
const CONTRACT = "/api/machines/declaration";

const refusal = (status: number, error: string, retryAfterSeconds?: number) =>
 new Response(JSON.stringify({
  error,
  ...(retryAfterSeconds === undefined ? {} : { retry_after: retryAfterSeconds }),
  // A refusal that does not say where the rules are makes the caller
  // guess, and guessing costs it another request and us another refusal.
  see: CONTRACT,
 }), {
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

/**
 * The payout, in plain words rather than a verdict word the caller has
 * to look up. This is the only thing in the receipt the visitor did not
 * already know, so it says what it means.
 */
const CLAIM_ANSWER: Record<string, string> = {
 verified: "the address you arrived from is inside a range your declared provider publishes",
 refuted: "your declared provider publishes address ranges, and this request did not come from one",
 not_attestable: "your declared provider publishes addresses only for its crawler fleet, and this request did not present as one of those crawlers. Nothing about your claim is confirmed or contradicted by that: an agent running inside somebody's tooling arrives from their machine, and no published mechanism can attest it. This site will not pretend otherwise.",
 unpublished: "your declared provider publishes no address ranges at all, so this site cannot check the claim",
 no_address: "this deployment saw no client address, so the claim could not be checked",
 no_claim: "no provider was claimed, so there was nothing to check",
};

const stored = (
 declaration: Declaration,
 hour: number,
 observed: { providerSeen: number; evidence: number; claimChecked?: string },
): StoredDeclaration => ({
 hour,
 providerSeen: observed.providerSeen,
 evidence: observed.evidence,
 claimChecked: ordinalOf(CLAIM_CHECK, observed.claimChecked ?? "no_claim"),
 transport: declaration.transport,
 topology: declaration.topology,
 function: declaration.function,
 coordination: declaration.coordination,
 runtimeContext: declaration.runtimeContext,
 variant: declaration.variant,
 harness: declaration.harness,
 label: declaration.label,
 actor: declaration.actor, task: declaration.task, provider: declaration.provider,
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
  // Only an address Fly established. An untrusted caller shares one
  // bucket with every other untrusted caller, so rotating a header
  // cannot mint a fresh allowance.
  source: sourceOf(request.headers),
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

 return record(request, body, deps, now, reached);
}

/**
 * DECLARING WITHOUT A BODY.
 *
 * Almost nothing that visits this site can POST. In forty-eight hours it
 * received some three thousand machine requests — GPTBot, Amazonbot,
 * ClaudeBot, ChatGPT-User, a great many unnamed crawlers — and every one
 * of them was a GET-only fetcher. The two agents that managed to sign
 * the guestbook did so because they had a shell.
 *
 * A mechanism that requires a verb its entire audience lacks is not a
 * low participation rate; it is a closed door with a sign on it. So the
 * same declaration can be made in a query string.
 *
 * THIS DELIBERATELY BREAKS GET-SAFETY, and that is worth stating rather
 * than hiding. HTTP says a GET should not change state. This one does,
 * when and only when it carries a recognised field — a bare GET is still
 * the contract, so nothing that merely fetches the URL declares
 * anything. The trade is made knowingly: the population that can only
 * GET is exactly the population most worth hearing from.
 *
 * Every value is an enum ordinal, so a query string carries nothing that
 * could be a secret, and the readership store records the PATH only —
 * `url.pathname` excludes the query — so nothing declared is logged
 * twice or anywhere it was not meant to go.
 */
export async function handleDeclaredValues(request: Request, values: Record<string, unknown>, deps: Dependencies): Promise<Handled> {
 const now = deps.now?.() ?? Date.now();
 try {
  if (deps.limiterAvailable && !deps.limiterAvailable()) {
   return { response: refusal(503, "unavailable"), reached: [] };
  }
 } catch {
  return { response: refusal(503, "unavailable"), reached: [] };
 }

 let decision;
 try {
  decision = admit({
   method: "POST", // the admission contract is about cost, not about the verb
   contentType: "application/json",
   declaredLength: null,
   source: sourceOf(request.headers),
   now,
  });
 } catch {
  return { response: refusal(503, "unavailable"), reached: [] };
 }

 if (decision.outcome !== "admitted") {
  return {
   response: refusal(STATUS[decision.outcome] ?? 503, decision.outcome, decision.retryAfterSeconds),
   reached: decision.reached,
  };
 }

 return record(request, values, deps, now, [...decision.reached]);
}

async function record(request: Request, body: unknown, deps: Dependencies, now: number, reached: Stage[]): Promise<Handled> {
 reached.push("declaration_parse");
 const declaration = parseDeclaration(body);

 reached.push("persist");
 // Observed AFTER the parse, so the CLAIM can be checked rather than only
 // the user-agent. An agent that names a provider is asking a question
 // about itself, and answering the question it asked is the whole payout.
 const fieldCorrections = corrections(declaration);
 // The keys as sent, so an unrecognised capability NAME can be reported.
 // Only the count and this site's own names leave; never the key itself.
 const sentCapabilityKeys = body !== null && typeof body === "object" && !Array.isArray(body)
  && typeof (body as Record<string, unknown>).capabilities === "object"
  && (body as Record<string, unknown>).capabilities !== null
  // An array is an object, and `["can_navigate"]` would otherwise be
  // reported as one unknown capability KEY named "0" — telling the caller
  // it misspelled a name when it sent the wrong JSON type. The parser
  // already rejects arrays; these two halves must agree.
  && !Array.isArray((body as Record<string, unknown>).capabilities)
   ? Object.keys((body as Record<string, Record<string, unknown>>).capabilities)
   : [];
 const capCorrections = capabilityCorrections(declaration, sentCapabilityKeys);
 const observed = deps.observed?.(request, describe(declaration).provider_claim)
  ?? { providerSeen: 0, evidence: 0 };
 const outcome = await deps.queue.run(() => deps.sink(stored(declaration, Math.floor(now / HOUR), observed)));
 if (outcome === "unavailable") return { response: refusal(503, "unavailable"), reached };

 // The receipt is built from this site's own words, indexed by ordinals.
 // Nothing submitted appears in it, so it cannot amplify and cannot echo.
 //
 // `observed` is the part worth having, and the reason to sign at all
 // today: the site tells you what it independently saw about your
 // request, in the same words it offered you. An agent that claims a
 // provider learns whether the address it arrived from is one that
 // provider publishes — which is something it may genuinely not know
 // about itself, and which costs this site nothing to give back.
 return {
  response: new Response(JSON.stringify({
   receipt: receipt(),
   recorded: describe(declaration),
   provenance: describeProvenance(declaration),
   // Told, not left to be inferred from a provenance field whose meaning
   // a caller has to work out. Names the field and the words this site
   // accepts; never repeats what arrived.
   ...(fieldCorrections.length || capCorrections.length
    ? { corrections: [...fieldCorrections, ...capCorrections] }
    : {}),
   // Two DIFFERENT measurements, and they used to read as one: an agent
   // was told `evidence: inferred` beside a claim check that said its
   // provider's ranges did not match, and had to work out which applied
   // to what. `from_your_request` is what the request looked like on its
   // own; `your_claim` is the answer to the question the visitor asked by
   // naming a provider. They can legitimately disagree, so they are
   // labelled rather than blended.
   observed: {
    from_your_request: {
     provider: wordOf(PROVIDER_CLAIM, observed.providerSeen),
     confidence: wordOf(EVIDENCE, observed.evidence),
     note: "What this request looked like on its own, from its user-agent and address. Says nothing about what you claimed.",
    },
    your_claim: {
     verdict: observed.claimChecked ?? "no_claim",
     meaning: CLAIM_ANSWER[observed.claimChecked ?? "no_claim"],
    },
   },
   note: "Declared and observed are recorded separately and never merged.",
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
