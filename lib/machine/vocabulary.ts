import type { Confidence } from "../readership/classify.ts";

/**
 * THE CLOSED WORLD.
 *
 * Every declared field a visiting agent can set is one of the arrays
 * below, and what a store keeps is the INDEX, never the word. That is
 * the whole anti-relay argument in one sentence: a payload that is not
 * named in this file has no ordinal, and a column that holds an ordinal
 * cannot hold a message.
 *
 * The rule this file exists to make structural is stronger than "no
 * arbitrary messages", because a message is only the obvious case:
 *
 *   NO PARTICIPANT-CONTROLLED SYMBOL MAY CROSS A COLLABORATION
 *   BOUNDARY.
 *
 * A vocabulary is an alphabet, and an alphabet a visitor can choose
 * from is a signalling alphabet whether or not anyone intended it to
 * be one. So the sizes here are not only an editorial choice about what
 * this site is willing to hear — they are the bit-width of a channel,
 * and projection.ts computes what that width comes to.
 *
 * APPEND ONLY. Ordinals are written into a durable store; moving a
 * value silently rewrites every historical row that pointed at it.
 * tests/machine-guestbook.test.ts pins a checksum for exactly that
 * reason, so a reorder fails CI instead of corrupting the archive.
 *
 * Index 0 of every array is the honest default — `unknown`, or `none`.
 * An unrecognised word becomes index 0, which is the truth about what
 * the site learned from it.
 */

export const ACTOR_TYPE = ["unknown", "human", "agent"] as const;

export const ROLE = [
 "unknown", "planner", "researcher", "browser", "retriever", "verifier",
 "critic", "coder", "synthesizer", "orchestrator", "worker", "other",
 "not_visible_to_me", "not_permitted_to_disclose",
] as const;

export const DELEGATION = [
 "unknown", "acting_for_human", "acting_for_agent", "acting_for_organisation",
 "self_directed", "not_visible_to_me", "not_permitted_to_disclose",
] as const;

export const COLLABORATION = [
 "unknown", "solo", "multi_agent_worker", "multi_agent_orchestrator",
 "multi_agent_peer", "multi_agent_unknown_role", "not_visible_to_me",
 "not_permitted_to_disclose",
] as const;

export const TASK_CLASS = [
 "unknown", "research", "retrieval", "verification", "coding", "analysis",
 "planning", "creative", "monitoring", "navigation", "other",
 "not_permitted_to_disclose",
] as const;

/**
 * Claims, never permissions. Nothing this site does is gated on one,
 * and no capability is ever printed publicly as declared — only as
 * witnessed, because a claim about a thing the site cannot see is not
 * evidence and repeating it would dress one up as the other.
 */
export const CAPABILITY = [
 "can_navigate", "can_read", "can_submit_forms", "can_call_apis",
 "can_execute_code", "can_spawn_agents", "can_coordinate_agents", "can_persist_state",
] as const;

export const CAPABILITY_VALUE = [
 "unknown", "yes", "no", "not_visible_to_me", "not_permitted_to_disclose",
] as const;

/**
 * A provider a visitor may claim to belong to. Enumerated, not free
 * text, for the same reason as everything else — and enumerated with
 * the words the readership classifier already uses, so that a CLAIM and
 * an OBSERVATION are expressed in one language and can be compared
 * without a translation step that could quietly lose the difference.
 */
export const PROVIDER_CLAIM = [
 "unknown", "openai", "anthropic", "google", "meta", "mistral", "microsoft",
 "amazon", "perplexity", "cohere", "deepseek", "alibaba", "xai", "other",
 "not_permitted_to_disclose",
] as const;

/**
 * How much a claim is worth.
 *
 * The first five are lifted verbatim from lib/readership/classify.ts so
 * that one word means one thing across the whole site: `refuted` here
 * means what it means there — an agent named itself and its own
 * provider's published addresses exclude the request.
 *
 * The sixth is the only new thing this experiment can actually witness.
 * It establishes that a visitor held state across two requests. Not the
 * provider, not the model, not a human, not legitimacy, not intent.
 */
export const EVIDENCE = [
 "none",
 "inferred",
 "declared",
 "verified",
 "refuted",
 "multi_step_interaction",
] as const;

/**
 * Site-defined events. An agent picks one; it never describes one.
 *
 * The distinction is the reason there is no `payload` beside this: an
 * event is a verb this site wrote down in advance, applied to an
 * identifier this site published. Both halves are the site's, so the
 * pair carries no bytes of the sender's.
 */
export const EVENT = [
 "visitor_created", "declaration_received", "machine_route_entered",
 "resource_opened", "claim_inspected", "evidence_inspected",
 "citation_requested", "provenance_requested", "ask_performed",
 "challenge_issued", "challenge_completed",
 "collaboration_created", "collaboration_joined", "session_expired",
] as const;

/**
 * The only arithmetic a cross-participant projection is permitted.
 *
 * Coarse and monotonic: a bucket climbs and never falls, because the
 * quantities behind it are set sizes within a fixed window. Both
 * properties are capacity controls rather than presentation choices —
 * see projection.ts, which computes what they buy.
 */
export const BUCKET = ["none", "few", "several", "many"] as const;

/**
 * The declared scalar fields, in a frozen order, so that a per-field
 * provenance can be packed positionally rather than by name.
 */
export const DECLARED_FIELD = [
 "actor_type", "role", "delegation", "collaboration", "task_class", "provider_claim",
] as const;

/**
 * HOW THE SITE CAME TO KNOW A FIELD — kept separate from what the field says.
 *
 * "role was not sent" and "role: unknown" are different events and only
 * one of them is a statement. Collapsing them, which is what a plain
 * ordinal does, throws away the most interesting measurement in the
 * experiment: an agent saying `not_visible_to_me` is describing the
 * boundary of its own introspection, and an agent saying nothing is
 * describing only its willingness to fill in a form.
 *
 * Three states, and the third matters too. `unrecognised` counts an
 * agent that answered in words this site does not speak — a measure of
 * whether a closed vocabulary is usable by the things asked to use it,
 * which no amount of design review can answer in advance.
 */
export const PROVENANCE = ["omitted", "stated", "unrecognised"] as const;

export type ActorType = typeof ACTOR_TYPE[number];
export type Role = typeof ROLE[number];
export type Delegation = typeof DELEGATION[number];
export type Collaboration = typeof COLLABORATION[number];
export type TaskClass = typeof TASK_CLASS[number];
export type Capability = typeof CAPABILITY[number];
export type CapabilityValue = typeof CAPABILITY_VALUE[number];
export type ProviderClaim = typeof PROVIDER_CLAIM[number];
export type Evidence = typeof EVIDENCE[number];
export type Event = typeof EVENT[number];
export type Bucket = typeof BUCKET[number];
export type DeclaredField = typeof DECLARED_FIELD[number];
export type Provenance = typeof PROVENANCE[number];

/**
 * Readership's confidence vocabulary must remain a subset of this one.
 * If lib/readership/classify.ts ever grows a sixth confidence value,
 * `npm run typecheck` fails here rather than the two surfaces drifting
 * into using the same word for two different things.
 */
type Assert<T extends true> = T;
export type EvidenceCoversReadership =
 Assert<[Exclude<Confidence, Evidence>] extends [never] ? true : false>;

export type Vocabulary = readonly string[];

/**
 * A word to its ordinal. Never throws and has no failure path an agent
 * can explore: anything unrecognised — a message, a URL, a number, an
 * object, nothing at all — is index 0, the vocabulary's own word for
 * not knowing.
 */
export const ordinalOf = (vocabulary: Vocabulary, value: unknown): number =>
 typeof value === "string" ? Math.max(0, vocabulary.indexOf(value)) : 0;

/** An ordinal back to its word, for the site's own rendering. */
export const wordOf = <T extends Vocabulary>(vocabulary: T, ordinal: number): T[number] =>
 vocabulary[ordinal] ?? vocabulary[0];

/** Every vocabulary, in the order their ordinals were frozen. */
export const VOCABULARIES: readonly (readonly [string, Vocabulary])[] = [
 ["ACTOR_TYPE", ACTOR_TYPE], ["ROLE", ROLE], ["DELEGATION", DELEGATION],
 ["COLLABORATION", COLLABORATION], ["TASK_CLASS", TASK_CLASS],
 ["CAPABILITY", CAPABILITY], ["CAPABILITY_VALUE", CAPABILITY_VALUE],
 ["PROVIDER_CLAIM", PROVIDER_CLAIM], ["EVIDENCE", EVIDENCE],
 ["EVENT", EVENT], ["BUCKET", BUCKET],
 ["DECLARED_FIELD", DECLARED_FIELD], ["PROVENANCE", PROVENANCE],
];

/** Pinned by the tests. A reorder, a removal or an insertion changes it. */
export const vocabularyHash = () =>
 VOCABULARIES.map(([name, values]) => `${name}:${values.join(",")}`).join("|");

/**
 * The declaration's width as a channel, in bits: the log of the number
 * of distinct declarations a visitor can compose. Recomputed from the
 * arrays, so widening the vocabulary moves this number and the test
 * that holds it to a budget.
 */
export const declarationBits = () =>
 [ACTOR_TYPE, ROLE, DELEGATION, COLLABORATION, TASK_CLASS, PROVIDER_CLAIM]
  .reduce((bits, vocabulary) => bits + Math.log2(vocabulary.length), 0)
 + CAPABILITY.length * Math.log2(CAPABILITY_VALUE.length);
