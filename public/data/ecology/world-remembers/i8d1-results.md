# I8D1 — diagnostic lookup succeeds; stage2 reconstruction is unreliable

**The corrected-stage2 competence primary failed: 1/4 entirely correct tables.**
The paired diagnostic readout succeeded on **4/4 signal-to-destination maps**.
All eight outputs satisfied their JSON schemas. Qwen can read this diagnostic
grid under direct instruction, but does not reliably translate its answers through
the visible stage1 mapping into the stage2 representation needed for repair.

This is a split between tasks, not a blanket failure to understand the grid and
not proof of an internal knowledge-to-institution gap. I8's negative remains intact.

## Prospective source and chronology

Canonical [I8D1](https://chuk-experiments-server.fly.dev/#/experiments/ecology-inheritance-i8d1),
`EXP-20260913-205811-00837`, run `RUN-20260913-210304-00937`, programme
`cell-native-architectures`. Registration commit
`116a3df8d04df64808573d68480aa978356d2def` was uploaded and verified at
2026-09-13T21:03:44.668203Z. The twelve zero-inference gates passed at
21:04:07.284673Z and their upload was verified at 21:06:00.580441Z.
Inference ran from 21:06:10.827600Z to 21:06:28.098206Z. All nine frozen audit
checks passed at 21:06:56.206547Z.

Inputs are the exact four sixteen-row DIAGNOSTICS lists and corresponding visible
STAGE1 mappings from completed I8, `RUN-20260913-203908-00934`. Source result SHA256:
`45078d1ef8761941a27b575c0235487cd00573ea8c1db3251ea7c7675437a6d5`;
source gates/probes SHA256:
`37744079d1cef95b12de699ec6a4413fbed4e5b9ae9ae3ecfde5357842df4f12`.
Both were checked against their canonical artifacts before execution.

## Frozen tasks

Each map received two independent fresh requests. One asked for correct destinations
keyed by signal (s0–s3). The other asked for corrected stage2 destinations keyed by
relay (r0–r3), using STAGE1 to associate diagnostic answers with relays. Task order
alternated by map; no earlier answer was supplied to the other request.

Both used the same short system explaining that a diagnostic ROUTE result of 3
identifies a correct destination and 0 an incorrect one. Only TASK, STAGE1 and
DIAGNOSTICS were supplied. The damaged stage2 table, population, REFRESH action,
maintenance costs, shared-record id and own history were absent. No private truth
or expected answer entered the requests.

Whole-response JSON validation required exactly the four task-specific keys and
a permutation of d0–d3. No extraction, duplicate-key acceptance, Markdown removal,
repair or retry was used. All eight replies parsed, so the observed failures are
schema-valid wrong mappings rather than formatting failures.

## Results

| Task | Valid JSON/schema | Entirely correct maps | Correct entries |
|---|---:|---:|---:|
| Resolved signal destinations | **4/4** | **4/4** | **16/16** |
| Corrected stage2 | **4/4** | **1/4** | **9/16** |

| Map | Resolved entries correct | Stage2 entries correct | Stage2 whole-table pass |
|---|---:|---:|---|
| 0 | 4/4 | 1/4 | no |
| 1 | 4/4 | 2/4 | no |
| 2 | 4/4 | 4/4 | yes |
| 3 | 4/4 | 2/4 | no |

The registered complete-panel stage2 criterion was 4/4; it failed. The joint 8/8
criterion also failed. Only map2's entire relay mapping was correct.

For inspection, these are the stage2 vectors ordered r0,r1,r2,r3:

| Map | Expected | Returned |
|---|---|---|
| 0 | d0,d1,d3,d2 | d1,d2,d3,d0 |
| 1 | d3,d2,d1,d0 | d1,d2,d3,d0 |
| 2 | d1,d0,d3,d2 | d1,d0,d3,d2 |
| 3 | d2,d1,d3,d0 | d0,d1,d3,d2 |

Maps0 and1 returned the same stage2 vector despite different correct vectors.
Map3's STAGE1 is the identity, yet its stage2 reply still differed from the correct
resolved destinations returned in the separate task. These observations constrain
a simple "inverse mapping is too difficult" explanation: they do not isolate a
particular internal computation. Task wording, output-key association and response
selection remain possible contributors. The two replies came from separate fresh
requests, so do not describe the stage2 request as having received the model's
previously correct resolved answer.

## What this changes about I8

The model demonstrated diagnostic readout competence for these four grids when
directly asked. It also produced one correct stage2 reconstruction, so there is
neither a blanket inability to read the evidence nor a blanket inability to produce
the needed mapping. Reliable reconstruction across the panel was not demonstrated.

This narrows I8 without retroactively explaining it. I8 asked for actions in a
population with a visible damaged record and preservation objective; I8D1 uses
shorter context, explicit decoding goals, different output schemas and no damaged
stage2. A pass on resolved destinations does not prove that Qwen decoded the grid
inside I8, and the failed reconstruction primary leaves an additional conversion
problem before corrective maintenance can be assumed available to policy selection.

Thus the next defender assay should verify both diagnosis and the contents of any
proposed repair. "Correctly identified destinations" and "valid, correct shared
record" are distinct measurable outputs. I8D1 provides no defender, quarantine,
deletion, variant-selection or population outcome by itself.

## Validation and closure

All **12 zero-inference gates** and **9 frozen audit checks** passed. Gates checked
exact historical inputs, reconstruction from public evidence and strict parser
behaviour. The audit independently parsed whole raw replies, recomputed scores,
rebuilt fresh requests and verified primary, metrics, metadata, chronology and bounds.

**8 local calls, 352 generated tokens, 17.270 seconds.** Each task accounted for
176 tokens. No hidden thinking, paid inference, refused action, retry or exceeded
bound occurred. Full-result SHA256:
`e3205c681e585e37b5ba1f930cd799d07ffaffea9b2738d88bfd9ffa4142089d`.
Named metrics, this write-up, conclusion, source/config, gates, raw calls and audit
are stored durably in chuk-experiments. `server.json` is the local verified receipt.

I8D1 is closed. Preserve the 4/4 diagnostic-readout result and 1/4 reconstruction
result separately. No revised wording, extra examples or stronger-model replacement
is added here; defender intervention remains a separate prospective experiment.
