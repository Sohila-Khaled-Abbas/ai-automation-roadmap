import { describe, expect, it } from "vitest";
import { filterLibraryView, visibleLibraryResources } from "./libraryView";

const resources = [
  { moduleId: "operate", title: "Queue mode", description: "Workers and Redis", provider: "n8n", source: "Official n8n Docs", resourceType: "guide" as const },
  { moduleId: "agents", title: "AI Agent", description: "Connect a chat model and tools", provider: "n8n", source: "Official n8n Docs", resourceType: "guide" as const },
  { moduleId: "operate", title: "Error workflow", description: "Retries", provider: "n8n", source: "YouTube", resourceType: "video" as const },
];

describe("library view helpers", () => {
  it("combines the stage view with the existing type and text filters", () => {
    expect(filterLibraryView(resources, "guide", "n8n", "operate").map((resource) => resource.title)).toEqual(["Queue mode"]);
  });

  it("bounds the initially rendered resources without reordering them", () => {
    expect(visibleLibraryResources(resources, 2).map((resource) => resource.title)).toEqual(["Queue mode", "AI Agent"]);
    expect(visibleLibraryResources(resources, -1)).toEqual([]);
  });
});
