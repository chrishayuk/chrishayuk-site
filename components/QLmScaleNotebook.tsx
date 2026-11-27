import type { PublicationRecord } from "@/lib/types";
import { StudyMeasures } from "@chrishayuk/hause/components/exhibition/Study";
import { NotebookEntry } from "./NotebookEntry";
import { Acts } from "./Acts";

/** The second Q-LM note: the learned grammar shrinks on Colmerauer's language and does not merge TinyStories. */
export function QLmScaleNotebook({ record }: { record: PublicationRecord }) {
  const act = (index: number) => <Acts acts={[record.body[index]]} anchored offset={index} staticRefusals/>;
  return <NotebookEntry record={record} className="qsystems-notebook" chapters={[
    { label: "More of the same language", children: <>{act(0)}</> },
    { label: "Largest at 300 sentences", kind: "evidence", children: <>
      {act(1)}
      <StudyMeasures label="COLMERAUER’S LANGUAGE: THE PEAK AND THE FULL CORPUS" items={[
        { label: "RULES AT 300 SENTENCES", value: "85,969", detail: "23,948 used per sentence on average." },
        { label: "RULES FROM 10,000 TO 105,138", value: "1,772", detail: "In 192 categories; 454 used per sentence." },
        { label: "MS PER NEXT TOKEN", value: "613 → 1.05", detail: "About 584 times less, from the peak to the full corpus." },
      ]} note="QLM-SCALE-001, kind 1, in docs/results-qlm-scale-001-kind1.md. One run per size."/>
    </> },
    { label: "The bookkeeping still grows", kind: "evidence", children: <>{act(2)}</> },
    { label: "TinyStories: nothing merges", kind: "evidence", children: <>
      {act(3)}
      <StudyMeasures label="TINYSTORIES, 100,000 TRAINING SENTENCES" items={[
        { label: "DISTINCT SUBSTRINGS", value: "6,607,023" },
        { label: "CATEGORIES", value: "5,373,773", detail: "81% to 94% of the substrings at every size." },
        { label: "RULES", value: "49,056,462", detail: "Growing about linearly with the text." },
      ]} note="A feasibility run, not a modelling result: docs/results-qlm-scale-001-tinystories.md."/>
    </> },
    { label: "Why: no context recurs", children: <>{act(4)}</> },
    { label: "Bounded contexts, a known technique", kind: "evidence", children: <>{act(5)}</> },
    { label: "Ahead with little data, behind with more", kind: "evidence", children: <>
      {act(6)}
      <StudyMeasures label="TINYSTORIES DEVELOPMENT SENTENCES, BITS PER TOKEN" items={[
        { label: "1,000 SENTENCES: V2 / LLAMA", value: "6.184 / 6.755" },
        { label: "10,000 SENTENCES: V2 / LLAMA", value: "4.999 / 5.074" },
        { label: "100,000 SENTENCES: V2 / LLAMA", value: "4.058 / 3.761", detail: "The transformer ahead by 0.30 bits." },
      ]} note="docs/results-qlm-v2-e1-e3.md. Lower is better. The transformer: 2,141,312 parameters, one seed, no tuning."/>
    </> },
    { label: "Read the results", kind: "operate", children: <>{act(7)}</> },
    { label: "What this does not show", children: <>{act(8)}{act(9)}</> },
  ]}/>;
}
