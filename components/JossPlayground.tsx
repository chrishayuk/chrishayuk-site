"use client";

import { useCallback, useEffect, useState } from "react";
import { JossEditor } from "./JossEditor";
import { JossPaper, useSitting, type Year } from "./JossPaper";

/**
 * A JOSS console in the page: on the left, lines to type; on the right, the
 * paper, which can be typed on directly. See JossPaper for how it runs.
 */

type Example = { name: string; year: Year; lines: string[] };
type Transcript = { name: string; text: string };

const FILES = "/demos/joss";

/** The lines the user typed in a transcript of an original session, and the keys pressed. */
function typedIn(transcript: string) {
  const lines: string[] = [];
  for (const line of transcript.split("\n")) {
    if (line.startsWith("U:")) lines.push(line.slice(3));
    else if (line.startsWith("D:") || line.startsWith("D~")) lines.push(line.slice(line.indexOf("=") + 1).trim());
    else if (/^! (interrupt|users|time) /.test(line)) lines.push(line);
  }
  return lines;
}

export function JossPlayground() {
  const [examples, setExamples] = useState<Example[]>([]);
  const [transcripts, setTranscripts] = useState<Transcript[]>([]);
  const [selected, setSelected] = useState("");
  const [original, setOriginal] = useState("");
  const [program, setProgram] = useState("");
  const [year, setYear] = useState<Year>("1965");
  const [report, setReport] = useState("");
  const [status, setStatus] = useState("");
  const desk = useSitting(year);
  const { begin, verify } = desk;

  const load = useCallback((example: Example) => {
    setSelected(example.name);
    setProgram(example.lines.join("\n") + "\n");
    setYear(example.year);
    setReport("");
    void begin();
  }, [begin]);

  useEffect(() => {
    let cancelled = false;
    Promise.all([
      fetch(`${FILES}/examples.json`).then(response => response.json() as Promise<Example[]>),
      fetch(`${FILES}/transcripts.json`).then(response => response.json() as Promise<Transcript[]>),
    ]).then(([list, originals]) => {
      if (cancelled) return;
      setExamples(list);
      setTranscripts(originals);
      setOriginal(originals[0]?.name ?? "");
      const query = new URLSearchParams(window.location.search);
      const example = list.find(candidate => candidate.name === query.get("example")) ?? list[0];
      load(example);
      // `&run` types the sitting in straight away.
      if (query.has("run")) void begin(example.lines, example.year);
    }).catch(() => setStatus("COULD NOT LOAD THE EXAMPLES"));
    return () => { cancelled = true; };
    // Loaded once; `load` is stable.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const run = useCallback(() => { setReport(""); void begin(program.replace(/\n+$/, "").split("\n"), year); }, [begin, program, year]);

  const compare = useCallback(async () => {
    const transcript = transcripts.find(candidate => candidate.name === original);
    if (!transcript) return;
    const at: Year = /^! joss 1964$/m.test(transcript.text) ? "1964" : "1965";
    const lines = typedIn(transcript.text);
    setSelected("");
    setYear(at);
    setProgram(lines.join("\n") + "\n");
    setReport("REPLAYING");
    await begin(lines, at);
    try { setReport((await verify(transcript.text)).trim()); } catch (error) { setReport(String((error as Error).message || error)); }
  }, [begin, original, transcripts, verify]);

  return <section className="joss-lab" aria-label="JOSS console">
    <div className="joss-controls">
      <p className="record-voice">01 / CHOOSE A SITTING, OR TYPE ON THE PAPER</p>
      <div className="joss-bar">
        <label>Sitting<select value={selected} onChange={event => { const example = examples.find(candidate => candidate.name === event.target.value); if (example) load(example); }}>
          {!selected && <option value="">an original session</option>}
          {examples.map(example => <option key={example.name}>{example.name}</option>)}
        </select></label>
        <label className="joss-year">JOSS of<select value={year} onChange={event => { setYear(event.target.value as Year); void begin(); }}>
          <option>1965</option><option>1964</option>
        </select></label>
        <button type="button" className="joss-run" onClick={run} disabled={examples.length === 0}>TYPE IT ALL IN</button>
        <button type="button" onClick={() => { setReport(""); void begin(); }}>FRESH PAPER</button>
        <span className="record-voice" aria-live="polite">{status}</span>
      </div>
    </div>
    <div className="joss-panes">
      <div>
        <p className="record-voice">02 / WHAT TO TYPE <span className="joss-editor-hint">/ HOVER OVER ANY WORD</span></p>
        <JossEditor className="joss-program" label="Lines to type at JOSS" value={program} onChange={setProgram} onRun={run}/>
        <p className="joss-hint">A line that begins with a number is kept as a step. Anything else is done at once. Times is <strong>·</strong> (or type <strong>@</strong>); <strong>*</strong> is “to the power”. Type <strong>!=</strong>, <strong>&lt;=</strong> and <strong>&gt;=</strong> for ≠, ≤ and ≥.</p>
      </div>
      <div>
        <p className="record-voice">03 / THE PAPER / GREEN IS YOU, BLACK IS JOSS</p>
        <JossPaper console={desk} label="The paper in the JOSS console" tall/>
      </div>
    </div>
    <div className="joss-compare">
      <p className="record-voice">04 / AN ORIGINAL SESSION, REPLAYED AND COMPARED WITH THE PAGE</p>
      <div className="joss-bar">
        <label>Session<select value={original} onChange={event => setOriginal(event.target.value)}>
          {transcripts.map(transcript => <option key={transcript.name}>{transcript.name}</option>)}
        </select></label>
        <button type="button" onClick={compare} disabled={transcripts.length === 0}>REPLAY IT</button>
      </div>
      {report && <pre className="joss-report">{report}</pre>}
    </div>
  </section>;
}
