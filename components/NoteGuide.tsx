"use client";

/**
 * A short sequence of edits to a page, each a button that puts the page's
 * text in the runner beside it and runs it, with one sentence on what to
 * notice in what comes back. Shared by the working notes that run a text
 * (the Rhind papyrus, the Nine Chapters). It only lays out the steps: the
 * runner that owns it sets the text, runs the real program and shows its
 * output, so nothing a step shows is written here.
 */

export type GuideStep = {
  /** The button, e.g. "RUN IT AS PRINTED". */
  label: string;
  /** What the step does to the page, in a few words. */
  action: string;
  /** One sentence on what to notice once it has run. */
  notice: string;
  /** The whole page as this step sets it. */
  text: string;
};

export function NoteGuide({ steps, current, ran, running, onStep }: {
  steps: GuideStep[];
  /** The step whose text is in the runner, or -1. */
  current: number;
  /** Whether the current step's text has been run and its output is shown. */
  ran: boolean;
  running: boolean;
  onStep: (index: number) => void;
}) {
  const step = steps[current];
  return <div className="ng-guide">
    <p className="ng-guide-title record-voice">TRY IT: {steps.length} STEPS, EACH RUN BY THE PROGRAM BELOW</p>
    <ol className="ng-steps">
      {steps.map((s, i) => <li key={i} className={i === current ? "ng-step ng-current" : "ng-step"}>
        <button type="button" onClick={() => onStep(i)} disabled={running} aria-pressed={i === current}>
          <span className="ng-step-no">{i + 1}</span>
          <span className="ng-step-text"><b>{s.label}</b><span>{s.action}</span></span>
        </button>
      </li>)}
    </ol>
    <p className="ng-notice" aria-live="polite">
      {step
        ? running ? <>Running step {current + 1}…</> : ran ? <><b>Notice:</b> {step.notice}</> : <>Step {current + 1} is in the page. Run it to see what comes back.</>
        : <>Each step changes the page below and runs it in your browser; what you see is the program’s own output.</>}
    </p>
  </div>;
}
