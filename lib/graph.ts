import { HOUSE, HOUSE_WORK, HOUSE_PARTS, HOUSE_ABSTRACT } from "./house.ts";
import { ibmAppearances, firstEpisodeSource, panelistIntroduction } from "./ibm-appearances.ts";
import { records, recordPath, SITE } from "./records.ts";
import { allVideos, ibm, transcriptFor, videoPath, videoConcepts, videoWork, videoRetrievedAt, youtube } from "./youtube.ts";
import { recordActs } from "./record-knowledge.ts";
import type { PublicationRecord, Status } from "./types.ts";

export type GraphScope = "all" | "records" | "films" | "concepts";
export type GraphNode = {
 id: string; kind: string; title: string; url: string; text?: string; sourceUrl?: string;
 basis?: string; retrievable?: boolean; keywords?: string; scope?: Exclude<GraphScope,"all">;
 publication?: PublicationRecord["publication"]; status?: Status; version?: string;
 authors?: string[]; created?: string; published?: string; retrievedAt?: string;
 recordId?: string; actKind?: string; start?: number; end?: number; transcription?: string;
 sourceHash?: string; panelist?: object;
};
export type GraphEdge = { from: string; to: string; kind: string; basis: string };
export type SearchResult = {
 id: string; title: string; url: string; sourceUrl: string; basis: string; text: string; score: number;
 start?: number; kind: string; actKind?: string; publication?: PublicationRecord["publication"];
 status?: Status; version?: string; recordId?: string;
 related: { title: string; url: string; basis: string }[];
};
const catalogueText = () => `Browse all ${records.length} records in the catalogue: systems, questions, notebook entries and films. ${records.filter(r=>r.publication==="catalogued").length} source-attributed films and ${records.filter(r=>r.publication==="draft").length} editorial drafts. Filter by kind or search a title, record ID, idea or author. Drafts retain their status; dates and citations identify the original source where available.`;
const localUrl = (url: string) => url.startsWith(`${SITE}/`) ? url.slice(SITE.length) : url;
const panelistText = `${panelistIntroduction} At least ${ibmAppearances.verifiedCount} confirmed appearances as of ${ibmAppearances.asOf.slice(0,10)}; some credits are incomplete.`;

/** One corpus for both the public graph and Ask. Membership is not publication. */
function buildGraph() {
 const nodes: GraphNode[] = [
  {id:"PERSON-CHRIS",kind:"person",title:HOUSE.name,text:HOUSE.description,url:`${SITE}/about`},
  {id:HOUSE.id,kind:"practice",title:`${HOUSE.name} / ${HOUSE.descriptor}`,text:HOUSE_ABSTRACT,url:`${SITE}${HOUSE.sourcePath}`,sourceUrl:`${SITE}${HOUSE.sourcePath}`,basis:"author-description",retrievable:true,keywords:"practice identity philosophy research house ideas systems objects relation relationship relate connect connected"},
  ...HOUSE_PARTS.map(p=>({id:`HOUSE-${p.id.toUpperCase()}`,kind:"practice-area",title:p.name,text:p.text,url:`${SITE}${p.path}`,sourceUrl:`${SITE}${HOUSE.sourcePath}`,basis:"author-description",retrievable:true})),
  {id:"CATALOGUE-RECORD",kind:"collection",title:"The record — Chris Hay",text:catalogueText(),url:`${SITE}/record`,sourceUrl:`${SITE}/record`,retrievable:true,basis:"catalogue-index"},
  {id:"CHANNEL-YOUTUBE",kind:"collection",title:"Chris Hay on YouTube",url:youtube.channelUrl},
  {id:"ORG-IBM",kind:"organization",title:"IBM",url:"https://www.ibm.com/"},
  {id:"COLLECTION-MOE",kind:"collection",title:"Chris Hay · Mixture of Experts",url:`${SITE}/film/mixture-of-experts#panelist`,sourceUrl:`${SITE}/film/mixture-of-experts#appearance-record`,text:panelistText,basis:"verified-appearance-register",retrievable:true,scope:"films",keywords:"How many episodes appearances first episode start joined since IBM Mixture of Experts",panelist:{id:"PERSON-CHRIS",role:"Regular panelist",since:ibmAppearances.firstEpisode.published,minimumConfirmedAppearances:ibmAppearances.verifiedCount,countAsOf:ibmAppearances.asOf,firstEpisodeSource,appearanceSources:ibmAppearances.appearances.map(r=>r.sourceUrl)}}
 ];
 const edges: GraphEdge[] = [];
 const addEdge = (from:string,to:string,kind:string,basis:string) => edges.push({from,to,kind,basis});
 for (const r of records) {
  const url = `${SITE}${recordPath(r)}`;
  const basis = r.publication === "draft" ? "draft-record" : "published-record";
  nodes.push({id:r.id,kind:r.kind,title:r.title,text:r.abstract,url,sourceUrl:url,basis,retrievable:true,scope:r.youtubeId?"films":"records",publication:r.publication,status:r.status,version:r.version,authors:r.authors,created:r.created,published:r.published,keywords:r.concepts.join(" "),recordId:r.id});
  addEdge(r.id,"CATALOGUE-RECORD","catalogued-in","record-index");
  addEdge(r.id,r.authors.includes("IBM")?"ORG-IBM":"PERSON-CHRIS","created-by",r.youtubeId?"source-metadata":"editorial");
  for(const c of r.concepts)addEdge(r.id,`CONCEPT-${c}`,"about",r.youtubeId?"metadata-inferred":"editorial");
  for(const id of r.related)addEdge(r.id,id,"related",r.youtubeId?"metadata-inferred":"editorial");
  if(!r.youtubeId) {
   for(const act of recordActs(r)) {
    nodes.push({id:act.id,kind:"act",actKind:act.kind,title:`${r.title} / ${act.kind}`,text:act.text,url:`${url}#${act.anchor}`,sourceUrl:`${url}#${act.anchor}`,basis,retrievable:true,scope:"records",publication:r.publication,status:act.status||r.status,version:r.version,authors:r.authors,recordId:r.id,keywords:`${r.title} ${r.concepts.join(" ")}`});
    addEdge(act.id,r.id,"act-of","authored-composition");
   }
   r.body.forEach((act,index)=>{
    if(act.kind==="film"&&"youtubeId" in act) addEdge(`${r.id}@${r.version}:act-${index+1}`,`YT-${act.youtubeId}`,"discusses-film","editorial");
   });
  }
  // A reference records what the page cites. It does not ingest the linked document.
  r.sources.forEach((source,index)=>{
   const id=`${r.id}@${r.version}:source-${index+1}`;
   nodes.push({id,kind:"source",title:source.title,text:source.note,url:source.url||`${url}#source-${index+1}`,sourceUrl:`${url}${r.youtubeId?"#source-record":`#source-${index+1}`}`,basis:"source-reference",retrievable:false,recordId:r.id});
   addEdge(r.id,id,"cites-source",r.youtubeId?"source-metadata":"editorial");
  });
 }
 addEdge(HOUSE.id,"PERSON-CHRIS","authored-by","author-description");
 for(const p of HOUSE_PARTS)addEdge(`HOUSE-${p.id.toUpperCase()}`,HOUSE.id,"part-of","author-description");
 for(const w of HOUSE_WORK)addEdge(w.id,"HOUSE-SYSTEMS","work-of","author-description");
 addEdge("CHANNEL-YOUTUBE","HOUSE-OBJECTS","publishes-work-of","author-description");
 for(const r of records.filter(r=>r.kind==="question"||r.kind==="notebook"))addEdge(r.id,"HOUSE-IDEAS","work-of","author-description");
 for(const v of allVideos) {
  const node=nodes.find(n=>n.id===v.id)!;
  Object.assign(node,{text:v.description||v.title,sourceUrl:v.url,basis:v.description?"title-and-description":"title-only",keywords:`${videoConcepts(v).join(" ")} ${videoWork(v).join(" ")}`,retrievedAt:videoRetrievedAt(v),sourceHash:v.sourceHash});
  if(v.producer!=="IBM")addEdge(v.id,"HOUSE-OBJECTS","work-of","source-metadata");
  addEdge(v.id,v.producer==="IBM"?"COLLECTION-MOE":"CHANNEL-YOUTUBE","part-of","source-metadata");
  if(v.participants?.includes("Chris Hay"))addEdge(v.id,"PERSON-CHRIS","features","source-participant-credit");
  for(const chapter of v.chapters) {
   const start=chapter.start;const id=`${v.id}:chapter@${start}`;
   nodes.push({id,kind:"chapter",title:`${v.title} / ${chapter.title}`,text:chapter.title,url:`${SITE}${videoPath(v)}?t=${Math.floor(start)}`,sourceUrl:`${v.url}&t=${Math.floor(start)}`,basis:"source-chapter",retrievable:true,scope:"films",publication:"catalogued",start,recordId:v.id,authors:node.authors,keywords:`${v.title} ${videoConcepts(v).join(" ")}`});
   addEdge(id,v.id,"chapter-of","source-metadata");
  }
  for(const p of transcriptFor(v.youtubeId)?.passages||[]) {
   const id=`${v.id}@${p.start}`;
   nodes.push({id,kind:"passage",title:v.title,text:p.text,start:p.start,end:p.end,url:`${SITE}${videoPath(v)}?t=${Math.floor(p.start)}`,sourceUrl:`${v.url}&t=${Math.floor(p.start)}`,transcription:"automatic-unreviewed",basis:"automatic-caption",retrievable:true,scope:"films",publication:"catalogued",recordId:v.id,authors:node.authors});
   addEdge(id,v.id,"passage-of","automatic-captions");
  }
 }
 const concepts=[...new Set(records.flatMap(r=>r.concepts))].sort();
 for(const concept of concepts) {
  const related=records.filter(r=>r.concepts.includes(concept));const title=concept.replaceAll("-"," ");
  nodes.push({id:`CONCEPT-${concept}`,kind:"concept",title,text:`${related.length} records tagged ${title}. These are discovery associations from editorial tags or film metadata, not evidence that the records agree.`,url:`${SITE}/knowledge#concept-${concept}`,sourceUrl:`${SITE}/knowledge#concept-${concept}`,basis:"record-associations",retrievable:true,scope:"concepts",keywords:concept});
 }
 const count=(kind:string)=>nodes.filter(n=>n.kind===kind).length;
 return {version:"1.1",retrievedAt:[youtube.retrievedAt,ibm.retrievedAt].sort().at(-1),coverage:{records:records.length,films:allVideos.length,transcripts:allVideos.filter(v=>transcriptFor(v.youtubeId)).length,systems:count("work"),notebook:count("notebook"),questions:count("question"),editorialDrafts:records.filter(r=>r.publication==="draft").length,acts:count("act"),chapters:count("chapter"),passages:count("passage"),concepts:concepts.length,sourceReferences:count("source"),nodes:nodes.length,relationships:edges.length},nodes,edges};
}
const graph=buildGraph();
export function recordGraph(){return graph;}
const byId=new Map(graph.nodes.map(n=>[n.id,n]));
const stop=new Set(["a","an","the","what","why","how","does","do","is","are","i","me","show","chris","hay","about","in","of","to","and","has","he","said","have","with","as","on","for","call","calls","his","was","when","been","did","it"]);
const normalize=(s:string)=>s.toLowerCase().replace(/[^a-z0-9]+/g," ").split(/\s+/).map(t=>t.length>4&&t.endsWith("s")?t.slice(0,-1):t).join(" ");
export function searchGraph(query:string, options:{scope?:GraphScope;includeDrafts?:boolean}={}) {
 const terms=[...new Set(normalize(query.slice(0,500)).split(/\s+/).filter(t=>t&&!stop.has(t)))].slice(0,16);
 if(!terms.length)return [];
 const results:SearchResult[]=[];
 for(const n of graph.nodes) {
  if(!n.retrievable||!n.text||!n.sourceUrl)continue;
  if(options.scope&&options.scope!=="all"&&n.scope!==options.scope)continue;
  if(options.includeDrafts===false&&n.publication==="draft")continue;
  const title=normalize(n.title);const body=normalize(n.text);const searchable=normalize(`${n.title} ${n.text} ${n.keywords||""} ${n.id}`);
  if(!terms.every(t=>searchable.includes(t)))continue;
  // Chapter hits need a match in their own title; a parent title alone is not a chapter match.
  if(n.kind==="chapter"&&!terms.some(t=>body.includes(t)))continue;
  let score=terms.reduce((s,t)=>s+(body.includes(t)?3:1)+(title.includes(t)?2:0),0);
  if(normalize(n.id)===normalize(query)||title===normalize(query))score+=100;
  if(n.kind==="act"||n.kind==="passage")score+=4;
  if(n.basis==="verified-appearance-register")score+=terms.length*4;
  if(n.basis==="author-description")score-=1;
  const relations=graph.edges.filter(e=>(e.from===(n.recordId||n.id)&&e.kind==="related") || (n.kind==="concept"&&e.to===n.id&&e.kind==="about"));
  const related=relations.map(e=>({node:byId.get(n.kind==="concept"?e.from:e.to),basis:e.basis})).filter(x=>x.node&&(options.includeDrafts!==false||x.node.publication!=="draft")).slice(0,4).map(({node,basis})=>({title:node!.title,url:localUrl(node!.url),basis}));
  const excerpt=n.basis==="title-and-description" ? n.text.split(/\n\s*\n/).sort((a,b)=>terms.filter(t=>normalize(b).includes(t)).length-terms.filter(t=>normalize(a).includes(t)).length)[0] : n.text;
  results.push({id:n.id,title:n.title,url:localUrl(n.url),sourceUrl:n.sourceUrl,basis:n.basis!,text:excerpt,score,start:n.start,kind:n.kind,actKind:n.actKind,publication:n.publication,status:n.status,version:n.version,recordId:n.recordId,related});
 }
 const perRecord=new Map<string,number>();
 return results.sort((a,b)=>b.score-a.score).filter(result=>{
  const group=result.recordId||result.id;const count=perRecord.get(group)||0;
  if(count>=2)return false;perRecord.set(group,count+1);return true;
 }).slice(0,20);
}
