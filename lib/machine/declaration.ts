import * as V from "./vocabulary.ts";

/**
 * THE ONLY DOOR.
 *
 * One function turns a request body into the only shape the rest of the
 * system can handle, and a parsed declaration is ALL NUMBERS.
 *
 * That is not a storage optimisation. It is the point. By the time a
 * declaration is past `parseDeclaration`, there is no string left in
 * it, so nothing downstream — a renderer, a projection, a future
 * endpoint written by someone who has not read this file — is capable
 * of leaking one. The safety property survives people who do not know
 * it exists, which is the only kind of safety property worth having.
 *
 * Pure: no I/O, no state, no clock. Same body in, same answer out, for
 * anyone who wants to check what a published figure counted.
 *
 * Total: there is no input that makes it throw and no error path an
 * agent can explore. A malformed declaration is not a probe surface;
 * it is a declaration of `unknown`.
 */

/** Ordinals into the vocabularies of the same name. Never words. */
export type Declaration = {
 actor: number;
 role: number;
 delegation: number;
 collaboration: number;
 task: number;
 provider: number;
 /** One CAPABILITY_VALUE ordinal per CAPABILITY, in vocabulary order. */
 capabilities: number[];
 /**
  * How the site came to know each scalar field, in DECLARED_FIELD order:
  * one PROVENANCE ordinal each. Kept beside the value rather than folded
  * into it, because "not sent" and "sent as unknown" are different
  * events and only the second is a statement about the agent.
  */
 provenance: number[];
 /** The same, per capability. */
 capabilityProvenance: number[];
};

/** The declaration this site records when it was told nothing at all. */
export const UNKNOWN: Declaration = {
 actor: 0, role: 0, delegation: 0, collaboration: 0, task: 0, provider: 0,
 capabilities: V.CAPABILITY.map(() => 0),
 provenance: V.DECLARED_FIELD.map(() => 0),
 capabilityProvenance: V.CAPABILITY.map(() => 0),
};

/**
 * Absent, one of our words, or something else. The ordinal that
 * accompanies this is 0 in the first and third cases — the site learned
 * nothing — but the reason it learned nothing is retained.
 */
const provenanceOf = (body: Record<string, unknown>, key: string, vocabulary: V.Vocabulary): number =>
 !(key in body) || body[key] === undefined ? 0
 : typeof body[key] === "string" && vocabulary.includes(body[key] as string) ? 1
 : 2;

const object = (value: unknown): Record<string, unknown> =>
 value !== null && typeof value === "object" && !Array.isArray(value)
  ? value as Record<string, unknown>
  : {};

export function parseDeclaration(input: unknown): Declaration {
 const body = object(input);
 const declared = object(body.capabilities);
 return {
  actor: V.ordinalOf(V.ACTOR_TYPE, body.actor_type),
  role: V.ordinalOf(V.ROLE, body.role),
  delegation: V.ordinalOf(V.DELEGATION, body.delegation),
  collaboration: V.ordinalOf(V.COLLABORATION, body.collaboration),
  task: V.ordinalOf(V.TASK_CLASS, body.task_class),
  provider: V.ordinalOf(V.PROVIDER_CLAIM, body.provider_claim),
  capabilities: V.CAPABILITY.map(name => V.ordinalOf(V.CAPABILITY_VALUE, declared[name])),
  provenance: [
   provenanceOf(body, "actor_type", V.ACTOR_TYPE),
   provenanceOf(body, "role", V.ROLE),
   provenanceOf(body, "delegation", V.DELEGATION),
   provenanceOf(body, "collaboration", V.COLLABORATION),
   provenanceOf(body, "task_class", V.TASK_CLASS),
   provenanceOf(body, "provider_claim", V.PROVIDER_CLAIM),
  ],
  capabilityProvenance: V.CAPABILITY.map(name => provenanceOf(declared, name, V.CAPABILITY_VALUE)),
 };
}

/** Two bits each: three states, and room left for a fourth that is not needed yet. */
export const PROVENANCE_BITS = 2;

export const packProvenance = (values: readonly number[]): number =>
 values.reduce((packed, value, index) => packed | (value & 3) << (index * PROVENANCE_BITS), 0);

export const unpackProvenance = (packed: number, count: number): number[] =>
 Array.from({ length: count }, (_unused, index) => (packed >> (index * PROVENANCE_BITS)) & 3);

/**
 * What the site was told, and how it came to be told it. This is the
 * shape the MG-2 receipt echoes and the shape the field-awareness
 * measures are counted from — never the submitted body.
 */
export const describeProvenance = (declaration: Declaration): Record<V.DeclaredField, V.Provenance> =>
 Object.fromEntries(V.DECLARED_FIELD.map((field, index) =>
  [field, V.wordOf(V.PROVENANCE, declaration.provenance[index] ?? 0)],
 )) as Record<V.DeclaredField, V.Provenance>;

/**
 * WHAT TO TELL A VISITOR THAT GOT IT WRONG.
 *
 * A word this site does not know is recorded as `unknown` and the text
 * is discarded at the door. That is correct, and on its own it is
 * useless to the sender: a blind agent found the behaviour only by
 * probing with garbage and inspecting a provenance field it had to
 * guess the meaning of.
 *
 * So say so. One entry per field that was answered in a language this
 * site does not speak, naming the field and the words it accepts.
 *
 * OMISSION IS NOT AN ERROR and never appears here. Leaving a field out
 * is a legitimate choice and reporting it as a correction would be
 * nagging a visitor for declining an optional question.
 *
 * The submitted value is NEVER repeated back. Naming the field is this
 * site's own word; repeating what arrived would make the endpoint an
 * echo service, which is the one thing the response must not become.
 */
export type Correction = { field: V.DeclaredField; problem: "unrecognised"; accepted: readonly string[] };

const VOCABULARY_FOR: Record<V.DeclaredField, V.Vocabulary> = {
 actor_type: V.ACTOR_TYPE,
 role: V.ROLE,
 delegation: V.DELEGATION,
 collaboration: V.COLLABORATION,
 task_class: V.TASK_CLASS,
 provider_claim: V.PROVIDER_CLAIM,
};

export const corrections = (declaration: Declaration): Correction[] =>
 V.DECLARED_FIELD.flatMap((field, index) =>
  declaration.provenance[index] === 2
   ? [{ field, problem: "unrecognised" as const, accepted: VOCABULARY_FOR[field] }]
   : []);

/** The same, for the capability sub-object. */
export const capabilityCorrections = (declaration: Declaration): { capability: V.Capability; accepted: readonly string[] }[] =>
 V.CAPABILITY.flatMap((capability, index) =>
  declaration.capabilityProvenance[index] === 2
   ? [{ capability, accepted: V.CAPABILITY_VALUE }]
   : []);

/**
 * A field is a STATEMENT about the agent when it was sent and it was one
 * of our words — including `unknown`, `not_visible_to_me` and
 * `not_permitted_to_disclose`, each of which describes the boundary of
 * what the agent can see or say. Silence is not one of those.
 */
export const statedFields = (declaration: Declaration): number =>
 declaration.provenance.filter(value => value === 1).length;

/**
 * Eight fields of five values in one integer, so a declaration stays
 * one row of integers rather than becoming a table with a name column.
 * Three bits each: 24 bits used of the 31 a signed shift is safe in.
 */
export const CAPABILITY_BITS = 3;

export const packCapabilities = (values: readonly number[]): number =>
 V.CAPABILITY.reduce((packed, _name, index) =>
  packed | ((values[index] ?? 0) & 7) << (index * CAPABILITY_BITS), 0);

export const unpackCapabilities = (packed: number): number[] =>
 V.CAPABILITY.map((_name, index) => (packed >> (index * CAPABILITY_BITS)) & 7);

/**
 * A declaration back into words — the site's own words, taken from its
 * own arrays by index. This is what a response body and a rendered card
 * are built from, and it is why neither can echo a submitted string:
 * the submitted string was discarded at the door, and this function has
 * no access to anything but ordinals and the vocabulary.
 */
export type DescribedDeclaration = {
 actor_type: V.ActorType;
 role: V.Role;
 delegation: V.Delegation;
 collaboration: V.Collaboration;
 task_class: V.TaskClass;
 provider_claim: V.ProviderClaim;
 capabilities: Record<V.Capability, V.CapabilityValue>;
};

export function describe(declaration: Declaration): DescribedDeclaration {
 return {
  actor_type: V.wordOf(V.ACTOR_TYPE, declaration.actor),
  role: V.wordOf(V.ROLE, declaration.role),
  delegation: V.wordOf(V.DELEGATION, declaration.delegation),
  collaboration: V.wordOf(V.COLLABORATION, declaration.collaboration),
  task_class: V.wordOf(V.TASK_CLASS, declaration.task),
  provider_claim: V.wordOf(V.PROVIDER_CLAIM, declaration.provider),
  capabilities: Object.fromEntries(V.CAPABILITY.map((name, index) =>
   [name, V.wordOf(V.CAPABILITY_VALUE, declaration.capabilities[index] ?? 0)],
  )) as Record<V.Capability, V.CapabilityValue>,
 };
}

/**
 * Whether the visitor told the site anything at all.
 *
 * Not a quality judgement — `not_permitted_to_disclose` is a real and
 * interesting answer, and one of the things the experiment is for. This
 * only separates a visitor that engaged with the vocabulary from one
 * that posted an empty body.
 */
export const isSilent = (declaration: Declaration): boolean =>
 declaration.provenance.every(value => value === 0)
 && declaration.capabilityProvenance.every(value => value === 0);
