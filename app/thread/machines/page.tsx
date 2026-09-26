import { MachineFieldMap } from "@/components/MachineField";
import { pageLastModified } from "@/lib/page-updates";
import { legibilityFor } from "@/lib/legibility";
import { legibilityLd, searchProjection } from "@chrishayuk/hause/legibility";
import Link from "next/link";
import { JsonLd } from "@chrishayuk/hause/components/JsonLd";
import { machineThread as thread, resolveThreadStep } from "@/lib/threads";
import { pageMetadata } from "@/lib/metadata";
import { SITE } from "@/lib/records";
import { ProgrammeIntro, ProgrammeSequence, ProgrammeContext } from '@/components/ProgrammeEdition';
import { ProgrammeRecognition } from '@/components/ProgrammeRecognition';
import { ProgrammeDisclosure } from '@/components/ProgrammeDisclosure';
import { MachineInstruments } from "@/components/MachineProgramme";

const legibility = legibilityFor(thread.id)!;
export const metadata=pageMetadata(thread.title,thread.abstract,thread.path,undefined,undefined,{legibility});

export default function Page() {
  const steps=thread.steps.map(resolveThreadStep);
  return <main id="main" className="thread-page machine-thread programme-page">
    <JsonLd data={{...legibilityLd({...legibility,title:thread.title,abstract:thread.abstract}),"@context":"https://schema.org","@type":"CollectionPage",name:thread.title,dateModified:pageLastModified(thread.path),url:`${SITE}${thread.path}`,description:searchProjection({...legibility,title:thread.title}).description ?? thread.abstract,mainEntity:{"@type":"ItemList",itemListOrder:"https://schema.org/ItemListOrderAscending",numberOfItems:steps.length,itemListElement:steps.map((step,i)=>({"@type":"ListItem",position:i+1,name:step.title,url:`${SITE}${step.url}`}))}}}/>
    <ProgrammeIntro name="Machines" question="What makes a website useful to an AI visitor?"><p>Experiments in finding a tool, recognising what it offers, and deciding whether to use it.</p></ProgrammeIntro>
    <section className="programme-feature" aria-labelledby="programme-feature-title">
     <div className="programme-feature-copy"><p className="programme-label">Selected study / Recognition-2</p><h2 id="programme-feature-title">A result can look relevant without looking usable.</h2><p>The same provider appeared with two descriptions. Select one to inspect the recorded first choices.</p><Link className="programme-link" href="/notebook/a-result-can-look-relevant-without-looking-usable">Read the experiment ↗</Link></div>
     <ProgrammeRecognition/>
    </section>
    <ProgrammeSequence steps={thread.steps} label="Machine experiments reading order"/>
    <ProgrammeDisclosure label="Explore the wider field map"><MachineFieldMap/></ProgrammeDisclosure>
    <ProgrammeContext abstract={thread.abstract} context={thread.context}/>
    <MachineInstruments/>
    <section className="programme-ending"><h2>What happens after the first choice?</h2><p>The description changed which provider agents selected. Fetching and eventual use introduced further obstacles. The note keeps those outcomes separate.</p><nav aria-label="Continue exploring"><Link href="/notebook/a-result-can-look-relevant-without-looking-usable#recognition-pairs">Inspect the six paired scenarios ↗</Link><Link href="/thread/agent-ecology">Agent Ecology ↗</Link></nav></section>
  </main>;
}
