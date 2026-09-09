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
};

/** The declaration this site records when it was told nothing at all. */
export const UNKNOWN: Declaration = {
 actor: 0, role: 0, delegation: 0, collaboration: 0, task: 0, provider: 0,
 capabilities: V.CAPABILITY.map(() => 0),
};

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
 };
}

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
 declaration.actor === 0 && declaration.role === 0 && declaration.delegation === 0
 && declaration.collaboration === 0 && declaration.task === 0 && declaration.provider === 0
 && declaration.capabilities.every(value => value === 0);
