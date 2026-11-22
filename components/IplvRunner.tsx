"use client";

import { useState } from "react";
import { runDeck } from "@/lib/iplv-machine";

/**
 * One IPL-V deck that can be edited and run where it sits in a note. It uses
 * the same WebAssembly machine as /demos/ipl-v, loaded when RUN is pressed.
 * A deck is 80-column cards, so the editor keeps its columns.
 */
export function IplvRunner({ label, deck, note, open }: { label: string; deck: string; note?: string; open?: string }) {
  const [source, setSource] = useState(deck);
  const [output, setOutput] = useState<string | null>(null);
  const [running, setRunning] = useState(false);
  const run = async () => {
    setRunning(true);
    try {
      const result = await runDeck(source);
      setOutput(result.text + (result.error ? `! ${result.error.split("\n")[0]}\n` : "") + `\n— ${result.cycles.toLocaleString()} cycles`);
    } catch (error) {
      setOutput(`! ${String((error as Error).message ?? error)}`);
    } finally {
      setRunning(false);
    }
  };
  return <figure className="iplv-runner">
    <figcaption className="record-voice">{label}</figcaption>
    <textarea value={source} spellCheck={false} wrap="off" rows={Math.min(24, source.split("\n").length)} aria-label={`${label}: the deck`} onChange={event => setSource(event.target.value)}/>
    <div className="iplv-runner-bar">
      <button type="button" onClick={() => void run()} disabled={running}>{running ? "RUNNING" : "RUN"}</button>
      {source !== deck && <button type="button" onClick={() => { setSource(deck); setOutput(null); }}>RESET</button>}
      {open && <a className="text-link" href={`/demos/ipl-v?deck=${open}`}>STEP IT IN THE MACHINE ↗</a>}
      {output === null ? <span className="iplv-runner-idle">Runs in your browser.</span> : <output>{output}</output>}
    </div>
    {note && <p className="iplv-runner-note">{note}</p>}
  </figure>;
}
