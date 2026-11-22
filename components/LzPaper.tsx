"use client";

import { useEffect, useState } from "react";

/**
 * The page the delayed printer typed. It is typed out a character at a time:
 * at ten characters a second, the Flexowriter's speed, or faster. An alarm
 * is the post-mortem the manual describes, with the reason in words beside
 * it (the reason is this reconstruction's: Whirlwind typed only the numbers).
 */
export type Speed = "flexowriter" | "fast" | "instant";
const RATE: Record<Speed, number> = { flexowriter: 10, fast: 600, instant: Infinity };

export function LzPaper({ page, alarm, speed = "fast", label, highlight = [] }: { page: string; alarm?: string | null; speed?: Speed; label: string; highlight?: number[] }) {
  // A new page is a new paper: the parent gives each page its own key.
  const [typed, setTyped] = useState(0);
  const [finished, setFinished] = useState(false);
  useEffect(() => {
    if (speed === "instant") return;
    const started = performance.now();
    let frame = 0;
    const tick = () => {
      const n = Math.min(page.length, Math.floor((performance.now() - started) / 1000 * RATE[speed]));
      setTyped(n);
      if (n < page.length) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [page, speed]);
  const shown = speed === "instant" || finished ? page.length : typed;
  const done = shown >= page.length;
  const lines = page.slice(0, shown).split("\n");
  return <div className="lz-paper" aria-label={label}>
    <pre aria-live="off">{lines.map((line, index) => <span key={index} className={[/^ALARM/.test(line) ? "lz-alarm" : "", highlight.includes(index) ? "lz-differs" : ""].join(" ").trim() || undefined}>{line}{index < lines.length - 1 ? "\n" : ""}</span>)}{!done && <span className="lz-carriage" aria-hidden>▌</span>}</pre>
    {!done && <button type="button" className="lz-finish" onClick={() => setFinished(true)}>FINISH TYPING</button>}
    {done && alarm && <p className="lz-margin record-voice">POST-MORTEM / {alarm}. If equation 100 is a PRINT, it is carried out after an alarm.</p>}
    {done && page.trim() === "" && !alarm && <p className="lz-margin record-voice">THE PRINTER TYPED NOTHING.</p>}
  </div>;
}
