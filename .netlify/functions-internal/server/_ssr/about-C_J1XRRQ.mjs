import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { e as useLocation, L as Link, O as Outlet } from "../_libs/tanstack__react-router.mjs";
import { N as Navbar, F as Footer } from "./Footer-n3lcnv-q.mjs";
import "../_libs/sonner.mjs";
import { d as Phone, O as Info, Q as Settings2, S as ShieldCheck, V as Users } from "../_libs/lucide-react.mjs";
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
const navLinks = [{
  to: "/about",
  label: "Overview",
  icon: Info,
  exact: true
}, {
  to: "/about/services",
  label: "Our Services",
  icon: Settings2
}, {
  to: "/about/brands",
  label: "Brand Partners",
  icon: ShieldCheck
}, {
  to: "/about/clients",
  label: "Major Clients",
  icon: Users
}];
function AboutLayout() {
  const location = useLocation();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "flex-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative py-24 lg:py-40 overflow-hidden bg-black", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1920&auto=format&fit=crop", alt: "AudioCare – premium audio solutions", className: "absolute inset-0 w-full h-full object-cover opacity-40 scale-105" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 max-w-7xl mx-auto px-6 sm:px-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary font-bold uppercase tracking-[0.25em] text-xs mb-5 drop-shadow", children: "Est. 2007 · Bengaluru, India" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-5xl lg:text-7xl font-display font-extrabold tracking-tight text-white leading-[1.05] drop-shadow-xl max-w-3xl", children: [
            "About",
            /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
            "AudioCare"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 text-white/80 text-lg lg:text-xl max-w-xl leading-relaxed drop-shadow-md", children: "18+ years of excellence in Home Audio & Commercial Audio Sales, Service, Installation & AMC." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 flex flex-wrap items-center gap-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "tel:9945966499", className: "inline-flex items-center gap-2 bg-primary text-primary-foreground font-bold px-6 py-3 rounded-xl hover:bg-primary/90 transition-colors text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-4 h-4" }),
              " 9945966499"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "tel:08040544499", className: "inline-flex items-center gap-2 border border-white/30 text-white hover:bg-white/10 font-medium px-6 py-3 rounded-xl transition-colors text-sm", children: "Office: 080-40544499" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 py-14", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col lg:flex-row gap-12 items-start", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "w-full lg:w-72 flex-shrink-0 lg:sticky lg:top-24", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl p-3 shadow-soft", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-black uppercase tracking-widest text-muted-foreground px-3 mb-3 mt-1", children: "Explore" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "flex flex-row lg:flex-col gap-1 overflow-x-auto lg:overflow-visible", children: navLinks.map((link) => {
              const isActive = link.exact ? location.pathname === link.to : location.pathname.startsWith(link.to);
              return /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: link.to, className: `flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm whitespace-nowrap transition-all ${isActive ? "bg-primary text-primary-foreground shadow" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(link.icon, { className: "w-4 h-4 flex-shrink-0" }),
                link.label
              ] }) }, link.to);
            }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 bg-card border border-border rounded-2xl p-5 shadow-soft space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-black uppercase tracking-widest text-muted-foreground", children: "Quick Info" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-foreground", children: "Founded" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "2007 · 18+ Years" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-foreground", children: "Location" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "#385, 17th E Main Rd, KHB Colony, Bengaluru" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-foreground", children: "Services" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Sales · Installation · Repair · AMC" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-foreground", children: "Brands" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "JBL · Infinity · Harman Kardon" })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 min-w-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
export {
  AboutLayout as component
};
