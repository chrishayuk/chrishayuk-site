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
import { Acts } from "./Acts";
import { NotebookFieldNotes } from "./NotebookFieldNotes";

function ReadingRecord({ record }: { record: PublicationRecord }) {
  return <section className="cell80-reading-record" id="cell80-record"><p className="record-voice">THE NOTE / AT READING PACE</p>
    <FieldNotes label="Read the complete note" detail="OPEN +"><Acts acts={record.body} anchored staticRefusals/></FieldNotes>
    <FieldNotes label="Measurements, methods & provenance" detail="OPEN +"><div className="cell80-prose"><p>The world viewers play spatial states exported by the Rust ecology engine. They do not run a new simulation in your browser. The other studies show recorded outcomes and an intervention diagram. Historical EX-4 and the later closure batch used different gene pools and assays.</p><p>The complete September closure batch contains 379 primary worlds plus verification runs. That is not the total across the earlier programme. First-step benefit counts direct offspring of a focal organism; the factorial assay counts total births in fresh founder populations.</p><p>Source reports and their file hashes are included with the evidence download. The EX-4 replay uses the historical gene library and reproduces the recorded birth and plurality event. The EX-9 replay matches the complete history hash of the selected closure world. Both show sampled end-of-tick states, without interpolating organism positions.</p></div>
      <div className="cell80-downloads"><a href="/data/cell80/evidence.json" download>Recorded measurements + hashes ↓</a><a href="/data/cell80/historical-findings.md" download>Historical findings ↓</a><a href="/data/cell80/closure-results.md" download>Closure results ↓</a><a href="/data/cell80/closure-interpretation.md" download>Interpretation + limits ↓</a><a href="/data/cell80/preregistration.md" download>Registered tests ↓</a></div>
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
    <StudyRoom id="cell80-study" label="01 / THE BIRTH" title={<>One world.<br/><em>Two histories.</em></>} tone="dark" description="Could one inherited change explain why a particular program became common? I replayed the same world and undid that change at the moment it happened.">
      <div className="cell80-scenario-intro cell80-prose">
        <p className="record-voice">BEFORE YOU PRESS PLAY</p>
        <h3>A small world of food and hungry organisms.</h3>
        <p>Each square is a place where an organism can live. Food grows on some squares. Organisms spend energy, eat, move, reproduce and eventually die. Their behaviour comes from small inherited programs, which can change when an offspring is born. A <strong>tick</strong> is one step of this world’s clock.</p>
        <p>These two views start from the same history. In the observed world, organism 2231 is born at tick 994 with two changes: a reproduction setting changes from 198 to 192, and its reproduction program changes from 37 to 33. In the second world, I undo only the program change. The numbers 33 and 37 are program identifiers; a larger number does not mean a better program.</p>
        <p>Gold marks squares containing program 33; blue marks program 37 when 33 is absent. All the organisms here are grazers. Green squares contain food, and white outlines follow the offspring’s family. One mark can represent several organisms sharing a square.</p>
      </div>
      <StudySequence label="WHAT TO WATCH" steps={[{label:"01 / PLAY",value:"Start together.",detail:"The preview begins at tick 980, just before the birth. Both histories match."},{label:"02 / THE BIRTH",value:"Change one field.",detail:"Jump to tick 994 to inspect organism 2231: threshold 192 in both worlds, program 33 versus 37."},{label:"03 / THE SHIFT",value:"Follow the share.",detail:"Jump to tick 1,080. Compare the percentage carrying program 33, then continue through the two histories."}]} note="The percentage under each world is the share of all living organisms carrying program 33. The family count follows descendants of organism 2231, even if their programs later mutate."/>
      <Cell80WorldReplay kind="lineage"/>
      <div className="cell80-scenario-learning cell80-prose">
        <p className="record-voice">AFTER THE REPLAY / WHAT WE LEARNED</p>
        <h3>One inherited change mattered to this event.</h3>
        <p>In the observed history, program 33 reached 35.3% of the population at tick 1,080 and remained the most common reproduction program over the following 100-tick window. Its share peaked at 41.6% in that window. This is a <strong>plurality</strong>: more organisms carried it than any other single program, although most organisms still carried something else.</p>
        <p>When I undid the program change at that one birth, the same sustained shift around that time no longer appeared. Every recorded tick before the intervention was identical. That connects a specific inherited change to a specific later population event.</p>
        <p className="cell80-scenario-limit">The divergence alone would not establish that result; the matched replay and the measured shift do. This example does not establish that program 33 is universally better, or that evolution has acquired a new capability.</p>
      </div>
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
    <StudyRoom id="cell80-study" label="WATCH / ONE POPULATED WORLD" title={<>A world with<br/><em>something living in it.</em></>} tone="dark" description="Can an evolving world keep both its food-eaters and its predators alive long enough for their interactions to matter?">
      <div className="cell80-scenario-intro cell80-prose">
        <p className="record-voice">BEFORE YOU PRESS PLAY</p>
        <h3>Two ways to make a living in the same world.</h3>
        <p>This world begins with 60 grazers and 10 predators. Grazers gain energy from food growing on the grid. Predators gain energy by killing grazers. Both spend energy and can reproduce; if either population disappears, that relationship ends.</p>
        <p>Newborns inherit their parent’s species, programs and numerical settings. The settings can mutate, and each eligible program has a 2% chance of being swapped at birth. That changes how organisms behave. The experiment asks whether these conditions keep both species present over 10,000 ticks—10,000 steps of the world’s clock.</p>
        <p>Pale circles mark grazers, gold diamonds mark predators, and green squares contain food. A square may hold several organisms, so larger marks show a more crowded location. Select a square to see who is there.</p>
      </div>
      <StudySequence label="WHAT TO WATCH" steps={[{label:"01 / PLAY",value:"Read the landscape.",detail:"Watch organisms move and food disappear and regrow. The replay starts after the first tick."},{label:"02 / THE COUNTS",value:"Follow both species.",detail:"Use the separate grazer and predator totals to see whether each population persists."},{label:"03 / THE ENDPOINT",value:"Are both still here?",detail:"Jump to the final tick. Survival in this one world is the first observation; the comparison across worlds comes next."}]} note="The population traces show grazers in gold and predators in blue. Rising and falling numbers alone do not tell us whether either species evolved in response to the other."/>
      <Cell80WorldReplay kind="ecology"/>
      <div className="cell80-scenario-learning cell80-prose">
        <p className="record-voice">AFTER THE REPLAY / WHAT WE LEARNED</p>
        <h3>The relationship survived. An arms race remains unestablished.</h3>
        <p>Both species were still present at the end of this replay. Across the wider comparison, they survived in all six worlds at 2% program swaps and five of six at 1%. These conditions gave evolution a populated world in which interactions could continue.</p>
        <p>An <strong>evolutionary arms race</strong> would require a stronger pattern: a change in one species followed by an evolutionary response in the other. I tested the surviving worlds for that pattern. None of the eleven passed either of the registered screens.</p>
        <p className="cell80-scenario-limit">The replay lets us see coexistence. The measurements below establish how often it lasted and what the response tests found. Survival for 10,000 ticks does not establish indefinite survival, and the screens do not capture every possible form of coevolution.</p>
      </div>
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
    <StudyRoom id="cell80-study" label="01 / BENEFIT" title={<>A change happened.<br/><em>Eight of them helped.</em></>} tone="dark" description="Can a useful change become the foundation for another useful change? I tested that question in stages, beginning with whether a new program helped at all.">
      <div className="cell80-scenario-intro cell80-prose">
        <p className="record-voice">BEFORE YOU EXPLORE THE RESULTS</p>
        <h3>What would count as building on an earlier invention?</h3>
        <p>Here, the organisms are grazers with inherited movement programs. I prepared new programs by combining existing pieces of code, then let mutations introduce them into the population. I wanted to know whether any useful combination could make a later improvement possible.</p>
        <p>For the first test, I replayed 108 births with and without the new program and counted each focal organism’s direct offspring. In the grid below, every mark is one such comparison. A plus means the organism left more offspring with the new program; a dot means the counts tied; a minus means it left fewer.</p>
        <p>Follow the note through three further questions: does the program do anything different, does another useful mutation follow it, and does that later mutation benefit from the first change being present?</p>
      </div>
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
    <StudyRoom label="05 / THE RATCHET" title={<>The next invention.<br/><em>Still across a gap.</em></>} tone="dark">
      <div className="cell80-scenario-learning cell80-prose">
        <p className="record-voice">AFTER THE COMPARISONS / WHAT WE LEARNED</p>
        <h3>Useful changes appeared. Reliable dependence did not.</h3>
        <p>Eight changes helped, but five of those chose the same immediate actions as programs already in the library. Three had distinct behaviour in the tested food-input domain. Two useful changes were followed by another useful mutation.</p>
        <p>For those two candidates, I compared all four combinations: with and without the first change, and with and without the later one. The first candidate showed a positive interaction in three of five fresh worlds; the other did so in none. Both fell short of the required four of five.</p>
        <p className="cell80-scenario-limit">These experiments establish local adaptation in this world. They have not yet shown a dependable chain in which an earlier innovation supports the next. Even positive interaction would need a stronger test to establish that the later benefit was impossible without the first change.</p>
      </div>
      <div className="cell80-ratchet" role="img" aria-label="Local benefit and sequential improvement are observed; cumulative dependence remains unestablished"><span>Benefit<br/><i/></span><b aria-hidden="true">→</b><span>Succession<br/><i/></span><b className="cell80-missing-link" aria-hidden="true">···</b><span>Dependence<br/><i data-open="true"/></span></div>
      <Statement text="Getting better isn’t the same thing" continuation="as building on what came before." presentation="room"/>
      <div className="cell80-prose"><p>Neither candidate passed the registered interaction gate. A stronger future test would ask whether an inherited capability makes a later benefit possible at all.</p><p>A resource accessible through composition could provide such a barrier. The primitive library would have to be checked, the capability acquired and retained through selection, and the later mutation tested with and without it across held-out worlds.</p><p>That is a proposed experiment. Even a successful bounded example would leave the larger question of open-ended evolution unresolved.</p></div>
      <Question text="Can something evolve that makes the next invention possible?" status="OPEN" detail="An old question in artificial life, asked again in a small world I can inspect."/>
    </StudyRoom>
  </>;
}

export function Cell80Notebook({ record }: { record: PublicationRecord }) {
  const part = cell80Part(record.id);
  return <NotebookFieldNotes><div className="cell80-notebook cinematic-notebook"><PriorWork part={part}/><nav className="cell80-entry-nav record-voice" aria-label="Explore this note"><a href="#cell80-study">ENTER THE STUDY ↓</a><a href="#cell80-record">READ THE FULL NOTE ↓</a><Link href="/thread/cell80">THE THREE QUESTIONS ↗</Link></nav>{part === 1 ? <ReplayNotebook/> : part === 2 ? <SurvivalNotebook/> : <InventionNotebook/>}<ReadingRecord record={record}/></div></NotebookFieldNotes>;
}

export function Cell80Card({ part, compact = false }: { part: number; compact?: boolean }) {
  return <div className="cell80-preview" data-compact={compact} aria-label={part===1 ? "Two inherited fields, one intervention" : part===2 ? "Survival and coevolution are separate questions" : "The unresolved connection between improvement and invention"}>
    <span className="record-voice">CELL80 / 0{part}</span>
    {part === 1 ? <><div className="cell80-preview-fork"><span>33</span><i/><span>37</span></div><p>One birth.<br/><em>Two histories.</em></p></> : part === 2 ? <><div className="cell80-preview-species" aria-hidden="true"><i/><b/></div><p>Still alive.<br/><em>Still a question.</em></p></> : <><div className="cell80-preview-gap" aria-hidden="true"><i/><b>···</b><i/></div><p>What makes<br/><em>the next step possible?</em></p></>}
    <span className="record-voice">{part===1 ? "INTERVENTION DIAGRAM" : part===2 ? "SURVIVAL ≠ COEVOLUTION" : "THE RATCHET / OPEN"}</span>
  </div>;
}
