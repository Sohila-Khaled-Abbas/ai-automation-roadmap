import { describe, expect, it } from "vitest";
import { normalizeLocalProgress, toggleLocalProgress } from "./localRoadmapProgress";

describe("local roadmap progress", () => {
  const route = ["prepare", "orient", "connect"];

  it("keeps only unique known route coordinates from browser storage", () => {
    expect(normalizeLocalProgress(["prepare", "prepare", "unknown", 4], route)).toEqual(["prepare"]);
  });

  it("toggles a route coordinate without requiring an account", () => {
    expect(toggleLocalProgress(["prepare"], "orient")).toEqual(["prepare", "orient"]);
    expect(toggleLocalProgress(["prepare", "orient"], "prepare")).toEqual(["orient"]);
  });
});
