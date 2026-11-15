# Täisveebi taastamine + registreerimisvorm Kontakti lehele

## Mis muutub
1. Täisveeb tuleb tagasi nagu varem: avalehel on taas meeskonnafotoga hero, kaardid ja klubitutvustus; Klubi, Vormid, Registreeru ja Kontakt lehed avanevad; päises ja jaluses on taas täielik menüü.
2. Kontakti lehele lisandub sama registreerimisvorm (Treeninggrupp jm väljad, saatmine Web3Formsi kaudu nagu praegu). Vorm tuleb lehe ülaosa järele, enne meeskonna kontakte, samas kaardikujunduses nagu avalehel praegu (pealkiri "Tule JK SEPPSi trenni" + lause "Täida vorm ja registreeri laps treeningutele!").
3. Registreeru leht jääb samaks, nagu oli (ka seal on vorm).

## Tehniline
- `src/lib/registration-only.ts`: `registrationOnlyMode = false` (lüliti jääb alles hilisemaks kasutuseks).
- `src/routes/kontakt.tsx`: impordi `RegistrationForm`, lisa uus sektsioon hero ja "Meeskond" vahele.
- Muid faile ei muudeta; kujundus säilib.
