import { Link } from "@tanstack/react-router";
import { Search, ShoppingCart, Sun, Moon, Menu, Heart, X } from "lucide-react";
import { Logo } from "./Logo";
import { useTheme } from "./ThemeProvider";
import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { CartDrawer } from "./CartDrawer";
import { useNavigate } from "@tanstack/react-router";

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
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [q, setQ] = useState("");
  const { count } = useCart();
  const wish = useWishlist();
  const navigate = useNavigate();

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
          <div className="flex items-center gap-1">
            <button aria-label="Search" onClick={() => setSearchOpen(true)} className="p-2 rounded-full hover:bg-muted transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <Link to="/wishlist" aria-label="Wishlist" className="p-2 rounded-full hover:bg-muted transition-colors relative">
              <Heart className="w-5 h-5" />
              {wish.count > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-primary text-primary-foreground text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">{wish.count}</span>
              )}
            </Link>
            <button aria-label="Cart" onClick={() => setCartOpen(true)} className="p-2 rounded-full hover:bg-muted transition-colors relative">
              <ShoppingCart className="w-5 h-5" />
              {count > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-primary text-primary-foreground text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">{count}</span>
              )}
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
              className="flex-1 bg-transparent border-none focus:outline-none py-3 text-base"
            />
            <button type="button" onClick={() => setSearchOpen(false)} className="p-2 rounded-lg hover:bg-accent">
              <X className="w-5 h-5" />
            </button>
            <button type="submit" className="px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm">Search</button>
          </form>
        </div>
      )}

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
