import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { a as useProductsCache, g as brands, c as categories } from "./router-DS6h6cMK.mjs";
import { P as ProductCard } from "./ProductCard-BrW1dAPZ.mjs";
import { S as SkeletonCard } from "./SkeletonCard-c9stZMFV.mjs";
import { X, a4 as Search, aa as ChevronDown, ab as SlidersHorizontal } from "../_libs/lucide-react.mjs";
function ShopBrowser({ initialCategory = "all", initialQuery = "" }) {
  const { products, loading } = useProductsCache();
  const [q, setQ] = reactExports.useState(initialQuery);
  const [cat, setCat] = reactExports.useState(initialCategory);
  const [selBrands, setSelBrands] = reactExports.useState([]);
  const [maxPrice, setMaxPrice] = reactExports.useState(1e5);
  const [sort, setSort] = reactExports.useState("popular");
  const [showFilters, setShowFilters] = reactExports.useState(false);
  const liveBrands = reactExports.useMemo(
    () => [...new Set(products.map((p) => p.brand))].sort(),
    [products]
  );
  const brandList = liveBrands.length > 0 ? liveBrands : brands;
  const filtered = reactExports.useMemo(() => {
    let list = products.slice();
    if (cat !== "all") list = list.filter((p) => p.category === cat);
    if (q.trim()) {
      const term = q.toLowerCase();
      list = list.filter(
        (p) => p.name.toLowerCase().includes(term) || p.brand.toLowerCase().includes(term) || p.categoryLabel.toLowerCase().includes(term)
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
  const toggleBrand = (b) => setSelBrands((p) => p.includes(b) ? p.filter((x) => x !== b) : [...p, b]);
  const reset = () => {
    setQ("");
    setCat("all");
    setSelBrands([]);
    setMaxPrice(1e5);
    setSort("popular");
  };
  const activeFiltersCount = [
    cat !== "all",
    selBrands.length > 0,
    maxPrice < 1e5
  ].filter(Boolean).length;
  const FiltersPanel = /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-display font-bold text-sm mb-3 text-foreground", children: "Category" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1", children: [{ slug: "all", name: "All Products" }, ...categories].map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => setCat(c.slug),
          className: `w-full text-left text-sm px-3 py-2 rounded-lg transition-all font-medium ${cat === c.slug ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground hover:bg-section"}`,
          children: c.name
        },
        c.slug
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-display font-bold text-sm mb-3 text-foreground", children: "Brand" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: brandList.map((b) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => toggleBrand(b),
          className: `text-xs px-3 py-1.5 rounded-full border transition-all font-semibold ${selBrands.includes(b) ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground hover:border-primary hover:text-foreground"}`,
          children: b
        },
        b
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-display font-bold text-sm text-foreground", children: "Max Price" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-bold text-primary", children: [
          "₹",
          maxPrice.toLocaleString("en-IN")
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "range",
          min: 500,
          max: 1e5,
          step: 500,
          value: maxPrice,
          onChange: (e) => setMaxPrice(Number(e.target.value)),
          className: "w-full accent-primary cursor-pointer"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-[10px] text-muted-foreground mt-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "₹500" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "₹1,00,000" })
      ] })
    ] }),
    activeFiltersCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        onClick: reset,
        className: "w-full flex items-center justify-center gap-2 py-2 rounded-lg border border-destructive/40 text-destructive text-xs font-bold hover:bg-destructive/10 transition-all",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3.5 h-3.5" }),
          " Clear All Filters"
        ]
      }
    )
  ] });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-[260px_1fr] gap-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("aside", { className: "hidden lg:block sticky top-24 self-start glass border border-border rounded-2xl p-5 shadow-soft max-h-[calc(100vh-8rem)] overflow-y-auto", children: FiltersPanel }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3 mb-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "text",
              value: q,
              onChange: (e) => setQ(e.target.value),
              placeholder: "Search speakers, brands, categories…",
              className: "w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-section text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all"
            }
          ),
          q && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => setQ(""),
              className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              value: sort,
              onChange: (e) => setSort(e.target.value),
              className: "appearance-none pl-4 pr-8 py-3 rounded-xl border border-border bg-section text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "popular", children: "Most Popular" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "rating", children: "Top Rated" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "price-low", children: "Price: Low to High" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "price-high", children: "Price: High to Low" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "newest", children: "Newest" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => setShowFilters(true),
            className: "lg:hidden inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-border bg-section text-sm font-bold relative",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SlidersHorizontal, { className: "w-4 h-4" }),
              " Filters",
              activeFiltersCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -top-1 -right-1 w-4 h-4 rounded-full bg-primary text-primary-foreground text-[9px] font-bold flex items-center justify-center", children: activeFiltersCount })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block w-24 h-4 rounded shimmer" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          "Showing",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-foreground", children: filtered.length }),
          " ",
          "products"
        ] }) }),
        activeFiltersCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: reset,
            className: "text-xs text-primary font-semibold hover:underline",
            children: "Clear filters"
          }
        )
      ] }),
      loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 xl:grid-cols-3 gap-4", children: [...Array(6)].map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonCard, {}, i)) }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-16 rounded-2xl border border-dashed border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-2", children: "No products match your filters." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: reset,
            className: "text-primary font-bold text-sm hover:underline",
            children: "Reset Filters"
          }
        )
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 xl:grid-cols-3 gap-4", children: filtered.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "animate-fade-up",
          style: { animationDelay: `${Math.min(i, 5) * 60}ms` },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ProductCard, { p })
        },
        p.id
      )) })
    ] }),
    showFilters && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed inset-0 z-50 lg:hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "absolute inset-0 bg-black/60 backdrop-blur-sm",
          onClick: () => setShowFilters(false)
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute right-0 top-0 bottom-0 w-80 max-w-[90vw] glass border-l border-border p-5 overflow-y-auto animate-slide-right", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display font-bold text-lg", children: [
            "Filters",
            " ",
            activeFiltersCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-primary", children: [
              "(",
              activeFiltersCount,
              ")"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => setShowFilters(false),
              className: "w-8 h-8 rounded-lg hover:bg-section flex items-center justify-center",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-5 h-5" })
            }
          )
        ] }),
        FiltersPanel
      ] })
    ] })
  ] });
}
export {
  ShopBrowser as S
};
