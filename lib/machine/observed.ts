import { classify } from "../readership/classify.ts";
import { confidenceFor } from "../readership/store.ts";
import { agentsOf, verify } from "../readership/ranges.ts";
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
 claimChecked: "verified" | "refuted" | "not_attestable" | "unpublished" | "no_address" | "no_claim";
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
 /**
  * WHAT THOSE RANGES ACTUALLY ATTEST.
  *
  * A provider's published addresses describe its CRAWLER FLEET —
  * GPTBot, ClaudeBot, ChatGPT-User. They say nothing about whether
  * something is that provider's model. An agent running inside somebody's
  * Claude Code or Codex is genuinely made by its provider and arrives
  * from a laptop on a domestic connection; it will never be in those
  * ranges, and calling that `refuted` answers a question the visitor did
  * not ask while poisoning the one column this experiment exists to
  * compare.
  *
  * So a refutation requires an actual contradiction: the request must
  * DECLARE one of that provider's crawler agents and arrive from outside
  * its published addresses. Anything else is simply not attestable by
  * this mechanism, and saying so is both true and more useful than a
  * verdict that sounds like a denial.
  */
 const claimsCrawler = agentsOf(providerClaim ?? "")
  .some(agent => agent.toLowerCase() === classification.agent.toLowerCase());

 const claimChecked = !providerClaim || providerClaim === "unknown" || providerClaim === "not_permitted_to_disclose"
  ? "no_claim" as const
  : !ip
   ? "no_address" as const
   : agentsOf(providerClaim).length === 0
    ? "unpublished" as const
    : claimsCrawler
     // Against the agent it PRESENTED as, not against every agent the
     // provider publishes. Checking them all would report `verified` for a
     // request presenting as ClaudeBot from an address Anthropic publishes
     // only for Claude-User — a stronger claim than the evidence supports,
     // in the one column this experiment exists to compare.
     ? (verify(classification.agent, ip) === "verified" ? "verified" as const : "refuted" as const)
     : "not_attestable" as const;

 return {
  providerSeen: ordinalOf(PROVIDER_CLAIM, classification.provider),
  evidence: ordinalOf(EVIDENCE, confidence),
  claimChecked,
 };
}
