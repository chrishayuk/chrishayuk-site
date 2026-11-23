"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { GeorgeEditor, symbolsOf, type Range, type WrittenSymbol } from "./GeorgeEditor";
import { GeorgeTrace } from "./GeorgeTrace";
import { punched, punchesOf, readTrace, report, runGeorge, type Report, type Step } from "./georgeJob";

/**
 * One G-program that can be edited and run where it sits in a note, with the
 * twelve cells to step through afterwards. It uses the same worker and
 * WebAssembly interpreter as /demos/george, loaded only when RUN is pressed.
 * `data` is the cards R reads, one number to a line.
 */
type Ran = { numbers: string[]; said: Report; error?: string; steps: Step[]; symbols: WrittenSymbol[]; punches: string[][]; program: string };

export function GeorgeRunner({ label, program, data = "", note }: { label: string; program: string; data?: string; note?: string }) {
  const [source, setSource] = useState(program);
  const [cards, setCards] = useState(data);
  const [ran, setRan] = useState<Ran | null>(null);
  const [running, setRunning] = useState(false);
  const [highlight, setHighlight] = useState<Range | null>(null);
  const job = useRef<ReturnType<typeof runGeorge> | null>(null);
  useEffect(() => () => job.current?.stop(), []);

  const run = useCallback(async () => {
    job.current?.stop();
    setRunning(true);
    setRan(null);
    const current = runGeorge({ program: source, data: cards }, ["run", "trace"]);
    job.current = current;
    const results = await current.done;
    if (job.current !== current) return;
    job.current = null;
    setRunning(false);
    const main = results.run;
    const said = main ? report(main.err, main.code) : { stop: null, resumed: [], lights: [], limit: null, problem: null };
    const steps = results.trace && !said.problem ? readTrace(results.trace.err) : [];
    const symbols = steps.length ? await symbolsOf(source) : [];
    setRan({ numbers: main ? punched(main.out) : [], said, error: results.error, steps, symbols, punches: results.trace ? punchesOf(steps, punched(results.trace.out)) : [], program: source });
  }, [cards, source]);
  const stop = () => { job.current?.stop(); job.current = null; setRunning(false); };

  const changed = source !== program || cards !== data;
  const said = ran?.said;
  return <figure className="george-runner">
    <figcaption className="record-voice">{label}</figcaption>
    <GeorgeEditor label={`${label}: G-program`} value={source} onChange={setSource} onRun={run} highlight={highlight}/>
    {data && <>
      <label className="george-runner-input-label record-voice" htmlFor={`george-in-${label}`}>DATA CARDS, READ BY R / CHANGE THEM AND RUN AGAIN</label>
      <textarea id={`george-in-${label}`} value={cards} rows={Math.min(6, cards.split("\n").length + 1)} spellCheck={false} onChange={event => setCards(event.target.value)}/>
    </>}
    <div className="george-runner-bar">
      <button type="button" onClick={running ? stop : run}>{running ? "STOP" : "RUN"}</button>
      {changed && <button type="button" className="george-runner-reset" onClick={() => { setSource(program); setCards(data); setRan(null); }}>RESET</button>}
      <output aria-live="polite">
        {ran === null ? <span className="george-runner-idle">{running ? "Running…" : "Runs in your browser, then step through the accumulator."}</span> : <>
          {ran.numbers.length > 0 && <span className="george-runner-cards">PUNCHED {ran.numbers.join(" · ")}</span>}
          {ran.error && ran.error !== "stopped" && <span className="george-error">{ran.error}</span>}
          {said?.problem && <span className="george-error">The program cannot be read: {said.problem.message}</span>}
          {said?.stop && <span className="george-error">Stop {said.stop.indication}: {said.stop.cause}</span>}
          {said?.limit && <span className="george-error">Gave up after {said.limit.toLocaleString()} symbols obeyed.</span>}
        </>}
      </output>
    </div>
    {ran && ran.steps.length > 0 && <GeorgeTrace key={ran.program} steps={ran.steps} symbols={ran.symbols} punches={ran.punches} said={ran.said} program={ran.program} onHighlight={setHighlight} compact/>}
    {note && <p className="george-runner-note">{note}</p>}
  </figure>;
}
