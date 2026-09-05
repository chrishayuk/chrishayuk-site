"""Normalize cached public yt-dlp metadata. No network or runtime dependency.
Usage: python3 scripts/import-youtube.py work/media-ingest
Raw downloads stay ignored; only allowlisted source fields enter the publication.
"""
import hashlib, json, pathlib, sys
from datetime import datetime, timezone
root = pathlib.Path(__file__).resolve().parent.parent
cache = pathlib.Path(sys.argv[1])
channel = json.loads((cache/'channel-current.json').read_text())
expected = 'UCncVoOXAma1zJUNTJGL6Ncw'
if channel.get('channel_id') != expected: raise ValueError('Unexpected channel')
entries = [(v,'video',i) for i,v in enumerate(channel['entries'])]
other = cache/'channel-other.jsonl'
if other.exists():
 for line in other.read_text().splitlines():
  p=json.loads(line)
  if not p: continue
  if p.get('channel_id') != expected: raise ValueError('Unexpected channel')
  entries += [(v,'short' if 'Shorts' in p['title'] else 'stream',i) for i,v in enumerate(p['entries'])]
if not entries: raise ValueError('Refusing empty catalogue')
seen=set(); videos=[]; transcripts={}
for flat,kind,order in entries:
 vid=flat['id']
 if vid in seen: continue
 seen.add(vid)
 path=cache/f'{vid}.info.json'
 full=json.loads(path.read_text()) if path.exists() else {}
 if full and full.get('channel_id') != expected: raise ValueError('Unexpected video author')
 v={**flat,**full}
 date=v.get('upload_date')
 record={'youtubeId':vid,'id':'YT-'+vid,'title':v['title'],'format':kind,'channelOrder':order,
 'duration':v.get('duration'),'views':v.get('view_count'),'viewsApproximate':not bool(full),
 'published':f'{date[:4]}-{date[4:6]}-{date[6:]}' if date else None,
 'description':v.get('description') or '', 'url':f'https://www.youtube.com/watch?v={vid}',
 'poster':f'https://i.ytimg.com/vi/{vid}/hqdefault.jpg',
 'chapters':[{'start':c['start_time'],'end':c['end_time'],'title':c['title']} for c in (v.get('chapters') or [])],
 'transcript':'missing','metadataLevel':'full' if full else 'listing'}
 cap=cache/f'{vid}.en-orig.json3'
 if cap.exists():
  events=json.loads(cap.read_text()).get('events',[]); passages=[]; current=None
  for e in events:
   text=''.join(s.get('utf8','') for s in e.get('segs',[])).strip()
   if not text: continue
   start=e.get('tStartMs',0)/1000; end=start+e.get('dDurationMs',0)/1000
   if current is None or start-current['start']>=25:
    if current: passages.append(current)
    current={'start':round(start,3),'end':round(end,3),'text':text}
   else: current['text']+=' '+text; current['end']=round(end,3)
  if current: passages.append(current)
  transcripts[vid]={'source':'YouTube automatic English captions','status':'automatic-unreviewed','language':'en','passages':passages}
  record['transcript']='automatic-unreviewed'
 record['sourceHash']=hashlib.sha256(json.dumps(record,sort_keys=True,ensure_ascii=False).encode()).hexdigest()
 videos.append(record)
result={'channelId':expected,'channelUrl':'https://www.youtube.com/@chrishayuk','title':'Chris Hay',
 'retrievedAt':datetime.fromtimestamp(channel['epoch'],timezone.utc).isoformat(), 'scope':['videos','shorts'],'streams':'No public streams tab at retrieval',
 'videos':videos}
for name,value in [('youtube-catalogue.json',result),('youtube-transcripts.json',transcripts)]:
 (root/'content'/name).write_text(json.dumps(value,ensure_ascii=False,indent=2)+'\n')
print(f'{len(videos)} videos; {len(transcripts)} transcripts')
