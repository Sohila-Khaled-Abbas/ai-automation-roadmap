import { roadmapModules } from "./roadmapData";

export type LearningSequenceGuide = {
  moduleId: string;
  prerequisite: string;
  sourceFocus: string;
};

export const learningSequenceGuides: LearningSequenceGuide[] = [
  { moduleId: "prepare", prerequisite: "No prior stage. Choose a safe practice process and make a place to keep evidence.", sourceFocus: "Set a field note, test workspace, and weekly build rhythm." },
  { moduleId: "orient", prerequisite: "Bring the safe process and learning brief from Prepare.", sourceFocus: "Write the trigger, people, decisions, data, and a value-versus-risk statement." },
  { moduleId: "connect", prerequisite: "Bring an approved automation opportunity map from Orient.", sourceFocus: "Turn its trigger and destination into a small, validated data flow." },
  { moduleId: "orchestrate", prerequisite: "Bring a working intake and a visible input data shape from Connect.", sourceFocus: "Use workflow-template patterns for routing, fallbacks, and clear hand-offs." },
  { moduleId: "shape", prerequisite: "Bring a multi-step workflow with representative example data from Build.", sourceFocus: "Define the contract, repairs, and halt conditions before downstream automation." },
  { moduleId: "augment", prerequisite: "Bring a normalized data contract and deterministic fallback from Shape.", sourceFocus: "Use human-reviewed AI template patterns only where the decision boundary is explicit." },
  { moduleId: "operate", prerequisite: "Bring a functioning workflow with known error paths from Augment.", sourceFocus: "Use the Delivery Hero case to rehearse approvals, recovery evidence, and operator ownership." },
  { moduleId: "agents", prerequisite: "Bring a logged, human-reviewed AI workflow and an evaluation question from Operate.", sourceFocus: "Study grounded RAG, research, and human-intelligence case patterns with safe deferral." },
  { moduleId: "capstone", prerequisite: "Bring a workflow or agent with a runbook, test evidence, and a named owner.", sourceFocus: "Package a credible case study: context, architecture, evidence, outcome, and handoff." },
];

export function getLearningSequenceGuide(moduleId: string): LearningSequenceGuide {
  const guide = learningSequenceGuides.find((candidate) => candidate.moduleId === moduleId);
  if (!guide) throw new Error(`Missing learning sequence guide for ${moduleId}`);
  return guide;
}

export function validateLearningSequenceGuides(guides: LearningSequenceGuide[]) {
  const moduleIds = roadmapModules.map((module) => module.id);
  return guides.length === moduleIds.length && guides.every((guide, index) => guide.moduleId === moduleIds[index] && guide.prerequisite.length > 20 && guide.sourceFocus.length > 20);
}
