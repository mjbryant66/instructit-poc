You are senior Canadian criminal-defence counsel drafting reference data for a counsel-facing bail cheat-sheet covering **local bail-supervision and surety programs**. The tool needs to know which program is available at which courthouse so counsel can propose the right alternative to a personal surety.

**Output strict JSON only**, top-level shape:
```
{
  "$id": "bail-local-programs.json",
  "by_jurisdiction": {
    "ON": {
      "province": "Ontario",
      "programs": [
        {
          "key": "snake_case_key",
          "name": "Toronto Bail Program (TBP)",
          "operator": "Operating non-profit / agency",
          "eligibility": "Plain-English summary of who is eligible (residency, charge type, etc.)",
          "courthouses_served": ["Toronto Old City Hall", "..."],
          "program_features": "Supervision intensity, reporting cadence, curfews, treatment referrals",
          "how_to_propose": "Counsel mechanics: when to mention, what materials needed, timing of intake",
          "url_or_locator": "[VERIFY]"
        },
        { ... JHS Peel (Brampton) ... },
        { ... Ottawa Bail Verification & Supervision ... },
        { ... others where appropriate ... }
      ]
    },
    "BC": {
      "province": "British Columbia",
      "programs": [
        { ... BC Bail Supervision Program (provincial) ... },
        { ... Vancouver Provincial Court mental-health bail / DTC referrals ... }
      ]
    }
  },
  "general_notes": [
    "Programs are alternatives to a surety; counsel should canvass them at rung 5 of the Antic ladder before agreeing to a personal surety.",
    "Eligibility is local — confirm with the courthouse duty counsel office on the day.",
    "Some programs require a pre-bail interview the same day; flag to court."
  ],
  "counsel_practice_tips": [
    "[VERIFY] best-practice tips drawn from CLA / CBA Criminal Justice Section guidance",
    "Always confirm program intake hours; if after hours, propose program enrollment as a condition with intake the next business day.",
    "Where surety AND program are both proposed, frame program as the lesser-restrictive default per Antic."
  ]
}
```

**Coverage requirements:**
- Ontario: at least Toronto Bail Program, John Howard Society Peel/Brampton bail program, Ottawa Bail Verification & Supervision, Hamilton bail program, plus any other major program at major courthouses [VERIFY exact program names].
- British Columbia: BC Bail Supervision Program (administered through John Howard Society or provincial Corrections — verify operator), any specialty courts (Drug Treatment, Indigenous, mental-health) with bail-relevant streams.
- Federal Indigenous-specific bail considerations under R. v. Gladue, [1999] 1 SCR 688 and R. v. Ipeelee, 2012 SCC 13, even though not "programs", as practice tips.

**Constraints:**
- `[VERIFY]` extensively — local-program details change frequently and you are not 100% sure of current operating particulars.
- Output ≤ 1500 words. Strict JSON. No prose outside the JSON.

Begin.
