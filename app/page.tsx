import Link from "next/link";
import { Media } from "@/components/Media";
import { MachineDiscoveryCard } from "@/components/MachineDiscoveryCard";
import { ProgrammeDoors, CompactNotes } from "@/components/PublicationIndex";
import { FilmPlayer } from "@/components/FilmPlayer";
import { previewFor } from "@/components/YouTubeCollection";
import { latestVideo, videoPath, durationLabel } from "@/lib/youtube";
import { recordPath } from "@/lib/records";
import { nowNote, researchProgrammes, latestNotes } from "@/lib/publication-index";
import { HOUSE_WORK } from "@/lib/house";

export default function Home() {
 return <main id="main" className="homepage editorial-home curated-home">
  <section className="scene identity" data-scene="identity" aria-labelledby="proposition"><Media id="hero-identity" priority className="scene-background"/><div className="hero-overline record-voice"><span>CHRIS HAY</span><span>LONDON · 2026</span></div><div className="identity-copy"><h1 id="proposition">A house for<br/><em>ideas, systems</em><br/>and objects.</h1><p className="hero-philosophy">Exploring how intelligent systems represent knowledge, how they run, and how we can inspect and use them.</p></div><div className="scene-bottom record-voice"><span>RESEARCH · ENGINEERING · DESIGN · FILM</span><a href="#now">NOW ↓</a></div></section>
  <section id="now" className="machine-home-feature" data-scene="now" aria-labelledby="now-heading">
   {nowNote && <div className="machine-home-heading"><div><p className="kicker record-voice">NOW / MACHINE DISCOVERY</p><h2 id="now-heading">A working tool stayed outside<br/><em>the agent’s world.</em></h2><p>Nine AI agents. Six searched without the address. None found LLM Wilds. Three given its domain used it correctly.</p><p>The target was absent from their returned search results. One target, one model and a short live-web window—not a general discovery rate.</p><div className="inline-links"><Link className="text-link" href={recordPath(nowNote)}>READ THE RESULT ↗</Link><Link className="text-link" href="/thread/machines">FOLLOW THE QUESTION ↗</Link></div></div><Link className="machine-home-card" href={recordPath(nowNote)} aria-label={nowNote.title}><MachineDiscoveryCard/></Link></div>}
  </section>
  <section id="current-programmes" className="curated-section" data-scene="programmes" aria-labelledby="programmes-heading"><div className="curated-heading"><p className="kicker record-voice">THREE WAYS INTO THE WORK</p><h2 id="programmes-heading">Current programmes.</h2></div><ProgrammeDoors items={researchProgrammes}/></section>
  <section id="latest" className="curated-section" data-scene="latest" aria-labelledby="latest-heading"><div className="curated-heading curated-heading-link"><div><p className="kicker record-voice">FROM THE NOTEBOOK</p><h2 id="latest-heading">Latest.</h2></div><Link className="text-link" href="/notebook">THE NOTEBOOK ↗</Link></div><CompactNotes notes={latestNotes.slice(0, 3)}/></section>
  <section id="systems" className="curated-section" data-scene="systems" aria-labelledby="systems-heading"><div className="curated-heading curated-heading-link"><div><p className="kicker record-voice">IDEAS MADE TO RUN</p><h2 id="systems-heading">Systems.</h2></div><Link className="text-link" href="/systems">ALL SYSTEMS ↗</Link></div><div className="curated-systems">{HOUSE_WORK.map(work => <Link href={work.path} key={work.id}><span className="record-voice">{work.field}</span><h3>{work.id === "W-MCP" ? "MCP-CLI" : work.name} ↗</h3><p>{work.text}</p></Link>)}</div></section>
  <section id="latest-youtube" className="home-latest-film" data-scene="film" aria-labelledby="film-heading"><div className="curated-heading curated-heading-link"><div><p className="kicker record-voice">ANOTHER WAY TO THINK</p><h2 id="film-heading">Film.</h2></div><Link className="text-link" href="/film">ALL FILMS ↗</Link></div><div className="home-section-label"><p className="record-voice">LATEST / YOUTUBE</p><span className="record-voice">{latestVideo.published} · {durationLabel(latestVideo.duration)}</span></div><FilmPlayer video={latestVideo} preview={previewFor(latestVideo)}/><div className="home-film-caption"><h3><Link href={videoPath(latestVideo)}>{latestVideo.title}</Link></h3><div className="inline-links"><Link className="text-link" href="/film/youtube">YOUTUBE ↗</Link><Link className="text-link" href="/film/mixture-of-experts">IBM / MIXTURE OF EXPERTS ↗</Link></div></div></section>
 </main>;
}
