import { createFileRoute } from "@tanstack/react-router";
import { registrationSchema } from "@/lib/registration";

// Best-effort per-instance rate limit: 5 requests / 10 min per IP.
const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const list = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  list.push(now);
  hits.set(ip, list);
  return list.length > 5;
}

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), { status, headers: { "content-type": "application/json" } });

export const Route = createFileRoute("/api/public/register")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const ip =
          request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
          request.headers.get("cf-connecting-ip") ||
          "unknown";
        if (limited(ip)) return json({ ok: false, error: "rate_limited" }, 429);

        let raw: unknown;
        try {
          raw = await request.json();
        } catch {
          return json({ ok: false, error: "invalid" }, 400);
        }
        const parsed = registrationSchema.safeParse(raw);
        if (!parsed.success) return json({ ok: false, error: "invalid" }, 400);
        // Honeypot filled → pretend success, send nothing.
        if (parsed.data.website) return json({ ok: true });

        const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
        if (!accessKey) {
          console.error("[register] not configured: WEB3FORMS_ACCESS_KEY MISSING");
          return json({ ok: false, error: "not_configured" }, 503);
        }

        const r = parsed.data;
        const res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            access_key: accessKey,
            subject: "Trenni registreerimine",
            from_name: "JK SEPPS registreerimine",
            email: r.email,
            replyto: r.email,
            "Lapse nimi": r.childName,
            "Lapse isikukood": r.childCode,
            "Vanema nimi": r.parentName,
            "Vanema isikukood": r.parentCode,
            Kontakttelefon: r.phone,
            "Vanema e-post": r.email,
            "Kodune aadress": r.address,
            "Tervislikud eripärad": r.health || "-",
            "Varasem kogemus": r.experience || "-",
            Lisainfo: r.notes || "-",
          }),
        });
        const out = (await res.json().catch(() => null)) as { success?: boolean; message?: string } | null;
        if (!res.ok || !out?.success) {
          console.error(`[register] Web3Forms failed [${res.status}]: ${out?.message ?? "no message"}`);
          return json({ ok: false, error: "send_failed", status: res.status }, 502);
        }
        return json({ ok: true });
      },
    },
  },
});
