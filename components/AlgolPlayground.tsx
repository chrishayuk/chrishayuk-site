"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AlgolColumns } from "./AlgolColumns";
import { loadExamples, runBoth, type Example, type Mode, type Run } from "./algolJob";

/**
 * ALGOL 60 in the page, each program run twice: as the Revised Report
 * defines it, and as the Electrologica X1 system of 1960 ran it. The lines
 * that differ are marked. For Zonneveld's outer planets (jaz164) a third
 * column holds what the X1 printed for it in 1964.
 */
export function AlgolPlayground() {
  const [examples, setExamples] = useState<Example[]>([]);
  const [selected, setSelected] = useState<Example | null>(null);
  const [program, setProgram] = useState("");
  const [input, setInput] = useState("");
  const [runs, setRuns] = useState<Record<Mode, Run> | null>(null);
  const [status, setStatus] = useState("");
  const [running, setRunning] = useState(false);
  const workers = useRef<Worker[]>([]);

  const stopAll = useCallback(() => { for (const worker of workers.current) worker.terminate(); workers.current = []; }, []);

  const load = useCallback((example: Example) => {
    setSelected(example);
    setProgram(example.program);
    setInput(example.input);
    setRuns(null);
    setStatus("");
  }, []);

  useEffect(() => {
    let cancelled = false;
    loadExamples()
      .then(list => {
        if (cancelled) return;
        setExamples(list);
        const wanted = new URLSearchParams(window.location.search).get("example");
        load(list.find(example => example.name === wanted) ?? list[0]);
      })
      .catch(() => setStatus("COULD NOT LOAD THE EXAMPLES"));
    return () => { cancelled = true; stopAll(); };
  }, [load, stopAll]);

  const run = useCallback(async () => {
    stopAll();
    setRuns(null);
    setRunning(true);
    setStatus("RUNNING");
    const started = performance.now();
    const result = await runBoth(program, input, worker => workers.current.push(worker));
    workers.current = [];
    setRuns(result);
    setRunning(false);
    setStatus(`FINISHED IN ${Math.round(performance.now() - started)} MS`);
  }, [input, program, stopAll]);

  const stop = useCallback(() => { stopAll(); setRunning(false); setStatus("STOPPED"); }, [stopAll]);
  const unchanged = selected !== null && program === selected.program && input === selected.input;

  return <section className="algol-lab" aria-label="ALGOL 60 interpreter">
    <div className="algol-bar">
      <label>Example<select value={selected?.name ?? ""} onChange={event => { const example = examples.find(candidate => candidate.name === event.target.value); if (example) load(example); }}>
        {examples.map(example => <option key={example.name}>{example.name}</option>)}
      </select></label>
      <button type="button" className="algol-run" onClick={run} disabled={running || examples.length === 0}>RUN BOTH WAYS</button>
      <button type="button" onClick={stop} disabled={!running}>STOP</button>
      <span className="record-voice" aria-live="polite">{status}</span>
    </div>
    <div className="algol-source">
      <div>
        <label htmlFor="algol-program" className="record-voice">01 / PROGRAM</label>
        <textarea id="algol-program" className="algol-program" value={program} spellCheck={false} wrap="off" onChange={event => setProgram(event.target.value)}
          onKeyDown={event => { if ((event.metaKey || event.ctrlKey) && event.key === "Enter") { event.preventDefault(); void run(); } }}/>
      </div>
      <div>
        <label htmlFor="algol-input" className="record-voice">02 / INPUT, READ BY inreal, ininteger AND inchar</label>
        <textarea id="algol-input" className="algol-input" value={input} spellCheck={false} wrap="off" onChange={event => setInput(event.target.value)}/>
      </div>
    </div>
    <p className="record-voice algol-output-head">03 / OUTPUT / LINES THAT DIFFER ARE MARKED</p>
    <AlgolColumns report={runs?.report ?? null} x1={runs?.x1 ?? null} printed1964={unchanged ? selected?.printed1964 : undefined}/>
  </section>;
}
