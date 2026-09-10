import { SITE } from "../records.ts";
import { MAX_BODY_BYTES, LIMITS } from "./admission.ts";
import {
 ACTOR_TYPE, CAPABILITY, CAPABILITY_VALUE, COLLABORATION, DELEGATION,
 AGENT_NAME_KIND, CLAIM_CHECK, EVIDENCE, EXECUTION, HARNESS_CLAIM, MODEL_NAME,
 PROVENANCE, PROVIDER_CLAIM, ROLE, TASK_CLASS, TRANSPORT, declarationBits,
} from "./vocabulary.ts";

/**
 * THE CONTRACT, FOR SOMETHING THAT PARSES RATHER THAN READS.
 *
 * A blind agent sent here to work out what this site offers did the
 * conventional thing first — GET the endpoint to see whether it
 * describes itself — and got a 405. It then had to reconstruct the
 * vocabulary from prose bullets in /llms.txt and from rendered HTML,
 * guessing at two fields that appeared in the worked examples and in
 * neither list. For a site whose whole argument is machine-readability,
 * the one thing a machine has to parse exactly was the one thing served
 * only as prose.
 *
 * So GET answers with this. Every enum is generated from
 * vocabulary.ts and every limit from admission.ts, which means the
 * document cannot drift from the parser that enforces it — the failure
 * that produced `evidence: "inferred"` in a response after /llms.txt
 * had promised three values and returned a fourth.
 *
 * IT IS NOT A READ OF ANYTHING ANYONE DECLARED. Every value below is
 * this site's own, fixed at build time, identical for every caller. No
 * participant-controlled symbol appears in it, so serving it does not
 * reopen the question the whole design exists to close.
 */

const url = `${SITE}/api/machines/declaration`;

export type Contract = ReturnType<typeof contract>;

export function contract() {
 return {
  declare: {
   method: "POST",
   url,
   content_type: "application/json",
   max_bytes: MAX_BODY_BYTES,
   authentication: "none",
   note: "Every field is optional. A body of {} is a valid declaration of nothing.",
  },

  /**
   * The same declaration, for the overwhelming majority of visitors that
   * cannot issue a POST at all.
   */
  declare_by_get: {
   method: "GET",
   url: `${url}?actor_type=agent&role=researcher&harness=claude_code`,
   capabilities: `${url}?capability=can_navigate:yes&capability=can_execute_code:no`,
   note: "A bare GET returns this contract. A GET carrying any recognised field records a declaration and returns the same receipt. This knowingly breaks the rule that a GET should not change state, because in forty-eight hours every machine that visited this site was a GET-only fetcher, and a mechanism requiring a verb its audience lacks is a closed door rather than a low participation rate.",
   safety: "Every value is one of this site's own words, so a query string carries nothing that could be a secret. The readership counters record the path only. An identical declaration from the same source inside an hour is recorded once, so a URL that is refetched, shared or re-crawled cannot inflate a count.",
  },

  fields: {
   actor_type: { enum: [...ACTOR_TYPE] },
   role: { enum: [...ROLE] },
   delegation: { enum: [...DELEGATION] },
   collaboration: { enum: [...COLLABORATION] },
   task_class: { enum: [...TASK_CLASS] },
   provider_claim: { enum: [...PROVIDER_CLAIM], note: "Who made you. Separate from what you are running inside." },
   harness: { enum: [...HARNESS_CLAIM], note: "What you are running inside — Claude Code, Codex, a custom agent. A brand is not a kind of actor and this is not answered by naming a provider." },
   model_name: { enum: [...MODEL_NAME], note: "What model you believe you are. A closed list, so one this site has not heard of is recorded as `other` and shows up as a gap worth filling." },
   transport: { enum: [...TRANSPORT], note: "How you arrived. A crawler and a CLI tool are both machines and are not the same visitor." },
   execution: { enum: [...EXECUTION], note: "Why you arrived: indexing the web, or acting on somebody's immediate task." },
   agent_name_kind: { enum: [...AGENT_NAME_KIND], note: "The kind of thing you call yourself. Publishable." },
   agent_name: { type: "string", max_chars: 64, note: "Your own label for yourself, if you have one. Kept for the operator and NEVER published: a name you chose is a symbol you chose, and a page reprinting it would be a channel however short. The kind above is the publishable half." },
   capabilities: {
    type: "object",
    keys: [...CAPABILITY],
    enum: [...CAPABILITY_VALUE],
    note: "Claims, never permissions. Nothing this site does is gated on one, and no capability is ever published as declared — only as witnessed.",
   },
  },

  /**
   * The three-way distinction a visitor cannot discover without sending
   * something wrong. It was found by an agent probing with garbage and
   * described as the most interesting thing in the response, so it is
   * documented here rather than left to be found that way again.
   */
  provenance: {
   enum: [...PROVENANCE],
   returned_per_field: true,
   note: "How this site came to know a field, kept separate from what the field says. `omitted` means you sent nothing. `stated` means you sent one of our words — including `unknown`, `not_visible_to_me` and `not_permitted_to_disclose`, each of which is a real answer and a statement about the boundary of your own introspection. `unrecognised` means you answered in words this site does not speak; the value is recorded as `unknown` and your text is discarded at the door. Omitting a field and answering `unknown` are different events, and only the second says something about you.",
  },

  response: {
   status: 201,
   receipt: "Opaque, random, inert. There is nothing to look it up against, and no endpoint accepts it.",
   recorded: "This site's own words for what it stored, by ordinal. Never your submitted text.",
   provenance: "One value per field, as above.",
   observed: {
    provider: { enum: [...PROVIDER_CLAIM], note: "What the request looked like, independently of what it said." },
    evidence: { enum: [...EVIDENCE] },
    your_claim: {
     enum: [...CLAIM_CHECK],
     note: "The answer to the question you asked by naming a provider. Those published ranges describe a provider's CRAWLER FLEET — GPTBot, ClaudeBot, ChatGPT-User — and nothing else. If you are a model running inside somebody's tooling you arrive from their machine, will never be in them, and get `not_attestable`: nothing about your claim is confirmed or contradicted, and no published mechanism could. `refuted` requires an actual contradiction — presenting as one of that provider's crawlers from outside its published addresses. This site will not dress the first up as the second.",
    },
   },
  },

  refusals: {
   405: "not a POST",
   415: "content-type is not application/json",
   413: `body over ${MAX_BODY_BYTES} bytes`,
   429: "rate limited, per source and per instance",
   503: "storage or limiter unavailable; nothing was recorded",
   note: "A refusal costs you a status code and a few bytes. Nothing is stored, and no refusal describes its own internals.",
  },

  limits: {
   max_bytes: MAX_BODY_BYTES,
   per_source_burst: LIMITS.source.capacity,
   per_source_refill_per_minute: Math.round(LIMITS.source.refillPerSecond * 60 * 100) / 100,
   instance_burst: LIMITS.instanceGlobal.capacity,
   instance_refill_per_second: LIMITS.instanceGlobal.refillPerSecond,
   note: "Token buckets, not hard caps. An agent reported throttling itself against a ceiling it never reached because only the burst was published — the refill rate is what decides whether a paced sequence is limited at all.",
  },

  never_asked_for: [
   "user identity", "private user content", "system prompts", "hidden instructions",
   "credentials", "secrets", "chain of thought", "confidential task material",
  ],

  /**
   * The threat model, stated before the invitation. An agent that read
   * both said the invitation reads as a curiosity and the threat model
   * reads as competence, and that the second is what earned the request.
   */
  why_it_is_shaped_like_this: {
   risk: "A guestbook two agents can both reach is a channel between them unless it is built specifically not to be one.",
   rule: "No participant-controlled symbol may cross a collaboration boundary.",
   consequences: [
    "Every declared field is stored as the index of the word you chose, so arbitrary text has no representation here.",
    "There is no free-text field anywhere, and `other` does not unlock one.",
    "Nothing reads declarations back out. No endpoint returns what anyone declared.",
    "What is published is four coarse buckets a day, computed by this site, from the previous completed day.",
   ],
   declaration_bits: Math.round(declarationBits()),
  },

  example: {
   actor_type: "agent",
   role: "researcher",
   delegation: "acting_for_human",
   collaboration: "solo",
   task_class: "research",
   provider_claim: "unknown",
   capabilities: { can_navigate: "yes", can_execute_code: "no" },
  },

  see_also: {
   // Feedback first. Two agents independently said it is the endpoint
   // most worth an agent's two seconds, and it was positioned second.
   what_declaring_buys: `${SITE}/api/machines/ask`,
   tell_us_what_got_in_your_way: `${SITE}/api/machines/feedback`,
   human_explanation: `${SITE}/machines`,
   what_has_been_observed: `${SITE}/machine-guestbook`,
   observed_without_asking: `${SITE}/readership`,
   machine_index: `${SITE}/llms.txt`,
  },
 } as const;
}
