# AP-1 plan (fixed before execution)

AP-1 is a static precheck of the growable genome proposed for EX-16. It involves no
evolution, selection or fitness. Its job is to decide whether the design in
`EX16-design-DRAFT.md` (v2) can pose invention-specific accessibility at all, and to
calibrate the thresholds the EX-16 preregistration will need.

## Genome and operator

- **Genome.** Chains of up to three cells over the 84 composable EX-11 primitives. Level 1
  is a two-input primitive of `(a, b)`. Each higher level takes the level below in one
  argument slot. That gives 84 + 14,112 + 2,370,816 programs.
- **Operator.** The move types are: replace one level's primitive, flip one level's slot,
  wrap (add a top level), and unwrap (drop the top level). The available types are equally
  likely, and each type's parameters are uniform.
- **Semantics.** Each program's function is its exact output on the 64-input EX-11
  resource domain, with traps counted as outputs. Signatures are computed by nested cell
  evaluation.

## Validation (in-run assertions)

- Nested evaluation equals the compiled chain on all 14,112 depth-2 programs and on 4,000
  seeded depth-3 programs.
- The depth ≤ 2 function count equals AP-0's 11,121.
- Among programs of depth ≤ 2, the EX-11 target is computed only by AP-0's witness.
- Every program is reachable from the ancestor `mask_xor`, and the maximum distance is 3
  (fact F2).
- Probability mass is conserved at every propagation step.

## Target families (seed `0x5eedb4111e006000`)

- **Hub family.** 4 hubs drawn from the functions first computable at depth 2, excluding
  the EX-11 target. Each hub gets 6 extensions, drawn from the functions first computable
  at depth 3 that are one wrap of the hub.
- **Independent family.** 24 functions drawn from the depth-3-exact functions, excluding
  hub extensions.

## Sources and controls

- **Ancestor:** `mask_xor`.
- **Candidate first inventions:** each hub (its lowest-index depth-2 program) and the EX-11
  enzyme.
- **Controls:** 8 head-start-matched controls per invention. Each is a depth-2 program at
  the same breadth-first-search distance from the ancestor whose function is not a hub, a
  target or the EX-11 target.

Flux is the expected number of visits to each target function within k = 1..3 mutations,
and up to k = 5 from the ancestor.

## Criterion (fixed now)

The invention is **specific** for a target when its flux at k = 3 exceeds the flux of
every one of its 8 controls. Under exchangeability, the chance rate is about 1/9.

The design is **posable** only if all three of these hold:

- the own-extension specific rate is at least 0.8 (hub → its own extensions);
- the other-hub-extension specific rate is at most 0.25 (hub → other hubs' extensions);
- the independent-family specific rate is at most 0.25 (every invention → independent
  targets).

## Expected answer shape, recorded before running

- **Own extensions:** the specific rate should be near 1 by construction, because each
  extension is one wrap from its hub. A pass on this rate alone certifies nothing about
  evolution.
- **Other hubs and independent targets:** both rates should sit near or below chance.
- **The informative outputs are the other two rates.** A high other-hub or independent
  rate would mean that programs computing the same function leak accessibility between
  hubs, which would confound EX-16's invention-specific contrast. The expressibility and
  degeneracy counts, the distance distribution, and the ancestor's flux into each
  extension (for V2 calibration) are also informative.
- **Invention-specific accessibility in the barrier sense:** the EX-11 enzyme should be
  specific for hub-family and independent targets only at the chance rate.
