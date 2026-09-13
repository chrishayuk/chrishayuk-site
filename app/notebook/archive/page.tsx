import Link from "next/link";
import { CompactNotes } from "@/components/PublicationIndex";
import { notebookArchive, programmes } from "@/lib/publication-index";
import { pageMetadata } from "@/lib/metadata";

type Props = { searchParams: Promise<{ q?: string | string[]; programme?: string | string[] }> };
const first = (value?: string | string[]) => Array.isArray(value) ? value[0] : value;
export async function generateMetadata({ searchParams }: Props) {
  const query = await searchParams;
  const metadata = pageMetadata("Notebook archive", "All notebook entries. Search experiments, working notes and essays, or follow a programme.", "/notebook/archive");
  return { ...metadata, ...(query.q || query.programme ? { robots: { index: false, follow: true } } : {}) };
}
export default async function NotebookArchive({ searchParams }: Props) {
  const query = await searchParams;
  const { q, programme, entries } = notebookArchive({ q: first(query.q), programme: first(query.programme) });
  return <main id="main" className="publication-main curated-index">
    <header className="index-intro"><Link className="text-link" href="/notebook">← THE NOTEBOOK</Link><h1>All notes<span className="amber">.</span></h1><p className="dek">Experiments, working notes and essays. Newest first.</p></header>
    <form action="/notebook/archive" className="catalogue-search" role="search"><div><label className="record-voice" htmlFor="note-query">FIND A NOTE</label><input id="note-query" type="search" name="q" defaultValue={q} maxLength={300} placeholder="Title, question or experiment"/></div><div><label className="record-voice" htmlFor="note-programme">PROGRAMME</label><select id="note-programme" name="programme" defaultValue={programme}><option value="all">All programmes</option>{programmes.map(item => <option key={item.id} value={item.id}>{item.title}</option>)}</select></div><button className="record-voice" type="submit">SEARCH ↗</button>{(q || programme !== "all") && <Link href="/notebook/archive">Clear</Link>}</form>
    <section className="curated-section" aria-label="Notebook archive results"><p className="record-voice archive-count">{entries.length} {entries.length === 1 ? "NOTE" : "NOTES"}</p>{entries.length ? <CompactNotes notes={entries}/> : <p>No notes match. Try another phrase or programme.</p>}</section>
  </main>;
}
