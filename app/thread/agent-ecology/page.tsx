import { MachinePeerConnection } from "@/components/MachinePeerNotebook";
import { pageLastModified } from "@/lib/page-updates";
import Link from "next/link";
import { JsonLd } from "@chrishayuk/hause/components/JsonLd";
import { legibilityLd, searchProjection } from "@chrishayuk/hause/legibility";
import { legibilityFor } from "@/lib/legibility";
import { agentEcologyThread as thread, resolveThreadStep } from "@/lib/threads";
import { pageMetadata } from "@/lib/metadata";
import { SITE, getRecord, recordPath } from "@/lib/records";
import { EcologyCard } from "@/components/EcologyCard";

const legibility = legibilityFor(thread.id)!;
export const metadata = pageMetadata(thread.title, thread.abstract, thread.path, undefined, undefined, { legibility });
export default function Page() {
 const steps = thread.steps.map(resolveThreadStep);
 const replayPath = `${recordPath(getRecord(thread.replay.record)!)}#${thread.replay.anchor}`;
 return <main id="main" className="thread-page eco-thread">
  <JsonLd data={{ ...legibilityLd({ ...legibility, title: thread.title, abstract: thread.abstract }), "@context": "https://schema.org", "@type": "CollectionPage", name: thread.title, dateModified: pageLastModified(thread.path), url: `${SITE}${thread.path}`, description: searchProjection({ ...legibility, title: thread.title }).description ?? thread.abstract, mainEntity: { "@type": "ItemList", itemListOrder: "https://schema.org/ItemListOrderAscending", numberOfItems: steps.length, itemListElement: steps.map((step, i) => ({ "@type": "ListItem", position: i + 1, name: step.title, url: `${SITE}${step.url}` })) } }}/>
  <header className="thread-intro"><p className="kicker record-voice">CHRIS HAY / AGENT ECOLOGY</p><h1>{thread.title}</h1><p className="dek">{thread.abstract}</p><p className="thread-context">{thread.context}</p><div className="record-bar record-voice"><a href="#step-1">BEGIN WITH THE BOARD ↓</a><Link href="/thread/machines#field-map">SEE THE FIELD MAP ↗</Link><Link href={replayPath}>{thread.replay.label} ↗</Link></div></header>
  <ol className="thread-sequence" aria-label="Agent ecology reading order">{steps.map((step, i) => <li key={step.id} id={`step-${i+1}`} data-hause-act="connection"><div className="thread-step-number record-voice">0{i+1}<span>ECOLOGY</span></div><div className="thread-step-content"><p className="kicker record-voice">{step.label}</p><h2><Link href={step.url}>{step.title}</Link></h2><p>{step.text}</p><p className="thread-step-status record-voice">{step.status}</p><Link className="text-link" href={step.url}>OPEN THE NOTE ↗</Link></div><Link className="thread-step-image" href={step.url} aria-label={`Read ${step.title}`}><EcologyCard id={step.id}/></Link></li>)}</ol>
  <div className="ecology-comparison"><MachinePeerConnection/></div>
  <div className="thread-ending"><p className="record-voice">THE OPEN QUESTION / WHO MAINTAINS THE ARTEFACT?</p><h2>The harness kept it.<br/><em>Would the agents?</em></h2><p>These studies supplied the records that affected later decisions. A self-maintaining loop would require agents to create or preserve those records themselves. That remains a question to test.</p><div className="inline-links"><Link className="text-link" href="/thread/machines">MACHINE EXPERIMENTS / WHEN DOES AN ACTION BELONG TO THE TASK? ↗</Link><Link className="text-link" href="/thread/cell80">CELL80 / WHAT SURVIVES INHERITANCE? ↗</Link></div></div>
 </main>;
}
