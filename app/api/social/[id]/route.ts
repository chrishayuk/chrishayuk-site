import {ImageResponse} from 'next/og';
import {createElement} from 'react';
import {readFile} from 'node:fs/promises';
import {join} from 'node:path';
import {socialRecord} from '@/lib/social';
import {NotebookSocialCard} from '@/components/NotebookSocialCard';
import {NotebookSocialEdition} from '@/components/NotebookSocialEdition';
export const runtime='nodejs';
// Node deployments read packaged fonts once. Workers serve the same public
// assets over HTTP because their bundle filesystem does not contain public/.
const packagedFonts=Promise.all(['Archivo-Regular.ttf','Newsreader-Regular.ttf'].map(name=>readFile(join(process.cwd(),'public/fonts',name)))).catch(()=>null);
export async function GET(request:Request,{params}:{params:Promise<{id:string}>}){
 const record=socialRecord((await params).id);if(!record)return new Response('Not found',{status:404});
 const search=new URL(request.url).searchParams;
 const requested=search.get('format');
 const format=requested==='linkedin'||requested==='x'?requested:'og';
 const size=format==='linkedin'?{width:1200,height:1500}:format==='x'?{width:1600,height:900}:{width:1200,height:630};
 const artwork=format==='og'?createElement(NotebookSocialCard,{record}):createElement(NotebookSocialEdition,{record,format});
 const disposition=search.get('download')==='1'?`attachment; filename="${record.slug}-${format}.png"`:'inline';
 // Public assets are served by both local runtimes; they are not filesystem
 // entries inside the worker bundle used by the Vite development server.
 const loadFont=async(name:string)=>{const response=await fetch(new URL(`/fonts/${name}`,request.url));if(!response.ok)throw new Error(`Unable to load social font: ${name}`);return response.arrayBuffer();};
 const [textFont,font]=await packagedFonts ?? await Promise.all([loadFont('Archivo-Regular.ttf'),loadFont('Newsreader-Regular.ttf')]);
 return new ImageResponse(artwork,{...size,fonts:[{name:'Archivo',data:textFont,weight:400,style:'normal'},{name:'Newsreader',data:font,weight:400,style:'normal'}],headers:{'Content-Disposition':disposition}});
}
