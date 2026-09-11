# NC-0c plan (fixed before execution)

## Why

The NC-1 pilot showed a mismatch in C4 as frozen by NC-0b. Every legal reaction happened,
uphill or downhill, so consumers paid for reacting with material they could not use. As a
result they drew essentially no energy from producers' material.

NC-0c tests the physics with one change: **a legal reaction happens only if it releases
energy.**

- C4 legality still defines which reactions are possible: the product must keep the
  substrate's number of set bits.
- The energy landscape now decides which way they run. A reaction occurs if and only if
  it is legal and E(substrate) > E(product).
- When it occurs, its yield is E(substrate) − E(product), which is positive. Otherwise
  nothing happens, and the yield is 0.

NC-0b's result does not carry over to this rule, so NC-0c is a fresh static precheck using
NC-0b's gates.

## Setting

The same as NC-0b, apart from the spontaneity rule:

- **Programs:** the EX-11 programs.
- **Material:** the base is the 8 domain values. A reaction takes its substrate from the
  material and its catalyst from the base.
- **Definitions:** as in NC-0b for emission, opportunity, new niche N_B, the
  energy-matched shuffle and second order.
- **Opportunity:** mean yield > 0. Under spontaneity this means at least one spontaneous
  reaction exists.
- **Validation:** nested evaluation is checked against compiled programs on 2,000 random
  triples, as an in-run assertion.

## Rules

| Rules | Physics | Role |
|---|---|---|
| sC4a, sC4b, sC4c | spontaneous C4 | the candidate |
| sN2a, sN2b, sN2c | spontaneous, products free | negative control |
| C4ref-a, C4ref-b, C4ref-c | C4 as frozen by NC-0b (not spontaneous) | reference only, not part of the decision |

Each rule set runs on three fresh landscapes, with seeds `0x5eedb4111e007004`, `…7005`
and `…7006`.

## Samples

All samples use the fresh seed `0x5eedb4111e007300`:

- **Consumers:** the 84 atoms plus 600 compositions.
- **Producers:** 48 per rule, with the EX-11 enzyme first.
- **Second-order consumers:** up to 2 per producer.

This consumer panel becomes the reference panel for any later NC-1 niche definition.

## Gates

These are NC-0b's gates, unchanged.

| Gate | Pass condition |
|---|---|
| Q0 | at least 24 producers |
| Q1 | emission overlap (Jaccard) ≤ 0.5 |
| Q2 | niche overlap ≤ 0.25 |
| Q3 | at least 50% of producers open a new niche |
| Q4a | at most 1% of consumers are universal (profitable on at least 90% of emissions) |
| Q4b | overlap between an emission's niche and its shuffle's niche ≤ 0.25 |
| Q4c | one-sided: Spearman ρ(producer's own energy, niche size) ≤ +0.5 |

Two gates carry extra weight:

- **Q2 is not softened**, even though NC-0b's landscape B passed it at only 0.246. That
  thin margin is a reason to demand replication, not to move the line.
- **Q4a is the kill condition.** Once a consumer no longer pays for bad reactions, many
  programs may be able to skim energy from nearly every material.

## Decision (fixed now)

Adopt spontaneous C4 for NC-1 recalibration only if both of these hold:

- sC4 passes every gate on all three landscapes;
- sN2 fails at least one gate on each landscape.

Otherwise, stop the niche-construction line, with no further physics variants.

## Expected answer shape

- **Opportunity sets grow on every material, base included.** Under spontaneity a consumer
  counts as profitable on material if it has any energy-releasing reaction there. Q4a is
  the main risk, and Q2 and Q4b could also rise.
- **The reference shows the effect of spontaneity.** Running forced C4 on the same draws
  shows how far spontaneity moves each gate.
- **The energy coupling may persist.** Niche size may still fall as the producer's own
  energy rises, because unreleased energy stays in the product. This is reported.
- **A pass shows static expressibility only.** Whether the dynamic world realizes those
  niches is the recalibration's question.
