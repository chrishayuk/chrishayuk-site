import type {PublicationRecord} from '@/lib/types';
import {readability} from '@/lib/address-build';
import recoveryEvidence from '@/public/data/ecology/recovery/evidence.json';
import {Cell80SocialEdition} from './Cell80SocialEdition';

type Format='linkedin'|'x'|'og';
const ink='#171815',paper='#f2f0eb',muted='#62635e',rule='#c7c7bf',accent=ink;

function AttributionVisual({portrait}:{portrait:boolean}){
 const rows=[['USER','do not add it'],['AGENT','adds it'],['REPOSITORY','refuses it']];
 return <div style={{display:'flex',flexDirection:'column',width:'100%',gap:portrait?23:12,borderTop:`1px solid ${rule}`,paddingTop:portrait?31:18}}>
  {rows.map(([label,value],i)=><div key={label} style={{display:'flex',alignItems:'baseline',borderBottom:`1px solid ${rule}`,paddingBottom:portrait?17:10,color:i===2?accent:ink}}><span style={{width:portrait?245:270,fontSize:portrait?23:20,letterSpacing:3}}>{label}</span><span style={{fontFamily:'Newsreader',fontSize:portrait?48:34}}>{value}</span></div>)}
  <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginTop:portrait?32:11,fontSize:portrait?22:18}}><span style={{textDecoration:'line-through',textDecorationColor:accent,textDecorationThickness:4}}>Co-authored-by: Claude …</span><span style={{color:accent,letterSpacing:2}}>× REMOVED AT THE BOUNDARY</span></div>
 </div>;
}

function DepthVisual({portrait}:{portrait:boolean}){
 const stages=[8,16,20,24,28] as const;
 return <div style={{display:'flex',flexDirection:'column',width:'100%',gap:portrait?19:10,borderTop:`1px solid ${rule}`,paddingTop:portrait?30:16}}>
  <div style={{display:'flex',justifyContent:'space-between',fontSize:portrait?18:15,letterSpacing:2,color:muted}}><span>RELATION READABILITY</span><span>ENTITY READABILITY</span></div>
  {stages.map(layer=>{const relation=readability(layer,'relation'),entity=readability(layer,'entity');return <div key={layer} style={{display:'flex',alignItems:'center',gap:portrait?20:14}}><span style={{width:62,fontSize:portrait?21:17}}>L{layer}</span><div style={{display:'flex',width:'44%',height:portrait?23:15,background:'#d6d0c4'}}><span style={{display:'flex',width:`${relation*100}%`,height:'100%',background:accent}}/></div><span style={{width:55,fontSize:portrait?18:15}}>{relation.toFixed(2)}</span><div style={{display:'flex',width:'30%',height:portrait?23:15,background:'#d6d0c4'}}><span style={{display:'flex',width:`${entity*100}%`,height:'100%',background:ink}}/></div><span style={{fontSize:portrait?18:15}}>{entity.toFixed(2)}</span></div>})}
  <div style={{display:'flex',justifyContent:'space-between',marginTop:portrait?22:8,fontSize:portrait?22:17,color:accent,letterSpacing:2}}><span>RELATION FIRST.</span><span>ENTITY LATER.</span></div>
 </div>;
}

function AuthorityVisual({portrait}:{portrait:boolean}){
 const rows=[['ORIGINAL PASSAGE','still readable'],['NEWER RECORD','beside the question'],['AUTHORITY GATE','which source can answer?']];
 return <div style={{display:'flex',flexDirection:'column',width:'100%',gap:0,borderTop:`1px solid ${rule}`}}>
  {rows.map(([label,value],i)=><div key={label} style={{display:'flex',alignItems:'center',padding:`${portrait?25:14}px 0`,borderBottom:`1px solid ${rule}`}}><span style={{width:portrait?300:310,fontSize:portrait?19:16,letterSpacing:2,color:i===2?accent:muted}}>{label}</span><span style={{fontFamily:'Newsreader',fontSize:portrait?39:29,color:i===2?accent:ink}}>{value}</span></div>)}
  <div style={{display:'flex',marginTop:portrait?28:14,fontSize:portrait?22:17,letterSpacing:2}}>A NEWER RECORD DOES NOT WIN BY BEING RIGHT.</div>
 </div>;
}

function MapVisual({portrait}:{portrait:boolean}){
 const rows=[['CAPITAL','↗'],['CURRENCY','→'],['LANGUAGE','↘']];
 return <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',width:'100%',borderTop:`1px solid ${rule}`,paddingTop:portrait?42:22}}>
  <div style={{display:'flex',flexDirection:'column',gap:portrait?22:12,width:'44%'}}>{rows.map(([label,arrow])=><div key={label} style={{display:'flex',justifyContent:'space-between',borderBottom:`1px solid ${rule}`,paddingBottom:portrait?14:8,fontSize:portrait?23:17,letterSpacing:2}}><span>{label}</span><span style={{color:accent}}>{arrow}</span></div>)}</div>
  <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',width:portrait?290:250,height:portrait?290:170,border:`2px solid ${accent}`,borderRadius:'50%',fontFamily:'Newsreader',fontSize:portrait?38:28,textAlign:'center',padding:30}}><span>ONE</span><span>PACKED</span><span>STATE</span></div>
 </div>;
}

function StateVisual({portrait}:{portrait:boolean}){
 const cells=[['SOURCE STATE','all positions'],['TRANSPLANT','one boundary'],['NEXT TOKEN','one answer']];
 return <div style={{display:'flex',flexDirection:'column',width:'100%',gap:portrait?28:15,borderTop:`1px solid ${rule}`,paddingTop:portrait?38:20}}><div style={{display:'flex',alignItems:'stretch',width:'100%'}}>{cells.map(([label,value],i)=><div key={label} style={{display:'flex',flexDirection:'column',width:'33.33%',padding:portrait?'24px 20px':'14px 18px',borderLeft:i?`1px solid ${rule}`:'none'}}><span style={{fontSize:portrait?18:15,letterSpacing:2,color:i===1?accent:muted}}>{label}</span><span style={{fontFamily:'Newsreader',fontSize:portrait?38:28,marginTop:portrait?18:9}}>{value}</span></div>)}</div><span style={{fontSize:portrait?22:17,letterSpacing:2,color:accent}}>WHAT CAN BE REBUILT IS DIFFERENT FROM WHAT CAN BE FORGOTTEN.</span></div>;
}

function AddressVisual({portrait}:{portrait:boolean}){
 const cells=[['QUESTION','capital of France'],['ADDRESS','entity × relation'],['READ','Paris']];
 return <div style={{display:'flex',alignItems:'center',width:'100%',borderTop:`1px solid ${rule}`,paddingTop:portrait?45:24}}>{cells.map(([label,value],i)=><div key={label} style={{display:'flex',alignItems:'center',width:'33.33%'}}><div style={{display:'flex',flexDirection:'column',gap:portrait?15:8}}><span style={{fontSize:portrait?18:15,letterSpacing:2,color:i===1?accent:muted}}>{label}</span><span style={{fontFamily:'Newsreader',fontSize:portrait?37:27}}>{value}</span></div>{i<2&&<span style={{display:'flex',marginLeft:'auto',marginRight:portrait?28:18,fontSize:portrait?34:26,color:accent}}>→</span>}</div>)}</div>;
}

function ContextVisual({portrait}:{portrait:boolean}){
 return <div style={{display:'flex',width:'100%',borderTop:`1px solid ${rule}`,paddingTop:portrait?42:22,gap:portrait?42:24}}><div style={{display:'flex',flexDirection:'column',width:'50%',gap:portrait?16:9,opacity:.55}}><span style={{fontSize:portrait?19:16,letterSpacing:2}}>EVERY NEW CALL</span><span style={{fontFamily:'Newsreader',fontSize:portrait?45:32,textDecoration:'line-through',textDecorationColor:accent}}>reconstruct it</span></div><div style={{display:'flex',flexDirection:'column',width:'50%',gap:portrait?16:9,borderLeft:`2px solid ${accent}`,paddingLeft:portrait?42:24}}><span style={{fontSize:portrait?19:16,letterSpacing:2,color:accent}}>RETURN TO STATE</span><span style={{fontFamily:'Newsreader',fontSize:portrait?45:32}}>index what survives</span></div></div>;
}

function OperatorVisual({portrait}:{portrait:boolean}){
 return <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',width:'100%',borderTop:`1px solid ${rule}`,paddingTop:portrait?42:22}}><span style={{fontFamily:'Newsreader',fontSize:portrait?50:36}}>trajectory</span><span style={{fontSize:portrait?74:54,color:accent}}>≠</span><span style={{fontFamily:'Newsreader',fontSize:portrait?50:36}}>computation</span></div>;
}

function ExhibitionVisual({portrait}:{portrait:boolean}){
 const stages=['EXHIBITION','CINEMATIC COMPOSITION','FORMS','SEMANTIC FORMS','AI COMPOSITION'];
 return <div style={{display:'flex',flexDirection:'column',width:'100%',borderTop:`1px solid ${rule}`,paddingTop:portrait?30:17,gap:portrait?16:8}}>{stages.map((stage,i)=><div key={stage} style={{display:'flex',alignItems:'center',gap:portrait?22:14,color:i===stages.length-1?accent:ink}}><span style={{width:portrait?42:32,fontSize:portrait?18:14,color:muted}}>{String(i+1).padStart(2,'0')}</span><span style={{fontFamily:'Newsreader',fontSize:portrait?35:25}}>{stage}</span>{i<stages.length-1&&<span style={{marginLeft:'auto',color:accent}}>↓</span>}</div>)}</div>;
}

/** An edition of the recorded comparison, not an invented illustration. */
function RecoveryEdition({record,format}:{record:PublicationRecord;format:Format}){
 const portrait=format==='linkedin',og=format==='og';
 const panel=recoveryEvidence.panels.find(panel=>panel.id==='I12R')!;
 const arms=panel.arms.filter(arm=>arm.id==='B'||arm.id==='C');
 const scale=og?.75:1;
 return <div style={{display:'flex',flexDirection:'column',width:'100%',height:'100%',padding:portrait?'66px 72px 58px':og?'40px 48px':'58px 64px',background:paper,color:ink,fontFamily:'Archivo'}}>
  <div style={{display:'flex',justifyContent:'space-between',fontSize:22*scale}}><span>Chris Hay</span><span>Notebook / Agent ecology</span></div>
  <div style={{display:'flex',flex:1,flexDirection:portrait?'column':'row',alignItems:portrait?'stretch':'center',justifyContent:portrait?'center':'space-between',gap:portrait?64:60*scale}}>
   <div style={{display:'flex',flexDirection:'column',width:portrait?'100%':'45%',gap:portrait?34:30*scale}}>
    <div style={{display:'flex',flexDirection:'column',fontFamily:'Newsreader',fontSize:portrait?100:86*scale,lineHeight:1.02,letterSpacing:-2*scale}}><span>The repairer left.</span><span>The mechanism</span><span>kept working.</span></div>
    <div style={{display:'flex',fontSize:portrait?28:25*scale,lineHeight:1.4,maxWidth:portrait?700:520*scale}}>Damage arrived after the stronger model had gone.</div>
   </div>
   <div style={{display:'flex',flexDirection:'column',width:portrait?'100%':'49%',gap:portrait?36:36*scale}}>
    <div style={{display:'flex',fontSize:portrait?24:22*scale,color:muted}}>Worlds recovered / I12R</div>
    <div style={{display:'flex',gap:portrait?68:46*scale}}>
     {arms.map(arm=><div key={arm.id} style={{display:'flex',flexDirection:'column',width:'50%'}}>
      <span style={{fontSize:portrait?30:26*scale}}>{arm.id==='B'?'Prose':'Executable'}</span>
      <div style={{display:'flex',alignItems:'flex-end',gap:portrait?14:10*scale,marginTop:portrait?18:22*scale}}><span style={{fontFamily:'Newsreader',fontSize:portrait?238:210*scale,lineHeight:1}}>{arm.successes}</span><span style={{fontSize:portrait?36:30*scale,color:muted,paddingBottom:portrait?36:30*scale}}>/ {arm.denominator}</span></div>
      <div style={{display:'flex',flexWrap:'wrap',gap:portrait?12:10*scale,width:portrait?360:250*scale,marginTop:portrait?20:14*scale}}>{arm.flags.map((flag,i)=><span key={i} style={{display:'flex',width:portrait?46:32*scale,height:portrait?46:32*scale,borderRadius:'50%',border:`${scale*1.5}px solid ${flag?ink:'#a7a8a0'}`,background:flag?ink:'transparent'}}/>)}</div>
     </div>)}
    </div>
    <div style={{display:'flex',fontSize:portrait?22:20*scale,color:muted,lineHeight:1.4,maxWidth:portrait?760:630*scale}}>One mark per world. Recovery required both the original record and a fresh task.</div>
   </div>
  </div>
  <div style={{display:'flex',flexDirection:'column',gap:portrait?28:22*scale,borderTop:`1px solid ${rule}`,paddingTop:portrait?28:24*scale}}>
   <div style={{display:'flex',fontSize:portrait?24:22*scale,lineHeight:1.4,maxWidth:portrait?910:1250*scale}}>Equal starting state. Identical damage. A fixed interface and protected repair machinery.</div>
   <div style={{display:'flex',justifyContent:'space-between',fontSize:portrait?19:18*scale,color:muted}}><span>{record.created} / {record.publication==='draft'?'Working note':'Research note'}</span><span>chrishayuk.com</span></div>
  </div>
 </div>;
}

export function NotebookSocialEdition({record,format,assetOrigin}:{record:PublicationRecord;format:Format;assetOrigin:string}){
 if(record.id==='N-CELL80-01')return <Cell80SocialEdition record={record} format={format} assetOrigin={assetOrigin}/>;
 if(record.id==='N-ECOLOGY-RECOVERY')return <RecoveryEdition record={record} format={format}/>;
 const portrait=format==='linkedin',og=format==='og';
 const titleSize=portrait?(record.title.length>65?86:106):og?(record.title.length>65?57:70):(record.title.length>65?78:94);
 const visual=record.id==='N-EXHIBITION'?<ExhibitionVisual portrait={portrait}/>:record.id==='N-ATTRIBUTION'?<AttributionVisual portrait={portrait}/>:record.id==='N-ADDRESS-BUILD'?<DepthVisual portrait={portrait}/>:record.id==='N-AUTHORITY'?<AuthorityVisual portrait={portrait}/>:record.id==='N-MAP'?<MapVisual portrait={portrait}/>:record.id==='N-STATE'?<StateVisual portrait={portrait}/>:record.id==='N-ADDRESS'?<AddressVisual portrait={portrait}/>:record.id==='N-CONTEXT'?<ContextVisual portrait={portrait}/>:record.id==='N-OPERATOR'?<OperatorVisual portrait={portrait}/>:null;
 return <div style={{display:'flex',flexDirection:'column',justifyContent:'space-between',width:'100%',height:'100%',fontFamily:'Archivo',background:paper,color:ink,padding:portrait?'66px 72px 58px':og?'38px 48px':'58px 64px'}}>
  <div style={{display:'flex',justifyContent:'space-between',fontSize:og?17:22}}><span>Chris Hay</span><span>Notebook</span></div>
  <div style={{display:'flex',flexDirection:'column',gap:portrait?82:og?32:48}}>
   <div style={{display:'flex',fontFamily:'Newsreader',fontSize:titleSize,lineHeight:1.02,letterSpacing:-2,maxWidth:portrait?1040:og?1060:1360}}>{record.title}</div>
   {visual||<div style={{display:'flex',fontSize:portrait?33:og?24:30,lineHeight:1.4,maxWidth:portrait?850:og?920:1120}}>{record.dek}</div>}
  </div>
  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',paddingTop:portrait?32:18,fontSize:og?15:19,color:muted}}><span>{record.created} / {record.publication==='draft'?'Working note':'Research note'}</span><span>chrishayuk.com</span></div>
 </div>;
}
