# Ecology closure results

All registered matrices and triggered follow-ups are complete: 379 primary worlds, plus verification runs.

## EX-8 — mutation dose and roles

Status: complete; 140/140 runs.

Recovery is (6 − final mean decay)/5, not a direct fitness estimate. Extinction is reported separately.

| Swap % | Enabled role mask | Seeds | Extinct | Mean recovery | Median | Below conditional tree interval |
|---:|---:|---:|---:|---:|---:|---:|
| 0 | 7 | 10 | 0 | 0.359 | 0.214 | 4 |
| 0.1 | 7 | 10 | 0 | 0.360 | 0.200 | 4 |
| 0.25 | 7 | 10 | 0 | 0.373 | 0.291 | 4 |
| 0.5 | 7 | 10 | 0 | 0.285 | 0.188 | 4 |
| 0.75 | 7 | 10 | 0 | 0.245 | 0.189 | 2 |
| 1 | 1 | 10 | 0 | 0.302 | 0.200 | 4 |
| 1 | 2 | 10 | 0 | 0.339 | 0.291 | 3 |
| 1 | 3 | 10 | 0 | 0.293 | 0.188 | 4 |
| 1 | 4 | 10 | 0 | 0.316 | 0.233 | 4 |
| 1 | 5 | 10 | 0 | 0.213 | 0.167 | 2 |
| 1 | 6 | 10 | 0 | 0.356 | 0.410 | 5 |
| 1 | 7 | 10 | 0 | 0.210 | 0.167 | 2 |
| 2 | 7 | 10 | 0 | 0.230 | 0.182 | 2 |
| 8 | 7 | 10 | 0 | 0.277 | 0.200 | 3 |

Role bits: hungry=1, reproduction=2, movement=4. The genealogy interval preserves shared ancestry but conditions on a selected tree; it is not a causal selection test.

| Role removed at 1% | Mean paired recovery change | Positive seeds | Rescue gate |
|---|---:|---:|---|
| hungry | +0.145 | 5/10 | fail |
| reproduction | +0.003 | 1/10 | fail |
| movement | +0.083 | 5/10 | fail |

## EX-9 — predators

Matrix: complete; 14/14 runs. A passing screen still requires causal replay.

| Swap % | Seed | Grazers | Predators | Label p | Circular p |
|---:|---|---:|---:|---:|---:|
| 0 | 42 | 6 | 0 | untestable | untestable |
| 8 | 42 | 1402 | 599 | 0.8272 | 0.8630 |
| 1 | 42 | 1667 | 741 | 0.9799 | 0.9709 |
| 1 | 1 | 1456 | 756 | 1.0000 | 1.0000 |
| 1 | 2 | 1735 | 676 | 0.3432 | 0.5823 |
| 1 | 3 | 0 | 0 | untestable | untestable |
| 1 | 999 | 2343 | 546 | 0.4479 | 0.4188 |
| 1 | 6840143426865955071 | 1735 | 583 | 0.5787 | 0.5571 |
| 2 | 42 | 1630 | 746 | 0.2099 | 0.0834 |
| 2 | 1 | 1843 | 670 | 0.3275 | 0.0975 |
| 2 | 2 | 1946 | 641 | 0.8734 | 0.8843 |
| 2 | 3 | 2728 | 340 | 0.0852 | 0.0792 |
| 2 | 999 | 1763 | 653 | 0.8134 | 0.7885 |
| 2 | 6840143426865955071 | 1836 | 405 | 0.4425 | 0.6046 |

Screen alpha = .05/12 for each null. Surviving to 10,000 ticks does not establish stable coexistence; categorical alternation does not measure all forms of coevolution.

Historical simultaneous-event tie-order rescore: complete; when available, the table uses the restored historical ordering. Original scores remain in the raw matrix.

## EX-10 — sequential beneficial steps

Status: complete; 5/5 baseline seeds.

First-step composition reverts: 108 tested; 8 beneficial, 84 tied, 16 harmful by focal direct-child count.

Second-step numeric reverts: 72 tested; 2 beneficial, 69 tied, 1 harmful by focal direct-child count.

Held-out factorial candidates: 2; passed: 0.

Compositions are generated offline from the fixed library; this is not online invention or a test of open-ended evolution. Novelty is limited to the recorded probe bank.

Independent baseline/ancestry/conditional-coverage audit: complete.

Post-hoc movement-domain check: 5/8 beneficial compositions are action-equivalent to an existing disk gene on all eight food-input triples in {0,40}³. This checks immediate actions, not instruction counts or future mutation paths; it was not a revised acceptance gate.

| Seed offset | Origin | Beneficial composition | Existing action-equivalent cells |
|---:|---:|---|---|
| 0 | 463 | sum_equals∘mul_div_sat[slot2] | all_distinct3, between_exclusive, is_valid_date, q_mul3 |
| 1 | 597 | in_range_open_closed∘day_of_week[slot0] | none |
| 1 | 875 | mul_div_sat∘slew_rate_limiter_step[slot0] | none |
| 2 | 38 | q_mul3∘in_range_open_closed[slot2] | all_distinct3, between_exclusive, is_valid_date, q_mul3 |
| 3 | 34 | in_range_open_closed∘between_exclusive[slot0] | in_range_open_closed |
| 3 | 530 | argmin3∘is_clear_loser[slot2] | none |
| 4 | 4964 | diff_equals∘mean3[slot0] | day_of_year |
| 4 | 7896 | day_of_year∘normalize_0_100[slot1] | all_distinct3, between_exclusive, is_valid_date, q_mul3 |

## Reproduction

See PROVENANCE.md and ../ecology-closure-preregistration.md. Rebuild with --locked, run the three modes with fresh output paths, then run ../analyze_ecology_closure.py.
