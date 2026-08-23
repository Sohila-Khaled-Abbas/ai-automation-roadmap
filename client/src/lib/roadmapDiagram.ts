import type { RoadmapModule } from "./roadmapData";

export type RoadmapDiagramNode = {
  id: string;
  label: string;
  routeNumber: string;
  rail: "upper" | "lower";
  isTerminal: boolean;
};

export type RoadmapMindMapBranch = {
  id: string;
  nodeId: string;
  kind: "skill" | "tool" | "proof";
  label: string;
};

const labelByModuleId: Record<string, string> = {
  prepare: "Prepare",
  orient: "Orient",
  connect: "Connect",
  orchestrate: "Build",
  shape: "Shape",
  augment: "Augment",
  operate: "Operate",
  agents: "Agents",
  capstone: "Capstone",
};

export function createRoadmapDiagramNodes(modules: RoadmapModule[]): RoadmapDiagramNode[] {
  return modules.map((module, index) => ({
    id: module.id,
    label: labelByModuleId[module.id] ?? module.title,
    routeNumber: module.route.split(" ")[0].padStart(2, "0"),
    rail: index % 2 === 0 ? "upper" : "lower",
    isTerminal: index === modules.length - 1,
  }));
}

export function createRoadmapMindMapBranches(modules: RoadmapModule[]): RoadmapMindMapBranch[] {
  return modules.flatMap((module) => [
    { id: `${module.id}-skill`, nodeId: module.id, kind: "skill" as const, label: module.skills[0] ?? "Core skill" },
    { id: `${module.id}-tool`, nodeId: module.id, kind: "tool" as const, label: module.tools.slice(0, 2).join(" + ") || "Build tool" },
    { id: `${module.id}-proof`, nodeId: module.id, kind: "proof" as const, label: module.deliverable },
  ]);
}
