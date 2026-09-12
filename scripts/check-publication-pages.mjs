import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";

// Read-only verification: also safe to run against the public deployment.
const base = process.env.CHECK_ORIGIN || "http://127.0.0.1:3000";
const snapshots = JSON.parse(await readFile(new URL("../content/publications.json", import.meta.url)));
const get = async path => {
 const response = await fetch(new URL(path, base), { headers: { "User-Agent": "chrishayuk-operator/publication-verification", Host: "chrishayuk.com" } });
 assert.equal(response.status, 200, path);
 return response;
};
const graph = await (await get("/api/graph")).json();
for (const snapshot of snapshots) {
 const { id, version, title, abstract } = snapshot.record;
 const path = `/records/${id}/${version}`;
 const html = await (await get(path)).text();
 const json = await (await get(`/api/record/${id}?version=${version}`)).json();
 assert.deepEqual(json.record, snapshot.record);
 assert.equal(json.hash, snapshot.hash);
 assert.ok(html.includes("PRESERVED MANUSCRIPT"));
 const ld = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(match => JSON.parse(match[1])).find(entry => entry.headline === title);
 assert.equal(ld.url, `https://chrishayuk.com${path}`);
 assert.equal(ld.abstract, abstract);
 assert.equal(ld.identifier.value, snapshot.hash);
 const history = await (await get(`/api/record/${id}/history`)).json();
 const entry = history.versions.find(entry => entry.version === version);
 assert.equal(entry.hash, snapshot.hash);
 for (const source of entry.sources.filter(source => source.preserved)) {
  const bytes = Buffer.from(await (await get(source.preserved.url)).arrayBuffer());
  assert.equal(createHash("sha256").update(bytes).digest("hex"), source.preserved.sha256);
 }
 const citation = await (await get(`/api/citations/${id}?version=${version}&format=csl-json`)).json();
 assert.equal(citation.URL, ld.url);
 assert.equal(citation.version, version);
 assert.equal(citation.id, `${id}-v${version}`);
 assert.equal(citation.title, title);
 assert.ok(graph.nodes.some(node => node.id === `${id}@${version}` && node.sourceHash === snapshot.hash));
 console.log(`Verified ${id} v${version}: manuscript, citation, evidence, history and graph.`);
}
const capability = await (await get("/notebook/the-tool-was-not-the-problem")).text();
for (const marker of ["wc-results", "wc-toolbox", "wc-module", "wc-cache", "wc-next"]) assert.ok(capability.includes(`class="${marker}"`), marker);
assert.equal((capability.match(/<details data-construction=/g) || []).length, 6);
console.log("Six capability result rows and five visual evidence sections verified.");
