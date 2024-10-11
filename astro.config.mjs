import { defineConfig } from "astro/config";
import react from "@astrojs/react";

import tailwind from "@astrojs/tailwind";
const isProd = process.env.NODE_ENV === "production";
import { cjsInterop } from "vite-plugin-cjs-interop";


// https://astro.build/config

// https://astro.build/config
export default defineConfig({
  integrations: [react(), tailwind()],
  site: "https://omilaxr.dev/",
  outDir: "public",
  publicDir: "static",
  base: "/",
  vite: {
    plugins: [
      cjsInterop({
        // List of CJS dependencies that require interop
        dependencies: [
          "@material-tailwind/react"
        ],
      }),
    ],
  }
});