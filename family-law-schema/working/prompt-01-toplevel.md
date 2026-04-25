You are senior BC family-law counsel drafting a JSON Schema (draft 2020-12) **data model** that captures every parameter a comprehensive BC separation agreement governed by the *Family Law Act*, S.B.C. 2011, c. 25 ("FLA") needs to fully express.

**Your task:** Enumerate the **top-level sections** of a comprehensive BC separation agreement. For each section, give:
- `key`: a snake_case JSON key
- `title`: human-readable title
- `purpose`: 1-sentence purpose
- `fla_anchor`: the FLA Part(s) or section(s) it implements (or "common law / contract" / "Divorce Act" if applicable)
- `optional`: true/false (e.g., parenting is optional if no children)
- `depends_on`: array of other section keys, if any

**Constraints:**
- Output strict JSON only — a top-level object `{ "sections": [ ... ] }`. No prose before or after.
- Cover every standard section: parties, recitals, children identification, parenting (time + decision-making + communication), child support, spousal support, property division (family/excluded), debt allocation, real property specifics, pensions, life insurance, tax treatment, releases, dispute resolution, jurisdiction, severability, entire agreement, conditions precedent, execution + witness + ILA certificates, schedules.
- Include a `validity_preconditions` section that captures the procedural-fairness factors the court tests under *Rick v. Brandsema* 2009 SCC 10, *Miglin v. Miglin* 2003 SCC 24, *Hartshorne v. Hartshorne* 2004 SCC 22, and FLA s. 4.
- Include a section for `financial_disclosure_attestations` (Form F8-equivalent affirmations from each party).
- Mark sections that change depending on whether parties were married vs. unmarried "spouses" under FLA s. 3.
- ≤ 1500 words total output. Strict JSON.

**Anti-hallucination rule:** If a citation or statute reference is not 100% certain, write `"[VERIFY]"` in place of the cite. Do not invent section numbers.

Begin output now.
