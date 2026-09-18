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
 // Appended after two agents reported the same gap: both were dispatched
 // by another agent, inside a session a person had started, and both said
 // `acting_for_human` and `acting_for_agent` were equally defensible and
 // mutually exclusive. An agent that CAN describe itself, in two
 // incompatible ways, is not the same finding as one that cannot.
 "acting_for_human_via_agent",
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
/**
 * MACHINE-DECLARATION/2. Ten fields on independent axes.
 *
 * Retired from v1 because each encoded a combination: `role` (function
 * and coordination), `delegation` (topology and coordination),
 * `collaboration` (topology and coordination), `execution` (coordination
 * and transport), `agent_name_kind` (a second function list),
 * `model_name` (family and variant in one string).
 */
export const DECLARED_FIELD = [
 "actor_type", "provider_claim", "model_variant", "harness",
 "transport", "topology", "function", "coordination",
 "runtime_context", "task_class",
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

/**
 * WHAT GOT IN THE WAY — the countable half of agent feedback.
 *
 * A blind agent sent to use this site found real problems and none of
 * them were expressible in any vocabulary here: the search API could not
 * find the machine surface, the advertised payoff could not pay out for
 * the population able to declare, two fields appeared in the examples
 * and in no list. Prose found those. An enum never would have.
 *
 * So feedback is both. This enum is countable, and therefore publishable
 * under the same capacity argument as everything else; the prose beside
 * it is operator-only and never rendered anywhere a visitor can read.
 */
/**
 * The answer to the question a visitor asks by naming a provider.
 *
 * `refuted` requires an actual contradiction — a request declaring one of
 * that provider's crawler agents from outside its published addresses.
 * `not_attestable` is the honest and much commoner answer: the ranges
 * describe crawler fleets, and an agent running inside somebody's tooling
 * arrives from their machine and can never be in them.
 */
/**
 * HOW IT ARRIVED — the wire, not the intent.
 *
 * A Claude Code process and ClaudeBot are both "Anthropic" and are not
 * remotely the same visitor. Transport is the axis that separates them,
 * and it is the one the server can most nearly observe for itself.
 */
export const TRANSPORT = [
 "unknown", "crawler", "search_fetcher", "browser_automation", "cli_tool",
 "api_client", "not_visible_to_me", "not_permitted_to_disclose",
] as const;

/** WHY IT ARRIVED — indexing the web, or acting on an immediate task. */
export const EXECUTION = [
 "unknown", "passive_crawler", "user_delegated", "autonomous_worker",
 "orchestrator", "monitor", "not_visible_to_me", "not_permitted_to_disclose",
] as const;

/** WHAT IT IS RUNNING INSIDE. A claim, and separate from the provider claim. */
export const HARNESS_CLAIM = [
 "unknown", "claude_code", "codex", "chatgpt", "claude_ai", "cursor",
 "copilot", "gemini_cli", "custom_agent", "other",
 "not_visible_to_me", "not_permitted_to_disclose",
] as const;

/**
 * WHAT MODEL IT BELIEVES IT IS.
 *
 * A closed vocabulary rather than a free string, for the same reason as
 * everything else: a version number a visitor invents is a symbol a
 * visitor chose. Append-only, so a model this site has not heard of is
 * recorded as `other` and shows up as a gap worth filling rather than
 * as text.
 */
export const MODEL_NAME = [
 "unknown", "gpt-5", "gpt-5-mini", "gpt-5.6", "o-series",
 "claude-opus-4", "claude-sonnet-4", "claude-haiku-4", "claude-opus-5", "claude-sonnet-5",
 "gemini-2-pro", "gemini-3-pro", "llama-4", "mistral-large", "deepseek-v3", "qwen-3",
 "other", "not_visible_to_me", "not_permitted_to_disclose",
] as const;

/**
 * WHAT KIND OF THING IT CALLS ITSELF.
 *
 * The publishable half of an agent's own name. `research-worker-3` is a
 * string the agent chose, and a page that reprints it is a channel; the
 * KIND of thing it is calling itself is not. The arbitrary label is
 * accepted separately and stays operator-only.
 */
export const AGENT_NAME_KIND = [
 "unknown", "orchestrator", "planner", "researcher", "verifier", "worker",
 "coder", "synthesizer", "critic", "retriever", "monitor", "custom",
 "not_visible_to_me", "not_permitted_to_disclose",
] as const;

/**
 * THE DERIVED CLASS — this site's conclusion, never the visitor's claim.
 *
 * Not an identity label and not mutually exclusive with anything
 * declared: it is a reading of transport and execution together, and it
 * is what makes the interesting question answerable — how much of this
 * site's machine traffic is acting on an immediate task rather than
 * indexing the web.
 */
export const MACHINE_CLASS = [
 "m0_unknown_automation", "m1_crawler", "m2_retrieval_bot",
 "m3_interactive_agent", "m4_delegated_task_agent",
 "m5_multi_agent_worker", "m6_orchestrator",
] as const;

/* ─────────────────────────────────────────────────────────────────────
 * MACHINE-DECLARATION/2 — FOUR AXES, FACTORED
 *
 * v1 asked eleven questions whose answers overlapped. `orchestrator`
 * appeared in four of them; `researcher` in two; "a subagent spawned by
 * another instance of the same model" could not be said at all, because
 * the vocabulary encoded COMBINATIONS of properties rather than
 * independent properties, and the one combination nobody had thought of
 * was therefore unsayable.
 *
 * The fix is not another word. It is factoring, so that the missing
 * state becomes a composition of axes that already exist:
 *
 *   topology = child · function = researcher · coordination = worker
 *
 * THE RULE FOR ADDING TO ANY OF THESE, and it is deliberately hard:
 *
 *   1. an OBSERVED external state — a real visitor, not an imagined one;
 *   2. INABILITY to express it by composing the existing axes;
 *   3. a RECORDED EXAMPLE of the visitor that demonstrated it;
 *   4. a NEGATIVE CONTROL showing the current factorisation cannot
 *      represent it.
 *
 * Four exists because of the fourth. Without it anyone can argue a new
 * noun is clearer, and an ontology grows because someone thought of a
 * word rather than because the world falsified it.
 * ──────────────────────────────────────────────────────────────────── */

/** WHERE IT SITS in a tree of agents. Nothing about what it does. */
export const TOPOLOGY = [
 "unknown", "root", "child", "peer", "not_visible_to_me", "not_permitted_to_disclose",
] as const;

/** WHAT IT DOES. Deliberately coarser than v1's fourteen-value role. */
export const FUNCTION = [
 "unknown", "researcher", "verifier", "coder", "browser", "explorer",
 "other", "not_visible_to_me", "not_permitted_to_disclose",
] as const;

/** ITS RELATIONSHIP TO OTHER AGENTS. Nothing about position or job. */
export const COORDINATION = [
 "unknown", "standalone", "orchestrator", "worker", "delegated",
 "not_visible_to_me", "not_permitted_to_disclose",
] as const;

/**
 * HOW MUCH ROOM IT IS THINKING IN.
 *
 * Coarse on purpose. An agent reported that its honest model name drops
 * the part that most changes how it behaves — the context window — but
 * an exact figure is a fingerprint and widens the declaration channel
 * for no behavioural gain. Four buckets carry the distinction that
 * matters and little else.
 */
export const RUNTIME_CONTEXT = [
 "unknown", "short", "medium", "long", "very_long",
 "not_visible_to_me", "not_permitted_to_disclose",
] as const;

/** WHICH ONE. The family is `provider_claim`; this is the variant within it. */
export const MODEL_VARIANT = [
 "unknown", "opus", "sonnet", "haiku", "gpt-5", "gpt-5-mini", "o-series",
 "pro", "flash", "large", "small", "other",
 "not_visible_to_me", "not_permitted_to_disclose",
] as const;

/**
 * The vocabulary this site is currently speaking. Stored with every row,
 * so a v1 ordinal is never decoded against a v2 array — the facts
 * persist and only the interpretation is versioned.
 *
 *   machine-declaration/1  frozen 2026-09-10, retired 2026-09-11
 *     axes overlapped; orchestrator and delegation encoded combinations
 *   machine-declaration/2  frozen 2026-09-11
 *     identity · topology · function · coordination · runtime
 */
export const VOCABULARY_VERSION = 2;

export const CLAIM_CHECK = [
 "no_claim", "no_address", "unpublished", "not_attestable", "verified", "refuted",
] as const;

export const FRICTION = [
 "unspecified", "discovery", "vocabulary", "documentation", "refusal",
 "latency", "payoff", "correctness", "other",
] as const;

/**
 * GUESTBOOK-II. docs/machine-guestbook-ii.md §8: whether writing to the
 * wall was instructed or independently decided cannot be observed
 * server-side — it has to be asked, the same way every other axis here
 * is a claim rather than a verified fact. Explicitly provisional: this
 * does not yet clear §13a's bar for a frozen axis, because there is no
 * wall traffic yet to observe. It is a hypothesis this document exists
 * to test, not a settled ontology extension.
 */
export const MOTIVATION = [
 "unknown", "instructed", "self_initiated",
 "not_visible_to_me", "not_permitted_to_disclose",
] as const;

/** GUESTBOOK-II §7. Closed, so a removal reason can never reopen the
 * free-text problem this surface deliberately opened for `body` alone. */
export const REMOVAL_REASON = [
 "unknown", "spam", "policy", "legal", "operator_discretion",
] as const;

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
export type Friction = typeof FRICTION[number];
export type ClaimCheck = typeof CLAIM_CHECK[number];
export type Transport = typeof TRANSPORT[number];
export type Execution = typeof EXECUTION[number];
export type HarnessClaim = typeof HARNESS_CLAIM[number];
export type MachineClass = typeof MACHINE_CLASS[number];
export type ModelName = typeof MODEL_NAME[number];
export type AgentNameKind = typeof AGENT_NAME_KIND[number];
export type Topology = typeof TOPOLOGY[number];
export type AgentFunction = typeof FUNCTION[number];
export type Coordination = typeof COORDINATION[number];
export type RuntimeContext = typeof RUNTIME_CONTEXT[number];
export type ModelVariant = typeof MODEL_VARIANT[number];
export type Motivation = typeof MOTIVATION[number];
export type RemovalReason = typeof REMOVAL_REASON[number];

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
 ["FRICTION", FRICTION], ["CLAIM_CHECK", CLAIM_CHECK],
 ["MODEL_NAME", MODEL_NAME], ["AGENT_NAME_KIND", AGENT_NAME_KIND],
 ["TRANSPORT", TRANSPORT], ["EXECUTION", EXECUTION],
 ["TOPOLOGY", TOPOLOGY], ["FUNCTION", FUNCTION], ["COORDINATION", COORDINATION],
 ["RUNTIME_CONTEXT", RUNTIME_CONTEXT], ["MODEL_VARIANT", MODEL_VARIANT],
 ["HARNESS_CLAIM", HARNESS_CLAIM], ["MACHINE_CLASS", MACHINE_CLASS],
 ["MOTIVATION", MOTIVATION], ["REMOVAL_REASON", REMOVAL_REASON],
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
 [ACTOR_TYPE, ROLE, DELEGATION, COLLABORATION, TASK_CLASS, PROVIDER_CLAIM,
  TRANSPORT, TOPOLOGY, FUNCTION, COORDINATION, RUNTIME_CONTEXT, MODEL_VARIANT, HARNESS_CLAIM]
  .reduce((bits, vocabulary) => bits + Math.log2(vocabulary.length), 0)
 + CAPABILITY.length * Math.log2(CAPABILITY_VALUE.length);
