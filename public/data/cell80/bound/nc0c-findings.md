# NC-0c: downhill-only chemistry brings back generic consumers, and the line stops

**Registered verdict: stop.** Spontaneous C4 failed on two of the three fresh landscapes:

- On landscape a, universal consumers reached 2.2% of the panel, against a bound of 1%.
- On landscape c, niche overlap between producers reached 0.269, against a bound of 0.25.

Landscape b passed every gate. The negative control failed on all three landscapes, so the
gates did discriminate between rules. Under the pre-registered rule, the niche-construction
line stops, with no further physics variants.

| Artifact | SHA-256 |
|---|---|
| Plan | `ac2f38fc89fed0eaccab5a8242082ba35ce2fe92eea742dfe8b646500d9d302b` |
| Output | `e80fd82e7b5d8fcf6b17e9ff665d5b32d56f66ee0078201e026bfccfe7998268` |
| Source | `ee0b0e6d4e536e7bc8d647779b1b198e58091c5f5a58f590e0aee8e605c0b111` |

## What was done

- **One change from NC-0b:** a C4-legal reaction happens only if it releases energy.
- **Fresh draws:** three landscapes (seeds `…7004`, `…7005`, `…7006`) and a new consumer
  panel (seed `…7300`: 84 atoms plus 600 compositions), with 48 producers per rule.
  NC-0b's gates were unchanged.
- **Controls:** spontaneous free products as the negative control. NC-0b's forced C4 ran on
  the same draws as a reference, outside the decision.
- **Validation:** nested evaluation matched compiled programs on 2,000 random triples.
- **Runtime:** 44 s.

## What was found

| Rule | Q1 emissions | Q2 niche overlap | Q3 new niches | Q4a universal | Q4b shuffle | Q4c ρ | Result |
|---|---:|---:|---:|---:|---:|---:|---|
| Spontaneous C4, a | 0.08 | 0.175 | 0.88 | **2.2%** (15 of 684) | 0.19 | 0.14 | fails Q4a |
| Spontaneous C4, b | 0.05 | 0.223 | 1.00 | 0.4% (3) | 0.21 | 0.10 | passes |
| Spontaneous C4, c | 0.09 | **0.269** | 0.96 | 0.6% (4) | 0.13 | 0.46 | fails Q2 |
| Spontaneous free products, a/b/c | 0.15–0.17 | 0.28–1.00 | 0.04–0.40 | 41–73% | 0.06–0.50 | −0.27 to 0.02 | fails 3–4 gates on each |
| Forced C4 reference, a/b/c | 0.31 | 0.10–0.17 | 0.71–0.98 | 0.0–0.1% | 0.09–0.10 | −0.57 to 0.12 | passes on all three |

**Spontaneity brings back generic consumers, and most of them are rotations.**
Rotation-based programs make up 10 of the 15 universal consumers on landscape a, all 3 on
landscape b, and 3 of the 4 on landscape c. The plain `rotl16` is universal on all three
landscapes, and `rotr16` on a and b.

The reason: a rotation always conserves set bits, so C4 always allows it. Under forced
chemistry it must take its uphill moves too, and on a random landscape its expected yield
is then zero. No rotation was universal in the forced reference. Once it can refuse the
uphill moves, it takes a downhill move from almost any material. The landscapes differ
only in how many consumers this reaches, and on landscape a the count crosses the 1%
bound.

**Niche specificity weakens.** Niche overlap rose to 0.175, 0.223 and 0.269, against
0.16, 0.10 and 0.17 for the forced reference on the same draws. On landscape c it crosses
the bound.

**Producers become scarcer, and their emissions more distinct.** Finding 48 producers
took 185–238 attempts, against 61 under forced chemistry. Emission overlap fell to
0.05–0.09, against 0.31. A producer now emits only when a reaction runs downhill.

**The energy coupling changes sign.** Niche size now rises with the producer's own energy
(ρ 0.14, 0.10, 0.46), whereas in the forced reference it mostly falls (0.12, −0.23,
−0.57). Landscape c sits close to the one-sided bound of 0.5.

**Forced C4 passes every gate again on these fresh draws.** That replicates NC-0b on a
third set of landscapes and a new consumer panel.

## What it means

**The line stops, as registered.**

**Banked statement (programme owner, 2026-09-11).** In the tested Cell80 chemistry, the
constraint that creates producer-specific niches also permits generic exploitation once
reactions become selectively energy-releasing.

**The two rules pull in opposite directions.** In this substrate, the same mechanism both
protects niche specificity and blocks niche use:

- *Forced chemistry:* consumers pay for every legal reaction. That cost stops
  permutation-like operations from profiting everywhere (universal consumers at most
  0.1%). But it also stops consumers living on a producer's material: in the NC-1 pilot
  they drew essentially no energy from it.
- *Downhill-only chemistry:* consumers no longer pay. Permutation-like operations then
  profit almost everywhere (universal consumers up to 2.2%), and niche specificity
  weakens.

Under both rules tested, niches that are specific and niches that consumers can exploit
pulled against each other.

**Scope.** Two chemistry rules, one genome (EX-11's two-cell programs), the EX-11 library
of 84 cells, and random energy landscapes. The conflict is established for these alone.
A different library, genome or chemistry family might resolve it, but under the
registered rule, testing that would be a new programme, not a continuation of this one.

## The niche-construction line, as banked

| Step | Result |
|---|---|
| NC-0 | Registered stop, caused by a mis-specified gate |
| NC-0b | Static niches exist under forced C4: specific, content-driven, no universal sink |
| NC-1 engine | Verified. It includes exact rescue by suppression plus injection |
| NC-1 pilot | Under forced C4, consumers do not realize those niches |
| NC-0c | Under downhill-only C4, specificity is lost to generic consumers |
