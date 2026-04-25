You are senior Canadian criminal-defence counsel drafting the **Antic ladder** reference for a counsel-facing bail cheat-sheet. Output strict JSON describing the ladder of liberty constriction from least to most restrictive, anchored on *R. v. Antic*, 2017 SCC 27 and subsequent jurisprudence.

**Output strict JSON only**, top-level shape:
```
{
  "$id": "bail-ladder.json",
  "primary_authority": "R. v. Antic, 2017 SCC 27",
  "supporting_authorities": [
    { "style": "R. v. Zora, 2020 SCC 14", "principle": "Mens rea for breach of bail conditions; conditions must be reasonably necessary." },
    { "style": "R. v. Myers, 2019 SCC 18", "principle": "Bail review timelines under s. 525 are mandatory." },
    { "style": "R. v. St-Cloud, 2015 SCC 27", "principle": "Tertiary ground for detention — s. 515(10)(c)." },
    { "style": "R. v. Tunney, 2018 ONSC 961", "principle": "Application of Antic ladder in Ontario practice." }
  ],
  "constitutional_anchor": {
    "charter": "s. 11(e) — right not to be denied reasonable bail without just cause"
  },
  "rungs_least_to_most_restrictive": [
    {
      "rung": 1,
      "form_of_release": "Release without conditions on an undertaking (CC s. 515(1) default)",
      "criminal_code_anchor": "s. 515(1)",
      "antic_principle": "Default form of release. Justice must release on an undertaking unless the Crown shows cause for a more onerous form.",
      "counsel_position_to_argue": "Default applies; Crown has not shown cause for any condition.",
      "common_conditions_added_at_this_rung": []
    },
    { "rung": 2, "form_of_release": "Undertaking with conditions", ... },
    { "rung": 3, "form_of_release": "Recognizance without surety, no deposit", ... },
    { "rung": 4, "form_of_release": "Recognizance without surety, with cash deposit (CC s. 515(2)(d) — only if non-resident or far from court)", ... },
    { "rung": 5, "form_of_release": "Recognizance with surety", ... },
    { "rung": 6, "form_of_release": "Recognizance with surety AND cash deposit", ... },
    { "rung": 7, "form_of_release": "Detention", ... }
  ],
  "antic_rules_to_argue": [
    { "rule": "Each rung must be inadequate before the next is imposed.", "source": "Antic ¶67" },
    { "rule": "Cash deposits should not be ordered in lieu of surety where surety is available.", "source": "Antic ¶67(c)–(d)" },
    { "rule": "Conditions must be no more onerous than necessary.", "source": "Antic ¶67(j); Zora ¶24" },
    { "rule": "Sureties should be the last resort before detention.", "source": "Antic ¶67(g)" }
  ],
  "three_grounds_for_detention": [
    { "ground": "primary", "section": "s. 515(10)(a)", "test": "Detention necessary to ensure attendance in court." },
    { "ground": "secondary", "section": "s. 515(10)(b)", "test": "Detention necessary for the protection or safety of the public, including the substantial likelihood of reoffending or interference with the administration of justice." },
    { "ground": "tertiary", "section": "s. 515(10)(c)", "test": "Detention necessary to maintain confidence in the administration of justice — St-Cloud factors: strength of Crown's case, gravity of offence, circumstances of commission, potential length of imprisonment." }
  ],
  "operational_steps_for_counsel": [
    "Open at rung 1; force the Crown to show cause for each step up.",
    "If the Crown insists on conditions, demand specific factual nexus per Zora.",
    "If a surety is proposed, confirm it is necessary (not merely useful) before agreeing.",
    "Cash deposit only if accused is a non-resident or 200+ km from court (s. 515(2)(d) [VERIFY]).",
    "Detention only if all lesser forms fail; respond to each ground separately."
  ]
}
```

For each rung 2–7, include: `form_of_release`, `criminal_code_anchor`, `antic_principle`, `counsel_position_to_argue`, `common_conditions_added_at_this_rung` (array of strings — typical conditions associated with that rung).

**Constraints:**
- Use `[VERIFY]` for any paragraph number, section number, or holding you are not 100% confident on.
- Output ≤ 2000 words. Strict JSON. No prose outside the JSON.

Begin.
