"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { NineChaptersBoard } from "./NineChaptersBoard";
import { NineChaptersChecked, NineChaptersCount } from "./NineChaptersChecked";
import { NineChaptersEditor } from "./NineChaptersEditor";
import { check, firstStep, loadCorpus, stepsOf, widthsOf, type Page, type Run } from "./nineChaptersJob";

/**
 * Chapter 8 of the Nine Chapters, on a counting board in the page: every
 * page of the transcription, run by jiuzhang and stepped through on the
 * board, with what the text and its commentators state checked; the
 * page in an editor coloured and checked by jiuzhang's language server.
 * The same behaviour as the repository's web/index.html.
 *
 * The address can choose a page and a step: ?page=no-06, ?page=liu-hui-18-old&step=12.
 */

const label = (page: Page) => `${page.title}${page.words ? ` · ${page.words.length > 30 ? `${page.words.slice(0, 30)}…` : page.words}` : ""}`;

export function NineChaptersPlayground() {
  const [pages, setPages] = useState<Page[]>([]);
  const [current, setCurrent] = useState(-1);
  const [text, setText] = useState("");
  const [run, setRun] = useState<Run | null>(null);
  const [at, setAt] = useState(0);
  const [instant, setInstant] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [sweep, setSweep] = useState(0);
  const [failure, setFailure] = useState("");
  const edit = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const asked = useRef(0);
  const linked = useRef(false);
  const forwarding = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const steps = useMemo(() => (run ? stepsOf(run) : []), [run]);
  const widths = useMemo(() => widthsOf(steps.map(step => step.board)), [steps]);

  const go = useCallback((i: number, jump = false) => {
    setAt(Math.max(0, Math.min(steps.length - 1, i)));
    setInstant(jump);
  }, [steps.length]);

  const recheck = useCallback(async (source: string) => {
    const n = ++asked.current;
    try {
      const result = await check(source);
      if (n !== asked.current) return;
      const all = stepsOf(result);
      setRun(result); setFailure("");
      // start with the board as first set
      setAt(firstStep(all)); setInstant(true); setSweep(s => s + 1);
    } catch (error) {
      if (n === asked.current) setFailure(String((error as Error).message || error));
    }
  }, []);

  const choose = useCallback((list: Page[], i: number) => {
    if (!list.length) return;
    const k = (i + list.length) % list.length;
    clearTimeout(edit.current);
    clearTimeout(forwarding.current);
    setPlaying(false);
    setCurrent(k); setText(list[k].text);
    recheck(list[k].text);
    const url = new URL(window.location.href);
    url.searchParams.set("page", list[k].name);
    if (linked.current) url.searchParams.delete("step");
    window.history.replaceState(null, "", url);
  }, [recheck]);

  useEffect(() => {
    let cancelled = false;
    loadCorpus().then(list => {
      if (cancelled) return;
      setPages(list);
      const want = new URLSearchParams(window.location.search).get("page");
      const start = list.findIndex(page => page.name === want);
      choose(list, start >= 0 ? start : Math.max(0, list.findIndex(page => page.name === "no-01")));
    }).catch(() => setFailure("Could not load the pages of the chapter."));
    return () => { cancelled = true; clearTimeout(edit.current); };
  }, [choose]);

  // ?step=N plays forward to step N (from 1), so a link can open part-way through.
  useEffect(() => () => clearTimeout(forwarding.current), []);
  useEffect(() => {
    if (linked.current || !steps.length) return;
    linked.current = true;
    const want = Number(new URLSearchParams(window.location.search).get("step"));
    let k = firstStep(steps);
    if (!(want > k + 1)) return;
    const forward = () => { if (k + 1 < Math.min(want, steps.length)) { k++; setAt(k); setInstant(false); forwarding.current = setTimeout(forward, 500); } };
    forwarding.current = setTimeout(forward, 400);
  }, [steps]);

  // Play: a step every 1.1 seconds, to the end.
  useEffect(() => {
    if (!playing) return;
    const end = at >= steps.length - 1;
    const timer = setTimeout(() => {
      if (end) { setPlaying(false); return; }
      setAt(at + 1); setInstant(false);
    }, end ? 0 : 1100);
    return () => clearTimeout(timer);
  }, [playing, at, steps.length]);

  const play = useCallback(() => {
    if (playing) { setPlaying(false); return; }
    if (at >= steps.length - 1) go(0, true);
    setPlaying(true);
  }, [playing, at, steps.length, go]);

  useEffect(() => {
    const keys = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest?.(".cm-editor, textarea, select, input")) return;
      if (event.key === "ArrowRight") { setPlaying(false); go(at + 1); }
      else if (event.key === "ArrowLeft") { setPlaying(false); go(at - 1, true); }
      else if (event.key === " " && !target?.closest?.("button")) { event.preventDefault(); play(); }
      else if (event.key === "Home") { setPlaying(false); go(0, true); }
      else if (event.key === "End") { setPlaying(false); go(steps.length - 1, true); }
    };
    document.addEventListener("keydown", keys);
    return () => document.removeEventListener("keydown", keys);
  }, [at, go, play, steps.length]);

  const edited = useCallback((value: string) => {
    setText(value);
    setPlaying(false);
    clearTimeout(edit.current);
    edit.current = setTimeout(() => recheck(value), 250);
  }, [recheck]);

  const step = steps[at];
  const lit = step && step.actor != null;

  // What the source states right after this step, up to the next line that works the board.
  const caption = useMemo(() => {
    if (!run || !step) return null;
    const line = run.lines[step.line];
    const marks: { text: string; wrong: boolean }[] = [];
    const lastOfLine = !steps[at + 1] || steps[at + 1].line !== step.line;
    if (lastOfLine) {
      for (const m of line.marks) if (m.kind !== "info" || !/^法|steps$/.test(m.text)) marks.push({ text: m.text, wrong: m.kind === "wrong" });
      for (const l of run.lines.slice(step.line + 1)) {
        if (l.steps.length) break;
        if (l.kind !== "op" || !l.marks.length) continue;
        const m = l.marks[0];
        marks.push({ text: `${l.text.split('"')[0].trim()}  ${m.text}`, wrong: m.kind === "wrong" });
      }
    }
    return { line, marks };
  }, [run, step, steps, at]);

  const tally = useMemo(() => {
    let plain = 0, worked = 0, most = 0;
    for (let k = 0; k <= at && k < steps.length; k++) { plain += steps[k].count.plain; worked += steps[k].count.worked; }
    for (const s of steps) most = Math.max(most, s.board.rods);
    return { plain, worked, most, places: Math.max(0, ...widths) };
  }, [steps, at, widths]);

  const stop = () => setPlaying(false);

  return <section className="nc-lab" aria-label="The Nine Chapters, chapter 8, on a counting board">
    <div className="nc-controls">
      <p className="record-voice">01 / CHOOSE A PAGE OF CHAPTER 8, THEN STEP THROUGH IT ON THE BOARD</p>
      <div className="nc-bar">
        <label className="nc-pick">Page<select value={current} onChange={event => choose(pages, Number(event.target.value))} disabled={!pages.length}>
          {current < 0 && <option value={-1}>Loading the chapter…</option>}
          {pages.map((page, i) => <option key={page.name} value={i}>{label(page)}</option>)}
        </select></label>
        <div className="nc-steps" role="group" aria-label="Step through the page">
          <button type="button" title="The board as first set (Home)" aria-label="The board as first set" onClick={() => { stop(); go(0, true); }} disabled={!steps.length}>|◀</button>
          <button type="button" title="Back a step (←)" aria-label="Back a step" onClick={() => { stop(); go(at - 1, true); }} disabled={!steps.length}>◀</button>
          <button type="button" className="nc-play" title="Play (space)" aria-pressed={playing} onClick={play} disabled={!steps.length}>{playing ? "❚❚ PAUSE" : "▶ PLAY"}</button>
          <button type="button" title="Forward a step (→)" aria-label="Forward a step" onClick={() => { stop(); go(at + 1); }} disabled={!steps.length}>▶</button>
          <button type="button" title="The last step (End)" aria-label="The last step" onClick={() => { stop(); go(steps.length - 1, true); }} disabled={!steps.length}>▶|</button>
          <button type="button" title="Clear the rods off the floor" onClick={() => setSweep(s => s + 1)}>SWEEP</button>
        </div>
        <span className="record-voice nc-status" aria-live="polite">{run ? <NineChaptersCount run={run}/> : failure ? "" : "LOADING THE CHAPTER"}</span>
      </div>
    </div>
    <NineChaptersBoard board={step?.board ?? null} widths={widths} actor={lit ? step.actor : null} target={lit ? step.target : null} instant={instant} sweep={sweep} label="The counting board after this step">
      {step && <div className="nc-tally" aria-live="polite">算 so far: <b>{tally.plain}</b> plain · <b>{tally.worked}</b> worked<br/>rods on the board: <b>{step.board.rods}</b> (most {tally.most})<br/>widest figure on the recorded boards: <b>{tally.places}</b> places</div>}
      {step && caption && <div className="nc-caption">
        <span className="nc-what">{at + 1}/{steps.length}  {step.what}</span>
        {caption.line.quote && <span className="nc-zh">「{caption.line.quote}」</span>}
        {caption.marks.map((m, i) => <span key={i} className={m.wrong ? "nc-marks nc-marks-wrong" : "nc-marks"}>{m.text}</span>)}
      </div>}
    </NineChaptersBoard>
    <p className="nc-keys">Drag to turn the board. ← and → step, space plays. Red rods are 正, black 負; the units stand and the tens lie, as Sunzi says (一縱十橫). A rod taken off the board is knocked off the felt.</p>
    <div className="nc-panes">
      <div>
        <p className="record-voice">02 / THE PAGE, CHECKED <span className="nc-hint">/ CHOOSE A LINE TO SEE THE BOARD AFTER IT</span></p>
        {failure && <p className="nc-problems">{failure}</p>}
        {run ? <NineChaptersChecked run={run} label="The page, checked" now={step?.line ?? -1} onChoose={line => { stop(); const i = steps.findIndex(s => s.line === line); if (i >= 0) go(i); }}/> : !failure && <p className="nc-idle">Reading the page…</p>}
      </div>
      <div>
        <p className="record-voice">03 / THE TRANSCRIPTION <span className="nc-hint">/ EDIT IT: IT RUNS AS YOU TYPE</span></p>
        <NineChaptersEditor className="nc-program" label="The page in jiuzhang’s notation" value={text} onChange={edited} onRun={() => recheck(text)}/>
        <p className="nc-keys"><code>Set right 3 2 1 39</code> sets a column, top to bottom, the 實 last; columns are set from the right. <code>Multiply middle by the head of right</code> is 徧乘, <code>Take right from middle until the head is gone</code> is 直除, <code>Solve</code> the rest of the procedure. <code>Answer</code>, <code>Gives</code>, <code>Rates</code> and <code>Count</code> are what the source states, and are checked. <code>&quot;…&quot;</code> is the source’s words, <code>%</code> a note, and <code>|</code> separates readings of a clause.</p>
      </div>
    </div>
  </section>;
}
