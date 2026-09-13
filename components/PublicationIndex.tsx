import Link from "next/link";
import { recordPath } from "@/lib/records";
import { noteDate, shortDate, programmeFor, programmeNotes, type Programme } from "@/lib/publication-index";
import type { PublicationRecord } from "@/lib/types";

export function ProgrammeDoors({ items, notebook = false }: { items: Programme[]; notebook?: boolean }) {
  return <div className={`programme-doors${notebook ? " programme-doors-notebook" : ""}`}>
    {items.map((programme, index) => {
      const notes = programmeNotes(programme);
      const primaryIds = new Set(programme.threads[0]?.steps.map(step => step.id));
      const primaryNotes = programme.threads.length ? notes.filter(note => primaryIds.has(note.id)) : notes;
      const latest = primaryNotes[0];
      return <article key={programme.id} className={`programme-door programme-door-${programme.id}`}>
        <Link className="programme-entrance" href={programme.href}>
          <span className="record-voice programme-number">0{index + 1}<span aria-hidden="true">↗</span></span>
          <h3>{programme.title}</h3><p className="programme-question">{notebook ? programme.description : programme.question}</p>
          <span className="record-voice programme-count">{primaryNotes.length} {programme.id === "practice" ? "essays" : "connected notes"}{latest && <> · latest {shortDate(noteDate(latest))}</>}</span>
        </Link>
        {notebook && latest && <p className="programme-latest"><span className="record-voice">LATEST IN THE THREAD</span><Link href={recordPath(latest)}>{latest.title} ↗</Link></p>}
        {programme.continuation && <Link className="programme-continuation" href={programme.continuation.href}><span className="record-voice">CONNECTED THREAD / {programme.continuation.title}</span><span>{programme.continuation.text} ↗</span></Link>}
      </article>;
    })}
  </div>;
}

export function CompactNotes({ notes }: { notes: PublicationRecord[] }) {
  return <ol className="compact-notes">{notes.map(record => <li key={record.id}>
    <div className="compact-note-date record-voice"><time dateTime={noteDate(record)}>{shortDate(noteDate(record))}</time><span>{record.publication === "published" ? "Published" : "Working draft"}</span></div>
    <div className="compact-note-copy"><p className="record-voice">{programmeFor(record)?.title || "Notebook"}</p><h3><Link href={recordPath(record)}>{record.title}<span aria-hidden="true"> ↗</span></Link></h3><p>{record.dek}</p></div>
  </li>)}</ol>;
}
