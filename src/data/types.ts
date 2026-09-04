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
  | "financial"
  | "concentration";

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
  referenceIds?: string[];
}

export interface TrendPoint {
  period: string;
  score: number;
}

export interface SectorIndicator {
  label: string;
  value: string;
  helpText?: string;
  referenceIds?: string[];
}

export interface SourceMarketShare {
  name: string;
  share: number;
  note?: string;
}

export interface SourceMarketBreakdown {
  title: string;
  description: string;
  unit: string;
  markets: SourceMarketShare[];
  topNShare: number;
  topN: number;
  referenceIds: string[];
}

export interface Reference {
  id: string;
  title: string;
  publisher: string;
  url: string;
  period: string;
  accessedDate: string;
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
  sourceMarkets?: SourceMarketBreakdown;
}
