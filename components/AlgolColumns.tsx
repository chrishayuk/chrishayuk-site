import type { Run } from "./algolJob";

/** A line is the same if it differs only in spaces at the end. */
const same = (a?: string, b?: string) => (a ?? "").trimEnd() === (b ?? "").trimEnd();

/** One run's output, with each line that differs from `other`'s marked. */
export function AlgolOutput({ run, other, className }: { run: Run | null; other?: string[]; className?: string }) {
  return <pre className={className ?? "algol-output"}>
    {run && run.warnings.map((warning, index) => <span key={`w${index}`} className="algol-warning">{warning}{"\n"}</span>)}
    {run && run.warnings.length > 0 && "\n"}
    {run && run.lines.map((line, index) => <span key={index} className={other && !same(line, other[index]) ? "algol-differs" : undefined}>{line}{"\n"}</span>)}
    {run?.error && <span className="algol-error">! {run.error}{"\n"}</span>}
  </pre>;
}

/** The same program run as the Report defines it and as the X1 ran it, side by side. */
export function AlgolColumns({ report, x1, printed1964 }: { report: Run | null; x1: Run | null; printed1964?: string }) {
  const printed = printed1964 ? printed1964.replace(/\n$/, "").split("\n") : undefined;
  const differ = report && x1 ? x1.lines.filter((line, index) => !same(line, report.lines[index])).length + Math.max(0, report.lines.length - x1.lines.length) : 0;
  const unlike1964 = printed && x1 ? x1.lines.filter((line, index) => !same(line, printed[index])).length : 0;
  return <div className={printed ? "algol-columns algol-columns-three" : "algol-columns"}>
    <div>
      <p className="record-voice">THE REVISED REPORT, 1962</p>
      <AlgolOutput run={report} other={x1?.lines}/>
    </div>
    <div>
      <p className="record-voice">THE X1, AS ITS 1962 MANUAL DESCRIBES IT / --x1{report && x1 && !printed ? ` / ${differ ? `${differ} LINE${differ === 1 ? "" : "S"} DIFFER` : "THE SAME"}` : ""}</p>
      <AlgolOutput run={x1} other={printed ?? report?.lines}/>
    </div>
    {printed && <div>
      <p className="record-voice">PRINTED BY THE X1 IN 1964{x1 ? ` / ${unlike1964} LINE${unlike1964 === 1 ? "" : "S"} DIFFER` : ""}</p>
      <AlgolOutput run={{ warnings: [], lines: printed, error: "" }} other={x1?.lines}/>
    </div>}
  </div>;
}
