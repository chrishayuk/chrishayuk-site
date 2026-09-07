import {ImageResponse} from 'next/og';
import {createElement} from 'react';
import {readFile} from 'node:fs/promises';
import {join} from 'node:path';
import {socialRecord} from '@/lib/social';
import {NotebookSocialCard} from '@/components/NotebookSocialCard';
export const runtime='nodejs';
const font=readFile(join(process.cwd(),'public/fonts/Fraunces.ttf'));
const textFont=readFile(join(process.cwd(),'public/fonts/Geist-Regular.ttf'));
export async function GET(_request:Request,{params}:{params:Promise<{id:string}>}){
 const record=socialRecord((await params).id);if(!record)return new Response('Not found',{status:404});
 return new ImageResponse(createElement(NotebookSocialCard,{record}),{width:1200,height:630,fonts:[{name:'Geist',data:await textFont,weight:400,style:'normal'},{name:'Fraunces',data:await font,weight:400,style:'normal'}],headers:{'Cache-Control':'public, max-age=3600','X-Robots-Tag':'noindex'}});
}
