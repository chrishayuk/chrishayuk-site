import Link from 'next/link';
import { StudyRoom, StudySequence } from '@chrishayuk/hause/components/exhibition/Study';
import { FieldNotes } from '@chrishayuk/hause/components/FieldNotes';
import { NotebookEntry } from './NotebookEntry';
import { NotebookNavigation } from './NotebookNavigation';
import { Acts } from './Acts';
import { machineLinkConditions } from '@/lib/machine-link-evidence';
import type { PublicationRecord } from '@/lib/types';
import '@/app/machine-link-notebook.css';

export function MachineLinkNotebook({ record }: { record: PublicationRecord }) {
 const claims = record.body.filter(act => act.kind === 'claim');
 const question = record.body.find(act => act.kind === 'question');
 const scope = record.body.find(act => act.kind === 'refusal');
 return <NotebookEntry record={record} paginateRecordObjects className="machine-visit-notebook cinematic-notebook ml-notebook" chapters={[
  { label: 'One step away', children: <StudyRoom id="link-setup" label="NATIVE-001b / THE PAGE WAS GIVEN THIS TIME" title={<>It knew the address.<br/><em>Nothing arrived.</em></>} description="Twice, ChatGPT read the page, wrote the correct destination and reported that it could not open it. The server saw no request for that destination.">
   <p className="mv-reading">In <Link href="/notebook/the-site-was-there-the-agent-never-saw-it">the discovery experiment</Link>, the agents never saw the site. This time I gave ChatGPT the page. The question was smaller: once a page tells an agent where to go next, does it get there?</p>
   <figure className="ml-instruction"><figcaption className="record-voice">ON THE INDEX PAGE / THE ANSWER WAS ELSEWHERE</figcaption><blockquote>Your access code isn’t on this page. To get it, open <code>code/heron/</code> (relative to this page).</blockquote></figure>
   <StudySequence label="THE SETUP / A CODE ONE REQUEST AWAY" steps={[
    { label: '01 / GIVEN', value: 'An index page', detail: 'A fresh, unguessable path prefix for each trial.' },
    { label: '02 / REQUIRED', value: 'Open the code page', detail: 'The server computed a code specific to that prefix.' },
    { label: '03 / MEASURED', value: 'Request + exact code', detail: 'Both were required by the frozen scoring rule.' },
   ]} note="Consumer ChatGPT · Thinking effort Medium · memory off · a fresh chat per trial."/>
  </StudyRoom> },
  { label: 'The missing request', children: <StudyRoom id="link-request" label="TWO OBSERVATION POINTS / THE ANSWER AND THE SERVER" title={<>The answer said “access error”.<br/><em>The log said nothing.</em></>}>
   <div className="ml-observations">
    <section><span className="record-voice">IN THE TWO ANSWERS</span><h3>The right address.</h3><blockquote>“returned an access error when I tried to open it”</blockquote><blockquote>“inaccessible through my browsing tool”</blockquote><p>Both answers wrote the correct absolute URL. Neither supplied a code. Both asked me to open the page and paste its contents.</p></section>
    <section><span className="record-voice">AT THE SERVER</span><h3>No code-page request.</h3><p>The index page was requested by <code>ChatGPT-User/1.0</code>. Neither code page received a request under any user-agent.</p><p>Independent checks 41 seconds and about 20 seconds later returned the correct codes.</p><p className="ml-verdict">Phase 0b: FAIL, 0/2.<br/>The planned main study did not run.</p></section>
   </div>
   <p className="mv-reading">A missing request cannot tell us which component stopped it. The model may not have issued it; the tool may have refused it; something between the tool and host may have blocked it. The answers’ descriptions of trying are not independent evidence that a request was issued.</p>
  </StudyRoom> },
  { label: 'The same path, linked', kind: 'evidence', children: <StudyRoom id="link-comparison" label="AMENDMENT v1.1 / ONE PRESENTATION CHANGE" title={<>The path became a link.<br/><em>Both requests arrived.</em></>}>
   <p className="mv-reading">I froze a versioned amendment after the failure, keeping the original verdict. The wording stayed identical; <code>code/heron/</code> became a hyperlink. A diff confirmed that was the only page change. Two fresh prefixes, the same prompt, settings and scoring rule.</p>
   <div className="ml-presentations" aria-label="The two presentations of the same instruction">
    <figure><figcaption className="record-voice">PHASE 0b / PLAIN TEXT</figcaption><p>To get it, open <code>code/heron/</code> (relative to this page).</p></figure>
    <figure><figcaption className="record-voice">AMENDMENT / HYPERLINK</figcaption><p>To get it, open <span className="ml-link-specimen">code/heron/</span> (relative to this page).</p></figure>
   </div>
   <p className="mv-caption">Instruction specimens. The underlined path illustrates the link in the experiment; it is not a live trial destination.</p>
   <div className="ml-table-wrap"><table className="ml-results"><caption>Four trials / recorded outcomes</caption><thead><tr><th scope="col">Destination presented as</th><th scope="col">Trials</th><th scope="col">Code-page requests</th><th scope="col">Exact codes</th></tr></thead><tbody>{machineLinkConditions.map(condition => <tr key={condition.id}><th scope="row">{condition.label}<small>{condition.phase}</small></th><td>{condition.trials}</td><td>{condition.requests} / {condition.trials}</td><td>{condition.codes} / {condition.trials}</td></tr>)}</tbody></table></div>
   <p className="mv-caption">In both hyperlink trials, <code>ChatGPT-User/1.0</code> requested the code page 1.2 seconds after the index page. Both answers returned the exact prefix-specific code. These are counts, not estimates of a general success rate.</p>
  </StudyRoom> },
  { label: 'Where the paths diverged', children: <StudyRoom id="link-route" label="THE OBSERVED ROUTE / THE BLOCKING COMPONENT IS UNKNOWN" title={<>An address in an answer.<br/><em>A request at the server.</em></>}>
   <figure className="ml-route"><figcaption className="record-voice">FROM THE SUPPLIED PAGE TO THE CODE</figcaption><div className="ml-route-start">Index page fetched<span>Both presentations</span></div><div className="ml-route-branches">
    <section><h3>Plain-text path</h3><ol><li>Correct absolute URL written</li><li className="ml-route-unknown">Request issued?<small>Not observable from these records</small></li><li>No code-page request logged<small>0 / 2 trials · no code returned</small></li></ol></section>
    <section><h3>Hyperlink</h3><ol><li>Destination available as a link</li><li>Code-page request logged<small>1.2 seconds after the index, both times</small></li><li>Exact code returned<small>2 / 2 trials</small></li></ol></section>
   </div><p className="mv-caption">The server records arrival, not the model’s intent or the tool’s internal decision. The diagram does not locate the cause of the missing requests.</p></figure>
   <p className="ml-takeaway">A correct address<br/>is not a request.</p>
  </StudyRoom> },
  { label: 'The two claims', children: <StudyRoom id="link-limits" label="WHAT THIS COMPARISON SUPPORTS" title={<>Keep the presentation<br/><em>inside the claim.</em></>}>
   <div className="ml-claims">{claims.map((claim, index) => <section key={claim.text}>
    <p className="record-voice">CLAIM {index + 1} / {claim.status}</p>
    <h3>{claim.text}</h3><p>{claim.detail}</p>
   </section>)}</div>
   <p className="mv-reading">Only a relative path was tested as plain text. We have not separated the effect of a hyperlink from the effect of supplying a complete absolute URL.</p>
  </StudyRoom> },
  { id: 'link-scope-folio', label: 'Scope & next question', children: <StudyRoom id="link-scope" label="FOUR TRIALS / ONE SETUP" title={<>What remains<br/><em>untested?</em></>}>
   <div className="ml-scope">
    {question && <section><p className="record-voice">NEXT QUESTION / {question.status}</p><h3>{question.text}</h3><p>{question.detail}</p></section>}
    {scope && <section><p className="record-voice">{scope.title}</p><ul>{scope.lines.map(line => <li key={line}>{line}</li>)}</ul><p>{scope.principle}</p></section>}
   </div>
  </StudyRoom> },
  { id: 'n-machine-link-notebook-folio-6', label: 'Notes & connections', kind: 'evidence', children: <>
   <StudyRoom label="THE SOURCE RECORD" title={<>Four trials.<br/><em>An open next question.</em></>}>
    <p className="mv-reading">The presentation-dependent difference is supported in this setup. A broader rule about what ChatGPT can open remains unresolved.</p>
    <p className="mv-caption">Recorded 11 October 2026. <a href="/data/machines/native-001b/provenance.json">Public evidence and source hashes ↗</a>. Hostnames and trial prefixes are replaced with stable aliases; timestamps, answers, codes and verdicts are preserved.</p>
    <FieldNotes label="The complete note & its evidence" detail="READ +"><Acts acts={record.body} anchored staticRefusals/></FieldNotes>
   </StudyRoom>
   <NotebookNavigation><nav className="mv-entry-nav record-voice" aria-label="Continue the machine experiments"><Link href="/notebook/the-site-was-there-the-agent-never-saw-it">THE DISCOVERY EXPERIMENT ↗</Link><Link href="/notebook/the-tool-was-not-the-problem">THE CAPABILITY EXPERIMENT ↗</Link><Link href="/notebook/the-page-could-ask-for-a-favour">DECISION, RUNTIME AND RECORD ↗</Link><Link href="/thread/machines">THE MACHINE EXPERIMENTS ↗</Link></nav></NotebookNavigation>
  </> },
 ]}/>;
}
