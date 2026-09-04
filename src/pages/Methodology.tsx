import { Link } from "react-router-dom";
import { Container, SectionHeading, Card } from "../components/ui";
import { riskCategories } from "../data/riskCategories";
import { getIcon } from "../lib/icons";

const steps = [
  {
    title: "1. Ground each sector in published statistics",
    body: "Indicators (transaction volumes, visitor numbers, license counts) and source-market breakdowns are drawn directly from official releases by Dubai's Department of Economy and Tourism (DET) and Digital Dubai / Dubai Statistics Center — each cited inline with a link. See the Sources page for the full list.",
  },
  {
    title: "2. Define risk categories",
    body: "Eleven risk categories span the forces that can affect a sector — geopolitical and macroeconomic shocks, climate, regulatory, market, cyber, supply-chain, labor, energy-transition and financial risk, plus investor & visitor concentration risk (reliance on a small number of source nationalities).",
  },
  {
    title: "3. Score probability and impact",
    body: "For each sector, every risk category is scored from 1 (very low) to 10 (very high) on two independent dimensions: probability — how likely the risk is to materialize in the near term — and impact — how disruptive it would be to the sector if it did.",
  },
  {
    title: "4. Derive severity and composite score",
    body: "Severity for a given risk factor is the average of its probability and impact scores. A sector's composite risk score is a weighted synthesis across all eleven categories, reflecting both breadth and concentration of exposure.",
  },
  {
    title: "5. Score concentration risk from real nationality data",
    body: "Where DET or Dubai Land Department publish a ranked breakdown of investor or visitor nationalities, the share held by the top few countries is used directly: a higher share concentrated in fewer countries raises both the probability and impact scores for that sector's concentration risk factor.",
  },
  {
    title: "6. Track direction over time",
    body: "Each sector's composite score is tracked across six historical half-year periods to establish a trend direction — improving, stable, or worsening — which flags where risk is accumulating fastest.",
  },
  {
    title: "7. Classify severity bands",
    body: "Composite and factor-level scores are grouped into three bands for quick interpretation: Low Risk (below 4.5), Moderate Risk (4.5–6.4), and Elevated Risk (6.5 and above).",
  },
];

export function Methodology() {
  return (
    <Container className="py-12">
      <SectionHeading
        eyebrow="How the framework works"
        title="Methodology"
        description="A transparent, repeatable framework for scoring risk exposure in Dubai's real estate, tourism and investment sectors — combining cited official statistics with an independent, directional risk model."
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
        <SectionHeading eyebrow="The Framework" title="Eleven risk categories" className="mb-6" />
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

      <div className="mt-14">
        <SectionHeading
          eyebrow="A note on framing"
          title="Why 'concentration risk,' not nationality"
          className="mb-4"
        />
        <Card className="p-6">
          <p className="text-sm leading-relaxed text-ink-muted">
            The concentration-risk factor scores <em>diversification</em>, not any nationality
            itself. It reflects a standard idea in economic and credit-risk analysis — used by
            rating agencies and central banks alike — that a market reliant on a small number of
            source countries for capital or visitors is structurally more exposed to a single
            country's travel advisories, capital controls, currency shocks, or shifts in bilateral
            relations than a well-diversified one. The scores are computed from aggregate,
            publicly-published shares (e.g. "the top 5 nationalities account for X% of
            transactions"), never from data about individuals, and a higher share concentrated in
            fewer countries always increases the score — regardless of which countries they are.
          </p>
        </Card>
      </div>

      <Card className="mt-14 p-6">
        <h3 className="text-sm font-semibold text-ink">Limitations &amp; disclaimer</h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-muted">
          Indicators and source-market figures are sourced from official Dubai government
          publications — see <Link to="/sources" className="text-accent hover:underline">Sources</Link>{" "}
          for the full citation list. The probability/impact scores, severity bands, composite
          risk index and trend history built on top of that data are an independent analytical
          model, not an official government risk rating, credit rating, or forecast. They should
          not be used for investment, credit, insurance or policy decisions. For authoritative,
          current data, always consult the primary sources directly: the Dubai Department of
          Economy and Tourism, Dubai Land Department, Digital Dubai / Dubai Statistics Center, and
          the UAE Central Bank.
        </p>
      </Card>
    </Container>
  );
}
