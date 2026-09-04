import type { SourceMarketBreakdown } from "../data/types";
import { Card } from "./ui";
import { CitationList } from "./Citation";

export function SourceMarkets({ data, accent }: { data: SourceMarketBreakdown; accent: string }) {
  const sorted = [...data.markets].sort((a, b) => b.share - a.share);
  const max = Math.max(...sorted.map((m) => m.share));

  return (
    <Card className="p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-sm font-semibold text-ink">{data.title}</h3>
          <p className="mt-1 text-xs text-ink-faint">{data.description}</p>
        </div>
        <span className="shrink-0 rounded-full bg-surface-muted px-2.5 py-1 text-[11px] font-medium text-ink-muted">
          Top {data.topN} = {data.topNShare}%
        </span>
      </div>

      <ul className="mt-5 space-y-3">
        {sorted.map((m) => (
          <li key={m.name}>
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-ink">{m.name}</span>
              <span className="font-mono text-ink-muted">
                {m.share}
                {data.unit}
              </span>
            </div>
            <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-surface-muted">
              <div
                className="h-full rounded-full"
                style={{ width: `${(m.share / max) * 100}%`, backgroundColor: accent }}
              />
            </div>
            {m.note && <p className="mt-1 text-[11px] text-ink-faint">{m.note}</p>}
          </li>
        ))}
      </ul>

      <div className="mt-4 flex items-center justify-between border-t border-hairline pt-3">
        <p className="text-[11px] text-ink-faint">Source-market concentration, as officially reported.</p>
        <CitationList ids={data.referenceIds} />
      </div>
    </Card>
  );
}
