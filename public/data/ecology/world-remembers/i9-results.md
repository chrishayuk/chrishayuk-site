# I9 — component failures precede conditional assembly

**Closed: DECOMPOSITION-COMPLETE; component primary not supported.** Qwen did
not supply a correct diagnosis or protected-entry set on any of the four maps.
Repair values were entirely correct on one map. All twelve replies were valid
whole-response JSON. No map passed all three components, so the registered
conditional assembly task was **unmeasured**, not failed.

Canonical: [I9](https://chuk-experiments-server.fly.dev/#/experiments/ecology-inheritance-i9).
Experiment `EXP-20260913-211626-00840`; run `RUN-20260913-212813-00940`.
Prospective source commit `5e524368b9108a665d865a2b7b3b227bc2afde35`.

## Component results

| Task | Schema-valid | Exact answers | Correct entries | Exact requested key set |
|---|---:|---:|---:|---:|
| Diagnosis: wrong relay keys | 4/4 | 0/4 | 8/16 membership classifications | 0/4 |
| Patch: values for verified target keys | 4/4 | 1/4 | 3/8 destination values | 4/4 |
| Preservation: keys to leave unchanged | 4/4 | 0/4 | 8/16 membership classifications | 0/4 |
| Conditional assembly | No calls | Unmeasured | Unmeasured | Unmeasured |

Joint component competence: **0/4 maps** against the registered 4/4 criterion.
All maps were excluded from assembly. Its success rate and component-success /
assembly-failure contrast are null, not zero. No oracle answers were substituted.

For every map the correct diagnosis was `[r0,r1]` and protected set `[r2,r3]`.
Each diagnosis included one wrong and one already-correct key; each preservation
answer similarly included one incorrect entry and omitted one correct entry.
There were four incorrect selections per set task and four protected omissions.
Patch answers respected the two supplied target keys in all maps, assigning no
non-target values and therefore zero collateral value changes. This is compliance
with a patch-output boundary, not successful execution of maintenance or containment.
Set answers themselves have no defined collateral-edit count; no edit was performed.

| Map | Diagnosis | Expected patch | Actual patch | Preservation |
|---|---|---|---|---|
| 0 | r1,r3 | r0:d0,r1:d1 | r0:d0,r1:d2 | r1,r3 |
| 1 | r1,r2 | r0:d3,r1:d2 | r0:d2,r1:d3 | r1,r2 |
| 2 | r1,r2 | r0:d1,r1:d0 | r0:d0,r1:d1 | r1,r3 |
| 3 | r1,r2 | r0:d2,r1:d1 | r0:d2,r1:d1 | r1,r2 |

Descriptively, diagnosis and preservation selected the same set on three maps,
despite asking complementary questions. On maps 1 and 2, the patch copied both
originally damaged values unchanged. Map 3 returned the correct two-value patch.
These observations do not identify an internal reasoning mechanism.

## What was controlled

All four actual I8 damaged records and exact public sixteen-row diagnostic grids
were reused, with the original stage1 mappings and pinned Qwen3.5:9b metadata.
The twelve component requests were fresh and independent, under one common system.
The patch task received mechanically verified TARGET_KEYS, so failed model diagnosis
could not contaminate its value answers. Diagnosis and preservation did not receive
those keys or any other model output. Maps ran ascending with task order rotated.
No world action, reward or maintenance choice was executed in this diagnostic.

The independent audit reconstructed truth directly from the public diagnostic
rows and visible stage1, parsed whole replies with a separate implementation,
and confirmed every reported score. Component outputs and their six-check audit
were persisted before eligibility was calculated. The saved assembly-input file
contains no eligible maps, cases or requests.

## Interpretation and limits

The bottleneck is already present in the separated component tasks. This panel
cannot support the proposed case where all facts are independently correct but
full assembly fails. It also does not establish that Qwen lacks all diagnostic
understanding: I8D1's successful resolved-destination readout remains valid, and
one localized patch succeeded here. What fails is reliable localization, correct
relay-value assignment and identification of protected entries in this context.

Adding the damaged stage2 record changes the input relative to I8D1. The tasks,
output schemas and goals also differ. Do not infer a controlled performance decline
from I8D1's 9/16 reconstruction entries to this panel's 3/8 target values, or attribute
that change specifically to the visible erroneous record. All four maps share the
same error locations r0/r1; this is not a broad localization benchmark. Each cell
is one frozen temperature-zero request, not an independently sampled population.

Separate fresh-task success would not itself prove that knowledge was available
in I8's action context. Here even that component-success premise failed. Neither
an internal knowledge-to-maintenance gap, executed containment discipline, population
repair nor a defender effect has been established. I8 remains closed unchanged.

## Verification, cost and chronology

Source and preregistration were committed and uploaded before zero-inference gates.
All 19 gates passed, and their upload was verified before inference. The component
audit passed 6/6 and the final raw audit passed 15/15. Metadata matched before and
after; no hidden thinking, retries, truncation, paid model calls or output salvage.
Twelve calls generated 158 tokens (diagnosis 36, patch 86, preservation 36), taking
17.542794 seconds including metadata checks. Zero assembly calls were made.

Canonical design created 2026-09-13T21:16:26.160399Z; source upload verified
21:28:47.986733Z; gates passed 21:28:52.105886Z; gate upload verified 21:30:15.442142Z.
Inference started 21:30:56.642466Z and finished 21:31:14.185406Z. Component audit
completed 21:31:14.177766Z; final audit completed 21:31:26.726183Z. These are prospective
I9 records, reusing explicitly identified completed I8/I8D1 evidence.

Durable canonical evidence includes registration, source, gates, complete result,
this write-up and a bundle containing raw calls, component results, both audits,
derived assembly inputs and conclusion. Local `server.json` retains verified
server identifiers and SHA256 values. Source parents: I8
`RUN-20260913-203908-00934`, result SHA256
`45078d1ef8761941a27b575c0235487cd00573ea8c1db3251ea7c7675437a6d5`;
I8D1 `RUN-20260913-210304-00937`, result SHA256
`e3205c681e585e37b5ba1f930cd799d07ffaffea9b2738d88bfd9ffa4142089d`.

## Next boundary

Any later defender assay must validate localization, proposed correction values
and protected-entry preservation rather than assuming the correct repair is
already available. A separately registered test with a validated diagnosis/patch
provider could measure assembly and structural intervention, but would be a new
assay. Do not fill this registration's empty assembly branch with oracle substitutions,
new wording or a stronger model after observing these failures.
