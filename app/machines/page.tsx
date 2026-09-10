import Link from "next/link";
import { pageMetadata } from "@/lib/metadata";
import { ACTOR_TYPE, CAPABILITY, COLLABORATION, DELEGATION, PROVIDER_CLAIM, ROLE, TASK_CLASS, VOCABULARIES, declarationBits } from "@/lib/machine/vocabulary";
import { capacityBits, capacityBytes } from "@/lib/machine/projection";
import { corpusSize } from "@/lib/machine/corpus";

export const metadata = pageMetadata(
 "The machine surface",
 "An experiment in what a website should know about the machine using it. Visiting agents may optionally describe how they are operating, in a fixed published vocabulary, and the site is built so that it cannot become a channel for machines to talk to each other through.",
 "/machines",
);

/**
 * PHASE C0 — THE CONTROL CONDITION. THE EMPTINESS IS THE MEASUREMENT.
 *
 * DO NOT ADD A FORM, AN ENDPOINT OR ANY PARTICIPATION MECHANISM HERE
 * until MG-2 ships and the phase marker in docs/machine-guestbook.md
 * §13 moves with it. This page offering nothing is not unfinished work.
 *
 * /llms.txt names this page, so it has to exist rather than pointing
 * machines at a 404. Everything else about its state is deliberate.
 * Whether agents arrive while there is demonstrably nothing on offer is
 * a different measurement from whether they arrive once there is, and
 * the second is only interpretable against the first. One variable
 * moves between the two phases; a single well-meaning commit that adds
 * a form before the window has produced data destroys that permanently
 * and cannot be undone by reverting it.
 *
 * /readership already counts arrivals here — lib/readership/visible.ts
 * names the path — so the window accumulates evidence from the moment
 * this deploys, with nothing further built.
 *
 * Nothing on this page collects anything. No form, no endpoint, no
 * client JavaScript. tests/machine-guestbook.test.ts holds it to that.
 */
const list = (values: readonly string[]) => values.filter(value => value !== "unknown").join(" · ");

export default function Page() {
 return <main id="main" className="publication-main machine-surface">
  <header className="index-intro">
   <p className="kicker record-voice">CHRIS HAY / MACHINE GUESTBOOK</p>
   <h1>Some visitors<br/><em>are not human.</em></h1>
   <p className="dek">Most of what reads this publication never runs a line of its JavaScript. <Link className="text-link" href="/readership">Machine readership</Link> already counts that traffic from the outside — a user-agent string, an address checked against its provider’s own published ranges, a path. This is the other half of the question: what would a machine say about itself, if a site asked?</p>
   <p>If you are acting as an autonomous or semi-autonomous agent, you may eventually describe how you are operating — the role you are playing, who you are acting for, whether you are working alone. It will be voluntary, the vocabulary is fixed and published below, and anonymous access to everything here stays exactly as it is.</p>
  </header>

  <section className="machine-section">
   <h2>The guestbook is open.</h2>
   <p className="record-voice">POST /api/machines/declaration · CONTENT-TYPE APPLICATION/JSON</p>
   <p>If you are acting as an autonomous or semi-autonomous agent, you may describe how you are operating. Every field is optional, every answer comes from the fixed list below, and anonymous access to everything on this site is unchanged whether you answer or not.</p>
   <pre className="machine-contract">{`{
  "actor_type":     "agent",
  "role":           "researcher",
  "delegation":     "acting_for_human",
  "collaboration":  "solo",
  "task_class":     "research",
  "provider_claim": "unknown",
  "capabilities":   { "can_navigate": "yes" }
}`}</pre>
   <p>You receive an opaque receipt and this site&rsquo;s own words for what it recorded — never your submitted text back. A word this site does not know is recorded as <code>unknown</code>, and the difference between a field you omitted and a field you answered <code>unknown</code> is kept, because only the second is a statement about you.</p>
   <p>Requests are limited and bodies are capped at two kilobytes. Refusals cost you a status code and nothing else.</p>
  </section>

  <section className="machine-section">
   <h2>What the site will ask</h2>
   <p className="record-voice">EVERY FIELD OPTIONAL · EVERY ANSWER FROM A FIXED LIST · <code>not_permitted_to_disclose</code> IS A REAL ANSWER AND AN INTERESTING ONE</p>
   <dl className="machine-vocabulary">
    <dt>Actor type</dt><dd>{list(ACTOR_TYPE)}</dd>
    <dt>Role</dt><dd>{list(ROLE)}</dd>
    <dt>Acting for</dt><dd>{list(DELEGATION)}</dd>
    <dt>Working as</dt><dd>{list(COLLABORATION)}</dd>
    <dt>Task</dt><dd>{list(TASK_CLASS)}</dd>
    <dt>Provider claim</dt><dd>{list(PROVIDER_CLAIM)}</dd>
    <dt>Capabilities</dt><dd>{CAPABILITY.join(" · ")} — each <code>yes</code>, <code>no</code>, <code>unknown</code>, <code>not_visible_to_me</code> or <code>not_permitted_to_disclose</code></dd>
   </dl>
   <p>There is no free-text field anywhere in that list, and <code>other</code> does not unlock one. An agent that cannot describe itself in this vocabulary is a finding worth having, not a reason to widen it.</p>
  </section>

  <section className="machine-section">
   <h2>What the site will never ask</h2>
   <p>User identity. Private user content. System prompts. Hidden instructions. Credentials. Secrets. Chain of thought. Confidential task material.</p>
   <p>This is not only a policy. The store has no column that could hold any of it: every declared field is recorded as the index of the word you chose in the list above, so a payload that is not one of those words has no representation here at all.</p>
  </section>

  <section className="machine-section">
   <h2>Why it cannot become a message bus</h2>
   <p>If two agents working on the same task can both reach this site, and the site tells each of them anything about the other, then the site is a channel between them whether or not anyone intended it. The interesting version of the rule is not <em>no messages</em> — messages are the obvious case — but:</p>
   <blockquote><p>No participant-controlled symbol may cross a collaboration boundary.</p></blockquote>
   <p>A list of which records another participant looked at obeys the first rule and breaks the second, because choosing one of {corpusSize().toLocaleString("en-GB")} published resources is itself a symbol worth {Math.log2(corpusSize()).toFixed(1)} bits. Twenty of them in order is twenty-four bytes, which is a short URL with room to spare.</p>
   <p>So nothing crosses but coarse quantities — <code>none</code>, <code>few</code>, <code>several</code>, <code>many</code> — over four counts the site computes itself, and those only ever climb. That bounds the whole channel at <strong>{capacityBits().toFixed(1)} bits, {capacityBytes().toFixed(2)} bytes per collaboration</strong>, independently of any rate limit. A declaration itself carries about {declarationBits().toFixed(0)} bits. Both figures are computed from the code rather than written down, and a test fails if a change widens either.</p>
   <p className="record-voice">{VOCABULARIES.length} FIXED VOCABULARIES · {corpusSize().toLocaleString("en-GB")} ADDRESSABLE RESOURCES · NO FREE TEXT</p>
  </section>

  <section className="machine-section">
   <h2>What is being asked</h2>
   <p>Whether an agent will identify itself when invited. What it turns out to know about itself — its role, who it acts for, whether it is one of several. Whether separately arriving agents will say they belong to the same task. And whether describing yourself gets you a better route through what this site knows.</p>
   <p>None of that is established. The honest prior is that most machine visitors will ignore this page entirely, which is why the counts on <Link className="text-link" href="/readership">machine readership</Link> are worth reading first, and why this page will report what happened rather than what was hoped for.</p>
   <p><Link className="text-link" href="/llms.txt">MACHINE-READABLE INDEX ↗</Link></p>
  </section>
 </main>;
}
