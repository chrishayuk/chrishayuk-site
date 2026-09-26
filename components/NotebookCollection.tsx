import Link from "next/link";
import { Follow } from "./Follow";
import { CompactNotes } from "./PublicationIndex";
import { programmes, latestNotes, notebookNotes, noteDate, shortDate, programmeFor } from "@/lib/publication-index";
import { recordPath } from "@/lib/records";
import "@/app/notebook-edition.css";

export function NotebookCollection() {
  const lead = latestNotes[0];
  const otherNotes = latestNotes.filter(note => note.id !== lead.id);
  const programme = programmeFor(lead);
  return <main id="main" className="publication-main notebook-edition">
    <header className="notebook-masthead"><h1>Notebook</h1><Link href="/notebook/archive">Browse all {notebookNotes.length} notes</Link></header>
    <div className="notebook-reading">
      <div>
        <article className="notebook-lead" aria-labelledby="notebook-lead-title">
          <p className="notebook-dateline">{programme && <Link href={programme.href}>{programme.title}</Link>}<time dateTime={noteDate(lead)}>{shortDate(noteDate(lead))}</time>{lead.publication !== "published" && <span>Working draft</span>}</p>
          <h2 id="notebook-lead-title" className="notebook-journey-title" data-notebook-destination={recordPath(lead)} style={{viewTransitionName: `notebook-${lead.id.toLowerCase()}`}}><a href={recordPath(lead)}>{lead.title}</a></h2>
          <p className="notebook-lead-dek">{lead.dek}</p>
          <a className="notebook-read" href={recordPath(lead)}>Read the note</a>
        </article>
        <section id="latest-notes" aria-labelledby="notes-heading"><h2 id="notes-heading" className="notebook-section-label">Recent notes</h2><CompactNotes notes={otherNotes} notebookJourney/></section>
      </div>
      <aside id="current-threads" aria-labelledby="threads-heading"><h2 id="threads-heading" className="notebook-section-label">Research & practice</h2><nav aria-label="Notebook programmes">{programmes.map(item => <Link key={item.id} href={item.href}>{item.title}</Link>)}</nav><Link className="notebook-archive" href="/notebook/archive">Complete archive</Link></aside>
    </div>
    <details className="notebook-follow"><summary>Follow the notebook</summary><Follow/></details>
  </main>;
}
