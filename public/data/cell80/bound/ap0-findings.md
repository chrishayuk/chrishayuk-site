# AP-0: can the barrier ecology even pose "does an invention expand the adjacent possible?"

**Verdict: not in its current form.** The ecology's genome space is small, closed and
fully enumerable. Nearly every function it can compute already lies outside the primitive
repertoire. The evolved enzyme B opens nothing that the ancestor A cannot reach within two
mutations. So an "adjacent possible" comparison run in this substrate would measure
program structure and the experimenter's payoff design, not an effect of invention.

This is a static precheck of the mutation operator and the primitive library. It is not
EX-15 evidence and not an evolutionary experiment: no seeds, no selection, no fitness.

## What was computed

`ap0_neighbourhood_precheck` enumerates every program the EX-11 genome can hold: 84 atoms
plus 84 × 84 × 2 two-cell compositions, 14,196 programs in all. It computes each program's
exact output on the 64-input resource domain; a trap counts as an output. Every program's
capability was asserted equal to the ecology's own `Catalog::capable`. The one-step
neighbourhood follows `barrier::mutate` exactly:

- atom → any atom, or wrapped by any outer cell in either slot;
- composite → swap inner, swap outer, flip slot, or collapse to the inner atom.

Move probabilities are conditional on a program mutation occurring. Runtime: 17 s.
Raw output: `ap0-neighbourhoods.json`.

## What was found

| Quantity | Value |
|---|---:|
| Programs the genome can hold | 14,196 |
| Distinct functions they compute | 11,121 |
| Functions computed by some atom | 84 |
| Functions computed by a composite but by no atom ("barrier-crossing") | 11,037 |
| Programs computing the EX-11 target | 1 (`add_sat(a, mask_xor(a,b))`) |

| One mutation from… | Reachable functions | Barrier-crossing | P(lands on barrier-crossing) | P(lands on target) |
|---|---:|---:|---:|---:|
| A = `mask_xor` (ancestor) | 237 | 153 | 0.458 | 0.0030 |
| B = the enzyme | 169 | 163 | 0.735 | 0.0060 |

- **B opens 83 functions that A cannot reach in one step.** All 83 are barrier-crossing
  (the `add_sat(a, ·)` family), and **all 83 are within two steps of A**. B creates no
  reachability; it shortens 83 paths by one mutation.
- **B's neighbourhood is typical of its structure.** B reaches 169 functions. B's 167
  non-capable structural siblings (one move away, also two-cell) have a median of 163. B
  reaches more barrier-crossing functions than about 72% of those siblings (71.9%
  strictly fewer).
- **B is unusually unoriginal relative to A.** Its 83 functions not one step from A put it
  at the 1st percentile of all composites (median 146), because B contains A's gene.

## What it means for the proposed "adjacent possible" rung

1. **In a closed genotype space, an invention can only change distances, never
   possibilities.** Here the space is 14,196 programs, and every one of B's "new"
   functions is two mutations from A. "Previously inaccessible capabilities become
   reachable" can only mean shorter or more probable paths, which is a stepping stone.
   Genuinely new reachability needs a representation that can grow, such as deeper
   composition, or encapsulating an evolved composition as a new callable unit.
2. **"Outside the primitive repertoire" is a weak novelty test here.** 99.2% of
   computable functions pass it. What made EX-11's composition matter was that the ecology
   *rewarded* it, and the experimenter chose the reward.
3. **The only rewarded next step is designed in.** The ecology pays for exactly one
   function. Uptake C pays only because the energy rule grants substrate units solely to
   capable organisms. So the B→C dependency is a property of the payoff function. EX-12
   to EX-15 measure whether evolution discovers, transmits and realizes that dependency,
   not whether it exists. A count of "distinct new capabilities reachable" would have a
   denominator of one.
4. **A fitness-matched non-capable control cannot exist in this ecology.** Energy income
   is `3 + 4·units − 1 − nodes − 2·high`, and `units > 0` only for capable programs. Every
   non-capable genotype therefore earns no more than A. The proposed "World C" needs an
   explicit energy-subsidy arm, which is a different ecology.
5. **Structure-matched controls are mandatory.** Any two-cell program has a different,
   largely barrier-crossing neighbourhood from an atom. A comparison of "B versus A" alone
   would be won by structure, not capability.
6. **Composition cannot recurse.** The operator never composes a composition, so "the
   invention becomes a building block for further inventions" cannot be posed.

These are bounds on the instrument, fixed by the code and the library's algebra. They do
not say the adjacent-possible question is uninteresting. They say it needs a different
substrate before it can be asked without the answer being built in.
