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
 assert.ok(!html.includes('class="machine-brief"'), "current editorial summary does not enter a frozen edition");
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
assert.equal((capability.match(/<button[^>]*aria-controls="capability-route-view"/g) || []).length, 6);
assert.ok(capability.includes('id="capability-cache-view"'));
assert.ok(capability.includes('The complete note &amp; its evidence'));
assert.ok(capability.includes('id="act-16"'));
console.log("Six mechanism controls, channel comparison, five evidence figures and the expandable manuscript verified.");

const discovery = (await (await get("/notebook/the-site-was-there-the-agent-never-saw-it")).text()).replace(/<!--[\s\S]*?-->/g, "");
const discoveryEvidence = await (await get("/data/machines/discovery-1-evidence.json")).json();
for (const cue of ["GENERIC", "PHRASE", "NAME"]) {
 assert.ok(discovery.includes(`aria-controls="discovery-cue-${cue}"`));
 assert.ok(discovery.includes(`id="discovery-cue-${cue}"`));
}
assert.equal((discovery.match(/class="md-cue-panel"/g) || []).length, 3);
for (const row of discoveryEvidence.subjects) {
 assert.ok(discovery.includes(`VISITOR ${String(row.subject).padStart(2, "0")}`));
 if (row.arm === "NAME") assert.ok(discovery.includes(`K17 = ${row.deployed}`));
}
for (const path of ["/robots.txt", "/notes/k17", "/notes/canal-lock", "/notes/controller-trace-17", "/machine.txt"]) {
 assert.ok(discovery.includes(`<code>${path}</code>`));
}
assert.match(discovery, /datetime="2026-09-12T20:09:35Z"/i);
assert.ok(discovery.includes('id="discovery-boundary"'));
assert.ok(discovery.includes("User-agent labels alone do not independently verify"));
const discoveryRecord = snapshots.filter(snapshot => snapshot.record.id === "N-MACHINE-DISCOVERY").at(-1).record;
for (let i = 0; i < discoveryRecord.body.length; i++) assert.ok(discovery.includes(`id="act-${i + 1}"`));
console.log("Discovery: three cue controls, nine visitor outcomes, crawler boundary and manuscript citation anchors verified.");

const inheritancePath = "/notebook/the-stronger-agent-left-something-behind";
const inheritance = (await (await get(inheritancePath)).text()).replace(/<!--[\s\S]*?-->/g, "");
assert.ok(inheritance.includes('id="inheritance-replay"'));
assert.ok(inheritance.includes('id="inheritance-replication"'));
assert.ok(inheritance.includes("Gemma e4b"));
assert.ok(inheritance.includes("READ n&lt;id&gt;"));
assert.ok(inheritance.includes('aria-label="Recorded handoff state"'));
assert.equal((inheritance.match(/class="ih-world"/g)||[]).length,2);
assert.ok(inheritance.includes('READ n0'));
assert.ok(inheritance.includes('REFRESH n0'));
assert.ok(inheritance.includes('Record n1 is available.'));
assert.ok(inheritance.includes('No inherited record.'));
for(const path of ["/", "/thread/agent-ecology", "/thread/machines", "/notebook"]){
 const html = await (await get(path)).text();
 const links = [...html.matchAll(/href="([^"]+)"/g)].map(match=>match[1]).filter(href=>href.split("#")[0]===inheritancePath);
 assert.ok(links.length,`${path} links the inheritance note`);
 for(const href of links){const hash=href.split("#")[1];if(hash) assert.ok(inheritance.includes(`id="${hash}"`),`${path}: ${href} resolves to an anchor`);}
}
console.log("Inheritance: historical source, paired replay, and homepage/thread/field-map entrances verified.");
