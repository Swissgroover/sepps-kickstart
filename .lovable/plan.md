# Football Player Card Builder — Plan

Iseseisev route `/builder`, mis pole peamen\u00fc\u00fcs. J\u00e4tab JK SEPPS saidi puutumata. Premium tume UI, GSAP animatsioonid, React Context state, localStorage autosave, ei mingit backendit.

## Route ja arhitektuur

- Uus fail `src/routes/builder.tsx` (ei l\u00e4he ei `SiteHeader`isse ega footerisse)
- Eraldi shell: t\u00e4isekraan, oma tume gradient background, ei kuvata saidi navi
- SEO: `noindex` head() — see on to\u00f6riist, mitte turunduslehek\u00fclg
- URL parameetreid ei kasuta; kogu state on kliendis (localStorage v\u00f5tmega `sepps.builder.v1`)

## Tehniline valik (kinnitatud)

- **Animatsioonid**: GSAP (juba olemas `use-gsap.ts`) + Tailwindi `transition-*` klassid mikroanimatsioonideks. Framer Motion j\u00e4etakse v\u00e4lja \u2014 hoiame bundle'i v\u00e4iksena.
- **State**: React Context + `useReducer` (`BuilderContext`), custom hook `useBuilder()`. Zustandi ei lisa.
- **Vormid**: React Hook Form + Zod validation (juba dependencies'is).
- **shadcn/ui**: kasutan olemasolevaid — Button, Card, Input, Label, Slider, Progress, RadioGroup, Switch, Textarea, Tabs.
- **Ikoonid**: lucide-react.

## Failistruktuur

```text
src/routes/builder.tsx                    # route shell + layout
src/components/builder/
  BuilderShell.tsx                        # 2-col desktop / stacked mobile
  ProgressBar.tsx                         # klikitav sammuindikaator
  CardPreview.tsx                         # live-render kaardist (sticky)
  Wizard.tsx                              # samm-router + animeeritud \u00fcleminekud
  steps/
    Step1Template.tsx                     # Gold/Silver/Bronze/Legend/Neon/Premium/Tournament
    Step2Photo.tsx                        # drag&drop, crop, zoom, reposition
    Step3Info.tsx                         # RHF vorm
    Step4Rating.tsx                       # 40-99 slider, v\u00e4rvipmapping
    Step5Stats.tsx                        # PAC/SHO/PAS/DRI/DEF/PHY sliderid
    Step6Finish.tsx                       # Matte/Gloss/Premium/Framed/Signed
    Step7Size.tsx                         # S/M/L
    Step8Quantity.tsx                     # +/- kontroller
    Step9Summary.tsx                      # kokkuv\u00f5te + Add to Cart
  parts/
    PhotoCropper.tsx                      # canvas-p\u00f5hine crop/zoom/pan
    StatBar.tsx                           # kaardil kuvatav stat rida
    RatingBadge.tsx                       # overall + positsioon
    CaptainBadge.tsx / MvpBadge.tsx
    TemplateThumb.tsx
    PriceBreakdown.tsx
src/lib/builder/
  types.ts                                # BuilderState, Template, Finish, Size
  context.tsx                             # BuilderProvider + useBuilder + reducer
  storage.ts                              # localStorage load/save (SSR-safe)
  catalog.ts                              # templates, finishes, sizes, base price
  pricing.ts                              # computePrice(state) — puhas funktsioon
  ratingColor.ts                          # rating \u2192 v\u00e4rvitoken
```

Kogu \u00e4riloogika (hinnad, template metadata, stats def) elab `src/lib/builder/catalog.ts` ja `pricing.ts` failides — komponendid neid vaid tarbivad. Hiljem asendatav API-fetch'iga ilma komponente muutmata.

## Live Card Preview

- SVG + CSS kihiline render (mitte canvas), et animatsioonid oleks smooth ja teksti saaks selecteerida
- Kihid: taust (template gradient/pattern) \u2192 foto (mask + transform matrix crop'ist) \u2192 rating+positsioon \u00fcleval vasakul \u2192 lipp+klubi \u2192 nimi \u2192 stats grid \u2192 s\u00e4rginumber \u2192 captain/MVP badge
- Iga state muudatus \u2192 GSAP tween v\u00e4\u00e4rtustele (0.3s ease-out); template vahetus \u2192 flip/scale transition
- Foto: `object-fit: cover` mask'is + CSS `transform: translate() scale()` kasutaja crop-v\u00e4\u00e4rtustest
- Sticky desktopil (`lg:sticky lg:top-8`), mobiilis kleebib top'i scroll'imisel

## Multi-step Wizard

- 9 sammu, `currentStep` reducer'is
- Ainult t\u00e4idetud sammud on klikitavad ProgressBar'is (`completedSteps: Set<number>`)
- Sammu \u00fcleminekul: GSAP fade+slide (x: 24 \u2192 0, opacity 0 \u2192 1, 0.35s)
- Iga samm on iseseisev komponent, saab `useBuilder()` kaudu state'i
- Next/Back nupud allservas; Back ei kaota kunagi andmeid
- Keyboard: Enter = Next (kui valideerub), Esc = Back

## Photo cropper (Step 2)

- Drag&drop zone + file input (`<input type="file" accept="image/*">`)
- P\u00e4rast upload: modaal cropper'iga
  - Ruudukujuline mask
  - Zoom slider (1.0\u20133.0)
  - Drag positsioneerimiseks (pointer events)
  - Salvestab `{ dataUrl, offsetX, offsetY, scale }` state'i
- Placeholder-nupp "Eemalda taust (AI)" — disabled + "Peagi tulekul" tooltip (future-ready hook, kutsub `removeBackground(dataUrl)` stub'i)

## Price engine

```ts
// pricing.ts
computePrice({ size, finish, quantity }) => {
  const total = (BASE + SIZE_ADD[size] + FINISH_ADD[finish]) * quantity;
  return { subtotal, perUnit, total, breakdown: [...] };
}
```

- Hinnad eurodes, kuvatakse "\u20ac 24,90"
- Live-arvutus Step 7/8 ja Summary's

## localStorage autosave

- Iga reducer'i action j\u00e4rel `saveState()` (throttled 300ms)
- Mount'imisel `loadState()` \u2192 hydrate; SSR-safe (`typeof window` check)
- "Alusta uuesti" nupp Summary's \u2192 clear + reset

## Progress bar

- \u00dclemises ribas: sammunumbrid 1\u20139 + % (nt `4/9 \u2022 44%`)
- Klikitavad ainult varem l\u00e4bitud sammud
- GSAP progress-line width tween

## Ligip\u00e4\u00e4setavus

- Iga samm `<section aria-labelledby>`, sammupealkiri h2
- Sliderid: shadcn `Slider` juba ARIA-\u00f5ige; lisan `aria-valuetext` (nt "Overall rating 87")
- Cropper: keyboard fallback (nooleklahvid = nudge, +/- = zoom)
- Fookuse ring k\u00f5igil interaktiivsetel; nutikas Tab j\u00e4rjekord
- `prefers-reduced-motion` \u2192 GSAP kestused 0

## Add to Cart

- Sonner toast: "Kaart lisatud ostukorvi" + summary
- Salvestab `sepps.builder.cart` localStorage'i (array of builder snapshots)
- Reset builder v\u00f5i "Vaata veel" nupp

## Muutused olemasolevates failides

- `src/routes/builder.tsx` — uus fail, ei puuduta muid route'e
- Ei muudeta `SiteHeader`ist, `index.tsx`, ega \u00fchtki JK SEPPS route'i
- Ei l\u00fclitata Cloud'i sisse, ei lisata secretsi

## Deliverable

T\u00e4isfunktsionaalne builder — k\u00f5ik 9 sammu t\u00f6\u00f6tavad, live preview reageerib igale muudatusele, hind arvutub live, localStorage persist toimib, GSAP animatsioonid k\u00f5igis \u00fcleminekutes.
