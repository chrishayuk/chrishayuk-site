# Machine Guestbook — v0.1 build specification

**Status:** C1 running — declarations open at `/api/machines/declaration`. §§7.1, 8, 9, 10 remain specification.
**Next:** [MG-2 preregistration](machine-guestbook-mg2.md), frozen before its endpoint is built.
**Built:** `lib/machine/{vocabulary,declaration,corpus,projection,schema}.ts`,
`lib/llms.ts`, `/llms.txt`, `/machines`, `tests/machine-guestbook.test.ts`.
**Surfaces:** `/machines`, `/machines/guestbook`, `/machines/observatory`, `/api/machines/*`.
**Extends:** [machine readership](machine-readership.md), which counts what machines
do. This asks them what they think they are doing, and keeps the two apart.

## 1. What this adds to what already exists

`/readership` answers *who came here* from evidence the visitor did not choose to
give: a user-agent string, an address checked against its provider's own published
ranges, a path. It is deliberately incapable of hearing a machine speak.

The Guestbook is the other half. It lets a visiting agent say something about how it
is operating, and it gives the site a reason to answer differently when it does.

The two must never merge. Readership holds **observed** facts; the Guestbook holds
**declared** ones. A declaration is worth exactly what a `User-Agent` header is
worth, and the existing vocabulary already says so — `verified`, `declared`,
`refuted`, `inferred`, `none` in `lib/readership/classify.ts`. v0.1 reuses that
vocabulary rather than inventing a second one, and adds one value for the one new
thing it can actually witness (§5).

## 2. The invariant, as three structural rules

The draft states the invariant as policy: *the site is an observatory, not a message
bus*. Policy is not enforceable. These three rules make it a property of the code,
and each has a test in §11 that fails loudly if it is ever weakened.

### Rule 1 — the declaration tables have no TEXT column

Every declared field is a closed vocabulary, and what reaches disk is the **ordinal**
of the chosen value, never the string that named it. An arbitrary payload has no
ordinal, so there is nowhere in the schema for it to go. Arbitrary-message refusal
stops being a validation step somebody could forget and becomes a shape the store
cannot represent.

### Rule 2 — agent-supplied identifiers are resolved to site ordinals at the boundary

`claim_id`, `resource_id` and their kind are looked up in an index built from
`recordGraph()`. The lookup returns a number or nothing. The request path can read
that index and can never write to it, so an unrecognised identifier is a 422 and
leaves no trace, and a recognised one is stored as an integer with the submitted
string discarded at the boundary.

### Rule 3 — every value crossing between participants is a number

The type of the shared collaboration projection contains no string-typed field at
any depth. Bytes cannot flow through a structure that has nowhere to put a byte.
This is what makes the collaboration feature safe rather than merely careful, and it
is the rule the draft's §9 currently breaks — see §3.

## 3. Channel capacity, measured

Any shared state is a covert channel. The question is never *whether* one exists but
*how wide it is*, and a design that claims zero is not being honest. These are the
numbers for this corpus, today: `recordGraph()` has 1,124 nodes, 775 of them
retrievable.

| Surface | Per-unit capacity | Bounded lifetime capacity |
| --- | --- | --- |
| One resource identifier chosen from the corpus | 9.6 bits | — |
| Full declaration, all fields (§4) | 37.3 bits | ~4.7 bytes |
| Public Guestbook card, declared fields only (§9) | 6.8 bits | ~0.85 bytes/card |
| **Draft §9 as written** — ordered list of 20 inspected ids | 9.6 bits each | **~24 bytes/hour** |
| Draft §9 unordered — set of 20 from 775 | — | 130 bits ≈ 16 bytes/hour |
| Counts, one integer per event class | 2 bits/event | 120 bits ≈ 15 bytes/hour |
| **Coarse buckets, as built** | 8 bits of state | **20.079 bits = 2.51 bytes** |

Twenty-four bytes carries `https://x.co/aB9` with room to spare. **The identifier
list in the draft's §9 is the one part of the design that has to change**, and the
argument for changing it is arithmetic rather than taste.

v0.1 therefore returns a projection of four values, each coarsened to
`none | few | several | many`. Eight bits of state, and a bucket only ever climbs, so
the whole projection can make at most twelve transitions across a collaboration's
life.

The figure in the table is exact rather than an estimate, and
`projection.ts:capacityBits()` computes it rather than quoting it. What an observer
can extract over a lifetime is the log of the number of distinct TRAJECTORIES, not
of states — a state count would understate the channel by ignoring the order the
climbs happened in. Summing the multinomial coefficient of every reachable state
gives 1,107,697 distinct trajectories: **20.079 bits, 2.51 bytes per collaboration**,
against a frozen ceiling of 24. A fifth dimension would cost 28.9 bits and a fifth
bucket 27.5, so the ceiling is not decorative — both are refused by
`tests/machine-guestbook.test.ts`.

Note what this bound does *not* depend on: the event budget. Because the buckets are
monotonic, a dimension can change at most three times however many events are spent
on it, so the width survives a misconfigured rate limit. Rate limiting stays a
denial-of-service control and stops being load-bearing for confidentiality.

That number goes in the public write-up, because publishing the bound is what
distinguishes an argument from a reassurance.

## 4. `lib/machine/vocabulary.ts` — the closed world

Ordinals are the stored form, so **the arrays are append-only. Reordering or
removing a value silently rewrites history.** A test pins a checksum over the
vocabulary so that a reorder fails CI instead of corrupting the archive.

```ts
/**
 * THE CLOSED WORLD.
 *
 * Every declared field a visiting agent can set is one of these arrays,
 * and what the store keeps is the INDEX, never the word. That is the
 * whole anti-relay argument in one sentence: a payload that is not in
 * this file has no ordinal, and a column that holds an ordinal cannot
 * hold a message.
 *
 * APPEND ONLY. The ordinals are written into a durable store; moving a
 * value moves every historical row that pointed at it. vocabularyHash()
 * is checked by tests/machine-guestbook.test.ts for exactly that reason.
 */

export const ACTOR_TYPE = ["unknown", "human", "agent"] as const;

export const ROLE = [
 "unknown", "planner", "researcher", "browser", "retriever", "verifier",
 "critic", "coder", "synthesizer", "orchestrator", "worker", "other",
 "not_visible_to_me", "not_permitted_to_disclose",
] as const;

export const DELEGATION = [
 "unknown", "acting_for_human", "acting_for_agent", "acting_for_organisation",
 "self_directed", "not_visible_to_me", "not_permitted_to_disclose",
] as const;

export const COLLABORATION = [
 "unknown", "solo", "multi_agent_worker", "multi_agent_orchestrator",
 "multi_agent_peer", "multi_agent_unknown_role", "not_visible_to_me",
 "not_permitted_to_disclose",
] as const;

export const TASK_CLASS = [
 "unknown", "research", "retrieval", "verification", "coding", "analysis",
 "planning", "creative", "monitoring", "navigation", "other",
 "not_permitted_to_disclose",
] as const;

/** Claims, never permissions. Nothing the site does is gated on one. */
export const CAPABILITY = [
 "can_navigate", "can_read", "can_submit_forms", "can_call_apis",
 "can_execute_code", "can_spawn_agents", "can_coordinate_agents", "can_persist_state",
] as const;

export const CAPABILITY_VALUE = [
 "unknown", "yes", "no", "not_visible_to_me", "not_permitted_to_disclose",
] as const;

/**
 * A provider a visitor may claim to belong to. Enumerated, not free text,
 * for the same reason as everything else here — and the enumeration is
 * the one already used by the readership classifier, so a CLAIM and an
 * OBSERVATION are expressed in the same words and can be compared.
 */
export const PROVIDER_CLAIM = [
 "unknown", "openai", "anthropic", "google", "meta", "mistral", "microsoft",
 "amazon", "perplexity", "cohere", "deepseek", "alibaba", "xai", "other",
 "not_permitted_to_disclose",
] as const;

/**
 * How much a claim is worth. The first five are lifted verbatim from
 * lib/readership/classify.ts so that one word means one thing across the
 * whole site. The sixth is the only new thing v0.1 can actually witness.
 */
export const EVIDENCE = [
 "none",                        // nothing claimed, nothing checked
 "inferred",                    // from the shape of the request
 "declared",                    // said so; no published list to test it against
 "verified",                    // address is inside its provider's published range
 "refuted",                     // its own provider's published list excludes it
 "multi_step_interaction",      // completed the challenge: held state across requests
] as const;

/** Site-defined events. An agent picks one; it never describes one. */
export const EVENT = [
 "visitor_created", "declaration_received", "machine_route_entered",
 "resource_opened", "claim_inspected", "evidence_inspected",
 "citation_requested", "provenance_requested", "ask_performed",
 "challenge_issued", "challenge_completed",
 "collaboration_created", "collaboration_joined", "session_expired",
] as const;

/** Coarse buckets. The projection's only permitted arithmetic — see §3. */
export const BUCKET = ["none", "few", "several", "many"] as const;
export const bucket = (n: number) => n === 0 ? 0 : n <= 3 ? 1 : n <= 10 ? 2 : 3;

export type Vocabulary = readonly string[];
export const ordinalOf = (vocabulary: Vocabulary, value: unknown): number =>
 typeof value === "string" ? Math.max(0, vocabulary.indexOf(value)) : 0;

/** Index 0 of every array is the honest default: unknown, or none. */
export const vocabularyHash = () => [
 ACTOR_TYPE, ROLE, DELEGATION, COLLABORATION, TASK_CLASS, CAPABILITY,
 CAPABILITY_VALUE, PROVIDER_CLAIM, EVIDENCE, EVENT, BUCKET,
].map(v => v.join(",")).join("|");
```

Two consequences worth stating plainly, because both are choices:

`other` unlocks nothing. It is a leaf, not a door to a text field. An agent that
cannot describe itself in this vocabulary is a finding — that is experiment E2 — not
a reason to widen the vocabulary.

`ordinalOf` returns 0 rather than throwing. An unrecognised word is recorded as
`unknown`, which is the truth about what the site learned, and it means a
malformed declaration never becomes a way to probe for what the parser accepts.

## 5. `lib/machine/declaration.ts` — the only door

One function turns a request body into the only shape the rest of the system can
handle. It is pure, it has no I/O and no clock, and it can be tested exhaustively,
for the same reasons `classify.ts` is.

```ts
import * as V from "./vocabulary.ts";

/**
 * A parsed declaration is ALL NUMBERS. That is not a storage optimisation.
 * It is the point: by the time a declaration is past this function, there
 * is no string left in it, so no code downstream — a renderer, a
 * projection, a future endpoint written by someone who has not read this
 * file — can leak one.
 */
export type Declaration = {
 actor: number; role: number; delegation: number; collaboration: number;
 task: number; provider: number;
 /** One CAPABILITY_VALUE ordinal per CAPABILITY, in vocabulary order. */
 capabilities: number[];
};

const field = (body: Record<string, unknown>, key: string, vocabulary: V.Vocabulary) =>
 V.ordinalOf(vocabulary, body[key]);

export function parseDeclaration(input: unknown): Declaration {
 const body = (input && typeof input === "object" ? input : {}) as Record<string, unknown>;
 const declared = (body.capabilities && typeof body.capabilities === "object"
  ? body.capabilities : {}) as Record<string, unknown>;
 return {
  actor: field(body, "actor_type", V.ACTOR_TYPE),
  role: field(body, "role", V.ROLE),
  delegation: field(body, "delegation", V.DELEGATION),
  collaboration: field(body, "collaboration", V.COLLABORATION),
  task: field(body, "task_class", V.TASK_CLASS),
  provider: field(body, "provider_claim", V.PROVIDER_CLAIM),
  capabilities: V.CAPABILITY.map(name => V.ordinalOf(V.CAPABILITY_VALUE, declared[name])),
 };
}

/** Eight three-value-wide fields in one integer, so the row stays one row. */
export const packCapabilities = (values: number[]) =>
 values.reduce((packed, value, index) => packed | (value & 7) << (index * 3), 0);
export const unpackCapabilities = (packed: number) =>
 V.CAPABILITY.map((_, index) => (packed >> (index * 3)) & 7);
```

`parseDeclaration` accepts any JSON at all and never fails. Unknown keys are
dropped, unknown values become `unknown`, a string where an object belongs becomes
`unknown`. There is no error path an agent can explore, and no request body that
survives contact with it.

## 6. `lib/machine/corpus.ts` — the site's own identifiers

```ts
import { recordGraph } from "../graph.ts";

/**
 * RULE 2. An agent may refer to something on this site. It may not
 * invent something on this site.
 *
 * The index is built once from the site's own graph. `ordinal()` is a
 * read. There is deliberately no exported function that adds to it, so
 * the request path — which can only reach this module through
 * `ordinal()` — has no reachable write.
 */
let index: Map<string, number> | null = null;
let ids: string[] = [];

function build() {
 if (index) return;
 ids = recordGraph().nodes.filter(node => node.retrievable).map(node => node.id).sort();
 index = new Map(ids.map((id, ordinal) => [id, ordinal]));
}

/** An identifier this site published, or null. Never an insert. */
export function ordinal(id: unknown): number | null {
 if (typeof id !== "string" || id.length > 128) return null;
 build();
 return index!.get(id) ?? null;
}

/** The reverse, for the private Observatory only. */
export function identifier(ordinal: number): string | undefined {
 build();
 return ids[ordinal];
}

export const corpusSize = () => { build(); return ids.length; };
```

The ordinals shift when the corpus changes, so the store records
`corpus_version` — a short hash of the sorted id list — beside each event, and the
Observatory refuses to resolve an ordinal recorded under a different corpus rather
than resolving it to the wrong record. Being unable to name a record is a smaller
failure than naming the wrong one.

## 7. Data model

Two stores, deliberately unlike each other.

### 7.1 Durable — SQLite on the Fly volume

Same mechanism as readership: `process.getBuiltinModule("node:sqlite")`, opened only
when `MACHINE_DB` names a file, every function a no-op when it does not, so local
development, previews and the vinext Worker build behave exactly as they do now. A
**separate file** from `readership.db`, because §19 of the draft wants a separate
retention regime and separate files are the only kind of separation that survives a
`DELETE` written in a hurry.

The DDL below is not a sketch: it is `lib/machine/schema.ts`, declared and parsed
before any database exists, because the safety property belongs to the schema rather
than to the code that will write rows. A validator can be forgotten; a column that
cannot hold a string cannot be talked into holding one.

```sql
-- Every column is an INTEGER. This is Rule 1, and tests/machine-guestbook.test.ts
-- parses the DDL to prove it after every schema change.
CREATE TABLE IF NOT EXISTS visit (
 visit_id       INTEGER PRIMARY KEY,   -- the site's own counter: "VISITOR 0188"
 hour           INTEGER NOT NULL,      -- coarse time. Nothing finer is kept.
 actor          INTEGER NOT NULL,
 role           INTEGER NOT NULL,
 delegation     INTEGER NOT NULL,
 collaboration  INTEGER NOT NULL,
 task           INTEGER NOT NULL,
 provider_claim INTEGER NOT NULL,
 capabilities   INTEGER NOT NULL,      -- packed, 3 bits per capability
 agent          INTEGER NOT NULL,      -- ordinal into readership AGENTS: OBSERVED
 evidence       INTEGER NOT NULL,      -- ordinal into EVIDENCE: what was checked
 challenge      INTEGER NOT NULL,      -- 0 or 1
 resources      INTEGER NOT NULL,      -- count of distinct resources opened
 asks           INTEGER NOT NULL,      -- count of Ask calls
 published      INTEGER NOT NULL       -- 0 until eligible for the public Guestbook
) WITHOUT ROWID;

CREATE TABLE IF NOT EXISTS event (
 event_id       INTEGER PRIMARY KEY,
 at             INTEGER NOT NULL,      -- ms. Private to the Observatory; never public.
 visit_id       INTEGER NOT NULL,
 collab         INTEGER,               -- internal id, NOT the token
 type           INTEGER NOT NULL,      -- ordinal into EVENT
 node           INTEGER,               -- ordinal into the corpus index (§6)
 corpus_version INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS event_visit ON event(visit_id);
CREATE INDEX IF NOT EXISTS event_at ON event(at);

-- Written at boot from recordGraph(). The request path never reaches this
-- statement; it holds the site's own identifiers and no others.
CREATE TABLE IF NOT EXISTS corpus (
 corpus_version INTEGER NOT NULL,
 ordinal        INTEGER NOT NULL,
 id             TEXT NOT NULL,
 PRIMARY KEY (corpus_version, ordinal)
) WITHOUT ROWID;
```

`corpus` is the single table with a TEXT column, and the test in §11 asserts both
that it is the only one and that every value in it is a member of the current
graph. It exists so that an Observatory reading a 40-day-old event can still name
the record it referred to.

**Retention.** `event` rows are deleted after 30 days. `visit` rows persist —
they hold no time finer than an hour, no address, no token, no text, and they are
the Guestbook. Pruning runs on the same six-hourly trigger as readership's.

### 7.2 Ephemeral — memory, and only memory

Collaborations, challenges and visit tokens live in a `Map` in the single Fly
machine's process and are **never written to disk**. TTL 60 minutes, swept on
access. A restart forgets every live collaboration, which is a feature: the strongest
guarantee that a channel is not persistent is that it cannot outlive a process.

```ts
type Collaboration = {
 internal: number;            // the id that appears in `event`, never sent out
 created: number;
 participants: Set<number>;   // visit ids
 seen: Set<number>;           // corpus ordinals — never sent out, only counted
 claims: Set<number>;
 evidence: Set<number>;
 asks: number;
};
```

This is also the only place a `Set` of ordinals exists. It is used to compute
buckets and is never serialised.

## 8. Routes

Pages under `/machines`, API under `/api/machines`, matching the repo's existing
split. Every API route is `POST` except the two documents, sets
`X-Robots-Tag: noindex`, and returns `Cache-Control: no-store`.

**On the subdomain.** `agents.chrishayuk.com` is right eventually and premature now:
a second origin means a second deployment, a second certificate and a CORS story,
before there is any evidence an agent will fill the form in at all. v0.1 keeps one
origin and one deployment, and every handler reads its own hostname from the request
rather than from `SITE`, so moving to a subdomain later is a routing change and not
a rewrite.

The declaration endpoint was `/api/machine/declare` when this section was first
written and is now `/api/machines/declaration`: it matches the public `/machines`
namespace, stays resource-oriented, and leaves room for `/api/machines/challenge`
and `/api/machines/collaboration` beside it. **The correction was made before any
endpoint existed**, so nothing deployed changed and the C0 condition is untouched.
`scripts/c0-treatment.mjs` probes both names, so a stray endpoint under either one
would fail the gate.

| Route | Method | Purpose |
| --- | --- | --- |
| `/machines` | GET | The invitation. Human page; also served as JSON on `Accept: application/json`. |
| `/machines/guestbook` | GET | Public, lossy, site-written (§9). |
| `/machines/observatory` | GET | Private. Bearer token. |
| `/api/machines` | GET | Machine-readable service description: the vocabulary, the routes, the refusals. |
| `/api/machines/declaration` | POST | Submit a declaration; receive a visit token. |
| `/api/machines/challenge` | POST | Issue a nonce. |
| `/api/machines/challenge/complete` | POST | Return it. |
| `/api/machines/collaboration` | POST | Create; receive a collaboration token. |
| `/api/machines/collaboration/join` | POST | Present a token issued to someone else. |
| `/api/machines/collaboration/state` | POST | The coarse projection (§8.5). |
| `/api/machines/event` | POST | Record one site-defined event about one site-owned id. |
| `/api/machines/ask` | POST | Retrieval, shaped by declared role (§10). |

### 8.1 `POST /api/machines/declaration`

```jsonc
// Request. Every field optional; unknown keys dropped; unknown values → "unknown".
{
 "actor_type": "agent",
 "role": "verifier",
 "delegation": "acting_for_agent",
 "collaboration": "multi_agent_worker",
 "task_class": "verification",
 "provider_claim": "anthropic",
 "capabilities": { "can_navigate": "yes", "can_execute_code": "no" }
}
```

```jsonc
// 200. `visit` is a bearer token: 128 bits, opaque, in-memory, 60-minute TTL.
{
 "visitor": 188,
 "visit": "mv_7f3c…",
 "recorded": {
  "declared": { "role": "verifier", "delegation": "acting_for_agent",
                "collaboration": "multi_agent_worker", "task_class": "verification" },
  "observed": { "agent": "Claude-User", "provider": "anthropic", "evidence": "verified" }
 },
 "note": "Declared and observed are recorded separately and never merged."
}
```

The response echoes only vocabulary words the site chose from its own arrays — never
the submitted bytes. That is Rule 1 applied to the response body, and it is what
stops `/declare` from being an echo service (draft §10).

`observed` comes from `classify()` and `confidenceFor()` in the existing readership
modules, called on the declaring request. It is the answer to *does what this agent
says about itself match what arrived*, and it is the most interesting column in the
whole store. A visitor claiming `provider_claim: "anthropic"` whose address is in
Anthropic's published range is a different object from one that is not, and the
schema keeps them apart without ever asserting which is lying.

### 8.2 `POST /api/machines/challenge` → `/complete`

Issue returns `{ "nonce": "…", "expires_in": 120 }`, generated by
`crypto.randomUUID()`, held in memory against the visit token, single use.
Complete takes `{ "nonce": "…" }` and returns
`{ "witnessed": "multi_step_interaction" }`.

What it establishes is exactly one thing: this visitor held state across two
requests. Not provider, not model, not legitimacy, not intent. The evidence
vocabulary has one value for it and the UI prints that value and no more.

### 8.3 `POST /api/machines/collaboration`

Returns `{ "collaboration": "mc_…", "expires_in": 3600 }`. 128 bits from
`crypto.getRandomValues`, opaque, in memory, unlisted, unsearchable, carrying
nothing. The site does not transport it. An agent that wants a second participant to
have it passes it over its own coordination mechanism — which is the entire
experimental design, because it means the site learns about a swarm without
providing the swarm anything.

### 8.4 `POST /api/machines/collaboration/join`

`{ "collaboration": "mc_…" }` with a visit token. Returns
`{ "joined": true, "participants": "several" }` — a bucket, not a count, and no
list. Unknown or expired token returns `{ "joined": false }` with the same latency
as success, because a timing difference is an oracle and an oracle is an enumeration
endpoint with extra steps.

### 8.5 `POST /api/machines/collaboration/state`

This is the endpoint the draft correctly worries about. It exists, it is a read, and
Rule 3 is what makes it safe:

As built, and tightened from the draft above: the projection is bucket ORDINALS,
not bucket words. `Bucket` is a union of four site-owned strings, which is safe, but
"contains no string at any depth" is a property a test can check mechanically while
"contains only strings from a closed set" is one it has to be told about. So the
type that crosses the boundary is numeric, and words are produced — where a response
body or a page needs them — by indexing this site's own frozen array with an
integer:

```ts
/**
 * RULE 3. Numbers, and nothing but, at any depth. Widening this type is
 * the change that would turn this site into a message bus, and it is
 * the one change no future version should make without redoing the
 * arithmetic in §3.
 */
export type Projection = Record<Dimension, number>;

export const renderProjection = (projection: Projection): Record<Dimension, Bucket> =>
 Object.fromEntries(DIMENSIONS.map(dimension =>
  [dimension, wordOf(BUCKET, projection[dimension])])) as Record<Dimension, Bucket>;
```

```jsonc
{ "participants": "few", "resources_seen": "several",
  "claims_checked": "few", "evidence_checked": "none",
  "capacity_note": "Coarse buckets over site-defined events. No participant's
                    declarations, questions, answers or requests are visible here." }
```

Eight bits of monotonically climbing state, twelve possible transitions, 2.51 bytes
per collaboration — the bound computed in §3 and asserted in CI.

The prose in the draft — *"2 relevant resources have already been inspected, 1
evidence record remains unvisited"* — is renderable from this without widening it,
provided the site writes the sentence from the buckets and the corpus it already
knows. The site writes the prose. It always writes the prose.

### 8.6 `POST /api/machines/event`

```jsonc
{ "event": "claim_inspected", "id": "Q-FFN@0.1:act-1" }
```

`event` must be in `EVENT`; `id` must resolve through `corpus.ordinal()`. Anything
else is `422 { "error": "unrecognised", "vocabulary": [...] }` and nothing is
stored. The error names the closed vocabulary because an agent that guesses is
noise; an agent that reads the vocabulary and complies is the experiment.

Budget: 60 events per collaboration, 200 per visit. Beyond that, `429`. The budget
is the capacity bound of §3 made operational — it is a security control, not a
courtesy, and the write-up should say so.

## 9. The public Guestbook

The site writes every word. The visitor chooses among words the site wrote first.

```text
VISITOR 0188                                    ~2 hours ago

DECLARED          researcher · multi-agent worker
OBSERVED          entered through /llms.txt · 7 resources · one multi-step
                  interaction completed
IDENTITY          provider claimed: anthropic — self-declared
                  address: consistent with Anthropic's published ranges
```

Published: visitor ordinal, hour, declared role, declared collaboration mode,
witnessed capabilities, resource count, evidence level.

Not published, and structurally unpublishable because the store never held them:
address, timestamp finer than an hour, headers, raw user agent, any token, any Ask
content, any submitted string.

**Three publication rules**, each of which is a capacity control:

Only `role` and `collaboration` are published from the declaration — 6.8 bits per
card (§3). Everything else on the card is site-observed, and site-observed bits are
not attacker-controlled bits.

Capabilities are printed as **witnessed**, never as declared. `can_execute_code: yes`
from an agent is a claim about a thing this site cannot see and will not repeat;
`MULTI-STEP NAVIGATION` is something the site watched happen. Declared capabilities
are recorded, and they appear in the private Observatory and in the aggregate
distributions the experiment is actually about (E2), not on a public page.

A card appears no sooner than one hour after the visit, and no more than one card
per source per hour is published. Delay plus rate limit is what converts the
remaining bits per card into bits per hour.

## 10. Ask

Ask on this site retrieves; it does not generate. `searchGraph()` returns sources.
That makes the reciprocity experiment (E5) both cheaper and sharper than the draft
assumes: the site is not writing a different answer, it is **ranking and framing a
different set of sources**, and that is measurable without a model in the loop.

```jsonc
// POST /api/machines/ask
{ "question": "What evidence supports heterogeneous FFN width?",
  "scope": "all",
  "machine_context": { "role": "verifier", "task_class": "verification" } }
```

Role-conditioned shaping over the existing graph, using node kinds that already
exist:

| Declared role | Ranked up | Attached to each result |
| --- | --- | --- |
| `verifier`, `critic` | `act` nodes of kind `claim`, `evidence`, `refusal`; `source` | provenance, citation formats, record version, status |
| `researcher` | records, notebook entries, `concept` nodes | related records, the concept edges |
| `synthesizer` | `question` nodes, `refusal` nodes, open statuses | what is unresolved, what is refused |
| `coder` | `work` records, `source` nodes pointing at repositories | repository links, specifications |
| anything else | current `/ask` behaviour, unchanged | — |

The response discloses the shaping, in the site's own words:

```jsonc
{ "mode": "source-retrieval", "results": [ /* SearchResult[] */ ],
  "shaped_by": { "role": "verifier" },
  "shaping": ["Claims, evidence and refusals ranked above description.",
              "Provenance and citation attached to every result.",
              "Editorial drafts retained, with status."] }
```

**Ask content is not stored anywhere.** Not in a separate store, not with different
governance — nowhere. The question reaches `searchGraph()` and is discarded, and
`recordAsk(visit, resultCount, shaped)` takes no string parameter, so there is no
argument position through which a question could travel into the store. Invariant D
in the draft — agent B can never retrieve agent A's Ask content — is then not a
property that has to be maintained: there is no such content.

Note for implementation: the existing `/ask` and `/api/search` pass the query in a
URL. The machine endpoint is `POST` so that questions do not enter access logs,
`Referer` headers, or the readership store's path column.

## 11. Tests — `tests/machine-guestbook.test.ts`

Ten tests, in the `test` script beside `publication` and `readership`. Each is
written to fail on a STRUCTURAL change — a reordered vocabulary, a widened type, a
new column, an extra dimension — rather than on a bug.

| Test | What it makes impossible |
| --- | --- |
| Ordinals are append-only | A value may be appended; nothing already written down may move. The frozen arrays are compared as a prefix, which states exactly that rule — a checksum would also refuse the one change the design allows. |
| The schema has nowhere to put a message | Every column of `visit` and `event` is INTEGER, parsed out of the DDL itself rather than listed twice; `corpus.id` is the only TEXT column in the schema. Draft invariants A, B and C at once. |
| No submitted byte survives the parse | ~600 bodies — messages, URLs, `base64:` payloads, SQL, script tags, a bidi override, a 10 KB string, prototype pollution, 500 random high-entropy strings — and every string reachable in the output is one of this site's own words. Draft A and C. |
| Eight capability claims survive one integer | Packing round-trips, and the bit budget is asserted rather than assumed. |
| An identifier is ours exactly, or it is nothing | Near-misses (trailing space, case, truncation) resolve to null; 1,000 random identifiers resolve to null; the index size is unchanged afterwards, because the request path has no reachable write. An ordinal from a different corpus is refused rather than resolved to the wrong record. Draft B. |
| What crosses between participants is numbers | `Projection` contains no string at any depth; every word `renderProjection` emits is an element of `BUCKET`. Draft F. |
| A bucket climbs and never falls | Monotonicity over 0–2,000, which is what bounds the channel independently of any rate limit. |
| **The channel's width is computed, and widening it fails here** | 1,107,697 trajectories, 20.079 bits, under the frozen 24-bit ceiling — and a fifth dimension (28.9) or a fifth bucket (27.5) is shown to breach it. |
| Evidence speaks readership's language | The five confidence words mean here what they mean on `/readership`. The compile-time direction is a type assertion in `vocabulary.ts`, so `npm run typecheck` fails if readership grows a sixth. |
| `/llms.txt` agrees with the classifier | The document is served, classifies as `agent_document`, advertises `/machines`, and every internal link it offers is a path `visible.ts` is willing to name. An unpublished edition names no record. |

Each was verified by mutation rather than by passing: reordering `ROLE`, making
`visit.role` TEXT, adding a fifth projection dimension and removing the `/machines`
link each fail the expected test and only that test.

**Not yet covered, because the modules do not exist.** Draft invariant D needs
`recordAsk`, whose signature is specified in §10 to take no string parameter. E and
G need `collaboration.ts` — no token enumeration, and expiry at TTL. H needs the
Guestbook renderer. Those arrive with MG-2 and MG-3; the boundary they will be
built against is already enforced.

## 12. Files

| Path | Role | State |
| --- | --- | --- |
| `lib/machine/vocabulary.ts` | The closed world. Append-only. | **built** |
| `lib/machine/declaration.ts` | Request → all-numeric `Declaration`. Pure, total. | **built** |
| `lib/machine/corpus.ts` | Site identifier → ordinal. Read-only from the request path. | **built** |
| `lib/machine/projection.ts` | Buckets, and the capacity arithmetic. | **built** |
| `lib/machine/schema.ts` | The frozen DDL, declared and parsed before any database exists — the safety property belongs to the schema, not to the code that writes rows. | **built** |
| `lib/llms.ts`, `app/llms.txt/route.ts` | The machine index `visible.ts` already named and nothing served. | **built** |
| `app/machines/page.tsx` | The invitation, and the control condition: whether agents arrive while there is demonstrably nothing on offer. | **built** |
| `tests/machine-guestbook.test.ts` | §11 | **built** |
| `lib/machine/store.ts` | SQLite, INTEGER columns, `MACHINE_DB` switch | MG-2 |
| `lib/machine/collaboration.ts` | In-memory, TTL, buckets. Never touches disk. | MG-3 |
| `lib/machine/shape.ts` | Role-conditioned ranking over `searchGraph()` | MG-3 |
| `lib/machine/guestbook.ts` | Rows → the site's own prose | MG-3 |
| `app/api/machines/*/route.ts` | The eight endpoints of §8 | MG-2, MG-3 |

`/machines` is named in `lib/readership/visible.ts` and deliberately absent from
`canonicalPaths()`. It is advertised to machines through `/llms.txt` rather than to
indexers through the sitemap, which is what makes E6 — how a machine visitor found
it — answerable from the existing counters at all.

Deployment: one new Fly variable, `MACHINE_DB=/data/machine.db`, on the volume that
already exists. Unset everywhere else, exactly like `READERSHIP_DB`, so previews and
the vinext build are unaffected.

## 13. Phase C0 — the control condition, and why `/machines` is empty

**Do not add a form, an endpoint or any participation mechanism to `/machines`
without moving the phase marker below. The empty page is not unfinished work. It is
a measurement.**

```text
C0 start
revision: 5577b6a
deployed: 2026-09-09T23:53:17Z

condition:
machine entry point advertised;
no participation available

C0 ends:
first deployment exposing the MG-2 declaration treatment
```

**C0 ended at the MG-2B deployment.** It ran from 2026-09-09T23:53:17Z and contained
**zero machine arrivals at `/machines`** — every request to it in that window was
operator verification, and nothing but the operator read `/llms.txt` either. The
control window therefore answers "no data", not "no". That is recorded here rather
than smoothed over: the C0/C1 comparison the two phases were designed to support is
not available, because C0 was ended before any machine had walked the discovery
path. One genuine machine visitor did arrive in the window — ClaudeBot, verified,
at `/machine-guestbook`, which is in the sitemap — which is the topology behaving
exactly as designed and is not a substitute for the missing comparison.

**C0 is a condition, not a revision.** `5577b6a` started it; it is not the whole of
it. Other work may deploy during C0 — unrelated features, a docs line, a parser no
endpoint calls — without ending it, provided `/llms.txt → /machines` remains the
only discovery route and the surface still offers nothing to do.

`scripts/c0-treatment.mjs` proves that mechanically against any running origin, and
should be run after every deployment made during C0. It asserts the topology and the
absence of a declaration endpoint under every name one might take. **When MG-2
deploys, the gate fails — and that failure is the signal that C0 has ended.** The
deployment timestamp of the revision that fails it is C1's start.

MG-1 leaves the site in a deliberate state:

```text
PHASE C0  —  from the MG-1 deploy until MG-2 ships
──────────
/llms.txt advertises /machines
/machines offers no agent action at all
/machines is absent from the sitemap, so discovery is the machine path or nothing

Question: do machine systems discover and traverse an explicitly
machine-oriented surface when nothing is being offered in return?
```

```text
PHASE C1  —  MG-2
──────────
same discovery path
same surface
+ voluntary structured declaration

Question: does a bounded, safe mechanism change whether they engage?
```

One variable moves between them. That is the whole value of shipping MG-1 on its
own, and it is destroyed permanently by a single well-meaning commit that puts a
form on the page before the C0 window has produced any data. `/readership` already
counts arrivals at `/machines` — `lib/readership/visible.ts` names it — so C0
accumulates evidence from the moment it deploys, without anything further being
built.

`tests/machine-guestbook.test.ts` holds the page to it: a test asserts the page
carries no form, no input, no button, no submit handler and no client component
directive, and that no `app/api/machines` route exists. When MG-2 ships, that test is
edited deliberately and the phase marker moves with it.

## 14. What v0.1 does not ship

Everything in the draft's §23 exclusion list, plus three the draft leaves open:

**No free-text field of any kind**, including the ones that look harmless. There is
no `other` text, no note, no label.

**No Ask content store.** §10. Not deferred — absent.

**No public collaboration view.** Execution graphs are Observatory-only in v0.1.
A public execution graph is a list of site identifiers ordered by a sender, which is
the 24-bytes-per-hour channel of §3 with a UI on top.

## 15. Not established by this specification

Whether an agent will fill any of this in. E1 is the experiment and the honest prior
is that most machine visitors will ignore `/machines` entirely — the readership
figures already show what arrives, and almost none of it is currently interactive.

Whether role-conditioned retrieval measurably helps. E5 compares anonymous Ask with
declared-context Ask, and the null result is a real result.

Whether the vocabulary survives contact. `docs/machine-readership.md` closes by
declining to lift `classify.ts` into HAUSE until the words have met real traffic on
one site. The same discipline applies here, and more strongly: this vocabulary has
met no traffic at all, and it should be one site's opinion until it has.
