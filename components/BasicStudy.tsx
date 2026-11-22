"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { BasicEditor } from "./BasicEditor";

/**
 * A BASIC interpreter in the page.
 *
 * The interpreter is the Rust program from github.com/chrishayuk/chuk-basic-rs,
 * compiled unchanged for WASI. The files in public/demos/basic/ (chuk-basic.wasm,
 * wasi.js, session.js, worker.js, examples.json and scans/) are copied from that
 * repository: rebuild them there with `web/build.sh` and
 * `node web/export-site.mjs <this folder>`, rather than editing them here.
 *
 * A program cannot pause for INPUT in a browser, so it does not. Each time a
 * line is typed the program runs again from its first line with every line
 * typed so far; the random seed is fixed for the sitting, so each run repeats
 * the one before and then gets one INPUT further. Runs happen in a worker, so a
 * program that never ends can be stopped by ending the worker.
 */

type Dialect = "microsoft" | "dartmouth";
type Example = {
  name: string; title: string; input: boolean; program: string;
  /** The heading it is listed under when every program is offered. */
  group?: string;
  /** The BASIC the program was written for; absent means later BASICs. */
  dialect?: Dialect;
  /** A page of the 1964 manual, and crops of it, under scans/. */
  scan?: string; details?: string[];
  credit?: string;
  /** What the printed page says the program prints. */
  prints?: string;
};
type Segment = { type: "out" | "in"; text: string };
type Outcome = { status: "done" | "waiting" | "error" | "step-limit" | "output-limit" | "crash" | "stopped"; segments: Segment[]; message: string };
type Sitting = { source: string; dialect: Dialect; seed: number; inputs: string[] };

const FILES = "/demos/basic";

let examplesRequest: Promise<Example[]> | null = null;
const loadExamples = () => examplesRequest ??= fetch(`${FILES}/examples.json`).then(response => response.json() as Promise<Example[]>);
let moduleRequest: Promise<WebAssembly.Module> | null = null;
const loadModule = () => moduleRequest ??= WebAssembly.compileStreaming(fetch(`${FILES}/chuk-basic.wasm`));

function statusLine(outcome: Outcome | null, busy: boolean) {
  if (busy) return "RUNNING";
  switch (outcome?.status) {
    case "waiting": return "WAITING FOR YOU. TYPE BELOW.";
    case "done": return "FINISHED";
    case "stopped": return "STOPPED";
    case "error": return "STOPPED WITH AN ERROR";
    case "step-limit": return "STOPPED: 20,000,000 STEPS WITHOUT FINISHING";
    case "output-limit": return "STOPPED: MORE OUTPUT THAN THE PAGE WILL SHOW";
    case "crash": return "THE INTERPRETER FAILED";
    default: return "";
  }
}

/**
 * @param example  the program to show first
 * @param choose   offer the other examples too
 * @param arithmetic  start a 1964 program as a later BASIC runs it, to see it stop
 * @param source   a program written into the page, in place of a listed example
 */
export function BasicStudy({ example, choose = false, arithmetic, source }: { example?: string; choose?: boolean; arithmetic?: "later"; source?: { title: string; program: string } }) {
  const inlineTitle = source?.title;
  const inlineProgram = source?.program;
  const [examples, setExamples] = useState<Example[]>([]);
  const [current, setCurrent] = useState<Example | null>(inlineProgram === undefined ? null : { name: "inline", title: inlineTitle ?? "", input: false, program: inlineProgram, dialect: "dartmouth" });
  const [program, setProgram] = useState(inlineProgram ?? "");
  // a program written into the page is Dartmouth BASIC, like the manual's
  const [dartmouth, setDartmouth] = useState(inlineProgram !== undefined);
  const [outcome, setOutcome] = useState<Outcome | null>(null);
  const [busy, setBusy] = useState(false);
  const [line, setLine] = useState("");
  const [failed, setFailed] = useState(false);
  const worker = useRef<Worker | null>(null);
  const sitting = useRef<Sitting | null>(null);
  const ticket = useRef(0);
  const pane = useRef<HTMLPreElement | null>(null);
  const typing = useRef<HTMLInputElement | null>(null);
  // a notebook shows each passage in more than one view, so ids are per instance
  const id = useId();

  const halt = useCallback(() => {
    ticket.current += 1;
    worker.current?.terminate();
    worker.current = null;
    setBusy(false);
  }, []);

  const show = useCallback((next: Example, later: boolean) => {
    halt();
    sitting.current = null;
    setCurrent(next);
    setProgram(next.program);
    setDartmouth(next.dialect === "dartmouth" && !later);
    setOutcome(null);
    setLine("");
  }, [halt]);

  useEffect(() => {
    let cancelled = false;
    // a program written into the page is already showing
    if (inlineProgram !== undefined) return () => { worker.current?.terminate(); };
    loadExamples().then(list => {
      if (cancelled) return;
      setExamples(list);
      const wanted = example ?? new URLSearchParams(window.location.search).get("example");
      show(list.find(candidate => candidate.name === wanted) ?? list[0], arithmetic === "later");
    }).catch(() => setFailed(true));
    return () => { cancelled = true; worker.current?.terminate(); };
  }, [example, arithmetic, show, inlineProgram]);

  useEffect(() => { if (pane.current) pane.current.scrollTop = pane.current.scrollHeight; }, [outcome]);
  useEffect(() => { if (outcome?.status === "waiting" && !busy) typing.current?.focus({ preventScroll: true }); }, [outcome, busy]);

  /** Run the sitting from the start with everything typed so far. */
  const execute = useCallback(async () => {
    const now = sitting.current;
    if (!now) return;
    const turn = ++ticket.current;
    setBusy(true);
    let result: Outcome;
    try {
      const compiled = await loadModule();
      if (turn !== ticket.current) return;
      if (!worker.current) {
        worker.current = new Worker(`${FILES}/worker.js`, { type: "module" });
        worker.current.postMessage({ module: compiled });
      }
      const runner = worker.current;
      result = await new Promise<Outcome>((resolve, reject) => {
        runner.onmessage = (event: MessageEvent<{ id: number; result?: Outcome; error?: string }>) => {
          if (event.data.id !== turn) return;
          if (event.data.result) resolve(event.data.result); else reject(new Error(event.data.error));
        };
        runner.onerror = event => reject(new Error(event.message || "the interpreter could not be started"));
        runner.postMessage({ id: turn, request: { source: now.source, inputs: now.inputs.slice(), seed: now.seed, dialect: now.dialect } });
      });
    } catch (error) {
      result = { status: "crash", segments: [], message: error instanceof Error ? error.message : String(error) };
    }
    if (turn !== ticket.current) return;
    setOutcome(result);
    setBusy(false);
  }, []);

  const run = useCallback(() => {
    halt();
    sitting.current = { source: program, dialect: dartmouth ? "dartmouth" : "microsoft", seed: Math.floor(Math.random() * 0x7fffffff) + 1, inputs: [] };
    setOutcome(null);
    setLine("");
    void execute();
  }, [dartmouth, execute, halt, program]);

  const submit = useCallback(() => {
    if (!sitting.current || busy || outcome?.status !== "waiting") return;
    // the 1978 games only understand capitals
    sitting.current.inputs.push(line.toUpperCase().replace(/[\r\n]+/g, " "));
    setLine("");
    void execute();
  }, [busy, execute, line, outcome]);

  const stop = useCallback(() => {
    halt();
    setOutcome(previous => ({ status: "stopped", segments: previous?.segments ?? [], message: "" }));
  }, [halt]);

  if (failed) return <section className="basic-lab" aria-label="BASIC interpreter"><p className="record-voice">COULD NOT LOAD THE INTERPRETER</p></section>;

  const waiting = outcome?.status === "waiting" && !busy;
  const figures = current?.details?.length ? current.details : current?.scan ? [current.scan] : [];
  const lines = Math.min(Math.max(program.split("\n").length, 4), choose ? 22 : 14);

  return <section className="basic-lab" aria-label="BASIC interpreter" data-basic-example={current?.name}>
    {figures.length > 0 && current && <figure className="basic-page">
      {figures.map(file => <a key={file} href={`${FILES}/scans/${current.scan ?? file}`}>
        {/* eslint-disable-next-line @next/next/no-img-element -- a scanned page at its own size, not site photography */}
        <img src={`${FILES}/scans/${file}`} alt={`From the printed page: ${current.title}`} loading="lazy"/>
      </a>)}
      <figcaption className="record-voice">{current.credit?.toUpperCase()}{current.prints ? ` / THE PAGE PRINTS ${current.prints}` : ""}</figcaption>
    </figure>}
    <div className="basic-bench">
      <div className="basic-bar">
        {choose ? <label>Program<select value={current?.name ?? ""} onChange={event => { const next = examples.find(candidate => candidate.name === event.target.value); if (next) show(next, false); }}>
          {[...new Set(examples.map(candidate => candidate.group ?? "Programs"))].map(group => <optgroup key={group} label={group}>
            {examples.filter(candidate => (candidate.group ?? "Programs") === group).map(candidate => <option key={candidate.name} value={candidate.name}>{candidate.title}</option>)}
          </optgroup>)}
        </select></label> : <p className="record-voice basic-title">{current?.title.toUpperCase()}</p>}
        <button type="button" className="basic-run" onClick={run} disabled={busy || !current}>RUN</button>
        <button type="button" onClick={stop} disabled={!busy && !waiting}>STOP</button>
        {current && program !== current.program && <button type="button" onClick={() => show(current, arithmetic === "later")}>RESET</button>}
        {current?.dialect === "dartmouth" && <label className="basic-switch"><input type="checkbox" checked={dartmouth} onChange={event => setDartmouth(event.target.checked)}/> AS IN 1964</label>}
        <span className="record-voice basic-status" aria-live="polite">{statusLine(outcome, busy)}</span>
      </div>
      <div className="basic-panes">
        <div>
          <p className="record-voice">PROGRAM / CHANGE IT <span className="basic-editor-hint">/ HOVER OVER ANY WORD</span></p>
          <BasicEditor className="basic-program" label={`${current?.title ?? "BASIC"}: program`} value={program} onChange={setProgram} onRun={run}
            dialect={dartmouth ? "dartmouth" : "later"} style={{ height: `calc(${lines} * 1.65em + 34px)` }}/>
        </div>
        <div>
          <p className="record-voice">OUTPUT / RUNS IN YOUR BROWSER</p>
          <pre ref={pane} className="basic-output" style={{ height: `calc(${lines} * 1.65em + 34px)` }}>
            {outcome?.segments.map((segment, index) => <span key={index} className={segment.type === "in" ? "basic-typed" : undefined}>{segment.text}</span>)}
            {outcome && outcome.message && outcome.status !== "step-limit" ? <span className="basic-error">{`\n${outcome.message}`}</span> : null}
          </pre>
          <form className="basic-input" onSubmit={event => { event.preventDefault(); submit(); }}>
            <label htmlFor={`${id}-input`} className="record-voice">{waiting ? "THE PROGRAM IS ASKING" : "INPUT"}</label>
            <input ref={typing} id={`${id}-input`} value={line} onChange={event => setLine(event.target.value)} disabled={!waiting} autoComplete="off" autoCapitalize="characters" spellCheck={false} placeholder={waiting ? "TYPE, THEN RETURN" : ""}/>
            <button type="submit" disabled={!waiting}>RETURN</button>
          </form>
        </div>
      </div>
    </div>
  </section>;
}
