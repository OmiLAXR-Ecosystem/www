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

Every push to `main` is built and deployed to GitHub Pages by [.github/workflows/deploy.yml](.github/workflows/deploy.yml). The workflow also runs once a day to pick up new Discord news; to publish a post right away, start it by hand (Actions → Deploy to GitHub Pages → Run workflow).

## Discord news

The home page shows the posts of a Discord channel (newest first, older ones by scrolling sideways; each post opens in a dialog). They are fetched while the site is built, so the bot token stays in GitHub and never reaches the browser.

Setup:

1. Create an application in the [Discord Developer Portal](https://discord.com/developers/applications), add a bot and enable **Message Content Intent** (Bot → Privileged Gateway Intents).
2. Invite the bot by opening `https://discord.com/oauth2/authorize?client_id=<APPLICATION_ID>&scope=bot&permissions=66560` (Application ID from General Information; 66560 = View Channel + Read Message History). For a private news channel, allow the bot these two permissions in the channel settings.
3. In this GitHub repository (Settings → Secrets and variables → Actions) add the secret `DISCORD_BOT_TOKEN` and the variable `DISCORD_CHANNEL_ID` (a secret works too) (right-click the channel → Copy Channel ID, with developer mode enabled).

For local builds, put both values into a `.env` file (gitignored). Without them the news section is simply left out.

## License

[MIT](LICENSE)
