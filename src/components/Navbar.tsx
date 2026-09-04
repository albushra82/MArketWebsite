import { NavLink } from "react-router-dom";
import { Moon, Sun, Menu, X, Compass } from "lucide-react";
import { useState } from "react";
import { useTheme } from "../hooks/useTheme";
import clsx from "clsx";

const links = [
  { to: "/", label: "Dashboard", end: true },
  { to: "/sectors", label: "Sectors" },
  { to: "/risk-matrix", label: "Risk Matrix" },
  { to: "/methodology", label: "Methodology" },
  { to: "/sources", label: "Sources" },
  { to: "/about", label: "About" },
];

export function Navbar() {
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-hairline bg-canvas/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <NavLink to="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-white">
            <Compass className="h-4.5 w-4.5" strokeWidth={2.25} />
          </span>
          <span className="text-[15px] leading-tight">
            Dubai Sector
            <br className="hidden sm:block" /> Risk Analyzer
          </span>
        </NavLink>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) =>
                clsx(
                  "rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-surface-muted text-ink"
                    : "text-ink-muted hover:text-ink",
                )
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={toggle}
            aria-label="Toggle color theme"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-hairline text-ink-muted transition-colors hover:text-ink"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-hairline text-ink-muted md:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-hairline px-4 py-3 md:hidden">
          <div className="flex flex-col gap-1">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.end}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  clsx(
                    "rounded-lg px-3 py-2.5 text-sm font-medium",
                    isActive ? "bg-surface-muted text-ink" : "text-ink-muted",
                  )
                }
              >
                {l.label}
              </NavLink>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
