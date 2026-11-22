"use client";

import { useEffect, useState } from "react";
import { JossTypewriter } from "./JossTypewriter";

/**
 * The console on /demos/joss: a typewriter to sit at, and a choice of
 * sittings from the papers for it to type in.
 */
type Example = { name: string; year: "1964" | "1965"; lines: string[] };
type Console = { play: (lines: string[]) => Promise<void>; setYear: (year: string) => Promise<void> };

export function JossConsole() {
  const [examples, setExamples] = useState<Example[]>([]);
  const [chosen, setChosen] = useState("1965-quadratic-with-mistakes");
  const [year, setYear] = useState<"1964" | "1965">("1965");
  const [desk, setDesk] = useState<Console | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/demos/joss/examples.json").then(response => response.json() as Promise<Example[]>).then(list => {
      if (!cancelled) setExamples(list);
    }).catch(() => {});
    return () => { cancelled = true; };
  }, []);

  // `?sit=name` types that sitting in when the typewriter is ready.
  useEffect(() => {
    if (!desk || !examples.length) return;
    const example = examples.find(candidate => candidate.name === new URLSearchParams(window.location.search).get("sit"));
    if (example) void desk.setYear(example.year).then(() => desk.play(example.lines));
  }, [desk, examples]);

  const play = async () => {
    const example = examples.find(candidate => candidate.name === chosen);
    if (!desk || !example) return;
    await desk.setYear(example.year);
    void desk.play(example.lines);
  };

  return <section className="joss-console-lab" aria-label="JOSS console">
    <p className="record-voice">01 / SIT AT THE CONSOLE / CLICK THE PAPER AND TYPE</p>
    <JossTypewriter year={year} onReady={setDesk} label="The paper in the JOSS typewriter"/>
    <div className="joss-bar">
      <label>A sitting from the papers<select value={chosen} onChange={event => setChosen(event.target.value)}>
        {examples.map(example => <option key={example.name}>{example.name}</option>)}
      </select></label>
      <button type="button" className="joss-run" onClick={play} disabled={!desk || !examples.length}>TYPE IT IN</button>
      <label className="joss-year">JOSS of<select value={year} onChange={event => setYear(event.target.value as "1964" | "1965")}>
        <option>1965</option><option>1964</option>
      </select></label>
    </div>
  </section>;
}
