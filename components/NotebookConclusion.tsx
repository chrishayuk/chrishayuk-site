import type { PublicationRecord } from '@/lib/types';
import { conclusionFor } from '@/lib/notebook-conclusions';
import '@/app/notebook-conclusion.css';

export function NotebookConclusion({ record }: { record: PublicationRecord }) {
 const conclusion = conclusionFor(record);
 return <section className="notebook-conclusion" data-notebook-conclusion={record.id}>
  <p className="notebook-conclusion-register">Closing note / {record.publication === 'published' ? 'Published record' : 'Working draft'}</p>
  <h2>Conclusion</h2>
  <p className="notebook-conclusion-takeaway">{conclusion.takeaway}</p>
  <div className="notebook-conclusion-scope"><h3>Scope & open questions</h3><p>{conclusion.scope}</p></div>
  <nav aria-label="Continue after the conclusion"><a href="#cite">Sources & publication record ↗</a><a href="/notebook">Return to the notebooks ↗</a></nav>
 </section>;
}
