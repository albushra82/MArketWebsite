import {
  Building2,
  Palmtree,
  Ship,
  Landmark,
  Plane,
  ShoppingBag,
  Factory,
  Cpu,
  Zap,
  HeartPulse,
  Globe2,
  TrendingUp,
  CloudRain,
  Scale,
  LineChart,
  ShieldAlert,
  Users,
  type LucideIcon,
} from "lucide-react";

export const iconMap: Record<string, LucideIcon> = {
  Building2,
  Palmtree,
  Ship,
  Landmark,
  Plane,
  ShoppingBag,
  Factory,
  Cpu,
  Zap,
  HeartPulse,
  Globe2,
  TrendingUp,
  CloudRain,
  Scale,
  LineChart,
  ShieldAlert,
  Users,
};

export function getIcon(name: string): LucideIcon {
  return iconMap[name] ?? Building2;
}
