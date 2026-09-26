import { NotebookNote } from '@chrishayuk/hause/components/NotebookTemplate';

/* Explanatory margin sketches: symbols describe the setup, not observed values. */
function WorldSketch() {
 return <svg viewBox="0 0 180 184" role="img" aria-label="One world holds four codes from zero to sixteen, checked by independent measurements. A fresh agent arrives without private conversation history.">
  <rect className="setup-sketch-boundary" x="5" y="8" width="170" height="108" rx="2"/>
  {[0, 1, 2, 3].map(i => <g key={i}><rect x={17 + i * 38} y="23" width="30" height="29"/><text x={32 + i * 38} y="42" textAnchor="middle">c{i + 1}</text></g>)}
  <text className="setup-sketch-note" x="90" y="69" textAnchor="middle">each 0–16</text>
  <path d="M28 89V58m-4 5 4-5 4 5M152 89V58m-4 5 4-5 4 5"/>
  <text x="90" y="96" textAnchor="middle">measurements</text>
  <path d="M90 143v-23m-4 5 4-5 4 5"/>
  <text x="90" y="158" textAnchor="middle">fresh agent</text>
  <text className="setup-sketch-note" x="90" y="176" textAnchor="middle">no private history</text>
 </svg>;
}

function InheritanceSketch() {
 return <svg viewBox="0 0 180 160" role="img" aria-label="Written instructions or an executable program are inherited. In either group, the successor agent must write the replacement record.">
  <path d="M18 12h33l12 12v45H18ZM51 12v12h12M27 33h26M27 42h23M27 51h26M27 60h16"/>
  <path d="M123 19c-8 0-8 6-8 13s-3 9-7 9c4 0 7 2 7 9s0 13 8 13M145 19c8 0 8 6 8 13s3 9 7 9c-4 0-7 2-7 9s0 13-8 13"/>
  <text x="41" y="89" textAnchor="middle">prose</text>
  <text x="134" y="89" textAnchor="middle">program</text>
  <path d="M41 100v15h93v-15M88 115v18m-4-5 4 5 4-5"/>
  <text className="setup-sketch-accent" x="88" y="151" textAnchor="middle">agent writes</text>
 </svg>;
}

function RecoverySketch() {
 return <svg viewBox="0 0 180 158" role="img" aria-label="Recovery requires the original record and all four new-task answers to be correct at the same assessment.">
  <text x="12" y="15">original record</text>
  {[0, 1, 2, 3].map(i => <rect key={i} x={12 + i * 28} y="25" width="22" height="20"/>)}
  <path className="setup-sketch-check" d="m137 34 6 6 13-16"/>
  <text className="setup-sketch-note" x="65" y="65" textAnchor="middle">+ both</text>
  <text x="12" y="84">fresh task</text>
  {[0, 1, 2, 3].map(i => <rect key={i} x={12 + i * 28} y="94" width="22" height="20"/>)}
  <path className="setup-sketch-check" d="m137 103 6 6 13-16"/>
  <path d="M12 126c42 3 96 3 144-1"/>
  <text className="setup-sketch-accent" x="85" y="149" textAnchor="middle">same assessment</text>
 </svg>;
}

const notes = [
 { title: 'What a “world” is', text: 'A separate calibration task: four stored codes, each from 0 to 16, and independent measurements that can check them. Each new agent starts without its predecessor’s private conversation.', caption: '01 / One world', Sketch: WorldSketch },
 { title: 'What changes between the two groups', text: 'One inherits written repair instructions. The other inherits a program that calculates and checks a proposed repair. In both, the agent must write the replacement itself.', caption: '02 / Two inheritances', Sketch: InheritanceSketch },
 { title: 'What counts as recovery', text: 'Restore the original record and answer a new four-code task correctly at the same assessment. The repair machinery itself stays protected.', caption: '03 / Joint recovery', Sketch: RecoverySketch },
];

export function RecoverySetupNotes() {
 return <div className="recovery-setup">{notes.map(({ title, text, caption, Sketch }) => <NotebookNote key={title} title={title} sketch={<Sketch/>} caption={caption}><p>{text}</p></NotebookNote>)}</div>;
}
