/* Smoke test: load the data files and the renderer in a fake browser,
   render the page in EN and FR, and fail on anything missing or broken. */
const fs = require("fs");
const path = require("path");
const { JSDOM } = require("jsdom");

const root = path.join(__dirname, "..");
const read = (p) => fs.readFileSync(path.join(root, p), "utf8");

const html = read("index.html").replace(/<script src="[^"]+"><\/script>/g, "");
const dom = new JSDOM(html, { runScripts: "outside-only" });
const { window } = dom;

for (const f of ["data/profile.js", "data/experiences.js", "data/projects.js", "data/skills.js", "js/render.js"]) {
  window.eval(read(f));
}

let failures = 0;
const fail = (msg) => { failures++; console.error("FAIL  " + msg); };
const ok = (msg) => console.log("ok    " + msg);

// Data sanity
const D = window.PORTFOLIO;
for (const key of ["profile", "experiences", "projects", "skills"]) {
  if (!D[key]) fail(`data/${key}.js did not define PORTFOLIO.${key}`);
}
const ids = new Set();
for (const it of [...D.experiences.items, ...D.projects.items]) {
  if (!it.id) fail(`item without id: ${JSON.stringify(it.title)}`);
  else if (ids.has(it.id)) fail(`duplicate id "${it.id}"`);
  ids.add(it.id);
  if (!it.title) fail(`"${it.id}" has no title`);
  if (it.featured && (!it.intro || !it.built)) fail(`featured "${it.id}" needs intro and built`);
}
ok(`${D.experiences.items.length} experiences, ${D.projects.items.length} projects, ${D.skills.groups.length} skill groups`);

// Referenced files exist
for (const src of [D.profile.portrait && D.profile.portrait.src, "css/style.css"].filter(Boolean)) {
  if (!fs.existsSync(path.join(root, src))) fail(`missing file ${src}`);
}

// Render in both languages
for (const lang of ["en", "fr"]) {
  window.PortfolioRender.render(lang);
  const doc = window.document;
  const body = doc.body.innerHTML;

  if (body.includes("undefined") || body.includes("[object Object]")) fail(`${lang}: "undefined" or "[object Object]" in output`);
  if (doc.documentElement.lang !== lang) fail(`${lang}: <html lang> not set`);

  for (const n of D.profile.nav) {
    if (!doc.querySelector(n.href)) fail(`${lang}: nav link ${n.href} points to nothing`);
  }
  for (const it of [...D.experiences.items.filter((e) => e.featured), ...D.projects.items.filter((p) => p.featured)]) {
    if (!doc.getElementById("case-" + it.id)) fail(`${lang}: case "${it.id}" not rendered`);
  }
  const sections = doc.querySelectorAll("section[id]").length;
  const svgs = doc.querySelectorAll(".diagram svg").length;
  if (sections < 3) fail(`${lang}: only ${sections} sections rendered`);
  ok(`${lang}: ${sections} sections, ${svgs} diagrams, ${body.length} chars`);
}

if (failures) { console.error(`\n${failures} check(s) failed`); process.exit(1); }
console.log("\nAll checks passed");
