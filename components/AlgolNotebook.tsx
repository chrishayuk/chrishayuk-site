import type { ReactNode } from "react";
import type { PublicationRecord } from "@/lib/types";
import { StudyMeasures, StudySequence } from "@chrishayuk/hause/components/exhibition/Study";
import { NotebookEntry } from "./NotebookEntry";
import { Acts } from "./Acts";
import Link from "next/link";
import { AlgolRunner } from "./AlgolRunner";

const RULES = `begin
  procedure show(x);
  begin outinteger(1, x); outstring(1, "\\n") end;
  integer n;
  n := 3;
  show(n)
end`;

const ZERO = `begin
  real a, b;
  a := 0;
  if a = 0 then outstring(1, "a = 0\\n") else outstring(1, "a is not 0\\n");
  b := 1 / 0;
  if b > 1.0⏨300 then outstring(1, "1/0 is more than 10 to the 300th\\n")
end`;

const HALVES = `begin
  integer x;
  x := 7 / 2; outinteger(1, x);
  x := -5 / 2; outinteger(1, x)
end`;

/** A detail of a printed page, credited to where it came from. */
function Excerpt({ src, alt, width, height, caption, href, narrow }: { src: string; alt: string; width: number; height: number; caption: ReactNode; href: string; narrow?: boolean }) {
  return <figure className={narrow ? "algol-excerpt algol-excerpt-narrow" : "algol-excerpt"}>
    <img src={`/media/notebook/algol-60/${src}`} alt={alt} width={width} height={height} loading="lazy"/>
    <figcaption className="record-voice">{caption} · <a href={href}>THE SCAN ↗</a></figcaption>
  </figure>;
}

/** The note in pictures: the pages it rests on, and both ALGOLs running where they are described. */
export function AlgolNotebook({ record }: { record: PublicationRecord }) {
  const act = (index: number) => <Acts acts={[record.body[index]]} anchored offset={index} staticRefusals/>;
  return <NotebookEntry record={record} className="algol-notebook" chapters={[
    { label: "Man or boy", children: <>
      <Excerpt src="knuth-ab17-p7-man-or-boy.jpg" width={900} height={857} narrow href="https://archive.computerhistory.org/resources/text/algol/algol_bulletin/A17/A17P7.GIF"
        alt="Knuth’s letter to the Algol Bulletin, 1964: a ten-line ALGOL 60 program in which procedure A calls itself through a local procedure B, and his conjecture, by hand calculation and probably wrong, that the answer is 73 − 119 − 177 + 102 = −121."
        caption="ALGOL BULLETIN 17, JULY 1964, P. 7"/>
      {act(0)}
      <AlgolRunner label="KNUTH’S PROGRAM, AS PRINTED" example="man-or-boy-1964"
        note="Both give −67. The X1 column warns that five parameters are not specified, which its manual forbade; its compiler accepted it anyway, as the next section says. It runs deep: in some browsers it is run on the page rather than in the background."/>
      <p className="algol-play-link record-voice"><Link href="/demos/algol-60">OPEN THE ALGOL 60 PLAYGROUND ↗</Link><span>Write ALGOL 60 and run it both ways.</span></p>
    </> },
    { label: "The first implementation", children: <>{act(1)}</> },
    { label: "Rules, not checks", children: <>
      {act(2)}
      <AlgolRunner label="A PROCEDURE BEFORE A VARIABLE, AND A PARAMETER WITHOUT A TYPE" program={RULES}
        note="Two of the 23 rules broken: procedures were to come after variables (property 15), and every parameter was to be specified (property 19). The real compiler compiles it. --x1 runs it and warns."/>
    </> },
    { label: "Where the X1 parts from the Report", children: <>
      <StudySequence label="THE SAME PROGRAM, TWO MEANINGS" steps={[
        { label: "THE STEP", value: "once, first", detail: "In for i := A step B until C, the X1 worked B out once each time round, and the first time before i := A. The Report: twice each time round, after." },
        { label: "VALUE PARAMETERS", value: "spec order", detail: "Evaluated in the order of the specifications, not the order the parameters are written." },
        { label: "NAMES", value: "9 characters", detail: "abcdefghiX and abcdefghiY are the same name." },
        { label: "INTEGER PROCEDURES", value: "1.5", detail: "The value is whatever the arithmetic gave this time, so an integer procedure can return 1.5." },
        { label: "STORED REALS", value: "40 bits", detail: "x := 1/3; x − 1/3 is about 1.5⏨−13, not 0." },
      ]} note="Each is one of the 23 properties of the X1 manual, numbered in the repository."/>
      {act(3)}
      <AlgolRunner label="ONE LINE FOR EACH WAY THEY PART" example="x1-probes"
        note="Every line differs. Each line begins with the number of the manual’s property it tests, or 3.2, the section of Kruseman Aretz’s X1–X8 comparison on how values were stored."/>
    </> },
    { label: "A real is never zero", children: <>
      {act(4)}
      <AlgolRunner label="ZERO, AND DIVIDING BY IT" program={ZERO}
        note="The Report stops at 1/0. The X1 divides by its least positive number and stores the greatest real there is."/>
    </> },
    { label: "Against the real compiler", kind: "evidence", children: <>
      <StudyMeasures label="39 PROBES, RUN ON --x1 AND ON THE REAL COMPILER" items={[
        { label: "DECIDED BY THE COMPILER", value: "14 of 14", detail: "Agree. Order of evaluation, names, declarations, what is accepted." },
        { label: "DECIDED BY BOTH HALVES", value: "7 of 7", detail: "Agree. Switches, name parameters, the for statement’s step." },
        { label: "DECIDED BY THE RUN-TIME", value: "12 of 18", detail: "Agree. In the 6 that do not, the X1 manual’s words are on the side of --x1." },
      ]} note="The simulator’s run-time is a reconstruction too, so only the first row is evidence about the X1 itself."/>
      {act(5)}
    </> },
    { label: "What the X1 printed in 1964", kind: "evidence", children: <>
      <Excerpt src="tract8-p106-printout.jpg" width={900} height={1258} narrow href="https://ir.cwi.nl/pub/13099"
        alt="A page of X1 output from Zonneveld’s thesis: the heading JAZ164, R743, Outer Planets; fifteen pairs of floating-point numbers, the starting positions and velocities; six masses, the last printed as a plus sign and 0; the gravitational constant; eps = +.10⏨−7; and the positions of Jupiter, Saturn, Uranus, Neptune and Pluto at three times."
        caption="ZONNEVELD, MC TRACT 8, 1964, P. 106 / THE RUN WITH PLUTO’S MASS SET TO 0"/>
      <StudyMeasures label="THE FIRST RUN, PP. 103–104, AGAINST --x1" items={[
        { label: "NUMBERS ON THE PAGE", value: "82", detail: "Starting values, masses, and the five planets at three times." },
        { label: "THE SAME, DIGIT FOR DIGIT", value: "80", detail: "Including the layout: sign in the first column, two-digit exponents." },
        { label: "ONE LOWER IN THE LAST DIGIT", value: "2", detail: "6.641455425 and 16.281370896. Both lie just above a decimal tie." },
      ]} note="The comparison is a test in the repository, tests/x1.rs, so it is checked on every change."/>
      {act(6)}
      <Excerpt src="tract8-p106-first-positions.jpg" width={1100} height={297} href="https://ir.cwi.nl/pub/13099"
        alt="The first block of positions: T = 2430000.5, and rows J, S, U, N and P with three coordinates each. Saturn’s first coordinate is + 6.641455425."
        caption="P. 106 / SATURN’S x IS AN INPUT VALUE, 6.64145542550, PRINTED TO NINE DECIMALS: 6.641455425"/>
      <AlgolRunner label="THE OUTER PLANETS, AGAINST THE X1’S PAGE" example="jaz164" only="x1" with1964
        note="Two lines differ, each in one last digit. Change nothing and it is the same every time: this is the interpreter of the repository, not a recording."/>
    </> },
    { label: "What the page corrected", children: <>
      <Excerpt src="dijkstra-course-p17-18-seven-halves.jpg" width={1000} height={280} href="https://ir.cwi.nl/pub/9606"
        alt="A passage in Dutch from Dijkstra’s course: assigning a real to an integer variable implies rounding to the nearest integer, and the program stops if that lies outside the range of integers; because of the finite precision of reals, for an integer x the effect of x := 7/2 is undefined: x can just as well become 3 as 4."
        caption="DIJKSTRA, CURSUS PROGRAMMEREN IN ALGOL 60, 1962, PP. 17–18"/>
      {act(7)}
      <AlgolRunner label="HALVES" program={HALVES}
        note="The Report rounds by entier(x + 0.5): 4 and −2. --x1 rounds a half away from zero: 4 and −3. The X1 itself promised neither."/>
    </> },
    { label: "Run it yourself", kind: "operate", children: <>{act(8)}</> },
    { label: "What this does not show", children: <>
      {act(9)}
      {act(10)}
    </> },
  ]}/>;
}
