# JK SEPPS — hele ja usaldusväärne kujundus

Säilitame kõik lehed (Avaleht, Klubi, Vormid, Registreeru, Kontakt), eestikeelse sisu, kontaktid ja lingid. Kaardikoostaja (/builder) jääb puutumata.

## Värvid
- Põhitaust valge #FFFFFF, sektsioonide vaheldus #EFF5FF ja vajadusel #F5F7FA.
- Klubisinine jääb nuppudele, linkidele, aktiivsele menüüle ja rõhutustele.
- Tekst ja pealkirjad #151515.
- Päis valge, tume tekst, sinised rõhutused. Jalus must, valge tekst, sinised detailid.
- Eemaldame neoonhelendused, udused värvilaigud, suured mustad pinnad ja jalgpalliväljaku joonte tausta.
- Üks tagasihoidlik sini-must-valge triip (nt päise all), mitte igas sektsioonis.

## Tüpograafia ja paigutus
- Bebas Neue suurtähtpealkirjad asendatakse Inter-iga, tavalises lausekujus.
- Väiksemad vahed, madalamad sektsioonid.
- Vaheldame tekstiplokke, pildikohti ja sisuridu — mitte ainult ikoonikaarte.
- Animatsioonid tagasihoidlikud; sisu on kohe nähtav (Reveal ei peida sisu enam). Väravaanimatsioon ja marquee eemaldatakse.

## Avaleht
- Hele kaheveeruline esimene ekraan: vasakul pealkiri „Tule JK SEPPSi jalgpallitrenni!”, lühike tutvustus, nupp „Registreeru trenni” ja link „Tutvu klubiga”; paremal suur vahetatav fotokoht (päris klubifotot projektis pole, seega neutraalne kohatäide — fotosid ei genereerita).
- Allpool: klubi tutvustus, trenni registreerimine (esiplaanil), vormide tellimine (teisejärguline).
- Väljamõeldud aegu, treenereid, statistikat ega tagasisidet ei lisata.

## Registreerimine
- Pealkiri „Registreeri laps trenni”, selgitus ja nupp „Ava registreerimiskiri” täpselt nagu antud.
- mailto: info@sepps.eu, teema „Lapse registreerimine JK SEPPSi trenni”, uus kirjamall täpselt antud väljadega, korrektselt kodeeritud.
- Nupu all märkus, et kiri tuleb ise ära saata. „Registreerimine õnnestus” teadet ei näidata.
- Varuvariant: nähtav aadress ja kirjamall koos „Kopeeri aadress” ja „Kopeeri kirjamall” nuppudega.
- Kolme sammu juhised uuendatakse uute väljade järgi.

## Tehniline
- `src/styles.css`: heledad tokenid (background, card, muted, secondary = #EFF5FF, border), `--font-display` → Inter.
- Uuendame SiteHeader, SiteFooter, SectionHeading, Reveal ja kõik viis lehte; `white/10`, `bg-ink`, `blur-3xl` jms asendatakse semantiliste tokenitega.
- Lisame väikese testi, mis kontrollib mailto teemat ja kirja sisu.
