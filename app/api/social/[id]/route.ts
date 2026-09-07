import {ImageResponse} from 'next/og';
import {createElement} from 'react';
import {readFile} from 'node:fs/promises';
import {join} from 'node:path';
import {socialRecord} from '@/lib/social';
import {NotebookSocialCard} from '@/components/NotebookSocialCard';
import {NotebookSocialEdition} from '@/components/NotebookSocialEdition';
export const runtime='nodejs';
const font=readFile(join(process.cwd(),'public/fonts/Fraunces.ttf'));
const textFont=readFile(join(process.cwd(),'public/fonts/Geist-Regular.ttf'));
export async function GET(request:Request,{params}:{params:Promise<{id:string}>}){
 const record=socialRecord((await params).id);if(!record)return new Response('Not found',{status:404});
 const search=new URL(request.url).searchParams;
 const requested=search.get('format');
 const format=requested==='linkedin'||requested==='x'?requested:'og';
 const size=format==='linkedin'?{width:1200,height:1500}:format==='x'?{width:1600,height:900}:{width:1200,height:630};
 const artwork=format==='og'?createElement(NotebookSocialCard,{record}):createElement(NotebookSocialEdition,{record,format});
 const disposition=search.get('download')==='1'?`attachment; filename="${record.slug}-${format}.png"`:'inline';
 return new ImageResponse(artwork,{...size,fonts:[{name:'Geist',data:await textFont,weight:400,style:'normal'},{name:'Fraunces',data:await font,weight:400,style:'normal'}],headers:{'Content-Disposition':disposition}});
}
