import type { RoadmapModule } from "./roadmapData";

export type RoadmapDiagramNode = {
  id: string;
  label: string;
  routeNumber: string;
  rail: "upper" | "lower";
  isTerminal: boolean;
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
