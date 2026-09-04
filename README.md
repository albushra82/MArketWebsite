# Dubai Sector Risk Analyzer

An interactive risk-analysis website for Dubai's **real estate, tourism, and investment &
trade-licensing** sectors — combining real, cited statistics from Dubai's Department of Economy
and Tourism (DET) and Digital Dubai / Dubai Statistics Center with an independent risk-scoring
model spanning geopolitical, macroeconomic, climate, regulatory, market, cyber, supply-chain,
labor, energy-transition, financial, and investor/visitor **source-market concentration** risk.

## Features

- **Dashboard** — sector risk ranking, top risk categories, and headline stats at a glance.
- **Sectors** — the three focus sectors, each with real indicators and a nationality/source-market
  concentration breakdown.
- **Sector detail** — radar chart of risk exposure, six-period trend line, a full probability/impact
  breakdown per risk category (each backed by inline citations where based on real data), key
  drivers, and mitigation strategies.
- **Risk matrix** — every sector × risk-category combination plotted by probability and impact,
  plus a table of the highest-severity exposures.
- **Methodology** — how real statistics feed the scoring framework, including how
  concentration/diversification risk is derived and why it's framed that way.
- **Sources** — every cited statistic, grouped by publisher, linking back to the original release.
- **About** — project background and data disclaimer.
- Light/dark theme, fully responsive layout.

## Data

Indicators, source-market breakdowns and other factual statistics (`src/data/sectors.ts`,
`src/data/references.ts`) are drawn from cited official Dubai government publications — see the
in-app Sources page for the full list. The probability/impact risk scores, composite indices and
trend history are an independent analytical model built on top of that data, not an official
government risk rating — see the in-app Methodology page for details.

## Stack

React + TypeScript + Vite, Tailwind CSS v4, React Router, Recharts, lucide-react.

## Getting started

```bash
npm install
npm run dev      # start the dev server
npm run build    # production build
npm run preview  # preview the production build
```
