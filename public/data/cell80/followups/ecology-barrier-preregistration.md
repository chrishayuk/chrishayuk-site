# EX-11: an engineered capability barrier

Registered before experimental runs. This is a new controlled metabolic body inside
cell80-life, not a silent change to the completed predator/grazer engine. It reuses
Cell80's actual cell IR execution and counter-based random generator. Success would
establish a bounded, deliberately engineered evolutionary ratchet, NOT open-endedness.
The experimenter knows a solution; evolution is not given the solution as a genotype.

## Resource and exhaustive primitive exclusion

A sealed nutrient requires an enzyme to implement
`R(a,b) = min(65535, a + (a XOR b))` on every pair from
`D = {0,1,2,7,31,255,65534,65535}` (64 pairs). A trap is failure, never a numeric zero.
This all-input specificity requirement is an explicitly engineered barrier, not a
naturalistic chemical simulation. There is no partial-credit nutrient reward.

Test every discovered stateless two-u16-input/u16-output primitive against D×D.
One counterexample excludes a primitive; store it. Stop the experiment as invalid if
any primitive passes. A known composition, add_sat(a,mask_xor(a,b)), is only a test
witness: validate it independently but never insert it into the evolving population
or mutation pool. Mutation builds expressions at birth from the full eligible
single-function, const-free binary primitive set. Record both pool manifests and
exclusions. Claims of primitive exclusion are limited to this typed interface/library.

Genomes: an atomic primitive, or a two-cell argument-substitution expression
`outer(a,b)` with argument slot0 or1 replaced by `inner(a,b)`; plus a low/high uptake
regulation allele. Initial organisms carry only primitive mask_xor and low uptake.
Expression length stays bounded at two cells. No novelty/fitness filtering of proposals.
New expressions are assembled and executed on demand when mutation creates them;
memoizing repeated evaluations does not prepopulate a pool of successful compositions.

## Controlled ecology

256 population slots in16 nutrient patches of16 slots, 3,000 ticks. All founders start
with energy24. Each tick supplies3 basal energy per living organism. A capable enzyme
can consume sealed substrate: quota1 for low uptake, quota3 for high; each unit yields
4 energy. Each patch replenishes48 units per tick, capacity64. Fixed per-tick costs:
1 basal maintenance +1 per program cell +2 if high uptake. Nutrients are therefore
deliberately useful after decoding, while increased uptake has a cost without decoding.
Fitness never branches on a particular cell name, composition ID or target lineage.

Independent2% per-slot dilution each tick, plus starvation at energy<=0. At energy>=40,
an organism gives20 energy to one child; reproduction replaces a random other slot.
Only organisms present at the beginning of the reproduction phase can reproduce that
tick. Randomized cyclic processing order; all randomness counter-keyed and recorded
through canonical state hashes. This is a finite chemostat/replacement ecology, not
the older spatial foraging model or a claim of emergent ecological complexity.

At each birth: program mutation4%; uptake toggle0.05% (5 basis points), independent.
For an atom, a program mutation equally chooses replacement by a random eligible atom
or insertion of a random outer cell in a random argument slot. For a composition,
choose equally: replace inner, replace outer, flip slot, or delete outer. The new
program is inherited even if it fails the resource assay. No directed mutation.

## Fixed discovery matrix and retention

Seeds `0x5eedb4111e000000 + 0..9`, four arms,40 primary discovery worlds:

1. full: both mutations, substrate present;
2. B-only: uptake mutation disabled, everything else unchanged;
3. no-substrate: both mutations, substrate absent;
4. atomic-only: program mutations replace atoms; composition cannot occur.

Log discovery, all changed-genome births, population/capability trajectories and hashes.
A clean B lineage starts with a newly capable program in a low-uptake child of an
incapable parent, and follows only exact-program, continuously low-uptake descendants.
It is established after reaching>=20% of all256 slots for50 consecutive completed
ticks. Count only that clean lineage, excluding descendants with earlier uptake changes.

Retention gate: in>=8/10 B-only worlds, mean capable fraction in the final200 ticks
must be>=.5 and a clean B lineage must establish. At most2/10 no-substrate worlds may
establish a clean B lineage. Atomic-only must never acquire capability or substrate
energy. These controls separate benefit/retention from mere appearance and mutation supply.

## Sequential candidate and original-world fork

Per full world, choose only the FIRST low-to-high uptake birth from an already
established clean B lineage, inheriting exactly that B program. The eligibility decision
is made online before inspecting that child's future offspring. Do not replace a failed
candidate with a later one. C must arise later than B, with no earlier high-uptake allele
on its ancestral path. Require this candidate in at least3 of the10 full worlds.

For each selected C birth, replay its original world reverting ONLY that uptake toggle.
Verify the exact pre-birth world digest and birth context. Report focal offspring and
descendants in both worlds; do not require a favourable original-world realization to
run or select the held-out tests. Record the full B→C ancestry path.

## Necessary enabling effect, not merely positive interaction

For each candidate, use10 fresh seeds `0x5eedb4111e000000 +100..109` for mutation-off
assays,200 ticks each. Place one focal founder at slot0 among255 ancestral mask_xor/low
competitors. Identical initial energy and ecology in all arms. Four focal genotypes:
actual pre-B parent program vs evolved B, crossed with low vs high uptake. Other model
parameters remain fixed. Primary fitness: total births in the focal founder's descendant
lineage, including its own births, over200 ticks. Report direct offspring and final
lineage population secondarily. Extinct lineages remain zero, never omitted.

For a candidate to pass, require all of:
- B-low outperforms pre-B-low in>=8/10 worlds and on average;
- C's birth benefit WITH B is strictly positive in>=8/10 worlds and on average;
- C's birth benefit WITHOUT B is nonpositive in>=8/10 worlds and on average.

Thus a bigger positive interaction alone is insufficient. Repeat the B-high arm after
the removal assays: restoration must recover exactly the same world hash and outputs
in every fresh seed. This is paired removal/restoration from identical initial states,
not reuse of descendant IDs after an earlier diverging historical replay.

Overall success requires primitive exclusion, retention/controls, and passing candidates
from>=3 independent discovery seeds. The fresh seeds are reused across candidates:
do NOT count candidate assays as independent new environments. Do not change the
target, seeds, rates, horizons or gates to obtain a positive result. Invalid prerequisites,
negative and inconclusive results are valid stopping outcomes. Any technical correction
must be documented before affected reruns, with earlier evidence retained.
