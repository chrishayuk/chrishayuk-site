# AP-1: in a growable genome, an invention's accessibility effect is its sub-structure

**Verdict: posable, and decided by structure.** AP-1 passed its registered criterion on
every part that was not true by construction:

- hubs sent no excess flux to other hubs' extensions (0 of 72 pairs);
- inventions beat all their controls for independently drawn targets in only 5 of 120
  pairs (4.2%), below the 11% chance rate.

The own-extension part also passed (24 of 24), but that was by construction, as recorded
before the run.

The accessibility an invention adds is exactly the set of targets built on its
sub-structure. When the whole invention is contained in a target, the advantage is about
100,000-fold. When the target shares one cell with it, the advantage is about 100-fold.
When it shares no cell, there is none.

This is a static precheck of neutral mutational accessibility: no evolution, selection or
fitness. The plan was fixed before execution (`AP1-precheck-plan.md`, SHA-256
`0bcc2e8169241421c0a4e22848efaf9772cbc50efec617b48a7fa7c0c6112524`). The output is
`ap1-chain-accessibility.json`, SHA-256
`c19e4152b457812e9fb89d0b02157682ce6034a1845f0b1046c8b2c09f34dfec`.

## What was computed

- **Genome and operator.** Chains of up to three cells over the 84 EX-11 primitives,
  2,385,012 programs in all. The moves replace a level's cell, flip a slot, wrap or
  unwrap; the available move types are equally likely.
- **Exact functions.** Each program's output on the 64-input domain was computed by nested
  cell evaluation (4.4 million cell evaluations). It was validated against the compiled
  chain for all 14,112 depth-2 programs and for 4,000 sampled depth-3 programs. The count
  of depth ≤ 2 functions, 11,121, matches AP-0.
- **Target families**, drawn with seed `0x5eedb4111e006000`: 4 hubs (depth-2 functions),
  each with 6 one-wrap extensions, and 24 independent depth-3 functions.
- **Flux**: the expected visits to each target within k = 1..3 mutations (up to k = 5 from
  the ancestor). Sources were the ancestor, each hub, the EX-11 enzyme, and 8
  head-start-matched controls per invention. Probability mass was conserved at every step.
  The run took 55 s.

## What was found

| Quantity | Value |
|---|---:|
| Distinct functions | 1,229,797 |
| First computable at depth 1 / 2 / 3 | 84 / 11,037 / 1,218,676 |
| Depth-3 functions computed by exactly one program | 1,014,154 (83%) |
| Programs at distance 0 / 1 / 2 / 3 from the ancestor | 1 / 251 / 42,168 / 2,342,592 |
| Programs computing the EX-11 target, at any depth | 3 (only AP-0's witness at depth ≤ 2) |

| Specificity at k = 3 (invention beats all 8 controls) | Result | Registered bound |
|---|---:|---|
| Hub → its own extensions | 24/24 | ≥ 0.8 (true by construction) |
| Hub → other hubs' extensions | 0/72 | ≤ 0.25 |
| Invention → independent targets | 5/120 (4.2%) | ≤ 0.25 |
| EX-11 enzyme → hub extensions | 0/24 | descriptive |

**The own-extension advantage is huge.** A hub reaches each of its extensions with
probability 1.5 × 10⁻³ after one mutation, and 2.4 × 10⁻³ within three. Its controls'
median is about 2 × 10⁻⁸, and their maximum is 7 × 10⁻⁵. The median ratio is about
89,000 and the minimum is 1,441. In 10 of the 24 pairs, the control median was zero.

**The head start does not explain it.** Given two extra mutations (k = 5), the ancestor
reaches a typical single-program extension with probability about 1.9 × 10⁻⁷. That is
about 12,000 times less than the hub manages within three.

**The five independent-target hits are partial containment, not leakage.** Each target
shares one cell with the invention. For example, hub 2 `mask_has_any(mask_has_none(a,b),b)`
and the target `lcm(mask_has_any(add_sat(a,b),b),b)` share `mask_has_any`. The advantages
are 150–450-fold.

## What it means

1. **In this genome, the question is answered before evolution runs.** An invention
   multiplies the accessibility of targets built on it by 10²–10⁵ and leaves everything
   else untouched. Other programs computing the same function add almost nothing, because
   83% of depth-3 functions are computed by exactly one program.
2. **V1 and V2 as worded would confirm a known prediction.** In the EX-16 draft, they
   would confirm a static prediction with four orders of magnitude to spare. They are
   necessary checks, not discoveries.
3. **What an evolutionary run adds is selection, and only selection.** Every new
   genotype arises by one mutation from a parent. So the expected number of times a
   target is discovered equals the one-step map computed here, summed over the parents
   that actually reproduced. For a target one mutation from the invention, that is
   exactly carrier births times a fixed probability, so there is no residual at that
   step. What a run can add:
   - how common the invention becomes, which the designed rewards drive;
   - whether discoveries establish once they arise;
   - selection on intermediates for targets two or more mutations away, which reweights
     the neutral multi-step map (the effect Lenski et al. 2003 reported);
   - contingency: which hub evolves first.

   *Correction:* an earlier version of this note proposed an "ecological residual",
   realized accessibility divided by static flux times abundance. For one-step targets
   that ratio equals 1 in expectation by construction, so it measures nothing.
4. **Going beyond structure × selection needs one of two mechanisms**, and both are
   designs that must be registered:
   - *Niche construction:* the invention changes the environment, and through it the
     selection on genotypes that do not carry it.
   - *Encapsulation:* the invention changes the move set itself.

   Everything else is the static map computed here, multiplied by fitness set by the
   rewards.
5. **Scope.** This is neutral mutational flux for one representation and one operator.
   It is not evolutionary accessibility under selection, and the target families are two
   seeded draws.
