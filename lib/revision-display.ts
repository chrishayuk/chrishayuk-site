import type { Revision } from "../vendor/hause/provenance.ts";

/** Editorial corrections to how a past version's change summary is shown.
 *
 * The stored summary in content/publication-provenance.json is the record and
 * is never rewritten: the provenance audit holds it append-only. This layer
 * changes only what the publication history displays, and says so where it is
 * shown. The machine-readable history keeps the stored summary beside it. */
export type DisplayAmendment = { summary: string; amended: string; note: string };

const AGENT_NOTE = "Display amended: the statements about how the work was done were removed. The stored summary is unchanged.";

export const revisionDisplayAmendments: Record<string, DisplayAmendment> = {
 "N-ABSYS@1.0": { amended: "2026-11-27", note: AGENT_NOTE, summary: "First published: Absys, the assertional language of Foster, Elcock and their colleagues at Aberdeen, rebuilt from the papers of 1968, 1969 and 1990; Elcock's binding environments for append and reverse reproduced variable for variable, suspended equations included, and the 1969 triples in the paper's order; every order of a seven-assertion text gives one outcome, and of what was tested only not makes the order matter; setdiff, run on inputs chosen here, favours one rule for the order of steps; checked independently against the papers, with three errors and nine overstatements corrected; with a playground that steps through a text an assertion at a time." },
 "N-ATLAS-AUTOCODE@1.0": { amended: "2026-11-27", note: AGENT_NOTE, summary: "First published: Atlas Autocode rebuilt from the 1965 Reference Manual, both compilers and the Flexowriter; the words of all 29 lines of COMPILER AB's page B1.4 reproduced, and the Mini-Manual's binomial table; the listing of p. B1.3 would not compile as printed; reviewed independently, eighteen findings acted on; with a playground that types on a Flexowriter." },
 "N-ALGOL-60@1.0": { amended: "2026-11-27", note: AGENT_NOTE, summary: "First published: ALGOL 60 from the 1962 Revised Report, and the Dijkstra–Zonneveld system for the Electrologica X1 rebuilt from its documents; 39 probes against the real compiler on Vakulenko's simulator, and 80 of the 82 numbers of the X1's own 1964 output for Zonneveld's outer planets reproduced, the other two last digits just above a decimal tie; with a playground that runs each program both ways." },
 "N-CPL@1.0": { amended: "2026-11-27", note: AGENT_NOTE, summary: "First publication: the preprocessor of Appendix 1 of the 1966 CPL Working Papers run on an interpreter built from those papers, the eleven corrections it needed, and the limits of a single reading" },
 "N-GEORGE@1.0": { amended: "2026-11-27", note: AGENT_NOTE, summary: "First publication: GEORGE rebuilt from Hamblin's 1958 manual, Example 3's factor-of-four erratum, and his own GEORGE IA transcribed from 22 coding sheets and run on a simulated DEUCE, agreeing with the interpreter word for word, with the four sheet/flow-diagram contradictions and the limits of the reading" },
 "N-TURING-ACE@1.1": { amended: "2026-11-27", note: AGENT_NOTE, summary: "Corrections are now given by kind: INDEXIN's three are slips; of CALPOL's five changes three are slips, one follows the other side of a conflict in the report, and one is needed only because of the UNBURY written for this reconstruction. Adds Turing's caveat that section 13 is 'very incomplete and crude', that Figure 38 was read twice, that CALPOL's endless running is proven, an independent review by a second model which corrected the simulation's timing, and the prior work. The title no longer counts eight corrections." },
 "N-RHIND-PAPYRUS@1.0": { amended: "2026-11-27", note: AGENT_NOTE, summary: "First published, against rhind 0.1.1, after an independent review by a second model that found the 0.1.0 census unsound: 845 of 956 lines of the Rhind papyrus's working, as transcribed, agree with it exactly; the 113 diagnostic records on the rest are 75 part signs (a notation, not counted as errors), 4 ticks and 34 figures, most pointed out by Chace or Peet. Nothing is claimed as new." },
 "N-NINE-CHAPTERS@1.0": { amended: "2026-11-27", note: AGENT_NOTE, summary: "First published, against nine-chapters 542b9ad, after an independent review by a second model that found no mistranscription and made the checker give a false ✓, since fixed, and a literature check by a second model: chapter 8 of the Nine Chapters on the Mathematical Art, as transcribed from the Sibu congkan reprint of the Weiboxie edition, worked on a counting board as the text says; of 39 statements the board reaches on 26 pages, 38 agree, the one that does not being Problem 6 by this edition's signs, which Li Huang corrected and Chemla and Guo (2004) print. The answers are written over one denominator each, not always in lowest terms; Problem 2's 52 is the 法 as the board leaves it, and Hart (2011) relates the denominators to the board. Liu Hui's 77 passage fails as printed; Chemla and Guo emend it and Guo (2020) works it to 77, which was not run here. Nothing is claimed as new." },
};

export type DisplayRevision = { kind: Revision["kind"]; summary: string; amended?: { date: string; note: string } };

/** The summary the history shows for one version: the stored one, unless an editorial correction applies. */
export function displayRevision(id: string, version: string, revision: Revision | undefined): DisplayRevision | undefined {
 if (!revision) return undefined;
 const amendment = revisionDisplayAmendments[`${id}@${version}`];
 return amendment ? { kind: revision.kind, summary: amendment.summary, amended: { date: amendment.amended, note: amendment.note } } : { kind: revision.kind, summary: revision.summary };
}
