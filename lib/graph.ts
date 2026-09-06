import {HOUSE, HOUSE_WORK, HOUSE_PARTS, HOUSE_ABSTRACT} from "./house.ts";
import {ibmAppearances,firstEpisodeSource,panelistIntroduction} from "./ibm-appearances.ts";
import {records,indexedRecords,recordPath,SITE} from "./records.ts";
import {allVideos,ibm,transcriptFor,videoPath,videoConcepts,videoWork,youtube} from "./youtube.ts";
const catalogueText = () => `Browse all ${records.length} records in the catalogue: systems, questions, notebook entries and films. ${records.filter(r=>r.publication==="catalogued").length} source-attributed films and ${records.filter(r=>r.publication==="draft").length} editorial drafts. Filter by kind or search a title, record ID, idea or author. Drafts retain their status; dates and citations identify the original source where available.`;
export function recordGraph(){
 const indexed=indexedRecords();
 const concepts=[...new Set(records.flatMap(r=>r.concepts))].sort();
 const nodes:object[]=[{id:"PERSON-CHRIS",kind:"person",title:HOUSE.name,description:HOUSE.description,url:`${SITE}/about`},{id:HOUSE.id,kind:"practice",title:`${HOUSE.name} / ${HOUSE.descriptor}`,text:HOUSE_ABSTRACT,url:`${SITE}${HOUSE.sourcePath}`,sourceUrl:`${SITE}${HOUSE.sourcePath}`,basis:"author-description",retrievable:true},...HOUSE_PARTS.map(p=>({id:`HOUSE-${p.id.toUpperCase()}`,kind:"practice-area",title:p.name,text:p.text,url:`${SITE}${p.path}`})),{id:"CATALOGUE-RECORD",kind:"collection",title:"The record",text:catalogueText(),url:`${SITE}/record`,retrievable:true,basis:"catalogue-index"},{id:"CHANNEL-YOUTUBE",kind:"collection",url:youtube.channelUrl},{id:"ORG-IBM",kind:"organization",title:"IBM"},{id:"COLLECTION-MOE",kind:"collection",title:"Mixture of Experts",url:ibm.playlistUrl,panelist:{id:"PERSON-CHRIS",role:"Regular panelist",since:ibmAppearances.firstEpisode.published,minimumConfirmedAppearances:ibmAppearances.verifiedCount,countAsOf:ibmAppearances.asOf,firstEpisodeSource,appearanceSources:ibmAppearances.appearances.map(r=>r.sourceUrl)}},
 ...records.map(r=>({id:r.id,kind:r.kind,title:r.title,url:`${SITE}${recordPath(r)}`,publication:r.publication,retrievable:indexed.some(i=>i.id===r.id)})),
 ...concepts.map(id=>({id:`CONCEPT-${id}`,kind:"concept",title:id.replaceAll("-"," ")}))];
 const edges:object[]=records.flatMap(r=>[{from:r.id,to:"CATALOGUE-RECORD",kind:"catalogued-in",basis:"record-index"},{from:r.id,to:r.authors.includes("IBM")?"ORG-IBM":"PERSON-CHRIS",kind:"created-by",basis:r.youtubeId?"source-metadata":"editorial"},...r.concepts.map(c=>({from:r.id,to:`CONCEPT-${c}`,kind:"about",basis:r.youtubeId?"metadata-inferred":"editorial"})),...r.related.map(id=>({from:r.id,to:id,kind:"related",basis:r.youtubeId?"metadata-inferred":"editorial"}))]);
 edges.push({from:HOUSE.id,to:"PERSON-CHRIS",kind:"authored-by",basis:"author-description"},...HOUSE_PARTS.map(p=>({from:`HOUSE-${p.id.toUpperCase()}`,to:HOUSE.id,kind:"part-of",basis:"author-description"})),...HOUSE_WORK.map(w=>({from:w.id,to:"HOUSE-SYSTEMS",kind:"work-of",basis:"author-description"})),{from:"CHANNEL-YOUTUBE",to:"HOUSE-OBJECTS",kind:"publishes-work-of",basis:"author-description"});
 for(const r of records.filter(r=>r.kind==="question"||r.kind==="notebook")) edges.push({from:r.id,to:"HOUSE-IDEAS",kind:"work-of",basis:"author-description"});
 for(const v of allVideos){if(v.producer!=="IBM")edges.push({from:v.id,to:"HOUSE-OBJECTS",kind:"work-of",basis:"source-metadata"});edges.push({from:v.id,to:v.producer === "IBM"?"COLLECTION-MOE":"CHANNEL-YOUTUBE",kind:"part-of",basis:"source-metadata"});
 if(v.participants?.includes("Chris Hay"))edges.push({from:v.id,to:"PERSON-CHRIS",kind:"features",basis:"source-participant-credit"});
 for(const p of transcriptFor(v.youtubeId)?.passages||[]){const id=`${v.id}@${p.start}`;nodes.push({id,kind:"passage",text:p.text,start:p.start,end:p.end,url:`${v.url}&t=${Math.floor(p.start)}`,transcription:"automatic-unreviewed"});edges.push({from:id,to:v.id,kind:"passage-of",basis:"automatic-captions"});}}
 return {version:"1.0",retrievedAt:[youtube.retrievedAt,ibm.retrievedAt].sort().at(-1),coverage:{films:allVideos.length,transcripts:allVideos.filter(v=>transcriptFor(v.youtubeId)).length},nodes,edges};
}
const stop=new Set(["a","an","the","what","why","how","does","do","is","are","i","me","show","chris","hay","about","in","of","to","and","has","he","said","have","with","as","on","for","call","calls","his","was","when","been","did","it"]);
const normalize=(s:string)=>s.toLowerCase().replace(/[^a-z0-9]+/g," ").split(/\s+/).map(t=>t.length>4&&t.endsWith("s")?t.slice(0,-1):t).join(" ");
export function searchGraph(query:string){
 const terms=[...new Set(normalize(query).split(/\s+/).filter(t=>t&&!stop.has(t)))].slice(0,16);
 if(!terms.length)return [];
 const results: {id:string;title:string;url:string;sourceUrl:string;basis:string;text:string;score:number;start?:number}[]=[];
 const catalogueSearch=normalize(catalogueText());
 if(terms.every(t=>catalogueSearch.includes(t)))results.push({id:"CATALOGUE-RECORD",title:"The record — Chris Hay",url:"/record",sourceUrl:`${SITE}/record`,basis:"catalogue-index",text:catalogueText(),score:terms.length*2});
 const profileSearch=normalize(`${HOUSE_ABSTRACT} practice identity philosophy research house ideas systems objects relation relationship relate connect connected`);
 if(terms.every(t=>profileSearch.includes(t)))results.push({id:HOUSE.id,title:`${HOUSE.name} / ${HOUSE.descriptor}`,url:HOUSE.sourcePath,sourceUrl:`${SITE}${HOUSE.sourcePath}`,basis:"author-description",text:HOUSE_ABSTRACT,score:terms.length*2});
 const panelistText=`${panelistIntroduction} At least ${ibmAppearances.verifiedCount} confirmed appearances as of ${ibmAppearances.asOf.slice(0,10)}; some credits are incomplete.`;
 const panelistSearch=normalize(`${panelistText} How many episodes appearances first episode start joined since IBM Mixture of Experts`);
 if(terms.every(t=>panelistSearch.includes(t)))results.push({id:"COLLECTION-MOE",title:"Chris Hay · Mixture of Experts",url:"/film/mixture-of-experts#panelist",sourceUrl:"/film/mixture-of-experts#appearance-record",basis:"verified-appearance-register",text:panelistText,score:terms.length*4});
 for(const r of indexedRecords().filter(r=>!r.youtubeId)){
  const text=`${r.title} ${r.abstract}`;
  if(terms.every(t=>normalize(text).includes(t)))results.push({id:r.id,title:r.title,url:recordPath(r),sourceUrl:`${SITE}${recordPath(r)}`,basis:"published-record",text:r.abstract,score:terms.length*2});
 }
 for(const v of allVideos){
 const title=normalize(v.title);const meta=normalize(`${title} ${v.description} ${videoConcepts(v).join(" ").replaceAll("-"," ")} ${videoWork(v).join(" ")} ${v.chapters.map(c=>c.title).join(" ")}`);
 const passages=transcriptFor(v.youtubeId)?.passages||[];
 const matches=passages.map(p=>({p,score:terms.filter(t=>normalize(p.text).includes(t)).length})).filter(m=>m.score===terms.length).sort((a,b)=>b.score-a.score).slice(0,2);
 for(const{p,score}of matches)results.push({id:`${v.id}@${p.start}`,title:v.title,url:`${videoPath(v)}?t=${Math.floor(p.start)}`,sourceUrl:`${v.url}&t=${Math.floor(p.start)}`,basis:"automatic-caption",text:p.text,score:score*4,start:p.start});
 if(terms.every(t=>meta.includes(t)))results.push({id:v.id,title:v.title,url:videoPath(v),sourceUrl:v.url,basis:v.description?"title-and-description":"title-only",text:v.description.split("\n\n")[0]||v.title,score:terms.reduce((n,t)=>n+(title.includes(t)?3:1),0)});
 }
 return results.sort((a,b)=>b.score-a.score).slice(0,20);
}
