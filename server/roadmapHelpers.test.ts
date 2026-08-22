import { describe, expect, it } from "vitest";
import { isAllowedUpload, MAX_UPLOAD_BYTES, sanitizeUploadFilename } from "./roadmapHelpers";

describe("roadmap upload helpers", () => {
  it("creates storage-safe file names without losing a normal extension", () => {
    expect(sanitizeUploadFilename(" My workflow brief (final).md ")).toBe("My-workflow-brief-final-.md");
  });

  it("only permits supported resource types inside the storage limit", () => {
    expect(isAllowedUpload("application/pdf", 2048)).toBe(true);
    expect(isAllowedUpload("image/png", 2048)).toBe(false);
    expect(isAllowedUpload("application/json", MAX_UPLOAD_BYTES + 1)).toBe(false);
  });
});
