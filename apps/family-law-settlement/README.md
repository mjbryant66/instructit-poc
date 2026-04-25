# InstructIT — Family Law Settlement (browser POC)

Pre-execution client confirmation tool for BC separation agreements.

## What it does

Walks the client through a 14-node decision tree (intro → ILA → disclosure →
voluntariness → capacity → property → support → parenting → waiver →
set-aside risk acknowledgment → mediation window → limitation acknowledgment →
final). At each node the client clicks **Agree**, **Disagree (with note)**,
or **Defer**. The session produces an append-only, SHA-256 hash-chained
audit log of every confirmation.

## The differentiator

**Optional, opt-in, browser-local affect monitor** powered by face-api.js
(`@vladmandic/face-api`). When enabled, the camera feeds a continuous
expression read (happy / neutral / sad / fearful / angry / surprised /
disgusted). At signing-critical nodes (FLA s. 4 voluntariness, final
signing instruction), if the stress score crosses a threshold the tool
**intercepts the Agree click** and shows an extra-confirmation modal:

> Pause — elevated stress detected. The Family Law Act s. 4 requires that
> you proceed voluntarily and free of duress. Pause and reflect, defer,
> or confirm anyway.

If the client confirms anyway, the audit log records both the elevated
stress reading and the explicit confirmation under stress-gate. This is
intended to address the BC Lawyers Indemnity Fund's "settler's remorse"
claims driver with **objective contemporaneous evidence** rather than just
a checkbox.

**Privacy:** the camera stream stays in the browser. No video, image, or
expression data leaves the device. Only summary numeric scores enter the
audit log.

## Authorities seeded into the tree

- `Rick v. Brandsema` 2009 SCC 10 — procedural fairness
- `Miglin v. Miglin` 2003 SCC 24 — Stage 1 + Stage 2 substantive fairness
- `Hartshorne v. Hartshorne` 2004 SCC 22 — substantively unequal division
- Family Law Act, S.B.C. 2011, c. 25:
  - s. 4 — set-aside grounds (duress, undue influence)
  - s. 84 — family property
  - s. 85 — excluded property
  - s. 86 — family debt
  - s. 93 — review of agreements
  - s. 198 — limitation periods, including s. 198(5) suspension during
    qualifying mediation

All citations marked `[VERIFY]` in the schema must be confirmed before
client deployment.

## Running

Open `index.html` directly in a modern browser (Chrome / Safari / Firefox).
No build step. localStorage key: `instructit_family_law_v1`.

## Exporting

In DevTools console:

```js
copy(localStorage.getItem("instructit_family_law_v1"))
```

Paste into a `.json` file. Run that file through
`../../family-law-schema/working/instructit-to-schema.mjs` to get a schema
fragment containing `instructions_record`, `behavioural_and_capacity_screen`,
and partial `procedural_fairness` data.
