import Link from "next/link";
import { StudyRoom, StudySequence, StudyMeasures } from "@chrishayuk/hause/components/exhibition/Study";
import { FieldNotes } from "@chrishayuk/hause/components/FieldNotes";
import { Question } from "@chrishayuk/hause/components/forms/Question";
import { EvidenceTable } from "@chrishayuk/hause/components/EvidenceTable";
import { cell80FurtherPart } from "@/lib/cell80-further-records";
import type { PublicationRecord } from "@/lib/types";
import { Cell80Realization } from "./Cell80Realization";
import { NotebookFieldNotes } from "./NotebookFieldNotes";
import { Acts } from "./Acts";

function Barrier() {
  return <>
    <StudyRoom id="cell80-study" label="EX-11 / THE RESOURCE TEST" title={<>The pieces could not.<br/><em>The combination could.</em></>} tone="dark" description="I gave a new metabolic world a nutrient its existing programs could not process. Mutation could combine those programs at birth.">
      <StudyMeasures label="PROGRAMS PASSING ALL 64 REGISTERED INPUT PAIRS" items={[{value:"0/89",label:"typed primitives"},{value:"1/1,825",label:"compositions evaluated during mutation"}]} note="One successful expression, with repeated evolutionary origins. The resource was engineered; the claim concerns this tested library and interface."/>
      <div className="cell80-prose"><p>The new capability was assembled inside the evolving world. It gave invention something to do.</p></div>
      <FieldNotes label="What the world was asked to compute" detail="READ +"><div className="cell80-prose"><p>The nutrient required min(65535, a + (a XOR b)). The successful composition was add_sat(a, mask_xor(a,b)). Both the Cell80 tree interpreter and an independent bytecode interpreter agreed on all 64 resource inputs.</p><p>I knew that expression as a validation witness. I did not insert it into evolution or provide a pool screened for success. Mutation drew from 84 composable primitives. This finite design does not establish open-ended program invention.</p></div></FieldNotes>
    </StudyRoom>
    <StudyRoom label="DISCOVERY → PERSISTENCE" title={<>It appeared.<br/><em>Sometimes it stayed.</em></>}>
      <EvidenceTable caption="EX-11 / 40 WORLDS · 3,000 TICKS · 256 SLOTS" rowLabel="Conditions" columns={[{id:"appeared",label:"Capability appeared",unit:"worlds / 10"},{id:"retained",label:"Retention condition met",unit:"worlds / 10"}]} rows={[{id:"full",label:"Full evolution",values:{appeared:3,retained:2}},{id:"b",label:"Uptake mutation disabled",values:{appeared:2,retained:1}},{id:"substrate",label:"No substrate",values:{appeared:3,retained:0}},{id:"atomic",label:"Composition disabled",values:{appeared:0,retained:0}}]} note="Retention required establishment and at least 50% capable slots on average over the final 200 ticks. The registered 8/10 requirement applied to the uptake-disabled arm; it did not pass." source={{label:"Every primary world",href:"/data/cell80/followups/ex11-results.md"}}/>
      <div className="cell80-prose"><p>A capability appearing and a capability persisting are different observations. Without the nutrient, the same expression could arise and fail to establish.</p></div>
    </StudyRoom>
    <StudyRoom label="THE NEXT CHANGE ARRIVED EARLY" title={<>Evolution moved.<br/><em>The gate had not opened.</em></>} tone="accent">
      <StudySequence label="TWO FULL WORLDS / UPTAKE MUTATION → ESTABLISHMENT" steps={[{label:"SEED OFFSET +5",value:"2,050 → 2,069",detail:"The uptake mutation arrived 19 ticks before establishment."},{label:"SEED OFFSET +6",value:"560 → 564",detail:"The uptake mutation arrived four ticks before establishment."}]} note="Establishment meant at least 20% of slots for 50 consecutive completed ticks. These early events were descriptive observations, not replacement candidates."/>
      <StudyMeasures label="THE REGISTERED DEPENDENCE TEST" items={[{value:"0",label:"eligible candidates"},{value:"0",label:"primary dependence assays"}]} note="Conditional dependence was untested. The missing candidates are not evidence that the later change could never help."/>
      <div className="cell80-prose"><p>The barrier had been crossed. The registered ratchet criterion had not. That left a better next question: could a capability support another advance before it was established?</p></div>
      <Link className="text-link" href="/notebook/an-advantage-needs-a-chance-to-become-history">FOLLOW THE OPPORTUNITY ↗</Link>
    </StudyRoom>
  </>;
}

function InheritedHistory() {
  return <>
    <StudyRoom id="cell80-study" label="EX-13 / ONE SUPPORTED OPPORTUNITY" title={<>Passed on.<br/><em>Then lost.</em></>} tone="dark" description="A resource-processing program made higher uptake useful. Its descendants inherited both changes. Follow that one lineage through time.">
      <figure className="cell80-descendants"><figcaption className="record-voice">LIVING INTACT DESCENDANTS / ONE WORLD · 256 SLOTS</figcaption>
        <div className="cell80-descendant-bars">{[{label:"+50 TICKS",count:217},{label:"+200 TICKS",count:148},{label:"+500 TICKS",count:230},{label:"END / TICK 3,000",count:0}].map(point => <div key={point.label}><span className="record-voice">{point.label}</span><strong>{point.count}</strong><div className="cell80-descendant-track" aria-hidden="true"><i style={{height:`${point.count/256*100}%`}}/></div></div>)}</div>
        <p className="cell80-caption">One selected origin; exact inheritance of both changes along the descendant path. Shared scale: 0–256. Its entire event lineage went extinct at tick 1,268. <a href="/data/cell80/followups/ex13-results.md">Recorded cohort counts ↗</a></p>
      </figure>
      <div className="cell80-prose"><p>The world still contained the capability in other lineages. A program remaining common is not the same as this particular history surviving.</p></div>
    </StudyRoom>
    <StudyRoom label="BEFORE TRANSMISSION / EX-12" title={<>A useful opportunity.<br/><em>No offspring.</em></>}>
      <StudyMeasures label="A SEPARATE DISCOVERY MATRIX / EX-12" items={[{value:"1/4",label:"candidates passed both contexts"},{value:"0",label:"offspring in that child’s original history"}]} note="The supported child was overwritten in its birth phase. Three independent qualifying discoveries were required; one did not meet the replication gate."/>
      <div className="cell80-prose"><p>Controlled futures showed what the mutation could offer. The original history showed that its carrier never got to use it. EX-13 then found a different supported opportunity that did reach descendants.</p></div>
      <FieldNotes label="What counts as a supported opportunity?" detail="READ +"><div className="cell80-prose"><p>Four versions: neither change, resource-processing capability alone, high uptake alone, and both. Each candidate was tested in its actual birth-time ecology and in standardized worlds. Ten paired futures per context, with further mutation off.</p><p>The passing EX-12 case showed capability benefit in 9/10 futures and later uptake benefit with that capability in 10/10, in both contexts. Uptake alone did no better than the ancestor in 10/10. Required interaction counts and mean signs also passed. The two contexts remain separate; shared standardized cases are not independent discoveries.</p></div></FieldNotes>
    </StudyRoom>
    <StudyRoom label="BACK TO THE DESCENDANT / EX-13" title={<>Six wins.<br/><em>Four empty futures.</em></>} tone="accent">
      <StudyMeasures label="THE +200 CHECKPOINT / TEN PAIRED FUTURES" items={[{value:"6",label:"positive dependency effects"},{value:"4",label:"zero-offspring ties"},{value:"8",label:"wins required"}]} note="The lowest-ID intact descendant was chosen before its assay outcome was known. All four versions produced zero offspring in each tied future."/>
      <div className="cell80-prose"><p>Genetic persistence was visible. The later dependence test still failed its gate. But the four nonwins did not show the advantage reversing; they showed no reproduction at all.</p></div>
    </StudyRoom>
    <StudyRoom label="EX-14 / SEPARATE THE TWO QUESTIONS" title={<>Does it reproduce?<br/><em>Does the change help?</em></>} tone="dark" description="A separately registered follow-up returned to that descendant’s ecology with 100 paired futures.">
      <Cell80Realization/>
      <div className="cell80-prose"><p>The conditional advantage passed its 80% gate. The probability of leaving offspring remained a separate part of the result. EX-13’s original acceptance gate stays unchanged.</p></div>
    </StudyRoom>
    <StudyRoom label="EX-15 / REPLICATION PENDING" title={<>One history.<br/><em>Can it happen again?</em></>}>
      <Question text="Can independently evolved opportunities survive the whole sequence?" status="OPEN" detail="EX-15 seeks at least three cases through discovery, birth-time dependency, transmission, persistence and later conditional-effect support. It remains running with no reported outcome as checked on 10 September 2026."/>
      <div className="cell80-prose"><p>A further dependent advance has not been tested. Neither have historical necessity or environmental mediation. One inherited opportunity gives the next experiment a starting point.</p></div>
    </StudyRoom>
  </>;
}

export function Cell80FurtherNotebook({record}:{record:PublicationRecord}) {
  return <NotebookFieldNotes><div className="cell80-notebook cinematic-notebook">
    <nav className="cell80-entry-nav record-voice" aria-label="Explore this note"><a href="#cell80-study">ENTER THE STUDY ↓</a><a href="#cell80-record">READ THE FULL NOTE ↓</a><Link href="/thread/cell80#further-notes">CELL80 / FURTHER NOTES ↗</Link></nav>
    {cell80FurtherPart(record.id) === 1 ? <Barrier/> : <InheritedHistory/>}
    <section className="cell80-reading-record" id="cell80-record"><FieldNotes label="The complete note & its evidence" detail="READ +"><Acts acts={record.body} anchored staticRefusals/></FieldNotes></section>
  </div></NotebookFieldNotes>;
}

export function Cell80FurtherCard({part}:{part:number}) {
  return <div className="cell80-preview"><span className="record-voice">CELL80 / FURTHER NOTES · {part === 1 ? "EX-11" : "EX-12–14"}</span><strong className="cell80-further-card-number">{part === 1 ? "0 → 1" : "148 → 0"}</strong><p>{part === 1 ? <>Something new.<br/><em>Something useful.</em></> : <>Passed on.<br/><em>Then lost.</em></>}</p><span className="record-voice">{part === 1 ? "THE CAPABILITY BARRIER" : "THE FATE OF ONE LINEAGE"}</span></div>;
}
