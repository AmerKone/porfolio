/* =====================================================================
   PROJECTS — one object per project.

   featured: true  → gets its own full section (id = project id, so you
                     can link to it from the nav with "#<id>"). Uses
                     headline, summary, title, link, role, intro, built,
                     facts, diagram, tools, stack.
   featured: false → small card in "More projects" (title, text, why, link).

   Any text can be a plain string or { en: "...", fr: "..." }.
   ===================================================================== */
window.PORTFOLIO = window.PORTFOLIO || {};

window.PORTFOLIO.projects = {
  section: {
    title: { en: "More projects and earlier roles", fr: "Autres projets et expériences précédentes" },
    text: { en: "The backend and data science years are why the agent systems above ship with tests, pipelines and containers.",
            fr: "Les années de backend et de data science expliquent pourquoi les systèmes d'agents ci-dessus sont livrés avec des tests, des pipelines et des conteneurs." }
  },

  items: [

    /* ---------------------------------------------------------------- */
    {
      id: "coachin",
      featured: true,
      // Section header
      headline: { en: "Coachin, an AI fitness coach you can talk to", fr: "Coachin, un coach fitness IA à qui l'on parle" },
      summary: { en: "My personal project, built end to end and deployed on AWS. It writes training programs, logs workouts and meals by voice, suggests the next weights, and screens every message for medical red flags.",
                 fr: "Mon projet personnel, construit de bout en bout et déployé sur AWS. Il rédige des programmes d'entraînement, enregistre séances et repas à la voix, suggère les prochaines charges et analyse chaque message pour repérer les signaux d'alerte médicaux." },
      // Card
      title: "Coachin",
      link: { label: "github.com/AmerKone/Coachin", href: "https://github.com/AmerKone/Coachin" },
      role: { en: "Personal project · full stack · design, build, tests, deployment",
              fr: "Projet personnel · full stack · conception, développement, tests, déploiement" },

      intro: [
        { en: "You talk or type. The coach answers with context from <strong>your profile, your program, your logs and a curated knowledge base</strong>, and it can act for you: log a set, log a meal, record your weight, swap an exercise, or look up any past workout.",
          fr: "Vous parlez ou vous écrivez. Le coach répond avec le contexte de <strong>votre profil, votre programme, vos historiques et une base de connaissances sélectionnée</strong>, et il peut agir pour vous : enregistrer une série, un repas, votre poids, remplacer un exercice ou retrouver n'importe quelle séance passée." },
        { en: "Facts about the user come from SQL through tools. Training and nutrition knowledge comes from RAG. Keeping those two apart is what stops the coach from inventing numbers.",
          fr: "Les faits sur l'utilisateur viennent du SQL via les outils. Les connaissances en entraînement et en nutrition viennent du RAG. Séparer les deux est ce qui empêche le coach d'inventer des chiffres." }
      ],

      built: [
        { en: "<strong>Tool-calling agent</strong> with 10 tools and a bounded reasoning loop, plus an audit log of every call.",
          fr: "<strong>Agent à appels d'outils</strong> avec 10 outils et une boucle de raisonnement bornée, plus un journal d'audit de chaque appel." },
        { en: "<strong>Personalized programs</strong> generated from a 102-exercise library, limited to the user's equipment and adapted to injuries.",
          fr: "<strong>Programmes personnalisés</strong> générés à partir d'une bibliothèque de 102 exercices, limités au matériel de l'utilisateur et adaptés à ses blessures." },
        { en: "<strong>Progressive overload</strong>: next session's weight and reps suggested with double progression and a plain reason.",
          fr: "<strong>Surcharge progressive</strong> : charge et répétitions de la prochaine séance suggérées par double progression, avec une explication claire." },
        { en: "<strong>Safety guardrails</strong> on input and output: emergency symptoms, injuries and risky nutrition get fixed, pre-written responses.",
          fr: "<strong>Guardrails de sécurité</strong> en entrée et en sortie : symptômes d'urgence, blessures et nutrition à risque reçoivent des réponses fixes, pré-écrites." },
        { en: "<strong>CI/CD</strong>: tests on every push, then images built, published and deployed to EC2 automatically.",
          fr: "<strong>CI/CD</strong> : tests à chaque push, puis images construites, publiées et déployées sur EC2 automatiquement." }
      ],

      // Big numbers row (optional)
      facts: [
        { value: "10",  label: { en: "agent tools", fr: "agent tools" } },
        { value: "137", label: { en: "automated tests", fr: "tests automatisés" } },
        { value: "14",  label: { en: "PostgreSQL tables", fr: "tables PostgreSQL" } },
        { value: "102", label: { en: "exercises in the library", fr: "exercices dans la bibliothèque" } }
      ],

      diagram: {
        aria: "Coachin architecture: voice or text goes through Whisper and a safety screen to the coach agent, which calls tools on PostgreSQL and retrieves from Pinecone, then the reply is checked and spoken.",
        viewBox: "0 0 880 250",
        svg: `
        <rect class="n" x="12" y="40" width="110" height="56" rx="8"/>
        <text class="t" x="24" y="64">Voice or text</text><text class="s" x="24" y="82">Streamlit</text>
        <rect class="n" x="146" y="40" width="110" height="56" rx="8"/>
        <text class="t" x="158" y="64">Whisper</text><text class="s" x="158" y="82">speech to text</text>
        <rect class="n hot" x="280" y="40" width="140" height="56" rx="8"/>
        <text class="t" x="292" y="64">Safety screen</text><text class="s" x="292" y="82">rules + classifier</text>
        <rect class="n hot" x="444" y="40" width="150" height="56" rx="8"/>
        <text class="t" x="456" y="64">Coach agent</text><text class="s" x="456" y="82">GPT-4o · tool loop</text>
        <rect class="n hot" x="618" y="40" width="120" height="56" rx="8"/>
        <text class="t" x="630" y="64">Output check</text><text class="s" x="630" y="82">unsafe advice</text>
        <rect class="n" x="762" y="40" width="106" height="56" rx="8"/>
        <text class="t" x="774" y="64">Reply</text><text class="s" x="774" y="82">text + TTS</text>

        <rect class="n" x="100" y="170" width="190" height="56" rx="8"/>
        <text class="t" x="112" y="194">Pre-written response</text><text class="s" x="112" y="212">when a red flag is found</text>
        <rect class="n cool" x="330" y="170" width="180" height="56" rx="8"/>
        <text class="t" x="342" y="194">10 tools</text><text class="s" x="342" y="212">PostgreSQL · user data</text>
        <rect class="n cool" x="540" y="170" width="190" height="56" rx="8"/>
        <text class="t" x="552" y="194">Knowledge base</text><text class="s" x="552" y="212">Pinecone · top 4 chunks</text>

        <path class="e" d="M122 68H144" marker-end="url(#aa)"/>
        <path class="e" d="M256 68H278" marker-end="url(#aa)"/>
        <path class="e" d="M420 68H442" marker-end="url(#aa)"/>
        <path class="e" d="M594 68H616" marker-end="url(#aa)"/>
        <path class="e" d="M738 68H760" marker-end="url(#aa)"/>
        <path class="e" d="M320 96C320 140 250 130 215 168" marker-end="url(#aa)"/>
        <path class="e d" d="M490 96C490 135 440 135 425 168" marker-end="url(#ad)"/>
        <path class="e d" d="M548 96C548 135 615 135 630 168" marker-end="url(#ad)"/>`,
        labels: {
          "Voice or text": "Voix ou texte",
          "speech to text": "voix vers texte",
          "Safety screen": "Filtre sécurité",
          "rules + classifier": "règles + classifieur",
          "Coach agent": "Agent coach",
          "Output check": "Contrôle final",
          "unsafe advice": "conseils risqués",
          "Reply": "Réponse",
          "text + TTS": "texte + TTS",
          "Pre-written response": "Réponse pré-écrite",
          "when a red flag is found": "si un signal d'alerte",
          "10 tools": "10 outils",
          "PostgreSQL · user data": "PostgreSQL · utilisateur",
          "Knowledge base": "Base de connaissances"
        },
        legend: [
          { color: "agent", text: { en: "agent control flow", fr: "flux de contrôle des agents" } },
          { color: "data",  text: { en: "data and retrieval",  fr: "données et recherche" } }
        ]
      },

      // Chips list (optional). kind: "write" (amber border) or "read" (blue border).
      tools: {
        label: { en: "The 10 tools the agent can call", fr: "Les 10 outils que l'agent peut appeler" },
        items: [
          { name: "log_workout_set", kind: "write" },
          { name: "log_meal", kind: "write" },
          { name: "log_body_weight", kind: "write" },
          { name: "swap_exercise", kind: "write" },
          { name: "get_todays_workout", kind: "read" },
          { name: "get_nutrition_summary", kind: "read" },
          { name: "get_exercise_history", kind: "read" },
          { name: "get_progress_summary", kind: "read" },
          { name: "get_workouts", kind: "read" },
          { name: "get_monthly_report", kind: "read" }
        ],
        legend: [
          { color: "agent", text: { en: "writes data", fr: "écrit des données" } },
          { color: "data",  text: { en: "reads data",  fr: "lit des données" } }
        ]
      },

      stack: [
        { tech: "GPT-4o", kind: "agent", tag: { en: "chat, tools, structured outputs", fr: "chat, outils, sorties structurées" },
          because: { en: "The coach needs dependable tool calling and schema-bound outputs for programs and meal estimates. GPT-4o does both and is fast enough for a spoken conversation.",
                     fr: "Le coach a besoin d'appels d'outils fiables et de sorties contraintes par schéma pour les programmes et les estimations de repas. GPT-4o fait les deux et reste assez rapide pour une conversation à l'oral." } },
        { tech: "Whisper + TTS", kind: "agent", tag: { en: "voice", fr: "voix" },
          because: { en: "Nobody types between sets. Speech in and speech out make logging hands-free, and Whisper copes with gym noise and accents.",
                     fr: "Personne ne tape entre deux séries. La voix en entrée et en sortie rend la saisie mains libres, et Whisper résiste au bruit de la salle et aux accents." } },
        { tech: "text-embedding-3-small", kind: "data", tag: "embeddings",
          because: { en: "The knowledge base is small and curated, so a compact 1536-dimension model retrieves well at a very low cost.",
                     fr: "La base de connaissances est petite et sélectionnée, donc un modèle compact à 1536 dimensions retrouve bien l'information pour un coût très faible." } },
        { tech: "Pinecone", kind: "data", tag: { en: "vector store", fr: "base vectorielle" },
          because: { en: "Managed and serverless, so there is no vector database to run on a small EC2 instance. Metadata filters restrict retrieval by topic: training, nutrition or safety.",
                     fr: "Managé et serverless, donc aucune base vectorielle à faire tourner sur une petite instance EC2. Les filtres de métadonnées restreignent la recherche par thème : entraînement, nutrition ou sécurité." } },
        { tech: "LangChain", kind: "data", tag: { en: "RAG pipeline", fr: "pipeline RAG" },
          because: { en: "Document loading, Markdown-aware splitting and the vector-store interface are ready-made, which let me spend time on the agent instead of plumbing.",
                     fr: "Chargement des documents, découpage adapté au Markdown et interface de base vectorielle sont prêts à l'emploi, ce qui m'a permis de consacrer mon temps à l'agent plutôt qu'à la plomberie." } },
        { tech: "Score threshold on retrieval", kind: "data", tag: { en: "grounding", fr: "ancrage" },
          because: { en: "Chunks under a cosine score of 0.25 are dropped. When nothing relevant comes back, the agent is told there is no reference material and does not bluff.",
                     fr: "Les chunks sous un score cosinus de 0,25 sont écartés. Quand rien de pertinent ne remonte, l'agent est informé qu'il n'a pas de référence et ne bluffe pas." } },
        { tech: "PostgreSQL", kind: "data", tag: { en: "user data", fr: "données utilisateur" },
          because: { en: "Workouts, sets, meals and programs are relational and need exact answers. A personal record is a SQL query, never a guess from an LLM.",
                     fr: "Séances, séries, repas et programmes sont relationnels et exigent des réponses exactes. Un record personnel est une requête SQL, jamais une supposition d'un LLM." } },
        { tech: "Rules + LLM classifier", kind: "agent", tag: { en: "safety, two layers", fr: "sécurité, deux couches" },
          because: { en: "Deterministic rules catch known red flags instantly and predictably. The classifier covers phrasings rules miss. Replies are also screened, for example to block advice under 1,200 kcal a day.",
                     fr: "Des règles déterministes détectent les signaux d'alerte connus, instantanément et de façon prévisible. Le classifieur couvre les formulations que les règles manquent. Les réponses sont aussi contrôlées, par exemple pour bloquer un conseil sous 1 200 kcal par jour." } },
        { tech: "Bounded tool loop", kind: "agent", tag: { en: "agent control", fr: "contrôle de l'agent" },
          because: { en: "The agent stops after 5 tool iterations. That caps cost and latency and prevents a confused model from looping.",
                     fr: "L'agent s'arrête après 5 itérations d'outils. Cela plafonne le coût et la latence et empêche un modèle désorienté de boucler." } },
        { tech: "FastAPI + Pydantic", kind: "agent", tag: "backend",
          because: { en: "Typed request and response models, JWT auth and automatic API docs. The frontend talks to the backend only through this API.",
                     fr: "Modèles de requête et de réponse typés, authentification JWT et documentation d'API automatique. Le frontend ne parle au backend qu'à travers cette API." } },
        { tech: "Streamlit", kind: "agent", tag: "frontend",
          because: { en: "A full multipage UI with microphone input and Plotly charts in pure Python, so my time went into the AI and backend.",
                     fr: "Une interface multipage complète avec micro et graphiques Plotly en pur Python, pour consacrer mon temps à l'IA et au backend." } },
        { tech: "pytest with fakes", kind: "agent", tag: { en: "testing", fr: "tests" },
          because: { en: "OpenAI, Pinecone and audio are replaced by fakes, so the suite runs free and deterministic in CI. Each database test rolls back its transaction.",
                     fr: "OpenAI, Pinecone et l'audio sont remplacés par des fakes, donc la suite tourne gratuitement et de façon déterministe en CI. Chaque test de base de données annule sa transaction." } },
        { tech: "Docker · GitHub Actions · EC2", kind: "agent", tag: { en: "deployment", fr: "déploiement" },
          because: { en: "Every push to main is tested against PostgreSQL, built into images, pushed to the registry and deployed over SSH with no manual step.",
                     fr: "Chaque push sur main est testé contre PostgreSQL, construit en images, poussé vers le registre et déployé en SSH, sans étape manuelle." } },
        { tech: "Caddy", kind: "agent", tag: "HTTPS",
          because: { en: "Browsers only allow microphone access over HTTPS. Caddy gets and renews certificates automatically.",
                     fr: "Les navigateurs n'autorisent le micro qu'en HTTPS. Caddy obtient et renouvelle les certificats automatiquement." } }
      ]
    },

    /* ---------------------------------------------------------------- */
    {
      id: "mcp-agent",
      featured: false,
      title: "MCP Agent",
      text: { en: "A Model Context Protocol architecture that separates LLM agents from their integrations: dedicated MCP servers for external APIs, tools and vector databases, with dynamic capability discovery.",
              fr: "Une architecture Model Context Protocol qui découple les agents LLM de leurs intégrations : serveurs MCP dédiés aux APIs externes, aux outils et aux bases vectorielles, avec découverte dynamique des capacités." },
      why: { title: { en: "Why MCP", fr: "Pourquoi MCP" },
             text: { en: "An integration written once as a server is reusable by any agent in any project, and can change without redeploying the agents.",
                     fr: "Une intégration écrite une fois sous forme de serveur est réutilisable par n'importe quel agent, dans n'importe quel projet, et peut évoluer sans redéployer les agents." } }
    },

    /* ---------------------------------------------------------------- */
    {
      id: "sentimentai",
      featured: false,
      title: "SentimentAI",
      text: { en: "End-to-end multilingual sentiment analysis: fine-tuned Hugging Face Transformers (BERT, mBERT), a FastAPI backend on Azure and a React frontend.",
              fr: "Analyse de sentiment multilingue de bout en bout : fine-tuning de Transformers Hugging Face (BERT, mBERT), backend FastAPI sur Azure et frontend React." },
      why: { title: { en: "Why mBERT", fr: "Pourquoi mBERT" },
             text: { en: "One multilingual model shares what it learns across languages, so there is no separate model to train and serve per language.",
                     fr: "Un seul modèle multilingue partage ce qu'il apprend entre les langues, donc pas de modèle distinct à entraîner et à servir par langue." } }
    }

  ]
};
