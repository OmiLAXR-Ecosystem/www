# AGENTS.md

This file provides guidance to coding agents when working with code in this repository.

Website of the OmiLAXR ecosystem (<https://omilaxr.dev>), built with Astro + React + Tailwind. It started from the Creative Tim "Astro Launch UI" template; the template's pages and components have been removed.

## Commands

| Command | What it does |
| --- | --- |
| `make install` | `npm ci` |
| `make dev` | Dev server with hot reload |
| `make build` | Production build into `public/` |
| `make preview` | Build and serve the production output |
| `make tailwind` | Regenerate `assets/css/material-tailwind.css` |
| `make clean` | Remove `public/` and `.astro/` |

Astro 7 needs Node >= 22.23.4; `.nvmrc` pins Node 24 (`nvm use`), and CI reads the same file.

There are no tests and no linter. `make build` is the check that everything compiles and renders.

## Directories (non-standard Astro setup)

`astro.config.mjs` swaps the usual folders:

- `static/` is Astro's `publicDir`: images, videos and other files served as-is. Always reference them with an absolute path (`/get-started/foo.webp`); relative paths break on sub-pages.
- `public/` is the build output (`outDir`). It is gitignored and wiped on build; never put source files there.

New images go into `static/` as WebP, sized to about twice their displayed width.

## Styling

- Tailwind is precompiled by the CLI, not by Astro: `assets/css/input.css` → `assets/css/material-tailwind.css` (runs automatically before `dev`/`build`, and the generated file is committed). Only `src/**` is scanned for class names.
- `tailwind.config.js` takes colors, fonts, shadows and breakpoints from the Material Tailwind theme (the package is only a dev dependency for that; no Material Tailwind components are used at runtime) and overrides `blue`, `yellow`, `red`, `green`, `sky`, `slate` and `dark` with the OmiLAXR palette. Breakpoints are therefore `sm` 540, `md` 720, `lg` 960, `xl` 1140 px.
- Icons are Font Awesome Free icons from `@fortawesome/free-brands-svg-icons` and `@fortawesome/free-solid-svg-icons`, rendered as inline SVG at build time by `src/components/Icon.tsx` (`<Icon icon={faGithub} className="text-xl"/>`; the icon is 1em high, so `text-*` sets its size). Don't load the Font Awesome kit or web font again: it loaded after the page and made the navbar jump on every page load. Heroicons are used for the home and menu icons.

## Page structure

- `src/pages/*.astro` are thin shells: `Layout` (requires `title` and `metaDescription`; sets canonical URL and Open Graph tags) + `presentation/navbar` + one content component + `presentation/footerFree`.
- React components are only rendered to HTML at build time; no page uses a `client:*` directive, so no React runtime is shipped to the browser. The interactive parts (navbar menu and scroll border, `Tabs`, `Table` search, `CodeBox` copy buttons, the header's `AnimatingText`) render their state into the HTML (`hidden`, `aria-selected`, `data-*`) and are wired up by `src/scripts/interactions.ts`, which `Layout.astro` loads on every page. Add new interactivity there the same way rather than hydrating a component: one island pulls in react-dom (~180 KB) plus the whole component tree. Never use `client:only`, which leaves the HTML empty for search engines and link previews.
- The content lives in `src/components/presentation/` (`getStarted`, `ecosystem`, `pipeline`, `projects`, …) and the shared components in `src/components/` (navbar, `CodeBox`, `Tabs`, `Package`, `Figure`, …).
- Guide pages wrap their content in `.doc-page` (`assets/scss/main.scss`): centered, at most 1200px wide, with paragraphs and list items capped at 80ch. The navbar and the homepage use the 1320px container width.
- `get-started-v1.astro` / `presentation/v1/` keep the old OmiLAXR v1 guide.
- Numbered figures on guide pages use `FigureManager` from `src/components/Figure.tsx`: register `{label, imageSrc}` once, then use `<fm.Figure label=… caption=…/>` and `<fm.FigureRef label=…/>`.
- `CodeBox` uses the light build of `react-syntax-highlighter` with only `csharp`, `javascript` and `json` registered. Register a language there before using it.
- The ecosystem package list (names, descriptions, source links to the `OmiLAXR-Ecosystem` GitHub org) is hard-coded in `src/components/presentation/ecosystem.tsx`.
- The news section directly below the header of the home page (`presentation/news.tsx`) shows the posts of a Discord channel as a horizontal slider, each card opening its full text in a `<dialog>` (wired up in `src/scripts/interactions.ts`). `src/lib/discordNews.ts` fetches the last 100 messages at build time with `DISCORD_BOT_TOKEN` and `DISCORD_CHANNEL_ID` (from the environment or a gitignored `.env`); without them, or if the Discord API fails, the section is left out (`make dev` shows a placeholder) and the build still succeeds. The message markdown is rendered with `marked` at build time.
- Redirects for removed URLs are in `redirects` in `astro.config.mjs`; the sitemap is generated by `@astrojs/sitemap`.

## Repository and deployment

- Every push to `main` builds the site and deploys it to GitHub Pages with the custom domain `omilaxr.dev` (`.github/workflows/deploy.yml`). `site` and `base: "/"` in `astro.config.mjs` assume that root domain.
- `deploy.yml` also runs daily (cron) so new Discord posts appear without a push. It reads the repository secret `DISCORD_BOT_TOKEN` and the repository variable `DISCORD_CHANNEL_ID`.
- Development happens on GitHub (`OmiLAXR-Ecosystem/www`). The former GitLab repo (`learntech-rwth/omilaxr-ecosystem/www`) is frozen at the dissertation state; the tag `dissertation` marks the same commit here.
