export function PitchBackground({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`pointer-events-none absolute inset-0 h-full w-full opacity-[0.18] ${className}`}
      viewBox="0 0 1200 700"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden
    >
      <rect x="40" y="40" width="1120" height="620" rx="6" />
      <line x1="600" y1="40" x2="600" y2="660" />
      <circle cx="600" cy="350" r="90" />
      <circle cx="600" cy="350" r="3" fill="currentColor" />
      <rect x="40" y="180" width="180" height="340" />
      <rect x="980" y="180" width="180" height="340" />
      <rect x="40" y="260" width="80" height="180" />
      <rect x="1080" y="260" width="80" height="180" />
      <path d="M 220 280 A 90 90 0 0 1 220 420" />
      <path d="M 980 280 A 90 90 0 0 0 980 420" />
    </svg>
  );
}