"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * A sitting at a JOSS console: the paper, and the line being typed on it.
 *
 * The interpreter is the Rust program from github.com/chrishayuk/joss,
 * compiled unchanged for WASI. The files in public/demos/joss/ (joss.wasm,
 * wasi.js, session.js, worker.js, examples.json, transcripts.json, and the
 * language server beside them) are copied from that repository's web/ folder:
 * rebuild them there with `node web/build.mjs` and copy them across, rather
 * than editing them here.
 *
 * JOSS is a conversation, and the interpreter cannot be paused in a page
 * while it waits for the next line. So each time a line is typed, the whole
 * sitting is replayed from its first line (session.js). JOSS has no clock in
 * it and no chance, so each replay types the same page and then one line more.
 * Every replay happens in a worker, so a sitting that never ends can be
 * stopped by terminating it.
 */

export type PageLine = { who: "user" | "joss" | "key" | "page"; text: string; asked?: string };
export type Sitting = { page: PageLine[]; waiting: "instruction" | "form" | "value"; suspended: boolean; line: number };
export type Year = "1965" | "1964";

const FILES = "/demos/joss";
const EMPTY: Sitting = { page: [], waiting: "instruction", suspended: false, line: 1 };
/** Steps JOSS may do in answer to one line before the page presses INTERRUPT for the reader. */
const PATIENCE = 200_000;

type Reply = { id: number; result?: Sitting | string; error?: string };

/** The lines typed so far, and the page JOSS has made of them. */
export function useSitting(year: Year) {
  const [lines, setLines] = useState<string[]>([]);
  const [sitting, setSitting] = useState<Sitting>(EMPTY);
  const [busy, setBusy] = useState(false);
  const [failure, setFailure] = useState("");
  const worker = useRef<Worker | null>(null);
  const serial = useRef(0);
  const typed = useRef<string[]>([]);

  const ask = useCallback((message: object) => new Promise<Sitting | string>((resolve, reject) => {
    if (!worker.current) worker.current = new Worker(`${FILES}/worker.js`, { type: "module" });
    const id = ++serial.current;
    const hear = (event: MessageEvent<Reply>) => {
      if (event.data.id !== id) return;
      worker.current?.removeEventListener("message", hear);
      if (event.data.error !== undefined || event.data.result === undefined) reject(new Error(event.data.error || "no answer"));
      else resolve(event.data.result);
    };
    worker.current.addEventListener("message", hear);
    worker.current.onerror = event => reject(new Error(event.message));
    worker.current.postMessage({ id, wasmUrl: new URL(`${FILES}/joss.wasm`, window.location.href).href, ...message });
  }), []);

  const replay = useCallback(async (next: string[], at: Year) => {
    typed.current = next;
    setLines(next);
    setBusy(true);
    setFailure("");
    try {
      const result = await ask({ sitting: { lines: next, year: at, patience: PATIENCE } });
      if (typed.current === next) setSitting(result as Sitting);
    } catch (error) {
      if (typed.current === next) setFailure(String((error as Error).message || error));
    } finally {
      if (typed.current === next) setBusy(false);
    }
  }, [ask]);

  useEffect(() => () => worker.current?.terminate(), []);

  return {
    lines, sitting, busy, failure,
    /** Types lines, one after another, after what has been typed already. */
    type: useCallback((more: string[]) => replay([...typed.current, ...more.map(line => line.replace(/[\r\n]+/g, " "))], year), [replay, year]),
    /** A fresh sheet, and optionally the first lines on it. */
    begin: useCallback((first: string[] = [], at: Year = year) => {
      if (first.length) return replay(first.map(line => line.replace(/[\r\n]+/g, " ")), at);
      typed.current = [];
      setLines([]);
      setSitting(EMPTY);
      setFailure("");
      setBusy(false);
      return Promise.resolve();
    }, [replay, year]),
    /** Presses INTERRUPT in the answer to the last line typed, once JOSS has typed `after` lines of it. */
    interrupt: useCallback((after: number) => {
      const next = typed.current.slice();
      let at = next.length - 1;
      while (at > 0 && next[at].startsWith("!")) at--;
      next.splice(Math.max(at, 0), 0, `! interrupt after ${after} lines`);
      return replay(next, year);
    }, [replay, year]),
    /** Stops a replay that is taking too long, and keeps the page as it was. */
    abandon: useCallback(() => { worker.current?.terminate(); worker.current = null; typed.current = typed.current.slice(0, -1); setLines(typed.current); setBusy(false); setFailure("STOPPED: THAT LINE WAS TAKEN BACK"); }, []),
    /** Replays a transcript of an original session and returns the interpreter's report on it. */
    verify: useCallback((transcript: string) => ask({ verify: transcript }) as Promise<string>, [ask]),
  };
}

const KEYS = ["·", "≠", "≤", "≥"];

/**
 * The paper. JOSS's lines are in black and the user's in green, as the two
 * ribbons of the console typed them. The last line is the one being typed.
 */
export function JossPaper({ console: desk, label, tall = false, slowByDefault = false }: {
  console: ReturnType<typeof useSitting>; label: string; tall?: boolean; slowByDefault?: boolean;
}) {
  const { sitting, busy, failure } = desk;
  const [draft, setDraft] = useState("");
  const [slow, setSlow] = useState(slowByDefault);
  // At typewriter speed: how many lines of the page are on the paper so far.
  const [typedTo, setTypedTo] = useState(0);
  const sheet = useRef<HTMLDivElement | null>(null);
  const entry = useRef<HTMLInputElement | null>(null);

  const page = sitting.page;
  // The line JOSS is waiting on is the entry line, not part of the paper yet.
  const end = sitting.waiting === "value" && page[page.length - 1]?.who === "joss" ? page.length - 1 : page.length;
  const shown = slow ? Math.min(typedTo, end) : end;
  const typing = shown < end;

  useEffect(() => {
    if (!slow || typedTo === end) return;
    // A fresh sheet starts again from the top. The user's own lines appear at once.
    const next = typedTo > end ? undefined : page[typedTo];
    const timer = setTimeout(() => setTypedTo(next ? typedTo + 1 : end), next?.who === "joss" ? 70 + next.text.length * 10 : 0);
    return () => clearTimeout(timer);
  }, [end, page, slow, typedTo]);

  useEffect(() => { if (sheet.current) sheet.current.scrollTop = sheet.current.scrollHeight; }, [shown, busy]);

  const mine = !busy && !typing;
  const asked = mine && sitting.waiting === "value" ? page[page.length - 1]?.asked ?? "" : "";
  const state = failure ? failure
    : !mine ? "JOSS HAS THE TYPEWRITER"
    : sitting.waiting === "form" ? "YOUR TURN / TYPE THE FORM"
    : sitting.waiting === "value" ? "YOUR TURN / JOSS WANTS A VALUE"
    : sitting.suspended ? "YOUR TURN / A TASK IS WAITING FOR Go." : "YOUR TURN";

  const send = (line: string) => { setDraft(""); void desk.type([line]); };
  const key = (character: string) => {
    const input = entry.current;
    const at = input?.selectionStart ?? draft.length;
    setDraft(draft.slice(0, at) + character + draft.slice(input?.selectionEnd ?? at));
    requestAnimationFrame(() => { input?.focus(); input?.setSelectionRange(at + 1, at + 1); });
  };
  // JOSS finishes the line it is on and stops: count its lines of this answer already on the paper.
  const interrupt = () => {
    let answered = 0;
    for (let at = shown - 1; at >= 0 && page[at].who === "joss"; at--) answered++;
    // What it had typed of this answer is typed again, cut short, all at once.
    setTypedTo(page.length + 1);
    void desk.interrupt(answered);
  };

  return <div className="joss-console">
    <p className="record-voice joss-state" aria-live="polite"><span className={mine ? "joss-lamp joss-lamp-green" : "joss-lamp"} aria-hidden="true"/>{state}</p>
    <div ref={sheet} className={tall ? "joss-paper joss-paper-tall" : "joss-paper"} role="log" aria-label={label} onClick={() => entry.current?.focus()}>
      {page.slice(0, shown).map((line, index) =>
        line.who === "page" ? <div key={index} className="joss-sheet">NEW PAGE</div>
        : line.who === "key" ? <div key={index} className="joss-key-line">[THE INTERRUPT KEY]</div>
        : <div key={index} className="joss-line">{line.asked !== undefined && <span className="joss-black">{line.asked}</span>}<span className={line.who === "joss" ? "joss-black" : "joss-green"}>{line.text || " "}</span></div>)}
      <div className="joss-line joss-entry">
        <span className="joss-black">{asked}</span>
        <input ref={entry} value={draft} disabled={!mine} spellCheck={false} autoCapitalize="off" autoComplete="off" autoCorrect="off"
          aria-label={sitting.waiting === "value" ? "Type a value for JOSS" : sitting.waiting === "form" ? "Type the form" : "Type a line for JOSS"}
          onChange={event => setDraft(event.target.value)}
          onKeyDown={event => { if (event.key === "Enter") { event.preventDefault(); send(draft); } }}/>
      </div>
    </div>
    <div className="joss-keys">
      {KEYS.map(character => <button key={character} type="button" className="joss-key" onClick={() => key(character)} aria-label={`Type ${character}`}>{character}</button>)}
      <button type="button" onClick={() => send("Go.")} disabled={!mine}>Go.</button>
      <button type="button" onClick={typing ? interrupt : desk.abandon} disabled={!typing && !busy}>{busy && !typing ? "STOP" : "INTERRUPT"}</button>
      <label className="joss-speed"><input type="checkbox" checked={slow} onChange={event => { setTypedTo(end); setSlow(event.target.checked); }}/> AT TYPEWRITER SPEED</label>
    </div>
  </div>;
}
