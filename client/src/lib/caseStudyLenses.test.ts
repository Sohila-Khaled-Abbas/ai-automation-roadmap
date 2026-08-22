import { describe, expect, it } from "vitest";
import { caseStudyLenses, validateCaseStudyLenses } from "./caseStudyLenses";

describe("case-study learning lenses", () => {
  it("maps each official business case prompt to a valid roadmap stage", () => {
    expect(validateCaseStudyLenses(caseStudyLenses)).toBe(true);
    expect(caseStudyLenses.map((lens) => lens.moduleId)).toEqual(["operate", "augment", "agents"]);
  });

  it("keeps each lens focused on an observable operational question", () => {
    expect(caseStudyLenses.every((lens) => lens.prompts.length === 3)).toBe(true);
    expect(caseStudyLenses.every((lens) => lens.source.startsWith("Official n8n Case Study ·"))).toBe(true);
    expect(caseStudyLenses.every((lens) => lens.url.startsWith("https://n8n.io/case-studies/"))).toBe(true);
  });
});
