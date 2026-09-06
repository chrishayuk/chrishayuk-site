import Link from "next/link";
import { HOUSE, HOUSE_WORK, HOUSE_PUBLICATIONS, HOUSE_PARTS } from "@/lib/house";
import { Acts } from "./Acts";

export function HouseRecord(){return <section id="the-house" className="house-record" aria-labelledby="house-record-title">
  <header><p className="kicker record-voice">CHRIS HAY / THE PRACTICE</p><h2 id="house-record-title">Thought about.<br/>Given structure.<br/><em>Made real.</em></h2><p>An idea takes shape. A system gives it structure. An object brings it into the world.</p></header>
  <div className="house-parts">{HOUSE_PARTS.map(p=><Link href={p.path} key={p.id}><h3>{p.name} ↗</h3><p>{p.text}</p></Link>)}</div>
  <div className="house-works">{HOUSE_WORK.map(w=><article key={w.id}><div className="house-work-identity"><span className="record-voice">{w.field}</span><h3><Link href={w.path}>{w.name} ↗</Link></h3><span className="record-voice">A WORK BY CHRIS HAY</span></div><div><p>{w.text}</p><Link href={w.path} className="text-link">FOLLOW THE WORK ↗</Link></div></article>)}</div>
  <div className="house-publishing"><p className="kicker record-voice">HOW THE WORK IS PUBLISHED</p>{HOUSE_PUBLICATIONS.map(p=><Link href={p.path} key={p.name}><h3>{p.name} ↗</h3><p>{p.text}</p></Link>)}</div>
  <div className="house-principle"><Acts acts={[{kind:"statement",text:HOUSE.principle}]}/><p>Open questions remain open. A result earns its status through evidence. Revisions keep their earlier records, including the ideas that did not hold up.</p></div>
  <div className="house-appearances"><p className="kicker record-voice">BEYOND THE HOUSE / CONVERSATIONS & APPEARANCES</p><p>Chris is a regular panelist on IBM’s <em>Mixture of Experts</em>. Those conversations belong in this record with their original production credits and sources.</p><Link className="text-link" href="/film/mixture-of-experts">MIXTURE OF EXPERTS ↗</Link></div>
</section>;}
