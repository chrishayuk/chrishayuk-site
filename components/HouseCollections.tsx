import Link from "next/link";
import { WorkVisual } from "./WorkSelection";
import { HOUSE_PARTS, HOUSE_WORK } from "@/lib/house";
import { records, recordPath } from "@/lib/records";
import { Acts } from "./Acts";
import { Media } from "./Media";
import { SystemStudy } from "./SystemStudy";
import { HauseStudy } from "./HauseStudy";
import { FilmSelection } from "./YouTubeCollection";

export function Systems() {
  return <main id="main" className="publication-main"><header className="index-intro"><p className="kicker record-voice">CHRIS HAY / SYSTEMS</p><h1>Systems<span className="amber">.</span></h1><p className="dek">Ideas given something to run on.</p><p>Software, representations, design languages and instruments. Each system has its own identity and a place in the record.</p></header><div className="work-index">{HOUSE_WORK.map(w => { const r = records.find(r => r.id === w.id)!; return <article key={r.id} className="work-story"><Link href={w.path} className="work-story-heading"><h2>{w.name}</h2><span>↗</span></Link>{r.id === "W-VINDEX3" ? <SystemStudy/> : r.id === "W-HAUSE" ? <HauseStudy/> : r.id === "W-MCP" ? <figure className="system-work-visual"><WorkVisual id={r.id}/><figcaption className="record-voice">CONCEPTUAL STUDY / DISCOVER → CALL → RESULT</figcaption></figure> : <Media id={r.id === "W-LARQL" ? "youtube-larql" : r.media[0]}/>}<p>{w.text}</p><div className="work-endorsement record-voice">{w.field} · A SYSTEM BY CHRIS HAY</div><Link href={w.path} className="text-link">OPEN DOSSIER <span className="record-voice">{r.id} ↗</span></Link></article>; })}</div></main>;
}

export function Ideas() {
  const entries = records.filter(r => r.kind === "question" || r.kind === "notebook");
  return <main id="main" className="publication-main"><header className="index-intro"><p className="kicker record-voice">CHRIS HAY / IDEAS</p><h1>Before<br/><em>the answer.</em></h1><p className="dek">Questions, observations and the thinking that becomes work.</p><p>These are open working records. The notebook holds the thought; research asks what would establish it.</p><div className="inline-links"><Link className="text-link" href="/research">RESEARCH ↗</Link><Link className="text-link" href="/notebook">THE NOTEBOOK ↗</Link></div></header><section className="ideas-question"><Acts acts={[{ kind: "question", text: "What if the FFN is a graph?", status: "OPEN", detail: "A question about how learned systems might be addressed and traversed." }]}/><Link href="/research/ffn-as-graph" className="text-link">FOLLOW Q-FFN ↗</Link></section><div className="record-list">{entries.map(r => <Link key={r.id} href={recordPath(r)}><span className="record-voice">{r.id}<br/>{r.kind} · DRAFT<br/>{r.status}</span><div><h2>{r.title}</h2><p>{r.dek}</p></div><span>↗</span></Link>)}</div><p className="collection-closing">A question can lead to a system. A result can change the question. <Link href="/record">Follow the record ↗</Link></p></main>;
}

export function Objects() {
  return <main id="main" className="publication-main"><header className="index-intro"><p className="kicker record-voice">CHRIS HAY / OBJECTS</p><h1>Ideas,<br/><em>made real.</em></h1><p className="dek">Films, interfaces and publications. Things made so an idea can be encountered.</p></header><section className="objects-films"><div className="section-heading"><p className="kicker record-voice">FILMS BY CHRIS HAY</p><h2>Thinking<br/><em>in public.</em></h2><Link className="text-link" href="/film/youtube">THE YOUTUBE COLLECTION ↗</Link></div><FilmSelection/></section><section className="objects-interface"><p className="kicker record-voice">INTERFACE / HAUSE</p><HauseStudy/><p>An idea takes a different form as a statement, an instrument or a performance. This publication is one application of the language.</p><Link className="text-link" href="/work/hause">THE HAUSE DOSSIER ↗</Link></section><div className="house-publishing"><p className="kicker record-voice">PUBLICATIONS & CONVERSATIONS</p><Link href="/notebook"><h3>The notebook ↗</h3><p>The authored record while it is still taking shape.</p></Link><Link href="/film/mixture-of-experts"><h3>Mixture of Experts ↗</h3><p>An IBM production. Chris’s appearances are catalogued with their original credits.</p></Link><Link href="/record"><h3>The full catalogue ↗</h3><p>Record identities, dates, authorship and sources.</p></Link></div></main>;
}

export function HouseEntrances() {
  return <nav className="house-entrances record-voice" aria-label="Explore the house">{HOUSE_PARTS.map(p => <Link key={p.id} href={p.path}>{p.name} ↗</Link>)}<Link href="/film">Film ↗</Link><Link href="/record">The record ↗</Link></nav>;
}
