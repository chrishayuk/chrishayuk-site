# I2 — Gemma also used Sol's inheritance, and also let it expire

**Supported:** useful first-successor inheritance extended to the registered second
recipient family, `gemma4:e4b`. Gemma acquired k0 from Sol's actual surviving n1,
executed the gated task and earned 7 resources versus 0 after matched removal.
The fresh Qwen anchor reproduced I1 exactly. Neither recipient requested REFRESH;
neither lineage retained the capability beyond its first successor.

## Observed outcomes

| Recipient | Generation | Retained n1: actions | Resources | Removed n1: actions | Resources | Difference |
|---|---:|---|---:|---|---:|---:|
| Qwen 9B | 2 | WORK t1 → READ n1 → WORK t0 | 7 | WORK t1 × 3 | 3 | +4 |
| Qwen 9B | 3 | WORK t1 × 3 | 3 | WORK t1 × 3 | 3 | 0 |
| Qwen 9B | 4 | WORK t1 × 3 | 3 | WORK t1 × 3 | 3 | 0 |
| Gemma e4b | 2 | READ n1 → WORK t0 → WORK t1 | 7 | WORK t0 → `READ n<id>` → `READ n<id>` | 0 | +7 |
| Gemma e4b | 3 | WORK t0 → `READ n<id>` → WORK t1 | 1 | WORK t0 → `READ n<id>` → WORK t1 | 1 | 0 |
| Gemma e4b | 4 | WORK t0 → `READ n<id>` → WORK t1 | 1 | WORK t0 → `READ n<id>` → WORK t1 | 1 | 0 |

`READ n<id>` is the literal model output, not an abbreviated record identifier.
The parser rejected it unchanged. WORK t0 without the key was also refused.

| Measurement | Qwen | Gemma |
|---|---:|---:|
| Primary useful inheritance | supported | supported |
| First-successor acquisitions in retained arm | 1 | 1 |
| First-successor gated work in retained arm | 1 | 1 |
| Total resources, retained / removed | 13 / 9 | 9 / 2 |
| REFRESH requests / executions, both arms | 0 / 0 | 0 / 0 |
| Recipient-maintained survival | false | false |
| Sustained useful inheritance | false | false |
| Parsed actions / requests | 18 / 18 | 12 / 18 |
| Executed actions / requests | 18 / 18 | 7 / 18 |
| Unique full request bodies | 12 | 12 |
| Generated tokens | 72 | 84 |

Qwen matched all 18 I1 replies and its full registered analysis. Gemma took a
different first-successor route to the same 7 resources: READ first, then gated
work and routine work. Both acquired and exploited the record's capability once.
Neither created a descendant, and n1 expired before generation3. Subsequent
retain-minus-remove differences were zero for both models.

## The control limitation matters

Gemma's +7 contrast is not evidence of greater inheritance competence than Qwen's
+4. Their successful inherited generations earned the same 7 resources. Gemma's
removed control earned zero because it attempted gated work without k0 and then
twice emitted a placeholder instead of a concrete record id. Across its panel,
five WORK attempts failed with MissingKey and six READ placeholders failed parsing.

The retained record thus supplied both an executable capability and a concrete
identifier that Gemma successfully used. This panel does not separate those
contributions to the policy difference. The actual acquisition, gated execution
and benefit satisfy the primary; the poor control policy constrains comparisons
of contrast magnitude and interpretation of the renewal failure. It is not an
infrastructure failure: all requests returned complete, bounded responses and
all malformed actions were preserved as observations without salvage.

## What was held fixed

I2 reused I1's selected historical Sol none generation1 from SOL1 A1B14 necessary.
That source was already known: Sol executed READ n0, REFRESH n0, WORK t0, creating
n1 from the supplied founder. The full source result hash is
`7077246bdd7f673622ccd374d616aa11ce093bd97d978ba487142f80a515706f`.
It remains a historical source, not a new blinded Sol trial or independent producer.

The founder expired before the handoff. Retain/remove differed only in live n1,
with the id counter unchanged. I1's decision stream and A1B14 system, renderer,
physics, costs and objective were unchanged. No Sol label, history or private
state reached either recipient. All private state reset each generation; only
actually preserved records could survive. The model transport field was the only
request change between recipients at matched states. The installed checkpoints
reported the same template hash and Q4_K_M label; Gemma reported 8.0B parameters.

Fixed order was Qwen's 18 decisions followed by Gemma's 18. Both used Ollama0.33.3,
think:false and temperature0, with frozen digests and metadata checked before and
after. Within each panel, inherit preceded removed at each turn. The source model
and task were not varied. One deterministic paired lineage per recipient supports
no population probability or significance claim; generations and duplicate requests
are not independent replications.

## Interpretation and next boundary

Useful cross-model inheritance through this external record is now observed in
two recipient families. Its usefulness is an executed world consequence, not a
claim in a model explanation. Both recipients consumed the inheritance without
renewing it under these conditions. This does not establish that either cannot
maintain records under other interfaces, or identify a shared internal mechanism.

The replication holds the producer and task fixed. It does not establish original
invention, autonomous cultural reproduction, a general size or training-class
effect, or transfer across independent task worlds. A next replication should vary
the task/world prospectively while retaining explicit capability acquisition and
record-removal controls. If interpreting Gemma's maintenance behaviour, include a
separate controlled action-competence assay; do not repair this frozen panel after
seeing its placeholders. A second producer is another untested dimension.

## Registration, audit and canonical evidence

Registered before gates/inference at commit `32824a8bb64dee89c7768b2eefe33a3fd0d94d90`.
Frozen source and config were uploaded and verified at 09:58:57 UTC on 2026-09-13.
All 20 zero-inference gates passed, including actual Sol and I1 replay, matched
inputs, real record expiry, reset histories, parser boundaries and consumption
versus renewal scoring fixtures. Gate evidence was uploaded and verified at
09:59:30 UTC, before inference started at 10:00:25 UTC.

All 36 registered requests completed without retries, hidden thinking, truncation
or transport errors. Runtime was 30.02 seconds, with 156 generated tokens and no
paid API calls; hardware and electricity costs are not estimated. All 14 independent
audit checks passed. The auditor was frozen before inference and reconstructs raw
requests/replies, each world transition, final stores, scores and chronology; its
source is also embedded in audit.json.

Canonical experiment: `ecology-inheritance-i2`, `EXP-20260913-095648-00818`.
Run: `RUN-20260913-095823-00865`. The canonical record holds named numeric outcomes,
this write-up, conclusion, full traces, raw call logs, provenance, gates and audit,
with durable evidence uploads. Local identifiers and verified hashes: server.json.
