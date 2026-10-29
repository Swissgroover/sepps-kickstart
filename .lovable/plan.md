Asenda registreerimisvormi saatmisteenus Resendi asemel Web3Formsiga. Leht jääb Vercelisse, vormi kujundus, väljad, kontrollid ja tekstid jäävad samaks.

## Mida sa pead tegema (üks kord)
1. Mine web3forms.com lehele, sisesta info@sepps.eu ja kinnita see aadressile tulnud kirjast. Saad "Access Key".
2. Lisa võti Vercelis (Settings → Environment Variables) nimega `WEB3FORMS_ACCESS_KEY`.
3. Kustuta seal soovi korral `RESEND_API_KEY` ja `REGISTRATION_FROM_EMAIL`, neid enam vaja ei lähe.
4. Avalda leht uuesti (Redeploy) ja saada üks proovivorm.

## Mis muutub
- Kirjad lähevad aadressile info@sepps.eu. Teema on endiselt „Trenni registreerimine” ja vastus läheb vanema e-postile (Reply-To).
- Saatja on Web3Forms (notify@web3forms.com). Domeeni seadistada ei ole vaja.
- Tasuta paketis saab saata kuni 250 kirja kuus.
- Edukat saatmist näidatakse ainult siis, kui Web3Forms kinnitab, et kiri on saadetud. Tõrke korral jäävad sisestatud andmed alles nagu praegu.
- Rämpspostitõke (honeypot) ja saatmissageduse piirang jäävad alles.

## Tehnilised üksikasjad
- `src/routes/api/public/register.ts`: Resendi päring asendatakse päringuga `POST https://api.web3forms.com/submit`. Saadetakse JSON: `access_key` (serveri keskkonnamuutujast), `subject`, `email`/`replyto` = vanema e-post, `from_name`: "JK SEPPS registreerimine" ja vormiväljad eestikeelsete siltidega. Vastuses kontrollitakse `success: true`. Võti on ainult serveris ja brauserisse ei jõua.
- Kui `WEB3FORMS_ACCESS_KEY` puudub, tagastab server 503 ja logi kirjutab "[register] not configured". Vormi sisu logidesse ei kirjutata.
- AGENTS.md: registreerimisvormi reegel uuendatakse, et see viitaks Web3Formsile.
- Andmebaasi ei lisata. Teisi lehti ei muudeta.
