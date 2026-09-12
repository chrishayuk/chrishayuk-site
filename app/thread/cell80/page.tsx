import { legibilityFor } from "@/lib/legibility";
import { legibilityLd } from "@chrishayuk/hause/legibility";
import Link from "next/link";
import { JsonLd } from "@chrishayuk/hause/components/JsonLd";
import { Statement } from "@chrishayuk/hause/components/forms/Statement";
import { cell80Thread as thread, resolveThreadStep } from "@/lib/threads";
import { pageMetadata } from "@/lib/metadata";
import { SITE } from "@/lib/records";
import { Cell80Journey } from "@/components/Cell80Journey";
import { Cell80BoundCard } from "@/components/Cell80BoundNotebook";
import { Cell80FurtherCard } from "@/components/Cell80FurtherNotebook";
import { Cell80Card } from "@/components/Cell80Notebook";

const legibility = legibilityFor(thread.id)!;
export const metadata = pageMetadata(thread.title, thread.abstract, thread.path, undefined, undefined, {legibility});

export default function Page() {
  const steps = thread.steps.map(resolveThreadStep);
  return <main id="main" className="thread-page cell80-thread">
    <JsonLd data={{...legibilityLd({...legibility,title:thread.title,abstract:thread.abstract}), "@context": "https://schema.org", "@type": "CollectionPage", "@id": `${SITE}${thread.path}`, url: `${SITE}${thread.path}`, name: thread.title, description: legibility.description, author: { "@type": "Person", name: "Chris Hay" }, mainEntity: { "@type": "ItemList", itemListOrder: "https://schema.org/ItemListOrderAscending", numberOfItems: steps.length, itemListElement: steps.map((step,i) => ({ "@type": "ListItem", position:i+1, name:step.title, url:`${SITE}${step.url}` })) } }}/>
    <header className="thread-intro"><p className="kicker record-voice">CHRIS HAY / {legibility.subject.toUpperCase()}</p><h1>A world that can<br/><em>be questioned.</em></h1><p className="dek">{thread.abstract}</p><p className="thread-context">{thread.context}</p><div className="record-bar record-voice"><span>SIX CONNECTED NOTES</span><span>WORKING EDITION · V{thread.version}</span><a href="#step-1">BEGIN WITH THE BIRTH ↓</a></div></header>
    <Cell80Journey expanded/>
    <ol className="thread-sequence" aria-label="Cell80 reading order">{steps.map((step,i) => <li key={step.id} id={`step-${i+1}`} data-hause-act="connection"><div id={i === 3 ? "further-notes" : undefined} className="thread-step-number record-voice">0{i+1}<span>CELL80</span></div><div className="thread-step-content"><p className="kicker record-voice">{step.label}</p><h2><Link href={step.url}>{step.title}</Link></h2><p>{step.text}</p><p className="thread-step-status record-voice">{step.status}</p><Link className="text-link" href={step.url}>OPEN THE NOTE ↗</Link></div><Link className="thread-step-image" href={step.url} aria-label={`Open ${step.title}`}>{i < 3 ? <Cell80Card part={i+1} compact/> : i < 5 ? <Cell80FurtherCard part={i-2}/> : <Cell80BoundCard/>}</Link></li>)}</ol>
    <div className="thread-ending"><p className="record-voice">BUILDING THINGS TO FIND OUT HOW THEY WORK</p><Statement text="A small executable world." continuation="A deep old question." presentation="room"/><p>Artificial life has explored digital organisms, coevolution and cumulative adaptation for decades. These notes follow my own experiments within that tradition, from an inspectable birth to an inherited opportunity, then the controls that exposed the limits of the worlds I designed.</p><div className="inline-links"><Link href="/notebook" className="text-link">RETURN TO THE NOTEBOOK ↗</Link><a href="/data/cell80/evidence.json" className="text-link">READ THE EVIDENCE ↗</a></div></div>
  </main>;
}
