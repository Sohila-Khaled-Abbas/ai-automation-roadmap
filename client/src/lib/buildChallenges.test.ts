import { describe, expect, it } from "vitest";
import { buildChallenges, roadmapModules } from "./roadmapData";

describe("build studio challenge data", () => {
  it("maps every challenge to a real curriculum stage and a public HTTPS reference", () => {
    const moduleIds = new Set(roadmapModules.map((module) => module.id));

    expect(buildChallenges).toHaveLength(7);
    for (const challenge of buildChallenges) {
      expect(moduleIds.has(challenge.moduleId)).toBe(true);
      expect(challenge.templateUrl).toMatch(/^https:\/\//);
      expect(challenge.recipe.length).toBeGreaterThanOrEqual(3);
      expect(challenge.proof.length).toBeGreaterThan(20);
    }
  });

  it("includes a source-linked agent project and a capstone challenge", () => {
    expect(buildChallenges.find((challenge) => challenge.moduleId === "agents")?.templateUrl).toContain("n8n.io");
    expect(buildChallenges.find((challenge) => challenge.moduleId === "capstone")?.title).toBe("Automation operating system");
  });
});
