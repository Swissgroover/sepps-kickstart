export type TemplateId =
  | "gold"
  | "silver"
  | "bronze"
  | "legend"
  | "neon"
  | "premium"
  | "tournament";

export type FinishId = "matte" | "gloss" | "premium" | "framed" | "signed";
export type SizeId = "small" | "medium" | "large";
export type FootId = "left" | "right" | "both";

export interface PhotoTransform {
  dataUrl: string;
  offsetX: number;
  offsetY: number;
  scale: number;
}

export interface PlayerInfo {
  firstName: string;
  lastName: string;
  displayName: string;
  position: string;
  preferredFoot: FootId;
  jerseyNumber: string;
  nationality: string;
  club: string;
  birthYear: string;
  captain: boolean;
  mvp: boolean;
}

export interface Stats {
  pac: number;
  sho: number;
  pas: number;
  dri: number;
  def: number;
  phy: number;
}

export type StatKey = keyof Stats;

export interface BuilderState {
  currentStep: number;
  completedSteps: number[];
  template: TemplateId;
  photo: PhotoTransform | null;
  info: PlayerInfo;
  overall: number;
  stats: Stats;
  finish: FinishId;
  size: SizeId;
  quantity: number;
}

export interface CartEntry {
  id: string;
  createdAt: number;
  state: BuilderState;
  total: number;
}