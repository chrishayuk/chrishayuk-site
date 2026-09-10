"""Export the recorded EX-13 family followed by Cell80 note five."""
import gzip
import hashlib
import json
from pathlib import Path
import sys

root = Path(__file__).resolve().parents[1]
raw = Path(sys.argv[1]).read_bytes()
seed = '6840321394656419844'
selected = []
for line in raw.splitlines(keepends=True):
    row = json.loads(line)
    if row.get('seed') == seed and row['type'] in ['discovery', 'retention_trace', 'candidate', 'checkpoint_check', 'snapshot_check']:
        selected.append((line, row))
trace = next(r['trace'] for _, r in selected if r['type'] == 'retention_trace')
world = next(r['result'] for _, r in selected if r['type'] == 'discovery' and r['arm'] == 'full')
populations = {f['tick']: f for f in world['trajectory']}
frames = [[f['tick'], populations[f['tick']]['alive'], f['intact_descendants_alive'],
           populations[f['tick']]['capable_high'], f['descendants_alive'], int(f['founder_alive'])]
          for f in trace['trajectory']]
subset = b''.join(line for line, _ in selected)
compressed = gzip.compress(subset, mtime=0)
source_file = 'followups/ex13-selected-history.jsonl.gz'
(root / 'public/data/cell80' / source_file).write_bytes(compressed)
result = dict(key='ex13-full-4', seed=seed, child=trace['candidate']['child'],
              birth=trace['candidate']['tick'], checkpoint=trace['checkpoint_tick'],
              firstTransmission=trace['first_bc_transmission'], extinction=trace['first_lineage_extinction_tick'],
              fields=['tick', 'world_alive', 'intact_descendants', 'world_capable_high', 'all_descendants', 'founder_alive'],
              frames=frames, source=dict(file=source_file, sha256=hashlib.sha256(compressed).hexdigest(),
              selectedRowsSha256=hashlib.sha256(subset).hexdigest(), originalFileSha256=hashlib.sha256(raw).hexdigest()))
encoded = json.dumps(result, separators=(',', ':')) + '\n'
(root / 'lib/data/cell80-inherited-history.json').write_text(encoded)
(root / 'public/data/cell80/inherited-history.json').write_text(encoded)
print(f'{len(frames)} recorded steps, child {result["child"]}; {len(compressed):,} source bytes.')
