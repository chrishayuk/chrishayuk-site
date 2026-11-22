"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AceEditor } from "./AceEditor";

/**
 * The Automatic Computing Engine of Turing's 1945 report, in the page.
 *
 * The program is the Rust `ace` command from github.com/chrishayuk/turing-ace,
 * compiled unchanged for WASI. The files in public/demos/turing-ace/ (ace.wasm,
 * wasi.js, worker.js, lsp.js, lsp-worker.js, examples.json) come from that
 * repository: rebuild ace.wasm there with
 * `cargo build --release --target wasm32-wasip1` and copy it across, rather
 * than editing anything here. The editor's colours, problems and hover help
 * come from the language server in the same program (AceEditor).
 *
 * Every run happens in a worker, so a table that never stops can be stopped
 * by terminating it.
 */

type Example = { name: string; program: string; input: string };
type Line = { text: string; error: boolean };
type WorkerMessage = { type: "out"; fd: number; text: string } | { type: "done"; code: number } | { type: "error"; message: string };

const FILES = "/demos/turing-ace";

/** What each choice passes to the ace command. `-` is the tables on the page. */
const MODES = [
  { id: "run", label: "Run on the machine", args: ["run", "-", "--time"], runs: true },
  { id: "trace", label: "Run, showing every instruction obeyed", args: ["run", "-", "--trace", "--time"], runs: true },
  { id: "holes", label: "Run, showing the cards as holes", args: ["run", "-", "--cards", "holes"], runs: true },
  { id: "tables", label: "Show the job in machine form", args: ["tables", "-"], runs: false },
  { id: "cards", label: "Show the 80-column instruction cards", args: ["tables", "-", "--emit", "cards"], runs: false },
  { id: "audit", label: "Compare the report with itself", args: ["audit"], runs: false },
  { id: "errata", label: "List the corrections", args: ["errata"], runs: false },
  { id: "decisions", label: "List where the report says two things", args: ["decisions"], runs: false },
];

export function AcePlayground() {
  const [examples, setExamples] = useState<Example[]>([]);
  const [selected, setSelected] = useState("");
  const [mode, setMode] = useState("run");
  const [printed, setPrinted] = useState(false);
  const [program, setProgram] = useState("");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState<Line[]>([]);
  const [status, setStatus] = useState("");
  const [running, setRunning] = useState(false);
  const worker = useRef<Worker | null>(null);
  const pane = useRef<HTMLPreElement | null>(null);

  const load = useCallback((example: Example) => {
    setSelected(example.name);
    setProgram(example.program);
    setInput(example.input);
    setOutput([]);
    setStatus("");
  }, []);

  useEffect(() => {
    let cancelled = false;
    fetch(`${FILES}/examples.json`)
      .then(response => response.json() as Promise<Example[]>)
      .then(list => {
        if (cancelled) return;
        setExamples(list);
        const query = new URLSearchParams(window.location.search);
        if (MODES.some(candidate => candidate.id === query.get("mode"))) setMode(query.get("mode") as string);
        if (query.get("printed") === "1") setPrinted(true);
        load(list.find(example => example.name === query.get("example")) ?? list[0]);
      })
      .catch(() => setStatus("COULD NOT LOAD THE EXAMPLES"));
    return () => { cancelled = true; worker.current?.terminate(); };
  }, [load]);

  useEffect(() => { if (pane.current) pane.current.scrollTop = pane.current.scrollHeight; }, [output]);

  const finish = useCallback((message: string) => {
    worker.current?.terminate();
    worker.current = null;
    setRunning(false);
    setStatus(message);
  }, []);

  const run = useCallback(() => {
    worker.current?.terminate();
    setOutput([]);
    setRunning(true);
    setStatus("RUNNING");
    const started = performance.now();
    const chosen = MODES.find(candidate => candidate.id === mode) ?? MODES[0];
    // A table as printed may never stop: a limit on instructions gives an answer.
    const args = [...chosen.args, ...(printed ? ["--errata", "none", ...(chosen.runs ? ["--limit", "200000"] : [])] : [])];
    const next = new Worker(`${FILES}/worker.js`, { type: "module" });
    worker.current = next;
    next.onmessage = (event: MessageEvent<WorkerMessage>) => {
      const message = event.data;
      if (message.type === "out") setOutput(lines => [...lines, { text: message.text, error: message.fd === 2 }]);
      else if (message.type === "error") { setOutput(lines => [...lines, { text: `\n${message.message}`, error: true }]); finish("STOPPED"); }
      else { const took = `FINISHED IN ${Math.round(performance.now() - started)} MS`; finish(message.code ? `${took} / EXIT ${message.code}` : took); }
    };
    next.onerror = event => { setOutput(lines => [...lines, { text: `\n${event.message}`, error: true }]); finish("FAILED"); };
    next.postMessage({ wasmUrl: new URL(`${FILES}/ace.wasm`, window.location.href).href, args, program, input });
  }, [finish, input, mode, printed, program]);

  return <section className="ace-lab" aria-label="Turing’s Automatic Computing Engine">
    <div className="ace-controls">
      <p className="record-voice">01 / CHOOSE A JOB, OR WRITE ONE</p>
      <div className="ace-bar">
        <label>Example<select value={selected} onChange={event => { const example = examples.find(candidate => candidate.name === event.target.value); if (example) load(example); }}>
          {examples.map(example => <option key={example.name}>{example.name}</option>)}
        </select></label>
        <label>What to do with it<select value={mode} onChange={event => setMode(event.target.value)}>
          {MODES.map(candidate => <option key={candidate.id} value={candidate.id}>{candidate.label}</option>)}
        </select></label>
        <button type="button" className="ace-run" onClick={run} disabled={running || examples.length === 0}>RUN</button>
        <button type="button" onClick={() => finish("STOPPED")} disabled={!running}>STOP</button>
        <label className="ace-check"><input type="checkbox" checked={printed} onChange={event => setPrinted(event.target.checked)}/> Tables as printed in 1945</label>
        <span className="record-voice" aria-live="polite">{status}</span>
      </div>
    </div>
    <div className="ace-panes">
      <div>
        <p className="record-voice">02 / INSTRUCTION TABLES, IN POPULAR FORM <span className="ace-editor-hint">/ HOVER OVER ANY INSTRUCTION</span></p>
        <AceEditor className="ace-program" label="Instruction tables in Turing’s popular form" value={program} onChange={setProgram} onRun={run}/>
        <label htmlFor="ace-input" className="record-voice">03 / NUMBERS ON CARDS IN THE READER, TWELVE TO A CARD</label>
        <textarea id="ace-input" className="ace-input" value={input} spellCheck={false} onChange={event => setInput(event.target.value)}/>
      </div>
      <div>
        <p className="record-voice">04 / CARDS PUNCHED, AND WHAT THE MACHINE SAYS</p>
        <pre ref={pane} className="ace-output">{output.map((line, index) => <span key={index} className={line.error ? "ace-error" : undefined}>{line.text}</span>)}</pre>
      </div>
    </div>
  </section>;
}
