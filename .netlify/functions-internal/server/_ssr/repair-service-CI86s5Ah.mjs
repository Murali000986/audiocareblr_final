import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { N as Navbar, F as Footer } from "./Footer-n3lcnv-q.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { u as useAuth, s as supabase } from "./router-DS6h6cMK.mjs";
import { A as AnimatedSection } from "./AnimatedSection-CxAJpKfW.mjs";
import { W as Wrench, T as Truck, S as ShieldCheck, C as Clock, a as CircleCheck, M as MessageCircle } from "../_libs/lucide-react.mjs";
import { o as objectType, s as stringType, e as enumType } from "../_libs/zod.mjs";
import "../_libs/tanstack__react-router.mjs";
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
const schema = objectType({
  name: stringType().trim().min(2).max(80),
  phone: stringType().trim().regex(/^\+?[0-9 -]{10,15}$/, "Enter a valid phone"),
  email: stringType().trim().email("Enter a valid email"),
  device: stringType().trim().min(2).max(80),
  brand: stringType().trim().min(1).max(40),
  issue: stringType().trim().min(10, "Describe the issue (min 10 chars)").max(500),
  pickup: enumType(["pickup", "drop"]),
  date: stringType().min(1, "Pick a date")
});
function RepairPage() {
  const {
    user
  } = useAuth();
  const emptyForm = {
    name: user?.user_metadata?.full_name ?? "",
    phone: "",
    email: user?.email ?? "",
    device: "",
    brand: "",
    issue: "",
    pickup: "pickup",
    date: ""
  };
  const [form, setForm] = reactExports.useState(emptyForm);
  const [errors, setErrors] = reactExports.useState({});
  const [done, setDone] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(false);
  const update = (k, v) => setForm((f) => ({
    ...f,
    [k]: v
  }));
  const submit = async (e) => {
    e.preventDefault();
    const r = schema.safeParse(form);
    if (!r.success) {
      const errs = {};
      r.error.issues.forEach((i) => {
        if (i.path[0]) errs[i.path[0]] = i.message;
      });
      setErrors(errs);
      toast.error("Please fix the errors above");
      return;
    }
    setErrors({});
    setLoading(true);
    const bookingRef = "RP" + Date.now().toString().slice(-7);
    const {
      error
    } = await supabase.from("repair_bookings").insert({
      user_id: user?.id ?? null,
      name: form.name,
      phone: form.phone,
      email: form.email,
      device: form.device,
      brand: form.brand,
      issue: form.issue,
      pickup_mode: form.pickup,
      preferred_date: form.date,
      status: "booked",
      booking_ref: bookingRef
    });
    setLoading(false);
    if (error) {
      toast.error("Failed to submit. Please try again.");
      return;
    }
    toast.success("Repair request submitted!");
    setDone(bookingRef);
    setForm(emptyForm);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative overflow-hidden py-16 sm:py-20", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 pointer-events-none", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/10 rounded-full blur-[100px]" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative max-w-7xl mx-auto px-4 sm:px-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AnimatedSection, { direction: "up", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-xs font-bold text-primary mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Wrench, { className: "w-3.5 h-3.5" }),
              " Expert Repair Service"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-4xl lg:text-6xl font-black leading-tight", children: [
              "Book a ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient-orange", children: "Repair" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-3 max-w-xl text-lg", children: "Expert technicians · Genuine parts · Free pickup & delivery across Bengaluru." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 grid sm:grid-cols-3 gap-4 max-w-2xl", children: [{
            icon: Truck,
            t: "Free Pickup",
            s: "Doorstep service"
          }, {
            icon: ShieldCheck,
            t: "3-Month Warranty",
            s: "On all repairs"
          }, {
            icon: Clock,
            t: "48-Hr Turnaround",
            s: "Fast & reliable"
          }].map((b, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedSection, { direction: "up", delay: i * 100, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 p-4 rounded-xl glass border border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-lg bg-primary/15 text-primary flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(b.icon, { className: "w-5 h-5" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-bold text-sm", children: b.t }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: b.s })
            ] })
          ] }) }, b.t)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "max-w-2xl mx-auto px-4 sm:px-6 pb-16", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedSection, { direction: "up", delay: 200, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "glass border border-border rounded-2xl p-6 sm:p-8 shadow-card", children: done ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-primary/15 text-primary flex items-center justify-center mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-9 h-9" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 font-display text-2xl font-bold", children: "Booking Confirmed!" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-muted-foreground", children: "Our team will call you within 2 hours to confirm pickup." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 inline-block glass border border-border rounded-xl px-6 py-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "Booking Reference" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-display font-black text-2xl text-gradient-orange", children: [
            "#",
            done
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap justify-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setDone(null), className: "px-5 py-2.5 rounded-xl border border-border font-semibold text-sm hover:bg-section transition-all", children: "Book Another" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "https://wa.me/919876543210", target: "_blank", rel: "noopener noreferrer", className: "inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#25D366] text-white font-bold text-sm hover:opacity-90 transition-all", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-4 h-4" }),
            " Chat on WhatsApp"
          ] })
        ] })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submit, className: "space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold", children: "Tell us about your device" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(RField, { label: "Full Name", name: "name", value: form.name, onChange: update, error: errors.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(RField, { label: "Phone Number", name: "phone", value: form.phone, onChange: update, error: errors.phone, placeholder: "+91 98765 43210" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(RField, { label: "Email", name: "email", value: form.email, onChange: update, error: errors.email, type: "email" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(RField, { label: "Brand", name: "brand", value: form.brand, onChange: update, error: errors.brand, placeholder: "JBL, Sony, Bose…" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sm:col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(RField, { label: "Device / Model", name: "device", value: form.device, onChange: update, error: errors.device, placeholder: "e.g. JBL PartyBox 710" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-semibold text-muted-foreground mb-1.5", children: "Describe the issue" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: form.issue, onChange: (e) => update("issue", e.target.value), rows: 4, maxLength: 500, placeholder: "No sound from left channel, distortion at high volume…", className: `w-full px-3 py-2.5 rounded-xl border bg-section text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none ${errors.issue ? "border-destructive" : "border-border"}` }),
            errors.issue && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive mt-1", children: errors.issue })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-semibold text-muted-foreground mb-1.5", children: "Service Mode" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-2", children: [{
              v: "pickup",
              l: "Free Pickup"
            }, {
              v: "drop",
              l: "Drop at Store"
            }].map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: `cursor-pointer text-center text-sm font-bold py-2.5 rounded-xl border-2 transition-all ${form.pickup === p.v ? "border-primary bg-primary/10 text-primary" : "border-border hover:border-primary/40"}`, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "radio", value: p.v, checked: form.pickup === p.v, onChange: (e) => update("pickup", e.target.value), className: "sr-only" }),
              p.l
            ] }, p.v)) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(RField, { label: "Preferred Date", name: "date", value: form.date, onChange: update, error: errors.date, type: "date" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: loading, className: "w-full inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-primary text-primary-foreground font-bold text-sm hover:shadow-glow transition-all disabled:opacity-60 btn-press", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Wrench, { className: "w-4 h-4" }),
          " Submit Repair Request"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground text-center", children: "By submitting, you agree to be contacted by AudioCare on the details provided." })
      ] }) }) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
function RField({
  label,
  name,
  value,
  onChange,
  error,
  type = "text",
  placeholder
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-semibold text-muted-foreground mb-1.5", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type, value, placeholder, onChange: (e) => onChange(name, e.target.value), className: `w-full px-3 py-2.5 rounded-xl border bg-section text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all ${error ? "border-destructive" : "border-border"}` }),
    error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive mt-1", children: error })
  ] });
}
export {
  RepairPage as component
};
