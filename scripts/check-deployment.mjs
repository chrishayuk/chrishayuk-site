import assert from "node:assert/strict";
import http from "node:http";

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
assert.ok(home.body.indexOf('id="the-work"') < home.body.indexOf('id="person"'));
assert.match(home.body, /id="from-the-notebook"/);
assert.match(home.body, /href="\/notebook\/what-is-the-map"/);
assert.match(home.body, /data-media-id="notebook-map-trajectory"/);
assert.ok(home.body.indexOf('id="latest-youtube"') < home.body.indexOf('id="the-work"'));
assert.ok(home.body.indexOf('id="latest-mixture-of-experts"') < home.body.indexOf('id="the-work"'));
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
const ask = await request("/ask?q=How%20many%20episodes%3F");
assert.equal(ask.status, 200);
assert.match(ask.body, /at least 46/);
const draftSearch=JSON.parse((await request("/api/search?q=operator%20knows&scope=records")).body);
assert.ok(draftSearch.results.some(r=>r.recordId==="N-OPERATOR"&&r.basis==="draft-record"));
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
const map=await request("/notebook/what-is-the-map");
for (const frame of [156,286,434,1222]) assert.ok(map.body.includes(`/media/notebook/stills/HJlWDSyDcD4-${frame}.webp`));
assert.match(map.body,/demo-invitation-stage/);
assert.match(map.body,/href="\/demos\/addressed-memory"/);
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
assert.equal((await request("/api/health")).status, 200);
assert.equal((await request("/og-house.png")).status, 200);
console.log("Production homepage, visual notebooks, interactive demo, clip media, catalogue, canonical redirects, indexing, graph, Ask and citations verified.");
