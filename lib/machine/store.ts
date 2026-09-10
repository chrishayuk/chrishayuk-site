import { SCHEMA } from "./schema.ts";
import type { StoredDeclaration } from "./handler.ts";

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
 opening ??= (async () => {
  const file = process.env.MACHINE_DB;
  if (!file) return null;
  try {
   const runtime = sqlite();
   if (!runtime) { console.error("machine: no node:sqlite in this runtime; declarations will not be stored"); return null; }
   const db = new runtime.DatabaseSync(file);
   db.exec("PRAGMA journal_mode = WAL; PRAGMA synchronous = NORMAL; PRAGMA busy_timeout = 2000;");
   db.exec(SCHEMA);
   insert = db.prepare(`INSERT INTO visit
    (visit_id, hour, actor, role, delegation, collaboration, task, provider_claim,
     capabilities, provenance, cap_provenance, provider_seen, evidence, challenge, resources, asks, published)
    VALUES ((SELECT IFNULL(MAX(visit_id), 0) + 1 FROM visit), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, 0, 0, 0)`);
   return db;
  } catch (error) {
   console.error("machine: store unavailable —", (error as Error).message);
   return null;
  }
 })();
 return opening;
}

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
 if (!db || !insert) return;
 insert.run(
  record.hour, record.actor, record.role, record.delegation, record.collaboration,
  record.task, record.provider, record.capabilities, record.provenance,
  record.capabilityProvenance, record.providerSeen, record.evidence,
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

/** Whether this deployment records declarations at all. */
export const isStoring = () => Boolean(process.env.MACHINE_DB);

/** Tests only. */
export function resetStoreForTests(): void {
 opening = null;
 insert = null;
}
