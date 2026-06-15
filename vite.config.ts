import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Inside the Lovable sandbox the wrapper forces the Cloudflare preset and
// ignores `nitro` overrides. Outside the sandbox (e.g. on Vercel) we force
// Nitro on so it emits a Build Output API bundle in `.vercel/output/`.
// Nitro auto-detects the `vercel` preset from the `VERCEL=1` env Vercel sets.
export default defineConfig({
  vite: {},
  nitro: true,
});
