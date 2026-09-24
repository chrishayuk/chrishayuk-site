import { RecoveryCard } from "./RecoveryNotebook";
import Link from "next/link";
import { Fragment } from "react";
import { recordPath } from "@/lib/records";
import { noteDate, shortDate, programmeFor, programmeNotes, programmeHighlight, programmeInvitations, researchProgrammes, type Programme } from "@/lib/publication-index";
import type { PublicationRecord } from "@/lib/types";
import { MachineMotivationCard } from "./MachineMotivationCard";
import { EcologyCard } from "./EcologyCard";
import { Cell80BoundCard } from "./Cell80BoundNotebook";
import { AddressBuildCard } from "./AddressBuildCard";

export function HomeProgrammes() {
  return <div className="home-programme-doors">
    {researchProgrammes.map(programme => <article key={programme.id} data-home-programme={programme.id}>
      <Link href={programme.href}><h3>{programme.title}<span aria-hidden="true"> ↗</span></h3><p className="home-programme-question">{programme.question}</p></Link>
      <p className="home-programme-detail">{programme.description}</p>
      {programme.id === "agent-ecology" && <div className="home-ecology-link"><Link href="/notebook/the-repairer-left-the-mechanism-kept-working">The repairer left. The mechanism kept working. ↗</Link><Link href="/notebook/the-ai-left-its-knowledge-didnt#handoff">The AI left. Its knowledge didn’t. ↗</Link><Link href="/notebook/the-page-couldnt-authorise-the-peer-said-go">The Hugging Face incident comparison ↗</Link></div>}
    </article>)}
  </div>;
}

export function SelectedExperiments({ items, withGalleryPause = false }: { items: Programme[]; withGalleryPause?: boolean }) {
  return <div className="home-selected-results">{items.map(programme => {
    const note = programmeHighlight(programme);
    if (!note) return null;
    const invitation = programmeInvitations[programme.id];
    return <Fragment key={programme.id}><article className="home-selected-result" data-selected-experiment={note.id}>
      <Link className="programme-result-visual" href={`${recordPath(note)}#${invitation.anchor}`} aria-label={`Explore ${note.title}`}><SelectedResultVisual id={note.id}/></Link>
      <h3><Link href={recordPath(note)}>{note.title}</Link></h3>
      {note.publication !== "published" && <p className="record-voice programme-draft">Working draft</p>}
      <p className="programme-invitation">{invitation.text}</p>
      <Link className="text-link" href={`${recordPath(note)}#${invitation.anchor}`}>{invitation.label} ↗</Link>
    </article>{withGalleryPause && programme.id === "agent-ecology" && <div className="home-gallery-pause">
      <p className="record-voice">CELL80 / LEARNED SYSTEMS</p>
      <span className="record-voice" aria-hidden="true">03</span>
    </div>}</Fragment>;
  })}</div>;
}

function SelectedResultVisual({ id }: { id: string }) {
  if (id === "N-ECOLOGY-RECOVERY") return <RecoveryCard/>;
  if (id === "N-ECOLOGY-WORLD-REMEMBERS") return <EcologyCard id={id}/>;
  if (id === "N-MACHINE-MOTIVATION") return <MachineMotivationCard exhibition/>;
  if (id === "N-ECOLOGY-INHERITANCE") return <EcologyCard id={id}/>;
  if (id === "N-CELL80-BOUND") return <Cell80BoundCard exhibition/>;
  if (id === "N-ADDRESS-BUILD") return <AddressBuildCard compact/>;
  return null;
}

export function ProgrammeDoors({ items, notebook = false, highlights = false }: { items: Programme[]; notebook?: boolean; highlights?: boolean }) {
  if (notebook) {
    return <ProgrammeDoors items={items} highlights/>;
  }
  return <div className={`programme-doors${notebook ? " programme-doors-notebook" : ""}`}>
    {items.map((programme, index) => {
      const notes = programmeNotes(programme);
      const latest = notes[0];
      const highlight = highlights ? programmeHighlight(programme) : undefined;
      const invitation = programmeInvitations[programme.id];
      return <article key={programme.id} className={`programme-door programme-door-${programme.id}`}>
        <Link className="programme-entrance" href={programme.href}>
          <span className="record-voice programme-number">0{index + 1}<span aria-hidden="true">↗</span></span>
          <h3>{programme.title}</h3><p className="programme-question">{notebook ? programme.description : programme.question}</p>
          {!highlights && <span className="record-voice programme-count">{notes.length} {programme.id === "practice" ? "essays" : "notes"}{latest && <> · latest {shortDate(noteDate(latest))}</>}</span>}
        </Link>
        {highlight && <div className="programme-highlight"><Link className="programme-result-visual" href={`${recordPath(highlight)}#${invitation.anchor}`} aria-label={`Explore ${highlight.title}`}><SelectedResultVisual id={highlight.id}/></Link><h4><Link href={recordPath(highlight)}>{highlight.title} ↗</Link></h4>{highlight.publication !== "published" && <p className="record-voice programme-draft">Working draft</p>}<p className="programme-invitation">{invitation.text}</p><Link className="text-link" href={`${recordPath(highlight)}#${invitation.anchor}`}>{invitation.label} ↗</Link></div>}
        {notebook && latest && <p className="programme-latest"><span className="record-voice">LATEST IN THE THREAD</span><Link href={recordPath(latest)}>{latest.title} ↗</Link></p>}
      </article>;
    })}
  </div>;
}

export function CompactNotes({ notes, notebookJourney = false }: { notes: PublicationRecord[]; notebookJourney?: boolean }) {
  return <ol className="compact-notes">{notes.map(record => <li key={record.id}>
    <div className="compact-note-date record-voice"><time dateTime={noteDate(record)}>{shortDate(noteDate(record))}</time><span>{record.publication === "published" ? "Published" : "Working draft"}</span></div>
    <div className="compact-note-copy"><p className="record-voice">{programmeFor(record)?.title || "Notebook"}</p><h3 className={notebookJourney ? "notebook-journey-title" : undefined} data-notebook-destination={notebookJourney ? recordPath(record) : undefined} style={notebookJourney ? {viewTransitionName: `notebook-${record.id.toLowerCase()}`} : undefined}>{notebookJourney ? <a href={recordPath(record)}>{record.title}</a> : <Link href={recordPath(record)}>{record.title}<span aria-hidden="true"> ↗</span></Link>}</h3><p>{record.dek}</p></div>
  </li>)}</ol>;
}
