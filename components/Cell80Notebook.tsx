import Link from "next/link";
import { StudyRoom, StudySequence, StudyMeasures } from "@chrishayuk/hause/components/exhibition/Study";
import { Statement } from "@chrishayuk/hause/components/forms/Statement";
import { Question } from "@chrishayuk/hause/components/forms/Question";
import { FieldNotes } from "@chrishayuk/hause/components/FieldNotes";
import { EvidenceTable } from "@chrishayuk/hause/components/EvidenceTable";
import type { PublicationRecord } from "@/lib/types";
import { cell80Part } from "@/lib/cell80";
import { Cell80Benefits, Cell80Dependence, Cell80Novelty, Cell80Replay, Cell80Survival } from "./Cell80Studies";
import { Cell80Realization } from "./Cell80Realization";
import { Cell80WorldReplay } from "./Cell80WorldReplay";
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
    <StudyRoom id="cell80-study" label="01 / THE BIRTH" title={<>One world.<br/><em>Two histories.</em></>} tone="dark" description="Organisms eat, move and inherit code. Replay one birth, undo its program change, and watch what follows. A tick is one step of the world’s clock.">
      <Cell80WorldReplay kind="lineage"/>
      <div className="cell80-scenario-learning cell80-prose"><h3>One birth changed what followed.</h3><p>Program 33 became the most common reproduction program: 35.3% of the population at tick 1,080. Undoing its change at birth removed that sustained shift.</p><p className="cell80-scenario-limit">One mutation explained one event. This does not make the program better everywhere.</p></div>
      <FieldNotes label="The intervention, field by field" detail="OPEN +"><Cell80Replay/></FieldNotes></StudyRoom>
    <div className="notebook-threshold"><Statement text="If a world can be replayed," continuation="evolution can become an experiment." presentation="room"/></div>
    <StudyRoom label="02 / BEFORE THE INTERVENTION" title={<>First, make history<br/><em>repeat itself.</em></>} description="The replay test came before the causal claim. Without identical histories, I could not isolate what the intervention changed.">
      <StudySequence label="EX-0 → EX-4 / THE EXPERIMENTAL CHAIN" steps={[{label:"REPEAT",value:"Same seed.",detail:"Identical histories in the replay test."},{label:"COMPARE",value:"Same states.",detail:"CPU and GPU agree at every tested tick."},{label:"INTERVENE",value:"One field.",detail:"Change one birth, then measure what follows."}]} note="Parity was established at the tested scope. The particular combination is engineering I built, not a claim to invent causal lineage analysis."/>
      <div className="cell80-prose"><p>Organisms in Cell80 carry small programs and numerical settings. They eat, move, reproduce and die. A mutation can change what an offspring does, and the consequences unfold among other organisms competing for resources.</p><p>Each random draw is tied to its seed, tick, organism and purpose. Running the same setup again gives me a history I can compare, including every tick before the edited birth.</p></div>
    </StudyRoom>
    <StudyRoom label="03 / FOLLOW THE LINEAGE" title={<>A change became common.<br/><em>Which birth mattered?</em></>} tone="accent">
      <StudySequence label="EX-4 / RECORDED ANCESTRY" steps={[{label:"PARENT",value:"2059",detail:"Threshold 198 · program 37."},{label:"BIRTH / TICK 994",value:"2231",detail:"Threshold 192 · program 33."},{label:"SHIFT / TICK 1080",value:"35.3%",detail:"Program 33 becomes the sustained plurality."}]} note="One traced origin. Share peaks at 41.6% in the sustain window. This was not a majority, takeover or fixation."/>
      <div className="cell80-prose"><p>The detector sampled every twenty ticks and required the new leader to persist for five further samples. Tracing the carriers backward led to one birth with two mutations.</p><p>Undoing both changes would leave the explanation ambiguous. The comparison retains the new threshold in both histories and changes only the inherited reproduction program. The detected shift no longer occurs.</p></div>
    </StudyRoom>
    <StudyRoom label="04 / THE TEST CAN DISAPPOINT YOU" title={<>New code appeared.<br/><em>Did it help?</em></>}>
      <StudyMeasures label="EX-2 / ORIGINAL 15-ORIGIN COUNTERFACTUAL SAMPLE" items={[{value:"0",label:"helped"},{value:"12",label:"tied"},{value:"3",label:"harmed"}]} note="Focal direct offspring. One seed and a historical composition pool; the later 108-origin assay is not an exact replication."/>
      <div className="cell80-prose"><p>The same machinery tested an attractive early interpretation: perhaps organisms were exploiting composed movement genes. None of those fifteen changes helped its carrier leave more direct offspring.</p><p>A later experiment found useful compositions under different sampling and a different pool. This earlier result still matters: a gene appearing in the world was not enough to establish its value.</p></div>
      <Question text="We can ask what changed a history. What keeps it going?" status="OPEN" detail="One intervention explained one event. The next note asks what keeps predators and grazers present long enough for further evolution."/>
    </StudyRoom>
  </>;
}

function SurvivalNotebook() {
  return <>
    <StudyRoom id="cell80-study" label="WATCH / ONE POPULATED WORLD" title={<>Grazers eat food.<br/><em>Predators eat grazers.</em></>} tone="dark" description="Sixty grazers. Ten predators. Inherited programs that can change at birth. Follow both populations through 10,000 ticks—steps of the world’s clock.">
      <Cell80WorldReplay kind="ecology"/>
      <div className="cell80-scenario-learning cell80-prose"><h3>Still here. Still evolving?</h3><p>Both species survived this world. Across the comparison, eleven of twelve worlds kept both alive. None of the eleven survivors passed the registered arms-race screens.</p><p className="cell80-scenario-limit">Coexistence gives evolution time. It does not show that each species evolved in response to the other.</p></div>
      <FieldNotes label="Inside this world" detail="READ +"><div className="cell80-prose"><p>Grazers gain energy from food; predators gain it by killing grazers. Both spend energy, reproduce and inherit their parent’s species. Numerical settings can mutate, and each eligible program has a 2% swap chance at birth in this replay.</p><p>Marks group organisms sharing a square. Select a square to inspect it. The counts distinguish survival from empty space; the response tests below ask whether evolutionary changes are coupled.</p></div></FieldNotes>
    </StudyRoom>
    <StudyRoom id="cell80-endpoints" label="01 / KEEP THE WORLD POPULATED" title={<>Still alive.<br/><em>Still an open question.</em></>} tone="dark" description="At low but nonzero program-swap rates, predators and grazers survive together in eleven of twelve worlds. Select one to inspect its recorded endpoint."><Cell80Survival/></StudyRoom>
    <StudyRoom label="02 / WHAT NEEDS TO CHANGE?" title={<>Keep the numbers moving.<br/><em>Lose the predators.</em></>}>
      <StudyMeasures label="NUMERICAL-ONLY RETEST / SIX SEEDS · 10,000 TICKS" items={[{value:"6/6",label:"Full mutation",detail:"Both species alive at the endpoint."},{value:"0/6",label:"Numerical mutation only",detail:"Predators extinct in every seed."}]} note="This is the historical matched full-versus-numerical-only test, separate from the later low-swap matrix above."/>
      <div className="cell80-prose"><p>Numerical mutations alter settings such as reproduction thresholds. Program swaps replace a gene used for movement or deciding when to reproduce. Changing only the numbers did not sustain the predators in these worlds.</p><p>The earlier mutation-off controls had already lost predators in all ten worlds across two otherwise robust configurations, measured at 3,000 ticks. Adding a pause after feeding did not rescue them.</p></div>
      <FieldNotes label="What the comparison establishes" detail="READ +"><div className="cell80-prose"><p>Access to program swapping matters to persistence under these conditions. The comparison does not isolate every population-level mechanism involved. Once one world has millions of births and another has collapsed, the histories differ in much more than a single visible trait.</p><p>Neither this test nor a 10,000-tick endpoint establishes indefinite coexistence.</p></div></FieldNotes>
    </StudyRoom>
    <div className="notebook-threshold"><Statement text="Coexistence" continuation="isn’t coevolution." presentation="room"/></div>
    <StudyRoom label="03 / LOOK FOR A RESPONSE" title={<>Two populations change.<br/><em>Are they answering each other?</em></>} tone="accent">
      <StudySequence label="THE REGISTERED ARMS-RACE TEST" steps={[{label:"OBSERVE",value:"Trait changes.",detail:"Sustained changes in categorical role programs."},{label:"COMPARE",value:"Two nulls.",detail:"Label permutations and circular shifts."},{label:"IF BOTH PASS",value:"Causal replay.",detail:"Disrupt the proposed response at a traced birth."}]} note="The final stage was not triggered. None of the eleven surviving low-swap worlds passed either screen."/>
      <div className="cell80-prose"><p>A population curve rises and falls for many reasons. An arms-race claim needs evidence that one side’s evolutionary change provokes a response on the other.</p><p>The original coupling screen failed. Removing program swaps could not test whether a high swap rate was obscuring a response, because it also removed the predators. The lower, nonzero rates supplied surviving worlds in which the same question could be asked.</p></div>
    </StudyRoom>
    <StudyRoom label="04 / KEEP THE LIMIT IN VIEW" title={<>The world continues.<br/><em>The signal is absent.</em></>}>
      <EvidenceTable caption="EX-9 / finite-horizon survival and categorical coupling" rowLabel="Swap rate" columns={[{id:"survived",label:"Both species alive",unit:"worlds"},{id:"tested",label:"Worlds tested"},{id:"passed",label:"Survivors passing either screen"}]} rows={[{id:"one",label:"1%",values:{survived:5,tested:6,passed:0}},{id:"two",label:"2%",values:{survived:6,tested:6,passed:0}}]} note="10,000 ticks. Each screen used p < .05/12. Numerical mutation remained active." source={{label:"Complete results",href:"/data/cell80/closure-results.md"}}/>
      <div className="cell80-prose"><p>The detector examines a particular categorical pattern. It does not measure every kind of coevolution, including continuous numerical-trait responses. Grazers in this world have no direct predator-sensing channel.</p><p>My conclusion is therefore bounded: the ecology stayed populated, but a traced arms race remains unestablished.</p></div>
      <Question text="Can a useful change make the next advance possible?" status="OPEN" detail="A populated world gives evolution somewhere to happen. The final note asks whether its improvements build on one another."/>
    </StudyRoom>
  </>;
}

function InventionNotebook() {
  return <>
    <StudyRoom id="cell80-study" label="LATEST / EX-14 · 10 SEPTEMBER" title={<>A useful invention.<br/><em>A chance to use it.</em></>} tone="dark" description="An evolved program unlocks a nutrient. A later mutation takes in more. In a descendant’s world, does that second change still help?">
      <Cell80Realization/>
      <div className="cell80-prose"><p>The advantage usually appeared when reproduction happened. Many futures ended before either version left offspring. That distinction changes how I read the earlier failed test.</p></div>
    </StudyRoom>
    <StudyRoom label="01 / THE EARLIER TEST · EX-10" title={<>A change happened.<br/><em>Eight of them helped.</em></>} description="Start with the earlier grazer world. Replay 108 births with and without a composed movement program. Each mark compares the organism’s direct offspring.">
      <Cell80Benefits/>
      <div className="cell80-prose"><p><strong>The first result:</strong> eight of the 108 changes helped locally. That gives us eight candidates to examine for new behaviour; an offspring advantage alone does not tell us whether a program does something new.</p></div>
    </StudyRoom>
    <StudyRoom label="02 / NOVELTY" title={<>Different code.<br/><em>Often the same decision.</em></>} description="Five of the eight helpful compositions chose the same immediate actions as an existing library gene across every food-input triple in this world."><Cell80Novelty/><div className="cell80-prose"><p>Three helpful compositions had distinct signatures in this domain. That is a bounded kind of novelty. The compositions were prepared offline before the ecology ran; these experiments did not demonstrate online program invention.</p></div></StudyRoom>
    <StudyRoom label="03 / SUCCESSION" title={<>It helped.<br/><em>Then something else helped.</em></>} tone="accent">
      <StudyMeasures label="72 FOLLOW-ON NUMERICAL REVERTS" items={[{value:"2",label:"helped"},{value:"69",label:"tied"},{value:"1",label:"harmed"}]} note="Local direct-offspring effects in descendants that retained the first composed movement gene."/>
      <StudySequence label="TWO RECORDED CANDIDATES" steps={[{label:"597 → 638",value:"50 → 48",detail:"Offspring energy share · +1 direct offspring."},{label:"4964 → 4975",value:"210 → 202",detail:"Reproduction threshold · +2 direct offspring."}]} note="In the threshold candidate, the simultaneous energy-share change is held fixed when the threshold is reverted."/>
      <div className="cell80-prose"><p>Two helpful changes in succession were worth investigating. The next test asked whether the first change contributed to the second change’s value.</p></div>
    </StudyRoom>
    <StudyRoom label="04 / DEPENDENCE" title={<>Would it still help<br/><em>without the first change?</em></>} description="Compare old and composed movement with either version of the later numerical allele. Select a candidate and a held-out world to inspect all four recorded combinations."><Cell80Dependence/></StudyRoom>
    <StudyRoom label="05 / A DIFFERENT WORLD · EX-11" title={<>Give invention<br/><em>something to unlock.</em></>} tone="dark" description="I built a new metabolic world with a nutrient no existing primitive could process. Mutation could assemble programs at birth.">
      <StudyMeasures label="THE REGISTERED RESOURCE TEST / 64 INPUT PAIRS" items={[{value:"0/89",label:"primitives passed"},{value:"1/1,825",label:"tested compositions passed"}]} note="One successful expression, arising more than once. This was a deliberately engineered resource and a bounded program library."/>
      <div className="cell80-prose"><p>The barrier was crossed. But the later uptake mutations arrived before the first capability met the establishment rule. EX-11 had no eligible dependence candidate; that test remained unrun.</p></div>
      <FieldNotes label="The program & the registered limit" detail="READ +"><div className="cell80-prose"><p>The expression add_sat(a, mask_xor(a,b)) processed the resource across all 64 registered inputs. It was known as a validation witness but was not inserted into evolution. The capability appeared in 3/10 full worlds and persisted in 2/10. With uptake mutation disabled, retention was 1/10 against the required 8/10.</p><p><a href="/data/cell80/followups/ex11-results.md">EX-11 results ↗</a></p></div></FieldNotes>
    </StudyRoom>
    <StudyRoom label="06 / OPPORTUNITY → INHERITANCE" title={<>It could help.<br/><em>Could it leave a history?</em></>} tone="accent">
      <StudySequence label="TWO SEPARATE EXPERIMENTS / FIRST CLEAN CANDIDATE, CHOSEN AT BIRTH" steps={[{label:"EX-12 / OPPORTUNITY",value:"1 of 4",detail:"Candidates passed both birth-context screens. That child left no offspring in its original history."},{label:"EX-13 / TRANSMISSION",value:"148",detail:"Intact descendants at +200 ticks for the one supported opportunity among five candidates."},{label:"EX-13 / LATER TEST",value:"6 of 10",detail:"Futures showed the dependency effect. Four were zero-offspring ties; the required eight was not reached."}]} note="EX-12 and EX-13 followed different origins of the same capability. Their successes cannot be combined into one lineage."/>
      <div className="cell80-prose"><p>The first supported opportunity vanished at birth. In the next experiment, a supported opportunity reached descendants. Its later assay failed the gate, but showed no reversal: four futures gave every version zero offspring.</p></div>
      <FieldNotes label="What was inherited, and what remains untested" detail="READ +"><div className="cell80-prose"><p>B is the resource-processing capability; C increases uptake. The birth screens compared neither change, B alone, C alone and both together, in the actual birth-time ecology and standardized worlds. EX-12 supported one opportunity against a requirement of three independent discoveries.</p><p>In EX-13, the supported case had 148 intact descendants at +200 ticks and 230 at +500. Its event lineage later went extinct while the capability remained in other lineages. EX-13’s full retention result stays 0/1; EX-14 is a separately registered follow-up, not a change to that gate.</p><p><a href="/data/cell80/followups/ex12-results.md">EX-12 results ↗</a> · <a href="/data/cell80/followups/ex13-results.md">EX-13 results ↗</a></p></div></FieldNotes>
    </StudyRoom>
    <StudyRoom label="07 / THE NEXT QUESTION" title={<>One inherited opportunity.<br/><em>How repeatable is it?</em></>}>
      <Statement text="An advantage needs" continuation="a chance to become history." presentation="room"/>
      <div className="cell80-prose"><p>EX-14 returns to the descendant shown at the top of this note. Across 100 paired futures, the later uptake change helped in 63 of the 64 where either version reproduced. That supports a reproductive-opportunity bottleneck in this checkpoint ecology.</p><p>EX-15 is registered to seek at least three independently discovered opportunities through the complete pipeline. The database still marks it running, with no reported outcome as of 10 September.</p></div>
      <Question text="Can evolution keep building on what it inherits?" status="OPEN" detail="Independent replication remains pending. A further dependent step, historical necessity, environmental mediation and open-ended evolution remain untested."/>
    </StudyRoom>
  </>;
}

export function Cell80Notebook({ record }: { record: PublicationRecord }) {
  const part = cell80Part(record.id);
  return <NotebookFieldNotes><div className="cell80-notebook cinematic-notebook"><nav className="cell80-entry-nav record-voice" aria-label="Explore this note"><a href="#cell80-study">ENTER THE STUDY ↓</a><a href="#cell80-record">READ THE FULL NOTE ↓</a><Link href="/thread/cell80">THE THREE QUESTIONS ↗</Link></nav>{part === 1 ? <ReplayNotebook/> : part === 2 ? <SurvivalNotebook/> : <InventionNotebook/>}<PriorWork part={part}/><ReadingRecord record={record}/></div></NotebookFieldNotes>;
}

export function Cell80Card({ part, compact = false }: { part: number; compact?: boolean }) {
  return <div className="cell80-preview" data-compact={compact} aria-label={part===1 ? "Two inherited fields, one intervention" : part===2 ? "Survival and coevolution are separate questions" : "The unresolved connection between improvement and invention"}>
    <span className="record-voice">CELL80 / 0{part}</span>
    {part === 1 ? <><div className="cell80-preview-fork"><span>33</span><i/><span>37</span></div><p>One birth.<br/><em>Two histories.</em></p></> : part === 2 ? <><div className="cell80-preview-species" aria-hidden="true"><i/><b/></div><p>Still alive.<br/><em>Still a question.</em></p></> : <><div className="cell80-preview-gap" aria-hidden="true"><i/><b>···</b><i/></div><p>What makes<br/><em>the next step possible?</em></p></>}
    <span className="record-voice">{part===1 ? "INTERVENTION DIAGRAM" : part===2 ? "SURVIVAL ≠ COEVOLUTION" : "THE RATCHET / OPEN"}</span>
  </div>;
}
