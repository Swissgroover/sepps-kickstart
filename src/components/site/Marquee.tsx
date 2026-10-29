export function Marquee({ items }: { items: string[] }) {
  const row = [...items, ...items];
  return (
    <div className="relative overflow-hidden border-y border-white/10 bg-primary py-4 text-primary-foreground">
      <div className="flex w-max animate-marquee gap-12 whitespace-nowrap font-display text-3xl uppercase tracking-[0.18em] sm:text-4xl">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-12">
            {t}
            <span className="inline-block h-2 w-2 rounded-full bg-primary-foreground" />
          </span>
        ))}
      </div>
    </div>
  );
}