import { Link, useRouter, useNavigate } from "@tanstack/react-router";
import { Search, ShoppingCart, Sun, Moon, Menu, Heart, X, User, LogOut, Package, Wrench, Settings, ChevronDown } from "lucide-react";
import { Logo } from "./Logo";
import { useTheme } from "./ThemeProvider";
import { useState, useEffect } from "react";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { useAuth } from "@/contexts/AuthContext";
import { CartDrawer } from "./CartDrawer";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/shop", label: "Shop" },
  { to: "/repair-service", label: "Repair Services" },
  { to: "/our-work", label: "Our Work" },
  { to: "/contact", label: "Contact" },
];

export function Navbar() {
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [q, setQ] = useState("");
  
  const { count } = useCart();
  const wish = useWishlist();
  const { user, signOut } = useAuth();
  
  const navigate = useNavigate();
  const router = useRouter();

  // Close dropdowns on route change
  useEffect(() => {
    setOpen(false);
    setUserOpen(false);
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

  const avatarLetter = user?.user_metadata?.full_name?.[0]?.toUpperCase() ?? user?.email?.[0]?.toUpperCase() ?? "U";

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
            <Link to="/wishlist" aria-label="Wishlist" className="p-2 rounded-full hover:bg-muted transition-colors relative hidden sm:block">
              <Heart className="w-5 h-5 text-foreground" />
              {wish.count > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-primary text-primary-foreground text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">{wish.count}</span>
              )}
            </Link>
            <button aria-label="Cart" onClick={() => setCartOpen(true)} className="p-2 rounded-full hover:bg-muted transition-colors relative">
              <ShoppingCart className="w-5 h-5 text-foreground" />
              {count > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-primary text-primary-foreground text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">{count}</span>
              )}
            </button>
            <button aria-label="Toggle theme" onClick={toggle} className="p-2 rounded-full hover:bg-muted transition-colors">
              {theme === "dark" ? <Sun className="w-5 h-5 text-foreground" /> : <Moon className="w-5 h-5 text-foreground" />}
            </button>

            {/* Auth Dropdown */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserOpen((p) => !p)}
                  className="flex items-center gap-1.5 ml-1 px-2 py-1.5 rounded-lg hover:bg-muted transition-all"
                >
                  <div className="w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                    {avatarLetter}
                  </div>
                  <ChevronDown className={`w-3.5 h-3.5 text-muted-foreground transition-transform ${userOpen ? "rotate-180" : ""}`} />
                </button>

                {userOpen && (
                  <div className="absolute right-0 top-full mt-2 w-52 bg-card border border-border rounded-xl shadow-card overflow-hidden animate-fade-up">
                    <div className="px-4 py-3 border-b border-border">
                      <p className="text-sm font-semibold truncate text-card-foreground">{user.user_metadata?.full_name ?? "My Account"}</p>
                      <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                    </div>
                    {[
                      { to: "/account",    icon: User,    label: "My Account" },
                      { to: "/account",    icon: Package, label: "My Orders" },
                      { to: "/repair-service", icon: Wrench, label: "My Repairs" },
                    ].map((item) => (
                      <Link
                        key={item.label}
                        to={item.to}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-muted transition-colors text-card-foreground"
                      >
                        <item.icon className="w-4 h-4 text-muted-foreground" />
                        {item.label}
                      </Link>
                    ))}
                    {user.email === "admin@audiocare.in" && (
                      <Link to="/admin" className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-muted transition-colors text-primary">
                        <Settings className="w-4 h-4" /> Admin Panel
                      </Link>
                    )}
                    <button
                      onClick={() => { signOut(); setUserOpen(false); }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-destructive hover:bg-destructive/10 transition-colors border-t border-border"
                    >
                      <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/auth"
                className="hidden sm:inline-flex items-center gap-1.5 ml-1 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-bold transition-all btn-press"
              >
                <User className="w-3.5 h-3.5" /> Login
              </Link>
            )}

            <button aria-label="Menu" className="lg:hidden p-2 rounded-full hover:bg-muted" onClick={() => setOpen(!open)}>
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
            {!user && (
              <li className="list-none mt-4">
                <Link to="/auth" onClick={() => setOpen(false)} className="block text-center py-2.5 rounded-lg bg-primary text-primary-foreground font-bold text-sm">
                  Login / Sign Up
                </Link>
              </li>
            )}
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

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
