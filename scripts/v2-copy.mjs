import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const startArg = process.argv[2];
const reps = [
  ["Open Horizons Institute", "SIH&S"],
  [
    "Delaware intrastate towing only. Interstate movements are coordinated through properly authorized carriers.",
    "Coverage depends on your service and contract. We will confirm availability.",
  ],
  [
    "Delaware intrastate towing only. Interstate movements coordinated through properly authorized carriers.",
    "Coverage depends on your service and contract. We will confirm availability.",
  ],
  [
    "Delaware intrastate towing only; interstate moves coordinated through authorized carriers.",
    "Coverage depends on your service and contract. We will confirm availability.",
  ],
  ["Delaware intrastate response only.", "Coverage depends on your service and contract. We will confirm availability."],
  ["Delaware intrastate towing only.", "Coverage depends on your service and contract. We will confirm availability."],
  ["Street address in Delaware", "Street address"],
  ["Enter a label and a Delaware-area address.", "Enter a label and an address."],
  [
    "SIH&S provides Delaware mobile, in-person notary service only. Do not upload documents.",
    "Signatures captured in this app are not notarizations. Official notarial records are kept separately by the notary.",
  ],
  [
    "For DOT urine testing, HHS-certified laboratories perform analysis and confirmation testing, and qualified Medical Review Officers review results when applicable. ",
    "",
  ],
  [
    "Laboratory analysis and MRO review are conducted by accredited third parties.",
    "Laboratory analysis is conducted by accredited third parties.",
  ],
];

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    if (name === "node_modules" || name === "dist" || name === ".output" || name === ".git") continue;
    const path = join(dir, name);
    if (statSync(path).isDirectory()) walk(path, out);
    else if (/\.(tsx|ts|html|css|md)$/.test(name)) out.push(path);
  }
  return out;
}

const start = startArg;
let n = 0;
for (const file of walk(start)) {
  const text = readFileSync(file, "utf8");
  let next = text;
  for (const [from, to] of reps) next = next.split(from).join(to);
  if (next !== text) {
    writeFileSync(file, next);
    n += 1;
    console.log(file);
  }
}
console.log("files", n);
