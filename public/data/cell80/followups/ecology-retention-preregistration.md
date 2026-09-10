# EX-13: can a supported opportunity become inherited history?

Frozen before fresh discovery or assay runs. EX-12 remains closed; its cases are
validation fixtures only. The primary quantity is retention conditional on a
supported opportunity, not the frequency of opportunities themselves.

## Fixed population and candidate cohort

Keep the exact EX-11/EX-12 ecology, library, online mutation operator, energy and
resource accounting, dilution/replacement rules,256 slots and3,000 discovery
ticks. No birth protection, replacement-rule change or genotype seeding. Use
four arms (full, B-only, no-substrate, atomic-only), ten fresh seeds each:
base `0x5eedb4111e002000`, offsets0..9. Forty discovery worlds, no adaptive
stopping or additions. Controls remain unchanged: no high uptake in B-only, no
substrate use when absent, no capability/substrate use in atomic-only, and at
most2/10 established B lineages without substrate.

Select the first clean B→C candidate in each full world by EX-12's mechanical
birth rule, with no establishment or outcome filter. Register it immediately
and trace it to the actual pre-B parent program. Never replace a lost, unsupported
or untransmitted candidate with a later one. Both pre- and post-establishment
candidates are eligible; report the temporal classification separately.

## Opportunity membership: reuse the EX-12 screen

Assay every selected candidate's A/B/C-only/BC genotypes, regardless of its
realized fate. A uses the actual pre-B parent's program and low uptake.

Historical opportunity: the exact post-insertion, mid-birth-phase snapshot;
complete pending births, then200 full ticks, mutations off for all organisms.
Ten paired continuation seeds `base+200..209`.

Functional dependency: one focal founder, energy24, among255 mask_xor/low
competitors, mutations off,200 ticks. Ten paired seeds `base+100..109`.

Primary fitness remains total births from the focal descendant lineage,
including direct births. In each context separately require B>A, BC>B and
positive interaction in>=8/10 futures AND on average, and C-only<=A in>=8/10
AND on average. Only candidates passing BOTH contexts enter the supported-
opportunity denominator. Keep all failures and ties; do not pool contexts or
treat shared standardized genotype/seed cases as independent replicates.

## Prospectively recorded attrition in the original mutating history

For EVERY selected candidate, log every subsequent cohort birth and an end-of-
tick trajectory. Separate genealogical descendants from intact BC descendants.
An intact carrier inherits exactly the candidate's B program and high-uptake C,
with no intervening loss or change of either along its path. Reversion away and
later reacquisition do not restore membership in the intact cohort.

Record:

- original child's survival at the end of its birth phase;
- first direct reproduction, including mutant offspring;
- first direct transmission of exact BC, even if that offspring is overwritten
  later in the same birth phase;
- genealogical and intact-BC descendant counts at every completed tick;
- counts at birth+50,+200,+500 ticks and at the fixed discovery end;
- first extinction of the genealogical and intact cohorts, including the founder.

Primary persistence checkpoint: end of tick `C_birth_tick+200`. Persistence
requires at least one intact DESCENDANT there; the original child alone does
not qualify. Select the lowest-ID intact living descendant as the representative,
without inspecting its future. Capture the entire tick-boundary world for it.
If the checkpoint falls outside the3,000-tick horizon, mark it right-censored;
do not extend the run or silently remove it from the opportunity denominator.

## Does the transmitted descendant retain the dependency?

For every candidate with an intact descendant at the checkpoint, regardless of
its birth-opportunity result, assay that representative in its saved checkpoint
ecology. Hold its actual energy and location, all competitors and resource stocks
fixed initially. Use the SAME A/B/C-only/BC genotype definitions, disable all
further mutation and run200 full ticks from the next tick boundary.
Ten paired fresh continuation seeds `base+300..309`.

The checkpoint tests continued dependency, not whether B-alone remains an
adaptive first step in an ecology that may now be dominated by BC. Require:

- BC>B in>=8/10 and in the mean;
- C-only<=A in>=8/10 and in the mean;
- interaction `[F(BC)-F(B)]-[F(C)-F(A)]` >0 in>=8/10 and in the mean;
- B removal hurts BC: BC>C-only in>=8/10 and in the mean.

Report B>A at the checkpoint but do NOT gate on it. This difference from the
birth screen is registered in advance: a component's historical enabling role
need not imply that the component alone invades the later population.

No descendant-specific standardized rerun is needed: intact descendants have
the same genotype definitions as the birth screen. Reuse that evidence with
explicit identity/provenance, never label it new independent support.

## Primary retention outcome and ledger semantics

A retained supported edge requires birth opportunity supported in both contexts,
observed BC transmission, an intact descendant at+200, and the checkpoint
dependency gate passing. Count it once per independent discovery seed.

Report the number retained / ALL supported opportunities, marking censored
opportunities. Also report the complete-case fraction and simple censoring bounds:
`retained/all` through `(retained+censored)/all`. These are identification bounds,
not confidence intervals. If no supported opportunities occur, the conditional
retention probability is unestimated, not zero.

One or two retained cases provide limited support; >=3 independent retained
cases provide registered replicated support. Report all attrition stages with
their denominators; a negative/empty matrix is a valid completed outcome.

Ledger statuses stay distinct:

- opportunity: supported / not_supported_by_gate;
- transmission: observed / not_observed_by_horizon;
- retention: supported / lost / dependency_not_supported / censored /
  not_a_supported_opportunity;
- accumulation: UNTESTED (no later D is selected or assayed in EX-13).

Actual genotype transmission is reported independently even for unsupported
opportunities. A+200 retained edge is not permanence, a multi-edge chain or
accumulated causal depth. Historical necessity of B and environmental mediation
remain untested. The graph is indexed by genotype AND ecological snapshot.

## Verification, isolation and stopping

Observational cohort tracking must not change any discovery world's original
hash, birth log or candidate selection. Validate against EX-12 fixtures and a
complete EX-12 compatibility matrix before running fresh EX-13 seeds.
Validate serialized checkpoint continuation with original seed and mutation on
against the remaining actual birth log, tick records and canonical final state.
If a checkpoint is the final boundary, compare canonical final state directly.

For each context/seed, repeat BC after the removal assays and require identical
continuation hash, birth log and fitness outputs. Preserve exact original C-only
reversion and restoration checks from EX-12; these measure C's realized
historical contribution, not B's historical necessity. Replay the complete
fixed matrix and preserve all scientific output.

No screening on favorable original futures, newborn rescue, survivor substitution,
new mutation policy, physical construction or editorial work is included.
Retain technical failures; document corrections before affected reruns. Do not
change this protocol to obtain a positive retention outcome.
