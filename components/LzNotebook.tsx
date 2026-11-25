import type { ReactNode } from "react";
import type { PublicationRecord } from "@/lib/types";
import { StudyMeasures, StudySequence } from "@chrishayuk/hause/components/exhibition/Study";
import { NotebookEntry } from "./NotebookEntry";
import { Acts } from "./Acts";
import Link from "next/link";
import { LzRunner } from "./LzRunner";

const E364 = "https://web.mit.edu/digitalapollo/Documents/Chapter5/laningwhirlwind.pdf";
const KNUTH = "https://bitsavers.org/pdf/stanford/cs_techReports/STAN-CS-76-562_EarlyDevelPgmgLang_Aug76.pdf";

const FIRST = "a = 5,\ny = -6.3a,\nb = 0.0053 (a-y) /2ay,\nPRINT a, y, b.\nSTOP";
const COSINE = "x = 0,\n1   z = 1 - x^2/2 + x^4/2·3·4 - x^6/2·3·4·5·6\n        + x^8/2·3·4·5·6·7·8 - x^10/ 2·3·4·5·6·7·8·9·10,\n    PRINT x, z.\n    x = x + .1,\n    e = x - 1.05,\n    CP 1,\n    STOP";
const DIVISION = "a = 1, b = 2, c = 4, d = 8,\ns = cd/a(b + c) + d,\nu = a/b/c,\nv = a/(b + c/d),\nw = 2 3,\nPRINT s, u, v, w.\nSTOP";
const ZERO = "a = 2, b = 1, x = 0,\nn = 5,\ne = n - 5,\nCP 5,\nx = 3 ab,\n5 y = ax,\nPRINT e, x, y.\nSTOP";
const TPK = "        v|N = 1 (.5) 2 (.25) 3.5 (1) 5.5,\n        i = 0,\n1       j = i + 1,\n        a|i = v|j,\n        i = j,\n        e = i - 10.5,\n        CP 1,\n        i = 10,\n2       y = F^1(F^11(a|i)) + 5(a|i)^3,\n        e = y - 400,\n        CP 3,\n        z = 999,\n        PRINT i, z.\n        SP 4,\n3       PRINT i, y.\n4       i = i - 1,\n        e = -0.5 - i,\n        CP 2,\n        STOP";
const ODE = "    t = 2,\n    h = 0.5,\n    y|1 = 0,\n    y|2 = 0,\n1   PRINT t, y|1, y|2.\n    e = 9.7 - t,\n    CP 3,\n2   D y|1 = y|2 + 1,\n    D y|2 = - y|1,\n    e = -e,\n    CP 2,\n    SP 1,\n3   STOP";
const INNOCUOUS = "    t = 2,\n    h = 0.5,\n    y|1 = 0,\n    y|2 = 0,\n1   PRINT t, y|1, y|2.\n    e = 9.7 - t,\n    CP 3,\n2   a = y|2 + 1,\n    D y|1 = a,\n    D y|2 = - y|1,\n    e = -e,\n    CP 2,\n    SP 1,\n3   STOP";
const SUMMER = "    t = 2,\n    h = 0.5,\n    y|1 = 0,\n    y|2 = 0,\n1   D y|1 = y|2 + 1,\n    D y|2 = -y|1,\n    k = t - 10.1,\n    CP 1,\n    STOP";
const PURSUIT = "    t = 0,\n    h = 0.02,\n    w = 1.25,\n    x = 0,\n    y = 0,\n    n = 0,\n1   Dx = w(1 - x)/F^1((1 - x)^2 + (t - y)^2),\n    Dy = w(t - y)/F^1((1 - x)^2 + (t - y)^2),\n    d = F^1((1 - x)^2 + (t - y)^2),\n    n = n + 1,\n    e = n - 9.5,\n    CP 2,\n    n = 0,\n    PRINT t, x, y, d.\n2   e = d - .03,\n    CP 3,\n    SP 1,\n3   PRINT t, x, y, d.\n    STOP";
const LEAD = "    c|10 = 2.4588,\n    c|11 = 1.4759,\n    c|12 = -.1284,\n    c|13 = .51485,\n    c|20 = .93082,\n    c|21 = .021173,\n    c|22 = .0025995,\n    c|31 = 9.9666,\n    c|32 = .36072,\n    c|33 = -.15711,\n    c|34 = .11966,\n    k = 250.5,\n    c = .367,\n    v|2 = 2870,\n    g = 32.2,\n    v = 880,\n    v|1 = 750,\n    p|0 = 1373.9,\n    i|0 = 1.00589,\n    f|0 = 1379.9,\n    d|0 = 1,\n    x = 6400,\n    t = 0,\n    d = 0,\n    a = 1.2153,\n    j|1 = .00735,\n    j|2 = .00689,\n    t|1 = 3.007198,\n    h = .1,\n    i|1 = 0,\n    k|1 = ((v + v|2)/v|2)(d|0 v/k),\n    SR 2,\n    b = F^7(j|1/j|2),\n    SR 3,\n    m = 1,\n    z = 0,\n1   D z = 0,\n7   p = x d|0/c + p|0,\n8   q = .0001p,\n    u = 10000/(c|10 + c|11 q + c|12 q^2 + c|13 q^3),\n    q|1 = F^3(a),\n    q|2 = F^3(d),\n    s|1 = F^2(a),\n    s|2 = F^2(d),\n    i = c|20 + 10000c|21/u + 10^8 c|22/u^2,\n    y|1 = c(i - i|0)/2d|0,\n    x|1 = -(v - v|1 q|1 q|2)/(1 - v|1 q|1 q|2/u + y|1 s|2),\n    D x = x|1,\n    d|1 = -((v|1 q|1 s|2/u + y|1 q|2)x|1 + v j|2 + v|1 q|1 s|2)/x,\n    z|1 = -(v|1(1 + x|1/u)s|1 + v j|1)/x q|2,\n    b = F^7(j|1/j|2),\n    D d = d|1,\n    D a = z|1,\n    D j|1 = -z|1 q|2 - k|1 j|1 + d|0 v i|1 F^2(b)/k - g j|1 s|2/v + z|1 j|2 s|2 - (g j|1/v - z|1 j|2)s|2,\n    D j|2 = -d|1 + g q|2/v - k|1 j|2 + d|0 v i|1 F^3(b)/k - g j|2 s|2/v - z|1 j|1 s|2 - (g j|2/v + z|1 j|1)s|2,\n    D t|1 = x|1/u,\n2   PRINT t.\n3   PRINT x, d, a, j|1, j|2, t|1, b.\n    e = .67 - t,\n    CR 4,\n    e = 2.7 - t,\n    CR 5,\n    SP 6,\n4   h = .15,\n5   h = .2,\n6   m = -m,\n    CP 1,\n    SR 7,\n    SR 8,\n    f = 1000(c|31 q + c|32 q^2 + c|33 q^3 + c|34 q^4),\n    y = c^2(f - f|0 - i|0 d|0 x/c)/2(d|0)^2,\n    r = F^1(x^2 + y^2 + 2x y F^2(d)),\n    r|0 = F^1((v|1 t|1)^2 + r^2 - 2v|1 t|1 x F^3(d)F^3(a)),\n    a|1 = F^6(x F^3(d)F^3(a)/r),\n    a|0 = F^5(r F^2(a|1)/r|0),\n    PRINT r, r|0, a|0.\n    e = t - 4.9,\n    CP 1,\n    STOP";
const LANING_1976 = "https://cs.stanford.edu/~knuth/from-Laning-76-07-02.pdf";

/** A detail of a scanned page, credited to the document it came from. */
function Excerpt({ src, alt, width, height, caption, narrow, href = E364 }: { src: string; alt: string; width: number; height: number; caption: ReactNode; narrow?: boolean; href?: string }) {
  return <figure className={narrow ? "lz-excerpt lz-excerpt-narrow" : "lz-excerpt"}>
    <img src={`/media/notebook/laning-zierler/${src}`} alt={alt} width={width} height={height} loading="lazy"/>
    <figcaption className="record-voice">{caption} · <a href={href}>THE SCANNED DOCUMENT ↗</a></figcaption>
  </figure>;
}

/** The note in pictures: the pages it quotes, and the system running where it is described. */
export function LzNotebook({ record }: { record: PublicationRecord }) {
  const act = (index: number) => <Acts acts={[record.body[index]]} anchored offset={index} staticRefusals/>;
  return <NotebookEntry record={record} className="lz-notebook" chapters={[
    { label: "A computer within a computer", children: <>
      <Excerpt src="e364-title.jpg" width={945} height={1220} narrow
        alt="The title page of Engineering Memorandum E-364, A Program for Translation of Mathematical Equations for Whirlwind I, by J. H. Laning Jr. and N. Zierler, January 1954, Instrumentation Laboratory, Massachusetts Institute of Technology, signed by both authors."
        caption="LANING AND ZIERLER, E-364, JANUARY 1954 / TITLE PAGE"/>
      <p className="lz-play-link record-voice"><Link href="/demos/laning-zierler">OPEN THE PLAYGROUND ↗</Link><span>Punch a tape and feed it to Whirlwind, in your browser.</span></p>
      {act(0)}
      <LzRunner label="THE MANUAL’S FIRST EQUATIONS / CHANGE THEM AND FEED THE TAPE AGAIN" program={FIRST}
        note="The equations of page 2, with a PRINT and a STOP added so that the program runs. Each equation ends with a comma and a PRINT with a period. 2ay is 2 times a times y. Every number is typed with a sign, eight digits and a power of ten: +.50000000+01 is 5."/>
    </> },
    { label: "Laning and Zierler in five lines", children: <>
      <StudySequence label="EQUATIONS, CARRIED OUT IN THE ORDER WRITTEN" steps={[
        { label: "EQUATION", value: "y = -6.3a,", detail: "A lower-case letter, an equals sign, an expression and a comma. Every lower-case letter is a variable." },
        { label: "NUMBER", value: "1   z = x + .1,", detail: "A number in front, from 1 to 100, names the equation, for jumps. The rest are numbered 101 to 200 by the computer." },
        { label: "PRINT", value: "PRINT x, z.", detail: "Type the current values. It ends with a period, and no computation is allowed in it." },
        { label: "JUMP", value: "CP 1,", detail: "Go to equation 1 if the last quantity computed was negative. SP always goes; SR and CR carry out one equation and come back." },
        { label: "DIFFERENTIATE", value: "D y|1 = y|2 + 1,", detail: "dy/dt. t is the independent variable and h the step, and the system integrates by itself." },
      ]} note="Exponents were the Flexowriter’s upper-case digits. Here x² can be typed x^2, and F²(x), the sine, F^2(x)."/>
      <LzRunner label="THE MANUAL’S TABLE OF COSINES, P. 11" program={COSINE}
        note="The series to the x¹⁰ term, for x from 0 to 1. x goes up by a tenth each time, and the tenth is binary: by the end x is typed .10000001+01."/>
    </> },
    { label: "Exhaustive tests have not been made", children: <>
      <Excerpt src="e364-p21-temporary-restrictions.jpg" width={1260} height={670}
        alt="Section 18 of the manual, Temporary Rules and Restrictions: an SR or CR instruction may not refer to an equation that makes use of a subroutine; the x|N is not yet in operation. All other portions of the program are believed to be operating satisfactorily but exhaustive tests have not been made. Information relative to any troubles encountered in the use of this program would be appreciated by the authors."
        caption="E-364, P. 21 / TEMPORARY RULES AND RESTRICTIONS"/>
      {act(1)}
      <StudyMeasures label="WHAT THE MANUAL’S OWN PROGRAMS GIVE" items={[
        { label: "COMPLETE PROGRAMS, PP. 11 AND 18", value: "3 of 3 run", detail: "The two tables of cosines and the two differential equations, and the page-19 variant of the last. The second table has a semicolon where a comma belongs, read here as a comma. The manual’s other examples are fragments." },
        { label: "PRINTED NUMBERS, P. 6", value: "3 of 3", detail: "5, .05 and −π, typed digit for digit as the manual prints them. The manual prints nothing else its programs typed." },
        { label: "AGAINST MATHEMATICS", value: "7 · 10⁻⁸", detail: "The largest difference between the cosine tables and cos x. The differential equations are within about .004 of sin(t − 2) and cos(t − 2) − 1, what a step of one half costs." },
      ]} note="Everything but those three printed numbers is checked against mathematics, not against Whirlwind."/>
    </> },
    { label: "A perfectly reasonable expression", kind: "evidence", children: <>
      <Excerpt src="e364-p4-a-over-b-over-c.jpg" width={1280} height={194}
        alt="From the manual: … single mathematical term is admissible and is correctly interpreted by the computer. Thus a/b/c is properly interpreted as the product ac divided by b."
        caption="E-364, PP. 4–5 / “THUS a/b/c IS PROPERLY INTERPRETED AS THE PRODUCT ac DIVIDED BY b”"/>
      {act(2)}
      <LzRunner label="FOUR EXPRESSIONS FROM PAGES 4, 5 AND 10" program={DIVISION}
        note="s is cd over a(b + c), plus d: 13.333333. u is a/b/c: 2, where FORTRAN would give .125. v is a/(b + c/d): .4. And w, typed 2 3 with a space, is 6. Change a value and feed it again."/>
      <Excerpt src="knuth-1976-p59-lived-in-fear.jpg" width={1300} height={195}
        alt="Laning, quoted by Knuth and Trabb Pardo: The notion of operator precedence as a formal concept did not occur to me at the time; I lived in fear that someone would write a perfectly reasonable algebraic expression that my system would not analyze correctly."
        caption="KNUTH AND TRABB PARDO, 1976, P. 59 / LANING, 1976" href={KNUTH}/>
    </> },
    { label: "Two zeros", kind: "evidence", children: <>
      <Excerpt src="e364-p8-plus-or-minus-zero.jpg" width={1240} height={200}
        alt="From the manual: If n had the value 5 in the above example then e = n - 5 = 0. In this case the CP may or may not behave like an SP since 0 may appear as +0 or -0. This ambiguity need cause no difficulty in general."
        caption="E-364, P. 8 / “0 MAY APPEAR AS +0 OR −0”"/>
      {act(3)}
      <LzRunner label="THE MANUAL’S EXAMPLE FROM PAGE 8, WITH n EQUAL TO 5, FED WITH EACH KIND OF ZERO" program={ZERO} compare
        note="With −0, CP jumps to equation 5 and x = 3ab is never computed, so y is 0. With +0 it does not jump: x is 6 and y is 12. The manual leaves it open; the reconstruction has to choose."/>
    </> },
    { label: "Knuth’s program", kind: "evidence", children: <>
      <Excerpt src="knuth-1976-p56-tpk.jpg" width={1200} height={670} narrow
        alt="Part of Knuth and Trabb Pardo's TPK program in the Laning and Zierler system: v|N = input, i = 0, 1 j = i+1, a|i = v|j, i = j, e = i-10.5, CP 1, i = 10, 2 y = F1(F11(a|i))+5(a|i) cubed, e = y-400, CP 3, z = 999, PRINT i, z."
        caption="KNUTH AND TRABB PARDO, 1976, P. 56 / TPK IN THE LANING AND ZIERLER SYSTEM" href={KNUTH}/>
      <Excerpt src="knuth-1976-p57-tpk-end.jpg" width={455} height={250} narrow
        alt="The end of TPK: 14 SP 4, 15 3 PRINT i, y. 16 4 i = i-1, 17 e = -0.5-i, 18 CP 2, 19 STOP."
        caption="KNUTH AND TRABB PARDO, 1976, P. 57 / THE COUNT GOES DOWN: 4 i = i−1" href={KNUTH}/>
      <Excerpt src="e364-p13-zero-index.jpg" width={1260} height={290}
        alt="From the manual: If, in the expression x|n, n has a non-integral value greater than 0.5, the computer rounds n off to the nearest integer. Negative values of n are not permitted in this connection, nor are values between zero and one half inclusive, with the exception that the value zero is permissible if assigned by the specific equation n = 0."
        caption="E-364, P. 13 / “THE VALUE ZERO IS PERMISSIBLE IF ASSIGNED BY THE SPECIFIC EQUATION n = 0”"/>
      {act(4)}
      <LzRunner label="TPK, WITH KNUTH’S ELEVEN NUMBERS, FED WITH EACH KIND OF ZERO" program={TPK} compare
        note="The pages agree until i is zero. Page 13 forbids that zero as an index whatever its sign, because it was computed by i = i − 1. On the left it is −0, which this reconstruction refuses, so the run stops with an alarm of its own wording. On the right every zero is +0, so the reconstruction cannot tell it from one set by n = 0 and the run goes on, still breaking the rule. The eleven numbers are Knuth’s own example of v|N: 1 (.5) 2 (.25) 3.5 (1) 5.5."/>
      <LzRunner label="THE SAME TAPE UNDER THE RULES OF JANUARY 1954" program={TPK} settings={{ rules: true }}
        note="“The x|N is not yet in operation.” Here the translator stops at the first line, and nothing is run. What Whirlwind did with such a tape in January 1954 is not recorded."/>
    </> },
    { label: "The innocuous change", kind: "evidence", children: <>
      <Excerpt src="e364-p19-innocuous.jpg" width={1260} height={409}
        alt="From the manual: 2 a = y|2 + 1, D y|1 = a, This change would appear to be innocuous since a seems to be appropriately reset before each entry into the differential equations. However, upon completion of the second D equation in each of the first 3 sub-steps, computation would be resumed with the first D equation (and not equation 2) so that a would not have the current value of y|2 + 1."
        caption="E-364, P. 19 / A CHANGE THAT “WOULD APPEAR TO BE INNOCUOUS”"/>
      {act(5)}
      <LzRunner label="THE MANUAL’S TWO DIFFERENTIAL EQUATIONS, P. 18" program={ODE}
        note="y|1 should be sin(t − 2) and y|2 cos(t − 2) − 1. At t = 3, sin 1 is .84147098: a step of h = 0.5 costs the fourth digit."/>
      <LzRunner label="THE INNOCUOUS CHANGE, P. 19" program={INNOCUOUS}
        note="Only the helper equation a = y|2 + 1 has moved. Compare t = 3 with the tape above."/>
    </> },
    { label: "A program that would not have run", children: <>
      {act(6)}
      <LzRunner label="THE SUMMER SCHOOL’S VERSION, 1954, P. 13-3, WITH ITS TWO COMMAS PUT BACK" program={SUMMER}
        note="Feed it: it integrates to past t = 10 and the printer types nothing. Add PRINT t, y|1, y|2. before STOP and feed it again."/>
      <Excerpt src="e364-p6-roughly.jpg" width={970} height={110}
        alt="From the manual: If numbers, including, of course, numbers produced as the result of computations, exceed 2 to the 63 minus 2 to the 39 (or, roughly, 9.2233995 · 10 to the 18) in absolute value, an alarm will result."
        caption="E-364, P. 6 / “ROUGHLY, 9.2233995 · 10¹⁸”: IT IS 9.2233715 · 10¹⁸"/>
      <StudyMeasures label="TROUBLES TO REPORT" items={[
        { label: "SUMMER SCHOOL, 1954", value: "not accepted", detail: "Two commas missing. With them put back, there is no PRINT, so nothing is typed." },
        { label: "LARGEST NUMBER, P. 6", value: "9.2233715 · 10¹⁸", detail: "Not 9.2233995 · 10¹⁸, as the page has it: wrong in the fifth decimal place." },
        { label: ".05, P. 6", value: "+.50000000−01", detail: "Only if the digits are cut off. Rounded, the nearest 24-bit number would print +.50000001−01. Cutting off fits the page; it does not prove how Whirlwind printed." },
      ]} note="One is a slip in the manual and one in a copy of it. The third is a reading of the manual’s printed examples, and the reconstruction’s choice."/>
    </> },
    { label: "It ran the first time", children: <>
      <Excerpt src="knuth-1976-p59-lead-pursuit.jpg" width={1300} height={130}
        alt="Knuth and Trabb Pardo: The lead-pursuit source program consisted of 79 statements, including 29 which merely assigned initial data values, and also including seven uses of the differential equation feature."
        caption="KNUTH AND TRABB PARDO, 1976, P. 59" href={KNUTH}/>
      {act(7)}
      <LzRunner label="A PURSUIT CURVE, IN MEMORY OF THE LEAD-PURSUIT PROBLEM" program={PURSUIT}
        note="Not Laning’s program, which is in the next section: a flat pursuit written for this reconstruction. The target flies up the line x = 1 at speed 1; the pursuer, at 1.25, always heads straight at it. Theory says it is caught at t = 2.22; the tape stops when the gap is under .03, at t = 2.12."/>
    </> },
    { label: "What Whirlwind typed", kind: "evidence", children: <>
      <Excerpt src="laning-1976-lead-pursuit-program.jpg" width={1300} height={1011}
        alt="The middle of the lead-pursuit program as the Flexowriter typed it: m=1, z=0, 1 Dz=0, 7 p=xd|0/c+p|0, 8 q=.0001p, the equations for u, q|1, q|2, s|1, s|2, i, y|1, x|1, d|1, z|1 and b, the D equations for x, d, a, j|1, j|2 and t|1, the second running off the right edge of the sheet, then 2 PRINT t. 3 PRINT x, d, a, j|1, j|2, t|1, b. e=.67-t, CR4, e=2.7-t, CR5, SP6."
        caption="LANING TO KNUTH, 2 JULY 1976, P. 13 / THE LEAD-PURSUIT PROGRAM, EARLY 1954" href={LANING_1976}/>
      <Excerpt src="laning-1976-lead-pursuit-output.jpg" width={1300} height={419}
        alt="The first output page, headed ZIELRER: t=+.16155871-27, then x=+.64000003+04 d=+.16155871-27 a=+.12152999+01 and j|1, j|2, t|1 and b; t=+.10000000-00 and the second line of values; t=+.20000000-00, the third, and r=+.62442894+04 r|0=+.58358421+04 a|0=+.15602501+01."
        caption="LANING TO KNUTH, 2 JULY 1976, P. 15 / WHAT WHIRLWIND TYPED" href={LANING_1976}/>
      {act(8)}
      <LzRunner label="THE LEAD-PURSUIT PROGRAM, AS TYPED IN 1954" program={LEAD}
        note="Feed it and compare the first seven steps with the page above. The last digits differ, and a|0, from the arcsine, in the sixth. Here a zero is typed +.00000000+00, where Whirlwind typed +.16155871−27. The page stops at t = .6; the run goes on to t = 4.9, with the step widened at .67 and 2.7."/>
      <Excerpt src="knuth-1976-letter-unary-minus.jpg" width={1100} height={510} narrow
        alt="Knuth to Laning, 16 August 1976: Last weekend I amused myself by studying the vintage 1953 compiler listing you sent. I can now certify that the program has only one bug, namely the problem you mentioned about unary minus: -x gets treated as 1-x. It was remarkable how much logic you squeezed into 430 instructions."
        caption="KNUTH TO LANING, 16 AUGUST 1976 / THE 1953 LISTING’S ONE BUG" href="https://cs.stanford.edu/~knuth/to-Laning-76-08-16.pdf"/>
    </> },
    { label: "Run it yourself", kind: "operate", children: <>{act(9)}</> },
    { label: "What this does not show", children: <>
      {act(10)}
      {act(11)}
    </> },
  ]}/>;
}
