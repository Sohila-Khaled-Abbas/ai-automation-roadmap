import { z } from "zod";
import { getLearningResources, getRoadmapProjects } from "./db";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";

export const appRouter = router({
  // This public learning app intentionally has no account-bound procedures.
  system: systemRouter,
  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(() => ({ success: true } as const)),
  }),
  resources: router({
    list: publicProcedure
      .input(z.object({ moduleId: z.string().min(3).max(64).optional() }).optional())
      .query(({ input }) => getLearningResources(input?.moduleId)),
  }),
  projects: router({
    list: publicProcedure.query(() => getRoadmapProjects()),
  }),
});

export type AppRouter = typeof appRouter;
