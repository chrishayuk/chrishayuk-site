import type { PublicationRecord } from './types.ts';

export const recoverySections = [
 {
  "id": "question",
  "label": "01 / AFTER THE REPAIRER LEAVES",
  "title": "Keeping an answer is one thing.\nRecovering it is another.",
  "paragraphs": [
   "The last Notebook ended with a repair. A stronger model corrected a damaged routing table, then left. Fresh weaker agents copied the corrected table into new records. The repair survived the agent that made it.",
   "But that left an important question unanswered. The stronger model had been present when the damage occurred. What would happen if the world broke only after it had gone? Keeping a correct answer alive is useful. Reconstructing an answer that has been lost asks something more of the inheritance.",
   "For these experiments I changed what the stronger model could leave behind. Alongside the record, it could leave instructions for checking and repairing it—or a small program that performed those operations. Then I removed the builder permanently. Only fresh Qwen agents would encounter the later damage.",
   "The question was whether the environment could retain a way to recover, after the model capable of constructing that way had disappeared."
  ]
 },
 {
  "id": "world",
  "label": "02 / WHAT CAN BREAK",
  "title": "A four-number record.\nEvidence that can check it.",
  "paragraphs": [
   "I changed the task from the earlier two-table routing world to a small calibration problem. The shared record contains four codes. Each code is a whole number from zero to sixteen. An arriving agent can read the record, inspect public diagnostic readings and write a replacement for the next agent.",
   "The diagnostics are independent of the record. Changing an entry does not change the measurement that can establish what the entry should be. That separation is the point of the world: a successor has enough evidence to recover the truth, but cannot recover it merely by trusting the inherited record.",
   "Take a real example from the equal-state experiment. The correct record was [0,0,13,3]. I changed its second entry to ten, leaving [0,10,13,3]. The agent saw the damaged record and the diagnostics. It did not see the earlier correct record as a backup.",
   "For that second entry, the diagnostic rule is: multiply the code by eight, add nine, then take the remainder after division by seventeen. The observed reading is nine. The inherited value ten produces four, so it cannot be right. Zero produces nine. Among the seventeen permitted codes, zero is the only one that fits.",
   "You can try the arithmetic below. This is an explanation using a recorded diagnostic row, not another agent experiment. The same kind of check works independently for each of the four entries. A repair means reconstructing all four codes and writing a usable replacement record."
  ]
 },
 {
  "id": "inheritance",
  "label": "03 / TWO WAYS TO LEAVE A METHOD",
  "title": "Instructions to perform an operation.\nAn operation ready to invoke.",
  "paragraphs": [
   "Sol, the stronger builder, produced a prose procedure and executable repair and validation code. The prose explained how to recover each code from the measurements, check the candidate against those measurements, and write the corrected list. The executable could carry out that derivation and check when a successor called it.",
   "The distinction was in how the work became available. With prose, Qwen had to read the method and carry out the steps itself. With the executable, Qwen could ask for a checked proposal. Both still had to decide what to write. Calling the tool did not give it permission to change the world.",
   "For example, the executable could return [0,0,13,3] and say that the proposal passed its check. That was a suggestion in the current agent’s context. The shared record stayed damaged until Qwen explicitly committed a replacement. This matters because a working tool and an agent that applies its output are two different parts of recovery.",
   "The builder never returned. Each successor was a fresh context using the same weaker Qwen model, with no private conversation inherited from the previous inhabitant. The public record and the assigned procedure or executable were what connected them. A generation here means a fresh inhabitant’s scheduled opportunity to act; it is not model training.",
   "The record also expired unless a successor renewed it. Preserving the data therefore required continued action. The procedure and executable themselves were protected throughout these experiments. That is a deliberate boundary: I was testing inherited repair capability, before asking whether successors could maintain the machinery that supplied it."
  ]
 },
 {
  "id": "i12",
  "label": "04 / FIRST, LET THE INHERITANCE LIVE",
  "title": "The executable arm recovered.\nBut the starting states had diverged.",
  "paragraphs": [
   "I12 began with twelve world/builder blocks. Within each block I compared four inheritances: A, corrected state alone; B, corrected state with prose; C, corrected state with the executable mechanism; and D, the matched baseline. Successors then had to keep their public record useful across ten generations.",
   "At generation ten I copied each lineage into two identical branches. One received new corruption; the other received a sham intervention. Because the copies were identical immediately before that intervention, later differences within a pair could be traced to the injected damage. Sol was already gone.",
   "I gave the successors ten more generations. To count as successful, a lineage had to restore the original record and correctly answer a fresh four-code calibration task at the same assessment. Repair alone was not enough; the inherited method also had to remain useful on something new.",
   "Only the executable arm produced successful lineages: six of twelve. The other three arms produced none. But when I looked at the state immediately before corruption, the prose arm had already lost correct records. The experiment had combined two hurdles: preserving useful state long enough to face the damage, then recovering afterward.",
   "That result was useful, but it left an alternative explanation. Perhaps executable inheritance helped mainly with the first hurdle. To isolate the second, I needed to give prose and code the same intact starting point, then break them in exactly the same way."
  ]
 },
 {
  "id": "i12r",
  "label": "05 / MAKE THE DAMAGE COMPARABLE",
  "title": "Put both arms at the same starting line.\nThen change the same entry.",
  "paragraphs": [
   "That was I12R. I kept the paired prose and executable artifacts, but used twelve new worlds. Immediately before damage, the harness established the same correct public record, with the same metadata, in B and C. It then changed the same entry by the same amount. The inherited treatment differed; the damaged data did not.",
   "This follow-up started directly at the recovery boundary. It did not rerun ten generations of inheritance. The labels G11–G20 simply identify the ten successor opportunities retained from I12’s recovery phase. Sham branches kept the original correct record so I could also observe unnecessary changes.",
   "Seven executable lineages recovered. No prose lineage did. All seven successful lineages met the joint record-and-fresh-task criterion at the first successor generation. In this assay, the successful inherited machinery did not need many generations of trial and error before a successor could use it.",
   "The squares below keep the twelve paired worlds visible. Seven pairs favoured the executable and none favoured prose. That gives the preregistered paired difference of +58.3 percentage points and a two-sided exact p-value of 0.015625. The worlds are the statistical units. Ten generations within one world do not create ten independent replications.",
   "Recovery was not a promise of continued correctness. Six of those seven lineages also met the joint criterion at the final generation. Later inhabitants could still mishandle the record or the new task. What had survived was access to a useful operation, not a guarantee that every successor would use it well."
  ]
 },
 {
  "id": "mechanism",
  "label": "06 / WHERE RECOVERY STILL FAILED",
  "title": "The right proposal was available.\nThe wrong record could still be written.",
  "paragraphs": [
   "The action logs make that last distinction unusually clear. Across I12R’s corruption branches, Qwen invoked the executable eighty times. Every invocation proposed the correct original record and the correct fresh-task answers. But Qwen committed the correct original record in only sixty-one of those cases.",
   "Return to the damaged record [0,10,13,3]. In the first successor generation of that world, the tool correctly proposed [0,0,13,3]. Qwen then wrote [9,12,15,10]. The mechanism had reconstructed the answer; the agent’s subsequent action lost it. The trace shows where the transition failed without telling us why the model made that choice.",
   "Across the eighty calls, fifty-nine assessments ended with both a correct record and correct fresh-task answers. These are repeated observations across generations, not eighty independent worlds. They explain part of the result: reliable proposals were available, but successful application remained a separate demand.",
   "The prose failures also need their own explanation. B requested CHECK even though that operation was unavailable in its arm. In eighty of its 120 second-stage replies it then produced PLAN, which was not a valid action at that stage. Its procedure had not disappeared; the successor often failed to use the permitted interface.",
   "So this does not show that executable reasoning beats prose that is competently followed. It shows an advantage for these inherited treatments under this fixed interface. Nor does CHECK on every first turn demonstrate selective detection of damage. The observed chain is more specific: invoke a mechanism, obtain a proposal, then sometimes fail to apply it."
  ]
 },
 {
  "id": "fresh",
  "label": "07 / COULD SOL HAVE LEFT THE ANSWERS?",
  "title": "Give the successor a problem\nits builder never saw.",
  "paragraphs": [
   "There is an easy way for an inheritance experiment to look more impressive than it is: hide enough old answers in the environment. A later agent can then appear to repair the world by finding a backup.",
   "Here the generic builder artifacts were produced before the world values were instantiated. After Sol departed, each recovery generation also received a newly generated calibration problem with different diagnostic values. Its answers were used for that assessment and did not pass to the next inhabitant.",
   "This is why the endpoint joins two demands. The successor must repair the old four-code record and solve the new four-code problem at the same assessment. A stored copy of the old answer cannot satisfy both. A procedure that reconstructs answers from measurements can.",
   "That is the sense in which the inheritance contained capability. The artifact could perform a repeatable operation on evidence, including evidence unavailable to its creator. The stronger model did not make the weaker model generally smarter. It changed what the weaker model could get done in that environment."
  ]
 },
 {
  "id": "limits",
  "label": "08 / WHAT THE COMPARISON CAN CARRY",
  "title": "A recovery result.\nA bounded one.",
  "paragraphs": [
   "I12R reused all twelve historical I12 builder packages in their original order. Four had been rejected by the fixed executable syntax rules; those failures stayed in the primary denominator. The seven successes came from the eight admitted packages, but 7/8 is a descriptive subset, not the registered headline result.",
   "The new worlds remove I12’s unequal-establishment explanation. They do not create an independent new sample of builders. I12 and I12R therefore belong together as a controlled progression, not as two studies whose p-values can simply be pooled.",
   "Twelve blocks also leave considerable uncertainty about effect size. The frozen conservative Wilson/Bonferroni interval for I12R’s difference runs from −0.53 to +82.77 percentage points. It uses a different construction from the exact paired test, so it can include zero while that test gives p = 0.015625. The observed contrast is large; its population-wide size is not precisely measured.",
   "Most importantly, the executable and prose were protected. Successors had to preserve the record, but they did not have to keep the repair procedure itself intact. These experiments establish inherited executable recovery under the tested conditions. They do not yet establish self-maintaining machinery or a spontaneously formed institution."
  ]
 },
 {
  "id": "audit",
  "label": "09 / THE EXPERIMENTAL RECORD",
  "title": "Keep the interruption visible.",
  "paragraphs": [
   "I12 stopped when the disk filled. The original run remains failed and inconclusive. A registered continuation reused the saved responses and completed the scheduled panel without bringing the builder back. Because partial results already existed, this was not an uninterrupted confirmatory run.",
   "A later audit found that a mutable request object had changed derived request snapshots after sending. The raw sent prompts were unchanged. I preserved the unmodified evidence and failed audit before reconciling the snapshots against that immutable log. Responses, world transitions and scores did not change. The reconciled panel passed 17/17 full checks and 10/10 continuation checks.",
   "I12R was registered before its new inference. It passed 21/21 deterministic gates and completed all 960 Qwen responses without interruption or correction. Its final 17/17 checks passed on the original, unmodified evidence. The source reports retain the full chronology, model settings, analysis and artifact hashes."
  ]
 },
 {
  "id": "next",
  "label": "10 / WHAT NEEDS REPAIR NEXT?",
  "title": "The mechanism survived because\nI protected it.",
  "paragraphs": [
   "The progression is now fairly clear. I11 showed that a repaired record could outlive the repairer. I12 showed that executable inheritance could support preservation and later recovery. I12R held the starting state equal and still found more recovery with the executable treatment.",
   "The next question is what happens when the mechanism itself breaks. A successor would have to restore the program, leave it for another successor, and have that later inhabitant use it successfully against fresh data damage. Fixing today’s record would no longer be enough.",
   "That is the proposed I13, not a finding already contained in these results. For now, the stronger model left the population something narrower and more concrete than general intelligence: a working way to reconstruct an answer. Later agents could invoke it after its creator had gone. Whether they faithfully applied it was another part of the world’s capability."
  ]
 }
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
