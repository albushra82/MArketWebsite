import type { ReactNode } from "react";
import clsx from "clsx";
import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";
import type { TrendDirection } from "../data/types";
import { riskLevel, riskLevelLabel, type RiskLevel } from "../lib/risk";

export function Container({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={clsx("mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", className)}>
      {children}
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <div className={clsx("max-w-2xl", className)}>
      {eyebrow && (
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-accent">
          {eyebrow}
        </p>
      )}
      <h2 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">{title}</h2>
      {description && (
        <p className="mt-3 text-[15px] leading-relaxed text-ink-muted">{description}</p>
      )}
    </div>
  );
}

export function Card({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={clsx(
        "rounded-2xl border border-hairline bg-surface",
        className,
      )}
    >
      {children}
    </div>
  );
}

export const riskBadgeClasses: Record<RiskLevel, string> = {
  low: "bg-risk-low/12 text-risk-low ring-1 ring-inset ring-risk-low/25",
  medium: "bg-risk-medium/12 text-risk-medium ring-1 ring-inset ring-risk-medium/25",
  high: "bg-risk-high/12 text-risk-high ring-1 ring-inset ring-risk-high/25",
};

export const riskChipClasses: Record<RiskLevel, string> = {
  low: "bg-risk-low/12 text-risk-low",
  medium: "bg-risk-medium/12 text-risk-medium",
  high: "bg-risk-high/12 text-risk-high",
};

export function RiskBadge({ score, className }: { score: number; className?: string }) {
  const level = riskLevel(score);
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold",
        riskBadgeClasses[level],
        className,
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {riskLevelLabel[level]}
    </span>
  );
}

export function ScoreBadge({ score }: { score: number }) {
  const level = riskLevel(score);
  const textClass =
    level === "high" ? "text-risk-high" : level === "medium" ? "text-risk-medium" : "text-risk-low";
  return (
    <span className={clsx("font-mono text-lg font-bold tabular-nums", textClass)}>
      {score.toFixed(1)}
    </span>
  );
}

export function TrendTag({ direction }: { direction: TrendDirection }) {
  const config = {
    improving: { icon: ArrowDownRight, label: "Improving", cls: "text-risk-low bg-risk-low/10" },
    worsening: { icon: ArrowUpRight, label: "Worsening", cls: "text-risk-high bg-risk-high/10" },
    stable: { icon: Minus, label: "Stable", cls: "text-ink-muted bg-surface-muted" },
  }[direction];
  const Icon = config.icon;
  return (
    <span className={clsx("inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium", config.cls)}>
      <Icon className="h-3 w-3" />
      {config.label}
    </span>
  );
}

export function StatCard({
  label,
  value,
  helpText,
}: {
  label: string;
  value: string;
  helpText?: string;
}) {
  return (
    <Card className="p-4">
      <p className="text-xs font-medium uppercase tracking-wide text-ink-faint">{label}</p>
      <p className="mt-1.5 text-xl font-semibold text-ink">{value}</p>
      {helpText && <p className="mt-1 text-xs text-ink-muted">{helpText}</p>}
    </Card>
  );
}
