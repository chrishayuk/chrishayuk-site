import { publicationHistory } from "@/lib/provenance";

export function PublicationHistory({ id, version }: { id: string; version: string }) {
 const history = publicationHistory(id);
 if (!history?.versions.length) return null;
 return <section className="sources" id="versions"><h2>PUBLICATION HISTORY</h2>
  <p>Each version preserves its manuscript, claims and source references. Research status is recorded separately from publication.</p>
  <ol>{history.versions.map(entry => <li key={entry.version} aria-current={entry.version === version ? "true" : undefined}>
   <a href={entry.url}>V{entry.version} · {entry.revised || entry.published} ↗</a>
   <p>{entry.revision?.summary} {entry.scientificStatus && <span className="record-voice">{entry.scientificStatus}</span>}</p>
   {entry.supersedes?.map(reference => <p key={reference.url}>Revises <a href={reference.url}>{reference.id} v{reference.version}</a>: {reference.reason}</p>)}
   {entry.supersededBy.map(reference => <p key={reference.url}>Later interpretation: <a href={reference.url}>{reference.id} v{reference.version}</a>. {reference.reason}</p>)}
   <p className="record-voice"><a href={entry.manuscript}>MANUSCRIPT JSON ↗</a> · <a href={`${entry.citations}&format=bibtex`}>BIBTEX ↗</a> · <a href={`${entry.citations}&format=csl-json`}>CSL JSON ↗</a></p>
  </li>)}</ol>
  <a className="text-link" href={`/api/record/${id}/history`}>MACHINE-READABLE HISTORY ↗</a>
 </section>;
}
