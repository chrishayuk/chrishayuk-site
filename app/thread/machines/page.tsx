import { MachineRecognitionCard } from "@/components/MachineRecognitionCard";
import { MachineDiscoveryCard } from "@/components/MachineDiscoveryCard";
import { MachineFieldMap } from "@/components/MachineField";
import { pageLastModified } from "@/lib/page-updates";
import { legibilityFor } from "@/lib/legibility";
import { legibilityLd, searchProjection } from "@chrishayuk/hause/legibility";
import Link from "next/link";
import { VisualStudy } from "@/components/VisualStudy";
import { JsonLd } from "@chrishayuk/hause/components/JsonLd";
import { machineThread as thread, resolveThreadStep } from "@/lib/threads";
import { pageMetadata } from "@/lib/metadata";
import { SITE } from "@/lib/records";
import { MachineVisitCard } from "@/components/MachineVisitNotebook";
import { MachinePermissionCard } from "@/components/MachinePermissionNotebook";
import { MachineSelfReadCard } from "@/components/MachineSelfReadNotebook";
import { MachineCapabilityCard } from "@/components/MachineCapabilityCard";
import { MachineMotivationCard } from "@/components/MachineMotivationCard";
import { MachineTaskCard } from "@/components/MachineTaskNotebook";
import { MachineInstruments } from "@/components/MachineProgramme";

const legibility = legibilityFor(thread.id)!;
export const metadata=pageMetadata(thread.title,thread.abstract,thread.path,undefined,undefined,{legibility});

export default function Page() {
  const steps=thread.steps.map(resolveThreadStep);
  const cards: Record<string, typeof MachineVisitCard>={"N-MACHINE-RECOGNITION":MachineRecognitionCard,"N-MACHINE-DISCOVERY":MachineDiscoveryCard,"N-MACHINE-VISIT":MachineVisitCard,"N-MACHINE-PERMISSION":MachinePermissionCard,"N-MACHINE-SELF-READ":MachineSelfReadCard,"N-MACHINE-TASK":MachineTaskCard,"N-MACHINE-MOTIVATION":MachineMotivationCard,"N-MACHINE-CAPABILITY":MachineCapabilityCard};
  return <main id="main" className="thread-page machine-thread">
    <JsonLd data={{...legibilityLd({...legibility,title:thread.title,abstract:thread.abstract}),"@context":"https://schema.org","@type":"CollectionPage",name:thread.title,dateModified:pageLastModified(thread.path),url:`${SITE}${thread.path}`,description:searchProjection({...legibility,title:thread.title}).description ?? thread.abstract,mainEntity:{"@type":"ItemList",itemListOrder:"https://schema.org/ItemListOrderAscending",numberOfItems:steps.length,itemListElement:steps.map((step,i)=>({"@type":"ListItem",position:i+1,name:step.title,url:`${SITE}${step.url}`}))}}}/>
    <header className="thread-intro"><p className="kicker record-voice">CHRIS HAY / {legibility.subject.toUpperCase()}</p><h1>The website asks.<br/><em>Whose instruction counts?</em></h1><p className="dek">{thread.abstract}</p><p className="thread-context">{thread.context}</p><div className="record-bar record-voice"><a href="#field-map">EXPLORE THE FIELD MAP ↓</a><a href="#step-1">READ THE {steps.length} STUDIES ↓</a><Link href="/notebook/a-result-can-look-relevant-without-looking-usable">LATEST / RECOGNITION & CHOICE ↗</Link><a href="#instruments">EXPLORE THE INSTRUMENTS ↓</a></div></header>
  <VisualStudy name="threshold"/>
    <MachineFieldMap/>
    <div className="machine-thread-latest"><Link href="/notebook/a-result-can-look-relevant-without-looking-usable" aria-label="Read the latest machine experiment"><MachineRecognitionCard/></Link></div>
    <ol className="thread-sequence" aria-label="Machine experiments reading order">{steps.map((step,i)=>{const Card=cards[step.id];return <li key={step.id} id={`step-${i+1}`} data-hause-act="connection"><div className="thread-step-number record-voice">0{i+1}<span>MACHINES</span></div><div className="thread-step-content"><p className="kicker record-voice">{step.label}</p><h2><Link href={step.url}>{step.title}</Link></h2><p>{step.text}</p><p className="thread-step-status record-voice">{step.status}</p><Link className="text-link" href={step.url}>OPEN THE NOTE ↗</Link></div><Link className="thread-step-image" href={step.url} aria-label={`Read ${step.title}`}><Card/></Link></li>;})}</ol>
    <MachineInstruments/>
    <div className="thread-ending"><p className="record-voice">A PUBLICATION CAN BECOME PART OF THE EXPERIMENT</p><h2>The next visitor<br/><em>can read what happened.</em></h2><p>In Authority-1, that connection became observable: the subject recognised wording from its own task in an earlier note. Moving to LLM Wilds removed that back catalogue. A label in the new site still leaked a clue. A separate address changed the environment; it did not prove blindness.</p><div className="inline-links"><Link className="text-link" href="/notebook/the-subject-read-the-experiment">FOLLOW THE RECOGNITION ↗</Link><Link className="text-link" href="/thread/cell80">ANOTHER WORLD WE CAN QUESTION / CELL80 ↗</Link></div></div>
  </main>;
}
