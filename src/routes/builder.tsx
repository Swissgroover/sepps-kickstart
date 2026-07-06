import { createFileRoute } from "@tanstack/react-router";
import { BuilderShell } from "@/components/builder/BuilderShell";

export const Route = createFileRoute("/builder")({
  head: () => ({
    meta: [
      { title: "Card Studio · JK SEPPS" },
      { name: "description", content: "Loo oma isiklik jalgpallikaart." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: BuilderPage,
});

function BuilderPage() {
  return <BuilderShell />;
}