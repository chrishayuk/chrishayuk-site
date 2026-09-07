import type {PublicationRecord} from '@/lib/types';
import {socialClaim,socialState} from '@/lib/social';
export function NotebookSocialCard({record}:{record:PublicationRecord}){
 return <div style={{display:'flex',flexDirection:'column',justifyContent:'space-between',width:'100%',height:'100%',fontFamily:'Geist',background:'#eee9df',color:'#24241e',padding:'46px 58px',borderTop:'9px solid #a86334'}}>
  <div style={{display:'flex',justifyContent:'space-between',fontSize:18,letterSpacing:2}}><span>CHRIS HAY / NOTEBOOK</span><span>{record.id}</span></div>
  <div style={{display:'flex',flexDirection:'column',gap:22}}><div style={{display:'flex',fontFamily:'Fraunces',fontSize:record.title.length>45?65:78,lineHeight:1.05,letterSpacing:-2,maxWidth:1080}}>{record.title}</div><div style={{display:'flex',fontSize:29,lineHeight:1.35,maxWidth:1000,color:'#5d5b50'}}>{socialClaim(record)}</div></div>
  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',borderTop:'1px solid #bcb7ab',paddingTop:22,fontSize:16}}><span>{socialState(record)}</span><span>chrishayuk.com</span></div>
 </div>;
}
