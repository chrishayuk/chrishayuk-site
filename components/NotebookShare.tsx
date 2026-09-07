import {Share} from '@chrishayuk/hause/components/Share';
import {distributionDrafts,socialClaim,socialUrl} from '@/lib/social';
import type {PublicationRecord} from '@/lib/types';
export function NotebookShare({record}:{record:PublicationRecord}){
 const draft=distributionDrafts(record);
 return <section className="notebook-share" id="share">
  <Share url={socialUrl(record)} text={`${socialClaim(record)}${record.publication==='draft'?' Working note.':''}`}/>
  <details className="distribution-drafts"><summary>Post drafts and social card</summary>
   <p>Start with the idea. Keep its source attached. These excerpts are ready to edit before posting.</p>
   <a className="text-link" href={draft.image_url}>OPEN SOCIAL CARD ↗</a>
   <h3>LinkedIn</h3><p className="record-voice">{draft.linkedin_words} WORDS · {record.publication.toUpperCase()}</p><p className="distribution-text">{draft.linkedin}</p>
   <h3>X</h3><p className="distribution-text">{draft.x}</p><h3>A thread</h3><ol>{draft.x_thread.map((post,i)=><li key={i} className="distribution-text">{post}</li>)}</ol>
   <a className="text-link" href={`/api/share/${record.id}`}>EXPORT THE DRAFTS ↗</a>
  </details>
 </section>;
}
