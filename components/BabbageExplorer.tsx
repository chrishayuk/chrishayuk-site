"use client";

import { useState } from "react";

/**
 * How powerful is the control machine of Babbage's Sketch Books? Three
 * switches, each a rule that a page leaves open or does not give, and a
 * date. Every line shown is a theorem of github.com/chrishayuk/analytical-engine
 * formal/ (PROVED), a deck run in its tests (TESTED), an argument in its docs
 * (ARGUED) or an open question (OPEN), as of commit a9093f5.
 */

const REPO = "https://github.com/chrishayuk/analytical-engine/blob/main";
const FILE: Record<string, string> = {
  Machine: `${REPO}/formal/Babbage/Machine.lean`, Separation: `${REPO}/formal/Babbage/Separation.lean`, GrowthStore: `${REPO}/formal/Babbage/GrowthStore.lean`,
  Tower: `${REPO}/formal/Babbage/Tower.lean`, Minsky: `${REPO}/formal/Babbage/Minsky.lean`,
  Trap: `${REPO}/formal/Babbage/Trap.lean`, Classes: `${REPO}/formal/Babbage/Classes.lean`,
  classes: `${REPO}/docs/growth-classes.md`, expressiveness: `${REPO}/docs/expressiveness.md`,
  max: `${REPO}/control/max-1838.txt`,
};

type Status = "PROVED" | "TESTED" | "ARGUED" | "OPEN";
type Line = { status: Status; text: string; names?: string[]; file: string };
type Verdict = { model: string; headline: string; lines: Line[] };
type Date = "1836" | "1837" | "1838";

const DATES: { key: Date; label: string; detail: string }[] = [
  { key: "1836", label: "MARCH 1836", detail: "One operation repeated a number of times. No backing cards." },
  { key: "1837", label: "DECEMBER 1837", detail: "Combinatorial wheels; backing, counted or always, to the first card only." },
  { key: "1838", label: "30 MAY 1838", detail: "Backing to any earlier card." },
];

function verdict(date: Date, store: boolean, inLoop: boolean, trap: boolean): Verdict {
  const trapNothing: Line = { status: "PROVED", text: "With every backing card counted, a trap only ends a run sooner: the same bounds hold at every point a run reaches.", names: ["no_tetration_reach", "no_pentation_reach"], file: FILE.Trap };
  if (date === "1836") {
    const lines: Line[] = store
      ? [{ status: "PROVED", text: "It does not give 2↑↑↑n (pentation) for every n.", names: ["no_pentation"], file: FILE.GrowthStore },
         { status: "ARGUED", text: "Not 2↑↑n either: with no backing, each card is passed once, so the tower has a height fixed by the deck.", file: FILE.expressiveness }]
      : [{ status: "PROVED", text: "Everything given off is below a tower of 2s of height fixed by the deck: no 2↑↑n for every n.", names: ["out_le_tower", "no_tetration_eventually"], file: FILE.Separation }];
    if (inLoop) lines.push({ status: "PROVED", text: "March 1836 has no combinatorial cards, so there is no count to set inside a loop: its configuration, c1836, accepts none.", file: FILE.Machine });
    if (trap) lines.push(trapNothing);
    return { model: store ? "MODEL B" : "MODEL A", headline: "A fixed number of exponentials", lines };
  }
  if (inLoop && date === "1838") return { model: "MODEL C", headline: "General, given Minsky’s theorem", lines: [
    { status: "PROVED", text: "Every counter machine translates into a deck that halts exactly when the machine does and gives off its counters. Two counters compute every computable function (Minsky 1967, cited, not formalised).", names: ["compile_halts", "machine_halts_of_compile"], file: FILE.Minsky },
    { status: "PROVED", text: "Every dated configuration refuses those decks: their count is set inside the group it counts. No page read gives that.", names: ["compile_refused"], file: FILE.Minsky },
  ] };
  if (trap && date === "1838") return { model: "MODEL D", headline: "General, given Minsky’s theorem, with no new card", lines: [
    { status: "PROVED", text: "With the unconditional backing card, each pass ends 1 ÷ W, and W is 0 only once the machine has halted. The deck stops there exactly when the machine halts, its counters in the store.", names: ["trap_halts", "machine_halts_of_trap"], file: FILE.Trap },
    { status: "PROVED", text: "The configuration of 30 May 1838 accepts the deck, and it has no repetition card, so it holds under either reading. Its combinatorial counts come from the store, as the pages allow.", names: ["trapDeck_accepted", "trapDeck_constReps"], file: FILE.Trap },
    { status: "ARGUED", text: "No text read treats such a stop as the end of a computation. In Menabrea (1842) the engine rings a bell and waits for the attendant.", file: FILE.expressiveness },
  ] };
  if (date === "1837" && (inLoop || trap)) {
    if (store && trap) return { model: "MODEL D", headline: "General, given Minsky’s theorem, in December 1837", lines: [
      { status: "PROVED", text: "Each flag [c > 0] is one operation repeated c times, its count read from the store. The deck has no combinatorial card and no counted backing, and December 1837 accepts it.", names: ["trapDeck37_accepted", "trap37_halts", "machine_halts_of_trap37"], file: FILE.Trap },
      { status: "PROVED", text: "It needs the store reading: with counts from number cards, it is not a deck of Model A.", names: ["trapDeck37_not_constReps"], file: FILE.Trap },
    ] };
    if (store) return { model: "MODEL C", headline: "Probably general; not proved for December 1837", lines: [
      { status: "OPEN", text: "The flags of the December 1837 trap deck, with the loop’s count set inside the loop, look as if they translate counter machines. That deck has not been written out or proved; the proof is for 30 May 1838.", file: FILE.expressiveness },
    ] };
    return { model: trap ? "MODEL D" : "MODEL C", headline: "Open", lines: [
      { status: "OPEN", text: "December 1837 backs only to the first card, so the flag groups of the 1838 translation cannot be used, and with counts from number cards no other way of testing a counter for zero has been found.", file: FILE.expressiveness },
      { status: "PROVED", text: "The 1838 deck is refused: its flag groups back to card 3.", names: ["trapDeck_refused_1837"], file: FILE.Trap },
    ] };
  }
  if (date === "1837") {
    const lines: Line[] = [{ status: "PROVED", text: "A halting run is one loop: at most (w + 1)(L + 1) cards, with w on the wheels at the start and L cards.", names: ["halt_within_1837"], file: FILE.Classes }];
    if (store) lines.push(
      { status: "PROVED", text: "It gives 2↑↑n: tower-halting halts with 2 raised to itself n times, its repetition count read from the store.", names: ["tower_halts"], file: FILE.Tower },
      { status: "PROVED", text: "Nothing beyond a tetration of height linear in the input: no 2↑↑2ⁿ.", names: ["no_tet_exp_1837"], file: FILE.Classes });
    else lines.push(
      { status: "PROVED", text: "Nothing beyond 2^2^(linear): no 2^2^2ⁿ for every n.", names: ["no_triple_exp_1837"], file: FILE.Classes },
      { status: "ARGUED", text: "Not even the larger of two numbers: for each count on the wheels, the result is a rational function of the inputs.", file: FILE.classes });
    if (trap) lines.push(trapNothing);
    return { model: store ? "MODEL B" : "MODEL A", headline: store ? "Tetration, of limited height" : "A double exponential", lines };
  }
  const lines: Line[] = store
    ? [{ status: "PROVED", text: "Tetration and beyond: a deck of 30 May 1838 gives 2↑↑2ⁿ.", names: ["tet_exp_halts_1838", "tetDeck_accepted"], file: FILE.Classes },
       { status: "PROVED", text: "It does not give 2↑↑↑n (pentation) for every n.", names: ["no_pentation"], file: FILE.GrowthStore },
       { status: "ARGUED", text: "Inside the fourth Grzegorczyk class, E⁴; whether it is all of it is open.", file: FILE.classes }]
    : [{ status: "PROVED", text: "Everything given off is below a tower of 2s whose height is fixed by the deck: for every n from some point on, nothing as large as 2↑↑n.", names: ["out_le_tower", "no_tetration_eventually"], file: FILE.Separation },
       { status: "PROVED", text: "But more than December 1837: a deck of 30 May 1838 gives 2^2^2ⁿ, by putting a computed 2ⁿ on the wheels.", names: ["triple_halts_1838", "tripleDeck_constReps", "tripleDeck_refused_1837"], file: FILE.Classes },
       { status: "TESTED", text: "The larger of two numbers, every count set before its group.", file: FILE.max },
       { status: "ARGUED", text: "Inside the elementary functions, E³; it is all of them if it can compute x mod y, which is open.", file: FILE.classes }];
  if (trap) lines.push(trapNothing);
  return { model: store ? "MODEL B" : "MODEL A", headline: store ? "Tetration, but not pentation" : "A tower of fixed height", lines };
}

export function BabbageExplorer() {
  const [date, setDate] = useState<Date>("1838");
  const [store, setStore] = useState(false);
  const [inLoop, setInLoop] = useState(false);
  const [trap, setTrap] = useState(false);
  const v = verdict(date, store, inLoop, trap);
  const switches: { label: string; detail: string; on: boolean; set: (on: boolean) => void }[] = [
    { label: "Repetition counts from the store", detail: "7 March 1836 says “a given variable number”, not where it comes from. Off: from number cards only. Either way the wheels may take a computed number.", on: store, set: setStore },
    { label: "A count set inside its own loop", detail: "No page read does this. Every arrangement found sets the count before the group.", on: inLoop, set: setInLoop },
    { label: "A stop at 1 ÷ 0 read as the end", detail: "No text read treats it so. Off: a halt is passing the last card.", on: trap, set: setTrap },
  ];
  return <figure className="babbage-explorer">
    <figcaption className="record-voice">HOW POWERFUL IS BABBAGE’S MACHINE? / CHANGE THE RULES</figcaption>
    <div className="babbage-explorer-dates" role="radiogroup" aria-label="The date of the pages">
      {DATES.map(d => <button key={d.key} type="button" role="radio" aria-checked={date === d.key} className={date === d.key ? "on" : undefined} onClick={() => setDate(d.key)}>
        <span className="record-voice">{d.label}</span><span>{d.detail}</span>
      </button>)}
    </div>
    <div className="babbage-explorer-switches">
      {switches.map(s => <label key={s.label}><input type="checkbox" checked={s.on} onChange={e => s.set(e.target.checked)}/><span><strong>{s.label}</strong><br/>{s.detail}</span></label>)}
    </div>
    <div className="babbage-explorer-verdict" aria-live="polite">
      <p className="record-voice">{v.model} · {DATES.find(d => d.key === date)!.label}</p>
      <h3>{v.headline}</h3>
      <ul>{v.lines.map((l, i) => <li key={i}><span className={`babbage-status babbage-status-${l.status.toLowerCase()}`}>{l.status}</span> {l.text}{l.names && <> <a href={l.file} className="babbage-lean">{l.names.join(", ")} ↗</a></>}{!l.names && <> <a href={l.file} className="babbage-lean">source ↗</a></>}</li>)}</ul>
    </div>
    <p className="babbage-explorer-note">These are results about formal models of the control the Sketch Books describe, with unbounded numbers and store. They are not results about Babbage’s engine as he went on to design it: in 1842 Menabrea writes that the mill “will order other cards”.</p>
  </figure>;
}
