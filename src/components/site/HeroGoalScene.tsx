import { useGsap } from "@/lib/use-gsap";

/**
 * Animated SVG scene: goal frame draws in, net fades in, ball rolls in
 * spinning with "JK SEPPS" on it, hits net and net ripples.
 */
export function HeroGoalScene() {
  const ref = useGsap<HTMLDivElement>(({ gsap, scope }) => {
    const q = gsap.utils.selector(scope);
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    gsap.set(q(".frame-line"), { drawSVG: undefined });
    gsap.set(q(".net-line"), { autoAlpha: 0 });
    gsap.set(q(".ball-group"), { x: -260, y: 60, rotation: 0, transformOrigin: "50% 50%" });
    gsap.set(q(".ball-text"), { autoAlpha: 0, scale: 0.6, transformOrigin: "50% 50%" });
    gsap.set(q(".shockwave"), { scale: 0.2, autoAlpha: 0, transformOrigin: "50% 50%" });

    // Goal frame draws in via stroke-dashoffset
    q(".frame-line").forEach((el) => {
      const len = (el as SVGGeometryElement).getTotalLength?.() ?? 800;
      gsap.set(el, { strokeDasharray: len, strokeDashoffset: len });
    });
    tl.to(q(".frame-line"), {
      strokeDashoffset: 0,
      duration: 0.9,
      stagger: 0.08,
      ease: "power2.inOut",
    });

    // Net fades in
    tl.to(q(".net-line"), { autoAlpha: 0.45, duration: 0.5, stagger: 0.01 }, "-=0.3");

    // Ball rolls in spinning
    tl.to(
      q(".ball-group"),
      {
        x: 0,
        y: 0,
        rotation: -540,
        duration: 1.1,
        ease: "power2.in",
      },
      "-=0.5",
    );

    // Impact: shockwave + net ripple
    tl.to(q(".shockwave"), { scale: 1.4, autoAlpha: 0.6, duration: 0.5, ease: "power2.out" }, "-=0.1")
      .to(q(".shockwave"), { autoAlpha: 0, duration: 0.35 }, "-=0.1");

    tl.to(
      q(".net-line"),
      {
        keyframes: [
          { scaleY: 1.08, duration: 0.15 },
          { scaleY: 0.97, duration: 0.18 },
          { scaleY: 1, duration: 0.2 },
        ],
        transformOrigin: "50% 0%",
        stagger: { each: 0.01, from: "center" },
        ease: "sine.inOut",
      },
      "-=0.65",
    );

    // Ball bounce + text appear
    tl.to(q(".ball-group"), { y: -14, duration: 0.18, ease: "power2.out" }, "-=0.55")
      .to(q(".ball-group"), { y: 0, duration: 0.22, ease: "bounce.out" })
      .to(q(".ball-text"), { autoAlpha: 1, scale: 1, duration: 0.5, ease: "back.out(2)" }, "-=0.25");

    // Idle: slow ball nudge
    tl.to(
      q(".ball-group"),
      {
        y: -6,
        duration: 1.6,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      },
      "+=0.3",
    );
  }, []);

  return (
    <div ref={ref} className="relative aspect-[5/4] w-full">
      <svg viewBox="0 0 600 480" className="h-full w-full" fill="none" aria-hidden>
        <defs>
          <radialGradient id="ballGrad" cx="35%" cy="30%" r="75%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="60%" stopColor="#f3f3f3" />
            <stop offset="100%" stopColor="#c8c8c8" />
          </radialGradient>
          <radialGradient id="glowGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="oklch(0.72 0.18 250)" stopOpacity="0.55" />
            <stop offset="100%" stopColor="oklch(0.72 0.18 250)" stopOpacity="0" />
          </radialGradient>
          <path id="ballArcTop" d="M 240,300 A 60,60 0 0 1 360,300" />
        </defs>

        {/* glow behind goal */}
        <circle cx="300" cy="240" r="240" fill="url(#glowGrad)" />

        {/* Goal — 3D wireframe */}
        <g stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="text-white">
          <line className="frame-line" x1="100" y1="120" x2="100" y2="360" />
          <line className="frame-line" x1="500" y1="120" x2="500" y2="360" />
          <line className="frame-line" x1="100" y1="120" x2="500" y2="120" />
          <line className="frame-line" x1="100" y1="120" x2="60" y2="160" />
          <line className="frame-line" x1="500" y1="120" x2="540" y2="160" />
          <line className="frame-line" x1="100" y1="360" x2="60" y2="380" />
          <line className="frame-line" x1="500" y1="360" x2="540" y2="380" />
          <line className="frame-line" x1="60" y1="160" x2="540" y2="160" />
          <line className="frame-line" x1="60" y1="160" x2="60" y2="380" />
          <line className="frame-line" x1="540" y1="160" x2="540" y2="380" />
          <line className="frame-line" x1="60" y1="380" x2="540" y2="380" />
        </g>

        {/* Net — slanted grid between front and back frame */}
        <g stroke="currentColor" strokeWidth="1" className="text-white">
          {Array.from({ length: 13 }).map((_, i) => {
            const t = i / 12;
            const xFront = 100 + t * 400;
            const xBack = 60 + t * 480;
            return (
              <line
                key={`v${i}`}
                className="net-line"
                x1={xFront}
                y1={120}
                x2={xBack}
                y2={160}
              />
            );
          })}
          {Array.from({ length: 13 }).map((_, i) => {
            const t = i / 12;
            const xFront = 100 + t * 400;
            const xBack = 60 + t * 480;
            return (
              <line
                key={`vd${i}`}
                className="net-line"
                x1={xFront}
                y1={360}
                x2={xBack}
                y2={160 + (380 - 160) * (1 - 0) + 0}
                // straight slanted line down/back
                {...{ x2: xBack, y2: 380 }}
              />
            );
          })}
          {/* horizontal net rows */}
          {Array.from({ length: 6 }).map((_, i) => {
            const t = (i + 1) / 7;
            const yFront = 120 + t * 240;
            const yBack = 160 + t * 220;
            return (
              <g key={`h${i}`}>
                <line className="net-line" x1={100} y1={yFront} x2={500} y2={yFront} />
                <line className="net-line" x1={60} y1={yBack} x2={540} y2={yBack} />
              </g>
            );
          })}
        </g>

        {/* shockwave on impact */}
        <circle className="shockwave" cx="300" cy="300" r="80" stroke="oklch(0.72 0.18 250)" strokeWidth="3" />

        {/* Ball */}
        <g className="ball-group">
          <circle cx="300" cy="300" r="60" fill="url(#ballGrad)" stroke="#111" strokeWidth="2" />
          {/* hex pattern hint */}
          <g stroke="#111" strokeWidth="2" fill="#111" opacity="0.85">
            <polygon points="300,260 318,272 311,292 289,292 282,272" />
            <polygon points="265,300 277,283 295,290 293,310 275,315" />
            <polygon points="335,300 323,283 305,290 307,310 325,315" />
            <polygon points="300,340 282,328 289,308 311,308 318,328" />
          </g>
        </g>

        {/* SEPPS text on ball (static, fades in after) */}
        <g className="ball-text">
          <text
            x="300"
            y="306"
            textAnchor="middle"
            fontFamily="Bebas Neue, sans-serif"
            fontSize="28"
            fill="oklch(0.52 0.24 258)"
            letterSpacing="2"
          >
            JK SEPPS
          </text>
        </g>
      </svg>
    </div>
  );
}