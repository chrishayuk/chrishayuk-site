import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import data from '../public/data/ecology/recovery/evidence.json' with {type:'json'};
import { getRecord } from '../lib/records.ts';
import { recordGraph } from '../lib/graph.ts';
import { latestNotes, programmeHighlights } from '../lib/publication-index.ts';
test('recovery figures retain exact canonical reports, paired flags and denominators',()=>{
 for(const s of data.sources) assert.equal(createHash('sha256').update(readFileSync(new URL(`../public${s.publicPath}`,import.meta.url))).digest('hex'),s.sha256);
 assert.deepEqual(data.panels.map(p=>p.arms.map(a=>a.successes)),[[0,0,6,0],[0,7]]);
 for(const p of data.panels){for(const a of p.arms){assert.equal(a.denominator,12);assert.equal(a.flags.reduce((s,n)=>s+n,0),a.successes);}const b=p.arms.find(a=>a.id==='B')!,c=p.arms.find(a=>a.id==='C')!;const discordant=c.flags.filter((v,i)=>v!==b.flags[i]).length;assert.equal(p.primary.two_sided_exact_p,2*Math.pow(.5,discordant));}
 assert.equal(data.panels[1].arms[1].firstRecovery.filter(g=>g===11).length,7);
});
test('publication is current and discoverable while predecessor snapshot stays intact',()=>{
 const id='N-ECOLOGY-RECOVERY',r=getRecord(id)!;assert.equal(r.publication,'published');assert.equal(r.version,'1.0');assert.equal(latestNotes[0].id,id);assert.equal(programmeHighlights['agent-ecology'],id);
 assert.ok(recordGraph().edges.some(e=>e.from===id&&e.to==='THREAD-AGENT-ECOLOGY'));
 assert.equal(getRecord('N-ECOLOGY-WORLD-REMEMBERS')!.published,'2026-09-15');
 const text=JSON.stringify(r.body);for(const qualifier of ['protected','interface','not a fresh sample','not an uninterrupted'])assert.ok(text.includes(qualifier));
});
