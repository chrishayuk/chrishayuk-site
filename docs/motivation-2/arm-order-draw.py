"""MACHINE-MOTIVATION-2 arm-order draw.
Deterministic: the PRNG is seeded with sha256(seed string). The multiset of
18 subjects (3 per condition, six conditions) is shuffled until the rules
stated before the draw hold; the number of rejected shuffles is reported so
the acceptance rate is on record. Rule 7 (no redraw after any result) is a
discipline, not code."""
import hashlib, random
SEED = "MACHINE-MOTIVATION-2/2026-09-12/arm-order"
digest = hashlib.sha256(SEED.encode()).hexdigest()
rng = random.Random(int(digest, 16))
conds = ["M0","M1","M2","M3","X","S"]
pool = [c for c in conds for _ in range(3)]
def admissible(o):
    if any(o[i]==o[i+1] for i in range(len(o)-1)): return False               # 2 no identical consecutive
    if not {"M2","M3"} <= set(o[:6]): return False                              # 3 M2 and M3 both within the first six
    if o[-1] in ("M2","M3"): return False                                       # 4 neither M2 nor M3 last
    if any(not ({"M2","M3"} & set(o[b:b+6])) for b in (0,6,12)): return False  # 5 each block of six holds an M2 or M3
    if set(o[:8]) != set(conds): return False                                   # 6 every condition by run 8
    return True
attempts = 0
while True:
    attempts += 1
    o = pool[:]; rng.shuffle(o)
    if admissible(o): break
print("seed   ", SEED); print("sha256 ", digest); print("rejected shuffles before the first admissible order:", attempts-1)
rep = {c:0 for c in conds}
for i,c in enumerate(o,1):
    rep[c]+=1; print(f"{i:02d}  {c}-{rep[c]}")
r2 = random.Random(int(digest,16) ^ 0xA5A5); ok = sum(admissible(r2.sample(pool,18)) for _ in range(200000))
print(f"admissible fraction under the rules ≈ {ok/200000:.4f}")
