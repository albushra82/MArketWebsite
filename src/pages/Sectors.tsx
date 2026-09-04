import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Container, SectionHeading } from "../components/ui";
import { SectorCard } from "../components/SectorCard";
import { sectors } from "../data/sectors";
import { riskLevel, type RiskLevel } from "../lib/risk";
import clsx from "clsx";

const filters: { id: RiskLevel | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "high", label: "Elevated" },
  { id: "medium", label: "Moderate" },
  { id: "low", label: "Low" },
];

export function Sectors() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<RiskLevel | "all">("all");

  const filtered = useMemo(() => {
    return sectors
      .filter((s) => filter === "all" || riskLevel(s.overallRiskScore) === filter)
      .filter((s) => s.name.toLowerCase().includes(query.trim().toLowerCase()))
      .sort((a, b) => b.overallRiskScore - a.overallRiskScore);
  }, [query, filter]);

  return (
    <Container className="py-12">
      <SectionHeading
        eyebrow="Sector Directory"
        title="Dubai's economic sectors"
        description="Real estate, tourism and investment/trade licensing — the three sectors most central to Dubai's diversification story — each scored across eleven risk categories, including source-market concentration by investor and visitor nationality. Select a sector to see its full risk breakdown."
      />

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search sectors..."
            className="w-full rounded-full border border-hairline bg-surface py-2.5 pl-9 pr-4 text-sm text-ink placeholder:text-ink-faint focus:border-accent focus:outline-none"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={clsx(
                "rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors",
                filter === f.id
                  ? "border-accent bg-accent text-white"
                  : "border-hairline bg-surface text-ink-muted hover:text-ink",
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="mt-16 text-center text-sm text-ink-muted">
          No sectors match your search.
        </p>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((s) => (
            <SectorCard key={s.id} sector={s} />
          ))}
        </div>
      )}
    </Container>
  );
}
