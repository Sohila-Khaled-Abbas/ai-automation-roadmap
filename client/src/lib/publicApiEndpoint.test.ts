import { describe, expect, it } from "vitest";
import { resolvePublicApiUrl, shouldOmitCredentials } from "./publicApiEndpoint";

describe("public API endpoint routing", () => {
  it("uses the managed public catalogue API from Vercel routes", () => {
    const apiUrl = resolvePublicApiUrl("https://ai-automation-roadmap-git-main-sohila-khaled-abbas-projects.vercel.app");

    expect(apiUrl).toBe("https://airoadmap-yzczrdqq.manus.space/api/trpc");
    expect(shouldOmitCredentials(apiUrl)).toBe(true);
  });

  it("uses the same-origin API in local and managed-host environments", () => {
    expect(resolvePublicApiUrl("http://localhost:3000")).toBe("/api/trpc");
    expect(resolvePublicApiUrl("https://airoadmap-yzczrdqq.manus.space")).toBe("/api/trpc");
    expect(shouldOmitCredentials("/api/trpc")).toBe(false);
  });
});
