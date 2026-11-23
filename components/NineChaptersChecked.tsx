"use client";

import { useEffect, useRef } from "react";
import type { Run } from "./nineChaptersJob";

/**
 * A page, worked and checked: each line with what jiuzhang made of it, ✓
 * where a figure the source states agrees with the board, ✗ and what the
 * board gives where it does not, and the 法, 實s and steps of a Solve. A
 * line that works the board can be chosen, to show the board after it.
 */
export function NineChaptersChecked({ run, label, now = -1, onChoose }: { run: Run; label: string; now?: number; onChoose?: (line: number) => void }) {
  const box = useRef<HTMLDivElement | null>(null);

  // Keep the current line in view, scrolling the page panel only, never the window.
  useEffect(() => {
    const panel = box.current;
    const row = panel?.children[now] as HTMLElement | undefined;
    if (!panel || !row) return;
    const top = row.offsetTop - panel.offsetTop;
    if (top < panel.scrollTop || top + row.offsetHeight > panel.scrollTop + panel.clientHeight) panel.scrollTop = top - panel.clientHeight / 3;
  }, [now, run]);

  return <div ref={box} className="nc-page" role="list" aria-label={label}>
    {run.lines.map((line, i) => {
      const marks = line.marks.map(m => (m.kind === "right" ? "✓" : m.kind === "wrong" ? `✗ ${m.text}` : m.text)).join("  ");
      const state = line.marks.some(m => m.kind === "wrong") ? "nc-wrong" : line.marks.some(m => m.kind === "right") ? "nc-right" : "";
      const classes = ["nc-line", `nc-${line.kind}`, state, i === now ? "nc-now" : "", run.stopped === i ? "nc-stopped" : ""].filter(Boolean).join(" ");
      const body = <><span className="nc-no">{i + 1}</span><span className="nc-txt">{line.text || " "}{marks && <span className="nc-mk">{marks}</span>}</span></>;
      return line.steps.length && onChoose
        ? <div key={i} role="listitem" className={classes}><button type="button" className="nc-line-button" aria-current={i === now ? "step" : undefined} onClick={() => onChoose(i)}>{body}</button></div>
        : <div key={i} role="listitem" className={classes}>{body}</div>;
    })}
  </div>;
}

/** The count under a page: figures checked, how many agree with the board, how many do not, and where it stops. */
export function NineChaptersCount({ run }: { run: Run }) {
  const checked = run.right + run.wrong;
  return <span className="nc-count"><b>{checked}</b> {checked === 1 ? "figure" : "figures"} checked · <b>{run.right}</b> agree · <b>{run.wrong}</b> do not{run.stopped != null && <> · stops at line <b>{run.stopped + 1}</b></>}</span>;
}
