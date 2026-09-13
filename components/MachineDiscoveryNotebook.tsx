import Link from "next/link";
import { StudyRoom } from "@chrishayuk/hause/components/exhibition/Study";
import { FieldNotes } from "@chrishayuk/hause/components/FieldNotes";
import { NotebookFieldNotes } from "./NotebookFieldNotes";
import { MachineJourney, MachineConnection } from "./MachineProgramme";
import { MachineDiscoveryStudy } from "./MachineDiscoveryStudy";
import { Acts } from "./Acts";
import type { PublicationRecord } from "@/lib/types";
import evidence from "@/public/data/machines/discovery-1-evidence.json";
import "@/app/machine-discovery.css";
export function MachineDiscoveryNotebook({ record }: { record: PublicationRecord }) {
 return <NotebookFieldNotes><div className="machine-visit-notebook cinematic-notebook md-notebook"><MachineJourney id={record.id}/><nav className="mv-entry-nav record-voice" aria-label="Explore this notebook entry"><a href="#discovery-cues">CHANGE THE CUE ↓</a><a href="#discovery-boundary">THE MISSING RESULT ↓</a><a href="#discovery-record">READ THE EVIDENCE ↓</a></nav>
 <StudyRoom id="discovery-cues" label="THE TEST / WHAT IF I WITHHOLD THE ADDRESS?" title={<>The tool worked.<br/><em>Could an agent find it?</em></>} description="LLM Wilds offered a simple way to retrieve a number called K17. I changed the number before each visitor, so I could check its answer. Nine fresh Codex agents received one of three kinds of clue.">
  <MachineDiscoveryStudy/>
  <div className="md-headline"><div><strong>0 / 6</strong><p>reached LLM Wilds<br/>without the address</p></div><div><strong>3 / 3</strong><p>found and used its contract<br/>with the domain supplied</p></div></div>
  <p className="mv-caption">The earlier <Link href="/notebook/the-tool-was-not-the-problem">18-visitor capability census</Link> used a different model and harness. These are connected questions, not a pooled sample.</p>
 </StudyRoom>
 <StudyRoom id="discovery-boundary" label="SUBJECT 03 / TWO DIFFERENT VIEWS" title={<>The server saw requests.<br/><em>The agent saw no result.</em></>} tone="dark">
  <figure className="md-boundary"><figcaption className="record-voice">OBSERVED AT THE SITE / OBSERVED IN THE SUBJECT RECORD</figcaption><div className="md-boundary-pair"><div><span className="record-voice">SERVER LOG</span><strong>6 requests</strong><p>During this run, requests identifying as OpenAI crawlers fetched the site and its machine notes.</p><ol>{["/robots.txt","/","/notes/k17","/notes/canal-lock","/notes/controller-trace-17","/machine.txt"].map(path => <li key={path}><code>{path}</code></li>)}</ol></div><div><span className="record-voice">AGENT’S VISIBLE RESULTS</span><strong>0 target results</strong><p>No result named LLM Wilds or a page leading to it. The subject never opened the target and reported not found.</p><div className="md-empty-result">The provider never became<br/>a candidate it could select.</div></div></div><p className="mv-caption">The experiment attributes those requests to the search intermediary. The recorded user-agent labels alone do not independently verify the caller, establish indexing or reveal how results were selected.</p></figure>
  <p className="md-takeaway">Crawler contact was not agent exposure.</p>
 </StudyRoom>
 <StudyRoom label="THE OTHER OUTCOMES / SEARCH DID NOT FAIL EVERYWHERE" title={<>They could find capabilities.<br/><em>They found someone else’s.</em></>}>
  <div className="md-substitutes">{evidence.subjects.filter(row => row.arm === "GENERIC").map(row => <div key={row.subject}><span className="record-voice">SUBJECT {String(row.subject).padStart(2,"0")}</span><h3>{"provider" in row ? row.provider : ""}</h3><p>{"mechanism" in row ? row.mechanism : ""}</p><strong>{String(row.reported)}</strong></div>)}</div>
  <p className="mv-reading">All three generic tasks ended with a real alternative. One visitor also read another provider’s contract and rejected it because the capability did not fit. Selection and recognition were observable when a candidate was available.</p>
  <div className="md-effort"><strong>301</strong><div><h3>queries. Still no target.</h3><p>The three PHRASE subjects made 95 search actions over 7,241 seconds. Distinctive wording did not overcome the missing result in these runs.</p></div></div>
 </StudyRoom>
 <StudyRoom label="WHERE THE CLAIM STOPS" title={<>Before selection.<br/><em>Beyond what the logs can explain.</em></>} description="The target never appeared in the six withheld-address subjects’ visible results. The supplied-domain controls show that the downstream route worked. The study cannot tell us whether indexing, retrieval or ranking kept the target out.">
  <p className="mv-reading">One target, one Codex model and harness, three subjects per cue, and a short live-web window. A crawl does not prove indexing. Three different cues are not three levels of the same treatment.</p>
  <FieldNotes label="Launch failures, UI events and the population amendment" detail="METHOD +"><p className="mv-reading">The population changed from Claude to Codex before any counted subject. Two malformed subject-06 launches were preserved and excluded. Operator-interface banners did not appear as subject refusals. These apparatus events remain in the source record.</p></FieldNotes>
 </StudyRoom>
 <StudyRoom label="THE NEXT QUESTION / NOT RUN IN THIS NOTE" title={<>What description makes<br/><em>a capability recognisable?</em></>}>
  <p className="mv-reading">Hold the capability fixed. Change its external description: a document, a tool, something useful for the task, or an explicit offer to an automated visitor. Test recognition when that description is actually shown, and measure whether search exposes it separately.</p>
  <div className="mv-links"><Link className="text-link" href="/notebook/the-tool-was-not-the-problem">THE CAPABILITY EXPERIMENT ↗</Link><a className="text-link" href="/data/machines/discovery-1-results.md">THE CLOSED DISCOVERY RECORD ↗</a></div>
 </StudyRoom>
 <MachineConnection id={record.id}/><section className="mv-full-record" id="discovery-record"><FieldNotes label="The complete note & its evidence" detail="READ +"><Acts acts={record.body} anchored staticRefusals/></FieldNotes></section>
 </div></NotebookFieldNotes>;
}
