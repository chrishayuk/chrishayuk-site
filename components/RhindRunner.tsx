"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";
import { RhindEditor } from "./RhindEditor";
import { RhindChecked, RhindCount } from "./RhindChecked";
import { check, work, type Checked } from "./rhindJob";
import { NoteGuide, type GuideStep } from "./NoteGuide";

/**
 * The scribe's way: `multiply 3 '2 by 5` or `reckon with 6 to find 21`,
 * worked by rhind with only the operations the papyrus has, and set out a
 * row at a time.
 */
export function RhindWork({ question = "reckon with 6 to find 21", label = "04 / WORK IT THE SCRIBE’S WAY", auto = true }: { question?: string; label?: string; auto?: boolean }) {
  const [asked, setAsked] = useState(question);
  const [rows, setRows] = useState<string[]>([]);
  const [failed, setFailed] = useState(false);
  const [shown, setShown] = useState(0);
  const [round, setRound] = useState(0);

  const show = useCallback((lines: string[], wrong: boolean) => {
    setRows(lines); setFailed(wrong); setShown(0); setRound(n => n + 1);
  }, []);
  const ask = useCallback((words: string) => work(words).then(
    result => show(result.lines, result.failed),
    error => show([String((error as Error).message || error)], true)), [show]);

  useEffect(() => {
    if (!auto) return;
    let cancelled = false;
    work(question).then(result => { if (!cancelled) show(result.lines, result.failed); }, () => {});
    return () => { cancelled = true; };
  }, [auto, question, show]);

  // The rows are set out one after another, as the scribe would write them.
  useEffect(() => {
    if (shown >= rows.length) return;
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const timer = setTimeout(() => setShown(reduced ? rows.length : shown + 1), reduced ? 0 : 220);
    return () => clearTimeout(timer);
  }, [rows, shown, round]);

  const submit = (event: FormEvent) => { event.preventDefault(); ask(asked); };

  return <div className="rh-work">
    <p className="record-voice">{label}</p>
    <form className="rh-work-form" onSubmit={submit}>
      <input value={asked} onChange={event => setAsked(event.target.value)} aria-label="multiply A by B, or reckon with A to find B" spellCheck={false} autoCapitalize="off" autoCorrect="off"/>
      <button type="submit">WORK</button>
    </form>
    <p className="rh-keys">Try <code>multiply 3 &apos;2 by 5</code>, <code>reckon with 6 to find 21</code> or <code>reckon with 59 to find 2</code>. This is rhind’s generator, separate from the check. The papyrus divides by multiplying: the scribe doubles the divisor until the rows can be picked to make the dividend.</p>
    {rows.length > 0 && <div className={failed ? "rh-working rh-papyrus rh-working-failed" : "rh-working rh-papyrus"} aria-live="polite">
      {rows.slice(0, Math.max(shown, 1)).map((row, i) => <div key={`${round}-${i}`} className="rh-work-row">{row || " "}</div>)}
    </div>}
  </div>;
}

/**
 * One page that can be edited and checked where it sits in a note. It uses
 * the same worker and WebAssembly program as /demos/rhind-papyrus, loaded
 * only when CHECK THE PAGE is pressed. With `steps`, a short guided sequence
 * sits above the page: each step puts its text in the editor and checks it.
 */
export function RhindRunner({ label, page, note, steps }: { label: string; page: string; note?: string; steps?: GuideStep[] }) {
  const [source, setSource] = useState(page);
  const [run, setRun] = useState<Checked | null>(null);
  const [runs, setRuns] = useState(0);
  const [failure, setFailure] = useState("");
  const [running, setRunning] = useState(false);
  const [step, setStep] = useState(-1);
  const [checkedText, setCheckedText] = useState<string | null>(null);

  const checkText = useCallback(async (text: string) => {
    setFailure(""); setRunning(true);
    try {
      setRun(await check(text)); setRuns(n => n + 1); setCheckedText(text);
    } catch (error) {
      setFailure(String((error as Error).message || error));
    } finally {
      setRunning(false);
    }
  }, []);
  const go = useCallback(() => checkText(source), [checkText, source]);
  const take = useCallback((index: number) => {
    const text = steps![index].text;
    setStep(index); setSource(text); checkText(text);
  }, [steps, checkText]);

  return <figure className="rh-runner">
    <figcaption className="record-voice">{label}</figcaption>
    {steps && <NoteGuide steps={steps} current={step} running={running} onStep={take}
      ran={step >= 0 && checkedText === steps[step].text && source === steps[step].text}/>}
    <RhindEditor label={`${label}: the page`} value={source} onChange={setSource} onRun={go}/>
    <div className="rh-runner-bar">
      <button type="button" onClick={go} disabled={running}>{run ? "CHECK IT AGAIN" : "CHECK THE PAGE"}</button>
      {source !== page && <button type="button" className="rh-runner-reset" onClick={() => { setSource(page); setRun(null); setStep(-1); setCheckedText(null); }}>RESET</button>}
      {run ? <span className="rh-runner-idle"><RhindCount run={run}/></span> : !running && <span className="rh-runner-idle">Runs in your browser.</span>}
    </div>
    {failure && <p className="rh-problems">{failure}</p>}
    {run && <RhindChecked key={runs} run={run} label={`${label}: checked`}/>}
    {note && <p className="rh-runner-note">{note}</p>}
  </figure>;
}
