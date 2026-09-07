import {createHash} from 'node:crypto';
import {getRecord,isListed,recordPath,SITE} from './records.ts';
import type {PublicationRecord} from './types.ts';
/** Only public notebook records acquire distribution objects. */
export function socialRecord(id:string){const record=getRecord(id);return record?.kind==='notebook'&&isListed(record)?record:undefined;}
export const socialClaim=(record:PublicationRecord)=>record.dek;
export const socialState=(record:PublicationRecord)=>`${record.publication.toUpperCase()} · V${record.version} · ${record.publication==='published'?'PUBLISHED '+record.published:'RECORDED '+record.created}`;
export const socialUrl=(record:PublicationRecord)=>`${SITE}${recordPath(record)}`;
export const socialImage=(record:PublicationRecord)=>`${SITE}/api/social/${record.id}?v=${createHash('sha256').update(JSON.stringify([record.title,socialClaim(record),socialState(record)])).digest('hex').slice(0,12)}`;
const segmenter=new Intl.Segmenter('en',{granularity:'sentence'});
const sentences=(text:string)=>Array.from(segmenter.segment(text),s=>s.segment.trim()).filter(Boolean);
const words=(text:string)=>text.trim().split(/\s+/).filter(Boolean).length;
/** Excerpts preserve the record's wording. They are reviewable drafts, never auto-posted. */
export function distributionDrafts(record:PublicationRecord){
 const claim=socialClaim(record),url=socialUrl(record),state=socialState(record);
 const passages=[record.abstract,...record.body.flatMap(act=>act.kind==='observation'?[act.text]:act.kind==='question'&&act.detail?[act.detail]:act.kind==='refusal'?[act.principle]:[])];
 let linkedin=record.share?.linkedin?.trim()||claim;
 if(!record.share?.linkedin){
  const seen=new Set([claim]);
  for(const passage of passages){
   let excerpt='';
   for(const sentence of sentences(passage)){
    if(seen.has(sentence))continue;
    if(words(`${linkedin} ${excerpt} ${sentence} ${state} ${url}`)>290)break;
    excerpt+=`${excerpt?' ':''}${sentence}`;seen.add(sentence);
   }
   if(excerpt)linkedin+=`\n\n${excerpt}`;
   if(words(linkedin)>=220)break;
  }
  linkedin+=`\n\n${state}`;
 }
 linkedin+=`\n\n${url}`;
 const candidates=passages.flatMap(sentences).filter(t=>[...t].length<=205);
 const thread=[`${claim}\n\nWorking note · v${record.version}.`];
 for(const sentence of candidates){if(!thread.some(t=>t.includes(sentence))&&sentence!==claim)thread.push(sentence);if(thread.length===4)break;}
 thread.push(`${state}\nRead the complete record, evidence and scope:\n${url}`);
 return {id:record.id,version:record.version,state:record.publication,canonical_url:url,image_url:socialImage(record),proposition:claim,
  linkedin,linkedin_words:words(linkedin),x:`${claim}\n\n${record.publication==='draft'?'Working note · ':''}v${record.version}.\n${url}`,x_thread:thread,
  note:'Extracted from the canonical record. Review the argument and scope before posting. Short records produce shorter drafts; no claims are invented to fill a word target.'};
}
