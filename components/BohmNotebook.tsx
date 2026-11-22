import type { ReactNode } from "react";
import type { PublicationRecord } from "@/lib/types";
import { StudyMeasures, StudySequence } from "@chrishayuk/hause/components/exhibition/Study";
import { NotebookEntry } from "./NotebookEntry";
import { Acts } from "./Acts";
import { BohmRunner } from "./BohmRunner";

const THESIS = "https://www.research-collection.ethz.ch/handle/20.500.11850/132662";
const KNUTH = "http://bitsavers.org/pdf/stanford/cs_techReports/STAN-CS-76-562_EarlyDevelPgmgLang_Aug76.pdf";

const KNUTH_FORMULA = "π' → A\n((a:(b·c))+((d∩e)∸f)) → g\nΩ → π";
const ECHO = "π' → A\n? → a\na → ?\nΩ → π";
const EUCLID = "π' → A\n? → a\n? → b\na∪b → M\na∩b → m\nB → π\n\nπ' → B\nM mod m → r\n{[(1 ∸ r)·C] + [(1 ∩ r)·D]} → π\n\nπ' → C\nm → ?\nΩ → π\n\nπ' → D\nm → M\nr → m\nB → π";

/** An excerpt from a scanned page, credited to the page it came from. */
function Excerpt({ src, alt, width, height, caption, href, source }: { src: string; alt: string; width: number; height: number; caption: ReactNode; href: string; source: string }) {
  return <figure className="bohm-excerpt">
    <img src={`/media/notebook/bohm/${src}`} alt={alt} width={width} height={height} loading="lazy"/>
    <figcaption className="record-voice">{caption} · <a href={href}>{source} ↗</a></figcaption>
  </figure>;
}

/** The note in pictures: the pages it quotes, and the language running where it is described. */
export function BohmNotebook({ record }: { record: PublicationRecord }) {
  const act = (index: number) => <Acts acts={[record.body[index]]} anchored offset={index} staticRefusals/>;
  return <NotebookEntry record={record} className="bohm-notebook" chapters={[
    { label: "A compiler on paper", children: <>
      <Excerpt src="thesis-title.jpg" width={1200} height={1239} href={THESIS} source="ETH ZÜRICH"
        alt="The title page: Calculatrices digitales, du déchiffrage de formules logico-mathématiques par la machine même dans la conception du programme, thesis presented at the École Polytechnique Fédérale, Zurich, by Corrado Böhm, Bologna."
        caption="BÖHM, 1954 PRINTING, TITLE PAGE"/>
      {act(0)}
    </> },
    { label: "The language in five lines", children: <>
      <StudySequence label="EVERY STATEMENT IS AN ASSIGNMENT" steps={[
        { label: "READ", value: "? → n", detail: "The question mark is the outside world. On the left of the arrow it is the next number on the input tape." },
        { label: "CALCULATE", value: "n ∸ 1 → n", detail: "There are no negative numbers. The dotted minus stops at zero." },
        { label: "PRINT", value: "n → ?", detail: "On the right of the arrow, the question mark is the output tape." },
        { label: "GO", value: "B → π", detail: "π holds the group to continue at. A jump is an assignment to it. Ω → π stops." },
        { label: "CHOOSE", value: "(1 ∩ n)·C → π", detail: "The smaller of 1 and n is 1 or 0. Times C, that is C or nowhere." },
      ]} note="That is the whole language. A line π′ → B names the group that begins there."/>
      <BohmRunner label="TRY IT / CHANGE IT AND RUN AGAIN" input="5" program={"π' → A\n? → n\n\nπ' → B\nn → ?\n(1 ∩ n)·C → π\n\nπ' → C\nn ∸ 1 → n\nB → π"}
        note="Group B prints n and continues at C unless n is 0. You can type -> for →, pi for π and - for ∸."/>
    </> },
    { label: "A choice is a sum", children: <>
      <Excerpt src="thesis-euclid.jpg" width={1600} height={828} href={THESIS} source="ETH ZÜRICH"
        alt="Section 3.4 of the thesis: Euclid's algorithm for the greatest common divisor, with the explanation of groups A to D in French on the left and their formulas on the right. Group B ends with a formula in curly brackets that assigns to π."
        caption="BÖHM, 1954 PRINTING, P. 25 / EUCLID’S ALGORITHM"/>
      <BohmRunner label="THE PROGRAM ON THAT PAGE" input="1071 462" program={EUCLID}
        note="The last line of group B is the choice. 1 ∸ r is 1 when the remainder is 0, and 1 ∩ r is 1 when it is not. Exactly one of them is ever 1."/>
    </> },
    { label: "Three readings", children: <>
      {act(1)}
      <BohmRunner label="EUCLID, ALL THREE WAYS" input="1071 462" program={EUCLID} args={["verify", "-"]}
        note="The first line reads the formulas as algebra. The next two run instruction numbers on the machine: one set from the second compiler, one from Böhm’s."/>
    </> },
    { label: "As printed", children: <>
      <BohmRunner label="THE SIMPLEST PROGRAM, THROUGH THE COMPILER AS PRINTED" program={ECHO} args={["compile", "-", "--via", "bohm", "--compiler", "algebra", "--errata", "none"]}
        note="Each line is an address, a fourteen-digit number in four parts, and what it means. The second part should be 05, the code for a copy."/>
      <Excerpt src="thesis-group-e.jpg" width={1600} height={224} href={THESIS} source="ETH ZÜRICH"
        alt="Group E′ of the compiler: the formula h times m3 plus k becomes question mark, then A becomes π."
        caption="BÖHM, 1954 PRINTING, P. 43 / GROUP E′"/>
      {act(2)}
    </> },
    { label: "Two branches at once", children: <>
      <Excerpt src="thesis-group-c.jpg" width={1600} height={334} href={THESIS} source="ETH ZÜRICH"
        alt="Group C of the compiler. Its last formula is: the smaller of 1 and r minus 1, times D, plus the smaller of 1 and r, times E, plus 1 minus r, times F, becomes π."
        caption="BÖHM, 1954 PRINTING, P. 40 / GROUP C"/>
      {act(3)}
      <StudyMeasures label="THE THREE MULTIPLIERS IN GROUP C" items={[
        { label: "r = 0, A CLOSING PARENTHESIS", value: "0, 0, 1", detail: "Continue at F." },
        { label: "r = 1, AN OPENING PARENTHESIS", value: "0, 1, 0", detail: "Continue at E." },
        { label: "r = 2, 3 OR 4, ANYTHING ELSE", value: "1, 1, 0", detail: "Continue at D + E, which is no group." },
      ]} note="r is the kind of symbol just read. The multipliers are 1 ∩ (r ∸ 1), 1 ∩ r and 1 ∸ r, as printed."/>
    </> },
    { label: "Knuth’s page", children: <>
      <Excerpt src="knuth-bug.jpg" width={1600} height={312} href={KNUTH} source="STANFORD REPORT"
        alt="A paragraph from Knuth and Trabb Pardo: It appears to be necessary to add one more statement in order to fix a bug in his program, caused by overlaying information when a left parenthesis follows an operator symbol; but even with this patch the compiler is quite elegant."
        caption="KNUTH AND TRABB PARDO, 1976, P. 40"/>
      {act(4)}
      <Excerpt src="knuth-table.jpg" width={1600} height={2023} href={KNUTH} source="STANFORD REPORT"
        alt="Knuth and Trabb Pardo's table following Böhm's algorithm symbol by symbol through one formula, ending with the five instructions punched out in reverse order and the final instruction that stores the result in g."
        caption="KNUTH AND TRABB PARDO, 1976, P. 41 / ONE FORMULA WORKED BY HAND"/>
      <BohmRunner label="THE SAME FORMULA, THROUGH BÖHM’S COMPILER ON THE MACHINE" program={KNUTH_FORMULA} args={["compile", "-", "--via", "bohm"]}
        note="Compare the six lines from 500 to 505 with the bottom of their page. Their circled 1 to 5 are the cells [081] to [085] here."/>
    </> },
    { label: "The fourth needs a machine", kind: "evidence", children: <>
      <StudyMeasures label="ONE FORMULA, THE COMPILER WITH THREE CORRECTIONS" items={[
        { label: "THE COMPILER READ AS ALGEBRA", value: "6", detail: "Six instructions, the ones on Knuth and Trabb Pardo’s page." },
        { label: "THE COMPILER ON THE MACHINE", value: "0", detail: "It stops after the group’s name, with 22 symbols unread." },
        { label: "ON THE MACHINE, ITS X RENAMED", value: "6", detail: "The same six." },
      ]} note="The same formulas and the same input each time. The second is runnable below; the third is the runner above."/>
      <BohmRunner label="THREE CORRECTIONS, ON THE MACHINE" program={KNUTH_FORMULA} args={["compile", "-", "--via", "bohm", "--errata", "store,branch,link"]}
        note="The compiler is now instruction numbers itself, and its own sums and products go through S and X."/>
      {act(5)}
    </> },
    { label: "It compiles itself", kind: "evidence", children: <>
      <BohmRunner label="BÖHM’S COMPILER, GIVEN ITS OWN TEXT" args={["selfhost"]}
        note="Stage 0 reads the compiler as algebra. Stages 1 and 2 are instruction numbers on the machine. The stages alternate two layouts of memory, because the compiler keeps its record of open parentheses where the code it writes keeps intermediate results."/>
      {act(6)}
    </> },
    { label: "Run it yourself", kind: "operate", children: <>{act(7)}</> },
    { label: "What this does not show", children: <>
      {act(8)}
      {act(9)}
    </> },
  ]}/>;
}
