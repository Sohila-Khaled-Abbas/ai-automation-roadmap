import { describe, expect, it } from "vitest";
import { mapCatalogueResource, normalizeCatalogueUrl } from "./catalogueImport";

describe("n8n Mastery catalogue mapping", () => {
  it("normalizes URLs while preserving the YouTube search query", () => {
    expect(normalizeCatalogueUrl("https://WWW.YouTube.com/results/?utm_source=catalogue&search_query=n8n+RAG#overview")).toBe(
      "https://www.youtube.com/results?search_query=n8n+RAG",
    );
  });

  it("maps a foundational integration lesson to the data-shaping stage and labels its search destination transparently", () => {
    expect(
      mapCatalogueResource({
        catalogueGroup: "Arabic Foundational Course: n8n with Karim",
        title: "Connect Google Sheets to Gmail",
        format: "VIDEO",
        purpose: "Step-by-step tutorial on connecting Google Sheets to Gmail.",
        url: "https://www.youtube.com/results?search_query=Google+Sheets+Gmail",
      }),
    ).toMatchObject({
      moduleId: "shape",
      resourceType: "video",
      source: "n8n Mastery Catalogue · Arabic Foundations · YouTube search",
    });
  });

  it("maps agent, RAG, and queue-mode content to the appropriate advanced stages", () => {
    expect(
      mapCatalogueResource({
        catalogueGroup: "Arabic Advanced AI Agents & Scaling Course: AI Plus",
        title: "Build a RAG AI Agent",
        format: "VIDEO",
        purpose: "Build an agent with a vector database.",
        url: "https://www.youtube.com/results?search_query=RAG+AI+Agent",
      }).moduleId,
    ).toBe("agents");

    expect(
      mapCatalogueResource({
        catalogueGroup: "Official Documentation & Technical Resource Guides",
        title: "Enable queue mode | Deploy | n8n Docs",
        format: "DOCUMENTATION",
        purpose: "Configure Redis-backed workers for horizontal scale.",
        url: "https://docs.n8n.io/deploy/host-n8n/configure-n8n/scaling/enable-queue-mode",
      }),
    ).toMatchObject({ moduleId: "operate", provider: "n8n", resourceType: "guide" });
  });
});
