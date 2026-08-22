import { describe, expect, it } from "vitest";
import { roadmapModules } from "./roadmapData";
import { createRoadmapDiagramNodes } from "./roadmapDiagram";

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
});
