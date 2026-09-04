# Dubai Sector Risk Analyzer

An interactive risk-analysis website mapping how geopolitical, macroeconomic, climate,
regulatory, market, cyber, supply-chain, labor, energy-transition and financial risk intersect
with the ten sectors driving Dubai's diversified economy.

## Features

- **Dashboard** — sector risk ranking, top risk categories, and headline stats at a glance.
- **Sectors** — searchable, filterable directory of all ten tracked sectors.
- **Sector detail** — radar chart of risk exposure, six-period trend line, a full probability/impact
  breakdown per risk category, key drivers, and mitigation strategies.
- **Risk matrix** — every sector × risk-category combination plotted by probability and impact,
  plus a table of the highest-severity exposures.
- **Methodology** — how the scoring framework is constructed.
- **About** — project background and data disclaimer.
- Light/dark theme, fully responsive layout.

## Data

All risk scores, indicators and trend data (`src/data/`) are an **illustrative analytical
model** built to demonstrate the framework — not official statistics. See the in-app
Methodology and About pages for details.

## Stack

React + TypeScript + Vite, Tailwind CSS v4, React Router, Recharts, lucide-react.

## Getting started

```bash
npm install
npm run dev      # start the dev server
npm run build    # production build
npm run preview  # preview the production build
```
