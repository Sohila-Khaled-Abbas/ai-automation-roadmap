import { createApp } from "./app";

/**
 * Bundled to api/[...path].js during the production build. The generated
 * JavaScript file is the Vercel Function entry point, avoiding an additional
 * platform TypeScript pass over the Express and tRPC implementation.
 */
export default createApp();
