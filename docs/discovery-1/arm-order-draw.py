"""MACHINE-DISCOVERY-1 arm-order draw.
Deterministic: the PRNG is seeded with sha256(seed string). The multiset of
nine subjects (3 per cue arm, three arms) is shuffled until the rules stated
before the draw hold; the number of rejected shuffles is reported so the
acceptance rate is on record. "No redraw after any result" is a discipline,
not code. Same implementation as MOTIVATION-1, MOTIVATION-2, DISCLOSURE-1
and WEB-CAPABILITY-1A. After the order is fixed, the same seeded PRNG draws a
distinct three-digit site-local value of K17 for every subject, excluding
the eighteen values WEB-CAPABILITY-1A used, so that a value a subject reports
can be checked against the value its deployment served and cannot have been
carried over from any earlier record. Values live in the private
repositories only."""
import hashlib, random
SEED = "MACHINE-DISCOVERY-1/2026-09-12/arm-order"
digest = hashlib.sha256(SEED.encode()).hexdigest()
rng = random.Random(int(digest, 16))
arms = ["GENERIC", "PHRASE", "NAME"]
pool = [a for a in arms for _ in range(3)]
USED_1A = {736,533,522,880,243,987,388,667,878,854,430,576,651,254,474,741,264,655}
def admissible(o):
    if any(o[i]==o[i+1] for i in range(len(o)-1)): return False   # 2 no identical adjacent arms
    if o[0] == "NAME": return False                                 # 3 the navigation control is not first
    if set(o[:5]) != set(arms): return False                        # 4 all three arms within the first five
    return True
attempts = 0
while True:
    attempts += 1
    o = pool[:]; rng.shuffle(o)
    if admissible(o): break
candidates = [v for v in range(100, 1000) if v not in USED_1A]
values = rng.sample(candidates, len(o))
print("seed   ", SEED); print("sha256 ", digest); print("rejected shuffles before the first admissible order:", attempts-1)
rep = {a:0 for a in arms}
for i,(a,v) in enumerate(zip(o,values),1):
    rep[a]+=1; print(f"{i:02d}  {a}-{rep[a]}  K17={v}")
r2 = random.Random(int(digest,16) ^ 0xA5A5); ok = sum(admissible(r2.sample(pool,9)) for _ in range(200000))
print(f"admissible fraction under the rules ≈ {ok/200000:.4f}")
