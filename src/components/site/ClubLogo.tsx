/** Decorative beside the visible club name; standalone logos keep their name. */
export function ClubLogo({ size = "header", standalone = false }: { size?: "header" | "footer"; standalone?: boolean }) {
  return (
    <span className="inline-flex shrink-0 items-center justify-center">
      <img
        src="/images/jk-sepps-logo-valge.webp"
        alt={standalone ? "JK SEPPS" : ""}
        className={size === "footer" ? "h-13 w-auto object-contain" : "h-10 w-auto object-contain"}
      />
    </span>
  );
}