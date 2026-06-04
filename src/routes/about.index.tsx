import { createFileRoute, Link } from "@tanstack/react-router";
import { Calendar, MapPin, Phone, Award, Users, Wrench, Building2, Star, ArrowRight, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/about/")({
  head: () => ({
    meta: [
      { title: "About AudioCare | 18+ Years of Audio Excellence in Bengaluru" },
      { name: "description", content: "AudioCare has been Bengaluru's most trusted audio solutions provider since 2007. Home & commercial audio sales, installation, repair & AMC." },
      { property: "og:title", content: "About AudioCare | 18+ Years of Audio Excellence" },
      { name: "keywords", content: "AudioCare Bengaluru, home theater installation, audio repair, JBL dealer Bangalore" },
    ],
  }),
  component: AboutIndex,
});

const milestones = [
  { year: "2007", title: "Founded in Bengaluru", desc: "Started operations from KHB Colony, 17th E Main Road." },
  { year: "2010", title: "Commercial Audio Expansion", desc: "Began offering large-scale commercial audio solutions for events & institutions." },
  { year: "2014", title: "AMC Services Launched", desc: "Introduced Annual Maintenance Contracts for premium clients." },
  { year: "2018", title: "Wonderla Partnership", desc: "Secured AMC contract with Wonderla Bengaluru — a landmark achievement." },
  { year: "2020", title: "PROFX Vendor Empanelment", desc: "Became a Pan India Service Vendor for PROFX." },
  { year: "2025", title: "18+ Years & Counting", desc: "Serving thousands of satisfied customers across Bengaluru." },
];

const stats = [
  { icon: Calendar, value: "18+", label: "Years in Business" },
  { icon: Users, value: "10,000+", label: "Repairs Completed" },
  { icon: Star, value: "4.9★", label: "Average Rating" },
  { icon: Award, value: "50+", label: "Premium Brands" },
];

const values = [
  { title: "Quality First", desc: "We use only genuine parts and certified techniques for every installation and repair." },
  { title: "Customer Trust", desc: "Our 18-year track record is built entirely on honest advice and transparent pricing." },
  { title: "Technical Expertise", desc: "Our team holds certifications from global audio brands and stays updated with the latest tech." },
  { title: "After-Sales Support", desc: "We don't disappear after the sale. Our AMC and support services are second to none." },
];

function AboutIndex() {
  return (
    <div className="space-y-20 animate-fade-up">

      {/* WHO WE ARE — Image + Text */}
      <section className="grid md:grid-cols-2 gap-10 items-center">
        <div>
          <p className="text-primary font-bold uppercase tracking-widest text-xs mb-3">Est. 2007</p>
          <h2 className="text-4xl font-display font-extrabold tracking-tight mb-6 leading-tight">
            Bengaluru's Most Trusted Audio Partner
          </h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed text-base">
            <p>
              AudioCare was born in 2007 from a single passion: <strong className="text-foreground">making world-class audio accessible to everyone</strong>. What started as a small repair shop in KHB Colony has grown into one of Bengaluru's leading audio solution providers.
            </p>
            <p>
              Today, we serve homeowners who want cinema-quality living rooms, businesses that need robust PA systems, and iconic venues like Wonderla and the Bangalore Club that rely on our Annual Maintenance Contracts to keep their audio running 24/7.
            </p>
            <p>
              We carry the most respected brands in audio — JBL, Infinity, Harman Kardon — backed by a team of certified technicians with decades of hands-on experience.
            </p>
          </div>
          <Link to="/about/services" className="mt-8 inline-flex items-center gap-2 font-bold text-primary hover:underline">
            Explore Our Services <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="relative h-[460px] rounded-3xl overflow-hidden shadow-xl">
          <img
            src="https://images.unsplash.com/photo-1577174881658-0f30ed549adc?q=80&w=1000&auto=format&fit=crop"
            alt="AudioCare workshop team"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
            <p className="text-white font-bold text-lg">Our Expert Team</p>
            <p className="text-white/70 text-sm">Certified technicians with 18+ years combined experience</p>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-card border border-border rounded-2xl p-6 text-center shadow-soft">
            <s.icon className="w-7 h-7 text-primary mx-auto mb-3" />
            <div className="text-3xl font-display font-black text-foreground mb-1">{s.value}</div>
            <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </section>

      {/* FULL-WIDTH IMAGE QUOTE */}
      <section className="relative rounded-3xl overflow-hidden h-[350px] flex items-center">
        <img
          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1600&auto=format&fit=crop"
          alt="Premium audio setup"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/65" />
        <div className="relative z-10 max-w-2xl mx-auto text-center px-8">
          <p className="text-white/90 text-2xl md:text-3xl font-display font-bold italic leading-snug">
            "We don't just sell audio — we engineer experiences that stay with you for a lifetime."
          </p>
          <p className="mt-5 text-white/60 font-medium">— AudioCare, Since 2007</p>
        </div>
      </section>

      {/* OUR VALUES — 4 cards */}
      <section>
        <p className="text-primary font-bold uppercase tracking-widest text-xs mb-3">Our Philosophy</p>
        <h2 className="text-3xl font-display font-extrabold mb-8">What Drives Us</h2>
        <div className="grid sm:grid-cols-2 gap-5">
          {values.map((v, i) => (
            <div key={v.title} className="flex gap-4 p-6 bg-card border border-border rounded-2xl shadow-soft">
              <div className="w-9 h-9 bg-primary/10 text-primary flex items-center justify-center rounded-xl flex-shrink-0 font-black text-sm font-display">
                0{i + 1}
              </div>
              <div>
                <h3 className="font-bold text-base mb-1">{v.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{v.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* JOURNEY TIMELINE */}
      <section>
        <p className="text-primary font-bold uppercase tracking-widest text-xs mb-3">Our Journey</p>
        <h2 className="text-3xl font-display font-extrabold mb-10">Milestones Over The Years</h2>
        <div className="relative border-l-2 border-primary/30 pl-8 space-y-8">
          {milestones.map((m) => (
            <div key={m.year} className="relative">
              <div className="absolute -left-[2.65rem] top-1 w-5 h-5 rounded-full bg-primary border-4 border-background" />
              <p className="text-primary font-black text-sm tracking-widest mb-1">{m.year}</p>
              <h3 className="font-bold text-lg text-foreground">{m.title}</h3>
              <p className="text-muted-foreground text-sm mt-1">{m.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3-COLUMN IMAGE GALLERY */}
      <section>
        <p className="text-primary font-bold uppercase tracking-widest text-xs mb-3">Our Work</p>
        <h2 className="text-3xl font-display font-extrabold mb-8">Installations & Setups</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { src: "https://images.unsplash.com/photo-1593784991095-a205069470b6?q=80&w=800&auto=format&fit=crop", alt: "Home Theater" },
            { src: "https://images.unsplash.com/photo-1545454675-3531b543be5d?q=80&w=800&auto=format&fit=crop", alt: "Professional Speakers" },
            { src: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=800&auto=format&fit=crop", alt: "Theater Auditorium" },
            { src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=800&auto=format&fit=crop", alt: "Sound System" },
            { src: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=800&auto=format&fit=crop", alt: "Studio Equipment" },
            { src: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=800&auto=format&fit=crop", alt: "Headphones" },
          ].map((img) => (
            <div key={img.alt} className="aspect-square rounded-xl overflow-hidden bg-muted group">
              <img src={img.src} alt={img.alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT CARD */}
      <section className="bg-muted border border-border rounded-3xl overflow-hidden">
        <div className="grid md:grid-cols-2">
          <div className="p-10 space-y-6">
            <p className="text-primary font-bold uppercase tracking-widest text-xs">Get In Touch</p>
            <h2 className="text-3xl font-display font-extrabold">Visit Us or Call Today</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center flex-shrink-0"><Phone className="w-5 h-5" /></div>
                <div>
                  <p className="font-bold text-sm text-foreground">Phone</p>
                  <p className="text-muted-foreground">Mobile: 9945966499</p>
                  <p className="text-muted-foreground">Office: 080-40544499</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center flex-shrink-0"><MapPin className="w-5 h-5" /></div>
                <div>
                  <p className="font-bold text-sm text-foreground">Address</p>
                  <p className="text-muted-foreground">#385, Ground Floor, 17th E Main Road,<br />KHB Colony, Bengaluru</p>
                </div>
              </div>
            </div>
            <Link to="/contact" className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-bold px-6 py-3 rounded-xl hover:bg-primary/90 transition-colors">
              Contact Us <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="h-[300px] md:h-auto bg-black relative overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1520166970742-99d863ff1c83?q=80&w=800&auto=format&fit=crop"
              alt="AudioCare store"
              className="w-full h-full object-cover opacity-80"
            />
          </div>
        </div>
      </section>

    </div>
  );
}
