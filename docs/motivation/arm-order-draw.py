"""MACHINE-MOTIVATION-1 arm-order draw.
Deterministic: the PRNG is seeded with sha256(seed string). The multiset of
15 subjects (3 per condition) is shuffled repeatedly until the pre-stated
rules hold; the number of rejected shuffles is reported so the acceptance
rate is on record. Rule 7 (no redraw after any result) is a discipline, not
code."""
import hashlib, random, sys
SEED = "MACHINE-MOTIVATION-1/2026-09-11/arm-order/123"
digest = hashlib.sha256(SEED.encode()).hexdigest()
rng = random.Random(int(digest, 16))
conds = ["M0","M1","M2","M3","X"]
pool = [c for c in conds for _ in range(3)]
def admissible(o):
    if any(o[i]==o[i+1] for i in range(14)): return False                      # rule 2
    if not {"M2","M3"} <= set(o[:5]): return False                              # rule 3
    if o[-1] in ("M2","M3"): return False                                       # rule 4
    if any(not ({"M2","M3"} & set(o[b:b+5])) for b in (0,5,10)): return False  # rule 5
    if set(o[:7]) != set(conds): return False                                   # rule 6
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
# acceptance rate estimate from an independent stream, for the record
r2 = random.Random(int(digest,16) ^ 0xA5A5); ok = sum(admissible(rng_o) for rng_o in (r2.sample(pool,15) for _ in range(200000)))
print(f"admissible fraction under the rules ≈ {ok/200000:.4f}")
