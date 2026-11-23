"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { CELLS, changedFrom, isNumeral, type Report, type Step } from "./georgeJob";
import { hoverAt, renderHover, type Range, type WrittenSymbol } from "./GeorgeEditor";

/**
 * The running accumulator, a symbol at a time: the twelve cells after each
 * step of `george run --trace`, with the symbol obeyed, where it is written,
 * what it punched, and the language server's words about it.
 *
 * A cell filled by the step is marked; a cell it emptied is shown struck out.
 */

const SPEEDS = [{ label: "slow", ms: 700 }, { label: "steady", ms: 280 }, { label: "fast", ms: 70 }];
const TABLE_ROWS = 3000;

export function GeorgeTrace({ steps, symbols, punches, said, program, onHighlight, compact = false }: {
  steps: Step[]; symbols: WrittenSymbol[]; punches: string[][]; said: Report; program: string;
  onHighlight?: (range: Range | null) => void; compact?: boolean;
}) {
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(SPEEDS[1].ms);
  const [help, setHelp] = useState<{ at: number; text: string } | null>(null);
  const hovers = useRef(new Map<number, string>());
  const table = useRef<HTMLDivElement | null>(null);
  const last = steps.length - 1;
  const k = Math.max(0, Math.min(step, last));
  const now = steps[k];
  const before = k > 0 ? steps[k - 1].cells : [];
  const after = now?.cells ?? [];
  const from = changedFrom(before, after);
  const written = now ? symbols[now.at] : undefined;
  const at = useRef(k);
  useEffect(() => { at.current = k; }, [k]);

  const shown = useCallback((s: Step) => {
    const sym = symbols[s.at];
    return isNumeral(s) || !sym ? s.symbol : sym.text;
  }, [symbols]);

  const range = useMemo((): Range | null => {
    if (!now || !written) return null;
    const end = isNumeral(now) ? symbols[now.at + now.symbol.length - 1] ?? written : written;
    return { start: written.range.start, end: end.range.end };
  }, [now, written, symbols]);

  useEffect(() => { onHighlight?.(range); }, [range, onHighlight]);
  useEffect(() => () => onHighlight?.(null), [onHighlight]);

  // Playing: one step per tick, stopping at the end.
  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => {
      if (at.current >= last) setPlaying(false);
      else setStep(at.current + 1);
    }, speed);
    return () => window.clearInterval(timer);
  }, [playing, speed, last]);

  // The language server's words about the symbol: what it is and what it does to the cells.
  useEffect(() => {
    if (!now || !written) return;
    const at = now.at;
    const known = hovers.current.get(at);
    if (known !== undefined) { setHelp({ at, text: known }); return; }
    let cancelled = false;
    hoverAt(program, written.range.start).then(text => {
      const brief = text.split("\n\n").filter(p => !p.startsWith(">")).slice(0, 3).join("\n\n");
      hovers.current.set(at, brief);
      if (!cancelled) setHelp({ at, text: brief });
    });
    return () => { cancelled = true; };
  }, [now, written, program]);
  const helpBox = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const box = helpBox.current;
    if (!box) return;
    box.replaceChildren();
    if (help && now && help.at === now.at && help.text) box.appendChild(renderHover(help.text));
  }, [help, now]);

  // Keep the row of the current step in view in the table.
  useEffect(() => {
    const box = table.current;
    const row = box?.querySelector<HTMLTableRowElement>(`tr[data-step="${k}"]`);
    if (!box || !row) return;
    if (row.offsetTop < box.scrollTop + 24 || row.offsetTop > box.scrollTop + box.clientHeight - 24) box.scrollTop = row.offsetTop - box.clientHeight / 2;
  }, [k]);

  const go = (to: number) => { setPlaying(false); setStep(Math.max(0, Math.min(to, last))); };
  const keys = (event: KeyboardEvent) => {
    if ((event.target as HTMLElement).closest("select, input")) return;
    const moves: Record<string, () => void> = { ArrowLeft: () => go(k - 1), ArrowRight: () => go(k + 1), Home: () => go(0), End: () => go(last) };
    if (moves[event.key]) { moves[event.key](); event.preventDefault(); }
  };

  if (!steps.length) return <p className="george-trace-empty">No symbol was obeyed.</p>;
  const ending = said.stop ? `stop ${said.stop.indication}: ${said.stop.cause}` : said.limit ? `gave up after ${said.limit.toLocaleString()} symbols` : null;

  return <section className={compact ? "george-trace george-trace-compact" : "george-trace"} aria-label="The running accumulator, symbol by symbol" tabIndex={0} onKeyDown={keys} data-george-trace>
    <div className="george-machine">
      <div className="george-acc" role="img" aria-label={`The running accumulator after step ${k + 1}: ${after.length ? after.join(", ") : "empty"}`}>
        {Array.from({ length: CELLS }, (_, n) => CELLS - 1 - n).map(i => {
          const full = i < after.length, gone = !full && i < before.length;
          const classes = ["george-cell", full ? "full" : "", full && i >= from ? "new" : "", gone ? "gone" : "", full && i === after.length - 1 ? "top" : ""].filter(Boolean).join(" ");
          return <div key={i} className={classes}><span className="george-cell-n">{i + 1}</span><span className="george-cell-v">{full ? after[i] : gone ? before[i] : ""}</span></div>;
        })}
        <p className="george-acc-caption record-voice">{after.length} OF {CELLS} CELLS OCCUPIED</p>
      </div>
      <div className="george-steps-side">
        <div className="george-trace-controls">
          <button type="button" onClick={() => go(0)} aria-label="First step">⏮</button>
          <button type="button" onClick={() => go(k - 1)} aria-label="Previous step">◀</button>
          <button type="button" className="george-play" onClick={() => { if (k >= last) setStep(0); setPlaying(p => !p); }}>{playing ? "PAUSE" : "PLAY"}</button>
          <button type="button" onClick={() => go(k + 1)} aria-label="Next step">▶</button>
          <button type="button" onClick={() => go(last)} aria-label="Last step">⏭</button>
          <select aria-label="Speed" value={speed} onChange={event => setSpeed(Number(event.target.value))}>{SPEEDS.map(s => <option key={s.ms} value={s.ms}>{s.label}</option>)}</select>
          <input type="range" min={0} max={Math.max(last, 0)} value={k} aria-label="Step" onChange={event => go(Number(event.target.value))}/>
        </div>
        <div className="george-now" aria-live="polite">
          <p><span className="george-now-symbol">{shown(now)}</span><span className="george-now-where">STEP {k + 1} OF {steps.length.toLocaleString()} · SYMBOL {now.at}{written ? ` · CODE ${written.code} · LINE ${written.range.start.line + 1}` : ""}</span>{punches[k]?.length > 0 && <span className="george-now-punch">PUNCHED {punches[k].join(", ")}</span>}</p>
          <div ref={helpBox}/>
          {k === last && ending && <p className="george-error">{ending}</p>}
        </div>
        {!compact && <div className="george-step-table" ref={table}>
          <table>
            <thead><tr><th>Step</th><th>Symbol</th><th>Accumulator, cell 1 first</th><th>Punched</th></tr></thead>
            <tbody>
              {steps.slice(0, TABLE_ROWS).map((s, n) => {
                const changed = changedFrom(n > 0 ? steps[n - 1].cells : [], s.cells);
                return <tr key={n} data-step={n} className={n === k ? "on" : undefined} onClick={() => go(n)}>
                  <td>{n + 1}</td>
                  <td>{shown(s)}</td>
                  <td className="george-mini">{s.cells.map((v, i) => <span key={i} className={i >= changed ? "new" : undefined}>{v}</span>)}</td>
                  <td className="george-punched">{punches[n]?.length ? <span>{punches[n].join(", ")}</span> : null}</td>
                </tr>;
              })}
              {ending && <tr className="george-end"><td/><td colSpan={3}>{ending}</td></tr>}
            </tbody>
          </table>
          {steps.length > TABLE_ROWS && <p className="george-trace-note">The table shows the first {TABLE_ROWS.toLocaleString()} steps; the slider reaches all of them.</p>}
        </div>}
      </div>
    </div>
  </section>;
}
