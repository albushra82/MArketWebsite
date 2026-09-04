import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t border-hairline">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <p className="text-sm font-semibold text-ink">Dubai Sector Risk Analyzer</p>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">
              A risk-analysis framework for Dubai's real estate, tourism and investment sectors —
              built on published statistics from Dubai's Department of Economy and Tourism and
              Digital Dubai / Dubai Statistics Center.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 text-sm sm:grid-cols-3">
            <div>
              <p className="mb-2 font-medium text-ink">Explore</p>
              <ul className="space-y-1.5 text-ink-muted">
                <li><Link to="/sectors" className="hover:text-ink">Sectors</Link></li>
                <li><Link to="/risk-matrix" className="hover:text-ink">Risk Matrix</Link></li>
              </ul>
            </div>
            <div>
              <p className="mb-2 font-medium text-ink">Reference</p>
              <ul className="space-y-1.5 text-ink-muted">
                <li><Link to="/methodology" className="hover:text-ink">Methodology</Link></li>
                <li><Link to="/sources" className="hover:text-ink">Sources</Link></li>
                <li><Link to="/about" className="hover:text-ink">About</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-hairline pt-6 text-xs leading-relaxed text-ink-faint">
          Statistics (visitor numbers, transaction volumes, license counts, source-market shares)
          are drawn from cited official Dubai government publications — see{" "}
          <Link to="/sources" className="underline hover:text-ink-muted">Sources</Link>. Risk
          probability/impact scores and composite indices are an independent analytical model
          built on top of that data, not an official government risk rating.
        </div>
      </div>
    </footer>
  );
}
