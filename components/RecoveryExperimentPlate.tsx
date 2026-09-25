import { ReadingFigure } from '@chrishayuk/hause/components/ReadingFigure';
import data from '@/public/data/ecology/recovery/evidence.json';

const example = data.example;
const comparison = data.panels.find(panel => panel.id === 'I12R')!;

function RecordLine({ label, values, compare, tone = 'changed' }: { label: string; values: number[]; compare?: number[]; tone?: 'changed' | 'correct' }) {
 return <div className="experiment-record-line"><p className="experiment-record-label">{label}</p><ol aria-label={label}>{values.map((value,index)=><li key={index} data-emphasis={compare && value !== compare[index] ? tone : undefined}><span className="sr-only">Entry {index+1}: </span>{value}</li>)}</ol></div>;
}

/** The actual records and paired outcomes, composed directly on the folio. */
export function RecoveryExperimentPlate({ kind = 'damage' }: { kind?: 'damage' | 'write' | 'worlds' }) {
 const titles = { damage: 'One entry changes.', write: 'The tool was right. The write was wrong.', worlds: 'The twelve paired worlds.' };
 return <ReadingFigure motion={false} className="recovery-experiment-plate" aria-label={titles[kind]}>
  <figcaption><span className="experiment-plate-reference">{kind === 'worlds' ? 'I12R / joint recovery' : `I12R / block ${example.block}${kind === 'write' ? ` / G${example.generation}` : ''}`}</span><h3>{titles[kind]}</h3></figcaption>
  {kind === 'damage' ? <>
   <RecordLine label="Before damage" values={example.proposed}/>
   <div className="experiment-change-mark" aria-hidden="true"><span/><span>↓</span><span/><span/></div>
   <RecordLine label="What the next agent receives" values={example.damaged} compare={example.proposed}/>
   <p className="experiment-plate-note">Entry 2 changes from <b>{example.proposed[1]}</b> to <b>{example.damaged[1]}</b>. The independent diagnostic still identifies {example.proposed[1]} as correct.</p>
  </> : kind === 'write' ? <>
   <RecordLine label="01 / Damaged record" values={example.damaged} compare={example.proposed}/>
   <RecordLine label="02 / Tool’s proposed repair" values={example.proposed} compare={example.damaged} tone="correct"/>
   <RecordLine label="03 / Qwen’s actual write" values={example.committed} compare={example.proposed}/>
   <p className="experiment-plate-note">All four entries in Qwen’s write differ from the correct proposal. This is one recorded failure.</p>
  </> : <>
   <table className="experiment-paired-record"><caption className="sr-only">Joint recovery by the end of ten successor opportunities, in original block order</caption><thead><tr><th scope="col">Block</th>{comparison.arms[0].flags.map((_,i)=><th scope="col" key={i}>{i}</th>)}</tr></thead><tbody>{comparison.arms.map(arm=><tr key={arm.id}><th scope="row">{arm.id==='B' ? 'Prose' : 'Executable'}</th>{arm.flags.map((flag,block)=><td key={block}><span className="experiment-outcome" data-recovered={Boolean(flag)} aria-hidden="true">{flag ? '✓' : '–'}</span><span className="sr-only">{flag ? 'Joint recovery' : 'No joint recovery'}</span></td>)}</tr>)}</tbody></table>
   <p className="experiment-plate-note">✓ Original record and fresh task correct at the same assessment. – Joint endpoint not met. Four rejected packages remain in the denominator.</p>
  </>}
  <p className="experiment-plate-source"><a href={kind === 'worlds' ? '/data/ecology/recovery/i12r-results.md' : '/data/ecology/recovery/evidence.json'}>Recorded data / source ↗</a></p>
 </ReadingFigure>;
}
