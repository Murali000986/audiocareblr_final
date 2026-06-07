import { Link, useRouter, useNavigate } from "@tanstack/react-router";
import { Search, Sun, Moon, Menu, X, ChevronDown } from "lucide-react";
import { Logo } from "./Logo";
import { useTheme } from "./ThemeProvider";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/shop", label: "Products" },
  { to: "/blog", label: "Blog" },
  { to: "/repair-service", label: "Repair Services" },
  { to: "/our-work", label: "Our Work" },
  { to: "/contact", label: "Contact" },
];

export function Navbar() {
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [q, setQ] = useState("");
  const { user } = useAuth();

  const navigate = useNavigate();
  const router = useRouter();

  // Close dropdowns on route change
  useEffect(() => {
    setOpen(false);
    setSearchOpen(false);
  }, [router.state.location.pathname]);

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (q.trim()) {
      navigate({ to: "/shop", search: { q: q.trim() } as any });
      setSearchOpen(false);
      setQ("");
    }
  };

  return (
    <>
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

          <div className="flex items-center gap-1 sm:gap-2">
            <button aria-label="Search" onClick={() => setSearchOpen(true)} className="p-2 rounded-full hover:bg-muted transition-colors hidden sm:block">
              <Search className="w-5 h-5 text-foreground" />
            </button>
            <button aria-label="Toggle theme" onClick={toggle} className="p-2 rounded-full hover:bg-muted transition-colors">
              {theme === "dark" ? <Sun className="w-5 h-5 text-foreground" /> : <Moon className="w-5 h-5 text-foreground" />}
            </button>

            {/* User Auth Link */}
            {user ? (
              <div className="relative group hidden sm:block">
                <button className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold ml-1">
                  {user.email?.charAt(0).toUpperCase() || "U"}
                </button>
                <div className="absolute right-0 top-full mt-2 w-48 bg-card border border-border rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <div className="px-4 py-3 border-b border-border">
                    <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                  </div>
                  <button 
                    onClick={async () => {
                      const { supabase } = await import("@/lib/supabase");
                      await supabase.auth.signOut();
                      window.location.reload();
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-500/10 transition-colors rounded-b-xl"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <Link to="/auth" className="hidden sm:flex items-center justify-center p-2 ml-1 rounded-full hover:bg-muted transition-colors">
                <svg className="w-5 h-5 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
              </Link>
            )}

            <button aria-label="Menu" className="lg:hidden p-2 rounded-full hover:bg-muted ml-1" onClick={() => setOpen(!open)}>
              {open ? <X className="w-5 h-5 text-foreground" /> : <Menu className="w-5 h-5 text-foreground" />}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        {open && (
          <div className="lg:hidden border-t border-border px-6 py-4 space-y-3 bg-background">
            {links.map((l) => (
              <li key={l.to} className="list-none">
                <Link to={l.to} onClick={() => setOpen(false)} className="block text-sm font-medium text-foreground">{l.label}</Link>
              </li>
            ))}
          </div>
        )}
      </header>

      {/* Search Overlay */}
      {searchOpen && (
        <div className="fixed inset-0 z-[60] flex items-start justify-center pt-24 px-4">
          <div className="absolute inset-0 bg-black/60" onClick={() => setSearchOpen(false)} />
          <form onSubmit={onSearch} className="relative w-full max-w-2xl bg-background rounded-2xl shadow-card border border-border p-2 flex items-center gap-2">
            <Search className="w-5 h-5 text-muted-foreground ml-3" />
            <input
              autoFocus
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search for speakers, brands, accessories…"
              className="flex-1 bg-transparent border-none focus:outline-none py-3 text-base text-foreground"
            />
            <button type="button" onClick={() => setSearchOpen(false)} className="p-2 rounded-lg hover:bg-accent">
              <X className="w-5 h-5 text-foreground" />
            </button>
            <button type="submit" className="px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm">Search</button>
          </form>
        </div>
      )}
    </>
  );
}
