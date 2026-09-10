"""Export recorded EX-11 population counts; never synthesize organism positions."""
import gzip
import hashlib
import json
from pathlib import Path
import sys

source = Path(sys.argv[1])
root = Path(__file__).resolve().parents[1]
raw = source.read_bytes()
rows = [json.loads(line) for line in raw.splitlines()]
manifest = next(row for row in rows if row['type'] == 'manifest')
base = int(manifest['base_seed'])
logs = {(r['arm'], str(r['seed'])): r['events'] for r in rows if r['type'] == 'mutation_log'}
index = []
for row in rows:
    if row['type'] != 'discovery':
        continue
    result = row['result']
    seed = str(result['config']['seed'])
    offset = int(seed) - base
    key = f"{row['arm']}-{offset}"
    births = [e for e in logs[row['arm'], seed] if e['capable'] and not e['parent_capable']]
    frames = [[f[k] for k in ['tick', 'alive', 'capable', 'capable_high']] for f in result['trajectory']]
    first = next((f[0] for f in frames if f[2]), None)
    meta = dict(key=key, arm=row['arm'], offset=offset, seed=seed,
                origins=len(births), firstBirth=min((e['tick'] for e in births), default=None),
                firstObserved=first, established=len(result['established_origins']),
                retained=bool(result['established_origins']) and result['final_window_capable_fraction'] >= .5,
                finalFraction=result['final_window_capable_fraction'], births=result['births'],
                historyHash=result['hash'], preview=frames[first if first is not None else 0])
    data = json.dumps(dict(key=key, frames=frames), separators=(',', ':')) + '\n'
    (root / f'public/data/cell80/barrier/{key}.json').write_text(data)
    meta['sha256'] = hashlib.sha256(data.encode()).hexdigest()
    index.append(meta)
    if key == 'full-5':
        (root / 'lib/data/cell80-barrier-preview.json').write_text(data)
compressed = gzip.compress(raw, mtime=0)
(root / 'public/data/cell80/followups/ex11.jsonl.gz').write_bytes(compressed)
export = dict(experiment='EX-11', fields=['tick', 'alive', 'capable', 'capable_high'],
              source=dict(file='followups/ex11.jsonl.gz', sha256=hashlib.sha256(compressed).hexdigest(),
                          rawSha256=hashlib.sha256(raw).hexdigest()), worlds=index)
encoded = json.dumps(export, indent=2) + '\n'
(root / 'lib/data/cell80-barrier-index.json').write_text(encoded)
(root / 'public/data/cell80/barrier/index.json').write_text(encoded)
print(f'Exported {len(index)} worlds, every recorded tick; raw source compressed to {len(compressed):,} bytes.')
