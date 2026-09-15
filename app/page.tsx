import Link from "next/link";
import { VisualStudy } from "@/components/VisualStudy";
import { Media } from "@/components/Media";
import { HomeProgrammes, SelectedExperiments, CompactNotes } from "@/components/PublicationIndex";
import { FilmPlayer } from "@/components/FilmPlayer";
import { previewFor } from "@/components/YouTubeCollection";
import { latestVideo, latestMoe, videoPath, durationLabel } from "@/lib/youtube";
import { homeResultProgrammes, latestNotes } from "@/lib/publication-index";
import { HOUSE_WORK } from "@/lib/house";

const systems = [
 { name: "Cell80", path: "/thread/cell80" },
 ...HOUSE_WORK.filter(work => work.id !== "W-MCP"),
];

export default function Home() {
 return <main id="main" className="homepage editorial-home curated-home">
  <section className="scene identity" data-scene="identity" aria-labelledby="proposition">
   <Media id="hero-identity" priority className="scene-background"/>
   <div className="hero-overline record-voice"><span>CHRIS HAY</span><span>LONDON · 2026</span></div>
   <div className="identity-copy"><h1 id="proposition">A house for<br/><em>ideas, systems</em><br/>and objects.</h1><p className="hero-philosophy">Building things to find out how they work.</p></div>
   <div className="scene-bottom record-voice"><span>RESEARCH · ENGINEERING · DESIGN · FILM</span><a href="#current-programmes">EXPLORE THE HOUSE ↓</a></div>
  </section>
  <section id="current-programmes" className="curated-section home-programmes" data-scene="programmes" aria-labelledby="programmes-heading">
   <h2 id="programmes-heading" className="home-quiet-heading">Current programmes.</h2>
   <HomeProgrammes/>
  </section>
  <section id="film" className="home-latest-film" data-scene="film" aria-labelledby="latest-youtube-heading">
   <article id="latest-youtube" aria-labelledby="latest-youtube-heading">
    <div className="home-section-label"><p className="kicker record-voice">LATEST FILM</p><Link className="text-link" href="/film/youtube">MORE ON YOUTUBE ↗</Link></div>
    <FilmPlayer video={latestVideo} preview={previewFor(latestVideo)}/>
    <div className="home-film-caption"><h2 id="latest-youtube-heading"><Link href={videoPath(latestVideo)}>{latestVideo.title}</Link></h2><div><p className="home-film-sentence">{latestVideo.description.split("\n\n")[0] || "Experiments, explanations and ideas, in public."}</p><p className="record-voice">{latestVideo.published} · {durationLabel(latestVideo.duration)}</p></div></div>
   </article>
  </section>
  <VisualStudy name="inheritance" href="/notebook/the-ai-left-its-knowledge-didnt" linkLabel="THE AI LEFT. ITS KNOWLEDGE DIDN’T."/>
  <section id="selected-results" className="curated-section" data-scene="results" aria-labelledby="results-heading">
   <div className="curated-heading curated-heading-link"><h2 id="results-heading">What the experiments revealed.</h2><Link className="text-link" href="/research">EXPLORE THE RESEARCH ↗</Link></div>
   <SelectedExperiments items={homeResultProgrammes}/>
  </section>
  <section id="systems" className="curated-section home-systems-index" data-scene="systems" aria-labelledby="systems-heading">
   <h2 id="systems-heading" className="home-quiet-heading">Systems.</h2>
   <div className="home-system-links">{systems.map(work => <Link href={work.path} key={work.path}>{work.name}<span aria-hidden="true"> ↗</span></Link>)}</div>
   <Link className="text-link" href="/systems">ALL SYSTEMS ↗</Link>
  </section>
  <section id="latest" className="curated-section" data-scene="notebook" aria-labelledby="latest-heading">
   <div className="curated-heading curated-heading-link"><h2 id="latest-heading">Latest from the notebook.</h2><Link className="text-link" href="/notebook">VIEW NOTEBOOK ↗</Link></div>
   <CompactNotes notes={latestNotes.slice(0, 4)}/>
   <Link className="text-link archive-entrance" href="/notebook/archive">EXPLORE THE ARCHIVE ↗</Link>
  </section>
  <section id="appearances" className="home-latest-film" data-scene="appearances" aria-labelledby="appearances-heading">
   <div className="curated-heading curated-heading-link"><h2 id="appearances-heading">In conversation.</h2><Link className="text-link" href="/film">FILMS & APPEARANCES ↗</Link></div>
   <article id="latest-mixture-of-experts" className="home-appearance" aria-labelledby="latest-moe-heading"><div><p className="kicker record-voice">LATEST APPEARANCE / MIXTURE OF EXPERTS</p><h3 id="latest-moe-heading"><Link href={videoPath(latestMoe)}>{latestMoe.title}</Link></h3><p className="record-voice home-episode-meta">IBM · EPISODE {latestMoe.episode} · {latestMoe.published} · {durationLabel(latestMoe.duration)}</p><p className="record-voice home-episode-meta">WITH CHRIS HAY AS A PANELIST</p><Link className="text-link" href="/film/mixture-of-experts">MIXTURE OF EXPERTS ↗</Link></div><FilmPlayer video={latestMoe}/></article>
  </section>
 </main>;
}
