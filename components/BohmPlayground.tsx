"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { BohmEditor, type BohmEditorHandle } from "./BohmEditor";

/**
 * Böhm's 1951 language, machine and compiler in the page.
 *
 * The program is the Rust `bohm` command, compiled unchanged for WASI. The
 * files in public/demos/bohm/ (bohm.wasm, wasi.js, worker.js, examples.json)
 * are copied from that repository's web/ folder: rebuild them there with
 * `node web/build.mjs` and copy them across, rather than editing them here.
 * The editor's colours, problems and hover help come from the language
 * server in the same program (BohmEditor).
 *
 * Every run happens in a worker, so a program that never ends can be stopped
 * by terminating it.
 */

type Example = { name: string; program: string; input: string; machineOnly: boolean };
type Line = { text: string; error: boolean };
type WorkerMessage = { type: "out"; fd: number; text: string } | { type: "done"; code: number } | { type: "error"; message: string };

const FILES = "/demos/bohm";

/** What each choice passes to the bohm command. `-` is the program on the page. */
const MODES = [
  { id: "run", label: "Run on Böhm’s machine", args: ["run", "-"] },
  { id: "algebra", label: "Run as algebra, with no machine", args: ["run", "-", "--via", "interp"] },
  { id: "listing", label: "Show the instructions", args: ["compile", "-", "--via", "bohm"] },
  { id: "normal", label: "Show the formulas the compiler accepts", args: ["compile", "-", "--emit", "normal"] },
  { id: "verify", label: "Run all three ways and compare", args: ["verify", "-"] },
  { id: "trace", label: "Run, and show every instruction executed", args: ["run", "-", "--trace"] },
  { id: "selfhost", label: "Have Böhm’s compiler compile itself", args: ["selfhost"] },
];

/** The symbols of the thesis, for keyboards that lack them. */
const KEYS = ["→", "π", "π'", "Ω", "↓", "∸", "·", ":", "÷", "∪", "∩", "mod"];

export function BohmPlayground() {
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
  const editor = useRef<BohmEditorHandle | null>(null);

  const load = useCallback((example: Example) => {
    setSelected(example.name);
    setProgram(example.program);
    setInput(example.input);
    setOutput([]);
    setStatus(example.machineOnly ? "THIS ONE ONLY MEANS SOMETHING ON THE MACHINE" : "");
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
    const args = [...chosen.args, ...(printed ? ["--errata", "none"] : [])];
    // The trace is written to standard error, but it is not an error.
    const plain = chosen.id === "trace";
    const next = new Worker(`${FILES}/worker.js`, { type: "module" });
    worker.current = next;
    next.onmessage = (event: MessageEvent<WorkerMessage>) => {
      const message = event.data;
      if (message.type === "out") setOutput(lines => [...lines, { text: message.text, error: message.fd === 2 && !plain }]);
      else if (message.type === "error") { setOutput(lines => [...lines, { text: `\n${message.message}`, error: true }]); finish("STOPPED"); }
      else { const took = `FINISHED IN ${Math.round(performance.now() - started)} MS`; finish(message.code ? `${took} / EXIT ${message.code}` : took); }
    };
    next.onerror = event => { setOutput(lines => [...lines, { text: `\n${event.message}`, error: true }]); finish("FAILED"); };
    next.postMessage({ wasmUrl: new URL(`${FILES}/bohm.wasm`, window.location.href).href, args, program, input });
  }, [finish, input, mode, printed, program]);

  const type = useCallback((key: string) => editor.current?.insert(key === "mod" ? " mod " : key), []);

  return <section className="bohm-lab" aria-label="Böhm’s language">
    <div className="bohm-controls">
      <p className="record-voice">01 / CHOOSE A PROGRAM, OR WRITE ONE</p>
      <div className="bohm-bar">
        <label>Example<select value={selected} onChange={event => { const example = examples.find(candidate => candidate.name === event.target.value); if (example) load(example); }}>
          {examples.map(example => <option key={example.name}>{example.name}</option>)}
        </select></label>
        <label>What to do with it<select value={mode} onChange={event => setMode(event.target.value)}>
          {MODES.map(candidate => <option key={candidate.id} value={candidate.id}>{candidate.label}</option>)}
        </select></label>
        <button type="button" className="bohm-run" onClick={run} disabled={running || examples.length === 0}>RUN</button>
        <button type="button" onClick={() => finish("STOPPED")} disabled={!running}>STOP</button>
        <label className="bohm-check"><input type="checkbox" checked={printed} onChange={event => setPrinted(event.target.checked)}/> Compiler as printed in 1954</label>
        <span className="record-voice" aria-live="polite">{status}</span>
      </div>
    </div>
    <div className="bohm-panes">
      <div>
        <p className="record-voice">02 / PROGRAM <span className="bohm-editor-hint">/ HOVER OVER ANY FORMULA</span></p>
        <div className="bohm-keys" aria-label="Symbols">{KEYS.map(key => <button type="button" key={key} onClick={() => type(key)}>{key}</button>)}</div>
        <BohmEditor className="bohm-program" label="Program in Böhm’s notation" value={program} onChange={setProgram} onRun={run} handle={editor}/>
        <label htmlFor="bohm-input" className="record-voice">03 / INPUT TAPE, READ BY ?</label>
        <textarea id="bohm-input" className="bohm-input" value={input} spellCheck={false} onChange={event => setInput(event.target.value)}/>
      </div>
      <div>
        <p className="record-voice">04 / OUTPUT</p>
        <pre ref={pane} className="bohm-output">{output.map((line, index) => <span key={index} className={line.error ? "bohm-error" : undefined}>{line.text}</span>)}</pre>
      </div>
    </div>
  </section>;
}
