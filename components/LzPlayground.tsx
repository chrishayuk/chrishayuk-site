"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { LzEditor } from "./LzEditor";
import { LzPaper, type Speed } from "./LzPaper";
import { job, loadExamples, type Compared, type Example, type Fed, type Problem, type Settings, type Traced, type Translated } from "./lzTape";

/**
 * The Laning and Zierler system in the page, as the batch job it was: type
 * the tape, feed it, and the delayed printer types the answers. The other
 * views are the reconstruction's: the block of orders each equation was
 * translated into, a trace of the run, what it cost, and the same tape fed
 * with each kind of zero.
 *
 * The address can choose a tape and settings:
 * ?example=1976-knuth-tpk&run&speed=fast|flexowriter|instant&zero=plus&rules=1954
 */

type View = "page" | "translation" | "trace" | "cost" | "zeros" | "check";
const VIEWS: { id: View; label: string }[] = [
  { id: "page", label: "The page" },
  { id: "translation", label: "Translation" },
  { id: "trace", label: "Trace" },
  { id: "cost", label: "Cost" },
  { id: "zeros", label: "+0 and −0" },
  { id: "check", label: "Check" },
];

const SPEEDS: { id: Speed; label: string }[] = [
  { id: "flexowriter", label: "10 characters a second" },
  { id: "fast", label: "Fast" },
  { id: "instant", label: "At once" },
];

export function LzPlayground() {
  const [examples, setExamples] = useState<Example[]>([]);
  const [selected, setSelected] = useState("");
  const [about, setAbout] = useState("");
  const [tape, setTape] = useState("");
  const [zero, setZero] = useState<"ones" | "plus">("ones");
  const [rules, setRules] = useState(false);
  const [speed, setSpeed] = useState<Speed>("flexowriter");
  const [view, setView] = useState<View>("page");
  const [status, setStatus] = useState("");
  const [running, setRunning] = useState(false);
  const [fed, setFed] = useState<Fed | null>(null);
  const [other, setOther] = useState<{ translation?: Translated; trace?: Traced; zeros?: Compared; check?: Problem[] }>({});
  const abandon = useRef<() => void>(() => {});
  const settings: Settings = useMemo(() => ({ zero, rules }), [zero, rules]);

  const load = useCallback((example: Example) => {
    setSelected(example.name);
    setTape(example.tape);
    setAbout(example.about);
    setFed(null);
    setOther({});
    setStatus("");
  }, []);

  const feed = useCallback(async (text: string, with_: Settings) => {
    abandon.current();
    setRunning(true); setFed(null); setOther({}); setView("page");
    setStatus("READING THE TAPE");
    const started = performance.now();
    try {
      const run = job("feed", text, with_);
      abandon.current = run.abandon;
      const result = await run.result;
      setFed(result);
      const took = `${Math.round(performance.now() - started)} MS IN YOUR BROWSER`;
      setStatus(!result.translated ? "THE TAPE DID NOT TRANSLATE" : result.alarm ? `ALARM / ${took}` : result.limit ? "CUT OFF AFTER TWO MILLION EQUATIONS" : `STOP / ${took}`);
    } catch (error) {
      setStatus(String((error as Error).message || error).toUpperCase());
    } finally {
      setRunning(false);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    loadExamples().then(list => {
      if (cancelled) return;
      setExamples(list);
      const params = new URLSearchParams(window.location.search);
      const chosen = list.find(example => example.name === params.get("example")) ?? list[0];
      const wanted: Settings = { zero: params.get("zero") === "plus" ? "plus" : "ones", rules: params.get("rules") === "1954" };
      const s = params.get("speed");
      if (s === "fast" || s === "instant" || s === "flexowriter") setSpeed(s);
      setZero(wanted.zero!); setRules(!!wanted.rules);
      load(chosen);
      if (params.has("run")) feed(chosen.tape, wanted);
    }).catch(() => setStatus("COULD NOT LOAD THE TAPES"));
    return () => { cancelled = true; abandon.current(); };
  }, [feed, load]);

  // The other views are worked out when they are opened.
  const open = useCallback(async (next: View) => {
    setView(next);
    if (next === "page" || next === "cost" || (next in other && other[next as keyof typeof other])) return;
    const kind = next === "zeros" ? "compare" : next;
    try {
      const run = job(kind as "translation" | "trace" | "compare" | "check", tape, settings);
      abandon.current = run.abandon;
      const result = await run.result;
      setOther(current => ({ ...current, [next]: result }));
    } catch (error) {
      setStatus(String((error as Error).message || error).toUpperCase());
    }
  }, [other, settings, tape]);

  const problems = (list: Problem[]) => <ul className="lz-problems">{list.map((p, i) => <li key={i} className={`lz-${p.severity}`}>line {p.line}: {p.severity === "error" ? "" : `${p.severity}: `}{p.message}</li>)}</ul>;

  return <section className="lz-lab" aria-label="The Laning and Zierler system">
    <div className="lz-controls">
      <p className="record-voice">01 / CHOOSE A TAPE, OR PUNCH ONE</p>
      <div className="lz-bar">
        <label>Tape<select value={selected} onChange={event => { const example = examples.find(candidate => candidate.name === event.target.value); if (example) load(example); }}>
          {examples.map(example => <option key={example.name}>{example.name}</option>)}
        </select></label>
        <label className="lz-narrow">Zero<select value={zero} onChange={event => { setZero(event.target.value as "ones" | "plus"); setOther({}); }}>
          <option value="ones">n − n is −0</option>
          <option value="plus">every zero +0</option>
        </select></label>
        <label className="lz-narrow">Printer<select value={speed} onChange={event => setSpeed(event.target.value as Speed)}>
          {SPEEDS.map(option => <option key={option.id} value={option.id}>{option.label}</option>)}
        </select></label>
        <label className="lz-check"><input type="checkbox" checked={rules} onChange={event => { setRules(event.target.checked); setOther({}); }}/>The rules of January 1954</label>
        <button type="button" className="lz-run" onClick={() => feed(tape, settings)} disabled={running || examples.length === 0}>FEED THE TAPE</button>
        <button type="button" onClick={() => { abandon.current(); setRunning(false); setStatus("STOPPED"); }} disabled={!running}>STOP</button>
        <span className="record-voice lz-status" aria-live="polite">{status}</span>
      </div>
      {about && <p className="lz-about">{about}</p>}
    </div>
    <div className="lz-panes">
      <div>
        <p className="record-voice">02 / THE TAPE <span className="lz-editor-hint">/ HOVER OVER ANY CHARACTER</span></p>
        <LzEditor className="lz-program" label="The tape" value={tape} onChange={value => { setTape(value); setOther({}); }} onRun={() => feed(tape, settings)}/>
        <p className="lz-keys">Type <code>x^2</code> for x², <code>F^2(x)</code> for F²(x), the sine, and <code>x|5</code> for a superscript variable. A space between two digits multiplies.</p>
      </div>
      <div>
        <div className="lz-tabs" role="tablist">{VIEWS.map(option => <button key={option.id} type="button" role="tab" aria-selected={view === option.id} className={view === option.id ? "lz-tab-on" : undefined} onClick={() => open(option.id)}>{option.label}</button>)}</div>
        <div className="lz-view">
          {view === "page" && (fed ? (fed.translated ? <LzPaper key={`${fed.page.length}-${status}`} label="What the printer typed" page={fed.page} alarm={fed.alarm} speed={speed}/> : <>{problems(fed.problems)}<p className="lz-margin record-voice">THE TRANSLATOR STOPPED. NOTHING WAS RUN.</p></>) : <p className="lz-idle">Press FEED THE TAPE. The tape is read, translated into blocks of orders on the drum, and run; the printer types what PRINT asks for.</p>)}
          {view === "translation" && (other.translation ? (other.translation.problems.length ? problems(other.translation.problems) : <pre className="lz-listing">{other.translation.text}</pre>) : <p className="lz-idle">Translating…</p>)}
          {view === "trace" && (other.trace ? <pre className="lz-listing">{other.trace.lines.join("\n")}{other.trace.cut ? "\n…" : ""}{other.trace.notes.length ? `\n\n${other.trace.notes.join("\n")}` : ""}</pre> : <p className="lz-idle">Tracing…</p>)}
          {view === "cost" && (fed?.stats.length ? <table className="lz-cost"><tbody>{fed.stats.map(row => <tr key={row.label}><th scope="row">{row.label}</th><td>{row.value.toLocaleString("en-GB")}</td><td>{row.note}</td></tr>)}</tbody></table> : <p className="lz-idle">Feed the tape first.</p>)}
          {view === "cost" && <p className="lz-margin">Only the drum’s “about 30 milliseconds” is a figure from 1954. C. W. Adams, in May 1954, put the whole system at “a reduction of computing speed of the order of magnitude of ten to one from an efficient computer program”.</p>}
          {view === "zeros" && (other.zeros ? <div className="lz-compare">
            <div><p className="record-voice">n − n IS −0</p>{other.zeros.ones.translated ? <LzPaper label="One’s complement" page={other.zeros.ones.page} alarm={other.zeros.ones.alarm} speed="instant" highlight={other.zeros.differ}/> : problems(other.zeros.ones.problems)}</div>
            <div><p className="record-voice">EVERY ZERO +0</p>{other.zeros.plus.translated ? <LzPaper label="Every zero +0" page={other.zeros.plus.page} alarm={other.zeros.plus.alarm} speed="instant" highlight={other.zeros.differ}/> : problems(other.zeros.plus.problems)}</div>
            <p className="lz-margin">{other.zeros.differ.length ? (other.zeros.differ.length === 1 ? "1 line differs." : `${other.zeros.differ.length} lines differ.`) : "The two pages are the same."}</p>
          </div> : <p className="lz-idle">Feeding the tape twice…</p>)}
          {view === "check" && (other.check ? (other.check.length ? problems(other.check) : <p className="lz-idle">Nothing to report.</p>) : <p className="lz-idle">Reading…</p>)}
        </div>
      </div>
    </div>
  </section>;
}
