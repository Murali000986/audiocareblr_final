import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { N as Navbar, F as Footer } from "./Footer-n3lcnv-q.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { a as CircleCheck, d as Phone, M as MessageCircle, e as Mail, f as MapPin } from "../_libs/lucide-react.mjs";
import { o as objectType, s as stringType } from "../_libs/zod.mjs";
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
const schema = objectType({
  name: stringType().trim().min(2).max(80),
  email: stringType().trim().email().max(120),
  phone: stringType().trim().regex(/^\+?[0-9 -]{10,15}$/, "Enter a valid phone"),
  subject: stringType().trim().min(2).max(120),
  message: stringType().trim().min(10).max(1e3)
});
function ContactPage() {
  const [form, setForm] = reactExports.useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [errors, setErrors] = reactExports.useState({});
  const [sent, setSent] = reactExports.useState(false);
  const update = (k, v) => setForm((f) => ({
    ...f,
    [k]: v
  }));
  const submit = (e) => {
    e.preventDefault();
    const r = schema.safeParse(form);
    if (!r.success) {
      const errs = {};
      r.error.issues.forEach((i) => {
        if (i.path[0]) errs[i.path[0]] = i.message;
      });
      setErrors(errs);
      toast.error("Please fix the errors");
      return;
    }
    setErrors({});
    setSent(true);
    toast.success("Message sent — we'll reply within 24 hours");
    setForm({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: ""
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "max-w-7xl mx-auto px-4 sm:px-6 py-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-4xl lg:text-5xl font-bold", children: [
        "Get in ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient-orange", children: "Touch" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-2 max-w-xl", children: "Have a question, a repair enquiry or a bulk order? We'd love to hear from you." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 grid lg:grid-cols-[1fr_400px] gap-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-card", children: sent ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-12 h-12 text-primary mx-auto" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-3 font-display text-2xl font-bold", children: "Message Sent!" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-muted-foreground", children: "We'll get back to you within 24 hours." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setSent(false), className: "mt-5 px-5 py-2.5 rounded-xl border-2 border-border text-sm font-semibold", children: "Send Another" })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submit, className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CField, { label: "Full Name", name: "name", value: form.name, onChange: update, error: errors.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CField, { label: "Email", name: "email", value: form.email, onChange: update, error: errors.email, type: "email" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CField, { label: "Phone", name: "phone", value: form.phone, onChange: update, error: errors.phone, placeholder: "+91 98765 43210" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CField, { label: "Subject", name: "subject", value: form.subject, onChange: update, error: errors.subject })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-semibold mb-1.5", children: "Message" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: form.message, onChange: (e) => update("message", e.target.value), rows: 5, maxLength: 1e3, className: `w-full px-3 py-2.5 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary ${errors.message ? "border-destructive" : "border-border"}` }),
            errors.message && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive mt-1", children: errors.message })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", className: "w-full sm:w-auto px-8 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold shadow-card hover:shadow-glow", children: "Send Message" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("aside", { className: "space-y-3", children: [{
          Icon: Phone,
          t: "Call Us",
          s: "+91 98765 43210",
          href: "tel:+919876543210"
        }, {
          Icon: MessageCircle,
          t: "WhatsApp",
          s: "Chat 9 AM – 9 PM",
          href: "https://wa.me/919876543210"
        }, {
          Icon: Mail,
          t: "Email",
          s: "info@audiocare.in",
          href: "mailto:info@audiocare.in"
        }, {
          Icon: MapPin,
          t: "Visit Store",
          s: "Koramangala, Bengaluru – 560034",
          href: "#"
        }].map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: c.href, className: "flex items-start gap-3 p-4 rounded-2xl border border-border bg-card hover:border-primary transition-colors", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-accent text-primary flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(c.Icon, { className: "w-5 h-5" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-sm", children: c.t }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: c.s })
          ] })
        ] }, c.t)) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
function CField({
  label,
  name,
  value,
  onChange,
  error,
  type = "text",
  placeholder
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-semibold mb-1.5", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type, value, placeholder, onChange: (e) => onChange(name, e.target.value), className: `w-full px-3 py-2.5 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary ${error ? "border-destructive" : "border-border"}` }),
    error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive mt-1", children: error })
  ] });
}
export {
  ContactPage as component
};
