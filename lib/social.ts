import {createHash} from 'node:crypto';
import {getRecord,isListed,recordPath,SITE} from './records.ts';
import type {PublicationRecord} from './types.ts';
/** Only public notebook records acquire distribution objects. */
export function socialRecord(id:string){const record=getRecord(id);return record?.kind==='notebook'&&isListed(record)?record:undefined;}
export const socialClaim=(record:PublicationRecord)=>record.dek;
export const socialState=(record:PublicationRecord)=>`${record.publication.toUpperCase()} · V${record.version} · ${record.publication==='published'?'PUBLISHED '+record.published:'RECORDED '+record.created}`;
export const socialUrl=(record:PublicationRecord)=>`${SITE}${recordPath(record)}`;
export const socialImage=(record:PublicationRecord)=>`${SITE}/api/social/${record.id}?v=${createHash('sha256').update(JSON.stringify([record.title,socialClaim(record),socialState(record)])).digest('hex').slice(0,12)}`;
export type SocialEdition='linkedin'|'x';
const editionHash=(record:PublicationRecord,format:SocialEdition)=>createHash('sha256').update(JSON.stringify([format,record.id,record.title,record.dek,record.lineage,record.share,record.version])).digest('hex').slice(0,12);
export const socialEditionImage=(record:PublicationRecord,format:SocialEdition,download=false)=>`${SITE}/api/social/${record.id}?format=${format}&v=${editionHash(record,format)}${download?'&download=1':''}`;
const words=(text:string)=>text.trim().split(/\s+/).filter(Boolean).length;
/** A native-image publishing kit. Nothing here is posted automatically. */
export function distributionDrafts(record:PublicationRecord){
 const claim=socialClaim(record),url=socialUrl(record);
 const linkedin=record.share?.linkedin?.trim()||claim;
 const linkedinComment=`${record.share?.linkedinComment?.trim()||'Read the complete note →'}\n${url}`;
 const x=record.share?.x?.trim()||claim;
 const xReply=`${record.share?.xReply?.trim()||'Read the note →'}\n${url}`;
 return {id:record.id,version:record.version,state:record.publication,canonical_url:url,image_url:socialImage(record),proposition:claim,
  linkedin,linkedin_words:words(linkedin),linkedin_comment:linkedinComment,x,x_reply:xReply,x_thread:[x,xReply],
  assets:{
   og:{url:socialImage(record),width:1200,height:630},
   linkedin:{url:socialEditionImage(record,'linkedin'),download_url:socialEditionImage(record,'linkedin',true),width:1200,height:1500},
   x:{url:socialEditionImage(record,'x'),download_url:socialEditionImage(record,'x',true),width:1600,height:900},
  },
  note:'Native artwork is the post. The canonical record stays attached in the first comment or reply. Review every draft before posting.'};
}
