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
for(const path of ["/ideas","/systems","/objects","/record"]) {
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
const films = JSON.parse((await request("/api/records")).body);
assert.equal(films.count, 241);
const ibm = films.records.find(r => r.id.includes("W3iQbl5R_Jk"));
assert.ok(ibm);
const cite = await request(`/api/citations/${ibm.id}?format=csl-json`);
assert.equal(cite.status, 200);
assert.deepEqual(JSON.parse(cite.body).author, [{literal: "IBM"}]);
assert.equal((await request("/api/health")).status, 200);
assert.equal((await request("/og-house.png")).status, 200);
console.log("Production homepage, house collections, catalogue pagination, canonical URLs, nine redirects, preview noindex, sitemap, graph, Ask, citations and static media verified.");
