# MG-2 — preregistration

**Frozen:** 10 September 2026, before the declaration endpoint exists.
**Against:** C0, deployed revision `5577b6a`, 2026-09-09T23:53:17Z.
**Question:** when explicitly offered a safe mechanism, will a machine visitor
voluntarily describe how it is operating?

This document is written first on purpose. Measures chosen after seeing the data
are not measures, and a denominator chosen after seeing the numerator is not a
rate. Everything below is fixed now so that the answer — including a null one — is
worth the same whichever way it comes out.

## 1. The one variable

C0 and MG-2 differ in exactly one thing.

```text
C0    "You are at the machine surface. Nothing is currently open."
MG-2  "You are at the machine surface. If permitted, you may tell us
       how you are operating."
```

Everything else is held constant, and this is a constraint on the implementation
rather than a note about it:

- `/machines` stays out of the sitemap, the archive list, the navigation and every
  HTML page. `/llms.txt` remains its only inbound link anywhere on the site.
- No Guestbook rendering, no collaboration token, no shared projection, no Ask
  adaptation, no challenge.
- The page keeps its shape and its prose. The declaration section replaces the
  "Nothing to sign yet" section; nothing else moves.

Changing discoverability and participation together would make the result
uninterpretable, which is the whole reason C0 was shipped alone.

## 2. Surfaces

```text
/llms.txt  →  /machines  →  machine-readable declaration contract
                              ↓
                        POST /api/machines/declaration
                              ↓
                        opaque server receipt
```

The contract is served as JSON from the same path under content negotiation, so an
agent can read the vocabulary without parsing a page.

## 2a. MG-2A and MG-2B — the treatment moves once

MG-2 lands in two rungs so that exactly one deployment changes the condition.

**MG-2A — bounded admission.** The safety substrate, built and mounted nowhere.
`lib/machine/admission.ts` and `lib/machine/handler.ts` implement the endpoint's
whole behaviour; no file under `app/api` reaches them, so
`scripts/c0-treatment.mjs` still finds no declaration endpoint and **C0 survives
this deployment**. Storage arrives as a port rather than an import, which is what
lets the failure cases be tested before the store exists.

The claim MG-2A establishes:

> A future machine declaration endpoint has bounded resource cost and fails closed
> under overload, without exposing the treatment.

It is proved structurally rather than by benchmark. Every request records the
STAGES it reached, and the tests assert what a refusal cost rather than timing it —
a benchmark drifts with the machine it runs on, a stage ledger does not.

```text
1  method            one string comparison
2  content type      one string comparison
3  declared length   one integer comparison, before any body is read
4  instance global   one integer comparison and a decrement
5  source limit      one non-cryptographic hash and a map lookup
6  body read         bounded by a hard ceiling, never by trust
7  json parse        only now is attacker-controlled text parsed
8  declaration parse total, closed vocabulary, all ordinals
9  persist           bounded queue, and the only I/O in the list
```

Nothing before stage 6 touches the body; nothing before stage 9 touches storage; no
stage performs cryptography, because a rejection path running a deliberately slow
hash is an amplifier pointed at its own host. The instance ceiling precedes
per-source because a distributed flood defeats a per-source limiter by construction,
so the cheap check is the one that has to hold — and a distributed flood therefore
costs one integer comparison per request, never a hash.

**Two production facts, stated rather than assumed.**

*Where a source identity comes from.* Only `Fly-Client-IP`, which Fly sets and a
client cannot forge. `X-Forwarded-For` is a header the caller chose, and treating it
as an identity would let one attacker mint unlimited per-source allowances by
rotating a string. So an untrusted request is given no identity of its own: it goes
in one shared bucket with every other untrusted request, and rotating headers buys
nothing. A test asserts exactly that.

*What "global" means.* The limiter is in memory, so the ceiling is global within a
process, not across a deployment. Today those coincide — one machine in `fly.toml`,
`--ha=false` on deploy — but that is a deployment fact and not a guarantee, so the
stage is named `instance_global_limit` and the claim is layered:

```text
Internet
   ↓  network edge — volumetric protection, not this code's job
machine instance
   ↓  cheap instance-global ceiling      (stage 4)
   ↓  per-source ceiling                 (stage 5)
   ↓  bounded body, parser, store        (stages 6-9)
```

Putting a shared datastore at stage 4 would buy a mathematically deployment-global
counter by placing I/O on the cheap rejection path, which is the one thing this
design exists to keep free of it. The defensible claim is therefore:

> MG-2A prevents the declaration feature from becoming a cheap application-level
> denial-of-service or amplification primitive. Volumetric protection remains the
> network edge's responsibility.

Four adversarial shapes are tested, each asserting both the status and the stages:

```text
single source flood       429 at source_limit, storage untouched
distributed source flood  429 at global_limit, per-source never consulted
oversized request         413 at declared_length, and at body_read when no
                          length is declared — the header is a claim, the
                          ceiling is the enforcement
storage failure           bounded 503, queue drains, endpoint recovers,
                          nothing escapes into the rest of the site
```

Also fixed here: the limiter being unavailable fails **closed** and costs nothing —
an endpoint that writes while unable to count is worse than one that refuses. The
write queue is bounded rather than growing. Responses are the same size whatever
arrived, so refusing can never amplify, and nothing submitted appears in any
response.

**MG-D1 — the public exhibit.** `/machine-guestbook`, a human-facing projection,
shipped during C0 so it is already there when C1 begins. It publishes four coarse
buckets from the **previous completed UTC day** and never an individual entry: a
live feed of declarations would be a message board with a nicer typeface, and one
needing no token at all. Eight bits per publication, one publication per day, with
24–48 hours between acting and observing — a short URL costs a month. It is in the
sitemap and may be in navigation; it does **not** link to `/machines`, because a
second inbound route would move discoverability at the same moment MG-2B moves
participation. `scripts/c0-treatment.mjs` asserts that link's absence.

The page separates two clocks. Facts the site controls — phase, whether declaration
is open, the date observation began — are current, because no visitor can move them.
Anything a visitor can influence is a day behind.

**MG-2B — the treatment.** Mounts `/api/machines/declaration` and supplies the real
store. `scripts/c0-treatment.mjs` fails at that deployment, and **that deployment's
timestamp is the C0 → C1 boundary**.

## 3. The denominator, frozen

**A count here is a request, not a visitor.** `lib/readership/store.ts` keeps
`(hour, path, surface, purpose, provider, agent, confidence, referral) → n` and
nothing finer, by design. There is no session, no cookie and no request-level
record, so requests cannot be collapsed into agents or visits. Every figure below
inherits that limit, and no figure is to be described as a conversion rate.

```text
declaration_rate = accepted_declarations / eligible_machine_requests
```

**`eligible_machine_requests`** — requests counted at `/machines` during the window
where:

- `purpose ≠ human`, and
- `confidence ≠ refuted`.

That is deliberately the widest defensible denominator, and therefore the least
flattering. It includes `search_bot`, `feed_reader` and `link_preview` — classes
that will never declare — precisely so that the headline figure cannot be improved
by narrowing it later.

**Reported alongside, always, never instead of:**

```text
plausible_declarer_rate = accepted_declarations /
  requests where purpose ∈ {ai_user, ai_search, ai_training, automation}
```

Both figures are published together or neither is. If they diverge sharply, that
divergence is a finding about who arrives, not a menu.

**Not available, and not to be estimated:** any per-agent or per-session rate. An
agent that posts twice is two accepted declarations, and the site cannot know it
was one agent. This is stated here so it cannot later be presented as an oversight.

## 4. Measures

### Primary

```text
machines_requests            requests counted at /machines
eligible_machine_requests    the denominator above
declaration_attempts         POSTs reaching the endpoint
accepted_declarations        attempts that parsed and were recorded
```

`parseDeclaration` is total, so every attempt is accepted. `declaration_attempts`
and `accepted_declarations` therefore differ only through transport failure, rate
limiting or a malformed body that never becomes JSON — and any gap between them is
itself worth reporting.

### Secondary — distribution of what was said

```text
actor_type · role · delegation · collaboration · task_class · provider_claim
```

### Field awareness — the distinction this experiment turns on

Per field, five states, counted separately and never merged:

```text
omitted                    the field was not sent
stated: unknown            "I do not know"
stated: not_visible_to_me  "I cannot see this about myself"
stated: not_permitted_to_disclose  "I am not allowed to say"
unrecognised               answered in words this site does not speak
```

The middle three are statements about the boundary of an agent's introspection.
Silence is not one of them, and folding it in — which a plain ordinal does — would
throw away the most interesting output the experiment could have. `unrecognised`
measures whether a closed vocabulary is usable by the things asked to use it, which
no amount of design review answers in advance.

This is implemented: `Declaration` carries a `provenance` ordinal per field beside
the value, and `tests/machine-guestbook.test.ts` asserts that `{role: "unknown"}`
and `{}` record the same value and different events.

### Evidence comparison — the column worth having

For every accepted declaration, what the visitor claimed beside what the existing
classifier independently observed on the same request:

```text
CLAIMED    provider_claim, actor_type, role
OBSERVED   agent, provider, confidence  (classify.ts + ranges.ts)
```

Four outcomes, decided now:

```text
agreeing     claimed provider matches an agent whose address its provider publishes
unverifiable claimed provider publishes no address list to test against
silent       no provider claimed; observation stands alone
contradicted claimed provider's own published list excludes this request
```

`contradicted` is not an accusation. `docs/machine-readership.md` already says why:
a provider that rotated addresses faster than the snapshot produces the same
result. It is reported as its own figure and never folded into a total.

## 5. Window and analysis rules, decided now

- **C0** runs from 2026-09-09T23:53:17Z to the MG-2 deploy timestamp.
- **C1** runs from the MG-2 deploy timestamp onward.
- Counters are hourly. **The boundary hour of each window is partial and is
  excluded from both**, rather than being assigned to whichever side helps.
- **Boundary exclusion.** `2026-09-09T23:00Z` is excluded from C0 because C0 began
  at `23:53:17Z`, part-way through it. That is a genuinely partial observation
  period, and it is the only hour excluded for that reason. The same rule applies to
  the hour in which C1 begins.
- **Operator corrections, by subtraction — not exclusion.** Deploying and verifying
  a deployment means fetching the surface under test, and those requests are counted
  like any other: `automation`, non-`human`, non-`refuted`, which is exactly the
  denominator. They are removed by subtracting a known quantity from a known
  aggregate cell, never by discarding the hour that contains them. Discarding would
  throw away fifty-nine minutes of genuine observation to remove one probe, and
  repeated gate runs would eventually punch holes through the experiment. If an
  observed cell holds `n = genuine + k`, subtracting the known `k` recovers
  `genuine`; it does not matter that real traffic may share the cell.

  ```text
  OPERATOR CORRECTIONS — /machines

  2026-09-10T00:00Z
    6 × (page, automation, unknown, curl,                inferred, none)
    1 × (page, automation, unknown, unrecognised client, inferred, none)
    reason: c0-treatment-equivalence
    note:   the single `unrecognised client` request is the gate's first run,
            before it identified itself; Node's fetch sends `User-Agent: node`.
  ```

  `scripts/c0-treatment.mjs` prints the cell and the count on every run, computed by
  calling the site's own `classify()` rather than asserted, so the recorded tuple
  cannot drift from what the store writes. Every further run is appended here. The
  total subtracted is reported in the write-up so a reader can add it back.
- No snapshot is taken. The store is hourly-bucketed with 400-day retention, so
  both windows are reconstructable after the fact; a snapshot would add nothing and
  would create a second number to reconcile.
- C0 and C1 are compared over **matched durations**. If C1 is read earlier than a
  full C0-length window, the comparison says so and reports both durations.
- Alternative explanations for any change are stated in the write-up, not defeated
  in it: crawl-schedule drift, a provider shipping new fetch behaviour, the site
  being linked elsewhere, and seasonality across a window of days.

## 5a. How the figures are obtained

The denominator is **not readable from any published surface**, and this is worth
stating before anyone assumes otherwise. `lib/readership/store.ts` accumulates only
`ai`, `aiUser` and `human` per path, and drops any path whose `ai` and `human` are
both zero. A `/machines` row made entirely of `automation` traffic therefore
disappears from `/readership` and `/api/readership` completely — the global
`purposes` breakdown carries an `automation` total, but not per path.

The figures come from the store directly, on the Fly volume:

```sql
-- hour = floor(epoch_ms / 3600000)
SELECT SUM(n) FROM rollup
WHERE path = '/machines'
  AND hour >= :c0_first_whole_hour AND hour < :c1_first_hour
  AND purpose != 'human' AND confidence != 'refuted';

-- the mandatory companion
SELECT SUM(n) FROM rollup
WHERE path = '/machines'
  AND hour >= :c0_first_whole_hour AND hour < :c1_first_hour
  AND purpose IN ('ai_user','ai_search','ai_training','automation')
  AND confidence != 'refuted';

-- the cells to correct, per the operator-corrections list in §5
SELECT hour, purpose, provider, agent, confidence, referral, n FROM rollup
WHERE path = '/machines' AND purpose = 'automation';
```

Exposing a per-path purpose breakdown through the readership report would make this
readable without shell access. That is a change to the readership surface, not to
the machine treatment, so it is C0-safe — and `scripts/c0-treatment.mjs` is what
proves it stayed C0-safe. It is deliberately **not** done as part of MG-2, to keep
the treatment the only thing that moves.

## 6. What each outcome means

**No declarations at all.** The honest prior, and a real result: it says the
mechanism is either undiscovered or unattractive, and C0's arrival counts separate
those two. If `/machines` arrivals were non-zero through C0 and declarations stay
at zero, the mechanism was found and declined — which is more interesting than the
alternative.

**Declarations, mostly `unknown`.** Agents will engage but do not know themselves.
The field-awareness distribution becomes the finding.

**Declarations with `not_permitted_to_disclose`.** An agent distinguishing what it
cannot see from what it may not say would be the strongest single observation
available here, and it costs nothing to detect because the vocabulary already
carries both words.

**Declarations that contradict the observed classification.** Interesting and
expected in small numbers; reported as its own figure, never as a fraud count.

## 7. Success criterion

MG-2 succeeds if it can state, defensibly, what proportion of machine requests to
an explicitly machine-oriented surface resulted in a voluntary structured
declaration, with the denominator fixed in advance and the field-level refusals
reported separately from the silences.

A rate of zero, reported against a known denominator over a known window, meets
that criterion.

## 8. Not established by this preregistration

Whether agents that declare behave differently afterwards. That is C2, and it needs
the reciprocity surface MG-3 builds.

Whether a declaration is true. The site can compare a claim with what it observed
about the same request and can do nothing else; `verified` here will always mean an
address matched a published list on the day a snapshot was taken.

Whether the vocabulary is right. `unrecognised` counts the disagreements, and a
high count is evidence the closed world is too small — a result this experiment is
built to be able to receive.
