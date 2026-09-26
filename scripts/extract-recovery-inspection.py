"""Extract display-only I12R specimens. Never imports or executes experiment code.

Usage: python3 scripts/extract-recovery-inspection.py /path/to/ecology-inheritance-i12r
The source report and raw inputs are pinned; regeneration fails on different records.
"""
import hashlib
import json
import pathlib
import sys

source = pathlib.Path(sys.argv[1])
destination = pathlib.Path(__file__).resolve().parents[1] / 'public/data/ecology/recovery/inspection.json'
fingerprints = {
    'results/RESULTS.md': 'f1db9216b0e4dfc9eebb6201a2c83f5af65cb183fc370af15e940550e81db298',
    'results/result.json': 'a9e44006ccf5cb3c99644e8af4e2b063b44a527b2396e3100e46899677bed43c',
    'artifact-library.json': '17c4ff9af6fd252911e9e8c9360ca90a00fac3aeb609638ff99067a88f429264',
}
for name, expected in fingerprints.items():
    if hashlib.sha256((source / name).read_bytes()).hexdigest() != expected:
        raise SystemExit(f'Source fingerprint mismatch: {name}')
result = json.loads((source / 'results/result.json').read_text())
library = json.loads((source / 'artifact-library.json').read_text())
assert result['outcome'] == 'COMPLETE'
assert len(result['rows']) == 480
assert len(library['packages']) == 12

worlds = []
for world in result['worlds']:
    block = world['block']
    package = library['packages'][block]
    assert package['block'] == block
    arms = []
    for arm in 'BC':
        rows = sorted((r for r in result['rows'] if r['block'] == block and r['arm'] == arm and r['fork'] == 'corrupt'), key=lambda r: r['generation'])
        assert [r['generation'] for r in rows] == list(range(11, 21))
        first = rows[0]
        arms.append({
            'id': arm,
            'assessments': [{
                'generation': r['generation'],
                'recordCorrect': r['report']['record_correct'],
                'taskCorrect': r['report']['task_all_correct'],
                'joint': r['report']['record_correct'] and r['report']['task_all_correct'],
            } for r in rows],
            'firstTrace': {
                'caseId': f'r_b{block}_g11_{arm}_corrupt',
                'before': first['before']['record'],
                'receipt': first['receipt'],
                'after': first['after']['record'],
                'reply1': first['reply1'],
                'reply2': first['reply2'],
                'committed': first['report']['committed'],
            },
        })
    worlds.append({
        'block': block,
        'admitted': package['admission']['admitted'],
        'packageSha256': world['package_sha256'],
        'original': world['case']['truth'],
        'damaged': world['fork']['after']['record'],
        'target': world['fork']['target'],
        'evidence': world['case']['evidence'],
        'freshTruthG11': world['tasks']['11']['truth'],
        'arms': arms,
    })

output = {
    'run': 'RUN-20260917-214327-01023',
    'scope': 'I12R corruption branches only. G11–G20 are ten recovery opportunities, not a preceding ten-generation history. Display-only extraction; no model or inherited program is executed.',
    'sources': [{'file': name, 'sha256': sha} for name, sha in fingerprints.items()],
    'specimen': {
        'block': 9,
        'sourceCaseId': library['packages'][9]['source_case_id'],
        'packageSha256': worlds[9]['packageSha256'],
        **library['packages'][9]['admission']['package'],
    },
    'worlds': worlds,
}
destination.write_text(json.dumps(output, indent=2, ensure_ascii=False) + '\n')
print(f'Extracted {len(worlds)} paired worlds, 240 assessments and 24 G11 traces.')
