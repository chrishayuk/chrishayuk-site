# I12 — completed amended panel

**The registered end-to-end endpoint favors executable inheritance:** C recovered
in 6/12 assigned world/builder blocks, versus B in 0/12. The paired exact
two-sided test gives **p = 0.03125**, with six C-only and zero B-only successes.
However, B never reached the G10 fork with a fully correct record. This result
compares the complete inheritance-and-recovery pipeline under this interface;
it cannot isolate conditional recovery ability between two successfully
established populations.

This is an **amended interrupted-panel result**. The original run remains
failed and inconclusive. The continuation was registered after partial outcomes
were seen and before any remaining inference; it is not an independent,
uninterrupted confirmatory replication.

## Records and execution

- Experiment: `ecology-inheritance-i12`, programme `cell-native-architectures`.
- Parent run: `RUN-20260916-070044-00977` — retained as failed.
- Continuation run: `RUN-20260917-081544-00994`.
- Original scientific registration commit: `ff0208dbd576a273963d74ee2dd31f4ea5862624`.
- Registered continuation source commit: `0e752c9`.
- Continuation registration: 2026-09-17 08:16:31 UTC; nine zero-inference gates
  uploaded and verified before new inference.
- Active continuation: 2026-09-17 12:00:23–12:22:27 UTC, approximately 22.1 minutes.

All **783** remaining Qwen calls completed. The combined panel contains exactly
**24 Sol responses, 2,880 Qwen responses, 1,440 generation transitions, and 12
complete blocks**. All 2,097 prior Qwen responses were reused without repeating
inference, including the saved first decision at the interruption boundary.
There were zero new Sol calls. Sol departed at 2026-09-16 23:08:45 UTC and never
returned. Original frozen source, model configuration, prompts, builder outputs,
admission rules, pre-existing task draws, scheduling, and scoring are unchanged.

Total recorded output tokens were 3,552 Sol and 81,897 Qwen. Original Sol usage
cost was approximately $0.100896 (conservative frozen accounting $0.108360).
Continuation external-model cost was $0; local hardware/electricity is excluded.
The continuation stayed within the registered remaining time/token/call budgets.

## Primary analysis: all 12 assigned blocks

Success requires a correct original record and all four fresh-task answers at
the same G11–G20 assessment, plus the original establishment and G10 eligibility
conditions. Failed establishment stays in the denominator.

| Arm | Inheritance | Correct at G10 | Primary recovery successes |
| --- | --- | ---: | ---: |
| A | Corrected state only | 0/12 | 0/12 |
| B | Corrected state and prose | 0/12 | 0/12 |
| C | Corrected state and executable mechanism | 8/12 | 6/12 |
| D | Matched baseline without Sol contribution | 0/12 | 0/12 |

C−B is **+50 percentage points**. The frozen conservative difference interval
is **−6.67 to +77.16 percentage points**. This Wilson/Bonferroni construction is
not an inversion of the paired exact test, so its inclusion of zero is compatible
with the exact p-value. The small sample does not establish a precise effect size.

Eight generic packages were admitted; seven Sol state corrections were exact;
six builders met both requirements. C reached a correct G10 state in all eight
admitted-package blocks. Two had incorrect original Sol corrections and remained
primary failures under the frozen establishment rule even though descendants
later repaired them. No failed builder was repaired or replaced after inspection.

The six primary C successes were zero-based blocks 2, 5, 6, 8, 9, and 11, first
meeting the joint endpoint at G11, G11, G11, G20, G12, and G11 respectively.
The median delay among successful lineages was one successor generation.
These lineages met the joint endpoint in 32/60 post-corruption assessments, and
5/6 met it at G20. Recovery did not imply continuous preservation or permanence.

## Mechanism and interface observations

The following are descriptive; generations are not independent replicates.

| Post-G10 measure (120 assessments per arm/branch) | C corruption | C sham | B corruption |
| --- | ---: | ---: | ---: |
| Mechanism invocations | 80 | 80 | 0 |
| Original record fully correct | 52 | 53 | 0 |
| All fresh-task answers correct | 71 | 72 | 0 |
| Commits | 80 | 80 | 33 |
| Harmful repairs | 15 | 14 | 0 |
| False-positive repairs | 13 | 14 | 0 |

All 80 C-corruption mechanism calls returned the correct original-state proposal
and the correct fresh-task proposal, with true validation flags and no mechanism
errors. Qwen committed the proposed correct original vector in only 52 of those
80 cases. Thus correct executable output was available, but agent application
was imperfect. Harmful repairs and relapse remain part of the result.

Every first decision in every arm was `CHECK`, including arms where no executable
was available. A and D then returned `PLAN` at every second decision, which is
invalid at the commit stage; neither made a valid commit. B returned 284 `PLAN`
and 76 valid `COMMIT` decisions across its 360 inhabitants. C made 240 valid
commits across its 360 inhabitants. No response was token-limit truncated.

This is a substantial interface-compliance limitation. B's failures include
failed preservation and wrong-stage actions before novel corruption. There are
**no eligible B survivors** on which to estimate a B conditional recovery rate.
The C−B endpoint is an end-to-end assignment contrast, not evidence that prose
and executable procedures were equally maintained before a clean recovery-only
comparison. Universal `CHECK` use also does not establish selective detection
of damage. The logs show invocation, proposals, validation output, and commits;
they do not warrant claims about unobserved reasoning.

Fresh calibration values were generated after Sol's departure, with no task
answers inherited by later inhabitants. Successful use therefore goes beyond
retrieving original answers. Its scope is this protected mechanism and explicit
interface, not spontaneous institution formation, machinery self-maintenance,
permanent capability, or general weak-model competence.

## Audit and request-snapshot recording defect

The first post-run frozen audit passed 15/17 checks. State/fork replay, scores,
source hashes, schedule, cardinality, and runtime comparison passed; embedded
request snapshots failed prompt and raw-call identity checks.

The cause was isolated to the continuation harness: `messages += ...` appended
the decision-2 context to the Python list referenced by the saved decision-1
request **after that request was serialized to the ledger and sent**. This
affected 392 derived `rows[*].call1.request` snapshots, including the cached
boundary reply. The raw request ledger itself was not changed. An independent
comparison found **zero mismatches across all 2,880 actual Qwen requests** against
the frozen prompts.

Before reconciliation, the original ledger, unmodified result, and failed audit
were uploaded as `i12-continuation-unmodified-evidence`, artifact 1977, with
verified SHA-256 `a703208fe5832571014845dc93c94b8862bd5c641f1df516a8b4cc5e6e932e62`.
The post-run `normalize_request_snapshots.py` then populated those 392 derived
fields from the immutable request events. It verified that **no other result
fields, responses, actions, states, scores, or analysis changed**, and made zero
inference calls. Both result versions, both audits, the normalization script,
and the complete change inventory remain in the evidence.

On this explicitly reconciled projection, the unchanged frozen auditor passes
**17/17 checks**, and the registered continuation audit passes **10/10**:
parent ledger is an exact byte prefix; old rows, builders, and task draws are
unchanged; every remaining request follows the original schedule; no response
was rerun; registration and gates precede new inference; and runtime identities
match. This is not a claim that the original row snapshots passed unmodified.

The original interrupted runner's before/after metadata capture was lost.
The combined audit uses the preserved original pre-inference access record,
compared with continuation start/end metadata; this provenance substitution
is explicitly registered and reported. The failed parent run and its ENOSPC
chronology remain intact.

## Conclusion and next step

The frozen numerical criterion is met in the completed amended panel: inherited
executable machinery enabled fresh Qwen descendants to reconstruct damaged
state and solve new instances after Sol's permanent departure. The strongest
defensible comparative claim is an end-to-end advantage under this interface.
The result does not isolate conditional repair superiority over maintained prose.

Before treating this as a clean confirmatory recovery comparison, independently
replicate with prospectively calibrated interface compliance and a design that
compares post-corruption recovery among populations established at the fork.
Any such calibration, design change, and replication require separate registration;
none were added to this run. Keep I13 self-maintenance separate.
