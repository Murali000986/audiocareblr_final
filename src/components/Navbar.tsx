import { Link } from "@tanstack/react-router";
import { Search, ShoppingCart, Sun, Moon, Menu } from "lucide-react";
import { Logo } from "./Logo";
import { useTheme } from "./ThemeProvider";
import { useState } from "react";

const links = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/repair-service", label: "Repair Services" },
  { to: "/our-work", label: "Our Work" },
  { to: "/sound-experience", label: "Sound Experience" },
  { to: "/reviews", label: "Reviews" },
  { to: "/contact", label: "Contact" },
];

export function Navbar() {
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        <Link to="/"><Logo /></Link>
        <ul className="hidden lg:flex items-center gap-7 text-sm font-medium">
          {links.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                className="text-muted-foreground hover:text-foreground transition-colors relative py-1"
                activeProps={{ className: "text-foreground after:absolute after:-bottom-[20px] after:left-0 after:right-0 after:h-[2px] after:bg-primary after:rounded-full" }}
                activeOptions={{ exact: l.to === "/" }}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-1">
          <button aria-label="Search" className="p-2 rounded-full hover:bg-muted transition-colors">
            <Search className="w-5 h-5" />
          </button>
          <button aria-label="Cart" className="p-2 rounded-full hover:bg-muted transition-colors relative">
            <ShoppingCart className="w-5 h-5" />
            <span className="absolute -top-0.5 -right-0.5 bg-primary text-primary-foreground text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">2</span>
          </button>
          <button aria-label="Toggle theme" onClick={toggle} className="p-2 rounded-full hover:bg-muted transition-colors">
            {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <button aria-label="Menu" className="lg:hidden p-2 rounded-full hover:bg-muted" onClick={() => setOpen(!open)}>
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </nav>
      {open && (
        <ul className="lg:hidden border-t border-border px-6 py-4 space-y-3 bg-background">
          {links.map((l) => (
            <li key={l.to}><Link to={l.to} onClick={() => setOpen(false)} className="block text-sm font-medium">{l.label}</Link></li>
          ))}
        </ul>
      )}
    </header>
  );
}
