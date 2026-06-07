import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { N as Navbar, F as Footer } from "./Footer-n3lcnv-q.mjs";
import { u as useCart } from "./CartContext-ByUfK2u5.mjs";
import "../_libs/sonner.mjs";
import { b as ShoppingBag, j as Trash2, k as Minus, l as Plus, m as ArrowRight } from "../_libs/lucide-react.mjs";
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
import "./router-DS6h6cMK.mjs";
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
function CartPage() {
  const {
    detailed,
    subtotal,
    setQty,
    remove,
    clear,
    count
  } = useCart();
  const shipping = subtotal > 999 || subtotal === 0 ? 0 : 99;
  const total = subtotal + shipping;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "max-w-7xl mx-auto px-4 sm:px-6 py-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-4xl font-bold", children: [
        "Your ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient-orange", children: "Cart" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground mt-1", children: [
        count,
        " ",
        count === 1 ? "item" : "items"
      ] }),
      detailed.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-12 text-center py-16 rounded-2xl border border-dashed border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "w-12 h-12 text-muted-foreground/40 mx-auto" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-muted-foreground", children: "Your cart is empty" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/shop", className: "inline-block mt-4 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold", children: "Continue Shopping" })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 grid lg:grid-cols-[1fr_380px] gap-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          detailed.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 p-4 rounded-2xl border border-border bg-card", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/shop/$productId", params: {
              productId: d.product.id
            }, className: "w-24 h-24 sm:w-32 sm:h-32 rounded-xl bg-section flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: d.product.img, alt: d.product.name, className: "max-h-full object-contain" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/shop/$productId", params: {
                    productId: d.product.id
                  }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-base hover:text-primary truncate", children: d.product.name }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                    d.product.brand,
                    " · ",
                    d.product.categoryLabel
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-display font-bold text-lg mt-2", children: [
                    "₹",
                    (Number(d.product.price) || 0).toLocaleString("en-IN")
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => remove(d.product.id), className: "p-2 hover:text-destructive", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" }) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-center justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center border-2 border-border rounded-xl", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setQty(d.product.id, d.qty - 1), className: "w-9 h-9 hover:bg-accent flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "w-4 h-4" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-10 text-center font-semibold", children: d.qty }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setQty(d.product.id, d.qty + 1), className: "w-9 h-9 hover:bg-accent flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "Subtotal" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-display font-bold", children: [
                    "₹",
                    (Number(d.lineTotal) || 0).toLocaleString("en-IN")
                  ] })
                ] })
              ] })
            ] })
          ] }, d.product.id)),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: clear, className: "text-xs text-muted-foreground hover:text-destructive font-semibold mt-2", children: "Clear Cart" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "rounded-2xl border border-border bg-card p-6 h-fit sticky top-24 shadow-soft", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-lg", children: "Order Summary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("dl", { className: "mt-4 space-y-2 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-muted-foreground", children: "Subtotal" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("dd", { children: [
                "₹",
                (Number(subtotal) || 0).toLocaleString("en-IN")
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-muted-foreground", children: "Shipping" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { children: shipping === 0 ? "FREE" : `₹${shipping}` })
            ] }),
            shipping === 0 && subtotal > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-primary", children: "🎉 Free delivery unlocked" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-border pt-3 flex justify-between font-display font-bold text-lg", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { children: "Total" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("dd", { children: [
                "₹",
                (Number(total) || 0).toLocaleString("en-IN")
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/checkout", className: "mt-5 flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold shadow-card hover:shadow-glow", children: [
            "Checkout ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/shop", className: "mt-3 block text-center text-sm text-muted-foreground hover:text-primary font-semibold", children: "← Continue Shopping" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
export {
  CartPage as component
};
