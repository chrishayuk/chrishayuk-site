"use client";

import { Fragment, useState, type ReactNode } from "react";
import type { Checked, Finding } from "./rhindJob";

/** `{…}` inside a line is red ink: drawn in red, without the braces. */
function ink(text: string): ReactNode[] {
  return (text || " ").split(/(\{[^}]*\})/).map((piece, i) =>
    piece.startsWith("{") && piece.endsWith("}") ? <span key={i} className="rh-red-ink">{piece.slice(1, -1)}</span> : piece);
}

/** What rhind says about a wrong figure: the message, whether it was carried, the slips that fit. */
export function RhindFinding({ found, note }: { found: Finding[]; note?: string }) {
  return <div className="rh-detail" aria-live="polite">
    {found.map((f, i) => <Fragment key={i}>
      <p className="rh-detail-message">{f.message}</p>
      {f.carried != null && <p>{f.carried ? "The error is carried into what follows." : "What follows is right: the error is not carried. The scribe worked from the right figure and wrote another."}</p>}
      {f.slips.length
        ? <><p>A slip that would make it:</p><ul>{f.slips.map((s, j) => <li key={j}><b>{s.model}</b>: {s.explanation}</li>)}</ul></>
        : <p>No single slip of the kinds modelled turns the right figure into this one.</p>}
    </Fragment>)}
    {note && <p className="rh-detail-note">Transcriber’s note: {note}</p>}
  </div>;
}

/**
 * A page of the papyrus, checked: each figure the scribe wrote with ✓ or ✗
 * in the margin, and red ink in red. A wrong line can be chosen, and what
 * rhind found there is shown under the page. Rows rhind worked itself, for
 * a Multiply or Reckon with no working under it, are set in italic.
 */
export function RhindChecked({ run, label, first = true }: { run: Checked; label: string; first?: boolean }) {
  const findings = new Map<number, Finding[]>();
  for (const f of run.findings) if (f.severity === "wrong") findings.set(f.line, [...(findings.get(f.line) || []), f]);
  const firstWrong = run.lines.findIndex((_, i) => findings.has(i));
  const [chosen, setChosen] = useState<number>(first ? firstWrong : -1);
  const selected = findings.has(chosen) ? chosen : -1;

  return <div className="rh-checked">
    <div className="rh-papyrus" role="list" aria-label={label}>
      {run.lines.map((line, i) => {
        const written = run.written.filter(w => w.after === i).flatMap(w => w.rows);
        const wrong = findings.get(i);
        const kind = line.kind.split(" ")[0];
        const classes = ["rh-line", `rh-${kind}`, line.mark ? `rh-${line.mark}` : "", line.red ? "rh-red" : "", wrong ? "rh-wrong-line" : "", selected === i ? "rh-selected" : ""].filter(Boolean).join(" ");
        const mark = line.mark === "right" ? "✓" : line.mark === "wrong" ? `✗ ${line.expected}` : line.mark === "unchecked" ? "?" : "";
        const text = kind === "blank" && line.note ? <span className="rh-note">% {line.note}</span> : ink(line.text);
        const choose = () => setChosen(i);
        return <Fragment key={i}>
          {wrong
            ? <div role="listitem" className={classes} title={line.how || undefined}>
                <button type="button" className="rh-line-button" aria-pressed={selected === i} onClick={choose}>
                  <span className="rh-no">{i + 1}</span><span className="rh-txt">{text}</span><span className="rh-mark">{mark}</span>
                </button>
              </div>
            : <div role="listitem" className={classes} title={line.how || undefined}>
                <span className="rh-no">{i + 1}</span><span className="rh-txt">{text}</span><span className="rh-mark">{mark}</span>
              </div>}
          {written.map((row, j) => <div key={`w${j}`} role="listitem" className="rh-line rh-written"><span className="rh-no"/><span className="rh-txt">{row}</span><span className="rh-mark">· rhind</span></div>)}
        </Fragment>;
      })}
    </div>
    {selected >= 0 && <RhindFinding found={findings.get(selected)!} note={run.lines[selected].note}/>}
  </div>;
}

/** The count under a page: figures checked, right, wrong. */
export function RhindCount({ run }: { run: Checked }) {
  const wrong = run.checked - run.right;
  return <span className="rh-count"><b>{run.checked}</b> {run.checked === 1 ? "figure" : "figures"} checked · <b>{run.right}</b> right · <b>{wrong}</b> wrong</span>;
}
