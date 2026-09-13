import Link from "next/link";
import { Follow } from "./Follow";
import { ProgrammeDoors, CompactNotes } from "./PublicationIndex";
import { programmes, latestNotes, notebookNotes } from "@/lib/publication-index";

export function NotebookCollection() {
  return <main id="main" className="publication-main curated-index">
    <header className="index-intro"><p className="kicker record-voice">CHRIS HAY / THE NOTEBOOK</p><h1>The Notebook<span className="amber">.</span></h1><p className="dek">Experiments, working notes and essays from the work.</p><nav className="inline-links" aria-label="Notebook sections"><a className="text-link" href="#current-threads">CURRENT THREADS ↓</a><a className="text-link" href="#latest-notes">LATEST NOTES ↓</a><Link className="text-link" href="/notebook/archive">ALL {notebookNotes.length} NOTES ↗</Link></nav></header>
    <section id="current-threads" className="curated-section" aria-labelledby="threads-heading"><div className="curated-heading"><p className="kicker record-voice">FOLLOW A QUESTION</p><h2 id="threads-heading">Current threads.</h2></div><ProgrammeDoors items={programmes} notebook/></section>
    <section id="latest-notes" className="curated-section" aria-labelledby="notes-heading"><div className="curated-heading"><p className="kicker record-voice">FROM THE NOTEBOOK</p><h2 id="notes-heading">Latest notes.</h2><p>Newest first. Drafts retain their working status.</p></div><CompactNotes notes={latestNotes}/><Link className="text-link archive-entrance" href="/notebook/archive">ALL NOTES / EXPLORE THE ARCHIVE ↗</Link></section>
    <Follow/>
  </main>;
}
