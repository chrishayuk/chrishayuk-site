"""Audit the actual server-rendered notebook collection against its record inventory.

Pass a local origin and an inventory JSON containing `notes` and `frozen` records.
This checks semantic rendering, not browser geometry or interactive behaviour.
"""
import collections
import concurrent.futures
import html.parser
import json
import os
import pathlib
import re
import sys
import urllib.request


class Page(html.parser.HTMLParser):
    def __init__(self, text):
        super().__init__(convert_charrefs=True)
        self.ids = []
        self.fragments = []
        self.h1 = 0
        self.books = 0
        self.folios = 0
        self.mounts = 0
        self.sizing = []
        self.text = []
        self.skip = 0
        self.stack = []
        self.page_controls = 0
        self.feed(text)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag in ('script', 'style'):
            self.skip += 1
        if attrs.get('id'):
            self.ids.append(attrs['id'])
        if tag == 'a' and attrs.get('href', '').startswith('#'):
            self.fragments.append(attrs['href'][1:])
        classes = attrs.get('class', '').split()
        if 'codex-pagination' in classes and self.folios == 0 and any('codex-book' in parent[1] for parent in self.stack):
            self.page_controls += 1
        if tag not in ('area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'):
            self.stack.append((tag, classes))
        self.h1 += tag == 'h1'
        self.books += 'hause-codex' in classes
        if 'hause-codex' in classes:
            self.sizing.append(attrs.get('data-sizing'))
        self.folios += 'codex-folio' in classes
        self.mounts += 'hause-notebook-film' in classes

    def handle_endtag(self, tag):
        for index in range(len(self.stack) - 1, -1, -1):
            if self.stack[index][0] == tag:
                del self.stack[index:]
                break
        if tag in ('script', 'style'):
            self.skip = max(0, self.skip - 1)

    def handle_data(self, data):
        if not self.skip:
            self.text.append(data)


def normal(text):
    return re.sub(r'\s+', ' ', text).strip()


origin = (sys.argv[1] if len(sys.argv) > 1 else os.environ.get('NOTEBOOK_ORIGIN', 'http://localhost:3000')).rstrip('/')
inventory_path = pathlib.Path(sys.argv[2] if len(sys.argv) > 2 else 'work/notebook-review/inventory.json')
inventory = json.loads(inventory_path.read_text())


def audit(record, frozen=False):
    path = f"/records/{record['id']}/{record['version']}" if frozen else '/notebook/' + record['slug']
    with urllib.request.urlopen(origin + path, timeout=90) as response:
        page = Page(response.read().decode())
    issues = []
    if page.h1 != 1:
        issues.append(f'{page.h1} H1 headings')
    if page.books != (0 if frozen else 1):
        issues.append(f'{page.books} notebook books')
    duplicate = [key for key, count in collections.Counter(page.ids).items() if count > 1]
    if duplicate:
        issues.append('duplicate IDs: ' + ', '.join(duplicate))
    if not frozen:
        if page.page_controls != 1:
            issues.append('page controls are not at the top of the paper')
        if page.sizing != ['content']:
            issues.append('notebook does not expand to fit its figures')
        missing = [f'act-{i + 1}' for i in range(len(record['body'])) if f'act-{i + 1}' not in page.ids]
        if missing:
            issues.append('missing citation anchors: ' + ', '.join(missing))
        text = normal(' '.join(page.text))
        for i, act in enumerate(record['body']):
            if 'text' in act and normal(act['text']) not in text:
                issues.append(f'missing manuscript text for act {i + 1}')
        if page.folios < 2:
            issues.append(f'only {page.folios} spreads')
    dangling = sorted(set(page.fragments) - set(page.ids) - {''})
    if dangling:
        issues.append('missing fragment destinations: ' + ', '.join(dangling))
    result = {'id': record['id'], 'path': path, 'frozen': frozen, 'spreads': page.folios,
              'film_mounts': page.mounts, 'issues': issues, 'dangling_fragments': dangling}
    print(record['id'], 'preserved' if frozen else f'{page.folios} spreads', 'PASS' if not issues else issues, flush=True)
    return result


with concurrent.futures.ThreadPoolExecutor(max_workers=3) as pool:
    results = list(pool.map(audit, inventory['notes']))
    results += list(pool.map(lambda record: audit(record, True), inventory['frozen']))
target = inventory_path.with_name('render-audit.json')
target.write_text(json.dumps(results, indent=2) + '\n')
print(f"{len(results)} pages checked; report: {target}")
sys.exit(any(row['issues'] for row in results))
