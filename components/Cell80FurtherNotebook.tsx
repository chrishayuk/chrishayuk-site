import { Cell80TimingGate, Cell80InheritanceGate } from "./Cell80EvidencePath";
import { Cell80Journey, Cell80Connection } from "./Cell80Journey";
import Link from "next/link";
import barrierIndex from "@/lib/data/cell80-barrier-index.json";
import inheritedHistory from "@/lib/data/cell80-inherited-history.json";
import { StudyRoom, StudyMeasures } from "@chrishayuk/hause/components/exhibition/Study";
import { FieldNotes } from "@chrishayuk/hause/components/FieldNotes";
import { Question } from "@chrishayuk/hause/components/forms/Question";
import { EvidenceTable } from "@chrishayuk/hause/components/EvidenceTable";
import { cell80FurtherPart } from "@/lib/cell80-further-records";
import type { PublicationRecord } from "@/lib/types";
import { Cell80InheritedHistory } from "./Cell80InheritedHistory";
import { Cell80BarrierWorld, Cell80BarrierOutcomes } from "./Cell80Barrier";
import { Cell80Realization } from "./Cell80Realization";
import { NotebookFieldNotes } from "./NotebookFieldNotes";
import { Cell80Meaning as Meaning } from "./Cell80Meaning";
import { Acts } from "./Acts";

function Barrier() {
  return <>
    <StudyRoom id="cell80-study" label="EX-11 / THE RESOURCE TEST" title={<>The pieces could not.<br/><em>The combination could.</em></>} tone="dark" description="In this digital world, organisms need a program to process their food. I added a nutrient the existing programs could not use, let mutations combine those programs at birth, and checked which combinations could use the new food.">
      <p className="cell80-watch">Play this history, then choose “New food removed” or “No combinations”. Coloured squares count organisms able to process the new food; they do not show their positions.</p>
      <Cell80BarrierWorld/>
      <StudyMeasures label="PROGRAMS THAT PASSED ALL 64 FOOD-PROCESSING CHECKS" items={[{value:"0/89",label:"existing building-block programs"},{value:"1/1,825",label:"combined programs tested during mutation"}]} note="One combination passed, appearing independently more than once. I designed this nutrient for the test; the result applies to this program library."/>
      <div className="cell80-scenario-learning cell80-prose"><h3>Evolution assembled a working answer.</h3><p>The building blocks—<Meaning term="primitive">primitives</Meaning>—failed alone. One <Meaning term="composition">combination</Meaning> could process the new food, and was assembled at birth inside the world.</p></div>
      <FieldNotes label="What the world was asked to compute" detail="READ +"><div className="cell80-prose"><p>The nutrient required min(65535, a + (a XOR b)). The successful composition was add_sat(a, mask_xor(a,b)). Both the Cell80 tree interpreter and an independent bytecode interpreter agreed on all 64 resource inputs.</p><p>I knew one working answer, which I used to check that the test itself worked. I did not insert it into evolution or provide a pool screened for success. Mutation could combine 84 of the library’s building-block programs. This finite design does not establish open-ended program invention.</p></div></FieldNotes>
      <p className="cell80-caption">The earlier <Link href="/notebook/when-does-improvement-become-invention">movement experiment</Link> asked whether combined programs made new choices. This test uses a different world and a food-processing task.</p>
    </StudyRoom>
    <StudyRoom label="DISCOVERY → PERSISTENCE" title={<>It appeared.<br/><em>Sometimes it stayed.</em></>} description="A working program can be born and disappear. I ran ten worlds per condition to separate discovering the capability from keeping it common.">
      <Cell80BarrierOutcomes/>
      <FieldNotes label="Exact counts and the retention rule" detail="READ +"><EvidenceTable caption="EX-11 / 40 WORLDS · 3,000 TIME STEPS · ROOM FOR 256 ORGANISMS" rowLabel="Conditions" columns={[{id:"appeared",label:"Capability appeared",unit:"worlds / 10"},{id:"retained",label:"Capability stayed common",unit:"worlds / 10"}]} rows={[{id:"full",label:"Full evolution",values:{appeared:3,retained:2}},{id:"b",label:"Food intake could not increase",values:{appeared:2,retained:1}},{id:"substrate",label:"New nutrient removed",values:{appeared:3,retained:0}},{id:"atomic",label:"Programs could not combine",values:{appeared:0,retained:0}}]} note="To count as retained, the capability had to become established, then occupy at least half the 256 places on average over the final 200 ticks. With food-intake changes disabled, eight of ten worlds had to pass. Only one did." source={{label:"Every primary world",href:"/data/cell80/followups/ex11-results.md"}}/></FieldNotes>
      <div className="cell80-prose"><p>Without combinations, the capability never appeared. Without the new food, it appeared in three worlds but never became established. Having something useful to do mattered to whether it stayed.</p></div>
    </StudyRoom>
    <StudyRoom label="THE NEXT CHANGE ARRIVED EARLY" title={<>Evolution moved.<br/><em>The test was not ready.</em></>} tone="accent" description="The planned next test asked whether increased food intake needed the new processing program. It required that program to become established first. In both candidate histories, the intake change arrived earlier.">
      <Cell80TimingGate/>
      <StudyMeasures label="THE REGISTERED DEPENDENCE TEST" items={[{value:"0",label:"sequences that met the timing rule"},{value:"0",label:"dependence tests run"}]} note="With no qualifying sequence, I could not test whether the later change needed the earlier capability. That question remained untested."/>
      <div className="cell80-prose"><p>The timing and retention <Meaning term="gate">pass conditions</Meaning> were not met. That left dependence unanswered. The next experiment asked whether a capability could support another useful change before becoming established.</p></div>
      <Link className="text-link" href="/notebook/an-advantage-needs-a-chance-to-become-history">FOLLOW THE OPPORTUNITY ↗</Link>
    </StudyRoom>
  </>;
}

function InheritedHistory() {
  return <>
    <StudyRoom id="cell80-study" label="EX-13 / FOLLOW ONE ORGANISM’S FAMILY" title={<>Passed on.<br/><em>Then lost.</em></>} tone="dark" description="In a digital world, I tested a new food-processing program and a later change that increased food intake. Then I followed one organism’s descendants to see how long they kept both changes.">
      <p className="cell80-watch">Play the family’s history, then jump to its end. Follow the descendants carrying both changes, separately from other families with the same food-processing program.</p>
      <Cell80InheritedHistory/>
      <FieldNotes label="Four recorded checkpoints" detail="READ +"><figure className="cell80-descendants"><figcaption className="record-voice">LIVING DESCENDANTS STILL CARRYING BOTH CHANGES</figcaption>
        <div className="cell80-descendant-bars">{[{label:"+50 TICKS",count:217},{label:"+200 TICKS",count:148},{label:"+500 TICKS",count:230},{label:"END / TICK 3,000",count:0}].map(point => <div key={point.label}><span className="record-voice">{point.label}</span><strong>{point.count}</strong><div className="cell80-descendant-track" aria-hidden="true"><i style={{height:`${point.count/256*100}%`}}/></div></div>)}</div>
        <p className="cell80-caption">The first three times are measured from the chosen organism’s birth. A tick is one time step. Each descendant must have inherited both changes without a break. Scale: 0–256 places. The entire family died out at tick 1,268. <a href="/data/cell80/followups/ex13-results.md">Recorded cohort counts ↗</a></p>
      </figure></FieldNotes>
      <div className="cell80-scenario-learning cell80-prose"><h3>The capability survived. This family did not.</h3><p>Descendants inherited both changes and numbered 230 at the third checkpoint. The entire <Meaning term="lineage">family</Meaning> later died out. Other families still carried the food-processing program.</p></div>
      <p className="cell80-caption">The <Link href="/notebook/give-invention-something-to-unlock">preceding note</Link> explains how programs evolved to use this new food.</p>
    </StudyRoom>
    <StudyRoom label="BEFORE TRANSMISSION / EX-12" title={<>A useful opportunity.<br/><em>No offspring.</em></>}>
      <StudyMeasures label="EX-12 / AN EARLIER EXPERIMENT WITH DIFFERENT ORGANISMS" items={[{value:"1/4",label:"organisms passed both sets of tests"},{value:"0",label:"offspring in that child’s original history"}]} note="Another birth replaced that child before it could reproduce. The experiment required three independently discovered cases that passed the tests; it found one."/>
      <div className="cell80-prose"><p>The tests showed that the mutation could help in other possible futures. But the child left no offspring in the history that actually happened. EX-13 found a different organism whose useful changes did reach descendants.</p></div>
      <FieldNotes label="How did I test whether the changes helped?" detail="READ +"><div className="cell80-prose"><p>Four versions: neither change, resource-processing capability alone, high uptake alone, and both. Each candidate was tested in its actual birth-time ecology and in standardized worlds. Ten paired futures per context, with further mutation off.</p><p>The passing EX-12 case showed capability benefit in 9/10 futures and later uptake benefit with that capability in 10/10, in both contexts. Uptake alone did no better than the ancestor in 10/10. Required interaction counts and mean signs also passed. The two contexts remain separate; shared standardized cases are not independent discoveries.</p></div></FieldNotes>
    </StudyRoom>
    <StudyRoom label="BACK TO THE DESCENDANT / EX-13" title={<>Six wins.<br/><em>Four empty futures.</em></>} tone="accent" description="I took one descendant and replayed ten possible futures with neither change, each change alone, and both. The test asked whether the later intake change still depended on the earlier food-processing capability.">
      <Cell80InheritanceGate/>
      <StudyMeasures label="200 STEPS AFTER BIRTH / TEN MATCHED COMPARISONS" items={[{value:"6",label:"comparisons supported dependence"},{value:"4",label:"comparisons produced no offspring"},{value:"8",label:"wins required"}]} note="I chose the living descendant with the lowest ID before running its tests. All four versions produced zero offspring in each of the four tied comparisons."/>
      <div className="cell80-prose"><p>The changes had been inherited. The later test still failed: it needed eight successful comparisons, and got six. In the other four, every version left no offspring.</p></div>
    </StudyRoom>
    <StudyRoom label="EX-14 / SEPARATE THE TWO QUESTIONS" title={<>Does it reproduce?<br/><em>Does the change help?</em></>} tone="dark" description="I returned to the same descendant’s world and ran 100 matched comparisons: with the higher food-intake setting, and without it. I counted births across the organism’s family over 200 time steps.">
      <p className="cell80-watch">Each mark is one pair of futures for the same organism. Select a plus to see where higher intake helped, or a dot to see where neither version reproduced.</p>
      <Cell80Realization/>
      <div className="cell80-prose"><p>Higher intake increased family births in 63 of the 64 comparisons where either version reproduced. In the other 36, neither did. An advantage can help a family grow only if it gets a chance to reproduce.</p><p className="cell80-caption">The raw file and report disagree on one comparison’s classification. The 63/64 result agrees; the discrepancy remains unresolved and independent replication is pending.</p></div>
    </StudyRoom>
    <StudyRoom label="THE NEXT QUESTION IN THIS RECORD / EX-15" title={<>One history.<br/><em>Can it happen again?</em></>}>
      <Question text="Can evolution produce this whole sequence again?" status="OPEN" detail="EX-15 seeks at least three independently evolved cases: a useful capability, a later change that needs it, descendants carrying both, and a benefit that still appears in later tests. The source snapshot checked on 10 September 2026 records no outcome; these assays do not establish independent replication."/>
      <div className="cell80-prose"><p>I have not tested whether these descendants can add a third change that depends on the first two. Nor have I shown that the first capability was the only historical route to this outcome. Those are further questions.</p></div>
    </StudyRoom>
  </>;
}

export function Cell80FurtherNotebook({record}:{record:PublicationRecord}) {
  return <NotebookFieldNotes><div className="cell80-notebook cinematic-notebook">
    <Cell80Journey id={record.id}/><nav className="cell80-entry-nav record-voice" aria-label="Explore this note"><a href="#cell80-study">ENTER THE STUDY ↓</a><a href="#cell80-record">READ THE FULL NOTE ↓</a><Link href="/thread/cell80#further-notes">ALL SIX NOTES ↗</Link></nav><p className="cell80-reading-key">Dotted terms have short explanations.</p>
    {cell80FurtherPart(record.id) === 1 ? <Barrier/> : <InheritedHistory/>}
    <Cell80Connection id={record.id}/><section className="cell80-reading-record" id="cell80-record"><FieldNotes label="The complete note & its evidence" detail="READ +"><Acts acts={record.body} anchored staticRefusals/></FieldNotes></section>
  </div></NotebookFieldNotes>;
}

export function Cell80FurtherCard({part}:{part:number}) {
  const checkpoints=[50,200,500].map(age=>({label:`+${age}`,count:inheritedHistory.frames[age][2]}));
  checkpoints.push({label:"END",count:inheritedHistory.frames.at(-1)![2]});
  return <div className="cell80-preview cell80-further-preview"><span className="record-voice">CELL80 / 0{part+3} · {part===1?"EX-11":"EX-12–14"}</span>
    {part===1?<div className="cell80-barrier-preview" role="img" aria-label="Forty worlds: the capability was retained in two full-evolution worlds, one with fixed food intake, and none in either control.">{["full","b_only","no_substrate","atomic_only"].map((arm,i)=><div key={arm}><span className="record-voice">{["FULL EVOLUTION","FIXED INTAKE","NO NEW FOOD","NO COMBINATIONS"][i]}</span><div>{barrierIndex.worlds.filter(w=>w.arm===arm).map(w=><i key={w.key} data-result={w.retained?"retained":w.origins?"appeared":"absent"}/>)}</div></div>)}</div>:<div className="cell80-history-preview" role="img" aria-label="Descendants carrying both changes: 217 after 50 steps, 148 after 200, 230 after 500, zero at the end.">{checkpoints.map(c=><div key={c.label}><strong>{c.count}</strong><div><i style={{height:`${c.count/256*100}%`}}/></div><span className="record-voice">{c.label}</span></div>)}</div>}
    <p>{part===1?<>Something new.<br/><em>Will it stay?</em></>:<>Passed on.<br/><em>Then lost.</em></>}</p><span className="record-voice">{part===1?"40 RECORDED WORLDS":"ONE RECORDED FAMILY"} · OPEN TO PLAY ↗</span>
  </div>;
}
