import { createApp } from "../server/app";

/**
 * Vercel catches all API paths here. Static assets are served from
 * dist/public while the existing Express routes retain their /api paths.
 */
const app = createApp();

export default app;
