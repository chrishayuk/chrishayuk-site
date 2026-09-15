import Link from "next/link";
import { ProgrammeDoors } from "./PublicationIndex";
import { records, recordPath } from "@/lib/records";
import { researchProgrammes, researchNotes, programmeNotes, findings, resultOutcomes } from "@/lib/publication-index";

export function ResearchCollection({ outcome: requested, publication: requestedPublication }: { outcome?: string; publication?: string }) {
  const outcome = resultOutcomes.find(value => value === requested);
  const publication = ["published", "draft"].find(value => value === requestedPublication);
  const results = researchNotes.filter(record => (!publication || record.publication === publication) && (!outcome || findings(record).some(finding => finding.status === outcome)));
  const questions = records.filter(record => record.kind === "question");
  return <main id="main" className="publication-main curated-index research-map">
    <header className="index-intro"><p className="kicker record-voice">CHRIS HAY / RESEARCH</p><h1>Research<span className="amber">.</span></h1><p className="dek">Experiments, evidence and open questions.</p><p>Follow a programme, inspect a recorded result, or begin with what remains unanswered. Each notebook keeps the experiment, its limits and the evidence behind it.</p><nav className="inline-links" aria-label="Research sections"><a className="text-link" href="#programmes">PROGRAMMES ↓</a><a className="text-link" href="#recorded-results">RECORDED RESULTS ↓</a><a className="text-link" href="#open-questions">OPEN QUESTIONS ↓</a></nav></header>
    <section id="programmes" className="curated-section" aria-labelledby="research-programmes-heading"><div className="curated-heading"><p className="kicker record-voice">FOLLOW THE WORK</p><h2 id="research-programmes-heading">Programmes.</h2></div><ProgrammeDoors items={researchProgrammes}/></section>
    <section id="recorded-results" className="curated-section" aria-labelledby="results-heading"><div className="curated-heading"><p className="kicker record-voice">EXPERIMENT → RESULT → EVIDENCE</p><h2 id="results-heading">Recorded results.</h2><p>Publication status describes the record. Finding status describes a particular claim or observation, within its stated limits. A note can contain both supported and unsupported findings.</p></div>
      <form action="/research#recorded-results" className="research-filters"><div><label className="record-voice" htmlFor="research-publication">RECORD</label><select id="research-publication" name="publication" defaultValue={publication || "all"}><option value="all">Published and working drafts</option><option value="published">Published</option><option value="draft">Working drafts</option></select></div><div><label className="record-voice" htmlFor="research-outcome">FINDING</label><select id="research-outcome" name="outcome" defaultValue={outcome || "all"}><option value="all">All recorded outcomes</option>{resultOutcomes.map(status => <option value={status} key={status}>{status.toLowerCase()}</option>)}</select></div><button className="record-voice" type="submit">FILTER ↗</button>{(outcome || publication) && <Link href="/research#recorded-results">Clear</Link>}</form>
      <p className="record-voice archive-count">{results.length} RECORDS WITH {outcome ? outcome : "RECORDED"} FINDINGS</p>
      {researchProgrammes.map(programme => {
        const ids = new Set(programmeNotes(programme).map(record => record.id));
        const entries = results.filter(record => ids.has(record.id));
        if (!entries.length) return null;
        return <details className="research-result-group" key={`${programme.id}-${outcome}-${publication}`} open={outcome || publication ? true : undefined}><summary><span>{programme.title}</span><span className="record-voice">{entries.length} RECORDS · EXPLORE</span></summary><div>{entries.map(record => {
          const finding = findings(record).find(item => !outcome || item.status === outcome)!;
          return <article className="research-result" key={record.id}><div className="record-voice"><span>{record.publication === "published" ? "PUBLISHED" : "WORKING DRAFT"} · V{record.version}</span><span>{record.experiments?.map(experiment => experiment.id).join(" / ") || record.id}</span></div><h3><Link href={recordPath(record)}>{record.title} ↗</Link></h3><p className="research-finding"><span className="record-voice">{finding.status}</span>{finding.text}</p><details className="research-evidence"><summary>Scope and evidence</summary>{finding.detail && <p>{finding.detail}</p>}<ul>{record.sources.map((source, index) => <li key={index}>{source.url ? <a href={source.url}>{source.title} ↗</a> : source.title}</li>)}</ul><Link className="text-link" href={recordPath(record)}>FULL EXPERIMENT AND LIMITS ↗</Link></details></article>;
        })}</div></details>;
      })}
      {!results.length && <p>No recorded findings match these filters.</p>}
    </section>
    <section id="open-questions" className="curated-section" aria-labelledby="questions-heading"><div className="curated-heading"><p className="kicker record-voice">WHAT REMAINS UNANSWERED</p><h2 id="questions-heading">Open questions.</h2><p>These standing questions sit alongside the next experiments proposed within each programme.</p></div><div className="research-questions"><article><p className="record-voice">AGENT ECOLOGY / NEXT QUESTIONS</p><h3><Link href="/notebook/the-ai-left-its-knowledge-didnt#boundary">What should the next agent inherit? ↗</Link></h3><p>Which records should successors preserve? Can they choose between competing versions, and can a defender repair shared state using uncertain diagnostics? What survives over longer horizons?</p></article>{questions.map(record => <article key={record.id}><p className="record-voice">{record.id} / {record.status}</p><h3><Link href={recordPath(record)}>{record.title} ↗</Link></h3><p>{record.dek}</p></article>)}</div></section>
  </main>;
}
