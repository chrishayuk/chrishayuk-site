import { NotebookEntry } from "./NotebookEntry";
import type { Act } from "@/lib/types";
import { Acts } from "./Acts";
import { Procession } from "@chrishayuk/hause/components/forms/Procession";
import { StagedTransition } from "@chrishayuk/hause/components/forms/StagedTransition";
import { Statement } from "@chrishayuk/hause/components/forms/Statement";
import { Comparison } from "@chrishayuk/hause/components/forms/Comparison";
import { Claim } from "@chrishayuk/hause/components/forms/Claim";
import { Evidence } from "@chrishayuk/hause/components/forms/Evidence";
import { Question } from "@chrishayuk/hause/components/forms/Question";
import { FieldNotes as HauseFieldNotes } from "@chrishayuk/hause/components/FieldNotes";
import { ExhibitionEntrance as RoomEntrance, ReferenceStudies as HauseReferenceStudies, UniformGrid, ReleasedActs, ArchiveExhibit, ReadingRooms, GrammarComparison } from "@chrishayuk/hause/components/exhibition/Exhibition";

function RoomStatement({ act, index }: { act: Act; index: number }) {
  if (act.kind !== "statement") throw new Error("Expected an exhibition statement");
  const [first, ...rest] = act.text.split(". ");
  return <section id={`act-${index + 1}`}><Statement text={`${first}.`} continuation={rest.join(". ")} presentation="room" /></section>;
}

function FieldNotes({ acts, index, label = "FIELD NOTES" }: { acts: Act[]; index: number; label?: string }) {
  return <HauseFieldNotes className="authority-notes exhibition-field-notes" label={label} detail="READ +"><Acts acts={[acts[index]]} anchored offset={index} staticRefusals /></HauseFieldNotes>;
}

function ReferenceStudies() {
  const studies = [
    { number: "01", house: "DIOR / LA GALERIE", title: "The exhibition directs attention.", note: "Circulation can also be theatre.", href: "#source-6", scene: "stair" },
    { number: "02", house: "BURBERRY / SUMMER 2026", title: "The environment is part of the story.", note: "The world around an object changes it.", href: "#source-8", scene: "tent" },
    { number: "03", house: "DIOR / CRAFTING FASHION", title: "The visitor moves through an argument.", note: "Seven sections. New perspectives. Transformation.", href: "#source-7", scene: "sequence" },
  ];
  return <HauseReferenceStudies label="THREE REFERENCES / THREE PRINCIPLES" studies={studies.map(study => ({
    ...study, label: study.house, credit: "VISUAL STUDY · NOT A REPRODUCTION ↗",
    scene: <div className={`exhibition-reference-scene exhibition-reference-${study.scene}`} aria-hidden="true">{study.scene === "stair" ? Array.from({ length: 7 }, (_, i) => <i key={i} style={{ height: 28 + i * 25 }} />) : study.scene === "tent" ? <><i/><i/><i/></> : Array.from({ length: 7 }, (_, i) => <i key={i} />)}</div>,
  }))} />;
}

function CardWall() {
  return <UniformGrid caption="A CONVENTIONAL COMPONENT LANGUAGE" labels={["CLAIM", "EVIDENCE", "QUESTION", "COMPARISON", "OBSERVATION", "REFUSAL"]} conclusion="CARD" />;
}

function ActsReleased() {
  return <ReleasedActs caption="BREAK THE GRID / KEEP THE MEANING" claim="CLAIM" evidence="EVIDENCE" question="QUESTION" comparison="COMPARISON" refusal="REFUSAL" />;
}

function Archive() {
  const forms = ["Hero", "Statement", "Observation", "Claim", "Evidence", "Question", "Timeline", "Connection", "Film", "Comparison", "FollowReveal"];
  return <ArchiveExhibit label="ARCHIVE / COMMIT 48070BD" dates={["28 AUG 2026 · 23:40 UTC", "29 AUG 2026 · 00:40 BST"]} quote={"A cinematic visual language\nfor ideas, systems\nand explanations."} terms={forms} principle={"NO GENERIC\nCARD KIT."} />;
}

function ThreeRooms() {
  const rooms = [
    { n: "I", title: "STATEMENTS", verb: "Read.", forms: "A sentence. A claim. Evidence. A question." },
    { n: "II", title: "INSTRUMENTS", verb: "Operate.", forms: "Pull apart. Compare. Change the lens." },
    { n: "III", title: "PERFORMANCES", verb: "Watch.", forms: "Transform. Unfold. Process. Change magnitude." },
  ];
  const room = (r: typeof rooms[number]) => ({ marker: r.n, label: `ROOM ${r.n} / ${r.title}`, action: r.verb, description: r.forms });
  return <ReadingRooms caption="THE BOOK / THREE MODES" rooms={[room(rooms[0]), room(rooms[1]), room(rooms[2])]} />;
}

function ExhibitionGrammar() {
  const rows = [
    { label: "EXHIBITION", stages: ["Arrival", "Attention", "Reveal", "Contrast", "Movement", "Resolution"] },
    { label: "HAUSE", stages: ["Hero", "Statement", "Instrument", "Comparison", "Performance", "Answer"] },
  ];
  return <GrammarComparison caption="TWO GRAMMARS / ONE DESIGN INSTINCT" rows={rows} note="An editorial relationship, not a historical one-to-one." />;
}

function ReadingComparison({ act }: { act: Act }) {
  if (act.kind !== "comparison") throw new Error("Expected the exhibition comparison");
  const [claim, evidence, question] = act.left.properties;
  return <section id="act-13" className="exhibition-comparison"><Comparison {...act} kicker="THE SAME WORDS / DIFFERENT RESPONSIBILITIES" panels={{
    left: <div className="exhibition-neutral-reading">{[claim, evidence, question].map((text, i) => <div key={i}><span className="record-voice">INFO / 0{i + 1}</span><p>{text}</p></div>)}</div>,
    right: <div className="exhibition-semantic-reading"><Claim text={claim} status="SUPPORTED" /><Evidence items={[{ label: "The first HOUSE README", status: "SUPPORTED", detail: evidence }]} /><Question text={question} status="OPEN" /></div>,
  }} /><p className="exhibition-comparison-caption">The words stay the same. A claim takes a position. Evidence supports it. A question stays open.</p></section>;
}

export function ExhibitionNotebook({ acts }: { acts: Act[] }) {
  if (acts.length !== 18 || acts[0]?.kind !== "photograph" || acts[17]?.kind !== "question") throw new Error("Exhibition notebook no longer matches its authored record");
  const performance = acts[16];
  if (performance.kind !== "observation") throw new Error("Expected the exhibition performance record");
  const [motion, discovery] = performance.text.split("\n\n");
  if (!discovery) throw new Error("Expected the exhibition contribution passage");
  return <NotebookEntry recordId="N-EXHIBITION" className="exhibition-edition" chapters={[
{ label: "The influence", children: <>
<RoomEntrance number="01" title="THE INFLUENCE" detail="The room is part of the story." />
<section className="exhibition-opening-prose"><Acts acts={acts.slice(1, 3)} anchored offset={1} /></section>
<ReferenceStudies />
<div className="exhibition-statement"><RoomStatement act={acts[3]} index={3} /></div>
<FieldNotes acts={acts} index={4} label="WHAT CINEMATIC MEANS" />
</> },
{ label: "The friction", children: <>
<RoomEntrance number="02" title="THE FRICTION" detail="Six different acts. One shape." />
<CardWall />
<div className="exhibition-refusal"><Acts acts={[acts[5]]} anchored offset={5} staticRefusals /></div>
<FieldNotes acts={acts} index={6} label="THE WALL OF RECTANGLES" />
<ActsReleased />
<section className="exhibition-act-question"><Acts acts={[acts[7]]} anchored offset={7} /></section>
</> },
{ label: "The archive", children: <>
<RoomEntrance number="03" title="THE ARCHIVE" detail="The instinct was there from the beginning." />
<Archive />
<FieldNotes acts={acts} index={8} label="READ THE FIRST RECORD" />
<section className="exhibition-evidence"><Acts acts={[acts[9]]} anchored offset={9} /></section>
<section className="exhibition-specimen-book"><span className="record-voice">29 AUGUST 2026 / HAUSE.DESIGN</span><h2>The design system<br/><em>exhibited in the design system.</em></h2><FieldNotes acts={acts} index={10} label="THE FIRST SPECIMEN BOOK" /></section>
</> },
{ label: "The language", children: <>
<RoomEntrance number="04" title="THE LANGUAGE" detail="The material tells you what the room needs to become." />
<ThreeRooms />
<FieldNotes acts={acts} index={11} label="WHY THREE MODES" />
<ReadingComparison act={acts[12]} />
<ExhibitionGrammar />
<section className="exhibition-procession"><Procession stages={["EXHIBITION", "CINEMATIC COMPOSITION", "FORMS", "SEMANTIC FORMS", "AI COMPOSITION"]} caption="THE ARTISTIC PROBLEM BECOMES A SYSTEMS QUESTION"/><FieldNotes acts={acts} index={13} label="THE QUESTION CHANGED" /></section>
<div className="exhibition-room-statement"><span className="record-voice">GIVE ONE IDEA THE WHOLE ROOM</span><RoomStatement act={acts[14]} index={14} /></div>
<FieldNotes acts={acts} index={15} label="INFORMATION HAS DRAMATURGY" />
</> },
{ label: "The performance", kind: 'operate', children: <>
<RoomEntrance number="05" title="THE PERFORMANCE" detail="The space between two states has meaning." />
<StagedTransition from="Claim." to="Evidence." kicker="ONE CHANGE / THREE AUTHORED BEATS" score={[{ label: "Exit.", description: "The claim leaves." }, { label: "Hold.", description: "A beat of empty space." }, { label: "Enter.", description: "The evidence arrives." }]} caption="The empty beat says that the first state has ended." />
<section id="act-17">
      <HauseFieldNotes className="authority-notes exhibition-field-notes" label="MOTION AS EXPLANATION" detail="READ +"><Acts acts={[{ ...performance, text: motion, references: performance.references?.slice(0, 1) }]} /></HauseFieldNotes>
      <div className="exhibition-act-question"><Acts acts={[{ ...performance, label: "DISCOVERED THROUGH MAKING", text: discovery, references: performance.references?.slice(1) }]} /></div>
    </section>
<section className="exhibition-final-question"><p className="record-voice">THE QUESTION CHANGED</p><span>How should I stage this idea?</span><b aria-hidden="true">↓</b><Acts acts={[acts[17]]} anchored offset={17} /></section>
</> }
]}/>;
}
