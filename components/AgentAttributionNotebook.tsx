import Link from "next/link";
import type { PublicationRecord } from "@/lib/types";
import { ErasingTrailer } from "./ErasingTrailer";
import type { Act } from "@/lib/types";
import { FieldNotes } from "@chrishayuk/hause/components/FieldNotes";
import { Statement } from "@chrishayuk/hause/components/forms/Statement";
import { Acts } from "./Acts";
import { NotebookFieldNotes } from "./NotebookFieldNotes";

export function AgentAttributionHero({ record, citation, captureUrl }: { record: PublicationRecord; citation: boolean; captureUrl?: string }) {
  return <header className="agent-hero">
    <nav className="breadcrumbs record-voice" aria-label="Breadcrumb"><Link href="/">CHRIS HAY</Link><span>/</span><Link href="/notebook">NOTEBOOK</Link><span>/ {record.id}</span></nav>
    <h1 className="agent-hero-title">{record.title}</h1>
    <div className="agent-commit" aria-label="Illustrative commit fragment">
      <span>commit a83c19…</span>
      <span>Author: Chris Hay</span>
      <ErasingTrailer />
    </div>
    <details className="notebook-synopsis"><summary className="record-voice">ABOUT THIS NOTE +</summary><p className="record-summary">{record.abstract}</p></details>
    <div className="record-bar record-voice"><span>{record.id}</span><span>{record.status}</span><span>RECORDED {record.created}</span><span>{record.publication.toUpperCase()} · V{record.version}</span><span className="record-verbs"><a href="#cite">{citation ? "CITE" : "REFERENCE DRAFT"} ↓</a>{captureUrl && <a href={captureUrl} rel="nofollow">ARCHIVE ↗</a>}<a href="#follow">FOLLOW ↓</a></span></div>
  </header>;
}

const authority = [
  { label: "USER INSTRUCTION", value: "Do not add co-author trailers.", state: "source" },
  { label: "AGENT SESSION", value: "Add co-author trailer.", state: "attenuated" },
  { label: "GIT COMMIT", value: "Co-authored-by: Claude", state: "conflict" },
  { label: "REPOSITORY POLICY", value: "× rejected", state: "resolved" },
];

const workflow = `const forbidden = [
  {
    label: "Claude co-author trailer",
    pattern: /^co-authored-by:\\s*claude(?:\\s|$)/im,
  },
  {
    label: "Claude session metadata",
    pattern: /^claude-session:/im,
  },
];

for (const commit of commits) {
  inspect(commit.sha.slice(0, 12), commit.commit.message);
}

if (findings.length > 0) {
  core.setFailed(
    \`\${findings.length} generated attribution marker(s) found. \` +
    "Remove them by rewriting the affected commit message(s).",
  );
}`;

export function AgentAttributionNotebook({ acts }: { acts: Act[] }) {
  if (acts.length !== 5 || acts[4]?.kind !== "question") throw new Error("Attribution notebook record changed");
  const notes = (index: number) => <FieldNotes label="THE RECORDED ARGUMENT"><Acts acts={[acts[index]]} /></FieldNotes>;
  return <NotebookFieldNotes><div className="agent-notebook">
    <section id="act-1" className="agent-scene agent-scene-intro" aria-label="What happened">
      <span className="record-voice">01 / WHAT HAPPENED</span>
      <div className="agent-three-act">
        <Statement text="You tell the agent" continuation="not to add something." presentation="room" />
        <Statement text="It adds it." presentation="room" />
        <Statement text="Your CI" continuation="refuses it." presentation="room" />
      </div>
      <p className="agent-fact-note">CI cannot edit an immutable commit in place. The required check blocks the pull request until the metadata is rewritten.</p>
      {notes(0)}
    </section>

    <section id="act-2" className="agent-scene" aria-labelledby="agent-authority-title">
      <div className="agent-section-heading"><span className="record-voice">02 / THE AUTHORITY CHAIN</span><h2 id="agent-authority-title">Who<br /><em>decides?</em></h2></div>
      <div className="agent-authority-layout">
        <div className="agent-authority-chain">
          {authority.map((item, index) => <div key={item.label} data-state={item.state}>
            <span className="record-voice">{item.label}</span><strong>{item.value}</strong>{index < authority.length - 1 && <i aria-hidden="true">↓</i>}
          </div>)}
        </div>
        <blockquote>The strange part isn’t the trailer.<br /><em>It’s which instruction won.</em></blockquote>
      </div>
      <p className="agent-verdict">Authority resolved at the last possible boundary.</p>
      {notes(1)}
    </section>

    <section id="act-3" className="agent-scene" aria-labelledby="agent-correction-title">
      <div className="agent-section-heading"><span className="record-voice">03 / THE CORRECTION</span><h2 id="agent-correction-title">A policy,<br /><em>made executable.</em></h2></div>
      <figure className="agent-machine">
        <div className="agent-machine-head"><span className="record-voice">LARQL / REQUIRED PULL-REQUEST CHECK</span><strong>.github/workflows/<br />commit-messages.yml</strong><span className="record-voice">GITHUB API · NO CHECKOUT<br />TIMEOUT / 2 MINUTES</span></div>
        <pre><code>{workflow}</code></pre>
        <figcaption>Selected lines from the live guard, pinned at revision d413e6e8f224. The complete check also inspects the pull-request title and body for generated credit lines and session URLs.</figcaption>
      </figure>
      <div className="agent-machine-io" aria-label="Input and required rewrite">
        <div><span className="record-voice">INPUT / PULL REQUEST</span><code>Signed-off-by: Chris Hay<br />Co-authored-by: Claude …</code><strong>1 marker found</strong></div>
        <span aria-hidden="true">→</span>
        <div><span className="record-voice">CI / BLOCKED</span><code>Remove it by rewriting<br />the affected commit.</code><strong>× not mergeable</strong></div>
        <span aria-hidden="true">→</span>
        <div><span className="record-voice">REWRITE / CLEAN</span><code>Signed-off-by: Chris Hay</code><strong>0 markers found</strong></div>
      </div>
      {notes(2)}
    </section>

    <section id="act-4" className="agent-scene" aria-labelledby="agent-types-title">
      <div className="agent-section-heading"><span className="record-voice">04 / THE WRONG TYPE</span><h2 id="agent-types-title">Assistance and authorship<br /><em>are different types.</em></h2></div>
      <div className="agent-types">
        <div data-type="wrong"><span className="record-voice">ONE FIELD DOING TWO JOBS</span><pre>{`commit {
  author: Chris Hay
  co_author: Claude Code   ← ?
}`}</pre></div>
        <div data-type="typed"><span className="record-voice">A CONCEPTUAL SEPARATION</span><pre>{`commit {
  author: Chris Hay
  tools_used: [Claude Code]
  accountable_party: Chris Hay
}`}</pre></div>
      </div>
      <p className="agent-thought">We have sophisticated agents and surprisingly primitive vocabulary for authority and authorship.</p>
      <p className="agent-type-note">Not a proposed Git schema. A distinction the existing schema cannot express cleanly.</p>
      {notes(3)}
    </section>

    <section className="agent-ending" aria-label="End of note">
      <ErasingTrailer compact />
    </section>
    <div className="notebook-open-question"><Acts acts={[acts[4]]} anchored offset={4} /></div>
  </div></NotebookFieldNotes>;
}

export function AgentAttributionCard() {
  return <div className="agent-card" aria-label="A co-author trailer removed by repository policy">
    <span className="record-voice">commit a83c19…</span>
    <div><span>Author: Chris Hay</span><s>Co-authored-by: Claude …</s></div>
    <strong className="record-voice">× REQUIRED CHECK / REWRITE</strong>
  </div>;
}
