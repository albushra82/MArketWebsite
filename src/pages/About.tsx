import { Link } from "react-router-dom";
import { Compass, Layers, LineChart, ShieldAlert } from "lucide-react";
import { Container, SectionHeading, Card } from "../components/ui";
import { sectors } from "../data/sectors";
import { riskCategories } from "../data/riskCategories";

const highlights = [
  {
    icon: Layers,
    title: `${sectors.length} sectors mapped`,
    body: "From trade and logistics to healthcare, covering the core pillars of Dubai's diversified, non-oil economy.",
  },
  {
    icon: ShieldAlert,
    title: `${riskCategories.length} risk categories`,
    body: "A consistent framework spanning geopolitical, economic, climate, regulatory, market, cyber and supply-chain risk.",
  },
  {
    icon: LineChart,
    title: "6-period trend history",
    body: "Every sector's composite score is tracked over time to surface where exposure is rising or easing.",
  },
];

export function About() {
  return (
    <Container className="py-12">
      <SectionHeading
        eyebrow="About this project"
        title="Why a sector risk analyzer for Dubai"
        description="Dubai's economy has diversified deliberately over the past two decades — from a trade and logistics hub into a global center for finance, tourism, technology and industry. That diversification also means the city's risk exposure is now genuinely multidimensional: a shipping-lane disruption, a summer heatwave, or a global rate cycle can each ripple through different sectors in very different ways."
      />

      <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-ink-muted">
        This project brings that exposure into one place — a structured, comparable view of how
        different categories of risk intersect with each economic sector, so patterns that are
        easy to miss sector-by-sector become visible across the whole economy.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {highlights.map((h) => (
          <Card key={h.title} className="p-5">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-soft text-accent">
              <h.icon className="h-4.5 w-4.5" />
            </span>
            <p className="mt-3 font-semibold text-ink">{h.title}</p>
            <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{h.body}</p>
          </Card>
        ))}
      </div>

      <Card className="mt-10 flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-white">
            <Compass className="h-5 w-5" />
          </span>
          <div>
            <p className="font-semibold text-ink">Start with the dashboard</p>
            <p className="text-sm text-ink-muted">See the full sector ranking and top risk categories.</p>
          </div>
        </div>
        <Link
          to="/"
          className="inline-flex items-center justify-center rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
        >
          Go to dashboard
        </Link>
      </Card>

      <div className="mt-14 border-t border-hairline pt-8 text-sm leading-relaxed text-ink-muted">
        <p>
          <strong className="text-ink">Data note:</strong> All risk scores, indicators and trend
          data on this site are an illustrative analytical model built to demonstrate a sector
          risk-analysis framework. They are not sourced from, endorsed by, or affiliated with the
          Government of Dubai, the UAE government, or any official statistical body. See the{" "}
          <Link to="/methodology" className="text-accent hover:underline">
            Methodology
          </Link>{" "}
          page for how the framework is constructed.
        </p>
      </div>
    </Container>
  );
}
