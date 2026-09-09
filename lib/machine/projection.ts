import { BUCKET, wordOf, type Bucket } from "./vocabulary.ts";

/**
 * THE ONLY THING THAT CROSSES BETWEEN PARTICIPANTS.
 *
 * A collaboration lets several agents tell this site they belong to one
 * execution. The site therefore has to be able to say something back to
 * each of them about the others, and every byte of that is a channel
 * they did not have before.
 *
 * The contract is not "no messages". Messages are the obvious case. It
 * is:
 *
 *   NO PARTICIPANT-CONTROLLED SYMBOL MAY CROSS A COLLABORATION
 *   BOUNDARY.
 *
 * A list of resource identifiers obeys "no messages" and breaks this
 * one, because WHICH of 775 published resources a sender chooses to
 * inspect is itself a symbol worth 9.6 bits. Twenty of them, in order,
 * is 24 bytes — comfortably a short URL. That is why this file returns
 * quantities and never identities.
 *
 * Three properties do the work, and each is a capacity control rather
 * than a presentation choice:
 *
 * - **Numeric.** A Projection is bucket ORDINALS. Words are produced,
 *   when a surface needs them, by indexing this site's own frozen array
 *   with a number, so every string that ever leaves is provably one of
 *   four the site wrote itself.
 * - **Coarse.** Four buckets, not counts. A sender must move a
 *   quantity across a threshold to signal anything at all.
 * - **Monotonic.** The quantities are set sizes inside a fixed window,
 *   so a bucket climbs and never falls. This is what bounds the channel
 *   independently of any rate limit: a dimension can change at most
 *   three times however many events are spent on it, so the bound below
 *   survives a misconfigured budget.
 *
 * `capacityBits` computes the resulting width exactly, and the test
 * holds it against a frozen ceiling. Widening this file moves that
 * number, and CI says so.
 */

/**
 * The four quantities a participant may learn about a collaboration.
 * Adding a fifth is a channel-widening change; the capacity test is
 * where that gets noticed.
 */
export const DIMENSIONS = [
 "participants", "resources_seen", "claims_checked", "evidence_checked",
] as const;

export type Dimension = typeof DIMENSIONS[number];

/** Set sizes held in memory for the life of a collaboration. Never sent. */
export type CollaborationCounts = Record<Dimension, number>;

/**
 * What crosses the boundary: one bucket ordinal per dimension, and
 * nothing else at any depth. The type is the invariant — there is no
 * position in it where a string could be placed.
 */
export type Projection = Record<Dimension, number>;

/** Counts to buckets. Monotone non-decreasing, by construction. */
export const bucket = (n: number): number =>
 n <= 0 ? 0 : n <= 3 ? 1 : n <= 10 ? 2 : 3;

export const project = (counts: CollaborationCounts): Projection =>
 Object.fromEntries(DIMENSIONS.map(dimension => [dimension, bucket(counts[dimension] ?? 0)])) as Projection;

/**
 * The site's own words for its own numbers, for a response body or a
 * rendered page. Every string this produces is an element of BUCKET,
 * reached by indexing with an integer — which is what makes the claim
 * "no participant-controlled symbol crosses" checkable rather than
 * merely asserted.
 */
export const renderProjection = (projection: Projection): Record<Dimension, Bucket> =>
 Object.fromEntries(DIMENSIONS.map(dimension =>
  [dimension, wordOf(BUCKET, projection[dimension])])) as Record<Dimension, Bucket>;

/**
 * THE FROZEN CEILING.
 *
 * Twenty-four bits — three bytes per collaboration lifetime. Not a
 * round number chosen for comfort: it is the loose upper bound implied
 * by four monotone dimensions of four buckets, and the exact figure
 * `capacityBits` computes sits just under it. A schema change that
 * pushes the exact figure past this fails CI, and the right response is
 * to redo the arithmetic in public rather than to raise the ceiling.
 */
export const CAPACITY_BUDGET_BITS = 24;

/** BigInt so the count stays exact; written without literals, which this target forbids. */
const factorial = (n: number): bigint => {
 let result = BigInt(1);
 for (let i = 2; i <= n; i++) result *= BigInt(i);
 return result;
};

/**
 * Every distinct trajectory an observer could see.
 *
 * A collaboration's projection starts at all-zero and climbs. An
 * observer polling it sees a sequence of transitions, so the
 * information available over a whole lifetime is the log of the number
 * of DISTINCT SEQUENCES, not the log of the number of states — a state
 * count would understate the channel by ignoring order.
 *
 * For each reachable state, the number of orders in which its climbs
 * could have happened is the multinomial coefficient of its
 * coordinates. Summed over every reachable state, that is every
 * trajectory including the ones that stop early.
 */
export function trajectories(dimensions: number = DIMENSIONS.length, levels: number = BUCKET.length): bigint {
 const climbs = levels - 1;
 let total = BigInt(0);
 const state = new Array<number>(dimensions).fill(0);
 const walk = (position: number): void => {
  if (position === dimensions) {
   const steps = state.reduce((sum, value) => sum + value, 0);
   total += state.reduce((count, value) => count / factorial(value), factorial(steps));
   return;
  }
  for (let value = 0; value <= climbs; value++) {
   state[position] = value;
   walk(position + 1);
  }
 };
 walk(0);
 return total;
}

/**
 * The exact width of this channel, in bits, per collaboration lifetime.
 * Computed from the shape of the projection rather than written down,
 * so it cannot drift away from what the code actually permits.
 */
export function capacityBits(dimensions: number = DIMENSIONS.length, levels: number = BUCKET.length): number {
 const total = trajectories(dimensions, levels);
 return total <= BigInt(Number.MAX_SAFE_INTEGER)
  ? Math.log2(Number(total))
  : total.toString(2).length - 1;
}

/** The same figure as bytes, which is the form worth publishing. */
export const capacityBytes = (): number => capacityBits() / 8;
