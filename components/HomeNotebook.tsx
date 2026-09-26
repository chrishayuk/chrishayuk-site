import { notebookAppearance } from '@/lib/notebook-appearance';
import Link from 'next/link';
import { NotebookPreview } from '@chrishayuk/hause/components/NotebookTemplate';
import { recordGraph } from '@/lib/graph';
import { selectHomeNotebook } from '@/lib/home-notebook';
import { getRecord, recordPath } from '@/lib/records';
import { programmeHighlights, shortDate } from '@/lib/publication-index';
import { HomeNotebookPlate } from './HomeNotebookPlate';

function selection() {
 return selectHomeNotebook(recordGraph().nodes, Object.values(programmeHighlights));
}

export function HomeNotebook() {
 const { latest } = selection();
 if (!latest) return null;
 const record = getRecord(latest.id)!;
 const openHref = `${recordPath(record)}#open-notebook`;
 const appearance = notebookAppearance(record.id);
 const graph = recordGraph();
 const threadIds = new Set(graph.edges.filter(edge => edge.from === latest.id && edge.kind === 'in-thread').map(edge => edge.to));
 const threads = graph.nodes.filter(node => threadIds.has(node.id));
 return <section {...appearance} id="latest-notebook" className="edition-section edition-open-notebook hause-notebook-material" data-scene="notebook" data-latest-notebook={latest.id} aria-label="Latest published notebook">
  <div className="edition-notebook-intro"><p className="edition-caption">On the desk</p><Link className="edition-link" href="/notebook">All collections ↗</Link></div>
  <div className="edition-notebook-stage">
  <NotebookPreview title={latest.title} href={openHref} summary={record.dek}
   label="Latest notebook" metadata={<><span>{record.authors.join(' / ')} · </span><time dateTime={latest.published}>{shortDate(latest.published!)}</time></>}
   annotation={threads.length > 0 && <><span className="edition-excerpt-label">Research thread</span><nav aria-label="Continue the notebook's research thread">{threads.map(thread => <Link href={new URL(thread.url).pathname} key={thread.id}>{thread.title} ↗</Link>)}</nav></>}>
   <HomeNotebookPlate id={record.id} collection={appearance['data-notebook-palette']} href={recordPath(record)}/>
  </NotebookPreview>
  </div>
  <div className="edition-notebook-colophon"><span>Working papers / Chris Hay</span><Link href={openHref}>Open notebook <span aria-hidden="true">↗</span></Link></div>
 </section>;
}

export function FeaturedArticles() {
 const { featured } = selection();
 if (!featured.length) return null;
 return <section id="featured-articles" className="edition-section edition-featured" aria-labelledby="featured-heading">
  <div className="edition-section-heading"><h2 id="featured-heading">Featured articles</h2><Link className="edition-link" href="/notebook/archive">The complete notebook ↗</Link></div>
  <div className="edition-featured-articles">{featured.map((node, index) => {
   const record = getRecord(node.id)!;
   return <article key={node.id} data-featured-article={node.id}>
    <div className="edition-article-register"><span>{String(index + 1).padStart(2, '0')}</span><time dateTime={node.published}>{shortDate(node.published!)}</time></div>
    <h3><Link href={recordPath(record)}>{node.title}</Link></h3><p>{record.dek}</p><Link className="edition-link" href={recordPath(record)}>Read the article ↗</Link>
   </article>;
  })}</div>
 </section>;
}
