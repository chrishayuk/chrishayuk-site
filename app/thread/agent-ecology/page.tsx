import { MachinePeerConnection } from "@/components/MachinePeerNotebook";
import { pageLastModified } from "@/lib/page-updates";
import Link from "next/link";
import { ProgrammeIntro, ProgrammeSequence, ProgrammeContext } from "@/components/ProgrammeEdition";
import { ProgrammeDisclosure } from "@/components/ProgrammeDisclosure";
import { FigureMotion } from "@/components/FigureMotion";
import { RecoveryResult } from "@/components/RecoveryResult";
import { JsonLd } from "@chrishayuk/hause/components/JsonLd";
import { legibilityLd, searchProjection } from "@chrishayuk/hause/legibility";
import { legibilityFor } from "@/lib/legibility";
import { agentEcologyThread as thread, resolveThreadStep } from "@/lib/threads";
import { pageMetadata } from "@/lib/metadata";
import { SITE, getRecord, recordPath } from "@/lib/records";

const legibility = legibilityFor(thread.id)!;
export const metadata = pageMetadata(thread.title, thread.abstract, thread.path, undefined, undefined, { legibility });
export default function Page() {
 const steps = thread.steps.map(resolveThreadStep);
 const replayPath = `${recordPath(getRecord(thread.replay.record)!)}#${thread.replay.anchor}`;
 return <main id="main" className="thread-page eco-thread programme-page">
  <JsonLd data={{ ...legibilityLd({ ...legibility, title: thread.title, abstract: thread.abstract }), "@context": "https://schema.org", "@type": "CollectionPage", name: thread.title, dateModified: pageLastModified(thread.path), url: `${SITE}${thread.path}`, description: searchProjection({ ...legibility, title: thread.title }).description ?? thread.abstract, mainEntity: { "@type": "ItemList", itemListOrder: "https://schema.org/ItemListOrderAscending", numberOfItems: steps.length, itemListElement: steps.map((step, i) => ({ "@type": "ListItem", position: i + 1, name: step.title, url: `${SITE}${step.url}` })) } }}/>
  <ProgrammeIntro name="Agent Ecology" question="What can one agent leave behind for another?"><p>Shared records, inherited methods, and what successors do when the world changes.</p></ProgrammeIntro>
  <section className="programme-feature" aria-labelledby="programme-feature-title">
   <div className="programme-feature-copy"><p className="programme-label">Selected study / I12R</p><h2 id="programme-feature-title">The repairer left. The mechanism kept working.</h2><p>Damage arrived after the builder had gone. Successors inherited either a prose procedure or executable repair code.</p><Link className="programme-link" href="/notebook/the-repairer-left-the-mechanism-kept-working">Read the experiment ↗</Link></div>
   <FigureMotion><RecoveryResult/></FigureMotion>
  </section>
  <ProgrammeSequence steps={thread.steps} label="Agent ecology reading order"/>
  <ProgrammeContext abstract={thread.abstract} context={thread.context}/>
  <ProgrammeDisclosure label="The connection to agent permissions"><MachinePeerConnection/></ProgrammeDisclosure>
  <section className="programme-ending"><h2>Can successors repair the mechanism itself?</h2><p>The inherited machinery was protected in I12R. Letting it break, then asking a later successor to use the repaired program, is the proposed next experiment.</p><nav aria-label="Continue exploring"><Link href="/notebook/the-repairer-left-the-mechanism-kept-working#next">The next question ↗</Link><Link href={replayPath}>Replay the earlier handoff ↗</Link><Link href="/thread/cell80">Cell80 ↗</Link></nav></section>
 </main>;
}
