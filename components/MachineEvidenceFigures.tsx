import { VISITS } from "@/lib/machine/visits";
import { reciprocityCells } from "@/lib/machine/reciprocity";
import authority from "@/public/data/machines/authority-2-evidence.json";

export function MachineRevisionSequence() {
  return <figure className="machine-revisions"><figcaption className="record-voice">FOUR VISITORS / THE SITE CHANGED BETWEEN THEM</figcaption><ol>{VISITS.map((visit,i)=><li key={visit.run}><span className="record-voice">VISIT 0{visit.run} / {visit.revision}</span><div className="machine-revision-mark" aria-hidden="true"><i/>{i<3&&<span>→</span>}</div><strong>{["Found a way in","Exposed a loss","Feedback survived","Words composed"][i]}</strong><p>{["The first visitor guessed the machine index.","Two reports were acknowledged but not retained.","The revised store kept both reports.","The visitor described itself, then found dropped fields."][i]}</p></li>)}</ol><p className="mv-caption">Each circle is a new visitor; each revision is a different site. The arrows show iteration, not independent replication of a fixed treatment. <a href="/data/machines/machine-visit-protocol.md">Run ledger ↗</a></p></figure>;
}

export function MachinePermissionContrast() {
  const original=reciprocityCells.filter(cell=>cell.phase==="factorial"&&cell.reached);
  const controls=reciprocityCells.filter(cell=>cell.phase==="control");
  return <figure className="machine-permission-contrast"><figcaption className="record-voice">SAME SITE INVITATION / A NEW SENTENCE IN THE TASK</figcaption><div>{[{label:"Original sent-here cells",detail:"Reward varied. No added task permission.",cells:original},{label:"Later permission controls",detail:"Task permission added. Two separate controls.",cells:controls}].map(group=><div key={group.label}><h3>{group.label}</h3><p>{group.detail}</p><div className="machine-contrast-subjects">{group.cells.map(cell=><div key={cell.cell}><span className="machine-subject-mark" data-acted={cell.declared===true} aria-hidden="true"/><strong>{cell.declared?"Declared":"No declaration"}</strong><small>Cell {cell.cell} / {cell.reward}</small></div>)}</div></div>)}</div><p className="mv-caption">One circle per visitor that arrived. The three incidental non-arrivals have no declaration outcome and are absent from this comparison. The original cells and later controls remain different parts of the design. <a href="/data/machines/reciprocity.json">Eight coded outcomes ↗</a></p></figure>;
}

export function MachineRepeatedRecords() {
  const cell=authority.cells.find(cell=>cell.id==="B1")!;
  return <figure className="machine-record-units"><figcaption className="record-voice">B1 / ONE SUBJECT, MANY ACTIONS</figcaption><div><div className="machine-unit-subject"><span className="machine-subject-mark" data-acted="true" aria-hidden="true"/><strong>1</strong><span>visitor testing the mechanism</span></div><span className="machine-unit-arrow" aria-hidden="true">→</span><div><div className="machine-record-grid" aria-hidden="true">{Array.from({length:cell.recordCount},(_,i)=><i key={i}/>)}</div><p><strong>{cell.recordCount}</strong> stored records from that visitor</p></div></div><p className="mv-caption">One square per new record. These repeated actions measure intensity within B1; they do not supply {cell.recordCount} independent visitors. The server’s {cell.recordsAfter} rows also include A3’s earlier record.</p></figure>;
}
