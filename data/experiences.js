/* =====================================================================
   EXPERIENCES — one object per role. Newest first.

   featured: true  → full case study in the "Work" section
                     (title, period, role, intro, built, diagram, stack).
   featured: false → compact row in "Earlier roles" under Projects
                     (title, period, company, location, text, stack).

   Any text can be a plain string or { en: "...", fr: "..." }.
   See README.md for a copy-paste template.
   ===================================================================== */
window.PORTFOLIO = window.PORTFOLIO || {};

window.PORTFOLIO.experiences = {
  section: {
    title: { en: "Agent systems I built for clients",
             fr: "Les systèmes d'agents que j'ai construits pour des clients" },
    text: { en: "Two missions, two different agent problems. For each one: what the system does in plain words, and one click away, how it is wired and why each technology is there.",
            fr: "Deux missions, deux problèmes d'agents différents. Pour chacune : ce que fait le système en termes simples, et en un clic, comment il est câblé et pourquoi chaque technologie est là." }
  },

  items: [

    /* ---------------------------------------------------------------- */
    {
      id: "key2china",
      featured: true,
      company: "Key2China",
      title: { en: "Key2China: market-study assistant", fr: "Key2China : assistant d'études de marché" },
      period: { en: "Sep 2025 – Present", fr: "Sep 2025 – Aujourd'hui" },
      location: { en: "Amsterdam, remote", fr: "Amsterdam, à distance" },
      role: { en: "AI Engineer, Agentic AI, RAG &amp; LLMs · sole AI engineer in a team of 7",
              fr: "AI Engineer, Agentic AI, RAG &amp; LLMs · seul ingénieur IA dans une équipe de 7" },

      intro: [
        { en: "Key2China is a consultancy that helps European companies grow on the Chinese market. Its consultants run market studies, competitive analyses and regulatory research.",
          fr: "Key2China est un cabinet de conseil qui accompagne les entreprises européennes dans leur développement sur le marché chinois. Ses consultants réalisent des études de marché, des analyses concurrentielles et des recherches réglementaires." },
        { en: "The answers they need live in two places: <strong>market reports and policy documents</strong> (PDFs, scans, tables, figures) and <strong>structured client data in SQL</strong>. I designed and shipped the system that answers from both and shows its sources.",
          fr: "Les réponses dont ils ont besoin se trouvent à deux endroits : <strong>les rapports de marché et documents réglementaires</strong> (PDF, scans, tableaux, figures) et <strong>les données clients structurées en SQL</strong>. J'ai conçu et livré le système qui répond à partir des deux et cite ses sources." }
      ],

      // Plain-language bullets, always visible ("In short").
      simple: [
        { en: "A consultant asks a question in plain language and gets an answer drawn from hundreds of reports and the client's own data, with the exact page, table or figure it came from.",
          fr: "Un consultant pose une question en langage courant et obtient une réponse tirée de centaines de rapports et des données du client, avec la page, le tableau ou la figure exacts d'où elle vient." },
        { en: "Hours of reading and cross-checking become minutes, and every answer can be verified.",
          fr: "Des heures de lecture et de recoupement deviennent quelques minutes, et chaque réponse peut être vérifiée." },
        { en: "Everything runs on the client's own servers, so confidential data never leaves the company.",
          fr: "Tout tourne sur les serveurs du client, donc les données confidentielles ne quittent jamais l'entreprise." }
      ],

      // Technical bullets, shown behind the "See the technical work" button.
      built: [
        { en: "<strong>Multi-agent orchestration</strong> in LangGraph: a multimodal RAG agent and a SQL agent, combined into one sourced answer.",
          fr: "<strong>Orchestration multi-agents</strong> avec LangGraph : un agent RAG multimodal et un agent SQL, combinés en une seule réponse sourcée." },
        { en: "<strong>Multimodal ingestion</strong>: parsing, OCR, structure-aware chunking, vision-model extraction, Pydantic normalization.",
          fr: "<strong>Ingestion multimodale</strong> : parsing, OCR, segmentation par structure, extraction par modèle de vision, normalisation Pydantic." },
        { en: "<strong>Hybrid retrieval</strong> in Qdrant (dense + BM25) with reranking and citations down to page, table and figure.",
          fr: "<strong>Recherche hybride</strong> dans Qdrant (dense + BM25) avec reranking et citations jusqu'à la page, au tableau et à la figure." },
        { en: "<strong>Guardrails</strong> with NVIDIA NeMo Guardrails: input rails screen each question before it reaches the agents, output rails check the answer before the consultant sees it.",
          fr: "<strong>Guardrails</strong> avec NVIDIA NeMo Guardrails : les rails d'entrée filtrent chaque question avant qu'elle n'atteigne les agents, les rails de sortie contrôlent la réponse avant que le consultant ne la voie." },
        { en: "<strong>Evaluation dataset</strong> scored on recall@k, MRR, faithfulness and correctness, with every run tracked in MLflow.",
          fr: "<strong>Dataset d'évaluation</strong> mesuré en recall@k, MRR, fidélité et exactitude, avec chaque expérimentation tracée dans MLflow." },
        { en: "<strong>On-premise deployment</strong>: Dockerized FastAPI services, GitHub Actions CI/CD with pytest, monitoring of logs, latency and inference cost.",
          fr: "<strong>Déploiement on-premise</strong> : services FastAPI conteneurisés avec Docker, CI/CD GitHub Actions avec pytest, monitoring des logs, de la latence et des coûts d'inférence." }
      ],

      // Optional architecture diagram. svg = the drawing (English labels),
      // labels = French translation of any <text> label, legend = the line under it.
      diagram: {
        aria: "Key2China architecture: an orchestrator routes a question to a RAG agent and a SQL agent whose tools are served by a local MCP server; an ingestion pipeline feeds Qdrant.",
        viewBox: "0 0 880 350",
        svg: `
        <rect class="group" x="436" y="14" width="432" height="172" rx="10"/>
        <text class="cap" x="448" y="177">TOOLS SERVED BY A LOCAL MCP SERVER</text>

        <rect class="n" x="12" y="64" width="140" height="56" rx="8"/>
        <text class="t" x="26" y="88">Consultant</text><text class="s" x="26" y="106">question</text>

        <rect class="n hot" x="196" y="64" width="200" height="56" rx="8"/>
        <text class="t" x="210" y="88">Orchestrator</text><text class="s" x="210" y="106">LangGraph · Mistral Small</text>

        <rect class="n hot" x="450" y="28" width="150" height="56" rx="8"/>
        <text class="t" x="464" y="52">SQL agent</text><text class="s" x="464" y="70">predefined queries</text>
        <rect class="n hot" x="450" y="100" width="150" height="56" rx="8"/>
        <text class="t" x="464" y="124">RAG agent</text><text class="s" x="464" y="142">multimodal</text>

        <rect class="n cool" x="652" y="28" width="204" height="56" rx="8"/>
        <text class="t" x="666" y="52">Client data</text><text class="s" x="666" y="70">read-only role · SQL views</text>
        <rect class="n cool" x="652" y="100" width="204" height="56" rx="8"/>
        <text class="t" x="666" y="124">Qdrant</text><text class="s" x="666" y="142">dense + BM25 · rerank</text>

        <rect class="n" x="196" y="200" width="200" height="56" rx="8"/>
        <text class="t" x="210" y="224">Sourced answer</text><text class="s" x="210" y="242">page · table · figure</text>

        <path class="e" d="M152 92H194" marker-end="url(#aa)"/>
        <text class="s" x="174" y="52" text-anchor="middle">input rails</text>
        <text class="s" x="306" y="164">output rails</text>
        <path class="e" d="M396 82C425 82 425 56 448 56" marker-end="url(#aa)"/>
        <path class="e" d="M396 102C425 102 425 128 448 128" marker-end="url(#aa)"/>
        <path class="e d" d="M600 56H650" marker-end="url(#ad)"/>
        <path class="e d" d="M600 128H650" marker-end="url(#ad)"/>
        <path class="e" d="M296 120V198" marker-end="url(#aa)"/>

        <text class="cap" x="12" y="296">INGESTION</text>
        <g transform="translate(0,22)">
          <rect class="n" x="12" y="284" width="140" height="40" rx="8"/><text class="t" x="26" y="309">PDF · scans</text>
          <rect class="n" x="176" y="284" width="140" height="40" rx="8"/><text class="t" x="190" y="309">Parsing + OCR</text>
          <rect class="n" x="340" y="284" width="140" height="40" rx="8"/><text class="t" x="354" y="309">Vision model</text>
          <rect class="n" x="504" y="284" width="124" height="40" rx="8"/><text class="t" x="518" y="309">Pydantic chunks</text>
          <rect class="n cool" x="652" y="284" width="204" height="40" rx="8"/><text class="t" x="666" y="309">OpenAI text-embedding</text>
          <path class="e d" d="M152 304H174" marker-end="url(#ad)"/>
          <path class="e d" d="M316 304H338" marker-end="url(#ad)"/>
          <path class="e d" d="M480 304H502" marker-end="url(#ad)"/>
          <path class="e d" d="M628 304H650" marker-end="url(#ad)"/>
          <path class="e d" d="M754 284V136" marker-end="url(#ad)"/>
        </g>`,
        labels: {
          "TOOLS SERVED BY A LOCAL MCP SERVER": "OUTILS SERVIS PAR UN SERVEUR MCP LOCAL",
          "Orchestrator": "Orchestrateur",
          "SQL agent": "Agent SQL",
          "predefined queries": "requêtes prédéfinies",
          "RAG agent": "Agent RAG",
          "Client data": "Données clients",
          "read-only role · SQL views": "rôle lecture seule · vues SQL",
          "Sourced answer": "Réponse sourcée",
          "page · table · figure": "page · tableau · figure",
          "input rails": "rails d'entrée",
          "output rails": "rails de sortie",
          "Vision model": "Modèle de vision",
          "Pydantic chunks": "Chunks Pydantic"
        },
        legend: [
          { color: "agent", text: { en: "agent control flow", fr: "flux de contrôle des agents" } },
          { color: "data",  text: { en: "data and retrieval",  fr: "données et recherche" } }
        ]
      },

      // "Stack, and why each piece is there". kind: "agent" (amber) or "data" (blue).
      stack: [
        { tech: "LangGraph", kind: "agent", tag: "orchestration",
          because: { en: "The orchestrator has to choose between document search, SQL, or both, then merge the results. A graph with explicit nodes and state makes that routing visible, testable and easy to debug node by node.",
                     fr: "L'orchestrateur doit choisir entre la recherche documentaire, le SQL, ou les deux, puis fusionner les résultats. Un graphe avec des nœuds et un état explicites rend ce routage visible, testable et facile à déboguer nœud par nœud." } },
        { tech: "Mistral Small 3.1", kind: "agent", tag: { en: "LLM, self-hosted", fr: "LLM auto-hébergé" },
          because: { en: "Generation is the step that sees client data, so it runs on the client's own hardware. The model handles images and tool calls, and it is small enough to serve on a single GPU with no per-token bill.",
                     fr: "La génération est l'étape qui voit les données clients, elle tourne donc sur l'infrastructure du client. Le modèle gère les images et les appels d'outils, et il est assez léger pour être servi sur un seul GPU, sans facture au token." } },
        { tech: "vLLM", kind: "agent", tag: { en: "inference server", fr: "serveur d'inférence" },
          because: { en: "Continuous batching keeps latency stable when several consultants query at once, and its OpenAI-compatible API means the agents talk to it like any hosted model.",
                     fr: "Le batching continu garde une latence stable quand plusieurs consultants interrogent le système en même temps, et son API compatible OpenAI permet aux agents de l'appeler comme n'importe quel modèle hébergé." } },
        { tech: "OpenAI text-embedding", kind: "data", tag: "embeddings",
          because: { en: "The corpus mixes English, Chinese and European-language documents. These embeddings handle multilingual retrieval well out of the box, so I did not have to host and tune a second model just for vectors.",
                     fr: "Le corpus mélange des documents en anglais, en chinois et en langues européennes. Ces embeddings gèrent bien la recherche multilingue sans réglage, ce qui m'a évité d'héberger et d'ajuster un second modèle uniquement pour les vecteurs." } },
        { tech: "Qdrant, dense + BM25", kind: "data", tag: { en: "hybrid search", fr: "recherche hybride" },
          because: { en: "Market and policy documents are full of exact terms: product names, regulation numbers, company names. Dense vectors catch meaning, BM25 catches the exact string. Qdrant does both in one self-hosted engine.",
                     fr: "Les documents de marché et réglementaires sont pleins de termes exacts : noms de produits, numéros de réglementation, noms d'entreprises. Les vecteurs denses captent le sens, BM25 capte la chaîne exacte. Qdrant fait les deux dans un seul moteur auto-hébergé." } },
        { tech: "Reranking", kind: "data", tag: { en: "retrieval precision", fr: "précision de la recherche" },
          because: { en: "Hybrid search brings back a wide candidate set. A reranker reorders it so only the most relevant chunks reach the model's context, which improves faithfulness.",
                     fr: "La recherche hybride ramène un large ensemble de candidats. Un reranker le réordonne pour que seuls les chunks les plus pertinents arrivent dans le contexte du modèle, ce qui améliore la fidélité." } },
        { tech: "OCR + vision model", kind: "data", tag: "ingestion",
          because: { en: "Much of the value sits in tables, charts and scanned pages. Text-only parsing drops it. A vision model turns those elements into content that can be indexed and cited.",
                     fr: "Une grande partie de la valeur se trouve dans les tableaux, les graphiques et les pages scannées. Un parsing purement textuel les perd. Un modèle de vision transforme ces éléments en contenu indexable et citable." } },
        { tech: "MCP servers", kind: "agent", tag: { en: "tool layer", fr: "couche d'outils" },
          because: { en: "Tools live behind a local MCP server instead of inside agent code. Agents discover them at runtime, and a tool can change or be reused without touching the graph.",
                     fr: "Les outils vivent derrière un serveur MCP local plutôt que dans le code des agents. Les agents les découvrent à l'exécution, et un outil peut évoluer ou être réutilisé sans toucher au graphe." } },
        { tech: "NeMo Guardrails", kind: "agent", tag: "NVIDIA · guardrails",
          because: { en: "It is open source and runs next to the self-hosted model, so the safety layer stays on-premise too. Programmable rails keep the assistant on its market-study scope, stop prompt-injection and jailbreak attempts at the input, and check the output before it is returned.",
                     fr: "Il est open source et tourne à côté du modèle auto-hébergé, donc la couche de sécurité reste elle aussi on-premise. Des rails programmables maintiennent l'assistant dans son périmètre d'études de marché, bloquent les tentatives de prompt injection et de jailbreak en entrée, et contrôlent la sortie avant qu'elle ne soit renvoyée." } },
        { tech: "Parameterized SQL", kind: "agent", tag: "SQL agent",
          because: { en: "The agent picks from predefined queries and fills validated parameters, executed with a read-only role on dedicated views. No free-form text-to-SQL means no injection path and no surprise queries.",
                     fr: "L'agent choisit parmi des requêtes prédéfinies et renseigne des paramètres validés, exécutés avec un rôle en lecture seule sur des vues dédiées. Pas de text-to-SQL libre, donc aucune voie d'injection et aucune requête surprise." } },
        { tech: "Pydantic", kind: "agent", tag: { en: "schemas", fr: "schémas" },
          because: { en: "Every chunk, tool argument and structured output has one typed schema. Malformed model output fails at the boundary instead of deep inside the pipeline.",
                     fr: "Chaque chunk, argument d'outil et sortie structurée a un schéma typé unique. Une sortie de modèle mal formée échoue à la frontière plutôt qu'au cœur du pipeline." } },
        { tech: "MLflow", kind: "agent", tag: { en: "experiment tracking", fr: "suivi d'expériences" },
          because: { en: "Each change to a prompt, a model or a retrieval setting is a tracked run with its metrics, so a regression on recall@k or faithfulness is caught before it ships.",
                     fr: "Chaque changement de prompt, de modèle ou de paramètre de recherche est une expérimentation tracée avec ses métriques, donc une régression sur le recall@k ou la fidélité est détectée avant la mise en production." } },
        { tech: "FastAPI · Docker · GitHub Actions", kind: "agent", tag: { en: "delivery", fr: "mise en production" },
          because: { en: "Async services for I/O-heavy agent calls, containers so the on-premise install matches development exactly, and a pipeline that runs pytest on every push.",
                     fr: "Des services asynchrones pour des appels d'agents très dépendants des I/O, des conteneurs pour que l'installation on-premise soit identique au développement, et un pipeline qui lance pytest à chaque push." } }
      ]
    },

    /* ---------------------------------------------------------------- */
    {
      id: "wixar",
      featured: true,
      company: "WiXar",
      title: { en: "WiXar: text-to-3D agent system", fr: "WiXar : système d'agents text-to-3D" },
      period: { en: "Feb 2025 – Aug 2025", fr: "Fév 2025 – Août 2025" },
      location: "Paris",
      role: { en: "AI Engineer · one of 2 AI engineers in a team of 6",
              fr: "AI Engineer · l'un des 2 ingénieurs IA dans une équipe de 6" },

      intro: [
        { en: "WiXar publishes immersive-learning and AI software. Building a VR scene means modelling its 3D objects by hand, which is slow work for 3D artists.",
          fr: "WiXar édite des logiciels d'apprentissage immersif et d'intelligence artificielle. Construire une scène VR impose de modéliser ses objets 3D à la main, un travail long pour les artistes 3D." },
        { en: "I built a <strong>multi-agent system that generates 3D models from a natural-language description</strong>. It plans the object, builds it in Blender through code, checks the mesh, and repairs its own mistakes.",
          fr: "J'ai construit un <strong>système multi-agents qui génère des modèles 3D à partir d'une description en langage naturel</strong>. Il planifie l'objet, le construit dans Blender par le code, contrôle le maillage et corrige ses propres erreurs." }
      ],

      simple: [
        { en: "A 3D artist describes an object in one sentence, and the system builds the 3D model on its own.",
          fr: "Un artiste 3D décrit un objet en une phrase, et le système construit le modèle 3D tout seul." },
        { en: "It checks its own result and fixes its mistakes before handing the model over.",
          fr: "Il contrôle son propre résultat et corrige ses erreurs avant de livrer le modèle." },
        { en: "Modelling that took hours by hand takes minutes, so the team spends its time on the scenes themselves.",
          fr: "Une modélisation qui prenait des heures à la main prend quelques minutes, et l'équipe consacre son temps aux scènes elles-mêmes." }
      ],

      built: [
        { en: "<strong>Four agents</strong> in a LangGraph graph: planning, generation, validation, and correction on error.",
          fr: "<strong>Quatre agents</strong> dans un graphe LangGraph : planification, génération, validation et correction sur erreur." },
        { en: "<strong>Shared typed state</strong>: request, plan, geometry parameters, generated objects and validation errors, read and updated at every node.",
          fr: "<strong>État partagé typé</strong> : requête, plan, paramètres géométriques, objets générés et erreurs de validation, lus et mis à jour à chaque nœud." },
        { en: "<strong>Agent tools</strong>: a library of Blender Python functions (create and transform objects, modifiers, export) called with validated arguments.",
          fr: "<strong>Outils des agents</strong> : une bibliothèque de fonctions Python Blender (création et transformation d'objets, modificateurs, export) appelées avec des arguments validés." },
        { en: "<strong>Automatic mesh checks</strong> with Trimesh. Detected errors go back into the state and trigger the correction loop.",
          fr: "<strong>Contrôle automatique des maillages</strong> avec Trimesh. Les erreurs détectées sont réinjectées dans l'état et déclenchent la boucle de correction." },
        { en: "<strong>FastAPI service</strong>, containerized with Docker.",
          fr: "<strong>Service FastAPI</strong>, conteneurisé avec Docker." }
      ],

      diagram: {
        aria: "WiXar architecture: planner, generator, validator and corrector agents around a shared Pydantic state, with a correction loop.",
        viewBox: "0 0 880 290",
        svg: `
        <rect class="n" x="12" y="40" width="130" height="56" rx="8"/>
        <text class="t" x="26" y="64">Prompt</text><text class="s" x="26" y="82">natural language</text>
        <rect class="n hot" x="176" y="40" width="130" height="56" rx="8"/>
        <text class="t" x="190" y="64">Planner</text><text class="s" x="190" y="82">GPT-4.1</text>
        <rect class="n hot" x="340" y="40" width="150" height="56" rx="8"/>
        <text class="t" x="354" y="64">Generator</text><text class="s" x="354" y="82">calls bpy tools</text>
        <rect class="n hot" x="524" y="40" width="150" height="56" rx="8"/>
        <text class="t" x="538" y="64">Validator</text><text class="s" x="538" y="82">Trimesh checks</text>
        <rect class="n cool" x="738" y="40" width="130" height="56" rx="8"/>
        <text class="t" x="752" y="64">3D model</text><text class="s" x="752" y="82">exported</text>
        <rect class="n hot" x="432" y="140" width="150" height="56" rx="8"/>
        <text class="t" x="446" y="164">Corrector</text><text class="s" x="446" y="182">fixes from errors</text>

        <path class="e" d="M142 68H174" marker-end="url(#aa)"/>
        <path class="e" d="M306 68H338" marker-end="url(#aa)"/>
        <path class="e" d="M490 68H522" marker-end="url(#aa)"/>
        <path class="e d" d="M674 68H736" marker-end="url(#ad)"/>
        <text class="s" x="690" y="58">valid</text>
        <path class="e" d="M620 96C620 140 610 168 584 168" marker-end="url(#aa)"/>
        <text class="s" x="628" y="134">errors</text>
        <path class="e" d="M432 168C400 168 395 140 395 98" marker-end="url(#aa)"/>
        <text class="s" x="340" y="134">retry</text>

        <path class="dot" d="M241 96V236"/><path class="dot" d="M360 96V236"/><path class="dot" d="M507 196V236"/><path class="dot" d="M655 96V236"/>
        <rect class="n" x="176" y="236" width="692" height="40" rx="8"/>
        <text class="t" x="190" y="261">Shared state</text>
        <text class="s" x="290" y="261">request · plan · geometry params · generated objects · validation errors</text>`,
        labels: {
          "natural language": "langage naturel",
          "Planner": "Planificateur",
          "Generator": "Générateur",
          "calls bpy tools": "outils bpy",
          "Validator": "Validateur",
          "Trimesh checks": "contrôles Trimesh",
          "3D model": "Modèle 3D",
          "exported": "exporté",
          "Corrector": "Correcteur",
          "fixes from errors": "corrige les erreurs",
          "valid": "valide",
          "errors": "erreurs",
          "retry": "relance",
          "Shared state": "État partagé",
          "request · plan · geometry params · generated objects · validation errors": "requête · plan · paramètres géométriques · objets générés · erreurs de validation"
        },
        legend: [
          { color: "agent", text: { en: "agent control flow", fr: "flux de contrôle des agents" } },
          { color: "data",  text: { en: "validated output", fr: "sortie validée" } },
          { color: "line",  text: { en: "reads and writes shared state", fr: "lit et écrit l'état partagé" } }
        ]
      },

      stack: [
        { tech: "GPT-4.1", kind: "agent", tag: "LLM",
          because: { en: "Turning a sentence into geometry needs reliable function calling and strict instruction following. GPT-4.1 produces well-formed tool calls against typed schemas, and its long context holds the plan, the state and the error history in one pass.",
                     fr: "Transformer une phrase en géométrie demande un function calling fiable et un respect strict des consignes. GPT-4.1 produit des appels d'outils bien formés face à des schémas typés, et son long contexte contient le plan, l'état et l'historique des erreurs en un seul passage." } },
        { tech: "LangGraph", kind: "agent", tag: { en: "multi-agent graph", fr: "graphe multi-agents" },
          because: { en: "Generation rarely works on the first try, so the flow needs a cycle: validate, correct, regenerate. LangGraph supports loops and conditional edges natively, which a linear chain does not.",
                     fr: "La génération réussit rarement du premier coup, le flux a donc besoin d'un cycle : valider, corriger, régénérer. LangGraph gère nativement les boucles et les arêtes conditionnelles, ce qu'une chaîne linéaire ne permet pas." } },
        { tech: "Pydantic shared state", kind: "agent", tag: "coordination",
          because: { en: "Agents do not pass free text to each other. They read and write one typed state, so each node knows exactly what the previous one produced and the correction loop has structured errors to work from.",
                     fr: "Les agents ne s'échangent pas de texte libre. Ils lisent et écrivent un seul état typé : chaque nœud sait exactement ce que le précédent a produit, et la boucle de correction dispose d'erreurs structurées." } },
        { tech: "Blender Python API (bpy)", kind: "agent", tag: { en: "agent tools", fr: "outils des agents" },
          because: { en: "Blender runs headless and gives real modelling operations. Exposing a curated set of functions as tools, instead of letting the model write arbitrary scripts, keeps every action valid and repeatable.",
                     fr: "Blender tourne en mode headless et offre de vraies opérations de modélisation. Exposer un ensemble choisi de fonctions comme outils, plutôt que laisser le modèle écrire des scripts arbitraires, garde chaque action valide et reproductible." } },
        { tech: "Validated tool arguments", kind: "agent", tag: { en: "guardrail", fr: "garde-fou" },
          because: { en: "Dimensions, positions and modifier settings are checked by Pydantic before they reach Blender. A bad value is rejected with a clear message the agent can act on.",
                     fr: "Dimensions, positions et réglages de modificateurs sont vérifiés par Pydantic avant d'atteindre Blender. Une mauvaise valeur est rejetée avec un message clair que l'agent peut exploiter." } },
        { tech: "Trimesh", kind: "data", tag: { en: "mesh validation", fr: "validation du maillage" },
          because: { en: "Whether a mesh is manifold, watertight and the right size is a measurable fact. Checking it in code gives the agents an objective signal instead of asking an LLM to judge its own output.",
                     fr: "Qu'un maillage soit manifold, étanche et aux bonnes dimensions est un fait mesurable. Le vérifier par le code donne aux agents un signal objectif, au lieu de demander à un LLM de juger sa propre sortie." } },
        { tech: "LangChain", kind: "agent", tag: { en: "LLM integration", fr: "intégration LLM" },
          because: { en: "Model wrappers and tool bindings for OpenAI, so the graph nodes stay focused on agent logic.",
                     fr: "Wrappers de modèles et liaison des outils pour OpenAI, pour que les nœuds du graphe restent centrés sur la logique des agents." } },
        { tech: "FastAPI · Docker", kind: "agent", tag: { en: "delivery", fr: "mise en production" },
          because: { en: "The 3D team calls generation through one API. Docker packages Blender, its Python environment and the service together, so it runs the same everywhere.",
                     fr: "L'équipe 3D appelle la génération via une seule API. Docker embarque Blender, son environnement Python et le service, pour un fonctionnement identique partout." } }
      ]
    },

    /* ---------------------------------------------------------------- */
    {
      id: "cesi",
      featured: false,
      company: "CESI",
      location: "Paris",
      period: { en: "Mar 2024 – Sep 2024", fr: "Mars 2024 – Sep 2024" },
      title: { en: "Data Scientist, Researcher", fr: "Data Scientist, Chercheur" },
      text: { en: "Built predictive ML and deep learning models reaching 97% accuracy, with automated data pipelines covering preprocessing, feature engineering, quality checks and retraining validation. Co-wrote and published a scientific paper in English.",
              fr: "Développement de modèles prédictifs de ML et de deep learning atteignant 97 % de précision, avec des pipelines de données automatisés : preprocessing, feature engineering, contrôle qualité et validation des cycles de réentraînement. Co-rédaction et publication d'un papier scientifique en anglais." },
      stack: "Python · Scikit-learn · TensorFlow · feature engineering · Git"
    },

    /* ---------------------------------------------------------------- */
    {
      id: "itexc",
      featured: false,
      company: "ITEXC",
      location: { en: "Algiers", fr: "Alger" },
      period: { en: "Feb 2022 – Feb 2024", fr: "Fév 2022 – Fév 2024" },
      title: { en: "Backend Developer", fr: "Développeur Backend" },
      text: { en: "Designed and maintained high-throughput REST APIs and Python microservices. Built complete CI/CD pipelines and ran containerized deployments on Docker and Kubernetes.",
              fr: "Conception et maintenance d'APIs REST à fort débit et de microservices Python. Mise en place de pipelines CI/CD complets et de déploiements conteneurisés sur Docker et Kubernetes." },
      stack: "Python · Flask · REST · microservices · Docker · Kubernetes · AWS · GCP · GitLab CI"
    }

  ]
};
