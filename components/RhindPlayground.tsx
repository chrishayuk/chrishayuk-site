"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { RhindEditor } from "./RhindEditor";
import { RhindChecked, RhindCount } from "./RhindChecked";
import { RhindWork } from "./RhindRunner";
import { check, loadExamples, loadPapyrus, type Checked, type Example, type Page } from "./rhindJob";

/**
 * The Rhind Mathematical Papyrus, run, in the page: every page as
 * transcribed, checked by rhind, with the scribe's wrong figures marked and
 * the slips that would make them; the transcription in an editor coloured and
 * checked by rhind's language server; and a box that works a multiplication
 * or division the scribe's way.
 *
 * The address can choose a page: ?page=27, ?page=7B or ?page=table-2n-b.
 */

const OWN = "% your own page\nNo. 1\n\"A quantity whose seventh part is added to it becomes 19.\"\nReckon with 8 to find 19.\nResult 2 '4 '8.\nMultiply 2 '4 '8 by 7.\n";

type Choice = { key: string; label: string; text: string; about: string };

const pageChoice = (page: Page): Choice => ({ key: page.name, label: `${page.label}${page.words ? ` · ${page.words.length > 48 ? `${page.words.slice(0, 48)}…` : page.words}` : ""}`, text: page.text, about: page.about });
const exampleChoice = (example: Example): Choice => ({ key: `example:${example.name}`, label: example.name, text: example.text, about: example.about });

export function RhindPlayground() {
  const [pages, setPages] = useState<Choice[]>([]);
  const [examples, setExamples] = useState<Choice[]>([]);
  const [selected, setSelected] = useState("");
  const [about, setAbout] = useState("");
  const [text, setText] = useState("");
  const [run, setRun] = useState<Checked | null>(null);
  const [runs, setRuns] = useState(0);
  const [failure, setFailure] = useState("");
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const asked = useRef(0);

  const recheck = useCallback(async (source: string) => {
    const n = ++asked.current;
    try {
      const result = await check(source);
      if (n !== asked.current) return;
      setRun(result); setRuns(count => count + 1); setFailure("");
    } catch (error) {
      if (n === asked.current) setFailure(String((error as Error).message || error));
    }
  }, []);

  const choose = useCallback((choice: Choice) => {
    clearTimeout(timer.current);
    setSelected(choice.key); setText(choice.text); setAbout(choice.about);
    recheck(choice.text);
    if (!choice.key.startsWith("example:") && choice.key !== "own") {
      const url = new URL(window.location.href);
      url.searchParams.set("page", choice.key.replace(/^no-0?/, ""));
      window.history.replaceState(null, "", url);
    }
  }, [recheck]);

  useEffect(() => {
    let cancelled = false;
    Promise.all([loadPapyrus(), loadExamples().catch(() => [] as Example[])]).then(([papyrus, extra]) => {
      if (cancelled) return;
      const list = papyrus.map(pageChoice);
      setPages(list);
      setExamples(extra.map(exampleChoice));
      const want = new URLSearchParams(window.location.search).get("page")?.toLowerCase();
      const start = (want && list.find(page => page.key === want || page.key === `no-${want.padStart(2, "0")}`)) || list.find(page => page.key === "no-27") || list[0];
      if (start) choose(start);
    }).catch(() => setFailure("Could not load the pages of the papyrus."));
    return () => { cancelled = true; clearTimeout(timer.current); };
  }, [choose]);

  const edited = useCallback((value: string) => {
    setText(value);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => recheck(value), 200);
  }, [recheck]);

  const index = pages.findIndex(page => page.key === selected);
  const step = (by: number) => { if (pages.length) choose(pages[((index < 0 ? 0 : index) + by + pages.length) % pages.length]); };
  const all = [...pages, ...examples];

  return <section className="rh-lab" aria-label="The Rhind Mathematical Papyrus, run">
    <div className="rh-controls">
      <p className="record-voice">01 / CHOOSE A PAGE OF THE PAPYRUS, OR WRITE YOUR OWN</p>
      <div className="rh-bar">
        <button type="button" onClick={() => step(-1)} disabled={!pages.length} aria-label="The previous page">‹</button>
        <label className="rh-pick">Page<select value={selected} onChange={event => { const choice = all.find(c => c.key === event.target.value); if (choice) choose(choice); }}>
          {selected === "own" && <option value="own">Your own page</option>}
          <optgroup label="The papyrus">{pages.map(page => <option key={page.key} value={page.key}>{page.label}</option>)}</optgroup>
          {examples.length > 0 && <optgroup label="Examples">{examples.map(example => <option key={example.key} value={example.key}>{example.label}</option>)}</optgroup>}
        </select></label>
        <button type="button" onClick={() => step(1)} disabled={!pages.length} aria-label="The next page">›</button>
        <button type="button" onClick={() => choose({ key: "own", label: "Your own page", text: OWN, about: "Your own page. Change it and it is checked again; a Multiply or Reckon with no working under it is worked by rhind." })}>WRITE YOUR OWN</button>
        <span className="record-voice rh-status" aria-live="polite">{run ? <RhindCount run={run}/> : failure ? "" : "LOADING THE PAPYRUS"}</span>
      </div>
      {about && <p className="rh-about">{about}</p>}
    </div>
    <div className="rh-panes">
      <div>
        <p className="record-voice">02 / THE PAGE, CHECKED <span className="rh-hint">/ CHOOSE A LINE MARKED ✗</span></p>
        {failure && <p className="rh-problems">{failure}</p>}
        {run ? <RhindChecked key={runs} run={run} label="The page, checked"/> : !failure && <p className="rh-idle">Reading the page…</p>}
      </div>
      <div>
        <p className="record-voice">03 / THE TRANSCRIPTION <span className="rh-hint">/ HOVER OVER ANY FIGURE</span></p>
        <RhindEditor className="rh-program" label="The page in rhind’s notation" value={text} onChange={edited} onRun={() => recheck(text)}/>
        <p className="rh-keys">Edit it and the page is checked again. <code>&apos;5</code> is one fifth, written 5̅; <code>2/3</code> is two-thirds; <code>\</code> is the scribe’s tick; <code>{"{…}"}</code> is red ink, <code>[…]</code> restored, <code>%</code> a note. A <code>Multiply</code> or <code>Reckon</code> with no working under it is worked by rhind.</p>
      </div>
    </div>
    <RhindWork/>
  </section>;
}
