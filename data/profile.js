/* =====================================================================
   PROFILE — who you are, the hero block, navigation, contact, education.
   Any text can be a plain string (same in both languages) or an object
   { en: "...", fr: "..." }. HTML tags like <strong> are allowed.
   ===================================================================== */
window.PORTFOLIO = window.PORTFOLIO || {};

window.PORTFOLIO.profile = {
  firstName: "Ameur",
  lastName: "Kaouane",
  brand: "ameur.kaouane",                 // text next to the ">" in the top-left corner
  pageTitle: "Ameur Kaouane Portfolio",   // browser tab title

  eyebrow: { en: "AI Engineer · Agentic AI &amp; RAG · Paris",
             fr: "Ingénieur IA · IA agentique &amp; RAG · Paris" },

  lede: {
    en: "I build <strong>multi-agent systems and multimodal RAG pipelines</strong> that hold up in production: LangGraph/ADK orchestration, tools served over MCP, hybrid retrieval with cited sources, guardrails, evaluation datasets, and the FastAPI, Docker and CI/CD around them.",
    fr: "Je conçois des <strong>systèmes multi-agents et des pipelines RAG multimodaux</strong> qui tiennent en production : orchestration LangGraph, outils servis via MCP, recherche hybride avec sources citées, guardrails, datasets d'évaluation, et tout ce qui les entoure en FastAPI, Docker et CI/CD."
  },

  // Buttons under the intro text. primary: true gives the amber button.
  buttons: [
    { label: { en: "See the systems", fr: "Voir les systèmes" }, href: "#work", primary: true },
    { label: "GitHub",   href: "https://www.github.com/AmerKone" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/kaouaneameur" }
  ],

  portrait: { src: "assets/portrait.jpg", alt: "Portrait of Ameur Kaouane" },
  tag: { big: { en: "3 years", fr: "3 ans" },
         text: { en: "Python, backend and AI systems", fr: "Python, backend et systèmes d'IA" } },

  // The animated "run trace" under the hero. kind: "agent" (amber) or "data" (blue).
  trace: {
    aria: "Example run of the Key2China agent system",
    title: { en: "run · market-study assistant", fr: "exécution · assistant d'études de marché" },
    stack: "LangGraph · MCP · Qdrant · NeMo Guardrails",
    steps: [
      { key: "question", kind: "agent", text: { en: "Which product categories show sales potential in Europe, and who supplies them?",
                                                fr: "Quelles catégories de produits ont un potentiel de vente en Europe, et qui les fournit ?" } },
      { key: "guard",    kind: "agent", text: { en: "NeMo Guardrails input rails <em>pass</em>",
                                                fr: "Rails d'entrée NeMo Guardrails <em>validés</em>" } },
      { key: "route",    kind: "agent", text: { en: "orchestrator <em>selects</em> rag_agent + sql_agent",
                                                fr: "l'orchestrateur <em>sélectionne</em> rag_agent + sql_agent" } },
      { key: "retrieve", kind: "data",  text: { en: "Qdrant hybrid search <em>(dense + BM25)</em>, then rerank",
                                                fr: "Recherche hybride Qdrant <em>(dense + BM25)</em>, puis reranking" } },
      { key: "sql",      kind: "data",  text: { en: "predefined parameterized query <em>on a read-only view</em>",
                                                fr: "requête paramétrée prédéfinie <em>sur une vue en lecture seule</em>" } },
      { key: "answer",   kind: "agent", text: { en: "cross-referenced and sourced <em>(page, table, figure)</em>",
                                                fr: "réponse croisée et sourcée <em>(page, tableau, figure)</em>" } }
    ]
  },

  // Top navigation. href must match a section id:
  //   #work = featured experiences, #projects = other projects + earlier roles,
  //   #stack = skills, #contact, or the id of a featured project (e.g. #coachin).
  nav: [
    { label: { en: "Work", fr: "Missions" }, href: "#work" },
    { label: "Coachin",  href: "#coachin" },
    { label: { en: "Projects", fr: "Projets" }, href: "#projects" },
    { label: "Stack",    href: "#stack" },
    { label: "Contact",  href: "#contact" }
  ],

  // Shown at the bottom of the Stack section.
  education: [
    { title: { en: "Master in Artificial Intelligence", fr: "Master en Intelligence Artificielle" },
      sub: "Université Paris-Saclay" },
    { title: { en: "Engineering degree, AI &amp; Data", fr: "Diplôme d'ingénieur, IA &amp; Data" },
      sub: "École Supérieure d'Informatique (ESI)" },
    { title: "AWS Certified ML Engineer, Associate",
      sub: { en: "French and English fluent · Arabic native", fr: "Français et anglais courants · Arabe natif" } }
  ],

  contact: {
    title: { en: "Have an agent or RAG system to build?", fr: "Un système d'agents ou de RAG à construire ?" },
    text: { en: "I am based in Paris and open to AI Engineer roles and missions around agentic AI, RAG and LLM systems.",
            fr: "Je suis basé à Paris et ouvert aux postes et missions d'AI Engineer autour de l'IA agentique, du RAG et des systèmes LLM." },
    links: [
      { label: "Email",    value: "kaouaneamer26@gmail.com",      href: "mailto:kaouaneamer26@gmail.com" },
      { label: { en: "Phone", fr: "Téléphone" }, value: "+33 7 53 60 94 46", href: "tel:+33753609446" },
      { label: "GitHub",   value: "github.com/AmerKone",          href: "https://www.github.com/AmerKone" },
      { label: "LinkedIn", value: "linkedin.com/in/kaouaneameur", href: "https://www.linkedin.com/in/kaouaneameur" }
    ]
  },

  footer: "Ameur Kaouane · AI Engineer · Paris, France"
};
