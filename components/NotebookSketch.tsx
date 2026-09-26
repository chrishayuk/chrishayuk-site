import type { ReactNode } from 'react';

/** Conceptual marginal drawings, never charts or invented experimental outcomes. */
export function NotebookSketch({ id, collection }: { id: string; collection: string }) {
 let drawing: ReactNode;
 let caption: string;
 if (id === 'N-MACHINE-RECOGNITION') {
  caption = 'Description / interpretation';
  drawing = <><path d="M30 54h40v52H30zM39 67h22M39 76h15M39 85h19M72 79h23M95 79l14-24M95 79l14 24"/><circle cx="126" cy="43" r="17"/><path d="m117 43 6 6 12-13M111 104h30v25h-30zM120 104v-8h12v8"/><text x="126" y="78">read</text><text x="126" y="147">use</text></>;
 } else if (id === 'N-MACHINE-DISCOVERY') {
  caption = 'Search / visibility';
  drawing = <><circle cx="48" cy="70" r="22"/><path d="m65 86 18 18M34 63h28M34 72h18M35 81h12"/><path className="notebook-sketch-dashed" d="M91 71h44M113 43v57"/><path d="M139 51h30v40h-30zM146 63h16M146 72h12"/><text x="48" y="130">search</text><text x="149" y="130">site</text></>;
 } else if (['N-MACHINE-PEER','N-MACHINE-TASK','N-MACHINE-PERMISSION','N-AUTHORITY'].includes(id)) {
  caption = 'Request / authority';
  drawing = <><path d="M22 41h32v28H22zM22 100h32v28H22zM56 55h38M56 114h38M94 55v59M94 84h20M134 60v48M125 63l9-7 9 7M137 84h24"/><circle cx="170" cy="84" r="9"/><text x="38" y="30">source</text><text x="134" y="138">permission?</text></>;
 } else if (collection === 'machines') {
  caption = id === 'N-MACHINE-SELF-READ' ? 'Subject / record' : 'Task / invitation';
  drawing = <><circle cx="43" cy="79" r="18"/><path d="M43 60v-9M25 79h-9M61 79h35M94 49v62M96 79h33M132 55h33v48h-33zM140 68h17M140 77h12M140 86h17"/><path className="notebook-sketch-dashed" d="M148 109v24H43v-30"/><text x="43" y="39">agent</text><text x="149" y="39">page</text></>;
 } else if (collection === 'agent-ecology') {
  caption = id === 'N-ECOLOGY-RECOVERY' ? 'Record / repair / inheritance' : 'What remains between agents';
  drawing = <><circle cx="30" cy="85" r="12"/><circle cx="166" cy="85" r="12"/><path d="M44 85h26M126 85h26M75 57h45v55H75zM84 72h27M84 82h18M84 92h23"/><path className="notebook-sketch-dashed" d="M31 48V32h135v16"/><text x="98" y="23">time</text><text x="98" y="139">shared record</text></>;
 } else if (collection === 'cell80') {
  caption = 'A lineage / a possible change';
  drawing = <><path d="M30 86h42M72 86l38-34M72 86l38 34M113 52h40M113 120h40"/><circle cx="25" cy="86" r="7"/><circle cx="73" cy="86" r="7"/><circle cx="111" cy="52" r="7"/><circle cx="111" cy="120" r="7"/><circle cx="158" cy="52" r="7"/><path d="m151 120 7-7 7 7-7 7z"/><path className="notebook-sketch-dashed" d="M157 135v15h-43"/><text x="73" y="166">variation</text></>;
 } else if (collection === 'learned-systems') {
  caption = 'State / transformation / reading';
  drawing = <><path d="M24 44h28v80H24zM81 44h28v80H81zM139 44h28v80h-28zM55 84h23M112 84h24M33 62h10M33 82h10M33 102h10M90 62h10M90 82h10M90 102h10M148 62h10M148 82h10M148 102h10"/><path className="notebook-sketch-dashed" d="M38 135v10h115v-10"/><text x="95" y="166">through depth</text></>;
 } else {
  caption = id === 'N-ATTRIBUTION' ? 'Draft / revision / record' : 'An idea made into a form';
  drawing = <><path d="M31 45h45v68H31zM38 57h27M38 68h20M38 79h25M92 78h21M110 73l6 5-6 5M124 57h42v66h-42zM132 69h25M132 80h18M132 91h24"/><path className="notebook-sketch-dashed" d="M54 123v17h91v-9"/><text x="52" y="31">draft</text><text x="145" y="44">form</text></>;
 }
 return <figure className="notebook-cover-sketch"><svg viewBox="0 0 194 184" aria-hidden="true" focusable="false">{drawing}</svg><figcaption>{caption}</figcaption></figure>;
}
