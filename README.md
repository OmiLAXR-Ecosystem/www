# OmiLAXR website

Source of <https://omilaxr.dev>, the website of the OmiLAXR ecosystem: an open and modular framework for Learning Analytics in Unity XR projects.

Built with [Astro](https://astro.build), React and Tailwind CSS. The design is based on the Astro Launch UI template by Creative Tim.

## Development

Requires Node.js 24 (see `.nvmrc`).

```bash
nvm use
make install   # install dependencies
make dev       # dev server with hot reload
make build     # production build into public/
make preview   # build and serve the production output
```

`make` without a target lists all commands.

## Structure

| Path | Content |
| --- | --- |
| `src/pages/` | One `.astro` file per page |
| `src/components/presentation/` | Page content (get started, ecosystem, pipeline, …) |
| `src/components/` | Shared components (navbar, code boxes, tabs, figures) |
| `static/` | Images and videos, served as-is |
| `public/` | Build output (not committed) |

Details for contributors and coding agents are in [AGENTS.md](AGENTS.md).

## Deployment

Every push to `main` is built and deployed to GitHub Pages by [.github/workflows/deploy.yml](.github/workflows/deploy.yml).

## License

[MIT](LICENSE)
