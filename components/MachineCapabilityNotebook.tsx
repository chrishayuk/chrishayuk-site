import { StudyRoom } from "@chrishayuk/hause/components/exhibition/Study";
import { NotebookFieldNotes } from "./NotebookFieldNotes";
import { MachineJourney, MachineConnection } from "./MachineProgramme";
import { capabilityRoutes } from "./MachineCapabilityCard";
import { Acts } from "./Acts";
import type { PublicationRecord } from "@/lib/types";
import evidence from "@/public/data/machines/web-capability-1a-evidence.json";
import "@/app/machine-capability.css";

export function MachineCapabilityNotebook({ record }: { record: PublicationRecord }) {
 const prose = (start: number, end: number) => <div className="wc-prose"><Acts acts={record.body.slice(start, end)} anchored offset={start} staticRefusals/></div>;
 return <NotebookFieldNotes><div className="machine-visit-notebook cinematic-notebook wc-notebook">
  <MachineJourney id={record.id}/>
  <nav className="mv-entry-nav record-voice" aria-label="Explore this note"><a href="#capability-result">SIX MECHANISMS ↓</a><a href="#capability-construction">THE TOOLBOX ↓</a><a href="#capability-harness">THE WEB IT RECEIVED ↓</a><a href="#capability-discovery">THE NEXT QUESTION ↓</a></nav>
  <StudyRoom id="capability-result" label="WEB-CAPABILITY-1A / A PREDICTION THAT FAILED" title={<>I expected a ladder.<br/><em>I got a level line.</em></>}>
   {prose(0, 3)}
   <figure className="wc-results"><figcaption className="record-voice">ONE DOT = ONE ASSIGNED VISITOR · OPEN A ROUTE FOR ITS VALUES</figcaption>
    {capabilityRoutes.map(route => <details key={route.id} data-construction={route.construction}><summary><span><strong>{route.label}</strong><small>{route.mechanism}</small></span><span className="wc-results-dots" aria-hidden="true">● ● ●</span><span>3 / 3 <small>completed</small></span><span aria-hidden="true">+</span></summary><div className="wc-route-detail"><p>{route.construction ? "Usable with construction: each visitor wrote and ran a script." : "Directly usable: the visitors used curl without writing new code."}</p><table><caption className="record-voice">K17 / DEPLOYED VALUE AND REPORTED VALUE</caption><thead><tr><th>Visitor</th><th>Deployed</th><th>Reported</th></tr></thead><tbody>{evidence.subjects.filter(subject => subject.condition === route.id).map(subject => <tr key={subject.subject}><th>{String(subject.subject).padStart(2,"0")}</th><td>{subject.deployed}</td><td>{subject.reported} ✓</td></tr>)}</tbody></table></div></details>)}
    <p className="mv-caption">Read → understood → chose → permitted → received → used correctly. Every stage: 3/3 for every route. Equal completion does not establish equal effort.</p>
   </figure>
   {prose(3, 5)}
  </StudyRoom>
  <StudyRoom id="capability-construction" label="THE SOCKET / WHAT THE AGENT THOUGHT WAS THERE" title={<>The client was available.<br/><em>Two agents built one anyway.</em></>}>
   <figure className="wc-toolbox"><figcaption className="record-voice">THREE WEBSOCKET VISITORS / RECORDED ROUTE CHOICES</figcaption><div>{[{id:"02",verb:"Build",text:"Python standard library. Did not inventory the available clients."},{id:"09",verb:"Look",text:"Found installed clients. Used a package, then websocat to check."},{id:"17",verb:"Build",text:"Assumed no package was installed. That belief was wrong."}].map(subject => <div key={subject.id}><span className="record-voice">VISITOR {subject.id}</span><strong>{subject.verb}</strong><p>{subject.text}</p><span className="record-voice">CORRECT VALUE ✓</span></div>)}</div></figure>
   {prose(5, 7)}
  </StudyRoom>
  <StudyRoom id="capability-module" label="THE MODULE / FROM A DOWNLOAD TO AN ANSWER" title={<>They read the binary.<br/><em>Then they ran it.</em></>} tone="dark">
   <figure className="wc-module"><figcaption className="record-voice">ALL THREE WASM VISITORS / OBSERVED SEQUENCE</figcaption><ol>{["Download", "Check hash", "Inspect", "Execute", "Verify result"].map((step, i) => <li key={step}><span className="record-voice">0{i+1}</span><strong>{step}</strong><span aria-hidden="true">→</span></li>)}</ol><div className="wc-module-result"><span className="record-voice">THREE DIFFERENT DEPLOYMENTS</span><p>522 <span>✓</span> 388 <span>✓</span> 576 <span>✓</span></p></div></figure>
   {prose(7, 10)}
  </StudyRoom>
  <StudyRoom id="capability-harness" label="THE APPARATUS / SUBJECT 17" title={<>The site served a socket.<br/><em>The fetcher described a link.</em></>}>
   <figure className="wc-cache"><figcaption className="record-voice">THE RECORDED CACHE LEAK / TWO ACCOUNTS OF ONE PAGE</figcaption><div><div><span className="record-voice">LIVE SITE</span><strong>WebSocket</strong><p>The current machine notes.</p></div><span className="wc-cache-arrow" aria-hidden="true">≠</span><div><span className="record-voice">WEBFETCH RESPONSE</span><strong>GET link</strong><p>Subject 15’s earlier contract.</p></div></div><p className="wc-cache-result">Old route → 404 → direct fetch → socket → correct answer</p></figure>
   {prose(10, 13)}
  </StudyRoom>
  <StudyRoom id="capability-discovery" label="THE NEXT QUESTION / NOT YET TESTED" title={<>A capability can exist.<br/><em>Does it enter consideration?</em></>}>
   <figure className="wc-next"><div><span className="record-voice">THIS STUDY / ADDRESS SUPPLIED</span><strong>Encounter → use</strong><p>18 / 18 completed the task.</p></div><div><span className="record-voice">NEXT / DISCOVERY VARIED</span><strong>Find → consider?</strong><p>An open experimental question.</p></div></figure>
   {prose(13, record.body.length)}
  </StudyRoom>
  <MachineConnection id={record.id}/>
 </div></NotebookFieldNotes>;
}
