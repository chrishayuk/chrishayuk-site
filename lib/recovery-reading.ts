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
