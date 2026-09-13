import Link from "next/link";
import { recordPath } from "@/lib/records";
import { noteDate, shortDate, programmeFor, programmeNotes, programmeHighlight, programmeInvitations, type Programme } from "@/lib/publication-index";
import type { PublicationRecord } from "@/lib/types";
import { MachineMotivationCard } from "./MachineMotivationCard";
import { EcologyCard } from "./EcologyCard";
import { Cell80BoundCard } from "./Cell80BoundNotebook";
import { AddressBuildCard } from "./AddressBuildCard";

function SelectedResultVisual({ id }: { id: string }) {
  if (id === "N-MACHINE-MOTIVATION") return <MachineMotivationCard/>;
  if (id === "N-ECOLOGY-INHERITANCE") return <EcologyCard id={id}/>;
  if (id === "N-CELL80-BOUND") return <Cell80BoundCard/>;
  if (id === "N-ADDRESS-BUILD") return <AddressBuildCard compact/>;
  return null;
}

export function ProgrammeDoors({ items, notebook = false, highlights = false }: { items: Programme[]; notebook?: boolean; highlights?: boolean }) {
  return <div className={`programme-doors${notebook ? " programme-doors-notebook" : ""}`}>
    {items.map((programme, index) => {
      const notes = programmeNotes(programme);
      const primaryIds = new Set(programme.threads[0]?.steps.map(step => step.id));
      const primaryNotes = programme.threads.length ? notes.filter(note => primaryIds.has(note.id)) : notes;
      const latest = primaryNotes[0];
      const highlight = highlights ? programmeHighlight(programme) : undefined;
      const invitation = programmeInvitations[programme.id];
      return <article key={programme.id} className={`programme-door programme-door-${programme.id}`}>
        <Link className="programme-entrance" href={programme.href}>
          <span className="record-voice programme-number">0{index + 1}<span aria-hidden="true">↗</span></span>
          <h3>{programme.title}</h3><p className="programme-question">{notebook ? programme.description : programme.question}</p>
          <span className="record-voice programme-count">{primaryNotes.length} {programme.id === "practice" ? "essays" : "connected notes"}{!highlights && latest && <> · latest {shortDate(noteDate(latest))}</>}</span>
        </Link>
        {highlight && <div className="programme-highlight"><p className="record-voice">START WITH THIS EXPERIMENT / {highlight.publication === "published" ? "PUBLISHED" : "WORKING DRAFT"}</p><Link className="programme-result-visual" href={`${recordPath(highlight)}#${invitation.anchor}`} aria-label={`Explore ${highlight.title}`}><SelectedResultVisual id={highlight.id}/></Link><h4><Link href={recordPath(highlight)}>{highlight.title} ↗</Link></h4><p className="programme-invitation">{invitation.text}</p><Link className="text-link" href={`${recordPath(highlight)}#${invitation.anchor}`}>{invitation.label} ↗</Link></div>}
        {notebook && latest && <p className="programme-latest"><span className="record-voice">LATEST IN THE THREAD</span><Link href={recordPath(latest)}>{latest.title} ↗</Link></p>}
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
