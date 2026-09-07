import Link from "next/link";
import { AddressBuildCard } from "@/components/AddressBuildCard";
import { latestNotebook } from "@/lib/notebook-selection";
import { mapThread } from "@/lib/threads";
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
 const notebook = latestNotebook;
 const notebookPath = recordPath(notebook);
 const selectedFilms = [featuredVideo, popularMoe];
 const notes = [
  {record:getRecord("N-MAP")!, media:getMedia("notebook-map")!},
  {record:getRecord("N-ADDRESS")!, media:getMedia("notebook-address")!},
 ];
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

  <section id="from-the-notebook" className="notebook-scene notebook-feature" data-scene="latest-notebook" data-hause-act="connection" aria-labelledby="notebook-feature-heading">
   <div className="notebook-feature-visual">{notebook.id === "N-ADDRESS-BUILD" ? <AddressBuildCard/> : <Media id="notebook-map-trajectory"/>}<p className="record-voice">{notebook.id === "N-ADDRESS-BUILD" ? "FROM THE EXPERIMENT / TWO INSTRUMENTS, ONE DEPTH TRANSITION" : "FROM THE FILM / A QUESTION MOVES THROUGH THE MODEL"}</p></div>
   <div className="notebook-copy"><Kicker>LATEST / NOTEBOOK</Kicker><div className="note-meta record-voice"><span>{notebook.id}</span><span>WORKING NOTE · {notebook.status}</span></div><h2 id="notebook-feature-heading"><Link href={notebookPath}>{notebook.title}</Link></h2><p className="notebook-feature-dek">{notebook.dek}</p><div className="inline-links"><TextLink href={notebookPath}>EXPLORE THE NOTE</TextLink><TextLink href={mapThread.path}>FOLLOW THE THREAD</TextLink></div><p className="record-voice notebook-footnote">{notebook.lineage}</p></div>
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
   <div className="home-note-pair">{notes.map(({record,media})=><article key={record.id}>
    <Link className="home-note-image" href={recordPath(record)} aria-label={`Read ${record.title}`}><img src={media.poster || media.desktop} alt={media.alt} loading="lazy" width={1600} height={900}/><span className="record-voice">OPEN THE NOTE ↗</span></Link>
    <p className="record-voice home-note-identity">{record.id} · WORKING NOTE · {record.status}</p>
    <h3><Link href={recordPath(record)}>{record.title}</Link></h3><p className="home-note-dek">{record.dek}</p>
   </article>)}</div>
  </section>
  <WorkSelection/>
 </main>;
}
