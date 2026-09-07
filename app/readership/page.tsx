import Link from "next/link";
import { pageMetadata } from "@/lib/metadata";
import { DEFINITIONS, NOTES, readershipReport, WINDOW_DAYS } from "@/lib/readership/report";

export const metadata = pageMetadata("Machine readership", "Who reads this publication, humans and machines. Server-side counts of AI retrieval, indexing and training requests, reported separately as verified or self-declared.", "/readership");
export const dynamic = "force-dynamic";

const n = (value: number) => value.toLocaleString("en-GB");
const share = (value: number, total: number) => (total > 0 ? `${Math.round((value / total) * 100)}%` : "—");
const PROVIDERS: Record<string, string> = { openai: "OpenAI", anthropic: "Anthropic", perplexity: "Perplexity", google: "Google", microsoft: "Microsoft", apple: "Apple", meta: "Meta", bytedance: "ByteDance", amazon: "Amazon", mistral: "Mistral", "common-crawl": "Common Crawl", duckduckgo: "DuckDuckGo", "allen-ai": "Allen Institute", cohere: "Cohere", yandex: "Yandex", baidu: "Baidu", yahoo: "Yahoo", other: "Other", unknown: "Unattributed", none: "—" };
const SURFACES: [string, string][] = [["page", "Pages"], ["feed", "Feeds"], ["agent_document", "Agent documents"], ["api", "Record API"], ["asset", "Assets"], ["other", "Unrecognised"]];
const REFERRALS: Record<string, string> = { chatgpt: "ChatGPT", claude: "Claude", perplexity: "Perplexity", copilot: "Copilot", search: "Web search", social: "Social" };
const name = (provider: string) => PROVIDERS[provider] ?? provider;

export default async function Page() {
 const report = await readershipReport();
 const counts = report.counts;
 const ai = counts ? counts.purposes.ai_user + counts.purposes.ai_search + counts.purposes.ai_training : 0;
 const checked = counts ? counts.confidence.verified + counts.confidence.declared + counts.confidence.refuted : 0;
 const followed = counts ? Object.values(counts.referrals).reduce((total, value) => total + value, 0) : 0;

 return <main id="main" className="publication-main readership-page">
  <header className="index-intro">
   <p className="kicker record-voice">CHRIS HAY / MACHINE READERSHIP</p>
   <h1>Who is<br/><em>reading?</em></h1>
   <p className="dek">Most of the audience for this publication never runs a line of its JavaScript. Training crawlers, AI search indexers, feed clients and the fetch an assistant makes because somebody asked it a question — none of them appear in ordinary analytics. This page counts them at the server, where they are actually visible.</p>
   <p>A count here is a request, not a person. Where a provider publishes the addresses its agents use, every claim is checked against that list and the checked and unchecked figures are kept apart. <Link className="text-link" href="/api/readership">MACHINE-READABLE ↗</Link></p>
  </header>

  {!counts ? <section className="knowledge-limits">
   <h2>{report.recording ? "Nothing counted yet." : "Not recording on this deployment."}</h2>
   <p>{report.recording
    ? "The store is open and empty. Counts appear here as requests arrive; no figure is shown before there is one."
    : "Machine readership is recorded only where the published edition has a durable store. Local development, previews and the Sites build classify requests and keep nothing, so this page has nothing to print rather than an invented figure to show."}</p>
   <p>The classifier, the published address lists it checks against and the retention rules are the same in every environment. See <Link href="/colophon">publication notes</Link>.</p>
  </section> : <>

  <section className="knowledge-coverage" aria-label={`Machine readership over the last ${WINDOW_DAYS} days`}>
   <div><strong>{n(counts.purposes.ai_user)}</strong><span>AI RETRIEVALS · USER-INITIATED</span></div>
   <div><strong>{n(counts.purposes.ai_search)}</strong><span>AI INDEXING</span></div>
   <div><strong>{n(counts.purposes.ai_training)}</strong><span>AI TRAINING</span></div>
   <div><strong>{n(counts.purposes.human)}</strong><span>BROWSER REQUESTS</span></div>
  </section>

  <section className="readership-band">
   <p className="record-voice">LAST {WINDOW_DAYS} DAYS · {counts.from} TO {counts.to} · {n(counts.total)} REQUESTS COUNTED</p>
   <div className="readership-verification">
    <div><strong>{n(counts.confidence.verified)}</strong><span>VERIFIED</span><p>The declared agent&rsquo;s provider publishes the addresses it uses, and this request came from one of them.</p></div>
    <div><strong>{n(counts.confidence.declared)}</strong><span>DECLARED, UNCHECKED</span><p>An agent named itself and its provider publishes no list this site can test the claim against.</p></div>
    <div><strong>{n(counts.confidence.refuted)}</strong><span>REFUTED, EXCLUDED</span><p>An agent named itself and its own provider&rsquo;s published addresses exclude this request. Counted here and nowhere else on this page.</p></div>
   </div>
   <p className="readership-note">{checked > 0 ? `${share(counts.confidence.verified, checked)} of identified agent requests are verified against a published address list.` : "No agent has identified itself in this window."}</p>
  </section>

  <section className="readership-table" aria-label="By system">
   <p className="kicker record-voice">BY SYSTEM</p>
   <table><thead><tr><th>System</th><th>Retrieval</th><th>Indexing</th><th>Training</th><th>Share of AI</th></tr></thead>
    <tbody>{counts.providers.map(provider => <tr key={provider.provider}>
     <td>{name(provider.provider)}</td><td>{n(provider.retrieval)}</td><td>{n(provider.indexing)}</td><td>{n(provider.training)}</td><td>{share(provider.total, ai)}</td>
    </tr>)}{counts.providers.length === 0 && <tr><td colSpan={5}>No AI system has requested anything in this window.</td></tr>}</tbody>
   </table>
  </section>

  <section className="readership-table" aria-label="What machines are reading">
   <p className="kicker record-voice">WHAT IS BEING READ</p>
   <p className="readership-lede">The column that matters is the first one. Indexing says a page is discoverable. A user-initiated retrieval says an idea entered somebody&rsquo;s conversation and a machine came back here for the primary source.</p>
   <table><thead><tr><th>Path</th><th>User-initiated</th><th>All AI</th><th>Browsers</th></tr></thead>
    <tbody>{counts.paths.map(entry => <tr key={entry.path}>
     <td>{entry.path.startsWith("/") ? <Link href={entry.path}>{entry.path}</Link> : entry.path}</td>
     <td>{n(entry.aiUser)}</td><td>{n(entry.ai)}</td><td>{n(entry.human)}</td>
    </tr>)}{counts.paths.length === 0 && <tr><td colSpan={4}>Nothing counted yet.</td></tr>}</tbody>
   </table>
  </section>

  <section className="readership-table" aria-label="What kind of document">
   <p className="kicker record-voice">SCRAPED, OR SUBSCRIBED TO</p>
   <p className="readership-lede">This publication offers machines documents of their own — two feeds, a follow signal, a record API, a sitemap. Whether an agent takes them, or only takes the pages, is the difference between being read and being harvested.</p>
   <table><thead><tr><th>Document</th><th>Requests</th><th>Share</th></tr></thead>
    <tbody>{SURFACES.filter(([key]) => counts.surfaces[key as keyof typeof counts.surfaces] > 0).map(([key, label]) => <tr key={key}>
     <td>{label}</td><td>{n(counts.surfaces[key as keyof typeof counts.surfaces])}</td><td>{share(counts.surfaces[key as keyof typeof counts.surfaces], counts.total)}</td>
    </tr>)}</tbody>
   </table>
   <p className="readership-note">Feed clients polling on someone&rsquo;s behalf: {n(counts.purposes.feed_reader)}. Preview cards built for shared links: {n(counts.purposes.link_preview)}. Conventional search indexing: {n(counts.purposes.search_bot)}. Machine requests this site cannot attribute: {n(counts.purposes.automation)}.</p>
  </section>

  {followed > 0 && <section className="readership-table" aria-label="Citations followed">
   <p className="kicker record-voice">CITATIONS SOMEBODY FOLLOWED</p>
   <p className="readership-lede">A retrieval is a machine reading. This is the other half of the same event: a browser arriving from the answer that cited the page. ChatGPT marks its citation links, so the two stages can be told apart.</p>
   <table><thead><tr><th>Arrived from</th><th>Browser requests</th></tr></thead>
    <tbody>{Object.entries(counts.referrals).sort(([, a], [, b]) => b - a).map(([key, value]) => <tr key={key}><td>{REFERRALS[key] ?? key}</td><td>{n(value)}</td></tr>)}</tbody>
   </table>
  </section>}

  {counts.recent.length > 0 && <section className="readership-table" aria-label="Recent AI requests">
   <p className="kicker record-voice">RECENT · BUCKETED TO THE HOUR</p>
   <table><thead><tr><th>Hour</th><th>Agent</th><th>Purpose</th><th>Path</th><th>Requests</th></tr></thead>
    <tbody>{counts.recent.map(entry => <tr key={`${entry.hour}${entry.agent}${entry.path}`}>
     <td>{entry.hour}</td>
     <td>{entry.agent} <span className="record-voice">{entry.confidence === "verified" ? "VERIFIED" : "DECLARED"}</span></td>
     <td>{entry.purpose === "ai_user" ? "retrieval" : entry.purpose === "ai_search" ? "indexing" : "training"}</td>
     <td><Link href={entry.path}>{entry.path}</Link></td><td>{n(entry.n)}</td>
    </tr>)}</tbody>
   </table>
  </section>}
  </>}

  <section className="knowledge-limits">
   <h2>What these numbers do not say.</h2>
   {NOTES.map(note => <p key={note}>{note}</p>)}
   <p>Verification uses a dated snapshot of each provider&rsquo;s own published address list, retrieved {report.verification.retrievedAt} and held in this repository: {report.verification.prefixes.toLocaleString("en-GB")} address ranges across {report.verification.sources.length} published documents. Anthropic, OpenAI, Perplexity, Google and Microsoft publish one. Apple and most others do not, so their agents can be recorded and never confirmed.</p>
   <p>Hourly counts are kept for {report.retentionDays} days and then deleted. Definitions for every category are published with the counts at <Link href="/api/readership">/api/readership</Link>, and the classifier, the address snapshot and the retention rule are in the source of this site.</p>
   <details className="readership-definitions"><summary className="record-voice">EVERY CATEGORY, DEFINED</summary>
    <dl>{Object.entries(DEFINITIONS).map(([key, definition]) => <div key={key}><dt className="record-voice">{key.replace(/_/g, " ").toUpperCase()}</dt><dd>{definition}</dd></div>)}</dl>
   </details>
  </section>
 </main>;
}
