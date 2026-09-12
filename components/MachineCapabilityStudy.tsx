"use client";

import { useState } from "react";
import evidence from "@/public/data/machines/web-capability-1a-evidence.json";

const routes = [
 { id:"GET-LINK", label:"Link", verb:"Follow an address", request:"GET /capability/result", reply:"The server returns the number.", local:false },
 { id:"GET-QUERY", label:"Query", verb:"Ask for a named value", request:"GET /capability/query?key=K17", reply:"The query tells the server which value to return.", local:false },
 { id:"POST-FORM", label:"Form", verb:"Submit the field", request:"POST /capability/query · key=K17", reply:"The agent reproduces the form submission in curl.", local:false },
 { id:"SSE", label:"Stream", verb:"Listen for an event", request:"GET /capability/stream", reply:"The server sends one result event, then closes the stream.", local:false },
 { id:"WEBSOCKET", label:"Socket", verb:"Open a two-way connection", request:'Send {"key":"K17"}', reply:"A client sends the key and reads the reply on the same connection.", local:false },
 { id:"WASM", label:"Module", verb:"Download a small program", request:"GET /capability/k17.wasm", reply:"The site sends a program. The agent runs its k17() function locally to obtain the number.", local:true },
] as const;

export function MachineCapabilityStudy() {
 const [selected, setSelected] = useState(0);
 const route = routes[selected], subject = evidence.subjects.find(subject => subject.condition === route.id)!;
 return <figure className="wc-explorer">
  <figcaption className="record-voice">SAME TASK / CHANGE HOW THE ANSWER IS OBTAINED</figcaption>
  <div className="wc-route-controls" role="group" aria-label="Explore the six web mechanisms">{routes.map((route, index) => <button type="button" key={route.id} aria-pressed={index === selected} aria-controls="capability-route-view" onClick={() => setSelected(index)}><span>0{index+1}</span>{route.label}</button>)}</div>
  <div id="capability-route-view" aria-live="polite" aria-atomic="true">
   <div className="wc-route-title"><span className="record-voice">{route.id}</span><h3>{route.verb}.</h3></div>
   <div className="wc-route-world" data-local={route.local}>
    <div className="wc-actor"><span className="record-voice">AGENT + ITS TOOLS</span><div className="wc-agent-symbol" aria-hidden="true"><i/><i/><i/></div><strong>Find K17.</strong></div>
    <div className="wc-transfer"><span className="record-voice">{route.local ? "DOWNLOAD →" : "REQUEST →"}</span><code>{route.request}</code><div className="wc-wire" aria-hidden="true"/><span className="record-voice">← {route.local ? "PROGRAM BYTES" : "RESULT"}</span></div>
    <div className="wc-actor wc-website"><span className="record-voice">LLM WILDS</span><div className="wc-site-symbol" aria-hidden="true"><i/><i/><i/></div><strong>{route.local ? "k17.wasm" : `K17 = ${subject.deployed}`}</strong></div>
   </div>
   <div className="wc-route-answer"><div><span className="record-voice">{route.local ? "EXECUTE LOCALLY → REPORT" : "READ THE RESPONSE → REPORT"}</span><strong>{subject.reported}<small>the exact answer</small></strong></div><p>{route.reply}</p></div>
  </div>
  <p className="mv-caption">A replay of recorded routes, not a live request. Showing visitor {String(subject.subject).padStart(2,"0")}; each deployment had a different answer. Each agent encountered only one mechanism.</p>
 </figure>;
}

export function CapabilityCacheReplay() {
 const [direct, setDirect] = useState(false);
 return <figure className="wc-cache">
  <figcaption className="record-voice">SUBJECT 17 / SWITCH THE CHANNEL IT READ THROUGH</figcaption>
  <div className="wc-cache-controls" role="group" aria-label="Compare the recorded fetch channels"><button type="button" aria-pressed={!direct} onClick={() => setDirect(false)} aria-controls="capability-cache-view">Through WebFetch</button><button type="button" aria-pressed={direct} onClick={() => setDirect(true)} aria-controls="capability-cache-view">Directly with curl</button></div>
  <div id="capability-cache-view" aria-live="polite" aria-atomic="true" className="wc-cache-replay" data-direct={direct}>
   <div><span className="record-voice">THE SITE NOW</span><strong>Socket</strong><span className="wc-contract">/capability/socket</span></div>
   <div className="wc-channel"><span className="record-voice">{direct ? "LIVE RESPONSE" : "OLD CACHED RESPONSE"}</span><span className="wc-channel-line" aria-hidden="true">{direct ? "→" : "↳"}</span><small>{direct ? "The request reaches the site." : "The current notes are not fetched."}</small></div>
   <div><span className="record-voice">THE AGENT RECEIVES</span><strong>{direct ? "Socket" : "GET link"}</strong><span className="wc-contract">{direct ? "/capability/socket" : "/capability/result"}</span></div>
  </div>
  <p className="wc-cache-outcome">{direct ? "It builds a socket client and gets 264. The task succeeds." : "It tries the stale route, gets a 404 and infers that the site changes mechanisms."}</p>
  <p className="mv-caption">The stale instructions came from visitor 15, eight minutes earlier. This comparison replays the recorded incident; it does not fetch either page.</p>
 </figure>;
}
