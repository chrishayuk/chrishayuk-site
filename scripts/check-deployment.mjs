import assert from "node:assert/strict";
import http from "node:http";
import { readFile } from "node:fs/promises";

const base = process.env.CHECK_ORIGIN || "http://localhost:3000";
function request(path, host = "chrishayuk.com") {
  return new Promise((resolve, reject) => {
    const req = http.get(new URL(path, base), { headers: { Host: host } }, res => {
      let body = "";
      res.setEncoding("utf8");
      res.on("data", chunk => { body += chunk; });
      res.on("end", () => resolve({ status: res.statusCode, headers: res.headers, body }));
    });
    req.setTimeout(30000, () => req.destroy(new Error("Request timed out")));
    req.on("error", reject);
  });
}
const home = await request("/");
assert.equal(home.status, 200);
assert.match(home.body, /WITH CHRIS HAY AS A PANELIST/);
assert.match(home.body, /rel="canonical" href="https:\/\/chrishayuk.com"/);
assert.match(home.body, /name="robots" content="index, follow"/);
assert.match(home.body, /https:\/\/chrishayuk.com\/og-house.png/);
assert.doesNotMatch(home.body, /name="robots" content="noindex/);
assert.doesNotMatch(home.body, /ORIGINAL MEDIA TO FOLLOW|media-required|larql-scene/);
assert.match(home.body, /id="from-the-notebook"/);
assert.match(home.body, /href="\/notebook\/what-is-the-map"/);
assert.match(home.body, /href="\/notebook\/my-ci-has-to-undo-my-coding-agent"/);
assert.match(home.body, /class="agent-card"/);
assert.ok(home.body.indexOf('id="latest-youtube"') < home.body.indexOf('id="latest-mixture-of-experts"'));
assert.ok(home.body.indexOf('id="latest-mixture-of-experts"') < home.body.indexOf('id="from-the-notebook"'));
assert.ok(home.body.indexOf('id="from-the-notebook"') < home.body.indexOf('id="selected-films"'));
assert.ok(home.body.indexOf('id="selected-films"') < home.body.indexOf('id="further-notes"'));
assert.ok(home.body.indexOf('id="further-notes"') < home.body.indexOf('id="selected-work"'));
for (const path of ["/work/larql", "/work/vindex3", "/work/mcp-cli"]) assert.ok(home.body.includes(`href="${path}"`));
const primaryNav=home.body.match(/<nav[^>]*aria-label="Primary"[^>]*>([\s\S]*?)<\/nav>/)?.[1];
assert.ok(primaryNav?.includes('href="/film"'),"Film is a first-level navigation destination");
for(const path of ["/ideas","/systems","/objects","/record","/knowledge"]) {
  const page=await request(path);
  assert.equal(page.status,200,path);
  assert.ok(page.body.includes(`rel="canonical" href="https://chrishayuk.com${path}"`),path);
  assert.ok(page.body.includes('id="main"'),path);
  assert.ok(page.body.includes('property="og:image" content="https://chrishayuk.com/og-house.png"'),path);
}
const legacyWork=await request("/work");
assert.equal(legacyWork.status,200);
assert.ok(legacyWork.body.includes('rel="canonical" href="https://chrishayuk.com/systems"'));
const catalogue=await request("/record?q=N-OPERATOR");
assert.equal(catalogue.status,200);
assert.match(catalogue.body,/DRAFT REFERENCE/);
assert.match(catalogue.body,/name="robots" content="noindex, follow"/);
const secondPage=await request("/record?kind=film&page=2");
assert.equal(secondPage.status,200);
assert.ok(secondPage.body.includes('rel="canonical" href="https://chrishayuk.com/record?kind=film&amp;page=2"'));
assert.ok(secondPage.body.includes('rel="prev"'));
assert.ok(secondPage.body.includes('rel="next"'));
for (const host of ["www.chrishayuk.com", "chrishay.uk", "www.chrishay.uk", "chrishayuk.net", "www.chrishayuk.net", "chrishay.net", "www.chrishay.net", "chrishayuk.io", "www.chrishayuk.io"]) {
  const response = await request("/film/mixture-of-experts?sort=popular", host);
  assert.equal(response.status, 308, host);
  assert.equal(response.headers.location, "https://chrishayuk.com/film/mixture-of-experts?sort=popular", host);
}
const preview = await request("/", "chrishayuk-site.fly.dev");
assert.equal(preview.status, 200);
assert.doesNotMatch(preview.body,/googletagmanager/);
assert.equal(preview.headers["x-robots-tag"], "noindex, nofollow");
const robots = await request("/robots.txt");
assert.match(robots.body, /Allow: \/\nSitemap: https:\/\/chrishayuk.com\/sitemap.xml/);
const sitemap = await request("/sitemap.xml");
assert.equal(sitemap.status, 200);
assert.match(sitemap.body, /https:\/\/chrishayuk.com\/film\/youtube/);
assert.match(sitemap.body, /https:\/\/chrishayuk.com\/record/);
const graph = JSON.parse((await request("/api/graph")).body);
assert.equal(graph.coverage.films, 241);
assert.equal(graph.nodes.find(n=>n.id==="HOUSE-SYSTEMS").url,"https://chrishayuk.com/systems");
assert.equal(graph.nodes.find(n=>n.id==="CATALOGUE-RECORD").url,"https://chrishayuk.com/record");
const attributionNode=graph.nodes.find(n=>n.id==="N-ATTRIBUTION");
assert.equal(attributionNode.url,"https://chrishayuk.com/notebook/my-ci-has-to-undo-my-coding-agent");
assert.equal(attributionNode.basis,"draft-record");
assert.ok(graph.edges.some(e=>e.from==="N-ATTRIBUTION"&&e.to==="PERSON-CHRIS"&&e.kind==="created-by"));
for(const concept of ["ai-agents","authorship","repository-policy","source-authority"])
  assert.ok(graph.edges.some(e=>e.from==="N-ATTRIBUTION"&&e.to===`CONCEPT-${concept}`&&e.kind==="about"),concept);
const ask = await request("/ask?q=How%20many%20episodes%3F");
assert.equal(ask.status, 200);
assert.match(ask.body, /at least 46/);
const draftSearch=JSON.parse((await request("/api/search?q=operator%20knows&scope=records")).body);
assert.ok(draftSearch.results.some(r=>r.recordId==="N-OPERATOR"&&r.basis==="draft-record"));
const attributionSearch=JSON.parse((await request("/api/search?q=assistance%20authorship&scope=records")).body);
assert.ok(attributionSearch.results.some(r=>r.recordId==="N-ATTRIBUTION"&&r.basis==="draft-record"));
const noDrafts=JSON.parse((await request("/api/search?q=operator%20knows&drafts=exclude")).body);
assert.ok(noDrafts.results.every(r=>r.publication!=="draft"));
const note=await request("/notebook/the-operator-and-the-model");
assert.ok(note.body.includes('id="act-1"'));
assert.ok(note.body.includes('id="source-1"'));
assert.equal(graph.coverage.chapters,235);
assert.equal(graph.coverage.acts,graph.nodes.filter(n=>n.kind==="act").length);
for (const [id,slug] of [["N-MAP","what-is-the-map"],["N-STATE","what-has-to-survive"],["N-ADDRESS","reading-by-address"]]) {
  const page=await request(`/notebook/${slug}`);
  assert.equal(page.status,200,slug);
  assert.ok(page.body.includes(`rel="canonical" href="https://chrishayuk.com/notebook/${slug}"`),slug);
  assert.ok(page.body.includes('id="act-1"'),slug);
  assert.ok(graph.nodes.some(n=>n.recordId===id&&n.kind==="act"&&n.basis==="draft-record"),id);
}
const systems=await request("/systems");
assert.doesNotMatch(systems.body,/ORIGINAL MEDIA TO FOLLOW|media-required/);
assert.match(systems.body,/CONCEPTUAL STUDY \/ DISCOVER/);
const thread=await request("/thread/the-map");
assert.equal(thread.status,200);
assert.match(thread.body,/rel="canonical" href="https:\/\/chrishayuk.com\/thread\/the-map"/);
assert.match(thread.body,/curated reading order/i);
for(let step=1;step<=graph.nodes.find(n=>n.id==="THREAD-MAP").members.length;step++) assert.ok(thread.body.includes(`id="step-${step}"`));
assert.match(thread.body,/ItemList/);
const threadSearch=JSON.parse((await request("/api/search?q=map%20memory&scope=records")).body);
assert.ok(threadSearch.results.some(r=>r.id==="THREAD-MAP"&&r.basis==="curated-thread"));
assert.ok(sitemap.body.includes("/thread/the-map"));
const filmIndex=await request("/film");
assert.equal(filmIndex.status,200);
assert.ok(filmIndex.body.indexOf('id="chris-hay-youtube"') < filmIndex.body.indexOf('class="moe-selection"'));
const address=await request("/notebook/reading-by-address");
assert.match(address.body,/demo-invitation-stage/);
assert.match(address.body,/THE MODEL HAS TO BUILD THE QUERY/);
assert.match(address.body,/route_sweep.json/);
const addressSearch=JSON.parse((await request("/api/search?q=positive%20matches&scope=records")).body);
assert.ok(addressSearch.results.some(r=>r.recordId==="N-ADDRESS"&&r.basis==="draft-record"));
const map=await request("/notebook/what-is-the-map");
for (const frame of [156,286,434,1222]) assert.ok(map.body.includes(`/media/notebook/stills/HJlWDSyDcD4-${frame}.webp`));
assert.match(map.body,/demo-invitation-stage/);
assert.match(map.body,/thread-navigation/);
assert.match(map.body,/href="\/thread\/the-map#step-2"/);
assert.match(map.body,/href="\/demos\/addressed-memory"/);
assert.match(map.body,/map-visual-section/);
assert.match(map.body,/map-annotated/);
assert.match(map.body,/map-coordinate-pair/);
assert.match(map.body,/href="\/notebook\/which-source-wins"/);
for(let act=1;act<=23;act++) assert.equal(map.body.split(`id="act-${act}"`).length-1,1,`map citation act-${act}`);
const mapSearch=JSON.parse((await request("/api/search?q=logit%20lens&scope=records")).body);
assert.ok(mapSearch.results.some(r=>r.recordId==="N-MAP"&&r.basis==="draft-record"));
const demo=await request("/demos/addressed-memory");
assert.equal(demo.status,200);
assert.match(demo.body,/Interactive addressed memory/);
assert.match(demo.body,/Paris/);
assert.match(demo.body,/name="robots" content="noindex, follow"/);
for (const asset of ["/media/notebook/map-trajectory.mp4","/media/notebook/map.mp4","/media/notebook/address.mp4","/media/notebook/stills/HJlWDSyDcD4-156.webp","/media/notebook/stills/HJlWDSyDcD4-286.webp","/media/notebook/stills/HJlWDSyDcD4-434.webp","/media/notebook/stills/HJlWDSyDcD4-1222.webp"]) {
  const response=await request(asset);
  assert.equal(response.status,200,asset);
  assert.match(response.headers["content-type"], /^(image|video)\//,asset);
}
const films = JSON.parse((await request("/api/records")).body);
assert.equal(films.count, 241);
const ibm = films.records.find(r => r.id.includes("W3iQbl5R_Jk"));
assert.ok(ibm);
const cite = await request(`/api/citations/${ibm.id}?format=csl-json`);
assert.equal(cite.status, 200);
assert.deepEqual(JSON.parse(cite.body).author, [{literal: "IBM"}]);
// The authority note is listed: on the index, in the thread, the graph and Ask.
const notebook = await request("/notebook");
assert.match(notebook.body, /href="\/notebook\/my-ci-has-to-undo-my-coding-agent"/);
assert.match(notebook.body, /href="\/notebook\/which-source-wins"/);
assert.match(notebook.body, /href="\/notebook\/what-is-the-map"/);
assert.match(notebook.body, /FILM → QUESTION → EVIDENCE → INSTRUMENT/);
assert.match(notebook.body, /authority-card/);
assert.doesNotMatch(notebook.body, /VISUAL NOTES/);
// The new evidence note leads the Notebook and remains an anchored draft record.
const depthPath = "/notebook/the-address-is-built-through-depth";
assert.ok(notebook.body.indexOf('href="/notebook/my-ci-has-to-undo-my-coding-agent"') < notebook.body.indexOf(`href="${depthPath}"`));
assert.ok(notebook.body.indexOf(`href="${depthPath}"`) < notebook.body.indexOf('href="/notebook/what-is-the-map"'));
assert.ok(thread.body.includes(`href="${depthPath}"`));
const depth = await request(depthPath);
assert.equal(depth.status, 200);
assert.ok(depth.body.includes(`rel="canonical" href="https://chrishayuk.com${depthPath}"`));
for (let act=1;act<=6;act++) assert.equal(depth.body.split(`id="act-${act}"`).length-1,1,`depth citation act-${act}`);
for (const figure of ["address-depth", "address-transplant", "address-coordinates"]) assert.ok(new RegExp(`class="[^"\n]*\\b${figure}\\b`).test(depth.body));
assert.match(depth.body,/0.000e\+00/);
assert.ok(graph.edges.some(e=>e.from==="N-ADDRESS-BUILD"&&e.to==="THREAD-MAP"));
for (const id of ["N-MAP","N-ADDRESS","N-AUTHORITY"]) assert.ok(graph.edges.some(e=>e.from===id&&e.to==="N-ADDRESS-BUILD"&&e.kind==="related"));
const depthSearch=JSON.parse((await request("/api/search?q=relation%20coordinates&scope=records")).body);
assert.ok(depthSearch.results.some(r=>r.recordId==="N-ADDRESS-BUILD"&&r.sourceUrl.includes("#act-")));
assert.ok(sitemap.body.includes(depthPath), "public notebook drafts are discoverable");
const depthLegacy=await request("/codex/the-address-is-built-through-depth");
assert.equal(depthLegacy.status,307);
assert.equal(depthLegacy.headers.location,depthPath);
for (const asset of ["causal", "reader", "registry", "reader-failed"]) {
  const response=await request(`/data/address-build-1/${asset}.json`);
  assert.equal(response.status,200,asset);
  assert.ok(JSON.parse(response.body),asset);
}
const authority = await request("/notebook/which-source-wins");
assert.equal(authority.status, 200);
assert.match(authority.body, /rel="canonical" href="https:\/\/chrishayuk.com\/notebook\/which-source-wins"/);
assert.match(authority.body, /name="robots" content="index, follow"/);
assert.doesNotMatch(authority.body, /UNLISTED PREVIEW/);
assert.match(authority.body, /THE ARGUMENT, IN FIVE LINES/);
assert.match(authority.body, /demo-invitation-stage/);
assert.match(authority.body, /thread-navigation/);
for(let chapter=1;chapter<=6;chapter++) assert.ok(authority.body.includes(`id="authority-chapter-${chapter}"`));
for(let act=1;act<=28;act++) assert.equal(authority.body.split(`id="act-${act}"`).length-1,1,`authority citation act-${act}`);
assert.match(authority.body, /authority-scene/);
assert.match(authority.body, /authority-matrix/);
assert.match(authority.body, /authority-walk-layouts/);
assert.match(authority.body, /notebook-refusal/);
assert.doesNotMatch(authority.body, /three tiers, not two —|authority is not deletion —|two instrument rules earned the hard way —/);
for(const path of ["/ideas", "/record?q=Which%20source%20wins"]) {
  const listing=await request(path);
  assert.equal(listing.status,200,path);
  assert.match(listing.body,/href="\/notebook\/which-source-wins"/,path);
}
assert.ok(sitemap.body.includes("/notebook/which-source-wins"), "public notebook drafts remain discoverable without changing their status");
assert.ok(graph.nodes.some(n => n.recordId === "N-AUTHORITY" && n.kind === "act" && n.basis === "draft-record"));
const authoritySearch = JSON.parse((await request("/api/search?q=inert%20not%20outvoted&scope=records")).body);
assert.ok(authoritySearch.results.some(r => r.recordId === "N-AUTHORITY" && r.basis === "draft-record"));
const study = await request("/demos/authority-gate");
assert.equal(study.status, 200);
assert.match(study.body, /gate-track/);
assert.match(study.body, /name="robots" content="noindex, follow"/);
assert.doesNotMatch(study.body, /UNLISTED PREVIEW/);
assert.match(study.body, /never manufacture an answer where the experiment has none/);
// The instrument must never invent an answer for an arm that was not run.
assert.match(study.body, /Not in the record|were never run/);
assert.equal((await request("/api/health")).status, 200);
assert.equal((await request("/og-house.png")).status, 200);

// FOLLOW — the feeds, and the discovery tags that let a reader find them.
const notebookFeed = await request("/notebook/feed.xml");
assert.equal(notebookFeed.status, 200);
assert.match(notebookFeed.headers["content-type"], /application\/rss\+xml/);
assert.match(notebookFeed.body, /<atom:link href="https:\/\/chrishayuk.com\/notebook\/feed.xml" rel="self"/);
assert.match(notebookFeed.body, /<title>Which source wins\?<\/title>/);
// A draft must arrive labelled, and must not claim to be a permalink.
assert.match(notebookFeed.body, /<guid isPermaLink="false">urn:chrishayuk:record:N-AUTHORITY:0\.1<\/guid>/);
assert.match(notebookFeed.body, /DRAFT · V0\.1 · RECORDED 2026-09-06/);
// An empty feed is the failure this replaced; four entries is a floor, not a target.
assert.ok((notebookFeed.body.match(/<item>/g) || []).length >= 4, "the notebook feed is empty");
assert.doesNotMatch(notebookFeed.body, /authority-gate|UNLISTED/, "an unlisted preview reached the feed");

const recordFeed = await request("/record/feed.xml");
assert.equal(recordFeed.status, 200);
assert.match(recordFeed.body, /<atom:link href="https:\/\/chrishayuk.com\/record\/feed.xml" rel="self"/);
assert.ok(!recordFeed.body.includes("DRAFT"), "the record feed carries published records only");

// The old address keeps working, permanently, so nobody's reader goes silent.
const oldFeed = await request("/rss.xml");
assert.equal(oldFeed.status, 308);
assert.equal(oldFeed.headers.location, "https://chrishayuk.com/notebook/feed.xml");

// Autodiscovery on a record page, not only the homepage. This is the
// regression that made the feeds invisible: publicationMetadata returns its
// own alternates and Next replaces rather than merges them.
for (const path of ["/", "/notebook", "/notebook/which-source-wins", "/record"]) {
  const page = await request(path);
  assert.equal(page.status, 200, path);
  assert.match(page.body, /<link rel="alternate" type="application\/rss\+xml" href="https:\/\/chrishayuk.com\/notebook\/feed.xml"/, `${path} does not advertise the notebook feed`);
  assert.match(page.body, /<link rel="alternate" type="application\/rss\+xml" href="https:\/\/chrishayuk.com\/record\/feed.xml"/, `${path} does not advertise the record feed`);
}

// FOLLOW · CITE · ARCHIVE — the verbs, and the panel they point at.
const followed = await request("/notebook/which-source-wins");
assert.match(followed.body, /FOLLOW THE WORK/);
assert.match(followed.body, /href="\/notebook\/feed.xml"/);
assert.match(followed.body, /href="#follow"/);
assert.doesNotMatch(followed.body, /newsletter|Subscribe to|mailing list/i, "Follow is not a mailing list");
assert.match((await request("/notebook")).body, /FOLLOW THE WORK/);
assert.match(followed.body, /follow\.json/);

// follow.json — the publication signal, for readers that are programs.
const signalResponse = await request("/follow.json");
assert.equal(signalResponse.status, 200);
assert.match(signalResponse.headers["content-type"], /application\/json/);
const signal = JSON.parse(signalResponse.body);
assert.ok(Array.isArray(signal.latest) && signal.latest.length > 0, "the publication signal is empty");
assert.equal(signal.author, "Chris Hay");
assert.equal(signal.feeds.notebook, "https://chrishayuk.com/notebook/feed.xml");
// Pollable: nothing published between two requests means no difference at
// all. A signal that changed on its own would make every poll look like news.
assert.equal((await request("/follow.json")).body, signalResponse.body, "the publication signal is not stable between polls");
assert.equal(signal.updated_at, signal.latest[0].published_at ?? signal.latest[0].recorded_at);
// A draft carries the date it was recorded and no publication date.
for (const entry of signal.latest) {
  assert.ok(entry.recorded_at, `${entry.id} has no recorded_at`);
  if (entry.state !== "published") assert.equal(entry.published_at, undefined, `${entry.id} is a draft with a published_at`);
}
assert.ok(signal.latest.some(e => e.id === "N-MAP"), "N-MAP is not in the publication signal");

// ARCHIVE appears exactly where there is a capture to point at, and nowhere
// else. An identifier that does not exist is absent, never a placeholder.
const held = JSON.parse(await readFile(new URL("../content/archive.json", import.meta.url), "utf8"));
const archivedRecords = Object.keys(held).filter(u => /\/(notebook|research|work)\//.test(u));
if (archivedRecords.length) {
  const page = await request(new URL(archivedRecords[0]).pathname);
  assert.match(page.body, /ARCHIVE/, `${archivedRecords[0]} has a capture but shows no ARCHIVE`);
  assert.match(page.body, /web\.archive\.org\/web\//);
  const entry = signal.latest.find(e => e.url === archivedRecords[0]);
  if (entry) assert.ok(entry.archive_url, `${entry.id} has a capture that follow.json does not carry`);
} else {
  assert.doesNotMatch(followed.body, /ARCHIVE/, "ARCHIVE is offered with no capture behind it");
}

console.log("Production homepage, visual notebooks, interactive demo, clip media, catalogue, canonical redirects, indexing, graph, Ask citations, feeds and feed discovery verified.");

// Distribution objects stay attached to the public record and keep draft status.
assert.ok(sitemap.body.includes('/notebook/which-source-wins'));
assert.match(depth.body,/api\/social\/N-ADDRESS-BUILD/);
assert.match(depth.body,/sharing\/share-offsite/);
assert.match(depth.body,/twitter.com\/intent\/tweet/);
const notebookJson=JSON.parse((await request('/feed.json')).body);
assert.ok(notebookJson.items.length>0);
assert.ok(notebookJson.items.every(item=>item._chrishayuk.state!=='draft'||!item.date_published));
const distribution=JSON.parse((await request('/api/share/N-ADDRESS-BUILD')).body);
assert.equal(distribution.canonical_url,'https://chrishayuk.com/notebook/the-address-is-built-through-depth');
assert.equal(distribution.state,'draft');
assert.equal((await request('/api/share/not-a-record')).status,404);
// Exercise the image renderer itself: metadata alone cannot catch a broken font.
const socialNotes=JSON.parse((await request('/follow.json')).body).latest.filter(item=>item.kind==='notebook');
for(const note of socialNotes){
 const png=await new Promise((resolve,reject)=>{
  const req=http.get(new URL(`/api/social/${note.id}`,base),{headers:{Host:'chrishayuk.com'}},res=>{
   const chunks=[];res.on('data',chunk=>chunks.push(chunk));res.on('error',reject);res.on('end',()=>resolve({status:res.statusCode,type:res.headers['content-type'],bytes:Buffer.concat(chunks)}));
  });req.setTimeout(30000,()=>req.destroy(new Error('Social image timeout')));req.on('error',reject);
 });
 assert.equal(png.status,200,note.id);assert.match(png.type,/image\/png/);
 assert.equal(png.bytes.subarray(1,4).toString(),'PNG');assert.equal(png.bytes.readUInt32BE(16),1200);assert.equal(png.bytes.readUInt32BE(20),630);
}
console.log(`${socialNotes.length} generated Notebook cards verified.`);
