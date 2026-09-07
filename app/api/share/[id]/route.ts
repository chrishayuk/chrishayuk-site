import {distributionDrafts,socialRecord} from '@/lib/social';
export function GET(_request:Request,{params}:{params:Promise<{id:string}>}){return params.then(({id})=>{const record=socialRecord(id);return record?Response.json(distributionDrafts(record),{headers:{'Cache-Control':'public, max-age=600','X-Robots-Tag':'noindex'}}):new Response('Not found',{status:404});});}
