import type { ReactNode } from "react";
import type { PublicationRecord } from "@/lib/types";
import { StudyMeasures } from "@chrishayuk/hause/components/exhibition/Study";
import { NotebookEntry } from "./NotebookEntry";
import { Acts } from "./Acts";
import Link from "next/link";
import { QSystemsRunner } from "./QSystemsPlayground";

const C70 = "http://alain.colmerauer.free.fr/alcol/ArchivesPublications/SystemesQ/SystemesQ.pdf";
const T72 = "https://softwarepreservation.computerhistory.org/prolog/montreal/src/Findeisen-Bellert-TAUM-1972.pdf";
const C70_CREDIT = "A. COLMERAUER, LES SYSTÈMES-Q, UNIVERSITÉ DE MONTRÉAL, 1970";
const T72_CREDIT = "I. FINDEISEN-BELLERT, TAUM SESSION, C. 1972 · COMPUTER HISTORY MUSEUM, GIFT OF JANUSZ BIEŃ";

/** The cul-de-sac rules of p. 30, given a graph whose two strings share nothing. */
const CUL_DE_SAC = `** C70 PAGES 30 AND 31: THE CUL-DE-SAC.
LE + FAIT + QUE + LE + FAIT + QUE == /CUL + /DE + /SAC.
/CUL + /DE == /CULDE. /DE + /SAC == /DESAC.`;

/** The example of section 8, p. 27, to edit. */
const ABC = `** C70 PAGE 27: EXEMPLE DE SYSTEME-Q.
A* + A*(U*) == A*(1,U*) / A* -DANS- A,B,C.
A(U*) + B(U*) + C(U*) == S(1,U*).`;

/** A detail of a scanned page, credited to the document it came from. */
function Excerpt({ src, alt, width, height, caption, narrow, taum }: { src: string; alt: string; width: number; height: number; caption: ReactNode; narrow?: boolean; taum?: boolean }) {
  return <figure className={narrow ? "qsystems-excerpt qsystems-excerpt-narrow" : "qsystems-excerpt"}>
    <img src={`/media/notebook/q-systems/${src}`} alt={alt} width={width} height={height} loading="lazy"/>
    <figcaption className="record-voice">{caption} · {taum ? T72_CREDIT : C70_CREDIT} · <a href={taum ? T72 : C70}>THE SCAN ↗</a></figcaption>
  </figure>;
}

/** A sentence of the report, as printed, with an English rendering. */
function Quote({ french, english, page }: { french: string; english: string; page: string }) {
  return <figure className="qsystems-quote">
    <blockquote lang="fr">{french}</blockquote>
    <p>{english}</p>
    <figcaption className="record-voice">COLMERAUER 1970, {page} · <a href={C70}>THE REPORT ↗</a></figcaption>
  </figure>;
}

/** The note in pictures: the report's own pages, and its examples running where the note describes them. */
export function QSystemsNotebook({ record }: { record: PublicationRecord }) {
  const act = (index: number) => <Acts acts={[record.body[index]]} anchored offset={index} staticRefusals/>;
  return <NotebookEntry record={record} className="qsystems-notebook" chapters={[
    { label: "A graph of every grouping", children: <>
      <Excerpt src="cover.jpg" width={900} height={1170} narrow
        alt="The cover of the report: Université de Montréal, Les systèmes-Q ou un formalisme pour analyser et synthétiser des phrases sur ordinateur, Alain Colmerauer, publication interne no 43, Département d’informatique."
        caption="THE COVER"/>
      {act(0)}
      <Quote page="P. 4"
        french="Pour représenter d’une façon économique cette multitude de groupements, j’utilise un graphe orienté où chaque flèche est surmontée d’une expression parenthésée représentant un arbre."
        english="To represent this multitude of groupings economically, I use a directed graph in which each arrow carries a bracketed expression representing a tree."/>
    </> },
    { label: "A rule adds a path", kind: "evidence", children: <>
      <Excerpt src="p22-two-phases.jpg" width={1300} height={1659}
        alt="Page 22 of the report: a rule a1 + a2 + … + ap == b1 + b2 + … + bq is applied to a path by adding the arrows -j0- b1 -j1- to -jq-1- bq -jq-, through new vertices, so that the new path b1 … bq runs beside a1 … ap between the same two vertices. Then the paragraphs on applying no rule twice to the same path, and on the second phase, the removal of arrows."
        caption="PAGE 22, THE TWO PHASES"/>
      <Quote page="P. 22"
        french="On prend soin de ne pas appliquer plusieurs fois la même règle sur le même chemin et on continue le processus jusqu’à ce qu’il n’y ait plus de règles à appliquer. Si le processus ne converge pas le résultat est indéfini sinon il est indépendant de l’ordre dans lequel on a appliqué les règles."
        english="Care is taken not to apply the same rule more than once to the same path, and the process goes on until there are no more rules to apply. If the process does not converge the result is undefined; otherwise it is independent of the order in which the rules were applied."/>
      {act(1)}
      <Excerpt src="p29-figure.jpg" width={1600} height={532}
        alt="The figure of page 29: the string A A A B B B C C C on a line of arrows; above and below it, brackets for the paths the rules added: two A(1), one A(1,1), the same for B and C, and one S(1,1,1) from the first vertex to the last."
        caption="PAGE 29, THE GRAPH AFTER THE FIRST PHASE"/>
      <QSystemsRunner label="THE EXAMPLE OF SECTION 8, EVERY RULE APPLICATION" example="abc" args={["--det"]}
        note="Each application adds a path beside the one it matched; the arrows it rewrote stay until the phase ends. The second graph has two A, three B and two C, and leaves no S."/>
      <p className="qsystems-play-link record-voice"><Link href="/demos/q-systems?example=abc">STEP THROUGH IT ↗</Link><span>The same phase drawn as page 29 draws it, one application at a time.</span></p>
    </> },
    { label: "One system, both ways", kind: "evidence", children: <>
      <Excerpt src="p36-tree.jpg" width={1300} height={1218}
        alt="The tree of page 36: PI over V(CONSTATE), SN(RICHARD) and PH; that PH over V(ETONNE), a PH of V(DETRUIT), SN(BENOIT) and SN(BEAUCEVILLE), and SN(GAETANE). Below it: the Q-system that follows synthesises a set of paraphrases from a normalised sentence of this type, and the same system, inverted, analyses them and finds the normalised sentence again."
        caption="PAGE 36, THE NORMALISED SENTENCE"/>
      <Quote page="P. 36"
        french="Le même système-q, mais inversé, permet d’analyser ces paraphrases et de retrouver la phrase normalisée qui leur correspond."
        english="The same Q-system, but inverted, makes it possible to analyse these paraphrases and find the normalised sentence that corresponds to them."/>
      <Excerpt src="p37-system.jpg" width={1100} height={2004} narrow
        alt="Page 37: the sixteen rules of the paraphrase system, under the comments FORME ACTIVE OU PASSIVE, NOMINALISATION D UNE PHRASE, FORMES DEFINITIVES DES PREPOSITIONS, NOMS CONCRETS, NOMS ABSTRAITS and VERBES."
        caption="PAGE 37, THE SIXTEEN RULES"/>
      {act(2)}
      <StudyMeasures label="THE PARAPHRASE TREATMENT, AGAINST THE REPORT" items={[
        { label: "ANALYSIS, INVERTED", value: "38 → 1", detail: "Arrows of partial groupings made, and kept. The one kept is the tree of page 36." },
        { label: "SYNTHESIS, AS WRITTEN", value: "139 arrows", detail: "Eighteen sentences in one graph of nineteen vertices. Written out one to a line, they take 282." },
        { label: "THE PRINTOUT, PP. 38–40", value: "35 / 35", detail: "Lines, with the report’s vertex numbers." },
        { label: "EACH PARAPHRASE, ANALYSED", value: "18 / 18", detail: "Every one gives the one tree." },
      ]} note="Each comparison is a test in the repository, tests/historical.rs, which names its page; the counts of arrows are QSYS-E04 in docs/research.md."/>
      <Excerpt src="p38-printout.jpg" width={1400} height={735}
        alt="Part of page 38: after the first phase, -01- PI(V(CONSTATE),SN(RICHARD),PH(V(ETONNE),PH(V(DETRUIT),SN(BENOIT),SN(BEAUCEVILLE)),SN(GAETANE))) + . -02-; after the second, the first six lines of the synthesis graph, from -01- L + ETONNEMENT + DE + GAETANE -02- to -01- LE + FAIT + QUE -05-."
        caption="PAGE 38, THE START OF THE PRINTOUT"/>
      <QSystemsRunner label="THE PARAPHRASE TREATMENT, ALL FOUR PHASES" example="paraphrase"
        note="Phase 1 is the system inverted; phase 2 the same system as written, printed as pages 38 to 40 print it. Phases 3 and 4 put each sentence on a line of its own."/>
      <Excerpt src="p42-synthesis-graph.jpg" width={1600} height={924}
        alt="Page 42, turned to read: the synthesis graph drawn as nested brackets, its vertices numbered 1 to 19, with the words of each path along it, such as L ETONNEMENT DE GAETANE from 1 to 2 and PAR LA DESTRUCTION DE BEAUCEVILLE PAR BENOIT from 2 to 3."
        caption="PAGE 42, THE SYNTHESIS GRAPH, TURNED TO READ"/>
      <QSystemsRunner label="THE EIGHTEEN, EACH ANALYSED BACK" example="e02-round-trip"
        note="Eighteen graphs in one data file, each a sentence of the synthesis. Each leaves the same tree."/>
    </> },
    { label: "The rules of page 30 do not stop", kind: "evidence", children: <>
      <Excerpt src="p30-structured-string.jpg" width={1300} height={948}
        alt="Page 30: the two rules A*(U*) == [(A*) + ](U*) / U* ≠ -NUL-. and ](I*,U*) == I* + ](U*). are used to take a tree apart into a structured string; applied to A(B,C(A,E(F))) they would produce [(A) + B + [(C) + A + [(E) + F + ] + ] + ]. Conversely the two rules [(A*) + ](U*) == A*(U*). and I* + ](U*) == ](I*,U*) / [,] -HORS- I*. find the tree again."
        caption="PAGE 30, THE STRUCTURED STRING"/>
      {act(3)}
      <QSystemsRunner label="THE RULES AS PRINTED, STOPPED AFTER 12 NEW ARROWS" example="structure" args={["--det", "--max-arrows", "12"]}
        note="Application 2: the rule matches the [(A) it has just made."/>
      <QSystemsRunner label="WITH ONE CONDITION THE REPORT DOES NOT HAVE" example="e01-structure-guarded"
        note="-ET- A* -HORS- [,] keeps the brackets out, and the printed string comes out."/>
    </> },
    { label: "A rule rewrites arrows, not strings", kind: "evidence", children: <>
      <Excerpt src="p31-cul-de-sac.jpg" width={1200} height={968}
        alt="Page 31: LE FAIT QUE LE FAIT QUE on a line, with /CUL, /DE and /SAC above it and /CULDE and /DESAC beside them; after the start of the removal only /CULDE and /DESAC are left, leading nowhere, and so at the end of the phase nothing is left."
        caption="PAGE 31, THE CUL-DE-SAC"/>
      {act(4)}
      <QSystemsRunner label="TWO STRINGS THAT SHARE THREE ARROWS" example="e07-shared-arrows"
        note="LE + FAIT + QUE + BENOIT goes with the string the rules were written to remove."/>
      <QSystemsRunner label="TRY IT / THE SAME TWO STRINGS, SHARING NOTHING" program={CUL_DE_SAC}
        data="-0- LE + FAIT + QUE + LE + FAIT + QUE -1- -0- LE + FAIT + QUE + BENOIT -1-"
        note="Written as two separate paths, LE + FAIT + QUE + BENOIT survives. Edit the data and run it again."/>
    </> },
    { label: "Ambiguity costs nothing", kind: "evidence", children: <>
      {act(5)}
      <StudyMeasures label="THE GRAMMAR OF SECTION 11, EVERY SENTENCE" items={[
        { label: "NORMALISED TREES", value: "8,112", detail: "Three verbs, four names, and at most one embedded clause; each of their sentences analyses back to its tree." },
        { label: "SENTENCES", value: "131,424", detail: "All different. No sentence comes from two trees." },
        { label: "ORDERS OF THE RULES", value: "32 / 1", detail: "Orders tried, and printouts they gave: every rotation of every phase, forwards and backwards. The last two phases have one rule each, and the printout is sorted." },
      ]} note="QSYS-E03 and QSYS-E06 in docs/research.md; tests/research.rs asserts the numbers."/>
      <QSystemsRunner label="AN EXPERIMENT, NOT HISTORICAL: TWO READINGS AT ONCE" example="e05-two-readings"
        note="Our grammar, not the report’s. Both readings come out of one analysis, as two arrows between the same two vertices."/>
    </> },
    { label: "The one page that does not match", kind: "evidence", children: <>
      {act(6)}
      <Excerpt src="taum-1972-phase-7.jpg" width={1200} height={390} taum
        alt="Line-printer output of about 1972: PHASE 7, then -01- SENTENCE(S(PHR(GOV(T(PRS3S),OPS,ADJ(TRUE,/,S)),NP1(S(PHR(GOV(T(PRS3S),OPS,V(DOUBT … -02-, folded at a fixed width wherever the line falls."
        caption="PHASE 7 OF A TAUM TREATMENT, THE FORM OF A PRINTED GRAPH"/>
    </> },
    { label: "Run it yourself", kind: "operate", children: <>
      <QSystemsRunner label="THE EXAMPLE OF SECTION 8, TO EDIT" program={ABC} data="-0- A + A + B + B + C + C -1-"
        note="Two of each leaves S(1,1). Make the counts unequal and no S comes out; put -INV- on a line above it all and give it S(1,1,1) as data."/>
      {act(7)}
      <p className="qsystems-play-link record-voice"><Link href="/demos/q-systems">OPEN THE PLAYGROUND ↗</Link><span>Every example of the report and every experiment, a phase at a time.</span></p>
    </> },
    { label: "What this does not show", children: <>
      {act(8)}
      {act(9)}
    </> },
  ]}/>;
}
