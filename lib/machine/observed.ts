import { classify } from "../readership/classify.ts";
import { confidenceFor } from "../readership/store.ts";
import { verifyProvider } from "../readership/ranges.ts";
import { EVIDENCE, PROVIDER_CLAIM, ordinalOf } from "./vocabulary.ts";

/**
 * WHAT THE SITE SAW, IN THE SAME WORDS THE VISITOR WAS OFFERED.
 *
 * The evidence comparison the preregistration turns on: a claim beside
 * an observation, expressed in one vocabulary so they can be compared
 * without a translation step that could quietly lose the difference.
 *
 * The address is used for exactly one thing — asking ranges.ts whether
 * a declared agent is where its provider says it is — and the ordinal
 * of the three-word answer is what survives this function. Nothing else
 * about the address is returned, stored or logged, which is the same
 * rule proxy.ts follows on the way in.
 *
 * `Fly-Client-IP` only. The X-Forwarded-For fallback that proxy.ts
 * still keeps is for a deployment shape this endpoint does not have,
 * and an address a caller can choose is not evidence about the caller.
 */
export type Observation = {
 providerSeen: number;
 evidence: number;
 /** The claimed provider, checked against that provider's own published ranges. */
 claimChecked: "verified" | "refuted" | "unpublished" | "no_address" | "no_claim";
};

export function observedFor(request: Request, providerClaim?: string): Observation {
 const url = new URL(request.url);
 const classification = classify({
  pathname: url.pathname,
  userAgent: request.headers.get("user-agent"),
  referer: request.headers.get("referer"),
  host: request.headers.get("host"),
 });
 const confidence = confidenceFor(classification, request.headers.get("fly-client-ip"));
 const ip = request.headers.get("fly-client-ip");
 // The question the visitor actually asked by naming a provider, rather
 // than the one its user-agent happens to answer.
 const claimChecked = !providerClaim || providerClaim === "unknown" || providerClaim === "not_permitted_to_disclose"
  ? "no_claim" as const
  : !ip
   ? "no_address" as const
   : verifyProvider(providerClaim, ip);

 return {
  providerSeen: ordinalOf(PROVIDER_CLAIM, classification.provider),
  evidence: ordinalOf(EVIDENCE, confidence),
  claimChecked,
 };
}
