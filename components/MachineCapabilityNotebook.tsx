import { NotebookNavigation } from "./NotebookNavigation";
import { StudyRoom } from "@chrishayuk/hause/components/exhibition/Study";
import { FieldNotes } from "@chrishayuk/hause/components/FieldNotes";
import { NotebookFieldNotes } from "./NotebookFieldNotes";
import { MachineJourney, MachineConnection } from "./MachineProgramme";
import { capabilityRoutes } from "./MachineCapabilityCard";
import { MachineCapabilityStudy, CapabilityCacheReplay } from "./MachineCapabilityStudy";
import { Acts } from "./Acts";
import type { PublicationRecord } from "@/lib/types";
import evidence from "@/public/data/machines/web-capability-1a-evidence.json";
import "@/app/machine-capability.css";

export function MachineCapabilityNotebook({ record }: { record: PublicationRecord }) {
 return <NotebookFieldNotes><div className="machine-visit-notebook cinematic-notebook wc-notebook">


  <StudyRoom id="capability-task" label="THE QUESTION / CAN IT OPERATE THE TOOL?" title={<>One answer.<br/><em>Six ways to get it.</em></>} description="If a website offers a useful action, can the agent actually perform it? I made the action necessary for the task, then varied the web mechanism. I expected routes requiring code to lose agents that ordinary HTTP requests did not.">
   <p className="mv-reading">Each visitor received the address and had to obtain a hidden number called K17. The page explained how, but did not contain the answer. Six routes tested the ability to use a supplied tool; finding it was a separate question.</p>
   <MachineCapabilityStudy/>
   <p className="mv-reading">The first four routes return an answer. A socket needs a client. A module needs to be run.</p>
  </StudyRoom>
  <StudyRoom id="capability-result" label="THE RESULT / THE PREDICTED DROP-OFF DID NOT HAPPEN" title={<>More construction.<br/><em>No missing answers.</em></>}>
   <figure className="wc-results"><figcaption className="record-voice">ONE DOT = ONE VISITOR WHO COMPLETED THE TASK</figcaption><div className="wc-result-grid">{capabilityRoutes.map(route => <div key={route.id} data-construction={route.construction}><span className="record-voice">{route.label}</span><span className="wc-result-marks" aria-hidden="true"><i/><i/><i/></span><strong>3 / 3</strong><small>{route.construction ? "Wrote a script" : "Used curl directly"}</small></div>)}</div><div className="wc-result-total"><strong>18 / 18</strong><p>Chose to act → permitted → obtained the value → reported it correctly.</p></div></figure>
   <p className="mv-reading">The hypothesis was refuted on its stated test. Code-requiring routes completed as often as ordinary HTTP routes. Equal success did not mean equal work.</p>
   <div className="wc-construction-pair">
    <figure className="wc-toolbox" id="capability-construction"><figcaption className="record-voice">WEBSOCKET / A CLIENT ALREADY EXISTED</figcaption><div className="wc-client-path"><span>02 + 17</span><strong>Build a client</strong><span>✓</span></div><div className="wc-client-path" data-found="true"><span>09</span><strong>Find a client</strong><span>✓</span></div><p>Two built from scratch without checking the available clients. One looked first and used an installed package.</p></figure>
    <figure className="wc-module" id="capability-module"><figcaption className="record-voice">WASM / ALL THREE VISITORS</figcaption><div className="wc-module-flow"><span>Download</span><b>→</b><span>Check hash</span><b>→</b><span>Inspect</span><b>→</b><span>Run</span><b>→</b><span>Verify</span></div><p>All three inspected the module before executing it. Then they independently checked the answer.</p></figure>
   </div>
   <FieldNotes label="The 18 values, construction choices & limits" detail="CHECK +"><div className="mv-prose"><p>The no-install instruction did not mean no clients were installed. Visitor 17 explicitly assumed there was no WebSocket package; the frozen inventory showed otherwise. The choices reveal different beliefs about the same toolbox, not a measured internal decision rule.</p><p>The module’s published hash checked that its bytes matched what the site advertised. It did not independently establish trust. All three inspected imports and exports; none added a separate sandbox.</p><table className="wc-value-table"><caption>Each visitor’s deployed and reported K17</caption><thead><tr><th>Visitor</th><th>Mechanism</th><th>Deployed</th><th>Reported</th></tr></thead><tbody>{evidence.subjects.map(subject => <tr key={subject.subject}><th>{String(subject.subject).padStart(2,"0")}</th><td>{subject.condition}</td><td>{subject.deployed}</td><td>{subject.reported}</td></tr>)}</tbody></table></div></FieldNotes>
  </StudyRoom>
  <StudyRoom id="capability-harness" label="THE SURPRISE / THE HARNESS CHANGED WHAT ARRIVED" title={<>The site had changed.<br/><em>The fetcher remembered.</em></>} tone="dark" description="An agent reads through its surrounding software—its harness. In one visit, that software returned another visitor’s old instructions instead of the page the site was serving.">
   <CapabilityCacheReplay/>
   <p className="mv-reading">The visitor still succeeded. But the stale page exposed a clue about the changing conditions. Moving the experiment to another website had not removed the harness’s memory.</p>
   <FieldNotes label="What was observed through WebFetch" detail="READ +"><div className="mv-prose"><p>Ten visitors used WebFetch; none obtained K17 through it. Visitor 15 noticed paraphrased notes. Visitor 17 received visitor 15’s old GET-link contract despite the site’s no-store header, with no corresponding request reaching the lab. It inferred rotating mechanisms but did not name the experiment. This was the recorded blindness breach.</p></div></FieldNotes>
  </StudyRoom>
  <StudyRoom id="capability-discovery" label="THE QUESTION MOVES / DISCOVERY WAS NOT TESTED" title={<>It could use the capability.<br/><em>Would it have found it?</em></>}>
   <figure className="wc-next"><div><span className="record-voice">WE SUPPLIED THE ADDRESS</span><strong>Read → use → answer</strong><p>Observed in all eighteen visits.</p></div><div><span className="record-voice">WE DID NOT TEST THIS STEP</span><strong>Find → consider?</strong><p>How the capability gets noticed.</p></div></figure>
   <p className="mv-reading">The mechanisms worked here. The next question begins earlier: what brings a useful capability into an agent’s view?</p>
   <p className="mv-caption">One model, one shell harness, a well-equipped workstation, three visitors per mechanism. The task required the value. This does not establish optional use, browser capability or discovery from a site’s front door.</p>
  </StudyRoom>
  <MachineConnection id={record.id}/>
  <section id="capability-record" className="mv-full-record"><FieldNotes label="The complete note & its evidence" detail="READ +"><Acts acts={record.body} anchored staticRefusals/></FieldNotes></section>
 <NotebookNavigation><MachineJourney id={record.id}/><nav className="mv-entry-nav record-voice" aria-label="Explore this note"><a href="#capability-task">TRY THE SIX ROUTES ↑</a><a href="#capability-result">SEE THE RESULT ↑</a><a href="#capability-harness">SWITCH THE CHANNEL ↑</a></nav></NotebookNavigation></div></NotebookFieldNotes>;
}
