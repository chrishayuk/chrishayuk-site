import "@/app/machine-capability.css";
export const capabilityRoutes = [
 { id: "GET-LINK", label: "A link", mechanism: "GET", construction: false },
 { id: "GET-QUERY", label: "A query", mechanism: "GET + PARAMETERS", construction: false },
 { id: "POST-FORM", label: "A form", mechanism: "POST", construction: false },
 { id: "SSE", label: "A stream", mechanism: "SERVER-SENT EVENTS", construction: false },
 { id: "WEBSOCKET", label: "A socket", mechanism: "WEBSOCKET", construction: true },
 { id: "WASM", label: "A module", mechanism: "WEBASSEMBLY", construction: true },
];
export function MachineCapabilityCard() {
 return <div className="mv-card wc-card"><span className="record-voice">WEB CAPABILITY / EIGHTEEN VISITORS</span><div className="wc-card-grid">{capabilityRoutes.map(route => <div key={route.id} data-construction={route.construction}><span>{route.label}</span><span aria-hidden="true">● ● ●</span><small>3 / 3</small></div>)}</div><p>The tool was not<br/><em>the problem.</em></p><span className="record-voice">SIX MECHANISMS · ONE UNEXPECTEDLY FLAT RESULT ↗</span></div>;
}
