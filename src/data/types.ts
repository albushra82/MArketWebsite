export type RiskCategoryId =
  | "geopolitical"
  | "macroeconomic"
  | "climate"
  | "regulatory"
  | "market"
  | "cyber"
  | "supplyChain"
  | "labor"
  | "energyTransition"
  | "financial";

export interface RiskCategory {
  id: RiskCategoryId;
  name: string;
  shortName: string;
  description: string;
  icon: string;
}

export type TrendDirection = "improving" | "stable" | "worsening";

export interface RiskFactorScore {
  categoryId: RiskCategoryId;
  probability: number;
  impact: number;
  note: string;
}

export interface TrendPoint {
  period: string;
  score: number;
}

export interface SectorIndicator {
  label: string;
  value: string;
  helpText?: string;
}

export interface Sector {
  id: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  icon: string;
  gdpContributionPct: number;
  color: string;
  overallRiskScore: number;
  trendDirection: TrendDirection;
  trendHistory: TrendPoint[];
  riskFactors: RiskFactorScore[];
  topDrivers: string[];
  mitigations: string[];
  indicators: SectorIndicator[];
}
