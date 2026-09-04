import { Link } from "react-router-dom";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ArrowRight, AlertTriangle, TrendingDown, TrendingUp, Gauge } from "lucide-react";
import { Container, SectionHeading, Card, StatCard } from "../components/ui";
import { SectorCard } from "../components/SectorCard";
import { sectors } from "../data/sectors";
import { averageRiskScore, categoryExposure, rankedSectors, worseningCount, improvingCount } from "../lib/aggregate";
import { riskLevelVar, riskLevel } from "../lib/risk";

export function Dashboard() {
  const ranked = rankedSectors();
  const avg = averageRiskScore();
  const worsening = worseningCount();
  const improving = improvingCount();
  const topRisk = ranked[0];
  const exposure = categoryExposure().slice(0, 6);

  const chartData = ranked.map((s) => ({
    name: s.name.split(" & ")[0],
    fullName: s.name,
    score: s.overallRiskScore,
    color: s.color,
    level: riskLevel(s.overallRiskScore),
  }));

  return (
    <div>
      <section className="border-b border-hairline bg-gradient-to-b from-surface-muted/60 to-canvas">
        <Container className="py-16 sm:py-20">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-hairline bg-surface px-3 py-1 text-xs font-medium text-ink-muted">
            <Gauge className="h-3.5 w-3.5 text-accent" />
            Illustrative risk-analysis framework
          </div>
          <h1 className="mt-5 max-w-3xl text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            Mapping the risks that shape Dubai's economic sectors
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-muted">
            A structured view of how geopolitical, macroeconomic, climate, regulatory, market,
            cyber and supply-chain risk intersect with the ten sectors driving Dubai's
            diversified economy — built to help you explore exposure, trends and mitigation
            strategies sector by sector.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/sectors"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              Explore all sectors
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/risk-matrix"
              className="inline-flex items-center gap-2 rounded-full border border-hairline bg-surface px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-surface-muted"
            >
              View risk matrix
            </Link>
          </div>
        </Container>
      </section>

      <Container className="grid grid-cols-2 gap-4 py-10 sm:grid-cols-4">
        <StatCard label="Sectors Tracked" value={String(sectors.length)} />
        <StatCard label="Avg. Risk Score" value={avg.toFixed(1)} helpText="out of 10" />
        <StatCard label="Trending Worse" value={String(worsening)} helpText="sectors this period" />
        <StatCard label="Trending Better" value={String(improving)} helpText="sectors this period" />
      </Container>

      <Container className="py-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
          <Card className="p-5 lg:col-span-3">
            <div className="mb-1 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-ink">Sector Risk Ranking</h3>
              <span className="text-xs text-ink-faint">Composite score, 1–10</span>
            </div>
            <div className="mt-4 h-[420px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} layout="vertical" margin={{ left: 8, right: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
                  <XAxis
                    type="number"
                    domain={[0, 10]}
                    tick={{ fill: "var(--text-faint)", fontSize: 12 }}
                    axisLine={{ stroke: "var(--border)" }}
                    tickLine={false}
                  />
                  <YAxis
                    type="category"
                    dataKey="name"
                    width={110}
                    tick={{ fill: "var(--text-muted)", fontSize: 12.5 }}
                    axisLine={{ stroke: "var(--border)" }}
                    tickLine={false}
                  />
                  <Tooltip
                    cursor={{ fill: "var(--border)", opacity: 0.3 }}
                    contentStyle={{
                      background: "var(--bg-elevated)",
                      border: "1px solid var(--border)",
                      borderRadius: 10,
                      fontSize: 13,
                    }}
                    labelStyle={{ color: "var(--text)", fontWeight: 600 }}
                    formatter={(value) => [Number(value).toFixed(1), "Risk score"]}
                    labelFormatter={(_, payload) => payload?.[0]?.payload?.fullName ?? ""}
                  />
                  <Bar dataKey="score" radius={[0, 6, 6, 0]} maxBarSize={18}>
                    {chartData.map((d) => (
                      <Cell key={d.name} fill={riskLevelVar[d.level]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="p-5 lg:col-span-2">
            <div className="mb-1 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-ink">Top Risk Categories</h3>
              <span className="text-xs text-ink-faint">Avg. severity</span>
            </div>
            <ul className="mt-4 space-y-4">
              {exposure.map((c, i) => (
                <li key={c.categoryId}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-ink">
                      <span className="mr-2 text-ink-faint">{i + 1}.</span>
                      {c.shortName}
                    </span>
                    <span className="font-mono text-ink-muted">{c.avgSeverity.toFixed(1)}</span>
                  </div>
                  <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-surface-muted">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${(c.avgSeverity / 10) * 100}%`,
                        backgroundColor: riskLevelVar[riskLevel(c.avgSeverity)],
                      }}
                    />
                  </div>
                  <p className="mt-1 text-xs text-ink-faint">
                    Highest in{" "}
                    <Link to={`/sectors/${c.topSectorId}`} className="text-ink-muted hover:text-accent">
                      {c.topSectorName}
                    </Link>
                  </p>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </Container>

      <Container className="py-10">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Card className="flex items-start gap-3 p-5">
            <span className="rounded-lg bg-risk-high/10 p-2 text-risk-high">
              <AlertTriangle className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xs uppercase tracking-wide text-ink-faint">Highest Exposure</p>
              <p className="mt-0.5 font-semibold text-ink">{topRisk.name}</p>
              <p className="mt-1 text-sm text-ink-muted">
                Score {topRisk.overallRiskScore.toFixed(1)} · driven by market and macro pressure
              </p>
            </div>
          </Card>
          <Card className="flex items-start gap-3 p-5">
            <span className="rounded-lg bg-risk-high/10 p-2 text-risk-high">
              <TrendingUp className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xs uppercase tracking-wide text-ink-faint">Sectors to Watch</p>
              <p className="mt-0.5 font-semibold text-ink">{worsening} trending worse</p>
              <p className="mt-1 text-sm text-ink-muted">Risk accumulating over the past 3 periods</p>
            </div>
          </Card>
          <Card className="flex items-start gap-3 p-5">
            <span className="rounded-lg bg-risk-low/10 p-2 text-risk-low">
              <TrendingDown className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xs uppercase tracking-wide text-ink-faint">Improving Outlook</p>
              <p className="mt-0.5 font-semibold text-ink">{improving} trending better</p>
              <p className="mt-1 text-sm text-ink-muted">Risk easing over the past 3 periods</p>
            </div>
          </Card>
        </div>
      </Container>

      <Container className="py-10">
        <div className="mb-6 flex items-end justify-between">
          <SectionHeading eyebrow="Sector Directory" title="Browse by sector" />
          <Link to="/sectors" className="hidden text-sm font-medium text-accent hover:underline sm:block">
            View all
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sectors.slice(0, 6).map((s) => (
            <SectorCard key={s.id} sector={s} />
          ))}
        </div>
        <div className="mt-6 text-center sm:hidden">
          <Link to="/sectors" className="text-sm font-medium text-accent hover:underline">
            View all sectors
          </Link>
        </div>
      </Container>
    </div>
  );
}
