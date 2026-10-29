import { createFileRoute } from "@tanstack/react-router";

// Web3Forms' free plan only accepts submissions sent from the visitor's browser
// (server-side posts get 403). The access key is public by design, so this route
// only hands it to the form at runtime — the env var stays WEB3FORMS_ACCESS_KEY on Vercel.
const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json", "cache-control": "no-store" },
  });

export const Route = createFileRoute("/api/public/register")({
  server: {
    handlers: {
      GET: async () => {
        const key = process.env.WEB3FORMS_ACCESS_KEY;
        if (!key) {
          console.error("[register] not configured: WEB3FORMS_ACCESS_KEY MISSING");
          return json({ ok: false, error: "not_configured" }, 503);
        }
        return json({ ok: true, key });
      },
    },
  },
});
