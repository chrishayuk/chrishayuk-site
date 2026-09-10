# What the follow-up experiments establish

All three finite follow-ups are closed: 379 primary worlds plus replay/audit checks.
They establish local adaptive benefits and low-swap coexistence at a finite horizon,
but neither a robust recovery threshold, a detected arms race, nor the registered
cumulative-dependence claim. These are experiment findings, not proposed stories.

## Recovery was less robust than the original five seeds suggested

All 140 mutation-dose/role worlds finished, with no extinctions. The original five
no-swap seeds reproduce mean recovery 0.505, but ten seeds average 0.359. None of the
eight tested full-role swap doses reaches the registered 0.5 average threshold.
The 0.1% and 0.25% means (0.360, 0.373) resemble no swaps; the lower means at 0.5–1%
do not establish a mathematical discontinuity at zero.

Removing hungry-cell swaps at 1% gives the largest mean improvement (+0.145), but
only 5/10 seed pairs improve; reproduction removal improves 1/10, movement removal 5/10.
All three fail the registered >=0.1 mean and >=8/10 positive-seed conjunction.
Hunger-related swaps may contribute, but there is no supported single-role rescue.

The new mutation diagnostic shares ancestral mutations across relatives. It is still
conditioned on a genealogy produced by selection and is not a causal selection-free
ecology. Neither its intervals nor the old independent-survivor intervals alone prove
adaptive recovery. Recovery here is a genome endpoint, not measured reproductive fitness.

## Some composed genes help, but cumulative dependence is not established

There were 1,332 eligible origins across five baseline worlds. Up to 24 per seed were
sampled by birth order without filtering for success; one seed supplied only 12, giving
108 first-step counterfactuals. Eight increased focal direct offspring, 84 tied and 16
decreased them. This is evidence of local benefit, not a claim that composition improves
fitness on average across contexts or that the older 15-revert sample was wrong.
The current pinned pool/sampling differs from that older experiment.

All 72 required follow-on numeric-field replays were completed: two beneficial, 69 tied,
one harmful. Exact pre-fork states and focal birth contexts matched. Regenerated baseline
hashes and exported ancestry paths verify continuous inheritance of the first gene.

| Baseline seed offset | First origin → later child | Later allele change | Local child benefit | Positive dependence worlds |
|---:|---|---|---:|---:|
| +1 | 597 → 638 | Offspring energy share 50 → 48 | +1 | 3/5 |
| +4 | 4964 → 4975 | Reproduction threshold 210 → 202 | +2 | 0/5 |

For the second row, a simultaneous offspring-share change 54 → 57 is retained when only
the threshold mutation is reverted. The later-birth IDs are used only in separate
baseline-to-single-fork replays, never after an earlier divergent fork.

Both four-genotype tests fail the fixed >=4/5 positive-interaction and positive-mean
gate. The first averages +17.4 births of interaction but is positive in only3/5 worlds;
the second is negative in all five. This supports two local sequential improvements,
not a demonstrated dependence of the second advantage on the first innovation.
The assay changes the whole founder population in fresh worlds; it is not replaying
the original ancestral ecology.

A post-hoc exhaustive check of immediate movement actions adds an important limit:
five of eight helpful compositions act just like an existing library cell on every
possible food-input triple in this world. The largest first-step gain (+69 offspring)
comes from a composition that always chooses the stay/eat-eligible action, a behavior
already available in the library. Three helpful compositions have distinct action
signatures in that input domain. None of this changes the preregistered verdict.
Action equivalence is not equality of instruction costs or later mutation paths.

All 252 candidate compositions were generated offline from existing code before ecology
began. Fingerprint novelty is limited to its probe set. Online program invention,
unbounded novelty and open-ended evolution were not demonstrated by these experiments.

## Predator test

All 14 worlds are complete. The 0% seed 42 anchor loses predators; the 8% anchor
sustains both species but fails the coupling screen. At 1%, five of six seeds sustain
both species to 10,000 ticks; one loses both. At 2%, all six sustain both species.
Thus low nonzero swaps can maintain coexistence over this horizon; 0% is not a useful
arms-race test in the extinct-predator anchor.

None of the eleven surviving low-swap worlds passes either coupling screen. With
historical simultaneous-event ordering restored, label-permutation p-values range
from 0.0852 to 1.0 and circular-shift p-values from 0.0792 to 1.0, all above .05/12.
No causal arms-race replay was triggered under the preregistration. The scoring
correction changes some p-values but no verdict; both versions are retained.

This closes the proposed low-swap categorical-trait test negatively, not the broader
question of coevolution. The detector does not test numerical-trait coevolution;
grazers have no direct predator-sensing channel. Finite-horizon survival is not proof
of stable coexistence indefinitely.

## Evidence and reproducibility

- [Machine-generated complete tables](RESULTS.md) and [structured summary](summary.json).
- EX-8: `ex8-metal.jsonl`; EX-9: `ex9-metal.jsonl` plus `ex9-cache.jsonl`.
- Historical EX-9 event-order verification: `ex9-rescore.jsonl`.
- EX-10: `ex10-cache.jsonl`; independent verification: `ex10-audit.jsonl`.
- [Preregistration](../ecology-closure-preregistration.md), [execution record](PROVENANCE.md),
  and `reproducibility.json` source/data hashes.
- `../analyze_ecology_closure.py` checks matrix coverage, duplicate rows, horizons,
  seed sets, factorial completion and conditional replay coverage before reporting.

The full regression suite passed 65 tests, including CPU/GPU equality, historical-rate
compatibility, role masks, fractional rates and cold/warm cached histories. Optional
caching preserved the complete 10,000-tick predator anchor hash. Technical failed starts
and superseded partial executions remain available but are not independent samples.

All work is in the isolated `chris-experiments/ecology-research` checkout. The original
`cell80` working tree and website were not modified. Database entries are
`ex-8-mutation-dose-roles`, `ex-9-low-swap-coexistence`, `ex-10-two-step-innovation`.
