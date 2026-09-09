import type { Act } from "@/lib/types";
import { FieldNotes } from "@chrishayuk/hause/components/FieldNotes";
import { Comparison } from "@chrishayuk/hause/components/forms/Comparison";
import { Acts } from "./Acts";

/** Only record addressing lives here. The disclosure and comparison are HAUSE. */
export function StudyNotes({ acts, start, end = start + 1, label = "FIELD NOTES" }: { acts: Act[]; start: number; end?: number; label?: string }) {
  return <FieldNotes label={label}><Acts acts={acts.slice(start, end)} anchored offset={start} staticRefusals /></FieldNotes>;
}
export function StudyComparison({ act, index }: { act: Act; index: number }) {
  if (act.kind !== "comparison") throw new Error("Expected a comparison");
  const panel = (side: typeof act.left) => <ol className="notebook-reading-list">{side.properties.map((text, i) => <li key={i}><span className="record-voice">0{i + 1}</span><p>{text}</p></li>)}</ol>;
  return <section id={`act-${index + 1}`} className="notebook-authored-comparison"><Comparison {...act} kicker="ONE DISTINCTION / TWO READINGS" panels={{ left: panel(act.left), right: panel(act.right) }} /></section>;
}
