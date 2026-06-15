import { Link } from "@tanstack/react-router";
import { Facebook, Mail, Phone } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="relative mt-20 border-t border-white/10 bg-ink">
      <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <span className="font-display text-lg leading-none">S</span>
            </span>
            <span className="font-display text-2xl tracking-wider">JK SEPPS</span>
          </div>
          <p className="mt-3 max-w-xs text-sm text-foreground/60">
            Jalgpalliklubi, mis kasvatab mängijaid kirega, distsipliiniga ja rõõmuga.
          </p>
        </div>
        <div>
          <h4 className="font-display text-sm uppercase tracking-[0.2em] text-foreground/60">Liigu</h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link to="/klubi" className="hover:text-primary">Klubi</Link></li>
            <li><Link to="/vormid" className="hover:text-primary">Vormid</Link></li>
            <li><Link to="/registreeru" className="hover:text-primary">Registreeru trenni</Link></li>
            <li><Link to="/kontakt" className="hover:text-primary">Kontakt</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display text-sm uppercase tracking-[0.2em] text-foreground/60">Kontakt</h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li><a href="mailto:info@sepps.eu" className="inline-flex items-center gap-2 hover:text-primary"><Mail size={14} /> info@sepps.eu</a></li>
            <li><a href="tel:+37253363247" className="inline-flex items-center gap-2 hover:text-primary"><Phone size={14} /> +372 53 36 3247</a></li>
            <li>
              <a
                href="https://www.facebook.com/p/JK-SEPPS-100084304296076/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 hover:text-primary"
              >
                <Facebook size={14} /> Facebook
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/5 py-5 text-center text-xs text-foreground/40">
        © {new Date().getFullYear()} JK SEPPS · ERASPORDIKOOL SEPPS
      </div>
    </footer>
  );
}