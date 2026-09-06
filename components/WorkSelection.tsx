import Link from "next/link";
import { mapThread } from "@/lib/threads";
import { getRecord, recordPath } from "@/lib/records";

const selections = [
  { id: "W-LARQL", description: "Querying learned systems.", href: "https://github.com/chrishayuk/larql", label: "THE SOFTWARE" },
  { id: "W-VINDEX3", description: "The model is the database.", href: "https://vindex3.org/", label: "VINDEX3.ORG" },
  { id: "W-MCP", description: "An interface to tools and agents.", href: "https://github.com/IBM/mcp-cli", label: "THE SOFTWARE" },
];

export function WorkVisual({ id }: { id: string }) {
  if (id === "W-LARQL") return <img src="/media/notebook/stills/8Ppw8254nLI-1306.webp" alt="LARQL’s knowledge-writing demonstration queries the capital of Atlantis." width={1600} height={900} loading="lazy"/>;
  return <svg viewBox="0 0 800 450" role="img" aria-label={id === "W-VINDEX3" ? "Conceptual study: a model representation with addressable parts and relationships." : "Conceptual study: MCP-CLI connects to an MCP server to discover tools, call a tool and receive its result."}>
    <rect width="800" height="450" fill={id === "W-VINDEX3" ? "#151815" : "#e4e0d7"}/>
    {id === "W-VINDEX3" ? <g fill="none" stroke="#c9c5b9">
      {[0,1,2,3,4].map(i=><g key={i} transform={`translate(${190+i*30} ${64+i*38})`}><path d="M0 0H310L380 50H70Z M0 0V36L70 86H380V50 M70 50V86"/><path d="M70 50H380 M148 0L218 50 M225 0L295 50" opacity=".35"/></g>)}
      <path d="M430 214H655V330" stroke="#ca8a45" strokeWidth="3"/><circle cx="430" cy="214" r="6" fill="#ca8a45"/>
      <g fill="#c9c5b9" stroke="none" fontFamily="monospace" fontSize="14"><text x="45" y="45">REPRESENTATION / RELATION / ADDRESS</text><text x="535" y="362">A PART YOU CAN REACH</text></g>
    </g> : <g fill="#20221f" fontFamily="monospace" fontSize="20">
      <text x="60" y="92">MCP-CLI</text><text x="565" y="92">MCP SERVER</text>
      <g stroke="#7e8278" strokeWidth="1.5"><path d="M110 120V375 M640 120V375"/><path d="M110 170H640L628 164 M110 250H640L628 244 M640 330H110L122 324"/></g>
      <text x="220" y="157">01 / DISCOVER TOOLS</text><text x="220" y="237">02 / CALL A TOOL</text><text x="220" y="317">03 / READ THE RESULT</text>
      <circle cx="640" cy="250" r="6" fill="#b5651d"/>
    </g>}
  </svg>;
}

export function WorkSelection() {
  return <section id="selected-work" className="home-selected-work" aria-labelledby="selected-work-heading" data-scene="selected-work" data-hause-act="connection">
    <div className="home-collection-heading"><div><p className="kicker record-voice">FROM THE HOUSE</p><h2 id="selected-work-heading">Selected work.</h2></div><Link href="/work" className="text-link">ALL WORK ↗</Link></div>
    <div className="home-work-sequence">{selections.map((selection, i) => {
      const record = getRecord(selection.id)!;
      return <article key={record.id}>
        <Link className="home-work-visual" href={recordPath(record)} aria-label={`Explore ${record.title}`}><WorkVisual id={record.id}/><span className="record-voice">{i === 0 ? "FROM THE FILM / LARQL" : "CONCEPTUAL STUDY"} ↗</span></Link>
        <div className="home-work-copy"><p className="record-voice">{record.id} / A SYSTEM BY CHRIS HAY</p><h3><Link href={recordPath(record)}>{record.title}</Link></h3><p>{selection.description}</p>{record.id === "W-LARQL" && <Link href={mapThread.path} className="work-thread-link">From the map to an addressable system. Follow the thread ↗</Link>}<div className="inline-links"><Link className="text-link" href={recordPath(record)}>THE DOSSIER ↗</Link><a className="text-link" href={selection.href}>{selection.label} ↗</a></div></div>
      </article>;
    })}</div>
  </section>;
}
