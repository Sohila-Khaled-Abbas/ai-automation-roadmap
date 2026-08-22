import { z } from "zod";

export const learnerSubmissionInput = z.object({
  submissionType: z.enum(["project", "resource"]),
  title: z.string().trim().min(5, "Add a descriptive title.").max(255),
  description: z.string().trim().min(20, "Share enough detail for a reviewer to understand the suggestion.").max(4_000),
  url: z.string().trim().url("Use a full URL beginning with https://.").max(1_024).optional().or(z.literal("")),
  moduleId: z.string().trim().max(64).optional().or(z.literal("")),
});

export type LearnerSubmissionInput = z.infer<typeof learnerSubmissionInput>;

export function normalizeSubmissionInput(input: LearnerSubmissionInput) {
  return {
    ...input,
    url: input.url || null,
    moduleId: input.moduleId || null,
  };
}
