"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AlgolColumns, AlgolOutput } from "./AlgolColumns";
import { loadExamples, run as runOne, runBoth, type Mode, type Run } from "./algolJob";

/** --x1's output beside the page the X1 printed, each line that differs marked. */
function AgainstThePage({ run, printed }: { run: Run | null; printed: string }) {
  const page = printed.replace(/\n$/, "").split("\n");
  const differ = run ? run.lines.filter((line, index) => line.trimEnd() !== (page[index] ?? "").trimEnd()).length : 0;
  return <div className="algol-columns">
    <div><p className="record-voice">--x1, IN YOUR BROWSER</p><AlgolOutput run={run} other={page}/></div>
    <div><p className="record-voice">THE X1, 1964 / {differ} LINE{differ === 1 ? "" : "S"} DIFFER</p><AlgolOutput run={{ warnings: [], lines: page, error: "" }} other={run?.lines}/></div>
  </div>;
}

/**
 * One ALGOL 60 program that can be edited and run where it sits in a note,
 * with the same worker and WebAssembly interpreter as /demos/algol-60,
 * loaded only when RUN is pressed. It is run both ways, as the Report and as
 * the X1, unless `only` names one. `example` names a program from the
 * playground's examples that is run without being shown.
 */
export function AlgolRunner({ label, program = "", example, only, note, with1964 }: {
  label: string; program?: string; example?: string; only?: Mode; note?: string; with1964?: boolean;
}) {
  const [source, setSource] = useState(program);
  const [runs, setRuns] = useState<Partial<Record<Mode, Run>> | null>(null);
  const [printed, setPrinted] = useState<string | undefined>();
  const [running, setRunning] = useState(false);
  const workers = useRef<Worker[]>([]);
  const stopAll = useCallback(() => { for (const worker of workers.current) worker.terminate(); workers.current = []; setRunning(false); }, []);
  useEffect(() => stopAll, [stopAll]);

  const run = useCallback(async () => {
    stopAll();
    setRuns({});
    setRunning(true);
    let code = source;
    let input = "";
    if (example) {
      const found = (await loadExamples()).find(candidate => candidate.name === example);
      code = found?.program ?? "";
      input = found?.input ?? "";
      if (with1964) setPrinted(found?.printed1964);
    }
    const started = (worker: Worker) => workers.current.push(worker);
    const result = only ? { [only]: await runOne(code, input, only, started) } : await runBoth(code, input, started);
    workers.current = [];
    setRuns(result);
    setRunning(false);
  }, [example, only, source, stopAll, with1964]);

  const changed = source !== program;
  return <figure className="algol-runner">
    <figcaption className="record-voice">{label}</figcaption>
    {example
      ? <p className="algol-runner-fixed">PROGRAM: {example}.alg, from the repository{with1964 ? ", with the input Zonneveld gave it" : ""}</p>
      : <textarea aria-label={`${label}: ALGOL 60 program`} value={source} rows={Math.min(16, source.split("\n").length + 1)} spellCheck={false} wrap="off" onChange={event => setSource(event.target.value)}/>}
    <div className="algol-runner-bar">
      <button type="button" onClick={running ? stopAll : run}>{running ? "STOP" : only ? "RUN" : "RUN BOTH WAYS"}</button>
      {changed && <button type="button" className="algol-runner-reset" onClick={() => { setSource(program); setRuns(null); }}>RESET</button>}
      {runs === null && <span className="algol-runner-idle">Runs in your browser.</span>}
      {running && <span className="algol-runner-idle">Running.</span>}
    </div>
    {runs !== null && !running && (only && printed
      ? <AgainstThePage run={runs[only] ?? null} printed={printed}/>
      : only
        ? <AlgolOutput run={runs[only] ?? null} className="algol-output algol-output-one"/>
        : <AlgolColumns report={runs.report ?? null} x1={runs.x1 ?? null} printed1964={printed}/>)}
    {note && <p className="algol-runner-note">{note}</p>}
  </figure>;
}
