"""Build selected IBM appearances from a cached official playlist and video metadata.
Run after refreshing ibm-playlist.json and candidate .info.json files with yt-dlp.
Never copy footage or transcripts; retain source metadata and embed references only.
"""
import json,pathlib,re,hashlib,sys
from datetime import datetime,timezone
root=pathlib.Path(__file__).resolve().parent.parent
cache=pathlib.Path(sys.argv[1])
playlist=json.loads((cache/'ibm-playlist.json').read_text())
channel='UCKWaEZ-_VweaEx1j62do_vQ'
if playlist.get('channel_id')!=channel or playlist.get('id')!='PLOspHqNVtKADvnJYHm3HButDlWykOTzlP':raise ValueError('Unexpected IBM source')
verified=[]
for i,flat in enumerate(playlist['entries']):
 path=cache/(flat['id']+'.info.json')
 if not path.exists():continue
 v=json.loads(path.read_text())
 if v.get('channel_id')!=channel:raise ValueError('Unexpected producer')
 description=v.get('description','')
 # A credit in the original description confirms appearance, not authorship.
 if not re.search(r'\bChris Hay\b',description,re.I):continue
 date=v.get('upload_date')
 if not date:raise ValueError('A dated film is required for latest ordering')
 episode=re.search(r'episode\s+(\d+)',description,re.I)
 description=description.split('\n\nVisit Mixture of Experts')[0]
 item={'youtubeId':v['id'],'id':'YT-'+v['id'],'title':v['title'],'format':'video','channelOrder':i,
 'duration':v.get('duration'),'views':v.get('view_count'),'viewsApproximate':False,
 'published':f'{date[:4]}-{date[4:6]}-{date[6:]}','description':({'123':'Chris Hay joins Tim Hwang, Sascha Brodsky, Kaoutar El Maghraoui and Kush Varshney to discuss Claude model updates, AI agent security, hardware guidelines and Runway’s interface-generating model.','40':'Chris Hay joins Tim Hwang, Aaron Baughman and Kate Soule to examine the response to DeepSeek, distinguish early claims from established facts, and discuss model distillation and competition in open models.'}.get(episode.group(1) if episode else '', 'An IBM Mixture of Experts conversation featuring Chris Hay.')),
 'url':f'https://www.youtube.com/watch?v={v["id"]}','poster':v.get('thumbnail') or f'https://i.ytimg.com/vi/{v["id"]}/hqdefault.jpg',
 'chapters':[{'start':c['start_time'],'end':c['end_time'],'title':c['title']} for c in (v.get('chapters') or [])],
 'transcript':'missing','metadataLevel':'full','producer':'IBM','collection':'Mixture of Experts',
 'participants':['Chris Hay'],'episode':episode.group(1) if episode else None,
 'participationEvidence':'Chris Hay is named as a participant in the original IBM YouTube description.',
 'sourcePage':'https://www.ibm.com/think/podcasts/mixture-of-experts'+({'123':'/anthropic-claude-hardware-guidelines-openai-rogue-agents-runway-solaris','40':'/deepseek-facts-vs-hype-model-distillation-open-source-competition'}.get(episode.group(1) if episode else '', ''))}
 item['sourceHash']=hashlib.sha256(json.dumps(item,sort_keys=True,ensure_ascii=False).encode()).hexdigest()
 verified.append(item)
if not verified:raise ValueError('No verified appearances; preserve the previous selection')
verified.sort(key=lambda v:v['published'],reverse=True)
result={'channelId':channel,'channelUrl':'https://www.youtube.com/@IBMTechnology',
 'playlistUrl':'https://www.youtube.com/playlist?list='+playlist['id'],
 'retrievedAt':datetime.fromtimestamp(playlist['epoch'],timezone.utc).isoformat(),
 'playlistCount':len(playlist['entries']),
 'playlistMostViewedId':max(playlist['entries'],key=lambda v:v.get('view_count') or 0)['id'],
 'videos':verified}
(root/'content'/'ibm-catalogue.json').write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n')
print(f'{len(verified)} verified appearances; {len(playlist["entries"])} programme entries compared')
