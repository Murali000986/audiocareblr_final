import { createFileRoute, Outlet, Link, useLocation } from "@tanstack/react-router";
import { Info, Settings2, ShieldCheck, Users, Phone } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/about")({
  component: AboutLayout,
});

const navLinks = [
  { to: "/about",          label: "Overview",       icon: Info,        exact: true },
  { to: "/about/services", label: "Our Services",   icon: Settings2               },
  { to: "/about/brands",   label: "Brand Partners", icon: ShieldCheck             },
  { to: "/about/clients",  label: "Major Clients",  icon: Users                   },
];

function AboutLayout() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* ── Full-bleed Hero Banner ─────────────────────────────────── */}
        <div className="relative py-24 lg:py-40 overflow-hidden bg-black">
          {/* Background image */}
          <img
            src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1920&auto=format&fit=crop"
            alt="AudioCare – premium audio solutions"
            className="absolute inset-0 w-full h-full object-cover opacity-40 scale-105"
          />
          {/* Overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

          {/* Content */}
          <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10">
            <p className="text-primary font-bold uppercase tracking-[0.25em] text-xs mb-5 drop-shadow">
              Est. 2007 · Bengaluru, India
            </p>
            <h1 className="text-5xl lg:text-7xl font-display font-extrabold tracking-tight text-white leading-[1.05] drop-shadow-xl max-w-3xl">
              About<br />AudioCare
            </h1>
            <p className="mt-6 text-white/80 text-lg lg:text-xl max-w-xl leading-relaxed drop-shadow-md">
              18+ years of excellence in Home Audio &amp; Commercial Audio Sales, Service, Installation &amp; AMC.
            </p>

            {/* Quick contact strip */}
            <div className="mt-8 flex flex-wrap items-center gap-6">
              <a
                href="tel:9945966499"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-bold px-6 py-3 rounded-xl hover:bg-primary/90 transition-colors text-sm"
              >
                <Phone className="w-4 h-4" /> 9945966499
              </a>
              <a
                href="tel:08040544499"
                className="inline-flex items-center gap-2 border border-white/30 text-white hover:bg-white/10 font-medium px-6 py-3 rounded-xl transition-colors text-sm"
              >
                Office: 080-40544499
              </a>
            </div>
          </div>
        </div>

        {/* ── Sub-nav + Content ──────────────────────────────────────── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
          <div className="flex flex-col lg:flex-row gap-12 items-start">

            {/* Sticky Sidebar */}
            <nav className="w-full lg:w-72 flex-shrink-0 lg:sticky lg:top-24">
              {/* Nav pills */}
              <div className="bg-card border border-border rounded-2xl p-3 shadow-soft">
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground px-3 mb-3 mt-1">
                  Explore
                </p>
                <ul className="flex flex-row lg:flex-col gap-1 overflow-x-auto lg:overflow-visible">
                  {navLinks.map((link) => {
                    const isActive = link.exact
                      ? location.pathname === link.to
                      : location.pathname.startsWith(link.to);
                    return (
                      <li key={link.to} className="flex-shrink-0">
                        <Link
                          to={link.to}
                          className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm whitespace-nowrap transition-all ${
                            isActive
                              ? "bg-primary text-primary-foreground shadow"
                              : "text-muted-foreground hover:bg-muted hover:text-foreground"
                          }`}
                        >
                          <link.icon className="w-4 h-4 flex-shrink-0" />
                          {link.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Side info card */}
              <div className="mt-5 bg-card border border-border rounded-2xl p-5 shadow-soft space-y-4">
                <p className="text-xs font-black uppercase tracking-widest text-muted-foreground">Quick Info</p>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-bold text-foreground">Founded</p>
                    <p className="text-muted-foreground">2007 · 18+ Years</p>
                  </div>
                  <div>
                    <p className="font-bold text-foreground">Location</p>
                    <p className="text-muted-foreground">#385, 17th E Main Rd, KHB Colony, Bengaluru</p>
                  </div>
                  <div>
                    <p className="font-bold text-foreground">Services</p>
                    <p className="text-muted-foreground">Sales · Installation · Repair · AMC</p>
                  </div>
                  <div>
                    <p className="font-bold text-foreground">Brands</p>
                    <p className="text-muted-foreground">JBL · Infinity · Harman Kardon</p>
                  </div>
                </div>
              </div>
            </nav>

            {/* Page Content */}
            <div className="flex-1 min-w-0">
              <Outlet />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
