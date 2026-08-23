import { describe, expect, it } from "vitest";
import { roadmapModules } from "./roadmapData";
import { createRoadmapDiagramNodes, createRoadmapMindMapBranches } from "./roadmapDiagram";

describe("roadmap infographic sequence", () => {
  it("derives the nine visual checkpoints from the curriculum in route order", () => {
    const nodes = createRoadmapDiagramNodes(roadmapModules);

    expect(nodes.map((node) => node.routeNumber)).toEqual(["00", "01", "02", "03", "04", "05", "06", "07", "08"]);
    expect(nodes.map((node) => node.id)).toEqual(roadmapModules.map((module) => module.id));
    expect(nodes.at(-1)).toMatchObject({ id: "capstone", label: "Capstone", isTerminal: true });
  });

  it("alternates infographic rails while keeping one terminal checkpoint", () => {
    const nodes = createRoadmapDiagramNodes(roadmapModules);

    expect(nodes.map((node) => node.rail)).toEqual(["upper", "lower", "upper", "lower", "upper", "lower", "upper", "lower", "upper"]);
    expect(nodes.filter((node) => node.isTerminal)).toHaveLength(1);
  });

  it("creates skill, tool, and proof branches for every roadmap hub", () => {
    const branches = createRoadmapMindMapBranches(roadmapModules);

    expect(branches).toHaveLength(27);
    expect(branches.filter((branch) => branch.nodeId === "augment").map((branch) => branch.kind)).toEqual(["skill", "tool", "proof"]);
    expect(branches.find((branch) => branch.id === "capstone-proof")?.label).toContain("capstone");
  });
});
