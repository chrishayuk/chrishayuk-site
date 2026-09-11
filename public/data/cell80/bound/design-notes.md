# EX-16 design (DRAFT v2, not registered): does an invention change which future inventions are accessible?

**Status: closed (2026-09-11).** The branch ended with a bound: in Cell80's fixed worlds,
apparent expansion of evolutionary possibility came down to representation, target choice
or selection. The write-up is [CELL80 / 04](../cell80-04-next-invention-DRAFT.md). A
successor needs a world whose regularities are not chosen for the invention. It would be a
new programme, not a rescue of this one.

The B→C line is closed: EX-15 is banked as is, and EX-15b will not be run. AP-1 (below)
is the first gate.

## The question, worded so that it can be answered

Can a specific, naturally evolved invention change which later inventions evolution
reaches within a fixed evolutionary budget, beyond what the invention's structure, head
start and fitness explain?

"Within a budget" is deliberate. Three structural facts rule out a stronger wording.

**F1. No invention can enlarge what is ultimately reachable.** Take any fixed genome and
mutation operator. If B evolved from A in d mutations, then every genotype that B reaches
in k mutations, A reaches in k + d. This holds whether or not compositions can be
composed. A growable representation changes which paths are short and probable, not
which destinations exist. So "B created a new possibility" is never a verdict; every
available claim is about accessibility.

**F2. In a small growable genome, reachability as a set is total.** In the minimal
growable version (chains of up to three cells), each of the 2,370,816 depth-3 programs
is at most three mutations from the ancestor. "X is unreachable from A within the
horizon" can therefore only mean "X is improbable within the budget". The registered
static prediction must be a probability, not a reachable set: the neutral k-step mass
that flows into each target.

**F3. The target family decides the answer before evolution runs.** In a compositional
genome, an invention raises accessibility only for targets that contain it, or a
functional equivalent, as a sub-structure. A given depth-2 program has 168 one-wrap
extensions among 2.37 million depth-3 programs. That gives two failure modes:

- Targets drawn independently of each other give a null for invention-specific effects,
  by construction.
- Targets built around a known invention give a dependency, by construction.

The workable design is a target family fixed by seed before any run, whose members share
sub-structure with each other. That means random "hubs" plus extensions of those hubs,
the pattern of Avida's logic tasks. The family is independent of any invention, and
evolution decides which hub is invented first. The claim then concerns realization and
contingency. Did evolution realize the accessibility that its first invention statically
predicts? And did a different first invention send it somewhere else?

## Verdict ladder (each preregistered separately)

Each verdict must beat all four controls below and must agree in direction with the
registered static prediction. A lower verdict never counts as a higher one. No verdict is
reported as "expanded the adjacent possible".

- **V0, null.** No invention-specific change in accessibility beyond the controls.
- **V1, acceleration (weak).** Descendants of the invention realize a target sooner than
  both the head-start-matched structure controls and the fitness-subsidy controls, by a
  registered margin. This is an evolvability or search-efficiency result.
- **V2, horizon crossing (strong).** Within the registered budget, the target is realized
  in at least a registered fraction of invention worlds and in at most a registered
  fraction of every control world. The static model must also predict the crossing:
  neutral flux from A below a registered threshold, and from the invention above it.
  This is V1 past a registered threshold, and it is still a claim about accessibility,
  not about a new possibility (F1).
- **V3, iterated building block (very strong).** A target realized via the invention
  becomes the base for a further registered target, which is then realized. Removing the
  first invention prevents both within the budget. This must repeat across several
  independent origins. It needs chains of depth ≥ 4 or encapsulation (see below).
- **Never a verdict:** "the invention created possibilities that did not exist" (F1).

## Substrate proposal

- **Genome.** A chain of up to D cells. Level 1 is a two-input primitive, and each higher
  level takes the level below in one argument slot. D = 3 gives the exactly enumerable
  version. The EX-11 two-cell program is the depth-2 case.
- **Operator.** Four move types: replace a level's primitive, flip a level's slot, wrap
  (add a top level), and unwrap (drop the top level). The available move types are
  equally likely, and each type's parameters are uniform. For single cells this equals
  the EX-11 operator. For two-cell programs, the replace moves are halved to make room
  for wrap.
- **Energy.** One rewarded resource per target, each with EX-11's economics, plus a
  running cost per level.
- **Targets.** The hub family from F3, drawn by a registered seed. Hubs are rewarded, so
  intermediates can be selected for. (Lenski et al. 2003 found that EQU did not evolve
  when only EQU was rewarded.)
- **Vocabulary growth (needed for V3).** Encapsulation: an evolved chain becomes a
  callable cell that mutations can insert as a unit. This is a designed mechanism, so its
  cost rule must be registered just like a fitness function. A rule that charges a module
  as one level grants depth for free, and so builds in part of the answer.

## Controls

- **Removal.** Revert the invention at its birth, using the existing fork machinery.
- **Head-start-matched structure control.** A non-rewarded chain of the same depth, at the
  same distance from the ancestor. It has the invention's head start but not its content.
  This is the control that separates "the invention matters" from "being further along
  any path matters" (F1).
- **Fitness subsidy.** An energy grant that gives a non-capable genotype the invention's
  income. This is an ecology change and must be registered as one.
- **Family redraw.** A second target family, drawn after the invention is frozen, to
  measure how much of any effect comes from the first family's draw.

## AP-1: the first gate

AP-1 is a static precheck on the proposed genome with D = 3. It involves no evolution.

1. **Expressibility.** Count the distinct functions at each depth, and how many programs
   compute each one (degeneracy). Validate nested cell evaluation against compiled chains:
   every depth-2 program, plus a depth-3 sample.
2. **Distances.** Confirm F2 with a breadth-first search from the ancestor.
3. **Neutral accessibility.** Compute the expected number of visits to each target
   function within k = 1..3 mutations under the operator.
   - Sources: the ancestor, each candidate first invention (each hub, and the EX-11
     enzyme), and head-start-matched controls for each invention.
   - Target families, both drawn by a registered seed: an independent family of 24
     depth-3 functions, and a hub family of 4 depth-2 hubs with 6 extensions each.
4. **Posability criterion.** EX-16 as designed can show invention-specific accessibility
   only if both of these hold:
   - Under the hub family, each hub sends more flux to its own extensions than every one
     of its head-start-matched controls does, well above the chance rate, while it sends
     no excess to other hubs' extensions.
   - Under the independent family, invention-specific excess stays at the chance rate.

   If the hub family fails, the dynamic experiment cannot show invention-specific
   accessibility, even in principle.

AP-1 also calibrates the V2 threshold: the neutral flux from the ancestor into each hub
extension, within the budget's expected number of mutations.

## AP-1 result and what it changes (2026-09-11)

AP-1 passed its posability criterion on the parts that were not true by construction:

- no excess flux reached other hubs' extensions (0 of 72 pairs);
- independent targets beat the controls in only 5 of 120 pairs, below chance.

It also showed that **V1 and V2, as worded above, are decided by the static structure
before evolution runs** ([findings](AP1-FINDINGS.md)):

- **The own-extension advantage is four to five orders of magnitude.** A hub reaches its
  own extensions with probability about 2.4 × 10⁻³ within three mutations. Its
  head-start-matched controls reach them with about 2 × 10⁻⁸. The ancestor, even with two
  extra mutations, reaches them with about 2 × 10⁻⁷.
- **Sharing one cell gives about 100-fold; sharing none gives nothing.** 83% of depth-3
  functions are computed by exactly one program, so other programs computing the same
  function do not blur this.

So a run testing V1 and V2 against these controls would confirm a 10⁴-fold static
prediction. Keep V1 and V2 as required confirmations, but do not headline them.

There is a stronger consequence. Every new genotype arises by one mutation from a parent,
so the expected number of discoveries of any target is the one-step map summed over the
parents that actually reproduced. An evolutionary run therefore decomposes exactly into
two terms:

- **structure**: the static map, now computed;
- **selection**: which genotypes reproduce, set by the rewards.

For targets one mutation from an invention, there is no third term.

*Correction:* an earlier version of this section proposed an "ecological residual",
realized accessibility divided by static flux times abundance. For one-step targets it
equals 1 in expectation by construction, so it measures nothing.

What a run can still add:

1. **Selection on intermediates.** For targets two or more mutations away, selection
   reweights the neutral multi-step map. Rewarded intermediates open paths, and
   unrewarded ones close them (Lenski et al. 2003).
2. **Establishment and contingency.** Whether discoveries persist, and which hub evolves
   first.

Going beyond structure × selection needs a mechanism in which evolved content changes
something the map takes as fixed. There are two, and both are designs that must be
registered:

- **Niche construction.** An invention changes the environment, for example by releasing
  metabolic by-products that become resources, and so changes selection on genotypes
  that do not carry it. This is the only way an invention can change *which* targets are
  rewarded next, rather than which are close.
- **Encapsulation.** An invention becomes a unit of the move set. AP-2 would compute that
  map before any run.

The very strong outcome, the search constructing its own search space, requires one of
these two by definition.

Open decision for the programme owner:

- (a) EX-16 on the chain genome as an exact structure × selection decomposition, covering
  selection on intermediates and contingency. This is modest: the phenomena are known,
  and the exact accounting is the contribution.
- (b) Niche construction, starting with a static precheck of which new rewarded targets
  each invention's by-products would create.
- (c) Encapsulation, starting with AP-2.

**Decision (2026-09-11): (b), niche construction, in a semantically neutral form.**
Program outputs persist as material, and a generic physics rule decides when transforming
material yields energy. No rule assigns meaning to any program or value.

The simple version (an invention emits a resource that another organism eats) is not new.
Cross-feeding and food webs have evolved in digital-evolution systems, reviewed in
*Frontiers in Ecology and Evolution* (2021). And in the LTEE, Cit+ cells release
C4-dicarboxylates that other lineages evolved to exploit. The Cell80 angle would be exact
causal tracing of niche chains: removal, fitness-matched and rescue interventions under
replay.

NC-0, the static precheck, returned a registered verdict of stop. Its binding gate turned
out to be mis-specified, and one rule passed every other gate. See
[NC-0 findings](../ecology-niche-construction/NC0-FINDINGS.md).

NC-0b was a prospective correction with a one-sided niche-size gate, run on fresh energy
landscapes and fresh, larger samples, with a free-product negative control. It froze C4
(reactions conserve set bits) as the physics. See
[NC-0b findings](../ecology-niche-construction/NC0b-FINDINGS.md). The dynamic experiment
is drafted in [NC-1](../ecology-niche-construction/NC1-engine-design-DRAFT.md).

**Line closed (2026-09-11).** The NC-1 engine was built and verified. Its calibration
pilot then showed that forced chemistry does not realize these niches: consumers drew
essentially no energy from producers' material. NC-0c tested the fix, reactions that only
run downhill. Under the registered rule it failed on two of three landscapes, because bit
rotations became universal consumers and niche overlap rose. The niche-construction line
therefore stopped. See the
[NC-1 pilot findings](../ecology-niche-construction/NC1-pilot-FINDINGS.md) and the
[NC-0c findings](../ecology-niche-construction/NC0c-FINDINGS.md).

**Next (2026-09-11): (c), encapsulation, starting with the static AP-2 precheck.** Option
(a) is skipped. AP-1 already decomposes the chain genome into structure × selection, so a
dynamic run there would add only incremental accounting. AP-2 is designed to kill the
idea. Its decisive control is a structure-matched arbitrary module: if any module of the
same size gives the same benefit, encapsulation is only a compression trick.

**AP-2 result (2026-09-11): stop. Here, encapsulation is a compression trick.**

- **At the program level, shape decides everything.** Relabelling the primitives maps the
  encapsulated walk for one module exactly onto the walk for another module of the same
  shape. So program-level accessibility is set by a module's shape alone (fact F4,
  asserted).
- **Semantically, the evolved module is typical.** The only evolved module on record is the
  EX-11 enzyme. Among modules with about as many distinct outputs, it sits at the median.
  Its advantage over an arbitrary module is its output range, which comes from its designed
  target.

See the [AP-2 findings](AP2-FINDINGS.md). With AP-1, the niche line and AP-2, every route
in this substrate that goes beyond structure × selection now has a banked bound.

## Prior art to check before any novelty claim

These are leads from memory, not a completed literature search.

- **Lenski, Ofria, Pennock and Adami (2003).** EQU evolved in 23 of 50 populations when
  simpler functions were rewarded, and in none of 50 otherwise. This is the hub-family
  pattern, with a population-level result.
- **Blount, Borland and Lenski (2008).** Historical contingency and potentiation of Cit+
  in *E. coli*, tested by replaying from frozen ancestors.
- **Andreas Wagner's genotype-network work.** Accessible novelty measured by exhaustive
  enumeration in RNA and metabolic models.
- **Genetic-programming module acquisition.** Koza's automatically defined functions,
  Angeline and Pollack's module acquisition, and Rosca and Ballard's subroutine
  discovery. These bear on encapsulation.

The plausibly distinct contribution is exact static accessibility, registered before
evolution runs, combined with event-level counterfactual intervention on one historical
invention. That combination needs a proper literature pass before it is claimed as new.

## Relationship to EX-15 and AP-0

EX-15 is banked as is. AP-0 showed that the closed two-cell genome cannot pose the
question at all. F1–F3 show that a growable genome can pose only an accessibility version
of it, and only with a hub-structured target family.
