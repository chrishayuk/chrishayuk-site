import type { ReactNode } from "react";
import type { PublicationRecord } from "@/lib/types";
import { StudyMeasures } from "@chrishayuk/hause/components/exhibition/Study";
import { NotebookEntry } from "./NotebookEntry";
import { Acts } from "./Acts";
import Link from "next/link";
import { AtlasRunner } from "./AtlasPlayground";

const MANUAL = "https://gtoal.com/history.dcs.ed.ac.uk/archive/docs/Atlas_Autocode_1965.pdf";
const MINI = "http://www.ancientgeek.org.uk/EMAS/Miscellaneous/Atlas_Autocode_Mini_Manual.pdf";

const U = (w: string) => [...w].map(c => c + "̲").join("");

/** Not equal, typed as the Flexowriter typed it: = struck with /. */
const FLEXOWRITER = `${U("begin")}
${U("real")} x
${U("integer")} i
x = 0
${U("cycle")} i = 1, 1, 10
   x = x + .1
${U("repeat")}
print fl(x - 1, 3) ; newline
${U("if")} x ≠ 1 ${U("then")} ${U("caption")} NOTs̸ONEn̸
${U("end")} ${U("of")} ${U("program")}
`;

const STACK = `${U("begin")}
${U("integer")} k
${U("cycle")} k = 1, 1, 3
  ${U("begin")}
  ${U("integer")} j
  print(j, 3, 0)
  j = 10k
  ${U("end")}
${U("repeat")}
newline
${U("end")} ${U("of")} ${U("program")}
`;

/** A detail of a printed page, credited to where it came from. */
function Excerpt({ src, alt, width, height, caption, href, narrow }: { src: string; alt: string; width: number; height: number; caption: ReactNode; href: string; narrow?: boolean }) {
  return <figure className={narrow ? "atlas-excerpt atlas-excerpt-narrow" : "atlas-excerpt"}>
    <img src={`/media/notebook/atlas-autocode/${src}`} alt={alt} width={width} height={height} loading="lazy"/>
    <figcaption className="record-voice">{caption} · <a href={href}>THE SCAN ↗</a></figcaption>
  </figure>;
}

/** The note in pictures: the pages it rests on, and the compiler running where they are described. */
export function AtlasNotebook({ record }: { record: PublicationRecord }) {
  const act = (index: number) => <Acts acts={[record.body[index]]} anchored offset={index} staticRefusals/>;
  return <NotebookEntry record={record} className="atlas-notebook" chapters={[
    { label: "Typed on a Flexowriter", children: <>
      {act(0)}
      <AtlasRunner label="TEN TENTHS, TYPED AS THE MANUAL PRINTS IT" tape={FLEXOWRITER}
        note="Every underlined word was typed, backspaced over and underlined. In Atlas arithmetic ten tenths are not quite one."/>
      <p className="atlas-play-link record-voice"><Link href="/demos/atlas-autocode">OPEN THE FLEXOWRITER ↗</Link><span>Type a program, backspace over it, and see the tape it punches.</span></p>
    </> },
    { label: "Two compilers", children: <>
      {act(1)}
      <AtlasRunner label="THE SAME TWO WORDS OF STACK, TWICE" tape={STACK}
        note="j is never given a value before it is printed. The first time the store is zero; after that it holds what the last block left there, as the manual warns on p. 6.4."/>
    </> },
    { label: "What COMPILER AB printed", kind: "evidence", children: <>
      <Excerpt src="b14-monitor.jpg" width={1000} height={791} href={MANUAL}
        alt="The run-time monitor printed by COMPILER AB: A RUN TIME FAULT HAS OCCURRED AT LINE 33 REAL FN test3, SQRT -VE, then the variables of BLOCK 91, ROUTINE test1, ROUTINE test2 and REAL FN test3, with the lines at which each called the next and the state of each cycle."
        caption="AMENDMENTS FOR COMPILER AB, P. B1.4"/>
      {act(2)}
      <StudyMeasures label="P. B1.4, AGAINST THE REBUILT COMPILER" items={[
        { label: "LINES ON THE PAGE", value: "29", detail: "The program map and the monitor, compared word for word: the page was retyped for the manual." },
        { label: "THE SAME", value: "29", detail: "Serial numbers, line numbers, every value and every cycle." },
        { label: "LEFT OUT", value: "addresses", detail: "The machine addresses and code sizes in the map. No machine code is written here." },
      ]} note="The comparison is a test in the repository, tests/transcripts.rs."/>
      <AtlasRunner label="THE PROGRAM OF P. B1.3, WITH THE PAGE OF P. B1.4 BESIDE IT" example="1965-ab-monitor" compiler="ab"
        note="Run it: the page on the left is printed now, the one on the right in 1965."/>
    </> },
    { label: "One prime", kind: "evidence", children: <>
      <Excerpt src="b13-listing-top.jpg" width={1000} height={464} href={MANUAL}
        alt="The top of the program on p. B1.3: real a, b, c, alpha, a1, a′ in the declarations, and later the line a = 1 ; alpha = 7.663 ; a1 = 10.4 ; a″ = 21.6."
        caption="P. B1.3 / THE DECLARATION HAS a′, THE ASSIGNMENT a″"/>
      {act(3)}
      <AtlasRunner label="THE LISTING OF P. B1.3, AS PRINTED" example="1965-ab-monitor-as-printed" compiler="ab"
        note="COMPILER AB would have stopped here: a fault in the map, and the program not entered."/>
    </> },
    { label: "A line the listing does not have", kind: "evidence", children: <>
      <Excerpt src="mini-p8.jpg" width={876} height={548} narrow href={MINI}
        alt="The page of the Mini-Manual showing COMPILER AB's program map, with line numbers 1, 9, 27, 28, 31, 32, 36 and 37, PROGRAM ENTERED, and the table of binomial coefficients for n from 0 to 5."
        caption="MINI-MANUAL, JULY 1965, P. 8"/>
      {act(4)}
      <AtlasRunner label="THE BINOMIAL COEFFICIENTS, AGAINST THE MINI-MANUAL’S PAGE" example="1965-binomial" compiler="ab"
        note="Eleven of seventeen lines agree. The six that differ are line numbers in the map, each one lower here than on the page."/>
    </> },
    { label: "The first program in the manual", children: <>
      <Excerpt src="p12-c-line.jpg" width={1000} height={260} href={MANUAL}
        alt="Lines of the first program in the Reference Manual: read (nextx); ->1 unless nextx = 999 999; a = ...; b = ...; c = Syy - 2(a*Sxy + b*Sy) + a²*Sxx - 2a*b*Sx + n*b²; newline."
        caption="REFERENCE MANUAL, P. 1.2 / − 2a*b*Sx, WHERE P. 1.1 HAS + 2abΣX"/>
      {act(5)}
      <AtlasRunner label="THE STRAIGHT-LINE FIT, AS PRINTED, WITH TWO SETS OF POINTS" example="1965-straight-line"
        note="The third number of each line is meant to be a sum of squares."/>
    </> },
    { label: "Run it yourself", kind: "operate", children: <>{act(6)}</> },
    { label: "What this does not show", children: <>
      {act(7)}
      {act(8)}
    </> },
  ]}/>;
}
