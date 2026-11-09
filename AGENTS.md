# AGENTS.md

This file provides guidance to coding agents when working with code in this repository.

Website of the OmiLAXR ecosystem (https://omilaxr.dev), built with Astro + React + Material Tailwind. It started from the Creative Tim "Astro Launch UI" template; `README.md` is still the template's README and partly wrong (e.g. the build output is not `dist/`).

## Commands

| | |
|---|---|
| `make install` | `npm ci` |
| `make dev` | Dev server with hot reload |
| `make build` | Production build into `public/` |
| `make preview` | Build and serve the production output |
| `make tailwind` | Regenerate `assets/css/material-tailwind.css` |
| `make clean` | Remove `public/` and `.astro/` |

There are no tests and no linter. `make build` is the check that everything compiles.

## Directories (non-standard Astro setup)

`astro.config.mjs` swaps the usual folders:
- `static/` is Astro's `publicDir`: images, videos and other files served as-is (referenced as `/foo.png`).
- `public/` is the build output (`outDir`). It is gitignored and wiped on build; never put source files there.

## Styling

- Tailwind is precompiled by the CLI, not by Astro: `assets/css/input.css` → `assets/css/material-tailwind.css` (runs automatically before `dev`/`build`, and the generated file is committed). Only `src/**` is scanned for class names.
- `tailwind.config.js` overrides the `blue`, `yellow`, `red`, `green`, `sky`, `slate` and `dark` colors with the OmiLAXR palette.
- Import Material Tailwind components from `src/materialTailwind.ts`, not from `@material-tailwind/react` directly. The shim handles the package's CJS/ESM shape under Vite SSR; together with the `dedupe`/`alias` settings in `astro.config.mjs` it keeps a single React 19 instance.
- Icons come from the Font Awesome kit loaded in `src/layouts/Layout.astro` (`<i className="fab fa-github">`).

## Page structure

- `src/pages/*.astro` are thin shells: `Layout` + `presentation/navbar` + one content component + `presentation/footerFree`. Almost every React component is mounted with `client:only="react"`, so content is rendered in the browser, not at build time.
- The real OmiLAXR content lives in `src/components/presentation/` (`getStarted`, `ecosystem`, `pipeline`, `publications`, `projects`, …) and the shared components in `src/components/` (navbar, `CodeBox`, `Tabs`, `Package`, …).
- `src/components/landing/`, `src/components/about/`, `landing.astro`, `about.astro` and several presentation files (`pricing`, `figma`, `pagesFree`, `freeToPro`, …) are leftovers from the template.
- `get-started-v1.astro` / `presentation/v1/` keep the old OmiLAXR v1 guide.
- Numbered figures on guide pages use `FigureManager` from `react-figure-ref`: register `{label, imageSrc}` once, then use `<fm.Figure label=… caption=…/>` and `<fm.FigureRef label=…/>`.
- The ecosystem package list (names, descriptions, source links to the `OmiLAXR-Ecosystem` GitHub org) is hard-coded in `src/components/presentation/ecosystem.tsx`.

## Repository and deployment

- Every push to `main` builds the site and deploys it to GitHub Pages with the custom domain `omilaxr.dev` (`.github/workflows/deploy.yml`). `site` and `base: "/"` in `astro.config.mjs` assume that root domain.
- Development happens on GitHub (`OmiLAXR-Ecosystem/www`). The former GitLab repo (`learntech-rwth/omilaxr-ecosystem/www`) is frozen at the dissertation state; the tag `dissertation` marks the same commit here.
