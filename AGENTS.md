## Deployment assets
- Keep the homepage hero photo and favicon as real files in `public/` and reference them with root-relative URLs, so Vercel deployments do not depend on Lovable asset serving.
- The homepage photo hero is static and must not initialize GSAP; other animations must verify their DOM targets before starting.