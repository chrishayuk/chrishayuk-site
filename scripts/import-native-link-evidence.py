"""Export reviewed NATIVE-001b documents from the recorded source commit.

Usage: python3 scripts/import-native-link-evidence.py /path/to/perpetual
Only the allowlisted documents are read. Private data and secrets are not copied.
"""
import hashlib
import json
import pathlib
import re
import subprocess
import sys

COMMIT = '1d201870a053e485008bade885b6147773fe548b'
PREFIX = 'token/experiments/native-001b/'
FILES = {
    'PROTOCOL.md': 'protocol.md',
    'SCORING.md': 'scoring.md',
    'FREEZE.json': 'freeze-v1.json',
    'AMENDMENT-v1.1.md': 'amendment-v1.1.md',
    'FREEZE-v1.1.json': 'freeze-v1.1.json',
    'results/PHASE0B.md': 'phase0b.md',
    'results/AMENDMENT-v1.1-RESULT.md': 'amendment-result.md',
    **{f'results/{trial}.md': f'{trial}.md' for trial in ['P0b-1', 'P0b-2', 'P0c-1', 'P0c-2']},
}
EXPECTED = {
    'results/PHASE0B.md': '9faed85c6d9b817e4753a35710ec0fa76b794db04f0a192fbccca02ee9290d8c',
    'results/P0b-1.md': '3f2d8c18d7edb6be0d03b11d7f3162033f9d67fb730fa4b519cfeea1ee74c572',
    'results/P0b-2.md': '2e467ef20436f16158a6f7b21871f9e363a0369a65f84b38cb789ca03f6a8b1a',
    'AMENDMENT-v1.1.md': 'e48e0901d580123dc22216397b9ed90b7a8c58af3d27aa95854c212ccf04c1a1',
    'FREEZE-v1.1.json': 'd2acc0b6567a6df53692276f495f59bcc6856bb33118df91fb6e0c814d822393',
    'results/AMENDMENT-v1.1-RESULT.md': '5b15d0a983bfb353be431c7ecb2d58413c56f66bce76c08ad6af259b2e56efd5',
    'results/P0c-1.md': '8c6bc9129aa3427897c9b5047d23c2e409583ceec53c678e411e1b7189e8eb55',
    'results/P0c-2.md': '1a3b57be3dd71de8afec8e1ae3c52c23a1fd8ea4c92558f7a2a45e0840efb873',
}

def sha(data):
    return hashlib.sha256(data).hexdigest()

def main():
    repository = pathlib.Path(sys.argv[1]).resolve()
    output = pathlib.Path(__file__).resolve().parents[1] / 'public/data/machines/native-001b'
    originals = {name: subprocess.check_output(['git', '-C', str(repository), 'show', f'{COMMIT}:{PREFIX}{name}']) for name in FILES}
    for name, expected in EXPECTED.items():
        assert sha(originals[name]) == expected, f'Original draft source changed: {name}'
    freeze = json.loads(originals['FREEZE.json'])
    amended = json.loads(originals['FREEZE-v1.1.json'])
    for name in ['PROTOCOL.md', 'SCORING.md']:
        assert sha(originals[name]) == freeze['files'][name]
    assert sha(originals['AMENDMENT-v1.1.md']) == amended['files']['AMENDMENT-v1.1.md']

    # Stable aliases preserve the route and its trial identity without publishing
    # operational hostnames or the unused main study's unguessable prefixes.
    prefixes = sorted(set(re.findall(r'site/t/([^/]+)/', originals['FREEZE.json'].decode() + originals['FREEZE-v1.1.json'].decode())))
    aliases = {prefix: f'FROZEN-PREFIX-{i+1:02d}' for i, prefix in enumerate(prefixes)}
    for trial in ['P0b-1', 'P0b-2', 'P0c-1', 'P0c-2']:
        prefix = re.search(r'/t/([^/]+)/', originals[f'results/{trial}.md'].decode()).group(1)
        aliases[prefix] = trial

    def redact(text):
        for prefix, alias in aliases.items():
            text = text.replace(prefix, alias)
        return text.replace('wm-svc-k4p8.fly.dev', 'trial-host.invalid').replace('wm-svc-k4p8', 'trial-host')

    note = ('Public copy, 11 October 2026. Operational hostnames and trial prefixes '
            'are replaced with stable aliases. Timestamps, answers, codes and verdicts '
            'are unchanged. Private schedules, datasets, run order and secrets are not '
            'included; their recorded hashes remain in the freeze. Original and public '
            'copy hashes are in provenance.json. Historical interpretations are retained; '
            'the article distinguishes observations from unproven mechanisms.')
    output.mkdir(parents=True, exist_ok=True)
    manifest = []
    for source, destination in FILES.items():
        text = redact(originals[source].decode())
        if destination.endswith('.json'):
            value = json.loads(text)
            value['publication_note'] = note
            text = json.dumps(value, indent=2) + '\n'
        else:
            text = f'> {note}\n\n' + text
        data = text.encode()
        assert all(prefix not in text for prefix in prefixes)
        assert 'wm-svc-k4p8' not in text
        (output / destination).write_bytes(data)
        manifest.append({'source': PREFIX + source, 'original_sha256': sha(originals[source]),
                         'url': '/data/machines/native-001b/' + destination, 'public_sha256': sha(data)})
    provenance = {'experiment': 'NATIVE-001b', 'publication_date': '2026-10-11',
                  'source_repository': 'https://github.com/chrishayuk/perpetual', 'source_commit': COMMIT,
                  'access': 'The source repository is private; the reviewed copies below are public.',
                  'redaction': note, 'original_phase0b_verdict': 'FAIL', 'main_trials': 'not run',
                  'files': manifest}
    (output / 'provenance.json').write_text(json.dumps(provenance, indent=2) + '\n')
    print(f'Exported {len(manifest)} reviewed documents with verified original and public hashes.')

if __name__ == '__main__':
    main()
