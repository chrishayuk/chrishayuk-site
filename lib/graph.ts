import {records,indexedRecords,recordPath,SITE} from "./records.ts";
import {channelVideos,transcriptFor,videoPath,videoConcepts,videoWork,youtube} from "./youtube.ts";
export function recordGraph(){
 const indexed=indexedRecords();
 const concepts=[...new Set(records.flatMap(r=>r.concepts))].sort();
 const nodes:object[]=[{id:"PERSON-CHRIS",kind:"person",title:"Chris Hay"},{id:"CHANNEL-YOUTUBE",kind:"collection",url:youtube.channelUrl},
 ...records.map(r=>({id:r.id,kind:r.kind,title:r.title,url:`${SITE}${recordPath(r)}`,publication:r.publication,retrievable:indexed.some(i=>i.id===r.id)})),
 ...concepts.map(id=>({id:`CONCEPT-${id}`,kind:"concept",title:id.replaceAll("-"," ")}))];
 const edges:object[]=records.flatMap(r=>[{from:r.id,to:"PERSON-CHRIS",kind:"created-by",basis:r.youtubeId?"source-metadata":"editorial"},...r.concepts.map(c=>({from:r.id,to:`CONCEPT-${c}`,kind:"about",basis:r.youtubeId?"metadata-inferred":"editorial"})),...r.related.map(id=>({from:r.id,to:id,kind:"related",basis:r.youtubeId?"metadata-inferred":"editorial"}))]);
 for(const v of channelVideos){edges.push({from:v.id,to:"CHANNEL-YOUTUBE",kind:"part-of",basis:"source-metadata"});
 for(const p of transcriptFor(v.youtubeId)?.passages||[]){const id=`${v.id}@${p.start}`;nodes.push({id,kind:"passage",text:p.text,start:p.start,end:p.end,url:`${v.url}&t=${Math.floor(p.start)}`,transcription:"automatic-unreviewed"});edges.push({from:id,to:v.id,kind:"passage-of",basis:"automatic-captions"});}}
 return {version:"1.0",retrievedAt:youtube.retrievedAt,coverage:{films:channelVideos.length,transcripts:channelVideos.filter(v=>transcriptFor(v.youtubeId)).length},nodes,edges};
}
const stop=new Set(["a","an","the","what","why","how","does","do","is","are","i","me","show","chris","hay","about","in","of","to","and","has","he","said","have","with","as","on","for","call","calls","his"]);
const normalize=(s:string)=>s.toLowerCase().replace(/[^a-z0-9]+/g," ").split(/\s+/).map(t=>t.length>4&&t.endsWith("s")?t.slice(0,-1):t).join(" ");
export function searchGraph(query:string){
 const terms=[...new Set(normalize(query).split(/\s+/).filter(t=>t&&!stop.has(t)))].slice(0,16);
 if(!terms.length)return [];
 const results: {id:string;title:string;url:string;sourceUrl:string;basis:string;text:string;score:number;start?:number}[]=[];
 for(const v of channelVideos){
 const title=normalize(v.title);const meta=normalize(`${title} ${v.description} ${videoConcepts(v).join(" ").replaceAll("-"," ")} ${videoWork(v).join(" ")}`);
 const passages=transcriptFor(v.youtubeId)?.passages||[];
 const matches=passages.map(p=>({p,score:terms.filter(t=>normalize(p.text).includes(t)).length})).filter(m=>m.score===terms.length).sort((a,b)=>b.score-a.score).slice(0,2);
 for(const{p,score}of matches)results.push({id:`${v.id}@${p.start}`,title:v.title,url:`${videoPath(v)}?t=${Math.floor(p.start)}`,sourceUrl:`${v.url}&t=${Math.floor(p.start)}`,basis:"automatic-caption",text:p.text,score:score*4,start:p.start});
 if(terms.every(t=>meta.includes(t)))results.push({id:v.id,title:v.title,url:videoPath(v),sourceUrl:v.url,basis:v.description?"title-and-description":"title-only",text:v.description.split("\n\n")[0]||v.title,score:terms.reduce((n,t)=>n+(title.includes(t)?3:1),0)});
 }
 return results.sort((a,b)=>b.score-a.score).slice(0,20);
}
