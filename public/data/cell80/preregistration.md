# Ecology closure: EX-8 / EX-9 / EX-10

Registered 2026-09-09, before new experimental results. Source baseline:
`7d61b00719899b449e73c34a90ebbdbae73da19a`. Work is isolated from the dirty original
checkout in `chris-experiments/ecology-research`. No website/story work is in scope.

## Common rules

Pin the discovered ordered gene pools, source revision, Cargo.lock and code hashes in
the result bundle. Retain per-run configuration, history hash, population trajectory,
genome summaries and all counterfactual observations as JSONL. Never replace a failed
seed or omit an extinction. Technical failures are not biological extinctions.
Use the established GPU engine, with CPU/GPU and legacy integer-rate replay checks.
New fractional draws subdivide the historical percent bucket with a separate stream,
so integer-percent decisions remain bit-identical. Numeric mutation stays unchanged.

## EX-8: resolve the sampled 0–1% recovery gap and localize the responsible role

Use D2 (decay=6), otherwise the original grazer, 8 founders, 32x32, food density .2,
food value 40, regrow 8, 2,000 ticks. Seeds are base `0x5eed1234c31180ff` + 0..9.
Full-role swap doses in basis points: 0, 10, 25, 50, 75, 100, 200, 800.
At 100 basis points additionally test each proper nonempty role subset: hungry,
reproduction, movement, hungry+reproduction, hungry+movement, reproduction+movement.
Thus 140 primary runs. Keep the entire pinned pool unchanged: changing pool size also
changes the available behaviours and is not a clean diversity-only intervention.

Primary descriptive endpoint: `(6 - mean final survivor decay)/5`, with extinctions
reported separately, not assigned a favourable recovery score. Report each seed and
paired differences, plus the lowest tested nonzero dose with mean recovery >= .5.
This is a sampled dose boundary, not evidence of a mathematical discontinuity.
For role attribution, compare removal of each role against all-role 1% within seed.
Call a role removal a reproducible rescue only if its recovery improvement is >= .1
on average and positive in >=8/10 seeds. Report all contrasts, including failures.

The old independent-survivor random-walk null omits shared ancestry. Replace it with
1,000 simulations of the decay mutation process on the *same realized genealogy*,
sharing each ancestral mutation among all descendants. This is still a conditional
diagnostic (the genealogy itself was selected), NOT a selection-free ecological control
or a calibrated causal test. Do not use it alone to claim adaptive selection. There is
no reason to compare mutation-off against a 25%-mutation null.

## EX-9: low-swap predator coexistence and the existing arms-race gate

Run swap 1% and 2% with seeds 42, 1, 2, 3, 999, base; 48x48, food .3, value40,
regrow8, 60 grazers/10 predators, satiation20, 10,000 ticks. Also replay the seed42
0% and8% anchors: 14 runs. Preserve historical numeric/starting species parameters.
Primary coexistence endpoint: both species alive at the horizon; also report minimum
populations in the final 2,000 ticks. Survival at one horizon is not stable coexistence.
For surviving runs, preserve the historical plurality detector (sample20, sustain5,
three categorical roles) and longest cross-species alternation statistic; 20,000 label
permutations with add-one p-value. Use .05/12 for the new twelve-run screen. Add a
circular-shift sensitivity null preserving within-species event clustering. An arms-race
claim additionally requires both nulls to pass and a traced birth-level counterfactual
disrupting the response. Failed/untestable screens close the test without claiming
coevolution impossible. This detector does not measure continuous numeric coevolution.

## EX-10: a bounded search for two causally beneficial steps

Use the existing deterministic 300-attempt movement-composition pool (sweep seed
`0x5eedc0dec0de5eed`), original grazer, EX-8 world, swap8%, 2,000 ticks, base +0..4.
These compositions are generated offline, NOT invented during the ecological run.
Fingerprint novelty only means distinct on the recorded probe set.

Per seed, select up to 24 disk-to-composition births at ticks <=1500, evenly by birth
order, WITHOUT screening on offspring success. Revert just the movement swap, verify
the exact pre-fork history and focal birth context, and compare focal direct children
and descendants over the same 2,000-tick horizon. A first-step candidate must strictly
improve direct children; no favourable redefinition to descendant count after results.

For each successful origin, inspect at most the first 8 chronological later numeric
mutation births in its descendant lineage that retain that same composed movement cell,
at ticks <=1500. Revert each changed numeric field individually; require a strict
direct-child improvement for a second-step candidate. All replays fork independently
from the baseline: NEVER reuse a later descendant ID after an earlier divergent fork.

If a two-step candidate exists, evaluate four founder-genome combinations (old/new
movement x old/new second numeric allele, other fields held at the second child's
background), mutation off, five held-out seeds base+100..104, 2,000 ticks. A dependence
candidate requires the second allele's total-birth benefit with new movement to exceed
its benefit with old movement in >=4/5 worlds and positive on average. This is a
standardized whole-population epistasis assay, not a replay of the ancestor's world.
Report ties/extinctions. A candidate passing all stages establishes a bounded example,
not open-ended evolution or online program invention. If earlier stages fail, later
conditional stages are not triggered; report search coverage and the negative result.

## Stop and report

Close each finite matrix once all registered runs/conditional stages have outcomes.
Do not expand seeds, horizons, metrics or novelty criteria to obtain a positive result.
Record any technical amendments before their affected runs. Deliver findings, raw
results, commands, tests and remaining scientific limits; consider stories afterward.
