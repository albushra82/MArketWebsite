import type { RiskCategory } from "./types";

export const riskCategories: RiskCategory[] = [
  {
    id: "geopolitical",
    name: "Geopolitical Risk",
    shortName: "Geopolitical",
    description:
      "Regional conflict spillover, shipping-lane disruption (e.g. Strait of Hormuz, Red Sea), sanctions exposure, and diplomatic tension affecting trade and investor confidence.",
    icon: "Globe2",
  },
  {
    id: "macroeconomic",
    name: "Macroeconomic Risk",
    shortName: "Macro",
    description:
      "Global interest-rate cycles, inflation, a global slowdown, and dirham-dollar peg dynamics that shape capital flows, borrowing costs, and consumer demand.",
    icon: "TrendingUp",
  },
  {
    id: "climate",
    name: "Climate & Environmental Risk",
    shortName: "Climate",
    description:
      "Extreme heat, flash-flood events (as seen in April 2024), water scarcity, and the physical/transition risk of adapting infrastructure to a changing climate.",
    icon: "CloudRain",
  },
  {
    id: "regulatory",
    name: "Regulatory & Policy Risk",
    shortName: "Regulatory",
    description:
      "Corporate tax rollout, evolving foreign-ownership and visa rules, compliance/AML tightening, and free-zone versus mainland policy shifts.",
    icon: "Scale",
  },
  {
    id: "market",
    name: "Market & Demand Volatility",
    shortName: "Market",
    description:
      "Oversupply cycles, asset-price corrections, shifting tourism and consumer demand, and competitive pressure from regional hubs.",
    icon: "LineChart",
  },
  {
    id: "cyber",
    name: "Cybersecurity & Technology Risk",
    shortName: "Cyber",
    description:
      "Exposure to cyberattacks on critical infrastructure and financial systems, plus disruption risk from rapid AI and automation adoption.",
    icon: "ShieldAlert",
  },
  {
    id: "supplyChain",
    name: "Supply Chain Risk",
    shortName: "Supply Chain",
    description:
      "Disruption to maritime and air-cargo routes, raw-material and freight-cost volatility, and dependency on re-export trade corridors.",
    icon: "Ship",
  },
  {
    id: "labor",
    name: "Labor & Talent Risk",
    shortName: "Labor",
    description:
      "Dependence on an expatriate workforce, skilled-talent competition with other global hubs, and wage inflation in high-demand sectors.",
    icon: "Users",
  },
  {
    id: "energyTransition",
    name: "Energy Transition Risk",
    shortName: "Energy Transition",
    description:
      "Decarbonization pressure, the cost/pace of renewable diversification, and stranded-asset risk tied to legacy hydrocarbon exposure.",
    icon: "Zap",
  },
  {
    id: "financial",
    name: "Financial & Credit Risk",
    shortName: "Financial",
    description:
      "Corporate and household debt levels, real-estate financing leverage, liquidity conditions, and interest-rate sensitivity.",
    icon: "Landmark",
  },
];

export const riskCategoryMap = Object.fromEntries(
  riskCategories.map((c) => [c.id, c]),
) as Record<string, RiskCategory>;
