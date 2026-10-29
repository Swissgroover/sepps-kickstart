import type { ReactNode } from "react";

export function PageIntro({ eyebrow, title, children }: { eyebrow: string; title: ReactNode; children?: ReactNode }) {
  return (
    <section className="bg-soft">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20">
        <div className="mb-2 text-sm font-semibold text-primary">{eyebrow}</div>
        <h1 className="font-display max-w-3xl text-4xl leading-tight sm:text-5xl">{title}</h1>
        {children && <div className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">{children}</div>}
      </div>
    </section>
  );
}

export const btnPrimary =
  "inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition-colors hover:bg-pitch-deep";
export const btnSecondary =
  "inline-flex h-12 items-center justify-center gap-2 rounded-full border border-input bg-background px-6 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary";
