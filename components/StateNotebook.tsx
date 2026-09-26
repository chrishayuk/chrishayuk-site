import { NotebookEntry } from "./NotebookEntry";
import type { Act } from "@/lib/types";
import { Statement } from "@chrishayuk/hause/components/forms/Statement";
import { StudyRoom, StudyMeasures, StudySequence } from "@chrishayuk/hause/components/exhibition/Study";
import { Acts } from "./Acts";
import { StudyNotes, StudyComparison } from "./NotebookStudy";

export function StateNotebook({ acts }: { acts: Act[] }) {
  if (acts.length !== 9 || acts[1].kind !== "statement" || acts[8].kind !== "question") throw new Error("State notebook record changed");
  return <NotebookEntry recordId="N-STATE" className="cinematic-notebook state-notebook" chapters={[
{ label: "Name the state", children: <>
<section id="act-2" className="notebook-threshold"><p className="record-voice">THE DISTINCTION / N-STATE</p><Statement text="What can be rebuilt" continuation="is different from what can be forgotten." presentation="room" /></section>
<StudyRoom label="01 / NAME THE STATE" title={<>One position.<br/><em>Or every position.</em></>} description="A changed answer is not yet evidence of a lasting memory.">
      <StudyComparison act={acts[3]} index={3} />
      <StudyNotes acts={acts} start={2} label="WHAT REMAINS IN THE MACHINE" />
    </StudyRoom>
</> },
{ label: "The transplant", children: <>
<StudyRoom label="02 / THE RECORDED TRANSPLANT" title={<>The donor’s distribution.<br/><em>Exactly, in these tests.</em></>} tone="dark">
      <StudyMeasures label="GEMMA 3 4B / FULL-SEQUENCE FORWARD PASS" items={[{value:"0",label:"KL divergence",detail:"donor next-token distribution"},{value:"3",label:"tested conditions",detail:"interventions at L14 / L26"}]} note="All positions at the boundary were replaced. This result does not establish persistent decoding state." />
      <StudyNotes acts={acts} start={4} label="THE RESULT & ITS SCOPE" />
    </StudyRoom>
</> },
{ label: "The later branch", children: <>
<StudyRoom label="03 / AFTER THE FIRST WORD" title={<>A later branch.<br/><em>A different test.</em></>}>
      <StudySequence label="MAP-5 / REPEATED PATCHES IN THE PLANETS TEST" steps={[{label:"L20",value:"Fails",detail:"The tested patch does not control the branch."},{label:"L24",value:"Works",detail:"The repeated intervention changes the branch."},{label:"L28",value:"Works",detail:"A second tested depth, not a universal boundary."}]} note="The tested transition is bracketed between L20 and L24. This does not locate a universal thought at layer 24." />
      <StudyNotes acts={acts} start={5} label="READ THE BRANCH EXPERIMENT" />
    </StudyRoom>
</> },
{ label: "Back to the film", children: <>
<Acts acts={[acts[6]]} anchored offset={6} staticRefusals />
<StudyRoom label="04 / RETURN TO THE FILM" title={<>Rebuild the cache.<br/><em>Account for what stays.</em></>} description="The original discussion is the starting point for a test, not a new benchmark."><Acts acts={[acts[7]]} anchored offset={7} /></StudyRoom>
</> },
{ label: "The open question", children: <>
<div className="notebook-open-question"><Acts acts={[acts[8]]} anchored offset={8} /></div>
</> }
]}/>;
}
