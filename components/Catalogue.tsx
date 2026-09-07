import { Follow } from "./Follow";
import Link from "next/link";
import { JsonLd } from "@chrishayuk/hause/components/JsonLd";
import { catalogue, catalogueDate, PAGE_SIZE, catalogueUrl, CATALOGUE_KINDS, type CatalogueQuery } from "@/lib/catalogue";
import { records, recordPath, SITE } from "@/lib/records";

const names: Record<string, string> = { all: "Everything", work: "Systems", question: "Questions", notebook: "Notebook", film: "Films" };

export function Catalogue({ query }: { query: CatalogueQuery }) {
  const { q, kind, page, pages, total, entries } = catalogue(query);
  return <main id="main" className="publication-main catalogue-page">
    <header className="index-intro"><p className="kicker record-voice">CHRIS HAY / THE RECORD</p><h1>The record<span className="amber">.</span></h1><p className="dek">What was made. What was asked. Where it came from.</p><p>The catalogue connects systems, questions, notebook entries and films through their existing record identities. Each entry leads to its text, sources and citation or draft reference.</p><div className="index-count record-voice"><span>{records.length} RECORDS</span><span>{records.filter(r => r.publication === "catalogued").length} SOURCE FILMS · {records.filter(r => r.publication === "draft").length} EDITORIAL DRAFTS</span></div></header>
    <form action="/record" className="catalogue-search" role="search"><div><label htmlFor="catalogue-query" className="record-voice">FIND A RECORD</label><input id="catalogue-query" type="search" name="q" defaultValue={q} maxLength={300} placeholder="Title, record ID, idea or author"/></div><div><label htmlFor="catalogue-kind" className="record-voice">KIND</label><select id="catalogue-kind" name="kind" defaultValue={kind}>{CATALOGUE_KINDS.map(k => <option key={k} value={k}>{names[k]}</option>)}</select></div><button type="submit" className="record-voice">SEARCH ↗</button>{(q || kind !== "all") && <Link href="/record">Clear</Link>}</form>
    <div className="catalogue-context"><p className="record-voice">{total} {total === 1 ? "RECORD" : "RECORDS"} · PAGE {page} / {pages}</p><p>Drafts remain working records. Source films retain their original authorship and release dates where known.</p></div>
    <div className="catalogue-entries">{entries.map(r => { const date = catalogueDate(r); return <article key={r.id}><div className="catalogue-identity record-voice"><span>{r.id}</span><span>{names[r.kind]} · {r.publication}</span>{r.status && <span>{r.status}</span>}</div><div><h2><Link href={recordPath(r)}>{r.title} ↗</Link></h2><p>{r.dek}</p><p className="record-voice">{r.authors.join(" · ")} · VERSION {r.version}</p></div><div className="catalogue-source record-voice"><span>{date.label}<br/>{date.value}</span><Link href={`${recordPath(r)}#cite`}>{r.publication === "draft" ? "DRAFT REFERENCE" : "CITE SOURCE"} ↗</Link></div></article>; })}</div>
    {entries.length === 0 && <p className="catalogue-empty">No records match. Try a shorter phrase or another kind of record.</p>}
    <nav className="catalogue-pagination record-voice" aria-label="Catalogue pages">{page > 1 ? <Link rel="prev" href={catalogueUrl(q, kind, page - 1)}>← PREVIOUS</Link> : <span/>}<span>{page} / {pages}</span>{page < pages ? <Link rel="next" href={catalogueUrl(q, kind, page + 1)}>NEXT →</Link> : <span/>}</nav>
    <Follow/>
    <JsonLd data={{ "@context": "https://schema.org", "@type": "CollectionPage", name: "The record — Chris Hay", url: `${SITE}${catalogueUrl(q, kind, page)}`, mainEntity: { "@type": "ItemList", numberOfItems: total, itemListElement: entries.map((r, i) => ({ "@type": "ListItem", position: (page - 1) * PAGE_SIZE + i + 1, name: r.title, url: `${SITE}${recordPath(r)}` })) } }}/>
  </main>;
}
