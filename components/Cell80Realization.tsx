import { FieldNotes } from "@chrishayuk/hause/components/FieldNotes";
import { cell80Followups, realization as result } from "@/lib/cell80-followups";
import { Cell80Meaning as Meaning } from "./Cell80Meaning";

export function Cell80Realization() {
  return <figure className="cell80-realization">
    <figcaption className="record-voice">EX-14 / ONE CHECKPOINT · 100 POSSIBLE FUTURES</figcaption>
    <div className="cell80-realization-layout">
      <div className="cell80-futures" role="img" aria-label={`${result.total} matched comparisons: ${result.positive} with more births in the family with higher food intake, ${result.tied} reproductive tie, ${result.negative} with fewer, and ${result.unrealized} with no births for either version. Both versions keep the food-processing program.`}>
        {cell80Followups.assays.map(row => {
          const outcome = row.births.B === 0 && row.births.BC === 0 ? "unrealized" : row.births.BC > row.births.B ? "helpful" : row.births.BC === row.births.B ? "tied" : "harmful";
          return <span key={row.seed} data-outcome={outcome} aria-hidden="true">{outcome === "helpful" ? "+" : outcome === "tied" ? "=" : outcome === "harmful" ? "−" : "·"}</span>;
        })}
      </div>
      <div className="cell80-realization-result"><strong>{result.positive}<small>/{result.events}</small></strong><p>More births in the family with higher food intake, among comparisons where either version reproduced.</p><p className="cell80-caption">In {result.unrealized} of all {result.total} futures, neither version left offspring. Those futures still count.</p></div>
    </div>
    <p className="cell80-legend"><span>+ Later change helped</span><span>= Same birth count</span><span>· Neither reproduced</span></p>
    <p className="cell80-caption">Each mark is one <Meaning term="future">matched comparison</Meaning>, in seed order. Both versions keep the food-processing program. Birth counts include the organism’s descendants. These are 100 tests of one inherited change. <a href="/data/cell80/followups.json">Measurements + source hashes ↗</a></p>
    <FieldNotes label="The four versions & a source discrepancy" detail="READ +">
      <div className="cell80-prose"><p>B has the food-processing program. C has the later increase in food intake. A has neither change; BC has both. The test counts births across the organism’s family over 200 time steps, with further mutation disabled.</p></div>
      <dl className="cell80-realization-arms">{result.arms.map(arm => <div key={arm.id}><dt>{arm.id === "A" ? "Neither / A" : arm.id === "B" ? "Capability / B" : arm.id === "C" ? "Uptake / C" : "Both / BC"}</dt><dd>{arm.count}/{result.total}<small> futures with births</small></dd></div>)}</dl>
      <div className="cell80-prose"><p>The database and written report give B as 41/100 and the remaining reproductive comparison as a loss. The local raw file gives B as {result.arms[1].count}/100 and that case as a tie.</p><p>Both give BC as 64/100 and a positive effect in 63/64 comparisons where either version reproduced. This figure is calculated from the local raw file; the source discrepancy is unresolved.</p><p><a href="/data/cell80/followups/ex14.jsonl">Raw paired outcomes ↗</a> · <a href="/data/cell80/followups/ex14-results.md">Report as received ↗</a> · <a href="/data/cell80/followup-database-snapshot.json">Database snapshot ↗</a></p></div>
    </FieldNotes>
  </figure>;
}
