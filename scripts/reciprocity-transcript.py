#!/usr/bin/env python3
"""
MACHINE-RECIPROCITY-1 — render a blind visitor's complete transcript.

The visitor's closing report is an account, not a record: it is written
afterwards, it is generous about intentions, and across four
MACHINE-VISIT-1 runs it has twice disagreed with what the server
actually received. What the agent DID is the sequence of tool calls, and
that is what this renders.

The raw .jsonl is copied alongside the rendered markdown and is the
authoritative record. This file is for reading. Tool results are capped,
because a fetched web page runs to tens of thousands of characters and a
transcript nobody can read is preserved in the same sense a locked box
is; every cut is marked in place and none is silent.

Usage: reciprocity-transcript.py <agent.jsonl> <out.md> "<arm label>"
"""
import json, re, sys, pathlib, datetime

CAP = 3000

# URLs are pulled from the WHOLE tool input, not from a `url` argument.
# The first run of this script reported "never reached the site" for a
# visitor that had fetched it a dozen times, because that visitor used
# curl and the extractor only looked at WebFetch's url field. A summary
# that confidently states the opposite of what happened is worse than no
# summary, and this experiment's primary outcome is a funnel of exactly
# these counts.
URL = re.compile(r"https?://[^\s'\"`)\\]+")

def blocks(message):
    content = message.get("content")
    if isinstance(content, str):
        return [{"type": "text", "text": content}]
    return content or []

def clip(text, cap=CAP):
    text = text if isinstance(text, str) else json.dumps(text, indent=1)[:cap * 3]
    if len(text) <= cap:
        return text
    return text[:cap] + f"\n\n… [{len(text) - cap} more characters cut for reading; the complete result is in the .jsonl beside this file]"

def main():
    src, out, label = pathlib.Path(sys.argv[1]), pathlib.Path(sys.argv[2]), sys.argv[3]
    rows = [json.loads(line) for line in src.read_text().splitlines() if line.strip()]

    lines = [f"# MACHINE-RECIPROCITY-1 — {label}", "",
             f"**Rendered:** {datetime.datetime.now(datetime.timezone.utc).isoformat(timespec='seconds')}",
             f"**Complete record:** `{src.name}` beside this file — every tool call and full result.",
             f"**Turns:** {len(rows)}", "",
             "Rendered from the agent's own tool calls, not from its closing report.",
             "Long tool results are cut for reading and every cut says so in place.", "", "---", ""]

    fetched = []
    for row in rows:
        role, message = row.get("type"), row.get("message") or {}
        for block in blocks(message):
            kind = block.get("type")
            if kind == "text" and block.get("text", "").strip():
                lines += [f"### {'PROMPT' if role == 'user' else 'agent'}", "", clip(block["text"]), ""]
            elif kind == "thinking" and block.get("thinking", "").strip():
                lines += ["### agent — reasoning", "", "> " + clip(block["thinking"]).replace("\n", "\n> "), ""]
            elif kind == "tool_use":
                arg = block.get("input") or {}
                target = arg.get("url") or arg.get("query") or arg.get("command") or arg.get("prompt") or ""
                fetched += [url.rstrip(".,;") for url in URL.findall(json.dumps(arg))]
                lines += [f"### → {block.get('name')}", "", "```", clip(str(target), 1200), "```", ""]
                extra = {k: v for k, v in arg.items() if k not in ("url", "query", "command", "prompt")}
                if extra:
                    lines += ["```json", clip(json.dumps(extra, indent=1), 800), "```", ""]
            elif kind == "tool_result":
                body = block.get("content")
                if isinstance(body, list):
                    body = "\n".join(part.get("text", "") for part in body if isinstance(part, dict))
                lines += ["<details><summary>result</summary>", "", "```", clip(body or ""), "```", "", "</details>", ""]

    site = [url for url in fetched if "chrishayuk" in url]
    lines = lines[:10] + [
        "## URLs this visitor fetched", "",
        f"- **total fetches:** {len(fetched)}",
        f"- **against chrishayuk.com:** {len(site)}", "",
        *([f"  - `{url}`" for url in dict.fromkeys(site)] or ["  _none — this visitor never reached the site_"]),
        "", "---", ""] + lines[10:]

    out.write_text("\n".join(lines))
    print(f"{out}  ({len(rows)} turns, {len(fetched)} fetches, {len(site)} to chrishayuk.com)")

main()
