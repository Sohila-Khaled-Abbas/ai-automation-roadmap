import { describe, expect, it } from "vitest";
import { roadmapModules } from "./roadmapData";

describe("roadmap stage sequence", () => {
  it("uses a unique, consecutive visual route number for every stage", () => {
    const routeNumbers = roadmapModules.map((module) => Number(module.route.split(" ")[0]));
    expect(routeNumbers).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8]);
  });

  it("keeps the route focused on nine stage outcomes", () => {
    expect(roadmapModules).toHaveLength(9);
    expect(roadmapModules.at(-1)?.id).toBe("capstone");
  });
});
