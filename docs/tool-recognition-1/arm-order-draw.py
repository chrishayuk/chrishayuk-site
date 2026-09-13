"""TOOL-RECOGNITION-1 arm-order and K17 draw.

Deterministic: seed Python's PRNG with the integer value of the SHA-256 of
the registered seed string. Shuffle four copies of each arm until the frozen
balance rules hold, then draw one distinct three-digit K17 value per subject.
The values exclude every value used in MACHINE-WEB-CAPABILITY-1A and
MACHINE-DISCOVERY-1. No redraw is permitted after any subject result.
"""

import hashlib
import random

SEED = "TOOL-RECOGNITION-1/2026-09-13/arm-order"
ARMS = ["DOCUMENT", "CAPABILITY", "TASK", "AGENT"]

USED = {
    108, 243, 254, 264, 373, 385, 388, 430, 474,
    494, 522, 525, 533, 552, 576, 651, 655, 667,
    736, 741, 798, 854, 878, 880, 906, 959, 987,
}

digest = hashlib.sha256(SEED.encode()).hexdigest()
rng = random.Random(int(digest, 16))
pool = [arm for arm in ARMS for _ in range(3)]


def admissible(order: list[str]) -> bool:
    if any(order[i] == order[i + 1] for i in range(len(order) - 1)):
        return False
    if set(order[:6]) != set(ARMS):
        return False
    if order[0] in {"DOCUMENT", "AGENT"}:
        return False
    return True


attempts = 0
while True:
    attempts += 1
    order = pool[:]
    rng.shuffle(order)
    if admissible(order):
        break

candidates = [value for value in range(100, 1000) if value not in USED]
values = rng.sample(candidates, len(order))

print("seed   ", SEED)
print("sha256 ", digest)
print("rejected shuffles before the first admissible order:", attempts - 1)
replicate = {arm: 0 for arm in ARMS}
for position, (arm, value) in enumerate(zip(order, values), 1):
    replicate[arm] += 1
    print(f"{position:02d}  {arm}-{replicate[arm]}  K17={value}")

probe = random.Random(int(digest, 16) ^ 0xA5A5)
accepted = sum(admissible(probe.sample(pool, len(pool))) for _ in range(200_000))
print(f"admissible fraction under the rules ≈ {accepted / 200_000:.4f}")
