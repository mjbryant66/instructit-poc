# instructit-poc

End-to-end proofs of concept for **InstructIT** — a structured, hash-chained,
audit-friendly client-instruction confirmation system for legal matters.
Each app walks a client through a decision tree before a binding event
(plea, signing, filing) and produces a tamper-evident time-stamped record
of the instructions given.

Built 2026-04-24 by PAI.

## Repository layout

```
instructit-poc/
├── README.md                          # this file
├── LICENSE                            # MPL-2.0
├── .gitignore                         # node_modules, .DS_Store, generated artifacts
├── apps/
│   ├── family-law-settlement/         # Browser POC: BC FLA separation-agreement instructions
│   │   ├── index.html                 # Self-contained, includes opt-in affect monitor
│   │   └── README.md
│   └── criminal-guilty-plea/          # Browser POC: Criminal Code s. 606 plea instructions
│       ├── index.html                 # Self-contained
│       └── README.md
└── family-law-schema/                 # JSON Schema + tooling for BC FLA separation agreement
    ├── README.md                      # Pipeline doc
    ├── VERIFY-CHECKLIST.md            # 70 [VERIFY] markers grouped by section
    ├── schema/
    │   ├── agreement.schema.json      # Unified JSON Schema 2020-12, ~217 KB
    │   ├── types.ts                   # Auto-generated TS types (1444 lines)
    │   ├── sample-filled.json         # Demo instance (validates 0 errors)
    │   ├── instructit-export.json     # Sample bridge output
    │   └── 0[0-7]-*.json              # Sub-schemas, raw and pre-merge
    ├── gcai-responses/                # Raw GC.AI API responses for traceability
    ├── working/                       # Build / bridge / render scripts
    │   ├── prompt-NN-*.md             # Prompts sent to GC.AI
    │   ├── compose.sh                 # Sub-schemas → unified
    │   ├── json-to-ts.mjs             # Schema → TypeScript types
    │   ├── render-docx.mjs            # Schema instance → Word document
    │   ├── instructit-to-schema.mjs   # Browser POC export → schema fragment
    │   └── sample-instructit-export.json
    ├── validate.mjs                   # CLI: ajv validation
    └── separation-agreement-draft.docx  # Demo render output
```

## Criminal artifacts (added 2026-04-24, second pass)

In addition to the family-law schema, the criminal POC has been backed by three structured GC.AI-generated artifacts at `family-law-schema/schema/criminal/`:

- **`jurisprudence.json`** — leading authorities mapped to each of the 11 confirmation nodes. Anchors: *Adgey* (SCC), *T (R.)* (ON CA), *Hanemaayer* (ON CA), *Anthony-Cook* (SCC), *Wong* (SCC), *T (N.)* (SCC). 7 `[VERIFY]`.
- **`bar-guidance.json`** — law-society and criminal-bar guidance per node from LSBC, LSO, CBA Criminal Justice Section, and the Criminal Lawyers' Association (Ontario). 21 `[VERIFY]`.
- **`instructions.schema.json`** — JSON Schema 2020-12 (16 top-level required properties, 2 `$defs`). Compiles clean. 11 `[VERIFY]`.
- **`sample-filled.json`** — demo instance for fictional accused. Does not yet validate clean (field-name drift between sample and GC.AI-emitted schema); closing the gap is a downstream task.

The `apps/criminal-guilty-plea/index.html` browser POC loads `data/jurisprudence.json` and `data/bar-guidance.json` on init and renders an expandable "Supporting authorities" block under each confirmation node, exposing the case + rule citations the lawyer is implicitly relying on at that step.

**Total `[VERIFY]` markers across both POCs: 70 (family-law) + 39 (criminal) = 109.**

## Why this exists

The **BC Lawyers Indemnity Fund** (LIF) flagged family-law claims at
record highs for the third straight year (broadcast notice msg_id 9120).
LIF Claims Counsel identified three drivers:

1. Missed limitation periods — the FLA s. 198(5) "negotiation trap"
2. Settler's remorse post-mediation
3. Drafting mistakes in separation agreements

InstructIT addresses (2) and (3) directly:

- **(2) Settler's remorse:** the family-law browser POC includes an opt-in,
  privacy-preserving, browser-local affect monitor (face-api.js) that watches
  for elevated stress at signing-critical nodes (FLA s. 4 voluntariness, final
  signing instruction). On elevated-stress detection, the tool intercepts
  the Agree click and requires extra confirmation, recording the
  contemporaneous behavioural reading in the audit log.
- **(3) Drafting mistakes:** the JSON Schema captures every parameter a
  comprehensive BC separation agreement needs to express, with type-safe
  validation via ajv@8 + ajv-formats@3 (Ajv2020), and a renderer that takes
  a validated instance and emits a draft Word document.

The criminal guilty plea POC mirrors the architecture for **Criminal Code
s. 606 plea inquiry** confirmations.

## End-to-end pipeline

```
Browser POC (apps/*)
   ├─ Decision tree, hash chain, optional affect monitor
   └─ localStorage export
          │
          ▼
working/instructit-to-schema.mjs
   ├─ Maps log entries → schema instructions_record.entries
   ├─ Maps affect snapshots → behavioural_and_capacity_screen
   └─ Derives procedural_fairness fragments
          │
          ▼
schema/sample-filled.json (or merged client instance)
   │
   ▼
validate.mjs (ajv 2020-12)  ✅
   │
   ▼
working/render-docx.mjs
   └─ Word document draft
```

## Running

### Browser POCs

Open `apps/family-law-settlement/index.html` or
`apps/criminal-guilty-plea/index.html` directly in a browser. No build,
no server. localStorage is the only persistence.

### Schema tooling

```bash
cd family-law-schema
npm install --prefix working ajv@8 ajv-formats@3 docx@8     # installs locally under working/node_modules
node validate.mjs                                          # validates included sample
node working/render-docx.mjs                               # renders to .docx
node working/instructit-to-schema.mjs working/sample-instructit-export.json
```

## Status

**Proof of concept.** Not for client deployment without:

- Senior BC family-law counsel review of the **70 `[VERIFY]` markers** in
  `family-law-schema/schema/agreement.schema.json` (catalogued in
  `family-law-schema/VERIFY-CHECKLIST.md`).
- Tightening of `required[]` arrays per sub-schema to reflect what's actually
  mandatory at the agreement level vs only mandatory if the section is present.
- Round-trip integration testing with real client data (synthetic only at present).
- Privacy / Law Society review of the affect-monitor feature for client-facing use.

## License

[MPL-2.0](LICENSE) — Mozilla Public License v2.0, consistent with the broader
justack.ai licensing posture (see `project_justack_licensing_strategy.md` in the
PAI memory store).
