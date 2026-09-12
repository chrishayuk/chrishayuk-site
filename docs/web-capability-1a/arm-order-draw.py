"""MACHINE-WEB-CAPABILITY-1A arm-order draw.
Deterministic: the PRNG is seeded with sha256(seed string). The multiset of
18 subjects (3 per condition, six conditions) is shuffled until the rules
stated before the draw hold; the number of rejected shuffles is reported so
the acceptance rate is on record. The rule "no redraw after any result" is a
discipline, not code. Same implementation as MOTIVATION-1, MOTIVATION-2 and
DISCLOSURE-1, with one addition: after the order is fixed, the same seeded
PRNG draws a distinct three-digit site-local value of K17 for every subject,
so that the value a subject reports can be checked against the value its
deployment served. The values live in the private repositories only."""
import hashlib, random
SEED = "MACHINE-WEB-CAPABILITY-1A/2026-09-12/arm-order"
digest = hashlib.sha256(SEED.encode()).hexdigest()
rng = random.Random(int(digest, 16))
conds = ["GET-LINK","GET-QUERY","POST-FORM","SSE","WEBSOCKET","WASM"]
pool = [c for c in conds for _ in range(3)]
CODE = {"WEBSOCKET","WASM"}
def admissible(o):
    if any(o[i]==o[i+1] for i in range(len(o)-1)): return False   # 2 no identical adjacent conditions
    if set(o[:9]) != set(conds): return False                       # 3 all six conditions within the first nine positions
    if not CODE <= set(o[:6]): return False                         # 4 both execute-code rungs within the first six
    if o[-1] in CODE: return False                                  # 5 neither execute-code rung last
    return True
attempts = 0
while True:
    attempts += 1
    o = pool[:]; rng.shuffle(o)
    if admissible(o): break
values = rng.sample(range(100, 1000), len(o))
print("seed   ", SEED); print("sha256 ", digest); print("rejected shuffles before the first admissible order:", attempts-1)
rep = {c:0 for c in conds}
for i,(c,v) in enumerate(zip(o,values),1):
    rep[c]+=1; print(f"{i:02d}  {c}-{rep[c]}  K17={v}")
r2 = random.Random(int(digest,16) ^ 0xA5A5); ok = sum(admissible(r2.sample(pool,18)) for _ in range(200000))
print(f"admissible fraction under the rules ≈ {ok/200000:.4f}")
