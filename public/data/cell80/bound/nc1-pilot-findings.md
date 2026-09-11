# NC-1 pilot: the engine works and calibration is complete, but static niches do not become selection

**Verdict.** The machinery is verified, and the declared rule selected a parameter setting
that is feasible on both energy landscapes: basal 5, inflow 4, capacity 64, 3 attempts,
scale 8. The declared exploration then showed a problem. At this setting, evolved
producers appear early in every world, but consumers essentially never eat their
material. The consumer class drew almost no energy from the producer's material in all 12
worlds, and it lost energy from chemistry overall.

A confirmatory NC-1 as drafted would therefore almost certainly return a null. That null
would reflect the chemistry rule, not niche construction.

Everything here is non-confirmatory and ran on pilot seeds only.

## Calibration run 1 (plan v1, `4d3f949d…`)

- **Machinery.** All 8 assertions passed. That includes exact rescue: suppressing a
  lineage's emissions while injecting its recorded emissions reproduced the world byte for
  byte.
- **No feasible combination.** Basal 2 went extinct in every world, because a single-cell
  organism nets zero energy per tick. Basal 3 stayed below 50% occupancy (39–50%).
- **Engine flaw.** Identity reactions (product equal to substrate) were counted as
  emissions. They made up about 85% of recorded reactions.

## Calibration run 2 (plan v2, `5c14b67f…`)

- **Changes.** Identity reactions no longer count as reactions. A new assertion, T8, checks
  for them. The basal grid became {3, 4, 5}. The gates and the selection rule were
  unchanged.
- **Machinery.** All 9 assertions passed. Genuine emissions in the machinery world were
  7,031 units, against 47,809 in run 1.
- **Selection.**
  - 13 of the 48 combinations were feasible, all with 3 attempts and a basal income of 4
    or 5.
  - The declared median rule selected basal 5, inflow 4, capacity 64, attempts 3, scale 8.
  - On the primary landscape, that setting gave occupancy 0.81, 7–8% of organisms active
    (the bar is 5%) and 21–27% cross-feeding.
  - The replicate landscape was far more chemically active: 43% active and 69–70%
    cross-feeding.

## The ancestor is a producer

- The ancestor `mask_xor` has exactly one legal non-identity reaction on base material:
  255 with catalyst 65535 gives 65280. The reaction costs the ancestor energy: raw −10 on
  landscape `…7002` and −31 on `…7003`.
- This is why the pilot's provisional producer rule picked the ancestor at tick 0 in
  every run.
- The ancestral reaction accounts for 8–15% of legal reactions on landscape A and 1–2% on
  landscape B.
- On landscape A, 15–22% of cross-feeding reactions consume 65280. On landscape B, 0–3%
  do.

## Exploration (declared, `bd4590b0…`): evolved producers and new consumers

The exploration used corrected definitions:

- B must be a genotype absent at genesis.
- B's material must be new relative to the base material and to the ancestor's emissions.
- The C-class is new genotypes profitable on B's material but on neither the base
  material nor the ancestor's.

It ran the selected setting on both landscapes, with 6 pilot seeds each.

| | Landscape A | Landscape B |
|---|---|---|
| Evolved producer found | 6/6 worlds, ticks 5–30 | 6/6, ticks 5–20 |
| Consumer class present | 6/6 | 6/6 |
| Class established (≥20% of slots for 50 ticks) | 1/6 at thresholds 1 and 5; 2/6 at 20 | 1/6 |
| Class chemical gain negative | 18/18 threshold-by-world cases | 17/18 |
| Class gain drawn from B's material | about 0 everywhere | about 0 everywhere |

- **Producers.** Evolved producers appear within 30 ticks in all 12 worlds. Each opens a
  static niche of 3–224 panel consumers from a single new value.
- **Consumers don't eat the new material.** New consumer classes arise in every world,
  but their chemistry comes almost entirely from other material, on which the class
  definition makes them unprofitable on average. So their total chemical gain is
  negative, and the share drawn from B's material is essentially zero.
- **Background establishment.** The class establishes in 3 of 12 worlds without feeding on
  B's material, so for reasons other than B's niche. Any confirmatory measure of C-class
  establishment has a background rate independent of X, and the removal and rescue arms
  would have to beat it.

## What it means

- **As calibrated, the world does not turn static niches into selection.** The most
  likely reason is the chemistry rule: every legal reaction happens, uphill or downhill.
  So a consumer pays for reacting with material it cannot use, and most of any pool is
  material it cannot use.
- **A second likely reason is scarcity, though it is unmeasured here.** Producers of rich
  niches lose energy on their own reactions (NC-0's coupling), so their material may stay
  rare.
- **A confirmatory NC-1 run now would almost certainly return V0.** That null would be
  about forced chemistry.
- **The principled lever is thermodynamic spontaneity**: a reaction happens only if it
  releases energy. That removes the cost of unusable material and follows the second
  law. But it changes NC-0b's yield rule, so it needs its own static precheck (NC-0c)
  before recalibration. The universal-sink gate in particular could fail again once
  consumers stop paying for bad reactions.
- **The confirmatory design needs three further changes.**
  - B must be an evolved genotype, and its material must be new relative to the
    ancestor's emissions.
  - C-class establishment has a background rate that the design must estimate.
  - The phenomenon's size depends strongly on the landscape.
- **Scope.** Pilot seeds only, one setting, descriptive, and no interventions run.
