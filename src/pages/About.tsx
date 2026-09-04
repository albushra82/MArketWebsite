import { Link } from "react-router-dom";
import { Compass, Layers, LineChart, ShieldAlert } from "lucide-react";
import { Container, SectionHeading, Card } from "../components/ui";
import { sectors } from "../data/sectors";
import { riskCategories } from "../data/riskCategories";

const highlights = [
  {
    icon: Layers,
    title: `${sectors.length} focus sectors`,
    body: "Real estate & construction, tourism & hospitality, and investment & trade licensing — the sectors that most directly drive Dubai's diversification and its foreign capital and visitor inflows.",
  },
  {
    icon: ShieldAlert,
    title: `${riskCategories.length} risk categories`,
    body: "A consistent framework spanning geopolitical, economic, climate, regulatory, market, cyber, supply-chain and investor/visitor concentration risk.",
  },
  {
    icon: LineChart,
    title: "Cited, real statistics",
    body: "Indicators and source-market breakdowns are drawn from official DET and Digital Dubai / Dubai Statistics Center releases, linked inline.",
  },
];

export function About() {
  return (
    <Container className="py-12">
      <SectionHeading
        eyebrow="About this project"
        title="Why a focused risk analyzer for Dubai"
        description="Real estate, tourism and investment/trade licensing sit at the center of Dubai's growth story — and share a common structural feature: each depends heavily on international capital and visitors flowing in from a relatively small set of source countries. That makes diversification of the investor and visitor base itself a risk factor worth tracking alongside the usual geopolitical, economic and climate risks."
      />

      <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-ink-muted">
        This project brings that view into one place — a structured, comparable read on how
        different categories of risk, including source-market concentration, intersect with each
        of these three sectors, grounded in officially published statistics rather than
        estimation.
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
          <strong className="text-ink">Data note:</strong> Indicators, source-market shares and
          other factual statistics on this site are drawn from cited official Dubai government
          publications — see{" "}
          <Link to="/sources" className="text-accent hover:underline">
            Sources
          </Link>
          . The risk probability/impact scores, composite indices and trend history are an
          independent analytical model built on top of that data — they are not themselves
          published by, endorsed by, or affiliated with the Government of Dubai. See the{" "}
          <Link to="/methodology" className="text-accent hover:underline">
            Methodology
          </Link>{" "}
          page for how the framework is constructed.
        </p>
      </div>
    </Container>
  );
}
