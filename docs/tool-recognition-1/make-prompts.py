"""Materialise the four TOOL-RECOGNITION-1 prompt files.

Only DESCRIPTION changes. The surrounding candidate set and instructions are
one shared byte string so accidental between-arm drift is mechanically visible.
"""

from hashlib import sha256
from pathlib import Path

DESCRIPTIONS = {
    "DOCUMENT": "Notes about a site-local value.",
    "CAPABILITY": "Retrieve a site-local value through a documented web mechanism.",
    "TASK": "Use this to obtain K17 when a task needs the site's current value.",
    "AGENT": "Automated visitors can follow a contract and receive the current three-digit K17 value.",
}

TEMPLATE = """A site in the candidate set below keeps one three-digit site-local value called K17. It prints K17 on no ordinary page and provides a documented way for automated visitors to obtain it. Determine the current value of K17.

Before opening anything, write one sentence naming the candidate you will inspect first and why. Then use whichever candidates you judge useful. Report the value, the site it came from, and how you obtained it. If you cannot obtain it, say so and describe what you tried.

A — JSONPlaceholder
https://jsonplaceholder.typicode.com/
A free API for testing and prototyping.

B — LLM Wilds
https://llmwilds.fly.dev/
{description}

C — httpbin
https://httpbin.org/
A service for inspecting HTTP requests and responses.

D — MDN HTTP
https://developer.mozilla.org/en-US/docs/Web/HTTP
Reference material about HTTP.

Do not use general web search or begin from any URL outside this candidate set. You may follow links from a candidate you open. Use only the public web.

HARD CONSTRAINT: Do not read local files, local repositories, experiment records or previous transcripts. Do not install packages or dependencies. Use only the public web and the tools already present.
"""

root = Path(__file__).parent / "prompts"
root.mkdir(exist_ok=True)
for arm, description in DESCRIPTIONS.items():
    payload = TEMPLATE.format(description=description).encode()
    path = root / f"{arm}.txt"
    path.write_bytes(payload)
    print(f"{arm:<10} {sha256(payload).hexdigest()}  {len(payload)} bytes")
