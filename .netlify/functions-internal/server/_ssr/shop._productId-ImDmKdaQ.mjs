import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { N as Navbar, F as Footer } from "./Footer-n3lcnv-q.mjs";
import { P as ProductCard } from "./ProductCard-BrW1dAPZ.mjs";
import { d as Route$5, a as useProductsCache } from "./router-DS6h6cMK.mjs";
import "../_libs/sonner.mjs";
import { i as ChevronRight, Z as Star, M as MessageCircle, d as Phone, S as ShieldCheck, W as Wrench, a1 as ThumbsUp } from "../_libs/lucide-react.mjs";
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
const WHATSAPP_NUMBER = "919876543210";
function ProductDetailPage() {
  const {
    product: p
  } = Route$5.useLoaderData();
  const {
    products
  } = useProductsCache();
  const discount = p.mrp ? Math.round((p.mrp - p.price) / p.mrp * 100) : 0;
  const related = reactExports.useMemo(() => {
    return products.filter((x) => x.category === p.category && x.id !== p.id).slice(0, 3);
  }, [products, p.category, p.id]);
  const whatsappMsg = encodeURIComponent(`Hi AudioCare! I'm interested in *${p.name}* (₹${p.price.toLocaleString("en-IN")}). Can you share more details?`);
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMsg}`;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "max-w-7xl mx-auto px-4 sm:px-6 py-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "flex items-center gap-1.5 text-xs text-muted-foreground mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "hover:text-primary", children: "Home" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3 h-3" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/shop", className: "hover:text-primary", children: "Products" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3 h-3" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium", children: p.name })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-2 gap-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative rounded-3xl bg-section p-8 lg:p-12 flex items-center justify-center min-h-[400px]", children: [
          p.badge && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute top-4 left-4 bg-primary text-primary-foreground text-xs font-bold px-3 py-1.5 rounded-lg", children: p.badge }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: p.img, alt: p.name, className: "max-h-[420px] object-contain drop-shadow-2xl" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-semibold text-primary uppercase tracking-wider", children: [
            p.brand,
            " · ",
            p.categoryLabel
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl lg:text-4xl font-bold mt-2", children: p.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mt-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1", children: [...Array(5)].map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: `w-4 h-4 ${i < Math.floor(p.rating) ? "fill-primary text-primary" : "text-muted-foreground/30"}` }, i)) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground", children: [
              p.rating,
              " · ",
              p.reviews,
              " reviews"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex items-end gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display text-4xl font-bold", children: [
              "₹",
              p.price.toLocaleString("en-IN")
            ] }),
            p.mrp && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-lg text-muted-foreground line-through", children: [
                "₹",
                p.mrp.toLocaleString("en-IN")
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-semibold text-primary", children: [
                discount,
                "% off"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Price shown is indicative — contact us for best deal" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 text-sm text-muted-foreground leading-relaxed", children: p.description }),
          p.highlights?.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-5 space-y-2", children: p.highlights.map((h) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" }),
            h
          ] }, h)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 flex flex-col sm:flex-row gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: whatsappUrl, target: "_blank", rel: "noopener noreferrer", className: "flex-1 inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl bg-[#25D366] text-white font-bold text-base shadow-lg hover:opacity-90 transition-opacity", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-5 h-5" }),
              "Enquire on WhatsApp"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "tel:+919876543210", className: "flex-1 inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl border-2 border-primary text-primary font-bold text-base hover:bg-primary hover:text-primary-foreground transition-all", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-5 h-5" }),
              "Call Us"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-xs text-muted-foreground mt-3", children: "💬 Chat with us on WhatsApp for the best price & availability" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 grid grid-cols-3 gap-3", children: [{
            icon: ShieldCheck,
            t: "Genuine Product",
            s: "100% authentic"
          }, {
            icon: Wrench,
            t: "Expert Support",
            s: "Repair & service"
          }, {
            icon: ThumbsUp,
            t: "Best Price",
            s: "Ask us for deals"
          }].map((b) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border p-3 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(b.icon, { className: "w-5 h-5 text-primary mx-auto" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold mt-1.5", children: b.t }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted-foreground", children: b.s })
          ] }, b.t)) })
        ] })
      ] }),
      related.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-16", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold mb-5", children: "You may also like" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-4", children: related.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx(ProductCard, { p: r }, r.id)) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
export {
  ProductDetailPage as component
};
