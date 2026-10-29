import { Link } from "@tanstack/react-router";
import { Facebook, Mail, Phone } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t-4 border-primary bg-ink text-chalk">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <span className="font-display text-base leading-none">S</span>
            </span>
            <span className="font-display text-xl">JK SEPPS</span>
          </div>
          <p className="mt-3 max-w-xs text-sm text-chalk/70">
            ERASPORDIKOOL SEPPSi jalgpalliklubi lastele ja noortele.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-pitch-glow">Lehed</h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link to="/klubi" className="hover:text-pitch-glow">Klubi</Link></li>
            <li><Link to="/vormid" className="hover:text-pitch-glow">Vormid</Link></li>
            <li><Link to="/registreeru" className="hover:text-pitch-glow">Registreeru trenni</Link></li>
            <li><Link to="/kontakt" className="hover:text-pitch-glow">Kontakt</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-pitch-glow">Kontakt</h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li><a href="mailto:info@sepps.eu" className="inline-flex items-center gap-2 hover:text-pitch-glow"><Mail size={14} /> info@sepps.eu</a></li>
            <li><a href="tel:+37253363247" className="inline-flex items-center gap-2 hover:text-pitch-glow"><Phone size={14} /> +372 53 36 3247</a></li>
            <li>
              <a href="https://www.facebook.com/p/JK-SEPPS-100084304296076/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-pitch-glow">
                <Facebook size={14} /> Facebook
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-chalk/10 py-5 text-center text-xs text-chalk/50">
        © {new Date().getFullYear()} JK SEPPS · ERASPORDIKOOL SEPPS
      </div>
    </footer>
  );
}
