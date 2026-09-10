/**
 * THE SHAPE THE STORE IS ALLOWED TO HAVE.
 *
 * Declared here, as text, before any database exists, because the
 * safety property belongs to the SCHEMA rather than to the code that
 * writes rows. A validator can be forgotten; a column that cannot hold
 * a string cannot be talked into holding one.
 *
 *   Every column of every table an agent's request can influence is an
 *   INTEGER.
 *
 * That single sentence is arbitrary-message refusal, arbitrary-URL
 * refusal and encoded-payload refusal all at once, and it is checked
 * mechanically by tests/machine-guestbook.test.ts rather than promised
 * in a document. There is nowhere to put the bytes.
 *
 * `visit` carries BOTH halves of the evidence comparison: what the
 * visitor said about itself (`provider_claim`) and what the request
 * independently looked like (`provider_seen`, `evidence`, from
 * classify.ts and ranges.ts). They are adjacent columns and are never
 * merged into one, for the same reason /readership never adds verified
 * and declared into a single impressive number.
 *
 * `corpus` is the one table with a TEXT column and the one table the
 * request path cannot reach. It is written at boot from
 * `recordGraph()`, holds this site's own identifiers and no others, and
 * exists so that an Observatory reading a forty-day-old event can still
 * name the record it referred to.
 *
 * Retention differs by table and that is why this store is a separate
 * file from the readership counters rather than more tables inside
 * them. Separate files are the only kind of separation that survives a
 * DELETE written in a hurry.
 */

export const SCHEMA = `
 CREATE TABLE IF NOT EXISTS visit (
  visit_id       INTEGER PRIMARY KEY,
  hour           INTEGER NOT NULL,
  actor          INTEGER NOT NULL,
  role           INTEGER NOT NULL,
  delegation     INTEGER NOT NULL,
  collaboration  INTEGER NOT NULL,
  task           INTEGER NOT NULL,
  provider_claim INTEGER NOT NULL,
  capabilities   INTEGER NOT NULL,
  provenance     INTEGER NOT NULL,
  cap_provenance INTEGER NOT NULL,
  provider_seen  INTEGER NOT NULL,
  evidence       INTEGER NOT NULL,
  challenge      INTEGER NOT NULL,
  resources      INTEGER NOT NULL,
  asks           INTEGER NOT NULL,
  published      INTEGER NOT NULL
 ) WITHOUT ROWID;

 CREATE TABLE IF NOT EXISTS event (
  event_id       INTEGER PRIMARY KEY,
  at             INTEGER NOT NULL,
  visit_id       INTEGER NOT NULL,
  collab         INTEGER,
  type           INTEGER NOT NULL,
  node           INTEGER,
  corpus_version INTEGER NOT NULL
 );

 CREATE TABLE IF NOT EXISTS corpus (
  corpus_version INTEGER NOT NULL,
  ordinal        INTEGER NOT NULL,
  id             TEXT NOT NULL,
  PRIMARY KEY (corpus_version, ordinal)
 ) WITHOUT ROWID;

 CREATE INDEX IF NOT EXISTS event_visit ON event(visit_id);
 CREATE INDEX IF NOT EXISTS event_at ON event(at);
`;

/** Tables a request can put a row in. Every column must be INTEGER. */
export const REQUEST_REACHABLE = ["visit", "event"] as const;

/** Tables written only from the site's own corpus, never from a request. */
export const SITE_OWNED = ["corpus"] as const;

export type Column = { name: string; type: string };

const TABLE = /CREATE TABLE IF NOT EXISTS (\w+) \(([\s\S]*?)\n \)/g;

/**
 * The declared columns of each table, read out of the DDL itself.
 *
 * Parsing the schema rather than listing the columns twice is the point:
 * a test built on this cannot pass because somebody updated the test's
 * copy of the truth.
 */
export function tables(): Record<string, Column[]> {
 const parsed: Record<string, Column[]> = {};
 for (const [, name, body] of SCHEMA.matchAll(TABLE)) {
  parsed[name] = body.split("\n")
   .map(line => line.trim().replace(/,$/, ""))
   .filter(line => line && !/^(PRIMARY KEY|UNIQUE|FOREIGN KEY|CHECK)\b/i.test(line))
   .map(line => {
    const [column, type] = line.split(/\s+/);
    return { name: column, type: type.toUpperCase() };
   });
 }
 return parsed;
}

/** Every column in the schema that can hold text, whatever table it is in. */
export const textColumns = (): { table: string; column: string }[] =>
 Object.entries(tables()).flatMap(([table, columns]) =>
  columns.filter(column => column.type !== "INTEGER")
   .map(column => ({ table, column: column.name })));
