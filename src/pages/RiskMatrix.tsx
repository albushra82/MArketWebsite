import { useMemo, useState } from "react";
import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  CartesianGrid,
  Tooltip,
  ReferenceArea,
} from "recharts";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { Container, SectionHeading, Card } from "../components/ui";
import { sectors } from "../data/sectors";
import { riskCategories } from "../data/riskCategories";
import { allMatrixPoints } from "../lib/aggregate";

export function RiskMatrix() {
  const [sectorFilter, setSectorFilter] = useState<string>("all");
  const points = useMemo(() => allMatrixPoints(), []);

  const filtered = points.filter(
    (p) => sectorFilter === "all" || p.sectorId === sectorFilter,
  );

  const bySector = sectors.map((s) => ({
    sector: s,
    data: filtered
      .filter((p) => p.sectorId === s.id)
      .map((p) => ({ ...p, z: p.severity })),
  }));

  const topSevere = [...points].sort((a, b) => b.severity - a.severity).slice(0, 8);

  return (
    <Container className="py-12">
      <SectionHeading
        eyebrow="Cross-Sector View"
        title="Risk matrix"
        description="Every sector-risk combination plotted by probability and impact (1–10). Points toward the top-right represent the highest-severity exposures across Dubai's economy."
      />

      <div className="mt-6 flex flex-wrap gap-2">
        <button
          onClick={() => setSectorFilter("all")}
          className={clsx(
            "rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors",
            sectorFilter === "all"
              ? "border-accent bg-accent text-white"
              : "border-hairline bg-surface text-ink-muted hover:text-ink",
          )}
        >
          All sectors
        </button>
        {sectors.map((s) => (
          <button
            key={s.id}
            onClick={() => setSectorFilter(s.id)}
            className={clsx(
              "rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors",
              sectorFilter === s.id
                ? "text-white"
                : "border-hairline bg-surface text-ink-muted hover:text-ink",
            )}
            style={sectorFilter === s.id ? { backgroundColor: s.color, borderColor: s.color } : undefined}
          >
            {s.name}
          </button>
        ))}
      </div>

      <Card className="mt-6 p-5">
        <div className="h-[520px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 10, right: 20, bottom: 10, left: 0 }}>
              <CartesianGrid stroke="var(--border)" />
              <ReferenceArea x1={6.5} x2={10} y1={6.5} y2={10} fill="var(--risk-high)" fillOpacity={0.06} />
              <ReferenceArea x1={0} x2={4} y1={0} y2={4} fill="var(--risk-low)" fillOpacity={0.06} />
              <XAxis
                type="number"
                dataKey="probability"
                name="Probability"
                domain={[0, 10]}
                tick={{ fill: "var(--text-faint)", fontSize: 11 }}
                axisLine={{ stroke: "var(--border)" }}
                tickLine={false}
                label={{ value: "Probability →", position: "insideBottom", offset: -4, fill: "var(--text-faint)", fontSize: 12 }}
              />
              <YAxis
                type="number"
                dataKey="impact"
                name="Impact"
                domain={[0, 10]}
                tick={{ fill: "var(--text-faint)", fontSize: 11 }}
                axisLine={{ stroke: "var(--border)" }}
                tickLine={false}
                label={{ value: "Impact →", angle: -90, position: "insideLeft", fill: "var(--text-faint)", fontSize: 12 }}
              />
              <ZAxis type="number" dataKey="z" range={[60, 340]} />
              <Tooltip
                cursor={{ strokeDasharray: "3 3", stroke: "var(--border)" }}
                contentStyle={{
                  background: "var(--bg-elevated)",
                  border: "1px solid var(--border)",
                  borderRadius: 10,
                  fontSize: 12.5,
                }}
                labelStyle={{ color: "var(--text)", fontWeight: 600 }}
                content={({ active, payload }) => {
                  if (!active || !payload?.length) return null;
                  const p = payload[0].payload;
                  return (
                    <div
                      style={{
                        background: "var(--bg-elevated)",
                        border: "1px solid var(--border)",
                        borderRadius: 10,
                        padding: "10px 12px",
                        fontSize: 12.5,
                        maxWidth: 260,
                      }}
                    >
                      <p className="font-semibold text-ink">{p.sectorName}</p>
                      <p className="mt-0.5 text-ink-muted">{p.categoryName}</p>
                      <p className="mt-1 text-ink-faint">
                        Probability {p.probability} · Impact {p.impact}
                      </p>
                      <p className="mt-1 text-ink-muted">{p.note}</p>
                    </div>
                  );
                }}
              />
              {bySector.map(({ sector, data }) =>
                data.length ? (
                  <Scatter key={sector.id} name={sector.name} data={data} fill={sector.color} fillOpacity={0.8} />
                ) : null,
              )}
            </ScatterChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
          {sectors.map((s) => (
            <div key={s.id} className="flex items-center gap-1.5 text-xs text-ink-muted">
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: s.color }} />
              {s.name}
            </div>
          ))}
        </div>
      </Card>

      <div className="mt-10">
        <h3 className="text-sm font-semibold text-ink">Highest-severity exposures</h3>
        <div className="mt-4 overflow-x-auto scrollbar-thin">
          <table className="w-full min-w-[640px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-hairline text-left text-xs uppercase tracking-wide text-ink-faint">
                <th className="pb-2.5 pr-4 font-medium">Sector</th>
                <th className="pb-2.5 pr-4 font-medium">Risk Category</th>
                <th className="pb-2.5 pr-4 font-medium">Probability</th>
                <th className="pb-2.5 pr-4 font-medium">Impact</th>
                <th className="pb-2.5 font-medium">Severity</th>
              </tr>
            </thead>
            <tbody>
              {topSevere.map((p) => (
                <tr key={`${p.sectorId}-${p.categoryId}`} className="border-b border-hairline last:border-0">
                  <td className="py-3 pr-4">
                    <Link to={`/sectors/${p.sectorId}`} className="font-medium text-ink hover:text-accent">
                      {p.sectorName}
                    </Link>
                  </td>
                  <td className="py-3 pr-4 text-ink-muted">{p.categoryName}</td>
                  <td className="py-3 pr-4 font-mono text-ink-muted">{p.probability}</td>
                  <td className="py-3 pr-4 font-mono text-ink-muted">{p.impact}</td>
                  <td className="py-3 font-mono font-semibold text-ink">{p.severity.toFixed(1)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <p className="mt-8 text-xs text-ink-faint">
        Categories referenced: {riskCategories.map((c) => c.name).join(", ")}.
      </p>
    </Container>
  );
}
