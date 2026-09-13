import Link from "next/link";
import { recordPath } from "@/lib/records";
import { noteDate, shortDate, programmeFor, programmeNotes, programmeHighlight, programmeInvitations, type Programme } from "@/lib/publication-index";
import type { PublicationRecord } from "@/lib/types";
import { MachineMotivationCard } from "./MachineMotivationCard";
import { EcologyCard } from "./EcologyCard";
import { Cell80BoundCard } from "./Cell80BoundNotebook";
import { AddressBuildCard } from "./AddressBuildCard";

export function HomeProgrammes() {
  return <div className="home-programme-doors">
    <article><Link href="/thread/machines"><h3>Machines<span aria-hidden="true"> ↗</span></h3><p className="home-programme-question">What can an agent discover, trust and leave behind?</p></Link><p className="home-programme-detail">Agents in the open web. Invitations, authority, memory and cooperation.</p><p className="home-ecology-link"><Link href="/thread/agent-ecology">Agent Ecology</Link><Link href="/notebook/the-stronger-agent-left-something-behind#inheritance-replay">The stronger agent left something behind. ↗</Link></p></article>
    <article><Link href="/thread/cell80"><h3>Cell80<span aria-hidden="true"> ↗</span></h3><p className="home-programme-question">Executable computation as an object.</p></Link><p className="home-programme-detail">Tiny deterministic programs: searched by behaviour, verified across execution bodies, used by agents—and inherited in experimental worlds.</p><dl className="home-cell80-paths"><div><dt>Tools</dt><dd>Verified executable cells</dd></div><div><dt>Models</dt><dd>Retrieval by execution</dd></div><div><dt>Life</dt><dd>Evolution you can replay, fork and diff</dd></div></dl></article>
    <article><Link href="/thread/the-map"><h3>Learned systems<span aria-hidden="true"> ↗</span></h3><p className="home-programme-question">How does a model construct and retrieve what it knows?</p></Link><p className="home-programme-detail">Representation, memory and execution. The questions behind LARQL and VINDEX3.</p></article>
  </div>;
}

export function SelectedExperiments({ items }: { items: Programme[] }) {
  return <div className="home-selected-results">{items.map(programme => {
    const note = programmeHighlight(programme);
    if (!note) return null;
    const invitation = programmeInvitations[programme.id];
    return <article className="home-selected-result" key={programme.id} data-selected-experiment={note.id}>
      <Link className="programme-result-visual" href={`${recordPath(note)}#${invitation.anchor}`} aria-label={`Explore ${note.title}`}><SelectedResultVisual id={note.id}/></Link>
      <h3><Link href={recordPath(note)}>{note.title}</Link></h3>
      {note.publication !== "published" && <p className="record-voice programme-draft">Working draft</p>}
      <p className="programme-invitation">{invitation.text}</p>
      <Link className="text-link" href={`${recordPath(note)}#${invitation.anchor}`}>{invitation.label} ↗</Link>
    </article>;
  })}</div>;
}

function SelectedResultVisual({ id }: { id: string }) {
  if (id === "N-MACHINE-MOTIVATION") return <MachineMotivationCard exhibition/>;
  if (id === "N-ECOLOGY-INHERITANCE") return <EcologyCard id={id}/>;
  if (id === "N-CELL80-BOUND") return <Cell80BoundCard exhibition/>;
  if (id === "N-ADDRESS-BUILD") return <AddressBuildCard compact/>;
  return null;
}

export function ProgrammeDoors({ items, notebook = false, highlights = false }: { items: Programme[]; notebook?: boolean; highlights?: boolean }) {
  if (notebook) return <ul className="notebook-thread-list">{items.map(programme => <li key={programme.id}><Link href={programme.href}><span>{programme.title}</span><span>{programmeNotes(programme).length} {programme.id === "practice" ? "essays" : "notes"} ↗</span></Link></li>)}</ul>;
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
          {!highlights && <span className="record-voice programme-count">{primaryNotes.length} {programme.id === "practice" ? "essays" : "connected notes"}{latest && <> · latest {shortDate(noteDate(latest))}</>}</span>}
        </Link>
        {highlight && <div className="programme-highlight"><Link className="programme-result-visual" href={`${recordPath(highlight)}#${invitation.anchor}`} aria-label={`Explore ${highlight.title}`}><SelectedResultVisual id={highlight.id}/></Link><h4><Link href={recordPath(highlight)}>{highlight.title} ↗</Link></h4>{highlight.publication !== "published" && <p className="record-voice programme-draft">Working draft</p>}<p className="programme-invitation">{invitation.text}</p><Link className="text-link" href={`${recordPath(highlight)}#${invitation.anchor}`}>{invitation.label} ↗</Link></div>}
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
