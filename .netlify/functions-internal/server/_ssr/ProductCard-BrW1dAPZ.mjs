import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { Z as Star, M as MessageCircle } from "../_libs/lucide-react.mjs";
const WHATSAPP_NUMBER = "919876543210";
function ProductCard({ p }) {
  const discount = p.mrp ? Math.round((p.mrp - p.price) / p.mrp * 100) : 0;
  const onWhatsApp = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const msg = encodeURIComponent(
      `Hi AudioCare! I'm interested in *${p.name}*. Can you share more details and pricing?`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "rounded-2xl border border-border bg-card p-4 shadow-soft hover:shadow-card hover:-translate-y-1 transition-all group relative flex flex-col", children: [
    p.badge && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute top-3 left-3 z-10 bg-primary text-primary-foreground text-[10px] font-bold px-2 py-1 rounded", children: p.badge }),
    discount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "absolute top-3 right-3 z-10 bg-accent text-primary text-[10px] font-bold px-2 py-1 rounded", children: [
      discount,
      "% OFF"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/shop/$productId",
        params: { productId: p.id },
        className: "aspect-[4/3] rounded-xl bg-section overflow-hidden flex items-center justify-center",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: p.img,
            alt: p.name,
            loading: "lazy",
            className: "max-h-full object-contain group-hover:scale-110 transition-transform"
          }
        )
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex flex-col flex-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/shop/$productId", params: { productId: p.id }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-sm hover:text-primary transition-colors line-clamp-1", children: p.name }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
        p.categoryLabel,
        " · ",
        p.brand
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 mt-1", children: [
        [...Array(5)].map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          Star,
          {
            className: `w-3 h-3 ${i < Math.floor(p.rating) ? "fill-primary text-primary" : "text-muted-foreground/30"}`
          },
          i
        )),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-muted-foreground ml-1", children: [
          "(",
          p.reviews,
          ")"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-end justify-between gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-display font-bold text-lg leading-none", children: [
            "₹",
            p.price.toLocaleString("en-IN")
          ] }),
          p.mrp && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[11px] text-muted-foreground line-through mt-1", children: [
            "₹",
            p.mrp.toLocaleString("en-IN")
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: onWhatsApp,
            className: "inline-flex items-center gap-1 text-xs font-semibold bg-[#25D366] text-white px-3 py-2 rounded-lg hover:opacity-90 transition-opacity",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-3 h-3" }),
              " Enquire"
            ]
          }
        )
      ] })
    ] })
  ] });
}
export {
  ProductCard as P
};
