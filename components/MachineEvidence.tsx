"use client";

import { useState, type CSSProperties } from "react";
import { contactHour, type ContactExhibit, type ContactCell } from "@/lib/readership/exhibit";

export const EVIDENCE = {
 verified: { label: "Verified network", meaning: "The address matched the provider’s published agent ranges. This verifies a network claim, not a model or a person." },
 declared: { label: "Claimed", meaning: "A recognised name in the request header, without a provider network match this site can establish." },
 inferred: { label: "Interpreted", meaning: "The classifier inferred automation from the request. No provider identity has been established." },
 none: { label: "Unknown", meaning: "No identity evidence was retained for this request." },
} as const;

export function EvidenceMark({ confidence }: { confidence: string }) {
 return <span aria-hidden="true" className={`me-mark me-mark--${confidence in EVIDENCE ? confidence : "none"}`}/>;
}

export function EvidenceLegend() {
 return <div className="me-legend" aria-label="Evidence forms">{Object.entries(EVIDENCE).map(([key, value]) => <details key={key}><summary title={value.meaning}><EvidenceMark confidence={key}/>{value.label}</summary><p>{value.meaning}</p></details>)}</div>;
}

const purpose = (value: string) => ({ ai_user: "User-initiated retrieval", ai_search: "AI indexing", ai_training: "Training collection", search_bot: "Search indexing", feed_reader: "Feed polling", link_preview: "Link preview", automation: "Automation" }[value] ?? value);

export function ContactField({ exhibit }: { exhibit: ContactExhibit }) {
 const [selected, select] = useState<ContactCell[] | null>(null);
 const lanes = [...new Map(exhibit.cells.map(cell => [JSON.stringify([cell.agent, cell.provider, cell.confidence]), { agent: cell.agent, provider: cell.provider, confidence: cell.confidence }])).values()].sort((a, b) => a.agent.localeCompare(b.agent) || a.confidence.localeCompare(b.confidence));
 const hours = Array.from({ length: exhibit.to - exhibit.from }, (_, i) => exhibit.from + i);
 const hourly = new Map<string, ContactCell[]>();
 for (const cell of exhibit.cells) {
  const key = JSON.stringify([cell.hour, cell.agent, cell.provider, cell.confidence]);
  const group = hourly.get(key) ?? []; group.push(cell); hourly.set(key, group);
 }
 return <>
  <div className="me-scroll" tabIndex={0} role="region" aria-label="Hourly machine contact field; scroll horizontally on a narrow screen">
   <div className="me-timeline" style={{ "--hours": hours.length } as CSSProperties}>
    <div className="me-time-axis"><span>UTC / HOUR</span><div>{hours.filter((_, i) => i % 8 === 0).map(hour => <span key={hour} style={{ left: `${(hour - exhibit.from) / hours.length * 100}%` }}>{contactHour(hour).slice(5, 16)}</span>)}</div></div>
    {lanes.map(lane => <div className="me-lane" key={`${lane.agent}/${lane.provider}/${lane.confidence}`}>
     <div className="me-lane-name"><span>{lane.agent}</span><small>{lane.provider} · {EVIDENCE[lane.confidence as keyof typeof EVIDENCE]?.label ?? "Unknown"}</small></div>
     <div className="me-hour-grid">{hours.map(hour => {
      const cells = hourly.get(JSON.stringify([hour, lane.agent, lane.provider, lane.confidence])) ?? [];
      return <div className="me-hour" key={hour}>{cells.length > 0 && <button type="button" aria-pressed={selected === cells || !!selected && selected[0].hour === hour && selected[0].agent === lane.agent && selected[0].provider === lane.provider && selected[0].confidence === lane.confidence} aria-label={`${lane.agent}, ${lane.confidence}, ${contactHour(hour)}, ${cells.reduce((n, cell) => n + cell.n, 0)} requests across ${new Set(cells.map(cell => cell.path)).size} paths. Inspect evidence.`} title={`${contactHour(hour)} · ${cells.reduce((n, cell) => n + cell.n, 0)} requests`} onClick={() => select(cells)}><EvidenceMark confidence={lane.confidence}/></button>}</div>;
     })}</div>
    </div>)}
    {lanes.length === 0 && <p className="me-empty">No retained machine contact with a published path in these hours.</p>}
   </div>
  </div>
  <div className="me-inspector" aria-live="polite">
   {selected ? <><p className="record-voice">{selected[0].agent} · {contactHour(selected[0].hour)}</p><p>{EVIDENCE[selected[0].confidence as keyof typeof EVIDENCE]?.meaning ?? EVIDENCE.none.meaning}</p><ul>{selected.map((cell, i) => <li key={i}><code>{cell.path}</code><span>{purpose(cell.purpose)} · {cell.n} request{cell.n === 1 ? "" : "s"}</span></li>)}</ul><p className="me-caption">Aggregates within one hour. Order, visitor identity, served revision and operator origin were not retained.</p></> : <p>Select a mark to open its evidence. One mark is an agent category in an hour; it may combine several requests and visitors.</p>}
  </div>
  {exhibit.totalCells > exhibit.cells.length && <p className="me-caption">Showing the latest {exhibit.cells.length} of {exhibit.totalCells} hourly path cells. The contact map below uses the full retained window.</p>}
 </>;
}

export function ContactMap({ exhibit }: { exhibit: ContactExhibit }) {
 const [selection, select] = useState<{ path: string; agent: string; provider: string } | null>(null);
 const [expanded, expand] = useState(false);
 const agents = [...new Map(exhibit.contacts.map(cell => [JSON.stringify([cell.agent, cell.provider]), { agent: cell.agent, provider: cell.provider }])).values()].sort((a, b) => a.agent.localeCompare(b.agent));
 const paths = [...new Set(exhibit.contacts.map(cell => cell.path))];
 const shown = expanded ? paths : paths.slice(0, 12);
 const byContact = new Map<string, ContactExhibit["contacts"]>();
 for (const cell of exhibit.contacts) {
  const key = JSON.stringify([cell.path, cell.agent, cell.provider]);
  const group = byContact.get(key) ?? []; group.push(cell); byContact.set(key, group);
 }
 const selected = selection ? exhibit.contacts.filter(cell => cell.path === selection.path && cell.agent === selection.agent && cell.provider === selection.provider) : [];
 return <>
  {paths.length ? <><div className="me-scroll" tabIndex={0} role="region" aria-label="Content contact map"><table className="me-contact-table"><caption className="me-sr-only">Published paths by machine product. Blank cells mean no retained contact.</caption><thead><tr><th scope="col">Part of the house</th>{agents.map(agent => <th scope="col" key={`${agent.provider}/${agent.agent}`}>{agent.agent}<small>{agent.provider}</small></th>)}</tr></thead><tbody>{shown.map(path => <tr key={path}><th scope="row"><code>{path}</code></th>{agents.map(agent => {
   const cells = byContact.get(JSON.stringify([path, agent.agent, agent.provider])) ?? [];
   return <td key={`${agent.provider}/${agent.agent}`}>{cells.length ? <button type="button" onClick={() => select({ path, ...agent })} aria-label={`${path}, ${agent.agent}, ${cells.reduce((n, cell) => n + cell.n, 0)} requests. Inspect evidence.`} aria-pressed={selection?.path === path && selection?.agent === agent.agent && selection?.provider === agent.provider}>{cells.map(cell => <EvidenceMark key={cell.confidence} confidence={cell.confidence}/>)}</button> : <span className="me-absence" aria-label="No retained contact">·</span>}</td>;
  })}</tr>)}</tbody></table></div>{paths.length > 12 && <button className="me-control" type="button" onClick={() => expand(!expanded)}>{expanded ? "Show fewer paths" : `Show all ${paths.length} paths`}</button>}</> : <p className="me-empty">No public content contact retained in this window.</p>}
  <div className="me-inspector" aria-live="polite">{selection ? <><p className="record-voice">{selection.agent} / {selection.path}</p><ul>{selected.map(cell => <li key={cell.confidence}><span><EvidenceMark confidence={cell.confidence}/> {EVIDENCE[cell.confidence as keyof typeof EVIDENCE]?.label ?? "Unknown"}</span><span>{cell.n} requests</span></li>)}</ul></> : <p>Select a contact to inspect it. Different evidence forms can coexist in one cell. A blank means no retained contact, not a decision to stay away.</p>}</div>
 </>;
}

export function EvidencePipeline({ sample }: { sample?: ContactCell }) {
 return <div className="me-pipeline">
  <div className="me-request"><span className="record-voice">REQUEST → OBSERVED</span><h3>{sample?.agent ?? "A request arrives"}</h3><p>{sample ? `${sample.n} request${sample.n === 1 ? "" : "s"} · ${contactHour(sample.hour)}` : "No public request cell is available on this deployment."}</p>{sample && <code>{sample.path}</code>}</div>
  <div className="me-branches">
   <details className="me-evidence me-claimed" open><summary><EvidenceMark confidence="declared"/>Claimed</summary><p>{sample ? ["verified", "declared"].includes(sample.confidence) ? `${sample.agent} / ${sample.provider}` : "No explicit provider claim" : "A client may name a product in its header."}</p><small>A recognised header name is a claim. It is separate from an optional guestbook declaration.</small></details>
   <details className={`me-evidence me-${sample?.confidence === "verified" ? "verified" : "unknown"}`} open><summary><EvidenceMark confidence={sample?.confidence === "verified" ? "verified" : "none"}/>Verification</summary><p>{sample?.confidence === "verified" ? "Provider network matched" : sample?.confidence === "declared" ? "Claim remains unchecked" : "No verified provider claim"}</p><small>A published address range can establish a network origin. It cannot attest a model name.</small></details>
   <details className="me-evidence me-interpreted" open><summary><EvidenceMark confidence="inferred"/>Interpreted</summary><p>{sample ? purpose(sample.purpose) : "Purpose assigned by the classifier"}</p><small>Inferred from the product’s function. A request does not establish that content was read, used or understood.</small></details>
  </div>
  <p className="me-caption">{sample ? "A live hourly aggregate from the public readership report. These branches are different kinds of evidence, not successive levels of certainty." : "The instrument’s structure is shown without a fabricated visitor."}</p>
 </div>;
}

export function DeclarationComposition({ axes, version }: { axes: { key: string; label: string; values: readonly string[]; initial: string }[]; version: number }) {
 const [values, setValues] = useState<Record<string, string>>(Object.fromEntries(axes.map(axis => [axis.key, axis.initial])));
 return <div className="me-composition"><p className="record-voice">DECLARATION / {version} · CONSTRUCTED EXAMPLE</p><div className="me-axes">{axes.map(axis => <label key={axis.key}><span>{axis.label}</span><select value={values[axis.key]} onChange={event => setValues({ ...values, [axis.key]: event.target.value })}>{axis.values.map(value => <option key={value} value={value}>{value.replaceAll("_", " ")}</option>)}</select></label>)}</div><div className="me-composed" aria-live="polite">{axes.map(axis => <span key={axis.key}><small>{axis.label}</small>{values[axis.key].replaceAll("_", " ")}</span>)}</div><p className="me-caption">Try composing the axes. This example stays in your browser; it sends no declaration. Every value remains a claim, including a statement that the answer is not visible.</p></div>;
}
