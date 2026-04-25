# Bail Cheat Sheet — Counsel Tool

**This is not an InstructIT-style client confirmation tool.** It is a **counsel-facing reference** for a bail hearing under the Canadian Criminal Code: rusty counsel, public-defender training, duty counsel under pressure.

## What it does

1. **Matter input** — counsel enters the offence section, charge context (default vs s. 515(6) reverse-onus), province, courthouse, and hearing officer.
2. **Onus** — the tool tells counsel which side bears the onus to show cause, with the specific s. 515(6) trigger if applicable.
3. **Three grounds for detention** — primary (s. 515(10)(a)), secondary (s. 515(10)(b)), tertiary (s. 515(10)(c) per *St-Cloud*).
4. **Antic ladder of liberty constriction** — rungs 1 through 7 (least to most restrictive), with the *Antic* principle, counsel position, and typical conditions at each rung.
5. **Local bail programs** — Toronto Bail Program, JHS Peel (Brampton), Ottawa BVS, BC Bail Supervision, etc., filtered by the courthouse field.
6. **Counsel checklist** — before / at / after the hearing.

All five panels are populated from inline JSON drawn from three GC.AI-generated reference files at `family-law-schema/schema/bail/`:
- `onus.json` — s. 515(6) reverse-onus categories with section anchors
- `ladder.json` — *Antic* (2017 SCC 27) anchored, with *Zora*, *Myers*, *St-Cloud*, *Tunney* supporting authorities
- `local-programs.json` — Ontario + BC bail programs by courthouse

## Running

Open `index.html` in any browser. `file://` works. No build step.

## Updating data

When the GC.AI-generated reference JSONs at `family-law-schema/schema/bail/` change, re-bake the inline `<script type="application/json">` blocks at the bottom of `index.html`.

## Scope

POC. Two provinces (ON, BC). Numerous `[VERIFY]` markers. **Counsel must verify every citation, section, and program detail on the day** — local programs change frequently and section numbers post-Bill C-75 (2019) require confirmation.
