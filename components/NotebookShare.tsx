/* Generated social assets are already exact-size PNGs; an optimizing image proxy would only add a second indirection. */
/* eslint-disable @next/next/no-img-element */
import {Share} from '@chrishayuk/hause/components/Share';
import {distributionDrafts,socialClaim,socialUrl} from '@/lib/social';
import type {PublicationRecord} from '@/lib/types';
import {CopyTextButton} from './CopyTextButton';
export function NotebookShare({record}:{record:PublicationRecord}){
 const draft=distributionDrafts(record);
 // Use this deployment for previews; the exported sharing kit keeps canonical URLs.
 const assetPath=(url:string)=>{const asset=new URL(url);return `${asset.pathname}${asset.search}`;};
 return <section className="notebook-share social-publishing-kit" id="share">
  <header className="social-kit-header"><h2>Share this note.</h2></header>
  <div className="social-edition-grid">
   <article className="social-edition-panel">
    <a className="social-edition-preview linkedin-preview" href={assetPath(draft.assets.linkedin.url)} aria-label="Open LinkedIn artwork"><img src={assetPath(draft.assets.linkedin.url)} alt={`LinkedIn social edition for ${record.title}`} width="1200" height="1500" loading="lazy"/></a>
    <div className="social-edition-heading"><div><p className="record-voice">1200 × 1500</p><h3>LinkedIn</h3></div><a href={assetPath(draft.assets.linkedin.download_url)} download>Download image ↓</a></div>
    <details className="social-copy-details"><summary>Caption and link</summary><CopyTextButton label="POST TEXT" text={draft.linkedin}/><CopyTextButton label="FIRST COMMENT" text={draft.linkedin_comment}/></details>
   </article>
   <article className="social-edition-panel">
    <a className="social-edition-preview x-preview" href={assetPath(draft.assets.x.url)} aria-label="Open X artwork"><img src={assetPath(draft.assets.x.url)} alt={`X social edition for ${record.title}`} width="1600" height="900" loading="lazy"/></a>
    <div className="social-edition-heading"><div><p className="record-voice">1600 × 900</p><h3>X</h3></div><a href={assetPath(draft.assets.x.download_url)} download>Download image ↓</a></div>
    <details className="social-copy-details"><summary>Caption and link</summary><CopyTextButton label="POST TEXT" text={draft.x}/><CopyTextButton label="FIRST REPLY" text={draft.x_reply}/></details>
   </article>
  </div>
  <details className="share-infrastructure"><summary>Link preview and sharing</summary><p>A landscape edition appears when someone shares the note’s link.</p><div className="share-infrastructure-links"><a href={draft.image_url}>Open link preview ↗</a><a href={`/api/share/${record.id}`}>Export sharing kit ↗</a></div><Share url={socialUrl(record)} text={`${socialClaim(record)}${record.publication==='draft'?' Working note.':''}`}/></details>
 </section>;
}
