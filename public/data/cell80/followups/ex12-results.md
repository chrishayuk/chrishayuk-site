# EX-12 results

Limited support; replication gate not met.

4 first-clean candidates, 3 before operational establishment, 1 passing both contexts before establishment. Overall replicated success requires at least three.

## Separate contexts

Counts are qualifying paired futures out of ten. Each context also requires the preregistered mean sign.

| Discovery offset | B age | Clean B fraction | Pre-establishment | Context | B>A | BC>B | C≤A | Interaction>0 | Context passes |
|---|---:|---:|---|---|---:|---:|---:|---:|---|
| +2 | 190 | 85.2% | False | historical_opportunity | 4/10 | 9/10 | 10/10 | 9/10 | not_supported_by_gate |
| +2 | 190 | 85.2% | False | functional_dependency | 9/10 | 10/10 | 10/10 | 10/10 | supported |
| +3 | 75 | 79.3% | True | historical_opportunity | 6/10 | 7/10 | 10/10 | 7/10 | not_supported_by_gate |
| +3 | 75 | 79.3% | True | functional_dependency | 9/10 | 10/10 | 10/10 | 10/10 | supported |
| +4 | 60 | 63.3% | True | historical_opportunity | 4/10 | 7/10 | 10/10 | 7/10 | not_supported_by_gate |
| +4 | 60 | 63.3% | True | functional_dependency | 9/10 | 10/10 | 10/10 | 10/10 | supported |
| +9 | 45 | 12.5% | True | historical_opportunity | 9/10 | 10/10 | 10/10 | 10/10 | supported |
| +9 | 45 | 12.5% | True | functional_dependency | 9/10 | 10/10 | 10/10 | 10/10 | supported |

Standardized assays share seeds and the same genotype backgrounds in this batch: repeated execution is not independent replication. Full per-seed fitness, effect sizes, ancestry and status are in `edges.json`.

## Original-history contribution (not B's historical necessity)

| Offset | C direct offspring | C total descendants | Reverted C descendants | Overwritten during birth phase |
|---|---:|---:|---:|---|
| +2 | 2 | 162860 | 0 | False |
| +3 | 1 | 30279 | 0 | False |
| +4 | 0 | 0 | 0 | True |
| +9 | 0 | 0 | 0 | True |

Birth-phase fate is a post-run descriptive audit of the saved pending-parent list with the original counter RNG, not an additional candidate filter.

## Discovery and retention

| Arm | B discovered | Established / discovered | Retained / discovered | First clean C / discovered |
|---|---:|---:|---:|---:|
| full | 5/10 | 4/5 | 4/5 | 4/5 |
| b_only | 5/10 | 4/5 | 4/5 | not applicable |
| no_substrate | 5/10 | 0/5 | 0/5 | not applicable |
| atomic_only | 0/10 | 0/0 (untested) | 0/0 (untested) | not applicable |

## Every discovery world

| Arm | Offset | Births | B origins | Established | Final-200 capable fraction |
|---|---:|---:|---:|---|---:|
| full | +0 | 10568 | 0 | False | 0.000000 |
| full | +1 | 11071 | 2 | False | 0.000000 |
| full | +2 | 172416 | 1 | True | 0.912773 |
| full | +3 | 41253 | 1 | True | 0.913359 |
| full | +4 | 37398 | 1 | True | 0.911230 |
| full | +5 | 10761 | 0 | False | 0.000000 |
| full | +6 | 11132 | 0 | False | 0.000000 |
| full | +7 | 10751 | 0 | False | 0.000000 |
| full | +8 | 11415 | 0 | False | 0.000000 |
| full | +9 | 160134 | 1 | True | 0.905312 |
| b_only | +0 | 10592 | 0 | False | 0.000000 |
| b_only | +1 | 11062 | 2 | False | 0.000000 |
| b_only | +2 | 67092 | 1 | True | 0.819258 |
| b_only | +3 | 21999 | 1 | True | 0.819316 |
| b_only | +4 | 11122 | 0 | False | 0.000000 |
| b_only | +5 | 10757 | 0 | False | 0.000000 |
| b_only | +6 | 57957 | 1 | True | 0.812949 |
| b_only | +7 | 56555 | 2 | True | 0.815449 |
| b_only | +8 | 11414 | 0 | False | 0.000000 |
| b_only | +9 | 10710 | 0 | False | 0.000000 |
| no_substrate | +0 | 10568 | 0 | False | 0.000000 |
| no_substrate | +1 | 11071 | 2 | False | 0.000000 |
| no_substrate | +2 | 10880 | 3 | False | 0.000000 |
| no_substrate | +3 | 11005 | 1 | False | 0.000000 |
| no_substrate | +4 | 11107 | 1 | False | 0.000000 |
| no_substrate | +5 | 10761 | 0 | False | 0.000000 |
| no_substrate | +6 | 11132 | 0 | False | 0.000000 |
| no_substrate | +7 | 10751 | 0 | False | 0.000000 |
| no_substrate | +8 | 11415 | 0 | False | 0.000000 |
| no_substrate | +9 | 10534 | 1 | False | 0.000000 |
| atomic_only | +0 | 11193 | 0 | False | 0.000000 |
| atomic_only | +1 | 11313 | 0 | False | 0.000000 |
| atomic_only | +2 | 11417 | 0 | False | 0.000000 |
| atomic_only | +3 | 11533 | 0 | False | 0.000000 |
| atomic_only | +4 | 11413 | 0 | False | 0.000000 |
| atomic_only | +5 | 10952 | 0 | False | 0.000000 |
| atomic_only | +6 | 11483 | 0 | False | 0.000000 |
| atomic_only | +7 | 11375 | 0 | False | 0.000000 |
| atomic_only | +8 | 11547 | 0 | False | 0.000000 |
| atomic_only | +9 | 10892 | 0 | False | 0.000000 |

Exact byte-identical replay: True. Historical necessity of B, environmental mediation and multi-edge causal chains remain untested.
