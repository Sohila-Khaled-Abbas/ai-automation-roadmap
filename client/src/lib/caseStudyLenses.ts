import { roadmapModules } from "./roadmapData";

export type CaseStudyLens = {
  id: string;
  moduleId: string;
  route: string;
  title: string;
  organization: string;
  focus: string;
  prompts: [string, string, string];
  url: string;
  source: string;
};

export const caseStudyLenses: CaseStudyLens[] = [
  {
    id: "it-ops-signal",
    moduleId: "operate",
    route: "06 / Operate",
    title: "Turn an alert into an operator decision",
    organization: "Delivery Hero · IT operations context",
    focus: "Use the official account-recovery case to trace an incident trigger, the data an operator needs, the manager approval boundary, and the recovery evidence.",
    prompts: ["What starts the workflow?", "Where does a human intervene?", "What proof makes recovery auditable?"],
    url: "https://n8n.io/case-studies/delivery-hero/",
    source: "Official n8n Case Study · Delivery Hero",
  },
  {
    id: "governed-ai-work",
    moduleId: "augment",
    route: "05 / Augment",
    title: "Place a human checkpoint around AI work",
    organization: "Huel · governed AI adoption context",
    focus: "Study the published adoption context, then write a small approval rule that prevents an AI suggestion from becoming an unreviewed operational action.",
    prompts: ["What input is safe to automate?", "Who approves uncertainty?", "What gets recorded for review?"],
    url: "https://n8n.io/case-studies/huel/",
    source: "Official n8n Case Study · Huel",
  },
  {
    id: "human-ai-operations",
    moduleId: "agents",
    route: "07 / Agent",
    title: "Make an agent’s evidence and limits visible",
    organization: "SanctifAI · human-AI workflow context",
    focus: "Use the official case as an architecture prompt: identify the human task, the agent boundary, the information it can use, and the path when it cannot answer reliably.",
    prompts: ["What evidence can the agent cite?", "What action is outside its boundary?", "How does a human take over?"],
    url: "https://n8n.io/case-studies/sanctifai/",
    source: "Official n8n Case Study · SanctifAI",
  },
];

export function validateCaseStudyLenses(lenses: CaseStudyLens[]) {
  const moduleIds = new Set(roadmapModules.map((module) => module.id));
  return lenses.every((lens) => moduleIds.has(lens.moduleId) && lens.url.startsWith("https://n8n.io/case-studies/"));
}
