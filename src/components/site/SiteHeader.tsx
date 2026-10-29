import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";

const nav = [
  { to: "/", label: "Avaleht" },
  { to: "/klubi", label: "Klubi" },
  { to: "/vormid", label: "Vormid" },
  { to: "/registreeru", label: "Registreeru" },
  { to: "/kontakt", label: "Kontakt" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <span className="font-display text-base leading-none">S</span>
          </span>
          <span className="font-display text-lg">JK SEPPS</span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              className="rounded-md px-3 py-2 text-sm font-medium text-foreground/75 transition-colors hover:text-primary data-[status=active]:text-primary"
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/registreeru"
            className="ml-2 inline-flex h-10 items-center rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-pitch-deep"
          >
            Registreeru trenni
          </Link>
        </nav>
        <button
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menüü"
          aria-expanded={open}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>
      <div className="flex h-1">
        <span className="flex-1 bg-primary" />
        <span className="flex-1 bg-ink" />
        <span className="flex-1 bg-background" />
      </div>
      {open && (
        <div className="border-t border-border bg-background md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2.5 text-base font-medium text-foreground hover:bg-soft"
                activeProps={{ className: "bg-soft text-primary" }}
                activeOptions={{ exact: item.to === "/" }}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
