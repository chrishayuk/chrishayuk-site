import { Cell80SurvivalGate } from "./Cell80EvidencePath";
import { Cell80Journey, Cell80Connection } from "./Cell80Journey";
import Link from "next/link";
import { StudyRoom, StudySequence, StudyMeasures } from "@chrishayuk/hause/components/exhibition/Study";
import { Statement } from "@chrishayuk/hause/components/forms/Statement";
import { Question } from "@chrishayuk/hause/components/forms/Question";
import { FieldNotes } from "@chrishayuk/hause/components/FieldNotes";
import { EvidenceTable } from "@chrishayuk/hause/components/EvidenceTable";
import type { PublicationRecord } from "@/lib/types";
import { cell80Part } from "@/lib/cell80";
import { Cell80Benefits, Cell80Dependence, Cell80Novelty, Cell80Replay, Cell80Survival } from "./Cell80Studies";
import { Cell80WorldReplay } from "./Cell80WorldReplay";
import { Cell80Meaning as Meaning } from "./Cell80Meaning";
import { Acts } from "./Acts";
import { NotebookFieldNotes } from "./NotebookFieldNotes";

function ReadingRecord({ record }: { record: PublicationRecord }) {
  return <section className="cell80-reading-record" id="cell80-record"><p className="record-voice">THE NOTE / AT READING PACE</p>
    <FieldNotes label="Read the complete note" detail="OPEN +"><Acts acts={record.body} anchored staticRefusals/></FieldNotes>
    <FieldNotes label="Measurements, methods & provenance" detail="OPEN +"><div className="cell80-prose"><p>The world viewers play spatial states exported by the Rust ecology engine. They do not run a new simulation in your browser. The other studies show recorded outcomes and an intervention diagram. Historical EX-4 and the later closure batch used different gene pools and assays.</p><p>The complete September closure batch contains 379 primary worlds plus verification runs. That is not the total across the earlier programme. First-step benefit counts direct offspring of a focal organism; the factorial assay counts total births in fresh founder populations.</p><p>Source reports and their file hashes are included with the evidence download. The EX-4 replay uses the historical gene library and reproduces the recorded birth and plurality event. The EX-9 replay matches the complete history hash of the selected closure world. Both show sampled end-of-tick states, without interpolating organism positions.</p></div>
      <div className="cell80-downloads"><a href="/data/cell80/followups.json" download>EX-11–14 sources + local measurements ↓</a><a href="/data/cell80/evidence.json" download>Recorded measurements + hashes ↓</a><a href="/data/cell80/historical-findings.md" download>Historical findings ↓</a><a href="/data/cell80/closure-results.md" download>Closure results ↓</a><a href="/data/cell80/closure-interpretation.md" download>Interpretation + limits ↓</a><a href="/data/cell80/preregistration.md" download>Registered tests ↓</a></div>
    </FieldNotes>
  </section>;
}

function PriorWork({ part }: { part: number }) {
  return <aside className="cell80-prior"><span className="record-voice">A PERSONAL EXPERIMENT / A DEEP OLD QUESTION</span>
    {part === 1 ? <p>Artificial-life researchers have built evolving digital organisms for decades. <a href="https://www.cs.cmu.edu/afs/cs.cmu.edu/project/ai-repository/ai/areas/alife/systems/tierra/0.html">Tierra</a> and <a href="https://cse.msu.edu/~ofria/pubs/2003LenskiEtAl.pdf">Avida</a> are important precedents. I built this small executable world because I wanted to see these distinctions for myself.</p> : part === 2 ? <p>In 1998, <a href="https://pubmed.ncbi.nlm.nih.gov/10352236/">Nolfi and Floreano</a> were already asking when coevolving predator and prey robots produce an arms race. Here I am examining what the particular rules of my small world sustain.</p> : <p>In 2003, <a href="https://cse.msu.edu/~ofria/pubs/2003LenskiEtAl.pdf">Lenski, Ofria, Pennock and Adami</a> used Avida to show complex functions building on previously evolved simpler ones. I had a smaller world with traceable lineages and replayable history. I wanted to see how far I could get.</p>}
  </aside>;
}

function ReplayNotebook() {
  return <>
    <StudyRoom id="cell80-study" label="01 / THE BIRTH" title={<>One world.<br/><em>Two histories.</em></>} tone="dark" description="Organisms in this digital world eat, move and inherit programs. I replayed one birth twice, keeping its program change in one world and undoing it in the other. Then I compared which program became most common.">
      <p className="cell80-watch">Load the replay, then jump to “The birth” and “The shift”. Amber marks carry the new reproduction program. Compare how common they become in the two histories.</p>
      <Cell80WorldReplay kind="lineage"/>
      <div className="cell80-scenario-learning cell80-prose"><h3>One birth changed what followed.</h3><p>The new reproduction program became the largest group: 35.3% of the population at time step 1,080. Undoing that program change at birth removed the sustained shift. “33” is its catalogue number, not a score.</p><p className="cell80-scenario-limit">One mutation explained one event. This does not make the program better everywhere.</p></div>
      </StudyRoom>
    <div className="notebook-threshold"><Statement text="If a world can be replayed," continuation="evolution can become an experiment." presentation="room"/></div>
    <StudyRoom label="02 / BEFORE THE INTERVENTION" title={<>First, make history<br/><em>repeat itself.</em></>} description="The replay test came before the causal claim. Without identical histories, I could not isolate what the intervention changed.">
      <StudySequence label="EX-0 → EX-4 / THE EXPERIMENTAL CHAIN" steps={[{label:"REPEAT",value:"Same seed.",detail:"Identical histories in the replay test."},{label:"COMPARE",value:"Same states.",detail:"CPU and GPU agree at every tested tick."},{label:"INTERVENE",value:"One field.",detail:"Change one birth, then measure what follows."}]} note="Both implementations matched at every tested tick. A seed fixes the starting randomness, so the same setup can be replayed."/>
      <div className="cell80-prose"><p>Each organism inherits programs and settings. A mutation changes one of them at birth; the consequences unfold as organisms compete for food.</p><p>Random choices are tied to the <Meaning term="seed">seed</Meaning>, tick, organism and purpose. Repeating the setup repeats those choices, including every tick before the birth I change.</p></div>
    </StudyRoom>
    <StudyRoom label="03 / FOLLOW THE LINEAGE" title={<>A change became common.<br/><em>Which birth mattered?</em></>} tone="accent" description="The child inherited two changes: a different reproduction program and a different numerical setting. I kept the new setting in both histories, so only the program differed.">
      <Cell80Replay/>
      <StudySequence label="EX-4 / RECORDED ANCESTRY" steps={[{label:"PARENT",value:"2059",detail:"Reproduction setting 198 · program 37."},{label:"BIRTH / TICK 994",value:"2231",detail:"Reproduction setting 192 · program 33."},{label:"SHIFT / TICK 1080",value:"35.3%",detail:"Program 33 becomes the most common."}]} note="Program numbers are labels, not scores. Program 33 peaked at 41.6% during the 100-tick check: the largest group, still less than half the population."/>
      <div className="cell80-prose"><p>The detector sampled every twenty ticks and required the new leader to persist for five further samples. Tracing their <Meaning term="lineage">lineage</Meaning> backward led to one birth with two mutations.</p><p>Undoing both changes would leave the explanation ambiguous. Holding the reproduction <Meaning term="threshold">setting</Meaning> fixed isolates the program’s effect on this history.</p></div>
    </StudyRoom>
    <StudyRoom label="04 / THE TEST CAN DISAPPOINT YOU" title={<>New code appeared.<br/><em>Did it help?</em></>}>
      <StudyMeasures label="EX-2 / ORIGINAL 15-ORIGIN COUNTERFACTUAL SAMPLE" items={[{value:"0",label:"helped"},{value:"12",label:"tied"},{value:"3",label:"harmed"}]} note="Offspring of the organism whose birth was changed. These fifteen births came from one seed and an earlier pool of combined programs; the later 108-birth test used a different pool."/>
      <div className="cell80-prose"><p>The same machinery tested an attractive early interpretation: perhaps combining existing movement programs helped the organisms. None of those fifteen changes helped its carrier leave more direct offspring.</p><p>A later experiment found useful compositions under different sampling and a different pool. This earlier result still matters: a gene appearing in the world was not enough to establish its value.</p></div>
      <Question text="We can ask what changed a history. What keeps it going?" status="OPEN" detail="One intervention explained one event. The next note asks what keeps predators and grazers present long enough for further evolution."/>
    </StudyRoom>
  </>;
}

function SurvivalNotebook() {
  return <>
    <StudyRoom id="cell80-study" label="WATCH / ONE POPULATED WORLD" title={<>Grazers eat food.<br/><em>Predators eat grazers.</em></>} tone="dark" description="I ran twelve digital worlds with food-eating grazers and grazer-eating predators. I varied how often their inherited programs changed, then checked whether both species survived 10,000 time steps. This replay shows one of those worlds.">
      <p className="cell80-watch">Play the world, then jump to its endpoint. Watch the grazer and predator counts: both can stay above zero without either species evolving in response to the other.</p>
      <Cell80WorldReplay kind="ecology"/>
      <div className="cell80-scenario-learning cell80-prose"><h3>Still here. Still evolving?</h3><p>Both species survived this world. Across the comparison, eleven of twelve worlds kept both alive. None of the eleven surviving worlds passed the tests for an evolutionary response between species.</p><p className="cell80-scenario-limit">An evolutionary arms race would mean a change in one species provoking a response in the other. Staying alive together does not establish that.</p></div>
      <FieldNotes label="Inside this world" detail="READ +"><div className="cell80-prose"><p>Grazers gain energy from food; predators gain it by killing grazers. Both spend energy, reproduce and inherit their parent’s species. Numerical settings can mutate, and each eligible program has a 2% swap chance at birth in this replay.</p><p>Marks group organisms sharing a square. Select a square to inspect it. The counts distinguish survival from empty space; the response tests below ask whether evolutionary changes are coupled.</p></div></FieldNotes>
    </StudyRoom>
    <StudyRoom id="cell80-endpoints" label="01 / KEEP THE WORLD POPULATED" title={<>Still alive.<br/><em>Still an open question.</em></>} tone="dark" description="Each mark below is a whole world. The two rows change the chance of replacing a program at birth: 1% or 2%. Select a mark to see the final population counts."><Cell80Survival/></StudyRoom>
    <StudyRoom label="02 / WHAT NEEDS TO CHANGE?" title={<>Change only the settings.<br/><em>Lose the predators.</em></>}>
      <StudyMeasures label="NUMERICAL-ONLY RETEST / SIX SEEDS · 10,000 TICKS" items={[{value:"6/6",label:"Full mutation",detail:"Both species alive at the endpoint."},{value:"0/6",label:"Numerical mutation only",detail:"Predators extinct in every seed."}]} note="This is the historical matched full-versus-numerical-only test, separate from the later low-swap matrix above."/>
      <div className="cell80-prose"><p>Numerical mutations alter settings such as reproduction thresholds. A <Meaning term="swap">program swap</Meaning> replaces the code used for movement or deciding when to reproduce. Changing only the numbers did not sustain the predators in these worlds.</p><p>The earlier mutation-off controls had already lost predators in all ten worlds across two otherwise robust configurations, measured at 3,000 ticks. Adding a pause after feeding did not rescue them.</p></div>
      <FieldNotes label="What the comparison establishes" detail="READ +"><div className="cell80-prose"><p>Access to program swapping matters to persistence under these conditions. The comparison does not isolate every population-level mechanism involved. Once one world has millions of births and another has collapsed, the histories differ in much more than a single visible trait.</p><p>Neither this test nor a 10,000-tick endpoint establishes indefinite coexistence.</p></div></FieldNotes>
    </StudyRoom>
    <div className="notebook-threshold"><Statement text="Living together" continuation="doesn’t prove an arms race." presentation="room"/></div>
    <StudyRoom label="03 / LOOK FOR A RESPONSE" title={<>Two populations change.<br/><em>Are they answering each other?</em></>} tone="accent" description="I looked for lasting program changes in one species followed by changes in the other. The pattern had to beat shuffled comparisons before I would test a particular birth by replay.">
      <Cell80SurvivalGate/>
      <StudySequence label="THE REGISTERED ARMS-RACE TEST" steps={[{label:"OBSERVE",value:"Programs change.",detail:"Look for lasting shifts in the programs each species carries."},{label:"COMPARE",value:"Could it be chance?",detail:"Compare with shuffled labels and shifted event timings."},{label:"IF BOTH PASS",value:"Causal replay.",detail:"Disrupt the proposed response at a traced birth."}]} note="Neither statistical check passed in any of the eleven surviving worlds, so the proposed response was not tested by replay."/>
      <div className="cell80-prose"><p>A population curve rises and falls for many reasons. An arms-race claim needs evidence that one side’s evolutionary change provokes a response on the other.</p><p>The original coupling screen failed. Removing program swaps could not test whether a high swap rate was obscuring a response, because it also removed the predators. The lower, nonzero rates supplied surviving worlds in which the same question could be asked.</p></div>
    </StudyRoom>
    <StudyRoom label="04 / KEEP THE LIMIT IN VIEW" title={<>The world continues.<br/><em>The signal is absent.</em></>}>
      <EvidenceTable caption="EX-9 / survival and tests for linked program changes" rowLabel="Swap rate" columns={[{id:"survived",label:"Both species alive",unit:"worlds"},{id:"tested",label:"Worlds tested"},{id:"passed",label:"Survivors passing either screen"}]} rows={[{id:"one",label:"1%",values:{survived:5,tested:6,passed:0}},{id:"two",label:"2%",values:{survived:6,tested:6,passed:0}}]} note="10,000 ticks. Each screen used p < .05/12. Numerical mutation remained active." source={{label:"Complete results",href:"/data/cell80/closure-results.md"}}/>
      <div className="cell80-prose"><p>These tests look for linked changes in inherited programs. They do not cover every kind of evolution between species, such as responses through numerical settings. Grazers also cannot directly sense predators in this world.</p><p>Both species survived in these conditions. I have not traced an evolutionary arms race between them.</p></div>
      <Question text="Can a useful change make the next advance possible?" status="OPEN" detail="A populated world gives evolution somewhere to happen. The next note asks whether one improvement helps make another possible."/>
    </StudyRoom>
  </>;
}

function InventionNotebook() {
  return <>
    <StudyRoom id="cell80-study" label="01 / DOES IT HELP? · EX-10" title={<>A change happened.<br/><em>Eight of them helped.</em></>} tone="dark" description="In this digital world, grazers inherit programs that control their movement. I combined existing programs and replayed 108 births with the new program kept or undone. Then I counted each changed organism’s own offspring.">
      <p className="cell80-watch">Each mark is one birth replayed twice. Select a plus, dot or minus to compare offspring with the new movement program kept and undone.</p>
      <Cell80Benefits/>
      <div className="cell80-scenario-learning cell80-prose"><h3>Helpful was rare. New behaviour was rarer.</h3><p>Eight changes increased offspring; 84 tied and 16 reduced them. I then checked whether the eight helpful programs made choices that the original library could not.</p></div>
    </StudyRoom>
    <StudyRoom label="02 / NOVELTY" title={<>Different code.<br/><em>Often the same decision.</em></>} description="Five of the eight helpful combinations made the same movement choices as a program already in the library, for every possible food reading in this world."><Cell80Novelty/><div className="cell80-prose"><p>Three helpful combinations made different choices in this test. All the combinations were prepared before the world ran. Here, evolution inherited prepared programs; it did not assemble them at birth.</p></div></StudyRoom>
    <StudyRoom label="03 / SUCCESSION" title={<>It helped.<br/><em>Then something else helped.</em></>} tone="accent" description="Next I followed descendants that kept the new movement program. I tested later changes to their reproduction settings, again by keeping or undoing each change at birth.">
      <StudyMeasures label="72 LATER SETTING CHANGES / KEPT OR UNDONE" items={[{value:"2",label:"helped"},{value:"69",label:"tied"},{value:"1",label:"harmed"}]} note="Each comparison counts the changed organism’s own offspring. The tested descendants still carried the earlier combined movement program."/>
      <StudySequence label="TWO RECORDED CANDIDATES" steps={[{label:"597 → 638",value:"50 → 48",detail:"Offspring energy share · +1 direct offspring."},{label:"4964 → 4975",value:"210 → 202",detail:"Reproduction threshold · +2 direct offspring."}]} note="In the threshold candidate, the simultaneous energy-share change is held fixed when the threshold is reverted."/>
      <div className="cell80-prose"><p>Two changes helped, one after the other. I then tested their <Meaning term="interaction">interaction</Meaning>: did the first change make the second more useful?</p></div>
    </StudyRoom>
    <StudyRoom label="04 / DEPENDENCE" title={<>Would it still help<br/><em>without the first change?</em></>} description="Did better movement make the later reproduction change more useful? I tested four versions: neither change, each alone, and both. Here I count births across a whole test population."><p className="cell80-watch">Compare the later setting’s benefit with old movement and with new movement. If the first change helps the second, the second gain should be larger.</p><Cell80Dependence/></StudyRoom>
    <StudyRoom label="05 / WHAT WOULD MAKE THE DIFFERENCE?" title={<>Two improvements.<br/><em>One missing connection.</em></>} tone="dark">
      <div className="cell80-prose"><p>Neither sequence passed the test: the first change did not reliably increase the value of the second. A stronger result would show that the later change could only help once the earlier capability existed.</p><p>I tested that next in a different world, with a new kind of food. The later experiments found a useful capability and followed what its descendants inherited.</p></div>
      <StudySequence label="FOLLOW THE LATER EXPERIMENTS" steps={[{label:"EX-11 / A NEW CAPABILITY",value:"Something to unlock.",detail:"Could evolution assemble a program that uses food the existing pieces cannot?"},{label:"EX-12–14 / INHERITANCE",value:"A chance to pass it on.",detail:"Could a useful change reach descendants—and still help them?"}]} note="These later tests use a new metabolic world. The earlier movement result above remains unchanged."/>
      <div className="inline-links"><Link className="text-link" href="/notebook/give-invention-something-to-unlock">READ THE CAPABILITY NOTE ↗</Link><Link className="text-link" href="/notebook/an-advantage-needs-a-chance-to-become-history">FOLLOW THE DESCENDANTS ↗</Link></div>
      <Question text="Can one invention make the next possible?" status="OPEN" detail="The next two notes follow that question. A repeating chain of dependent advances remains untested."/>
    </StudyRoom>
  </>;
}

export function Cell80Notebook({ record }: { record: PublicationRecord }) {
  const part = cell80Part(record.id);
  return <NotebookFieldNotes><div className="cell80-notebook cinematic-notebook"><Cell80Journey id={record.id}/><nav className="cell80-entry-nav record-voice" aria-label="Explore this note"><a href="#cell80-study">ENTER THE STUDY ↓</a><a href="#cell80-record">READ THE FULL NOTE ↓</a><Link href="/thread/cell80">ALL SIX NOTES ↗</Link></nav><p className="cell80-reading-key">Dotted terms have short explanations.</p>{part === 1 ? <ReplayNotebook/> : part === 2 ? <SurvivalNotebook/> : <InventionNotebook/>}<Cell80Connection id={record.id}/><PriorWork part={part}/><ReadingRecord record={record}/></div></NotebookFieldNotes>;
}

export function Cell80Card({ part, compact = false }: { part: number; compact?: boolean }) {
  return <div className="cell80-preview" data-compact={compact} aria-label={part===1 ? "Two inherited fields, one intervention" : part===2 ? "Survival and coevolution are separate questions" : "The unresolved connection between improvement and invention"}>
    <span className="record-voice">CELL80 / 0{part}</span>
    {part === 1 ? <><div className="cell80-preview-fork"><span>33</span><i/><span>37</span></div><p>One birth.<br/><em>Two histories.</em></p></> : part === 2 ? <><div className="cell80-preview-species" aria-hidden="true"><i/><b/></div><p>Still alive.<br/><em>Still a question.</em></p></> : <><div className="cell80-preview-gap" aria-hidden="true"><i/><b>···</b><i/></div><p>What makes<br/><em>the next step possible?</em></p></>}
    <span className="record-voice">{part===1 ? "INTERVENTION DIAGRAM" : part===2 ? "SURVIVAL ≠ COEVOLUTION" : "THE RATCHET / OPEN"}</span>
  </div>;
}
