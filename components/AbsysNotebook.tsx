import type { PublicationRecord } from "@/lib/types";
import { StudyMeasures } from "@chrishayuk/hause/components/exhibition/Study";
import { NotebookEntry } from "./NotebookEntry";
import { Acts } from "./Acts";
import Link from "next/link";
import { AbsysRunner } from "./AbsysPlayground";

const ELCOCK = "https://doi.org/10.1016/0743-1066(90)90030-9";

/** The reverse example as Elcock prints it, p. 11. */
const REVERSE = `rev1 = lambda R, S, T
    {R = [], S = T} or
    {R = [X|L], rev1(L, [X|S], T)}
rev = lambda R, S
    {rev1(R, [], S)}`;

/** One quotation from the retrospective, typed as printed, credited to its page. */
function Quote({ children, page }: { children: string; page: string }) {
  return <figure className="absys-quote">
    {children}
    <figcaption className="record-voice">ELCOCK 1990, {page} · <a href={ELCOCK}>THE PAPER ↗</a></figcaption>
  </figure>;
}

/** The note in pictures: the papers' own examples, running where the note describes them. */
export function AbsysNotebook({ record }: { record: PublicationRecord }) {
  const act = (index: number) => <Acts acts={[record.body[index]]} anchored offset={index} staticRefusals/>;
  return <NotebookEntry record={record} className="absys-notebook" chapters={[
    { label: "Assertions, not instructions", children: <>
      {act(0)}
      <AbsysRunner label="FIVE ASSERTIONS, ONE AT A TIME" example="assertions-not-assignments" args={["--each"]}
        note="X = Y cannot be decided, so it is kept. Z = 42 wakes it. X = 17 contradicts what is known, and no derivation survives."/>
      <p className="absys-play-link record-voice"><Link href="/demos/absys">OPEN THE PLAYGROUND ↗</Link><span>Step through a text an assertion at a time, and see every derivation.</span></p>
    </> },
    { label: "An equation that waits", kind: "evidence", children: <>
      {act(1)}
      <Quote page="P. 12">{`X₁/1,  L₁/[2,U],  X₂/2,  L₂/[U],  L₃/[ ],  L/[2,1]
and the with [sic] the suspended equations   U = X₃  and  X₃ = V`}</Quote>
      <StudyMeasures label="ELCOCK’S BINDING ENVIRONMENTS, AGAINST THE RECONSTRUCTION" items={[
        { label: "APPEND, P. 10", value: "4 / 4", detail: "X₁/1, L₁/[], N₁/[2], U/[2]; and tout prints U = [2], as note 11 says." },
        { label: "REVERSE, P. 12", value: "6 / 6", detail: "Bindings, with U = X₃ and X₃ = V suspended." },
        { label: "AFTER rev([5],[V]), P. 13", value: "11 / 11", detail: "Every binding, down to the names X₄ and L₄." },
      ]} note="Each comparison is a test in the repository, tests/historical.rs, which names its page."/>
      <AbsysRunner label="THE REVERSE EXAMPLE, ASSERTION BY ASSERTION" example="reverse" args={["--each", "--env"]}
        note="After the goal the derivation hibernates, its binding environment Elcock’s. The last assertion wakes it."/>
    </> },
    { label: "Every alternative at once", kind: "evidence", children: <>
      {act(2)}
      <AbsysRunner label="ONE DEFINITION OF APPEND, THREE WAYS TO SPLIT [1,2]"
        text={`app = lambda R, S, T\n    {R = [], S = T} or\n    {R = [X|L], T = [X|N], app(L, S, N)}\napp(R, S, [1,2])`}
        note="Each or makes a derivation per alternative. Those that meet a contradiction disappear; three are left."/>
      <AbsysRunner label="THE TRIPLES OF 1969, IN THE NOTATION OF ABSYS 1" example="triples" notation="1969"
        note="“Three distinct conjunctions of assertions with associated data r, s, t 1, 3, 4, 1, 1, 2 and 6, 1, 7 respectively.”"/>
      <AbsysRunner label="ONE ALTERNATIVE NEVER ENDS: FAIR SEARCH" example="e04-fair" args={["--steps", "5000"]}/>
      <AbsysRunner label="THE SAME, DEPTH FIRST (NOT ABSYS)" example="e04-fair" args={["--steps", "5000", "--search", "depth-first"]}
        note="Depth first, the second alternative is never reached: A = 1 is still to do."/>
    </> },
    { label: "The order does not matter, except for not", kind: "evidence", children: <>
      {act(3)}
      <StudyMeasures label="EVERY ORDER OF A TEXT, ACCEPTED" items={[
        { label: "SEVEN ASSERTIONS", value: "5,040 orders", detail: "One outcome. In 1,260 orders some assertion ran past its 20,000-step budget before a later one cut it short." },
        { label: "COST", value: "34–22,021", detail: "Steps, from the cheapest order to the dearest; the dearest are stopped by the budget." },
        { label: "WITH NOT: ORDERS / OUTCOMES", value: "2 / 2", detail: "not(X = 1) and X = 2 give a different result in each order: not is decided on the bindings as they stand." },
      ]} note="absys permute accepts the assertions of a text in every order and groups the orders by outcome."/>
      <AbsysRunner label="NOT(X = 1) AND X = 2, IN BOTH ORDERS" example="e02-negation-order" args={["permute"]}/>
    </> },
    { label: "His own example prefers one order", kind: "evidence", children: <>
      <Quote page="P. 15">{`setdiff = lambda S₁, S₂, S
        {set(X), {mem(X, S₁), not(mem(X, S2))}, S}`}</Quote>
      {act(4)}
      <AbsysRunner label="SETDIFF, THE BODY IN THE GOAL’S PLACE" example="setdiff"
        note="[1,3]: the members of [1,2,3,4] that are not in [2,4,6]. The paper prints no query or result; these inputs and this mem are ours."/>
      <AbsysRunner label="SETDIFF, EVERY LITERAL STRICTLY IN TURN (NOT ABSYS)" example="setdiff" args={["--select", "fifo"]}
        note="[1]. The not is decided before the recursion has given X a value, in every derivation that recurses."/>
    </> },
    { label: "Three misprints", children: <>
      {act(5)}
      <AbsysRunner label="CLARK’S STUDENTS, CORRECTED, ASKED ABOUT SMITH"
        text={`student = lambda X\n    {X = 'BROWN'} or {X = 'SMITH'}\nmath-course = lambda C\n    {C = 'C101'} or {C = 'C301'}\ntakes = lambda X, C\n    {X = 'BROWN', C = 'C101'} or\n    {X = 'SMITH', C = 'C101'} or\n    {X = 'SMITH', C = 'C301'}\nnon-maths-major = lambda X\n    {math-course(C), not(takes(X, C))}\nnon-maths-major('SMITH')`}
        note="Smith takes both maths courses, so no derivation survives. Change SMITH to BROWN and one does."/>
    </> },
    { label: "Run it yourself", kind: "operate", children: <>
      <AbsysRunner label="ELCOCK’S REVERSE, TO EDIT" text={`${REVERSE}\nrev([1,2,U], [V|L])\nrev([5], [V])`} args={["--trace"]}
        note="Every step: each equation, each suspension, each or distributed, each derivation that fails or hibernates."/>
      {act(6)}
    </> },
    { label: "What this does not show", children: <>
      {act(7)}
      {act(8)}
    </> },
  ]}/>;
}
