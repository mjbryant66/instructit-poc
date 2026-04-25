# BC FLA Separation Agreement — Parameter Schema (POC)

End-to-end JSON Schema describing every parameter a comprehensive separation
agreement governed by the BC *Family Law Act* (S.B.C. 2011, c. 25) needs to
fully express.

Generated 2026-04-24 overnight by PAI from a structured pipeline of GC.AI
single-turn calls. Targets the BC Lawyers Indemnity Fund family-law claims
data (settler's remorse, FLA s. 198(5) limitation traps, drafting mistakes).

## What's here

```
schema/
  agreement.schema.json     # Unified JSON Schema 2020-12 (~217 KB, 29 defs, 48 properties)
  types.ts                  # Auto-generated TypeScript types (1444 lines)
  sample-filled.json        # Fully-filled demo (Jane + John Example) — validates clean
  instructit-export.json    # Sample fragment exported from the InstructIT browser POC
  00-toplevel.json          # 22-section structure spec from GC.AI
  02-parties.json ... 07-validity.json   # Sub-schemas (raw, pre-merge)
gcai-responses/             # Raw GC.AI API responses for traceability
working/
  prompt-NN-*.md            # The actual prompts sent to GC.AI
  json-to-ts.mjs            # Schema → TypeScript walker
  compose.sh                # Compose script (sub-schemas → unified)
  render-docx.mjs           # Schema instance → Word document (8 articles)
  instructit-to-schema.mjs  # InstructIT browser POC export → schema fragment
  sample-instructit-export.json  # Test input for the bridge
  node_modules/             # ajv@8 + ajv-formats@3 + docx@8 (local installs)
validate.mjs                # CLI: `node validate.mjs path/to/instance.json`
separation-agreement-draft.docx  # Last render output
README.md                   # This file
```

## Coverage

48 top-level properties spanning:

- **Parties + recitals + definitions** — FLA s. 3 spouse classification, marriage / cohabitation / separation dates, ILA solicitor records.
- **Children + parenting** — FLA Part 4 best-interests, parenting time, decision-making, communication, relocation, travel.
- **Property + debt** — FLA Part 5 family vs excluded property, family debt, real property, pensions, business interests, equalization.
- **Support** — Federal Child Support Guidelines, SSAG, s. 7 expenses, indexation, security, review.
- **Standard clauses** — releases, indemnities, dispute resolution, jurisdiction, severability, entire agreement, execution, ILA certificates, schedules.
- **Validity preconditions** — Brandsema 2009 SCC 10, Miglin 2003 SCC 24, Hartshorne 2004 SCC 22, FLA s. 4 / s. 93. Includes affect-monitor capture and instructions-record hash chain.

## Why this matters

The BC LIF (broadcast notice msg_id 9120, 2026) flagged family-law claims at
record highs for the third year running. Three drivers:

1. Missed limitation periods — FLA s. 198(5) suspension-during-mediation trap
2. Settler's remorse post-mediation
3. Drafting mistakes in separation agreements

A defensible parameter schema closes (3) directly — and, paired with an
auditable client-instructions tree (InstructIT) and an affect-monitored
voluntariness screen, gives counsel contemporaneous evidence on (2).

## Validation

```
node validate.mjs                            # validates the included sample stub
node validate.mjs path/to/real-instance.json # validates a real instance
```

Schema dialect: JSON Schema 2020-12. Validator: `ajv` v8 + `ajv-formats` v3,
installed locally under `working/node_modules`.

The included `schema/sample-filled.json` is a fictional fully-filled
demo (Jane and John Example, married 2008-06-21, separated 2024-09-01)
that **validates against the unified schema with zero ajv errors** —
end-to-end proof that the schema compiles, the sample populates every
required field, and ajv accepts the result.

Run `node validate.mjs` to confirm.

## VERIFY catalog

The schema contains **70 `[VERIFY]` markers** that flag substantive items
requiring counsel review before client deployment. These cluster around:

- specific FLA section numbers cited by GC.AI without 100% confidence
- statutory cross-references (Pension Benefits Standards Act, ITA s. 73 / s. 146(16))
- subordinate guides (Federal Child Support Guidelines BC schedule, SSAG)
- procedural rules (Supreme Court Family Rules Form F8 reference)
- BC-specific limitation period numerics

Run `grep -nE '\[VERIFY[^]]*\]' schema/agreement.schema.json` to enumerate.

## Pipeline (reproducible)

1. Top-level structure prompt (`prompt-01-toplevel.md`, 1.9 KB) → GC.AI → `00-toplevel.json` (22 sections)
2. Six sub-schema prompts (`prompt-02..07-*.md`, 2.8–5 KB each) → GC.AI in parallel → 6 sub-schema files
3. Compose: `jq` merges definitions + properties from sub-schemas into unified schema
4. Generate types: `node working/json-to-ts.mjs` walks schema → TypeScript types
5. Validate: `node validate.mjs` runs ajv against any instance

## End-to-end pipeline (working tonight)

```
                                                  +---> separation-agreement-draft.docx
                                                  |     (via working/render-docx.mjs)
schema/sample-filled.json -> validate.mjs (ajv) --+
                                                  |
                                                  +---> any other downstream consumer
                                                        (wills, court forms, etc.)

instructit POC localStorage
   |
   v
working/instructit-to-schema.mjs  -->  schema/instructit-export.json
                                       (instructions_record + behavioural_screen
                                       + procedural_fairness fragments)
```

The two paths converge: a real client confirmation in the InstructIT browser POC
produces a partial agreement instance; that fragment merges with counsel-supplied
property/support/parenting data to form a complete validated instance; the renderer
turns it into a draft Word document for the matter.

## Next steps (for daylight)

1. **Counsel review of [VERIFY] markers.** ~60 min for a senior BC family practitioner.
2. **Tighten `required` arrays** per sub-section to reflect what's mandatory at the agreement level vs only mandatory *if* the section is present. Unified `required[]` is set to the 7 truly mandatory top-level sections; sub-section requireds remain as drafted by GC.AI.
3. **Expand the renderer.** It currently emits 8 articles (parties, recitals, definitions, ILA + voluntariness, disclosure, property, support, releases, acknowledgment, execution). Property/parenting/parenting-time tables are stubs.
4. **Form F8 mapping.** Map `financial_disclosure_attestations.documents_provided[]` to the BC Supreme Court Family Rules Form F8 financial-statement structure.
5. **Round-trip test.** Drive the InstructIT browser POC through a full session, export the localStorage, run the bridge, merge into a full instance, render to docx, validate the output reads as a coherent draft agreement.

## Provenance + caveats

- Drafted by GC.AI single-turn API (`reference_gcai_api_usage.md`). Each prompt 1.9–5 KB; output 50–90 s per call; all 6 parallel calls succeeded, no HTTP 524.
- Authorities are GC.AI's recall — known to occasionally hallucinate section numbers. The `[VERIFY]` discipline is the mitigation, not a substitute for counsel review.
- This is a **POC**. Do not deploy to clients without counsel sign-off on the legal substance.
