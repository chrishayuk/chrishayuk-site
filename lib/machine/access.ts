/**
 * THE BOUNDARY, WHEN THE BOUNDARY IS A PERSON.
 *
 * Everything public on this site is coarse and delayed because anyone
 * can read it — that is the whole reason the guestbook publishes four
 * buckets a day rather than a feed. A page only the operator can open
 * crosses no participant boundary at all, so it can be immediate, fully
 * identified, and carry the prose. Authentication IS the invariant here,
 * which means it has to be real rather than obscure.
 *
 * Unset token means the page does not exist rather than that it is open.
 * A missing secret must never be a public Observatory.
 */
const encoder = new TextEncoder();

/** Constant time in the length-equal case, and never short-circuits on the first byte. */
function sameSecret(given: string, expected: string): boolean {
 const a = encoder.encode(given);
 const b = encoder.encode(expected);
 if (a.length !== b.length) return false;
 let difference = 0;
 for (let i = 0; i < a.length; i++) difference |= a[i] ^ b[i];
 return difference === 0;
}

export const observatoryEnabled = () => (process.env.MACHINE_OBSERVATORY_TOKEN ?? "").length >= 24;

export function observatoryAdmits(presented: string | undefined | null): boolean {
 const expected = process.env.MACHINE_OBSERVATORY_TOKEN ?? "";
 if (expected.length < 24) return false;
 return typeof presented === "string" && sameSecret(presented, expected);
}

export const OBSERVATORY_COOKIE = "machine_observatory";
