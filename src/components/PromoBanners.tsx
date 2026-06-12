import { Link } from "@tanstack/react-router";
import { ArrowRight, Wrench, Phone } from "lucide-react";

export function PromoBanners() {
  return (
    <section className="w-full bg-background">
      {/* Top two full-image banners */}
      <div className="grid md:grid-cols-2 gap-0">
        {/* Banner 1 — Home Theater */}
        <div className="relative group overflow-hidden bg-black min-h-[420px] lg:min-h-[500px] flex items-end">
          <img
            src="/audiocare_img/family_home_theater.png"
            alt="Home Theater Setup"
            className="absolute inset-0 w-full h-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
          <div className="relative z-10 p-8 md:p-12 w-full">
            <span className="inline-block bg-[#e84e1b] text-white text-xs font-bold uppercase tracking-widest px-3 py-1 mb-4">
              Home Theater
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white uppercase tracking-tight leading-tight mb-3 font-display">
              CINEMA IN YOUR<br />LIVING ROOM
            </h2>
            <p className="text-white/80 text-base font-medium mb-7 max-w-sm">
              Complete home theater design, supply & installation — Dolby Atmos, 4K, acoustic panels and smart controls.
            </p>
            <Link
              to="/shop/category/$slug"
              params={{ slug: "home-theatre" }}
              className="inline-flex items-center gap-2 bg-white text-black font-bold uppercase tracking-wider px-7 py-3 hover:bg-gray-100 transition-colors"
            >
              Shop Now <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Banner 2 — Sound Systems */}
        <div className="relative group overflow-hidden bg-black min-h-[420px] lg:min-h-[500px] flex items-end">
          <img
            src="/audiocare_img/marshall_speaker.png"
            alt="Premium Sound Systems"
            className="absolute inset-0 w-full h-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
          <div className="relative z-10 p-8 md:p-12 w-full">
            <span className="inline-block bg-[#1a3c6e] text-white text-xs font-bold uppercase tracking-widest px-3 py-1 mb-4">
              Portable bluetooth speaker
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white uppercase tracking-tight leading-tight mb-3 font-display">
              HEAR EVERY DETAIL,<br />FEEL EVERY BEAT
            </h2>
            <p className="text-white/80 text-base font-medium mb-7 max-w-sm">
              JBL, Sony, Bose & Marshall — premium speakers, soundbars, and party systems.
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 bg-white text-black font-bold uppercase tracking-wider px-7 py-3 hover:bg-gray-100 transition-colors"
            >
              Shop Now <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom trust bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-border border-t border-border bg-card">
        {[
          { icon: "🚚", title: "Free Pickup & Delivery", sub: "For all repair orders across the city" },
          { icon: "🛡️", title: "100% Genuine Parts", sub: "Original brand components only" },
          { icon: "⚡", title: "Same-Day Service", sub: "Fast turnaround on most repairs" },
          { icon: "📞", title: "Expert Support", sub: "Call us anytime for audio advice" },
        ].map((item) => (
          <div key={item.title} className="flex items-center gap-4 px-6 py-5">
            <span className="text-2xl">{item.icon}</span>
            <div>
              <p className="font-bold text-sm">{item.title}</p>
              <p className="text-muted-foreground text-xs mt-0.5">{item.sub}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
