import Link from "next/link";
import { Media } from "@/components/Media";
import { MachineMotivationCard } from "@/components/MachineMotivationCard";
import { ProgrammeDoors, CompactNotes } from "@/components/PublicationIndex";
import { FilmPlayer } from "@/components/FilmPlayer";
import { previewFor } from "@/components/YouTubeCollection";
import { latestVideo, latestMoe, videoPath, durationLabel } from "@/lib/youtube";
import { recordPath } from "@/lib/records";
import { nowNote, selectedMachineMethod, latestMachineNote, researchProgrammes, latestNotes } from "@/lib/publication-index";
import { HOUSE_WORK } from "@/lib/house";

export default function Home() {
 return <main id="main" className="homepage editorial-home curated-home">
  <section className="scene identity" data-scene="identity" aria-labelledby="proposition"><Media id="hero-identity" priority className="scene-background"/><div className="hero-overline record-voice"><span>CHRIS HAY</span><span>LONDON · 2026</span></div><div className="identity-copy"><h1 id="proposition">A house for<br/><em>ideas, systems</em><br/>and objects.</h1><p className="hero-philosophy">Exploring how intelligent systems represent knowledge, how they run, and how we can inspect and use them.</p></div><div className="scene-bottom record-voice"><span>RESEARCH · ENGINEERING · DESIGN · FILM</span><a href="#now">NOW ↓</a></div></section>
  <section id="now" className="machine-home-feature" data-scene="now" aria-labelledby="now-heading">
   {nowNote && <div className="machine-home-heading"><div><p className="kicker record-voice">MACHINES / A RESEARCH THREAD</p><h2 id="now-heading">Whose requests become<br/><em>an agent’s goals?</em></h2><p>Websites invite. Users instruct. Peers intervene. Follow the experiments that test which requests an AI agent turns into action.</p><div className="machine-home-selected"><p className="record-voice">SELECTED RESULT</p><h3><Link href={recordPath(nowNote)}>{nowNote.title}</Link></h3><p>The agent has a job. The website asks it to leave a mark that helps the operator. Two of three did. Compare that courtesy with offers that changed the answer.</p></div><div className="inline-links"><Link className="text-link" href={`${recordPath(nowNote)}#motivation-outcomes`}>COMPARE THE INVITATIONS ↗</Link><Link className="text-link" href="/thread/machines">EXPLORE THE THREAD ↗</Link></div></div><Link className="machine-home-card" href={recordPath(nowNote)} aria-label={nowNote.title}><MachineMotivationCard/></Link></div>}
   <div className="machine-home-reading">{selectedMachineMethod && <p><span className="record-voice">ALSO SELECTED / METHOD</span><Link href={recordPath(selectedMachineMethod)}>{selectedMachineMethod.title} ↗</Link></p>}{latestMachineNote && <p><span className="record-voice">LATEST IN THE THREAD</span><Link href={recordPath(latestMachineNote)}>{latestMachineNote.title} ↗</Link></p>}</div>
  </section>
  <section id="current-programmes" className="curated-section" data-scene="programmes" aria-labelledby="programmes-heading"><div className="curated-heading"><p className="kicker record-voice">FOLLOW THE WORK</p><h2 id="programmes-heading">Enter the experiments.</h2></div><ProgrammeDoors items={researchProgrammes} highlights/></section>
  <section id="latest" className="curated-section" data-scene="latest" aria-labelledby="latest-heading"><div className="curated-heading curated-heading-link"><div><p className="kicker record-voice">FROM THE NOTEBOOK</p><h2 id="latest-heading">Latest.</h2></div><Link className="text-link" href="/notebook">THE NOTEBOOK ↗</Link></div><CompactNotes notes={latestNotes.slice(0, 3)}/></section>
  <section id="systems" className="curated-section" data-scene="systems" aria-labelledby="systems-heading"><div className="curated-heading curated-heading-link"><div><p className="kicker record-voice">IDEAS MADE TO RUN</p><h2 id="systems-heading">Systems.</h2></div><Link className="text-link" href="/systems">ALL SYSTEMS ↗</Link></div><div className="curated-systems">{HOUSE_WORK.map(work => <Link href={work.path} key={work.id}><span className="record-voice">{work.field}</span><h3>{work.id === "W-MCP" ? "MCP-CLI" : work.name} ↗</h3><p>{work.text}</p></Link>)}</div></section>
  <section id="film" className="home-latest-film" data-scene="film" aria-labelledby="film-heading">
   <div className="curated-heading curated-heading-link"><div><p className="kicker record-voice">ANOTHER WAY TO THINK</p><h2 id="film-heading">Film.</h2></div><Link className="text-link" href="/film">ALL FILMS ↗</Link></div>
   <div className="home-film-pair">
    <article id="latest-youtube" aria-labelledby="latest-youtube-heading"><p className="kicker record-voice">LATEST / MY YOUTUBE CHANNEL</p><FilmPlayer video={latestVideo} preview={previewFor(latestVideo)}/><h3 id="latest-youtube-heading"><Link href={videoPath(latestVideo)}>{latestVideo.title}</Link></h3><p className="record-voice">{latestVideo.published} · {durationLabel(latestVideo.duration)}</p><Link className="text-link" href="/film/youtube">MY YOUTUBE CHANNEL ↗</Link></article>
    <article id="latest-mixture-of-experts" aria-labelledby="latest-moe-heading"><p className="kicker record-voice">LATEST APPEARANCE / MIXTURE OF EXPERTS</p><FilmPlayer video={latestMoe}/><h3 id="latest-moe-heading"><Link href={videoPath(latestMoe)}>{latestMoe.title}</Link></h3><p className="record-voice">IBM · EPISODE {latestMoe.episode} · {latestMoe.published} · {durationLabel(latestMoe.duration)}</p><p className="record-voice home-episode-meta">WITH CHRIS HAY AS A PANELIST</p><Link className="text-link" href="/film/mixture-of-experts">MIXTURE OF EXPERTS ↗</Link></article>
   </div>
  </section>
 </main>;
}
