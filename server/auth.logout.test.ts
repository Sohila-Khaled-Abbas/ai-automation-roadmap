import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("public compatibility auth contract", () => {
  it("reports no authenticated account and keeps logout a harmless no-op", async () => {
    const caller = appRouter.createCaller(createPublicContext());

    await expect(caller.auth.me()).resolves.toBeNull();
    await expect(caller.auth.logout()).resolves.toEqual({ success: true });
  });
});
