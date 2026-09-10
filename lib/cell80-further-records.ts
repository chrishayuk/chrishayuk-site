import type { PublicationRecord } from "./types.ts";

export const cell80FurtherIds = ["N-CELL80-BARRIER", "N-CELL80-HISTORY"];
export const cell80FurtherPart = (id: string) => cell80FurtherIds.indexOf(id) + 1;

const common = {
  kind: "notebook" as const, created: "2026-09-10", version: "0.1",
  publication: "draft" as const, status: "PARTIALLY SUPPORTED" as const,
  authors: ["Chris Hay"], media: [],
  concepts: ["artificial-life", "digital-evolution", "causal-intervention"],
};

export const cell80FurtherRecords: PublicationRecord[] = [
  {
    ...common, id: cell80FurtherIds[0], slug: "give-invention-something-to-unlock",
    title: "Give invention something to unlock.",
    dek: "A nutrient no primitive could use. A program born inside the world.",
    abstract: "EX-11 introduced an engineered resource barrier in a new Cell80 metabolic world. All 89 typed primitives failed its test; one of 1,825 compositions evaluated during mutation passed. The capability arose online, but retention and candidate timing failed the registered ratchet criterion. No eligible dependence assay ran.",
    lineage: "CELL80 / FURTHER NOTES · EX-11 · THE CAPABILITY BARRIER",
    related: ["N-CELL80-03", "N-CELL80-HISTORY"],
    body: [
      {kind:"observation",label:"THE BARRIER",text:"The earlier movement experiment could find useful code without finding a new behaviour. I wanted a sharper test: something the existing pieces could not do alone, with a consequence for life in the world."},
      {kind:"observation",label:"A DIFFERENT WORLD",text:"I built a new metabolic ecology with a deliberately engineered nutrient. To process it, a program had to return min(65535, a + (a XOR b)) on all 64 registered input pairs. All 89 typed primitives failed at least one pair. This is a claim about this library and interface, not every possible program."},
      {kind:"observation",label:"BORN HERE",text:"Founders carried mask_xor and low uptake. Mutation could combine two cells at birth from 84 composable primitives. Of 1,825 distinct expressions evaluated during mutation, one passed: add_sat(a, mask_xor(a,b)). It arose more than once, but those origins were the same kind of capability."},
      {kind:"observation",label:"WHAT I PUT INTO THE WORLD",text:"I designed the resource and knew a successful expression as a validation witness. I did not preload it into the evolving population or supply a pool screened for success. The result is online assembly within a finite, designed possibility space."},
      {kind:"observation",label:"DISCOVERY IS ONLY THE START",text:"Forty worlds ran for 3,000 ticks in 256 slots: ten each with full evolution, uptake mutation disabled, no substrate, and atomic-only mutation. The capability appeared in 3/10 full worlds and persisted in 2/10. With uptake mutation disabled it appeared in 2/10 and persisted in 1/10, against a registered retention requirement of 8/10."},
      {kind:"observation",label:"THE CONTROLS",text:"Without substrate, the capability appeared in 3/10 worlds and established in none. With composition disabled, it never appeared. These controls help interpret the resource dependence; they do not compensate for the failed retention gate."},
      {kind:"observation",label:"TOO EARLY FOR THE TEST",text:"A later high-uptake mutation appeared in each of the two successful full worlds. But the events arrived 19 and 4 ticks before the B lineage completed establishment: at least 20% of slots for 50 consecutive completed ticks. Neither was an eligible candidate under the registered rule."},
      {kind:"observation",label:"THE RESULT",text:"Online mutation crossed the engineered capability barrier. The registered ratchet criterion failed, and conditional dependence remained untested: zero eligible candidates meant zero primary factorial or historical-fork assays. An early event is not a failed dependence test, and it cannot be promoted into a confirmatory candidate after seeing its outcome."},
      {kind:"question",text:"Must an invention be established before something can build on it?",status:"OPEN",detail:"EX-12 asked that question under a new prospective candidate rule, in fresh discovery worlds. Open-ended evolution remains unestablished."},
    ],
    sources: [
      {title:"EX-11 — results and all 40 primary worlds",url:"/data/cell80/followups/ex11-results.md"},
      {title:"EX-11 — interpretation and limits",url:"/data/cell80/followups/ex11-interpretation.md"},
      {title:"EX-11 — preregistration",url:"/data/cell80/followups/ecology-barrier-preregistration.md"},
      {title:"EX-11–15 — database snapshot",url:"/data/cell80/followup-database-snapshot.json"},
      {title:"Source file hashes",url:"/data/cell80/followups.json"},
    ],
  },
  {
    ...common, id: cell80FurtherIds[1], slug: "an-advantage-needs-a-chance-to-become-history",
    title: "An advantage needs a chance to become history.",
    dek: "It can help. It can be inherited. It can still disappear.",
    abstract: "EX-12 found a supported reproductive opportunity that left no offspring. EX-13 found another that transmitted both changes and persisted in descendants, but failed its later checkpoint gate. EX-14 separates whether reproduction happens from the advantage when it does. The raw file and summary disagree on some counts; the disagreement remains explicit. Independent replication is pending in EX-15.",
    lineage: "CELL80 / FURTHER NOTES · EX-12–14 · OPPORTUNITY → HISTORY",
    related: ["N-CELL80-BARRIER", "N-CELL80-03", "N-CELL80-01"],
    body: [
      {kind:"observation",label:"AN OPPORTUNITY THAT VANISHED",text:"The strongest EX-12 candidate was overwritten by another birth before it could reproduce. It left no offspring in the original history. Yet in controlled futures, the later uptake mutation consistently helped when the earlier resource-processing capability was present."},
      {kind:"observation",label:"FOUR VERSIONS",text:"A carries neither change. B carries the resource-processing capability. C carries high uptake without the capability. BC carries both. Each candidate was tested from its actual birth-time ecology and in standardized worlds, with ten paired futures per context and further mutation disabled."},
      {kind:"observation",label:"ONE SUPPORTED OPPORTUNITY",text:"One of four EX-12 candidates passed both contexts. B beat A in 9/10 futures, BC beat B in 10/10, and C-only did no better than A in 10/10 in each context. B was 45 ticks old and occupied 12.5% of slots at the C birth. Three independent qualifying discoveries were required; one did not meet that replication gate."},
      {kind:"observation",label:"A DIFFERENT ORIGIN",text:"EX-13 used fresh discovery worlds and followed the first clean candidates prospectively. One of five passed both birth-opportunity contexts. This time it survived, reproduced and transmitted both changes. Its intact descendants numbered 217 at +50 ticks, 148 at +200 and 230 at +500."},
      {kind:"observation",label:"THE LATER TEST",text:"The lowest-ID intact descendant at the registered +200 checkpoint was assayed in its actual ecology. The dependency effect was positive in six of ten paired futures. In the other four, every version produced zero offspring. The required eight wins were not reached. Full-gate retention stayed 0/1 supported opportunities; genetic persistence did not override that result."},
      {kind:"observation",label:"A LINEAGE IS NOT A CAPABILITY",text:"The selected event lineage went extinct at tick 1268. The world still contained 239 capable high-uptake organisms in other lineages, and 235 at the final tick. Those organisms were not counted as rescue of the selected origin."},
      {kind:"observation",label:"EX-14 / THE CHANCE TO REPRODUCE",text:"A separately registered test returned to that checkpoint with 100 paired futures. BC produced lineage births in 64/100. In the 64 futures where either B or BC reproduced, BC left more lineage births in 63. The other 36 futures remain in the unconditional denominator. The conditional mean gain was 99.45 lineage births; the median was 4."},
      {kind:"observation",label:"SOURCE DISCREPANCY",text:"The database conclusion and written report give B as reproducing in 41/100 and the remaining conditional case as a loss. The local ex14.jsonl gives B as 22/100, one reproductive tie and no loss. Both give BC as 64/100 and the 63/64 positive result. The figure uses the local raw file; both source accounts are preserved and their discrepancy remains unresolved."},
      {kind:"observation",label:"WHAT THIS CHANGES",text:"The later assay's weak result is consistent with a bottleneck in reproductive opportunity, rather than evidence that the conditional advantage reversed. This is one transmitted opportunity and one checkpoint ecology. The 100 futures are not 100 independent innovations, and EX-14 does not retroactively change EX-13's acceptance gate."},
      {kind:"question",text:"Can the whole sequence happen again?",status:"OPEN",detail:"EX-15 seeks at least three independently discovered opportunities through the full pipeline. As checked on 10 September 2026, it remains running with no reported outcome. A further dependent step, historical necessity and environmental mediation remain untested."},
    ],
    sources: [
      {title:"EX-12 — candidate assays and original-history outcomes",url:"/data/cell80/followups/ex12-results.md"},
      {title:"EX-13 — transmission, checkpoints and attrition",url:"/data/cell80/followups/ex13-results.md"},
      {title:"EX-13 — lineage extinction and interpretation",url:"/data/cell80/followups/ex13-interpretation.md"},
      {title:"EX-14 — original raw paired outcomes",url:"/data/cell80/followups/ex14.jsonl"},
      {title:"EX-14 — report as received",url:"/data/cell80/followups/ex14-results.md",note:"Unresolved summary/raw discrepancy; see the source disclosure."},
      {title:"EX-11–15 — database snapshot",url:"/data/cell80/followup-database-snapshot.json"},
      {title:"EX-15 — replication preregistration, not a result",url:"/data/cell80/followups/ecology-replication-preregistration.md"},
      {title:"Source file hashes",url:"/data/cell80/followups.json"},
    ],
  },
];
