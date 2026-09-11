# NC-0b: the bit-conserving physics replicates on fresh draws, and C4 is frozen

**Registered verdict: freeze C4.** Rule C4 passed every gate on two fresh energy
landscapes, each with fresh and larger samples: 48 producers and 684 consumers. The
free-product negative control failed on both landscapes.

C4 is a chemistry in which a reaction must conserve its substrate's set bits, over a
random energy landscape. It is now frozen as the physics for the niche-construction
engine.

| Artifact | SHA-256 |
|---|---|
| Plan | `333e2d2335aea21352bc5c2418032fcbf22dac5b344c05dcec940d2b7af519ae` |
| Output | `bf5022611b4d25db049111a859c177999a97454389d673bac8a93a1ca18200da` |
| Source | `64e6e3f9e5b7a9205d413c60b124454f277eb23ab7f8d08d2c8e087593081f5f` |

## What was done

- **Setting.** The same as NC-0. Program outputs become material. A legal reaction yields
  E(substrate) − E(product), with a catalyst drawn from the 8 base values.
- **Rules.** C4 and the free-product rule N2, each on two fresh landscapes (seeds
  `0x5eedb4111e007002` and `…7003`).
- **Samples**, drawn from a fresh seed (`…7200`): 84 atoms plus 600 compositions as
  consumers, 48 producers per rule (the EX-11 enzyme first), and up to 2 second-order
  consumers per producer.
- **Q4c** is one-sided: it fails only if niche size rises with the producer's own energy.
  The decision was fixed before the run.
- **Validation.** Nested evaluation matched compiled programs on 2,000 random triples.
- **Runtime.** 84 s.

## What was found

| Rule | Q1 emissions differ | Q2 niche overlap | Q3 new niches | Q4a universal | Q4b shuffle overlap | Q4c ρ | Result |
|---|---:|---:|---:|---:|---:|---:|---|
| C4, landscape A | 0.25 | 0.19 | 0.98 | 0.1% (1 of 684) | 0.08 | −0.67 | all pass |
| C4, landscape B | 0.25 | 0.246 | 0.98 | 0.3% (2 of 684) | 0.17 | −0.57 | all pass |
| N2 (control), landscape A | 0.20 | 0.22 | 1.00 | 9.6% | 0.22 | −0.77 | fails Q4a |
| N2 (control), landscape B | 0.20 | 0.40 | 1.00 | 7.9% | 0.50 | −0.81 | fails Q2, Q4a, Q4b |

Pass bounds: Q1 ≤ 0.5, Q2 ≤ 0.25, Q3 ≥ 0.5, Q4a ≤ 1%, Q4b ≤ 0.25, Q4c ρ ≤ +0.5. Every rule
found all 48 producers.

- **C4's thinnest margin is Q2 on landscape B**: 0.246 against a bound of 0.25.
- **The control's failure on landscape A rests on one gate.** There, N2 passed niche
  specificity (0.22) and the shuffle gate (0.22). What separates C4 from free-product
  chemistry on that landscape is Q4a alone: conservation removes the universal sink (0.1%
  of consumers against 9.6%). Content-specific niches are therefore not unique to C4. The
  absence of universal consumers is.
- **The negative coupling replicates.** Niche size falls as the producer's own energy
  rises (ρ −0.67 and −0.57), as in NC-0: a niche is the energy left in the producer's
  waste. A two-sided Q4c would have failed again.
- **Niches are common and large.** On each landscape, 47 of 48 producers open one, with a
  median of 75 and 68 new profitable consumers respectively.
- **Second-order niches are common.** A consumer's own products open further niches in 70
  of 94 and 92 of 94 producer→consumer pairs (means 36 and 29).

## What it means

- **The registered decision is carried out: C4 is frozen.** Which landscape the engine uses
  is a choice for the engine's own preregistration. Running one landscape as the primary
  world and the other as its replicate is recommended.
- **Report the right distinction.** The robust difference between conserving and
  free-product chemistry is the universal sink, not content-specificity in itself.
- **Expect niches to overlap between producers.** Given the thin Q2 margin on landscape B,
  the engine should report niche overlap and not assume strong producer-specificity.
- **Scope.** Static only. Evolution may not produce these niches, and depletion,
  abundance and dynamics are ignored.
- **Next:** the engine design, in `NC1-engine-design-DRAFT.md`.
