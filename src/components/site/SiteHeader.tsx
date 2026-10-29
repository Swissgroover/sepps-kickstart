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
    <header className="sticky top-0 z-50 border-b border-white/10 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="group flex items-center gap-2">
          <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <span className="font-display text-lg leading-none">S</span>
            <span className="absolute inset-0 -z-10 rounded-full bg-primary blur-md opacity-60 transition-opacity group-hover:opacity-100" />
          </span>
          <span className="font-display text-xl tracking-wider">JK SEPPS</span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              className="group relative px-3 py-2 text-sm font-medium text-foreground/70 transition-colors hover:text-foreground data-[status=active]:text-foreground"
            >
              {item.label}
              <span className="pointer-events-none absolute inset-x-3 -bottom-0.5 h-0.5 origin-left scale-x-0 rounded-full bg-primary transition-transform duration-300 group-hover:scale-x-100 group-data-[status=active]:scale-x-100" />
            </Link>
          ))}
          <Link
            to="/registreeru"
            className="ml-2 inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105"
          >
            Trenni!
          </Link>
        </nav>
        <button
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/10 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menüü"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>
      {open && (
        <div className="border-t border-white/10 bg-background/95 md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-base font-medium text-foreground/80 hover:bg-white/5"
                activeProps={{ className: "bg-white/5 text-foreground" }}
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