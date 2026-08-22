import { describe, expect, it } from "vitest";
import { storageGet } from "./storage";

describe("learner file delivery paths", () => {
  it("uses the Vercel API storage route without changing the stored object key", async () => {
    await expect(storageGet("roadmap/42/resources/workflow.pdf")).resolves.toEqual({
      key: "roadmap/42/resources/workflow.pdf",
      url: "/api/storage/roadmap/42/resources/workflow.pdf",
    });
  });
});
