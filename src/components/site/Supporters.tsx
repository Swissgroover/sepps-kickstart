import { useEffect, useRef, useState } from "react";
import { SectionHeading } from "@/components/site/SectionHeading";
import { supporters, SUPPORTER_SPEED } from "@/lib/supporters";

export function Supporters() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef<HTMLUListElement>(null);
  const animationRef = useRef<Animation | null>(null);
  const [reduced, setReduced] = useState(true);
  const [copies, setCopies] = useState(1);

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    const group = groupRef.current;
    if (!viewport || !track || !group) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const measure = () => {
      animationRef.current?.cancel();
      animationRef.current = null;
      setReduced(preference.matches);
      const width = group.getBoundingClientRect().width;
      if (preference.matches || width <= 0) return;
      setCopies(Math.max(1, Math.ceil(viewport.clientWidth / width)));
      const animation = track.animate(
        [{ transform: "translateX(0)" }, { transform: `translateX(-${width}px)` }],
        { duration: (width / SUPPORTER_SPEED) * 1000, iterations: Infinity, easing: "linear" },
      );
      animationRef.current = animation;
    };
    const observer = new ResizeObserver(measure);
    observer.observe(viewport);
    observer.observe(group);
    preference.addEventListener("change", measure);
    measure();
    return () => {
      observer.disconnect();
      preference.removeEventListener("change", measure);
      animationRef.current?.cancel();
    };
  }, []);

  if (supporters.length === 0) return null;

  const logos = (copy: boolean) => supporters.map((supporter) => (
    <li className="supporter-logo" key={supporter.id} data-supporter-id={supporter.id}>
      <img src={supporter.logoSrc} alt={copy ? "" : supporter.name} width={480} height={240} loading="lazy" />
    </li>
  ));

  return (
    <section className="overflow-hidden border-t border-border py-16 sm:py-20" aria-labelledby="supporters-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading title={<span id="supporters-heading">Meie tegemisi <span className="text-primary">toetavad</span></span>} />
        </div>
        <div ref={viewportRef} id="supporter-strip" className="supporter-viewport mt-10" data-motion={reduced ? "paused" : "running"} tabIndex={0} role="region" aria-label="Toetajate logod">
          <div ref={trackRef} className="supporter-track">
            <ul ref={groupRef} className="supporter-group">{logos(false)}</ul>
            {Array.from({ length: copies }, (_, index) => (
              <ul key={index} className="supporter-group supporter-copy" aria-hidden="true">{logos(true)}</ul>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}