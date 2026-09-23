import Link from "next/link";
import { SelectedExperiments, CompactNotes } from "@/components/PublicationIndex";
import { FilmPlayer } from "@/components/FilmPlayer";
import { previewFor } from "@/components/YouTubeCollection";
import { latestVideo, latestMoe, videoPath, durationLabel } from "@/lib/youtube";
import { homeResultProgrammes, latestNotes, researchProgrammes, shortDate } from "@/lib/publication-index";
import { HOUSE_WORK } from "@/lib/house";
import "./home-edition.css";

const selected = homeResultProgrammes.filter(p => ["machines", "agent-ecology"].includes(p.id));
const systems = [{ name: "Cell80", path: "/thread/cell80" }, ...HOUSE_WORK.filter(work => work.id !== "W-MCP")];

export default function Home() {
  return <main id="main" className="edition-home">
    <section id="film" className="edition-lead" data-scene="film" aria-labelledby="latest-youtube-heading">
      <article id="latest-youtube">
        <FilmPlayer video={latestVideo} preview={previewFor(latestVideo)} priority/>
        <div className="edition-lead-caption">
          <p className="edition-caption">Latest film<br/>{latestVideo.published && <><time dateTime={latestVideo.published}>{shortDate(latestVideo.published)}</time> · </>}{durationLabel(latestVideo.duration)}</p>
          <div><h1 id="latest-youtube-heading"><Link href={videoPath(latestVideo)}>{latestVideo.title}</Link></h1><Link className="edition-link" href={videoPath(latestVideo)}>Film & transcript</Link></div>
        </div>
      </article>
    </section>
    <section className="edition-introduction" data-scene="identity" aria-labelledby="about-chris">
      <h2 id="about-chris">Chris Hay<br/><span>London</span></h2>
      <div><p>I build things to find out how they work.</p><p>Research, engineering, design and film. A house for ideas, systems and objects.</p><Link className="edition-link" href="/about">About Chris</Link></div>
    </section>
    <section id="selected-results" className="edition-section" data-scene="results" aria-labelledby="results-heading">
      <div className="edition-section-heading"><h2 id="results-heading">Selected research</h2><Link className="edition-link" href="/research">All research</Link></div>
      <SelectedExperiments items={selected}/>
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
