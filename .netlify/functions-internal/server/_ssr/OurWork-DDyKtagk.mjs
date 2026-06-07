import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { s as supabase } from "./router-DS6h6cMK.mjs";
import { A as AnimatedSection } from "./AnimatedSection-CxAJpKfW.mjs";
import { z as Briefcase, m as ArrowRight } from "../_libs/lucide-react.mjs";
const fallbackItems = [
  { id: "1", title: "JBL Speaker Restoration", category: "Repair", img_url: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=400&q=80", description: "Full driver replacement and cabinet refinishing." },
  { id: "2", title: "Vintage Turntable Fix", category: "Restoration", img_url: "https://images.unsplash.com/photo-1593697909822-90e7c0e4da3c?w=400&q=80", description: "Belt replacement and platter balancing." },
  { id: "3", title: "Soundbar Installation", category: "Installation", img_url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80", description: "Wall-mounted surround sound setup." }
];
function OurWork({ limit }) {
  const [items, setItems] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    let query = supabase.from("portfolio").select("*").order("created_at", { ascending: false });
    if (limit) query = query.limit(limit);
    query.then(({ data, error }) => {
      if (!error && data && data.length > 0) {
        setItems(data);
      } else {
        setItems(limit ? fallbackItems.slice(0, limit) : fallbackItems);
      }
      setLoading(false);
    });
  }, [limit]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "max-w-7xl mx-auto px-4 sm:px-6 py-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-[280px_1fr] gap-8 items-start", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedSection, { direction: "left", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { className: "w-3 h-3" }),
        " Portfolio"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-3xl md:text-4xl font-black leading-tight", children: [
        "Our ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient-orange", children: "Work" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-3 leading-relaxed", children: [
        "Real repairs. Real results.",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        "Every job done with care."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "a",
        {
          href: "/our-work",
          className: "inline-flex items-center gap-2 text-xs font-bold text-primary border border-primary/50 rounded-full px-4 py-2 mt-5 hover:bg-primary hover:text-primary-foreground transition-all hover:border-primary hover:shadow-glow",
          children: [
            "View All Work ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-3 h-3" })
          ]
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-4", children: loading ? [...Array(3)].map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl border border-border bg-card animate-pulse h-52" }, i)) : items.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedSection, { direction: "up", delay: i * 80, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative rounded-2xl overflow-hidden border border-border bg-card shadow-soft group hover:border-primary hover:shadow-card transition-all", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-video overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: item.img_url,
            alt: item.title,
            loading: "lazy",
            className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          }
        ),
        item.category && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute top-2 left-2 bg-primary text-primary-foreground text-[10px] font-bold px-2 py-1 rounded-md", children: item.category })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-sm", children: item.title }),
        item.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1 line-clamp-2", children: item.description })
      ] })
    ] }) }, item.id)) })
  ] }) });
}
export {
  OurWork as O
};
