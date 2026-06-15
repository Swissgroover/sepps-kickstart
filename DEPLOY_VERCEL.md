# Deploy JK SEPPS to Vercel

The project is configured to build a Vercel-native bundle (Build Output API v3)
via Nitro when built outside the Lovable sandbox.

## 1. Push the code to GitHub

Use GitHub → Connect in the Lovable top bar to push this project to a repo
(or push manually if you've cloned it).

## 2. Import the repo on Vercel

1. Go to https://vercel.com/new and pick the repository.
2. Framework preset: **Other** (Vercel auto-detects the Build Output API).
3. Build command: `bun run build` (or `npm run build` — both work).
4. Output directory: leave blank. Nitro writes to `.vercel/output/`.
5. Install command: leave default.

## 3. Environment variables

This site is fully static / SSR with no backend, so no env vars are required.
If you later enable Lovable Cloud or add server functions that read secrets,
add the corresponding variables in **Vercel → Project → Settings → Environment
Variables** before deploying.

## 4. Deploy

Click **Deploy**. Vercel will run `vite build`, Nitro will emit
`.vercel/output/`, and Vercel serves it directly — SSR routes run on Vercel's
Edge/Node runtime, static assets are served from the CDN.

## Custom domain

Add your domain (e.g. `sepps.eu`) under **Vercel → Project → Domains** and
point your DNS at Vercel as instructed.