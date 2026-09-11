# AP-2 plan (fixed before execution)

AP-2 is a static precheck of encapsulation. It involves no evolution, selection or fitness.

It is designed to kill one idea: that encapsulation lets an evolved module become an
unusually valuable building block. The alternative it tests against is a compression
trick. Turning any chunk into one mutation makes structures built on it nearer, whatever
the chunk is.

## A structural fact, recorded before running (F4)

The operator treats every primitive label alike. So relabelling the 84 primitives (any
permutation π) maps the encapsulated walk for module M exactly onto the walk for π(M),
with the sources relabelled too.

Every program-level quantity is therefore identical for all modules of the same shape:

- neighbourhood size;
- how many programs become nearer, and by how much.

A module's shape is its size, its slot pattern and which of its cells repeat. Which module
is encapsulated is invisible at the program level. It can matter only through semantics:
which functions the programs containing it compute.

This has two consequences:

- **The structure-matched arbitrary module is exactly a relabelling.** At the program
  level it ties the evolved module by construction. AP-2 asserts that identity; it does not
  test it.
- **The only open question is semantic.** Do programs built on the evolved module compute
  more genuinely new functions than programs built on arbitrary modules of the same shape?
  If so, is the difference only non-degeneracy? A module with more distinct outputs gives
  the cells above it more to work with.

## Genome and operators

- **Programs.** Chains of up to four cells over the 84 EX-11 primitives: AP-1's genome,
  with the depth cap raised to 4. That gives 84 + 14,112 + 2,370,816 + 398,297,088
  programs. Both worlds share exactly this program space.
- **Unencapsulated operator.** AP-1's operator at depth cap 4. The moves are: replace a
  level's cell, flip a slot, wrap and unwrap. The available move types are equally likely,
  and their parameters are uniform.
- **Encapsulated operator.** The module M, a chain of 2 or 3 cells, joins the 84
  primitives as one more unit:
  - replace and wrap can choose it like any primitive;
  - a module unit cannot be flipped;
  - unwrapping a module unit removes all its cells at once;
  - depth is counted in cells, so a module is charged its full size. Charging it as one
    level would grant depth for free.
- **Only uses that stay inside the chain space.**
  - At the bottom, a module computes m(a, b).
  - Above another level, it takes the lower output into one of its arguments. That use
    expands to a chain only if all of the module's upper levels take the same side input,
    so only that slot is allowed. Other uses would duplicate an input and create programs
    outside the chain space, and the two worlds would no longer share one program space.
  - A 2-cell module always has exactly one allowed upper slot.

## Measures

- **Function identity.** As in AP-1: the exact output on the 64-input domain, with traps
  counted as outputs. Every function of depth ≤ 4 is interned.
- **P_M.** The programs of depth 3 or 4 that contain M intact at an allowed position.
  These are the programs that encapsulation brings nearer. A 2-cell module has about 56,700
  of them, and every module of a given shape has the same number (asserted).
- **V2(M), the primary value measure.** The number of distinct functions computed by
  programs in P_M that no shallower chain computes. These are the new capabilities built on
  M. V2 uses the complete family of such functions, not a sample. A sampled family would
  contain almost no targets built on any given module, a null by construction (fact F3 in
  the EX-16 draft).
- **I(M).** The number of distinct outputs of M on the domain. This is the module's
  non-degeneracy.
- **Useless modules.** 2-cell modules whose output is constant on the whole domain, or
  equals a, or equals b.

## The evolved module

The EX-11 enzyme, `add_sat(a, mask_xor(a,b))`, is the evolved module:

- it computes the EX-11 target;
- it is the only evolved module on record;
- EX-15 rediscovered it in 45 independent origins from the ancestor `mask_xor`.

## Controls

- **Shape class.** All 2-cell modules with the enzyme's shape: upper slot 1, two different
  primitives. That is 6,972 modules.
- **Image-matched set.** The modules in the shape class whose I is within δ of the
  enzyme's I. δ is the smallest integer that gives at least 200 modules, excluding the
  enzyme itself.
- **Other comparisons.** Useless modules, and, descriptively, all four 2-cell shape
  classes.

## Decision (fixed now)

The enzyme is **unusually valuable within a set** if its V2 exceeds the set's 90th
percentile (nearest rank, with the enzyme excluded from the set), subject to the ceiling
rule below.

- **Posable** if and only if the enzyme is unusually valuable both within its shape class
  and within its image-matched set. The next step would then be a further precheck with
  more evolved modules, not a dynamic experiment.
- **Stop** otherwise. In this substrate, encapsulation is a compression trick:
  program-level value is set by shape (F4), and the only evolved module adds nothing
  semantic beyond arbitrary modules of the same shape and non-degeneracy.
- **Ceiling rule.** If at least 10% of a set ties at the set's maximum V2 and the enzyme
  ties there too, the enzyme is not counted as unusually valuable within that set.

A stop records one reason, checked in this order:

1. *ceiling*: the ceiling rule applied to either set;
2. *non-degeneracy*: unusually valuable within the shape class, but not within the
   image-matched set;
3. *not unusually valuable*: not unusually valuable within the shape class.

The decision is a pure function. Before it sees real data, it is called in-run on
constructed inputs that trigger each of its branches.

## Descriptive outputs (not part of the decision)

| Your question | What AP-2 reports |
|---|---|
| Accessibility to held-out targets | V2 against the complete family, and the gain distribution of flux from the ancestor |
| Mutational degree and neighbourhood size | At the program level: identical within a shape (F4, asserted). At the function level: distinct functions within 1 and 3 mutations |
| Targets that become dramatically nearer | Functions that become newly reachable, or at least 10× or 100× nearer, within 3 mutations |
| Do equivalent random modules do the same? | At the program level: yes, by construction. At the semantic level: the decision above |
| Is the advantage just module size? | Descriptive, from 3-cell modules. At a fixed depth cap, a larger module leaves less room above it, so value and size trade off |
| Do useless modules also benefit? | V2 of constant and projection modules, compared with the rest |

For each 2-cell shape class, AP-2 also reports:

- Spearman ρ(I, V2);
- η² of V2 on I, the share of V2's variance that non-degeneracy explains;
- the fraction of modules at the class maximum.

**Flux from the ancestor** is computed as in AP-1, for k = 1..3 mutations, for:

- the enzyme;
- 8 structure-matched controls: `mask_xor` with a different upper primitive in slot 1.
  These are relabellings that fix the ancestor, so F4 applies exactly;
- 4 useless 2-cell modules, with `mask_xor` at the bottom if at least 4 such modules exist
  (otherwise any 4);
- 4 random 3-cell modules with `mask_xor` at the bottom.

## Validation (in-run assertions)

- **AP-1's assertions:**
  - nested evaluation equals the compiled chain on all depth-2 programs and on 4,000
    seeded depth-3 programs;
  - there are 11,121 functions of depth ≤ 2 and 1,229,797 of depth ≤ 3;
  - AP-0's witness is the only depth ≤ 2 program that computes the EX-11 target.
- **Depth 4:** nested evaluation equals the compiled chain on 4,000 seeded depth-4
  programs.
- **Operator:** the encapsulated operator with no module and a depth cap of 3 equals AP-1's
  operator, on every program of depth ≤ 2 and on 4,000 seeded depth-3 programs.
- **Mass:** probability mass is conserved at every propagation step.
- **F4:**
  - the enzyme and each structure-matched control give identical sorted program-level visit
    masses, to a relative tolerance of 10⁻¹²;
  - every module in a shape class has the same number of programs in P_M.
- **Decision:** the decision function returns each branch on constructed inputs.

## Expected answer shape, recorded before running

- **Program level.** Identical within each shape class, by construction (F4). This is
  asserted, not a result.
- **V2 should track I closely.** Non-degenerate modules should open many new functions, and
  degenerate ones few. The modal outcome is a stop, with the enzyme unremarkable among
  image-matched modules or sitting at a ceiling.
- **Useless modules may not be useless.** In a chain, a constant module supplies a constant
  and a projection module duplicates an input. Both can create new functions. This is
  measured, not assumed.
- **A posable result would be surprising.** With one evolved module, it would license only
  a further precheck with more evolved modules.
- **Out of scope: hierarchical encapsulation.** A module inside a module inside a module
  needs depth ≥ 5. F4 extends to it: a hierarchy's program-level effect is also set by its
  shape, so any difference between evolved and arbitrary hierarchies would again have to be
  semantic.

Seed: `0x5eedb4111e008000`.
