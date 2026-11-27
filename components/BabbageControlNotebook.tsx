import type { ReactNode } from "react";
import type { PublicationRecord } from "@/lib/types";
import { StudyMeasures, StudySequence } from "@chrishayuk/hause/components/exhibition/Study";
import { NotebookEntry } from "./NotebookEntry";
import { Acts } from "./Acts";
import { BabbageDeckRunner } from "./BabbageDeckRunner";
import { BabbageExplorer } from "./BabbageExplorer";

const VOL2 = "https://collection.sciencemuseumgroup.org.uk/documents/aa110001323";
const CREDIT = "SCIENCE MUSEUM GROUP COLLECTION";

// The decks, from github.com/chrishayuk/analytical-engine at a9093f5:
// control/tower-halting.txt, control/max-1838.txt, and `babbage control
// minsky add 2,3 loop|trap1838|trap1837`, the counter machine that adds
// counter 1 into counter 0, translated three ways.
const TOWER = "% 2↑↑n (2 raised to itself n times) by a deck that halts, with n on the\n% combinatorial wheels. It refutes the first statement of argument C in\n% docs/expressiveness.md. One pass of the counted group computes 2^x by one\n% multiplication repeated x times, and the repetition count is read from the\n% store: 7 March 1836 gives a \"given variable number of repetitions\" but does\n% not say where the number comes from (see multiply-1836). With n = 4 the\n% deck gives 65536; n = 5 is beyond this machine's numbers.\nDeck tower-halting\nTitle \"2↑↑4 by a deck that halts\"\nStore v1 = 1, v3 = 0\nWheels 4\nExpect halts\nExpect results 65536\nCards\npass:\n× v3 0 > v3\n+ v3 1 > v3\nrepeat × v3 2 times v1\n+ v3 0 > v1\nback pass counted\nresult v1\n";
const MAX = "% The greater of x and y, for whole numbers x, y ≥ 0, in the configuration of\n% 30 May 1838: every count is set before the group it counts. A counted group\n% passed x + 1 times makes P = y(y − 1)…(y − x), which is 0 exactly when\n% y ≤ x. The flag of docs/expressiveness.md, a group passed P² + 1 times,\n% makes F = [P ≠ 0] = [y > x], and the maximum is x + F(y − x).\n% The second group is passed P² + 1 times, so the deck is slow: with x = 3 and\n% y = 4 it is passed 577 times. formal/Babbage/Classes.lean and\n% docs/growth-classes.md say what this changes.\nDeck max-1838\nTitle \"max(3, 4) with every count set before its group\"\nStore v1 = 3, v2 = 4, v10 = 1\nExpect halts\nExpect results 4\nCards\n+ v1 1 > v12\nset v12\nprod:\n− v2 v11 > v13\n× v10 v13 > v10\n+ v11 1 > v11\nback prod counted\n× v10 v10 > v14\n+ v14 1 > v15\nset v15\nflag:\n+ v16 0 > v17\n+ 0 1 > v16\nback flag counted\n− v2 v1 > v18\n× v17 v18 > v18\n+ v1 v18 > v19\nresult v19\n";
const ADD_LOOP = "Deck add\nTitle \"counter machine add, translated\"\nStore v9 = 1, v5 = 2, v6 = 3\nCards\nstep:\n× v1 0 > v1\n+ v5 1 > v2\nset v2\nflag0:\n+ v1 0 > v7\n+ 0 1 > v1\nback flag0 counted\n× v1 0 > v1\n+ v6 1 > v2\nset v2\nflag1:\n+ v1 0 > v8\n+ 0 1 > v1\nback flag1 counted\n× v12 0 > v12\n× v13 0 > v13\n× v14 0 > v14\n× v9 v8 > v3\n− v6 v3 > v6\n+ v13 v3 > v13\n− v9 v3 > v3\n+ v14 v3 > v14\n+ v5 v10 > v5\n+ v12 v10 > v12\n+ v14 v11 > v14\n+ v12 0 > v9\n+ v13 0 > v10\n+ v14 0 > v11\n+ 0 2 > v4\n− v4 v11 > v4\nset v4\nback step counted\nresult v5\nresult v6\n";
const ADD_TRAP_1838 = "Deck add\nTitle \"counter machine add, translated\"\nStore v9 = 1, v5 = 2, v6 = 3\nTrap halts\nCards\nstep:\n× v1 0 > v1\n+ v5 1 > v2\nset v2\nflag0:\n+ v1 0 > v7\n+ 0 1 > v1\nback flag0 counted\n× v1 0 > v1\n+ v6 1 > v2\nset v2\nflag1:\n+ v1 0 > v8\n+ 0 1 > v1\nback flag1 counted\n× v12 0 > v12\n× v13 0 > v13\n× v14 0 > v14\n× v9 v8 > v3\n− v6 v3 > v6\n+ v13 v3 > v13\n− v9 v3 > v3\n+ v14 v3 > v14\n+ v5 v10 > v5\n+ v12 v10 > v12\n+ v14 v11 > v14\n+ v12 0 > v9\n+ v13 0 > v10\n+ v14 0 > v11\n+ 0 2 > v4\n− v4 v11 > v4\n− v4 1 > v4\n÷ 1 v4 > v3\nback step always\n";
const ADD_TRAP_1837 = "Deck add\nTitle \"counter machine add, translated\"\nStore v9 = 1, v5 = 2, v6 = 3\nTrap halts\nCards\nstep:\n+ 0 1 > v7\nrepeat × v7 0 times v5\n− 1 v7 > v7\n+ 0 1 > v8\nrepeat × v8 0 times v6\n− 1 v8 > v8\n× v12 0 > v12\n× v13 0 > v13\n× v14 0 > v14\n× v9 v8 > v3\n− v6 v3 > v6\n+ v13 v3 > v13\n− v9 v3 > v3\n+ v14 v3 > v14\n+ v5 v10 > v5\n+ v12 v10 > v12\n+ v14 v11 > v14\n+ v12 0 > v9\n+ v13 0 > v10\n+ v14 0 > v11\n+ 0 2 > v4\n− v4 v11 > v4\n− v4 1 > v4\n÷ 1 v4 > v3\nback step always\n";

/** A detail of a scanned page, credited to where it came from. */
function Excerpt({ src, alt, width, height, caption }: { src: string; alt: string; width: number; height: number; caption: ReactNode }) {
  return <figure className="babbage-excerpt">
    <img src={`/media/notebook/babbage/${src}`} alt={alt} width={width} height={height} loading="lazy"/>
    <figcaption className="record-voice">{caption} · {CREDIT} · <a href={VOL2}>THE SCANS ↗</a></figcaption>
  </figure>;
}

/** The note in pictures: the page of 1836, the decks running under every date, and the rules to change. */
export function BabbageControlNotebook({ record }: { record: PublicationRecord }) {
  const act = (index: number) => <Acts acts={[record.body[index]]} anchored offset={index} staticRefusals/>;
  return <NotebookEntry record={record} className="babbage-notebook" chapters={[
    { label: "A number put on an axis", children: <>
      <Excerpt src="vol2-p84-7-march-1836.jpg" width={1500} height={900}
        alt="Babbage’s handwriting, headed 7 March: When any operation is to be terminated after a given number of repetitions, with the word variable written above the line between given and number; let the number of rep.ns be put on an axis having a carriage connected with it. Then by a register axis subtracting unity previous each operation a running up will take place at end and thus the op.n be suspended."
        caption="SCRIBBLING BOOK VOL. II, P. 84, 7 MARCH 1836 / “VARIABLE”, ABOVE THE LINE"/>
      {act(0)}
    </> },
    { label: "The control of the Sketch Books", children: <>
      {act(1)}
      <StudySequence label="THE CARDS, BY DATE" steps={[
        { label: "MARCH 1836", value: "repeat × v3 2 times n", detail: "One operation repeated a counted number of times. Where n comes from is the open question." },
        { label: "DECEMBER 1837", value: "set n · back counted", detail: "A combinatorial card puts n on the wheels; a counted backing card sends the cards back to the first until the wheels run up." },
        { label: "DECEMBER 1837", value: "back always", detail: "A backing card that “always orders the backing”: a deck with one never halts by passing its last card." },
        { label: "30 MAY 1838", value: "back to any card", detail: "Wheels “set to back any No of cards”. Every count still set before its group." },
      ]} note="Each rule of the machine is fixed in writing as page, reading or idealisation (docs/semantics.md)."/>
    </> },
    { label: "A conjecture that failed", kind: "evidence", children: <>
      {act(2)}
      <BabbageDeckRunner label="2↑↑4 BY A DECK THAT HALTS / CHANGE WHEELS 4 TO 3" deck={TOWER}
        note="Each pass makes 2^x by one multiplication repeated x times, the count read from the store (v1). March 1836 refuses the deck because it has no combinatorial wheels. With Wheels 3 it gives 16; with 5 the number is too large for this machine’s numbers, though not for the proof."/>
    </> },
    { label: "Two readings, two theorems", kind: "evidence", children: <>
      {act(3)}
      <StudyMeasures label="WHAT A HALTING DECK CAN GIVE OFF" items={[
        { label: "COUNTS FROM NUMBER CARDS", value: "< 2↑↑n", detail: "A tower of fixed height. no_tetration_eventually." },
        { label: "COUNTS FROM THE STORE", value: "2↑↑n", detail: "tower_halts, for every n ≥ 1." },
        { label: "COUNTS FROM THE STORE", value: "< 2↑↑↑n", detail: "A fixed number of tetrations. no_pentation." },
        { label: "A COUNT SET IN ITS OWN LOOP", value: "ANY", detail: "Every computable function, given Minsky. No page." },
      ]} note="Each is a theorem in Lean, for whole numbers and for exact fractions."/>
    </> },
    { label: "One step no page gives", kind: "evidence", children: <>
      {act(4)}
      <BabbageDeckRunner label="A COUNTER MACHINE THAT ADDS 3 TO 2, TRANSLATED" deck={ADD_LOOP} show={["v5"]}
        note="Counter 0 is v5 and counter 1 is v6. Only the arrangement labelled as not found accepts it: its last count, set v4, stands inside the group that back step counted repeats. It gives off 5 and 0."/>
    </> },
    { label: "Or change what counts as the end", kind: "evidence", children: <>
      {act(5)}
      <BabbageDeckRunner label="THE SAME MACHINE FOR 30 MAY 1838: EACH PASS ENDS 1 ÷ W, THEN BACK ALWAYS" deck={ADD_TRAP_1838} show={["v5"]} trap startTrap
        note="Ticked, the deck stops at the division with v5 = 5. Untick the box and the same stop is an error. December 1837 refuses it: its flag groups back to card 4."/>
      <BabbageDeckRunner label="AND FOR DECEMBER 1837: EACH FLAG IS ONE REPEATED MULTIPLICATION" deck={ADD_TRAP_1837} show={["v5"]} trap startTrap
        note="repeat × v7 0 times v5 leaves v7 at 1 if counter 0 is 0, and at 0 otherwise. The count comes from the store. No combinatorial card, no counted backing."/>
    </> },
    { label: "December 1837 against May 1838", kind: "evidence", children: <>
      {act(6)}
      <BabbageDeckRunner label="THE LARGER OF 3 AND 4, EVERY COUNT SET BEFORE ITS GROUP" deck={MAX}
        note="A counted group makes P = y(y − 1)…(y − x), which is 0 exactly when y ≤ x; a second group, passed P² + 1 times, turns that into a flag. Slow, but 30 May 1838 accepts it. December 1837 refuses it."/>
    </> },
    { label: "Change the rules", kind: "operate", children: <>
      <BabbageExplorer/>
    </> },
    { label: "How it was checked", children: <>{act(7)}{act(8)}</> },
    { label: "What this does not show", children: <>{act(9)}{act(10)}</> },
  ]}/>;
}
