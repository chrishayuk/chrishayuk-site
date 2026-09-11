# AP-2: here, encapsulation is a compression trick, and the evolved module is typical for its output range

**Registered verdict: stop (not unusually valuable).** Programs built on the EX-11 enzyme
compute 33,197 genuinely new functions, ones that no shallower chain computes.

- **Against its whole shape class:** that beats 76% of the 6,971 other modules of the same
  shape, but not the registered bar, their 90th percentile (37,099).
- **Against output-matched modules:** among the 304 modules with about as many distinct
  outputs as the enzyme, it sits at the median.

So the enzyme's advantage over an arbitrary module is its output range and nothing more.
Under the pre-registered rule, the encapsulation line stops.

| Artifact | SHA-256 |
|---|---|
| Plan (`AP2-precheck-plan.md`) | `a9b59477333b42640ff1733d6abd6f150250b7debcbb19700c319f9abdab00d7` |
| Output (`ap2-encapsulation.json`) | `d5a9b7f137cf335960824e722fcaebd4fdbde96968a214d485014b0070aa89a6` |
| Source (`ap2_encapsulation.rs`) | `4f9db4a4649835497ba82818da9a05d5966e7fd883309276d446b6bd64408fe5` |

## What was done

- **Genome.** AP-1's chains of cells, with the depth cap raised to 4: 400.7 million
  programs. The encapsulated and unencapsulated worlds share exactly this program space.
- **Encapsulation.** A module joins the 84 primitives as one more unit for replace and
  wrap, and is charged its full size in cells. Only uses that still expand to a chain are
  allowed.
- **Structural fact F4, asserted rather than tested.** Relabelling the primitives maps the
  walk for one module exactly onto the walk for another module of the same shape. So all
  modules of a shape are identical at the program level, and they can differ only in what
  they compute.
- **The value measure, V2.** V2 counts the distinct new functions computed by the programs
  that contain a module intact. It was computed for all 14,112 two-cell modules. The enzyme
  was compared with its shape class and with the modules that have about as many distinct
  outputs.
- **Flux from the ancestor `mask_xor`,** within 3 mutations, for:
  - the enzyme;
  - its 8 structure-matched controls (`mask_xor` with a different upper primitive);
  - 4 useless modules;
  - 4 three-cell modules.
- **Validation.**
  - Nested evaluation equals the compiled chain on all depth-2 programs, and on 4,000
    sampled depth-3 and depth-4 programs.
  - Function counts at depths ≤ 2 and ≤ 3 match AP-0 and AP-1.
  - With no module and the depth cap at 3, the operator equals AP-1's.
  - Probability mass is conserved at every step.
  - F4 holds exactly.
  - Every branch of the decision rule was triggered on constructed inputs.
- **Runtime:** 466 s, with 7.4 GB peak memory.

## What was found

### The enzyme is typical for its output range

| Comparison set | Modules | Enzyme beats | 90th percentile of V2 | Unusually valuable? |
|---|---:|---:|---:|---|
| Same shape (upper slot 1, two different primitives) | 6,971 | 76% | 37,099 | no |
| Same shape, 21–23 distinct outputs | 304 | 49% | 38,811 | no |

The enzyme's V2 is 33,197. The median for the output-matched modules is 33,426. What sets
the enzyme apart is its output range: 22 distinct outputs on the domain, more than 82% of
its shape class (median 9). The 82 modules that keep the ancestor `mask_xor` at the bottom
and change only the upper primitive tell the same story: 32 of them have a V2 at least as
high as the enzyme's.

### A module's value is mostly its non-degeneracy

In the enzyme's shape class, the median V2 rises with the number of distinct outputs, and
levels off:

| Distinct outputs | 1 | 2–4 | 5–9 | 10–16 | 17–24 | 25–40 | 41–65 |
|---|---:|---:|---:|---:|---:|---:|---:|
| Modules | 202 | 2,143 | 1,260 | 1,488 | 897 | 806 | 176 |
| Median V2 | 2,348 | 13,013 | 22,194 | 29,426 | 33,536 | 36,402 | 36,202 |

- **How much output range explains.** Across the four two-cell shape classes, it explains
  64–77% of the variance in V2 (η²), with Spearman ρ between 0.68 and 0.85.
- **Content does matter a little beyond that.** The highest-valued modules are CRC and
  percentage compositions such as `percent(a, crc8_step(a,b))`, with V2 of 42,951.
- **The evolved module is not among them.**

### Useless modules are weak, not worthless

There are 478 useless modules, whose output is constant or equal to one of the inputs.
Their median V2 is 2,348, against about 26,000 for the rest: roughly a tenth. They still
create some new functions, because in a chain a constant module supplies a constant and a
projection duplicates an input.

### At the program level, all modules of a shape are identical, as asserted

The enzyme and each of its 8 structure-matched controls gave identical program-level
results:

- 56,700 programs are built on the module;
- 27,888 of those become newly reachable within 3 mutations;
- the rest become a median of 6.6× nearer.

### At the function level, from the ancestor, the enzyme is ordinary

Without encapsulation, 3,266,014 functions are reachable within 3 mutations of the
ancestor.

- **Newly reachable functions.** Encapsulating the enzyme makes 17,962 more reachable. Its
  controls make between 1,472 and 19,809, which puts the enzyme 3rd of 9.
- **Dramatically nearer.** Counting functions that are newly reachable or at least 10×
  nearer, the enzyme beats 6 of its 8 controls, not all of them.

### Bigger modules trade reach for room

- **Three-cell modules** with `mask_xor` at the bottom make each program built on them
  about 7,000× nearer. But with the depth cap at 4, only 169–253 programs can be built on
  them, and no function becomes newly reachable within 3 mutations.
- **Two-cell modules** have 56,700 programs built on them, 27,888 of them newly reachable.

So a larger module gives a much bigger gain per program, but leaves less room above it.
The advantage is not proportional to size.

### Expressibility at depth 4

There are 120,747,386 distinct functions at depth ≤ 4. Of these, 119,517,589 are first
computable at depth 4, and 77% of those are computed by exactly one program.

## What it means

1. **In this substrate, encapsulation is a compression trick.** A module's effect on
   accessibility is set by its shape (F4, exact). What it adds beyond that is mostly how
   many distinct outputs it has. The one evolved module adds nothing beyond that.
2. **The enzyme's advantage over an arbitrary module comes from its target.** Its output
   range is that of the EX-11 target, which was designed. Evolution found a program for a
   non-degenerate target. Having evolved does not make that program a better building
   block.
3. **The stronger, hierarchical version inherits F4.** A hierarchy's program-level effect
   is also set by its shape, so evolved hierarchies could differ from arbitrary ones only
   in what they compute. Testing that needs chains of depth ≥ 5 and more than one evolved
   module. That would be a new programme, not a continuation of this one.
4. **Every route in this substrate that goes beyond structure × selection now has a banked
   bound.**
   - AP-1: accessibility is containment, and runs add only selection.
   - The niche line: niche specificity and exploitability conflict.
   - AP-2: encapsulation is compression.

## Scope

- **One evolved module, whose target was designed.** AP-2 cannot say whether evolved
  modules in general are special. It can say that the only one on record is not.
- **V2 does not weight functions by usefulness.** Weighting them needs a target family.
  An independent family gives a null by construction (F3), and a designed family gives a
  positive by construction.
- **This is static, neutral accessibility,** for one genome and operator, with a depth cap
  of 4 and only uses that expand to a chain. Encapsulation that duplicates inputs would
  enlarge the program space, so it was excluded by design to keep the two worlds
  comparable.
- **Not replayed for byte-identity.** The run is deterministic by construction: it uses a
  fixed hasher, assigns function ids sequentially, and assembles parallel results in index
  order.
