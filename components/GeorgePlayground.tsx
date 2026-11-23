"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { GeorgeEditor, symbolsOf, type Range, type WrittenSymbol } from "./GeorgeEditor";
import { GeorgeTrace } from "./GeorgeTrace";
import { cardColumns, FILES, punched, punchesOf, readTrace, report, runGeorge, TRACE_LIMIT, type Example, type Mode, type Report, type Step } from "./georgeJob";

/**
 * GEORGE in the page.
 *
 * The interpreter is the Rust program `george`, compiled unchanged for WASI,
 * and every run happens in a worker (georgeJob), so a program that never
 * ends can be stopped. Each run is made twice more, for the twenty columns of
 * each card punched and for the trace, which is what the page is for: the
 * twelve cells of the running accumulator after every symbol obeyed.
 */

type Traced = { steps: Step[]; symbols: WrittenSymbol[]; punches: string[][]; said: Report; program: string };
type Shown = { kind: "cards"; numbers: string[]; cards: string[] | null; said: Report; error?: string } | { kind: "listing"; title: string; text: string; said: Report; error?: string } | null;

const LISTINGS: { mode: Mode; label: string; title: string }[] = [
  { mode: "format", label: "PRINTED", title: "The program as the manual prints it" },
  { mode: "deck", label: "DECK", title: "The program as punched: symbol codes, sixteen to a card" },
  { mode: "table", label: "CODING TABLE", title: "The coding table, Appendix I" },
];
const NONE: Report = { stop: null, resumed: [], lights: [], limit: null, problem: null };

/** One punched card: the number, and its twenty columns (sign, mantissa d.ddddd, sign, exponent). */
function Card({ n, value, card }: { n: number; value: string; card?: string }) {
  const columns = card ? cardColumns(card) : null;
  return <li className="george-card">
    <span className="george-card-n">{n}</span>
    <span className="george-card-value">{value}</span>
    {columns && <span className="george-card-columns" title="Columns 1-20: sign, mantissa d.ddddd, sign of exponent, exponent">
      {[...columns].map((c, k) => <span key={k} className={[k === 1 || k === 10 || k === 11 ? "group" : "", c === " " ? "blank" : ""].filter(Boolean).join(" ") || undefined}>{c === " " ? "·" : c === "-" ? "−" : c}</span>)}
    </span>}
  </li>;
}

function Notes({ said, error }: { said: Report; error?: string }) {
  return <>
    {error && error !== "stopped" && <p className="george-note george-error">{error}</p>}
    {said.problem && <p className="george-note george-error">The program cannot be read: {said.problem.message}{said.problem.line ? ` (line ${said.problem.line}, column ${said.problem.column})` : ""}</p>}
    {said.lights.map((light, k) => <p key={`l${k}`} className="george-note">wait: the output lights show <b>{light}</b>, and a single shot carried on.</p>)}
    {said.resumed.map((stop, k) => <p key={`r${k}`} className="george-note">Stop <b>{stop.indication}</b>: {stop.cause}{stop.line ? `, at line ${stop.line}, column ${stop.column}` : ""}. Single shot: {stop.resumed}.</p>)}
    {said.limit && <p className="george-note george-error">Gave up after {said.limit.toLocaleString()} symbols obeyed.</p>}
    {said.stop && <p className="george-note george-error">Stop <b>{said.stop.indication}</b>: {said.stop.cause}{said.stop.line ? `, at symbol ${said.stop.at}, “${said.stop.symbol}”, line ${said.stop.line}, column ${said.stop.column}` : ""}.</p>}
  </>;
}

export function GeorgePlayground() {
  const [examples, setExamples] = useState<Example[]>([]);
  const [selected, setSelected] = useState("");
  const [about, setAbout] = useState("");
  const [program, setProgram] = useState("");
  const [data, setData] = useState("");
  const [keys, setKeys] = useState("");
  const [singleShot, setSingleShot] = useState(false);
  const [running, setRunning] = useState(false);
  const [status, setStatus] = useState("");
  const [shown, setShown] = useState<Shown>(null);
  const [traced, setTraced] = useState<Traced | null>(null);
  const [highlight, setHighlight] = useState<Range | null>(null);
  const job = useRef<ReturnType<typeof runGeorge> | null>(null);
  const latest = useRef({ program, data, keys, singleShot });
  useEffect(() => { latest.current = { program, data, keys, singleShot }; });

  const load = useCallback((example: Example) => {
    job.current?.stop();
    setSelected(example.name);
    setAbout(example.about);
    setProgram(example.program);
    setData(example.data);
    setShown(null);
    setTraced(null);
    setStatus("");
  }, []);

  /** Runs the program in the editor, or `example` when one has just been chosen. */
  const run = useCallback(async (example?: Example) => {
    job.current?.stop();
    const what = example ? { ...latest.current, program: example.program, data: example.data } : { ...latest.current };
    setRunning(true);
    setStatus("RUNNING");
    setShown(null);
    setTraced(null);
    const started = performance.now();
    const current = runGeorge(what, ["run", "cards", "trace"]);
    job.current = current;
    const results = await current.done;
    if (job.current !== current) return;
    job.current = null;
    setRunning(false);
    const main = results.run;
    if (!main) { setShown({ kind: "cards", numbers: [], cards: null, said: NONE, error: results.error }); setStatus(results.error === "stopped" ? "STOPPED" : "FAILED"); return; }
    const said = report(main.err, main.code);
    const numbers = punched(main.out);
    setShown({ kind: "cards", numbers, cards: results.cards ? punched(results.cards.out) : null, said, error: results.error });
    setStatus(`FINISHED IN ${Math.round(performance.now() - started)} MS · ${numbers.length} CARD${numbers.length === 1 ? "" : "S"} PUNCHED`);
    if (results.trace && !said.problem) {
      const steps = readTrace(results.trace.err);
      const symbols = await symbolsOf(what.program);
      setTraced({ steps, symbols, punches: punchesOf(steps, punched(results.trace.out)), said: report(results.trace.err, results.trace.code), program: what.program });
    }
  }, []);

  const listing = useCallback(async ({ mode, title }: { mode: Mode; title: string }) => {
    job.current?.stop();
    setRunning(true);
    setTraced(null);
    const current = runGeorge({ ...latest.current }, [mode]);
    job.current = current;
    const results = await current.done;
    if (job.current !== current) return;
    job.current = null;
    setRunning(false);
    setStatus("");
    const r = results[mode];
    setShown({ kind: "listing", title, text: r?.out ?? "", said: r ? report(r.err, r.code) : NONE, error: results.error });
  }, []);

  useEffect(() => {
    let cancelled = false;
    fetch(`${FILES}/examples.json`)
      .then(response => response.json() as Promise<Example[]>)
      .then(list => {
        if (cancelled) return;
        setExamples(list);
        const wanted = new URLSearchParams(window.location.search).get("example");
        const first = list.find(example => example.name === wanted) ?? list[0];
        load(first);
        // Open on a run, so that the accumulator is there to be stepped through.
        run(first);
      })
      .catch(() => setStatus("COULD NOT LOAD THE EXAMPLES"));
    return () => { cancelled = true; job.current?.stop(); };
  }, [load, run]);

  return <section className="george-lab" aria-label="GEORGE interpreter">
    <div className="george-controls">
      <p className="record-voice">01 / CHOOSE A PROGRAM, OR WRITE ONE</p>
      <div className="george-bar">
        <label>Example<select value={selected} onChange={event => { const example = examples.find(candidate => candidate.name === event.target.value); if (example) { load(example); run(example); } }}>
          {examples.map(example => <option key={example.name}>{example.name}</option>)}
        </select></label>
        <button type="button" className="george-run" onClick={() => run()} disabled={running || examples.length === 0} title="Run (Cmd/Ctrl+Enter)">RUN</button>
        <button type="button" onClick={() => { job.current?.stop(); job.current = null; setRunning(false); setStatus("STOPPED"); }} disabled={!running}>STOP</button>
        <label className="george-check" title="Carry on through resumable stops, as the operator could with a single shot"><input type="checkbox" checked={singleShot} onChange={event => setSingleShot(event.target.checked)}/> Single shot</label>
        <span className="record-voice george-status" aria-live="polite">{status}</span>
      </div>
      {about && <p className="george-about">{about}</p>}
    </div>
    <div className="george-panes">
      <div>
        <p className="record-voice">02 / G-PROGRAM <span className="george-editor-hint">/ HOVER OVER ANY SYMBOL</span></p>
        <GeorgeEditor className="george-program" label="G-program" value={program} onChange={setProgram} onRun={() => run()} highlight={highlight}/>
        <div className="george-inputs">
          <label className="record-voice">DATA CARDS, ONE NUMBER TO A LINE, FOR R<textarea className="george-data" value={data} spellCheck={false} onChange={event => setData(event.target.value)}/></label>
          <label className="record-voice">INPUT KEYS, FOR I<input type="text" className="george-keys" value={keys} spellCheck={false} placeholder="e.g. 7, 3" onChange={event => setKeys(event.target.value)}/></label>
        </div>
      </div>
      <div>
        <p className="record-voice">03 / {shown?.kind === "listing" ? shown.title.toUpperCase() : "PUNCHED CARDS"}</p>
        <div className="george-output">
          {shown?.kind === "cards" && <>
            {shown.numbers.length > 0 && <ol className="george-cards">{shown.numbers.slice(0, 2000).map((value, k) => <Card key={k} n={k + 1} value={value} card={shown.cards?.[k]}/>)}</ol>}
            {shown.numbers.length > 2000 && <p className="george-note">… and {(shown.numbers.length - 2000).toLocaleString()} more cards.</p>}
            <Notes said={shown.said} error={shown.error}/>
            {!shown.numbers.length && !shown.said.stop && !shown.said.problem && !shown.said.limit && !shown.error && <p className="george-note">The program ended without punching anything.</p>}
          </>}
          {shown?.kind === "listing" && <><pre className="george-listing">{shown.text}</pre><Notes said={shown.said} error={shown.error}/></>}
        </div>
        <div className="george-listings">{LISTINGS.map(item => <button key={item.mode} type="button" onClick={() => listing(item)} disabled={running} title={item.title}>{item.label}</button>)}</div>
      </div>
    </div>
    <div className="george-trace-block">
      <p className="record-voice">04 / THE RUNNING ACCUMULATOR, SYMBOL BY SYMBOL</p>
      {traced
        ? <>
          <p className="george-trace-note">{traced.steps.length.toLocaleString()} symbols obeyed{traced.said.limit ? `; the trace stops after ${TRACE_LIMIT.toLocaleString()}, the run above is not cut short` : ""}. A marked cell was filled by the symbol; a struck-out one was emptied by it. Step with ◀ and ▶, or the arrow keys, or choose a row.</p>
          <GeorgeTrace key={traced.program + traced.steps.length} {...traced} onHighlight={setHighlight}/>
        </>
        : <p className="george-trace-note">{running ? "Running…" : "Run a program to step through its accumulator."}</p>}
    </div>
  </section>;
}
