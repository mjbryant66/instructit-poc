You are senior BC family-law counsel. Build the JSON Schema (draft 2020-12) sub-schema for the **children + parenting** portion of a BC FLA separation agreement.

**Output strict JSON only**, top-level shape:
```
{
  "$id": "parenting.schema.json",
  "definitions": { ... Child, ParentingTimeBlock, DecisionDomain ... },
  "properties": {
    "children": { ... },
    "parenting_time": { ... },
    "parental_responsibilities": { ... },
    "communication": { ... },
    "relocation_and_mobility": { ... },
    "travel_and_passports": { ... },
    "review_and_variation": { ... }
  },
  "required": [...]
}
```

**Coverage requirements:**

1. **`children`** — array of children of the relationship. Each child:
   - legal name, DOB, sex/gender (free text, optional), province of birth
   - whether biological, adopted, or one party stands in place of a parent (FLA s. 146 / s. 147 [VERIFY])
   - school + grade + primary residence
   - special needs / medical conditions (optional, free text)

2. **`parenting_time`** — FLA s. 40-42 [VERIFY]. Capture:
   - `schedule_type`: enum "shared_5050" | "primary_with_one_parent" | "split" | "other_specified"
   - `weekly_schedule`: array of blocks { day, start_time, end_time, with_parent }
   - `holiday_schedule`: array of named holidays with allocation rules and rotation
   - `summer_break`, `winter_break`, `spring_break` allocation
   - `transitions`: who transports, location, time-of-day rules
   - `right_of_first_refusal` boolean + threshold hours

3. **`parental_responsibilities`** — FLA s. 41 [VERIFY] decision-making authority. For each domain, allocate to "joint" | "spouse_1" | "spouse_2" | "consult_then_one_decides":
   - health (medical, dental, mental health)
   - education (school choice, IEPs, post-secondary)
   - religion / spiritual upbringing
   - extracurricular activities
   - day-to-day care
   - emergency decisions
   - cultural / heritage matters

4. **`communication`** — protocols between parents and with children:
   - parent-to-parent channel (e.g., OurFamilyWizard, email-only, app of choice)
   - response-time expectation
   - parent-to-child contact during the other parent's time (frequency, mode)
   - prohibition on disparagement clause boolean

5. **`relocation_and_mobility`** — FLA Part 4, Division 6 [VERIFY]:
   - notice period for proposed relocation
   - definition of "relocation" (distance / change of school district)
   - dispute-resolution process before any move

6. **`travel_and_passports`**:
   - international travel consent process
   - passport custody (which parent holds, retrieval process)
   - notification requirements (itinerary, accommodations, return)

7. **`review_and_variation`**:
   - scheduled review dates (e.g., child's age 13, age 16)
   - material-change-in-circumstances clause
   - dispute-resolution path before court

**Constraints:**
- Acknowledge in a top-level `notes` field: "All parenting provisions remain subject to the court's best-interests jurisdiction under FLA s. 37 and may be varied if circumstances change materially."
- Each leaf field has a `description`.
- `[VERIFY]` for uncertain section numbers.
- ≤ 1500 words. Strict JSON only.

Begin now.
