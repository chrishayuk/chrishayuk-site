"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AceEditor } from "./AceEditor";

/**
 * One small job for Turing's 1945 machine that can be edited and run where it
 * sits in a note. It uses the same worker and WebAssembly program as
 * /demos/turing-ace, loaded only when RUN is pressed. `args` is the ace
 * command, with `-` standing for the tables in the box. With `printed`, a
 * switch runs the library's tables exactly as the report prints them.
 */
type WorkerMessage = { type: "out"; fd: number; text: string } | { type: "done"; code: number } | { type: "error"; message: string };

const FILES = "/demos/turing-ace";

export function AceRunner({ label, program = "", input = "", args = ["run", "-"], note, printed: offerPrinted = false, startPrinted = false }: {
  label: string; program?: string; input?: string; args?: string[]; note?: string; printed?: boolean; startPrinted?: boolean;
}) {
  const [source, setSource] = useState(program);
  const [printed, setPrinted] = useState(startPrinted);
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
    // A table as printed may never stop; a modest limit keeps the answer quick.
    const extra = printed ? ["--errata", "none", ...(args[0] === "run" ? ["--limit", "200000"] : [])] : [];
    next.postMessage({ wasmUrl: new URL(`${FILES}/ace.wasm`, window.location.href).href, args: [...args, ...extra], program: source, input });
  }, [args, input, printed, source, stop]);

  return <figure className="ace-runner">
    <figcaption className="record-voice">{label}</figcaption>
    {program && <AceEditor label={`${label}: instruction tables`} value={source} onChange={setSource} onRun={run}/>}
    {input && <p className="ace-runner-input">CARDS IN THE READER: {input}</p>}
    <div className="ace-runner-bar">
      <button type="button" onClick={running ? stop : run}>{running ? "STOP" : "RUN"}</button>
      {source !== program && <button type="button" className="ace-runner-reset" onClick={() => { setSource(program); setOutput(null); }}>RESET</button>}
      {offerPrinted && <label className="ace-runner-printed"><input type="checkbox" checked={printed} onChange={event => { setPrinted(event.target.checked); setOutput(null); }}/> Tables as printed in 1945</label>}
      <output aria-live="polite">{output === null ? <span className="ace-runner-idle">{printed ? "As printed. Runs in your browser." : "Corrected. Runs in your browser."}</span> : output.map((line, index) => <span key={index} className={line.error ? "ace-error" : undefined}>{line.text}</span>)}</output>
    </div>
    {note && <p className="ace-runner-note">{note}</p>}
  </figure>;
}
