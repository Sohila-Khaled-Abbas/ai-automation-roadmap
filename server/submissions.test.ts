import { describe, expect, it } from "vitest";
import { learnerSubmissionInput, normalizeSubmissionInput } from "./submissions";

describe("learner submission input", () => {
  it("accepts a well-formed project suggestion and normalizes optional fields", () => {
    const parsed = learnerSubmissionInput.parse({
      submissionType: "project",
      title: "Automated research briefing",
      description: "Collect new links, classify them by topic, and send a weekly digest for the learning cohort.",
      url: "",
      moduleId: "",
    });
    expect(normalizeSubmissionInput(parsed)).toMatchObject({ url: null, moduleId: null });
  });

  it("rejects incomplete resource suggestions", () => {
    expect(() => learnerSubmissionInput.parse({ submissionType: "resource", title: "Link", description: "Too short." })).toThrow();
  });
});
