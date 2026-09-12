import { MachineHomeFeature } from "@/components/MachineProgramme";
import { EcologyCard } from "@/components/EcologyCard";
import Link from "next/link";
import { Cell80HomePreview } from "@/components/Cell80HomePreview";
import { Cell80Card } from "@/components/Cell80Notebook";
import { cell80Part } from "@/lib/cell80";
import { AddressBuildCard } from "@/components/AddressBuildCard";
import { AgentAttributionCard } from "@/components/AgentAttributionNotebook";
import { featuredNotebook } from "@/lib/notebook-selection";
import { mapThread, cell80Thread, resolveThreadStep } from "@/lib/threads";
import { Media } from "@/components/Media";
import { FilmPlayer } from "@/components/FilmPlayer";
import { previewFor } from "@/components/YouTubeCollection";
import { latestVideo, latestMoe, featuredVideo, popularMoe, videoPath, durationLabel } from "@/lib/youtube";
import { getRecord, recordPath } from "@/lib/records";
import { getMedia } from "@/lib/media";
import { WorkSelection } from "@/components/WorkSelection";

const Kicker = ({ children }: { children: React.ReactNode }) => <p className="kicker record-voice">{children}</p>;
const TextLink = ({ href, children }: { href: string; children: React.ReactNode }) => <Link className="text-link" href={href}>{children}<span aria-hidden="true">↗</span></Link>;

export default function Home() {
 const notebook = featuredNotebook;
 const notebookPath = recordPath(notebook);
 const selectedFilms = [featuredVideo, popularMoe];
 const notes = [getRecord("N-ADDRESS-BUILD")!, getRecord("N-MAP")!];
 const notebookMap = getMedia("notebook-map")!;
 const ecologySteps = cell80Thread.steps.map(resolveThreadStep);
 const furtherEcologyNotes = ecologySteps.slice(1).map(step=>({id:step.id,title:step.title,url:step.url}));
 return <main id="main" className="homepage editorial-home">
  <section className="scene identity" data-scene="identity" aria-labelledby="proposition"><Media id="hero-identity" priority className="scene-background"/><div className="hero-overline record-voice"><span>CHRIS HAY</span><span>LONDON · 2026</span></div><div className="identity-copy"><h1 id="proposition">A house for<br/><em>ideas, systems</em><br/>and objects.</h1><p className="hero-philosophy">Exploring how intelligent systems represent knowledge, how they run, and how we can inspect and use them.</p></div><div className="scene-bottom record-voice"><span>RESEARCH · ENGINEERING · DESIGN · FILM</span><a href="#latest-youtube">THE LATEST ↓</a></div></section>

  <section id="latest-youtube" className="home-latest-film" data-scene="latest-youtube" aria-labelledby="latest-youtube-heading">
   <div className="home-section-label"><Kicker>LATEST / YOUTUBE</Kicker><span className="record-voice">{latestVideo.published} · {durationLabel(latestVideo.duration)}</span></div>
   <FilmPlayer video={latestVideo} preview={previewFor(latestVideo)}/>
   <div className="home-film-caption"><h2 id="latest-youtube-heading"><Link href={videoPath(latestVideo)}>{latestVideo.title}</Link></h2><div><p className="record-voice">A FILM BY CHRIS HAY</p><TextLink href="/film/youtube">THE YOUTUBE CHANNEL</TextLink></div></div>
  </section>

  <section id="latest-mixture-of-experts" className="home-latest-moe dark-scene" data-scene="latest-moe" aria-labelledby="latest-moe-heading">
   <div className="home-moe-introduction"><Kicker>LATEST APPEARANCE / IBM</Kicker><h2 id="latest-moe-heading">Mixture<br/>{" "}<em>of Experts.</em></h2><p className="record-voice">WITH CHRIS HAY AS A PANELIST</p><TextLink href="/film/mixture-of-experts">THE COLLECTION</TextLink></div>
   <div className="home-moe-film"><p className="record-voice home-episode-meta">EPISODE {latestMoe.episode} · {latestMoe.published} · {durationLabel(latestMoe.duration)}</p><FilmPlayer video={latestMoe}/><h3><Link href={videoPath(latestMoe)}>{latestMoe.title}</Link></h3></div>
  </section>

  <MachineHomeFeature/>

  <section id="agent-ecology" className="home-ecology-feature" aria-labelledby="ecology-home-heading" data-hause-act="connection"><div><Kicker>NEW THREAD / AGENT ECOLOGY · THREE WORKING NOTES</Kicker><h2 id="ecology-home-heading">What keeps<br/><em>an action alive?</em></h2><p>A message board. A failed handoff. A record that keeps eliciting posts after own-action history is cleared.</p><div className="inline-links"><TextLink href="/thread/agent-ecology">FOLLOW THE THREE NOTES</TextLink><TextLink href="/notebook/the-world-can-remember-for-the-agent#ecology-memory">REPLAY THE MEMORY COMPARISON</TextLink></div></div><Link href="/notebook/the-world-can-remember-for-the-agent" aria-label="Read The world can remember for the agent"><EcologyCard id="N-ECOLOGY-MEMORY"/></Link></section>

  <section id="from-the-notebook" className="notebook-scene notebook-feature" data-scene="latest-notebook" data-hause-act="connection" aria-labelledby="notebook-feature-heading">
   <div className="notebook-feature-visual">{notebook.id === "N-CELL80-01" ? <Cell80HomePreview href={notebookPath}/> : cell80Part(notebook.id) ? <Cell80Card part={cell80Part(notebook.id)}/> : notebook.id === "N-EXHIBITION" ? <Media id="notebook-exhibition"/> : notebook.id === "N-ATTRIBUTION" ? <AgentAttributionCard/> : notebook.id === "N-ADDRESS-BUILD" ? <AddressBuildCard/> : <Media id="notebook-map-trajectory"/>}<p className="record-voice">{cell80Part(notebook.id) ? "CELL80 / TWO RECORDED WORLDS · OPEN THE NOTE TO PLAY" : notebook.id === "N-EXHIBITION" ? "FROM THE EXHIBITION / THE SPACE AROUND AN IDEA" : notebook.id === "N-ATTRIBUTION" ? "FROM THE REPOSITORY / ONE REQUIRED AUTHORITY GATE" : notebook.id === "N-ADDRESS-BUILD" ? "FROM THE EXPERIMENT / TWO INSTRUMENTS, ONE DEPTH TRANSITION" : "FROM THE FILM / A QUESTION MOVES THROUGH THE MODEL"}</p></div>
   <div className="notebook-copy"><Kicker>{cell80Part(notebook.id)?"START HERE / CELL80 NOTEBOOK":"LATEST / NOTEBOOK"}</Kicker><div className="note-meta record-voice"><span>{notebook.id}</span><span>WORKING NOTE · {notebook.status}</span></div><h2 id="notebook-feature-heading"><Link href={notebookPath}>{notebook.title}</Link></h2><p className="notebook-feature-dek">{cell80Part(notebook.id) ? "I built a small world where organisms eat, move, reproduce and inherit executable code. Rewind one birth, undo one change, and watch two histories diverge." : notebook.dek}</p><div className="inline-links"><TextLink href={cell80Part(notebook.id) ? `${notebookPath}#cell80-study` : notebookPath}>{cell80Part(notebook.id) ? "WATCH THE REPLAY" : "EXPLORE THE NOTE"}</TextLink><TextLink href={cell80Part(notebook.id) ? "/thread/cell80" : notebook.id === "N-EXHIBITION" ? "/work/hause" : mapThread.path}>{cell80Part(notebook.id) ? "ALL SIX NOTES" : notebook.id === "N-EXHIBITION" ? "EXPLORE HAUSE" : "FOLLOW THE THREAD"}</TextLink></div><p className="record-voice notebook-footnote">{notebook.lineage}</p></div>
   {cell80Part(notebook.id) > 0 && <nav className="cell80-home-sequence" aria-label="Continue through the six Cell80 Notebook entries">
    <div className="cell80-home-sequence-heading"><Kicker>CONTINUE / CELL80</Kicker><TextLink href="/thread/cell80">EXPLORE ALL SIX NOTES</TextLink></div>
    <ol start={2}>{furtherEcologyNotes.map((note,i)=><li key={note.id}><Link href={note.url}><span className="record-voice">0{i+2}</span><h3>{note.title}</h3><span aria-hidden="true">↗</span></Link></li>)}</ol>
   </nav>}
  </section>

  <section id="selected-films" className="home-selected-films" data-scene="selected-films" aria-labelledby="selected-films-heading">
   <div className="home-collection-heading"><div><Kicker>FROM THE ARCHIVE</Kicker><h2 id="selected-films-heading">Selected films.</h2></div><TextLink href="/film">ALL FILMS</TextLink></div>
   <div className="home-film-pair">{selectedFilms.map((video,i)=><article key={video.id}>
    <p className="record-voice home-selection-label">{i===0?"LARQL / THE MODEL AS A DATABASE":"IBM / A CONVERSATION TO RETURN TO"}</p>
    <FilmPlayer video={video} preview={previewFor(video)}/>
    <h3><Link href={videoPath(video)}>{video.title}</Link></h3>
    <p className="record-voice">{video.published} · {durationLabel(video.duration)}</p>
   </article>)}</div>
  </section>

  <section id="further-notes" className="home-further-notes" data-scene="further-notes" aria-labelledby="further-notes-heading">
   <div className="home-collection-heading"><div><Kicker>FROM THE NOTEBOOK</Kicker><h2 id="further-notes-heading">Further questions.</h2></div><TextLink href="/notebook">ALL NOTES</TextLink></div>
   <div className="home-note-pair">{notes.map(record=><article key={record.id}>
    <Link className="home-note-image" href={recordPath(record)} aria-label={`Read ${record.title}`}>{cell80Part(record.id)?<Cell80Card part={cell80Part(record.id)} compact/>:record.id==="N-ADDRESS-BUILD"?<AddressBuildCard compact/>:<img src={notebookMap.poster || notebookMap.desktop} alt={notebookMap.alt} loading="lazy" width={1600} height={900}/>}<span className="record-voice">OPEN THE NOTE ↗</span></Link>
    <p className="record-voice home-note-identity">{record.id} · WORKING NOTE · {record.status}</p>
    <h3><Link href={recordPath(record)}>{record.title}</Link></h3><p className="home-note-dek">{record.dek}</p>
   </article>)}</div>
  </section>
  <WorkSelection/>
 </main>;
}
