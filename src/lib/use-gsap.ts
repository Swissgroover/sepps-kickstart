import { useEffect, useRef, type RefObject } from "react";

type GsapModule = typeof import("gsap");
type ScrollTriggerModule = typeof import("gsap/ScrollTrigger");

export type GsapCtx = {
  gsap: GsapModule["gsap"];
  ScrollTrigger: ScrollTriggerModule["ScrollTrigger"];
  scope: HTMLElement;
};

export function useGsap<T extends HTMLElement = HTMLDivElement>(
  setup: (ctx: GsapCtx) => void | (() => void),
  deps: ReadonlyArray<unknown> = [],
): RefObject<T | null> {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const el = ref.current;
    if (!el) return;
    let cleanupExtra: void | (() => void);
    let ctx: ReturnType<GsapModule["gsap"]["context"]> | undefined;
    let cancelled = false;

    (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        cleanupExtra = setup({ gsap, ScrollTrigger, scope: el });
      }, el);
    })();

    return () => {
      cancelled = true;
      if (typeof cleanupExtra === "function") cleanupExtra();
      ctx?.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return ref;
}