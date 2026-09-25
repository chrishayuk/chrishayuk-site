import { EditorialPlate } from '@chrishayuk/hause/components/EditorialPlate';
import data from '@/public/data/ecology/recovery/evidence.json';

const ink = '#e7e4da';
const dim = '#aaa99e';
const change = '#dbab78';
const stable = '#a9c6bd';
const example = data.example;
const comparison = data.panels.find(panel => panel.id === 'I12R')!;
const type = { fontFamily: 'var(--font-system), sans-serif' };

/** Direct drawings of published data; geometry encodes values, never invented apparatus. */
export function RecoveryExperimentPlate({ kind = 'damage' }: { kind?: 'damage' | 'write' | 'worlds' }) {
 const labels = {
  damage: `One damaged record / block ${example.block}`,
  write: `One recorded failure / block ${example.block} · G${example.generation}`,
  worlds: 'I12R / all twelve paired worlds',
 };
 const descriptions = {
  damage: `The damaged record is [${example.damaged.join(', ')}]. The independent diagnostics identify [${example.proposed.join(', ')}] as correct. Only the second entry differs. Each vertical scale runs from zero to sixteen.`,
  write: `Recorded sequence: damaged [${example.damaged.join(', ')}], proposed [${example.proposed.join(', ')}], written [${example.committed.join(', ')}]. All four values in Qwen’s write differ from the correct proposal.`,
  worlds: `Prose recovered in zero of twelve worlds. The executable recovered in seven: blocks ${comparison.arms[1].flags.flatMap((flag,i)=>flag ? [i] : []).join(', ')}. Four rejected packages remain in each denominator.`,
 };
 return <EditorialPlate className="recovery-experiment-plate" caption={<><span>{labels[kind]}</span><span className="recovery-plate-pan">Scroll across to inspect →</span><a href={kind === 'worlds' ? '/data/ecology/recovery/i12r-results.md' : '/data/ecology/recovery/evidence.json'}>Recorded data / source ↗</a></>}>
  <svg viewBox={kind === 'write' ? '0 0 900 700' : '0 0 900 560'} role="img" aria-label={descriptions[kind]} style={type}>
   <rect width="900" height={kind === 'write' ? 700 : 560} fill="#171d1c"/>
   {kind === 'damage' ? <>
    <text x="48" y="48" fill={dim} fontSize="16">Four entries. One was changed.</text>
    <text x="48" y="83" fill={ink} fontSize="21">Damage arrived after the builder had gone.</text>
    {example.damaged.map((value, index) => {
     const x = 220 + index * 170, y = (v: number) => 414 - v * 16;
     const correct = example.proposed[index], changed = value !== correct;
     return <g key={index}>
      <text x={x} y="139" textAnchor="middle" fill={dim} fontSize="15">Entry {index + 1}</text>
      <line x1={x} x2={x} y1={y(16)} y2={y(0)} stroke="#e7e4da28"/>
      {Array.from({length:17},(_,tick)=><line key={tick} x1={x-5} x2={x+5} y1={y(tick)} y2={y(tick)} stroke="#e7e4da45"/>)}
      {changed && <><line x1={x} x2={x} y1={y(correct)} y2={y(value)} stroke={change} strokeWidth="2"/><circle cx={x} cy={y(correct)} r="11" fill="#171d1c" stroke={stable} strokeWidth="2"/><text x={x+22} y={y(correct)+6} fill={stable} fontSize="20">{correct}</text></>}
      <circle cx={x} cy={y(value)} r="7" fill={changed ? change : ink}/>
      <text x={x+22} y={y(value)+6} fill={changed ? change : ink} fontSize="20">{value}</text>
     </g>;
    })}
    <text x="130" y="164" textAnchor="end" fill={dim} fontSize="14">16</text><text x="130" y="420" textAnchor="end" fill={dim} fontSize="14">0</text>
    <circle cx="58" cy="486" r="6" fill={ink}/><text x="78" y="492" fill={dim} fontSize="15">Stored value</text>
    <circle cx="300" cy="486" r="9" fill="none" stroke={stable} strokeWidth="2"/><text x="320" y="492" fill={dim} fontSize="15">Diagnostic solution</text>
    <text x="48" y="530" fill={dim} fontSize="14">The diagnostics stayed unchanged. The agent had no backup of the correct record.</text>
   </> : kind === 'write' ? <>
    <text x="48" y="48" fill={dim} fontSize="16">A correct proposal. An incorrect write.</text>
    {['Damaged record','Tool proposal','Qwen’s write'].map((label,i)=><text key={label} x={260+i*250} y="104" fill={ink} fontSize="18" textAnchor="middle">{label}</text>)}
    {example.damaged.map((_, entry) => {
     const top=144+entry*121;
     const values=[example.damaged[entry],example.proposed[entry],example.committed[entry]];
     const y=(value:number)=>top+66-value*3;
     return <g key={entry}>
      <text x="48" y={top+36} fill={dim} fontSize="16">Entry {entry+1}</text>
      {[0,16].map(tick=><g key={tick}><text x="194" y={y(tick)+5} fill={dim} fontSize="12" textAnchor="end">{tick}</text><line x1="220" x2="800" y1={y(tick)} y2={y(tick)} stroke="#e7e4da16"/></g>)}
      <path d={values.map((value,i)=>`${i ? 'L' : 'M'} ${260+i*250} ${y(value)}`).join(' ')} fill="none" stroke={dim} strokeWidth="1.5"/>
      {values.map((value,i)=><g key={i}><circle cx={260+i*250} cy={y(value)} r="6" fill={i===2 ? change : i===1 ? stable : ink}/><text x={260+i*250} y={y(value)-15} textAnchor="middle" fill={i===2 ? change : ink} fontSize="22">{value}</text></g>)}
     </g>;
    })}
    <text x="48" y="665" fill={dim} fontSize="14">Each row tracks one entry (0–16). Lines join recorded states, not intermediate actions.</text>
   </> : <>
    <text x="48" y="48" fill={dim} fontSize="16">Same starting state. Same damage.</text>
    <text x="48" y="86" fill={ink} fontSize="21">Recovered record and fresh task, at the same assessment.</text>
    <text x="48" y="150" fill={dim} fontSize="14">Block</text>
    {Array.from({length:12},(_,i)=><text key={i} x={260+i*48} y="150" textAnchor="middle" fill={dim} fontSize="14">{i}</text>)}
    {comparison.arms.map((arm,row)=><g key={arm.id}>
     <text x="48" y={226+row*123} fill={ink} fontSize="17">{arm.id==='B' ? 'Prose' : 'Executable'}</text>
     {arm.flags.map((flag,block)=><g key={block}><circle cx={260+block*48} cy={220+row*123} r="12" fill={flag ? stable : 'none'} stroke={flag ? stable : '#aaa99e70'} strokeWidth="1.5"/>{!flag && <line x1={255+block*48} x2={265+block*48} y1={220+row*123} y2={220+row*123} stroke={dim}/>}</g>)}
     <text x="48" y={258+row*123} fill={dim} fontSize="16">{arm.successes} / {arm.denominator}</text>
    </g>)}
    <circle cx="58" cy="458" r="9" fill={stable}/><text x="78" y="464" fill={dim} fontSize="15">Joint recovery</text>
    <circle cx="315" cy="458" r="9" fill="none" stroke={dim}/><line x1="310" x2="320" y1="458" y2="458" stroke={dim}/><text x="336" y="464" fill={dim} fontSize="15">No joint recovery</text>
    <text x="48" y="518" fill={dim} fontSize="14">All twelve pairs are shown, including the four rejected builder packages.</text>
   </>}
  </svg>
 </EditorialPlate>;
}
