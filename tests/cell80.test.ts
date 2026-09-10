import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { cell80, dependenceGate, factorialAt } from "../lib/cell80.ts";
import { cell80Thread, threadPosition } from "../lib/threads.ts";
import { getRecord, publishedRecords } from "../lib/records.ts";

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

test("three drafts resolve in reading order without becoming published snapshots",()=>{
  const ids=['N-CELL80-01','N-CELL80-02','N-CELL80-03'];
  assert.deepEqual(cell80Thread.steps.map(s=>s.id),ids);
  assert.equal(threadPosition(ids[0])?.previous,undefined);
  assert.equal(threadPosition(ids[0])?.next?.id,ids[1]);
  assert.equal(threadPosition(ids[2])?.next,undefined);
  for(const id of ids){
    const record=getRecord(id)!;
    assert.equal(record.publication,'draft');
    assert.ok(record.sources.some(s=>s.url?.startsWith('https://')));
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
