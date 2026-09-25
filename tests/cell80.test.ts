import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";
import { gunzipSync } from "node:zlib";
import barrier from "../lib/data/cell80-barrier-index.json" with { type: "json" };
import inheritedHistory from "../lib/data/cell80-inherited-history.json" with { type: "json" };
import barrierPreview from "../lib/data/cell80-barrier-preview.json" with { type: "json" };
import { createHash } from "node:crypto";
import { cell80, dependenceGate, factorialAt } from "../lib/cell80.ts";
import { cell80Thread, threadPosition } from "../lib/threads.ts";
import { getRecord, publishedRecords } from "../lib/records.ts";
import { cell80Followups, realization } from "../lib/cell80-followups.ts";

test("EX-14 visual preserves paired raw outcomes, missing reproduction and source provenance", async () => {
  const raw = (await readFile(new URL('../public/data/cell80/followups/ex14.jsonl', import.meta.url), 'utf8'))
    .trim().split('\n').map(line => JSON.parse(line));
  const assays = raw.filter(row => row.type === 'assay');
  assert.equal(assays.length, 100);
  assert.equal(new Set(assays.map(row => row.seed)).size, 100);
  for (const [i, row] of assays.entries()) {
    const births = Object.fromEntries(row.values.map((value: { genotype: string; N: number }) => [value.genotype, value.N]));
    assert.deepEqual(cell80Followups.assays[i], { seed: row.seed, births });
    assert.equal(row.D, births.BC - births.B);
    assert.equal(row.event, births.BC > 0 || births.B > 0);
  }
  assert.deepEqual(realization.arms.map(arm => arm.count), [0,22,0,64]);
  assert.deepEqual([realization.positive, realization.tied, realization.negative, realization.unrealized], [63,1,0,36]);
  assert.equal(realization.events + realization.unrealized, realization.total);
  const downloaded = JSON.parse(await readFile(new URL('../public/data/cell80/followups.json', import.meta.url), 'utf8'));
  assert.deepEqual(downloaded, cell80Followups);
  for (const source of cell80Followups.provenance) {
    const bytes = await readFile(new URL(`../public/data/cell80/${source.file}`, import.meta.url));
    assert.equal(createHash('sha256').update(bytes).digest('hex'), source.sha256);
  }
});

test("factorial interaction is reconstructed from all four recorded birth counts", () => {
  assert.equal(cell80.factorials.length, 40);
  for (const [candidate, entry] of cell80.interactions.entries()) {
    for (const [world, expected] of entry.differences.entries()) {
      const actual = factorialAt(candidate, world);
      assert.equal(actual.newBenefit, expected.benefit_new);
      assert.equal(actual.oldBenefit, expected.benefit_old);
      assert.equal(actual.interaction, expected.interaction);
      assert.equal(actual.seed, expected.seed);
    }
  }
  assert.deepEqual([0,1].map(i=>dependenceGate(i).positive), [3,0]);
  assert.equal(dependenceGate(0).mean,17.4);
  assert.equal(dependenceGate(0).passes,false); // A positive mean alone must not pass.
  assert.equal(dependenceGate(1).passes,false);
  assert.throws(()=>factorialAt(0,5),RangeError);
});

test("benefit and novelty displays retain their actual denominators",()=>{
  assert.equal(cell80.firstSteps.length,108);
  assert.deepEqual([1,0,-1].map(sign=>cell80.firstSteps.filter(r=>Math.sign(r.delta_children)===sign).length),[8,84,16]);
  assert.equal(cell80.novelty.length,8);
  assert.equal(cell80.novelty.filter(r=>r.equivalent_disk_genes.length).length,5);
  for(const r of cell80.novelty){
    assert.equal(new Set(r.inputs.map(input=>input.join(','))).size,8);
    assert.deepEqual(r.raw_outputs.map(output=>Math.min(output,3)),r.action_classes);
  }
});

test("survival and coupling remain separate endpoints",()=>{
  for(const [bps,expected] of [[100,5],[200,6]]){
    const worlds=cell80.predators.filter(r=>r.swap_bps===bps);
    assert.equal(worlds.length,6);
    assert.equal(worlds.filter(r=>r.grazers>0&&r.predators>0).length,expected);
    assert.equal(worlds.filter(r=>r.passes_screen).length,0);
  }
  const extinction=cell80.predators.find(r=>r.swap_bps===100&&r.seed==='3')!;
  assert.equal(extinction.label_p,null);
});

test("six drafts resolve in reading order without becoming published snapshots",()=>{
  const ids=['N-CELL80-01','N-CELL80-02','N-CELL80-03','N-CELL80-BARRIER','N-CELL80-HISTORY','N-CELL80-BOUND'];
  assert.deepEqual(cell80Thread.steps.map(s=>s.id),ids);
  assert.equal(threadPosition(ids[0])?.previous,undefined);
  assert.equal(threadPosition(ids[0])?.next?.id,ids[1]);
  assert.equal(threadPosition(ids[5])?.next,undefined);
  for (let i = 0; i < ids.length; i++) {
    assert.equal(threadPosition(ids[i])?.previous?.id, ids[i-1]);
    assert.equal(threadPosition(ids[i])?.next?.id, ids[i+1]);
  }
  for(const id of ids){
    const record=getRecord(id)!;
    assert.equal(record.publication,'draft');
    assert.ok(record.sources.some(s=>s.url?.startsWith('/data/cell80/')));
    if (ids.indexOf(id) < 3) assert.ok(record.sources.some(s=>s.url?.startsWith('https://')));
    assert.ok(!publishedRecords().some(r=>r.id===id));
  }
});

test("downloaded evidence matches the instruments and every report hash",async()=>{
  const publicData=JSON.parse(await readFile(new URL('../public/data/cell80/evidence.json',import.meta.url),'utf8'));
  assert.deepEqual(publicData,cell80);
  for(const file of cell80.provenance){
    const bytes=await readFile(new URL(`../public/data/cell80/${file.file}`,import.meta.url));
    assert.equal(createHash('sha256').update(bytes).digest('hex'),file.sha256);
  }
});

const replayModule = import('../lib/cell80-replay.ts');
async function replayFixture(kind: 'lineage' | 'ecology') {
  const { decodeReplay } = await replayModule;
  const bytes = await readFile(new URL(`../public/data/cell80/${kind}-replay.json.gz`, import.meta.url));
  return decodeReplay(bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength));
}

test('homepage and social comparison captions match both recorded tick-1080 worlds', async () => {
  const preview = JSON.parse(await readFile(new URL('../lib/data/cell80-home-preview.json', import.meta.url), 'utf8'));
  const replay = await replayFixture('lineage');
  const { frameCounts } = await replayModule;
  assert.equal(preview.histories.length, replay.histories.length);
  assert.equal(preview.width, replay.width);
  for (const [index, history] of replay.histories.entries()) {
    const caption = preview.histories[index];
    const frame = history.frames.find(frame => frame.tick === preview.tick)!;
    assert.ok(frame);
    const counts = frameCounts(frame);
    assert.equal(caption.historyHash, history.hash);
    assert.equal(caption.label, history.label);
    assert.equal(caption.population, counts.population);
    assert.equal(caption.program33, counts.program33);
    assert.equal(caption.share, `${(100 * counts.program33 / counts.population).toFixed(1)}%`);
  }
});

test('spatial replay preserves the actual pre-fork states and changes only the inherited program at birth', async () => {
  const { replayIndex, frameCounts } = await replayModule;
  const data = await replayFixture('lineage');
  const [observed, undone] = data.histories;
  assert.equal(observed.frames.length, undone.frames.length);
  for (let i=0;i<observed.frames.length;i++) {
    assert.equal(observed.frames[i].tick,undone.frames[i].tick);
    if(observed.frames[i].tick<994)assert.deepEqual(observed.frames[i],undone.frames[i]);
  }
  const birthIndex=replayIndex(observed.frames,994);
  const a=observed.frames[birthIndex],b=undone.frames[birthIndex];
  assert.equal(a.tick,994);
  const child=a.organisms.find(o=>o[0]===2231)!;
  assert.deepEqual(child.slice(4),[33,192,1]);
  assert.deepEqual(b.organisms.find(o=>o[0]===2231)!.slice(4),[37,192,1]);
  const reverted=structuredClone(a);
  reverted.organisms.find(o=>o[0]===2231)![4]=37;
  assert.deepEqual(reverted,b);
  const shift=frameCounts(observed.frames[replayIndex(observed.frames,1080)]);
  assert.equal((shift.program33/shift.population*100).toFixed(1),'35.3');
  assert.equal(replayIndex(observed.frames,-10),0);
  assert.equal(observed.frames[replayIndex(observed.frames,981)].tick,980);
  assert.equal(observed.frames[replayIndex(observed.frames,5000)].tick,1999);
});

test('ecology replay matches the registered world, and every exported position and food tile is valid', async () => {
  const { foodAt, frameCounts } = await replayModule;
  const data=await replayFixture('ecology');
  const record=cell80.predators.find(r=>r.seed==='42'&&r.swap_bps===200)!;
  const history=data.histories[0],frames=history.frames;
  assert.equal(history.hash,record.hash);
  assert.equal(frames.at(-1)!.tick,9999);
  const final=frameCounts(frames.at(-1)!);
  assert.equal(final.grazers,record.grazers);
  assert.equal(final.predators,record.predators);
  assert.equal(frames.at(-1)!.births,record.births);
  let tick=-1,births=0,deaths=0;
  for(const frame of frames){
    assert.ok(frame.tick>tick);tick=frame.tick;
    assert.ok(frame.births>=births);births=frame.births;
    assert.ok(frame.deaths>=deaths);deaths=frame.deaths;
    assert.equal(frame.organisms.length,70+frame.births-frame.deaths);
    assert.equal(frame.food.length,data.width*data.height/4);
    assert.match(frame.food,/^[0-9a-f]+$/);
    let previousId=-1;
    for(const o of frame.organisms){assert.ok(o[0]>previousId);previousId=o[0];assert.ok(o[1]>=0&&o[1]<data.width*data.height);assert.ok(o[3]===0||o[3]===1);assert.ok(o[4]<data.promoters.length);}
  }
  const fixture={...frames[0],food:'95'};
  assert.deepEqual(Array.from({length:8},(_,i)=>foodAt(fixture,i)),[true,false,false,true,true,false,true,false]);
});

test('replay downloads have pinned hashes and initial preview frames are exact extracts',async()=>{
  const {decodeReplay}=await replayModule;
  const provenance=JSON.parse(await readFile(new URL('../public/data/cell80/replay-provenance.json',import.meta.url),'utf8'));
  const posters=JSON.parse(await readFile(new URL('../lib/data/cell80-replay-posters.json',import.meta.url),'utf8'));
  for(const kind of ['lineage','ecology'] as const){
    const bytes=await readFile(new URL(`../public/data/cell80/${kind}-replay.json.gz`,import.meta.url));
    assert.equal(createHash('sha256').update(bytes).digest('hex'),provenance.replays[kind].sha256);
    const data=await replayFixture(kind);
    for(const [i,h] of data.histories.entries()){
      const preview=posters[kind].histories[i].frames[0];
      assert.deepEqual(preview,h.frames.find(f=>f.tick===preview.tick));
    }
    const plain=new TextEncoder().encode(JSON.stringify(posters[kind]));
    assert.deepEqual(await decodeReplay(plain.buffer),posters[kind]);
  }
});


test("EX-11 viewer preserves every recorded population count, including births lost within a tick", async () => {
  const compressed = await readFile(new URL(`../public/data/cell80/${barrier.source.file}`, import.meta.url));
  assert.equal(createHash('sha256').update(compressed).digest('hex'), barrier.source.sha256);
  const raw = gunzipSync(compressed);
  assert.equal(createHash('sha256').update(raw).digest('hex'), barrier.source.rawSha256);
  const rows = raw.toString().trim().split('\n').map(line=>JSON.parse(line));
  const discoveries = rows.filter(row=>row.type==='discovery');
  assert.equal(discoveries.length,40);assert.equal(barrier.worlds.length,40);
  for (const world of barrier.worlds) {
    const bytes = await readFile(new URL(`../public/data/cell80/barrier/${world.key}.json`,import.meta.url));
    assert.equal(createHash('sha256').update(bytes).digest('hex'),world.sha256);
    const history = JSON.parse(bytes.toString());
    const record = discoveries.find(r=>r.arm===world.arm && r.seed===world.seed).result;
    const expected = record.trajectory.map((f:Record<string,number>)=>[f.tick,f.alive,f.capable,f.capable_high]);
    assert.deepEqual(history.frames,expected);assert.equal(history.frames.length,3000);
    assert.equal(world.finalFraction,record.final_window_capable_fraction);
    assert.equal(world.historyHash,record.hash);
    for (const [i,f] of history.frames.entries()) {
      assert.equal(f[0],i);assert.ok(0<=f[3] && f[3]<=f[2] && f[2]<=f[1] && f[1]<=256);
    }
    if(world.key==='full-5')assert.deepEqual(history,barrierPreview);
  }
  assert.deepEqual(['full','b_only','no_substrate','atomic_only'].map(arm=>{
    const worlds=barrier.worlds.filter(w=>w.arm===arm);
    return [worlds.filter(w=>w.origins>0).length,worlds.filter(w=>w.retained).length];
  }),[[3,2],[2,1],[3,0],[0,0]]);
  const fleeting=barrier.worlds.find(w=>w.key==='full-7')!;
  assert.equal(fleeting.origins,1);assert.equal(fleeting.firstBirth,475);assert.equal(fleeting.firstObserved,null);
  const downloaded=JSON.parse(await readFile(new URL('../public/data/cell80/barrier/index.json',import.meta.url),'utf8'));
  assert.deepEqual(downloaded,barrier);
});


test("EX-13 family playback preserves every recorded step and distinguishes a family from the whole world", async()=>{
  const compressed=await readFile(new URL(`../public/data/cell80/${inheritedHistory.source.file}`,import.meta.url));
  assert.equal(createHash('sha256').update(compressed).digest('hex'),inheritedHistory.source.sha256);
  const raw=gunzipSync(compressed);
  assert.equal(createHash('sha256').update(raw).digest('hex'),inheritedHistory.source.selectedRowsSha256);
  const rows=raw.toString().trim().split('\n').map(line=>JSON.parse(line));
  const trace=rows.find(r=>r.type==='retention_trace').trace;
  const world=rows.find(r=>r.type==='discovery' && r.arm==='full').result;
  assert.ok(rows.every(r=>r.seed===inheritedHistory.seed));
  assert.equal(inheritedHistory.child,trace.candidate.child);
  assert.equal(inheritedHistory.birth,trace.candidate.tick);
  assert.deepEqual(inheritedHistory.firstTransmission,trace.first_bc_transmission);
  assert.equal(inheritedHistory.frames.length,2835);
  for(const [i,actual] of inheritedHistory.frames.entries()){
    const f=trace.trajectory[i];const w=world.trajectory[f.tick];
    assert.deepEqual(actual,[f.tick,w.alive,f.intact_descendants_alive,w.capable_high,f.descendants_alive,Number(f.founder_alive)]);
    assert.equal(f.tick,inheritedHistory.birth+i);
    assert.ok(actual[2]<=actual[4] && actual[4]+actual[5]<=actual[1] && actual[2]+actual[5]<=actual[3]);
  }
  assert.deepEqual([50,200,500].map(age=>inheritedHistory.frames[age][2]),[217,148,230]);
  assert.equal(inheritedHistory.extinction,1268);
  const endOfFamily=inheritedHistory.frames[1268-inheritedHistory.birth];
  assert.deepEqual([endOfFamily[2],endOfFamily[4],endOfFamily[5],endOfFamily[3]],[0,0,0,239]);
  assert.deepEqual([inheritedHistory.frames.at(-1)![2],inheritedHistory.frames.at(-1)![3]],[0,235]);
  assert.deepEqual(JSON.parse(await readFile(new URL('../public/data/cell80/inherited-history.json',import.meta.url),'utf8')),inheritedHistory);
});


test("AP-2 control charts retain the raw measurements and archived hashes", async () => {
  const read = async (file: string) => readFile(new URL(`../${file}`, import.meta.url));
  const raw = JSON.parse(gunzipSync(await read('public/data/cell80/bound/ap2-encapsulation.json.gz')).toString());
  const chart = JSON.parse((await read('lib/data/cell80-bound-controls.json')).toString());
  assert.deepEqual(chart.enzyme, raw.enzyme_test);
  const rows = raw.flux_from_ancestor.modules.filter((row: {role: string}) => ['enzyme', 'structure-matched control'].includes(row.role));
  assert.equal(chart.controls.length, 9);
  for (const [i, row] of chart.controls.entries()) {
    for (const [key, value] of Object.entries(row)) assert.deepEqual(value, rows[i][key]);
    assert.equal(row.built_on_unreachable_before, 27888);
  }
  assert.equal(chart.controls.filter((r: {newly_reachable_within_3: number}) => r.newly_reachable_within_3 > chart.controls[0].newly_reachable_within_3).length, 2);
  const index = JSON.parse((await read('public/data/cell80/bound/index.json')).toString());
  for (const source of index.provenance) {
    const bytes = await read(`public/data/cell80/${source.file}`);
    assert.equal(createHash('sha256').update(bytes).digest('hex'), source.sha256, source.file);
    if (source.rawSha256) assert.equal(createHash('sha256').update(gunzipSync(bytes)).digest('hex'), source.rawSha256);
  }
});
