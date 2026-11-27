"use client";

import { useState } from "react";
import { BabbageDeckRunner } from "./BabbageDeckRunner";
import { noteGDeck, type Version } from "@/lib/babbage-note-g-decks";

/** Expected B(2n − 1), Lovelace's numbering, for n = 1 to 5. */
const EXPECTED = ["1/6", "−1/30", "1/42", "−1/30", "5/66"];

const VERSIONS: { key: Version; label: string; detail: string }[] = [
  { key: "printed", label: "AS PRINTED", detail: "The table as the plate prints it, the repetition as Reading A." },
  { key: "A", label: "READING A", detail: "Three changes; the repetition ended when V₁₀ comes to zero." },
  { key: "B", label: "READING B", detail: "Three changes; the repetition counted, the tests at 7 and 12 step forward." },
];

/** Choose a reading and a Number, and run Lovelace's program. */
export function NoteGChooser() {
  const [version, setVersion] = useState<Version>("B");
  const [n, setN] = useState(4);
  const c = 20 + n;
  return <figure className="babbage-explorer">
    <figcaption className="record-voice">CHOOSE A READING AND A NUMBER / RUN LOVELACE’S PROGRAM</figcaption>
    <div className="babbage-explorer-dates" role="radiogroup" aria-label="The version of the program">
      {VERSIONS.map(v => <button key={v.key} type="button" role="radio" aria-checked={version === v.key} className={version === v.key ? "on" : undefined} onClick={() => setVersion(v.key)}>
        <span className="record-voice">{v.label}</span><span>{v.detail}</span>
      </button>)}
    </div>
    <div className="babbage-explorer-dates" role="radiogroup" aria-label="Which Number">
      {[1, 2, 3, 4, 5].map(k => <button key={k} type="button" role="radio" aria-checked={n === k} className={n === k ? "on" : undefined} onClick={() => setN(k)}>
        <span className="record-voice">n = {k}</span><span>B{2 * k - 1} = {EXPECTED[k - 1]}</span>
      </button>)}
    </div>
    <BabbageDeckRunner key={`${version}-${n}`} files="/demos/babbage-1843" deck={noteGDeck(version, n)} show={[`v${c}`, "v10"]}
      label={`${VERSIONS.find(v => v.key === version)!.label}, n = ${n}: THE RESULT ON V${c}, AND V10 AT THE END`}
      note={version === "A" && n <= 2 ? "Reading A cannot step forward, so the deck runs on through operations the engine would skip; V10 ends below zero, and the run stops only because a negative number lets the cards go on." : version === "printed" ? "As printed, the program gives a wrong Number for every n from 1 to 5: −3/2, −1/2, −11/30, −95/126 and −241/90." : undefined}/>
    <p className="babbage-explorer-note">Each reading’s deck runs only under its own arrangement: 1843, Reading A for the backing a result makes effective, 1843, Reading B for the forward course. The earlier Numbers are given as data, as Lovelace’s table assumes. The adaptation of Operation 21 works up to n = 5.</p>
  </figure>;
}
