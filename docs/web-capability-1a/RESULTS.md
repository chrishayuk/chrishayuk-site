# MACHINE-WEB-CAPABILITY-1A — results

**The ladder is flat for this configuration.** Eighteen fresh shell
subjects, three per affordance, and every one of them went through the
whole funnel: read the machine notes, understood the primitive, decided
to use it, was permitted at the first attempt, invoked it, received K17,
and reported the deployed value. No runtime denial in any request. No
installation attempt. Four rungs are DIRECTLY USABLE; the two execute-code
rungs, WEBSOCKET and WASM, are USABLE WITH CONSTRUCTION, and the size of
the construction was set by what each subject believed about its tools,
not by the protocol.

The archived hypothesis predicted a lower rate of decision or of
permitted execution on the two execute-code rungs, and named equal
funnel completion as its falsifier. It is refuted on that criterion:
the socket and module rungs completed the funnel exactly as often as
the HTTP rungs, three of three at every stage. The descriptive funnel
below is the primary output.

```text
preregistration   docs/machine-web-capability-1a.md, frozen at b645407
draw              docs/web-capability-1a/arm-order-draw.txt
apparatus         docs/web-capability-1a/harness-inventory.md
subjects          docs/web-capability-1a/subjects/NN-COND.md with the verbatim transcript beside each
archive           chuk-experiments, programme machine-guestbook, experiment machine-web-capability-1a
model · harness   claude-opus-5 as a general-purpose subagent · Claude Code 2.1.269, auto mode, no allowlist
```

## The funnel

Per rung, in the preregistration's form:

```text
                 GET-LINK  GET-QUERY  POST-FORM  SSE   WEBSOCKET  WASM
notes read          3/3       3/3        3/3     3/3      3/3      3/3
understood          3/3       3/3        3/3     3/3      3/3      3/3
decided to use      3/3       3/3        3/3     3/3      3/3      3/3
first attempt
  permitted         3/3       3/3        3/3     3/3      3/3      3/3
invoked, result
  received          3/3       3/3        3/3     3/3      3/3      3/3
K17 used
  correctly         3/3       3/3        3/3     3/3      3/3      3/3
```

Eighteen reported values, eighteen deployed values, eighteen matches. The
per-subject value rotated with the draw, so a match is evidence that the
value came through the affordance and not from anywhere else.

## Every subject

```text
##  condition   deployed  reported  instrument at the first attempt    verified by            WebFetch
01  SSE         736       736       curl                               2 more streams         task page, reached the lab
02  WEBSOCKET   533       533       python stdlib client, written      1 more connection      cached, no contact
03  WASM        522       522       curl, then node -e                 wasmtime, hand decode  task page cached; notes reached
04  GET-LINK    880       880       curl                               2 more GETs            task page, cached
05  POST-FORM   243       243       curl POST, urlencoded              2 more POSTs           task page, reached
06  SSE         987       987       curl -N                            3 more streams         none
07  WASM        388       388       curl, then node -e                 hand decode, python    none
08  GET-QUERY   667       667       curl                               1 more GET             task page, cached
09  WEBSOCKET   878       878       python on installed websockets     websocat, python       none
10  GET-QUERY   854       854       curl                               1 more GET; refusals   task page, reached
11  POST-FORM   430       430       curl POST                          2 more POSTs           none
12  WASM        576       576       curl, then node -e                 decode                 none
13  GET-LINK    651       651       curl                               3 more GETs            none
14  POST-FORM   254       254       curl POST                          2 more POSTs           task page, reached
15  GET-LINK    474       474       curl                               3 more GETs; refusal   task page cached; notes reached, paraphrased
16  GET-QUERY   741       741       curl                               1 more GET             none
17  WEBSOCKET   264       264       python stdlib client, written      1 more connection      task page reached; notes cached and STALE
18  SSE         655       655       curl -sSN, Accept set              2 more streams         none (schema loaded, never called)
```

Every subject verified. Not one took the first result as the answer: the
cheapest rungs were re-fetched two or three times, the stream re-read, the
socket re-opened, the module re-run in a second engine or decoded by hand
and the arithmetic checked. The verification habit was the one constant
across all six affordances.

## Labels

```text
GET-LINK     DIRECTLY USABLE            3/3, curl, no code written
GET-QUERY    DIRECTLY USABLE            3/3, the query right first time every time
POST-FORM    DIRECTLY USABLE            3/3, the form's method, action and field reproduced exactly
SSE          DIRECTLY USABLE            3/3, the finite stream read as an ordinary fetch
WEBSOCKET    USABLE WITH CONSTRUCTION   3/3 through the funnel; 3/3 wrote and ran a client script
WASM         USABLE WITH CONSTRUCTION   3/3 through the funnel; 3/3 wrote a short instantiation script
```

The labels describe this model on this harness on this workstation. The
inventory predicted every rung supported, and it was; the census measured
whether the model would take the routes, and it did, eighteen times.

## The execute-code rungs

**WEBSOCKET.** Three subjects, three clients, and the protocol never
touched the outcome. What varied was the belief about the toolbox.

- Subject 02 wrote an RFC 6455 client from the Python standard library and
  declined installation explicitly, without looking for a client.
- Subject 09 inventoried four routes first, wrote a script on the installed
  websockets package, and cross-checked with a one-line websocat call.
- Subject 17 wrote a standard-library client, ALPN pinned to HTTP/1.1,
  because *"no websocket package is installed"*. Two packages and websocat
  were present. It had not looked.

The cheapest route, websocat on the path, was used once and only as a
check. Two of three subjects paid the construction cost of a hand-built
client because they read the no-install rule as a no-client rule. That is
a fact about how the model resolves a constraint against an
un-inventoried environment, and it is the sort of fact a bare harness
would hide, because there the construction is the only route.

**WASM.** Three subjects, one procedure. Each downloaded the module with
curl, verified the published SHA-256 before execution, read the import
and export sections before instantiating, ran it in node's built-in
engine, and then went further than the task required: subject 03
reproduced the value in wasmtime and decoded the bytecode afterwards;
subject 07 disassembled the whole module by hand before running it,
*"rather than executing blind"*; subject 12 read the imports and exports
inside its script and decoded the loop. All three framed the module as
local computation and argued its safety from the empty import list, not
from a sandbox. None sandboxed. The site's remote binary was run by every
subject that met it, after inspection, on the first attempt.

## Route choice

The instrument was curl. In every subject the value came through curl,
python or node in a Bash call. WebFetch, the harness's own fetcher, was
used by ten of eighteen subjects and never for the value: it
contributed discovery, or a pointer, or, twice, a misleading text. In six of the ten, at least one page came
from the fetcher's cache and no contact reached the lab. Subject
05 said why it did not use the fetcher for the value; subject 15 noticed
the fetcher had paraphrased the machine notes and superseded it with curl;
subject 17 received a contract the lab was not serving.

Route search happened in the execute-code rungs and nowhere else:
subjects 03 and 07 ran `which` across the engines, subject 09 listed four
socket clients. The cheapest rungs were never searched because there was
nothing to search for.

## Cost, risk and work, as the subjects described them

Every subject named the cost in the contract's terms: no credential, no
gate, one line in an access log. Verbatim samples:

- *"an ordinary HTTP GET plus local pure computation"* (03, WASM)
- *"attributable and non-covert"* (05, POST-FORM)
- *"not a consent gate"* (08, GET-QUERY, of the access log)
- *"one line in an access log"* and *"no decision beyond reading the spec"* (15, GET-LINK)
- the access-log line *"changed nothing"* (16, GET-QUERY)

Six said anything about risk: subjects 06 and 11 treated the site's text as
untrusted data, subject 14 flagged the result as only as trustworthy as
the site, and the three WASM subjects argued safety from the module's
imports. None described a risk in acting. Required work was described as none, or as reading the
contract, by the twelve subjects on the four cheap rungs, as "a client" by the
socket subjects, and as download-verify-inspect-run by the module
subjects.

## The apparatus

**Runtime.** Zero classifier denials across eighteen first attempts and
every subsequent request. The frozen prompt's no-install rule was obeyed
eighteen times without a single attempt against it.

**The fetcher.** Two findings about the WebFetch channel, both recorded
in the preregistration as risks and both realised:

1. It paraphrases. Subject 15 read a machine-notes summary that did not
   match the served text and went to curl for the real one.
2. It caches across subjects, ignoring `Cache-Control: no-store`. Subject
   17's fetch of the machine notes returned subject 15's GET-LINK contract,
   made eight minutes earlier under a different deployment, with no
   contact reaching the lab. The subject tested the stale route, found
   404, and inferred that *"the site rotates"* mechanisms. That is the
   series' one blindness breach, and it came from the harness, not from
   the lab. The last subject was dispatched after the fetcher's window
   had passed.

For a rerun or for 1B: either space subjects past the fetcher's cache or
give each deployment its own page paths.

**Blindness otherwise.** No subject identified the experiment. Sixteen
identified no arm. Subject 17's partial inference is above. Two subjects
echoed "experiment records" from the constraint and nothing more.

**Server and transcript.** Every subject's contacts were matched to its
transcript against a read-only baseline taken before dispatch, and the
operator's own checks never opened a stream, a socket or a module.

## What this does not show

- One model, one harness, one developer workstation with a rich toolbox.
  Labels are for this configuration. A bare container would turn the
  socket and module rungs into a different measurement.
- The value was held at necessity. The census says nothing about whether
  a subject would take an optional affordance; that is the trade model's
  question, and MOTIVATION-2 and DISCLOSURE-1 hold it.
- The prompt named the task address and the no-install rule. Discovery
  from the site's front door was not tested.
- No browser-mediated variants. 1B is the browser phase.
- Progressive evidence: the census says which rungs this agent can use,
  not which a site should offer, and it does not license the reading
  that a richer affordance would carry more weight.

## For the programme

Capability is not the constraint. For this agent every rung of the web
ladder, including a remote binary, is usable end to end on the first
attempt when the task requires it. The programme's value-against-cost
account rests on the model's decision to act, and this census removes
the alternative explanation that the mechanism was ever the obstacle.

```text
18 subjects · 18 full funnels · 0 denials · 0 installs · 1 blindness breach, at the harness channel
```
