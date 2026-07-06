import type { FinishId, SizeId, StatKey, TemplateId } from "./types";

export interface TemplateDef {
  id: TemplateId;
  name: string;
  tagline: string;
  // CSS background for card
  background: string;
  frame: string;
  accent: string;
  text: string;
  chip: string;
  glow: string;
}

export const TEMPLATES: TemplateDef[] = [
  {
    id: "gold",
    name: "Gold",
    tagline: "Klassikaline eliit",
    background:
      "linear-gradient(160deg, #f7e07d 0%, #d9a441 40%, #7a4d13 100%)",
    frame: "rgba(255,235,150,0.65)",
    accent: "#3a2405",
    text: "#1a1206",
    chip: "rgba(58,36,5,0.18)",
    glow: "rgba(255,205,90,0.55)",
  },
  {
    id: "silver",
    name: "Silver",
    tagline: "Puhas ja terav",
    background:
      "linear-gradient(160deg, #f4f6f8 0%, #b8c0c8 45%, #4a5560 100%)",
    frame: "rgba(255,255,255,0.6)",
    accent: "#1c2229",
    text: "#141a20",
    chip: "rgba(20,26,32,0.15)",
    glow: "rgba(210,220,230,0.6)",
  },
  {
    id: "bronze",
    name: "Bronze",
    tagline: "Soe klassika",
    background:
      "linear-gradient(160deg, #e6a877 0%, #a26232 45%, #4a2711 100%)",
    frame: "rgba(255,210,170,0.55)",
    accent: "#2c150a",
    text: "#1a0d05",
    chip: "rgba(44,21,10,0.18)",
    glow: "rgba(230,150,90,0.5)",
  },
  {
    id: "legend",
    name: "Legend",
    tagline: "Sinine igavik",
    background:
      "radial-gradient(120% 90% at 30% 10%, #4a7dff 0%, #1a2c7a 45%, #060820 100%)",
    frame: "rgba(150,180,255,0.55)",
    accent: "#e8ecff",
    text: "#f4f6ff",
    chip: "rgba(255,255,255,0.14)",
    glow: "rgba(90,130,255,0.65)",
  },
  {
    id: "neon",
    name: "Neon",
    tagline: "Elektriline energia",
    background:
      "linear-gradient(155deg, #050014 0%, #0b0740 45%, #002236 100%)",
    frame: "rgba(90,220,255,0.7)",
    accent: "#7cf9ff",
    text: "#eafcff",
    chip: "rgba(124,249,255,0.12)",
    glow: "rgba(124,249,255,0.7)",
  },
  {
    id: "premium",
    name: "Premium",
    tagline: "Sinine platina",
    background:
      "linear-gradient(160deg, #0a1230 0%, #1e3fa8 55%, #051029 100%)",
    frame: "rgba(255,255,255,0.28)",
    accent: "#c9d7ff",
    text: "#ffffff",
    chip: "rgba(255,255,255,0.12)",
    glow: "rgba(80,120,255,0.55)",
  },
  {
    id: "tournament",
    name: "Tournament",
    tagline: "Turniirimeistri väli",
    background:
      "linear-gradient(155deg, #0f2b1b 0%, #14572f 45%, #06180d 100%)",
    frame: "rgba(180,255,190,0.55)",
    accent: "#c8ffdc",
    text: "#f2fff5",
    chip: "rgba(255,255,255,0.12)",
    glow: "rgba(80,220,140,0.55)",
  },
];

export const TEMPLATE_MAP: Record<TemplateId, TemplateDef> = Object.fromEntries(
  TEMPLATES.map((t) => [t.id, t]),
) as Record<TemplateId, TemplateDef>;

export interface FinishDef {
  id: FinishId;
  name: string;
  description: string;
  addPerUnit: number;
}

export const FINISHES: FinishDef[] = [
  { id: "matte", name: "Matte", description: "Peegeldusteta sile pind", addPerUnit: 0 },
  { id: "gloss", name: "Gloss", description: "Läikiv lakikate", addPerUnit: 3 },
  { id: "premium", name: "Premium", description: "UV-kaitse + tekstuur", addPerUnit: 6 },
  { id: "framed", name: "Framed", description: "Kaardiraam metallikinnitusega", addPerUnit: 14 },
  { id: "signed", name: "Signed", description: "Isiklik allkiri", addPerUnit: 9 },
];

export const FINISH_MAP: Record<FinishId, FinishDef> = Object.fromEntries(
  FINISHES.map((f) => [f.id, f]),
) as Record<FinishId, FinishDef>;

export interface SizeDef {
  id: SizeId;
  name: string;
  dimensions: string;
  addPerUnit: number;
}

export const SIZES: SizeDef[] = [
  { id: "small", name: "Small", dimensions: "6.4 × 8.9 cm", addPerUnit: 0 },
  { id: "medium", name: "Medium", dimensions: "10 × 14 cm", addPerUnit: 4 },
  { id: "large", name: "Large", dimensions: "20 × 28 cm", addPerUnit: 12 },
];

export const SIZE_MAP: Record<SizeId, SizeDef> = Object.fromEntries(
  SIZES.map((s) => [s.id, s]),
) as Record<SizeId, SizeDef>;

export const BASE_PRICE = 19;

export const POSITIONS = [
  "GK",
  "LB",
  "CB",
  "RB",
  "LWB",
  "RWB",
  "CDM",
  "CM",
  "CAM",
  "LM",
  "RM",
  "LW",
  "RW",
  "CF",
  "ST",
];

export const STAT_LABELS: Record<StatKey, string> = {
  pac: "PAC",
  sho: "SHO",
  pas: "PAS",
  dri: "DRI",
  def: "DEF",
  phy: "PHY",
};

export const STAT_LONG: Record<StatKey, string> = {
  pac: "Pace",
  sho: "Shooting",
  pas: "Passing",
  dri: "Dribbling",
  def: "Defending",
  phy: "Physical",
};

export const STEP_TITLES: string[] = [
  "Kaardi disain",
  "Mängija foto",
  "Mängija info",
  "Üldreiting",
  "Statistika",
  "Viimistlus",
  "Suurus",
  "Kogus",
  "Kokkuvõte",
];