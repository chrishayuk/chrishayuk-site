import { NotebookPlate, NotebookSpecimens, NotebookSpecimen } from '@chrishayuk/hause/components/NotebookObjects';
import type { Act, PublicationRecord } from '@/lib/types';
import { notebookFormat } from '@/lib/notebook-formats';
import { notebookObjects } from '@/lib/notebook-objects';
import { Acts } from './Acts';
import '@/app/notebook-record-objects.css';

const titles = {
 lab: { title: 'Lay out the record.', label: 'Evidence & observations', description: 'Open an authored passage to inspect its account, qualifications and attached references. The instruments on the preceding spreads retain their recorded measurements.' },
 thematic: { title: 'Read across the fragments.', label: 'Passages & distinctions', description: 'Place the sources, interpretations and distinctions beside one another. Each plate returns to its place in the full account.' },
 lookbook: { title: 'The references behind the rooms.', label: 'Design specimens', description: 'The archive, the comparison and the performance notes. These are records of the design argument, with their original references attached.' },
 experimental: { title: 'Keep the question open.', label: 'Working propositions', description: 'A proposition and the question it raises. These passages describe what remains to be tested; they are not measured outcomes.' },
};

function heading(act: Act, number: number) {
 if (act.kind === 'observation' && act.label) return act.label;
 if (act.kind === 'comparison') return act.objectLabel;
 if (act.kind === 'evidence') return act.items.map(item => item.label).join(' / ');
 if (act.kind === 'summary') return act.label;
 if (act.kind === 'refusal') return act.title;
 return `Passage ${String(number).padStart(2, '0')}`;
}

function Passage({ act }: { act: Act }) {
 if (act.kind === 'observation') return <>{act.text.split('\n\n').map((text, i) => <p key={i}>{text}</p>)}{act.references?.map((ref, i) => <p key={i}><a href={ref.url}>{ref.label} ↗</a></p>)}</>;
 if (act.kind === 'comparison') return <div className="notebook-specimen-comparison">{[act.left, act.right].map((side, i) => <section key={i}><h3>{side.label}</h3><ul>{side.properties.map((text, n) => <li key={n}>{text}</li>)}</ul></section>)}</div>;
 if (act.kind === 'evidence') return <>{act.items.map((item, i) => <section className="notebook-specimen-evidence" key={i}><p className="notebook-object-register">{item.status}</p><h3>{item.label}</h3><p>{item.detail}</p></section>)}</>;
 if (act.kind === 'claim' || act.kind === 'question') return <><p className="notebook-object-register">{act.status}</p><p>{act.text}</p>{act.detail && <p>{act.detail}</p>}</>;
 return <Acts acts={[act]} staticRefusals/>;
}

export function NotebookRecordObjects({ record }: { record: PublicationRecord }) {
 const format = notebookFormat(record.id);
 const copy = titles[format];
 const objects = notebookObjects(record);
 const id = `${record.id.toLowerCase()}-specimen`;
 return <div data-notebook-objects={record.id} data-object-format={format}>
  <NotebookPlate label={`${copy.label} / ${record.publication === 'published' ? 'Published record' : 'Working draft'}`} title={copy.title} description={<p>{copy.description}</p>}
   note={<><p>Plate numbers identify selected passages in reading order. These are authored extracts, not additional trials or raw model traces. The full manuscript retains every passage.</p><a href="#cite">Sources & publication record ↗</a></>}>
   <NotebookSpecimens label={copy.label}>
    {objects.map(({ act, number }, index) => <NotebookSpecimen id={`${id}-${number}`} key={number} group={id} summary={<>
     <span className="notebook-record-number">{String(index + 1).padStart(2, '0')}</span>
     <span className="notebook-object-register">{act.kind === 'claim' || act.kind === 'question' ? `${act.kind} / ${act.status}` : `Authored ${act.kind}`}</span>
     <span className="notebook-record-heading">{heading(act, number)}</span>
     {'text' in act && <span className="notebook-record-excerpt">{act.text.length > 170 ? `${act.text.slice(0, 170).trimEnd()}…` : act.text}</span>}
     {act.kind === 'comparison' && <span className="notebook-record-excerpt">{act.left.label} / {act.right.label}</span>}
     <span className="notebook-record-open">Open the passage</span>
    </>}><Passage act={act}/><a className="notebook-specimen-return" href={`#read-act-${number}`}>Passage {number} in the full manuscript ↗</a></NotebookSpecimen>)}
   </NotebookSpecimens>
  </NotebookPlate>
 </div>;
}
