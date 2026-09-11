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
export function RecordPage({ record }: { record: PublicationRecord }) {
 const ecologyPart = cell80Part(record.id);
 const furtherPart = cell80FurtherPart(record.id);
 const addressEdition = record.id === "N-ADDRESS-BUILD";
 const agentEdition = record.id === "N-ATTRIBUTION";
 const visualEdition = record.kind === "notebook";
 const citation = citationRecord(record); const capture = firstCapture(`${SITE}${recordPath(record)}`); const related = [...record.related.map(getRecord).filter((r): r is PublicationRecord => r !== undefined && isListed(r)), ...records.filter(r => r.youtubeId && r.related.includes(record.id)).slice(0,4)];
 const opening = addressEdition || record.kind === "notebook" && (record.body[0]?.kind === "film" || record.body[0]?.kind === "photograph");
 const demonstration = record.body.find(act => act.kind === "connection" && act.demonstration);
 const demoLink = demonstration?.kind === "connection" ? demonstration.links[0] : undefined;
 const structured = citation ? citationLd(citation) : { "@context": "https://schema.org", "@type": "CreativeWork", "@id": `${SITE}${recordPath(record)}`, name: record.title, abstract: record.abstract, author: { "@type": "Person", name: "Chris Hay" }, creativeWorkStatus: "Draft", dateCreated: record.created, version: record.version };
 return <main id="main" className={`publication-main${ecologyPart || furtherPart ? " cell80-record" : ""}${opening || agentEdition ? " notebook-record" : ""}${visualEdition ? " visual-notebook-record" : ""}${record.id === "N-AUTHORITY" ? " authority-record" : ""}${addressEdition ? " address-build-record" : ""}${agentEdition ? " agent-attribution-record" : ""}${["N-MACHINE-VISIT", "N-MACHINE-PERMISSION"].includes(record.id) ? " machine-visit-record" : ""}`}><JsonLd data={structured}/>{agentEdition ? <AgentAttributionHero record={record} citation={Boolean(citation)} captureUrl={capture?.url}/> : <header className="record-header"><nav className="breadcrumbs record-voice" aria-label="Breadcrumb"><Link href="/">CHRIS HAY</Link><span>/</span><Link href={record.kind === "work" ? "/systems" : `/${sectionFor(record)}`}>{record.kind === "work" ? "SYSTEMS" : sectionFor(record).toUpperCase()}</Link><span>/ {record.id}</span></nav>{ecologyPart > 0 && <nav className="cell80-series-marker record-voice" aria-label="Cell80 sequence"><Link href="/thread/cell80">CELL80 / THREE QUESTIONS ↗</Link><span aria-current="page">PART 0{ecologyPart} OF 03</span></nav>}<div className={opening ? "notebook-opening" : undefined}><div><h1 id={addressEdition ? "act-1" : undefined}>{record.title}</h1><p className="dek">{record.dek}</p>{opening && <div className="notebook-entrances"><a className="text-link notebook-read" href="#thread">FOLLOW THE QUESTION ↓</a>{demoLink && <a className="text-link notebook-demo-link" href={demoLink.href}>TRY THE INTERACTIVE STUDY ↗</a>}</div>}</div>{opening && <div className="notebook-opening-media">{addressEdition ? <AddressDepth/> : <Acts acts={[record.body[0]]} anchored priority/>}</div>}</div>{record.kind === "work" && <p className="work-endorsement record-voice">A SYSTEM BY <Link href="/about#the-house">CHRIS HAY ↗</Link></p>}{record.visibility === "unlisted" && <aside className="unlisted-banner" role="note"><p className="record-voice">UNLISTED PREVIEW · NOT PUBLISHED</p><p>This record has a working URL so it can be reviewed in place. It is linked from no index, excluded from the catalogue, the knowledge graph, Ask, the feeds and the sitemap, and marked noindex for search engines. Nothing here is published, and its research claims are not established.</p></aside>}{visualEdition ? <details className="notebook-synopsis"><summary className="record-voice">ABOUT THIS NOTE +</summary><p className="record-summary">{record.abstract}</p></details> : <p className="record-summary">{record.abstract}</p>}<div className="record-bar record-voice"><span>{record.id}</span><span>{record.status || record.collection}</span><span>RECORDED {record.created}</span><span>{record.publication.toUpperCase()} · V{record.version}</span><span className="record-verbs"><a href="#cite">{citation ? "CITE" : "REFERENCE DRAFT"} ↓</a>{capture && <a href={capture.url} rel="nofollow" title={`Independently archived ${capture.date} by the Internet Archive`}>ARCHIVE ↗</a>}<a href="#follow">FOLLOW ↓</a></span></div></header>}
 {record.kind === "film" && <section className="film-record-entry"><span className="record-voice">IBM / MIXTURE OF EXPERTS / EPISODE {record.episode}</span><h2>Enter the conversation.</h2><p>The complete episode and transcript are available from IBM. Follow the original production below.</p><a className="text-link" href={record.originalUrl}>WATCH THE ORIGINAL AT IBM ↗</a></section>}
 <div className="record-body" id="thread">{record.id === "N-MACHINE-PERMISSION" ? <MachinePermissionNotebook record={record}/> : record.id === "N-MACHINE-VISIT" ? <MachineVisitNotebook record={record}/> : furtherPart ? <Cell80FurtherNotebook record={record}/> : ecologyPart ? <Cell80Notebook record={record}/> : agentEdition ? <AgentAttributionNotebook acts={record.body}/> : addressEdition ? <AddressBuildNotebook/> : record.id === "N-EXHIBITION" ? <ExhibitionNotebook acts={record.body}/> : record.id === "N-AUTHORITY" ? <AuthorityNotebook acts={record.body}/> : record.id === "N-MAP" ? <MapNotebook acts={record.body}/> : record.id === "N-STATE" ? <StateNotebook acts={record.body}/> : record.id === "N-ADDRESS" ? <AddressNotebook acts={record.body}/> : ["N-CONTEXT", "N-OPERATOR"].includes(record.id) ? <ShortNotebook id={record.id} acts={record.body}/> : <Acts acts={opening ? record.body.slice(1) : record.body} anchored offset={opening ? 1 : 0}/> }{record.slug === "mcp-cli" && <section className="sources" id="chuk"><h2>CHUK / TOOL INFRASTRUCTURE</h2><p>The related projects remain available through <a href="https://github.com/chrishayuk">Chris’s software archive ↗</a>.</p></section>}</div>
 <div className="record-apparatus"><ThreadNavigation id={record.id}/><section className="sources"><h2>SOURCES & PROVENANCE</h2><ul>{record.sources.map((s,i) => <li key={i} id={`source-${i+1}`}>{s.url ? <a href={s.url}>{s.title} ↗</a> : <span>{s.title}</span>}{s.note && <p>{s.note}</p>}</li>)}</ul><p className="record-voice">AUTHOR / CHRIS HAY · VERSION / {record.version}</p></section>{related.length>0 && <section className="related-records"><h2>FOLLOW THE RECORD</h2>{related.map(r => <Link key={r.id} href={recordPath(r)}>{r.title}<span>↗</span></Link>)}</section>}{citation ? <><Provenance record={citation} citeHref="#cite"/><Citation record={citation}/></> : <Reference formats={referenceFormats(record)} draft id={record.id}/>}{record.kind==="notebook" && isListed(record) && <NotebookShare record={record}/>}<Follow/></div></main>;
}
