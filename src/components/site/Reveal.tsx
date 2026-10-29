import type { ReactNode } from "react";

/** Content is always visible; kept as a simple wrapper for layout. */
export function Reveal({ children, className = "" }: { children: ReactNode; className?: string; delay?: number; y?: number }) {
  return <div className={className}>{children}</div>;
}
