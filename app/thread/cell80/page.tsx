import { legibilityFor } from "@/lib/legibility";
import { legibilityLd, searchProjection } from "@chrishayuk/hause/legibility";
import Link from "next/link";
import { JsonLd } from "@chrishayuk/hause/components/JsonLd";
import { cell80Thread as thread, resolveThreadStep } from "@/lib/threads";
import { pageMetadata } from "@/lib/metadata";
import { SITE } from "@/lib/records";

import { ProgrammeIntro, ProgrammeSequence, ProgrammeContext } from '@/components/ProgrammeEdition';
import { Cell80WorldReplay } from '@/components/Cell80WorldReplay';

const legibility = legibilityFor(thread.id)!;
export const metadata = pageMetadata(thread.title, thread.abstract, thread.path, undefined, undefined, {legibility});

export default function Page() {
  const steps = thread.steps.map(resolveThreadStep);
  return <main id="main" className="thread-page cell80-thread programme-page">
    <JsonLd data={{...legibilityLd({...legibility,title:thread.title,abstract:thread.abstract}), "@context": "https://schema.org", "@type": "CollectionPage", "@id": `${SITE}${thread.path}`, url: `${SITE}${thread.path}`, name: thread.title, description: searchProjection({...legibility,title:thread.title}).description ?? thread.abstract, author: { "@type": "Person", name: "Chris Hay" }, mainEntity: { "@type": "ItemList", itemListOrder: "https://schema.org/ItemListOrderAscending", numberOfItems: steps.length, itemListElement: steps.map((step,i) => ({ "@type": "ListItem", position:i+1, name:step.title, url:`${SITE}${step.url}` })) } }}/>
    <ProgrammeIntro name="Cell80" question={thread.title}><p>Replay a birth, follow its descendants, and test which inherited changes matter.</p></ProgrammeIntro>
    <section className="programme-feature programme-feature-wide" aria-labelledby="programme-feature-title">
     <div className="programme-feature-copy"><p className="programme-label">Recorded replay / EX-4</p><h2 id="programme-feature-title">One birth, with and without its program change.</h2><p>Two recorded histories share the same clock. Load the replay to follow the intervention. This plays saved states; it does not run a new simulation.</p><Link className="programme-link" href="/notebook/can-you-name-the-mutation-that-changed-a-world">Read the experiment ↗</Link></div>
     <Cell80WorldReplay kind="lineage"/>
    </section>
    <ProgrammeSequence steps={thread.steps} label="Cell80 reading order" stepAnchors={{4:'further-notes'}}/>
    <ProgrammeContext abstract={thread.abstract} context={thread.context}/>
    <section className="programme-ending"><h2>What survives the controls?</h2><p>These six notes use different worlds and assays. Their controls distinguish a useful change from the opportunities supplied by the design.</p><nav aria-label="Continue exploring"><Link href="/notebook">Notebook ↗</Link><a href="/data/cell80/evidence.json">Recorded evidence ↗</a></nav></section>
  </main>;
}
