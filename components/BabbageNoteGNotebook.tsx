import type { ReactNode } from "react";
import type { PublicationRecord } from "@/lib/types";
import { StudyMeasures } from "@chrishayuk/hause/components/exhibition/Study";
import { NotebookEntry } from "./NotebookEntry";
import { Acts } from "./Acts";
import { BabbageDeckRunner } from "./BabbageDeckRunner";
import { NoteGChooser } from "./NoteGChooser";
import { ADD_1843, ADD_1843_B, NOTE_G_CORRECTED, NOTE_G_PRINTED, NOTE_G_READING_B } from "@/lib/babbage-note-g-decks";

const PLATE = "https://commons.wikimedia.org/wiki/File:Diagram_for_the_computation_of_Bernoulli_numbers.jpg";
const FILES = "/demos/babbage-1843";

function Plate({ caption }: { caption: ReactNode }) {
  return <figure className="babbage-excerpt">
    <img src="/media/notebook/babbage/note-g-diagram.jpg" width={2000} height={1400} loading="lazy"
      alt="Lovelace’s Diagram for the computation by the Engine of the Numbers of Bernoulli: a table of 25 numbered operations, each with its sign, the variables acted upon and receiving results, the indication of change in value, the statement of results, and columns for the data, working variables and result variables V1 to V24. A rule under Operation 23 reads: Here follows a repetition of Operations thirteen to twenty-three."/>
    <figcaption className="record-voice">{caption} · PUBLIC DOMAIN · <a href={PLATE}>WIKIMEDIA COMMONS ↗</a></figcaption>
  </figure>;
}

/** The note: Note G's test, two readings, Lovelace's program run under each, and the proofs. */
export function BabbageNoteGNotebook({ record }: { record: PublicationRecord }) {
  const act = (index: number) => <Acts acts={[record.body[index]]} anchored offset={index} staticRefusals/>;
  return <NotebookEntry record={record} className="babbage-notebook" chapters={[
    { label: "The one place a result chooses", children: <>
      <Plate caption="A. A. LOVELACE, NOTE G, DIAGRAM FOR THE COMPUTATION OF THE NUMBERS OF BERNOULLI, SCIENTIFIC MEMOIRS 3, 1843"/>
      {act(0)}
    </> },
    { label: "Two readings of one sentence", children: <>
      {act(1)}
      <StudyMeasures label="WHAT EACH READING TAKES THE TEST AT OPERATION 23 TO DO" items={[
        { label: "EXPLICIT IN NOTE G", value: "TWO COURSES", detail: "A result, zero or greater than zero, chooses between them (pp. 728, 730–731)." },
        { label: "READING A", value: "BACK", detail: "Repeat 13 to 23 while V10 is greater than zero: a backing a result makes effective." },
        { label: "READING B", value: "FORWARD", detail: "The repetition is counted, n − 2 times; the test steps forward when a Number is finished." },
      ]} note="The text supports both. Each is built as its own arrangement of the cards."/>
    </> },
    { label: "Lovelace’s table, as printed", kind: "evidence", children: <>
      {act(2)}
      <BabbageDeckRunner files={FILES} label="NOTE G AS PRINTED, n = 4: B7 SHOULD BE −1/30" deck={NOTE_G_PRINTED} show={["v24", "v10"]}
        note="Each card is one operation of the table, with the number of the operation in a comment above it. Only the arrangement with the backing a result makes effective accepts the deck."/>
    </> },
    { label: "Three changes of three kinds", kind: "evidence", children: <>
      {act(3)}
      <StudyMeasures label="WHAT EACH CHANGE IS" items={[
        { label: "OPERATION 4", value: "AN ERROR", detail: "Printed V5 ÷ V4; the plate’s own statement of results gives V4 ÷ V5. Reported elsewhere before." },
        { label: "OPERATION 21", value: "AN ADAPTATION", detail: "B5 from V23 on the second pass, as the text says. Six cards not in the table, because this machine cannot advance a variable card." },
        { label: "OPERATION 24", value: "A CONVENTION", detail: "B7 is minus the sum; the table leaves signs aside (p. 727)." },
      ]} note="Operation 4 alone gives −1/2; with Operation 24 as well, 1/2; with Operation 21 instead, 1/30; all three, −1/30."/>
      <BabbageDeckRunner files={FILES} label="NOTE G WITH THE THREE CHANGES, READING A, n = 4" deck={NOTE_G_CORRECTED} show={["v24", "v10"]}
        note="Each change is marked CORRECTION in the deck, with its reason."/>
    </> },
    { label: "Reading B fits the smallest cases", kind: "evidence", children: <>
      {act(4)}
      <StudyMeasures label="V10 WHEN THE RUN ENDS" items={[
        { label: "n = 1", value: "A −2 · B 0" },
        { label: "n = 2", value: "A −1 · B 0" },
        { label: "n = 3, 4, 5", value: "A 0 · B 0", detail: "The cycle passed n − 2 times under both." },
      ]} note="Both readings give 1/6, −1/30, 1/42, −1/30 and 5/66 for n = 1 to 5."/>
      <BabbageDeckRunner files={FILES} label="NOTE G UNDER READING B, n = 4: A COUNTED REPETITION, FORWARD COURSES AT 7 AND 12" deck={NOTE_G_READING_B} show={["v24", "v10"]}
        note="set v10 after Operation 12 puts n − 2 on the wheels; back op13 counted repeats the cycle. Only the Reading B arrangement accepts the deck."/>
    </> },
    { label: "Reading A: one card is enough", kind: "evidence", children: <>
      {act(5)}
      <BabbageDeckRunner files={FILES} label="A COUNTER MACHINE THAT ADDS 3 TO 2, WITH ONLY THE NEW BACKING" deck={ADD_1843} show={["v5"]}
        note="Counter 0 is v5. Each flag is a cycle a result ends; the whole deck backs while 1 − [halted] is greater than zero, then gives off the counters. Every older arrangement refuses it."/>
    </> },
    { label: "Reading B: with the backing of 1837", kind: "evidence", children: <>
      {act(6)}
      <BabbageDeckRunner files={FILES} label="THE SAME MACHINE, WITH FORWARD COURSES AND BACK ALWAYS" deck={ADD_1843_B} show={["v5"]}
        note="Each flag is F := 0; ahead if the counter is zero; F := 1. The loop is back step always, passed over by a forward course once the machine has halted."/>
    </> },
    { label: "What Rojas already showed", children: <>{act(7)}</> },
    { label: "Run it yourself", kind: "operate", children: <>
      <NoteGChooser/>
      {act(9)}
    </> },
    { label: "How it was checked", children: <>{act(8)}</> },
    { label: "What this does not show", children: <>{act(10)}{act(11)}</> },
  ]}/>;
}
