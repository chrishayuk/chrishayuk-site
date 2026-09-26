import { notebookFormat, notebookFormats } from '@/lib/notebook-formats';
import { notebookAppearance } from '@/lib/notebook-appearance';
import { notebookCollectionHref } from '@/lib/notebook-gallery';
import type { PublicationRecord } from '@/lib/types';
import { conclusionFor } from '@/lib/notebook-conclusions';
import { NotebookClosing } from '@chrishayuk/hause/components/NotebookObjects';
import '@/app/notebook-conclusion.css';

export function NotebookConclusion({ record }: { record: PublicationRecord }) {
 const conclusion = conclusionFor(record);
 const format = notebookFormats[notebookFormat(record.id)];
 return <section className="notebook-conclusion" data-notebook-conclusion={record.id}>
  <NotebookClosing register={<>{format.label} / {record.publication === 'published' ? 'Published record' : 'Working draft'}</>} title={format.closing} finding={<p>{conclusion.takeaway}</p>} scopeLabel={format.scope} scope={<p>{conclusion.scope}</p>}>
  <nav aria-label="Continue after the conclusion"><a href="#cite">Sources & publication record ↗</a><a href={notebookCollectionHref(notebookAppearance(record.id)["data-notebook-palette"])}>Return to the collection ↗</a></nav>
  </NotebookClosing>
 </section>;
}
