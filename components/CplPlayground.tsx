"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { CplEditor } from "./CplEditor";

/**
 * A CPL interpreter in the page.
 *
 * The interpreter is the Rust program from github.com/chrishayuk/cpl, compiled
 * unchanged for WASI. The files in public/demos/cpl/ (cpl.wasm, wasi.js,
 * worker.js, examples.json, and the language server beside them) are copied
 * from that repository's web/ folder: rebuild them there with
 * `node web/build.mjs` and copy them across, rather than editing them here.
 * The editor's colours, problems and hover help come from the language server
 * in the same repository (CplEditor).
 *
 * Every run happens in a worker, so a program that never ends can be stopped
 * by terminating it.
 */

type Example = { name: string; program: string; input: string };
type Mode = "run" | "printed" | "code";
const MODES: { id: Mode; label: string }[] = [
  { id: "run", label: "Run it" },
  { id: "printed", label: "Print it as in 1966" },
  { id: "code", label: "Show the compiled code" },
];
type Line = { text: string; error: boolean };
type WorkerMessage = { type: "out"; fd: number; text: string } | { type: "done"; code: number } | { type: "error"; message: string };

const FILES = "/demos/cpl";

export function CplPlayground() {
  const [examples, setExamples] = useState<Example[]>([]);
  const [selected, setSelected] = useState("");
  const [program, setProgram] = useState("");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState<Line[]>([]);
  const [status, setStatus] = useState("");
  const [running, setRunning] = useState(false);
  const [mode, setMode] = useState<Mode>("run");
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
        const wanted = new URLSearchParams(window.location.search).get("example");
        load(list.find(example => example.name === wanted) ?? list[0]);
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
    const next = new Worker(`${FILES}/worker.js`, { type: "module" });
    worker.current = next;
    next.onmessage = (event: MessageEvent<WorkerMessage>) => {
      const message = event.data;
      if (message.type === "out") setOutput(lines => [...lines, { text: message.text, error: message.fd === 2 }]);
      else if (message.type === "error") { setOutput(lines => [...lines, { text: `\n${message.message}`, error: true }]); finish("STOPPED"); }
      else { const took = `FINISHED IN ${Math.round(performance.now() - started)} MS`; finish(message.code ? `${took} / EXIT ${message.code}` : took); }
    };
    next.onerror = event => { setOutput(lines => [...lines, { text: `\n${event.message}`, error: true }]); finish("FAILED"); };
    next.postMessage({ wasmUrl: new URL(`${FILES}/cpl.wasm`, window.location.href).href, program, input, mode });
  }, [finish, input, mode, program]);

  return <section className="cpl-lab" aria-label="CPL interpreter">
    <div className="cpl-controls">
      <p className="record-voice">01 / CHOOSE A PROGRAM, OR WRITE ONE</p>
      <div className="cpl-bar">
        <label>Example<select value={selected} onChange={event => { const example = examples.find(candidate => candidate.name === event.target.value); if (example) load(example); }}>
          {examples.map(example => <option key={example.name}>{example.name}</option>)}
        </select></label>
        <label className="cpl-mode">Do<select value={mode} onChange={event => setMode(event.target.value as Mode)}>
          {MODES.map(option => <option key={option.id} value={option.id}>{option.label}</option>)}
        </select></label>
        <button type="button" className="cpl-run" onClick={run} disabled={running || examples.length === 0}>RUN</button>
        <button type="button" onClick={() => finish("STOPPED")} disabled={!running}>STOP</button>
        <span className="record-voice" aria-live="polite">{status}</span>
      </div>
    </div>
    <div className="cpl-panes">
      <div>
        <p className="record-voice">02 / PROGRAM <span className="cpl-editor-hint">/ HOVER OVER ANY WORD</span></p>
        <CplEditor className="cpl-program" label="CPL program" value={program} onChange={setProgram} onRun={run}/>
        <label htmlFor="cpl-input" className="record-voice">03 / INPUT, READ BY Read AND Readchar</label>
        <textarea id="cpl-input" className="cpl-input" value={input} spellCheck={false} onChange={event => setInput(event.target.value)}/>
      </div>
      <div>
        <p className="record-voice">04 / OUTPUT</p>
        <pre ref={pane} className="cpl-output">{output.map((line, index) => <span key={index} className={line.error ? "cpl-error" : undefined}>{line.text}</span>)}</pre>
      </div>
    </div>
  </section>;
}
