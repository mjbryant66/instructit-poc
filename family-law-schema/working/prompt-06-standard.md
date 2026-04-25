You are senior BC family-law counsel. Build the JSON Schema (draft 2020-12) sub-schema for the **standard contract clauses + execution + ILA certificates** of a BC FLA separation agreement.

**Output strict JSON only**, top-level shape:
```
{
  "$id": "standard-clauses.schema.json",
  "definitions": { WitnessBlock, ILACertificate, NotaryBlock },
  "properties": {
    "releases_and_waivers": { ... },
    "indemnities": { ... },
    "dispute_resolution": { ... },
    "governing_law_and_jurisdiction": { ... },
    "entire_agreement_clause": { ... },
    "severability": { ... },
    "amendments_and_counterparts": { ... },
    "notice_provisions": { ... },
    "conditions_precedent": { ... },
    "default_and_remedies": { ... },
    "execution_block": { ... },
    "ila_certificates": { ... },
    "schedules_index": { ... }
  }
}
```

**Coverage requirements:**

1. **`releases_and_waivers`**:
   - mutual general release of claims arising from the relationship (subject to FLA s. 4 / s. 93)
   - specific releases by category: property, support, parenting, estate (wills variation), tort, intentional infliction
   - acknowledgment that releases are intended to be final and binding
   - explicit reservation: "Nothing in this agreement releases claims relating to children, which remain always subject to the court's best-interests jurisdiction."
   - WESA s. 60 wills variation acknowledgment for spousal claims

2. **`indemnities`**:
   - mutual indemnity for debts allocated under property/debt sections
   - indemnity for tax exposure on allocated assets
   - indemnity for breach of disclosure (each party's representation that disclosure was full)
   - notice and defence rights on indemnified claims

3. **`dispute_resolution`**:
   - mandatory mediation as first step (mediator selection process, cost-sharing)
   - arbitration option (Notice to Mediate Regulation [VERIFY] / arbitrator selection / governing rules)
   - court as last resort (BC Supreme Court, named registry)
   - cost rules in DR (e.g., loser pays mediator fees if frivolous)

4. **`governing_law_and_jurisdiction`**:
   - Family Law Act, Province of British Columbia
   - exclusive jurisdiction of BC courts
   - FLA s. 198(5) limitation suspension during qualifying family DR — explicit acknowledgment

5. **`entire_agreement_clause`**:
   - this written agreement supersedes all prior oral or written agreements
   - no representations relied on outside the four corners

6. **`severability`**: standard severability clause; if any provision is unenforceable, remainder stands.

7. **`amendments_and_counterparts`**:
   - amendments only in writing signed by both parties (with ILA on the amendment)
   - electronic signatures permitted under BC *Electronic Transactions Act* [VERIFY]
   - executed in counterparts, each a duplicate original

8. **`notice_provisions`**:
   - method (registered mail, email with read receipt, courier)
   - addresses for service (each party's last known address per parties section)
   - deemed-receipt rules (e.g., 5 business days after posting)

9. **`conditions_precedent`** (if any):
   - approval by court (e.g., for incapable spouse or where spouse is undischarged bankrupt)
   - completion of property transfers before agreement is binding
   - confirmation of ILA receipt
   - financial disclosure exchange certified complete

10. **`default_and_remedies`**:
    - what constitutes default (missed support payment, failure to transfer, etc.)
    - cure periods
    - acceleration of obligations
    - filing under FLA s. 44 / s. 148 [VERIFY] for enforcement
    - FMEP enrollment for support enforcement

11. **`execution_block`**:
    - signature block per party with date, location
    - witness block per party (witness name, occupation, address, signature)
    - notarization (optional, recommended for real property transfers)

12. **`ila_certificates`** — separate appended certificate per party:
    - lawyer name, firm, address, LSBC member number
    - date of advice, location, duration (in minutes)
    - confirmation that:
      - lawyer reviewed entire agreement with client
      - client appeared to understand terms and consequences
      - client appeared free of duress, coercion, undue influence
      - client received reasonable opportunity to ask questions and have them answered
      - client confirmed full disclosure had been made
      - lawyer is independent (not also acting for the other spouse)
    - lawyer's signature

13. **`schedules_index`**:
    - Schedule A: Asset and Debt Inventory
    - Schedule B: Financial Disclosure (Form F8 equivalents, per spouse)
    - Schedule C: Parenting Schedule Calendar
    - Schedule D: Insurance and Beneficiary Designations
    - Schedule E: Real Property Transfer Documents
    - Schedule F: Pension Division Forms
    - Schedule G: SSAG Calculation Output

**Constraints:**
- Each leaf has `description`.
- `[VERIFY]` for any statute reference not 100% certain.
- ≤ 2000 words. Strict JSON only.

Begin now.
