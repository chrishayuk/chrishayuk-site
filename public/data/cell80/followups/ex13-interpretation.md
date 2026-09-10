# EX-13: transmitted opportunity, unconfirmed retained dependency

A supported B→C opportunity survived, reproduced and produced intact BC
descendants that persisted for hundreds of ticks in the original mutating world.
However, its later-context dependency assay did not meet the registered8/10 gate.
The full retained-edge outcome was therefore **0/1 supported opportunities**,
not replicated support. Accumulation remains **untested**: no later D was assayed.

This is not a replay of EX-12's immediate-loss result. Genetic transmission and
persistence were observed here. Nor does the failed later assay show that the
dependency reversed: its four nonwins were zero-offspring ties across all four
genotypes. One opportunity is far too small a denominator to infer a general
retention probability.

## What was fixed in advance

The ecology, library, online composition operator, mutation rates,256 slots and
3,000-tick discovery horizon were unchanged. Forty fresh worlds ran across full,
B-only, no-substrate and atomic-only arms. The first clean B→C candidate in each
full world was selected at birth without looking at its fate. None was rescued
from contention, replaced by a later survivor or omitted for failing an assay.

Every candidate received the existing dual-context opportunity screen: actual
birth-time ecology plus standardized worlds, ten paired futures each, with all
further mutation disabled. Their unmodified discovery histories continued with
mutation enabled and were traced prospectively.

The primary persistence checkpoint was end of tick C-birth+200. Intact carriers
must retain the exact BC genotype continuously from the selected child; losing
and reacquiring a component does not repair that path. A living descendant was
required, not merely survival of the founder. The lowest-ID intact descendant
was selected before inspecting its future and tested in its actual checkpoint
ecology. No checkpoint candidate was selected for being assay-successful.

The checkpoint required positive C benefit with B, nonpositive C benefit without
B, positive interaction and a positive effect of keeping B in BC, each with the
registered8/10 count and mean sign. Unlike the birth screen, it did not require
B-alone to remain advantageous in the later ecology. This distinction was
registered before any EX-13 outcome, not introduced to rescue a result.

## The supported opportunity and its descendants

The passing birth-opportunity case was seed `6840321394656419844` (offset+4).
B appeared at tick115; the selected C child1124 was born at tick165. B was50 ticks
old and its clean lineage occupied67/256 slots (26.2%), before operational
establishment. The program was the same resource-processing composition as in
EX-11/12, arising online in this fresh world.

The birth-time opportunity assay gave B>A in8/10 futures, BC>B in10/10 and
C-only<=A in10/10; standardized assays gave9/10,10/10 and10/10. Interaction and
all required mean signs also passed.

In the actual mutating history:

- The child survived its birth phase.
- It first reproduced at tick167; its first direct intact BC transmission was
  child1172 at tick169.
- There were217 intact BC descendants at+50 ticks,148 at+200 and230 at+500.
- The+200 checkpoint representative was descendant13943 at the boundary after
  tick365, with its actual position and energy preserved in the assays.

This directly establishes transmission and finite-horizon genetic persistence
of a genotype whose opportunity had passed both birth-context screens.

## The later assay did not pass—but did not show a reversal

For the representative in its checkpoint ecology:

| Contrast | Positive | Tie | Negative | Registered outcome |
|---|---:|---:|---:|---|
| C benefit with B: BC−B | 6 | 4 | 0 | Fails8/10 |
| C benefit without B: C−A | 0 | 10 | 0 | Passes nonpositive gate |
| Interaction | 6 | 4 | 0 | Fails8/10 |
| Removing B from BC: BC−C | 6 | 4 | 0 | Fails8/10 |

The four ties were futures in which **all four focal genotypes produced zero
offspring**. We retained them in the denominator. The mean C-with-B effect was
+421.3 lineage births, but a positive mean did not override the registered
replication requirement. Its median was just1 birth: the mean was dominated by
two much larger lineages. Full paired outcomes are in `edges.json`.

The defensible result is **dependency not supported at the required reliability
in this later context**, not "the biological dependency disappeared." The assay
measures a particular carrier's reproductive outcomes in a particular ecology,
including stochastic loss. It is not a direct, context-free measurement of the
genotype's biochemical requirement.

## Event lineage and capability retention also diverged

The selected C child's entire genealogical lineage became extinct at tick1268.
That does not mean the resource-processing capability disappeared: the world
still had239 capable high-uptake organisms then, and235 at the final tick. Its
final200-tick capable fraction averaged91.9%. These organisms were outside the
selected C child's descendant cohort.

Thus the instrument distinguishes survival of a particular historical origin
from continued presence of the same functional genotype elsewhere. We did not
count another lineage carrying BC as rescue of the selected event, and did not
test whether those other lineages were causally dependent on that event.

## Whole-matrix result and ledger

Five first-clean candidates were selected. All survived, transmitted BC and had
intact descendants at+200. Only one passed BOTH birth-opportunity contexts. One
different candidate passed the checkpoint dependency gate but had failed the
birth-opportunity screen; combining those successes would be invalid.

For the one supported opportunity, the ledger reads:

- opportunity: **supported**;
- transmission: **observed**;
- genetic persistence at+200 and+500: **observed**;
- retained dependency under the full checkpoint criterion: **not supported**;
- accumulation, historical necessity of B and environmental mediation:
  **untested**.

There were no censored supported opportunities. The observed full-gate fraction
is0/1, while transmission and+200 intact persistence were each1/1. Neither is a
precise population probability. Censoring bounds reported by the analyzer concern
missing follow-up in this finite cohort, not sampling uncertainty or confidence.

All five candidates share the same standardized genotype/seed cases:200 executed
standardized assays represent40 distinct cases, not five independent functional
replications. Their historical and checkpoint ecologies are separate contexts.
No multi-edge path was constructed or counted as causal depth.

EX-13 closes with unchanged gates. The next design question is how to distinguish
context-dependent selective opportunity from its probability of realization in
a single-carrier assay, while preserving unconditional reporting of extinction.
Do not discard zero-offspring futures, retrospectively choose another descendant
or infer a later D from genotype persistence. Independent replication and a
prospectively specified measurement design are needed before attempting that
stronger accumulated-chain claim.

See [RESULTS.md](RESULTS.md) for all worlds, [edges.json](edges.json) for the status
ledger and effects, and [PROVENANCE.md](PROVENANCE.md) for verification.
