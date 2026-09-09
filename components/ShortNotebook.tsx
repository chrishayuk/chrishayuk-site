import type { Act } from "@/lib/types";
import { Statement } from "@chrishayuk/hause/components/forms/Statement";
import { StudySequence } from "@chrishayuk/hause/components/exhibition/Study";
import { Acts } from "./Acts";

/** Small notes get a single considered distinction, not a miniature long essay. */
export function ShortNotebook({ id, acts }: { id: string; acts: Act[] }) {
  if (acts[0]?.kind !== "statement") throw new Error("Expected the short note's proposition");
  const context = id === "N-CONTEXT";
  return <div className="short-notebook">
    <section id="act-1" className="notebook-threshold"><p className="record-voice">A WORKING PROPOSITION / NOT AN EXPERIMENTAL RESULT</p><Statement text={context ? acts[0].text : "The operator knows where the model goes."} continuation={context ? undefined : "It doesn’t know what the model does."} presentation="room" /></section>
    <StudySequence label={context ? "THE PROPOSED DISTINCTION" : "TWO DIFFERENT CAPABILITIES"} steps={context ? [{label:"RECONSTRUCT",value:"Do the work again",detail:"Recover the earlier state through computation."},{label:"RETURN",value:"Find retained state",detail:"Pay for storage, indexing and retrieval instead."}] : [{label:"FOLLOW",value:"Where it goes",detail:"Predict a trajectory through the state space."},{label:"COMPUTE",value:"What it does",detail:"Reproduce the operation, including under intervention."}]} note={context ? "Which costs less depends on the workload. A saving has not been measured here." : "A similar route is not, by itself, an equivalent computation."} />
    <div className="notebook-open-question"><Acts acts={acts.slice(1)} anchored offset={1} /></div>
  </div>;
}
