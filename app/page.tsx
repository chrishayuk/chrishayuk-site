import Link from "next/link";
import Image from "next/image";
import { SelectedExperiments, CompactNotes } from "@/components/PublicationIndex";
import { FilmPlayer } from "@/components/FilmPlayer";
import { FilmPoster } from "@/components/FilmPoster";
import { Media } from "@/components/Media";
import { previewFor } from "@/components/YouTubeCollection";
import { latestVideo, latestMoe, videoPath, durationLabel } from "@/lib/youtube";
import { homeResultProgrammes, latestNotes, researchProgrammes, shortDate } from "@/lib/publication-index";
import { HOUSE_WORK } from "@/lib/house";
import cell80Preview from "@/lib/data/cell80-home-preview.json";
import "./home-edition.css";

const selected = homeResultProgrammes.filter(p => ["machines", "agent-ecology"].includes(p.id));
const systems = [{ name: "Cell80", path: "/thread/cell80" }, ...HOUSE_WORK.filter(work => work.id !== "W-MCP")];

export default function Home() {
  return <main id="main" className="edition-home">
    <section className="edition-arrival scene dark-scene" data-scene="identity" aria-labelledby="proposition">
      <Media id="hero-identity" priority className="scene-background"/>
      <div className="edition-arrival-overline"><span>Chris Hay</span><span>London · 2026</span></div>
      <div className="edition-arrival-copy">
        <h1 id="proposition">A house for<br/>ideas, systems<br/>and objects.</h1>
        <p>Building things to find out how they work.</p>
      </div>
      <div className="edition-arrival-footer"><span>Research · Engineering · Design · Film</span><a href="#current-programmes">Explore the house ↓</a></div>
    </section>
    <section id="film" className="edition-lead" data-scene="film" aria-labelledby="latest-youtube-heading">
      <article id="latest-youtube">
        <a href={videoPath(latestVideo)} className="film-entrance" data-film-destination aria-label={`Open film: ${latestVideo.title}`}><FilmPoster video={latestVideo} preview={previewFor(latestVideo)}/><span className="film-entrance-label">Watch the film <span aria-hidden="true">↗</span></span></a>
        <div className="edition-lead-caption">
          <p className="edition-caption">Latest film<br/>{latestVideo.published && <><time dateTime={latestVideo.published}>{shortDate(latestVideo.published)}</time> · </>}{durationLabel(latestVideo.duration)}</p>
          <div><h2 id="latest-youtube-heading"><a href={videoPath(latestVideo)}>{latestVideo.title}</a></h2><a className="edition-link" href={videoPath(latestVideo)}>Film & transcript</a></div>
        </div>
      </article>
    </section>
    <section id="selected-results" className="edition-section" data-scene="results" aria-labelledby="results-heading">
      <div className="edition-section-heading"><h2 id="results-heading">Selected research</h2><Link className="edition-link" href="/research">All research</Link></div>
      <SelectedExperiments items={selected}/>
    </section>
    <section id="cell80" className="edition-section edition-cell80" aria-labelledby="cell80-heading">
      <div className="edition-cell80-heading">
        <p className="edition-caption">Cell80 / Working note</p>
        <div><h2 id="cell80-heading"><Link href="/notebook/can-you-name-the-mutation-that-changed-a-world">Can you name the mutation that changed a world?</Link></h2><p>One birth. Two recorded histories.</p></div>
      </div>
      <div className="edition-cell80-worlds">{cell80Preview.histories.map(history => <figure key={history.label}>
        <Link href="/notebook/can-you-name-the-mutation-that-changed-a-world#cell80-study" aria-label={`Explore ${history.label.toLowerCase()}`}><Image src={history.image} width={768} height={768} unoptimized alt={`Recorded world at tick 1,080: ${history.population} organisms; ${history.share} carry program 33.`}/></Link>
        <figcaption><span>{history.label}</span><span>{history.share} carry program 33</span></figcaption>
      </figure>)}</div>
      <div className="edition-cell80-footer"><p className="edition-caption">EX-4 · Tick 1,080. Amber marks program 33; marks can contain several organisms.<br/>The second history undoes the program change at birth. All other birth changes remain.</p><Link className="edition-link" href="/notebook/can-you-name-the-mutation-that-changed-a-world#cell80-study">Explore the recorded worlds ↗</Link></div>
    </section>
    <section id="current-programmes" className="edition-section edition-programmes" data-scene="programmes" aria-labelledby="programmes-heading">
      <h2 id="programmes-heading">Ongoing work</h2>
      <nav aria-label="Research programmes">{researchProgrammes.map(programme => <Link href={programme.href} key={programme.id}><span>{programme.title}</span><span>{programme.question}</span></Link>)}</nav>
    </section>
    <section id="latest" className="edition-section edition-notebook" data-scene="notebook" aria-labelledby="latest-heading">
      <div className="edition-section-heading"><h2 id="latest-heading">Notebook</h2><Link className="edition-link" href="/notebook">All notes</Link></div>
      <CompactNotes notes={latestNotes.slice(0, 3)}/>
    </section>
    <section id="appearances" className="edition-section edition-conversation" data-scene="appearances" aria-labelledby="appearances-heading">
      <article id="latest-mixture-of-experts">
        <FilmPlayer video={latestMoe}/>
        <div><p className="edition-caption">In conversation · IBM</p><h2 id="appearances-heading"><Link href={videoPath(latestMoe)}>{latestMoe.title}</Link></h2><p className="edition-caption">Mixture of Experts · Episode {latestMoe.episode}<br/>With Chris Hay as a panelist</p><Link className="edition-link" href="/film/mixture-of-experts">More conversations</Link></div>
      </article>
    </section>
    <section id="systems" className="edition-section edition-systems" data-scene="systems" aria-labelledby="systems-heading">
      <h2 id="systems-heading">Systems & tools</h2>
      <nav aria-label="Systems and tools">{systems.map(work => <Link href={work.path} key={work.path}>{work.name}</Link>)}</nav>
    </section>
  </main>;
}
