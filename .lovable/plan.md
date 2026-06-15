
# JK SEPPS — animeeritud kodulehe plaan

Kodulehe stiil: tume, energiline jalkavaib — sinine (#0047FF tooni), must, valge. Suur ekspressiivne tüpograafia (nt Bebas Neue + Inter), staadioni-/väljaku graafilised detailid, GSAP animatsioonid (hero reveal, scroll-triggered sektsioonid, hover micro-interactions, marquee/ticker, parallax).

## Lehestruktuur (TanStack Start route'id)

```
/              Avaleht (hero, klubi tutvustus, CTA-d, kontakti preview)
/klubi         Klubi tutvustus (lugu, väärtused, peatreener)
/vormid        Treening- ja võistlusvormide tellimine (iSport link + CTA-kaardid)
/registreeru   Trenni registreerimine (mailto-vormi CTA + juhend)
/kontakt       Kontaktid (4 inimest, e-mail, telefon)
```

Igal route'il oma `head()` meta (title, description, og).

## Sektsioonid ja sisu

**Avaleht (/)**
- Hero: massiivne tekst "JK SEPPS", GSAP split-text reveal, taustal animeeritud väljaku jooned + liikuv "FOOTBALL CLUB" marquee. CTA-d: "Registreeru trenni" + "Telli vorm".
- Sticker-ribbon ticker ("JK SEPPS • EST • FOOTBALL • SINCE …")
- "Mis on SEPPS" lühitutvustus scroll-fade'iga.
- Kolm kaarti: Klubi · Vormid · Registreeru — hover tilt/glow.
- Kontakti preview + footer CTA.

**/klubi**
- Klubi lugu (Facebook lehelt: jalgpalliklubi, kuulub ERASPORDIKOOL SEPPSi alla, peatreener Madis Sepp).
- Väärtused (3–4 ikoonkaarti animeeritud joonega).
- Peatreeneri tutvustus.

**/vormid**
- Suunamine iSport poodi: https://isport.ee/tootekategooria/klubid/jk-sepps/
- Kaks suurt CTA-kaarti: Treeningvorm / Võistlusvorm — animeeritud särgi-illustratsiooniga (SVG, GSAP hover).
- Selgitus tellimisprotsessist.

**/registreeru**
- Lühike juhend (kellele, kuidas, mis info kaasa panna).
- Suur "Saada e-kiri" nupp → `mailto:info@sepps.eu?subject=Trenni registreerimine&body=...` eeltäidetud kehaga (nimi, vanus, kontakt).
- Märge alternatiivse kontakti kohta (Merlyn — õppejuht).

**/kontakt**
- 4 kontaktikaarti (Merlyn Leiman, Madis Sepp, Kaiti Enno, Oliver Moring) animeeritud reveal'iga, klikitavad `tel:` ja `mailto:` lingid.
- Üldkontakt: info@sepps.eu.
- Lingid Facebooki ja iSport poodi.

## Animatsioonid (GSAP)
- `gsap` + `ScrollTrigger` + `SplitText`-laadne käsitsi split (litsentsi vältimiseks teeme custom char-spliti).
- Hero: stagger sissetulek, taustal SVG väljaku jooned joonistuvad (`strokeDashoffset`).
- Marquee ticker (lõputu horisontaalne kerimine).
- Scroll-reveal igal sektsioonil (fade + y-translate).
- Hover: kaardid tilt + glow, nupud magnetic hover.
- Lehevahetus: lühike route transition (fade/slide).

## Tehniline

- Stack: olemasolev TanStack Start + Tailwind v4 + shadcn.
- Lisa pakett: `gsap` (`bun add gsap`).
- Disain-tokenid `src/styles.css` `@theme`-i: `--color-pitch` (sinine ~oklch sinine), `--color-ink` (must), `--color-chalk` (valge), `--font-display` (Bebas Neue), `--font-body` (Inter). Fondid laetakse `__root.tsx` head'i `<link>`-iga Google Fontsist.
- Ühine `SiteHeader` + `SiteFooter` komponent, kasutusel `__root.tsx`-is `<Outlet />` ümber.
- GSAP wrapper hook `useGsap` (cleanup `useGSAP` mustriga, client-only — `useEffect`-i sees, et SSR ei katki).
- Iga route oma `head()` metaga (title, description, og).
- Pildi/illustratsiooni vajadusel genereerin SVG-d inline (väljakujooned, palli ikoon, särk) — ei vaja AI-pilte (kui soovid, saan lisada hero-pildi imagegen'iga).

## Andmed/backend

Backendit ei lisa — kõik staatiline + `mailto:` ja välislingid. Lovable Cloud pole vajalik.

## Mis võiks veel olla (kinnitamiseks)

- Kas hero'sse genereerin AI-pildi (nt mängija siluett sinise valguse käes) või jääme puhtalt tüpograafia + SVG peale?
- Kas lisame ka uudiste/sotsiaalmeedia sektsiooni (Facebook embed) avalehele?
