"use client";

import { useState } from "react";
import { JossEditor } from "./JossEditor";
import { JossPaper, useSitting, type Year } from "./JossPaper";

/**
 * A sitting at JOSS that starts where it stands in a note. The lines shown
 * are typed in when RUN is pressed, and the paper stays open after them: the
 * reader can go on typing, which is the point of JOSS. It uses the same
 * worker and WebAssembly interpreter as /demos/joss, loaded when RUN is
 * pressed.
 */
export function JossRunner({ label, program, year = "1965", note, next }: { label: string; program: string; year?: Year; note?: string; next?: string }) {
  const [source, setSource] = useState(program);
  const [open, setOpen] = useState(false);
  const desk = useSitting(year);
  const run = () => { setOpen(true); void desk.begin(source.replace(/\n+$/, "").split("\n")); };
  return <figure className="joss-runner">
    <figcaption className="record-voice">{label}</figcaption>
    <JossEditor label={`${label}: lines to type at JOSS`} value={source} onChange={setSource} onRun={run}/>
    <div className="joss-runner-bar">
      <button type="button" onClick={run}>{open ? "TYPE IT IN AGAIN" : "TYPE IT IN"}</button>
      {source !== program && <button type="button" className="joss-runner-reset" onClick={() => { setSource(program); setOpen(false); void desk.begin(); }}>RESET</button>}
      {!open && <span className="joss-runner-idle">Runs in your browser.</span>}
    </div>
    {open && <JossPaper console={desk} label={`${label}: the paper`}/>}
    {open && next && <p className="joss-runner-next record-voice">{next}</p>}
    {note && <p className="joss-runner-note">{note}</p>}
  </figure>;
}
