import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { c as House, a2 as Building, W as Wrench, q as Shield, a as CircleCheck, a3 as Zap, C as Clock, m as ArrowRight } from "../_libs/lucide-react.mjs";
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
const mainServices = [{
  icon: House,
  title: "Home Audio Solutions",
  desc: "Transform your living room into a private cinema. We design, supply and install complete home theater systems — from entry-level setups to fully immersive Dolby Atmos rooms.",
  features: ["Home Theater Design & Setup", "Dolby Atmos & DTS:X Systems", "4K Projector Installation", "Acoustic Treatment & Soundproofing", "Smart Home Audio Integration", "Dedicated Listening Rooms"],
  image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?q=80&w=1000&auto=format&fit=crop"
}, {
  icon: Building,
  title: "Commercial Audio Solutions",
  desc: "From restaurants and hotels to auditoriums and theme parks, we design and deploy professional audio systems that deliver crystal-clear sound at any scale.",
  features: ["Background Music Systems", "PA & Public Address Systems", "Conference Room Audio-Video", "Line Array Speaker Systems", "Auditorium & Theater AV", "Outdoor Event Systems"],
  image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1000&auto=format&fit=crop"
}, {
  icon: Wrench,
  title: "Repair & Service",
  desc: "Our certified technicians repair all major brands of audio equipment — speakers, amplifiers, subwoofers, soundbars and receivers — with genuine parts and a service warranty.",
  features: ["Speaker Cone & Surround Repair", "Amplifier Board Repair", "Subwoofer Reconing", "Soundbar Motherboard Service", "AV Receiver Repair", "Free Doorstep Pickup & Drop"],
  image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1000&auto=format&fit=crop"
}, {
  icon: Shield,
  title: "Annual Maintenance Contracts (AMC)",
  desc: "Keep your audio infrastructure at peak performance year-round. Our AMC packages provide scheduled maintenance, priority support, and emergency response to minimize downtime.",
  features: ["Scheduled Preventive Maintenance", "Priority Emergency Support", "System Health Diagnostics", "Parts Replacement Coverage", "Remote Troubleshooting", "24/7 Helpline Access"],
  image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1000&auto=format&fit=crop"
}];
const whyChooseUs = [{
  icon: Zap,
  title: "Fast Turnaround",
  desc: "Most repairs in 24–48 hours."
}, {
  icon: Shield,
  title: "Warranty on Repairs",
  desc: "Every repair comes with a service warranty."
}, {
  icon: CircleCheck,
  title: "Genuine Parts",
  desc: "We use only original manufacturer parts."
}, {
  icon: Clock,
  title: "18+ Years Experience",
  desc: "Trusted by thousands since 2007."
}];
function AboutServices() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-24 animate-fade-up", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary font-bold uppercase tracking-widest text-xs mb-3", children: "What We Offer" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-4xl font-display font-extrabold mb-4", children: "Comprehensive Audio Services" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-lg max-w-3xl leading-relaxed", children: "From designing the perfect home theater to maintaining the sound systems of Bengaluru's most iconic venues, AudioCare handles every aspect of the audio journey — sales, installation, repair, and long-term maintenance." })
    ] }),
    mainServices.map((service, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: `grid md:grid-cols-2 gap-10 items-center ${idx % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""}`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(service.icon, { className: "w-6 h-6" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-2xl font-display font-extrabold mb-4", children: service.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed mb-6", children: service.desc }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "grid grid-cols-1 sm:grid-cols-2 gap-2", children: service.features.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-2 text-sm text-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4 text-primary flex-shrink-0" }),
          f
        ] }, f)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-[350px] rounded-3xl overflow-hidden shadow-xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: service.image, alt: service.title, className: "w-full h-full object-cover" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-6 left-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-primary text-primary-foreground font-bold text-xs uppercase tracking-widest px-3 py-1.5 rounded-full", children: service.title }) })
      ] })
    ] }, service.title)),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "bg-muted border border-border rounded-3xl p-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary font-bold uppercase tracking-widest text-xs mb-3 text-center", children: "Our Edge" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-display font-extrabold mb-10 text-center", children: "Why Choose AudioCare?" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-4 gap-6", children: whyChooseUs.map((w) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center bg-background border border-border rounded-2xl p-6 shadow-soft", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mx-auto mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(w.icon, { className: "w-6 h-6" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-base mb-2", children: w.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: w.desc })
      ] }, w.title)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative rounded-3xl overflow-hidden h-[300px] flex items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "https://images.unsplash.com/photo-1520166970742-99d863ff1c83?q=80&w=1600&auto=format&fit=crop", alt: "Audio Solutions", className: "absolute inset-0 w-full h-full object-cover" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-black/65" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 px-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-white text-3xl md:text-4xl font-display font-extrabold mb-4", children: "Ready to upgrade your audio?" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/contact", className: "inline-flex items-center gap-2 bg-primary text-primary-foreground font-bold px-7 py-3.5 rounded-xl hover:bg-primary/90 transition-colors", children: [
          "Book a Consultation ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" })
        ] })
      ] })
    ] })
  ] });
}
export {
  AboutServices as component
};
