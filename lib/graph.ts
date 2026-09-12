import { HOUSE, HOUSE_WORK, HOUSE_PARTS, HOUSE_ABSTRACT } from "./house.ts";
import { discoveryTerms, legibilityGraphFields } from "./legibility.ts";
import { publicationHistory } from "./provenance.ts";
import { ibmAppearances, firstEpisodeSource, panelistIntroduction } from "./ibm-appearances.ts";
import { records, recordPath, SITE } from "./records.ts";
import { allVideos, ibm, transcriptFor, videoPath, videoConcepts, videoWork, videoRetrievedAt, youtube } from "./youtube.ts";
import { recordActs } from "./record-knowledge.ts";
import { threads, memoryStudy, demoStudies } from "./threads.ts";
import type { PublicationRecord, Status } from "./types.ts";

export type GraphScope = "all" | "records" | "films" | "concepts";
export type GraphNode = {
 id: string; kind: string; title: string; url: string; text?: string; sourceUrl?: string;
 subject?: string; question?: string; searchTitle?: string; searchDescription?: string; searchProjection?: "editorial" | "projected";
 basis?: string; retrievable?: boolean; keywords?: string; scope?: Exclude<GraphScope,"all">;
 publication?: PublicationRecord["publication"]; status?: Status; version?: string;
 authors?: string[]; created?: string; published?: string; retrievedAt?: string;
 recordId?: string; actKind?: string; start?: number; end?: number; transcription?: string;
 sourceHash?: string; panelist?: object; members?: { id: string; position: number; reason: string; start?: number }[];
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
  nodes.push({id:r.id,kind:r.kind,title:r.title,text:r.abstract,url,sourceUrl:url,basis,retrievable:true,scope:r.youtubeId?"films":"records",publication:r.publication,status:r.status,version:r.version,authors:r.authors,created:r.created,published:r.published,keywords:`${r.concepts.join(" ")} ${discoveryTerms(r.id)}`,recordId:r.id,...legibilityGraphFields(r.id)});
  addEdge(r.id,"CATALOGUE-RECORD","catalogued-in","record-index");
  const history = publicationHistory(r.id);
  if (history?.versions.length) {
   const historyId = `${r.id}:history`;
   nodes.push({ id: historyId, kind: "publication-history", title: `${r.title} / publication history`, text: history.versions.map(entry => `Version ${entry.version}, ${entry.revised || entry.published}. ${entry.revision?.summary || ""} Scientific status: ${entry.scientificStatus || "not recorded"}.`).join(" "), url: `${url}#versions`, sourceUrl: `${url}#versions`, basis: "publication-history", retrievable: true, scope: "records", publication: r.publication, recordId: r.id, keywords: "provenance citation revision version history" });
   addEdge(r.id, historyId, "has-history", "preserved-publication");
   history.versions.forEach((entry, index) => {
    const id = `${r.id}@${entry.version}`;
    nodes.push({ id, kind: "publication-version", title: `${r.title} / v${entry.version}`, url: entry.url, sourceUrl: entry.manuscript, sourceHash: entry.hash, publication: entry.publication, status: entry.scientificStatus, version: entry.version, recordId: r.id, basis: "preserved-manuscript", retrievable: false });
    addEdge(historyId, id, "includes-version", "preserved-publication");
    for (const reference of entry.supersedes || []) addEdge(id, `${reference.id}@${reference.version}`, "supersedes", reference.reason);
    if (index) addEdge(id, `${r.id}@${history.versions[index - 1].version}`, "revises", entry.revision?.kind || "publication-history");
    entry.sources.forEach((source, sourceIndex) => {
     const evidenceId = `${id}:evidence-${sourceIndex + 1}`;
     const preserved = "preserved" in source ? source.preserved : undefined;
     nodes.push({ id: evidenceId, kind: preserved ? "artifact" : "source", title: source.title, text: source.note, url: preserved ? `${SITE}${preserved.url}` : source.url || `${entry.url}#source-${sourceIndex + 1}`, sourceUrl: `${entry.url}#source-${sourceIndex + 1}`, sourceHash: preserved?.sha256, recordId: r.id, basis: preserved ? "preserved-artifact" : "source-reference", retrievable: false });
     addEdge(id, evidenceId, "cites-source", preserved ? "preserved-artifact" : "source-reference");
    });
   });
  }
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
 for(const study of demoStudies.filter(s=>s.visibility!=="unlisted")) nodes.push({id:study.id,kind:"interactive-study",title:study.title,text:study.text,url:`${SITE}${study.url}`,sourceUrl:`${SITE}${study.url}`,basis:study.id===memoryStudy.id?"constructed-example":"recorded-arms",retrievable:true,scope:"records",publication:"draft",authors:["Chris Hay"]});
 for (const thread of threads) {
  nodes.push({id:thread.id,kind:"thread",title:thread.title,text:[thread.abstract,thread.context,...thread.steps.map(s=>`${s.label}. ${s.text}`)].join(" "),url:`${SITE}${thread.path}`,sourceUrl:`${SITE}${thread.path}`,basis:"curated-thread",retrievable:true,scope:"records",publication:"draft",version:thread.version,created:thread.created,authors:["Chris Hay"],...legibilityGraphFields(thread.id),keywords:[discoveryTerms(thread.id),thread.slug,thread.title,...thread.steps.flatMap(step=>[step.label,...(records.find(record=>record.id===step.id)?.concepts||[])])].join(" "),members:thread.steps.map((step,index)=>({id:step.id,position:index+1,reason:step.text,start:step.start}))});
  for (const step of thread.steps) {
   addEdge(thread.id,step.id,"includes","editorial-reading-order");
   addEdge(step.id,thread.id,"in-thread","editorial-reading-order");
  }
 }
 const count=(kind:string)=>nodes.filter(n=>n.kind===kind).length;
 return {version:"1.2",retrievedAt:[youtube.retrievedAt,ibm.retrievedAt].sort().at(-1),coverage:{records:records.length,films:allVideos.length,transcripts:allVideos.filter(v=>transcriptFor(v.youtubeId)).length,systems:count("work"),notebook:count("notebook"),questions:count("question"),threads:count("thread"),editorialDrafts:records.filter(r=>r.publication==="draft").length,acts:count("act"),chapters:count("chapter"),passages:count("passage"),concepts:concepts.length,sourceReferences:count("source"),nodes:nodes.length,relationships:edges.length},nodes,edges};
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
  const relations=graph.edges.filter(e=>(e.from===(n.recordId||n.id)&&["related","in-thread",...(n.kind==="thread"?["includes"]:[])].includes(e.kind)) || (n.kind==="concept"&&e.to===n.id&&e.kind==="about")).sort((a,b)=>Number(b.kind==="in-thread")-Number(a.kind==="in-thread"));
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


/**
 * ONE RETRIEVAL PATH, FOR BOTH SURFACES.
 *
 * /api/search and /api/machines/ask both answer questions about this
 * corpus, and for as long as they had separate query handling they
 * disagreed about it. Search required every term to appear in one
 * record and offered no fallback, so `llms.txt` returned nothing while
 * ask returned five. Three separate blind visitors reported some form
 * of this; one found the site's own primary evidence only by noticing a
 * path in a telemetry dump.
 *
 * That is the pattern this codebase already has a name for: a contract
 * existing twice with no parity assertion between the copies. So the
 * copies are gone. Both surfaces call this, and a test asserts they
 * agree rather than trusting that they do.
 *
 * THE RANKING RULE, and why the obvious one was wrong. When no record
 * holds the whole question, the results are a union over the terms that
 * individually find something — and the first version sorted that union
 * by each record's own score. That let a node matching ONE common word
 * outrank a node matching three, because scores are computed per record
 * and say nothing about how much of the question was answered. A
 * visitor put it exactly right: it "dropped every distinctive term and
 * returned unrelated records".
 *
 * A term that matches few records says more about a question than one
 * that matches many, so coverage is weighted by inverse frequency and
 * decides the order; a record's own score only breaks ties. `usedTerms`
 * is null when nothing was narrowed, [] when nothing of the question
 * survived, and otherwise the words this CORPUS contains — which are
 * the site's own words, not the caller's, so reporting them echoes
 * nothing back.
 */
/**
 * Words that say nothing about THIS corpus.
 *
 * Deliberately an explicit list rather than a frequency threshold. A
 * derived ceiling was tried and failed in a way worth recording: this
 * corpus is small, so its commonest words were already stopwords, and
 * the threshold began discarding MEANINGFUL terms instead. Duller and
 * correct beats clever and wrong.
 *
 * It lived in lib/machine/ask.ts until retrieval was unified here. It
 * is exported so that file can keep using it without owning a copy.
 */
export const NOISE = new Set([
 "a", "about", "all", "an", "and", "any", "are", "as", "at", "be", "been", "but", "by",
 "can", "could", "did", "do", "does", "for", "from", "had", "has", "have", "here", "how",
 "i", "if", "in", "into", "is", "it", "its", "just", "many", "may", "me", "much", "my",
 "no", "not", "of", "on", "or", "our", "out", "över", "please", "should", "so", "some",
 "supports", "tell", "than", "that", "the", "their", "them", "then", "there", "these",
 "they", "this", "to", "us", "was", "we", "were", "what", "when", "where", "which", "who",
 "why", "will", "with", "would", "you", "your",
 // Indefinite pronouns. They are ordinary English, they appear all over
 // authored prose, and they say nothing about what is being asked for.
 "anybody", "anyone", "anything", "everybody", "everyone", "everything",
 "nobody", "nothing", "somebody", "someone", "something", "thing", "things",
]);

export function retrieveGraph(
 question: string,
 options: { scope?: GraphScope; includeDrafts?: boolean } = {},
): { results: SearchResult[]; usedTerms: string[] | null } {
 const asked = searchGraph(question, options);
 if (asked.length) return { results: asked, usedTerms: null };

 // Answering noise with confident-looking sources is a worse failure than
 // answering nothing: "zzz nothing at all here" once found records on the
 // strength of "all" and "here".
 const words = [...new Set(question.toLowerCase().split(/[^\p{L}\p{N}-]+/u)
  .filter(word => word.length > 2 && !NOISE.has(word) && !stop.has(word)))].slice(0, 16);

 const found = new Map<string, SearchResult[]>();
 for (const word of words) found.set(word, searchGraph(word, options));
 const productive = words.filter(word => found.get(word)!.length > 0);
 if (!productive.length) return { results: [], usedTerms: [] };

 const narrowed = searchGraph(productive.join(" "), options);
 if (narrowed.length) return { results: narrowed, usedTerms: productive };

 // Each term finds something; no record holds them all. Rank by how much
 // of the question a record answers, rarer terms counting for more.
 const weight = (term: string) => 1 / Math.log2(2 + found.get(term)!.length);
 const merged = new Map<string, { result: SearchResult; covered: number }>();
 for (const term of productive) {
  for (const result of found.get(term)!) {
   const entry = merged.get(result.id) ?? { result, covered: 0 };
   entry.covered += weight(term);
   merged.set(result.id, entry);
  }
 }
 return {
  results: [...merged.values()]
   .sort((a, b) => (b.covered - a.covered) || (b.result.score - a.result.score))
   .map(entry => entry.result),
  usedTerms: productive,
 };
}
