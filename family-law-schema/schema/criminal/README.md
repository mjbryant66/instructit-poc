# Criminal Guilty Plea — Instructions Schema + Authorities

Generated 2026-04-24 via three GC.AI calls (08-jurisprudence, 09-bar-guidance, 10-schema). Companions to the `apps/criminal-guilty-plea` browser POC.

## Files

- `instructions.schema.json` — JSON Schema 2020-12 for the structured client-confirmed plea-instructions record. **16 top-level required properties**, 2 `$defs` (collateral_sub, hash_chain_entry — the latter two were patched in after GC.AI emitted refs to them without inline definitions). Compiles clean against ajv@8 / Ajv2020. **11 `[VERIFY]` markers**.
- `jurisprudence.json` — Authorities canvassed per node (charge / admission / voluntariness / consequences / court-not-bound / trial-rights / sentencing-range / collateral / appeal / alternatives / final). Anchors include *R. v. Adgey* [1975] 2 SCR 426, *R. v. T. (R.)* (1992) 10 OR (3d) 514 (ON CA), *R. v. Hanemaayer* 2008 ONCA 580, *R. v. Anthony-Cook* 2016 SCC 43, *R. v. Wong* 2018 SCC 25, *R. v. T (N.)* 2014 SCC 64. **7 `[VERIFY]` markers**.
- `bar-guidance.json` — Law-society and criminal-bar-association guidance per node. Sources: LSBC Code of Professional Conduct, LSO Rules of Professional Conduct, CBA Criminal Justice Section, Criminal Lawyers' Association (Ontario). **21 `[VERIFY]` markers**.
- `sample-filled.json` — Demo instance for fictional accused "Sam Sample" charged under Criminal Code s. 348(1)(b). **Does not yet validate clean** — names of fields drifted from the GC.AI-emitted schema during sample drafting (`full_legal_name` vs `legal_name`, etc.). Closing the gap is a downstream task; the schema validator catching this is the schema doing its job.

## Authorities exposure in the browser POC

`apps/criminal-guilty-plea/index.html` loads `data/jurisprudence.json` and `data/bar-guidance.json` on init via fetch and renders an expandable "Supporting authorities" details block under each confirmation node. When the page is opened from `file://` in some browsers, fetch is disabled — the tool degrades gracefully and shows the confirmation tree without authorities.

For full functionality, serve the `apps/criminal-guilty-plea/` folder over HTTP:

```
cd apps/criminal-guilty-plea
python3 -m http.server 8765
# Open http://localhost:8765/
```

## Status

Proof of concept. **39 total `[VERIFY]` markers across the three criminal artifacts** (11 schema + 7 jurisprudence + 21 bar-guidance) requiring senior criminal-defence counsel review before deployment.
