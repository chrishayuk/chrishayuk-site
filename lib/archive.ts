import captures from "../content/archive.json" with { type: "json" };

/**
 * THE INDEPENDENT ARCHIVE.
 *
 * A date on this site is evidence only to someone who already trusts
 * this site. The same page, captured by the Internet Archive, is the
 * same claim held by a third party with no stake in it — which is what
 * a priority claim actually needs. It corroborates; it does not
 * replace the record. Captures can be partial, assets can fail, and
 * the Wayback Machine is not a scholarly registry.
 *
 * One rule governs this file, and scripts/archive-wayback.ts enforces
 * it on the way in: FIRST capture, never latest. A recent snapshot
 * says the page still exists. The first one corroborates existence of that URL by that date,
 * and that is the only part a priority claim rests on. The value is
 * therefore append-only — a capture already recorded is never moved
 * forward, because moving it forward destroys the evidence it was
 * recorded for. It does not establish first publication or prove the contents
 * of a later revision.
 *
 * An identifier that does not exist is absent. A URL nobody has
 * captured yet has no archive line, and no page pretends otherwise.
 */

export type Capture = {
 /** Wayback's capture stamp, YYYYMMDDHHMMSS, UTC. The first one. */
 first: string;
 /** The CDX content digest at that capture, where the record carried one. */
 digest?: string;
};

const CAPTURES: Record<string, Capture> = captures;

const MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

/**
 * "6 SEP 2026" — the evidence voice, spelled out here rather than
 * imported from HAUSE so that this module stays readable by the
 * archive script and the test runner, neither of which bundles.
 */
export const captureVoice = (stamp: string) =>
 `${Number(stamp.slice(6, 8))} ${MONTHS[Number(stamp.slice(4, 6)) - 1]} ${stamp.slice(0, 4)}`;

/** Wayback's stamp as an ISO date — 20260906231045 becomes 2026-09-06. */
export const captureDate = (stamp: string) => `${stamp.slice(0, 4)}-${stamp.slice(4, 6)}-${stamp.slice(6, 8)}`;

/** The replay URL for a capture: the archived copy, at that instant. */
export const captureUrl = (url: string, stamp: string) => `https://web.archive.org/web/${stamp}/${url}`;

/** The first capture of a canonical URL, or null where there is none. */
export function firstCapture(url: string): (Capture & { url: string; date: string }) | null {
 const capture = CAPTURES[url];
 return capture ? { ...capture, url: captureUrl(url, capture.first), date: captureDate(capture.first) } : null;
}

/**
 * The archive as a provenance identifier — the row the Provenance form
 * prints beneath a record, and the line a citation carries. Absent
 * where nothing has been captured, never a placeholder.
 */
export function archiveIdentifiers(url: string): { label: string; value: string; href?: string }[] {
 const capture = firstCapture(url);
 if (!capture) return [];
 return [{ label: "independent archive", value: `Internet Archive · ${captureVoice(capture.first)}`, href: capture.url }];
}

/** Every URL with a capture on file — the archive index reads this. */
export const archivedUrls = () => Object.keys(CAPTURES).sort();
