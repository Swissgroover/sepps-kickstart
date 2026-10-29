# Registreerimisvorm lehel (FormSubmit → info@sepps.eu)

## Mida teeme
- Lehel /registreeru asendatakse nupp "Registreeru trenni" (mis avab e-posti programmi) päris vormiga. See on samas kaardis ja samas stiilis.
- Vormi väljad on samad mis praeguses kirjamallis: Lapse nimi, Lapse isikukood, Vanema nimi, Vanema isikukood, Kontakttelefon, Kodune aadress, Tervislikud eripärad, Varasem kogemus ja Lisainfo. Juurde tuleb vanema e-post, et klubi saaks vastata.
- Kohustuslikud väljad: lapse nimi, vanema nimi, telefon ja e-post. Teised on vabatahtlikud. Igal väljal on pikkusepiirang ja eestikeelsed veateated.
- Nupp "Saada registreering": saatmise ajal näidatakse ooteolekut, õnnestumisel tuleb teade "Täname! Võtame peagi ühendust" ja ebaõnnestumisel veateade.
- Kiri läheb FormSubmiti kaudu aadressile info@sepps.eu. Teema jääb samaks: "Trenni registreerimine". Vanema e-post määratakse vastamise aadressiks.
- Kolme sammu tekstid ("Vajuta nuppu…") kohandatakse vormile. Muu kujundus, Merlyni kontaktiplokk ja teised lehed jäävad muutmata.

## Oluline
- Esimese saatmise järel saadab FormSubmit aadressile info@sepps.eu aktiveerimiskirja. Klubi peab seal ühe korra lingile vajutama, alles siis hakkavad kirjad kohale jõudma.
- Vorme ei salvestata kuhugi mujale kui postkasti. Kui on soovi, saab hiljem lisada varukoopia.

## Tehniline
- Fail: src/routes/registreeru.tsx. Kasutatakse React Hook Formi ja zodi ning shadcn Input/Textarea/Label komponente.
- Vorm saadetakse `fetch` POST-päringuga aadressile `https://formsubmit.co/ajax/info@sepps.eu` (JSON, `_subject`, `_replyto`, `_template: "table"`, `_captcha: "false"` ja honeypot-väli `_honey`).
- Backendit ega salasõnu pole vaja. Töötab Vercelis ilma muudatusteta.
