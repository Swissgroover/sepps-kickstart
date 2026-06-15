import { useGsap } from "@/lib/use-gsap";
import type { ReactNode } from "react";

export function Reveal({
  children,
  className = "",
  delay = 0,
  y = 24,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const ref = useGsap<HTMLDivElement>(({ gsap, scope }) => {
    gsap.from(scope, {
      autoAlpha: 0,
      y,
      duration: 0.9,
      ease: "power3.out",
      delay,
      scrollTrigger: { trigger: scope, start: "top 85%", toggleActions: "play none none none" },
    });
  }, []);
  return (
    <div ref={ref} className={className} style={{ visibility: "hidden" }}>
      {children}
    </div>
  );
}