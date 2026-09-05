"""Build a reproducible lower-bound appearance register from original IBM credits.
The count deduplicates numbered episodes, excludes known duplicate or ambiguous
credits, and never treats an absent name as evidence Chris did not appear.
"""
import json,pathlib,re,sys,hashlib
from datetime import datetime,timezone
root=pathlib.Path(__file__).resolve().parent.parent
cache=pathlib.Path(sys.argv[1]);playlist=json.loads((cache/'ibm-playlist.json').read_text())
if playlist.get('channel_id')!='UCKWaEZ-_VweaEx1j62do_vQ':raise ValueError('Unexpected source channel')
rows=[];checked=0;seen=set()
for listing in playlist['entries']:
 path=cache/f'{listing["id"]}.info.json'
 if not path.exists():continue
 v=json.loads(path.read_text())
 if v.get('channel_id')!=playlist['channel_id']:raise ValueError('Unexpected video source')
 checked+=1;description=v.get('description','')
 if not re.search(r'\bChris Hay\b',description,re.I):continue
 number=re.search(r'\bepisode\s+(\d+)\b',description,re.I)
 episode='1' if re.search(r'\binaugural episode\b',description,re.I) else (number.group(1) if number else None)
 # For a bonus/non-numbered upload, the stable YouTube ID identifies the episode.
 key=f'episode-{episode}' if episode else f'video-{v["id"]}'
 if key in seen:continue
 seen.add(key)
 date=v.get('upload_date')
 rows.append({'youtubeId':v['id'],'episode':episode,'title':v['title'],
 'published':f'{date[:4]}-{date[4:6]}-{date[6:]}' if date else None,
 'sourceUrl':f'https://www.youtube.com/watch?v={v["id"]}',
 'creditSource':'Original IBM YouTube description','participant':'Chris Hay',
 'descriptionHash':hashlib.sha256(description.encode()).hexdigest()})
rows.sort(key=lambda r:r['published'] or '')
if not rows:raise ValueError('No appearances verified')
first=next((r for r in rows if r['episode']=='1'),None)
if not first:raise ValueError('Episode one must be verified before claiming participation from launch')
result={'asOf':datetime.now(timezone.utc).isoformat(),'playlistUrl':'https://www.youtube.com/playlist?list='+playlist['id'],
 'playlistEntries':len(playlist['entries']),'metadataChecked':checked,'verifiedCount':len(rows),
 'countBasis':'Minimum confirmed appearances from original IBM YouTube participant credits; numbered episodes deduplicated. Includes separately published bonus episodes. Missing credits do not establish absence.',
 'firstEpisode':first,'appearances':rows}
(root/'content'/'ibm-appearances.json').write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n')
print('Confirmed',len(rows),'appearances from',checked,'checked entries; first episode',first['published'])
