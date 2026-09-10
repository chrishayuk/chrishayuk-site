"""Render the homepage stills from the verified EX-4 spatial replay (requires Pillow)."""
from pathlib import Path
from collections import defaultdict
import gzip
import json
import math
from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / 'public/data/cell80'
replay = json.loads(gzip.decompress((DATA / 'lineage-replay.json.gz').read_bytes()))
metadata = {'tick': 1080, 'width': 32, 'histories': []}
for history, name in zip(replay['histories'], ['observed', 'undone']):
    frame = next(f for f in history['frames'] if f['tick'] == metadata['tick'])
    image = Image.new('RGB', (768, 768), '#10150f')
    draw = ImageDraw.Draw(image)
    for tile in range(32 * 32):
        food = int(frame['food'][tile // 4], 16) & (1 << (tile % 4))
        x, y = tile % 32 * 24, tile // 32 * 24
        draw.rectangle((x + 1, y + 1, x + 22, y + 22), fill='#34492c' if food else '#171e15')
    tiles = defaultdict(list)
    for organism in frame['organisms']:
        tiles[organism[1]].append(organism)
    for tile, occupants in tiles.items():
        x, y = (tile % 32 + .5) * 24, (tile // 32 + .5) * 24
        r = min(24 * .40, 24 * (.18 + math.log2(len(occupants) + 1) * .045))
        color = '#e3b56b' if any(o[4] == 33 for o in occupants) else '#83c5d2' if any(o[4] == 37 for o in occupants) else '#8c9185'
        draw.ellipse((x-r, y-r, x+r, y+r), fill=color)
    filename = f'home-{name}.png'
    image.save(DATA / filename, optimize=True)
    count = sum(o[4] == 33 for o in frame['organisms'])
    metadata['histories'].append({'label': history['label'], 'image': f'/data/cell80/{filename}', 'population': len(frame['organisms']), 'program33': count, 'share': f'{count / len(frame["organisms"]) * 100:.1f}%', 'historyHash': history['hash']})
(ROOT / 'lib/data/cell80-home-preview.json').write_text(json.dumps(metadata, indent=2) + '\n')
print('Rendered the two actual tick-1080 states for the homepage.')
