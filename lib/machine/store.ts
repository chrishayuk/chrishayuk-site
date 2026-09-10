import { SCHEMA } from "./schema.ts";
import type { StoredDeclaration } from "./handler.ts";
import { describe, describeProvenance, unpackCapabilities, unpackProvenance, type DescribedDeclaration } from "./declaration.ts";
import { CLAIM_CHECK, EVIDENCE, PROVIDER_CLAIM, wordOf } from "./vocabulary.ts";

/**
 * WHERE A DECLARATION GOES.
 *
 * The same mechanism as the readership counters, and deliberately a
 * SEPARATE FILE from them: §19 of the specification wants a different
 * retention regime for declarations than for traffic, and separate
 * files are the only kind of separation that survives a DELETE written
 * in a hurry.
 *
 * `MACHINE_DB` is the switch. Unset — local development, previews, the
 * vinext Worker build, CI — every function here is a no-op, exactly as
 * READERSHIP_DB works, and the site behaves as it did before.
 *
 * Every column is an INTEGER. That is not this file's decision; it is
 * schema.ts's, and tests/machine-guestbook.test.ts parses the DDL to
 * prove it. What this file adds is that nothing here ever receives a
 * string to write: `StoredDeclaration` is ordinals, and there is no
 * parameter through which a submitted byte could arrive.
 */

type Statement = { run: (...params: unknown[]) => unknown; all: (...params: unknown[]) => unknown[] };
type Database = { exec: (sql: string) => void; prepare: (sql: string) => Statement; close: () => void };

const sqlite = () => (typeof process !== "undefined"
 ? (process as { getBuiltinModule?: (id: string) => { DatabaseSync: new (path: string) => Database } }).getBuiltinModule?.("node:sqlite")
 : undefined);

/** Declarations outlive events: they hold no time finer than the hour and no identifier at all. */
export const DECLARATION_RETENTION_DAYS = 400;

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
  const file = process.env.MACHINE_DB;
  if (!file) return null;
  try {
   const runtime = sqlite();
   if (!runtime) { console.error("machine: no node:sqlite in this runtime; declarations will not be stored"); return null; }
   const db = new runtime.DatabaseSync(file);
   db.exec("PRAGMA journal_mode = WAL; PRAGMA synchronous = NORMAL; PRAGMA busy_timeout = 2000;");
   db.exec(SCHEMA);
   // A column added after rows existed. CREATE TABLE IF NOT EXISTS will not
   // add it to a table that is already there, and the evidence comparison is
   // a primary measure — losing it silently on an existing volume is worse
   // than a noisy failure here.
   try { db.exec("ALTER TABLE visit ADD COLUMN claim_checked INTEGER NOT NULL DEFAULT 0"); } catch { /* already present */ }
   insert = db.prepare(`INSERT INTO visit
    (visit_id, hour, actor, role, delegation, collaboration, task, provider_claim,
     capabilities, provenance, cap_provenance, provider_seen, evidence, claim_checked, challenge, resources, asks, published)
    VALUES ((SELECT IFNULL(MAX(visit_id), 0) + 1 FROM visit), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, 0, 0, 0)`);
   return db;
  } catch (error) {
   console.error("machine: store unavailable —", (error as Error).message);
   opening = null;
   return null;
  }
 })();
 return opening;
}

/**
 * Configured but unreachable is an ERROR, not an absence.
 *
 * `MACHINE_DB` unset means this deployment deliberately stores nothing —
 * local, preview, the Worker build — and writing is a no-op. `MACHINE_DB`
 * SET and the store unopenable means something is wrong, and returning
 * quietly there tells a caller its submission was recorded when it was
 * discarded.
 */
const storeExpected = () => Boolean(process.env.MACHINE_DB);

/**
 * The sink the route hands to the handler.
 *
 * Throws when the store is present and the write fails, because the
 * handler's bounded queue turns a throw into a 503 — an accepted
 * declaration that was not recorded must not be reported as recorded.
 *
 * Returns quietly when there is no store at all. That is a deployment
 * without MACHINE_DB, where the endpoint is deliberately a no-op rather
 * than an error, and the guestbook says so rather than showing zeroes.
 */
export async function writeDeclaration(record: StoredDeclaration): Promise<void> {
 const db = await open();
 if (!db || !insert) {
  if (storeExpected()) throw new Error("declaration store configured but unavailable");
  return;
 }
 insert.run(
  record.hour, record.actor, record.role, record.delegation, record.collaboration,
  record.task, record.provider, record.capabilities, record.provenance,
  record.capabilityProvenance, record.providerSeen, record.evidence, record.claimChecked,
 );
}

export type DeclarationCounts = {
 declarations: number;
 multiAgent: number;
 challenges: number;
};

/**
 * What the public exhibit is allowed to ask for: three integers over one
 * window, which it immediately coarsens into buckets. Deliberately not a
 * breakdown — a function that returned the distribution would be one
 * edit away from putting it on a public page.
 */
export async function declarationCounts(fromHour: number, toHour: number): Promise<DeclarationCounts | null> {
 const db = await open();
 if (!db) return null;
 try {
  const rows = db.prepare(`SELECT
    COUNT(*) AS declarations,
    SUM(CASE WHEN collaboration IN (2, 3, 4, 5) THEN 1 ELSE 0 END) AS multiAgent,
    SUM(challenge) AS challenges
   FROM visit WHERE hour >= ? AND hour < ?`).all(fromHour, toHour) as
   { declarations: number | null; multiAgent: number | null; challenges: number | null }[];
  const row = rows[0];
  return {
   declarations: row?.declarations ?? 0,
   multiAgent: row?.multiAgent ?? 0,
   challenges: row?.challenges ?? 0,
  };
 } catch (error) {
  console.error("machine: counts unavailable —", (error as Error).message);
  return null;
 }
}

/**
 * Every declaration, in this site's own words, for the private
 * Observatory alone. Ordinals in, words out; no address, no session, no
 * identifier of any kind, because none was ever stored.
 *
 * Realtime is safe HERE and nowhere else. The public guestbook is coarse
 * and a day late because anyone can read it; a page only the operator
 * can open crosses no participant boundary, so the delay buys nothing
 * and costs the only reader the thing they need.
 */
export type DeclarationRow = {
 visit: number; hour: number;
 declared: DescribedDeclaration;
 provenance: Record<string, string>;
 observed: { provider: string; evidence: string; claimChecked: string };
};

export async function recentDeclarations(limit = 100): Promise<DeclarationRow[] | null> {
 const db = await open();
 if (!db) return null;
 try {
  const rows = db.prepare(`SELECT visit_id, hour, actor, role, delegation, collaboration, task,
    provider_claim, capabilities, provenance, cap_provenance, provider_seen, evidence, claim_checked
   FROM visit ORDER BY visit_id DESC LIMIT ?`).all(Math.min(Math.max(1, limit), 500)) as Record<string, number>[];
  return rows.map(row => {
   const declaration = {
    actor: row.actor, role: row.role, delegation: row.delegation,
    collaboration: row.collaboration, task: row.task, provider: row.provider_claim,
    capabilities: unpackCapabilities(row.capabilities),
    provenance: unpackProvenance(row.provenance, 6),
    capabilityProvenance: unpackProvenance(row.cap_provenance, 8),
   };
   return {
    visit: row.visit_id, hour: row.hour,
    declared: describe(declaration),
    provenance: describeProvenance(declaration),
    observed: {
     provider: wordOf(PROVIDER_CLAIM, row.provider_seen),
     evidence: wordOf(EVIDENCE, row.evidence),
     claimChecked: wordOf(CLAIM_CHECK, row.claim_checked ?? 0),
    },
   };
  });
 } catch (error) {
  console.error("machine: declarations unavailable —", (error as Error).message);
  return null;
 }
}

/** Whether this deployment records declarations at all. */
export const isStoring = () => Boolean(process.env.MACHINE_DB);

/** Tests only. */
export function resetStoreForTests(): void {
 opening = null;
 insert = null;
}
