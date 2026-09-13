import { NotebookNavigation } from "./NotebookNavigation";
import { Cell80ControlStudy, Cell80MatchedControls } from "./Cell80ControlStudy";
import { Cell80Journey, Cell80Connection } from "./Cell80Journey";
import Link from "next/link";
import { StudyRoom, StudySequence, StudyMeasures } from "@chrishayuk/hause/components/exhibition/Study";
import { FieldNotes } from "@chrishayuk/hause/components/FieldNotes";
import { Question } from "@chrishayuk/hause/components/forms/Question";
import { EvidenceTable } from "@chrishayuk/hause/components/EvidenceTable";
import type { PublicationRecord } from "@/lib/types";
import { NotebookFieldNotes } from "./NotebookFieldNotes";
import { Acts } from "./Acts";
import controls from "@/lib/data/cell80-bound-controls.json";

/** The centrepiece: each route, what it looked like, and the control that explained it. */
const routes = [
  { id: "barrier", label: "The barrier", looked: "A capability that enables the next one", explained: "A dependence I had written into the energy rule" },
  { id: "composition", label: "Composition", looked: "An invention opening new targets", explained: "Containment: the targets were built on it" },
  { id: "encapsulation", label: "Encapsulation", looked: "An invention becoming a building block", explained: "Compression, plus an output range inherited from a designed target" },
  { id: "niche", label: "Niche construction", looked: "Waste becoming a world for others", explained: "A chemistry that couldn’t make niches both specific and usable" },
];

function Bound() {
  return <>
    <StudyRoom id="cell80-study" label="THE BARRIER + THREE ROUTES / ONE LIMIT" title={<>Each route changed something.<br/><em>Each time, a control explained it.</em></>} tone="dark" description="Could a useful program make further inventions easier? I tried three routes. The final one packed an evolved program into a single reusable instruction—a module. That made programs built on it fewer mutations away.">
      <p className="cell80-watch">Compare the evolved module with eight arbitrary modules of the same shape. First count reachable programs, then distinct computations: different code can do the same thing.</p>
      <Cell80ControlStudy/>
      <FieldNotes label="The barrier, three routes & their controls" detail="COMPARE +"><EvidenceTable caption="CELL80 / THE INVENTION QUESTION · FOUR ROUTES AND THEIR CONTROLS" rowLabel="Route" columns={[{id:"looked",label:"What it looked like"},{id:"explained",label:"What explained it"}]} rows={routes.map(route => ({ id: route.id, label: route.label, values: { looked: route.looked, explained: route.explained } }))} note="Nothing here says the effects were small. Encapsulation made 27,888 programs newly reachable within three mutations. The point is that the same thing happened for every arbitrary module of the same shape." source={{label:"Every plan, finding and raw output",href:"/data/cell80/bound/index.json"}}/></FieldNotes>
      <div className="cell80-scenario-learning cell80-prose"><h3>Packaging the code explained the shortcut.</h3><p>Every same-shape module made 27,888 programs newly reachable within three mutations. The evolved one had no special advantage on that count. When I counted different computations instead, two controls did better.</p></div>
      <p className="cell80-caption">The <Link href="/notebook/give-invention-something-to-unlock">barrier experiment</Link> built the resource these routes were tested against, and <Link href="/notebook/an-advantage-needs-a-chance-to-become-history">the following note</Link> followed the descendants that inherited it.</p>
    </StudyRoom>
    <StudyRoom label="THE CONTROL THAT DECIDED IT" title={<>Better than most modules.<br/><em>Typical for its output range.</em></>} description="Some modules produce a wider variety of answers than others. I expanded the comparison, then matched modules on how many distinct outputs they could produce. Would the evolved one still stand out?">
      <Cell80MatchedControls/>
      <StudyMeasures label="ENCAPSULATING THE EVOLVED MODULE / CHAINS OF UP TO FOUR CELLS" items={[{value:"33,197",label:"new functions built on the evolved module"},{value:"76%",label:"of same-shape modules it beat"},{value:"median",label:"of the 304 modules with a similar output range"}]} note="A module's output range explained 64–77% of the variation between modules. Modules built from checksum and percentage functions did better than the evolved one, whose output range is that of the target I designed for it."/>
      <div className="cell80-prose"><p>The evolved module beat 76% of modules with the same shape. Among modules with a similar variety of outputs, it sat at the middle. What looked special depended on which controls I compared it with.</p></div>
      <FieldNotes label="Why a structure-matched module is the control that matters" detail="READ +"><div className="cell80-prose"><p>Turning a code chunk into a single mutation is called encapsulation. Any chunk of the same shape gives the same shortcut through program space: relabelling the building blocks maps one module’s neighbourhood onto another’s. That explains equal program counts, without claiming the programs compute the same answers.</p><p>The comparison also has to control for how much a module does. Modules whose output is constant, or simply one of their inputs, score about a tenth of the others. Matching on the number of distinct outputs removes that advantage, and the evolved module then sits at the median.</p></div></FieldNotes>
    </StudyRoom>
    <StudyRoom label="WHO DECIDES WHAT COUNTS" title={<>The target list<br/><em>answers the question.</em></>} tone="accent" description="The earlier routes hit a related problem. To measure whether an invention opened new possibilities, I had to decide what counted as a useful next task. That choice could build the answer into the test.">
      <StudySequence label="HOW THE ANSWER FOLLOWS FROM THE CHOICE OF TARGETS" steps={[{label:"TARGETS DRAWN INDEPENDENTLY",value:"No effect",detail:"In this test, unrelated tasks gave the invention nothing to help with."},{label:"TARGETS BUILT AROUND THE INVENTION",value:"Huge effect",detail:"Tasks containing the invention became much easier to reach. I had built the advantage into the task list."},{label:"TARGETS LEFT TO THE WORLD",value:"Specific or usable",detail:"Organisms made waste that others might use. Waste unique to its producer was unusable; usable waste was no longer unique."}]} note="Preregistration and random seeds don't remove the choice of what counts as the next possibility. They make it visible."/>
      <div className="cell80-prose"><p>If I choose what counts as the next possibility, I may also be choosing the answer. That is the bound this arc reached, and it is a bound on these instruments rather than a claim about evolution.</p></div>
      <Question text="What would a world need to contain for an invention to matter on its own terms?" status="OPEN" detail="A world whose regularities are fixed independently of whatever later evolves — geometry, collisions, conservation, limited energy, other agents — so that usefulness comes from the world rather than from a list I wrote. That programme has not been registered."/>
    </StudyRoom>
  </>;
}

export function Cell80BoundNotebook({record}:{record:PublicationRecord}) {
  return <NotebookFieldNotes><div className="cell80-notebook cinematic-notebook">

    <Bound/>
    <Cell80Connection id={record.id}/><section className="cell80-reading-record" id="cell80-record"><FieldNotes label="The complete note & its evidence" detail="READ +"><Acts acts={record.body} anchored staticRefusals/></FieldNotes></section>
  <NotebookNavigation><Cell80Journey id={record.id}/><nav className="cell80-entry-nav record-voice" aria-label="Explore this note"><a href="#cell80-study">ENTER THE STUDY ↑</a><a href="#cell80-record">READ THE FULL NOTE ↑</a><Link href="/thread/cell80#further-notes">ALL SIX NOTES ↗</Link></nav></NotebookNavigation></div></NotebookFieldNotes>;
}

export function Cell80BoundCard({ exhibition = false }: { exhibition?: boolean } = {}) {
  if (exhibition) return <div className="cell80-preview cell80-reach-preview">
    <div className="cell80-reach-bars" role="img" aria-label="Newly reachable programs within three mutations: the evolved module and each of eight arbitrary modules of the same shape all add 27,888.">
      {controls.controls.map((row, index) => <div key={row.module} data-evolved={index === 0}><span>{index === 0 ? "Evolved" : `Control ${index}`}</span><i aria-hidden="true"/><strong>{row.built_on_unreachable_before.toLocaleString("en-GB")}</strong></div>)}
    </div>
    <span className="record-voice">NEW PROGRAMS REACHED WITHIN THREE MUTATIONS</span>
  </div>;
  return <div className="cell80-preview cell80-further-preview"><span className="record-voice">CELL80 / 06 · AP-0–AP-2</span>
    <div className="cell80-bound-preview" role="img" aria-label="Four routes and the control that explained each: the barrier by a dependence in the energy rule, composition by containment, encapsulation by compression, niche construction by a chemistry that could not make niches both specific and usable.">
      {routes.map(route => <div key={route.id}><span className="record-voice">{route.label}</span><i aria-hidden="true"/><p>{route.explained}</p></div>)}
    </div>
    <p>Three routes.<br/><em>One limit.</em></p><span className="record-voice">FOUR CONTROLS · OPEN THE NOTE ↗</span>
  </div>;
}
