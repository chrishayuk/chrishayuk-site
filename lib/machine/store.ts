import { SCHEMA } from "./schema.ts";
import type { StoredDeclaration } from "./handler.ts";
import { describe, describeProvenance, unpackCapabilities, unpackProvenance, type DescribedDeclaration } from "./declaration.ts";
import { CAPABILITY, CLAIM_CHECK, DECLARED_FIELD, EVIDENCE, PROVIDER_CLAIM, VOCABULARY_VERSION, wordOf } from "./vocabulary.ts";

/** Provenance is packed positionally, so unpacking must use the current width. */
const V_DECLARED_FIELDS = DECLARED_FIELD.length;
/** Same reason: CAPABILITY is append-only, so the width must be read, not typed. */
const V_CAPABILITIES = CAPABILITY.length;

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
let labelInsert: Statement | null = null;

function open(): Promise<Database | null> {
 if (opening) return opening;

 // A FAILED OPEN MUST NOT BE REMEMBERED.
 //
 // The previous attempt at this put `opening = null` inside the catch of
 // an `opening ??= (async () => …)()`. The body contains no await, so it
 // ran to completion synchronously while the right-hand side was being
 // evaluated: the null was assigned first and `??=` then wrote the
 // resolved promise straight over it. One attempt, memoised for the life
 // of the process — the exact bug it was written to fix, shipped as its
 // own fix. Clearing it AFTER the promise resolves is the part that has
 // to happen asynchronously.
 const attempt = (async () => {
  const file = process.env.MACHINE_DB;
  if (!file) return null;
  try {
   const runtime = sqlite();
   if (!runtime) { console.error("machine: no node:sqlite in this runtime; declarations will not be stored"); return null; }
   const db = new runtime.DatabaseSync(file);
   db.exec("PRAGMA journal_mode = WAL; PRAGMA synchronous = NORMAL; PRAGMA busy_timeout = 2000;");
   // A v1 table has no `topology` column. Rename rather than migrate: its
   // ordinals indexed vocabularies that no longer exist, so reinterpreting
   // them under v2 would be a mistranslation wearing a migration's clothes.
   try {
    const columns = db.prepare("PRAGMA table_info(visit)").all() as { name: string }[];
    if (columns.length > 0 && !columns.some(column => column.name === "topology")) {
     db.exec("ALTER TABLE visit RENAME TO visit_v1");
     console.error("machine: archived machine-declaration/1 rows as visit_v1");
    }
   } catch { /* no table yet */ }
   db.exec(SCHEMA);
   // A column added after rows existed. CREATE TABLE IF NOT EXISTS will not
   // add it to a table that is already there, and the evidence comparison is
   // a primary measure — losing it silently on an existing volume is worse
   // than a noisy failure here.
   for (const column of [
    "claim_checked INTEGER NOT NULL DEFAULT 0",
    "transport INTEGER NOT NULL DEFAULT 0",
    "execution INTEGER NOT NULL DEFAULT 0",
    "harness INTEGER NOT NULL DEFAULT 0",
    "model_name INTEGER NOT NULL DEFAULT 0",
    "agent_kind INTEGER NOT NULL DEFAULT 0",
   ]) {
    try { db.exec(`ALTER TABLE visit ADD COLUMN ${column}`); } catch { /* already present */ }
   }
   insert = db.prepare(`INSERT INTO visit
    (visit_id, vocabulary_version, hour, actor, provider_claim, model_variant, harness,
     transport, topology, function, coordination, runtime_context, task,
     capabilities, provenance, cap_provenance, provider_seen, evidence, claim_checked,
     challenge, resources, asks, published)
    VALUES ((SELECT IFNULL(MAX(visit_id), 0) + 1 FROM visit), ${VOCABULARY_VERSION},
     ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, 0, 0, 0)`);
   labelInsert = db.prepare("INSERT OR REPLACE INTO visit_label (visit_id, label) VALUES ((SELECT MAX(visit_id) FROM visit), ?)");
   return db;
  } catch (error) {
   console.error("machine: store unavailable —", (error as Error).message);
   return null;
  }
 })();
 opening = attempt;
 void attempt.then(db => { if (db === null && opening === attempt) opening = null; });
 return attempt;
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
  record.hour, record.actor, record.provider, record.variant, record.harness,
  record.transport, record.topology, record.function, record.coordination,
  record.runtimeContext, record.task,
  record.capabilities, record.provenance, record.capabilityProvenance,
  record.providerSeen, record.evidence, record.claimChecked,
 );
 // The visitor's own label, in its own table, read only by the
 // authenticated page. Written after the row so it can attach to it.
 if (record.label && labelInsert) labelInsert.run(record.label);
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
    SUM(CASE WHEN coordination IN (2, 3) OR topology IN (2, 3) THEN 1 ELSE 0 END) AS multiAgent,
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
  const rows = db.prepare(`SELECT visit_id, vocabulary_version, hour, actor, provider_claim,
    model_variant, harness, transport, topology, function, coordination, runtime_context, task,
    capabilities, provenance, cap_provenance, provider_seen, evidence, claim_checked
   FROM visit ORDER BY visit_id DESC LIMIT ?`).all(Math.min(Math.max(1, limit), 500)) as Record<string, number>[];
  return rows.map(row => {
   const declaration = {
    actor: row.actor, provider: row.provider_claim, variant: row.model_variant,
    harness: row.harness, transport: row.transport, topology: row.topology,
    function: row.function, coordination: row.coordination,
    runtimeContext: row.runtime_context, task: row.task, label: null,
    capabilities: unpackCapabilities(row.capabilities),
    provenance: unpackProvenance(row.provenance, V_DECLARED_FIELDS),
    capabilityProvenance: unpackProvenance(row.cap_provenance, V_CAPABILITIES),
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
 labelInsert = null;
}
