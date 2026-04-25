# InstructIT — Criminal Guilty Plea (browser POC)

Pre-plea client confirmation tool, anchored on Criminal Code s. 606 plea
inquiry duties and defence counsel obligations.

## What it does

Walks the accused client through 11 confirmation nodes before counsel
enters the plea:

1. **intro** — about this confirmation
2. **charge** — understanding of the charge(s) and essential elements (s. 606(1.1)(b)(i))
3. **admission** — admission of essential elements (s. 606(1.1)(b)(ii))
4. **voluntariness** — plea is voluntary (s. 606(1.1)(a))
5. **consequences** — nature and consequences (s. 606(1.1)(b)(iii))
6. **not_bound** — court not bound by Crown / defence agreement (s. 606(1.1)(b)(iv); *R. v. Anthony-Cook*, 2016 SCC 43)
7. **trial_rights** — waiver of presumption of innocence, burden of proof, cross-examination, defence evidence, silence, forum
8. **sentencing_range** — discussed range is prediction not guarantee
9. **collateral** — IRPA s. 36 immigration, professional licensing, DNA, firearms ss. 109/110, SOIRA, US travel, driving, family/CPS
10. **appeal_rights** — appeal limited from a guilty plea, sentence appeal retained
11. **alternatives** — diversion, withdrawal, peace bond (s. 810), discharge (s. 730), trial
12. **final** — instruction to enter guilty plea on the record

## Output

Time-stamped, SHA-256 hash-chained audit log. Each step records:
- node id and title
- decision (agree / disagree / defer / acknowledged) with optional note
- ISO timestamp
- prev_hash + hash (genesis hash: GENESIS)

Print or Save-as-PDF for the matter file.

## Why

LSO complaint risk on guilty pleas is high precisely because the inquiry
under s. 606 is verbal and not always memorialized contemporaneously beyond
the court transcript. A standalone client-confirmed instructions record,
captured before the plea is entered, is independent evidence that counsel
addressed each statutory and common-law obligation.

## Running

Open `index.html` directly in any browser — `file://` works. No build, no
server needed. The supporting authorities (jurisprudence + bar-guidance)
are embedded inline as `<script type="application/json">` blocks; the
external `data/` files remain as the source of truth (re-inline by editing
the HTML or with a small build step).

localStorage key: `instructit_criminal_guilty_plea_v1`.

## Future modules (per the InstructIT v2 roadmap in PAI memory)

- Bail instructions (release conditions, surety obligations)
- Refusal of Crown offer / election to proceed to trial
- Judge vs jury election (indictable offences)
- s. 11(b) Charter delay motion instructions
- Sentencing submissions instructions
- Appeal instructions (notice, abandonment)
