import express from "express";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { appRouter } from "./routers";
import { createContext } from "./_core/context";
import { registerStorageProxy } from "./_core/storageProxy";

/**
 * Creates the HTTP application used by both the local Express server and
 * Vercel's serverless API route. Keeping route registration here prevents
 * the two deployment targets from drifting.
 */
export function createApp() {
  const app = express();

  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  app.use((req, res, next) => {
    const origin = req.headers.origin;
    const isRoadmapVercelOrigin = typeof origin === "string" && (() => {
      try {
        const hostname = new URL(origin).hostname;
        return hostname === "ai-automation-roadmap-psi.vercel.app" || hostname.endsWith("-sohila-khaled-abbas-projects.vercel.app");
      } catch {
        return false;
      }
    })();

    if (isRoadmapVercelOrigin) {
      res.setHeader("Access-Control-Allow-Origin", origin as string);
      res.setHeader("Vary", "Origin");
      res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
    }

    if (req.method === "OPTIONS" && isRoadmapVercelOrigin) {
      res.status(204).end();
      return;
    }

    next();
  });
  registerStorageProxy(app);
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );

  return app;
}
