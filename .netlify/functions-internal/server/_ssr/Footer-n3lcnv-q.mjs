import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, u as useRouter, L as Link } from "../_libs/tanstack__react-router.mjs";
import { f as useTheme, u as useAuth } from "./router-DS6h6cMK.mjs";
import { a4 as Search, a5 as Sun, a6 as Moon, X, s as Menu, a7 as Facebook, a8 as Instagram, a9 as Youtube, M as MessageCircle, d as Phone, e as Mail, f as MapPin, a as CircleCheck } from "../_libs/lucide-react.mjs";
function Logo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center -space-y-0.5 group py-1", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "svg",
      {
        viewBox: "0 0 100 100",
        className: "w-10 h-10 text-[#cc0e0b] transition-transform group-hover:scale-105",
        fill: "none",
        stroke: "currentColor",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M 85 30 A 40 40 0 1 0 85 70", stroke: "#cc0e0b", strokeWidth: "8", fill: "none", strokeLinecap: "round" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M 22 78 L 50 15 L 78 78 M 34 55 L 66 55", stroke: "#cc0e0b", strokeWidth: "8", fill: "none", strokeLinejoin: "miter", strokeLinecap: "round" })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "span",
      {
        style: { fontFamily: "'Black Ops One', cursive" },
        className: "text-[#cc0e0b] text-[15px] leading-tight tracking-[0.1em] uppercase mt-1",
        children: "Audio Care"
      }
    )
  ] });
}
const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/shop", label: "Products" },
  { to: "/blog", label: "Blog" },
  { to: "/repair-service", label: "Repair Services" },
  { to: "/our-work", label: "Our Work" },
  { to: "/contact", label: "Contact" }
];
function Navbar() {
  const { theme, toggle } = useTheme();
  const [open, setOpen] = reactExports.useState(false);
  const [searchOpen, setSearchOpen] = reactExports.useState(false);
  const [q, setQ] = reactExports.useState("");
  const { user } = useAuth();
  const navigate = useNavigate();
  const router = useRouter();
  reactExports.useEffect(() => {
    setOpen(false);
    setSearchOpen(false);
  }, [router.state.location.pathname]);
  const onSearch = (e) => {
    e.preventDefault();
    if (q.trim()) {
      navigate({ to: "/shop", search: { q: q.trim() } });
      setSearchOpen(false);
      setQ("");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "sticky top-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Logo, {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "hidden lg:flex items-center gap-7 text-sm font-medium", children: links.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: l.to,
            className: "text-muted-foreground hover:text-foreground transition-colors relative py-1",
            activeProps: { className: "text-foreground after:absolute after:-bottom-[20px] after:left-0 after:right-0 after:h-[2px] after:bg-primary after:rounded-full" },
            activeOptions: { exact: l.to === "/" },
            children: l.label
          }
        ) }, l.to)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 sm:gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { "aria-label": "Search", onClick: () => setSearchOpen(true), className: "p-2 rounded-full hover:bg-muted transition-colors hidden sm:block", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "w-5 h-5 text-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { "aria-label": "Toggle theme", onClick: toggle, className: "p-2 rounded-full hover:bg-muted transition-colors", children: theme === "dark" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Sun, { className: "w-5 h-5 text-foreground" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Moon, { className: "w-5 h-5 text-foreground" }) }),
          user ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative group hidden sm:block", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold ml-1", children: user.email?.charAt(0).toUpperCase() || "U" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute right-0 top-full mt-2 w-48 bg-card border border-border rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-3 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: user.email }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: async () => {
                    const { supabase } = await import("./router-DS6h6cMK.mjs").then((n) => n.i);
                    await supabase.auth.signOut();
                    window.location.reload();
                  },
                  className: "w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-500/10 transition-colors rounded-b-xl",
                  children: "Sign Out"
                }
              )
            ] })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/auth", className: "hidden sm:flex items-center justify-center p-2 ml-1 rounded-full hover:bg-muted transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-5 h-5 text-foreground", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { "aria-label": "Menu", className: "lg:hidden p-2 rounded-full hover:bg-muted ml-1", onClick: () => setOpen(!open), children: open ? /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-5 h-5 text-foreground" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "w-5 h-5 text-foreground" }) })
        ] })
      ] }),
      open && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:hidden border-t border-border px-6 py-4 space-y-3 bg-background", children: links.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "list-none", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: l.to, onClick: () => setOpen(false), className: "block text-sm font-medium text-foreground", children: l.label }) }, l.to)) })
    ] }),
    searchOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed inset-0 z-[60] flex items-start justify-center pt-24 px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-black/60", onClick: () => setSearchOpen(false) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: onSearch, className: "relative w-full max-w-2xl bg-background rounded-2xl shadow-card border border-border p-2 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "w-5 h-5 text-muted-foreground ml-3" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            autoFocus: true,
            value: q,
            onChange: (e) => setQ(e.target.value),
            placeholder: "Search for speakers, brands, accessories…",
            className: "flex-1 bg-transparent border-none focus:outline-none py-3 text-base text-foreground"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setSearchOpen(false), className: "p-2 rounded-lg hover:bg-accent", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-5 h-5 text-foreground" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", className: "px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm", children: "Search" })
      ] })
    ] })
  ] });
}
const WHATSAPP_NUMBER = "919876543210";
function Footer() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("footer", { className: "border-t border-border bg-section mt-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 py-12 grid md:grid-cols-2 lg:grid-cols-5 gap-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Logo, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-3 leading-relaxed", children: [
          "Your trusted audio partner.",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          "Products, repair & expert service."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 mt-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#", "aria-label": "Facebook", className: "w-9 h-9 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Facebook, { className: "w-4 h-4" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#", "aria-label": "Instagram", className: "w-9 h-9 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Instagram, { className: "w-4 h-4" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#", "aria-label": "YouTube", className: "w-9 h-9 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Youtube, { className: "w-4 h-4" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: `https://wa.me/${WHATSAPP_NUMBER}`, target: "_blank", rel: "noopener noreferrer", "aria-label": "WhatsApp", className: "w-9 h-9 rounded-full border border-border flex items-center justify-center hover:bg-[#25D366] hover:text-white hover:border-[#25D366] transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-4 h-4" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-bold mb-3", children: "Quick Links" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2 text-sm text-muted-foreground", children: [
          { to: "/", label: "Home" },
          { to: "/shop", label: "Products" },
          { to: "/blog", label: "Blog" },
          { to: "/repair-service", label: "Repair Services" },
          { to: "/our-work", label: "Our Work" },
          { to: "/about", label: "About Us" },
          { to: "/contact", label: "Contact" }
        ].map(({ to, label }) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to, className: "hover:text-primary transition-colors", children: [
          "› ",
          label
        ] }) }, to)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-bold mb-3", children: "Contact Us" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-2.5 text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "tel:+919876543210", className: "flex items-center gap-2 hover:text-primary transition-colors", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-4 h-4 text-primary shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "+91 98765 43210" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: `https://wa.me/${WHATSAPP_NUMBER}`, target: "_blank", rel: "noopener noreferrer", className: "flex items-center gap-2 hover:text-primary transition-colors", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-4 h-4 text-primary shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Chat on WhatsApp" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "mailto:info@audiocare.in", className: "flex items-center gap-2 hover:text-primary transition-colors", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "w-4 h-4 text-primary shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "info@audiocare.in" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-4 h-4 text-primary mt-0.5 shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "123, Sound Street, Near Central Mall, Koramangala, Bengaluru – 560034" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-bold mb-3", children: "Why AudioCare?" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2 text-sm text-muted-foreground", children: [
          "Expert & Certified Technicians",
          "Genuine & Original Parts",
          "Up to 3 Months Warranty",
          "Transparent Pricing",
          "Quick Turnaround Service"
        ].map((l) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4 text-primary mt-0.5 shrink-0" }),
          l
        ] }, l)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-bold mb-3", children: "WhatsApp Enquiry" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-4", children: "Interested in a product? Chat with us directly for the best price and availability." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "a",
          {
            href: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi AudioCare! I'd like to enquire about your products.")}`,
            target: "_blank",
            rel: "noopener noreferrer",
            className: "inline-flex items-center gap-2 bg-[#25D366] text-white font-semibold px-4 py-2.5 rounded-xl hover:opacity-90 transition-opacity w-full justify-center",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-4 h-4" }),
              " Chat on WhatsApp"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-border py-4 text-center text-xs text-muted-foreground", children: "© 2026 AudioCare. All rights reserved." })
  ] });
}
export {
  Footer as F,
  Navbar as N
};
