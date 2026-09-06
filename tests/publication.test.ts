import assert from "node:assert/strict";
import test from "node:test";
import { chooseMotion } from "../lib/motion.ts";
import { stableJson, validateRecord, escapeXml } from "../lib/publication.ts";
import { records, publishedRecords, getVersion } from "../lib/records.ts";
import { readFile } from "node:fs/promises";
import { catalogue, catalogueDate, catalogueUrl, PAGE_SIZE } from "../lib/catalogue.ts";
import { addressedMemory, readAddress } from "../lib/addressed-memory.ts";
import { filmStill, filmStills, stillPath } from "../lib/film-stills.ts";

test("every notebook passage resolves to its own real film frame without changing the playback start", async () => {
 const used = new Map<string, string>();
 for (const record of records.filter(r => ["N-MAP", "N-STATE", "N-ADDRESS"].includes(r.id))) {
  for (const act of record.body) {
   if (act.kind !== "film" || !("youtubeId" in act)) continue;
   const still = filmStill(act.youtubeId, act.start);
   assert.ok(still, `${record.id}: ${act.youtubeId}@${act.start}`);
   assert.equal(still.start, act.start);
   assert.ok(still.frameTime >= act.start);
   assert.ok((await readFile(new URL(`../public${stillPath(still)}`, import.meta.url))).length > 1000);
   used.set(`${act.youtubeId}@${act.start}`, stillPath(still));
  }
 }
 assert.equal(new Set(used.values()).size, used.size);
 assert.equal(filmStills.length, used.size);
 assert.equal(filmStill("HJlWDSyDcD4", 0), undefined);
 assert.equal(filmStill("HJlWDSyDcD4", 121), undefined);
});

test("browser FFN matches all six independently exported NumPy activations and readouts", () => {
 for (const [index, expected] of addressedMemory.referenceReads.entries()) {
  const actual = readAddress(index);
  assert.equal(actual.answer, expected.answer);
  for (const [i, value] of expected.activations.entries()) assert.ok(Math.abs(actual.activations[i] - value) < 1e-12);
  for (const [i, value] of expected.scores.entries()) assert.ok(Math.abs(actual.scores[i] - value) < 1e-12);
 }
 assert.throws(() => readAddress(-1), RangeError);
 assert.throws(() => readAddress(6), RangeError);
});

test("the map explanation retains original animations and timestamped demonstrations", () => {
 const map = records.find(r => r.id === "N-MAP")!;
 for (const media of ["notebook-map", "notebook-address"]) assert.ok(map.body.some(a => a.kind === "film" && "media" in a && a.media === media));
 for (const start of [120, 240, 420, 1170]) assert.ok(map.body.some(a => a.kind === "film" && "youtubeId" in a && a.youtubeId === "HJlWDSyDcD4" && a.start === start));
});
test("catalogue filters preserve source authorship and cover each record once across pages",()=>{
 const films=catalogue({kind:"film",q:"IBM"});assert.ok(films.total>0);assert.ok(films.entries.every(r=>r.kind==="film"));for(const r of films.entries)assert.deepEqual(r.authors,records.find(source=>source.id===r.id)!.authors);assert.ok(films.entries.some(r=>r.authors.includes("IBM")));
 assert.equal(catalogue({kind:"work"}).total,4);assert.equal(catalogue({q:"N-OPERATOR"}).entries[0].id,"N-OPERATOR");
 const all=catalogue({});const ids=Array.from({length:all.pages},(_,i)=>catalogue({page:String(i+1)}).entries).flat().map(r=>r.id);
 assert.equal(ids.length,records.length);assert.equal(new Set(ids).size,records.length);assert.equal(all.entries.length,PAGE_SIZE);
 assert.equal(catalogue({q:"no-matching-record"}).total,0);assert.equal(catalogue({page:"-2"}).page,1);assert.equal(catalogue({page:"99999"}).page,all.pages);
 assert.equal(catalogue({kind:"invalid"}).kind,"all");assert.equal(catalogueUrl("a & b","film",2),"/record?q=a+%26+b&kind=film&page=2");
});
test("catalogue never presents a retrieval timestamp as a film release date",()=>{
 const unknown=records.find(r=>r.youtubeId&&!r.published)!;assert.ok(unknown.created);assert.deepEqual(catalogueDate(unknown),{label:"RELEASE DATE",value:"NOT RECORDED"});
 const dated=records.find(r=>r.youtubeId&&r.published)!;assert.deepEqual(catalogueDate(dated),{label:"RELEASED",value:dated.published});
 const draft=records.find(r=>r.id==="N-OPERATOR")!;assert.deepEqual(catalogueDate(draft),{label:"RECORDED",value:draft.created});
});
test("motion chooses one visible owner and holds it across minor area changes",()=>{const a={id:"a",visible:.9,area:90};const b={id:"b",visible:.8,area:100};assert.equal(chooseMotion([a,b],"a",false,false),"a");assert.equal(chooseMotion([{...a,area:20},b],"a",false,false),"b");});
test("paused and hidden pages stop automatic motion; manual play is scoped",()=>{const a={id:"a",visible:1,area:500};const b={id:"b",visible:.6,area:300,manual:true};assert.equal(chooseMotion([a],"a",true,false),null);assert.equal(chooseMotion([a,b],null,true,false),"b");assert.equal(chooseMotion([a,b],"b",false,true),null);assert.equal(chooseMotion([{...b,visible:.2}],"b",true,false),null);});
test("draft records never enter public feeds or resolve to invented versions",()=>{assert.ok(records.length>=11);for(const r of publishedRecords()){assert.equal(r.publication,"published");assert.ok(r.published);}assert.equal(getVersion("N-OPERATOR","1.0"),undefined);for(const r of records)validateRecord(r);});
test("every related record and identifier resolves uniquely",()=>{assert.equal(new Set(records.map(r=>r.id)).size,records.length);assert.equal(new Set(records.map(r=>r.slug)).size,records.length);for(const r of records)for(const id of r.related)assert.ok(records.some(r=>r.id===id),`${r.id} -> ${id}`);});
test("canonical hashing ignores object key order, but preserves semantic array order",()=>{assert.equal(stableJson({b:2,a:1}),stableJson({a:1,b:2}));assert.notEqual(stableJson([1,2]),stableJson([2,1]));assert.equal(stableJson({a:undefined,b:2}),'{"b":2}');});
test("publication requires a real date and XML text cannot create markup",()=>{assert.throws(()=>validateRecord({...records[0],publication:"published",published:undefined}),/date/);assert.equal(escapeXml('<title>&"'),"&lt;title&gt;&amp;&quot;");});
test("homepage follows the edited publication sequence and excludes placeholder scenes",async()=>{
 const page=await readFile(new URL("../app/page.tsx",import.meta.url),"utf8");
 assert.deepEqual([...page.matchAll(/data-scene="([^"]+)"/g)].map(m=>m[1]),["identity","latest-youtube","latest-moe","latest-notebook","selected-films","further-notes"]);
 assert.doesNotMatch(page,/london-night|ffn-notebook|personal-architecture|personal-books|personal-journey|mcp-interaction|operator-notebook|larql-scene/);
 assert.doesNotMatch(page,/SUPPORTED.*NATURAL DEPTH|FINDING.*E25/);
});

// Retrieval must not turn metadata associations into transcript-backed assertions.
const {channelVideos,allVideos,ibm,ibmVideos,latestMoe,popularMoe,videoReferences,getVideo,filterVideos,transcriptFor}=await import("../lib/youtube.ts");
const {recordGraph,searchGraph}=await import("../lib/graph.ts");
test("threads preserve reading order, source destinations and draft filtering",async()=>{
 const {mapThread,resolveThreadStep,threadPosition,memoryStudy}=await import("../lib/threads.ts");
 const graph=recordGraph();const thread=graph.nodes.find(n=>n.id===mapThread.id)!;
 assert.equal(thread.basis,"curated-thread");assert.equal(thread.publication,"draft");
 assert.deepEqual(thread.members?.map(m=>m.id),mapThread.steps.map(s=>s.id));
 for(const step of mapThread.steps){
  const resolved=resolveThreadStep(step);assert.ok(resolved.url.startsWith("/"));
  assert.ok(graph.nodes.some(n=>n.id===step.id));
  assert.ok(graph.edges.some(e=>e.from===step.id&&e.to===thread.id&&e.kind==="in-thread"&&e.basis==="editorial-reading-order"));
 }
 assert.equal(resolveThreadStep(mapThread.steps[0]).url,"/film/youtube/HJlWDSyDcD4?t=120");
 assert.equal(threadPosition(mapThread.steps[0].id)?.previous,undefined);
 assert.equal(threadPosition(mapThread.steps.at(-1)!.id)?.next,undefined);
 assert.equal(threadPosition("N-ADDRESS")?.next?.id,memoryStudy.id);
 assert.equal(threadPosition("W-MCP"),undefined);
 assert.ok(searchGraph("map memory",{scope:"records"}).some(r=>r.id===thread.id));
 assert.ok(!searchGraph("map memory",{includeDrafts:false}).some(r=>r.id===thread.id));
 assert.ok(searchGraph("N-MAP").some(r=>r.related.some(link=>link.url===mapThread.path)));
});
test("full channel catalogue preserves identity, unknown dates and source coverage",()=>{assert.equal(channelVideos.length,195);assert.equal(channelVideos.filter(v=>v.format==="short").length,18);assert.equal(new Set(channelVideos.map(v=>v.id)).size,195);assert.ok(channelVideos.some(v=>v.published===null));for(const v of channelVideos){assert.match(v.youtubeId,/^[A-Za-z0-9_-]{11}$/);assert.equal(v.url,`https://www.youtube.com/watch?v=${v.youtubeId}`);assert.match(v.sourceHash,/^[a-f0-9]{64}$/);if(v.viewsApproximate)assert.equal(v.metadataLevel,"listing");}});
test("archive filtering and popularity operate on real catalogue fields",()=>{assert.equal(filterVideos("","short").length,18);assert.equal(filterVideos("no-video-has-this-title").length,0);assert.ok(filterVideos("MCP").every(v=>`${v.title} ${v.description}`.toLowerCase().includes("mcp")));const top=filterVideos("","all","views");assert.ok(top.every((v,i)=>i===0||(top[i-1].views??-1)>=(v.views??-1)));});
test("graph edges resolve and timestamped retrieval cites the original source",()=>{const g=recordGraph();const ids=new Set(g.nodes.map(n=>(n as {id:string}).id));assert.equal(ids.size,g.nodes.length);for(const e of g.edges as {from:string;to:string}[]){assert.ok(ids.has(e.from),e.from);assert.ok(ids.has(e.to),e.to);}assert.equal(g.coverage.films,allVideos.length);assert.equal(g.coverage.transcripts,2);const results=searchGraph("graph");assert.ok(results.some(r=>r.basis==="automatic-caption"));for(const r of results.filter(r=>r.start!==undefined))assert.ok(r.sourceUrl.endsWith(`&t=${Math.floor(r.start!)}`));assert.equal(searchGraph("zzznomatchingcontentzzz").length,0);assert.ok(searchGraph("What has Chris said about models as databases?").length>0);});
test("transcript times stay within their source film and automatic provenance remains explicit",()=>{for(const v of channelVideos){const t=transcriptFor(v.youtubeId);if(!t)continue;assert.equal(t.status,"automatic-unreviewed");let end=-1;for(const p of t.passages){assert.ok(p.start>=end);assert.ok(p.end>=p.start);assert.ok(p.start<(v.duration||Infinity));assert.ok(p.text.trim());end=p.start;}}assert.equal(transcriptFor(getVideo("5_ZiJpl4hvs")!.youtubeId),undefined);});
test("full film players require explicit activation even when automatic motion is allowed",()=>{const player={id:"player",visible:1,area:1000,manualOnly:true};assert.equal(chooseMotion([player],null,false,false),null);assert.equal(chooseMotion([{...player,manual:true}],null,false,false),"player");assert.equal(chooseMotion([{...player,manual:true}],"player",false,true),null);});

test("IBM selections use source dates and counts, with separate producer and participant attribution",()=>{
 assert.equal(latestMoe.episode,"123");assert.equal(latestMoe.published,"2026-09-04");assert.equal(popularMoe.youtubeId,ibm.playlistMostViewedId);assert.equal(popularMoe.episode,"40");assert.ok(popularMoe.views!>latestMoe.views!);
 const edges=recordGraph().edges as {from:string;to:string;kind:string}[];
 for(const v of ibmVideos){assert.equal(v.producer,"IBM");assert.ok(v.participants?.includes("Chris Hay"));assert.ok(v.participationEvidence);assert.ok(v.published);assert.equal(v.viewsApproximate,false);assert.ok(edges.some(e=>e.from===v.id&&e.to==="ORG-IBM"&&e.kind==="created-by"));assert.ok(edges.some(e=>e.from===v.id&&e.to==="PERSON-CHRIS"&&e.kind==="features"));assert.ok(!edges.some(e=>e.from===v.id&&e.to==="PERSON-CHRIS"&&e.kind==="created-by"));const cite=JSON.parse(videoReferences(v).find(f=>f.id==="csl-json")!.text);assert.deepEqual(cite.author,[{literal:"IBM"}]);assert.ok(!channelVideos.some(c=>c.id===v.id));}
 assert.ok(searchGraph("agent security").some(r=>r.id===latestMoe.id));
});
test("IBM panelist claim is backed by unique, dated original-source credits",async()=>{const audit=JSON.parse(await readFile(new URL("../content/ibm-appearances.json",import.meta.url),"utf8"));assert.equal(audit.verifiedCount,audit.appearances.length);assert.ok(audit.verifiedCount>=46);assert.equal(new Set(audit.appearances.map((r:{youtubeId:string})=>r.youtubeId)).size,audit.verifiedCount);assert.equal(audit.firstEpisode.episode,"1");assert.equal(audit.firstEpisode.published,"2024-05-03");const numbered=audit.appearances.filter((r:{episode:string|null})=>r.episode);assert.equal(new Set(numbered.map((r:{episode:string})=>r.episode)).size,numbered.length);for(const r of audit.appearances){assert.equal(r.participant,"Chris Hay");assert.equal(r.sourceUrl,`https://www.youtube.com/watch?v=${r.youtubeId}`);assert.match(r.descriptionHash,/^[a-f0-9]{64}$/);}assert.ok(audit.metadataChecked<=audit.playlistEntries);});

test("every verified IBM appearance has a retrievable film record and local screening",async()=>{
 const audit=JSON.parse(await readFile(new URL("../content/ibm-appearances.json",import.meta.url),"utf8"));
 assert.equal(ibmVideos.length,audit.verifiedCount);assert.equal(allVideos.length,241);
 for(const row of audit.appearances){const v=getVideo(row.youtubeId);assert.ok(v);assert.equal(v.episode,row.episode);assert.ok(records.some(r=>r.id===v.id&&r.publication==="catalogued"));assert.ok(searchGraph(v.title).some(r=>r.id===v.id));}
 const history=searchGraph("How many episodes?").find(r=>r.id==="COLLECTION-MOE");assert.ok(history);assert.match(history.text,/at least 46/i);assert.equal(history.basis,"verified-appearance-register");
});
const {citationFormats,citationMeta}=await import("../vendor/hause/cite.ts");
const {videoObjectLd,publicationMetadata}=await import("../vendor/hause/seo.ts");
test("HAUSE citation surfaces preserve corporate authors, exact dates and missing dates",()=>{
 const dated={id:"FILM-1",kind:"film" as const,title:"A & B: 4_bit {Models}",authors:[{literal:"Example Research"}],published:"2026-09-04",url:"https://example.org/film",publisher:"YouTube"};
 const formats=citationFormats(dated);assert.match(formats.find(f=>f.id==="apa")!.text,/2026, September 4/);assert.match(formats.find(f=>f.id==="bibtex")!.text,/author = \{\{Example Research\}\}/);assert.match(formats.find(f=>f.id==="bibtex")!.text,/\\&/);
 const csl=JSON.parse(formats.find(f=>f.id==="csl")!.text);assert.deepEqual(csl.author,[{literal:"Example Research"}]);assert.deepEqual(csl.issued["date-parts"],[[2026,9,4]]);
 const unknown={...dated,published:undefined};const refs=citationFormats(unknown);assert.ok(refs.every(f=>!f.text.includes("NaN")));assert.match(refs.find(f=>f.id==="apa")!.text,/n\.d\./);assert.equal(JSON.parse(refs.find(f=>f.id==="csl")!.text).issued,undefined);assert.equal(citationMeta(unknown).citation_publication_date,undefined);assert.equal(citationMeta(dated).citation_publication_date,"2026/09/04");
});
test("HAUSE film metadata separates the catalogue URL, original source and participant",()=>{
 const citation={kind:"film" as const,title:"A film",authors:[{literal:"IBM"}],url:"https://youtube.com/watch?v=example"};
 const ld=videoObjectLd({citation,pageUrl:"https://example.org/film",thumbnailUrl:"https://example.org/poster.jpg",embedUrl:"https://youtube-nocookie.com/embed/example",participants:["Chris Hay"]});
 assert.equal(ld.url,"https://example.org/film");assert.equal(ld.sameAs,citation.url);assert.equal(ld.uploadDate,undefined);assert.deepEqual(ld.creator,{"@type":"Organization",name:"IBM"});assert.deepEqual(ld.actor,[{"@type":"Person",name:"Chris Hay"}]);
 const head=publicationMetadata({title:citation.title,description:"Synopsis",url:"https://example.org/film",siteName:"A publication",citation});assert.equal(head.robots.index,false);assert.equal(head.alternates.canonical,ld.url);assert.equal(head.other?.citation_public_url,citation.url);
});

test("house positioning is source-linked and never turns IBM productions into house work",()=>{
 const g=recordGraph();const nodes=g.nodes as {id:string;kind:string;basis?:string;sourceUrl?:string}[];const edges=g.edges as {from:string;to:string;kind:string}[];
 const practice=nodes.find(n=>n.id==="PRACTICE-CHRIS");assert.equal(practice?.kind,"practice");assert.equal(practice?.basis,"author-description");assert.equal(practice?.sourceUrl,"https://chrishayuk.com/about#the-house");
 for(const id of ["W-LARQL","W-VINDEX3","W-HAUSE","W-MCP"])assert.ok(edges.some(e=>e.from===id&&e.to==="HOUSE-SYSTEMS"&&e.kind==="work-of"));
 for(const v of ibmVideos)assert.ok(!edges.some(e=>e.from===v.id&&e.to.startsWith("HOUSE-")));
 const result=searchGraph("Ideas, systems and objects").find(r=>r.id==="PRACTICE-CHRIS");assert.ok(result);assert.equal(result.basis,"author-description");assert.equal(result.url,"/about#the-house");
 assert.ok(!searchGraph("unicorn quantum benchmark").some(r=>r.id==="PRACTICE-CHRIS"));
 for(const r of records)assert.ok(edges.some(e=>e.from===r.id&&e.to==="CATALOGUE-RECORD"&&e.kind==="catalogued-in"));
 assert.ok(searchGraph("catalogue").some(r=>r.url==="/record"&&r.basis==="catalogue-index"));
 const draft=searchGraph("operator knows").find(r=>r.recordId==="N-OPERATOR");assert.ok(draft);assert.equal(draft.basis,"draft-record");assert.equal(draft.publication,"draft");assert.ok(!searchGraph("operator knows",{includeDrafts:false}).some(r=>r.recordId==="N-OPERATOR"));
});


test("graph indexes authored acts with exact text, version, source anchors and draft status",async()=>{
 const {recordActs}=await import("../lib/record-knowledge.ts");const g=recordGraph();
 for(const r of records.filter(r=>!r.youtubeId))for(const act of recordActs(r)){
  const node=g.nodes.find(n=>n.id===act.id);assert.ok(node);assert.equal(node.text,act.text);assert.equal(node.publication,r.publication);assert.equal(node.version,r.version);assert.ok(node.sourceUrl!.endsWith(`#${act.anchor}`));
  assert.ok(g.edges.some(e=>e.from===node.id&&e.to===r.id&&e.kind==="act-of"));
 }
 const refusal=searchGraph("predictive locality").find(r=>r.actKind==="refusal");assert.ok(refusal);assert.equal(refusal.publication,"draft");assert.match(refusal.text,/NOT ESTABLISHED/);assert.match(refusal.text,/Open question/);
 assert.ok(searchGraph("FFN graph",{scope:"records"}).every(r=>r.publication==="draft"));
 assert.ok(!searchGraph("LARQL",{scope:"films",includeDrafts:false}).some(r=>r.publication==="draft"));
});

test("film chapters keep exact source titles and seek times without becoming transcripts",()=>{
 const g=recordGraph();assert.equal(g.coverage.chapters,allVideos.reduce((n,v)=>n+v.chapters.length,0));
 for(const v of allVideos)for(const c of v.chapters){
  const n=g.nodes.find(n=>n.id===`${v.id}:chapter@${c.start}`);assert.ok(n);assert.equal(n.text,c.title);assert.equal(n.start,c.start);assert.equal(n.basis,"source-chapter");assert.equal(n.transcription,undefined);assert.equal(n.sourceUrl,`${v.url}&t=${Math.floor(c.start)}`);
  assert.ok(g.edges.some(e=>e.from===n.id&&e.to===v.id&&e.kind==="chapter-of"));
 }
 const chapter=allVideos.flatMap(v=>v.chapters).find(c=>c.title.toLowerCase().includes("agent"))!;assert.ok(chapter);
 assert.ok(searchGraph(chapter.title,{scope:"films"}).some(r=>r.basis==="source-chapter"));
});

test("retrieval returns graph sources, preserves scope and never ingests referenced documents by implication",()=>{
 const g=recordGraph();
 for(const q of ["LARQL","operator knows","graph","How many episodes?","model representation"]){
  for(const result of searchGraph(q)){const node=g.nodes.find(n=>n.id===result.id);assert.ok(node?.retrievable);assert.equal(result.sourceUrl,node.sourceUrl);assert.equal(result.basis,node.basis);}
 }
 assert.ok(g.nodes.filter(n=>n.kind==="source").every(n=>n.retrievable===false&&n.basis==="source-reference"));
 const concepts=searchGraph("ffn",{scope:"concepts"});assert.ok(concepts.length>0);assert.ok(concepts.every(n=>n.kind==="concept"&&n.basis==="record-associations"));
 assert.equal(g.coverage.nodes,g.nodes.length);assert.equal(g.coverage.relationships,g.edges.length);
 assert.equal(searchGraph("imaginary definitive ffns cured quantum gravity").length,0);
});

test("visual notebook film passages stay connected without becoming transcript evidence",()=>{
 for(const id of ["N-MAP","N-STATE","N-ADDRESS"]){
  const r=records.find(r=>r.id===id)!;assert.ok(r);assert.equal(r.publication,"draft");assert.equal(r.published,undefined);
  for(const [index,act] of r.body.entries()){
   if(act.kind!=="film"||!("youtubeId" in act))continue;
   const video=getVideo(act.youtubeId);assert.ok(video);assert.ok(act.start>=0&&act.start<(video.duration||Infinity));
   const node=recordGraph().nodes.find(n=>n.id===`${r.id}@${r.version}:act-${index+1}`);assert.ok(node);assert.equal(node.text,act.caption);assert.equal(node.basis,"draft-record");
   assert.ok(recordGraph().edges.some(e=>e.from===node.id&&e.to===video.id&&e.kind==="discusses-film"&&e.basis==="editorial"));
   assert.ok(r.related.includes(video.id));
  }
 }
 const result=searchGraph("persistent decode state",{scope:"records"});assert.ok(result.some(r=>r.recordId==="N-STATE"));
 assert.ok(!searchGraph("persistent decode state",{includeDrafts:false}).some(r=>r.recordId==="N-STATE"));
});

// The unlisted-preview mechanism, whether or not a preview currently exists.
test("unlisted previews resolve at their own URL and are absent from every listing", async () => {
 const { allRecords, records: listed, getRecord, isListed, indexedRecords } = await import("../lib/records.ts");
 const { mapThread, threadPosition, demoStudies } = await import("../lib/threads.ts");

 // The wiring holds even when nothing is unlisted, which is when it is easiest to break.
 assert.deepEqual(listed.map(r => r.id), allRecords.filter(isListed).map(r => r.id));
 const { notebookSelection } = await import("../lib/notebook-selection.ts");
 assert.ok(notebookSelection.every(isListed));
 for (const record of notebookSelection) assert.equal(record, getRecord(record.id));
 assert.match(await readFile(new URL("../app/sitemap.xml/route.ts", import.meta.url), "utf8"), /indexedRecords\(\)/);
 const page = await readFile(new URL("../components/RecordPage.tsx", import.meta.url), "utf8");
 assert.match(page, /UNLISTED PREVIEW · NOT PUBLISHED/);
 const route = await readFile(new URL("../app/[section]/[slug]/page.tsx", import.meta.url), "utf8");
 assert.match(route, /visibility==="unlisted"\?\{\.\.\.meta,robots:\{index:false,follow:false\}\}/);
 assert.match(await readFile(new URL("../lib/graph.ts", import.meta.url), "utf8"), /demoStudies\.filter\(s=>s\.visibility!=="unlisted"\)/);

 // A record marked unlisted resolves, and appears in nothing that lists records.
 for (const record of allRecords.filter(r => !isListed(r))) {
  assert.equal(getRecord(record.id)?.id, record.id);
  assert.equal(getRecord(record.slug)?.id, record.id);
  assert.ok(!listed.some(r => r.id === record.id), `${record.id} in listed records`);
  assert.ok(!indexedRecords().some(r => r.id === record.id), `${record.id} indexed`);
  assert.equal(catalogue({ q: "" }).entries.some(r => r.id === record.id), false);
  assert.equal(recordGraph().nodes.some(n => n.recordId === record.id || n.id === record.id), false);
  for (const hit of searchGraph(record.title))
   assert.ok(hit.recordId !== record.id && hit.id !== record.id, `${record.id} retrievable via Ask`);
  assert.equal(mapThread.steps.some(s => s.id === record.id), false);
  assert.equal(threadPosition(record.id), undefined);
  for (const r of listed) assert.ok(!r.related.includes(record.id), `${r.id} -> ${record.id}`);
  assert.ok(record.related.every(id => getRecord(id)), `${record.id} has an unresolved relation`);
 }
 for (const study of demoStudies.filter(s => s.visibility === "unlisted")) {
  assert.equal(mapThread.steps.some(s => s.id === study.id), false);
  assert.equal(recordGraph().nodes.some(n => n.id === study.id), false, `${study.id} in the graph`);
  assert.equal(searchGraph(study.title).length, 0, `${study.id} retrievable via Ask`);
 }
});

// The notebook is a record of thinking, not a companion to the film channel.
test("notebook notes declare their own lineage and every act kind renders", async () => {
 const { visualNotebooks } = await import("../lib/visual-notebooks.ts");
 const { actText } = await import("../lib/record-knowledge.ts");
 const authority = visualNotebooks.find(n => n.id === "N-AUTHORITY")!;
 assert.equal(authority.visibility, undefined);
 assert.equal(authority.lineage, "FILM → QUESTION → EVIDENCE → INSTRUMENT");
 assert.ok(visualNotebooks.every(n => !n.lineage || n.lineage.includes("→")));
 const summary = authority.body.find(a => a.kind === "summary");
 assert.ok(summary && summary.kind === "summary" && summary.lines.length === 5);
 // Every act kind used anywhere has a form and retrievable text.
 const acts = await readFile(new URL("../components/Acts.tsx", import.meta.url), "utf8");
 for (const record of visualNotebooks) for (const act of record.body) {
  assert.match(acts, new RegExp(`case "${act.kind}"`), `${act.kind} has no form`);
  if (act.kind !== "photograph" && !(act.kind === "film" && "media" in act))
   assert.ok(actText(act).length > 0, `${record.id}: empty ${act.kind}`);
 }
 // The index reads lineage from the record rather than assuming a film.
 const index = await readFile(new URL("../components/NotebookCollection.tsx", import.meta.url), "utf8");
 assert.match(index, /r\.lineage \|\| "FILM → QUESTION → RECORD"/);
 assert.doesNotMatch(index, /VISUAL NOTES/);
});
