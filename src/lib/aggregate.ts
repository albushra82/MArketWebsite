import { sectors } from "../data/sectors";
import { riskCategories } from "../data/riskCategories";
import type { RiskCategoryId } from "../data/types";

export function rankedSectors() {
  return [...sectors].sort((a, b) => b.overallRiskScore - a.overallRiskScore);
}

export function averageRiskScore() {
  const total = sectors.reduce((sum, s) => sum + s.overallRiskScore, 0);
  return total / sectors.length;
}

export function worseningCount() {
  return sectors.filter((s) => s.trendDirection === "worsening").length;
}

export function improvingCount() {
  return sectors.filter((s) => s.trendDirection === "improving").length;
}

export interface CategoryExposure {
  categoryId: RiskCategoryId;
  name: string;
  shortName: string;
  avgSeverity: number;
  topSectorName: string;
  topSectorId: string;
}

export function categoryExposure(): CategoryExposure[] {
  return riskCategories
    .map((cat) => {
      let total = 0;
      let topScore = -Infinity;
      let topSectorName = "";
      let topSectorId = "";
      for (const sector of sectors) {
        const factor = sector.riskFactors.find((f) => f.categoryId === cat.id);
        if (!factor) continue;
        const severity = (factor.probability + factor.impact) / 2;
        total += severity;
        if (severity > topScore) {
          topScore = severity;
          topSectorName = sector.name;
          topSectorId = sector.id;
        }
      }
      return {
        categoryId: cat.id,
        name: cat.name,
        shortName: cat.shortName,
        avgSeverity: total / sectors.length,
        topSectorName,
        topSectorId,
      };
    })
    .sort((a, b) => b.avgSeverity - a.avgSeverity);
}

export interface MatrixPoint {
  sectorId: string;
  sectorName: string;
  sectorColor: string;
  categoryId: RiskCategoryId;
  categoryName: string;
  probability: number;
  impact: number;
  severity: number;
  note: string;
}

export function allMatrixPoints(): MatrixPoint[] {
  const points: MatrixPoint[] = [];
  for (const sector of sectors) {
    for (const factor of sector.riskFactors) {
      const cat = riskCategories.find((c) => c.id === factor.categoryId);
      if (!cat) continue;
      points.push({
        sectorId: sector.id,
        sectorName: sector.name,
        sectorColor: sector.color,
        categoryId: factor.categoryId,
        categoryName: cat.name,
        probability: factor.probability,
        impact: factor.impact,
        severity: (factor.probability + factor.impact) / 2,
        note: factor.note,
      });
    }
  }
  return points;
}
