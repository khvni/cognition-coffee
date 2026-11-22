# Deploying cognitioncoffee.co

Static Gatsby site plus Pages Functions (`functions/api/*`, the admin backend) hosted on
**Cloudflare Pages**. Deploys are automated via GitHub Actions
(`.github/workflows/deploy.yml`) on pushes to `main`, skipping docs- and meta-only
changes (`docs/**`, `*.md`, `.devin/**`, `.agents/**`) via `paths-ignore`. There is no
`npm run deploy` script; see [Manual deploy](#manual-deploy).

## One-time setup

### 1. Create a Cloudflare API token
Cloudflare dashboard → **My Profile → API Tokens → Create Token**. Use the
**"Edit Cloudflare Workers"** template, or a custom token with at minimum:

- **Account → Cloudflare Pages → Edit**

Copy the token. Also grab your **Account ID** (Workers & Pages → right sidebar, or
`npx wrangler whoami`).

### 2. Add GitHub repository secrets
Repo → **Settings → Secrets and variables → Actions → New repository secret**:

| Secret | Value |
|--------|-------|
| `CLOUDFLARE_API_TOKEN` | the token from step 1 |
| `CLOUDFLARE_ACCOUNT_ID` | your account ID |
| `POSTHOG_PROJECT_ID` | PostHog project ID, for source-map upload (optional; the step is `continue-on-error`) |
| `POSTHOG_CLI_API_KEY` | PostHog personal API key with source-map write access (optional) |

The client PostHog key (`GATSBY_POSTHOG_KEY`/`GATSBY_POSTHOG_HOST`) is inlined in the
workflow's build step, not read from secrets.

### 3. Create the Pages project once
The first deploy needs the project to exist. Easiest from your machine after
`wrangler login`:

```bash
npx wrangler pages project create cognition-coffee --production-branch=main
```

### 4. Set the Pages Functions variables
Cloudflare dashboard → **Workers & Pages → cognition-coffee → Settings → Variables and
Secrets** (Production). The admin page (`/admin`) and its `/api/*` endpoints read these at
runtime; without them, login and every admin write fail.

| Variable | Type | Value |
|----------|------|-------|
| `ADMIN_PASSWORD` | Secret | password for `/admin` |
| `GITHUB_TOKEN` | Secret | fine-grained PAT for this repo with **Contents: Read and write** |
| `GITHUB_REPO` | Text | `khvni/cognition-coffee` |
| `POSTHOG_KEY` | Text | PostHog project key (optional; server events skipped if unset) |
| `POSTHOG_HOST` | Text | `https://us.posthog.com` (optional) |

Or from the CLI: `npx wrangler pages secret put ADMIN_PASSWORD --project-name=cognition-coffee`
(repeat per variable). Redeploy after changing them.

## How the admin publishes

`/admin` logs in via `/api/auth`, then edits posts, menu, about, experience, and projects
through `/api/*`. Each save commits the matching `content/*.json` file (uploads go to
`static/blog/images/` or `static/logos/`) straight to `main` with `GITHUB_TOKEN`. That push
triggers `deploy.yml`, so changes go live after the next build (a few minutes).

## How it deploys

- **Push to `main`** → `deploy.yml` builds (`npm run build`, i.e. `gatsby build`) and runs
  `wrangler pages deploy public --project-name=cognition-coffee --branch=main`.
  Docs/meta-only pushes are skipped (`paths-ignore`), and a new push cancels a stale
  in-flight deploy (`concurrency` + `cancel-in-progress`).
- **Pull requests** → `ci.yml` builds and runs the `deslop` gate (no deploy); the same
  `paths-ignore` set skips docs/meta-only PRs, and pushing again cancels the stale run.
- **Locally** → lefthook gates catch issues before CI: `oxlint --deny-warnings` on staged
  files at commit, and lint + `tsc --noEmit` + `npm test` at push. Installed by
  `npm install` (`prepare: lefthook install`).
- Cloudflare gives every deploy a `*.cognition-coffee.pages.dev` URL. Pull-request
  branches that you deploy manually get preview URLs.

## Manual deploy

```bash
npx wrangler login      # once
env -u ELECTRON_RUN_AS_NODE npm run build
npx wrangler pages deploy public --project-name=cognition-coffee --branch=main
```

Run it from the repo root so `functions/` is bundled with the upload. Use a different
`--branch` for a preview deploy.

## Local dev with Functions

`npm run dev` serves only the Gatsby site; `/api/*` (and so `/admin`) needs Wrangler:

```bash
cp .env.example .dev.vars   # fill in the Functions values
env -u ELECTRON_RUN_AS_NODE npm run build
npx wrangler pages dev public
```

For client PostHog in `npm run dev`, put the `GATSBY_*` values in `.env.development`.

## Custom domain

In the Cloudflare dashboard: **Workers & Pages → cognition-coffee → Custom domains →
Set up a domain** → `cognitioncoffee.co`. If the domain's DNS is already on Cloudflare,
this is one click. The site's `siteUrl` is already set to the apex in `gatsby-config.ts`
(`siteMetadata.siteUrl`).

## Social card and icons

`static/og.png` is the Open Graph image, copied to `public/` at build time. There is no
generator script for it; replace the file directly.

Favicons and the Apple touch icon are generated from `static/cognitioncoffee.png`:

```bash
node scripts/generate-favicon.mjs
```
