"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { CplEditor } from "./CplEditor";

/**
 * One CPL program that can be edited and run where it sits in a note. It uses
 * the same worker and WebAssembly interpreter as /demos/cpl, loaded only when
 * RUN is pressed.
 *
 * `program` is shown in an editor. `programFile` names a longer program under
 * /demos/cpl/ that is fetched and run without being shown, and then `input`
 * is the editable part: what the program reads. `inputFile` is input too long
 * to show. `mode` is "run", or "printed" to print the program as it would
 * have been typeset.
 */
type WorkerMessage = { type: "out"; fd: number; text: string } | { type: "done"; code: number } | { type: "error"; message: string };

const FILES = "/demos/cpl";
const text = (file: string) => fetch(`${FILES}/${file}`).then(response => { if (!response.ok) throw new Error(`could not load ${file}`); return response.text(); });

export function CplRunner({ label, program = "", programFile, programName, input = "", inputFile, inputName, mode = "run", note }: {
  label: string; program?: string; programFile?: string; programName?: string; input?: string; inputFile?: string; inputName?: string; mode?: "run" | "printed"; note?: string;
}) {
  const [source, setSource] = useState(program);
  const [typed, setTyped] = useState(input);
  const [output, setOutput] = useState<{ text: string; error: boolean }[] | null>(null);
  const [running, setRunning] = useState(false);
  const worker = useRef<Worker | null>(null);
  useEffect(() => () => worker.current?.terminate(), []);

  const stop = useCallback(() => { worker.current?.terminate(); worker.current = null; setRunning(false); }, []);
  const run = useCallback(async () => {
    worker.current?.terminate();
    setOutput([]);
    setRunning(true);
    try {
      const [code, read] = await Promise.all([programFile ? text(programFile) : source, inputFile ? text(inputFile) : typed]);
      const next = new Worker(`${FILES}/worker.js`, { type: "module" });
      worker.current = next;
      next.onmessage = (event: MessageEvent<WorkerMessage>) => {
        const message = event.data;
        if (message.type === "out") setOutput(lines => [...(lines || []), { text: message.text, error: message.fd === 2 }]);
        else { if (message.type === "error") setOutput(lines => [...(lines || []), { text: `\n${message.message}`, error: true }]); stop(); }
      };
      next.onerror = event => { setOutput(lines => [...(lines || []), { text: `\n${event.message}`, error: true }]); stop(); };
      next.postMessage({ wasmUrl: new URL(`${FILES}/cpl.wasm`, window.location.href).href, program: code, input: read, mode });
    } catch (error) {
      setOutput([{ text: String((error as Error).message || error), error: true }]);
      stop();
    }
  }, [inputFile, mode, programFile, source, stop, typed]);

  const changed = source !== program || typed !== input;
  return <figure className="cpl-runner">
    <figcaption className="record-voice">{label}</figcaption>
    {programFile
      ? <p className="cpl-runner-fixed">PROGRAM: {programName}</p>
      : <CplEditor label={`${label}: CPL program`} value={source} onChange={setSource} onRun={run}/>}
    {inputFile && <p className="cpl-runner-fixed">GIVEN TO READ: {inputName}</p>}
    {programFile && !inputFile && <>
      <label className="cpl-runner-input-label record-voice" htmlFor={`cpl-in-${label}`}>GIVEN TO READ / CHANGE IT AND RUN AGAIN</label>
      <textarea id={`cpl-in-${label}`} value={typed} rows={Math.min(8, typed.split("\n").length + 1)} spellCheck={false} onChange={event => setTyped(event.target.value)}/>
    </>}
    <div className="cpl-runner-bar">
      <button type="button" onClick={running ? stop : run}>{running ? "STOP" : "RUN"}</button>
      {changed && <button type="button" className="cpl-runner-reset" onClick={() => { setSource(program); setTyped(input); setOutput(null); }}>RESET</button>}
      <output aria-live="polite">{output === null ? <span className="cpl-runner-idle">Runs in your browser.</span> : output.map((line, index) => <span key={index} className={line.error ? "cpl-error" : undefined}>{line.text}</span>)}</output>
    </div>
    {note && <p className="cpl-runner-note">{note}</p>}
  </figure>;
}
