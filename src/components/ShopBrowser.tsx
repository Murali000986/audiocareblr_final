import { useMemo, useState } from "react";
import { useProductsCache } from "@/contexts/ProductsCacheContext";
import { categories, brands } from "@/data/sampleData";
import { ProductCard } from "./ProductCard";
import { SkeletonCard } from "./SkeletonCard";
import { Search, SlidersHorizontal, X, ChevronDown } from "lucide-react";
import type { Product } from "@/data/sampleData";

type Props = { initialCategory?: string; initialQuery?: string };

export function ShopBrowser({ initialCategory = "all", initialQuery = "" }: Props) {
  const { products, loading } = useProductsCache();
  const [q, setQ] = useState(initialQuery);
  const [cat, setCat] = useState<string>(initialCategory);
  const [selBrands, setSelBrands] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState(100000);
  const [sort, setSort] = useState("popular");
  const [showFilters, setShowFilters] = useState(false);

  // Derive unique brands from live product list
  const liveBrands = useMemo(
    () => [...new Set(products.map((p) => p.brand))].sort(),
    [products]
  );
  const brandList = liveBrands.length > 0 ? liveBrands : brands;

  const filtered = useMemo(() => {
    let list: Product[] = products.slice();
    if (cat !== "all") list = list.filter((p) => p.category === cat);
    if (q.trim()) {
      const term = q.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(term) ||
          p.brand.toLowerCase().includes(term) ||
          p.categoryLabel.toLowerCase().includes(term)
      );
    }
    if (selBrands.length) list = list.filter((p) => selBrands.includes(p.brand));
    list = list.filter((p) => p.price <= maxPrice);
    switch (sort) {
      case "price-low":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        list.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        list.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        list.reverse();
        break;
      default:
        list.sort((a, b) => b.reviews - a.reviews);
    }
    return list;
  }, [products, q, cat, selBrands, maxPrice, sort]);

  const toggleBrand = (b: string) =>
    setSelBrands((p) => (p.includes(b) ? p.filter((x) => x !== b) : [...p, b]));

  const reset = () => {
    setQ("");
    setCat("all");
    setSelBrands([]);
    setMaxPrice(100000);
    setSort("popular");
  };

  const activeFiltersCount = [
    cat !== "all",
    selBrands.length > 0,
    maxPrice < 100000,
  ].filter(Boolean).length;

  const FiltersPanel = (
    <div className="space-y-6">
      <div>
        <h4 className="font-display font-bold text-sm mb-3 text-foreground">
          Category
        </h4>
        <div className="space-y-1">
          {[{ slug: "all", name: "All Products" }, ...categories].map((c) => (
            <button
              key={c.slug}
              onClick={() => setCat(c.slug)}
              className={`w-full text-left text-sm px-3 py-2 rounded-lg transition-all font-medium ${
                cat === c.slug
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-section"
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-display font-bold text-sm mb-3 text-foreground">
          Brand
        </h4>
        <div className="flex flex-wrap gap-2">
          {brandList.map((b) => (
            <button
              key={b}
              onClick={() => toggleBrand(b)}
              className={`text-xs px-3 py-1.5 rounded-full border transition-all font-semibold ${
                selBrands.includes(b)
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border text-muted-foreground hover:border-primary hover:text-foreground"
              }`}
            >
              {b}
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-display font-bold text-sm text-foreground">
            Max Price
          </h4>
          <span className="text-xs font-bold text-primary">
            ₹{maxPrice.toLocaleString("en-IN")}
          </span>
        </div>
        <input
          type="range"
          min={500}
          max={100000}
          step={500}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full accent-primary cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
          <span>₹500</span>
          <span>₹1,00,000</span>
        </div>
      </div>

      {activeFiltersCount > 0 && (
        <button
          onClick={reset}
          className="w-full flex items-center justify-center gap-2 py-2 rounded-lg border border-destructive/40 text-destructive text-xs font-bold hover:bg-destructive/10 transition-all"
        >
          <X className="w-3.5 h-3.5" /> Clear All Filters
        </button>
      )}
    </div>
  );

  return (
    <div className="grid lg:grid-cols-[260px_1fr] gap-8">
      {/* Desktop sidebar */}
      <aside className="hidden lg:block sticky top-24 self-start glass border border-border rounded-2xl p-5 shadow-soft max-h-[calc(100vh-8rem)] overflow-y-auto">
        {FiltersPanel}
      </aside>

      {/* Products */}
      <div>
        {/* Search + sort bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search speakers, brands, categories…"
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-section text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all"
            />
            {q && (
              <button
                onClick={() => setQ("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <div className="relative">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="appearance-none pl-4 pr-8 py-3 rounded-xl border border-border bg-section text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
            >
              <option value="popular">Most Popular</option>
              <option value="rating">Top Rated</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="newest">Newest</option>
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          </div>
          <button
            onClick={() => setShowFilters(true)}
            className="lg:hidden inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-border bg-section text-sm font-bold relative"
          >
            <SlidersHorizontal className="w-4 h-4" /> Filters
            {activeFiltersCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-primary text-primary-foreground text-[9px] font-bold flex items-center justify-center">
                {activeFiltersCount}
              </span>
            )}
          </button>
        </div>

        {/* Results count */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-muted-foreground">
            {loading ? (
              <span className="inline-block w-24 h-4 rounded shimmer" />
            ) : (
              <>
                Showing{" "}
                <span className="font-bold text-foreground">
                  {filtered.length}
                </span>{" "}
                products
              </>
            )}
          </p>
          {activeFiltersCount > 0 && (
            <button
              onClick={reset}
              className="text-xs text-primary font-semibold hover:underline"
            >
              Clear filters
            </button>
          )}
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 rounded-2xl border border-dashed border-border">
            <p className="text-muted-foreground mb-2">
              No products match your filters.
            </p>
            <button
              onClick={reset}
              className="text-primary font-bold text-sm hover:underline"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {filtered.map((p, i) => (
              <div
                key={p.id}
                className="animate-fade-up"
                style={{ animationDelay: `${Math.min(i, 5) * 60}ms` }}
              >
                <ProductCard p={p} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Mobile filter drawer */}
      {showFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowFilters(false)}
          />
          <div className="absolute right-0 top-0 bottom-0 w-80 max-w-[90vw] glass border-l border-border p-5 overflow-y-auto animate-slide-right">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-display font-bold text-lg">
                Filters{" "}
                {activeFiltersCount > 0 && (
                  <span className="text-primary">({activeFiltersCount})</span>
                )}
              </h3>
              <button
                onClick={() => setShowFilters(false)}
                className="w-8 h-8 rounded-lg hover:bg-section flex items-center justify-center"
              >
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
