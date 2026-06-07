import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { N as Navbar, F as Footer } from "./Footer-n3lcnv-q.mjs";
import { u as useAuth, s as supabase } from "./router-DS6h6cMK.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { U as User, i as ChevronRight, P as Package, W as Wrench, H as Heart, a as CircleCheck } from "../_libs/lucide-react.mjs";
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
function AccountPage() {
  const {
    user,
    signOut
  } = useAuth();
  const [tab, setTab] = reactExports.useState("orders");
  const [orders, setOrders] = reactExports.useState([]);
  const [repairs, setRepairs] = reactExports.useState([]);
  const [profileName, setProfileName] = reactExports.useState(user?.user_metadata?.full_name ?? "");
  const [profilePhone, setProfilePhone] = reactExports.useState("");
  const [saving, setSaving] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (!user) return;
    supabase.from("orders").select("*").eq("user_id", user.id).order("created_at", {
      ascending: false
    }).then(({
      data
    }) => setOrders(data ?? []));
    supabase.from("repair_bookings").select("*").eq("user_id", user.id).order("created_at", {
      ascending: false
    }).then(({
      data
    }) => setRepairs(data ?? []));
    supabase.from("profiles").select("*").eq("id", user.id).single().then(({
      data
    }) => {
      if (data) {
        setProfileName(data.full_name ?? "");
        setProfilePhone(data.phone ?? "");
      }
    });
  }, [user]);
  if (!user) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background flex flex-col", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1 flex items-center justify-center px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center max-w-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-section flex items-center justify-center mx-auto mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-8 h-8 text-muted-foreground" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold mb-2", children: "Sign in to continue" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-6", children: "Access your orders, repairs, and wishlist." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/auth", className: "inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-bold hover:shadow-glow transition-all", children: [
          "Login / Sign Up ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4" })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
    ] });
  }
  const saveProfile = async () => {
    setSaving(true);
    const {
      error
    } = await supabase.from("profiles").upsert({
      id: user.id,
      full_name: profileName,
      phone: profilePhone
    });
    setSaving(false);
    if (error) toast.error("Failed to save profile");
    else toast.success("Profile updated!");
  };
  const tabs = [{
    id: "orders",
    icon: Package,
    label: "My Orders"
  }, {
    id: "repairs",
    icon: Wrench,
    label: "Repairs"
  }, {
    id: "wishlist",
    icon: Heart,
    label: "Wishlist"
  }, {
    id: "profile",
    icon: User,
    label: "Profile"
  }];
  const statusColor = (s) => {
    if (s === "delivered" || s === "done") return "text-green-400";
    if (s === "shipped" || s === "in-repair") return "text-blue-400";
    return "text-yellow-400";
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "max-w-7xl mx-auto px-4 sm:px-6 py-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-display font-bold text-xl", children: (user.user_metadata?.full_name ?? user.email ?? "U")[0].toUpperCase() }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold", children: user.user_metadata?.full_name ?? "My Account" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: user.email })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-[220px_1fr] gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible", children: [
          tabs.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setTab(t.id), className: `flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${tab === t.id ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-section hover:text-foreground"}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(t.icon, { className: "w-4 h-4" }),
            " ",
            t.label
          ] }, t.id)),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
            signOut();
          }, className: "flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-semibold text-destructive hover:bg-destructive/10 transition-all mt-auto", children: "Sign Out" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          tab === "orders" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-xl mb-4", children: "My Orders" }),
            orders.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-16 border border-dashed border-border rounded-2xl", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-10 h-10 text-muted-foreground/30 mx-auto mb-3" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "No orders yet" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/shop", className: "mt-3 inline-block text-primary font-semibold text-sm", children: "Start Shopping →" })
            ] }) : orders.map((o) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-border bg-card rounded-2xl p-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-semibold text-sm", children: [
                    "Order #",
                    o.id.slice(0, 8).toUpperCase()
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: new Date(o.created_at).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric"
                  }) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-xs font-bold uppercase ${statusColor(o.status)}`, children: o.status })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
                  Array.isArray(o.items) ? o.items.length : 0,
                  " item(s)"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display font-bold", children: [
                  "₹",
                  o.total?.toLocaleString("en-IN")
                ] })
              ] })
            ] }, o.id))
          ] }),
          tab === "repairs" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-xl mb-4", children: "Repair Bookings" }),
            repairs.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-16 border border-dashed border-border rounded-2xl", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Wrench, { className: "w-10 h-10 text-muted-foreground/30 mx-auto mb-3" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "No repair bookings yet" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/repair-service", className: "mt-3 inline-block text-primary font-semibold text-sm", children: "Book a Repair →" })
            ] }) : repairs.map((r) => {
              const steps = ["Booked", "Picked Up", "In Repair", "Done"];
              const stepIdx = r.status === "done" ? 3 : r.status === "in-repair" ? 2 : r.status === "picked-up" ? 1 : 0;
              return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-border bg-card rounded-2xl p-5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-semibold text-sm", children: [
                      r.device,
                      " — ",
                      r.brand
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                      "Ref: #",
                      r.booking_ref
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-xs font-bold uppercase ${statusColor(r.status)}`, children: r.status })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1 mt-3", children: steps.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 flex-1 min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-[9px] font-bold ${i <= stepIdx ? "bg-primary text-primary-foreground" : "bg-section text-muted-foreground"}`, children: i <= stepIdx ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3.5 h-3.5" }) : i + 1 }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] text-muted-foreground truncate hidden sm:block", children: s }),
                  i < steps.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `flex-1 h-0.5 ${i < stepIdx ? "bg-primary" : "bg-border"}` })
                ] }, s)) })
              ] }, r.id);
            })
          ] }),
          tab === "wishlist" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-xl mb-4", children: "My Wishlist" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-16 border border-dashed border-border rounded-2xl", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "w-10 h-10 text-muted-foreground/30 mx-auto mb-3" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Browse products and add to wishlist" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/shop", className: "mt-3 inline-block text-primary font-semibold text-sm", children: "Browse Shop →" })
            ] })
          ] }),
          tab === "profile" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-xl mb-6", children: "Profile" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-semibold text-muted-foreground mb-1.5", children: "Full Name" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: profileName, onChange: (e) => setProfileName(e.target.value), className: "w-full px-4 py-3 rounded-xl border border-border bg-section text-sm focus:outline-none focus:ring-2 focus:ring-primary" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-semibold text-muted-foreground mb-1.5", children: "Email" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "email", value: user.email ?? "", disabled: true, className: "w-full px-4 py-3 rounded-xl border border-border bg-section text-sm opacity-50 cursor-not-allowed" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-semibold text-muted-foreground mb-1.5", children: "Phone" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "tel", value: profilePhone, onChange: (e) => setProfilePhone(e.target.value), placeholder: "+91 98765 43210", className: "w-full px-4 py-3 rounded-xl border border-border bg-section text-sm focus:outline-none focus:ring-2 focus:ring-primary" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: saveProfile, disabled: saving, className: "w-full py-3 rounded-xl bg-primary text-primary-foreground font-bold text-sm hover:shadow-glow transition-all disabled:opacity-60 btn-press", children: saving ? "Saving…" : "Save Changes" })
            ] })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
export {
  AccountPage as component
};
