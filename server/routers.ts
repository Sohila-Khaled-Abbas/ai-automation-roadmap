import { COOKIE_NAME } from "@shared/const";
import { z } from "zod";
import { createLearnerFile, getLearnerProgress, getLearningResources, listLearnerFiles, setLearnerProgress } from "./db";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { protectedProcedure, publicProcedure, router } from "./_core/trpc";
import { isAllowedUpload, sanitizeUploadFilename } from "./roadmapHelpers";
import { storagePut } from "./storage";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),
  roadmap: router({
    progress: protectedProcedure.query(({ ctx }) => getLearnerProgress(ctx.user.id)),
    setProgress: protectedProcedure
      .input(z.object({ moduleId: z.string().min(3).max(64), completed: z.boolean() }))
      .mutation(({ ctx, input }) => setLearnerProgress(ctx.user.id, input.moduleId, input.completed)),
  }),
  resources: router({
    list: publicProcedure
      .input(z.object({ moduleId: z.string().min(3).max(64).optional() }).optional())
      .query(({ input }) => getLearningResources(input?.moduleId)),
  }),
  files: router({
    list: protectedProcedure.query(({ ctx }) => listLearnerFiles(ctx.user.id)),
    upload: protectedProcedure
      .input(z.object({
        filename: z.string().min(1).max(255),
        contentType: z.string().min(3).max(255),
        dataBase64: z.string().min(4).max(11_200_000),
      }))
      .mutation(async ({ ctx, input }) => {
        const fileBuffer = Buffer.from(input.dataBase64, "base64");
        if (!isAllowedUpload(input.contentType, fileBuffer.byteLength)) {
          throw new Error("Use a PDF, JSON, ZIP, Markdown, or text file smaller than 8 MB.");
        }
        const filename = sanitizeUploadFilename(input.filename);
        const stored = await storagePut(`roadmap/${ctx.user.id}/resources/${filename}`, fileBuffer, input.contentType);
        return createLearnerFile({
          userId: ctx.user.id,
          filename,
          contentType: input.contentType,
          fileKey: stored.key,
          fileUrl: stored.url,
          sizeBytes: fileBuffer.byteLength,
        });
      }),
  }),
});

export type AppRouter = typeof appRouter;
