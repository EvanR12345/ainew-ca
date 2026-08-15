import type { Article } from "../../lib/articles";

export type SignalLocale = "en" | "fr";

export type SignalCluster = {
  id: "models" | "infrastructure" | "policy" | "research";
  label: string;
  nodes: string[];
};

export type SignalStory = {
  slug: string;
  title: string;
  dek: string;
  category: string;
  date: string;
  displayDate: string;
  readTime: string;
  image: string;
  imageAlt: string;
  href: string;
  clusterIndex: number;
};

export type SignalCopy = {
  eyebrow: string;
  title: string;
  tagline: string;
  intro: string;
  mapLabel: string;
  storyLabel: string;
  flowTitle: string;
  flowBody: string;
  exitTitle: string;
  exitBody: string;
  exitAction: string;
  previous: string;
  next: string;
  readStory: string;
  articleLanguage: string;
  fallbackTitle: string;
};

export type SignalData = {
  locale: SignalLocale;
  copy: SignalCopy;
  clusters: SignalCluster[];
  stories: SignalStory[];
};

const featuredSlugs = [
  "openai-academic-researchers-program-analysis",
  "nvidia-gtc-2026-inference-factory-debrief",
  "canada-ai-transparency-consultation-what-to-know",
  "gemini-robotics-embodied-ai",
] as const;

const clusters: Record<SignalLocale, SignalCluster[]> = {
  en: [
    { id: "models", label: "Models", nodes: ["OpenAI", "Anthropic", "Gemini", "Llama"] },
    { id: "infrastructure", label: "Infrastructure", nodes: ["NVIDIA", "AMD", "Data centres", "Chips"] },
    { id: "policy", label: "Policy", nodes: ["Canada", "United States", "European Union", "Standards"] },
    { id: "research", label: "Research", nodes: ["Agents", "Robotics", "Multimodal", "Reasoning"] },
  ],
  fr: [
    { id: "models", label: "Modèles", nodes: ["OpenAI", "Anthropic", "Gemini", "Llama"] },
    { id: "infrastructure", label: "Infrastructure", nodes: ["NVIDIA", "AMD", "Centres de données", "Puces"] },
    { id: "policy", label: "Politiques", nodes: ["Canada", "États-Unis", "Union européenne", "Normes"] },
    { id: "research", label: "Recherche", nodes: ["Agents", "Robotique", "Multimodal", "Raisonnement"] },
  ],
};

const copy: Record<SignalLocale, SignalCopy> = {
  en: {
    eyebrow: "LIVE EDITORIAL MAP",
    title: "AI SIGNAL",
    tagline: "The forces shaping artificial intelligence right now.",
    intro: "Move through the companies, infrastructure, policies and research changing the field—then open the reporting behind each signal.",
    mapLabel: "The ecosystem resolves into four connected fields.",
    storyLabel: "Signal in focus",
    flowTitle: "No signal moves alone.",
    flowBody: "Model releases pull on compute. Infrastructure choices change policy. Research becomes product—and every connection creates a new decision.",
    exitTitle: "Follow the signal into the newsroom.",
    exitBody: "The map is only the orientation. Our reporting carries the evidence, the limits and the practical next step.",
    exitAction: "Explore all AI reporting",
    previous: "Previous signal",
    next: "Next signal",
    readStory: "Read the full signal",
    articleLanguage: "Full article in English",
    fallbackTitle: "Explore the AI ecosystem",
  },
  fr: {
    eyebrow: "CARTE ÉDITORIALE EN DIRECT",
    title: "SIGNAL IA",
    tagline: "Les forces qui façonnent l’intelligence artificielle aujourd’hui.",
    intro: "Parcourez les entreprises, l’infrastructure, les politiques et la recherche qui transforment le domaine, puis ouvrez les reportages derrière chaque signal.",
    mapLabel: "L’écosystème se précise en quatre champs connectés.",
    storyLabel: "Signal à la une",
    flowTitle: "Aucun signal n’évolue seul.",
    flowBody: "Les modèles sollicitent le calcul. L’infrastructure influence les politiques. La recherche devient produit—et chaque lien crée une nouvelle décision.",
    exitTitle: "Suivez le signal dans notre salle de nouvelles.",
    exitBody: "La carte vous oriente. Nos reportages présentent les preuves, les limites et la prochaine étape concrète.",
    exitAction: "Explorer tous les reportages sur l’IA",
    previous: "Signal précédent",
    next: "Signal suivant",
    readStory: "Lire le signal complet",
    articleLanguage: "Article complet en anglais",
    fallbackTitle: "Explorer l’écosystème de l’IA",
  },
};

export function buildSignalData(allArticles: Article[], locale: SignalLocale): SignalData {
  const eligible = allArticles.filter((article) => article.evidenceStatus === "verified" && article.searchEligible !== false);
  const selected = featuredSlugs
    .map((slug) => eligible.find((article) => article.slug === slug))
    .filter((article): article is Article => Boolean(article));

  const used = new Set(selected.map((article) => article.slug));
  for (const article of eligible) {
    if (selected.length >= featuredSlugs.length) break;
    if (!used.has(article.slug)) {
      selected.push(article);
      used.add(article.slug);
    }
  }

  return {
    locale,
    copy: copy[locale],
    clusters: clusters[locale],
    stories: selected.map((article, clusterIndex) => ({
      slug: article.slug,
      title: article.title,
      dek: article.dek,
      category: article.category,
      date: article.date,
      displayDate: article.displayDate,
      readTime: article.readTime,
      image: article.image,
      imageAlt: article.imageAlt,
      href: `${locale === "fr" ? "/fr" : ""}/article/${article.slug}/`,
      clusterIndex,
    })),
  };
}
