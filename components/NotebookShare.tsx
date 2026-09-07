/* Generated social assets are already exact-size PNGs; an optimizing image proxy would only add a second indirection. */
/* eslint-disable @next/next/no-img-element */
import {Share} from '@chrishayuk/hause/components/Share';
import {distributionDrafts,socialClaim,socialUrl} from '@/lib/social';
import type {PublicationRecord} from '@/lib/types';
import {CopyTextButton} from './CopyTextButton';
export function NotebookShare({record}:{record:PublicationRecord}){
 const draft=distributionDrafts(record);
 return <section className="notebook-share social-publishing-kit" id="share">
  <header className="social-kit-header"><p className="record-voice">SHARE THIS RECORD</p><h2>A social edition.</h2><p>The artwork is the post. The canonical record follows in the first comment or reply.</p></header>
  <div className="social-edition-grid">
   <article className="social-edition-panel">
    <a className="social-edition-preview linkedin-preview" href={draft.assets.linkedin.url} aria-label="Open LinkedIn artwork"><img src={draft.assets.linkedin.url} alt={`LinkedIn social edition for ${record.title}`} width="1200" height="1500" loading="lazy"/></a>
    <div className="social-edition-heading"><div><p className="record-voice">LINKEDIN / 4:5 / 1200 × 1500</p><h3>LinkedIn</h3></div><a href={draft.assets.linkedin.download_url} download>DOWNLOAD ARTWORK ↓</a></div>
    <CopyTextButton label="POST TEXT" text={draft.linkedin}/><CopyTextButton label="FIRST COMMENT" text={draft.linkedin_comment}/>
   </article>
   <article className="social-edition-panel">
    <a className="social-edition-preview x-preview" href={draft.assets.x.url} aria-label="Open X artwork"><img src={draft.assets.x.url} alt={`X social edition for ${record.title}`} width="1600" height="900" loading="lazy"/></a>
    <div className="social-edition-heading"><div><p className="record-voice">X / 16:9 / 1600 × 900</p><h3>X</h3></div><a href={draft.assets.x.download_url} download>DOWNLOAD ARTWORK ↓</a></div>
    <CopyTextButton label="POST TEXT" text={draft.x}/><CopyTextButton label="FIRST REPLY" text={draft.x_reply}/>
   </article>
  </div>
  <details className="share-infrastructure"><summary>OG / unfurl infrastructure</summary><p>The 1200 × 630 card remains attached to the canonical URL for link previews, messages and other people sharing this record.</p><div className="share-infrastructure-links"><a href={draft.image_url}>OPEN OG CARD ↗</a><a href={`/api/share/${record.id}`}>EXPORT KIT JSON ↗</a></div><Share url={socialUrl(record)} text={`${socialClaim(record)}${record.publication==='draft'?' Working note.':''}`}/></details>
 </section>;
}
