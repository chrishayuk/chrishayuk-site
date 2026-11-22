import type { ReactNode } from "react";

/**
 * Figures 19 and 38 of Turing's 1945 report, redrawn from a transcription as
 * tables generated from data. The originals are at The Turing Archive for the
 * History of Computing, https://www.alanturing.net/ace; no image of the
 * report is reproduced here.
 */

const ARCHIVE = "https://www.alanturing.net/ace";
const DIGITS = Array.from({ length: 32 }, (_, i) => i + 1);

/** A band of digits with a name, from digit `from` to digit `to`. */
type Band = { from: number; to: number; text: string; tone?: "code" | "field" | "number" };
type Row = { label: string; detail?: string; bands: Band[] };

/** Fig. 19, "Meanings of digits in minor cycles": the two kinds of instruction,
 * the current data, and the ten types of operation of the arithmetic part. */
const WORD_ROWS: Row[] = [
  { label: "TYPE A", detail: "do something in the arithmetic part, then go on two minor cycles later", bands: [{ from: 3, to: 3, text: "0", tone: "code" }, { from: 5, to: 32, text: "operations of CA", tone: "field" }] },
  { label: "TYPE B", detail: "go on somewhere else; the place left goes to TS 1", bands: [{ from: 3, to: 3, text: "1", tone: "code" }, { from: 17, to: 32, text: "new instruction number", tone: "number" }] },
  { label: "CD", detail: "where the next instruction is", bands: [{ from: 17, to: 17, text: "TS6", tone: "code" }, { from: 18, to: 22, text: "time: 16 1 2 4 8", tone: "number" }, { from: 23, to: 32, text: "delay line", tone: "number" }] },
  { label: "K", detail: "TS 6 into a minor cycle", bands: [{ from: 5, to: 8, text: "0100", tone: "code" }, { from: 18, to: 22, text: "time", tone: "number" }, { from: 23, to: 32, text: "delay line", tone: "number" }] },
  { label: "L", detail: "a minor cycle into TS 6", bands: [{ from: 5, to: 8, text: "0101", tone: "code" }, { from: 18, to: 22, text: "time", tone: "number" }, { from: 23, to: 32, text: "delay line", tone: "number" }] },
  { label: "M", detail: "a TS into TS 6", bands: [{ from: 5, to: 8, text: "0010", tone: "code" }, { from: 10, to: 14, text: "TS", tone: "number" }] },
  { label: "N", detail: "TS 6 into a TS", bands: [{ from: 5, to: 8, text: "0011", tone: "code" }, { from: 10, to: 14, text: "TS", tone: "number" }] },
  { label: "O", detail: "12 minor cycles out on a card", bands: [{ from: 5, to: 8, text: "0001", tone: "code" }, { from: 23, to: 32, text: "delay line", tone: "number" }] },
  { label: "P", detail: "a card into a delay line", bands: [{ from: 5, to: 8, text: "0000", tone: "code" }, { from: 23, to: 32, text: "delay line", tone: "number" }] },
  { label: "Q", detail: "digits 17-32 into TS 6", bands: [{ from: 5, to: 8, text: "0110", tone: "code" }, { from: 17, to: 32, text: "to go into TS 6", tone: "number" }] },
  { label: "R", detail: "logical operations on TS 9, TS 10", bands: [{ from: 5, to: 8, text: "0111", tone: "code" }, { from: 23, to: 28, text: "log. ops", tone: "field" }] },
  { label: "S", detail: "arithmetic into TS 4, TS 5", bands: [{ from: 5, to: 8, text: "1000", tone: "code" }, { from: 10, to: 21, text: "POS CANCEL SELF NOR GIV ERR … ROTATE", tone: "field" }, { from: 24, to: 27, text: "×", tone: "number" }] },
  { label: "T", detail: "stimulate a valve element", bands: [{ from: 5, to: 8, text: "1001", tone: "code" }, { from: 18, to: 23, text: "valve element", tone: "number" }] },
];

function Ruler() {
  return <div className="ace-word-row ace-word-ruler" aria-hidden="true"><span className="ace-word-label"/>{DIGITS.map(k => <span key={k} style={{ gridColumn: k + 1 }}>{k}</span>)}</div>;
}

export function AceWordFigure() {
  return <figure className="ace-figure ace-word">
    <div className="ace-word-grid" role="table" aria-label="The digits of an instruction, after Fig. 19 of the report">
      <Ruler/>
      {WORD_ROWS.map(row => <div className="ace-word-row" role="row" key={row.label} title={row.detail}>
        <span className="ace-word-label" role="rowheader">{row.label}</span>
        {row.bands.map(band => <span role="cell" key={band.from} className={`ace-band ace-band-${band.tone || "field"}`} style={{ gridColumn: `${band.from + 1} / ${band.to + 2}` }}>{band.text}</span>)}
      </div>)}
    </div>
    <figcaption className="record-voice">THE 32 DIGITS OF A MINOR CYCLE, DIGIT 1 FIRST. REDRAWN AFTER FIG. 19, “MEANINGS OF DIGITS IN MINOR CYCLES” · <a href={ARCHIVE}>THE ORIGINAL, TURING ARCHIVE ↗</a></figcaption>
  </figure>;
}

/** One card of Fig. 38: the digits drawn on it, as (first digit, digits). */
type Card = { shown: [number, string][]; words?: string; popular: string; differs?: { digits: number[]; table: string; card: string } };

/** Fig. 38, "Instruction cards for INDEXIN (genuine input)", transcribed,
 * with the instruction of the printed table each card is meant to be. */
const CARDS: Card[] = [
  { shown: [[3, "0"], [5, "0110"], [17, "0000010000000000"]], popular: "Q, 0000,0100,0000,0000" },
  { shown: [[3, "0"], [5, "0011"], [10, "01000"]], popular: "TS 6 - TS 2" },
  { shown: [[3, "0"], [5, "1000"], [10, "110100000000"]], popular: "ADD ‘A’", differs: { digits: [13, 14], table: "0 1", card: "1 0" } },
  { shown: [[3, "0"], [5, "1000"], [10, "0000000001"]], popular: "ROTATE 16" },
  { shown: [[3, "0"], [5, "0010"], [10, "00100"]], popular: "TS 4 - TS 6" },
  { shown: [[3, "0"], [5, "0011"], [10, "10010"]], popular: "TS 6 - TS 9" },
  { shown: [[3, "0"], [5, "0010"], [10, "11011"]], popular: "TS 27 - TS 6" },
  { shown: [[3, "0"], [5, "0011"], [10, "01010"]], popular: "TS 6 - TS 10" },
  { shown: [[3, "0"], [5, "0111"], [23, "000"]], popular: "OR", differs: { digits: [25], table: "1", card: "0" } },
  { shown: [[3, "0"], [5, "0010"], [10, "00100"]], popular: "TS 8 - TS 6", differs: { digits: [12, 13], table: "0 1", card: "1 0" } },
  { shown: [[3, "1"], [17, "1"]], words: "INDEXIN 11", popular: "B, 1, INDEXIN 11" },
  { shown: [[3, "0"], [5, "0011"], [10, "00111"]], popular: "TS 6 - TS 28" },
  { shown: [[3, "1"]], words: "BURY", popular: "B, BURY" },
];

const VERDICT: Record<string, string> = {
  "ADD ‘A’": "The card has NOR on and GIV off: a different multiplier.",
  "OR": "The card has the code for AND.",
  "TS 8 - TS 6": "The card moves TS 4.",
};

export function AceCardsFigure({ caption }: { caption?: ReactNode }) {
  return <figure className="ace-figure ace-cards">
    <div className="ace-cards-grid" role="table" aria-label="The thirteen cards of Fig. 38 against the table INDEXIN">
      <div className="ace-word-row ace-word-ruler" aria-hidden="true"><span className="ace-word-label"/>{DIGITS.map(k => <span key={k} style={{ gridColumn: k + 1 }}>{k}</span>)}<span className="ace-card-popular" style={{ gridColumn: 34 }}>THE TABLE SAYS</span></div>
      {CARDS.map((card, n) => {
        const digits = new Map<number, string>();
        for (const [first, text] of card.shown) [...text].forEach((c, i) => digits.set(first + i, c));
        return <div role="row" key={n} className={`ace-word-row${card.differs ? " ace-card-differs" : ""}`}>
          <span className="ace-word-label" role="rowheader">{n + 1}</span>
          {[...digits].map(([k, c]) => <span role="cell" key={k} style={{ gridColumn: k + 1 }}
            className={card.differs?.digits.includes(k) ? "ace-digit ace-digit-wrong" : "ace-digit"}
            title={card.differs?.digits.includes(k) ? `digit ${k}: the card has ${c}, the table needs ${c === "1" ? "0" : "1"}` : undefined}>{c}</span>)}
          {card.words && <span role="cell" className="ace-card-words" style={{ gridColumn: "19 / 34" }}>← {card.words} →</span>}
          <span role="cell" className="ace-card-popular" style={{ gridColumn: 34 }}>{card.popular}{card.differs && <em>{VERDICT[card.popular]}</em>}</span>
        </div>;
      })}
    </div>
    <figcaption className="record-voice">{caption || <>INDEXIN AS THIRTEEN CARDS, “GENUINE INPUT”. A BLANK IS A DIGIT NOT SHOWN BECAUSE IT IS “NOT SIGNIFICANT”. MARKED: WHERE THE CARD DISAGREES WITH THE TABLE. REDRAWN AFTER FIG. 38 · <a href={ARCHIVE}>THE ORIGINAL, TURING ARCHIVE ↗</a></>}</figcaption>
  </figure>;
}

/** INDEXIN in popular form, as section 13 prints it, set as text. */
export const INDEXIN_PRINTED = `INDEXIN
  1   Q, 0000,0100,0000,0000     2
  2   TS 6 - TS 2                3
  3   ADD 'A'                    4
  4   ROTATE 16                  5
  5   TS 4 - TS 6                6
  6   TS 6 - TS 9                7
  7   TS 27 - TS 6               8
  8   TS 6 - TS 10               9
  9   OR                        10
 10   TS 8 - TS 6               11
 11   B,1, INDEXIN 11
 12   TS 6 - TS 28              13
 13   B, BURY`;

/** CALPOL as section 13 prints it, set as text. */
export const CALPOL_PRINTED = `CALPOL 1. Clear TS 22, 23; DL 1, 14 - TS 27;
DL 1,15 - TS 29. CALPOL 8
CALPOL 8. B, BURY; B, INDEXIN; TS 28 - TS 18; B, BURY; B, PLUSIND;
B, BURY; B, INDEXIN; TS 28 - TS 19; B, BURY; B, ADD; B, BURY;
B, PLUSIND; TS 27 - TS 2; TS 29 - TS 3; AND; Q, CALPOL 40;
TS 6 - TS 15; Q, CALPOL 37; TS 6 - TS 16; B, BURY; B, DISCRIM; B, 1
CALPOL 37. TS 13 - TS 18; TS 14 - TS 19; B, BURY; B, TRANS 45;
B, BURY; B, MULTIP; B, BURY; B, TRANS 45. CALPOL 49.
CALPOL 49. B, CALPOL 8.
CALPOL 50. TS 22 - TS 25; TS 23 - TS 26; B, UNBURY.`;

/** A table quoted from the report, set as text, with its place in the report. */
export function AceQuoted({ text, caption }: { text: string; caption: string }) {
  return <figure className="ace-figure ace-quoted">
    <pre>{text}</pre>
    <figcaption className="record-voice">{caption} · <a href="https://en.wikisource.org/wiki/Proposed_Electronic_Calculator">THE REPORT, WIKISOURCE ↗</a></figcaption>
  </figure>;
}
