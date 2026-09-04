import { Container, SectionHeading, Card } from "../components/ui";
import { riskCategories } from "../data/riskCategories";
import { getIcon } from "../lib/icons";

const steps = [
  {
    title: "1. Define risk categories",
    body: "Ten risk categories are defined to span the full range of forces that can affect an economic sector — from geopolitical and macroeconomic shocks to climate, regulatory, market, cyber, supply-chain, labor, energy-transition and financial risk.",
  },
  {
    title: "2. Score probability and impact",
    body: "For each sector, every risk category is scored from 1 (very low) to 10 (very high) on two independent dimensions: probability — how likely the risk is to materialize in the near term — and impact — how disruptive it would be to the sector if it did.",
  },
  {
    title: "3. Derive severity and composite score",
    body: "Severity for a given risk factor is the average of its probability and impact scores. A sector's composite risk score is a weighted synthesis across all ten categories, reflecting both breadth and concentration of exposure.",
  },
  {
    title: "4. Track direction over time",
    body: "Each sector's composite score is tracked across six historical half-year periods to establish a trend direction — improving, stable, or worsening — which flags where risk is accumulating fastest.",
  },
  {
    title: "5. Classify severity bands",
    body: "Composite and factor-level scores are grouped into three bands for quick interpretation: Low Risk (below 4.5), Moderate Risk (4.5–6.4), and Elevated Risk (6.5 and above).",
  },
];

export function Methodology() {
  return (
    <Container className="py-12">
      <SectionHeading
        eyebrow="How the framework works"
        title="Methodology"
        description="A transparent, repeatable framework for scoring risk exposure across Dubai's economic sectors — designed to be directional and comparative rather than a precise forecast."
      />

      <div className="mt-10 grid grid-cols-1 gap-4">
        {steps.map((s) => (
          <Card key={s.title} className="p-5">
            <h3 className="text-sm font-semibold text-ink">{s.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">{s.body}</p>
          </Card>
        ))}
      </div>

      <div className="mt-14">
        <SectionHeading eyebrow="The Framework" title="Ten risk categories" className="mb-6" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {riskCategories.map((c) => {
            const Icon = getIcon(c.icon);
            return (
              <Card key={c.id} className="p-5">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-soft text-accent">
                  <Icon className="h-4.5 w-4.5" />
                </span>
                <h3 className="mt-3 text-sm font-semibold text-ink">{c.name}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{c.description}</p>
              </Card>
            );
          })}
        </div>
      </div>

      <Card className="mt-14 p-6">
        <h3 className="text-sm font-semibold text-ink">Limitations &amp; disclaimer</h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-muted">
          This site presents an illustrative analytical framework, not official statistics or a
          licensed risk-rating product. Scores are constructed for demonstration purposes to show
          how a structured risk model could be applied to Dubai's economy, informed by
          publicly-known dynamics affecting the region (trade routes, climate events, interest-rate
          cycles, and sector structure). They should not be used for investment, credit, insurance
          or policy decisions. For authoritative data, consult primary sources such as the Dubai
          Statistics Center, Dubai Chamber of Commerce, the Dubai Department of Economy and Tourism,
          and the UAE Central Bank.
        </p>
      </Card>
    </Container>
  );
}
