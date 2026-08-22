export type RoadmapModule = {
  id: string;
  route: string;
  title: string;
  duration: string;
  tone: "amber" | "mint" | "coral";
  summary: string;
  skills: string[];
  deliverable: string;
  tools: string[];
  prompt: string;
};

export const roadmapModules: RoadmapModule[] = [
  {
    id: "orient",
    route: "01 / Orient",
    title: "See the work worth automating",
    duration: "Week 1",
    tone: "amber",
    summary:
      "Turn repetitive work into a clear automation brief before reaching for a tool. Map the trigger, decisions, data, and human hand-off.",
    skills: ["Process mapping", "Automation briefs", "Value vs. risk"],
    deliverable: "A one-page automation opportunity map for a real workflow.",
    tools: ["Miro", "Google Sheets", "Notion"],
    prompt: "Name one task you repeat at least twice a week. What starts it, what information changes hands, and what counts as done?",
  },
  {
    id: "connect",
    route: "02 / Connect",
    title: "Make data move with intention",
    duration: "Week 2",
    tone: "mint",
    summary:
      "Understand the mechanics beneath an automation: structured data, APIs, webhooks, credentials, and the difference between a useful trigger and a noisy one.",
    skills: ["JSON basics", "APIs", "Webhooks"],
    deliverable: "A webhook-to-sheet intake that captures and normalizes a real submission.",
    tools: ["Postman", "Google Sheets", "HTTP Request"],
    prompt: "Trace one piece of information from its source to its final destination. Where could it be validated or transformed?",
  },
  {
    id: "orchestrate",
    route: "03 / Build",
    title: "Orchestrate your first n8n system",
    duration: "Weeks 3–4",
    tone: "amber",
    summary:
      "Use n8n to compose triggers, nodes, branches, filters, and reusable sub-workflows. Build with visibility so that another person can understand the flow.",
    skills: ["Nodes & expressions", "Branches", "Error paths"],
    deliverable: "A multi-step n8n workflow that routes, enriches, and notifies.",
    tools: ["n8n", "Gmail", "Slack"],
    prompt: "Build the happy path first. Then list the three ways the workflow could receive incomplete, duplicate, or unexpected data.",
  },
  {
    id: "augment",
    route: "04 / Augment",
    title: "Add AI without adding ambiguity",
    duration: "Week 5",
    tone: "coral",
    summary:
      "Use a language model as one bounded step in a larger workflow. Specify the task, preserve source context, shape the output, and introduce a human check where it matters.",
    skills: ["Prompt contracts", "Structured output", "Human review"],
    deliverable: "An AI-assisted classification or drafting workflow with a review gate.",
    tools: ["OpenAI", "n8n AI nodes", "Airtable"],
    prompt: "What should the AI decide, and what should remain a human decision? Define both before you write the prompt.",
  },
  {
    id: "operate",
    route: "05 / Operate",
    title: "Ship workflows people can trust",
    duration: "Week 6",
    tone: "mint",
    summary:
      "Make your automation observable and resilient. Add logging, retries, alerts, documentation, and a plan for testing every meaningful change.",
    skills: ["Observability", "Retries", "Documentation"],
    deliverable: "A production-ready workflow handover with runbook and exception log.",
    tools: ["n8n", "Slack", "Notion"],
    prompt: "If this workflow fails on a Friday afternoon, what information would a teammate need to restore it safely?",
  },
];

export const featuredProducts = [
  {
    name: "n8n Automation Path",
    eyebrow: "Featured roadmap",
    description: "A six-week project route from first trigger to dependable workflow.",
    meta: "06 weeks · Builder track",
    accent: "amber",
  },
  {
    name: "AI Workflow Library",
    eyebrow: "Practice assets",
    description: "Reusable prompts, workflow blueprints, and field-tested patterns.",
    meta: "Launching next",
    accent: "mint",
  },
  {
    name: "Automation Clinics",
    eyebrow: "Guided review",
    description: "Bring a real process; leave with a safer, clearer build plan.",
    meta: "Small-group sessions",
    accent: "coral",
  },
];

export const featuredBuilds = [
  {
    id: "inbox",
    label: "BUILD 01",
    title: "Inbox triage that knows when to ask",
    note: "Gmail → n8n → classifier → review queue → Slack",
  },
  {
    id: "research",
    label: "BUILD 02",
    title: "A research brief you can audit",
    note: "Form → sources → enrichment → structured brief",
  },
  {
    id: "lead",
    label: "BUILD 03",
    title: "Lead routing with the context intact",
    note: "Webhook → normalize → score → CRM → owner alert",
  },
];
