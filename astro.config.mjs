import { defineConfig } from "astro/config";
import react from "@astrojs/react";


// https://astro.build/config

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  site: "https://omilaxr.dev/",
  outDir: "public",
  publicDir: "static",
  base: "/",
  vite: {
    resolve: {
      dedupe: ["react", "react-dom"],
      alias: {
        "@material-tailwind/react/node_modules/react": "react",
        "@material-tailwind/react/node_modules/react-dom": "react-dom",
      },
    },
    ssr: {
      external: ["@material-tailwind/react"],
    },
    plugins: [],
  }
});
