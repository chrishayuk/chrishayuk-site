# EX-14: realization versus conditional selective effect

Registered before new EX-14 assay execution. EX-13 remains closed and its cohort
identity is retained; this experiment does not replace its candidates or discard
its zero-offspring outcomes.

## Question

When a transmitted B→C dependency is tested in a later ecological snapshot, are
the four zero-offspring futures failures of reproductive realization, or evidence
that C no longer helps once reproduction is possible?

Keep EX-13's selected supported opportunity (seed offset+4, checkpoint descendant
13943) and exact checkpoint ecology. Keep the same A, B, C-only and BC genotypes,
competitors, positions, energies and nutrient stocks. Disable mutation in every
organism. This is a measurement follow-up, not a new discovery matrix and does
not alter EX-13's retention outcome.

## Fixed assays

Run 100 paired deterministic futures with fresh seeds
`0x5eedb4111e003000 + 0..99`, 200 ticks from the saved checkpoint. Each seed runs
A, B, C-only and BC, preserving all four genotypes' unconditional focal-lineage
birth counts and direct births. Repeat BC after removal and require exact hash,
birth-log and output restoration.

Freeze two variables explicitly:

`N_g = focal descendant-lineage births for genotype g`.

`I_g = 1[N_g > 0]`.

The unconditional realization outcome is `P(I_g=1)` for each genotype and the
paired event `I_BC OR I_B`. No zero is
removed from unconditional results.

The conditional contrast is defined before looking at outcomes:

`D = N_BC - N_B`, evaluated conditionally on `I_BC OR I_B`.

Evaluate D only on paired seeds where `I_BC OR I_B` is true. This is a
mechanistic decomposition of paired counterfactuals, not another estimate of
unconditional fitness. Report
the conditional sample count, mean, median, positive/zero/negative counts and
the empirical distribution. A seed with BC=0 and B>0 remains included; a seed
with both zero contributes only to unconditional realization, not D.

## Fixed interpretations

The four original zero/zero futures remain part of EX-13's unconditional result.
EX-14 does not reinterpret them as missing data. The primary realization result
uses all100 new seeds; the conditional effect uses the preregistered event subset.
No p-value or threshold is invented after inspection. A conditional effect is
called consistently positive only if D>0 in at least80% of event-subset seeds and
its mean is positive. If fewer than8 event-subset seeds exist, the conditional
effect is unestimated rather than negative.

Capability-level persistence is a separate descriptive label: organisms carrying
the same BC program may exist outside the selected historical descendant. Their
presence does not count as transmission by the selected event, and EX-14 does not
attribute their origin to that event. Historical lineage identity and functional
state identity remain separate ontologies.

No D mutation, physics, ecological construction, new discovery seeds or candidate
replacement is included. Historical necessity of B, environmental mediation and
multi-edge accumulation remain untested.
