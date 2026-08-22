import { describe, expect, it } from "vitest";
import { filterLearningResources } from "./resourceFilters";

const resources = [
  { title: "Arabic n8n AI Agent", description: "Agent workflow", provider: "AI Plus · Mohamed Elshamy", resourceType: "video", moduleId: "agents", source: "n8n Mastery Catalogue · Arabic AI Agents & Scaling · YouTube search" },
  { title: "English workflow tutorial", description: "Workflow fundamentals", provider: "Ryan & Matt Data Science", resourceType: "video", moduleId: "orchestrate", source: "n8n Mastery Catalogue · English Tutorials & Workflows · YouTube search" },
  { title: "Enable queue mode", description: "Production scaling guide", provider: "n8n", resourceType: "guide", moduleId: "operate", source: "n8n Mastery Catalogue · Official Technical Guides" },
  { title: "Notebook source pack", description: "Notebook collection", provider: "Gemini Notebook", resourceType: "reference", moduleId: "agents", source: "Gemini Notebook · Source collection" },
];

describe("learning resource filtering", () => {
  it("filters imported catalogue records by their resource type", () => {
    expect(filterLearningResources(resources, "video", "")).toHaveLength(2);
    expect(filterLearningResources(resources, "guide", "")).toEqual([resources[2]]);
  });

  it("searches source and provider metadata across Arabic, English, and official catalogue entries", () => {
    expect(filterLearningResources(resources, "all", "Ryan & Matt")).toEqual([resources[1]]);
    expect(filterLearningResources(resources, "all", "queue mode")).toEqual([resources[2]]);
  });

  it("keeps the Notebook filter scoped to Gemini Notebook source records", () => {
    expect(filterLearningResources(resources, "notebook", "")).toEqual([resources[3]]);
  });
});
