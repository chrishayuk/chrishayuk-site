# The barrier was crossed, but the registered ratchet was not demonstrated

This experiment produced an online-generated resource-processing capability outside
the tested primitive repertoire. It did **not** meet the registered conditions for
a reproducible, established-B-then-C evolutionary ratchet. The decisive conditional
fitness assays were not reached, so dependence is **untested**, not disproved.

## What was done

EX-11 introduced a deliberately engineered nutrient into a new controlled Cell80
metabolic world. To exploit it, an organism's program had to compute
`min(65535, a + (a XOR b))` correctly on all 64 registered input pairs. Every one of
the 89 existing stateless binary-u16 primitives failed at least one input. The
claim is specific to this library and interface, not every possible program.

Founders carried only `mask_xor`, with low nutrient uptake. Mutation could generate
two-cell expressions directly at birth from 84 composable primitives; it did not
draw from a pre-screened successful-program pool. High uptake was a separate,
costly allele. Ten seeds each ran full evolution, uptake-disabled (B-only),
no-substrate, and atomic-only controls: 40 worlds, each 3,000 ticks and 256 slots.
The preregistration, code, all changed-genome births, trajectories and state hashes
are retained alongside the analysis.

## What was found

Of 1,825 distinct composed expressions evaluated during mutation, one passed:
`add_sat(a, mask_xor(a,b))`. The same expression arose in multiple worlds; these are
repeated origins, not multiple kinds of innovation. The expression was known to
the experimenter as a validation witness but was not inserted into evolution.
The actual Cell80 tree interpreter and an independent bytecode interpreter agree
on its output over all 64 resource inputs.

In the full arm, this capability appeared in 3/10 worlds and established and
persisted in 2/10. Those two worlds ended with approximately 91% capable organisms
on average over the final 200 ticks. With uptake mutation disabled, it appeared
in 2/10 and established and persisted in 1/10, whose final-window capable fraction
was approximately 81%. The registered B-only retention requirement was **8/10**.

Without substrate, the capability arose in three worlds but established in none.
With composition disabled, it never arose. These controls behaved as expected;
they do not compensate for the failed retention gate.

There were B-then-high-uptake sequences in the two successful full worlds. However,
the uptake changes occurred **19 and 4 ticks before** their B lineage completed
the registered establishment period (at least 20% of slots for 50 consecutive
completed ticks). They were therefore ineligible. No qualifying later candidate
appeared, and the experiment did not substitute these early events after seeing
their outcomes. Zero primary factorial, historical-fork or restoration assays ran.

## What it means

The positive result is narrower but useful: mutation can assemble a capability
that no primitive supplies in this domain, and populations carrying it can spread
and persist in the constructed environment. This goes beyond the earlier
experiment's offline composition pool and immediate-movement novelty checks.

The negative result is failure of the registered overall criterion: reliable
discovery/retention and eligible sequential-candidate supply were insufficient.
The timing observations suggest that the strict establishment-before-C screen
excluded biologically interesting sequences, but that is a **post-run diagnosis**,
not permission to loosen the screen. Candidate eligibility is an evidential rule;
it is not itself a definition of what biological evolution can do.

We have not measured whether those early uptake changes require B for their
fitness advantage in held-out worlds. The energetic design makes that plausible,
but plausibility is not the registered paired removal/restoration evidence.
Nor does this finite, two-cell, experimenter-designed resource demonstrate
open-ended evolution, naturalistic chemistry, or an upgrade of the older
predator/grazer world into a cumulative ecology.

Close this matrix with its unchanged gates. A separate follow-up could preregister
an immediate-first-B→C candidate rule and test clean ancestry plus conditional
fitness directly, while reporting B discovery probability separately from
retention conditional on discovery. That proposal is not run here and must not
turn the present early events into confirmatory evidence.

See [RESULTS.md](RESULTS.md) for every world and [PROVENANCE.md](PROVENANCE.md) for
reproduction and the separation between primary evidence and regression checks.
