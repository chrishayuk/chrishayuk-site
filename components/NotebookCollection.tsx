import Link from "next/link";
import { Follow } from "./Follow";
import { notebookCollections, notebookNotes, noteDate, shortDate } from "@/lib/publication-index";
import { getRecord, recordPath } from "@/lib/records";
import { recordGraph } from "@/lib/graph";
import { selectHomeNotebook } from "@/lib/home-notebook";
import "@/app/notebook-edition.css";

export function NotebookCollection() {
  const latest = selectHomeNotebook(recordGraph().nodes).latest;
  const lead = (latest && getRecord(latest.id)) || notebookNotes[0];
  return <main id="main" className="publication-main notebook-edition">
    <header className="notebook-masthead">
      <div><p className="notebook-register">Chris Hay / Working papers</p><h1>Notebook<span>.</span></h1></div>
      <div className="notebook-masthead-note"><p>Experiments, observations<br/>and questions still open.</p><Link href="/notebook/archive">Browse all {notebookNotes.length} notes <span aria-hidden="true">↗</span></Link></div>
    </header>
    <section id="current-threads" className="notebook-threads" aria-labelledby="threads-heading">
      <div className="notebook-section-heading"><h2 id="threads-heading">The collections</h2><p>{notebookCollections.length} collections / {notebookNotes.length} notes</p></div>
      <nav aria-label="Notebook collections">{notebookCollections.map((item, index) => <a key={item.id} href={`#collection-${item.id}`} data-programme={item.id}>
        <span className="notebook-thread-number">{String(index + 1).padStart(2, "0")} / {item.notes.length} notes</span>
        <span className="notebook-thread-title">{item.title}<span aria-hidden="true">↓</span></span>
      </a>)}</nav>
    </section>
    {lead && <aside className="notebook-latest-slip" aria-label="Latest notebook" data-notebook-lead={lead.id} data-notebook-destination={recordPath(lead)}>
      <div><span className="notebook-register">{lead.publication === "published" ? "Latest publication" : "Working draft"}</span><time dateTime={noteDate(lead)}>{shortDate(noteDate(lead))}</time></div>
      <a href={`${recordPath(lead)}#open-notebook`}><span>{lead.title}</span><span aria-hidden="true">↗</span></a>
    </aside>}
    <div className="notebook-collections">{notebookCollections.map((collection, collectionIndex) => <section key={collection.id} id={`collection-${collection.id}`} className="notebook-collection" data-notebook-collection={collection.id} aria-labelledby={`collection-title-${collection.id}`}>
      <header className="notebook-collection-heading">
        <div><p className="notebook-register">Collection {String(collectionIndex + 1).padStart(2, "0")} / {collection.notes.length} notes</p><h2 id={`collection-title-${collection.id}`}>{collection.title}</h2><p>{collection.description}</p></div>
        <Link href={collection.href}>Follow the collection ↗</Link>
      </header>
      <ol className="notebook-shelf">{collection.notes.map((note, index) => <li key={note.id} id={`entry-${note.id.toLowerCase()}`} data-notebook-entry={note.id}>
        <article className="notebook-volume" data-programme={collection.id} data-notebook-destination={recordPath(note)}>
          <a href={`${recordPath(note)}#open-notebook`} className="notebook-volume-cover">
            <div className="notebook-volume-register"><span>{collection.title}</span><span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span></div>
            <h3>{note.title}</h3><p>{note.dek}</p>
            <div className="notebook-volume-footer"><span>{note.publication === "published" ? "Published" : "Working draft"} · <time dateTime={noteDate(note)}>{shortDate(noteDate(note))}</time></span><span className="notebook-volume-open">Open notebook <span aria-hidden="true">↗</span></span></div>
          </a>
        </article>
      </li>)}</ol>
    </section>)}</div>
    <section className="notebook-find" aria-labelledby="notebook-find-title">
      <div><p className="notebook-register">The complete collection</p><h2 id="notebook-find-title">Find a loose thread.</h2><p>{notebookNotes.length} notes, with sources, experiments and the record of how they changed.</p></div>
      <form action="/notebook/archive" role="search"><label htmlFor="notebook-search">Search the notebook</label><div><input id="notebook-search" name="q" type="search" maxLength={300} placeholder="A question, title or experiment"/><button type="submit" aria-label="Search the notebook">Search ↗</button></div><Link href="/notebook/archive">Or browse every note ↗</Link></form>
    </section>
    <details className="notebook-follow"><summary>Follow the notebook</summary><Follow/></details>
  </main>;
}
