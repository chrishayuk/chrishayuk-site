"""Export the reviewed the-mechanism/ffn.py toy and independent NumPy readouts.
Usage: python3 scripts/export-addressed-memory.py /path/to/the-mechanism
Requires NumPy. Only reads the source repository; never runs its main().
"""
import hashlib
import json
from pathlib import Path
import runpy
import subprocess
import sys
import numpy as np

root = Path(sys.argv[1]).resolve()
source = root / 'ffn.py'
m = runpy.run_path(str(source))
facts, d, unit = m['FACTS'], m['d'], m['unit']
rng = np.random.default_rng(0)
vocab = sorted(set(answer for _, answer in facts))
keys = {a: unit(rng.standard_normal(d)) for a, _ in facts}
values = {w: unit(rng.standard_normal(d)) for w in vocab}
w_in = np.stack([keys[a] for a, _ in facts])
w_out = np.stack([values[w] for _, w in facts])
reads = []
for a, expected in facts:
    h = np.maximum(w_in @ keys[a], 0)
    out = w_out.T @ h
    scores = [float(out @ values[w]) for w in vocab]
    got = vocab[int(np.argmax(scores))]
    assert got == expected
    reads.append({'answer': got, 'activations': h.tolist(), 'scores': scores})
recorded = json.loads((root / 'ffn.json').read_text())
assert [r['got'] for r in recorded['reads']] == [r['answer'] for r in reads]
commit = subprocess.check_output(['git', '-C', str(root), 'rev-parse', 'HEAD'], text=True).strip()
payload = {
    'source': 'https://github.com/chrishayuk/the-mechanism',
    'sourceRevision': commit,
    'sourceSha256': hashlib.sha256(source.read_bytes()).hexdigest(),
    'exported': '2026-09-06', 'seed': 0, 'dimensions': d,
    'facts': [{'address': ' '.join(a.split()), 'answer': w} for a, w in facts],
    'keys': w_in.tolist(), 'values': w_out.tolist(), 'vocab': vocab,
    'readers': [values[w].tolist() for w in vocab], 'referenceReads': reads,
}
Path('lib/data/addressed-memory.json').write_text(json.dumps(payload, indent=2)+'\n')
print('Exported 6 addresses, 24 dimensions; all six NumPy readouts match ffn.json.')
