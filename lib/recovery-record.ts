import type { PublicationRecord } from './types.ts';

export const recoverySections = [
 {id:'question',label:'01 / AFTER THE BUILDER LEAVES',title:'Leave a way to recover.',paragraphs:[
  'A repaired answer can outlive its repairer. The previous experiments showed that much: a temporary stronger model corrected shared routing information, then fresh weaker agents carried the correction forward. But the damage had happened while the stronger model was still available. Could it leave something useful against damage that had not happened yet?',
  'I asked Sol to leave a repair procedure, removed it permanently, and gave only the public world to fresh Qwen successors. Some inherited prose. Others inherited an executable mechanism. Later I damaged the record. No Sol conversation, private memory or stronger-model rescue accompanied the successors.',
  'The stronger model did not return. What persisted was a procedure that could reconstruct the answer from fresh evidence. The executable was protected and the prose arm had interface-compliance failures; this is evidence for inherited executable recovery under the tested environment, not a universal claim about code versus language.'
 ]},
 {id:'i12',label:'02 / PRESERVATION AND RECOVERY',title:'Six worlds recovered.\nThe controls did not.',paragraphs:[
  'I12 followed twelve world/builder blocks through four paired conditions: corrected state alone; corrected state plus prose; corrected state plus an executable; and a matched baseline. At generation ten each lineage split into identical copies before one received corruption and the other a sham intervention. Fresh successors then had ten generations to recover.',
  'The endpoint required a correct original record and all four answers to a newly generated task to be correct at the same assessment. The result was A 0/12, B 0/12, C 6/12, D 0/12. The preregistered C−B difference was +50 percentage points; the two-sided exact paired test gave p = 0.03125.',
  'There was a qualification. By the damage boundary, no prose lineage still had fully correct state. I12 measured a package’s ability to establish and preserve useful state long enough to face damage, then recover. It did not isolate repair from equal starting conditions. That distinction made the follow-up necessary.'
 ]},
 {id:'i12r',label:'03 / HOLD THE STARTING STATE EQUAL',title:'Same state. Same damage.\nDifferent recovery.',paragraphs:[
  'I12R kept the inherited prose and executable treatments but gave both arms the same correct public record and metadata immediately before identical corruption. It reused all twelve historical builder packages, including four rejected packages, in new independently seeded worlds. The result is conditional on that fixed artifact library; this is not a fresh sample of stronger builders.',
  'Executable inheritance recovered 7/12 worlds. Prose recovered 0/12. The paired difference was +58.3 percentage points, with seven C-only successes, no B-only successes, and two-sided exact p = 0.015625. All seven successes reached the joint endpoint at the first successor generation.',
  'This was a direct ten-generation recovery assay. G11–G20 are retained labels, not evidence of an additional ten-generation inheritance period. Six of the seven successful lineages also met the joint endpoint at G20. Early recovery did not guarantee continuous correctness.',
  'Each square below is one assigned world, in original block order. Generations and tool calls are repeated observations within those worlds, not extra independent replicates. The two studies share their builder library and should not be pooled into an independent-replication claim.'
 ]},
 {id:'mechanism',label:'04 / A PROPOSAL IS NOT A COMMIT',title:'The mechanism knew what to write.\nThe successor did not always write it.',paragraphs:[
  'Across I12R’s corruption branches, the executable was invoked eighty times. Every call proposed both the correct original record and the correct fresh-task vector. Qwen committed the correct original repair in sixty-one of those eighty cases. There were fifty-nine assessments where the record and all fresh-task answers were correct together.',
  'This separates available capability from its application. The executable could inspect only public evidence and return a proposal. Qwen had to invoke it, then choose what to commit. The harness did not silently restore hidden truth.',
  'A failed recorded transition makes the gap visible. In block 9 at G11, the damaged record was [0,10,13,3]. The tool proposed [0,0,13,3]. Qwen instead committed [9,12,15,10]. These are observed actions, not an explanation of hidden reasoning.',
  'B always requested CHECK even though that executable operation was unavailable in its arm; eighty of its 120 second-stage replies were invalid PLAN actions. The prose remained available. I12R therefore compares complete inherited treatments under a fixed interface, not code against prose that was reliably followed. All first decisions were CHECK in both arms, so tool use is not evidence of selective corruption detection.'
 ]},
 {id:'evidence',label:'05 / RE-DERIVATION, NOT A BACKUP',title:'The old answer was not\nwaiting in another drawer.',paragraphs:[
  'The task uses four hidden codes, each from zero to sixteen. Public modular diagnostics uniquely determine them. Correctness has to be reconstructed from those diagnostics; old records, cached answers and embedded answer tables cannot supply a backup. Generic builder artifacts were produced before the world values were instantiated.',
  'The ten new calibration tasks were generated after Sol’s departure. Their answers were ephemeral and did not pass to later inhabitants. Success on the fresh task was scored separately from original-record correctness, then combined for the joint endpoint.',
  'Twelve blocks give limited precision. I12R’s conservative Wilson/Bonferroni difference interval is −0.53 to +82.77 percentage points. It is not an inversion of the exact paired test, which explains why it includes zero while that test gives p = 0.015625. This small panel supports a large observed contrast under these conditions; it does not pin down a population-wide effect size.'
 ]},
 {id:'audit',label:'06 / KEEP THE CHRONOLOGY',title:'The interruption belongs\nin the record.',paragraphs:[
  'I12 stopped when the disk filled. The original run remains failed and inconclusive. A registered continuation reused saved responses and finished the scheduled panel without a returning builder. A later audit found that a mutable request object had altered derived request snapshots after sending. The raw sent prompts were unchanged.',
  'The unmodified evidence and failed audit were preserved before reconciling those snapshots against the immutable request log. Responses, world transitions and scores did not change. The reconciled panel passed 17/17 full checks and 10/10 continuation checks. The continuation was registered after partial results existed; this was not an uninterrupted confirmatory run.',
  'I12R was registered before its new inference, passed 21/21 deterministic gates, and completed all 960 Qwen responses without interruption or correction. Its final 17/17 checks passed on the original, unmodified evidence. The complete source reports and canonical artifact hashes are linked below.'
 ]},
 {id:'next',label:'07 / THE NEXT OBJECT TO PROTECT',title:'Who repairs the repairer?',paragraphs:[
  'I11 showed repaired state surviving the stronger repairer. I12 showed executable inheritance supporting preservation and recovery. I12R held establishment equal and still found more recovery with inherited execution. The recurring object is the public world and what it lets later agents do.',
  'The machinery itself remained protected. I13 should make it editable and damageable: establish useful operation, remove the builder, damage the mechanism, let successors attempt repair, and only then damage the data. A restored program must still solve new cases. Repairing one saved answer will not be enough.',
  'That is an open experiment, not a result already contained here. The present evidence establishes inherited executable recovery under a bounded interface. It does not establish self-maintaining machinery, spontaneous institutions or permanent capability.'
 ]},
];
export const recoveryRecord: PublicationRecord = {
 id:'N-ECOLOGY-RECOVERY',slug:'the-repairer-left-the-mechanism-kept-working',kind:'notebook',
 title:'The repairer left. The mechanism kept working.',
 dek:'Damage arrived after the stronger model had gone. From equal starting state, inherited code helped seven of twelve worlds recover; prose helped none.',
 abstract:'I12 produced joint preservation/recovery in A 0/12, B 0/12, C 6/12 and D 0/12, but prose state had already failed before damage. I12R equalised establishment and corruption: executable inheritance recovered 7/12 new worlds versus prose 0/12, paired exact p = 0.015625. All seven first recovered at G11. Eighty executable calls proposed correct record and fresh-task answers; Qwen committed the correct record 61 times. Protected machinery, interface-compliance failures and a shared historical builder library bound the claim.',
 created:'2026-09-17',version:'0.1',publication:'draft',status:'SUPPORTED',authors:['Chris Hay'],media:[],
 lineage:'INHERIT → DAMAGE → RE-DERIVE → PROPOSE → COMMIT',
 concepts:['ai-agents','environmental-inheritance','defender-repair','causal-intervention'],
 related:['N-ECOLOGY-WORLD-REMEMBERS','N-ECOLOGY-INHERITANCE','N-ECOLOGY-MEMORY'],
 body:[...recoverySections.flatMap(s=>s.paragraphs.map(text=>({kind:'observation' as const,label:s.label,text}))),{kind:'claim',status:'SUPPORTED',text:'Inherited executable machinery supported more post-departure recovery from equal starting state.',detail:'I12R: C 7/12 versus B 0/12, paired exact p = 0.015625. Fixed interface and historical artifact library; machinery was protected and prose had action-compliance failures.'}],
 experiments:[{id:'I12',url:'/data/ecology/recovery/i12-results.md'},{id:'I12R',url:'/data/ecology/recovery/i12r-results.md'}],
 sources:[{title:'I12 / complete results, interruption and continuation audit',url:'/data/ecology/recovery/i12-results.md'},{title:'I12R / complete results and original-evidence audit',url:'/data/ecology/recovery/i12r-results.md'},{title:'Figure data and canonical artifact hashes',url:'/data/ecology/recovery/evidence.json'},{title:'I12 / canonical experiment record',url:'https://chuk-experiments-server.fly.dev/#/experiments/ecology-inheritance-i12'},{title:'I12R / canonical experiment record',url:'https://chuk-experiments-server.fly.dev/#/experiments/ecology-inheritance-i12r'}],
};
