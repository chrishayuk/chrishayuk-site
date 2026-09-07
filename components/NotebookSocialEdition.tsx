import type {PublicationRecord} from '@/lib/types';
import {readability} from '@/lib/address-build';

type Format='linkedin'|'x';
const ink='#24241e',paper='#eee9df',muted='#666359',rule='#b9b3a6',accent='#a86334';

function AttributionVisual({portrait}:{portrait:boolean}){
 const rows=[['USER','do not add it'],['AGENT','adds it'],['REPOSITORY','refuses it']];
 return <div style={{display:'flex',flexDirection:'column',width:'100%',gap:portrait?23:12,borderTop:`1px solid ${rule}`,paddingTop:portrait?31:18}}>
  {rows.map(([label,value],i)=><div key={label} style={{display:'flex',alignItems:'baseline',borderBottom:`1px solid ${rule}`,paddingBottom:portrait?17:10,color:i===2?accent:ink}}><span style={{width:portrait?245:270,fontSize:portrait?23:20,letterSpacing:3}}>{label}</span><span style={{fontFamily:'Fraunces',fontSize:portrait?48:34}}>{value}</span></div>)}
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
  {rows.map(([label,value],i)=><div key={label} style={{display:'flex',alignItems:'center',padding:`${portrait?25:14}px 0`,borderBottom:`1px solid ${rule}`}}><span style={{width:portrait?300:310,fontSize:portrait?19:16,letterSpacing:2,color:i===2?accent:muted}}>{label}</span><span style={{fontFamily:'Fraunces',fontSize:portrait?39:29,color:i===2?accent:ink}}>{value}</span></div>)}
  <div style={{display:'flex',marginTop:portrait?28:14,fontSize:portrait?22:17,letterSpacing:2}}>A NEWER RECORD DOES NOT WIN BY BEING RIGHT.</div>
 </div>;
}

function MapVisual({portrait}:{portrait:boolean}){
 const rows=[['CAPITAL','↗'],['CURRENCY','→'],['LANGUAGE','↘']];
 return <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',width:'100%',borderTop:`1px solid ${rule}`,paddingTop:portrait?42:22}}>
  <div style={{display:'flex',flexDirection:'column',gap:portrait?22:12,width:'44%'}}>{rows.map(([label,arrow])=><div key={label} style={{display:'flex',justifyContent:'space-between',borderBottom:`1px solid ${rule}`,paddingBottom:portrait?14:8,fontSize:portrait?23:17,letterSpacing:2}}><span>{label}</span><span style={{color:accent}}>{arrow}</span></div>)}</div>
  <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',width:portrait?290:250,height:portrait?290:170,border:`2px solid ${accent}`,borderRadius:'50%',fontFamily:'Fraunces',fontSize:portrait?38:28,textAlign:'center',padding:30}}><span>ONE</span><span>PACKED</span><span>STATE</span></div>
 </div>;
}

function StateVisual({portrait}:{portrait:boolean}){
 const cells=[['SOURCE STATE','all positions'],['TRANSPLANT','one boundary'],['NEXT TOKEN','one answer']];
 return <div style={{display:'flex',flexDirection:'column',width:'100%',gap:portrait?28:15,borderTop:`1px solid ${rule}`,paddingTop:portrait?38:20}}><div style={{display:'flex',alignItems:'stretch',width:'100%'}}>{cells.map(([label,value],i)=><div key={label} style={{display:'flex',flexDirection:'column',width:'33.33%',padding:portrait?'24px 20px':'14px 18px',borderLeft:i?`1px solid ${rule}`:'none'}}><span style={{fontSize:portrait?18:15,letterSpacing:2,color:i===1?accent:muted}}>{label}</span><span style={{fontFamily:'Fraunces',fontSize:portrait?38:28,marginTop:portrait?18:9}}>{value}</span></div>)}</div><span style={{fontSize:portrait?22:17,letterSpacing:2,color:accent}}>WHAT CAN BE REBUILT IS DIFFERENT FROM WHAT CAN BE FORGOTTEN.</span></div>;
}

function AddressVisual({portrait}:{portrait:boolean}){
 const cells=[['QUESTION','capital of France'],['ADDRESS','entity × relation'],['READ','Paris']];
 return <div style={{display:'flex',alignItems:'center',width:'100%',borderTop:`1px solid ${rule}`,paddingTop:portrait?45:24}}>{cells.map(([label,value],i)=><div key={label} style={{display:'flex',alignItems:'center',width:'33.33%'}}><div style={{display:'flex',flexDirection:'column',gap:portrait?15:8}}><span style={{fontSize:portrait?18:15,letterSpacing:2,color:i===1?accent:muted}}>{label}</span><span style={{fontFamily:'Fraunces',fontSize:portrait?37:27}}>{value}</span></div>{i<2&&<span style={{display:'flex',marginLeft:'auto',marginRight:portrait?28:18,fontSize:portrait?34:26,color:accent}}>→</span>}</div>)}</div>;
}

function ContextVisual({portrait}:{portrait:boolean}){
 return <div style={{display:'flex',width:'100%',borderTop:`1px solid ${rule}`,paddingTop:portrait?42:22,gap:portrait?42:24}}><div style={{display:'flex',flexDirection:'column',width:'50%',gap:portrait?16:9,opacity:.55}}><span style={{fontSize:portrait?19:16,letterSpacing:2}}>EVERY NEW CALL</span><span style={{fontFamily:'Fraunces',fontSize:portrait?45:32,textDecoration:'line-through',textDecorationColor:accent}}>reconstruct it</span></div><div style={{display:'flex',flexDirection:'column',width:'50%',gap:portrait?16:9,borderLeft:`2px solid ${accent}`,paddingLeft:portrait?42:24}}><span style={{fontSize:portrait?19:16,letterSpacing:2,color:accent}}>RETURN TO STATE</span><span style={{fontFamily:'Fraunces',fontSize:portrait?45:32}}>index what survives</span></div></div>;
}

function OperatorVisual({portrait}:{portrait:boolean}){
 return <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',width:'100%',borderTop:`1px solid ${rule}`,paddingTop:portrait?42:22}}><span style={{fontFamily:'Fraunces',fontSize:portrait?50:36}}>trajectory</span><span style={{fontSize:portrait?74:54,color:accent}}>≠</span><span style={{fontFamily:'Fraunces',fontSize:portrait?50:36}}>computation</span></div>;
}

function GenericVisual({record,portrait}:{record:PublicationRecord;portrait:boolean}){
 return <div style={{display:'flex',flexDirection:'column',gap:portrait?24:13,width:'100%',borderTop:`1px solid ${rule}`,paddingTop:portrait?32:18}}><span style={{fontSize:portrait?19:16,letterSpacing:3,color:accent}}>{record.lineage||'QUESTION → RECORD'}</span><span style={{fontFamily:'Fraunces',fontSize:portrait?42:30,lineHeight:1.25,maxWidth:portrait?900:1100}}>{record.dek}</span></div>;
}

export function NotebookSocialEdition({record,format}:{record:PublicationRecord;format:Format}){
 const portrait=format==='linkedin';
 const titleSize=portrait?(record.title.length>42?78:94):(record.title.length>42?63:74);
 const visual=record.id==='N-ATTRIBUTION'?<AttributionVisual portrait={portrait}/>:record.id==='N-ADDRESS-BUILD'?<DepthVisual portrait={portrait}/>:record.id==='N-AUTHORITY'?<AuthorityVisual portrait={portrait}/>:record.id==='N-MAP'?<MapVisual portrait={portrait}/>:record.id==='N-STATE'?<StateVisual portrait={portrait}/>:record.id==='N-ADDRESS'?<AddressVisual portrait={portrait}/>:record.id==='N-CONTEXT'?<ContextVisual portrait={portrait}/>:record.id==='N-OPERATOR'?<OperatorVisual portrait={portrait}/>:<GenericVisual record={record} portrait={portrait}/>;
 return <div style={{display:'flex',flexDirection:'column',justifyContent:'space-between',width:'100%',height:'100%',fontFamily:'Geist',background:paper,color:ink,padding:portrait?'62px 70px 55px':'42px 58px 38px',borderTop:`12px solid ${accent}`}}>
  <div style={{display:'flex',justifyContent:'space-between',fontSize:portrait?21:17,letterSpacing:3}}><span>CHRIS HAY / NOTEBOOK</span><span>{record.id}</span></div>
  <div style={{display:'flex',flexDirection:'column',gap:portrait?48:24}}><div style={{display:'flex',fontFamily:'Fraunces',fontSize:titleSize,lineHeight:.98,letterSpacing:-2,maxWidth:portrait?1040:1450,textTransform:record.id==='N-ATTRIBUTION'?'uppercase':'none'}}>{record.title}</div>{visual}</div>
  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',borderTop:`1px solid ${rule}`,paddingTop:portrait?24:16,fontSize:portrait?17:14,letterSpacing:1}}><span>{record.publication.toUpperCase()} · V{record.version} · RECORDED {record.created}</span><span>chrishayuk.com</span></div>
 </div>;
}
