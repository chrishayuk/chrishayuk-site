import type { PublicationRecord } from "@/lib/types";
import { StudyMeasures } from "@chrishayuk/hause/components/exhibition/Study";
import { NotebookEntry } from "./NotebookEntry";
import { Acts } from "./Acts";

/** The first Q-LM note: a grammar learned from Colmerauer's sentences alone, and the corrections to its comparison with transformers. */
export function QLmNotebook({ record }: { record: PublicationRecord }) {
  const act = (index: number) => <Acts acts={[record.body[index]]} anchored offset={index} staticRefusals/>;
  return <NotebookEntry record={record} className="qsystems-notebook" chapters={[
    { label: "Only the sentences", children: <>{act(0)}</> },
    { label: "A category that holds a clause", kind: "evidence", children: <>
      {act(1)}
      <StudyMeasures label="A GRAMMAR LEARNED FROM SENTENCES ALONE" items={[
        { label: "DEEPER SENTENCES OF KNOWN WORDS DERIVABLE", value: "300 / 300", detail: "From 1,000 training sentences on, at every round of training." },
        { label: "SWAPPED SENTENCES REJECTED", value: "299 / 300", detail: "Development sentences with two words swapped." },
        { label: "THE GRAMMAR FROM 10,000 SENTENCES ON", value: "1,772 rules", detail: "In 192 categories; 38,121 rules at 1,000." },
      ]} note="QLM-003 in docs/results.md. The rules are recursive in behaviour, not shown to be Colmerauer’s."/>
    </> },
    { label: "Five rounds was early stopping", kind: "evidence", children: <>
      {act(2)}
      <StudyMeasures label="DEEPER SENTENCES, BITS PER TOKEN, FULL TRAINING SET" items={[
        { label: "GRAMMAR, FIVE ROUNDS (FIRST REPORTED)", value: "1.59" },
        { label: "GRAMMAR, CONVERGED (40 ROUNDS)", value: "2.37", detail: "Still derives all 300 deeper sentences." },
        { label: "CUSTOM TRANSFORMER", value: "4.75", detail: "Seed 1, on the same first 100 deeper sentences." },
      ]} note="Inside–outside to convergence, docs/results-qlm004.md. Lower is better. Development numbers; the confirmation set has not been read."/>
    </> },
    { label: "The transformer, not transformers", kind: "evidence", children: <>
      {act(3)}
      <StudyMeasures label="THE FIRST 100 DEEPER SENTENCES, 105,138 TRAINING SENTENCES" items={[
        { label: "CONVERGED GRAMMAR", value: "2.37" },
        { label: "LLAMA, THREE SEEDS", value: "2.39–2.97", detail: "About 1% better than the grammar on the corpus." },
        { label: "CUSTOM TRANSFORMER", value: "4.75", detail: "Seed 1." },
      ]} note="docs/results-architectures.md. Bits per token; lower is better."/>
    </> },
    { label: "Not a length effect", kind: "evidence", children: <>{act(4)}</> },
    { label: "Rotary positions carry it", kind: "evidence", children: <>
      {act(5)}
      <StudyMeasures label="QLM-ARCH-001: ONE CHANGE AT A TIME, 105,138 SENTENCES, MEAN OF THREE SEEDS" items={[
        { label: "BASE (THE CUSTOM MODEL, REIMPLEMENTED)", value: "4.580" },
        { label: "ROTARY POSITIONS", value: "2.452", detail: "The only single change that passes the plan’s rule." },
        { label: "ALL FOUR CHANGES", value: "2.456", detail: "Llama, on the same sentences: 2.56." },
      ]} note="Bits per token on all 300 deeper sentences of corpus words. That rotary positions work by making attention relative is the repository’s interpretation."/>
    </> },
    { label: "Three other languages", kind: "evidence", children: <>{act(6)}</> },
    { label: "Read the results", kind: "operate", children: <>{act(7)}</> },
    { label: "What this does not show", children: <>{act(8)}{act(9)}</> },
  ]}/>;
}
