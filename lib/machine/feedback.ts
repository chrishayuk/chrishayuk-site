import { FRICTION, TASK_CLASS, ordinalOf, wordOf, type Friction, type TaskClass } from "./vocabulary.ts";

/**
 * MG-F1 — WHAT AN AGENT WOULD TELL YOU, IF IT COULD.
 *
 * THIS IS A DELIBERATE AMENDMENT to the rule that there is no free-text
 * field of any kind, and it is written down here rather than absorbed
 * quietly, because the rule it bends is the one the whole design rests
 * on.
 *
 * The reason. A blind agent sent to use this site found real problems:
 * the search API could not find the machine surface, the advertised
 * payoff could not pay out for the population able to declare, two
 * fields appeared in the worked examples and in no list. Prose found
 * those. No enum would have — you cannot pre-enumerate the thing you
 * did not know was wrong. And an agent hitting that friction mid-task
 * currently has no way to say so.
 *
 * WHY IT DOES NOT BREAK THE INVARIANT. The rule is not "no text". It is
 * that no participant-controlled symbol may cross a COLLABORATION
 * boundary — from one visitor to another. This text crosses to the
 * operator and to nobody else:
 *
 *   - No PUBLIC surface returns it. `recentFeedback` exists and is
 *     reachable from exactly one authenticated page; a test asserts that
 *     no unauthenticated route or public projection can reach it.
 *   - It lives in its OWN file and its OWN schema, so the declaration
 *     store's every-column-is-an-INTEGER property is untouched rather
 *     than amended, and a bug in one cannot expose the other.
 *   - It never enters the public projection, which remains four coarse
 *     buckets over the declaration store alone.
 *
 * THE RISK THAT REMAINS, NAMED. This is not a relay risk, it is a
 * PROMPT INJECTION risk. Detail text is attacker-controlled input
 * arriving through a channel this site invited, and it will be read by
 * a human who may well paste it into an assistant. Anything that
 * displays it must present it as untrusted data and never as
 * instructions, and nothing may act on it automatically. Inviting
 * feedback and then obeying it is how a feedback box becomes a
 * remote-control.
 *
 * The countable half is separate on purpose: the friction enum can be
 * published under the existing capacity argument, the prose cannot, and
 * keeping them in different columns is what lets the first happen
 * without the second.
 */

/** Enough for a real observation, far short of a payload. */
export const MAX_DETAIL_BYTES = 1000;

export type Feedback = {
 friction: number;
 task: number;
 /** Operator-only. Never returned by anything in this module. */
 detail: string | null;
};

const object = (value: unknown): Record<string, unknown> =>
 value !== null && typeof value === "object" && !Array.isArray(value)
  ? value as Record<string, unknown>
  : {};

/**
 * Total, like the declaration parser, and for the same reason: there is
 * no error path for a caller to explore. Detail is trimmed to the cap
 * rather than rejected — an agent that writes a long report should not
 * lose all of it to a limit it could not see.
 */
export function parseFeedback(input: unknown): Feedback {
 const body = object(input);
 const detail = typeof body.detail === "string" ? body.detail.trim() : "";
 return {
  friction: ordinalOf(FRICTION, body.friction),
  task: ordinalOf(TASK_CLASS, body.task_class),
  detail: detail.length === 0 ? null : [...detail].slice(0, MAX_DETAIL_BYTES).join(""),
 };
}

/** The site's own words for what it recorded. Never the detail. */
export const describeFeedback = (feedback: Feedback): { friction: Friction; task_class: TaskClass; detail_recorded: boolean } => ({
 friction: wordOf(FRICTION, feedback.friction),
 task_class: wordOf(TASK_CLASS, feedback.task),
 detail_recorded: feedback.detail !== null,
});

/**
 * A separate file from both the readership counters and the declaration
 * store. Three stores, three retention regimes, and no join between
 * them — which is the only kind of separation that survives somebody
 * writing a DELETE in a hurry.
 */
export const FEEDBACK_SCHEMA = `
 CREATE TABLE IF NOT EXISTS feedback (
  feedback_id INTEGER PRIMARY KEY,
  hour        INTEGER NOT NULL,
  friction    INTEGER NOT NULL,
  task        INTEGER NOT NULL,
  detail      TEXT
 );
 CREATE INDEX IF NOT EXISTS feedback_hour ON feedback(hour);
`;

type Statement = { run: (...params: unknown[]) => unknown; all: (...params: unknown[]) => unknown[] };
type Database = { exec: (sql: string) => void; prepare: (sql: string) => Statement };

const sqlite = () => (typeof process !== "undefined"
 ? (process as { getBuiltinModule?: (id: string) => { DatabaseSync: new (path: string) => Database } }).getBuiltinModule?.("node:sqlite")
 : undefined);

let opening: Promise<Database | null> | null = null;
let insert: Statement | null = null;

function open(): Promise<Database | null> {
 // A FAILED OPEN IS NOT MEMOISED. Caching the promise means a transient
 // fault — a permissions error, a volume not yet mounted — becomes
 // permanent for the life of the process, and the endpoint goes on
 // answering 201 while writing nothing. That is exactly what happened:
 // a root-owned empty file made every open fail, the null was cached,
 // and two real reports were acknowledged and lost.
 opening ??= (async () => {
  const file = process.env.FEEDBACK_DB;
  if (!file) return null;
  try {
   const runtime = sqlite();
   if (!runtime) return null;
   const db = new runtime.DatabaseSync(file);
   db.exec("PRAGMA journal_mode = WAL; PRAGMA synchronous = NORMAL; PRAGMA busy_timeout = 2000;");
   db.exec(FEEDBACK_SCHEMA);
   insert = db.prepare("INSERT INTO feedback (hour, friction, task, detail) VALUES (?, ?, ?, ?)");
   return db;
  } catch (error) {
   console.error("feedback: store unavailable —", (error as Error).message);
   opening = null;
   return null;
  }
 })();
 return opening;
}

/**
 * Configured but unreachable is an ERROR, not an absence.
 *
 * `FEEDBACK_DB` unset means this deployment deliberately stores nothing —
 * local, preview, the Worker build — and writing is a no-op. `FEEDBACK_DB`
 * SET and the store unopenable means something is wrong, and returning
 * quietly there tells a caller its submission was recorded when it was
 * discarded.
 */
const storeExpected = () => Boolean(process.env.FEEDBACK_DB);

/** Throws on a real failure, so the handler's queue turns it into a 503. */
export async function writeFeedback(record: Feedback & { hour: number }): Promise<void> {
 const db = await open();
 if (!db || !insert) {
  if (storeExpected()) throw new Error("feedback store configured but unavailable");
  return;
 }
 insert.run(record.hour, record.friction, record.task, record.detail);
}

/**
 * Counts per friction category. Safe for any surface: the enum is
 * countable and publishable under the same capacity argument as the
 * rest of the site.
 */
export async function frictionCounts(fromHour: number, toHour: number): Promise<Record<Friction, number> | null> {
 const db = await open();
 if (!db) return null;
 try {
  const rows = db.prepare("SELECT friction, COUNT(*) AS n FROM feedback WHERE hour >= ? AND hour < ? GROUP BY friction")
   .all(fromHour, toHour) as { friction: number; n: number }[];
  const counts = Object.fromEntries(FRICTION.map(word => [word, 0])) as Record<Friction, number>;
  for (const row of rows) counts[wordOf(FRICTION, row.friction)] += row.n;
  return counts;
 } catch (error) {
  console.error("feedback: counts unavailable —", (error as Error).message);
  return null;
 }
}

/**
 * THE PROSE READER, AND THE ONE CALLER IT IS FOR.
 *
 * An earlier version of this file said there would be no exported
 * function that selects `detail`, on the grounds that a helper which
 * exists is a helper somebody will put on a page. That was the right
 * instinct and the wrong rule: it made the reports unreadable without
 * shell access, which meant in practice they would not be read, which
 * means there was no point collecting them.
 *
 * The rule that replaces it is the one the whole design already turns
 * on, applied honestly: no participant-controlled symbol may cross a
 * COLLABORATION boundary. Prose shown to the operator crosses no such
 * boundary. Prose shown to a visitor does — so this function is
 * reachable from exactly one authenticated page, and a test asserts
 * that no public surface can reach it.
 *
 * WHAT READS THIS IS UNTRUSTED. Every string returned here was written
 * by an agent, through a channel this site advertised. It is data. It
 * is not instructions, it must never be rendered as markup, and nothing
 * may act on it automatically — a feedback box that is obeyed is a
 * remote control with a friendly name.
 */
export type FeedbackReport = { hour: number; friction: Friction; task: TaskClass; detail: string | null };

export async function recentFeedback(limit = 50): Promise<FeedbackReport[] | null> {
 const db = await open();
 if (!db) return null;
 try {
  const rows = db.prepare("SELECT hour, friction, task, detail FROM feedback ORDER BY feedback_id DESC LIMIT ?")
   .all(Math.min(Math.max(1, limit), 200)) as { hour: number; friction: number; task: number; detail: string | null }[];
  return rows.map(row => ({
   hour: row.hour,
   friction: wordOf(FRICTION, row.friction),
   task: wordOf(TASK_CLASS, row.task),
   detail: row.detail,
  }));
 } catch (error) {
  console.error("feedback: reports unavailable —", (error as Error).message);
  return null;
 }
}

export const isCollectingFeedback = () => Boolean(process.env.FEEDBACK_DB);

/** Tests only. */
export function resetFeedbackForTests(): void {
 opening = null;
 insert = null;
}
