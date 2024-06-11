import { defineConfig } from "astro/config";
import react from "@astrojs/react";

import tailwind from "@astrojs/tailwind";
const isProd = process.env.NODE_ENV === "production";

// https://astro.build/config

// https://astro.build/config
export default defineConfig({
  integrations: [react(), tailwind()],
  site: "https://omilaxr.dev/",
  outDir: "public",
  publicDir: "static"
});