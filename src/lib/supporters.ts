import kiveston from "@/assets/supporters/kiveston-white.png.asset.json";
import saaremaa from "@/assets/supporters/saaremaa-logistika-kala-white.png.asset.json";
import connecto from "@/assets/supporters/connecto.webp.asset.json";
import smuuli from "@/assets/supporters/smuuli-laod.webp.asset.json";
import hoia from "@/assets/supporters/hoia-homespa.webp.asset.json";
import tulipunane from "@/assets/supporters/tulipunane-ou.webp.asset.json";

export const SUPPORTER_SPEED = 30;

export const supporters = [
  { id: "kiveston", name: "Kiveston", logoSrc: kiveston.url },
  { id: "saaremaa-logistika", name: "Saaremaa Logistika & Kala", logoSrc: saaremaa.url },
  { id: "connecto", name: "Connecto", logoSrc: connecto.url },
  { id: "smuuli-laod", name: "Smuuli Laod", logoSrc: smuuli.url },
  { id: "moia", name: "HOIA homespa", logoSrc: hoia.url },
  { id: "tulipunane-ou", name: "Tulipunane OÜ", logoSrc: tulipunane.url },
];