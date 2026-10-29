/**
 * Ajutine režiim: ainult registreerimine.
 *
 * true  — avalehel kuvatakse ainult registreerimisvaade; /klubi, /vormid,
 *         /kontakt ja /registreeru suunavad ajutiselt (307) avalehele;
 *         päise ja jaluse navigatsioon on peidetud.
 * false — täisveeb koos kõigi lehtede ja navigatsiooniga on tagasi.
 *
 * Täisveebi taastamiseks muuda väärtus false-ks ja avalda leht uuesti.
 */
export const registrationOnlyMode = true;
