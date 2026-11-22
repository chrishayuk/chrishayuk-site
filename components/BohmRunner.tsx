"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { BohmEditor } from "./BohmEditor";

/**
 * One small Böhm program that can be edited and run where it sits in a note.
 * It uses the same worker and WebAssembly program as /demos/bohm, loaded only
 * when RUN is pressed. `args` is the bohm command to run, with `-` standing
 * for the program in the box; with no program there is no box.
 */
type WorkerMessage = { type: "out"; fd: number; text: string } | { type: "done"; code: number } | { type: "error"; message: string };

const FILES = "/demos/bohm";

export function BohmRunner({ label, program = "", input = "", args = ["run", "-"], note }: { label: string; program?: string; input?: string; args?: string[]; note?: string }) {
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
    next.postMessage({ wasmUrl: new URL(`${FILES}/bohm.wasm`, window.location.href).href, args, program: source, input });
  }, [args, input, source, stop]);

  return <figure className="bohm-runner">
    <figcaption className="record-voice">{label}</figcaption>
    {program && <BohmEditor label={`${label}: program`} value={source} onChange={setSource} onRun={run}/>}
    {input && <p className="bohm-runner-input">INPUT TAPE: {input}</p>}
    <div className="bohm-runner-bar">
      <button type="button" onClick={running ? stop : run}>{running ? "STOP" : "RUN"}</button>
      {source !== program && <button type="button" className="bohm-runner-reset" onClick={() => { setSource(program); setOutput(null); }}>RESET</button>}
      <output aria-live="polite">{output === null ? <span className="bohm-runner-idle">Runs in your browser.</span> : output.map((line, index) => <span key={index} className={line.error ? "bohm-error" : undefined}>{line.text}</span>)}</output>
    </div>
    {note && <p className="bohm-runner-note">{note}</p>}
  </figure>;
}
