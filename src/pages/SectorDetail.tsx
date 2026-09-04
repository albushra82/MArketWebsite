import { Link, Navigate, useParams } from "react-router-dom";
import {
  Line,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  RadarChart,
} from "recharts";
import { ArrowLeft, CheckCircle2, ShieldCheck } from "lucide-react";
import { Container, Card, RiskBadge, TrendTag, StatCard, riskChipClasses } from "../components/ui";
import { sectors, sectorMap } from "../data/sectors";
import { riskCategoryMap } from "../data/riskCategories";
import { getIcon } from "../lib/icons";
import { riskLevel } from "../lib/risk";
import clsx from "clsx";

export function SectorDetail() {
  const { sectorId } = useParams<{ sectorId: string }>();
  const sector = sectorId ? sectorMap[sectorId] : undefined;

  if (!sector) return <Navigate to="/sectors" replace />;

  const Icon = getIcon(sector.icon);
  const radarData = sector.riskFactors.map((f) => ({
    category: riskCategoryMap[f.categoryId]?.shortName ?? f.categoryId,
    severity: (f.probability + f.impact) / 2,
  }));

  const idx = sectors.findIndex((s) => s.id === sector.id);
  const prev = sectors[(idx - 1 + sectors.length) % sectors.length];
  const next = sectors[(idx + 1) % sectors.length];

  const sortedFactors = [...sector.riskFactors].sort(
    (a, b) => (b.probability + b.impact) - (a.probability + a.impact),
  );

  return (
    <div>
      <section className="border-b border-hairline bg-surface-muted/40">
        <Container className="py-10">
          <Link
            to="/sectors"
            className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-ink-muted hover:text-ink"
          >
            <ArrowLeft className="h-4 w-4" />
            All sectors
          </Link>

          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-start gap-4">
              <span
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl"
                style={{ backgroundColor: `${sector.color}1a`, color: sector.color }}
              >
                <Icon className="h-7 w-7" strokeWidth={2} />
              </span>
              <div>
                <h1 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                  {sector.name}
                </h1>
                <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-ink-muted">
                  {sector.longDescription}
                </p>
              </div>
            </div>

            <Card className="flex shrink-0 flex-col items-center gap-2 px-6 py-4">
              <p className="text-xs uppercase tracking-wide text-ink-faint">Composite Risk</p>
              <p className="font-mono text-4xl font-bold text-ink">
                {sector.overallRiskScore.toFixed(1)}
              </p>
              <RiskBadge score={sector.overallRiskScore} />
              <TrendTag direction={sector.trendDirection} />
            </Card>
          </div>
        </Container>
      </section>

      <Container className="grid grid-cols-2 gap-4 py-8 sm:grid-cols-4">
        {sector.indicators.map((ind) => (
          <StatCard key={ind.label} label={ind.label} value={ind.value} helpText={ind.helpText} />
        ))}
      </Container>

      <Container className="pb-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
          <Card className="p-5 lg:col-span-2">
            <h3 className="text-sm font-semibold text-ink">Risk Profile</h3>
            <p className="mt-1 text-xs text-ink-faint">Severity across all ten risk categories</p>
            <div className="mt-2 h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData} outerRadius="72%">
                  <PolarGrid stroke="var(--border)" />
                  <PolarAngleAxis
                    dataKey="category"
                    tick={{ fill: "var(--text-muted)", fontSize: 11 }}
                  />
                  <PolarRadiusAxis domain={[0, 10]} tick={false} axisLine={false} />
                  <Radar
                    dataKey="severity"
                    stroke={sector.color}
                    fill={sector.color}
                    fillOpacity={0.25}
                    strokeWidth={2}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "var(--bg-elevated)",
                      border: "1px solid var(--border)",
                      borderRadius: 10,
                      fontSize: 13,
                    }}
                    labelStyle={{ color: "var(--text)", fontWeight: 600 }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="p-5 lg:col-span-3">
            <h3 className="text-sm font-semibold text-ink">Risk Trend</h3>
            <p className="mt-1 text-xs text-ink-faint">Composite score over the last six periods</p>
            <div className="mt-2 h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={sector.trendHistory} margin={{ left: -12, right: 16, top: 12 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                  <XAxis
                    dataKey="period"
                    tick={{ fill: "var(--text-faint)", fontSize: 11 }}
                    axisLine={{ stroke: "var(--border)" }}
                    tickLine={false}
                  />
                  <YAxis
                    domain={[0, 10]}
                    tick={{ fill: "var(--text-faint)", fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "var(--bg-elevated)",
                      border: "1px solid var(--border)",
                      borderRadius: 10,
                      fontSize: 13,
                    }}
                    labelStyle={{ color: "var(--text)", fontWeight: 600 }}
                    formatter={(value) => [Number(value).toFixed(1), "Risk score"]}
                  />
                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke={sector.color}
                    strokeWidth={2.5}
                    dot={{ r: 3.5, fill: sector.color }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </Container>

      <Container className="pb-8">
        <Card className="p-5">
          <h3 className="text-sm font-semibold text-ink">Risk Factor Breakdown</h3>
          <p className="mt-1 text-xs text-ink-faint">
            Probability and impact scored 1–10 for each risk category
          </p>
          <div className="mt-5 space-y-5">
            {sortedFactors.map((f) => {
              const cat = riskCategoryMap[f.categoryId];
              const sev = (f.probability + f.impact) / 2;
              return (
                <div key={f.categoryId} className="border-b border-hairline pb-5 last:border-0 last:pb-0">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="text-sm font-medium text-ink">{cat?.name}</p>
                    <span
                      className={clsx(
                        "rounded-full px-2 py-0.5 text-xs font-semibold",
                        riskChipClasses[riskLevel(sev)],
                      )}
                    >
                      severity {sev.toFixed(1)}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-ink-muted">{f.note}</p>
                  <div className="mt-2.5 grid grid-cols-2 gap-4">
                    <div>
                      <div className="mb-1 flex justify-between text-[11px] text-ink-faint">
                        <span>Probability</span>
                        <span>{f.probability}/10</span>
                      </div>
                      <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-muted">
                        <div
                          className="h-full rounded-full bg-accent"
                          style={{ width: `${f.probability * 10}%` }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="mb-1 flex justify-between text-[11px] text-ink-faint">
                        <span>Impact</span>
                        <span>{f.impact}/10</span>
                      </div>
                      <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-muted">
                        <div
                          className="h-full rounded-full"
                          style={{ width: `${f.impact * 10}%`, backgroundColor: sector.color }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </Container>

      <Container className="pb-12">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Card className="p-5">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4.5 w-4.5 text-ink-muted" />
              <h3 className="text-sm font-semibold text-ink">Key Risk Drivers</h3>
            </div>
            <ul className="mt-4 space-y-3">
              {sector.topDrivers.map((d) => (
                <li key={d} className="flex gap-2.5 text-sm text-ink-muted">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-risk-high" />
                  {d}
                </li>
              ))}
            </ul>
          </Card>
          <Card className="p-5">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4.5 w-4.5 text-ink-muted" />
              <h3 className="text-sm font-semibold text-ink">Mitigation Strategies</h3>
            </div>
            <ul className="mt-4 space-y-3">
              {sector.mitigations.map((m) => (
                <li key={m} className="flex gap-2.5 text-sm text-ink-muted">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-risk-low" />
                  {m}
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </Container>

      <Container className="pb-16">
        <div className="flex items-center justify-between border-t border-hairline pt-6">
          <Link
            to={`/sectors/${prev.id}`}
            className="text-sm font-medium text-ink-muted hover:text-ink"
          >
            ← {prev.name}
          </Link>
          <Link
            to={`/sectors/${next.id}`}
            className="text-sm font-medium text-ink-muted hover:text-ink"
          >
            {next.name} →
          </Link>
        </div>
      </Container>
    </div>
  );
}
