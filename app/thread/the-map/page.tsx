import Link from "next/link";
import { readAddress, addressedMemory } from "@/lib/addressed-memory";
import { JsonLd } from "@chrishayuk/hause/components/JsonLd";
import { pageMetadata } from "@/lib/metadata";
import { mapThread as thread, resolveThreadStep, memoryStudy, authorityStudy } from "@/lib/threads";
import { authorityGate, gateArm } from "@/lib/authority-gate";
import { getMedia } from "@/lib/media";
import { SITE } from "@/lib/records";
import { WorkVisual } from "@/components/WorkSelection";

export const metadata = pageMetadata(thread.title, thread.abstract, thread.path, `${SITE}/media/notebook/stills/HJlWDSyDcD4-156.webp`);
export default function Page() {
  const steps = thread.steps.map(resolveThreadStep);
  return <main id="main" className="thread-page">
    <JsonLd data={{ "@context": "https://schema.org", "@type": "CollectionPage", "@id": `${SITE}${thread.path}`, url: `${SITE}${thread.path}`, name: thread.title, description: thread.abstract, author: { "@type": "Person", "@id": `${SITE}/#person` }, mainEntity: { "@type": "ItemList", itemListOrder: "https://schema.org/ItemListOrderAscending", numberOfItems: steps.length, itemListElement: steps.map((step, i) => ({ "@type": "ListItem", position: i+1, name: step.title, url: `${SITE}${step.url}`, description: step.text })) } }}/>
    <header className="thread-intro"><p className="kicker record-voice">CHRIS HAY / FOLLOW THE THREAD</p><h1>From a map<br/><em>to a memory.</em></h1><p className="dek">{thread.abstract}</p><p className="thread-context">{thread.context}</p><div className="record-bar record-voice"><span>{thread.id}</span><span>EDITORIAL GUIDE · V{thread.version}</span><span>COMPOSED {thread.created}</span><a href="#step-1">START WITH THE FILM ↓</a></div></header>
    <ol className="thread-sequence" aria-label="Reading order">{steps.map((step, i) => {
      const media = step.media ? getMedia(step.media) : undefined;
      return <li key={step.id} id={`step-${i+1}`} data-hause-act="connection">
        <div className="thread-step-number record-voice">{String(i+1).padStart(2,"0")}<span>{step.kind}</span></div>
        <div className="thread-step-content"><p className="kicker record-voice">{step.label}</p><h2><Link href={step.url}>{step.title}</Link></h2><p>{step.text}</p><p className="thread-step-status record-voice">{step.status}{step.date ? ` · ${step.date}` : ""}</p><Link href={step.url} className="text-link">{step.id === memoryStudy.id ? "TRY THE MECHANISM" : step.id === authorityStudy.id ? "OPEN THE INSTRUMENT" : step.kind === "film" ? "WATCH FROM 02:00" : step.kind === "work" ? "EXPLORE THE WORK" : "OPEN THE NOTE"} ↗</Link></div>
        <Link href={step.url} className="thread-step-image" aria-label={`Open ${step.title}`}>
          {step.id === "W-VINDEX3" ? <WorkVisual id={step.id}/> : step.id === authorityStudy.id ? <div className="thread-authority-preview"><span className="record-voice">EIGHT READS OPEN</span><strong>{gateArm([])!.answer}</strong><span className="record-voice">RETIRE LAYER {authorityGate.architecture.globalLayers[4]}</span><strong data-flipped="true">{gateArm([29])!.answer}</strong><span className="record-voice">RECORDED RESULT ↗</span></div> : step.id === memoryStudy.id ? <div className="thread-demo-preview"><span className="record-voice">{addressedMemory.facts[0].address.toUpperCase()}</span><span aria-hidden="true">↓</span><strong>{readAddress(0).answer}.</strong><span className="record-voice">CHANGE THE QUESTION ↗</span></div> : media && <img src={media.poster || media.desktop} alt={media.alt} width={1600} height={900} loading={i === 0 ? "eager" : "lazy"}/>}
          {step.id !== memoryStudy.id && step.id !== authorityStudy.id && <span className="record-voice">{step.id === "W-VINDEX3" ? "CONCEPTUAL STUDY" : media?.type === "film" ? "CONSTRUCTED VISUAL STUDY" : "FROM THE FILM"} ↗</span>}
        </Link>
      </li>;
    })}</ol>
    <div className="thread-ending"><p className="record-voice">THE NEXT QUESTION</p><h2>What would make<br/><em>the address reliable?</em></h2><p>The notes keep the limits visible: changed phrasing, competing entities, retained state and use beyond the first answer. Follow the open research question, or search the underlying records.</p><div className="inline-links"><Link href="/research/ffn-as-graph" className="text-link">THE FFN QUESTION ↗</Link><Link href="/ask?q=address" className="text-link">ASK THE WORK ↗</Link></div></div>
  </main>;
}
