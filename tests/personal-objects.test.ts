import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";
import { personalObjects, seeingCollection, objectsFilm } from "../lib/personal-objects.ts";
import { recordGraph, searchGraph } from "../lib/graph.ts";
import { canonicalPaths, archivePaths } from "../lib/canonical.ts";

test("personal objects retain Chris’s order and only supplied personal accounts", () => {
 assert.deepEqual(personalObjects.slice(0,2).map(object => object.slug), ["swanwick", "juliet"]);
 assert.match(personalObjects[0].note!, /wear in my videos/);
 assert.match(personalObjects[0].note!, /Swanwicks help indoors; sunglasses are for outside/);
 assert.match(seeingCollection.description, /sensitive to light/);
 assert.match(personalObjects[1].note!, /formal events/);
 assert.equal(personalObjects.slice(2).filter(object => object.note).length, 0);
 assert.equal(new Set(personalObjects.map(object => object.slug)).size, personalObjects.length);
});

test("the personal collection is discoverable without inventing research status or manufacturing credit", () => {
 const {nodes,edges} = recordGraph();
 for (const object of personalObjects) {
  const node = nodes.find(node => node.id === object.id)!;
  assert.equal(node.basis, "personal-account");
  assert.equal(node.status, undefined);
  assert.equal(node.sourceUrl, `https://chrishayuk.com${seeingCollection.path}#${object.slug}`);
  assert.ok(edges.some(edge => edge.from === object.id && edge.to === seeingCollection.id && edge.kind === "collected-in"));
  assert.ok(!edges.some(edge => edge.from === object.id && edge.kind === "created-by"));
 }
 assert.ok(searchGraph("Swanwick").some(result => result.id === "OBJECT-SWANWICK" && result.basis === "personal-account"));
 assert.ok(searchGraph("Juliet formal events").some(result => result.id === "OBJECT-JULIET"));
 assert.ok(searchGraph("Swanwick indoors").some(result => result.id === "OBJECT-SWANWICK"));
 assert.ok(canonicalPaths().includes(seeingCollection.path));
 assert.ok(archivePaths().includes(seeingCollection.path));
});

test("lookbook imagery retains its existing source rather than fabricating owned product photographs", async () => {
 assert.ok((await readFile(new URL(`../public${objectsFilm.image}`, import.meta.url))).length > 1000);
 assert.equal(objectsFilm.source, "https://www.youtube.com/watch?v=5_ZiJpl4hvs");
 assert.match(objectsFilm.alt, /original terminal overlay/);
 assert.ok(!objectsFilm.image.includes("latest"));
 assert.ok((await readFile(new URL(`../public${objectsFilm.video}`, import.meta.url))).length > 1000);
 for (const object of personalObjects.slice(1)) {
  assert.ok(object.reference, `${object.id}: a sourced reference pair`);
  assert.ok(object.reference.source.startsWith("https://"));
  assert.ok((await readFile(new URL(`../public${object.reference.image}`, import.meta.url))).length > 1000);
 }
});
