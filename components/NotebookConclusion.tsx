import { notebookFormat, notebookFormats } from '@/lib/notebook-formats';
import { notebookAppearance } from '@/lib/notebook-appearance';
import { notebookCollectionHref } from '@/lib/notebook-gallery';
import type { PublicationRecord } from '@/lib/types';
import { conclusionFor } from '@/lib/notebook-conclusions';
import '@/app/notebook-conclusion.css';

export function NotebookConclusion({ record }: { record: PublicationRecord }) {
 const conclusion = conclusionFor(record);
 const format = notebookFormats[notebookFormat(record.id)];
 return <section className="notebook-conclusion" data-notebook-conclusion={record.id}>
  <p className="notebook-conclusion-register">{format.label} / {record.publication === 'published' ? 'Published record' : 'Working draft'}</p>
  <h2>{format.closing}</h2>
  <p className="notebook-conclusion-takeaway">{conclusion.takeaway}</p>
  <div className="notebook-conclusion-scope"><h3>{format.scope}</h3><p>{conclusion.scope}</p></div>
  <nav aria-label="Continue after the conclusion"><a href="#cite">Sources & publication record ↗</a><a href={notebookCollectionHref(notebookAppearance(record.id)["data-notebook-palette"])}>Return to the collection ↗</a></nav>
 </section>;
}
