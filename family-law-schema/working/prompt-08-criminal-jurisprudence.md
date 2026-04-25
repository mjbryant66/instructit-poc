You are senior Canadian criminal-defence counsel. Draft a **structured authorities table** for a client-instructions-confirmation tool used before a defence lawyer enters a plea of guilty on a client's behalf. The tool must align its 11 client-confirmation nodes (charge, admission, voluntariness, consequences, court-not-bound, trial-rights, sentencing-range, collateral, appeal, alternatives, final) with the leading binding authority from each jurisdiction.

**Output strict JSON only**, top-level shape:
```
{
  "$id": "criminal-guilty-plea-jurisprudence.json",
  "jurisdictions_covered": ["SCC", "ON CA", "BC CA"],
  "node_to_authorities": {
    "charge": [...],
    "admission": [...],
    "voluntariness": [...],
    "consequences": [...],
    "court_not_bound": [...],
    "trial_rights": [...],
    "sentencing_range": [...],
    "collateral": [...],
    "appeal": [...],
    "alternatives": [...],
    "final": [...]
  }
}
```

For each node, return an array of authorities. Each authority must have:
- `style_of_cause`: full case name with year and neutral citation if Canadian, or [VERIFY citation needed] if uncertain
- `court`: enum SCC | ONCA | BCCA | other
- `holding`: 1-2 sentence summary of the holding directly relevant to this node
- `application`: 1-2 sentence note on how to use it in client confirmation

**Required authorities to consider** (verify before relying):
- *R. v. Adgey*, [1975] 2 S.C.R. 426 — guilty plea inquiry mandate
- *R. v. T (R.)* (1992), 17 CR (4th) 247 (ON CA) — five-element inquiry
- *R. v. Hanemaayer*, 2008 ONCA 580 — wrongful guilty plea, withdrawal on appeal
- *R. v. Anthony-Cook*, 2016 SCC 43 — joint submission test (public interest)
- *R. v. Wong*, 2018 SCC 25 — collateral immigration consequences and plea withdrawal
- *R. v. T (N.)*, 2014 SCC 64 — uninformed guilty plea
- *R. v. Stiles*, 2017 BCCA 6 [VERIFY] — BC application
- *R. v. Quick*, 2016 ONCA 95 — manifestly unfair joint submissions
- s. 606 Criminal Code amendments R.S. 2002 c. 13 [VERIFY year]

**Constraints:**
- Hard anti-hallucination: if you are not 100% sure of a citation or holding, write `"[VERIFY]"` in place of the uncertain element.
- Cover at least one binding SCC authority per node where one exists; supplement with ON CA and BC CA where applicable.
- Output ≤ 2000 words. Strict JSON. No prose outside the JSON.

Begin.
