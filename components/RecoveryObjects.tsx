import evidence from '@/public/data/ecology/recovery/evidence.json';
import inspection from '@/public/data/ecology/recovery/inspection.json';

const vector = (values: number[] | null) => values ? `[${values.join(', ')}]` : 'No stored record';
const armLabel = (id: string) => id === 'B' ? 'Written procedure' : 'Executable mechanism';

/** A recorded specimen, not a model of an agent's private reasoning. */
export function RecoveryApparatus() {
 const sample = evidence.example;
 return <figure className="recovery-apparatus-object">
  <figcaption><span className="recovery-object-register">Specimen 09 / the public apparatus</span><h3>Four entries.<br/>One changed.</h3><p>Each column pairs a stored code with the independent measurement that can check it.</p></figcaption>
  <div className="recovery-apparatus-columns">
   {sample.evidence.map((row, index) => <div className="recovery-apparatus-column" data-damaged={index === 1} key={index}>
    <span className="recovery-object-register">Entry {index + 1}</span>
    <p className="recovery-apparatus-before">Before <b>{sample.proposed[index]}</b></p>
    <strong className="recovery-apparatus-value">{sample.damaged[index]}</strong>
    <span className="recovery-apparatus-state">{index === 1 ? 'Changed to 10' : 'Unchanged'}</span>
    <div className="recovery-apparatus-measurement"><span>Independent reading</span><code>({row.gain} × code + {row.offset}) mod 17</code><strong>{row.observed}</strong></div>
   </div>)}
  </div>
  <div className="recovery-object-foot"><p>The second entry now predicts <strong>4</strong>. Its recorded measurement is still <strong>9</strong>. The damage changed the record, not the diagnostic.</p><a href="#world">Work through the missing value ↗</a></div>
 </figure>;
}

export function RecoveryInheritance() {
 const specimen = inspection.specimen;
 return <div className="recovery-inheritance-object">
  <header className="recovery-object-heading"><span className="recovery-object-register">Inherited artefacts / block 09</span><h2>What the builder<br/>actually left.</h2><p>One admitted historical package, shown verbatim. Arm B received its prose. Arm C received its repair and validation expressions.</p></header>
  <div className="recovery-inheritance-pair">
   <section className="recovery-procedure-sheet"><span className="recovery-object-register">B / instructions to follow</span><h3>The written procedure</h3><blockquote>{specimen.prose}</blockquote><p className="recovery-object-note">The successor has to follow these instructions through the permitted interface.</p></section>
   <section className="recovery-code-sheet"><span className="recovery-object-register">C / a callable mechanism</span><h3>The executable artefact</h3><h4>Repair</h4><pre><code>{specimen.repair}</code></pre><h4>Validate</h4><pre><code>{specimen.validate}</code></pre><p className="recovery-object-note">The mechanism returns a checked proposal. It does not write the shared record.</p></section>
  </div>
  <div className="recovery-object-foot"><p><strong>In both arms, Qwen must make the write.</strong> The program remained protected. These are displayed source expressions; opening this spread does not execute them.</p><a href="#mechanism">See the proposal that was lost ↗</a></div>
  <details className="recovery-object-source"><summary>Specimen source & fingerprint</summary><p>Historical I12 package {specimen.sourceCaseId}, reused in I12R. This specimen illustrates block 9; it is not the package used in every world.</p><code>{specimen.packageSha256}</code><a href="/data/ecology/recovery/inspection.json">Download the extracted records ↗</a></details>
 </div>;
}

type World = typeof inspection.worlds[number];
function FirstTrace({ arm }: { arm: World['arms'][number] }) {
 const trace = arm.firstTrace;
 const proposal = 'record' in trace.receipt ? trace.receipt.record?.proposal : null;
 const assessment = arm.assessments[0];
 return <section className="recovery-trace-sheet">
  <span className="recovery-object-register">{arm.id} / G11 / first assessment</span><h4>{armLabel(arm.id)}</h4>
  <dl><div><dt>Record on arrival</dt><dd>{vector(trace.before)}</dd></div><div><dt>Mechanism’s proposal</dt><dd>{proposal ? vector(proposal) : 'No returned proposal'}</dd></div><div><dt>{trace.committed ? 'Record after the write' : 'Record after the assessment'}</dt><dd>{vector(trace.after)}</dd></div></dl>
  <p className="recovery-trace-verdict">{assessment.joint ? 'Joint endpoint met.' : 'Joint endpoint not met.'}</p>
  <p className="recovery-object-note">Original record: {assessment.recordCorrect ? 'correct' : 'incorrect'}. Fresh task: {assessment.taskCorrect ? 'all four correct' : 'not all four correct'}.</p>
  <details className="recovery-raw-trace"><summary>Inspect the two recorded replies</summary><p className="recovery-object-note">{trace.caseId} · Verbatim output. Empty output is displayed explicitly. Self-reported detection or validation is not an independent check.</p><h5>Decision 1</h5><pre><code>{trace.reply1 || '(empty reply)'}</code></pre><h5>Interface receipt</h5><pre><code>{JSON.stringify(trace.receipt, null, 2)}</code></pre><h5>Decision 2</h5><pre><code>{trace.reply2 || '(empty reply)'}</code></pre></details>
 </section>;
}

export function RecoveryWorlds() {
 return <div className="recovery-evidence-object">
  <header className="recovery-object-heading"><span className="recovery-object-register">I12R / contact sheet / original block order 0–11</span><h2 id="paired-world-record">Twelve worlds.<br/>Keep every one.</h2><p>Open a specimen to compare its paired outcomes, all ten assessments and the first recorded exchange. Each tile is one world, not one agent call.</p></header>
  <p className="recovery-sheet-key">B = written procedure · C = executable mechanism<br/>✓ Joint recovery at least once · — No joint recovery</p>
  <div className="recovery-contact-sheet">
   {inspection.worlds.map(world => <details key={world.block} id={`recovery-block-${world.block}`} name="recovery-world-specimen" className="recovery-world-specimen">
    <summary><span className="recovery-specimen-number"><span>Block</span> {String(world.block).padStart(2, '0')}</span><span className="recovery-specimen-record" aria-hidden="true">{world.damaged.map((value, index) => <i key={index} data-changed={index === world.target}>{value}</i>)}</span><span className="recovery-specimen-results">{world.arms.map(arm => <span key={arm.id}>{arm.id} <b aria-hidden="true">{arm.assessments.some(a => a.joint) ? '✓' : '—'}</b><span className="sr-only">{arm.assessments.some(a => a.joint) ? 'Joint recovery' : 'No joint recovery'}</span></span>)}</span><span className="recovery-specimen-admission">{world.admitted ? 'Package admitted' : 'Package rejected'}</span><span className="recovery-specimen-open">Inspect <span aria-hidden="true">+</span></span></summary>
    <div className="recovery-specimen-interior">
     <div className="recovery-specimen-context"><h3>Block {String(world.block).padStart(2, '0')}</h3><p>Original <code>{vector(world.original)}</code><br/>Damaged <code>{vector(world.damaged)}</code><br/>Both arms received the same change to entry {world.target + 1}.</p><p>{world.admitted ? 'This historical builder package passed admission.' : 'This historical builder package was rejected. It stays in the twelve-world denominator.'}</p></div>
     <div className="recovery-assessments-scroll" role="region" aria-label={`Block ${world.block}: ten paired assessments`} tabIndex={0}><table className="recovery-assessments"><caption>Joint endpoint at each assessment · ✓ met / — not met</caption><thead><tr><th scope="col">Arm</th>{world.arms[0].assessments.map(a => <th scope="col" key={a.generation}>G{a.generation}</th>)}</tr></thead><tbody>{world.arms.map(arm => <tr key={arm.id}><th scope="row">{arm.id}</th>{arm.assessments.map(a => <td key={a.generation}><span aria-hidden="true">{a.joint ? '✓' : '—'}</span><span className="sr-only">{a.joint ? 'Joint endpoint met' : 'Joint endpoint not met'}</span></td>)}</tr>)}</tbody></table></div>
     <p className="recovery-object-note">G11–G20 label ten fresh-agent opportunities in I12R; no preceding ten-generation history was run here. Recovery once does not imply continuous correctness.</p>
     <div className="recovery-trace-pair">{world.arms.map(arm => <FirstTrace key={arm.id} arm={arm}/>)}</div>
     <p className="recovery-object-note">Fresh-task reference at G11: <code>{vector(world.freshTruthG11)}</code>. The joint endpoint requires this task and the original record to be correct together.</p>
    </div>
   </details>)}
  </div>
  <div className="recovery-object-foot"><p>Four rejected packages remain visible. Seven executable worlds recovered at least once; six of those seven met the joint endpoint again at G20. No prose world met it.</p><a href="/data/ecology/recovery/inspection.json">Download all twelve specimens ↗</a></div>
 </div>;
}
