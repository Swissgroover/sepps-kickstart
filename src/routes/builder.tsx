import { createFileRoute } from "@tanstack/react-router";
import { BuilderShell } from "@/components/builder/BuilderShell";

export const Route = createFileRoute("/builder")({
  head: () => ({
    meta: [
      { title: "Card Studio · JK SEPPS" },
      { name: "description", content: "Loo oma isiklik jalgpallikaart." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Card Studio · JK SEPPS" },
      { property: "og:description", content: "Loo oma isiklik jalgpallikaart." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: BuilderPage,
});

function BuilderPage() {
  return <BuilderShell />;
}