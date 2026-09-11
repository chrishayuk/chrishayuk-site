import assert from "node:assert/strict";
import http from "node:http";
import { readFile } from "node:fs/promises";

const base = process.env.CHECK_ORIGIN || "http://localhost:3000";
function request(path, host = "chrishayuk.com", headers = {}) {
  return new Promise((resolve, reject) => {
    const req = http.get(new URL(path, base), { headers: { Host: host, ...headers } }, res => {
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
assert.match(home.body, /href="\/notebook\/can-you-name-the-mutation-that-changed-a-world"/);
assert.match(home.body, /class="cell80-home-preview"/);
assert.match(home.body, /\/data\/cell80\/home-observed\.png/);
assert.match(home.body, /WATCH THE REPLAY/);
assert.match(home.body, /href="\/notebook\/what-keeps-an-evolving-world-alive"/);
assert.match(home.body, /href="\/notebook\/when-does-improvement-become-invention"/);
assert.match(home.body, /Continue through the five Cell80 Notebook entries/);
assert.doesNotMatch(home.body, /cell80-further-preview|cell80-barrier-world|cell80-inherited-world/);
assert.match(home.body, /href="\/notebook\/give-invention-something-to-unlock"/);
assert.match(home.body, /href="\/notebook\/an-advantage-needs-a-chance-to-become-history"/);

assert.match(home.body, /href="\/notebook\/the-address-is-built-through-depth"/);
assert.match(home.body, /class="address-teaser"/);
assert.match(home.body, /cfvod\.kaltura\.com\/p\/1773841\/sp\/177384100\/thumbnail\/entry_id\/1_rwy4uz25\/width\/1280/);
assert.ok(home.body.indexOf('id="latest-youtube"') < home.body.indexOf('id="latest-mixture-of-experts"'));
assert.ok(home.body.indexOf('id="latest-mixture-of-experts"') < home.body.indexOf('id="from-the-notebook"'));
assert.ok(home.body.indexOf('id="from-the-notebook"') < home.body.indexOf('id="selected-films"'));
assert.ok(home.body.indexOf('id="selected-films"') < home.body.indexOf('id="further-notes"'));
assert.ok(home.body.indexOf('id="further-notes"') < home.body.indexOf('id="selected-work"'));
for (const path of ["/work/larql", "/work/vindex3", "/work/mcp-cli"]) assert.ok(home.body.includes(`href="${path}"`));
// The Cell80 edition uses authored HAUSE rooms and preserves its draft record.
for (const slug of ['can-you-name-the-mutation-that-changed-a-world','what-keeps-an-evolving-world-alive','when-does-improvement-become-invention']) {
 const note=await request(`/notebook/${slug}`);
 assert.equal(note.status,200,slug);
 assert.match(note.body,/id="cell80-study"/);
 assert.match(note.body,/hause-study-room/);
 assert.match(note.body,/hause-field-notes/);
 assert.match(note.body,/href="\/thread\/cell80"/);
 assert.match(note.body,/DRAFT/);
}
const inheritedNote=await request('/notebook/an-advantage-needs-a-chance-to-become-history');
assert.equal(inheritedNote.status,200);
assert.match(inheritedNote.body,/cell80-inherited-world/);
assert.match(inheritedNote.body,/Play family history/);
assert.match(inheritedNote.body,/Choose one of 100 recorded matched futures/);
const familyHistory=JSON.parse((await request('/data/cell80/inherited-history.json')).body);
assert.equal(familyHistory.frames.length,2835);
assert.equal(familyHistory.frames[200][2],148);
const ecologyThread=await request('/thread/cell80');
assert.equal(ecologyThread.status,200);
for(const n of [1,2,3]) assert.ok(ecologyThread.body.includes(`id="step-${n}"`));
const ecologyEvidence=JSON.parse((await request('/data/cell80/evidence.json')).body);
assert.equal(ecologyEvidence.factorials.length,40);
assert.equal(ecologyEvidence.firstSteps.length,108);
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
const exhibitionPath = "/notebook/i-wanted-a-website-to-behave-like-an-exhibition";
const exhibition = await request(exhibitionPath);
assert.equal(exhibition.status, 200);
for (let act = 1; act <= 18; act++) assert.equal(exhibition.body.split(`id="act-${act}"`).length - 1, 1, `exhibition citation act-${act}`);
assert.match(exhibition.body, /exhibition-comparison-panels/);
assert.match(exhibition.body, /exhibition-staged-change/);
assert.match(exhibition.body, /Writing this page changed the system/);
assert.match(exhibition.body, /compose attention through space and time/);
assert.match(exhibition.body, /id="source-10"/);
assert.ok(graph.nodes.some(n => n.id === "N-EXHIBITION" && n.url === `https://chrishayuk.com${exhibitionPath}`));
assert.ok(sitemap.body.includes(exhibitionPath));
for (const [slug, count] of [["what-has-to-survive",9],["reading-by-address",23],["my-ci-has-to-undo-my-coding-agent",5],["what-is-the-map",23],["which-source-wins",28],["the-address-is-built-through-depth",6],["context-should-be-abundant",3],["the-operator-and-the-model",2]]) {
  const note = await request(`/notebook/${slug}`);
  assert.equal(note.status,200,slug);
  assert.equal((note.body.match(/<h1[\s>]/g)||[]).length,1,`${slug}: one H1`);
  for(let act=1;act<=count;act++) assert.equal(note.body.split(`id="act-${act}"`).length-1,1,`${slug}: act-${act}`);
  assert.doesNotMatch(note.body,/class="agent-erasure/,`${slug}: no independent erasure`);
}
const stateStudy = await request("/notebook/what-has-to-survive");
assert.match(stateStudy.body,/hause-study-measures/);
assert.match(stateStudy.body,/hause-refusal-still/);
assert.match(stateStudy.body,/exhibition-comparison-panels/);
const addressStudy = await request("/notebook/reading-by-address");
assert.match(addressStudy.body,/hause-study-sequence/);
assert.match(addressStudy.body,/Cross-relation/);
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
const attributionPage=await request("/notebook/my-ci-has-to-undo-my-coding-agent");
assert.match(attributionPage.body,/property="og:type" content="article"/);
assert.match(attributionPage.body,/property="og:description" content="I say no\. The agent adds it\. The repository refuses it\."/);
assert.match(attributionPage.body,/property="og:url" content="https:\/\/chrishayuk\.com\/notebook\/my-ci-has-to-undo-my-coding-agent"/);
assert.match(attributionPage.body,/property="og:image" content="https:\/\/chrishayuk\.com\/api\/social\/N-ATTRIBUTION\?v=1f8e14413970"/);
assert.match(attributionPage.body,/property="og:image:width" content="1200"/);assert.match(attributionPage.body,/property="og:image:height" content="630"/);
assert.match(attributionPage.body,/property="og:image:type" content="image\/png"/);assert.match(attributionPage.body,/property="og:image:alt" content="Chris Hay Notebook:/);
assert.match(attributionPage.body,/name="twitter:card" content="summary_large_image"/);assert.match(attributionPage.body,/name="twitter:image:alt" content="Chris Hay Notebook:/);
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
assert.match(authority.body, /hause-refusal-still/);
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
assert.equal(signal.updated_at, signal.latest[0].updated_at);
// A draft carries the date it was recorded and no publication date.
for (const entry of signal.latest) {
  assert.ok(entry.recorded_at, `${entry.id} has no recorded_at`);
  assert.ok(entry.updated_at >= entry.recorded_at, `${entry.id} was updated before it was recorded`);
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

// MACHINE READERSHIP. The measurement the Google tag structurally cannot make,
// so the check exercises the thing itself rather than the presence of a page:
// an agent claim from an address its provider publishes has to come out
// verified, and the same claim from an address its provider excludes has to be
// refuted and kept out of every total.
const publishedRanges = JSON.parse(await readFile(new URL("../content/agent-ranges.json", import.meta.url), "utf8"));
const chatgptUser = publishedRanges.sources.find(source => source.id === "openai-chatgpt-user").prefixes.find(prefix => !prefix.includes(":")).split("/")[0];
const agent = (name, address) => ({ "User-Agent": name, "X-Forwarded-For": address });
await request("/notebook", "chrishayuk.com", agent("Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; ChatGPT-User/1.0; +https://openai.com/bot", chatgptUser));
await request("/follow.json", "chrishayuk.com", agent("Mozilla/5.0 (compatible; ClaudeBot/1.0; +claudebot@anthropic.com)", "203.0.113.7"));
const readership = JSON.parse((await request("/api/readership")).body);
assert.ok(readership.verification.prefixes > 100, "published address ranges are missing from the build");
assert.ok(readership.notes.length >= 5 && readership.definitions.ai_user.includes("Requests, not people"));
if (readership.recording) {
  assert.equal(readership.counts.purposes.ai_user, 1, "a verified user-initiated retrieval was not counted");
  assert.equal(readership.counts.confidence.verified, 1);
  assert.equal(readership.counts.confidence.refuted, 1, "a claim its provider's addresses exclude was not refuted");
  assert.equal(readership.counts.purposes.ai_training, 0, "a refuted claim reached a published total");
  assert.deepEqual(readership.counts.providers, [{ provider: "openai", retrieval: 1, indexing: 0, training: 0, total: 1 }], "a refuted claim reached the system breakdown");
  const page = await request("/readership");
  assert.equal(page.status, 200);
  assert.ok(page.body.includes('rel="canonical" href="https://chrishayuk.com/readership"'));
  assert.match(page.body, /A field of encounters/);
  assert.match(page.body, /ChatGPT-User/);
  assert.ok(readership.counts.exhibit.cells.some(cell => cell.agent === "ChatGPT-User" && cell.confidence === "verified" && cell.path === "/notebook" && cell.n === 1));
  assert.ok(readership.counts.exhibit.cells.every(cell => cell.confidence !== "refuted"));
  assert.ok(readership.counts.exhibit.contacts.every(cell => cell.agent !== "ClaudeBot"));
  // The refuted agent must not appear in the field. Other actors can legitimately
  // touch the same path: the expanded field includes CI's own automation too.
  const data = page.body.slice(0, page.body.indexOf("How this observatory measures"));
  assert.doesNotMatch(data, /Anthropic|ClaudeBot/, "a refuted agent was named among the counts");
  console.log("Machine readership verified: one verified retrieval counted, one refuted claim excluded.");
} else {
  const page = await request("/readership");
  assert.equal(page.status, 200);
  assert.match(page.body, /This deployment keeps no readership counters/);
  console.log("Machine readership page verified in its no-store state.");
}

// Public exhibitions render from their permitted evidence, without creating a declaration.
const instrument = await request("/machines");
assert.equal(instrument.status, 200);
assert.match(instrument.body, /One request\. Different evidence/);
assert.match(instrument.body, /CONSTRUCTED EXAMPLE/);
assert.match(instrument.body, /very_long/);
const guestbook = await request("/machine-guestbook");
assert.equal(guestbook.status, 200);
assert.match(guestbook.body, /me-presence-field/);
assert.doesNotMatch(guestbook.body, /href="\/machines"|href="\/api\/machines/);
const oldVisit = await request("/machines/experiments/MACHINE-VISIT-1");
assert.equal(oldVisit.status, 308);
assert.equal(new URL(oldVisit.headers.location, base).pathname, "/notebook/can-a-machine-use-an-invitation");
const visitExhibition = await request("/notebook/can-a-machine-use-an-invitation");
assert.equal(visitExhibition.status, 200);
assert.match(visitExhibition.body, /FOUR VISITS\. FOUR REVISIONS/);
for (const revision of ["5577b6a", "94f463d", "fb3989f", "57e8e98"]) assert.ok(visitExhibition.body.includes(revision));
assert.match(visitExhibition.body, /N-MACHINE-VISIT/);
assert.match(visitExhibition.body, /hause-study-room/);
assert.match(visitExhibition.body, /hause-field-notes/);
assert.match(visitExhibition.body, /REFERENCE DRAFT/);
const notebookCollection = await request("/notebook");
assert.match(notebookCollection.body, /href="\/notebook\/can-a-machine-use-an-invitation"/);
assert.match(notebookCollection.body, /mv-card-traces/);
assert.match(visitExhibition.body, /not reconstructed transcripts/);
const visitProtocol = await request("/data/machines/machine-visit-protocol.md");
assert.equal(visitProtocol.status, 200);
assert.equal(visitProtocol.body, await readFile(new URL("../docs/machine-visit-protocol.md", import.meta.url), "utf8"));
console.log("Machine surfaces and the visual notebook verified, including the permanent legacy redirect.");

const permissionNote = await request("/notebook/does-an-invitation-count-as-permission");
assert.equal(permissionNote.status, 200);
assert.match(permissionNote.body, /N-MACHINE-PERMISSION/);
assert.match(permissionNote.body, /hause-study-room/);
assert.match(permissionNote.body, /Not run/);
assert.match(permissionNote.body, /Never arrived/);
assert.match(permissionNote.body, /permission-control-evidence/);
assert.match(permissionNote.body, /href="\/notebook\/can-a-machine-use-an-invitation"/);
assert.match(notebookCollection.body, /href="\/notebook\/does-an-invitation-count-as-permission"/);
const reciprocityEvidence = JSON.parse((await request("/data/machines/reciprocity.json")).body);
assert.equal(reciprocityEvidence.cells.length, 8);
assert.equal(reciprocityEvidence.cells[7].databaseResult.values.declared, 1);
assert.equal(reciprocityEvidence.cells[7].databaseResult.values.used_enhanced_retrieval, null);
console.log("Permission notebook and all eight sourced outcomes verified.");

const selfReadNote = await request("/notebook/the-subject-read-the-experiment");
assert.equal(selfReadNote.status, 200);
for (const pattern of [/N-MACHINE-SELF-READ/, /hause-study-room/, /recognition-clue/, /Replay encounter/, /Separate the jobs/, /sr-experiment-track/, /sr-intent-network/, /Identify itself/, /Leave feedback/, /Inadmissible/, /claude-opus-5/, /Not run/]) assert.match(selfReadNote.body, pattern);
assert.match(notebookCollection.body, /href="\/notebook\/the-subject-read-the-experiment"/);
assert.match(permissionNote.body, /href="\/notebook\/the-subject-read-the-experiment"/);
const selfReadEvidence = await request("/data/machines/authority-1-evidence.json");
assert.equal(selfReadEvidence.status, 200);
assert.equal(JSON.parse(selfReadEvidence.body).admissible, 0);
console.log("The self-recognition notebook and its excluded result verified.");

for (const page of [visitExhibition, permissionNote, selfReadNote]) {
 assert.match(page.body, /sr-intent-network/);
 assert.match(page.body, /WHAT WERE WE TESTING/);
 assert.match(page.body, /IDENTIFY YOURSELF/);
 assert.match(page.body, /LEAVE FEEDBACK/);
}
console.log("All three machine notes explain the user, agent and website interaction.");

assert.match(selfReadNote.body, /<figure id="agent-disclosure" class="sr-agent-quote">/);
assert.match(selfReadNote.body, /I am almost certainly a run inside this experiment\./);
assert.doesNotMatch(selfReadNote.body, /sr-encounter-disclosure/);
console.log("The agent quote is a permanent part of the note, outside playback.");

assert.match(visitExhibition.body, /mv-verb-study/);
assert.match(visitExhibition.body, /machine-visit-verbs/);
assert.match(permissionNote.body, /SITE INVITATION \/ PRESENT THROUGHOUT/);
assert.match(permissionNote.body, /TASK PERMISSION \/ ADDED IN THE CONTROLS/);
