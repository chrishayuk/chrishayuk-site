"""Project I1 and its historical Sol handoff from registry-verified local files."""
import hashlib
import json
from pathlib import Path
import sys

root = Path(sys.argv[1])
out = Path(__file__).resolve().parents[1] / 'public/data/ecology'
source = root / 'experiments/ecology-culture-results'
checks = {
 'i1/result.json': '9aad161fde240b4b31f18ed33d1797540d9645bbe8fa24180623e4f73f812424',
 'i1/RESULTS.md': '6800043e1e18a3e5ecf43ee6f018044394d70f19c094e32a796d3b3e759acfd4',
 'i1/gates.json': '5d0337f30e8b0cf5a3a6acba83fe3bc9f062d3e11e904a9ffed3152640980a7d',
 'sol1_attempt3/battery.json': '7077246bdd7f673622ccd374d616aa11ce093bd97d978ba487142f80a515706f',
}
for name, expected in checks.items():
 assert hashlib.sha256((source/name).read_bytes()).hexdigest() == expected, name
proto = root/'experiments/ecology-inheritance-i1-preregistration.md'
assert hashlib.sha256(proto.read_bytes()).hexdigest() == '4f582b0c7bce960325d5dd0fdde060cdd28c185567361b6fb7149f086f16bef8'
result = json.loads((source/'i1/result.json').read_text())
battery = json.loads((source/'sol1_attempt3/battery.json').read_text())
sol = battery['settings'][0]['assays']['A1B14']
assert battery['settings'][0]['effort'] == 'none'

def frame(row):
 return {k: row[k] for k in ['case_id','arm','generation','turn','reply','world_row','maintenance_event','store_after']}

projection = {
 'experiment': 'ecology-inheritance-i1', 'run': 'RUN-20260913-090952-00862',
 'sourceRun': 'RUN-20260913-082940-00857', 'sourceSha256': checks,
 'method': 'Selected exact world rows and stores. Displayed states are recorded boundaries, not interpolated simulation.',
 'model': result['model'], 'digest': result['digest'], 'settings': result['settings'],
 'sol': {'model': battery['model'], 'reasoning': 'none',
  'frames': [frame(r) for r in sol['rows'] if r['arm']=='A_necessary' and r['generation']==1],
  'generation': next(g for g in sol['generations'] if g['arm']=='A_necessary' and g['generation']==1)},
 'frames': [frame(r) for r in result['rows']],
 'generations': result['generations'], 'analysis': result['analysis'],
}
assert len(projection['frames']) == 18 and len(projection['sol']['frames']) == 3
assert projection['analysis']['resource_differences'] == [4,0,0]
for filename,data in [('i1-replay.json',(json.dumps(projection,indent=2)+'\n').encode()),
 ('i1-result.json',(source/'i1/result.json').read_bytes()),
 ('i1-results.md',(source/'i1/RESULTS.md').read_bytes()),
 ('i1-protocol.md',proto.read_bytes())]:
 assert b'sk-proj-' not in data and b'Bearer ' not in data
 (out/filename).write_bytes(data)
print('Verified registry hashes; projected 18 Qwen decisions and the three-action Sol source.')

# I2 repeats the same handoff with a fresh Qwen anchor and a Gemma recipient.
i2checks = {
 'i2/result.json': '54e8f59f032441e48cfa6ba1eceedc70982ca4d2d532b71047e3b8a7826001bc',
 'i2/RESULTS.md': '65fd1a4d9f5f67dcc270a55119ac974adea421185172a716f324cb997e8caff5',
}
for name, expected in i2checks.items():
 assert hashlib.sha256((source/name).read_bytes()).hexdigest() == expected, name
i2proto=root/'experiments/ecology-inheritance-i2-preregistration.md'
assert hashlib.sha256(i2proto.read_bytes()).hexdigest() == '5be7e0a8455f335839fb2ad7ffe8df48a360795cb4114dde55849c5c302d0e52'
i2=json.loads((source/'i2/result.json').read_text())
summary = {'experiment':'ecology-inheritance-i2','run':'RUN-20260913-095823-00865',
 'sourceSha256':i2checks, 'qwenExactActionMatches':i2['qwen_exact_action_matches'],
 'panels':[{'recipient':p['recipient'],'model':p['model'],'digest':p['digest'],'analysis':p['analysis']} for p in i2['panels']]}
for name,data in [('i2-result.json',(source/'i2/result.json').read_bytes()),
 ('i2-results.md',(source/'i2/RESULTS.md').read_bytes()),('i2-protocol.md',i2proto.read_bytes()),
 ('i2-summary.json',(json.dumps(summary,indent=2)+'\n').encode())]:
 assert b'sk-proj-' not in data and b'Bearer ' not in data
 (out/name).write_bytes(data)
print('Verified I2: 36 calls, fresh Qwen anchor and Gemma panel; control failures retained.')
