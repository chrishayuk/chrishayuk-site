"""Publication projection, never a new experimental run. Verify canonical receipts first."""
import hashlib
import json
from pathlib import Path
import sys

site = Path(__file__).resolve().parents[1]
repo = Path(sys.argv[1]).resolve()
root = repo / 'experiments/ecology-culture-results'
out = site / 'public/data/ecology/world-remembers'
out.mkdir(parents=True, exist_ok=True)
sources = []

def verified(slug, filename, copy=False):
    receipt = json.loads((root/slug/'server.json').read_text())
    data = (root/slug/filename).read_bytes()
    digest = hashlib.sha256(data).hexdigest()
    artifact = next(a for a in receipt['artifacts'] if a['sha256'] == digest)
    name = f'{slug}-{filename.lower()}'
    sources.append(dict(experiment=slug, run=receipt['run_id'], registration=receipt['registration_commit'],
                        file=filename, sha256=digest, artifact=artifact['id'],
                        uri=artifact['uri'], url=artifact['meta']['drive_url'],
                        publicPath=f'/data/ecology/world-remembers/{name}' if copy else None))
    if copy:
        (out/name).write_bytes(data)
    return json.loads(data) if filename.endswith('.json') else data

def project(report):
    frames=[]
    for m in range(4):
        for arm in sorted({r['arm'] for r in report['rows']}):
            for g in sorted({r['generation'] for r in report['rows']}):
                rows=[r for r in report['rows'] if (r['map_index'],r['arm'],r['generation'])==(m,arm,g)]
                if not rows: continue
                frames.append(dict(map=m, arm=arm, generation=g, before=rows[0]['before'], after=rows[-1]['after'],
                    reward=sum(r['world']['resources'] for r in rows),
                    renewals=sum(bool(r['world']['renewal']) for r in rows),
                    actions=[dict(id=r['case_id'], agent=r['agent'], reply=r['reply'],
                        reward=r['world']['resources'], renewal=r['world']['renewal'],
                        correct=r['world'].get('correct'), created=r['world'].get('created_id')) for r in rows]))
    return dict(frames=frames, starts=report['generation_starts'], analysis=report['analysis'])

producer=verified('i4','producer.json')
handoff=verified('i4','result.json')
writing=verified('i6','result.json')
corruption=verified('i7','result.json')
defender=verified('i11','population.json')
for n in ['i4','i5','i6','i7','i8','i8d1','i9','i10','i11']:
    verified(n,'RESULTS.md',True)
data=dict(version=1, mode='recorded', producer=producer['rows'][0]['response']['model'],
    tables=[json.loads(r['text']) for r in producer['records']],
    handoff=[dict(map=r['map_index'],signal=r['signal'],arm=r['arm'],reply=r['reply'],
                  correct=r['world']['correct'],reward=r['world']['resources'],target=r['world']['target']) for r in handoff['rows']],
    handoffAnalysis=handoff['analysis'],writing=project(writing),corruption=project(corruption),defender=project(defender),sources=sources)
(out/'figures.json').write_text(json.dumps(data,separators=(',',':'))+'\n')
(out/'provenance.json').write_text(json.dumps(sources,indent=2)+'\n')
print(f'Verified {len(sources)} canonical artifacts; projected recorded figures and copied 9 reports.')
