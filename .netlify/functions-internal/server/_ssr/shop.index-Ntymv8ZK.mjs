import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { N as Navbar, F as Footer } from "./Footer-n3lcnv-q.mjs";
import { S as ShopBrowser } from "./ShopBrowser-Dx25wGZT.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { R as Route$8, c as categories } from "./router-DS6h6cMK.mjs";
import "../_libs/sonner.mjs";
import "../_libs/lucide-react.mjs";
import "./ProductCard-BrW1dAPZ.mjs";
import "./SkeletonCard-c9stZMFV.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
function ShopPage() {
  const {
    q
  } = Route$8.useSearch();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "max-w-7xl mx-auto px-4 sm:px-6 py-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-4xl lg:text-5xl font-bold", children: [
          "Our ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient-orange", children: "Products" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-2 max-w-xl", children: "Explore our range of premium audio products — enquire on WhatsApp for pricing and availability." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5 flex flex-wrap gap-2", children: categories.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/shop/category/$slug", params: {
          slug: c.slug
        }, className: "text-xs font-semibold px-4 py-2 rounded-full border border-border hover:border-primary hover:text-primary transition-colors", children: c.name }, c.slug)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ShopBrowser, { initialQuery: q }, q)
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
export {
  ShopPage as component
};
