import { MachineVisitCard } from "./MachineVisitNotebook";
import { Cell80FurtherCard } from "./Cell80FurtherNotebook";
import { cell80FurtherPart } from "@/lib/cell80-further-records";
import { Cell80Card } from "./Cell80Notebook";
import { cell80Part } from "@/lib/cell80";
import { Follow } from "./Follow";
import Link from "next/link";
import { mapThread } from "@/lib/threads";
import { records, recordPath } from "@/lib/records";
import { notebookSelection as visualNotebooks } from "@/lib/notebook-selection";
import { AddressBuildCard } from "./AddressBuildCard";
import { Media } from "./Media";
import { FilmPlayer } from "./FilmPlayer";
import { AuthorityCard } from "./AuthorityCard";
import { getVideo } from "@/lib/youtube";
import { AgentAttributionCard } from "./AgentAttributionNotebook";


export function NotebookCollection() {
  const older = records.filter(r => r.kind === "notebook" && !visualNotebooks.some(n => n.id === r.id));
  return <main id="main" className="publication-main notebook-collection">
    <header className="index-intro">
      <p className="kicker record-voice">CHRIS HAY / THE NOTEBOOK</p>
      <h1>Before<br/><em>the answer.</em></h1>
      <div className="notebook-introduction"><p className="dek">A map. A memory. A question<br/>that becomes something to make.</p><p>Films, experiments and instruments from the work. Some notes begin with something to watch; others begin with a result that did not behave as expected. Each is followed into the question it leaves behind.</p></div>
      <Link className="text-link notebook-thread-link" href={mapThread.path}>FOLLOW THE THREAD / FROM A MAP TO A MEMORY ↗</Link><Link className="text-link notebook-thread-link" href="/thread/cell80">CELL80 / A WORLD THAT CAN BE QUESTIONED ↗</Link><div className="index-count record-voice"><span>NOTES / 01—{String(visualNotebooks.length).padStart(2,"0")}</span><span>WORKING EDITION · 11 SEPTEMBER 2026</span></div>
    </header>
    <div className="notebook-stories">{visualNotebooks.map((r, i) => <article key={r.id} className={`notebook-story notebook-story-${(i % 3) + 1}`}>
      <div className="notebook-story-top record-voice"><span>{String(i+1).padStart(2,"0")} / {r.id}</span><span>{r.lineage || "FILM → QUESTION → RECORD"}</span></div>
      {r.id === "N-MACHINE-VISIT" ? <MachineVisitCard/> : cell80FurtherPart(r.id) ? <Cell80FurtherCard part={cell80FurtherPart(r.id)}/> : cell80Part(r.id) ? <Cell80Card part={cell80Part(r.id)}/> : r.id === "N-ATTRIBUTION" ? <AgentAttributionCard/>
        : r.id === "N-ADDRESS-BUILD" ? <AddressBuildCard/>
        : r.id === "N-AUTHORITY" ? <AuthorityCard/>
        : r.body[0].kind === "film" && "youtubeId" in r.body[0]
          ? <FilmPlayer video={getVideo(r.body[0].youtubeId)!} start={r.body[0].start} priority={i===0}/>
          : <Media id={r.media[0]} priority={i===0}/>}
      <div className="notebook-story-caption"><Link href={recordPath(r)}><h2>{r.title}</h2><span className="text-link">OPEN THE NOTE ↗</span></Link><div><p>{r.dek}</p><span className="record-voice">{r.status} / DRAFT · V{r.version}</span></div></div>
    </article>)}</div>
    <section className="notebook-earlier"><p className="kicker record-voice">EARLIER QUESTIONS</p><div className="record-list">{older.map(r => <Link key={r.id} href={recordPath(r)}><span className="record-voice">{r.id}<br/>{r.created}</span><div><h2>{r.title}</h2><p>{r.dek}</p></div><span>↗</span></Link>)}</div></section>
    <Follow/>
    <div className="notebook-closing"><p>One question<br/><em>leads to another.</em></p><div className="inline-links"><Link className="text-link" href="/research">THE RESEARCH ↗</Link><Link className="text-link" href="/ask">ASK THE WORK ↗</Link></div></div>
  </main>;
}
