"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { MouseEditor } from "./MouseEditor";

/**
 * One small Mouse program that can be edited and run where it sits in a note.
 * It uses the same worker and WebAssembly interpreter as /demos/mouse, loaded
 * only when RUN is pressed.
 */
type WorkerMessage = { type: "out"; fd: number; text: string } | { type: "done"; code: number } | { type: "error"; message: string };

const FILES = "/demos/mouse";

export function MouseRunner({ label, program, input = "", note }: { label: string; program: string; input?: string; note?: string }) {
  const [source, setSource] = useState(program);
  const [output, setOutput] = useState<{ text: string; error: boolean }[] | null>(null);
  const [running, setRunning] = useState(false);
  const worker = useRef<Worker | null>(null);
  useEffect(() => () => worker.current?.terminate(), []);

  const stop = useCallback(() => { worker.current?.terminate(); worker.current = null; setRunning(false); }, []);
  const run = useCallback(() => {
    worker.current?.terminate();
    setOutput([]);
    setRunning(true);
    const next = new Worker(`${FILES}/worker.js`, { type: "module" });
    worker.current = next;
    next.onmessage = (event: MessageEvent<WorkerMessage>) => {
      const message = event.data;
      if (message.type === "out") setOutput(lines => [...(lines || []), { text: message.text, error: message.fd === 2 }]);
      else { if (message.type === "error") setOutput(lines => [...(lines || []), { text: `\n${message.message}`, error: true }]); stop(); }
    };
    next.onerror = event => { setOutput(lines => [...(lines || []), { text: `\n${event.message}`, error: true }]); stop(); };
    next.postMessage({ wasmUrl: new URL(`${FILES}/mouse.wasm`, window.location.href).href, program: source, input });
  }, [input, source, stop]);

  return <figure className="mouse-runner">
    <figcaption className="record-voice">{label}</figcaption>
    <MouseEditor label={`${label}: Mouse program`} value={source} onChange={setSource} onRun={run}/>
    <div className="mouse-runner-bar">
      <button type="button" onClick={running ? stop : run}>{running ? "STOP" : "RUN"}</button>
      {source !== program && <button type="button" className="mouse-runner-reset" onClick={() => { setSource(program); setOutput(null); }}>RESET</button>}
      <output aria-live="polite">{output === null ? <span className="mouse-runner-idle">Runs in your browser.</span> : output.map((line, index) => <span key={index} className={line.error ? "mouse-error" : undefined}>{line.text}</span>)}</output>
    </div>
    {note && <p className="mouse-runner-note">{note}</p>}
  </figure>;
}
