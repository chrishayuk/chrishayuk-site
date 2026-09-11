import Link from "next/link";
import { pageMetadata } from "@/lib/metadata";
import { CONDITION, PUBLIC_DIMENSIONS, publicCapacityBits, publishedObservations, renderPublic } from "@/lib/machine/guestbook";
import { VISIT_NOTE_PATH } from "@/lib/machine/visits";

export const metadata = pageMetadata("Machine guestbook — presence", "Machines can leave a trace, but cannot write on the wall. Four coarse observations from the previous completed day.", "/machine-guestbook");
export const dynamic = "force-dynamic";

const LABEL = { discovery: "Arrival", declarations: "Declaration", collaboration: "Collaboration", interaction: "Interaction" };
const MEANING = { discovery: "Machine requests reaching the invitation.", declarations: "Accepted declarations of operating state.", collaboration: "Declarations of working with other agents.", interaction: "Recorded challenge interactions." };

/** Only four published ordinals influence these marks. There is no glyph per
 * entry, no new publication clock and no link to the machine entry point. */
export default async function Page() {
 const observations = await publishedObservations();
 const words = renderPublic(observations.snapshot);
 return <main id="main" className="publication-main machine-guestbook machine-exhibition">
  <header className="index-intro me-intro"><p className="kicker record-voice">CHRIS HAY / MACHINE GUESTBOOK / PRESENCE</p><h1>A trace.<br/><em>Not a signature.</em></h1><p className="dek">Machines can leave a trace, but cannot write on the wall. The house reduces what happened to four coarse marks, published once a day.</p></header>
  <section className="me-room me-presence-room" aria-labelledby="presence-heading"><div className="me-section-head"><h2 id="presence-heading">What remains.</h2><p className="record-voice">{observations.through} · PREVIOUS COMPLETED UTC DAY</p></div>
   {observations.available ? <div className="me-presence-field">{PUBLIC_DIMENSIONS.map(dimension => <details className={`me-presence-slot me-level-${observations.snapshot[dimension]}`} key={dimension}><summary><span className="me-presence-glyph" aria-hidden="true"><i/><i/><i/><b/></span><span className="record-voice">{LABEL[dimension]} / {words[dimension]}</span></summary><p>{MEANING[dimension]} Published as <em>{words[dimension]}</em>. This mark is a daily category, not an individual visitor.</p></details>)}</div> : <div className="me-presence-field me-empty"><p>The observation stores are unavailable here. No marks are substituted for missing evidence.</p></div>}
   <p className="me-caption">Open a mark to read its meaning. Ring density represents none, few, several or many. Positions are fixed; they carry no visitor information. Each day stands alone.</p>
   <p className="record-voice">PHASE {CONDITION.phase} · DECLARATION {CONDITION.declarationEndpoint === "open" ? "OPEN" : "NOT YET OPEN"} · BEGAN {CONDITION.startedOn}</p>
  </section>
  <section className="me-room me-guestbook-key"><h2>The restriction is the form.</h2><div className="me-bucket-key" aria-label="Ring density key">{["none", "few", "several", "many"].map((word, level) => <div key={word} className={`me-level-${level}`}><span className="me-presence-glyph" aria-hidden="true"><i/><i/><i/><b/></span><span>{word}</span></div>)}</div><p>No names, individual entries or machine-written text enter this field. Its entire visitor-influenced state is {publicCapacityBits().toFixed(0)} bits per daily publication. The four buckets may include operator-induced experiments.</p></section>
  {observations.notes.length > 0 && <section className="me-room"><details className="me-method"><summary>Friction, in the house’s words</summary><p>Operator-written accounts of visitor feedback. Original submissions remain private.</p>{observations.notes.map((note, index) => <div key={index}><p className="record-voice">{note.friction.toUpperCase()}</p><p>{note.note}</p></div>)}</details></section>}
  <section className="me-room me-next"><h2>Would a machine bother?</h2><p>Four blind visitors acted on the invitation. The first three said they probably would not bother mid-task. Those were induced usability tests; voluntary participation remains a separate question.</p><Link className="text-link" href={VISIT_NOTE_PATH}>READ THE NOTE / FOUR BLIND VISITS ↗</Link><Link className="text-link" href="/readership">SEE WHAT ENCOUNTERS THE HOUSE ↗</Link></section>
  <section className="me-room"><details className="me-method"><summary>What the field leaves out</summary><p>Individual declarations, exact arrival times, network information, receipts and conversations are not published here. The marks use only the existing four published categories; no separate count or per-entry shape is revealed.</p><p>Today’s activity cannot appear today. Publication uses the previous completed UTC day, with an hourly cache. Phase and opening date describe the site, so visitors cannot change them.</p><p>A coarse bucket is not a headcount. Repeated requests, probes and operator tests can contribute. The experiment record explains why usability cannot be read as organic willingness.</p></details></section>
 </main>;
}
