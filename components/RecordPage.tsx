import Link from "next/link";
import { Citation } from "@chrishayuk/hause/components/forms/Citation";
import { Provenance } from "@chrishayuk/hause/components/forms/Provenance";
import { citationLd } from "@chrishayuk/hause/seo";
import { Acts } from "./Acts";
import { Reference } from "./Reference";
import { citationRecord, referenceFormats } from "@/lib/citations";
import { getRecord, recordPath, sectionFor, SITE } from "@/lib/records";
import type { PublicationRecord } from "@/lib/types";
export function RecordPage({ record }: { record: PublicationRecord }) {
 const citation = citationRecord(record); const related = record.related.map(getRecord).filter(r => r !== undefined);
 const structured = citation ? citationLd(citation) : { "@context": "https://schema.org", "@type": "CreativeWork", "@id": `${SITE}${recordPath(record)}`, name: record.title, abstract: record.abstract, author: { "@type": "Person", name: "Chris Hay" }, creativeWorkStatus: "Draft", dateCreated: record.created, version: record.version };
 return <main id="main" className="publication-main"><script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(structured).replace(/</g,"\\u003c")}}/><header className="record-header"><nav className="breadcrumbs record-voice" aria-label="Breadcrumb"><Link href="/">CHRIS HAY</Link><span>/</span><Link href={`/${sectionFor(record)}`}>{sectionFor(record).toUpperCase()}</Link><span>/ {record.id}</span></nav><h1>{record.title}</h1><p className="dek">{record.dek}</p><p className="record-summary">{record.abstract}</p><div className="record-bar record-voice"><span>{record.id}</span><span>{record.status || record.collection}</span><span>RECORDED {record.created}</span><span>{record.publication.toUpperCase()} · V{record.version}</span><a href="#cite">{citation ? "CITE" : "REFERENCE DRAFT"} ↓</a></div></header>
 {record.kind === "film" && <section className="film-record-entry"><span className="record-voice">IBM / MIXTURE OF EXPERTS / EPISODE {record.episode}</span><h2>Enter the conversation.</h2><p>The complete episode and transcript are available from IBM. Follow the original production below.</p><a className="text-link" href={record.originalUrl}>WATCH THE ORIGINAL AT IBM ↗</a></section>}
 <div className="record-body" id="thread"><Acts acts={record.body}/>{record.slug === "mcp-cli" && <section className="sources" id="chuk"><h2>CHUK / TOOL INFRASTRUCTURE</h2><p>The related projects remain available through <a href="https://github.com/chrishayuk">Chris’s software archive ↗</a>.</p></section>}</div>
 <div className="record-apparatus"><section className="sources"><h2>SOURCES & PROVENANCE</h2><ul>{record.sources.map((s,i) => <li key={i}>{s.url ? <a href={s.url}>{s.title} ↗</a> : <span>{s.title}</span>}{s.note && <p>{s.note}</p>}</li>)}</ul><p className="record-voice">AUTHOR / CHRIS HAY · VERSION / {record.version}</p></section>{related.length>0 && <section className="related-records"><h2>FOLLOW THE RECORD</h2>{related.map(r => <Link key={r.id} href={recordPath(r)}>{r.title}<span>↗</span></Link>)}</section>}{citation ? <><Provenance record={citation} citeHref="#cite"/><Citation record={citation}/></> : <Reference formats={referenceFormats(record)} draft id={record.id}/>}</div></main>;
}
