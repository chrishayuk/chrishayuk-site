# Known operator request corrections

Published 11 September 2026. An excerpt of the manual ledger in
`docs/machine-guestbook-mg2.md`, section 5. This is not a complete inventory
of operator activity. It names eleven requests in three hourly cells.

```text
OPERATOR CORRECTIONS — /machines

  2026-09-10T00:00Z
    9 × (page, automation, unknown, curl,                inferred, none)
    1 × (page, automation, unknown, unrecognised client, inferred, none)
    reason: c0-treatment-equivalence

  2026-09-10T06:00Z
    1 × (page, automation, unknown, curl,                inferred, none)
    reason: c1-treatment-equivalence, first run after the MG-2B deployment
    note:   the C1 gate writes NO declaration, by design — only this one
            /machines request. The numerator is untouched by it.
```

Subtract each count only from its exact matching cell. Other requests in
the same cell remain counted. A missing cell or an observed count below the
correction is unresolved; no zero or organic total can be inferred.

Blind-run declarations are separately operator-induced and must be excluded
from organic participation measures. These three request corrections do not
enumerate all requests made by those runs.

Run 2 feedback: two reports were acknowledged with 201 but not stored after a
memoised store failure. The ledger records the fix as revision `355d537`.
The lost reports are unrecoverable.

Source file SHA-256 at extraction: `73d3e17bc16050ee4c6035541603e59b0c8772eefe9e87d776e80d9d90f7aac2`.
