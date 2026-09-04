import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { Sector } from "../data/types";
import { getIcon } from "../lib/icons";
import { Card, RiskBadge, TrendTag } from "./ui";

export function SectorCard({ sector }: { sector: Sector }) {
  const Icon = getIcon(sector.icon);
  return (
    <Link to={`/sectors/${sector.id}`}>
      <Card className="group h-full p-5 transition-all hover:border-accent/40 hover:shadow-lg hover:shadow-black/[0.03]">
        <div className="flex items-start justify-between">
          <span
            className="flex h-11 w-11 items-center justify-center rounded-xl"
            style={{ backgroundColor: `${sector.color}1a`, color: sector.color }}
          >
            <Icon className="h-5 w-5" strokeWidth={2} />
          </span>
          <ArrowRight className="h-4 w-4 text-ink-faint transition-transform group-hover:translate-x-0.5 group-hover:text-ink" />
        </div>

        <h3 className="mt-4 text-[15px] font-semibold text-ink">{sector.name}</h3>
        <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-ink-muted">
          {sector.shortDescription}
        </p>

        <div className="mt-5 flex items-center justify-between border-t border-hairline pt-4">
          <div>
            <p className="text-[11px] uppercase tracking-wide text-ink-faint">Risk Score</p>
            <p className="font-mono text-lg font-bold text-ink">
              {sector.overallRiskScore.toFixed(1)}
              <span className="text-xs font-normal text-ink-faint">/10</span>
            </p>
          </div>
          <div className="flex flex-col items-end gap-1.5">
            <RiskBadge score={sector.overallRiskScore} />
            <TrendTag direction={sector.trendDirection} />
          </div>
        </div>
      </Card>
    </Link>
  );
}
