export type RiskLevel = "low" | "medium" | "high";

export function riskLevel(score: number): RiskLevel {
  if (score >= 6.5) return "high";
  if (score >= 4.5) return "medium";
  return "low";
}

export const riskLevelLabel: Record<RiskLevel, string> = {
  low: "Low Risk",
  medium: "Moderate Risk",
  high: "Elevated Risk",
};

export const riskLevelVar: Record<RiskLevel, string> = {
  low: "var(--risk-low)",
  medium: "var(--risk-medium)",
  high: "var(--risk-high)",
};

export function severity(product: number): RiskLevel {
  // probability x impact, both 1-10 => product 1-100
  if (product >= 42) return "high";
  if (product >= 20) return "medium";
  return "low";
}

export function averageSeverity(probability: number, impact: number) {
  return (probability + impact) / 2;
}
