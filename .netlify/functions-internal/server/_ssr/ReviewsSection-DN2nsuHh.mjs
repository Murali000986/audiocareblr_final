import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { s as supabase, r as reviews } from "./router-DS6h6cMK.mjs";
import { A as AnimatedSection } from "./AnimatedSection-CxAJpKfW.mjs";
import { Y as Quote, Z as Star } from "../_libs/lucide-react.mjs";
function ReviewsSection() {
  const [testimonials, setTestimonials] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    supabase.from("testimonials").select("*").order("created_at", { ascending: false }).then(({ data, error }) => {
      if (!error && data && data.length > 0) {
        setTestimonials(data);
      } else {
        setTestimonials(
          reviews.map((r, i) => ({
            id: String(i),
            name: r.name,
            role: "Verified Customer",
            text: r.text,
            rating: r.rating
          }))
        );
      }
      setLoading(false);
    });
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "max-w-7xl mx-auto px-4 sm:px-6 py-16", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedSection, { direction: "up", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-3", children: "Testimonials" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-3xl md:text-4xl font-black", children: [
        "What Our ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient-orange", children: "Customers Say" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-1 bg-primary rounded-full mt-4 mx-auto" })
    ] }) }),
    loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-4 gap-4", children: [...Array(4)].map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl border border-border bg-card p-5 animate-pulse h-40" }, i)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-4 gap-5", children: testimonials.map((r, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedSection, { direction: "up", delay: i * 80, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative rounded-2xl border border-border bg-card p-5 shadow-soft hover:border-primary hover:shadow-card transition-all h-full flex flex-col", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Quote, { className: "w-6 h-6 text-primary/30 absolute top-4 right-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-0.5 mb-4", children: [...Array(5)].map((_, j) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        Star,
        {
          className: `w-3.5 h-3.5 ${j < r.rating ? "fill-primary text-primary" : "text-muted-foreground/30"}`
        },
        j
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground leading-relaxed flex-1 italic", children: [
        '"',
        r.text,
        '"'
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mt-4 pt-4 border-t border-border", children: [
        r.avatar_url ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: r.avatar_url, alt: r.name, className: "w-9 h-9 rounded-full object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-full bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center text-primary-foreground font-bold text-sm flex-shrink-0", children: r.name.charAt(0).toUpperCase() }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-bold text-sm", children: r.name }),
          r.role && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted-foreground", children: r.role })
        ] })
      ] })
    ] }) }, r.id)) })
  ] });
}
export {
  ReviewsSection as R
};
