// Production edition is private and deliberately non-indexable.
export function GET(){return new Response("User-agent: *\nDisallow: /\n",{headers:{"Content-Type":"text/plain; charset=utf-8"}});}
