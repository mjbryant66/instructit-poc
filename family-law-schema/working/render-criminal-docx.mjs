#!/usr/bin/env node
// Render a validated criminal-guilty-plea instructions instance to .docx.
// Output: a "Confirmed Instructions Memorandum" suitable for the matter file.
// Usage: node working/render-criminal-docx.mjs [instance.json] [output.docx]
//   defaults: schema/criminal/sample-filled.json -> criminal-instructions-memo.docx

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const inputPath = process.argv[2] || path.join(ROOT, "schema/criminal/sample-filled.json");
const outputPath = process.argv[3] || path.join(ROOT, "criminal-instructions-memo.docx");

const docx = await import(path.join(__dirname, "node_modules/docx/build/index.cjs"));
const { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } = docx.default || docx;

const data = JSON.parse(fs.readFileSync(inputPath, "utf8"));

const para = (text, opts = {}) => new Paragraph({
  children: [new TextRun({ text, ...opts })],
  spacing: { after: 120 },
});
const heading = (text, level = HeadingLevel.HEADING_1) => new Paragraph({
  text, heading: level, spacing: { before: 240, after: 120 },
});
const center = (text, opts = {}) => new Paragraph({
  alignment: AlignmentType.CENTER,
  children: [new TextRun({ text, ...opts })],
  spacing: { after: 120 },
});
const yn = (b) => b ? "Yes" : "No";

const blocks = [];
blocks.push(center("CONFIRMED INSTRUCTIONS MEMORANDUM", { bold: true, size: 32 }));
blocks.push(center("Re: Pre-plea client confirmation pursuant to Criminal Code s. 606", { italics: true, size: 22 }));
blocks.push(para(""));

// Matter
const m = data.matter || {};
blocks.push(heading("Matter"));
blocks.push(para(`Court level: ${m.court_level || "[VERIFY]"}`));
blocks.push(para(`Province / registry: ${m.province || "[VERIFY]"} — ${m.registry_or_courthouse || "[VERIFY]"}`));
blocks.push(para(`Information / Indictment: ${m.information_indictment_number || "[VERIFY]"}`));
blocks.push(para(`Scheduled plea date: ${m.scheduled_plea_date || "[VERIFY]"}`));
blocks.push(para(`Presiding officer: ${m.presiding_judicial_officer || "[VERIFY]"}`));

// Accused
const a = data.accused || {};
blocks.push(heading("Accused"));
blocks.push(para(`Name: ${a.full_legal_name || "[VERIFY]"}`));
blocks.push(para(`DOB: ${a.date_of_birth || "[VERIFY]"}`));
blocks.push(para(`Citizenship / immigration: ${a.citizenship_immigration_status || "[VERIFY]"}`));
blocks.push(para(`Preferred language: ${a.preferred_language || "English"}; Interpreter required: ${yn(a.interpreter_required)}`));
blocks.push(para(`Capacity status: ${a.capacity_status || "[VERIFY]"}`));

// Counsel
const c = data.counsel || {};
blocks.push(heading("Counsel"));
blocks.push(para(`${c.name || "[VERIFY]"}, ${c.firm || "[VERIFY]"}`));
blocks.push(para(`${c.law_society || "[VERIFY]"} member ${c.law_society_number || "[VERIFY]"}`));
blocks.push(para(`Role: ${c.role || "defence"}; Retainer scope: ${c.retainer_scope || "[VERIFY]"}; Date retained: ${c.date_retained || "[VERIFY]"}`));

// Charges
blocks.push(heading("Charge(s) and Plea(s)"));
(data.charges || []).forEach((ch, i) => {
  blocks.push(para(`Count ${ch.count_number}: Criminal Code s. ${ch.criminal_code_section} — ${ch.offence_description}`));
  blocks.push(para(`  Election: ${ch.election || "[VERIFY]"}; Maximum: ${ch.maximum_sentence || "[VERIFY]"}; Mandatory minimum: ${ch.mandatory_minimum || "none"}; Plea: ${ch.plea}`));
});

// Agreed facts
const af = data.agreed_facts || {};
blocks.push(heading("Agreed Facts"));
blocks.push(para(`Source: ${af.source || "[VERIFY]"}`));
blocks.push(para(`Reviewed with client on ${af.date_reviewed || "[VERIFY]"}: ${yn(af.reviewed_with_client)}`));
blocks.push(para(`Narrative: ${af.narrative || "[VERIFY]"}`));
if (af.attached_file_ref) blocks.push(para(`Attached: ${af.attached_file_ref}`, { italics: true }));

// Admission
blocks.push(heading("Admission of Essential Elements (s. 606(1.1)(b)(ii))"));
(data.admission?.per_charge || []).forEach(p => {
  blocks.push(para(`Count ${p.count_number}: Essential elements admitted: ${yn(p.essential_elements_admitted)} — "${p.attestation_text || "[VERIFY]"}"`));
});

// Voluntariness
const v = data.voluntariness || {};
blocks.push(heading("Voluntariness (s. 606(1.1)(a))"));
blocks.push(para(`Confirmed voluntary: ${yn(v.confirmed_voluntary)}; No threats: ${yn(v.no_threats)}; No inducement other than on record: ${yn(v.no_inducement_other_than_on_record)}; No substance impairment: ${yn(v.no_substance_impairment)}`));
blocks.push(para(`Attestation: "${v.attestation_text || "[VERIFY]"}"`));
blocks.push(para(`Signed at: ${v.signed_at || "[VERIFY]"}`, { italics: true }));

// Consequences
const cons = data.consequences_acknowledged || {};
blocks.push(heading("Nature and Consequences (s. 606(1.1)(b)(iii))"));
blocks.push(para(`Conviction understood: ${yn(cons.conviction_understood)}; Sentence will follow: ${yn(cons.sentence_will_follow)}; Criminal record understood: ${yn(cons.criminal_record_understood)}`));
blocks.push(para(`Attestation: "${cons.attestation_text || "[VERIFY]"}"`));

// Court not bound
const nb = data.court_not_bound_acknowledged || {};
blocks.push(heading("Court Not Bound by Joint Submission (s. 606(1.1)(b)(iv); R. v. Anthony-Cook, 2016 SCC 43)"));
blocks.push(para(`Joint submission understood: ${yn(nb.joint_submission_understood)}; Anthony-Cook test explained: ${yn(nb.anthony_cook_test_explained)}`));
blocks.push(para(`Attestation: "${nb.attestation_text || "[VERIFY]"}"`));

// Trial rights waived
blocks.push(heading("Waiver of Trial Rights"));
(data.trial_rights_waived?.waivers || []).forEach(w => {
  blocks.push(para(`${w.right_name.replace(/_/g, " ")} — Explained: ${yn(w.explained)}; Waived: ${yn(w.waived)} — "${w.attestation_text}"`));
});

// Sentencing range
const s = data.sentencing_range_discussed || {};
blocks.push(heading("Sentencing Range Discussed"));
blocks.push(para(`Discussed range: low ${s.discussed_low || "[VERIFY]"} — mid ${s.discussed_mid || "n/a"} — high ${s.discussed_high || "[VERIFY]"}`));
blocks.push(para(`Form(s) of sentence discussed: ${(s.discussed_form || []).join(", ") || "[VERIFY]"}`));
blocks.push(para(`Joint submission: ${yn(s.is_joint_submission)}${s.joint_submission_detail ? " — " + s.joint_submission_detail : ""}`));
blocks.push(para(`Prediction-not-guarantee acknowledged: ${yn(s.prediction_not_guarantee_acknowledged)}`));
blocks.push(para(`Attestation: "${s.attestation_text || "[VERIFY]"}"`));

// Collateral
blocks.push(heading("Collateral Consequences (R. v. Wong, 2018 SCC 25)"));
const cc = data.collateral_consequences_acknowledged || {};
const ccCategories = [
  ["immigration","Immigration (IRPA s. 36)"],
  ["employment_licensing","Employment / professional licensing"],
  ["dna_order","DNA order (s. 487.04 [VERIFY])"],
  ["firearms_prohibition","Firearms prohibition (s. 109 / 110)"],
  ["soira_registration","SOIRA registration"],
  ["travel_us","US travel restriction"],
  ["driving_prohibition","Driving prohibition"],
  ["family_cps_implications","Family / CPS implications"],
];
ccCategories.forEach(([key, label]) => {
  const o = cc[key] || {};
  const applicable = key === "dna_order" ? o.designated_offence : o.applicable;
  blocks.push(para(`${label} — Applicable: ${yn(applicable)}; Explained: ${yn(o.explained)}; Acknowledged: ${yn(o.acknowledged)} — "${o.attestation_text || "[VERIFY]"}"`));
});

// Appeal
const ap = data.appeal_rights_acknowledged || {};
blocks.push(heading("Appeal Rights"));
blocks.push(para(`Appeal from plea is limited — explained: ${yn(ap.appeal_from_plea_limited_explained)}`));
blocks.push(para(`Sentence appeal right retained — explained: ${yn(ap.sentence_appeal_right_explained)}`));
blocks.push(para(`Attestation: "${ap.attestation_text || "[VERIFY]"}"`));

// Alternatives
blocks.push(heading("Alternatives Considered"));
const alt = data.alternatives_considered || {};
const altKeys = [
  ["diversion","Diversion / Alternative Measures"],
  ["withdrawal","Withdrawal of charges"],
  ["peace_bond_810","Peace bond (s. 810)"],
  ["discharge_730_absolute","Absolute discharge (s. 730)"],
  ["discharge_730_conditional","Conditional discharge (s. 730)"],
  ["trial","Trial"],
];
altKeys.forEach(([key, label]) => {
  const o = alt[key] || {};
  blocks.push(para(`${label} — Discussed: ${yn(o.discussed)}; Available: ${yn(o.available)} — ${o.why_not_pursued || "n/a"}`));
});

// Final
const f = data.final_instruction_to_plead || {};
blocks.push(heading("Final Instruction"));
blocks.push(para(`Instruction to plead guilty: ${yn(f.instruction_to_plead_guilty)}; Scope: ${f.scope || "[VERIFY]"}`));
if (f.per_count_instructions) {
  f.per_count_instructions.forEach(pc => blocks.push(para(`  Count ${pc.count_number}: plead guilty = ${yn(pc.plead_guilty)}`)));
}
blocks.push(para(`Date of intended plea: ${f.date_of_intended_plea || "[VERIFY]"}`));
blocks.push(para(`Attestation: "${f.attestation_text || "[VERIFY]"}"`));
blocks.push(para(`Signed at: ${f.signed_at || "[VERIFY]"}`, { italics: true }));

// Audit trail
blocks.push(heading("Audit Trail (Hash Chain)"));
const ir = data.instructions_record || {};
blocks.push(para(`Genesis hash: ${ir.chain_genesis_hash || "GENESIS"}`));
blocks.push(para(`Final hash: ${ir.final_hash || "[VERIFY]"}`));
blocks.push(para(`Total entries: ${(ir.entries || []).length}`));
(ir.entries || []).forEach(e => {
  blocks.push(para(`  ${e.sequence}. ${e.node_title} — ${e.decision_label || e.decision} (${e.ts}) — hash ${(e.hash || "").slice(0,16)}…`, { size: 18 }));
});

// Footer
blocks.push(para(""));
blocks.push(para("---"));
blocks.push(para(`Generated from ${path.basename(inputPath)} via render-criminal-docx.mjs.`, { italics: true, size: 18 }));
blocks.push(para(`This memorandum is a draft for the matter file. Counsel must verify every [VERIFY] marker and add jurisdiction-specific provisions before deployment.`, { italics: true, size: 18 }));

const doc = new Document({
  styles: { default: { document: { run: { font: "Calibri", size: 22 } } } },
  sections: [{ properties: {}, children: blocks }],
});
const buffer = await Packer.toBuffer(doc);
fs.writeFileSync(outputPath, buffer);
console.log(`✅ Wrote ${outputPath} (${buffer.length} bytes, ${blocks.length} blocks)`);
