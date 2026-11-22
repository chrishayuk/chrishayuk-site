"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * A Mouse interpreter in the page.
 *
 * The interpreter is the Rust program from github.com/chrishayuk/mouse-interpreter,
 * compiled unchanged for WASI. The files in public/demos/mouse/ (mouse.wasm,
 * wasi.js, worker.js, examples.json) are copied from that repository's web/
 * folder: rebuild them there with `node web/build.mjs` and copy them across,
 * rather than editing them here.
 *
 * Every run happens in a worker, so a program that never ends can be stopped
 * by terminating it.
 */

type Example = { name: string; program: string; input: string; endless: boolean };
type Line = { text: string; error: boolean };
type WorkerMessage = { type: "out"; fd: number; text: string } | { type: "done"; code: number } | { type: "error"; message: string };

const FILES = "/demos/mouse";

export function MousePlayground() {
  const [examples, setExamples] = useState<Example[]>([]);
  const [selected, setSelected] = useState("");
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
    setStatus(example.endless ? "THIS ONE NEVER STOPS. USE STOP." : "");
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
    next.postMessage({ wasmUrl: new URL(`${FILES}/mouse.wasm`, window.location.href).href, program, input });
  }, [finish, input, program]);

  return <section className="mouse-lab" aria-label="Mouse interpreter">
    <div className="mouse-controls">
      <p className="record-voice">01 / CHOOSE A PROGRAM, OR WRITE ONE</p>
      <div className="mouse-bar">
        <label>Example<select value={selected} onChange={event => { const example = examples.find(candidate => candidate.name === event.target.value); if (example) load(example); }}>
          {examples.map(example => <option key={example.name}>{example.name}</option>)}
        </select></label>
        <button type="button" className="mouse-run" onClick={run} disabled={running || examples.length === 0}>RUN</button>
        <button type="button" onClick={() => finish("STOPPED")} disabled={!running}>STOP</button>
        <span className="record-voice" aria-live="polite">{status}</span>
      </div>
    </div>
    <div className="mouse-panes">
      <div>
        <label htmlFor="mouse-program" className="record-voice">02 / PROGRAM</label>
        <textarea id="mouse-program" className="mouse-program" value={program} wrap="off" spellCheck={false}
          onChange={event => setProgram(event.target.value)}
          onKeyDown={event => { if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) run(); }}/>
        <label htmlFor="mouse-input" className="record-voice">03 / INPUT, READ BY ?</label>
        <textarea id="mouse-input" className="mouse-input" value={input} spellCheck={false} onChange={event => setInput(event.target.value)}/>
      </div>
      <div>
        <p className="record-voice">04 / OUTPUT</p>
        <pre ref={pane} className="mouse-output">{output.map((line, index) => <span key={index} className={line.error ? "mouse-error" : undefined}>{line.text}</span>)}</pre>
      </div>
    </div>
  </section>;
}
