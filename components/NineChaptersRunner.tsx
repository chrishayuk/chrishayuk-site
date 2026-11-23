"use client";

import { useCallback, useState } from "react";
import { NineChaptersChecked, NineChaptersCount } from "./NineChaptersChecked";
import { NineChaptersEditor } from "./NineChaptersEditor";
import { check, stepsOf, textBoard, type Run } from "./nineChaptersJob";

/**
 * One page that can be edited and run where it sits in a note: the page
 * checked, and the board as the last step leaves it, as text. It uses the
 * same worker and WebAssembly program as /demos/nine-chapters, loaded only
 * when RUN THE PAGE is pressed; the playground draws the board in three
 * dimensions and steps through it.
 */
export function NineChaptersRunner({ label, page, note, play }: { label: string; page: string; note?: string; play?: string }) {
  const [source, setSource] = useState(page);
  const [run, setRun] = useState<Run | null>(null);
  const [runs, setRuns] = useState(0);
  const [failure, setFailure] = useState("");
  const [running, setRunning] = useState(false);

  const go = useCallback(async () => {
    setFailure(""); setRunning(true);
    try {
      setRun(await check(source)); setRuns(n => n + 1);
    } catch (error) {
      setFailure(String((error as Error).message || error));
    } finally {
      setRunning(false);
    }
  }, [source]);

  const steps = run ? stepsOf(run) : [];
  const last = steps.at(-1);

  return <figure className="nc-runner">
    <figcaption className="record-voice">{label}</figcaption>
    <NineChaptersEditor label={`${label}: the page`} value={source} onChange={setSource} onRun={go}/>
    <div className="nc-runner-bar">
      <button type="button" onClick={go} disabled={running}>{run ? "RUN IT AGAIN" : "RUN THE PAGE"}</button>
      {source !== page && <button type="button" className="nc-runner-reset" onClick={() => { setSource(page); setRun(null); }}>RESET</button>}
      {run ? <span className="nc-runner-idle"><NineChaptersCount run={run}/></span> : !running && <span className="nc-runner-idle">Runs in your browser.</span>}
      {play && <a className="nc-runner-play" href={play}>ON THE BOARD, IN 3D ↗</a>}
    </div>
    {failure && <p className="nc-problems">{failure}</p>}
    {run && <div className="nc-runner-result">
      <NineChaptersChecked key={runs} run={run} label={`${label}: checked`}/>
      {last && <div><p className="record-voice">THE BOARD AFTER THE LAST STEP: {last.what.toUpperCase()}</p><pre className="nc-text-board">{textBoard(last.board)}</pre></div>}
    </div>}
    {note && <p className="nc-runner-note">{note}</p>}
  </figure>;
}
