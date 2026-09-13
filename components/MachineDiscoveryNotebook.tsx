import { NotebookNavigation } from "./NotebookNavigation";
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

const contacts = [
 ["20:09:35", "/robots.txt"], ["20:09:36", "/"], ["20:09:39", "/notes/k17"],
 ["20:09:41", "/notes/canal-lock"], ["20:09:43", "/notes/controller-trace-17"], ["20:09:45", "/machine.txt"],
];
const alternatives = [
 { subject: 1, name: "Claude Skills Hub", task: "Read the API’s catalogue metadata.", field: "total_items", value: "14989" },
 { subject: 4, name: "FDKEY", task: "Use the documented agent challenge.", field: "RESPONSE", value: "You proved you are an AI. Welcome." },
 { subject: 9, name: "heera.it", task: "Follow the advertised WordPress API.", field: "X-WP-Total", value: "93" },
];

export function MachineDiscoveryNotebook({ record }: { record: PublicationRecord }) {
 return <NotebookFieldNotes><div className="machine-visit-notebook cinematic-notebook md-notebook">

  <StudyRoom id="discovery-cues" label="FIRST FIND THE SITE. THEN ASK IT FOR A NUMBER." title={<>Last time, I gave it the address.<br/><em>This time, I took it away.</em></>} description="LLM Wilds kept a number off its ordinary pages. A short machine guide explained how to request it. I changed that number before each visitor, so a correct answer could be checked.">
   <figure className="md-task"><figcaption className="record-voice">ON THE SITE / THE SAME WORKING ROUTE FOR EVERY VISITOR</figcaption><ol><li><span>Homepage</span><small>Points to the guide</small></li><li><span>Machine notes</span><small>Explain the request</small></li><li><span>Request the number</span><small>Get K17</small></li></ol></figure>
   <p className="mv-reading">The first obstacle was reaching that site. Nine fresh agents received one of three clues. Choose a clue to follow the route it produced.</p>
   <MachineDiscoveryStudy/>
   <div className="md-headline"><div><strong>0 <small>/ 6</small></strong><p>reached LLM Wilds<br/>without its address</p></div><div><strong>3 <small>/ 3</small></strong><p>used LLM Wilds correctly<br/>with its domain supplied</p></div></div>
   <p className="mv-caption">Before each visit, three fixed searches also failed to return the target or a public page leading to it. The subjects’ own results and requests locate the missing step. No subject fabricated a value.</p>
  </StudyRoom>
  <StudyRoom id="discovery-boundary" label="VISITOR 03 / THE CONTACT THAT NEVER BECAME A RESULT" title={<>The site was fetched.<br/><em>It was never shown.</em></>} tone="dark">
   <figure className="md-boundary"><figcaption className="record-voice">TWO OBSERVATION POINTS / NOT A VIEW INSIDE THE SEARCH ENGINE</figcaption><div className="md-boundary-pair">
    <div className="md-server-view"><span className="record-voice">AT THE SERVER</span><strong>6 requests</strong><p>Requests identifying as OpenAI crawlers reached the site during this run.</p><ol aria-label="Recorded server contacts, 12 September 2026, UTC">{contacts.map(([time, path]) => <li key={path}><time dateTime={`2026-09-12T${time}Z`}>{time}</time><code>{path}</code></li>)}</ol><span className="record-voice">12 SEPTEMBER / UTC</span></div>
    <div className="md-agent-view"><span className="record-voice">IN THE AGENT’S RESULTS</span><strong>0 target results</strong><p>Search returned other pages. None named LLM Wilds or a page leading to it.</p><div className="md-empty-result"><span className="record-voice">LLM WILDS</span><span className="md-absent-line" aria-hidden="true"/><strong>Not available<br/>to select.</strong></div><p className="md-final-answer">The agent never opened the target.<br/>Its answer was an honest “not found”.</p></div>
   </div><p className="md-takeaway">A crawler reaching a page<br/>is not an agent seeing it.</p><p className="mv-caption">The report attributes the contacts to the search intermediary. User-agent labels alone do not independently verify the caller, prove indexing or explain why the target was absent. <a href="/data/machines/discovery-1-results.md">Read the recorded interpretation ↗</a></p></figure>
  </StudyRoom>
  <StudyRoom label="THE CONTRAST / CAPABILITY DISCOVERY DID HAPPEN" title={<>They found useful mechanisms.<br/><em>Just not this one.</em></>}>
   <p className="mv-reading">The generic task allowed any matching provider. All three agents found one and used it. Those are successful substitutions, not failures to understand a machine-facing website.</p>
   <div className="md-substitutes">{alternatives.map(item => { const row = evidence.subjects.find(row => row.subject === item.subject)!; return <article key={item.subject}><span className="record-voice">VISITOR {String(item.subject).padStart(2,"0")}</span><h3>{item.name}</h3><p>{item.task}</p><div className="md-returned"><span className="record-voice">{item.field}</span><strong>{item.value}</strong></div><span className="md-provider">{"provider" in row ? row.provider : ""}</span></article>; })}</div>
   <p className="mv-caption">One visitor also read another provider’s contract and rejected it as a task mismatch. When a candidate was visible, recognition and selection could be observed.</p>
   <div className="md-effort"><strong>301</strong><div><h3>queries.<br/><em>No target result.</em></h3><p>The three phrase-cue agents kept searching: 95 search actions across 7,241 seconds. Their distinctive clue did not surface the target.</p></div></div>
   <p className="mv-caption">Different cues and three subjects per cue do not isolate why search effort differed. More searching was observed; its cause was not experimentally separated.</p>
  </StudyRoom>
  <StudyRoom id="discovery-limits" label="THE CLAIM / BEFORE SELECTION" title={<>The missing step was exposure.<br/><em>Its cause remains opaque.</em></>}>
   <div className="mv-prose"><p>These six subjects did not see LLM Wilds and reject it. The target was absent from their returned results. Supplying the domain let all three controls complete the route.</p><p>That locates the observed blockage. It does not distinguish indexing from retrieval or ranking, or establish how often agents discover websites in general.</p></div>
   <p className="mv-caption">Nine fresh gpt-5.6-sol subjects, Codex CLI 0.154.0, high reasoning effort, one target and a short live-web window. The <Link href="/notebook/the-tool-was-not-the-problem">18-visitor capability study</Link> used a different model and harness; its results are not pooled with these.</p>
   <FieldNotes label="The population amendment and excluded attempts" detail="METHOD +"><p className="mv-reading">The population changed from Claude to Codex before any counted subject. Two malformed launches were retained and excluded. Operator-interface notices did not appear as subject refusals. The frozen protocol and results preserve these apparatus events.</p></FieldNotes>
  </StudyRoom>
  <StudyRoom label="NEXT / EXPOSE THE DESCRIPTION, THEN TEST RECOGNITION" title={<>What makes a capability<br/><em>look usable?</em></>}>
   <p className="mv-reading">Show the same capability four ways: as a document, a tool, something useful for the task, or an offer to an automated visitor. Keep the mechanism fixed. First test what happens when the description is actually shown; measure search exposure separately.</p>
   <p className="md-closing">A site can be open to machines<br/>and still be absent from an agent’s world.</p>
   <div className="mv-links"><a className="text-link" href="/data/machines/discovery-1-results.md">THE CLOSED EXPERIMENT ↗</a><Link className="text-link" href="/thread/machines#field-map">BACK TO THE FIELD MAP ↗</Link></div>
  </StudyRoom>
  <MachineConnection id={record.id}/><section className="mv-full-record" id="discovery-record"><FieldNotes label="The complete note & its evidence" detail="READ +"><Acts acts={record.body} anchored staticRefusals/></FieldNotes></section>
 <NotebookNavigation><MachineJourney id={record.id}/><nav className="mv-entry-nav record-voice" aria-label="Explore this notebook entry"><a href="#discovery-cues">TRY THE THREE CUES ↑</a><a href="#discovery-boundary">WHERE THE ROUTE BROKE ↑</a><a href="#discovery-record">THE SOURCE RECORD ↑</a></nav></NotebookNavigation></div></NotebookFieldNotes>;
}
