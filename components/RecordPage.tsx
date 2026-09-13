import { InheritanceNotebook } from "./InheritanceNotebook";
import { MachinePeerNotebook } from "./MachinePeerNotebook";
import { MachineBrief } from "./MachineField";
import { machineBriefs } from "@/lib/machine-field";
import { pageLastModified } from "@/lib/page-updates";
import { EcologyNotebook } from "./EcologyNotebook";
import { ecologyIds } from "@/lib/ecology-records";
import { MachineMotivationNotebook } from "./MachineMotivationNotebook";
import { Cell80BoundNotebook } from "./Cell80BoundNotebook";
import { cell80Journey } from "@/lib/cell80-journey";
import { MachineTaskNotebook } from "./MachineTaskNotebook";
import { MachineSelfReadNotebook } from "./MachineSelfReadNotebook";
import { MachinePermissionNotebook } from "./MachinePermissionNotebook";
import { MachineVisitNotebook } from "./MachineVisitNotebook";
import { Cell80FurtherNotebook } from "./Cell80FurtherNotebook";
import { cell80FurtherPart } from "@/lib/cell80-further-records";
import { Cell80Notebook } from "./Cell80Notebook";
import { cell80Part } from "@/lib/cell80";
import {NotebookShare} from "./NotebookShare";
import { JsonLd } from "@chrishayuk/hause/components/JsonLd";
import Link from "next/link";
import { ThreadNavigation } from "./ThreadNavigation";
import { Citation } from "@chrishayuk/hause/components/forms/Citation";
import { Provenance } from "@chrishayuk/hause/components/forms/Provenance";
import { citationLd } from "@chrishayuk/hause/seo";
import { legibilityLd } from "@chrishayuk/hause/legibility";
import { legibilityFor } from "@/lib/legibility";
import { threads } from "@/lib/threads";
import { Acts } from "./Acts";
import { AuthorityNotebook } from "./AuthorityNotebook";
import { AddressBuildNotebook } from "./AddressBuildNotebook";
import { AddressDepth } from "./AddressBuildStudies";
import { MapNotebook } from "./MapNotebook";
import { AgentAttributionHero, AgentAttributionNotebook } from "./AgentAttributionNotebook";
import { ExhibitionNotebook } from "./ExhibitionNotebook";
import { StateNotebook } from "./StateNotebook";
import { AddressNotebook } from "./AddressNotebook";
import { ShortNotebook } from "./ShortNotebook";
import { Reference } from "./Reference";
import { Follow } from "./Follow";
import { citationRecord, referenceFormats } from "@/lib/citations";
import { firstCapture } from "@/lib/archive";
import { getRecord, recordPath, sectionFor, SITE, records, isListed } from "@/lib/records";
import type { PublicationRecord } from "@/lib/types";
import type { EvidenceReference } from "@/vendor/hause/provenance";
import { MachineCapabilityNotebook } from "./MachineCapabilityNotebook";
import { MachineDiscoveryNotebook } from "./MachineDiscoveryNotebook";
import { PublicationHistory } from "./PublicationHistory";
import { provenanceFor, publicationHistory } from "@/lib/provenance";
export function RecordPage({ record, canonicalPath, frozen = false }: { record: PublicationRecord; canonicalPath?: string; frozen?: boolean }) {
 const brief = !frozen && machineBriefs[record.id];
 const modified = frozen ? record.revised : pageLastModified(recordPath(record), record.revised);
 const provenance = provenanceFor(record.id, record.version);
 const evidenceSources: EvidenceReference[] = provenance?.sources || record.sources;
 const history = publicationHistory(record.id);
 const versionEntry = history?.versions.find(entry => entry.version === record.version);
 const journeyPart = cell80Journey.findIndex(step => step.id === record.id) + 1;
 const ecologyPart = cell80Part(record.id);
 const furtherPart = cell80FurtherPart(record.id);
 const addressEdition = !frozen && record.id === "N-ADDRESS-BUILD";
 const agentEdition = !frozen && record.id === "N-ATTRIBUTION";
 const visualEdition = record.kind === "notebook";
 const citation = citationRecord(record); const capture = firstCapture(`${SITE}${recordPath(record)}`); const related = [...record.related.map(getRecord).filter((r): r is PublicationRecord => r !== undefined && isListed(r)), ...records.filter(r => r.youtubeId && r.related.includes(record.id)).slice(0,4)];
 const opening = !frozen && (addressEdition || record.kind === "notebook" && (record.body[0]?.kind === "film" || record.body[0]?.kind === "photograph"));
 const demonstration = record.body.find(act => act.kind === "connection" && act.demonstration);
 const demoLink = demonstration?.kind === "connection" ? demonstration.links[0] : undefined;
 const legibility = frozen ? undefined : legibilityFor(record.id);
 const memberships = threads.filter(thread => thread.steps.some(step => step.id === record.id));
 const url = `${SITE}${canonicalPath || recordPath(record)}`;
 const structured = {
  ...(citation ? citationLd(citation) : { "@context": "https://schema.org", "@type": record.kind === "notebook" ? "Article" : "CreativeWork", name: record.title, abstract: record.abstract, author: record.authors.map(name => ({ "@type": "Person", name })), creativeWorkStatus: "Draft", dateCreated: record.created, version: record.version }),
  "@id": url, url, mainEntityOfPage: url, headline: record.title, abstract: record.abstract,
  ...(frozen && versionEntry ? { isBasedOn: versionEntry.previous, identifier: { "@type": "PropertyValue", propertyID: "sha256", value: versionEntry.hash } } : {}),
  ...(legibility ? legibilityLd({ ...legibility, title: record.title, abstract: record.abstract }) : {}),
  ...(modified ? { dateModified: modified } : {}),
  ...(brief ? { hasPart: { "@type": "WebPageElement", "@id": `${url}#in-brief`, name: brief.question, text: brief.result } } : {}),
  ...(evidenceSources.some(source => source.url) ? { citation: evidenceSources.filter(source => source.url).map(source => ({ "@type": "CreativeWork", name: source.title, url: source.url, ...(source.preserved ? { archivedAt: `${SITE}${source.preserved.url}`, identifier: { "@type": "PropertyValue", propertyID: "sha256", value: source.preserved.sha256 } } : {}) })) } : {}),
  isPartOf: [{ "@type": "CollectionPage", "@id": `${SITE}/${sectionFor(record)}`, url: `${SITE}/${sectionFor(record)}`, name: `Chris Hay — ${sectionFor(record)}` }, ...memberships.map(thread => ({ "@type": "CollectionPage", "@id": `${SITE}${thread.path}`, url: `${SITE}${thread.path}`, name: thread.title }))],
 };
 return <main id="main" className={`publication-main${journeyPart ? " cell80-record" : ""}${opening || agentEdition ? " notebook-record" : ""}${visualEdition ? " visual-notebook-record" : ""}${record.id === "N-AUTHORITY" ? " authority-record" : ""}${addressEdition ? " address-build-record" : ""}${agentEdition ? " agent-attribution-record" : ""}${[...ecologyIds, "N-MACHINE-PEER", "N-MACHINE-DISCOVERY", "N-MACHINE-CAPABILITY", "N-MACHINE-MOTIVATION", "N-MACHINE-TASK", "N-MACHINE-VISIT", "N-MACHINE-PERMISSION", "N-MACHINE-SELF-READ"].includes(record.id) ? " machine-visit-record" : ""}`}><JsonLd data={structured}/>{agentEdition ? <AgentAttributionHero record={record} citation={Boolean(citation)} captureUrl={capture?.url}/> : <header className="record-header"><nav className="breadcrumbs record-voice" aria-label="Breadcrumb"><Link href="/">CHRIS HAY</Link><span>/</span><Link href={record.kind === "work" ? "/systems" : `/${sectionFor(record)}`}>{record.kind === "work" ? "SYSTEMS" : sectionFor(record).toUpperCase()}</Link>{!brief && <span>/ {record.id}</span>}</nav>{journeyPart > 0 && <nav className="cell80-series-marker record-voice" aria-label="Cell80 sequence"><Link href="/thread/cell80">CELL80 / THE EXPERIMENTS ↗</Link><span aria-current="page">NOTE 0{journeyPart} OF 06</span></nav>}<div className={opening ? "notebook-opening" : undefined}><div><h1 id={addressEdition ? "act-1" : undefined}>{record.title}</h1><p className="dek">{record.dek}</p>{opening && <div className="notebook-entrances"><a className="text-link notebook-read" href="#thread">FOLLOW THE QUESTION ↓</a>{demoLink && <a className="text-link notebook-demo-link" href={demoLink.href}>TRY THE INTERACTIVE STUDY ↗</a>}</div>}</div>{opening && <div className="notebook-opening-media">{addressEdition ? <AddressDepth/> : <Acts acts={[record.body[0]]} anchored priority/>}</div>}</div>{record.kind === "work" && <p className="work-endorsement record-voice">A SYSTEM BY <Link href="/about#the-house">CHRIS HAY ↗</Link></p>}{record.visibility === "unlisted" && <aside className="unlisted-banner" role="note"><p className="record-voice">UNLISTED PREVIEW · NOT PUBLISHED</p>{record.id === "N-MACHINE-MOTIVATION" ? <p>A working notebook edition for review.</p> : <p>This record has a working URL so it can be reviewed in place. It is linked from no index, excluded from the catalogue, the knowledge graph, Ask, the feeds and the sitemap, and marked noindex for search engines. Nothing here is published, and its research claims are not established.</p>}</aside>}{brief && <MachineBrief id={record.id}/>} {visualEdition ? <details className="notebook-synopsis"><summary className="record-voice">ABOUT THIS NOTE +</summary><p className="record-summary">{record.abstract}</p></details> : <p className="record-summary">{record.abstract}</p>}<div className="record-bar record-voice"><span>{record.id}</span><span>{record.status || record.collection}</span><span>RECORDED {record.created}</span>{brief && modified && <span>PAGE UPDATED <time dateTime={modified}>{modified}</time></span>}<span>{record.publication.toUpperCase()} · V{record.version}</span><span className="record-verbs"><a href="#cite">{citation ? "CITE" : "REFERENCE DRAFT"} ↓</a>{capture && <a href={capture.url} rel="nofollow" title={`Independently archived ${capture.date} by the Internet Archive`}>ARCHIVE ↗</a>}<a href="#follow">FOLLOW ↓</a></span></div></header>}
 {record.kind === "film" && <section className="film-record-entry"><span className="record-voice">IBM / MIXTURE OF EXPERTS / EPISODE {record.episode}</span><h2>Enter the conversation.</h2><p>The complete episode and transcript are available from IBM. Follow the original production below.</p><a className="text-link" href={record.originalUrl}>WATCH THE ORIGINAL AT IBM ↗</a></section>}
 {frozen && <aside className="sources" role="note"><p className="record-voice">PRESERVED MANUSCRIPT · V{record.version}</p><p>This view preserves the recorded text. The interactive presentation and external websites are not archived here.</p><a href={history?.url || recordPath(record)}>READ THE CURRENT EDITION ↗</a></aside>}
 <div className="record-body" id="thread">{frozen ? <Acts acts={record.body} anchored staticRefusals frozen/> : record.id === "N-MACHINE-PEER" ? <MachinePeerNotebook record={record}/> : record.id === "N-ECOLOGY-INHERITANCE" ? <InheritanceNotebook record={record}/> : ecologyIds.includes(record.id) ? <EcologyNotebook record={record}/> : record.id === "N-MACHINE-DISCOVERY" ? <MachineDiscoveryNotebook record={record}/> : record.id === "N-MACHINE-CAPABILITY" ? <MachineCapabilityNotebook record={record}/> : record.id === "N-MACHINE-MOTIVATION" ? <MachineMotivationNotebook record={record}/> : record.id === "N-MACHINE-TASK" ? <MachineTaskNotebook record={record}/> : record.id === "N-MACHINE-SELF-READ" ? <MachineSelfReadNotebook record={record}/> : record.id === "N-MACHINE-PERMISSION" ? <MachinePermissionNotebook record={record}/> : record.id === "N-MACHINE-VISIT" ? <MachineVisitNotebook record={record}/> : record.id === "N-CELL80-BOUND" ? <Cell80BoundNotebook record={record}/> : furtherPart ? <Cell80FurtherNotebook record={record}/> : ecologyPart ? <Cell80Notebook record={record}/> : agentEdition ? <AgentAttributionNotebook acts={record.body}/> : addressEdition ? <AddressBuildNotebook/> : record.id === "N-EXHIBITION" ? <ExhibitionNotebook acts={record.body}/> : record.id === "N-AUTHORITY" ? <AuthorityNotebook acts={record.body}/> : record.id === "N-MAP" ? <MapNotebook acts={record.body}/> : record.id === "N-STATE" ? <StateNotebook acts={record.body}/> : record.id === "N-ADDRESS" ? <AddressNotebook acts={record.body}/> : ["N-CONTEXT", "N-OPERATOR"].includes(record.id) ? <ShortNotebook id={record.id} acts={record.body}/> : <Acts acts={opening ? record.body.slice(1) : record.body} anchored offset={opening ? 1 : 0}/> }{record.slug === "mcp-cli" && <section className="sources" id="chuk"><h2>CHUK / TOOL INFRASTRUCTURE</h2><p>The related projects remain available through <a href="https://github.com/chrishayuk">Chris’s software archive ↗</a>.</p></section>}</div>
 <div className="record-apparatus"><ThreadNavigation id={record.id}/><PublicationHistory id={record.id} version={record.version}/><section className="sources"><h2>SOURCES & PROVENANCE</h2><ul>{evidenceSources.map((s,i) => <li key={i} id={`source-${i+1}`}>{s.url ? <a href={s.url}>{s.title} ↗</a> : <span>{s.title}</span>}{s.note && <p>{s.note}</p>}{s.preserved && <p className="record-voice"><a href={s.preserved.url}>PRESERVED COPY ↗</a> · CAPTURED {s.preserved.date}</p>}</li>)}</ul><p className="record-voice">AUTHOR / {record.authors.join(", ")} · VERSION / {record.version}</p></section>{related.length>0 && <section className="related-records"><h2>FOLLOW THE RECORD</h2>{related.map(r => <Link key={r.id} href={recordPath(r)}>{r.title}<span>↗</span></Link>)}</section>}{citation ? <><Provenance record={citation} citeHref="#cite"/><Citation record={citation}/></> : <Reference formats={referenceFormats(record)} draft id={record.id}/>}{record.kind==="notebook" && isListed(record) && <NotebookShare record={record}/>}<Follow/></div></main>;
}
