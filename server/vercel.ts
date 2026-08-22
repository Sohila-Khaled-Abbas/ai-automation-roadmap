import { createApp } from "./app";

/**
 * Bundled into each explicit Vercel Function during the production build. The
 * generated JavaScript entries avoid an additional platform TypeScript pass
 * over the Express and tRPC implementation.
 */
export default createApp();
