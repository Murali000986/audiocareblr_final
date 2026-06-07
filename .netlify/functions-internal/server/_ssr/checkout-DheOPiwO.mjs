import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { N as Navbar, F as Footer } from "./Footer-n3lcnv-q.mjs";
import { u as useCart } from "./CartContext-ByUfK2u5.mjs";
import { u as useAuth, s as supabase } from "./router-DS6h6cMK.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { f as MapPin, g as CreditCard, h as CircleCheckBig, i as ChevronRight, A as ArrowLeft, T as Truck, S as ShieldCheck } from "../_libs/lucide-react.mjs";
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
const STEPS = [{
  id: "address",
  label: "Address",
  icon: MapPin
}, {
  id: "payment",
  label: "Payment",
  icon: CreditCard
}, {
  id: "confirm",
  label: "Confirm",
  icon: CircleCheckBig
}];
function CheckoutPage() {
  const {
    detailed,
    subtotal,
    clear
  } = useCart();
  const {
    user
  } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = reactExports.useState("address");
  const [placing, setPlacing] = reactExports.useState(false);
  const [addr, setAddr] = reactExports.useState({
    name: user?.user_metadata?.full_name ?? "",
    phone: "",
    line1: "",
    city: "",
    state: "",
    pincode: ""
  });
  const [payMode, setPayMode] = reactExports.useState("cod");
  const shipping = subtotal > 999 || subtotal === 0 ? 0 : 99;
  const total = subtotal + shipping;
  if (detailed.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "max-w-7xl mx-auto px-4 py-20 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold mb-4", children: "Your cart is empty" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/shop", className: "inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-bold hover:shadow-glow transition-all", children: "Shop Now" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
    ] });
  }
  const stepIdx = STEPS.findIndex((s) => s.id === step);
  const placeOrder = async () => {
    setPlacing(true);
    const orderData = {
      user_id: user?.id ?? null,
      status: "confirmed",
      items: detailed.map((d) => ({
        id: d.product.id,
        name: d.product.name,
        qty: d.qty,
        price: d.product.price
      })),
      subtotal,
      shipping,
      total,
      address: addr
    };
    const {
      error
    } = await supabase.from("orders").insert(orderData);
    setPlacing(false);
    if (error) {
      toast.error("Failed to place order. Please try again.");
      return;
    }
    clear();
    navigate({
      to: "/order-success"
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "max-w-6xl mx-auto px-4 sm:px-6 py-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold mb-8", children: "Checkout" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 mb-8 overflow-x-auto", children: STEPS.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 shrink-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => i < stepIdx && setStep(s.id), disabled: i > stepIdx, className: `flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${s.id === step ? "bg-primary text-primary-foreground" : i < stepIdx ? "bg-primary/20 text-primary cursor-pointer hover:bg-primary/30" : "bg-section text-muted-foreground cursor-not-allowed"}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(s.icon, { className: "w-3.5 h-3.5" }),
          " ",
          s.label
        ] }),
        i < STEPS.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4 text-muted-foreground shrink-0" })
      ] }, s.id)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-[1fr_360px] gap-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-border bg-card rounded-2xl p-6 shadow-soft", children: [
          step === "address" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-xl mb-5", children: "Delivery Address" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 gap-4", children: [{
              key: "name",
              label: "Full Name",
              placeholder: "John Doe"
            }, {
              key: "phone",
              label: "Phone Number",
              placeholder: "+91 98765 43210"
            }, {
              key: "line1",
              label: "Address Line 1",
              placeholder: "Flat/Street",
              colSpan: true
            }, {
              key: "city",
              label: "City",
              placeholder: "Bengaluru"
            }, {
              key: "state",
              label: "State",
              placeholder: "Karnataka"
            }, {
              key: "pincode",
              label: "Pincode",
              placeholder: "560001"
            }].map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: f.colSpan ? "sm:col-span-2" : "", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-semibold text-muted-foreground mb-1.5", children: f.label }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: addr[f.key], onChange: (e) => setAddr((a) => ({
                ...a,
                [f.key]: e.target.value
              })), placeholder: f.placeholder, className: "w-full px-3 py-2.5 rounded-xl border border-border bg-section text-sm focus:outline-none focus:ring-2 focus:ring-primary" })
            ] }, f.key)) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => {
              if (!addr.name || !addr.phone || !addr.line1 || !addr.city || !addr.pincode) {
                toast.error("Please fill all required fields");
                return;
              }
              setStep("payment");
            }, className: "mt-6 w-full sm:w-auto inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-primary text-primary-foreground font-bold text-sm hover:shadow-glow transition-all btn-press", children: [
              "Continue to Payment ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4" })
            ] })
          ] }),
          step === "payment" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-xl mb-5", children: "Payment Method" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: [{
              id: "cod",
              label: "Cash on Delivery",
              sub: "Pay when delivered"
            }, {
              id: "upi",
              label: "UPI",
              sub: "GPay, PhonePe, Paytm"
            }, {
              id: "card",
              label: "Card",
              sub: "Credit / Debit card"
            }].map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: `flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${payMode === p.id ? "border-primary bg-accent/20" : "border-border hover:border-primary/40"}`, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "radio", value: p.id, checked: payMode === p.id, onChange: () => setPayMode(p.id), className: "sr-only" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${payMode === p.id ? "border-primary" : "border-muted-foreground"}`, children: payMode === p.id && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2 h-2 rounded-full bg-primary" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm", children: p.label }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: p.sub })
              ] })
            ] }, p.id)) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setStep("address"), className: "inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-border text-sm font-semibold hover:bg-section transition-all", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
                " Back"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setStep("confirm"), className: "flex-1 inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-primary text-primary-foreground font-bold text-sm hover:shadow-glow transition-all btn-press", children: [
                "Review Order ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4" })
              ] })
            ] })
          ] }),
          step === "confirm" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-xl mb-5", children: "Review & Place Order" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border p-4 mb-4 text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-semibold mb-1 flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-4 h-4 text-primary" }),
                " Delivery to"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground", children: [
                addr.name,
                " · ",
                addr.phone
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground", children: [
                addr.line1,
                ", ",
                addr.city,
                ", ",
                addr.state,
                " — ",
                addr.pincode
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2 mb-4", children: detailed.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-lg bg-section flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: d.product.img, alt: d.product.name, className: "max-h-full object-contain" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold truncate", children: d.product.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                  "Qty: ",
                  d.qty
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-bold shrink-0", children: [
                "₹",
                (Number(d.lineTotal) || 0).toLocaleString("en-IN")
              ] })
            ] }, d.product.id)) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setStep("payment"), className: "inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-border text-sm font-semibold hover:bg-section transition-all", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
                " Back"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: placeOrder, disabled: placing, className: "flex-1 inline-flex items-center justify-center gap-2 py-3.5 rounded-xl bg-primary text-primary-foreground font-bold text-sm hover:shadow-glow transition-all disabled:opacity-60 btn-press", children: [
                placing ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-4 h-4" }),
                placing ? "Placing Order…" : "Place Order"
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "border border-border bg-card rounded-2xl p-5 h-fit sticky top-24 shadow-soft", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-base mb-4", children: "Order Summary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3 mb-4", children: detailed.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-lg bg-section flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: d.product.img, alt: d.product.name, className: "max-h-full object-contain" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "flex-1 text-xs font-medium line-clamp-1", children: [
              d.product.name,
              " ×",
              d.qty
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-bold text-xs shrink-0", children: [
              "₹",
              (Number(d.lineTotal) || 0).toLocaleString("en-IN")
            ] })
          ] }, d.product.id)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-border pt-3 space-y-1.5 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Subtotal" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                "₹",
                (Number(subtotal) || 0).toLocaleString("en-IN")
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Shipping" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: shipping === 0 ? "FREE" : `₹${shipping}` })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between font-display font-bold text-base pt-2 border-t border-border", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Total" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                "₹",
                (Number(total) || 0).toLocaleString("en-IN")
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 space-y-2", children: [{
            icon: Truck,
            t: "Free delivery above ₹999"
          }, {
            icon: ShieldCheck,
            t: "Secure & encrypted checkout"
          }].map((b) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(b.icon, { className: "w-3.5 h-3.5 text-primary shrink-0" }),
            " ",
            b.t
          ] }, b.t)) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
export {
  CheckoutPage as component
};
