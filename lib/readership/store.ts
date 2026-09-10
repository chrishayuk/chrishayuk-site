import { verify, type Verification } from "./ranges.ts";
import type { Classification, Confidence, Purpose, Surface } from "./classify.ts";

/**
 * WHAT IS ACTUALLY KEPT.
 *
 * There is no request-level record in this store, and no code path that
 * could write one. The finest thing that ever reaches disk is a counter:
 *
 *   (hour, path, surface, purpose, provider, agent, confidence, referral) → n
 *
 * No address, no session, no cookie, no fingerprint, no user agent
 * string as sent, no query string, no timestamp finer than the hour. An
 * address is used for exactly one thing — asking ranges.ts whether a
 * declared agent is where its provider says it is — and the three-word
 * answer is what survives the function call.
 *
 * That is not a privacy gesture bolted onto an analytics system. It is
 * the whole design: the question is which IDEAS are being retrieved,
 * and that question never needed to know who.
 *
 * Storage is a SQLite file on the Fly volume, opened only when
 * READERSHIP_DB names one. Unset — local development, the Sites/vinext
 * worker build, CI — every function here is a no-op and the site
 * behaves exactly as it did before.
 */

const HOUR = 3_600_000;
/** Hourly counters are kept for this long, then deleted. Nothing is archived elsewhere. */
export const RETENTION_DAYS = 400;

type Row = { hour: number; path: string; surface: string; purpose: string; provider: string; agent: string; confidence: string; referral: string; n: number };
type Statement = { run: (...params: unknown[]) => unknown; all: (...params: unknown[]) => unknown[] };
type Database = { exec: (sql: string) => void; prepare: (sql: string) => Statement; close: () => void };

const SCHEMA = `
 CREATE TABLE IF NOT EXISTS rollup (
  hour INTEGER NOT NULL, path TEXT NOT NULL, surface TEXT NOT NULL, purpose TEXT NOT NULL,
  provider TEXT NOT NULL, agent TEXT NOT NULL, confidence TEXT NOT NULL, referral TEXT NOT NULL,
  n INTEGER NOT NULL,
  PRIMARY KEY (hour, path, surface, purpose, provider, agent, confidence, referral)
 ) WITHOUT ROWID;
 CREATE INDEX IF NOT EXISTS rollup_hour ON rollup(hour);
`;

/**
 * `process.getBuiltinModule` reaches a Node built-in without an import
 * statement, so no bundler has to resolve `node:sqlite` — which matters
 * because the same source is also built for the Sites/vinext Worker,
 * where that module does not exist. Absent runtime, absent store, and
 * the site behaves exactly as it did before.
 */
const sqlite = () => (typeof process !== "undefined" ? (process as { getBuiltinModule?: (id: string) => { DatabaseSync: new (path: string) => Database } }).getBuiltinModule?.("node:sqlite") : undefined);

let opening: Promise<Database | null> | null = null;
let insert: Statement | null = null;
let lastPrune = 0;

function open(): Promise<Database | null> {
 opening ??= (async () => {
  const file = process.env.READERSHIP_DB;
  if (!file) return null;
  try {
   const runtime = sqlite();
   if (!runtime) { console.error("readership: no node:sqlite in this runtime; nothing will be counted"); return null; }
   const db = new runtime.DatabaseSync(file);
   db.exec("PRAGMA journal_mode = WAL; PRAGMA synchronous = NORMAL; PRAGMA busy_timeout = 2000;");
   db.exec(SCHEMA);
   insert = db.prepare(`INSERT INTO rollup (hour, path, surface, purpose, provider, agent, confidence, referral, n) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1)
    ON CONFLICT (hour, path, surface, purpose, provider, agent, confidence, referral) DO UPDATE SET n = n + 1`);
   return db;
  } catch (error) {
   console.error("readership: store unavailable —", (error as Error).message);
   return null;
  }
 })();
 return opening;
}

/**
 * Resolve a declared agent against its provider's published addresses.
 * `unpublished` keeps the honest word `declared`; a claim the provider's
 * own list contradicts becomes `refuted` and is never counted as a read.
 */
export function confidenceFor(classification: Classification, ip: string | null): Confidence {
 if (classification.confidence !== "declared") return classification.confidence;
 const verdict: Verification = verify(classification.agent, ip);
 return verdict === "unpublished" ? "declared" : verdict === "verified" ? "verified" : "refuted";
}

/**
 * Count one request. Never throws, never blocks the response, and never
 * receives the address again after `confidenceFor` has answered.
 */
export async function record(classification: Classification, ip: string | null): Promise<void> {
 const confidence = confidenceFor(classification, ip);
 const db = await open();
 if (!db || !insert) return;
 const hour = Math.floor(Date.now() / HOUR);
 try {
  insert.run(hour, classification.path, classification.surface, classification.purpose, classification.provider, classification.agent, confidence, classification.referral);
  if (Date.now() - lastPrune > 6 * HOUR) { lastPrune = Date.now(); db.prepare("DELETE FROM rollup WHERE hour < ?").run(hour - RETENTION_DAYS * 24); }
 } catch (error) {
  console.error("readership: not counted —", (error as Error).message);
 }
}

export type Summary = {
 days: number; from: string; to: string; total: number;
 purposes: Record<Purpose, number>;
 confidence: Record<Confidence, number>;
 providers: { provider: string; retrieval: number; indexing: number; training: number; total: number }[];
 agents: { agent: string; provider: string; purpose: string; confidence: string; n: number }[];
 surfaces: Record<Surface, number>;
 paths: { path: string; ai: number; aiUser: number; human: number }[];
 referrals: Record<string, number>;
 daily: { day: string; ai_user: number; ai_search: number; ai_training: number; human: number }[];
 recent: { hour: string; purpose: string; provider: string; agent: string; confidence: string; path: string; n: number }[];
};

const EMPTY_PURPOSES: Record<Purpose, number> = { ai_user: 0, ai_search: 0, ai_training: 0, search_bot: 0, feed_reader: 0, link_preview: 0, automation: 0, human: 0 };
const EMPTY_CONFIDENCE: Record<Confidence, number> = { verified: 0, declared: 0, refuted: 0, inferred: 0, none: 0 };
const EMPTY_SURFACES: Record<Surface, number> = { page: 0, feed: 0, agent_document: 0, api: 0, asset: 0, other: 0 };

const AI: Purpose[] = ["ai_user", "ai_search", "ai_training"];

/**
 * Recomputed at most once every five minutes.
 *
 * The page is public, so the cost of reading it must not scale with how
 * often it is read. It also means the published figures trail live
 * traffic by up to five minutes, which is the right way round for a
 * public counter: nothing here is worth watching second by second, and
 * a page that cannot be polled into doing work is a page that cannot be
 * used to probe the site's load.
 */
const CACHE_MS = 300_000;
let cached: { at: number; days: number; value: Summary | null } | null = null;

/**
 * Read the window the public page prints.
 *
 * `visible` is the set of paths this site is willing to name — its own
 * canonical surface. Everything else is counted and reported as one
 * line rather than echoed, because a path is a string chosen by the
 * caller and this page is public.
 */
export async function summary(days: number, visible: ReadonlySet<string>): Promise<Summary | null> {
 if (cached && cached.days === days && Date.now() - cached.at < CACHE_MS) return cached.value;
 const db = await open();
 if (!db) return null;
 const now = Math.floor(Date.now() / HOUR);
 const since = now - days * 24;
 const rows = db.prepare("SELECT hour, path, surface, purpose, provider, agent, confidence, referral, n FROM rollup WHERE hour >= ?").all(since) as Row[];

 const purposes = { ...EMPTY_PURPOSES }; const confidence = { ...EMPTY_CONFIDENCE }; const surfaces = { ...EMPTY_SURFACES };
 const providers = new Map<string, { retrieval: number; indexing: number; training: number; total: number }>();
 const agents = new Map<string, { agent: string; provider: string; purpose: string; confidence: string; n: number }>();
 const paths = new Map<string, { ai: number; aiUser: number; human: number }>();
 const referrals: Record<string, number> = {};
 const daily = new Map<string, { ai_user: number; ai_search: number; ai_training: number; human: number }>();
 const recent = new Map<string, { hour: number; purpose: string; provider: string; agent: string; confidence: string; path: string; n: number }>();
 const recentSince = now - 48;
 let total = 0;

 for (const row of rows) {
  // A claim its own provider's published addresses contradict is not a reading of anything.
  if (row.confidence === "refuted") { confidence.refuted += row.n; continue; }
  total += row.n;
  purposes[row.purpose as Purpose] = (purposes[row.purpose as Purpose] ?? 0) + row.n;
  confidence[row.confidence as Confidence] = (confidence[row.confidence as Confidence] ?? 0) + row.n;
  surfaces[row.surface as Surface] = (surfaces[row.surface as Surface] ?? 0) + row.n;

  if (AI.includes(row.purpose as Purpose)) {
   const entry = providers.get(row.provider) ?? { retrieval: 0, indexing: 0, training: 0, total: 0 };
   if (row.purpose === "ai_user") entry.retrieval += row.n; else if (row.purpose === "ai_search") entry.indexing += row.n; else entry.training += row.n;
   entry.total += row.n; providers.set(row.provider, entry);
   const key = `${row.agent}|${row.confidence}`;
   const agent = agents.get(key) ?? { agent: row.agent, provider: row.provider, purpose: row.purpose, confidence: row.confidence, n: 0 };
   agent.n += row.n; agents.set(key, agent);
  }

  if (row.surface !== "asset") {
   const path = visible.has(row.path) ? row.path : "other paths";
   const entry = paths.get(path) ?? { ai: 0, aiUser: 0, human: 0 };
   if (row.purpose === "ai_user") { entry.aiUser += row.n; entry.ai += row.n; }
   else if (AI.includes(row.purpose as Purpose)) entry.ai += row.n;
   else if (row.purpose === "human") entry.human += row.n;
   paths.set(path, entry);
  }

  if (row.purpose === "human" && row.referral !== "none" && row.referral !== "site" && row.surface === "page") referrals[row.referral] = (referrals[row.referral] ?? 0) + row.n;

  const day = new Date(row.hour * HOUR).toISOString().slice(0, 10);
  const bucket = daily.get(day) ?? { ai_user: 0, ai_search: 0, ai_training: 0, human: 0 };
  if (row.purpose in bucket) bucket[row.purpose as keyof typeof bucket] += row.n;
  daily.set(day, bucket);

  if (row.hour >= recentSince && AI.includes(row.purpose as Purpose) && visible.has(row.path)) {
   const key = `${row.hour}|${row.agent}|${row.path}`;
   const entry = recent.get(key) ?? { hour: row.hour, purpose: row.purpose, provider: row.provider, agent: row.agent, confidence: row.confidence, path: row.path, n: 0 };
   entry.n += row.n; recent.set(key, entry);
  }
 }

 const iso = (hour: number) => new Date(hour * HOUR).toISOString().slice(0, 13).replace("T", " ") + ":00Z";
 const value: Summary = {
  days, from: iso(since), to: iso(now), total,
  purposes, confidence, surfaces,
  providers: [...providers].map(([provider, counts]) => ({ provider, ...counts })).sort((a, b) => b.total - a.total),
  agents: [...agents.values()].sort((a, b) => b.n - a.n),
  paths: [...paths].map(([path, counts]) => ({ path, ...counts })).filter(entry => entry.ai > 0 || entry.human > 0).sort((a, b) => b.ai - a.ai || b.human - a.human).slice(0, 20),
  referrals,
  daily: [...daily].sort(([a], [b]) => a.localeCompare(b)).map(([day, counts]) => ({ day, ...counts })),
  recent: [...recent.values()].sort((a, b) => b.hour - a.hour || b.n - a.n).slice(0, 25).map(entry => ({ ...entry, hour: iso(entry.hour) })),
 };
 cached = { at: Date.now(), days, value };
 return value;
}

/**
 * ONE NUMBER, FOR ONE PATH, OVER ONE WINDOW.
 *
 * `summary` cannot answer this. It accumulates only ai, aiUser and human
 * per path and drops any path where both are zero, so a path visited
 * entirely by `automation` is invisible to it — which is exactly the
 * shape of traffic the machine surface receives.
 *
 * This is deliberately narrow: one path, one window, one integer, and no
 * breakdown. The public Guestbook turns the integer into a coarse bucket
 * and never publishes it, so widening this function is not the way to
 * add a figure to a page.
 *
 * `refuted` is excluded here for the same reason it is excluded from
 * every total on /readership: a claim its own provider's published
 * addresses contradict is not a reading of anything.
 */
export async function machineRequestsAt(path: string, fromHour: number, toHour: number): Promise<number | null> {
 const db = await open();
 if (!db) return null;
 try {
  const rows = db.prepare(
   "SELECT SUM(n) AS total FROM rollup WHERE path = ? AND hour >= ? AND hour < ? AND purpose != 'human' AND confidence != 'refuted'",
  ).all(path, fromHour, toHour) as { total: number | null }[];
  return rows[0]?.total ?? 0;
 } catch (error) {
  console.error("readership: machine requests unavailable —", (error as Error).message);
  return null;
 }
}

/** Whether this deployment is recording at all. The page says so rather than showing an empty chart. */
export const isRecording = () => Boolean(process.env.READERSHIP_DB);
