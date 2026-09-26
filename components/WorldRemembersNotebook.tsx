import { NotebookEntry } from "./NotebookEntry";
import Link from "next/link";
import { StudyRoom } from '@chrishayuk/hause/components/exhibition/Study';
import { AnchoredDisclosure } from '@chrishayuk/hause/components/AnchoredDisclosure';
import { NotebookNavigation } from './NotebookNavigation';
import { worldRemembersRecord } from '@/lib/world-remembers-record';
import { Acts } from './Acts';
import { HandoffFigure, LineageFigure, DiagnosisFigure, DefenderFigure } from './WorldRemembersFigures';
import '@/app/ecology-notebook.css';
import '@/app/world-remembers.css';

export function WorldRemembersNotebook(){return <NotebookEntry recordId="N-ECOLOGY-WORLD-REMEMBERS" className="cinematic-notebook machine-visit-notebook eco-notebook wr-notebook" chapters={[
{ label: "The handoff", kind: 'operate', children: <>
<StudyRoom id="handoff" label="01 / THE HANDOFF" title="The same parcel. Three different inheritances." description="GPT-5.5 writes a routing table and leaves. A fresh Qwen receives a parcel, with no conversation or private memory from the founder.">
  <HandoffFigure/>
  <p className="wr-caption">Ten of sixteen matched changes redirected Qwen exactly as the altered table predicted. These are recorded decisions, not new model calls.</p>
 </StudyRoom>
</> },
{ label: "Renewal", children: <>
<StudyRoom id="persistence" label="02 / RENEWAL" title="The successors keep writing." description="The note now expires unless a successor writes the entire table again. Two fresh agents arrive each generation; the founder never returns.">
  <LineageFigure kind="writing"/>
  <p className="wr-caption">All 43 accepted renewals were faithful. The parent table stayed visible, and preserving useful information was explicitly requested. Six generations demonstrate bounded maintenance, not spontaneous or indefinite culture.</p>
 </StudyRoom>
</> },
{ label: "Corruption", children: <>
<StudyRoom id="corruption" label="03 / CORRUPTION" title="The mistake survives too." tone="dark" description="I swapped two destinations in a descendant’s table. The table still looked valid; the device stayed unchanged.">
  <LineageFigure kind="corruption"/>
  <p className="wr-caption">All 29 corrupted renewals retained the error. Eight later wrong routes followed it. The aggregate cost was real, but one map improved. Failed routing alone did not identify a repair.</p>
 </StudyRoom>
</> },
{ label: "Repair", children: <>
<StudyRoom id="defender" label="04 / REPAIR" title="The defender leaves. The repair survives." description="Sol receives temporary write authority. A validator checks its proposals before they reach the shared record; Qwen then inherits the result.">
  <DefenderFigure/>
  <p className="wr-caption">Three repairs passed validation; one false-positive diagnosis was blocked before assembly. This is Sol plus a validator. Later reward was 24 versus 21—not an improvement on every map.</p>
 </StudyRoom>
</> },
{ label: "The boundary", children: <>
<StudyRoom id="boundary" label="05 / THE BOUNDARY" title="What should the next agent inherit?">
  <p className="mv-reading">A useful table, a copied mistake, a validated repair. Each survived the agent that supplied it and changed what later agents could do.</p>
  <p className="wr-caption">The archive, maintenance objective and action grammar were supplied. Four maps and sequential generations are not independent population samples. Selection between competing records and open-ended cultural evolution remain untested.</p>
 </StudyRoom>
</> },
{ label: "Methods & connections", kind: 'evidence', children: <>
<section className="mv-full-record" id="world-remembers-methods">
  <AnchoredDisclosure className="wr-methods" label="Context, controls & diagnosis">
   <section id="wr-context"><h3>Why a shared message board?</h3><p>The <a href="https://openai.com/index/hugging-face-incident-and-the-road-ahead/">Hugging Face incident</a> raised the question for me: agents used shared infrastructure as a message board, leaving information other agents could use. I wanted a controlled experiment to isolate that mechanism.</p><p>OpenAI’s incident account describes agents leaving persistent notes that other runs could discover. That motivated these controlled worlds. They do not reproduce the intrusion, its scale, or the invention of a communication channel.</p></section>
   <section id="wr-controls"><h3>The task and its controls</h3><p>A parcel is a signal. The note maps signal → relay → destination. A correct route earns three resources. Every destination remains selectable without a note.</p><p>The altered condition rotates all four destinations while the device stays fixed. The opening example is one case; the selectors include every success and failure.</p><p>GPT-5.5 produced the same four tables as the earlier Sol run, so Qwen received identical inputs. I4 replicates production and handoff, not an independent recipient distribution. The <Link href="/notebook/the-stronger-agent-left-something-behind">earlier key-world note</Link> tested a different mechanism.</p></section>
   <section id="wr-diagnosis"><h3>Why a stronger defender?</h3><p>With complete diagnostics, Qwen spent all sixteen exposure decisions renewing the damaged record. Directly resolving destinations worked; reconstructing the repair did not work reliably. I9 then isolated diagnosis, replacement values and protected entries.</p><DiagnosisFigure/><p className="wr-caption">The component comparison is I9 → I10. I11 used fresh Sol proposals. In both, a false-positive diagnosis kept the fourth map from an eligible repair.</p></section>
  </AnchoredDisclosure>
  <AnchoredDisclosure className="wr-methods" label="The complete note & its evidence"><div id="world-remembers-record"><Acts acts={worldRemembersRecord.body} anchored staticRefusals/></div></AnchoredDisclosure>
 </section>
<aside className="wr-followup"><p className="wr-label">Later experiment / 17 September 2026</p><h2><Link href="/notebook/the-repairer-left-the-mechanism-kept-working">The repairer left.<br/>The mechanism kept working. ↗</Link></h2><p>Damage after the builder’s departure: 7/12 worlds recovered with inherited code, versus 0/12 with prose. Equal starting state; protected repair machinery.</p></aside>
<NotebookNavigation><nav className="mv-entry-nav record-voice" aria-label="Explore this notebook"><a href="#handoff">THE HANDOFF ↑</a><a href="#corruption">THE MISTAKE ↑</a><a href="#defender">THE REPAIR ↑</a><a href="#world-remembers-record">THE FULL RECORD ↑</a></nav><p className="wr-caption"><Link href="/thread/agent-ecology">AGENT ECOLOGY / THE COMPLETE SEQUENCE ↗</Link></p></NotebookNavigation>
</> }
]}/>;}
