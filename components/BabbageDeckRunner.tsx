"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * A deck of cards for the control machine of Babbage's Sketch Books, run in
 * the page under every configuration at once: `babbage control run -`, from
 * the analytical-engine repository, compiled for WASI. The files in
 * public/demos/babbage-control/ are copied unedited from that repository's
 * web/ folder (babbage.wasm, worker.js, wasi.js); rebuild them there.
 */

type Run = {
  config: string; date: string; found: boolean; accepted: boolean; refusal?: string;
  status?: "halts" | "trap" | "runs on" | "error"; error?: string; trap?: string; stopped?: string;
  results?: string[]; store?: Record<string, string>; cards?: number; backings?: number; wheelSteps?: number;
};
type Report = { deck?: string; title?: string; trap?: boolean; runs?: Run[]; error?: string };

/** Where the files are: each note keeps the build it was written against. */
const DEFAULT_FILES = "/demos/babbage-control";

const workers = new Map<string, Worker>();
let nextId = 0;
const waiting = new Map<number, (value: { out?: string; err?: string; error?: string }) => void>();

function babbage(files: string, args: string[], text: string): Promise<{ out?: string; err?: string; error?: string }> {
  let worker = workers.get(files);
  if (!worker) {
    worker = new Worker(`${files}/worker.js`, { type: "module" });
    worker.onmessage = (event: MessageEvent) => {
      const { id, ...rest } = event.data;
      waiting.get(id)?.(rest);
      waiting.delete(id);
    };
    workers.set(files, worker);
  }
  const id = nextId++;
  const w = worker;
  return new Promise(resolve => {
    waiting.set(id, resolve);
    w.postMessage({ id, wasmUrl: new URL(`${files}/babbage.wasm`, window.location.href).href, args, text });
  });
}

const LABEL: Record<string, string> = { "1836-03": "MARCH 1836", "1837-12": "DECEMBER 1837", "1838-05": "30 MAY 1838", "1843": "1843, READING A", "1843-B": "1843, READING B", "not-found": "NOT FOUND" };

function outcome(run: Run, show: string[]): string {
  if (!run.accepted) return `Refused: ${run.refusal}`;
  if (run.status === "error") return `Error: ${run.error}`;
  const columns = show.map(c => `${c} = ${run.store?.[c] ?? "0"}`).join(", ");
  const results = run.results?.length ? `gives off ${run.results.slice(0, 6).join(", ")}${run.results.length > 6 ? ", …" : ""}` : "";
  const what = [results, columns].filter(Boolean).join("; ");
  if (run.status === "halts") return `Halts after ${run.cards} cards${what ? `: ${what}` : ""}.`;
  if (run.status === "trap") return `Stops at the trap (${run.trap}) after ${run.cards} cards${what ? `: ${what}` : ""}.`;
  return `Runs on: ${run.stopped ?? "stopped"}.`;
}

export function BabbageDeckRunner({ label, deck, note, show = [], trap: offerTrap = false, startTrap = false, files = DEFAULT_FILES }: {
  label: string; deck: string; note?: string; show?: string[]; trap?: boolean; startTrap?: boolean; files?: string;
}) {
  const [source, setSource] = useState(deck);
  const [trap, setTrap] = useState(startTrap);
  const [report, setReport] = useState<Report | null>(null);
  const [running, setRunning] = useState(false);
  const live = useRef(true);
  useEffect(() => () => { live.current = false; }, []);

  const run = useCallback(async () => {
    setRunning(true);
    const args = ["control", "run", "-", ...(offerTrap ? [trap ? "--trap" : "--no-trap"] : [])];
    const answer = await babbage(files, args, source);
    if (!live.current) return;
    setRunning(false);
    if (answer.error) { setReport({ error: answer.error }); return; }
    try { setReport(JSON.parse(answer.out || "{}")); } catch { setReport({ error: answer.err || "no answer" }); }
  }, [files, offerTrap, source, trap]);

  return <figure className="babbage-deck">
    <figcaption className="record-voice">{label}</figcaption>
    <textarea className="babbage-deck-text" aria-label={`${label}: the deck`} value={source} spellCheck={false}
      rows={Math.min(18, source.split("\n").length + 1)} onChange={event => { setSource(event.target.value); setReport(null); }}/>
    <div className="babbage-deck-bar">
      <button type="button" onClick={run} disabled={running}>{running ? "RUNNING" : "RUN UNDER EVERY DATE"}</button>
      {source !== deck && <button type="button" className="babbage-deck-reset" onClick={() => { setSource(deck); setReport(null); }}>RESET</button>}
      {offerTrap && <label className="babbage-deck-trap"><input type="checkbox" checked={trap} onChange={event => { setTrap(event.target.checked); setReport(null); }}/> Read a stop at 1 ÷ 0 as the end (Model D)</label>}
    </div>
    <output aria-live="polite" className="babbage-deck-out">
      {report === null ? <span className="babbage-deck-idle">Runs in your browser.</span>
        : report.error ? <span className="babbage-deck-error">{report.error}</span>
        : <table><tbody>{report.runs?.map(r => <tr key={r.config} className={r.accepted ? undefined : "babbage-deck-refused"}>
            <th scope="row" className="record-voice">{LABEL[r.config] ?? r.config}{r.found ? "" : " ·"}</th>
            <td>{outcome(r, show)}</td>
          </tr>)}</tbody></table>}
    </output>
    {note && <p className="babbage-deck-note">{note}</p>}
  </figure>;
}
