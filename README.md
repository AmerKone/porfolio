# Portfolio

Static site, no build step. Open `index.html` in a browser or push to GitHub Pages.

```
index.html            shell of the page (head, nav, language toggle)
css/style.css         all styles
assets/portrait.jpg   photo
data/profile.js       name, intro, buttons, hero trace, nav, education, contact
data/experiences.js   jobs and missions
data/projects.js      personal projects (Coachin, MCP Agent, SentimentAI)
data/skills.js        the Toolbox chips
js/render.js          builds the page from /data (no content inside)
js/main.js            language toggle, scroll progress, nav highlight
```

Every text can be a plain string (same in both languages) or `{ en: "...", fr: "..." }`.
HTML like `<strong>` is allowed inside strings.

## Add an experiences

Open `data/experiences.js` and add an object to `items` (newest first).

**Compact row** (shown under "More projects and earlier roles"):

```js
{
  id: "acme",
  featured: false,
  company: "Acme",
  location: { en: "Lyon", fr: "Lyon" },
  period: { en: "Jan 2026 – Jun 2026", fr: "Jan 2026 – Juin 2026" },
  title: { en: "AI Engineer", fr: "Ingénieur IA" },
  text: { en: "What you did, in two or three sentences.", fr: "Ce que vous avez fait." },
  stack: "Python · LangGraph · Docker"
},
```

**Full case study** (shown in the "Work" section): same fields plus `featured: true`, a `role`
line, `intro` paragraphs, `simple` bullets (plain language, always visible under "In short"),
and the technical part shown behind the "See the technical work" button: `built` bullets,
and optionally `facts`, `diagram`, `tools` and `stack`.
Copy the Key2China or WiXar object and edit it. Fields you leave out are simply not displayed.

```js
{
  id: "acme",
  featured: true,
  company: "Acme",
  title: { en: "Acme: support assistant", fr: "Acme : assistant support" },
  period: { en: "Jan 2026 – Present", fr: "Jan 2026 – Aujourd'hui" },
  location: { en: "Lyon, remote", fr: "Lyon, à distance" },
  role: { en: "AI Engineer · team of 4", fr: "Ingénieur IA · équipe de 4" },
  intro: [ { en: "Paragraph 1", fr: "Paragraphe 1" }, { en: "Paragraph 2", fr: "Paragraphe 2" } ],
  simple: [ { en: "What it does, for a non-technical reader.", fr: "Ce que ça fait, pour un lecteur non technique." } ],
  built: [ { en: "<strong>Thing</strong> you built.", fr: "<strong>Chose</strong> construite." } ],
  stack: [
    { tech: "LangGraph", kind: "agent", tag: "orchestration",
      because: { en: "Why it is there.", fr: "Pourquoi elle est là." } }
  ]
},
```

`kind` is `"agent"` (amber) or `"data"` (blue). A `diagram` is an inline SVG string with a
`labels` map for the French version of its text; see the existing ones.

## Add a project

Same idea in `data/projects.js`. `featured: false` gives a card; `featured: true` gives the
project its own section (like Coachin). To add that section to the top menu, add
`{ label: "Name", href: "#<id>" }` to `nav` in `data/profile.js`.
