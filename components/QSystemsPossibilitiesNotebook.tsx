import type { PublicationRecord } from "@/lib/types";
import { StudyMeasures } from "@chrishayuk/hause/components/exhibition/Study";
import { NotebookEntry } from "./NotebookEntry";
import { Acts } from "./Acts";
import Link from "next/link";
import { QSystemsRunner } from "./QSystemsPlayground";

const C70 = "http://alain.colmerauer.free.fr/alcol/ArchivesPublications/SystemesQ/SystemesQ.pdf";

/** n independent choices between A and B, as a graph of strings, after an
 * arrow S if `start`. Written so that every path into a vertex comes before
 * every path out of it (C70 p. 20). */
function choices(n: number, start = false): string {
  const o = start ? 1 : 0;
  const parts = start ? ["-0- S -1-"] : [];
  for (let i = 0; i < n; i++) parts.push(`-${i + o}- A -${i + o + 1}-`, `-${i + o}- B -${i + o + 1}-`);
  return parts.join(" ");
}

const RELABEL = `** EACH ARROW ON ITS OWN.
A == X.
B == Y.`;

const PARITY = `** THE PARITY OF THE NUMBER OF A, CARRIED FROM S.
S + A == O.
S + B == E.
E + A == O.
E + B == E.
O + A == E.
O + B == O.`;

const CARRY = `** EVERY WORD COPIED TO A NEW LABEL, AND THE PAIR RULE.
A == X.
B == Y.
A + B == C.`;

const TWO_TO_ONE = `** TWO WORDS TO ONE, THEN THE SAME SYSTEM INVERTED.
A == X.
B == X.
-REQ- -INV-
A == X.
B == X.`;

/** The report's definition of a phase, as printed. */
function Quote({ french, english, page }: { french: string; english: string; page: string }) {
  return <figure className="qsystems-quote">
    <blockquote lang="fr">{french}</blockquote>
    <p>{english}</p>
    <figcaption className="record-voice">COLMERAUER 1970, {page} · <a href={C70}>THE REPORT ↗</a></figcaption>
  </figure>;
}

/** The second note: the reconstructed machine measured, and two variants of it kept apart. */
export function QSystemsPossibilitiesNotebook({ record }: { record: PublicationRecord }) {
  const act = (index: number) => <Acts acts={[record.body[index]]} anchored offset={index} staticRefusals/>;
  return <NotebookEntry record={record} className="qsystems-notebook" chapters={[
    { label: "A trillion strings in 80 arrows", children: <>
      {act(0)}
      <StudyMeasures label="WORK ON A SHARED GRAPH, THE HISTORICAL MACHINE" items={[
        { label: "A == X. B == Y., 40 CHOICES", value: "80", detail: "Applications, on 1,099,511,627,776 strings. The graph after: 80 arrows, the same number of strings." },
        { label: "A + B == C., 40 CHOICES", value: "39", detail: "Applications. It leaves 2 strings; see below." },
        { label: "A == X. A == Y., FORTY A", value: "80", detail: "Applications. One string in, 2⁴⁰ out." },
        { label: "THE REPORT’S GRAMMAR, 14 EMBEDDED CLAUSES", value: "2,760", detail: "Arrows, holding 9,565,938 sentences, made in 3,108 applications." },
      ]} note="QSYS-E08 and E10 in docs/research.md; tests/research.rs asserts every number."/>
      <QSystemsRunner label="EACH ARROW ON ITS OWN, ON TEN CHOICES" program={RELABEL} data={choices(10)}
        note="Twenty applications, and the graph after carries the same 1,024 strings, relabelled."/>
    </> },
    { label: "Two results, 8,190 applications", kind: "evidence", children: <>
      <Quote page="P. 22"
        french="On ajoute donc au graphe le tout nouveau chemin […]"
        english="So the brand-new path is added to the graph […]"/>
      {act(1)}
      <StudyMeasures label="CARRIED ALONG THE STRING, TWELVE CHOICES" items={[
        { label: "PARITY", value: "8,190", detail: "Applications for 2 different results. 8,166 of the arrows made repeat one already made." },
        { label: "EACH STRING PACKED INTO ONE TREE", value: "8,190", detail: "Applications for 4,096 different results." },
        { label: "R(A*,B*) + R(B*,C*) == R(A*,C*)., SEVEN FACTS", value: "132", detail: "Copies of R(A,H), one for each bracketing: the Catalan number C₆." },
        { label: "EQUAL ARROWS IN THE REPORT’S OWN EXAMPLES", value: "0", detail: "So its printouts cannot say whether the lost program merged them." },
      ]} note="QSYS-E08 and E11."/>
      <QSystemsRunner label="PARITY ON SIX CHOICES" example="e08-parity"
        note="126 applications. The graph after holds 64 arrows from the entry to the exit, each O or E."/>
      <p className="qsystems-play-link record-voice"><Link href="/demos/q-systems?example=e08-parity">STEP THROUGH IT ↗</Link><span>Watch the same O made again for every path that reaches it.</span></p>
    </> },
    { label: "A machine that merges", kind: "evidence", children: <>
      {act(2)}
      <StudyMeasures label="APPLICATIONS, THE REPORT’S MACHINE AGAINST ONE THAT MERGES EQUAL ARROWS" items={[
        { label: "PARITY, TWELVE CHOICES", value: "8,190 → 46", detail: "4,096 arrows left, or 2. With the record of what made each, the 4,096 derivations can still be counted." },
        { label: "SEVEN FACTS COMPOSED", value: "294 → 56", detail: "R(A,H) 132 times, or once, its 132 derivations recorded." },
        { label: "EACH STRING PACKED", value: "8,190 → 8,190", detail: "Every result is different, so there is nothing to merge." },
        { label: "A == A.", value: "∞ → 1", detail: "It never stops; merged, it empties the graph. So do A + B == A + B. and A == X. X == A." },
      ]} note="QSYS-E11 and E12. The merging machine is src/experimental.rs, not Colmerauer’s; with merging off it is checked against the historical one."/>
    </> },
    { label: "A rule takes its neighbours", kind: "evidence", children: <>
      {act(3)}
      <QSystemsRunner label="A + B == C. ON FOUR CHOICES" example="e09-pair"
        note="Sixteen strings in; two out, B + C + A and C + C. A + A + A + A had no A + B, and is gone."/>
      <QSystemsRunner label="THE SAME, WITH EVERY WORD COPIED TO A NEW LABEL" program={CARRY} data={choices(4)}
        note="All sixteen come through as X and Y, beside every string with C: 29 in all."/>
    </> },
    { label: "The loss is the point", kind: "evidence", children: <>
      {act(4)}
      <StudyMeasures label="STRINGS LEFT, PURIFIED BY ARROWS (THE REPORT) AND BY STRINGS (AN EXPERIMENT)" items={[
        { label: "A + B == C., TEN CHOICES", value: "2 / 1,024", detail: "In 11 arrows, or 69." },
        { label: "THE ANALYSIS OF PAGE 38", value: "1 / 72", detail: "The tree, or the tree and every partial analysis." },
        { label: "THE EXAMPLE OF SECTION 8", value: "1 / 8", detail: "S(1,1,1), or S(1,1,1) and seven partial ones." },
        { label: "THE CUL-DE-SAC, PP. 30–31", value: "0 / 2", detail: "Nothing, as the report says, or /CUL + /DESAC and /CULDE + /SAC." },
      ]} note="QSYS-E13."/>
    </> },
    { label: "What -INV- can undo", kind: "evidence", children: <>
      {act(5)}
      <QSystemsRunner label="TWO WORDS TO ONE, AND BACK" program={TWO_TO_ONE} data="-0- A + B + A -1-"
        note="Phase 1 gives X + X + X. Phase 2, the same system inverted, gives all eight strings of A and B, not the one that was there."/>
    </> },
    { label: "Other computations", kind: "evidence", children: <>
      {act(6)}
      <QSystemsRunner label="ONE STEP OF RULE 110, LEFT TO RIGHT INTO AN ACCUMULATOR" example="e15-rule110"/>
      <QSystemsRunner label="COMPOSING A RELATION" example="e15-relations"
        note="Three facts in a row give R(A,D) twice, once for each bracketing. Out of order, or side by side as alternatives, they are never joined."/>
    </> },
    { label: "Run it yourself", kind: "operate", children: <>
      <QSystemsRunner label="PARITY, TO EDIT" program={PARITY} data={choices(4, true)}
        note="Add choices to the data and the applications double each time. Change the rules so that they carry something with more than two values."/>
      {act(7)}
    </> },
    { label: "What this does not show", children: <>
      {act(8)}
      {act(9)}
    </> },
  ]}/>;
}
