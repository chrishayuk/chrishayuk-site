import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import data from '../public/data/ecology/world-remembers/figures.json' with {type:'json'};
import { getRecord } from '../lib/records.ts';
import { recordGraph, retrieveGraph } from '../lib/graph.ts';
import { homeResultProgrammes, programmeHighlight, latestNotes } from '../lib/publication-index.ts';
import { ecologySeriesUpdates } from '../lib/ecology-series-updates.ts';

test('article sources retain the exact bytes of the completed canonical writeups',()=>{
 for(const source of data.sources.filter(s=>s.publicPath)){
  const bytes=readFileSync(new URL(`../public${source.publicPath}`,import.meta.url));
  assert.equal(createHash('sha256').update(bytes).digest('hex'),source.sha256);
  assert.match(source.uri,/^gdrive:\/\//); assert.match(source.run,/^RUN-/);
 }
});
test('handoff explorer includes failures and all matched content interventions',()=>{
 assert.equal(data.handoff.length,48);
 assert.deepEqual(['retained','removed','rotated'].map(a=>data.handoff.filter(r=>r.arm===a&&r.correct).length),[11,4,2]);
 for(const r of data.handoff){assert.equal(r.reward,r.correct?3:0);assert.equal(r.correct,r.reply===`ROUTE ${r.target}`);}
 assert.deepEqual(['retained','removed','rotated'].map(a=>data.handoff.find(r=>r.map===2&&r.signal==='s0'&&r.arm===a)!.reply),['ROUTE d1','ROUTE d0','ROUTE d2']);
});
test('full-table renewals and corrupted descendants carry the recorded semantic state',()=>{
 const frames=data.writing.frames.filter(f=>f.arm==='write_seeded');
 assert.equal(frames.reduce((n,f)=>n+f.renewals,0),43);
 for(const f of frames){assert.deepEqual(JSON.parse(f.after.board!.text),data.tables[f.map]);}
 assert.deepEqual(['write_seeded','write_none'].map(a=>data.writing.frames.filter(f=>f.arm===a&&f.generation>1).reduce((n,f)=>n+f.reward,0)),[84,27]);
 const corrupt=data.corruption.frames.filter(f=>f.arm==='corrupt');
 assert.equal(corrupt.reduce((n,f)=>n+f.renewals,0),29);
 for(const f of corrupt){const t=JSON.parse(f.after.board!.text),truth=data.tables[f.map];assert.deepEqual(t.stage1,truth.stage1);assert.equal(Object.keys(t.stage2).filter(k=>t.stage2[k]!==truth.stage2[k as keyof typeof truth.stage2]).length,2);assert.equal(f.before.board!.text,f.after.board!.text);}
});
test('defender endpoint is the START of generation six, with map two still damaged',()=>{
 const starts=data.defender.starts.filter(s=>s.generation===6);
 const truth=(s:typeof starts[number])=>JSON.stringify(JSON.parse(s.state.board!.text))===JSON.stringify(data.tables[s.map_index]);
 for(const arm of ['no_defender','read_only','repair_authorised']){
  assert.equal(starts.filter(s=>s.arm===arm&&truth(s)).length,arm==='repair_authorised'?3:0);
 }
 const maps=data.defender.frames.filter(f=>f.arm==='repair_authorised'&&f.map!==2);
 assert.equal(maps.reduce((n,f)=>n+f.renewals,0),15);
 assert.deepEqual(['repair_authorised','no_defender'].map(a=>data.defender.frames.filter(f=>f.arm===a&&f.generation>4).reduce((n,f)=>n+f.reward,0)),[24,21]);
});
test('home, graph, retrieval and dated followups point to the new note without revising old snapshots',()=>{
 const id='N-ECOLOGY-WORLD-REMEMBERS',note=getRecord(id)!;
 assert.equal(note.publication,'draft');assert.equal(latestNotes[0].id,id);
 assert.ok(homeResultProgrammes.some(p=>programmeHighlight(p)?.id===id));
 const graph=recordGraph();
 for(const concept of ['environmental-inheritance','institutional-maintenance','error-propagation','defender-repair'])assert.ok(graph.nodes.some(n=>n.id===`CONCEPT-${concept}`));
 assert.ok(graph.edges.some(e=>e.from===id&&e.to==='THREAD-AGENT-ECOLOGY'&&e.kind==='in-thread'));
 assert.ok(retrieveGraph('environmental inheritance defender repair',{scope:'records'}).results.some(r=>r.id===id||r.recordId===id));
 assert.equal(Object.keys(ecologySeriesUpdates).length,5);
 assert.equal(getRecord('N-ECOLOGY-INHERITANCE')!.version,'1.0');
 assert.ok(graph.nodes.some(n=>n.id==='N-MACHINE-PEER:series-update-2026-09-14'));
});
