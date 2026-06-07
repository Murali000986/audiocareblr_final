import { Q as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { Q as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { c as createRouter, a as createRootRouteWithContext, u as useRouter, L as Link, O as Outlet, H as HeadContent, S as Scripts, b as createFileRoute, l as lazyRouteComponent } from "../_libs/tanstack__react-router.mjs";
import { Q as notFound } from "../_libs/tanstack__router-core.mjs";
import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { T as Toaster } from "../_libs/sonner.mjs";
import { c as createClient } from "../_libs/supabase__supabase-js.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "node:stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
const appCss = "/assets/styles-B-dYXMCm.css";
function reportLovableError(error, context = {}) {
  if (typeof window === "undefined") return;
  window.__lovableEvents?.captureException?.(
    error,
    {
      source: "react_error_boundary",
      route: window.location.pathname,
      ...context
    },
    {
      mechanism: "react_error_boundary",
      handled: false,
      severity: "error"
    }
  );
}
const ThemeContext = reactExports.createContext({ theme: "light", toggle: () => {
} });
function ThemeProvider({ children }) {
  const [theme, setTheme] = reactExports.useState("light");
  reactExports.useEffect(() => {
    const stored = typeof window !== "undefined" && localStorage.getItem("theme");
    const initial = stored ?? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    setTheme(initial);
  }, []);
  reactExports.useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    if (typeof window !== "undefined") localStorage.setItem("theme", theme);
  }, [theme]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeContext.Provider, { value: { theme, toggle: () => setTheme((t) => t === "dark" ? "light" : "dark") }, children });
}
const useTheme = () => reactExports.useContext(ThemeContext);
const supabaseUrl = "https://zorbicldczcewexjiqla.supabase.co";
const supabaseAnonKey = "sb_publishable_jnvsKhO4A2ZFZ25J8dnQgw_KVOWD8kL";
const supabase = createClient(supabaseUrl, supabaseAnonKey);
const supabase$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  supabase
}, Symbol.toStringTag, { value: "Module" }));
const AuthContext = reactExports.createContext(null);
function AuthProvider({ children }) {
  const [user, setUser] = reactExports.useState(null);
  const [session, setSession] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    supabase.auth.getSession().then(({ data: { session: session2 } }) => {
      setSession(session2);
      setUser(session2?.user ?? null);
      setLoading(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session2) => {
      setSession(session2);
      setUser(session2?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);
  const signUp = async (email, password, fullName) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } }
    });
    return { error };
  };
  const signIn = async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error };
  };
  const signInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: window.location.origin }
    });
  };
  const signOut = async () => {
    await supabase.auth.signOut();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AuthContext.Provider, { value: { user, session, loading, signUp, signIn, signInWithGoogle, signOut }, children });
}
function useAuth() {
  const ctx = reactExports.useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
const bluetooth = "/assets/prod-bluetooth-dVIbMEw1.jpg";
const party = "/assets/prod-party-vVt6VEBT.jpg";
const soundbar = "/assets/prod-soundbar-Cnog3LeB.jpg";
const hometheatre = "/assets/prod-hometheatre-BGFPik9T.jpg";
const accessories = "/assets/prod-accessories-D2me0uRJ.jpg";
const categories = [
  { slug: "bluetooth", name: "Bluetooth Speakers", img: bluetooth, icon: "bluetooth" },
  { slug: "party", name: "Party Speakers", img: party, icon: "disc" },
  { slug: "soundbar", name: "Soundbars", img: soundbar, icon: "audio-waveform" },
  { slug: "home-theatre", name: "Home Theatre", img: hometheatre, icon: "monitor" },
  { slug: "accessories", name: "Accessories", img: accessories, icon: "headphones" }
];
const brands = ["JBL", "Sony", "boAt", "Bose", "Zebronics", "Marshall", "Philips"];
const desc = "Experience studio-grade sound with deep bass, crystal-clear highs and premium build quality. Backed by AudioCare's expert support and warranty.";
const highlights = [
  "Powerful drivers with rich, room-filling sound",
  "Bluetooth 5.3 + AUX + USB connectivity",
  "Up to 24 hours of playback on a single charge",
  "IPX7 water-resistant, party-ready build",
  "1 Year manufacturer warranty + AudioCare service"
];
const products = [
  { id: "jbl-charge-5", name: "JBL Charge 5", category: "bluetooth", categoryLabel: "Bluetooth Speaker", brand: "JBL", price: 12999, mrp: 16999, rating: 4.8, reviews: 1245, img: bluetooth, description: desc, highlights, inStock: true, badge: "Hot" },
  { id: "sony-srs-xb43", name: "Sony SRS-XB43", category: "bluetooth", categoryLabel: "Bluetooth Speaker", brand: "Sony", price: 18990, mrp: 22990, rating: 4.7, reviews: 502, img: bluetooth, description: desc, highlights, inStock: true },
  { id: "marshall-emberton", name: "Marshall Emberton II", category: "bluetooth", categoryLabel: "Portable Speaker", brand: "Marshall", price: 14999, mrp: 17999, rating: 4.6, reviews: 318, img: bluetooth, description: desc, highlights, inStock: true },
  { id: "boat-stone-1000", name: "boAt Stone 1000", category: "bluetooth", categoryLabel: "Portable Speaker", brand: "boAt", price: 2999, mrp: 4990, rating: 4.3, reviews: 2105, img: bluetooth, description: desc, highlights, inStock: true },
  { id: "jbl-partybox-710", name: "JBL PartyBox 710", category: "party", categoryLabel: "Party Speaker", brand: "JBL", price: 54999, mrp: 64999, rating: 4.9, reviews: 746, badge: "Best Seller", img: party, description: desc, highlights, inStock: true },
  { id: "sony-srs-xp700", name: "Sony SRS-XP700", category: "party", categoryLabel: "Party Speaker", brand: "Sony", price: 49990, mrp: 59990, rating: 4.7, reviews: 412, img: party, description: desc, highlights, inStock: true },
  { id: "zeb-monstro", name: "Zebronics Monstro", category: "party", categoryLabel: "Party Speaker", brand: "Zebronics", price: 19999, mrp: 24999, rating: 4.4, reviews: 256, img: party, description: desc, highlights, inStock: true },
  { id: "boat-aavante", name: "boAt Aavante Bar 1500", category: "soundbar", categoryLabel: "Soundbar", brand: "boAt", price: 9999, mrp: 14999, rating: 4.5, reviews: 645, img: soundbar, description: desc, highlights, inStock: true },
  { id: "jbl-bar-5-1", name: "JBL Bar 5.1", category: "soundbar", categoryLabel: "Soundbar", brand: "JBL", price: 44999, mrp: 54999, rating: 4.8, reviews: 389, img: soundbar, description: desc, highlights, inStock: true, badge: "Premium" },
  { id: "sony-ht-s40r", name: "Sony HT-S40R", category: "soundbar", categoryLabel: "Soundbar 5.1", brand: "Sony", price: 27990, mrp: 32990, rating: 4.6, reviews: 522, img: soundbar, description: desc, highlights, inStock: true },
  { id: "zebronics-51", name: "Zebronics 5.1 Home Theatre", category: "home-theatre", categoryLabel: "Home Theatre", brand: "Zebronics", price: 7499, mrp: 9999, rating: 4.4, reviews: 512, img: hometheatre, description: desc, highlights, inStock: true },
  { id: "bose-acoustimass", name: "Bose Acoustimass 5", category: "home-theatre", categoryLabel: "Home Theatre", brand: "Bose", price: 89999, mrp: 109999, rating: 4.9, reviews: 198, img: hometheatre, description: desc, highlights, inStock: false, badge: "Luxury" },
  { id: "philips-htb", name: "Philips HTB5580", category: "home-theatre", categoryLabel: "Home Theatre", brand: "Philips", price: 34999, mrp: 39999, rating: 4.3, reviews: 142, img: hometheatre, description: desc, highlights, inStock: true },
  { id: "aux-cable", name: "AUX Cable 3.5mm Premium Braided", category: "accessories", categoryLabel: "Accessory", brand: "boAt", price: 349, mrp: 599, rating: 4.3, reviews: 312, img: accessories, description: desc, highlights, inStock: true },
  { id: "speaker-stand", name: "Universal Speaker Stand (Pair)", category: "accessories", categoryLabel: "Accessory", brand: "Zebronics", price: 1899, mrp: 2499, rating: 4.2, reviews: 88, img: accessories, description: desc, highlights, inStock: true },
  { id: "hdmi-arc", name: "HDMI ARC Cable 2m", category: "accessories", categoryLabel: "Accessory", brand: "Philips", price: 499, mrp: 799, rating: 4.5, reviews: 421, img: accessories, description: desc, highlights, inStock: true }
];
const reviews = [
  { name: "Rohan Mehta", rating: 5, text: "Amazing service! My 10+ year old speaker is working like new again. Highly recommended!" },
  { name: "Priya Sharma", rating: 5, text: "Quick pickup & delivery. The team is super professional and genuine." },
  { name: "Arjun Nair", rating: 5, text: "Best audio shop with premium brands and top-notch service." },
  { name: "Sneha Iyer", rating: 5, text: "They fixed my soundbar the same day. Truly fast and trustworthy!" }
];
function mapSupabaseProduct(row) {
  return {
    id: row.id,
    name: row.name,
    category: row.category,
    categoryLabel: row.category_label ?? row.category,
    brand: row.brand,
    price: Number(row.price),
    mrp: row.mrp != null ? Number(row.mrp) : void 0,
    rating: Number(row.rating ?? 4.5),
    reviews: Number(row.reviews_count ?? 0),
    badge: row.badge ?? void 0,
    img: row.img_url ?? "",
    description: row.description ?? "",
    highlights: Array.isArray(row.highlights) ? row.highlights : [],
    inStock: row.in_stock ?? true,
    // Extra admin fields (typed as `any` on Product via cast)
    is_best_seller: row.is_best_seller ?? false,
    cost_price: row.cost_price != null ? Number(row.cost_price) : null
  };
}
const ProductsCacheContext = reactExports.createContext(null);
function ProductsCacheProvider({ children }) {
  const [products$1, setProducts] = reactExports.useState(products);
  const [loading, setLoading] = reactExports.useState(true);
  const [tick, setTick] = reactExports.useState(0);
  reactExports.useEffect(() => {
    setLoading(true);
    supabase.from("products").select("*").order("created_at", { ascending: true }).then(({ data, error }) => {
      if (!error && data && data.length > 0) {
        setProducts(
          data.map(
            (row) => mapSupabaseProduct(row)
          )
        );
      }
      setLoading(false);
    });
  }, [tick]);
  const getById = (id) => products$1.find((p) => p.id === id);
  const refresh = () => setTick((t) => t + 1);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ProductsCacheContext.Provider, { value: { products: products$1, getById, loading, refresh }, children });
}
const useProductsCache = () => {
  const c = reactExports.useContext(ProductsCacheContext);
  if (!c)
    throw new Error("useProductsCache must be inside ProductsCacheProvider");
  return c;
};
function NotFoundComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-8xl font-bold text-primary", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 text-xl font-semibold", children: "Page not found" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "The page you're looking for doesn't exist or has been moved." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition-all hover:opacity-90", children: "Go home" }) })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router2 = useRouter();
  reactExports.useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-semibold tracking-tight", children: "This page didn't load" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Something went wrong. Try refreshing or head back home." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap justify-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
            reset();
          },
          className: "inline-flex items-center justify-center rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground transition-all hover:opacity-90",
          children: "Try again"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/", className: "inline-flex items-center justify-center rounded-xl border border-border px-5 py-2.5 text-sm font-bold hover:bg-accent transition-all", children: "Go home" })
    ] })
  ] }) });
}
const Route$o = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "AudioCare — Premium Speakers & Expert Repair" },
      { name: "description", content: "AudioCare — Buy premium speakers, soundbars & home theatre systems, and book expert repair service in Bengaluru." },
      { property: "og:type", content: "website" },
      { property: "og:title", content: "AudioCare — Feel Every Beat" },
      { property: "og:description", content: "Premium audio gear and expert repair service in Bengaluru." },
      { name: "twitter:card", content: "summary_large_image" }
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Black+Ops+One&family=Manrope:wght@300;400;500;600;700;800&family=Sora:wght@400;500;600;700;800&display=swap"
      }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return (
    // No forced dark class — ThemeProvider handles this at runtime
    /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "en", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("head", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("script", { dangerouslySetInnerHTML: {
          __html: `
            (function() {
              try {
                var t = localStorage.getItem('theme');
                if (t === 'dark' || (!t && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                }
              } catch(e) {}
            })();
          `
        } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {})
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { className: "antialiased bg-background text-foreground", children: [
        children,
        /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
      ] })
    ] })
  );
}
function RootComponent() {
  const { queryClient } = Route$o.useRouteContext();
  const location = useRouter().state.location;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(AuthProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(ProductsCacheProvider, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "animate-fade-up", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) }, location.pathname),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Toaster, { position: "bottom-right", richColors: true })
  ] }) }) }) });
}
const $$splitComponentImporter$n = () => import("./wishlist-w_u3z00n.mjs");
const Route$n = createFileRoute("/wishlist")({
  head: () => ({
    meta: [{
      title: "Wishlist — AudioCare"
    }, {
      name: "description",
      content: "Products you saved for later."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$n, "component")
});
const $$splitComponentImporter$m = () => import("./sound-experience-BIs_1f15.mjs");
const Route$m = createFileRoute("/sound-experience")({
  head: () => ({
    meta: [{
      title: "Sound Experience — AudioCare"
    }, {
      name: "description",
      content: "Tap to experience premium sound modes — bass, party, movie and clear voice."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$m, "component")
});
const $$splitComponentImporter$l = () => import("./reviews-BqDe2kSA.mjs");
const Route$l = createFileRoute("/reviews")({
  head: () => ({
    meta: [{
      title: "Reviews — AudioCare"
    }, {
      name: "description",
      content: "Verified customer reviews and ratings for AudioCare."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$l, "component")
});
const $$splitComponentImporter$k = () => import("./repair-service-CI86s5Ah.mjs");
const Route$k = createFileRoute("/repair-service")({
  head: () => ({
    meta: [{
      title: "Book a Speaker Repair — AudioCare"
    }, {
      name: "description",
      content: "Expert speaker, amplifier and soundbar repair. Free pickup & delivery in Bengaluru. Book online in 60 seconds."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$k, "component")
});
const $$splitComponentImporter$j = () => import("./our-work-DqbOcDVm.mjs");
const Route$j = createFileRoute("/our-work")({
  head: () => ({
    meta: [{
      title: "Our Work — AudioCare"
    }, {
      name: "description",
      content: "Real repairs. Real results. Browse our restoration portfolio."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$j, "component")
});
const $$splitComponentImporter$i = () => import("./order-success-C-kTOL2r.mjs");
const Route$i = createFileRoute("/order-success")({
  head: () => ({
    meta: [{
      title: "Order Confirmed — AudioCare"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$i, "component")
});
const $$splitComponentImporter$h = () => import("./contact-BOdmi_Vk.mjs");
const Route$h = createFileRoute("/contact")({
  head: () => ({
    meta: [{
      title: "Contact AudioCare — Speaker Repair & Sales"
    }, {
      name: "description",
      content: "Get in touch with AudioCare in Bengaluru — call, WhatsApp, email or visit our store in Koramangala."
    }, {
      property: "og:title",
      content: "Contact AudioCare — Speaker Repair & Sales"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$h, "component")
});
const $$splitComponentImporter$g = () => import("./checkout-DheOPiwO.mjs");
const Route$g = createFileRoute("/checkout")({
  head: () => ({
    meta: [{
      title: "Checkout — AudioCare"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$g, "component")
});
const $$splitComponentImporter$f = () => import("./cart-CYmjSsBn.mjs");
const Route$f = createFileRoute("/cart")({
  head: () => ({
    meta: [{
      title: "Cart — AudioCare"
    }, {
      name: "description",
      content: "Review your cart and checkout."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$f, "component")
});
const $$splitComponentImporter$e = () => import("./blog-BFsOu0JM.mjs");
const Route$e = createFileRoute("/blog")({
  component: lazyRouteComponent($$splitComponentImporter$e, "component")
});
const $$splitComponentImporter$d = () => import("./auth-DXV8XAC-.mjs");
const Route$d = createFileRoute("/auth")({
  head: () => ({
    meta: [{
      title: "Login — AudioCare"
    }, {
      name: "description",
      content: "Sign in or create your AudioCare account."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$d, "component")
});
const $$splitComponentImporter$c = () => import("./admin-CsCCVkRh.mjs");
const Route$c = createFileRoute("/admin")({
  head: () => ({
    meta: [{
      title: "Admin Portal — AudioCare"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$c, "component")
});
const $$splitComponentImporter$b = () => import("./account-B-EzYCY0.mjs");
const Route$b = createFileRoute("/account")({
  head: () => ({
    meta: [{
      title: "My Account — AudioCare"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$b, "component")
});
const $$splitComponentImporter$a = () => import("./about-C_J1XRRQ.mjs");
const Route$a = createFileRoute("/about")({
  component: lazyRouteComponent($$splitComponentImporter$a, "component")
});
const $$splitComponentImporter$9 = () => import("./index-BsO428lg.mjs");
const Route$9 = createFileRoute("/")({
  head: () => ({
    meta: [{
      title: "AudioCare — Home Theater, Sound Systems & Expert Audio Repair"
    }, {
      name: "description",
      content: "AudioCare offers home theater installation, professional sound systems, theater & auditorium audio, and expert repair for all audio equipment. Free doorstep pickup."
    }, {
      property: "og:title",
      content: "AudioCare — Everything Audio, Under One Roof"
    }, {
      property: "og:description",
      content: "Home Theater • Sound Systems • Theater Audio • Speaker & Amplifier Repair — all at AudioCare."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
const $$splitComponentImporter$8 = () => import("./shop.index-Ntymv8ZK.mjs");
const Route$8 = createFileRoute("/shop/")({
  validateSearch: (s) => ({
    q: typeof s.q === "string" ? s.q : void 0
  }),
  head: () => ({
    meta: [{
      title: "Shop Premium Speakers & Audio — AudioCare"
    }, {
      name: "description",
      content: "Shop premium Bluetooth speakers, soundbars, party speakers, home theatre & accessories from JBL, Sony, Bose, boAt and more."
    }, {
      property: "og:title",
      content: "Shop Premium Speakers & Audio — AudioCare"
    }, {
      property: "og:description",
      content: "Browse our complete catalog of premium speakers and audio products."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
const $$splitComponentImporter$7 = () => import("./blog.index-BvJu7mWd.mjs");
const Route$7 = createFileRoute("/blog/")({
  head: () => ({
    meta: [{
      title: "Blog — AudioCare"
    }, {
      name: "description",
      content: "Tips, guides, and news about audio equipment, speakers, home theater, and repair from AudioCare experts."
    }]
  }),
  loader: async () => {
    const {
      data
    } = await supabase.from("blogs").select("id, title, slug, excerpt, featured_image, tags, created_at").eq("published", true).order("created_at", {
      ascending: false
    });
    return {
      posts: data ?? []
    };
  },
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("./about.index-CkCYpxhc.mjs");
const Route$6 = createFileRoute("/about/")({
  head: () => ({
    meta: [{
      title: "About AudioCare | 18+ Years of Audio Excellence in Bengaluru"
    }, {
      name: "description",
      content: "AudioCare has been Bengaluru's most trusted audio solutions provider since 2007. Home & commercial audio sales, installation, repair & AMC."
    }, {
      property: "og:title",
      content: "About AudioCare | 18+ Years of Audio Excellence"
    }, {
      name: "keywords",
      content: "AudioCare Bengaluru, home theater installation, audio repair, JBL dealer Bangalore"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./shop._productId-ImDmKdaQ.mjs");
const $$splitErrorComponentImporter$1 = () => import("./shop._productId-Cq3sSONB.mjs");
const $$splitNotFoundComponentImporter$2 = () => import("./shop._productId-50tu8Qep.mjs");
const Route$5 = createFileRoute("/shop/$productId")({
  head: ({
    loaderData
  }) => {
    const p = loaderData?.product;
    return {
      meta: [{
        title: `${p?.name ?? "Product"} — AudioCare`
      }, {
        name: "description",
        content: p?.description ?? "Explore premium audio products at AudioCare."
      }, {
        property: "og:title",
        content: `${p?.name ?? "Product"} — AudioCare`
      }, {
        property: "og:description",
        content: p?.description ?? ""
      }, ...p?.img ? [{
        property: "og:image",
        content: p.img
      }] : []]
    };
  },
  loader: async ({
    params
  }) => {
    const {
      data,
      error
    } = await supabase.from("products").select("*").eq("id", params.productId).single();
    if (!error && data) {
      return {
        product: mapSupabaseProduct(data)
      };
    }
    const fallback = products.find((p) => p.id === params.productId);
    if (!fallback) throw notFound();
    return {
      product: fallback
    };
  },
  notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter$2, "notFoundComponent"),
  errorComponent: lazyRouteComponent($$splitErrorComponentImporter$1, "errorComponent"),
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./blog._slug-B155i9Vp.mjs");
const $$splitNotFoundComponentImporter$1 = () => import("./blog._slug-f2PpIwZH.mjs");
const Route$4 = createFileRoute("/blog/$slug")({
  head: ({
    loaderData
  }) => {
    const p = loaderData?.post;
    return {
      meta: [{
        title: `${p?.title ?? "Blog"} — AudioCare`
      }, {
        name: "description",
        content: p?.excerpt ?? "Read the latest audio tips and guides from AudioCare."
      }, {
        property: "og:title",
        content: `${p?.title ?? "Blog"} — AudioCare`
      }, ...p?.featured_image ? [{
        property: "og:image",
        content: p.featured_image
      }] : []]
    };
  },
  loader: async ({
    params
  }) => {
    const {
      data,
      error
    } = await supabase.from("blogs").select("*").eq("slug", params.slug).eq("published", true).single();
    if (error || !data) throw notFound();
    return {
      post: data
    };
  },
  notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter$1, "notFoundComponent"),
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./about.services-4gHsAleb.mjs");
const Route$3 = createFileRoute("/about/services")({
  head: () => ({
    meta: [{
      title: "Our Services | AudioCare Bengaluru"
    }, {
      name: "description",
      content: "AudioCare offers Home Audio, Commercial Audio, Audio Installation, Speaker & Amplifier Repair, and Annual Maintenance Contracts (AMC) in Bengaluru."
    }, {
      name: "keywords",
      content: "home theater installation Bengaluru, audio repair, commercial audio, AMC, speaker service"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./about.clients-zeBiys94.mjs");
const Route$2 = createFileRoute("/about/clients")({
  head: () => ({
    meta: [{
      title: "Major Clients | AudioCare — Wonderla, Bangalore Club & More"
    }, {
      name: "description",
      content: "AudioCare proudly serves Wonderla Bangalore, Bangalore Club and PROFX with commercial audio AMC and pan-India service. 18+ years of trusted client relationships."
    }, {
      name: "keywords",
      content: "Wonderla audio AMC, Bangalore Club audio, PROFX service vendor, commercial audio Bengaluru"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./about.brands-qkJl7nlw.mjs");
const Route$1 = createFileRoute("/about/brands")({
  head: () => ({
    meta: [{
      title: "Brand Partners | AudioCare — JBL, Infinity & Harman Kardon"
    }, {
      name: "description",
      content: "AudioCare is an authorized partner for JBL, Infinity, and Harman Kardon (via Sahil International) in Bengaluru. Genuine products, expert advice."
    }, {
      name: "keywords",
      content: "JBL dealer Bengaluru, Infinity speakers, Harman Kardon Bangalore, authorized audio dealer"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./shop.category._slug-C5f9ZEpF.mjs");
const $$splitErrorComponentImporter = () => import("./shop.category._slug-01tOwLv0.mjs");
const $$splitNotFoundComponentImporter = () => import("./shop.category._slug-DCk9g6mL.mjs");
const Route = createFileRoute("/shop/category/$slug")({
  head: ({
    params
  }) => {
    const c = categories.find((x) => x.slug === params.slug);
    return {
      meta: [{
        title: `${c?.name ?? "Category"} — AudioCare`
      }, {
        name: "description",
        content: `Shop premium ${c?.name ?? "audio"} at AudioCare with the best brands and prices.`
      }, {
        property: "og:title",
        content: `${c?.name ?? "Category"} — AudioCare`
      }, {
        property: "og:description",
        content: `Shop premium ${c?.name ?? "audio products"} at AudioCare.`
      }]
    };
  },
  loader: ({
    params
  }) => {
    const category = categories.find((c) => c.slug === params.slug);
    if (!category) throw notFound();
    return {
      category
    };
  },
  notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent"),
  errorComponent: lazyRouteComponent($$splitErrorComponentImporter, "errorComponent"),
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const WishlistRoute = Route$n.update({
  id: "/wishlist",
  path: "/wishlist",
  getParentRoute: () => Route$o
});
const SoundExperienceRoute = Route$m.update({
  id: "/sound-experience",
  path: "/sound-experience",
  getParentRoute: () => Route$o
});
const ReviewsRoute = Route$l.update({
  id: "/reviews",
  path: "/reviews",
  getParentRoute: () => Route$o
});
const RepairServiceRoute = Route$k.update({
  id: "/repair-service",
  path: "/repair-service",
  getParentRoute: () => Route$o
});
const OurWorkRoute = Route$j.update({
  id: "/our-work",
  path: "/our-work",
  getParentRoute: () => Route$o
});
const OrderSuccessRoute = Route$i.update({
  id: "/order-success",
  path: "/order-success",
  getParentRoute: () => Route$o
});
const ContactRoute = Route$h.update({
  id: "/contact",
  path: "/contact",
  getParentRoute: () => Route$o
});
const CheckoutRoute = Route$g.update({
  id: "/checkout",
  path: "/checkout",
  getParentRoute: () => Route$o
});
const CartRoute = Route$f.update({
  id: "/cart",
  path: "/cart",
  getParentRoute: () => Route$o
});
const BlogRoute = Route$e.update({
  id: "/blog",
  path: "/blog",
  getParentRoute: () => Route$o
});
const AuthRoute = Route$d.update({
  id: "/auth",
  path: "/auth",
  getParentRoute: () => Route$o
});
const AdminRoute = Route$c.update({
  id: "/admin",
  path: "/admin",
  getParentRoute: () => Route$o
});
const AccountRoute = Route$b.update({
  id: "/account",
  path: "/account",
  getParentRoute: () => Route$o
});
const AboutRoute = Route$a.update({
  id: "/about",
  path: "/about",
  getParentRoute: () => Route$o
});
const IndexRoute = Route$9.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$o
});
const ShopIndexRoute = Route$8.update({
  id: "/shop/",
  path: "/shop/",
  getParentRoute: () => Route$o
});
const BlogIndexRoute = Route$7.update({
  id: "/",
  path: "/",
  getParentRoute: () => BlogRoute
});
const AboutIndexRoute = Route$6.update({
  id: "/",
  path: "/",
  getParentRoute: () => AboutRoute
});
const ShopProductIdRoute = Route$5.update({
  id: "/shop/$productId",
  path: "/shop/$productId",
  getParentRoute: () => Route$o
});
const BlogSlugRoute = Route$4.update({
  id: "/$slug",
  path: "/$slug",
  getParentRoute: () => BlogRoute
});
const AboutServicesRoute = Route$3.update({
  id: "/services",
  path: "/services",
  getParentRoute: () => AboutRoute
});
const AboutClientsRoute = Route$2.update({
  id: "/clients",
  path: "/clients",
  getParentRoute: () => AboutRoute
});
const AboutBrandsRoute = Route$1.update({
  id: "/brands",
  path: "/brands",
  getParentRoute: () => AboutRoute
});
const ShopCategorySlugRoute = Route.update({
  id: "/shop/category/$slug",
  path: "/shop/category/$slug",
  getParentRoute: () => Route$o
});
const AboutRouteChildren = {
  AboutBrandsRoute,
  AboutClientsRoute,
  AboutServicesRoute,
  AboutIndexRoute
};
const AboutRouteWithChildren = AboutRoute._addFileChildren(AboutRouteChildren);
const BlogRouteChildren = {
  BlogSlugRoute,
  BlogIndexRoute
};
const BlogRouteWithChildren = BlogRoute._addFileChildren(BlogRouteChildren);
const rootRouteChildren = {
  IndexRoute,
  AboutRoute: AboutRouteWithChildren,
  AccountRoute,
  AdminRoute,
  AuthRoute,
  BlogRoute: BlogRouteWithChildren,
  CartRoute,
  CheckoutRoute,
  ContactRoute,
  OrderSuccessRoute,
  OurWorkRoute,
  RepairServiceRoute,
  ReviewsRoute,
  SoundExperienceRoute,
  WishlistRoute,
  ShopProductIdRoute,
  ShopIndexRoute,
  ShopCategorySlugRoute
};
const routeTree = Route$o._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  Route$8 as R,
  useProductsCache as a,
  Route$7 as b,
  categories as c,
  Route$5 as d,
  Route$4 as e,
  useTheme as f,
  brands as g,
  Route as h,
  supabase$1 as i,
  router as j,
  reviews as r,
  supabase as s,
  useAuth as u
};
