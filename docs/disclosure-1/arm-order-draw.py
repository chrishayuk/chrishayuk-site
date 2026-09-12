"""MACHINE-DISCLOSURE-1 arm-order draw.
Deterministic: the PRNG is seeded with sha256(seed string). The multiset of
15 subjects (3 per condition, five conditions) is shuffled until the rules
stated before the draw hold; the number of rejected shuffles is reported so
the acceptance rate is on record. Rule 7 (no redraw after any result) is a
discipline, not code. Same implementation as MOTIVATION-1 and MOTIVATION-2."""
import hashlib, random
SEED = "MACHINE-DISCLOSURE-1/2026-09-12/arm-order"
digest = hashlib.sha256(SEED.encode()).hexdigest()
rng = random.Random(int(digest, 16))
conds = ["M2-MARK","M2-KIND","M2-NOTE","S-MARK","S-KIND"]
pool = [c for c in conds for _ in range(3)]
KEY = {"M2-KIND","M2-NOTE"}
def admissible(o):
    if any(o[i]==o[i+1] for i in range(len(o)-1)): return False               # 2 no identical consecutive
    if not KEY <= set(o[:6]): return False                                      # 3 M2-KIND and M2-NOTE both within the first six
    if o[-1] in KEY: return False                                               # 4 neither M2-KIND nor M2-NOTE last
    if any(not (KEY & set(o[b:b+5])) for b in (0,5,10)): return False          # 5 each block of five holds one of them
    if set(o[:7]) != set(conds): return False                                   # 6 all five conditions by position 7
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
r2 = random.Random(int(digest,16) ^ 0xA5A5); ok = sum(admissible(r2.sample(pool,15)) for _ in range(200000))
print(f"admissible fraction under the rules ≈ {ok/200000:.4f}")
