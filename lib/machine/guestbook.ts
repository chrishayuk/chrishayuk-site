import { BUCKET, wordOf, type Bucket } from "./vocabulary.ts";
import { bucket } from "./projection.ts";
import { machineRequestsAt } from "../readership/store.ts";
import { declarationCounts } from "./store.ts";
import { publishedNotes, type PublishedNote } from "./feedback.ts";

/**
 * THE PUBLIC GUESTBOOK — an exhibit, and the second place this site has
 * to refuse to become a message board.
 *
 * A dashboard showing individual machine declarations as they arrive
 * would undo most of MG-1. An agent can choose its role, its declared
 * mode and the moment it submits; another agent reading a live feed of
 * those choices has a channel, and a nicer one than any of the
 * collaboration surfaces because it needs no token at all.
 *
 * So the public output is a projection, bounded the same way:
 *
 *   FOUR DIMENSIONS · FOUR BUCKETS · ONE PUBLICATION PER DAY
 *
 * Numbers internally, this site's own words at render time. No
 * individual entry, no arbitrary string, no exact timestamp, no corpus
 * identifier, no session or collaboration identifier, no address, no
 * user agent, no referrer, no Ask content.
 *
 * TWO CLOCKS, and the distinction is the safety property.
 *
 *   LIVE          Facts the site controls and an agent cannot influence:
 *                 which phase the experiment is in, whether the
 *                 declaration endpoint is open, the deployed condition.
 *                 These may be current, because no visitor can move them.
 *
 *   PUBLISHED     Anything a visitor can influence by arriving or
 *                 declaring. These come from the PREVIOUS COMPLETED UTC
 *                 DAY, so the latency between acting and observing the
 *                 effect is between 24 and 48 hours.
 *
 * A live figure would let an agent write and another read within one
 * session. A day-delayed figure means using this house as a signalling
 * system costs a day per publication, for eight bits, with no way to
 * know whether anyone is reading. That is not a channel anybody would
 * choose, which is the point.
 */

/** What the public page is willing to say anything about at all. */
export const PUBLIC_DIMENSIONS = [
 "discovery", "declarations", "collaboration", "interaction",
] as const;

export type PublicDimension = typeof PUBLIC_DIMENSIONS[number];

/** Bucket ordinals. No string at any depth — the same rule as the collaboration projection. */
export type PublicSnapshot = Record<PublicDimension, number>;

/**
 * THE FROZEN CEILING for the public surface.
 *
 * Unlike the collaboration projection these figures are NOT monotonic —
 * each day stands alone and a bucket may fall as well as rise — so the
 * per-publication capacity is the full four-bucket choice on each of
 * four dimensions: log2(4^4) = 8 bits, once per day.
 *
 * Widening this — a fifth dimension, a fifth bucket, or publishing more
 * often than daily — moves the number, and the test holds it here.
 */
export const PUBLIC_CAPACITY_BUDGET_BITS = 8;

export const publicCapacityBits = (
 dimensions: number = PUBLIC_DIMENSIONS.length,
 levels: number = BUCKET.length,
): number => dimensions * Math.log2(levels);

/** Publications per day. One. Stated as a number so the test can use it. */
export const PUBLICATIONS_PER_DAY = 1;

const HOUR = 3_600_000;
const DAY = 24;

/**
 * The previous completed UTC day, as hour buckets.
 *
 * "Completed" is doing the work: today is excluded entirely, so nothing
 * a visitor does today can appear on the page today.
 */
export function previousCompletedDay(now = Date.now()): { fromHour: number; toHour: number; label: string } {
 const midnight = Math.floor(now / (HOUR * DAY)) * DAY;
 return {
  fromHour: midnight - DAY,
  toHour: midnight,
  label: new Date((midnight - DAY) * HOUR).toISOString().slice(0, 10),
 };
}

/** Facts the site controls. An agent cannot move any of these, so they may be current. */
export type Condition = {
 phase: "C0" | "C1";
 declarationEndpoint: "not_yet_open" | "open";
 startedOn: string;
 recording: boolean;
};

/**
 * The deployed condition, as a constant rather than a lookup.
 *
 * MG-2B moved this in the same commit that mounted
 * /api/machines/declaration, because a page that says "not yet open"
 * while the endpoint answers is a page telling visitors something
 * untrue. A test ties the two together so they cannot drift: if the
 * route exists, this must say `open`.
 */
export const CONDITION: Condition = {
 phase: "C1",
 declarationEndpoint: "open",
 startedOn: "2026-09-09",
 recording: true,
};

export type PublishedObservations = {
 through: string;
 snapshot: PublicSnapshot;
 /**
  * What agents reported, in the OPERATOR's words. `publishedNotes`
  * selects `note` and never `detail`, so this surface has no expression
  * that could reach an agent's own bytes.
  */
 notes: PublishedNote[];
 /** False when this deployment has no store, so the page says so rather than showing zeroes. */
 available: boolean;
};

/**
 * Read the previous completed day and coarsen it.
 *
 * `discovery` is the only dimension with a source today: arrivals at
 * /machines, from the readership counters. The other three are
 * structurally zero until MG-2B exists to produce them, and the page
 * says "not yet open" rather than "none" so that an absent mechanism is
 * never mistaken for an unpopular one.
 */
/**
 * Recomputed at most once an hour.
 *
 * The figures change at most once a day, the page is public, and the
 * cost of reading a public page must not scale with how often it is
 * read — a page that can be polled into doing work is a page that can
 * be used to probe the site's load. The page itself is rendered per
 * request so it always reflects the live deployment; this cache is what
 * keeps that cheap.
 */
const CACHE_MS = 3_600_000;
let cached: { at: number; day: string; value: PublishedObservations } | null = null;

export async function publishedObservations(now = Date.now()): Promise<PublishedObservations> {
 const day = previousCompletedDay(now);
 // Keyed on the DAY as well as the age. The cache previously ignored `now`
 // entirely, so a caller passing an explicit time — the parameter exists
 // for that — could be handed another day's snapshot, and a `now` in the
 // past satisfied the age test trivially.
 if (cached && cached.day === day.label && now - cached.at < CACHE_MS && now >= cached.at) return cached.value;
 const [arrivals, declared, notes] = await Promise.all([
  machineRequestsAt("/machines", day.fromHour, day.toHour),
  declarationCounts(day.fromHour, day.toHour),
  publishedNotes(30),
 ]);
 const value: PublishedObservations = {
  through: day.label,
  notes: notes ?? [],
  // Either store answering means there is something to publish. Deriving
  // this from the readership counters alone made a deployment with
  // MACHINE_DB set and READERSHIP_DB unset render "no store" while real
  // declaration counts were being discarded.
  available: arrivals !== null || declared !== null,
  snapshot: {
   discovery: bucket(arrivals ?? 0),
   declarations: bucket(declared?.declarations ?? 0),
   collaboration: bucket(declared?.multiAgent ?? 0),
   interaction: bucket(declared?.challenges ?? 0),
  },
 };
 cached = { at: now, day: day.label, value };
 return value;
}

/** Tests only. */
export const resetGuestbookCache = () => { cached = null; };

/** Ordinals to this site's own words, by index. The only place a word is produced. */
export const renderPublic = (snapshot: PublicSnapshot): Record<PublicDimension, Bucket> =>
 Object.fromEntries(PUBLIC_DIMENSIONS.map(dimension =>
  [dimension, wordOf(BUCKET, snapshot[dimension])])) as Record<PublicDimension, Bucket>;
