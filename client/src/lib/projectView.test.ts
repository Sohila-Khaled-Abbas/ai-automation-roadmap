import { describe, expect, it } from "vitest";
import { toBuildChallenges, type PersistedRoadmapProject } from "./projectView";

const baseProject: PersistedRoadmapProject = {
  id: 1,
  slug: "proof-project",
  moduleId: "agents",
  route: "07 / Agent",
  level: "Agent build",
  title: "Evidence-grounded helper",
  summary: "A small context-aware assistant with a clear tool boundary.",
  recipeJson: '["Context source","Tool boundary","Evaluation"]',
  proof: "A reviewer can inspect evidence and a safe escalation path.",
  templateLabel: "Open AI agent guide",
  templateUrl: "https://n8n.io/ai-agents/",
  provider: "n8n",
  source: "Official n8n AI Agents Guide",
  sortOrder: 2,
};

describe("persisted build challenge view", () => {
  it("maps stored project metadata into ordered build-studio cards", () => {
    const challenges = toBuildChallenges([{ ...baseProject, sortOrder: 2 }, { ...baseProject, id: 2, slug: "first-project", sortOrder: 1 }]);

    expect(challenges.map((challenge) => challenge.id)).toEqual(["first-project", "proof-project"]);
    expect(challenges[1]).toMatchObject({ provider: "n8n", source: "Official n8n AI Agents Guide" });
    expect(challenges[1]?.recipe).toEqual(["Context source", "Tool boundary", "Evaluation"]);
  });

  it("keeps the studio renderable when a stored recipe is malformed", () => {
    expect(toBuildChallenges([{ ...baseProject, recipeJson: "not-json" }])[0]?.recipe).toEqual([]);
  });
});
