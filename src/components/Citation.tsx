import { ExternalLink } from "lucide-react";
import { referenceMap } from "../data/references";

export function CitationList({ ids, className }: { ids?: string[]; className?: string }) {
  if (!ids?.length) return null;
  const refs = ids.map((id) => referenceMap[id]).filter(Boolean);
  if (!refs.length) return null;

  return (
    <span className={className ?? "mt-1 flex flex-wrap gap-x-2 gap-y-0.5"}>
      {refs.map((ref, i) => (
        <a
          key={ref.id}
          href={ref.url}
          target="_blank"
          rel="noreferrer noopener"
          title={`${ref.title} — ${ref.publisher} (${ref.period})`}
          className="inline-flex items-center gap-0.5 text-[10.5px] font-medium text-accent hover:underline"
        >
          [{i + 1}]
          <ExternalLink className="h-2.5 w-2.5" />
        </a>
      ))}
    </span>
  );
}
