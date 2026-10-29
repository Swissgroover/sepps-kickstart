Muuda registreerimislehe olemasolev e-kirja avamise lahendus päris vormiks. Säilita praegune kujundus, värvid, hero, Merlyni kontaktiplokk ja kõik teised lehed.

VORMI VÄLJAD

Kohustuslikud:

- Lapse nimi
- Lapse isikukood
- Vanema nimi
- Vanema isikukood
- Kontakttelefon
- Vanema e-post
- Kodune aadress

Vabatahtlikud:

- Tervislikud eripärad
- Varasem kogemus
- Lisainfo

Tervislike eripärade välja abitekst:  
„Lisa ainult info, millega treener peab lapse turvaliseks osalemiseks arvestama.”

Kasuta viimase kolme välja jaoks mitmerealist tekstiala. Märgi kohustuslikud väljad selgelt.

VALIDEERIMINE

- Kasuta eestikeelseid veateateid.
- Kontrolli isikukoodide pikkust, kuupäeva ja kontrollnumbrit.
- Hoia isikukoodid tekstina, mitte arvuna.
- Telefoniväli peab lubama rahvusvahelist suunakoodi, tühikuid ja sulge.
- Kontrolli e-posti vormingut.
- Lisa mõistlikud pikkusepiirangud.
- Rakenda kontroll nii brauseris kui ka serveris.

SAATMINE

Nupu tekst: „Saada registreerimissoov”.

Ära kasuta FormSubmiti. Loo Verceliga ühilduv serveripoolne saatmise endpoint ning saada kiri projekti jaoks seadistatud e-posti teenuse kaudu.

- Saaja: [info@sepps.eu](mailto:info@sepps.eu)
- Teema: Trenni registreerimine
- Reply-To: vormis sisestatud vanema e-post
- Saatja: e-posti teenuses kinnitatud klubile kuuluv aadress
- Teenuse võtmed peavad asuma ainult serveri keskkonnamuutujates.

Kui saatmise teenus pole veel seadistatud, nimeta täpselt vajalikud seadistused. Ära simuleeri edukat saatmist.

Lisa serveripoolne päringusageduse piirang ja honeypot-rämpspostikaitse.

Ära salvesta vormi sisu localStorage’i, analüütikasse ega rakenduse logidesse. Ära lisa andmebaasi salvestamist.

SAATMISE OLEKUD

- Saatmise ajal: „Saadan…” ja korduv saatmine blokeeritud.
- Õnnestumise teadet näita alles pärast serveri kinnitatud edukat saatmist:  
„Aitäh! Sinu registreerimissoov on saadetud. Võtame sinuga ühendust ja lepime kokku trenni tulemise.”
- Tõrke korral säilita sisestatud andmed ning kuva:  
„Saatmine ei õnnestunud. Proovi uuesti või võta meiega ühendust aadressil [info@sepps.eu](mailto:info@sepps.eu).”

JUHENDTEKSTID

Pealkiri: „Tule meiega trenni”

Sissejuhatus:  
„Täida allolev vorm ja saada meile lapse registreerimissoov. Võtame sinuga ühendust ja lepime kokku, millise grupi treeningule tulla.”

Asenda vana e-posti avamise kolme sammu juhend:

1. Täida vorm.
2. Saada registreerimissoov.
3. Lepime trenni tulemise kokku.

Lisa vormi juurde link klubi tegelikule privaatsusteabele. Ära loo fiktiivset linki ega väida, et privaatsustingimused on olemas, kui neid projektis pole.

KONTROLL

Kontrolli kohustuslikke välju, vigaseid isikukoode, serveri valideerimist, topeltkliki vältimist ja saatmise tõrkeolukorda. Kontrolli mobiilivaadet ning päris kirja kohalejõudmist pärast saatmise teenuse seadistamist.

Muuda ainult registreerimislehte ja vormi saatmiseks vajalikku serveripoolset lahendust.

&nbsp;