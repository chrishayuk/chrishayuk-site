import { legibilityFor } from "@/lib/legibility";
import { legibilityLd, searchProjection } from "@chrishayuk/hause/legibility";
import Link from "next/link";
import { JsonLd } from "@chrishayuk/hause/components/JsonLd";
import { pageMetadata } from "@/lib/metadata";
import { mapThread as thread, resolveThreadStep } from "@/lib/threads";
import { SITE } from "@/lib/records";

import { ProgrammeIntro, ProgrammeSequence, ProgrammeContext } from '@/components/ProgrammeEdition';
import { Media } from '@/components/Media';

const legibility = legibilityFor(thread.id)!;
export const metadata = pageMetadata(thread.title, thread.abstract, thread.path, `${SITE}/media/notebook/stills/HJlWDSyDcD4-156.webp`, undefined, {legibility});
export default function Page() {
  const steps = thread.steps.map(resolveThreadStep);
  return <main id="main" className="thread-page programme-page">
    <JsonLd data={{...legibilityLd({...legibility,title:thread.title,abstract:thread.abstract}), "@context": "https://schema.org", "@type": "CollectionPage", "@id": `${SITE}${thread.path}`, url: `${SITE}${thread.path}`, name: thread.title, description: searchProjection({...legibility,title:thread.title}).description ?? thread.abstract, author: { "@type": "Person", "@id": `${SITE}/#person` }, mainEntity: { "@type": "ItemList", itemListOrder: "https://schema.org/ItemListOrderAscending", numberOfItems: steps.length, itemListElement: steps.map((step, i) => ({ "@type": "ListItem", position: i+1, name: step.title, url: `${SITE}${step.url}`, description: step.text })) } }}/>
    <ProgrammeIntro name="Learned Systems" question="What can a model’s changing state tell us?"><p>From the residual map to interventions, addressable memory and the software built around it.</p></ProgrammeIntro>
    <section className="programme-feature" aria-labelledby="programme-feature-title">
     <div className="programme-feature-copy"><p className="programme-label">From the film / 02:35–02:40</p><h2 id="programme-feature-title">Follow the residual state.</h2><p>A projected trajectory moves among Tokyo, Paris, Berlin and Cairo. The note examines what the picture can—and cannot—establish.</p><Link className="programme-link" href="/film/youtube/HJlWDSyDcD4?t=155">Watch the source film ↗</Link><Link className="programme-link" href="/notebook/what-is-the-map">Read the note ↗</Link></div>
     <Media id="notebook-map-trajectory" caption/>
    </section>
    <ProgrammeSequence steps={thread.steps} label="Learned systems reading order"/>
    <ProgrammeContext abstract={thread.abstract} context={thread.context}/>
    <section className="programme-ending"><h2>What would make the address reliable?</h2><p>Changed phrasing, competing entities and use beyond the first answer remain part of the question.</p><nav aria-label="Continue exploring"><Link href="/research/ffn-as-graph">The FFN question ↗</Link><Link href="/ask?q=address">Search the work ↗</Link></nav></section>
  </main>;
}
