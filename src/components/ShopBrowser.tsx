import { useMemo, useState } from "react";
import { products, categories, brands, type Product } from "@/data/sampleData";
import { ProductCard } from "./ProductCard";
import { Search, SlidersHorizontal, X } from "lucide-react";

type Props = { initialCategory?: string; initialQuery?: string };

export function ShopBrowser({ initialCategory = "all", initialQuery = "" }: Props) {
  const [q, setQ] = useState(initialQuery);
  const [cat, setCat] = useState<string>(initialCategory);
  const [selBrands, setSelBrands] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState(100000);
  const [sort, setSort] = useState("popular");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let list: Product[] = products.slice();
    if (cat !== "all") list = list.filter((p) => p.category === cat);
    if (q.trim()) {
      const term = q.toLowerCase();
      list = list.filter(
        (p) => p.name.toLowerCase().includes(term) || p.brand.toLowerCase().includes(term) || p.categoryLabel.toLowerCase().includes(term),
      );
    }
    if (selBrands.length) list = list.filter((p) => selBrands.includes(p.brand));
    list = list.filter((p) => p.price <= maxPrice);

    switch (sort) {
      case "price-low": list.sort((a, b) => a.price - b.price); break;
      case "price-high": list.sort((a, b) => b.price - a.price); break;
      case "rating": list.sort((a, b) => b.rating - a.rating); break;
      case "newest": list.reverse(); break;
      default: list.sort((a, b) => b.reviews - a.reviews);
    }
    return list;
  }, [q, cat, selBrands, maxPrice, sort]);

  const toggleBrand = (b: string) =>
    setSelBrands((p) => (p.includes(b) ? p.filter((x) => x !== b) : [...p, b]));

  const reset = () => {
    setQ(""); setCat("all"); setSelBrands([]); setMaxPrice(100000); setSort("popular");
  };

  const FiltersPanel = (
    <div className="space-y-6">
      <div>
        <h4 className="font-display font-bold text-sm mb-3">Category</h4>
        <div className="space-y-1.5">
          {[{ slug: "all", name: "All Products" }, ...categories].map((c) => (
            <button
              key={c.slug}
              onClick={() => setCat(c.slug)}
              className={`w-full text-left text-sm px-3 py-2 rounded-lg transition-colors ${
                cat === c.slug ? "bg-primary text-primary-foreground font-semibold" : "hover:bg-accent"
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-display font-bold text-sm mb-3">Brand</h4>
        <div className="flex flex-wrap gap-2">
          {brands.map((b) => (
            <button
              key={b}
              onClick={() => toggleBrand(b)}
              className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                selBrands.includes(b)
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border hover:border-primary"
              }`}
            >
              {b}
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-display font-bold text-sm">Max Price</h4>
          <span className="text-xs font-semibold text-primary">₹{maxPrice.toLocaleString("en-IN")}</span>
        </div>
        <input
          type="range"
          min={500}
          max={100000}
          step={500}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full accent-primary"
        />
      </div>

      <button
        onClick={reset}
        className="w-full text-xs font-semibold text-muted-foreground hover:text-primary py-2"
      >
        Reset Filters
      </button>
    </div>
  );

  return (
    <div className="grid lg:grid-cols-[260px_1fr] gap-8">
      <aside className="hidden lg:block sticky top-24 self-start rounded-2xl border border-border bg-card p-5 shadow-soft">
        {FiltersPanel}
      </aside>

      <div>
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search speakers, brands, categories…"
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary text-sm"
            />
          </div>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="px-4 py-3 rounded-xl border border-border bg-card text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="popular">Most Popular</option>
            <option value="rating">Top Rated</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="newest">Newest</option>
          </select>
          <button
            onClick={() => setShowFilters(true)}
            className="lg:hidden inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-border bg-card text-sm font-semibold"
          >
            <SlidersHorizontal className="w-4 h-4" /> Filters
          </button>
        </div>

        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-muted-foreground">
            Showing <span className="font-semibold text-foreground">{filtered.length}</span> products
          </p>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16 rounded-2xl border border-dashed border-border">
            <p className="text-muted-foreground">No products match your filters.</p>
            <button onClick={reset} className="mt-3 text-primary font-semibold text-sm">Reset Filters</button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {filtered.map((p) => <ProductCard key={p.id} p={p} />)}
          </div>
        )}
      </div>

      {showFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowFilters(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-80 max-w-[90vw] bg-background p-5 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-bold text-lg">Filters</h3>
              <button onClick={() => setShowFilters(false)} className="p-2 rounded-lg hover:bg-accent">
                <X className="w-5 h-5" />
              </button>
            </div>
            {FiltersPanel}
          </div>
        </div>
      )}
    </div>
  );
}
