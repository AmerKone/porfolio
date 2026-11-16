/* =====================================================================
   SKILLS — the "Toolbox" section. One group per line of chips.
   name can be a plain string or { en: "...", fr: "..." }.
   ===================================================================== */
window.PORTFOLIO = window.PORTFOLIO || {};

window.PORTFOLIO.skills = {
  section: {
    title: { en: "Toolbox", fr: "Boîte à outils" },
    text: { en: "What I reach for, grouped by the job it does.", fr: "Ce que j'utilise, regroupé par usage." }
  },

  groups: [
    { name: { en: "Agents &amp; orchestration", fr: "Agents &amp; orchestration" },
      items: ["LangGraph", "LangChain", "CrewAI", "MCP", "Tool calling", "Structured outputs", "NeMo Guardrails", "Prompt engineering"] },

    { name: { en: "RAG &amp; retrieval", fr: "RAG &amp; recherche" },
      items: ["Multimodal RAG", "Hybrid search", "Reranking", "Qdrant", "Pinecone", "OpenSearch", "FAISS", "OCR", "recall@k · MRR · faithfulness"] },

    { name: { en: "LLMs &amp; serving", fr: "LLMs &amp; inférence" },
      items: ["Mistral", "GPT", "Llama", "VLMs", "vLLM", "Ollama", "OpenAI API", "Hugging Face", "Fine-tuning"] },

    { name: { en: "ML &amp; deep learning", fr: "ML &amp; deep learning" },
      items: ["PyTorch", "TensorFlow", "Scikit-learn", "Transformers", "NLP", "Vision", "Diffusion (DDPM)", "Time series"] },

    { name: "Backend",
      items: ["Python", "FastAPI", "Flask", "Pydantic", "REST", "GraphQL", "Microservices", "SQL", "MongoDB"] },

    { name: { en: "MLOps &amp; cloud", fr: "MLOps &amp; cloud" },
      items: ["Docker", "Kubernetes", "GitHub Actions", "GitLab CI", "MLflow", "Temporal", "AWS", "Azure", "GCP", "pytest"] }
  ]
};
