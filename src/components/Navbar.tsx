import { Link, useRouter, useNavigate } from "@tanstack/react-router";
import { Search, Sun, Moon, Menu, X, ChevronDown, Speaker, Radio, Projector, Headset } from "lucide-react";
import { Logo } from "./Logo";
import { useTheme } from "./ThemeProvider";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/shop", label: "Products", isMega: true },
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
  const [scrolled, setScrolled] = useState(false);

  const navigate = useNavigate();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      <header 
        className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${
          scrolled 
            ? "bg-background/70 backdrop-blur-2xl border-border/50 shadow-sm py-1" 
            : "bg-background/0 backdrop-blur-none border-transparent py-3"
        }`}
      >
        <nav className="w-full px-4 sm:px-8 flex items-center justify-between gap-4 max-w-7xl mx-auto">
          <Link to="/" className="hover:scale-105 transition-transform"><Logo /></Link>

          <ul className="hidden lg:flex items-center gap-8 text-sm font-medium">
            {links.map((l) => (
              <li key={l.to} className="group">
                {l.isMega ? (
                  <div className="relative py-4">
                    <Link
                      to={l.to}
                      className="text-foreground font-bold hover:text-primary transition-colors flex items-center gap-1 group-hover:text-primary"
                    >
                      {l.label} <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                    </Link>
                    
                    {/* Mega Menu Dropdown */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-0 w-[500px] bg-card border border-border rounded-2xl shadow-2xl opacity-0 invisible translate-y-4 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 p-6 grid grid-cols-2 gap-6 z-50">
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">Categories</h4>
                        <div className="space-y-4">
                          <Link to="/shop" search={{ q: 'speaker' }} className="flex items-center gap-3 hover:text-primary transition-colors group/link">
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover/link:bg-primary group-hover/link:text-white transition-colors"><Speaker className="w-4 h-4" /></div>
                            <span className="font-semibold">Speakers</span>
                          </Link>
                          <Link to="/shop" search={{ q: 'amplifier' }} className="flex items-center gap-3 hover:text-primary transition-colors group/link">
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover/link:bg-primary group-hover/link:text-white transition-colors"><Radio className="w-4 h-4" /></div>
                            <span className="font-semibold">Amplifiers</span>
                          </Link>
                          <Link to="/shop" search={{ q: 'projector' }} className="flex items-center gap-3 hover:text-primary transition-colors group/link">
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover/link:bg-primary group-hover/link:text-white transition-colors"><Projector className="w-4 h-4" /></div>
                            <span className="font-semibold">Projectors</span>
                          </Link>
                          <Link to="/shop" search={{ q: 'accessories' }} className="flex items-center gap-3 hover:text-primary transition-colors group/link">
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover/link:bg-primary group-hover/link:text-white transition-colors"><Headset className="w-4 h-4" /></div>
                            <span className="font-semibold">Accessories</span>
                          </Link>
                        </div>
                      </div>
                      <div className="bg-section rounded-xl p-5 border border-border/50 flex flex-col justify-end relative overflow-hidden group/promo">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent z-0" />
                        <div className="relative z-10">
                          <span className="bg-primary text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider mb-2 inline-block">New Arrival</span>
                          <h4 className="font-display font-bold text-lg mb-1 group-hover/promo:text-primary transition-colors">B&W 800 Series</h4>
                          <p className="text-xs text-muted-foreground mb-4">Experience true studio sound.</p>
                          <Link to="/shop" className="text-xs font-bold text-primary hover:underline">Shop Now →</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    to={l.to}
                    className="text-foreground font-bold hover:text-primary transition-colors relative py-4 block"
                    activeProps={{ className: "text-primary font-bold after:w-full" }}
                    activeOptions={{ exact: l.to === "/" }}
                  >
                    {l.label}
                    <span className="absolute bottom-3 left-0 w-0 h-[2px] bg-primary rounded-full transition-all duration-300 group-hover:w-full" />
                  </Link>
                )}
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
                <button className="flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-primary to-orange-400 text-white font-bold ml-1 shadow-sm transition-transform hover:scale-105">
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
                    className="w-full text-left px-4 py-2.5 text-sm font-medium text-red-500 hover:bg-red-500/10 transition-colors rounded-b-xl"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <Link
                to="/auth"
                className="hidden sm:flex items-center gap-2 px-4 py-2 ml-2 rounded-full bg-primary hover:bg-primary/90 text-white text-sm font-bold transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
              >
                Sign in
              </Link>
            )}

            <button aria-label="Menu" className="lg:hidden p-2 rounded-full hover:bg-muted ml-1" onClick={() => setOpen(!open)}>
              {open ? <X className="w-5 h-5 text-foreground" /> : <Menu className="w-5 h-5 text-foreground" />}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        {open && (
          <div className="lg:hidden border-t border-border px-6 py-4 space-y-3 bg-background shadow-xl absolute w-full animate-fade-up">
            {links.map((l) => (
              <li key={l.to} className="list-none">
                <Link to={l.to} onClick={() => setOpen(false)} className="block text-sm font-bold text-foreground py-2 border-b border-border/50">{l.label}</Link>
              </li>
            ))}
          </div>
        )}
      </header>
      
      {/* Spacer to prevent content jump since header is fixed */}
      <div className="h-[80px]" />

      {/* Search Overlay */}
      {searchOpen && (
        <div className="fixed inset-0 z-[60] flex items-start justify-center pt-24 px-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in" onClick={() => setSearchOpen(false)} />
          <form onSubmit={onSearch} className="relative w-full max-w-2xl bg-card rounded-2xl shadow-2xl border border-border p-2 flex items-center gap-2 animate-slide-up">
            <Search className="w-6 h-6 text-primary ml-3" />
            <input
              autoFocus
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search for speakers, brands, accessories…"
              className="flex-1 bg-transparent border-none focus:outline-none py-4 px-2 text-lg text-foreground placeholder:text-muted-foreground"
            />
            <button type="button" onClick={() => setSearchOpen(false)} className="p-3 rounded-xl hover:bg-accent transition-colors">
              <X className="w-5 h-5 text-foreground" />
            </button>
            <button type="submit" className="px-6 py-3 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold transition-all">Search</button>
          </form>
        </div>
      )}
    </>
  );
}
