/**
 * A ledger of what a run checked, what it left out, and what its counts
 * mean, drawn before the counts are given. Shared by the working notes that
 * check a text against itself (the Rhind papyrus, the Nine Chapters): the
 * note supplies every number and every word, and this only lays them out.
 *
 * Each lane is one unit counted (lines, columns, statements, answers), so a
 * reader can see that the counts are not of the same things.
 */

/** A part of a count, drawn as a share of a bar. */
export type LedgerPart = { value: number; label: string; tone?: "agree" | "differ" | "notation" | "quiet" };
/** A figure with what it is a figure of. `parts`, when given, are drawn as a bar under it. */
export type LedgerEntry = { value: string; label: string; detail?: string; parts?: LedgerPart[] };
export type LedgerLane = {
  /** The unit counted in this lane, e.g. "LINES OF WORKING". */
  unit: string;
  checked: LedgerEntry[];
  excluded: LedgerEntry[];
  counts: LedgerEntry[];
  /** What the counts do and do not say, in a sentence. */
  meaning: string;
};

const COLUMNS = [
  { key: "checked", title: "WHAT WAS CHECKED" },
  { key: "excluded", title: "WHAT WAS LEFT OUT" },
  { key: "counts", title: "WHAT THE COUNTS MEAN" },
] as const;

function Bar({ parts }: { parts: LedgerPart[] }) {
  const total = parts.reduce((sum, part) => sum + part.value, 0) || 1;
  return <span className="nl-bar" aria-hidden="true">
    {parts.map((part, i) => <span key={i} className={`nl-bar-part nl-${part.tone || "quiet"}`} style={{ flexGrow: part.value / total }}/>)}
  </span>;
}

function Entry({ entry }: { entry: LedgerEntry }) {
  return <li className="nl-entry">
    <span className="nl-figure"><b>{entry.value}</b> <span>{entry.label}</span></span>
    {entry.parts && <>
      <Bar parts={entry.parts}/>
      <span className="nl-key">{entry.parts.map((part, i) => <span key={i}><i className={`nl-swatch nl-${part.tone || "quiet"}`} aria-hidden="true"/>{part.value.toLocaleString("en-GB")} {part.label}</span>)}</span>
    </>}
    {entry.detail && <span className="nl-detail">{entry.detail}</span>}
  </li>;
}

export function NoteLedger({ label, lanes, note }: { label: string; lanes: LedgerLane[]; note?: string }) {
  return <figure className="nl-ledger">
    <figcaption className="record-voice">{label}</figcaption>
    <div className="nl-grid" role="table" aria-label={label}>
      <div className="nl-head" role="row">
        <span role="columnheader" className="nl-unit-head">COUNTED IN</span>
        {COLUMNS.map(column => <span key={column.key} role="columnheader" className="record-voice">{column.title}</span>)}
      </div>
      {lanes.map(lane => <div key={lane.unit} className="nl-lane" role="row">
        <span role="rowheader" className="nl-unit record-voice">{lane.unit}</span>
        {COLUMNS.map(column => <div key={column.key} role="cell" className={`nl-cell nl-cell-${column.key}`}>
          <span className="nl-cell-title record-voice" aria-hidden="true">{column.title}</span>
          <ol>{lane[column.key].map((entry, i) => <Entry key={i} entry={entry}/>)}</ol>
          {column.key === "counts" && <p className="nl-meaning">{lane.meaning}</p>}
        </div>)}
      </div>)}
    </div>
    {note && <p className="nl-note">{note}</p>}
  </figure>;
}
