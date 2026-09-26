import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import data from '../public/data/ecology/recovery/evidence.json' with {type:'json'};
import inspection from '../public/data/ecology/recovery/inspection.json' with {type:'json'};
import { getRecord } from '../lib/records.ts';
import { recoveryChapters } from '../lib/recovery-reading.ts';
import { recordGraph } from '../lib/graph.ts';
import { latestNotes, programmeHighlights } from '../lib/publication-index.ts';
test('recovery figures retain exact canonical reports, paired flags and denominators',()=>{
 for(const s of data.sources) assert.equal(createHash('sha256').update(readFileSync(new URL(`../public${s.publicPath}`,import.meta.url))).digest('hex'),s.sha256);
 assert.deepEqual(data.panels.map(p=>p.arms.map(a=>a.successes)),[[0,0,6,0],[0,7]]);
 for(const p of data.panels){for(const a of p.arms){assert.equal(a.denominator,12);assert.equal(a.flags.reduce((s,n)=>s+n,0),a.successes);}const b=p.arms.find(a=>a.id==='B')!,c=p.arms.find(a=>a.id==='C')!;const discordant=c.flags.filter((v,i)=>v!==b.flags[i]).length;assert.equal(p.primary.two_sided_exact_p,2*Math.pow(.5,discordant));}
 assert.equal(data.panels[1].arms[1].firstRecovery.filter(g=>g===11).length,7);
});
test('publication is current and discoverable while predecessor snapshot stays intact',()=>{
 const id='N-ECOLOGY-RECOVERY',r=getRecord(id)!;assert.equal(r.publication,'published');assert.equal(r.version,'1.1');assert.equal(latestNotes[0].id,id);assert.equal(programmeHighlights['agent-ecology'],id);
 assert.ok(recordGraph().edges.some(e=>e.from===id&&e.to==='THREAD-AGENT-ECOLOGY'));
 assert.equal(getRecord('N-ECOLOGY-WORLD-REMEMBERS')!.published,'2026-09-15');
 const text=JSON.stringify(r.body);for(const qualifier of ['protected','interface','independent new sample','not an uninterrupted'])assert.ok(text.includes(qualifier));
});

test('the explanatory instrument derives the lost value from the recorded public diagnostic',()=>{
 const row=data.example.evidence[1];
 const candidates=Array.from({length:17},(_,i)=>i).filter(code=>(row.gain*code+row.offset)%17===row.observed);
 assert.deepEqual(candidates,[0]);assert.equal((row.gain*data.example.damaged[1]+row.offset)%17,4);
 assert.deepEqual(data.example.evidence.map(r=>Array.from({length:17},(_,i)=>i).find(c=>(r.gain*c+r.offset)%17===r.observed)),data.example.proposed);
 assert.deepEqual(data.example.freshEvidence.map(r=>Array.from({length:17},(_,i)=>i).find(c=>(r.gain*c+r.offset)%17===r.observed)),data.example.freshTruth);
});

test('the long read preserves every published act in order with its original anchor',()=>{
 const record=getRecord('N-ECOLOGY-RECOVERY')!;
 const chapters=recoveryChapters(record);
 const reading=chapters.flatMap(chapter=>chapter.acts);
 assert.deepEqual(reading.map(({act})=>act),record.body);
 assert.deepEqual(reading.map(({index})=>index),record.body.map((_,index)=>index));
 assert.equal(new Set(chapters.map(chapter=>chapter.id)).size,chapters.length);
 assert.equal(chapters.length,11);
 assert.ok(chapters[0].acts.length>1);
 assert.ok(chapters.some(chapter=>chapter.acts.some(({act})=>'text' in act && act.text.includes('protected'))));
});

test('the twelve inspectable worlds reproduce the paired endpoint and repeated assessment totals', () => {
 assert.deepEqual(inspection.worlds.map(w => w.block), Array.from({length:12}, (_, i) => i));
 assert.deepEqual(inspection.worlds.filter(w => !w.admitted).map(w => w.block), [0, 1, 4, 7]);
 const panel = data.panels.find(p => p.id === 'I12R')!;
 for (const [index, arm] of panel.arms.entries()) {
  assert.deepEqual(inspection.worlds.map(w => Number(w.arms[index].assessments.some(a => a.joint))), arm.flags);
  for (const world of inspection.worlds) {
   const samples = world.arms[index].assessments;
   assert.equal(world.arms[index].id, arm.id);
   assert.deepEqual(samples.map(s => s.generation), Array.from({length:10}, (_, i) => i + 11));
   for (const sample of samples) assert.equal(sample.joint, sample.recordCorrect && sample.taskCorrect);
  }
 }
 const executable = inspection.worlds.flatMap(w => w.arms[1].assessments);
 assert.equal(executable.filter(a => a.recordCorrect).length, 61);
 assert.equal(executable.filter(a => a.taskCorrect).length, 66);
 assert.equal(executable.filter(a => a.joint).length, 59);
 assert.equal(inspection.worlds.filter(w => w.arms[1].assessments.at(-1)!.joint).length, 6);
});

test('specimen measurements independently recover each original record and verify the G11 trace', () => {
 for (const world of inspection.worlds) {
  const derived = world.evidence.map(row => Array.from({length:17}, (_, i) => i).find(c => (row.gain*c+row.offset)%17 === row.observed));
  assert.deepEqual(derived, world.original);
  assert.equal(world.original.filter((n, i) => n !== world.damaged[i]).length, 1);
  assert.notEqual(world.original[world.target], world.damaged[world.target]);
  for (const arm of world.arms) {
   const trace = arm.firstTrace;
   assert.deepEqual(trace.before, world.damaged);
   assert.equal(JSON.stringify(trace.after) === JSON.stringify(world.original), arm.assessments[0].recordCorrect);
   if (trace.committed) {
    const reply = JSON.parse(trace.reply2);
    assert.equal(reply.action, 'COMMIT');
    assert.deepEqual(reply.record, trace.after);
    assert.equal(JSON.stringify(reply.answers) === JSON.stringify(world.freshTruthG11), arm.assessments[0].taskCorrect);
   }
  }
 }
 const failure = inspection.worlds[9].arms[1].firstTrace;
 assert.deepEqual(failure.after, data.example.committed);
 assert.deepEqual(failure.receipt.record?.proposal, data.example.proposed);
 assert.equal(inspection.specimen.packageSha256, inspection.worlds[9].packageSha256);
 assert.equal(inspection.sources[0].sha256, data.sources[1].sha256);
});
