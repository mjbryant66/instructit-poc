#!/usr/bin/env node
// Render a validated BC FLA Separation Agreement instance to .docx
// Usage: node working/render-docx.mjs [instance.json] [output.docx]
//   defaults: schema/sample-filled.json -> separation-agreement-draft.docx

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const inputPath = process.argv[2] || path.join(ROOT, "schema/sample-filled.json");
const outputPath = process.argv[3] || path.join(ROOT, "separation-agreement-draft.docx");

const docxModule = await import(path.join(__dirname, "node_modules/docx/build/index.cjs"));
const {
  Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType,
  PageBreak, NumberFormat, LevelFormat,
} = docxModule.default || docxModule;

const data = JSON.parse(fs.readFileSync(inputPath, "utf8"));

const para = (text, opts = {}) => new Paragraph({
  children: [new TextRun({ text, ...opts })],
  spacing: { after: 120 },
});

const heading = (text, level = HeadingLevel.HEADING_1) => new Paragraph({
  text,
  heading: level,
  spacing: { before: 240, after: 120 },
});

const center = (text, opts = {}) => new Paragraph({
  alignment: AlignmentType.CENTER,
  children: [new TextRun({ text, ...opts })],
  spacing: { after: 120 },
});

const fullName = (n) =>
  n && typeof n === "object"
    ? [n.first, n.middle, n.last].filter(Boolean).join(" ")
    : (n ?? "[VERIFY]");

const addressLine = (a) =>
  a && typeof a === "object"
    ? `${a.street_line_1}${a.street_line_2 ? ", " + a.street_line_2 : ""}, ${a.city}, ${a.province_or_state} ${a.postal_code}, ${a.country}`
    : "[VERIFY]";

const dateOrPlaceholder = (d) => d || "[VERIFY]";

// === Build content ===
const blocks = [];

// Title
blocks.push(center("SEPARATION AGREEMENT", { bold: true, size: 32 }));
blocks.push(center("Family Law Act, S.B.C. 2011, c. 25", { italics: true, size: 22 }));
blocks.push(para(""));

const [s1, s2] = data.parties || [];
const rs = data.relationship_status || {};

// Parties block
blocks.push(heading("THIS AGREEMENT made this _____ day of _________________, _______"));
blocks.push(para("BETWEEN:", { bold: true }));
blocks.push(para(`${fullName(s1?.legal_name).toUpperCase()}, of ${addressLine(s1?.residential_address)}`));
blocks.push(para('(hereinafter "Spouse 1")', { italics: true }));
blocks.push(para("OF THE FIRST PART"));
blocks.push(para("AND:", { bold: true }));
blocks.push(para(`${fullName(s2?.legal_name).toUpperCase()}, of ${addressLine(s2?.residential_address)}`));
blocks.push(para('(hereinafter "Spouse 2")', { italics: true }));
blocks.push(para("OF THE SECOND PART"));

// Recitals
blocks.push(heading("RECITALS"));
blocks.push(para(`A. The parties were ${rs.category === "married" ? "married" : "in a relationship of cohabitation"} on ${dateOrPlaceholder(rs.marriage_date || rs.cohabitation_start_date)}${rs.marriage_place ? " at " + rs.marriage_place : ""}.`));
blocks.push(para(`B. The parties separated on ${dateOrPlaceholder(rs.separation_date)} and have lived separate and apart since that date.`));
if (data.children && data.children.length) {
  const kidlist = data.children.map(c => `${fullName(c.legal_name)} (born ${dateOrPlaceholder(c.date_of_birth)})`).join("; ");
  blocks.push(para(`C. There ${data.children.length === 1 ? "is one child" : `are ${data.children.length} children`} of the relationship: ${kidlist}.`));
}
blocks.push(para(`D. Each of the parties has received independent legal advice from counsel of their own choosing prior to executing this Agreement.`));
blocks.push(para(`E. Each of the parties has made full and complete financial disclosure to the other.`));
blocks.push(para(`F. The parties intend by this Agreement to settle all matters between them arising out of their relationship and its breakdown, subject to the limited grounds for review set out in s. 4 of the Family Law Act and at common law.`));

// Definitions
blocks.push(heading("ARTICLE 1 — DEFINITIONS"));
blocks.push(para("In this Agreement, unless the context requires otherwise:"));
blocks.push(para('"Family Property" has the meaning given to it in s. 84 of the Family Law Act [VERIFY].'));
blocks.push(para('"Excluded Property" has the meaning given to it in s. 85 of the Family Law Act [VERIFY].'));
blocks.push(para('"Family Debt" has the meaning given to it in s. 86 of the Family Law Act [VERIFY].'));
blocks.push(para(`"Separation Date" means ${dateOrPlaceholder(rs.separation_date)}.`));
blocks.push(para(`"Valuation Date" means ${dateOrPlaceholder(data.valuation_date?.date)}.`));

// Procedural fairness attestations
blocks.push(heading("ARTICLE 2 — INDEPENDENT LEGAL ADVICE AND VOLUNTARINESS"));
const ila = data.procedural_fairness?.independent_legal_advice || {};
const vol = data.procedural_fairness?.voluntariness || {};
blocks.push(para(`2.1 Spouse 1 received independent legal advice from ${ila.spouse_1?.lawyer_name || "[VERIFY]"} of ${ila.spouse_1?.firm || "[VERIFY]"} on ${dateOrPlaceholder(ila.spouse_1?.date)}.`));
blocks.push(para(`2.2 Spouse 2 received independent legal advice from ${ila.spouse_2?.lawyer_name || "[VERIFY]"} of ${ila.spouse_2?.firm || "[VERIFY]"} on ${dateOrPlaceholder(ila.spouse_2?.date)}.`));
blocks.push(para(`2.3 Each party confirms entering into this Agreement voluntarily, free of duress, coercion, or undue influence.`));

// Disclosure
blocks.push(heading("ARTICLE 3 — FINANCIAL DISCLOSURE"));
const fda = data.financial_disclosure_attestations || {};
blocks.push(para(`3.1 ${s1 ? fullName(s1.legal_name) : "Spouse 1"} attests: "${fda.spouse_1?.disclosure_complete_attestation?.attestation_text || "[VERIFY]"}"`));
blocks.push(para(`3.2 ${s2 ? fullName(s2.legal_name) : "Spouse 2"} attests: "${fda.spouse_2?.disclosure_complete_attestation?.attestation_text || "[VERIFY]"}"`));
if (fda.consequences_of_non_disclosure) {
  blocks.push(para(`3.3 ${fda.consequences_of_non_disclosure}`));
}

// Property
blocks.push(heading("ARTICLE 4 — DIVISION OF FAMILY PROPERTY"));
const eq = data.equalization_payment_summary || {};
if (eq.split_basis === "equal" || !eq.split_basis) {
  blocks.push(para(`4.1 The parties agree that family property shall be divided equally between them, consistent with the default rule in s. 81 of the Family Law Act [VERIFY].`));
} else {
  blocks.push(para(`4.1 The parties agree to an unequal division of family property as set out herein. Reasons for unequal division: ${eq.unequal_division_reasons || "[VERIFY]"}.`));
}
if (eq.net_equalization_payment_amount) {
  blocks.push(para(`4.2 An equalization payment in the amount of $${eq.net_equalization_payment_amount.toLocaleString()} shall be paid by ${eq.net_equalization_payor || "[VERIFY]"} to the other party.`));
}

// Support
const ss = data.spousal_support || {};
const cs = data.child_support || {};
blocks.push(heading("ARTICLE 5 — SUPPORT"));
if (cs.payor) {
  blocks.push(para(`5.1 ${cs.payor === "spouse_1" ? "Spouse 1" : "Spouse 2"} shall pay child support in the amount of $${cs.table_amount?.toLocaleString() || "[VERIFY]"} per ${cs.payment_frequency || "month"} pursuant to the Federal Child Support Guidelines, SOR/97-175.`));
}
if (ss.amount) {
  blocks.push(para(`5.2 Spousal support shall be paid in the amount of $${ss.amount?.toLocaleString() || "[VERIFY]"} per ${ss.frequency || "month"} for a duration of ${ss.duration === "indefinite" ? "indefinite" : (ss.duration_years || "[VERIFY]") + " years"}, in accordance with the Spousal Support Advisory Guidelines.`));
}

// Releases
blocks.push(heading("ARTICLE 6 — RELEASES AND WAIVERS"));
blocks.push(para(`6.1 Subject to the terms of this Agreement and to the limited grounds for review under s. 4 of the Family Law Act, the parties release each other from all claims arising from the relationship.`));
blocks.push(para(`6.2 Nothing in this Agreement releases any claim relating to children of the relationship, which remain at all times subject to the court's best-interests jurisdiction under the Family Law Act.`));

// Acknowledgment of set-aside
const sf = data.substantive_fairness || {};
if (sf.acknowledgment_of_setaside_grounds) {
  blocks.push(heading("ARTICLE 7 — ACKNOWLEDGMENT"));
  blocks.push(para(`7.1 ${sf.acknowledgment_of_setaside_grounds}`));
}

// Execution
blocks.push(heading("ARTICLE 8 — EXECUTION"));
blocks.push(para(`IN WITNESS WHEREOF the parties have executed this Agreement as of the date first written above.`));
blocks.push(para(""));
blocks.push(para(`_______________________________`));
blocks.push(para(`${fullName(s1?.legal_name)}`));
blocks.push(para(`(Spouse 1)`));
blocks.push(para(""));
blocks.push(para(`_______________________________`));
blocks.push(para(`${fullName(s2?.legal_name)}`));
blocks.push(para(`(Spouse 2)`));

// Footer note
blocks.push(para(""));
blocks.push(para("---"));
blocks.push(para(`Generated from ${path.basename(inputPath)} via render-docx.mjs.`, { italics: true, size: 18 }));
blocks.push(para(`This is a draft skeleton — not a precedent. Counsel must review every clause, fill all [VERIFY] markers, and add jurisdiction-specific provisions before deployment.`, { italics: true, size: 18 }));

const doc = new Document({
  styles: {
    default: { document: { run: { font: "Calibri", size: 22 } } },
  },
  sections: [{ properties: {}, children: blocks }],
});

const buffer = await Packer.toBuffer(doc);
fs.writeFileSync(outputPath, buffer);
console.log(`✅ Wrote ${outputPath} (${buffer.length} bytes, ${blocks.length} blocks)`);
