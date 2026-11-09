import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  integrations: [react(), sitemap()],
  site: "https://omilaxr.dev/",
  outDir: "public",
  publicDir: "static",
  base: "/",
  // Load same-site pages on hover/touch, so a click shows the next page without waiting for the network
  prefetch: {
    prefetchAll: true,
  },
  redirects: {
    "/how-to": "/get-started",
  },
});
