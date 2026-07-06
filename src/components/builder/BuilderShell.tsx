import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { BuilderProvider } from "@/lib/builder/context";
import { CardPreview } from "./CardPreview";
import { ProgressBar } from "./ProgressBar";
import { Wizard } from "./Wizard";
import { Toaster } from "sonner";

export function BuilderShell() {
  return (
    <BuilderProvider>
      <div className="relative min-h-screen overflow-hidden bg-[#05060d] text-white">
        {/* ambient background */}
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute -left-32 top-0 h-[520px] w-[520px] rounded-full bg-blue-600/25 blur-[120px]" />
          <div className="absolute right-[-10%] top-1/3 h-[520px] w-[520px] rounded-full bg-indigo-600/20 blur-[140px]" />
          <div className="absolute bottom-[-20%] left-1/3 h-[520px] w-[520px] rounded-full bg-sky-500/15 blur-[140px]" />
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
              backgroundSize: "56px 56px",
            }}
          />
        </div>

        <header className="relative z-10 flex items-center justify-between px-6 py-5 sm:px-10">
          <Link
            to="/"
            className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-white/60 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" /> Tagasi
          </Link>
          <div className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-blue-400 shadow-[0_0_12px_2px_rgba(96,165,250,0.7)]" />
            <span className="font-display text-sm uppercase tracking-[0.35em] text-white/80">
              Card Studio
            </span>
          </div>
          <div className="w-14" />
        </header>

        <main className="relative z-10 mx-auto max-w-7xl px-4 pb-24 pt-2 sm:px-8">
          <div className="mb-8">
            <ProgressBar />
          </div>

          <div className="grid gap-8 lg:grid-cols-[minmax(320px,42%)_1fr]">
            <aside className="lg:sticky lg:top-6 lg:self-start">
              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-lg">
                <CardPreview />
              </div>
            </aside>

            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-lg sm:p-8">
              <Wizard />
            </div>
          </div>
        </main>

        <Toaster
          theme="dark"
          position="bottom-right"
          toastOptions={{
            style: {
              background: "rgba(15,23,42,0.95)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "white",
            },
          }}
        />
      </div>
    </BuilderProvider>
  );
}