You are senior BC family-law counsel. Build the JSON Schema (draft 2020-12) sub-schema for the **parties + recitals + definitions** sections of a BC FLA separation agreement.

**Output strict JSON only**, with this top-level shape:
```
{
  "$id": "parties.schema.json",
  "definitions": { ... reusable types like Address, Person, Date, Currency ... },
  "properties": {
    "parties": { ... },
    "recitals": { ... },
    "definitions_section": { ... agreement's own definitions block ... }
  },
  "required": [...]
}
```

**Coverage requirements:**

1. **`parties`** — array of exactly 2 spouses. Each spouse must capture:
   - legal name, all former/maiden names, preferred name
   - DOB, SIN (optional, encrypted-at-rest implied), occupation, employer
   - residential address (street, city, province, postal, country)
   - mailing address if different
   - email, phone
   - solicitor name + firm + address + email + phone (their ILA counsel)
   - role label (e.g., "Spouse 1", "Spouse 2") — neutral, not gendered

2. **`relationship_status`** — captures FLA s. 3 spouse classification:
   - `category`: "married" | "unmarried_2yr_or_more" | "unmarried_under_2yr_with_child" | "unmarried_no_property_rights"
   - `marriage_date` (if married) + place
   - `cohabitation_start_date` (if applicable)
   - `separation_date` (FLA-significant — triggers limitation clock)
   - `separation_finality` enum: "date_certain" | "date_disputed" | "date_agreed_for_purposes_of_this_agreement"

3. **`recitals`** — array of recital strings, each with:
   - `key` (snake_case)
   - `text` (the recital prose, parameterized with `{{placeholders}}`)
   - `purpose` (1-line note for the drafter)
   - Cover at minimum: identification, marriage/cohabitation, separation, children of the relationship, intent to settle all matters, prior interim arrangements, ILA received, full disclosure made, agreement intended to be final and binding subject to FLA s. 4 / s. 93.

4. **`definitions_section`** — array of defined terms used in the agreement body:
   - `term`, `definition`, `fla_cross_reference` (or null)
   - Cover: "Family Property", "Excluded Property", "Family Debt", "Separation Date", "Triggering Event" (FLA s. 81), "Children" (s. 146-147), "Child Support Guidelines", "SSAG", "Family Home", "Disclosure Date", "Effective Date".

**Constraints:**
- Use proper JSON Schema 2020-12 keywords: `type`, `properties`, `required`, `items`, `enum`, `pattern`, `format`, `description`.
- Each leaf field must include a `description` field describing what data goes there.
- For dates use `"format": "date"`. For currency use `{ "type": "number", "minimum": 0 }` or a Currency object with `amount` + `currency_code`.
- `[VERIFY]` for any FLA section number you are not 100% certain of.
- ≤ 1500 words. Strict JSON. No prose outside the JSON.

Begin now.
