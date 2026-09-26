import { notebookFormat, notebookFormats } from '@/lib/notebook-formats';
import type { ReactNode } from 'react';
import { NotebookConclusion } from './NotebookConclusion';
import { NotebookTemplate } from '@chrishayuk/hause/components/NotebookTemplate';
import { FolioObject } from '@chrishayuk/hause/components/Codex';
import { Manuscript } from '@chrishayuk/hause/components/Manuscript';
import { getRecord } from '@/lib/records';
import { publicationHistory } from '@/lib/provenance';
import type { PublicationRecord } from '@/lib/types';
import { Acts } from './Acts';
import '@/app/notebook-template.css';

export type NotebookChapter = { label: string; id?: string; kind?: 'operate' | 'evidence'; children: ReactNode };

/** Editorial boundaries are supplied by each note; the shared library owns the book. */
export function NotebookEntry({ record: supplied, recordId, chapters, className = '', introduction }: {
 record?: PublicationRecord; recordId?: string; chapters: NotebookChapter[]; className?: string; introduction?: ReactNode;
}) {
 const record = supplied || getRecord(recordId || '');
 if (!record || record.kind !== 'notebook') throw new Error(`Unknown notebook: ${recordId}`);
 const id = `${record.id.toLowerCase()}-notebook`;
 const format = notebookFormat(record.id);
 const first = record.body[0];
 const opening = first?.kind === 'film' || first?.kind === 'photograph'
  ? [{ label: first.kind === 'film' ? 'The opening film' : 'The opening image', children: <><p className="notebook-entry-dek">{record.dek}</p><Acts acts={[first]} anchored/></> }]
  : [];
 const folios = [...opening, ...chapters, { id: `${id}-conclusion`, label: notebookFormats[format].closing, children: <NotebookConclusion record={record}/> }].map((chapter: NotebookChapter, index) => ({
  id: chapter.id || `${id}-folio-${index + 1}`, label: chapter.label, kind: chapter.kind,
  children: <FolioObject place="full" className="notebook-authored-page"><div id={index === 0 ? 'open-notebook' : undefined} className={`notebook-chapter-content ${className}`}>{index === 0 && introduction}{chapter.children}</div></FolioObject>,
 }));
 const history = publicationHistory(record.id);
 return <NotebookTemplate format={format} id={id} title={record.title} collection={`Chris Hay / Notebook / ${record.id}`}
  byline={<><span>{notebookFormats[format].label}</span><span>{record.authors.join(', ')}</span><span>{record.publication === 'published' ? 'Published' : 'Working note'} · <time dateTime={record.published || record.created}>{record.published || record.created}</time></span><span>v{record.version}</span>{record.status && <span>{record.status}</span>}</>}
  folios={folios}
  manuscript={<Manuscript introduction={<><p>{record.dek}</p><p className="notebook-manuscript-state">{record.publication === 'published' ? 'Published manuscript' : 'Working manuscript'} · v{record.version}</p></>}>
   {record.body.map((act, index) => <section key={index} id={`read-act-${index + 1}`} className="notebook-manuscript-passage">
    {act.kind === 'observation' ? <>{act.label && <h3>{act.label}</h3>}<p>{act.text}</p>{act.references?.map(ref => <p className="manuscript-reference" key={ref.url}><a href={ref.url}>{ref.label} ↗</a></p>)}</> : <Acts acts={[act]} staticRefusals/>}
   </section>)}
   <NotebookConclusion record={record}/>
   <footer className="manuscript-end"><a href={`#${folios[0].id}`}>Return to the spreads ↗</a><a href="#cite">Sources and citation ↗</a></footer>
  </Manuscript>}
  history={<div className="notebook-entry-history">{history?.versions.length ? <ol>{history.versions.map(version => <li key={version.version}><span>{version.revised || version.published} · v{version.version}</span><h3>{version.revision?.kind === 'initial' ? 'First publication' : 'Revision'}</h3><p>{version.revision?.summary}</p><a href={version.url}>Read the preserved edition ↗</a><details><summary>Manuscript fingerprint</summary><code>{version.hash}</code><a href={version.manuscript}>Manuscript JSON ↗</a></details></li>)}</ol> : <><h3>A working note</h3><p>Recorded {record.created}. This note has no published editions yet.</p><p>Its status is {record.status || 'open'}; a notebook presentation does not establish a result.</p></>}<a href="#cite">Sources and publication record ↗</a></div>}/>
}

/** Newly published records get the shared book without adding a route-specific renderer. */
export function DefaultNotebook({ record }: { record: PublicationRecord }) {
 const openingMedia = ['film', 'photograph'].includes(record.body[0]?.kind);
 const chapters: NotebookChapter[] = [
  { label: 'The note', children: <><h2>{record.title}</h2><p className="notebook-entry-dek">{record.dek}</p></> },
  ...record.body.flatMap((act, index) => openingMedia && index === 0 ? [] : [{
   label: act.kind === 'observation' && act.label ? act.label : `Passage ${index + 1}`,
   kind: act.kind === 'evidence' ? 'evidence' as const : undefined,
   children: <Acts acts={[act]} anchored offset={index} staticRefusals/>,
  }]),
 ];
 return <NotebookEntry record={record} chapters={chapters}/>;
}
