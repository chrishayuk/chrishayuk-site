import { notebookAppearance } from '@/lib/notebook-appearance';
import Link from "next/link";
import { Follow } from "./Follow";
import { NotebookSketch } from "./NotebookSketch";
import { notebookCollections, notebookNotes, noteDate, shortDate } from "@/lib/publication-index";
import { getRecord, recordPath } from "@/lib/records";
import { recordGraph } from "@/lib/graph";
import { selectHomeNotebook } from "@/lib/home-notebook";
import { notebookGallery, notebookCollectionHref } from "@/lib/notebook-gallery";
import "@/app/notebook-edition.css";

export function NotebookCollection(query: { collection?: string; publication?: string; q?: string }) {
  const gallery = notebookGallery(query);
  const activeCollection = notebookCollections.find(item => item.id === gallery.collection);
  const filtered = gallery.publication !== "all" || !!gallery.q;
  const latest = selectHomeNotebook(recordGraph().nodes).latest;
  const lead = (latest && getRecord(latest.id)) || notebookNotes[0];
  return <main id="main" className="publication-main notebook-edition" data-notebook-view={activeCollection ? "collection" : "overview"}>
    <header className="notebook-masthead">
      <div>{activeCollection ? <a className="notebook-back" href="/notebook">← All collections</a> : <p className="notebook-register">Chris Hay / Working papers</p>}<h1>{activeCollection?.title || "Notebook"}<span>.</span></h1></div>
      <div className="notebook-masthead-note"><p>{activeCollection?.description || "Experiments, observations and questions still open."}</p>
        {!activeCollection && !filtered && lead && <a className="notebook-latest-link" data-notebook-lead={lead.id} data-notebook-destination={recordPath(lead)} href={`${recordPath(lead)}#open-notebook`}><span className="notebook-register">Latest notebook</span><span>{lead.title} ↗</span></a>}
        {activeCollection && <Link href={activeCollection.href}>Follow the collection ↗</Link>}
      </div>
    </header>
    <section id="notebook-selection" className="notebook-selection" aria-label="Filter notebooks">
      <details className="notebook-filter-panel" key={`${gallery.collection}-${gallery.publication}-${gallery.q}`}>
        <summary><span className="notebook-filter-label">Filter notebooks <span aria-hidden="true" className="notebook-filter-indicator"/></span><span className="notebook-selection-count">{gallery.count} {gallery.count === 1 ? "notebook" : "notebooks"}{filtered ? " · Matching selection" : activeCollection ? " · In this collection" : ` · ${gallery.collections.length} collections`}</span></summary>
      <form action="/notebook#notebook-selection" className="notebook-filters">
        <div><label htmlFor="notebook-title-filter">Find a notebook</label><input type="search" id="notebook-title-filter" name="q" defaultValue={gallery.q} maxLength={160} placeholder="Title or description"/></div>
        <div><label htmlFor="notebook-collection-filter">Collection</label><select id="notebook-collection-filter" name="collection" defaultValue={gallery.collection}><option value="all">All collections</option>{notebookCollections.map(item => <option key={item.id} value={item.id}>{item.title}</option>)}</select></div>
        <div><label htmlFor="notebook-publication-filter">Edition</label><select id="notebook-publication-filter" name="publication" defaultValue={gallery.publication}><option value="all">Published & working drafts</option><option value="published">Published</option><option value="draft">Working drafts</option></select></div>
        <button type="submit">View selection <span aria-hidden="true">↗</span></button>
        {filtered && <a href={activeCollection ? notebookCollectionHref(activeCollection.id) : "/notebook#notebook-selection"}>Clear filters</a>}
      </form>
      </details>
    </section>
    {!gallery.count && <p className="notebook-empty">No notebooks in this selection. <a href="/notebook#notebook-selection">Explore all collections ↗</a></p>}
    {!activeCollection ? <ol className="notebook-shelf notebook-collection-shelf" aria-label="Notebook collections">{gallery.collections.map((collection) => <li key={collection.id} data-collection-preview={collection.id}>
      <article className="notebook-volume notebook-collection-preview" data-notebook-palette={collection.id} data-notebook-tone="full">
        <a className="notebook-volume-cover" href={notebookCollectionHref(collection.id, gallery)}>
          <div className="notebook-volume-register"><span>Collection {String(notebookCollections.findIndex(item => item.id === collection.id) + 1).padStart(2, "0")}</span><span>{collection.notes.length} {filtered ? "matching " : ""}{collection.notes.length === 1 ? "notebook" : "notebooks"}</span></div>
          <div className="notebook-volume-composition"><div className="notebook-volume-copy"><h2>{collection.title}</h2><p>{collection.description}</p><div className="notebook-collection-glimpse"><span>Inside the collection</span><ul>{collection.notes.slice(0, 2).map(note => <li key={note.id}>{note.title}</li>)}</ul></div></div><NotebookSketch id="" collection={collection.id}/></div>
          <div className="notebook-volume-footer"><span>{collection.notes.filter(note => note.publication === "published").length} published · {collection.notes.filter(note => note.publication !== "published").length} working drafts</span><span className="notebook-volume-open">Explore collection <span aria-hidden="true">↗</span></span></div>
        </a>
      </article>
    </li>)}</ol> : <div className="notebook-collections">{gallery.collections.map((collection) => <section key={collection.id} id={`collection-${collection.id}`} className="notebook-collection" data-notebook-collection={collection.id} aria-label={`${collection.title} notebooks`}>
      <ol className="notebook-shelf">{collection.notes.map((note, index) => <li key={note.id} id={`entry-${note.id.toLowerCase()}`} data-notebook-entry={note.id} data-presentation={index % 5 === 0 ? "spread" : index % 5 === 1 || index % 5 === 4 ? "portrait" : "study"}>
        <article {...notebookAppearance(note.id)} className="notebook-volume" data-programme={collection.id} data-notebook-destination={recordPath(note)}>
          <a href={`${recordPath(note)}#open-notebook`} className="notebook-volume-cover">
            <div className="notebook-volume-register"><span>{collection.title}</span><span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span></div>
            <div className="notebook-volume-composition"><div className="notebook-volume-copy"><h2>{note.title}</h2><p>{note.dek}</p></div><NotebookSketch id={note.id} collection={collection.id}/></div>
            <div className="notebook-volume-footer"><span>{note.publication === "published" ? "Published" : "Working draft"} · <time dateTime={noteDate(note)}>{shortDate(noteDate(note))}</time></span><span className="notebook-volume-open">Open notebook <span aria-hidden="true">↗</span></span></div>
          </a>
        </article>
      </li>)}</ol>
    </section>)}</div>}
    <section className="notebook-find" aria-labelledby="notebook-find-title">
      <div><p className="notebook-register">The complete collection</p><h2 id="notebook-find-title">Find a loose thread.</h2><p>{notebookNotes.length} notes, with sources, experiments and the record of how they changed.</p></div>
      <form action="/notebook/archive" role="search"><label htmlFor="notebook-search">Search the notebook</label><div><input id="notebook-search" name="q" type="search" maxLength={300} placeholder="A question, title or experiment"/><button type="submit" aria-label="Search the notebook">Search ↗</button></div><Link href="/notebook/archive">Or browse every note ↗</Link></form>
    </section>
    <details className="notebook-follow"><summary>Follow the notebook</summary><Follow/></details>
  </main>;
}
