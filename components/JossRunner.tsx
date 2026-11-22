"use client";

import { useState } from "react";
import { JossEditor } from "./JossEditor";
import { JossTypewriter } from "./JossTypewriter";

/**
 * A sitting at JOSS that starts where it stands in a note. The lines shown are
 * typed in at a small typewriter when TYPE IT IN is pressed, and the
 * typewriter stays: the reader can go on typing, which is the point of JOSS.
 * It uses the same typewriter, worker and WebAssembly interpreter as
 * /demos/joss, loaded when TYPE IT IN is pressed.
 */
export function JossRunner({ label, program, year = "1965", note, next }: { label: string; program: string; year?: "1964" | "1965"; note?: string; next?: string }) {
  const [source, setSource] = useState(program);
  const [run, setRun] = useState(0);
  const lines = source.replace(/\n+$/, "").split("\n");
  return <figure className="joss-runner">
    <figcaption className="record-voice">{label}</figcaption>
    <JossEditor label={`${label}: lines to type at JOSS`} value={source} onChange={setSource} onRun={() => setRun(n => n + 1)}/>
    <div className="joss-runner-bar">
      <button type="button" onClick={() => setRun(n => n + 1)}>{run ? "TYPE IT IN AGAIN" : "TYPE IT IN"}</button>
      {source !== program && <button type="button" className="joss-runner-reset" onClick={() => { setSource(program); setRun(0); }}>RESET</button>}
      {!run && <span className="joss-runner-idle">At a typewriter, in your browser.</span>}
    </div>
    {run > 0 && <JossTypewriter key={run} year={year} lines={lines} signOn={false} compact autoplay label={`${label}: the paper`}/>}
    {run > 0 && next && <p className="joss-runner-next record-voice">{next}</p>}
    {note && <p className="joss-runner-note">{note}</p>}
  </figure>;
}
