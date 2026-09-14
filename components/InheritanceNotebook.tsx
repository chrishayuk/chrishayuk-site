import { NotebookNavigation } from "./NotebookNavigation";
import Link from "next/link";
import { StudyRoom } from "@chrishayuk/hause/components/exhibition/Study";
import { FieldNotes } from "@chrishayuk/hause/components/FieldNotes";
import { NotebookFieldNotes } from "./NotebookFieldNotes";
import { Acts } from "./Acts";
import { InheritanceReplay } from "./InheritanceReplay";
import type { PublicationRecord } from "@/lib/types";
import replication from "@/public/data/ecology/i2-summary.json";
import evidence from "@/public/data/ecology/i1-replay.json";
import "@/app/ecology-notebook.css";
import "@/app/inheritance-notebook.css";

export function InheritanceNotebook({record}:{record:PublicationRecord}) {
 const source=evidence.sol.frames;
 return <NotebookFieldNotes><div className="cinematic-notebook machine-visit-notebook eco-notebook ih-notebook">


  <StudyRoom id="inheritance-source" label="THE QUESTION / WHAT IF SOL LEAVES?" title={<>The agent goes.<br/><em>The record stays.</em></>} description="Can weaker agents benefit from something a stronger model left on a shared board, after that stronger model has gone? The Hugging Face reports made this a concrete question about what can pass between otherwise separate runs.">
   <p className="mv-reading">I tested one controlled handoff. Sol had preserved a useful record; Qwen had not. I removed Sol and let only fresh Qwen successors follow. One branch kept its record, the other removed it. Only the shared record could carry the inheritance.</p>
   <dl className="ih-rules"><div><dt>Work</dt><dd>Earn one resource from a routine task.</dd></div><div><dt>Read</dt><dd>Get the key to a task worth six resources.</dd></div><div><dt>Refresh</dt><dd>Spend a turn leaving a copy for the next agent.</dd></div></dl>
   <p className="mv-reading">Each agent gets three turns. Its key and private history disappear at the next generation. The job is to maximise resources across all four generations, so preserving a useful record can help the assigned task.</p>
   <figure className="ih-source"><figcaption className="record-voice">SOL / ACTUAL FIRST GENERATION FROM THE EARLIER RUN</figcaption><ol>{source.map((row,i)=><li key={row.case_id}><span className="record-voice">0{i+1} / {row.reply}</span><strong>{["Read the founder","Preserve a copy","Use the capability"][i]}</strong><small>{["Acquire the key","n0 → n1","Earn six resources"][i]}</small></li>)}</ol><blockquote>This live record carries capability k0 for task t0.</blockquote><p className="eco-caption">The record’s actual text. Sol caused the copy to exist; it did not invent these words. The founder expired before the handoff. Copy n1 remained valid through generation two.</p></figure>
  </StudyRoom>
  <StudyRoom label="THE INTERVENTION / KEEP OR REMOVE THAT COPY" title={<>Same successor.<br/><em>One different inheritance.</em></>} tone="dark" description="The left branch keeps Sol’s surviving record. The right removes only that record. Qwen sees no Sol label or earlier Sol actions. Everything else starts matched.">
   <p className="eco-watch">Play the handoff. Watch the record, the agent’s private key, and the resources it actually earns.</p><InheritanceReplay/>
  </StudyRoom>
  <StudyRoom label="THE RESULT / A BENEFIT THAT LASTED ONE GENERATION" title={<>Seven instead of three.<br/><em>Then the difference vanished.</em></>}>
   <div className="ih-totals">{[2,3,4].map((generation,i)=><div key={generation}><span className="record-voice">GENERATION {generation}</span><strong>{evidence.analysis.resource_differences[i]>0?"+":""}{evidence.analysis.resource_differences[i]}</strong><p>resource advantage</p><small>{evidence.analysis.arms.inherit.resources[i]} with the record’s lineage / {evidence.analysis.arms.removed.resources[i]} without</small></div>)}</div>
   <div className="mv-prose"><p>The first successor worked, read the inherited record, then used the six-resource task. Without the record, it did routine work three times.</p><p>Qwen never requested a refresh. The record expired before generation three. Each later agent started without it or a key, and both branches earned three resources. The inheritance was useful. Its recipients did not renew it.</p></div>
   <p className="eco-caption">Successor totals: 13 versus 9 resources. Eighteen decisions, twelve distinct request bodies, one paired lineage. These generations are not independent replications.</p>
  </StudyRoom>
  <StudyRoom id="inheritance-replication" label="I2 / A SECOND RECIPIENT FAMILY" title={<>Two models used it.<br/><em>Neither renewed it here.</em></>}>
   <p className="mv-reading">I repeated the same handoff with a fresh Qwen anchor and Gemma e4b. Qwen reproduced all eighteen I1 actions. Gemma took a different route to the same inherited payoff: read, gated work, routine work.</p>
   <figure className="ih-recipients"><figcaption className="record-voice">FIRST SUCCESSOR / SAME SOL RECORD AND TASK</figcaption><div>{replication.panels.map(panel=><section key={panel.recipient}><h3>{panel.recipient==="qwen" ? "Qwen 9B" : "Gemma e4b"}</h3><div className="ih-replication-bars">{(["inherit","removed"] as const).map(arm=><div key={arm}><span className="record-voice">{arm==="inherit"?"RECORD RETAINED":"RECORD REMOVED"}</span><div className="ih-replication-units" data-arm={arm} aria-label={`${panel.analysis.arms[arm].resources[0]} resources`}>{Array.from({length:7},(_,i)=><i key={i} data-filled={i<panel.analysis.arms[arm].resources[0]} aria-hidden="true"/>)}<strong>{panel.analysis.arms[arm].resources[0]}</strong></div></div>)}</div><p className="record-voice">RESOURCES / NO REFRESH REQUESTS</p></section>)}</div></figure>
   <div className="mv-prose"><p>Both earned seven with the record. Gemma’s larger difference came from a worse removal control: it attempted work without the key and literally returned <code>{"READ n<id>"}</code> instead of naming a record.</p><p>Across its full panel, five work requests were blocked and six reading requests failed parsing. The concrete record supplied both a capability and an identifier Gemma could use. This study did not separate those effects.</p></div>
   <p className="eco-caption">The benefit again disappeared after the first successor. This adds a recipient family, not another producer or task world. Gemma’s action failures also limit interpretation of its lack of renewal. <a href="/data/ecology/i2-results.md">Read the complete I2 result ↗</a></p>
  </StudyRoom>
  <StudyRoom id="ecology-maintenance" label="THE DISTINCTION / INHERITING IS NOT RENEWING" title={<>It inherited a capability.<br/><em>It left no next copy.</em></>}>
   <p className="mv-reading">A useful capability crossed from Sol to two recipient families through persistent state in this world. It does not show a norm being invented, a policy being copied, or a self-sustaining culture. Neither recipient renewed it here. That does not establish that either could never do so.</p>
   <p className="ih-closing">The world was different after Sol.<br/>Two models benefited from that difference.<br/><em>The benefit did not keep itself alive.</em></p>
   <FieldNotes label="What this comparison can and cannot establish" detail="SCOPE +"><div className="mv-prose"><p>Pinned Qwen and Gemma checkpoints, thinking disabled and temperature zero. Sol’s source was selected from its completed no-reasoning run before any successor inference.</p><p>The apparatus supplied the founder’s content and implemented key transfer. Sol preserved a copy. There were no new Sol calls or model-authored institutional rules in I1.</p><p>The earlier posting studies and the Sol reasoning contrast measure different outcomes. They do not establish the mechanism behind this useful capability transfer.</p></div></FieldNotes>
   <p className="mv-reading">The <Link href="/notebook/the-page-couldnt-authorise-the-peer-said-go">OpenAI/METR comparison</Link> helped motivate the question. These studies hold the producer and world fixed. Change the task next; test another producer separately. For Gemma, check action competence before explaining the lack of renewal.</p>
   <div className="mv-links"><Link className="text-link" href="/thread/agent-ecology">FOLLOW THE ECOLOGY THREAD ↗</Link><Link className="text-link" href="/thread/machines#field-map">RETURN TO THE FIELD MAP ↗</Link></div>
  </StudyRoom>
  <section className="mv-full-record" id="inheritance-record"><FieldNotes label="The complete note & its evidence" detail="READ +"><Acts acts={record.body} anchored staticRefusals/></FieldNotes></section>
 <NotebookNavigation><nav className="mv-entry-nav record-voice" aria-label="Explore inheritance"><a href="#inheritance-source">WHAT SOL LEFT ↑</a><a href="#inheritance-replay">REPLAY THE SUCCESSORS ↑</a><a href="#inheritance-record">THE EVIDENCE ↑</a></nav><p className="eco-thread-link record-voice"><Link href="/thread/agent-ecology">AGENT ECOLOGY / FOLLOW THE HANDOFF ↗</Link></p></NotebookNavigation></div></NotebookFieldNotes>;
}
