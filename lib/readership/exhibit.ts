/** Public exhibitions are derived from counters, never reconstructed sessions. */
export type ContactRow = { hour: number; path: string; surface: string; purpose: string; provider: string; agent: string; confidence: string; referral: string; n: number };
export type ContactCell = Omit<ContactRow, "surface" | "referral">;
export type ContentContact = { path: string; agent: string; provider: string; confidence: string; n: number };
const HOUR = 3_600_000;
export const contactHour = (hour: number) => new Date(hour * HOUR).toISOString().slice(0, 13).replace("T", " ") + ":00 UTC";

/** Transcribed from docs/machine-guestbook-mg2.md §5. These are known
 * request corrections, not a complete inventory of operator activity. */
export const REQUEST_CORRECTIONS = [
 { hour: Date.parse("2026-09-10T00:00:00Z") / HOUR, agent: "curl", n: 9, reason: "C0 treatment equivalence" },
 { hour: Date.parse("2026-09-10T00:00:00Z") / HOUR, agent: "unrecognised client", n: 1, reason: "C0 treatment equivalence · first gate request" },
 { hour: Date.parse("2026-09-10T06:00:00Z") / HOUR, agent: "curl", n: 1, reason: "C1 treatment equivalence · no declaration written" },
] as const;

export function contactExhibit(rows: readonly ContactRow[], visible: ReadonlySet<string>, now: number, since: number) {
 const from = Math.max(since, now - 47);
 const cells = new Map<string, ContactCell>();
 const contacts = new Map<string, ContentContact>();
 for (const row of rows) {
  if (row.hour < since || row.hour > now || row.purpose === "human" || row.confidence === "refuted" || row.surface === "asset" || !visible.has(row.path)) continue;
  const key = JSON.stringify([row.path, row.agent, row.provider, row.confidence]);
  const contact = contacts.get(key) ?? { path: row.path, agent: row.agent, provider: row.provider, confidence: row.confidence, n: 0 };
  contact.n += row.n; contacts.set(key, contact);
  if (row.hour < from) continue;
  const cellKey = JSON.stringify([row.hour, row.path, row.agent, row.provider, row.confidence, row.purpose]);
  const cell = cells.get(cellKey) ?? { hour: row.hour, path: row.path, agent: row.agent, provider: row.provider, confidence: row.confidence, purpose: row.purpose, n: 0 };
  cell.n += row.n; cells.set(cellKey, cell);
 }
 const ordered = [...cells.values()].sort((a, b) => b.hour - a.hour || a.agent.localeCompare(b.agent) || a.path.localeCompare(b.path) || a.confidence.localeCompare(b.confidence) || a.purpose.localeCompare(b.purpose));
 const corrections = REQUEST_CORRECTIONS.map(correction => {
  const inWindow = correction.hour >= since && correction.hour <= now;
  const observed = inWindow ? rows.filter(row => row.hour === correction.hour && row.path === "/machines" && row.surface === "page" && row.purpose === "automation" && row.provider === "unknown" && row.agent === correction.agent && row.confidence === "inferred" && row.referral === "none").reduce((n, row) => n + row.n, 0) : null;
  // A missing/short cell is an unresolved ledger mismatch, never a zero residual.
  const applied = observed !== null && observed >= correction.n;
  return { ...correction, observed, remaining: applied ? observed! - correction.n : null };
 });
 return {
  from, to: now + 1, totalCells: ordered.length, cells: ordered.slice(0, 1200),
  contacts: [...contacts.values()].sort((a, b) => a.path.localeCompare(b.path) || a.agent.localeCompare(b.agent) || a.confidence.localeCompare(b.confidence)),
  corrections,
 };
}
export type ContactExhibit = ReturnType<typeof contactExhibit>;
