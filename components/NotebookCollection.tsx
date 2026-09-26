import { notebookAppearance } from '@/lib/notebook-appearance';
import Link from "next/link";
import { Follow } from "./Follow";
import { NotebookSketch } from "./NotebookSketch";
import { notebookCollections, notebookNotes, noteDate, shortDate } from "@/lib/publication-index";
import { getRecord, recordPath } from "@/lib/records";
import { recordGraph } from "@/lib/graph";
import { selectHomeNotebook } from "@/lib/home-notebook";
import { notebookGallery } from "@/lib/notebook-gallery";
import "@/app/notebook-edition.css";

export function NotebookCollection(query: { collection?: string; publication?: string; q?: string }) {
  const gallery = notebookGallery(query);
  const filtered = gallery.collection !== "all" || gallery.publication !== "all" || !!gallery.q;
  const latest = selectHomeNotebook(recordGraph().nodes).latest;
  const lead = (latest && getRecord(latest.id)) || notebookNotes[0];
  return <main id="main" className="publication-main notebook-edition">
    <header className="notebook-masthead">
      <div><p className="notebook-register">Chris Hay / Working papers</p><h1>Notebook<span>.</span></h1></div>
      <div className="notebook-masthead-note"><p>Experiments, observations and questions still open.</p>
        {!filtered && lead && <a className="notebook-latest-link" data-notebook-lead={lead.id} data-notebook-destination={recordPath(lead)} href={`${recordPath(lead)}#open-notebook`}><span className="notebook-register">Latest notebook</span><span>{lead.title} ↗</span></a>}
      </div>
    </header>
    <section id="notebook-selection" className="notebook-selection" aria-label="Filter notebooks">
      <details className="notebook-filter-panel" key={`${gallery.collection}-${gallery.publication}-${gallery.q}`}>
        <summary><span className="notebook-filter-label">Filter notebooks <span aria-hidden="true" className="notebook-filter-indicator"/></span><span className="notebook-selection-count">{gallery.count} {gallery.count === 1 ? "notebook" : "notebooks"}{filtered ? " · Filtered selection" : " · All collections"}</span></summary>
      <form action="/notebook#notebook-selection" className="notebook-filters">
        <div><label htmlFor="notebook-title-filter">Find a notebook</label><input type="search" id="notebook-title-filter" name="q" defaultValue={gallery.q} maxLength={160} placeholder="Title or description"/></div>
        <div><label htmlFor="notebook-collection-filter">Collection</label><select id="notebook-collection-filter" name="collection" defaultValue={gallery.collection}><option value="all">All collections</option>{notebookCollections.map(item => <option key={item.id} value={item.id}>{item.title}</option>)}</select></div>
        <div><label htmlFor="notebook-publication-filter">Edition</label><select id="notebook-publication-filter" name="publication" defaultValue={gallery.publication}><option value="all">Published & working drafts</option><option value="published">Published</option><option value="draft">Working drafts</option></select></div>
        <button type="submit">View selection <span aria-hidden="true">↗</span></button>
        {filtered && <a href="/notebook#notebook-selection">Clear filters</a>}
      </form>
      </details>
    </section>
    {!gallery.count && <p className="notebook-empty">No notebooks in this selection. <a href="/notebook#notebook-selection">Explore all collections ↗</a></p>}
    <div className="notebook-collections">{gallery.collections.map((collection) => <section key={collection.id} id={`collection-${collection.id}`} className="notebook-collection" data-notebook-collection={collection.id} aria-labelledby={`collection-title-${collection.id}`}>
      <header className="notebook-collection-heading">
        <div><p className="notebook-register">Collection {String(notebookCollections.findIndex(item => item.id === collection.id) + 1).padStart(2, "0")} / {collection.notes.length} notes</p><h2 id={`collection-title-${collection.id}`}>{collection.title}</h2><p>{collection.description}</p></div>
        <Link href={collection.href}>Follow the collection ↗</Link>
      </header>
      <ol className="notebook-shelf">{collection.notes.map((note, index) => <li key={note.id} id={`entry-${note.id.toLowerCase()}`} data-notebook-entry={note.id} data-presentation={index % 5 === 0 ? "spread" : index % 5 === 1 || index % 5 === 4 ? "portrait" : "study"}>
        <article {...notebookAppearance(note.id)} className="notebook-volume" data-programme={collection.id} data-notebook-destination={recordPath(note)}>
          <a href={`${recordPath(note)}#open-notebook`} className="notebook-volume-cover">
            <div className="notebook-volume-register"><span>{collection.title}</span><span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span></div>
            <div className="notebook-volume-composition"><div className="notebook-volume-copy"><h3>{note.title}</h3><p>{note.dek}</p></div><NotebookSketch id={note.id} collection={collection.id}/></div>
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
