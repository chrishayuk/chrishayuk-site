import Link from 'next/link';
import evidence from '@/public/data/ecology/recovery/evidence.json';
import { NotebookSketch } from './NotebookSketch';
import { machineLinkConditions } from '@/lib/machine-link-evidence';

/** The plate follows the selected record. Only the recovery note owns this assay. */
export function HomeNotebookPlate({ id, collection, href }: { id: string; collection: string; href: string }) {
 if (id === 'N-MACHINE-LINK') return <figure className="edition-notebook-evidence" aria-labelledby="home-link-caption">
  <figcaption id="home-link-caption" className="edition-plate-register">NATIVE-001b / Four trials</figcaption>
  <p className="edition-plate-premise">Same destination.<br/>One became a link.</p>
  <div className="edition-plate-results">{machineLinkConditions.map(condition => <div key={condition.id}>
   <span>{condition.label}</span><p><strong>{condition.requests}</strong><span> / {condition.trials}</span></p>
  </div>)}</div>
  <p className="edition-plate-key">Code-page requests received by the server.</p>
  <p className="edition-plate-scope">Both linked requests returned the exact code. Two trials per condition, one host. The original failure stands; the blocking component remains unknown.</p>
  <Link className="edition-plate-source" href={`${href}#link-comparison`}>Read the comparison ↗</Link>
 </figure>;
 if (id !== 'N-ECOLOGY-RECOVERY') return <div className="edition-notebook-drawing">
  <span className="edition-plate-register">A conceptual sketch</span>
  <NotebookSketch id={id} collection={collection}/>
 </div>;

 const panel = evidence.panels.find(panel => panel.id === 'I12R')!;
 const prose = panel.arms.find(arm => arm.id === 'B')!;
 const executable = panel.arms.find(arm => arm.id === 'C')!;
 return <figure className="edition-notebook-evidence" aria-labelledby="home-worlds-caption">
  <figcaption id="home-worlds-caption" className="edition-plate-register">I12R / {prose.denominator} paired worlds</figcaption>
  <p className="edition-plate-premise">Same record.<br/>Same damage.</p>
  <div className="edition-plate-results">
   {[{ arm: prose, label: 'Written procedure' }, { arm: executable, label: 'Executable mechanism' }].map(({ arm, label }) => <div key={arm.id}>
    <span>{label}</span><p><strong>{arm.successes}</strong><span> / {arm.denominator}</span></p>
   </div>)}
  </div>
  <ol className="edition-world-contact-sheet" aria-label="Paired outcomes in original block order, zero to eleven">
   {prose.flags.map((flag, block) => <li key={block}>
    <span className="edition-world-number" aria-hidden="true">{String(block).padStart(2, '0')}</span>
    <span className="edition-world-pair" aria-hidden="true"><i data-recovered={Boolean(flag)}>{flag ? '✓' : '—'}</i><i data-recovered={Boolean(executable.flags[block])}>{executable.flags[block] ? '✓' : '—'}</i></span>
    <span className="sr-only">World {block}: written procedure {flag ? 'recovered' : 'did not recover'}; executable mechanism {executable.flags[block] ? 'recovered' : 'did not recover'}.</span>
   </li>)}
  </ol>
  <p className="edition-plate-key">Each pair: written / executable. ✓ Joint recovery · — No joint recovery.</p>
  <p className="edition-plate-scope">Recovery required a correct record and fresh-task answers. The inherited machinery was protected; prose had interface-compliance failures.</p>
  <Link className="edition-plate-source" href={`${href}#paired-world-record`}>Inspect the paired evidence <span aria-hidden="true">↗</span></Link>
 </figure>;
}
