import { describe, expect, it } from "vitest";
import { learningSequenceGuides, validateLearningSequenceGuides } from "./learningSequence";
import { roadmapModules } from "./roadmapData";

describe("full learning sequence guides", () => {
  it("provides one ordered prerequisite and source focus for each roadmap stage", () => {
    expect(validateLearningSequenceGuides(learningSequenceGuides)).toBe(true);
    expect(learningSequenceGuides.map((guide) => guide.moduleId)).toEqual(roadmapModules.map((module) => module.id));
  });

  it("adds explicit advanced-template and case-study study cues after foundational stages", () => {
    expect(learningSequenceGuides.find((guide) => guide.moduleId === "augment")?.sourceFocus).toContain("human-reviewed");
    expect(learningSequenceGuides.find((guide) => guide.moduleId === "operate")?.sourceFocus).toContain("Delivery Hero");
    expect(learningSequenceGuides.find((guide) => guide.moduleId === "agents")?.sourceFocus).toContain("RAG");
  });
});
