"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { LzEditor } from "./LzEditor";
import { LzPaper } from "./LzPaper";
import { job, type Compared, type Fed, type Settings } from "./lzTape";

/**
 * One tape that can be edited and fed where it sits in a note. It uses the
 * same worker and WebAssembly program as /demos/laning-zierler, loaded only
 * when FEED THE TAPE is pressed. With `compare`, the tape is fed twice, once
 * with each kind of zero, and the lines that differ are marked.
 */
export function LzRunner({ label, program, note, settings = {}, compare = false }: { label: string; program: string; note?: string; settings?: Settings; compare?: boolean }) {
  const [source, setSource] = useState(program);
  const [fed, setFed] = useState<Fed | null>(null);
  const [compared, setCompared] = useState<Compared | null>(null);
  const [failure, setFailure] = useState("");
  const [running, setRunning] = useState(false);
  const abandon = useRef<() => void>(() => {});
  useEffect(() => () => abandon.current(), []);

  const feed = useCallback(async () => {
    abandon.current();
    setFailure(""); setFed(null); setCompared(null); setRunning(true);
    try {
      if (compare) {
        const run = job("compare", source, settings);
        abandon.current = run.abandon;
        setCompared(await run.result);
      } else {
        const run = job("feed", source, settings);
        abandon.current = run.abandon;
        setFed(await run.result);
      }
    } catch (error) {
      setFailure(String((error as Error).message || error));
    } finally {
      setRunning(false);
    }
  }, [compare, settings, source]);

  const problems = (result: Fed) => !result.translated && <ul className="lz-problems">{result.problems.map((p, i) => <li key={i}>line {p.line}: {p.message}</li>)}</ul>;
  return <figure className="lz-runner">
    <figcaption className="record-voice">{label}</figcaption>
    <LzEditor label={`${label}: the tape`} value={source} onChange={setSource} onRun={feed}/>
    <div className="lz-runner-bar">
      <button type="button" onClick={running ? () => abandon.current() : feed}>{running ? "STOP" : fed || compared ? "FEED IT AGAIN" : "FEED THE TAPE"}</button>
      {source !== program && <button type="button" className="lz-runner-reset" onClick={() => { setSource(program); setFed(null); setCompared(null); }}>RESET</button>}
      {!fed && !compared && !running && <span className="lz-runner-idle">{settings.rules ? "With the restrictions of January 1954. " : ""}Runs in your browser.</span>}
    </div>
    {failure && <p className="lz-problems">{failure}</p>}
    {fed && (fed.translated ? <LzPaper label={`${label}: the page`} page={fed.page} alarm={fed.alarm}/> : problems(fed))}
    {compared && <div className="lz-compare">
      <div><p className="record-voice">ONE’S COMPLEMENT: n − n IS −0</p>{compared.ones.translated ? <LzPaper label={`${label}: one’s complement`} page={compared.ones.page} alarm={compared.ones.alarm} highlight={compared.differ}/> : problems(compared.ones)}</div>
      <div><p className="record-voice">EVERY ZERO IS +0</p>{compared.plus.translated ? <LzPaper label={`${label}: every zero +0`} page={compared.plus.page} alarm={compared.plus.alarm} highlight={compared.differ}/> : problems(compared.plus)}</div>
    </div>}
    {note && <p className="lz-runner-note">{note}</p>}
  </figure>;
}
