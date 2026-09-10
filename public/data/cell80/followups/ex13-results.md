# EX-13 results

No retained edge met the full gate.

5 first-clean candidates; 1 supported birth opportunities; 0 retained supported edges at+200; 0 censored opportunities. Accumulation remains untested.

## Statuses in the original history and later context

| Offset | Opportunity | Birth-phase survival | BC transmission | Intact descendants at+200 | Checkpoint dependency | Retention |
|---|---|---|---|---:|---|---|
| +0 | not_supported_by_gate | True | observed | 235 | not_supported_by_gate | not_a_supported_opportunity |
| +2 | not_supported_by_gate | True | observed | 237 | not_supported_by_gate | not_a_supported_opportunity |
| +4 | supported | True | observed | 148 | not_supported_by_gate | dependency_not_supported |
| +6 | not_supported_by_gate | True | observed | 233 | not_supported_by_gate | not_a_supported_opportunity |
| +9 | not_supported_by_gate | True | observed | 241 | supported | not_a_supported_opportunity |

## Context-specific assay gates

Counts are qualifying futures out of ten; required mean signs are additionally enforced. B>A is descriptive, not a gate, at the descendant checkpoint.

| Offset | Context | B>A | BC>B | C≤A | Interaction>0 | BC>C | All four fitnesses zero |
|---|---|---:|---:|---:|---:|---:|---:|
| +0 | historical_opportunity | 5/10 | 9/10 | 10/10 | 9/10 | 9/10 | 1 |
| +0 | functional_dependency | 9/10 | 10/10 | 10/10 | 10/10 | 10/10 | 0 |
| +0 | checkpoint_dependency | 1/10 | 6/10 | 10/10 | 6/10 | 6/10 | 4 |
| +2 | historical_opportunity | 6/10 | 8/10 | 10/10 | 8/10 | 8/10 | 2 |
| +2 | functional_dependency | 9/10 | 10/10 | 10/10 | 10/10 | 10/10 | 0 |
| +2 | checkpoint_dependency | 2/10 | 6/10 | 10/10 | 6/10 | 6/10 | 4 |
| +4 | historical_opportunity | 8/10 | 10/10 | 10/10 | 10/10 | 10/10 | 0 |
| +4 | functional_dependency | 9/10 | 10/10 | 10/10 | 10/10 | 10/10 | 0 |
| +4 | checkpoint_dependency | 1/10 | 6/10 | 10/10 | 6/10 | 6/10 | 4 |
| +6 | historical_opportunity | 6/10 | 9/10 | 10/10 | 9/10 | 10/10 | 0 |
| +6 | functional_dependency | 9/10 | 10/10 | 10/10 | 10/10 | 10/10 | 0 |
| +6 | checkpoint_dependency | 2/10 | 7/10 | 10/10 | 7/10 | 7/10 | 3 |
| +9 | historical_opportunity | 3/10 | 6/10 | 10/10 | 6/10 | 6/10 | 4 |
| +9 | functional_dependency | 9/10 | 10/10 | 10/10 | 10/10 | 10/10 | 0 |
| +9 | checkpoint_dependency | 2/10 | 8/10 | 10/10 | 8/10 | 8/10 | 2 |

Shared standardized genotype/seed cases are repeated executions, not independent replications. All per-seed fitnesses, effect signs and ancestry are in `edges.json`.

## Supported-opportunity attrition

| Stage | Count / all supported opportunities |
|---|---:|
| survived_birth_phase | 1/1 |
| reproduced | 1/1 |
| transmitted_BC | 1/1 |
| intact_descendant_at_200 | 1/1 |
| checkpoint_dependency_supported | 0/1 |

Conditional retention: 0/1; complete cases: 0/1; censoring bounds: [0.0, 0.0]. These are not confidence intervals. Zero denominators are unestimated, not zero.

## Actual intact BC descendant counts

| Offset | +50 | +200 | +500 | End | First BC transmission (tick, child) |
|---|---:|---:|---:|---:|---|
| +0 | 224 | 235 | 246 | 226 | [2137, 10098] |
| +2 | 232 | 237 | 232 | 229 | [732, 3411] |
| +4 | 217 | 148 | 230 | 0 | [169, 1172] |
| +6 | 231 | 233 | 242 | 236 | [1507, 6674] |
| +9 | 237 | 241 | 238 | 238 | [1557, 8623] |

## Every discovery world

| Arm | Offset | Births | B origins | Established B | Final-200 capable fraction |
|---|---:|---:|---:|---|---:|
| full | +0 | 78444 | 1 | True | 0.909785 |
| full | +1 | 10690 | 0 | False | 0.000000 |
| full | +2 | 185388 | 1 | False | 0.906094 |
| full | +3 | 10967 | 1 | False | 0.000000 |
| full | +4 | 228819 | 1 | False | 0.918809 |
| full | +5 | 11075 | 0 | False | 0.000000 |
| full | +6 | 126242 | 1 | True | 0.910020 |
| full | +7 | 10806 | 0 | False | 0.000000 |
| full | +8 | 10960 | 0 | False | 0.000000 |
| full | +9 | 124011 | 1 | True | 0.914082 |
| b_only | +0 | 11095 | 0 | False | 0.000000 |
| b_only | +1 | 10690 | 0 | False | 0.000000 |
| b_only | +2 | 69476 | 1 | True | 0.830352 |
| b_only | +3 | 65406 | 1 | True | 0.821562 |
| b_only | +4 | 83271 | 1 | True | 0.818184 |
| b_only | +5 | 11124 | 0 | False | 0.000000 |
| b_only | +6 | 10813 | 0 | False | 0.000000 |
| b_only | +7 | 10711 | 0 | False | 0.000000 |
| b_only | +8 | 10960 | 0 | False | 0.000000 |
| b_only | +9 | 11049 | 0 | False | 0.000000 |
| no_substrate | +0 | 10986 | 1 | False | 0.000000 |
| no_substrate | +1 | 10690 | 0 | False | 0.000000 |
| no_substrate | +2 | 11048 | 1 | False | 0.000000 |
| no_substrate | +3 | 10967 | 1 | False | 0.000000 |
| no_substrate | +4 | 10976 | 2 | False | 0.000000 |
| no_substrate | +5 | 11075 | 0 | False | 0.000000 |
| no_substrate | +6 | 10610 | 1 | False | 0.000000 |
| no_substrate | +7 | 10806 | 0 | False | 0.000000 |
| no_substrate | +8 | 10960 | 0 | False | 0.000000 |
| no_substrate | +9 | 10958 | 2 | False | 0.000000 |
| atomic_only | +0 | 11420 | 0 | False | 0.000000 |
| atomic_only | +1 | 11207 | 0 | False | 0.000000 |
| atomic_only | +2 | 11201 | 0 | False | 0.000000 |
| atomic_only | +3 | 11469 | 0 | False | 0.000000 |
| atomic_only | +4 | 11553 | 0 | False | 0.000000 |
| atomic_only | +5 | 11534 | 0 | False | 0.000000 |
| atomic_only | +6 | 11155 | 0 | False | 0.000000 |
| atomic_only | +7 | 11438 | 0 | False | 0.000000 |
| atomic_only | +8 | 11274 | 0 | False | 0.000000 |
| atomic_only | +9 | 10985 | 0 | False | 0.000000 |

Byte-identical full replay: True. No later D, environmental mediation or historical necessity of B was tested.
