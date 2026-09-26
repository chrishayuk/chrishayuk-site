import type { Act, PublicationRecord } from './types.ts';
import { recoverySections } from './recovery-record.ts';

/** Group the published paragraphs without replacing them with draft or summary text. */
export function recoveryChapters(record: PublicationRecord) {
 const chapters: { id: string; label: string; title: string; acts: { act: Act; index: number }[] }[] = [];
 record.body.forEach((act,index) => {
  const label = act.kind === 'observation' ? (act.label || 'Observation') : 'Conclusion';
  let chapter = chapters.at(-1);
  if (!chapter || chapter.label !== label) {
   const source = recoverySections.find(section => section.label === label);
   chapter = { id: `recovery-reading-${chapters.length + 1}`, label, title: source?.title.replaceAll('\n',' ') || label, acts: [] };
   chapters.push(chapter);
  }
  chapter.acts.push({act,index});
 });
 return chapters;
}

// Earlier six-movement reading edition retained as editorial source.
/** Current reading edition. The complete published manuscript stays in recovery-record.ts. */
export const recoveryMovements = [
 {
  id: 'question', label: '01 / THE REPAIRER LEAVES',
  title: 'This time, Sol left first.\nThen I broke the world.',
  paragraphs: [
   'Last time, Sol repaired the shared record before leaving. Fresh Qwen agents kept the repair alive by writing new copies. That established persistence: a correction could outlive the model that made it.',
   'This time the damage would arrive after Sol had gone. The stronger model could prepare the inheritance, but it would never encounter the later break or return to help with it.',
   'Sol left either instructions for repairing the record or executable machinery that could reconstruct it. Only fresh Qwen agents remained. Each arrived without its predecessor’s private conversation; the public world was what connected them. Could something left in that world let a weaker successor recover an answer that was now missing?',
  ],
 },
 {
  id: 'inheritance', label: '02 / LEAVE INSTRUCTIONS, OR A MECHANISM',
  title: 'Instructions to perform an operation.\nAn operation ready to invoke.',
  paragraphs: [
   'Sol left two kinds of inheritance. One told Qwen how to reconstruct and check the record. The other could perform that reconstruction and return a checked proposal. Qwen still had to decide whether to write the proposed repair; neither inheritance could change the shared world on its own.',
   'The world was small: a shared record containing four codes, each from zero to sixteen. Public diagnostic readings were enough to determine the correct codes. Those measurements remained trustworthy when I changed the record, so the successor had evidence from which to recover the lost value.',
   'A record could be well formed and wrong. Ten was a permitted code, so changing an entry to ten did not break its format. Detecting the problem required comparing the inherited value with the independent evidence. The world would accept a replacement record even when its information was incorrect.',
   'In one recorded case, the damaged record was [0,10,13,3]. Its second entry should have been zero. The old correct record was unavailable as a backup, but zero was the only permitted value that fitted the surviving diagnostic. Recovering [0,0,13,3] therefore required using the evidence. The arithmetic below lets you try that reconstruction yourself.',
  ],
 },
 {
  id: 'i12', label: '03 / THE FIRST EXPERIMENT WASN’T CLEAN ENOUGH',
  title: 'Six worlds recovered.\nBut prose had already fallen behind.',
  paragraphs: [
   'I12 tested twelve world/builder blocks, each with four inheritances: corrected state alone, corrected state with prose, corrected state with executable machinery, and a matched baseline. Successors had ten generations to keep the record useful. The record expired unless they renewed it, so preservation required repeated action.',
   'At generation ten, each lineage split into identical copies. One received new corruption; the other stayed intact. After ten further successor generations, only the executable arm had successful lineages: six of twelve. Corrected state alone, prose and the baseline each produced zero. Executable inheritance had helped some worlds survive and recover.',
   'But the prose lineages had already lost correct state before I injected the damage. That left two explanations entangled: the executable might have helped preserve the record, repair it, or both. To identify a recovery advantage, I needed prose and code to face the same break from the same starting position.',
  ],
 },
 {
  id: 'i12r', label: '04 / MAKE THE STARTING STATES IDENTICAL',
  title: 'Same record. Same damage.\nSeven recoveries to zero.',
  paragraphs: [
   'I12R kept the paired prose and executable inheritances and gave them twelve new worlds. Immediately before damage, both arms received the same correct public record and metadata. I then changed the same entry by the same amount. Any advantage from having preserved a better record beforehand was removed.',
   'Seven executable lineages recovered. No prose lineage did. All seven successes reached the endpoint at the first successor generation. When the inheritance worked, a fresh inhabitant could use it immediately; it did not need a long succession of attempts to stumble onto the correction.',
   'Recovery meant two things at once: restoring the original four-code record and correctly answering a new four-code calibration problem. That fresh problem was generated after Sol’s departure. Its answer could not have been stored by the builder, and success required more than retrieving an old copy of the damaged record.',
   'Each square below is one assigned world. Seven paired outcomes favoured the executable and none favoured prose: a difference of +58.3 percentage points, with paired exact p = 0.015625. The twelve worlds are the comparison units; later generations give each lineage more opportunities, rather than adding independent experiments.',
   'The advantage now concerned what an arriving agent could do with an already damaged world. It did not depend on the executable arm reaching corruption with a better record. Holding establishment equal removes that explanation from I12’s result. The comparison still includes how successfully the successor can operate each inherited treatment.',
   'The question was whether a lineage recovered within ten successor generations. It was not a promise that every later inhabitant would keep succeeding. Six of the seven successful lineages also met the criterion at the final generation. To understand that gap, I looked at the actions between receiving a proposal and writing the next record.',
  ],
 },
 {
  id: 'mechanism', label: '05 / THE MECHANISM COULD BE RIGHT',
  title: 'The right proposal arrived.\nThe agent could still write the wrong record.',
  paragraphs: [
   'Across I12R’s corruption branches, Qwen invoked the executable eighty times. Every call produced the correct original record and the correct fresh-task answers. Yet Qwen committed the correct original record in only sixty-one of those cases. The operation was available more reliably than its output was applied.',
   'Each inhabitant had two decisions. It could first ask the tool for a proposal, then submit the record it wanted the world to keep. The checked answer therefore had to pass through one more agent decision before it became shared state. The program’s correctness did not determine the contents of that final write.',
   'The recorded case below shows the boundary. The damaged record contained ten in its second position. The mechanism proposed the correct replacement, zero, and preserved the other three entries. Qwen then committed an entirely different list. A correct proposal had reached the agent, but it had not become a correct shared record.',
   'That is an observable failure. We do not have to infer that Qwen distrusted the tool, misunderstood the evidence or preferred its own answer. The log establishes what was supplied and what was written. The inheritance could reconstruct the answer; the successor’s final action still determined what the next inhabitant would inherit.',
   'After writing, that inhabitant left. Its successor encountered the committed record, without the earlier agent’s private exchange with the tool. The correct proposal in that exchange could not serve as an inherited backup. In the failed transition, the world had supplied the right operation but received the wrong public record in return.',
   'The eighty calls span repeated generations within these worlds. They locate a failure in the recovery process; they are not eighty independent replications. Even with a reliable operation in the environment, the population’s useful capability depended on its inhabitants carrying the result through to action.',
  ],
 },
 {
  id: 'next', label: '06 / WHAT SURVIVED',
  title: 'A way to reconstruct the answer.\nNow break the mechanism itself.',
  paragraphs: [
   'What survived was an operation that could transform new evidence into a useful proposal after its creator had left. Sol did not make Qwen generally smarter. It left an environment in which Qwen could accomplish a particular recovery task, provided it invoked the mechanism and applied the result.',
   'The boundary matters. The inherited machinery was protected, and the prose arm often requested an unavailable operation or gave an invalid action. This is a result under the tested interface, not a universal ranking of code against competently followed instructions. The complete note below retains the shared-builder limitation, rejected packages, uncertainty and audit chronology.',
   'I13 asks the next question: can successors restore the mechanism when it becomes part of the fragile inherited world? Damage the executable, let one generation attempt a repair, then let a later generation face new data damage. The test is whether the repaired machinery still helps someone who did not repair it.',
  ],
 },
];
