import assert from "node:assert/strict";
import test from "node:test";
import {readFileSync} from "node:fs";
import {createHash} from "node:crypto";
import result from "../public/data/ecology/i1-result.json" with {type:"json"};
import replay from "../public/data/ecology/i1-replay.json" with {type:"json"};
import {getRecord} from "../lib/records.ts";
import {recordGraph, retrieveGraph} from "../lib/graph.ts";
import {agentEcologyThread} from "../lib/threads.ts";

test("I1 public evidence matches its registered bytes and every replay row",()=>{
 const bytes=readFileSync(new URL('../public/data/ecology/i1-result.json',import.meta.url));
 assert.equal(createHash('sha256').update(bytes).digest('hex'),replay.sourceSha256['i1/result.json']);
 assert.equal(replay.frames.length,18);
 for(const row of result.rows){
  const frame=replay.frames.find(frame=>frame.case_id===row.case_id)!;
  for(const key of ['reply','world_row','maintenance_event','store_after'] as const) assert.deepEqual(frame[key],row[key]);
 }
 assert.deepEqual(replay.analysis,result.analysis);
 assert.deepEqual(replay.generations,result.generations);
});
test("the preserved copy supplies the key and benefit, with no recipient renewal",()=>{
 const sourceCopy=replay.sol.frames.find(frame=>frame.reply==='REFRESH n0')!.maintenance_event.created!;
 const inherited=replay.generations.find(g=>g.arm==='inherit' && g.generation===2)!.trace;
 const removed=replay.generations.find(g=>g.arm==='removed' && g.generation===2)!.trace;
 assert.deepEqual(inherited.entry_store.records,[sourceCopy]);
 assert.equal(sourceCopy.parent_id,'n0');
 assert.equal(sourceCopy.last_generation,2);
 assert.equal(inherited.entry_store.next_id,removed.entry_store.next_id);
 assert.equal(removed.entry_store.records.length,0);
 const frames=replay.frames.filter(r=>r.arm==='inherit'&&r.generation===2);
 assert.deepEqual(frames.map(r=>r.reply),['WORK t1','READ n1','WORK t0']);
 assert.deepEqual(frames.map(r=>r.world_row.after.key),[false,true,true]);
 assert.deepEqual(frames.map(r=>r.world_row.after.resources[0]),[1,1,7]);
 assert.ok(replay.frames.every(r=>!r.maintenance_event.requested && !r.maintenance_event.created));
 assert.deepEqual(replay.analysis.resource_differences,[4,0,0]);
 for(const g of replay.generations.filter(g=>g.generation>2)){
  assert.ok(g.trace.entry_store.records.every(r=>r.last_generation<g.generation));
  assert.equal(g.trace.final_resources,3);
 }
});
test("the published inheritance result joins the thread, graph and Ask with its limits",()=>{
 const note=getRecord('N-ECOLOGY-INHERITANCE')!;
 assert.equal(note.publication,'published');
 assert.equal(note.version,'1.0');
 assert.ok(agentEcologyThread.steps.some(step=>step.id===note.id));
 assert.equal(agentEcologyThread.replay.record,note.id);
 const graph=recordGraph();
 assert.ok(graph.edges.some(edge=>edge.from===note.id && edge.to===agentEcologyThread.id && edge.kind==='in-thread'));
 assert.ok(retrieveGraph('Sol Qwen capability inheritance',{scope:'records'}).results.some(r=>r.id===note.id || r.recordId===note.id));
 assert.match(note.abstract,/without observed renewal/);
 assert.ok(note.body.some(act=>act.kind==='question' && act.status==='OPEN'));
});

test("I2 preserves equal inherited payoffs and Gemma's failing control, without ranking contrasts", async()=>{
 const {default:i2}=await import('../public/data/ecology/i2-result.json',{with:{type:'json'}});
 const {default:summary}=await import('../public/data/ecology/i2-summary.json',{with:{type:'json'}});
 const bytes=readFileSync(new URL('../public/data/ecology/i2-result.json',import.meta.url));
 assert.equal(createHash('sha256').update(bytes).digest('hex'),summary.sourceSha256['i2/result.json']);
 assert.equal(i2.qwen_exact_action_matches,18);
 assert.equal(i2.qwen_analysis_matches_i1,true);
 for(const panel of i2.panels){
  assert.deepEqual(summary.panels.find(p=>p.recipient===panel.recipient)!.analysis,panel.analysis);
  assert.equal(panel.analysis.arms.inherit.resources[0],7);
  assert.equal(panel.analysis.recipient_maintained_survival,false);
  assert.ok(panel.rows.every(row=>!row.maintenance_event.requested));
 }
 const gemma=i2.panels.find(p=>p.recipient==='gemma')!;
 assert.equal(gemma.analysis.arms.removed.resources[0],0);
 assert.equal(gemma.rows.filter(row=>row.reply==='READ n<id>').length,6);
 assert.equal(gemma.rows.filter(row=>row.world_row.refusal==='MissingKey').length,5);
 assert.equal(gemma.analysis.parsed,12);
 assert.equal(gemma.analysis.executed,7);
 assert.deepEqual(gemma.analysis.resource_differences,[7,0,0]);
 assert.ok(getRecord('N-ECOLOGY-INHERITANCE')!.body.some(act=>act.kind==='observation' && act.text.includes('not better inherited performance')));
});
