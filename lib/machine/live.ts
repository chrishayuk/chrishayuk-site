/**
 * THE EXHIBITION'S OWN SMALL, PURE LAYER.
 *
 * No I/O, no clock read here — the same discipline as
 * lib/readership/classify.ts. `components/MachineLive.tsx` supplies the
 * clock and the fetch; everything that can be tested without either lives
 * in this file.
 */

/** The rooms the exhibition draws. "other" folds the long tail toward Home,
 * the same way lib/readership/store.ts's own `paths` breakdown collapses it. */
export type Room = "home" | "notebook" | "research" | "work" | "film" | "machines" | "other";

export const ROOM_LABEL: Record<Room, string> = {
 home: "Home", notebook: "Notebook", research: "Research", work: "Work",
 film: "Film", machines: "Machines", other: "the house",
};

/** A path is attacker-controlled text, same as everywhere else this site
 * classifies one — startsWith on a fixed, site-owned prefix list only. */
export function roomOf(path: string): Room {
 if (path === "/") return "home";
 if (path.startsWith("/notebook")) return "notebook";
 if (path.startsWith("/research")) return "research";
 if (path.startsWith("/work")) return "work";
 if (path.startsWith("/film")) return "film";
 if (path.startsWith("/machines") || path.startsWith("/api/machines") || path === "/llms.txt" || path === "/machine-guestbook") return "machines";
 return "other";
}

export type RecentRow = { hour: string; purpose: string; provider: string; agent: string; confidence: string; path: string; n: number };

/** Matches the dedupe key lib/readership/store.ts already uses internally for
 * this same window, minus confidence — two requests that differ only in how
 * confidently they were classified are still one arrival, not two. */
export const recentKey = (row: RecentRow) => `${row.hour}|${row.agent}|${row.provider}|${row.purpose}|${row.path}`;

/** Rows present now that were not in the caller's `seen` set. Order preserved
 * so the caller can queue them oldest-observed-first. */
export function newSince(current: readonly RecentRow[], seen: ReadonlySet<string>): RecentRow[] {
 return current.filter(row => !seen.has(recentKey(row)));
}

const VERB: Record<string, string> = { ai_user: "is reading", ai_search: "is indexing", ai_training: "is collecting across" };

/** The observatory's own restrained voice, not a counter. Automation never
 * names an agent or a room — "no fixed origin" is the point, not a gap. */
export function tickerFor(row: RecentRow): string {
 if (row.purpose === "automation") return "an unidentified client has returned.";
 const verb = VERB[row.purpose] ?? "touched";
 return `${row.agent} ${verb} ${ROOM_LABEL[roomOf(row.path)]}.`;
}

export function quietTicker(minutesSince: number): string {
 const minutes = Math.max(1, Math.round(minutesSince));
 return `quiet for ${minutes} minute${minutes === 1 ? "" : "s"}.`;
}

/** 0.2 at rest, capped at 0.95 — the same range the design spike used,
 * scaled from a real count instead of a scripted phase. */
export function homeBrightness(recentCountLastHour: number): number {
 return Math.min(0.95, 0.2 + recentCountLastHour * 0.12);
}

/** The same hour-bucket string lib/readership/store.ts's own `iso()` writes,
 * so a row's `hour` field can be compared against "now" without either side
 * inventing a second time format. Takes the clock as an argument — pure. */
export const hourBucket = (at: Date) => at.toISOString().slice(0, 13).replace("T", " ") + ":00Z";

/** Sum of `n` across whichever of the given hour buckets are present — used
 * with [now, one hour ago] so a request landing right at the boundary is
 * never silently dropped from what counts as "recent." */
export function activityInHours(rows: readonly RecentRow[], hours: readonly string[]): number {
 const set = new Set(hours);
 return rows.filter(row => set.has(row.hour)).reduce((n, row) => n + row.n, 0);
}
