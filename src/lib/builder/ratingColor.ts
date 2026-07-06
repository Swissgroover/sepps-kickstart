export function ratingTier(rating: number): {
  label: string;
  from: string;
  to: string;
  text: string;
} {
  if (rating >= 90) return { label: "Icon", from: "#fef3c7", to: "#f59e0b", text: "#3a2405" };
  if (rating >= 85) return { label: "Elite", from: "#fde68a", to: "#d97706", text: "#2b1a03" };
  if (rating >= 80) return { label: "Gold", from: "#facc15", to: "#a16207", text: "#221803" };
  if (rating >= 75) return { label: "Silver+", from: "#e5e7eb", to: "#6b7280", text: "#111827" };
  if (rating >= 65) return { label: "Silver", from: "#e2e8f0", to: "#94a3b8", text: "#0f172a" };
  if (rating >= 55) return { label: "Bronze", from: "#fdba74", to: "#c2410c", text: "#1a0d05" };
  return { label: "Rookie", from: "#94a3b8", to: "#334155", text: "#0f172a" };
}