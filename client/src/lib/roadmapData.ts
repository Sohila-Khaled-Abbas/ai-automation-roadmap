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
    id: "prepare",
    route: "00 / Prepare",
    title: "Set up a practice system that lasts",
    duration: "Week 0",
    tone: "mint",
    summary:
      "Create the working environment for deliberate practice: a learning log, a safe test workspace, a weekly build rhythm, and one real process you can observe without rushing to automate it.",
    skills: ["Learning design", "Tool setup", "Problem selection"],
    deliverable: "A personal automation learning brief, build folder, and two-hour weekly practice calendar.",
    tools: ["n8n", "Notion", "GitHub"],
    prompt: "Choose one process that matters to you. What makes it safe enough to learn on, and what evidence would prove the automation is better?",
  },
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
    id: "shape",
    route: "04 / Shape",
    title: "Make messy data safe to use",
    duration: "Week 4",
    tone: "mint",
    summary:
      "Work with real workflow data deliberately. Inspect items, map useful values, transform only what needs changing, and use small code steps when the built-in nodes are not enough.",
    skills: ["Data mapping", "Expressions", "Transformation"],
    deliverable: "A normalized data contract with before-and-after examples and field-level validation rules.",
    tools: ["Edit Fields", "Code", "JSON"],
    prompt: "Which fields must be present, which can be repaired, and which should halt the workflow before they reach another system?",
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
  {
    id: "agents",
    route: "06 / Agent",
    title: "Design context-aware AI systems",
    duration: "Week 7",
    tone: "coral",
    summary:
      "Move beyond a single prompt. Decide when an AI system needs memory, what context it may retain, how it should use tools, and when its output needs review or evaluation.",
    skills: ["Memory design", "Tool boundaries", "Evaluation"],
    deliverable: "An AI agent flow with a context policy, tool contract, and human escalation rule.",
    tools: ["n8n AI Agent", "Memory", "Evaluations"],
    prompt: "What information should persist between interactions, and which information must never be retained or used without review?",
  },
  {
    id: "capstone",
    route: "07 / Capstone",
    title: "Deploy, document, and prove the value",
    duration: "Weeks 8–10",
    tone: "amber",
    summary:
      "Turn one workflow into a credible portfolio case study. Choose a deployment approach, test with representative runs, document operations, and show a measurable before-and-after outcome.",
    skills: ["Deployment", "Debugging", "Portfolio narrative"],
    deliverable: "A deployed or demo-ready capstone with runbook, architecture map, and case-study write-up.",
    tools: ["n8n", "GitHub", "Loom"],
    prompt: "What business or team outcome improved, how will you measure it, and what would a reviewer need to recreate your reasoning?",
  },
];

export const featuredProducts = [
  {
    name: "n8n Automation Path",
    eyebrow: "Featured roadmap",
    description: "A ten-week project route from first trigger to portfolio-ready workflow.",
    meta: "10 weeks · Builder track",
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
