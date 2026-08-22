export type CatalogueRecord = {
  catalogueGroup: string;
  title: string;
  format: string;
  purpose: string;
  url: string;
};

export type CatalogueResource = {
  moduleId: "prepare" | "orient" | "connect" | "orchestrate" | "shape" | "augment" | "operate" | "agents" | "capstone";
  title: string;
  description: string;
  url: string;
  provider: string;
  resourceType: "course" | "guide" | "template" | "reference" | "video";
  effort: string;
  source: string;
};

const GROUP_METADATA = {
  "Arabic Foundational Course: n8n with Karim": {
    provider: "n8n with Karim · Karim Nabil",
    source: "n8n Mastery Catalogue · Arabic Foundations",
    defaultModule: "orient",
  },
  "Arabic Advanced AI Agents & Scaling Course: AI Plus": {
    provider: "AI Plus · Mohamed Elshamy",
    source: "n8n Mastery Catalogue · Arabic AI Agents & Scaling",
    defaultModule: "agents",
  },
  "English Comprehensive Tutorials & Workflows": {
    provider: "Ryan & Matt Data Science",
    source: "n8n Mastery Catalogue · English Tutorials & Workflows",
    defaultModule: "orchestrate",
  },
  "Official Documentation & Technical Resource Guides": {
    provider: "n8n and developer community",
    source: "n8n Mastery Catalogue · Official Technical Guides",
    defaultModule: "operate",
  },
} as const;

type ModuleId = CatalogueResource["moduleId"];

export function normalizeCatalogueUrl(rawUrl: string): string {
  const url = new URL(rawUrl.trim());
  url.hash = "";
  url.hostname = url.hostname.toLowerCase();
  for (const key of Array.from(url.searchParams.keys())) {
    if (key.toLowerCase().startsWith("utm_") || key.toLowerCase() === "ref") {
      url.searchParams.delete(key);
    }
  }
  url.searchParams.sort();
  if (url.pathname !== "/") url.pathname = url.pathname.replace(/\/+$/, "");
  return url.toString();
}

function textForClassification(record: CatalogueRecord): string {
  return `${record.title} ${record.purpose}`.toLocaleLowerCase();
}

function includesAny(text: string, phrases: string[]) {
  return phrases.some((phrase) => text.includes(phrase));
}

function classifyModule(record: CatalogueRecord, fallback: ModuleId): ModuleId {
  const text = textForClassification(record);

  if (includesAny(text, ["queue mode", "autoscal", "task runner", "self-host", "self host", "docker", "vps", "traefik", "deploy", "production", "runner", "scaling", "breaking changes", "observability", "logging"])) {
    return "operate";
  }
  if (includesAny(text, ["prd", "product management", "freelanc", "income", "client handoff", "business perspective", "project requirements", "portfolio"])) {
    return "capstone";
  }
  if (includesAny(text, ["rag", "retrieval", "vector", "agent", "memory", "chatbot", "tool calling", "function calling", "multi-agent", "multi agent"])) {
    return "agents";
  }
  if (includesAny(text, ["prompt", "llm", "openai", "anthropic", "claude", "gemini", "deepseek", "groq", "ollama", "grok", "model api", "ai automation"])) {
    return "augment";
  }
  if (includesAny(text, ["transform", "parsing", "parser", "spreadsheet", "google sheets", "excel", "sql", "classification", "data structure", "data flow", "code node"])) {
    return "shape";
  }
  if (includesAny(text, ["gmail", "telegram", "whatsapp", "notion", "api", "webhook", "integration", "connect"])) {
    return "connect";
  }
  if (includesAny(text, ["workflow", "trigger", "routing", "schedule", "automation example", "nodes", "node", "duplicate", "import", "export", "sticky notes"])) {
    return fallback === "orient" ? "orient" : "orchestrate";
  }
  return fallback;
}

function getOfficialProvider(url: string): string {
  const hostname = new URL(url).hostname;
  if (hostname.endsWith("n8n.io")) return "n8n";
  if (hostname === "github.com") return "GitHub";
  if (hostname === "community.n8n.io") return "n8n Community";
  return hostname.replace(/^www\./, "");
}

export function mapCatalogueResource(record: CatalogueRecord): CatalogueResource {
  const metadata = GROUP_METADATA[record.catalogueGroup as keyof typeof GROUP_METADATA];
  if (!metadata) throw new Error(`Unsupported catalogue group: ${record.catalogueGroup}`);

  const url = normalizeCatalogueUrl(record.url);
  const isSearchLink = new URL(url).hostname === "www.youtube.com" && new URL(url).pathname === "/results";
  const format = record.format.toLocaleUpperCase();
  const resourceType: CatalogueResource["resourceType"] = format === "VIDEO" ? "video" : format === "TEMPLATE" ? "template" : "guide";
  const source = isSearchLink ? `${metadata.source} · YouTube search` : metadata.source;
  const provider = record.catalogueGroup === "Official Documentation & Technical Resource Guides" ? getOfficialProvider(url) : metadata.provider;
  const description = `${record.purpose}${isSearchLink ? " This catalogue entry opens a YouTube search for the named lesson." : ""}`;

  return {
    moduleId: classifyModule(record, metadata.defaultModule),
    title: record.title.trim(),
    description,
    url,
    provider,
    resourceType,
    effort: resourceType === "video" ? "25 min" : resourceType === "template" ? "45 min" : "20 min",
    source,
  };
}
