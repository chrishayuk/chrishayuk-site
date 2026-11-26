import type { PublicationRecord } from "@/lib/types";
import { StudyMeasures } from "@chrishayuk/hause/components/exhibition/Study";
import { NotebookEntry } from "./NotebookEntry";
import { Acts } from "./Acts";
import Link from "next/link";
import { QSystemsRunner } from "./QSystemsPlayground";

/** The third note: the machine's graphs read as a language model, and the report's rules as an open one. */
export function QSystemsNextTokenNotebook({ record }: { record: PublicationRecord }) {
  const act = (index: number) => <Acts acts={[record.body[index]]} anchored offset={index} staticRefusals/>;
  return <NotebookEntry record={record} className="qsystems-notebook" chapters={[
    { label: "A graph of every sentence", children: <>
      {act(0)}
      <QSystemsRunner label="THE REPORT’S TREATMENT: EIGHTEEN SENTENCES IN ONE GRAPH" example="paraphrase"
        note="Phase 2 is the graph read here as a language model: every path from -01- to -02- is one sentence. Nine of the eighteen begin RICHARD, six LE and three L, so the first word is RICHARD with probability 1/2; all nine that begin RICHARD go on with CONSTATE."/>
    </> },
    { label: "Counting without listing", kind: "evidence", children: <>
      {act(1)}
      <StudyMeasures label="NEXT-WORD COUNTS ON A GRAPH, NO SENTENCE LISTED" items={[
        { label: "PREFIXES CHECKED AGAINST LISTING", value: "13,510", detail: "All of them, for the 1,458 sentences of one tree. Every count equal." },
        { label: "SENTENCES IN THE LARGEST GRAPH", value: "9,565,938", detail: "In 2,760 arrows; 2,085 deterministic states." },
        { label: "ENTROPY", value: "23.19 bits", detail: "Uniform over the paraphrases: log₂ 9,565,938." },
        { label: "SAMPLES ANALYSED BACK", value: "20 / 20", detail: "Each gives the tree it came from." },
      ]} note="QSYS-E16 in docs/research.md; tests/research.rs asserts every number. The prediction layer is not historical."/>
    </> },
    { label: "Paths or sentences", kind: "evidence", children: <>{act(2)}</> },
    { label: "Against a trigram", kind: "evidence", children: <>
      {act(3)}
      <StudyMeasures label="300 SENTENCES OF DEPTH 2, AND 300 SAMPLES OF EACH MODEL" items={[
        { label: "SAMPLES GRAMMATICAL: GRAPH", value: "300 / 300" },
        { label: "SAMPLES GRAMMATICAL: TRIGRAM", value: "91 / 300", detail: "29 of the 91 are sentences it never saw." },
        { label: "DEEPER SENTENCES ABOVE ZERO: GRAPH", value: "0 / 300", detail: "Built from the trees of depth at most 1, it holds nothing else." },
        { label: "DEEPER SENTENCES ABOVE ZERO: TRIGRAM", value: "16 / 300" },
      ]} note="Grammatical means the report’s own system, inverted, analyses it to exactly one tree."/>
    </> },
    { label: "The grammar is not closed", kind: "evidence", children: <>{act(4)}</> },
    { label: "Open and exact", kind: "evidence", children: <>
      {act(5)}
      <StudyMeasures label="THE OPEN MODEL: NO TREE GIVEN, NO BOUND ON DEPTH" items={[
        { label: "TREES WHERE THE GRAMMAR GIVES THE MACHINE’S STRINGS", value: "8,414", detail: "Every one checked, path for derivation." },
        { label: "DEEPER SENTENCES ABOVE ZERO", value: "300 / 300", detail: "The trigram: 16. The closed graph: 0." },
        { label: "SAMPLES GRAMMATICAL", value: "300 / 300", detail: "53 of them deeper than one embedded clause." },
        { label: "MOST DERIVATIONS LIVE", value: "2,160", detail: "Reading the 88-word paraphrase, with merging or without." },
      ]} note="QSYS-E17. The grammar is read off the report’s rules by hand; its probabilities are chosen, not learned."/>
    </> },
    { label: "Run it yourself", kind: "operate", children: <>
      {act(6)}
      <p className="qsystems-play-link record-voice"><Link href="/demos/q-systems?example=paraphrase">OPEN THE PLAYGROUND ↗</Link><span>Step through the synthesis that makes the graph, one rule application at a time.</span></p>
    </> },
    { label: "What this does not show", children: <>{act(7)}{act(8)}</> },
  ]}/>;
}
