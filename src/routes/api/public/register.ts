import { createFileRoute } from "@tanstack/react-router";
import { registrationSchema, type Registration } from "@/lib/registration";

// Best-effort per-instance rate limit: 5 requests / 10 min per IP.
const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const list = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  list.push(now);
  hits.set(ip, list);
  return list.length > 5;
}

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

function body(r: Registration) {
  const rows: [string, string][] = [
    ["Lapse nimi", r.childName],
    ["Lapse isikukood", r.childCode],
    ["Vanema nimi", r.parentName],
    ["Vanema isikukood", r.parentCode],
    ["Kontakttelefon", r.phone],
    ["Vanema e-post", r.email],
    ["Kodune aadress", r.address],
    ["Tervislikud eripärad", r.health || "-"],
    ["Varasem kogemus", r.experience || "-"],
    ["Lisainfo", r.notes || "-"],
  ];
  return {
    text: `Uus trenni registreerimissoov\n\n${rows.map(([k, v]) => `${k}: ${v}`).join("\n")}`,
    html: `<h2>Uus trenni registreerimissoov</h2><table cellpadding="6">${rows
      .map(([k, v]) => `<tr><td><b>${esc(k)}</b></td><td>${esc(v).replace(/\n/g, "<br>")}</td></tr>`)
      .join("")}</table>`,
  };
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

        const apiKey = process.env.RESEND_API_KEY;
        const from = process.env.REGISTRATION_FROM_EMAIL;
        if (!apiKey || !from) return json({ ok: false, error: "not_configured" }, 503);

        const { text, html } = body(parsed.data);
        const res = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
          body: JSON.stringify({
            from,
            to: ["info@sepps.eu"],
            reply_to: parsed.data.email,
            subject: "Trenni registreerimine",
            text,
            html,
          }),
        });
        if (!res.ok) return json({ ok: false, error: "send_failed" }, 502);
        return json({ ok: true });
      },
    },
  },
});
