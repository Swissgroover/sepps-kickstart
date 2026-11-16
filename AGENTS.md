## Deployment assets
- Keep the homepage hero photo and favicon as real files in `public/` and reference them with root-relative URLs, so Vercel deployments do not depend on Lovable asset serving.
- The homepage photo hero is static and must not initialize GSAP; other animations must verify their DOM targets before starting.
- Registration form posts from the browser to Web3Forms (free plan rejects server-side posts with 403); the public key comes from env WEB3FORMS_ACCESS_KEY via GET /api/public/register; nothing is stored, so the site stays deployable on Vercel without a database.
- Training policy display values are shared in a browser-safe module and covered by focused tests so training and registration pages remain consistent.
- Named content lives in separate TanStack routes; registration and kit instruction section links use typed Links with hash targets and sticky-header scroll offsets.
- Homepage supporters come from one browser-safe list with explicit stable IDs; the strip measures its loop width for constant-speed motion and respects reduced motion without GSAP.
