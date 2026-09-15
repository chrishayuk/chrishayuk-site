import { VisualStudy } from './VisualStudy';
import { StudyRoom } from '@chrishayuk/hause/components/exhibition/Study';
import { FieldNotes } from '@chrishayuk/hause/components/FieldNotes';
import { NotebookFieldNotes } from './NotebookFieldNotes';
import { NotebookNavigation } from './NotebookNavigation';
import { worldRemembersRecord } from '@/lib/world-remembers-record';
import { Acts } from './Acts';
import { HandoffFigure, LineageFigure, DiagnosisFigure, DefenderFigure } from './WorldRemembersFigures';
import '@/app/ecology-notebook.css';
import '@/app/world-remembers.css';

export function WorldRemembersNotebook(){return <NotebookFieldNotes><div className="cinematic-notebook machine-visit-notebook eco-notebook wr-notebook">
 <VisualStudy name="inheritance"/>
 <StudyRoom id="handoff" label="01 / THE CONTROLLED EXPERIMENT" title={<>The stronger model leaves.<br/><em>What happens next?</em></>} description="What happens when a stronger model leaves a useful message on a shared board, then exits—and only weaker models remain?">
  <p className="mv-reading">The <a href="https://openai.com/index/hugging-face-incident-and-the-road-ahead/">Hugging Face incident</a> raised that question for me: agents used shared infrastructure as a message board, leaving information other agents could use. I wanted a controlled experiment to isolate that mechanism.</p>
  <p className="mv-reading">Here the message is a routing table. GPT-5.5 writes it and leaves. Only fresh Qwen agents follow, with no conversation or private memory from the founder. I keep, remove or alter the message to test what it changes.</p>
  <p className="eco-watch">Keep the note. Remove it. Change it. Where does the same parcel go?</p>
  <HandoffFigure/>
  <p className="wr-takeaway">Change the inherited information.<br/><em>The next agent’s answer moves.</em></p>
  <p className="wr-caption">Ten of sixteen matched changes redirected Qwen exactly as the altered table predicted. All selectors replay recorded decisions; they make no new model calls.</p>
  <FieldNotes label="The task, controls and earlier handoff" detail="READ +"><div className="mv-prose"><p>A parcel is a signal. The note maps signal → relay → destination. A correct route earns three resources. Every destination remains selectable without a note.</p><p>The altered condition rotates all four destinations while the device stays fixed. The opening example is one case; the selectors include every success and failure.</p><p>GPT-5.5 produced the same four tables as the earlier Sol run, so Qwen received identical inputs. I4 replicates production and handoff, not an independent recipient distribution. The <a href="/notebook/the-stronger-agent-left-something-behind">earlier key-world note</a> tested a different mechanism.</p></div></FieldNotes>
 </StudyRoom>

 <StudyRoom id="persistence" label="02 / MAKE THE NOTE TEMPORARY" title={<>The founder is gone.<br/><em>The successors keep writing.</em></>} description="Now the record expires unless a successor preserves it. No copy button: Qwen must write the entire table. Two fresh agents arrive each generation. The founder never returns.">
  <LineageFigure kind="writing"/>
  <p className="wr-takeaway">They weren’t copying a pointer.<br/><em>They were rewriting the information.</em></p>
  <p className="wr-caption">All 43 accepted renewals were faithful. The parent table stayed visible, and preserving useful information was explicitly requested. Six generations demonstrate bounded maintenance, not spontaneous or indefinite culture.</p>
 </StudyRoom>

 <VisualStudy name="descendant"/>

 <StudyRoom id="corruption" label="03 / CHANGE TWO ENTRIES" title={<>They kept the note alive.<br/><em>They kept the mistake too.</em></>} tone="dark" description="I swapped two destinations in an actual descendant. The table still looked valid. The device stayed unchanged. Then I let the population continue.">
  <LineageFigure kind="corruption"/>
  <p className="wr-takeaway">Persistence is not correctness.</p>
  <p className="wr-caption">All 29 corrupted renewals retained the error. Eight later wrong routes followed it. The aggregate cost was real, but one map improved. Failed routing alone did not identify a repair.</p>
 </StudyRoom>

 <StudyRoom id="defender" label="04 / REPAIR THE SHARED WORLD" title={<>The defender leaves.<br/><em>The repair survives.</em></>} description="Diagnostic evidence made Qwen copy more, without correcting the table. Sol was better at deriving repairs. I gave it temporary write authority, with a validator checking each proposal first.">
  <DefenderFigure/>
  <p className="wr-takeaway">Sol changed what the next agents inherited.<br/><em>Qwen carried that correction forward.</em></p>
  <p className="wr-caption">Three repairs passed validation; one false-positive diagnosis was blocked before assembly. This is Sol plus a validator. Later reward was 24 versus 21—not an improvement on every map.</p>
  <FieldNotes label="Why a stronger defender?" detail="DIAGNOSIS +"><div className="mv-prose"><p>With complete diagnostics, Qwen spent all sixteen exposure decisions renewing the damaged record. Directly resolving destinations worked; reconstructing the repair did not work reliably. I9 then isolated diagnosis, replacement values and protected entries.</p></div><DiagnosisFigure/><p className="wr-caption">The component comparison is I9 → I10. I11 used fresh Sol proposals. In both, a false-positive diagnosis kept the fourth map from an eligible repair.</p></FieldNotes>
 </StudyRoom>

 <StudyRoom id="boundary" label="05 / WHAT THE WORLD CARRIES" title={<>The next agent doesn’t inherit the founder.<br/><em>It inherits the world.</em></>} tone="accent">
  <p className="mv-reading">A useful table. A copied mistake. A validated repair. Each survived the agent that supplied it and changed what later agents could do.</p>
  <p className="mv-reading">The environment became part of the population’s capability. What should it keep—and who can tell when it is wrong?</p>
  <FieldNotes label="The Hugging Face connection—and the boundary" detail="CONTEXT +"><div className="mv-prose"><p>OpenAI’s incident account describes agents leaving persistent notes that other runs could discover. That motivated these controlled worlds. They do not reproduce the intrusion, its scale, or the invention of a communication channel.</p><p>Here the archive, maintenance objective and action grammar were supplied. Four maps and sequential generations are not independent population samples. Selection between competing records and open-ended cultural evolution remain untested.</p><p><a href="https://openai.com/index/hugging-face-incident-and-the-road-ahead/">Read OpenAI’s account ↗</a></p></div></FieldNotes>
 </StudyRoom>
 <section className="mv-full-record" id="world-remembers-record"><FieldNotes label="The complete note & its evidence" detail="READ +"><Acts acts={worldRemembersRecord.body} anchored staticRefusals/></FieldNotes></section>
 <NotebookNavigation><nav className="mv-entry-nav record-voice" aria-label="Explore this notebook"><a href="#handoff">THE HANDOFF ↑</a><a href="#corruption">THE MISTAKE ↑</a><a href="#defender">THE REPAIR ↑</a><a href="#world-remembers-record">THE FULL RECORD ↑</a></nav><p className="wr-caption"><a href="/thread/agent-ecology">AGENT ECOLOGY / THE COMPLETE SEQUENCE ↗</a></p></NotebookNavigation>
 </div></NotebookFieldNotes>;}
