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
        self.latest = []
        self.featured = []
        self.feed(text)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if attrs.get('data-latest-notebook'):
            self.latest.append(attrs['data-latest-notebook'])
        if attrs.get('data-featured-article'):
            self.featured.append(attrs['data-featured-article'])
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
with urllib.request.urlopen(origin + '/api/graph', timeout=90) as response:
    graph = json.load(response)
with urllib.request.urlopen(origin + '/', timeout=90) as response:
    home = Page(response.read().decode())
published = {node['id']: node for node in graph['nodes'] if node['kind'] == 'notebook' and node.get('publication') == 'published' and node.get('published') and node.get('basis') == 'published-record'}
latest = sorted(published.values(), key=lambda node: (-int(node['published'].replace('-', '')), node['id']))[0]['id'] if published else None
home_issues = []
if home.latest != ([latest] if latest else []):
    home_issues.append('homepage latest does not match publication graph')
if home.h1 != 1:
    home_issues.append('homepage does not have exactly one H1')
if len(home.featured) != len(set(home.featured)) or any(key not in published or key == latest for key in home.featured):
    home_issues.append('featured articles contain duplicates, unpublished entries or the latest entry')
if len(home.featured) != min(3, max(0, len(published) - 1)):
    home_issues.append('featured article places are not filled')
home_result = {'latest': home.latest, 'featured': home.featured, 'issues': home_issues}
inventory_path.with_name('home-audit.json').write_text(json.dumps(home_result, indent=2) + '\n')
print('Homepage', 'PASS' if not home_issues else home_issues)
sys.exit(bool(home_issues) or any(row['issues'] for row in results))
