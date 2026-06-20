# Deploying cognitioncoffee.co

Static Gatsby site hosted free on **Cloudflare Pages**. Deploys are automated via GitHub
Actions (`.github/workflows/deploy.yml`) on every push to `main`.

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

### 3. Create the Pages project once
The first deploy needs the project to exist. Easiest from your machine after
`wrangler login`:

```bash
npx wrangler pages project create cognition-coffee --production-branch=main
```

(Or run `npm run deploy` locally once; it will create the project interactively.)

## How it deploys

- **Push to `main`** → `deploy.yml` builds (`npm run build`, i.e. `gatsby build`) and runs
  `wrangler pages deploy public --project-name=cognition-coffee --branch=main`.
- **Pull requests** → `ci.yml` builds and runs the `deslop` gate (no deploy).
- Cloudflare gives every deploy a `*.cognition-coffee.pages.dev` URL. Pull-request
  branches that you deploy manually get preview URLs.

## Manual deploy

```bash
wrangler login          # once
npm run deploy          # build + push public/ to Cloudflare Pages
```

## Custom domain

In the Cloudflare dashboard: **Workers & Pages → cognition-coffee → Custom domains →
Set up a domain** → `cognitioncoffee.co`. If the domain's DNS is already on Cloudflare,
this is one click. The site's `siteUrl` is already set to the apex in `gatsby-config.ts`
(`siteMetadata.siteUrl`).

## Regenerating the social card

`static/og.png` is the Open Graph image (copied to `public/` at build time by Gatsby).
Regenerate it with:

```bash
npm run og
```
