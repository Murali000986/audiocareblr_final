import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, Star, Shield } from "lucide-react";

export const Route = createFileRoute("/about/brands")({
  head: () => ({
    meta: [
      { title: "Brand Partners | AudioCare — JBL, Infinity & Harman Kardon" },
      { name: "description", content: "AudioCare is an authorized partner for JBL, Infinity, and Harman Kardon (via Sahil International) in Bengaluru. Genuine products, expert advice." },
      { name: "keywords", content: "JBL dealer Bengaluru, Infinity speakers, Harman Kardon Bangalore, authorized audio dealer" },
    ],
  }),
  component: AboutBrands,
});

const brands = [
  {
    name: "JBL",
    tagline: "The Sound of Life",
    category: "Home, Party & Professional Audio",
    desc: "JBL is the world's most iconic speaker brand, trusted by audiophiles, professional artists, and everyday listeners alike. As a JBL partner, AudioCare offers the complete JBL range — from party speakers and soundbars to professional line arrays used in stadiums and auditoriums.",
    highlights: ["JBL Home Audio", "JBL PartyBox Speakers", "JBL Professional Series", "JBL Earbuds & Headphones", "JBL Soundbars", "Commercial JBL Line Arrays"],
    image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?q=80&w=1200&auto=format&fit=crop",
    accentColor: "#e84e1b",
  },
  {
    name: "Infinity",
    tagline: "Precision Engineering. Pure Sound.",
    category: "Home & Car Audio",
    desc: "Infinity by Harman is engineered for those who demand uncompromising accuracy and deep, controlled bass. AudioCare stocks the full Infinity range, from bookshelf and floorstanding speakers to subwoofers designed for audiophile-grade home theater systems.",
    highlights: ["Infinity Reference Series", "Infinity Primus Series", "Subwoofers & Bass Systems", "In-Wall & In-Ceiling Speakers", "Home Theater Packages", "Infinity Car Audio"],
    image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?q=80&w=1200&auto=format&fit=crop",
    accentColor: "#1a3c6e",
  },
  {
    name: "Harman Kardon",
    tagline: "Simply Beautiful Sound",
    category: "Premium Lifestyle & Home Audio — via Sahil International",
    desc: "Harman Kardon represents the pinnacle of design-meets-audio. Partnered through Sahil International, AudioCare brings the Harman Kardon range to Bengaluru — combining stunning industrial design with crystal-clear audio that complements any living space.",
    highlights: ["Harman Kardon Soundbars", "Wireless Multi-Room Audio", "Bluetooth Speakers", "Home Theater Systems", "Smart Speakers", "Portable Premium Speakers"],
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=1200&auto=format&fit=crop",
    accentColor: "#7c3aed",
  },
];

const whyBrands = [
  { icon: Shield, title: "100% Genuine Products", desc: "Every product we sell is sourced directly from official distributors — no grey market, no counterfeits." },
  { icon: Star, title: "Expert Brand Knowledge", desc: "Our team is trained by brand representatives and knows every product in depth." },
  { icon: CheckCircle2, title: "Warranty Support", desc: "We handle all warranty claims and after-sales support for brands we stock." },
  { icon: ArrowRight, title: "Original Spare Parts", desc: "Repairs use brand-certified parts to maintain manufacturer specifications." },
];

function AboutBrands() {
  return (
    <div className="space-y-24 animate-fade-up">

      {/* Intro */}
      <div>
        <p className="text-primary font-bold uppercase tracking-widest text-xs mb-3">Our Partners</p>
        <h2 className="text-4xl font-display font-extrabold mb-5">The Brands We Trust</h2>
        <p className="text-muted-foreground text-lg max-w-3xl leading-relaxed">
          AudioCare collaborates exclusively with the world's most respected audio brands. This ensures every product we sell and every repair we perform meets the highest global standards of quality.
        </p>
      </div>

      {/* Brand hero image */}
      <div className="relative rounded-3xl overflow-hidden h-[320px]">
        <img
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1800&auto=format&fit=crop"
          alt="Premium audio equipment"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center px-12">
          <div>
            <p className="text-white/80 text-sm font-bold uppercase tracking-widest mb-3">3 World-Class Brands</p>
            <h3 className="text-white font-display font-extrabold text-4xl leading-tight max-w-lg">
              Authorized Partner for Audio Excellence
            </h3>
          </div>
        </div>
      </div>

      {/* Brand Detail Cards — stacked with alternating layout */}
      {brands.map((brand, idx) => (
        <section key={brand.name} className={`grid md:grid-cols-2 gap-10 items-stretch ${idx % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""}`}>
          {/* Image */}
          <div className="relative rounded-3xl overflow-hidden min-h-[380px]">
            <img src={brand.image} alt={brand.name} className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-8 left-8">
              <div className="text-white font-display font-black text-5xl mb-1">{brand.name}</div>
              <div className="text-white/70 text-sm italic">{brand.tagline}</div>
            </div>
            {/* Accent stripe */}
            <div className="absolute top-0 left-0 right-0 h-1.5" style={{ backgroundColor: brand.accentColor }} />
          </div>

          {/* Content */}
          <div className="flex flex-col justify-center">
            <span className="inline-block self-start bg-muted text-muted-foreground text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4">
              {brand.category}
            </span>
            <h3 className="text-3xl font-display font-extrabold mb-4">{brand.name}</h3>
            <p className="text-muted-foreground leading-relaxed mb-7">{brand.desc}</p>
            <div className="grid grid-cols-2 gap-2.5">
              {brand.highlights.map((h) => (
                <div key={h} className="flex items-center gap-2 text-sm text-foreground">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                  {h}
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Why Genuine Brands Strip */}
      <section className="bg-muted border border-border rounded-3xl p-10">
        <p className="text-primary font-bold uppercase tracking-widest text-xs mb-3 text-center">Our Commitment</p>
        <h2 className="text-3xl font-display font-extrabold mb-10 text-center">Why Genuine Brands Matter</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {whyBrands.map((w) => (
            <div key={w.title} className="bg-background border border-border p-6 rounded-2xl shadow-soft text-center">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                <w.icon className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-sm mb-2">{w.title}</h4>
              <p className="text-muted-foreground text-xs leading-relaxed">{w.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Multi-image grid */}
      <section>
        <p className="text-primary font-bold uppercase tracking-widest text-xs mb-3">Product Gallery</p>
        <h2 className="text-2xl font-display font-extrabold mb-6">Explore Our Range</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            "https://images.unsplash.com/photo-1520166970742-99d863ff1c83?q=80&w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1517282009859-f000ec3b26fe?q=80&w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600&auto=format&fit=crop",
          ].map((src, i) => (
            <div key={i} className="aspect-square rounded-2xl overflow-hidden bg-muted group">
              <img src={src} alt="Brand product" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative rounded-3xl overflow-hidden h-[260px] flex items-center">
        <img src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1600&auto=format&fit=crop" alt="Shop brands" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/65" />
        <div className="relative z-10 px-10">
          <h3 className="text-white text-3xl font-display font-extrabold mb-4">Shop Genuine JBL, Infinity & Harman Kardon</h3>
          <Link to="/shop" className="inline-flex items-center gap-2 bg-white text-black font-bold px-7 py-3.5 rounded-xl hover:bg-gray-100 transition-colors">
            Browse Products <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

    </div>
  );
}
