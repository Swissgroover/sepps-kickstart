# Deploy JK SEPPS to Vercel

The project builds a Vercel-native bundle (Build Output API v3) via Nitro
when built outside the Lovable sandbox. Nitro auto-detects Vercel from the
`VERCEL=1` env that Vercel sets during build and writes the result to
`.vercel/output/`, which Vercel serves directly.

## 1. Push the code to GitHub

Use GitHub → Connect in the Lovable top bar to push this project to a repo.

## 2. Import the repo on Vercel

1. Go to https://vercel.com/new and pick the repository.
2. **Framework preset: `Other`** — do not pick anything else. There is no
   "TanStack Start" preset in Vercel; selecting one will fail the build.
3. Build command: leave default (`npm run build`) or set `bun run build`.
4. Output directory: **leave blank**. Nitro writes to `.vercel/output/` and
   Vercel picks it up automatically via the Build Output API.
5. Install command: leave default.

There is intentionally no `vercel.json` in this repo — Vercel auto-detects
the Build Output API folder. Adding one with `"framework": "tanstack-start"`
will break the deploy.

## 3. Environment variables

The site has no backend, so no env vars are required. If you later add
server functions that read secrets, add them in **Vercel → Project →
Settings → Environment Variables** before deploying.

## 4. Deploy

Click **Deploy**. Vercel runs `vite build`, Nitro emits `.vercel/output/`,
SSR routes run on Vercel's runtime, static assets are served from the CDN.

## Custom domain

Add `sepps.eu` (or any domain) under **Vercel → Project → Domains** and
point DNS at Vercel as instructed.