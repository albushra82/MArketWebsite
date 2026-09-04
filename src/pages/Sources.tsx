import { ExternalLink } from "lucide-react";
import { Container, SectionHeading, Card } from "../components/ui";
import { references } from "../data/references";

export function Sources() {
  const byPublisher = references.reduce<Record<string, typeof references>>((acc, ref) => {
    (acc[ref.publisher] ??= []).push(ref);
    return acc;
  }, {});

  return (
    <Container className="py-12">
      <SectionHeading
        eyebrow="Data provenance"
        title="Sources"
        description="Every real-world statistic on this site — visitor numbers, transaction volumes, license counts, source-market breakdowns — is drawn from an official Dubai government publication or statistical release, linked below. Risk scores themselves remain an illustrative analytical model; see Methodology."
      />

      <div className="mt-10 space-y-8">
        {Object.entries(byPublisher).map(([publisher, refs]) => (
          <div key={publisher}>
            <h3 className="text-sm font-semibold text-ink">{publisher}</h3>
            <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {refs.map((ref) => (
                <Card key={ref.id} className="p-4">
                  <a
                    href={ref.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="flex items-start justify-between gap-2 text-sm font-medium text-ink hover:text-accent"
                  >
                    {ref.title}
                    <ExternalLink className="mt-0.5 h-3.5 w-3.5 shrink-0 text-ink-faint" />
                  </a>
                  <p className="mt-1 text-xs text-ink-faint">{ref.period}</p>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>

      {references.length === 0 && (
        <p className="mt-10 text-sm text-ink-muted">No sources catalogued yet.</p>
      )}
    </Container>
  );
}
