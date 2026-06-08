import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Quote, MapPin, Award, Handshake, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/about/clients")({
  head: () => ({
    meta: [
      { title: "Major Clients — Wonderla, Bangalore Club & PROFX | AudioCare Bengaluru" },
      { name: "description", content: "AudioCare proudly serves Wonderla Bangalore, Bangalore Club and PROFX with commercial audio AMC and pan-India service. Founder Prakash has 18+ years of trusted client relationships since 2007." },
      { name: "keywords", content: "Wonderla audio AMC bangalore, Bangalore Club audio service, PROFX pan india service vendor, commercial audio AMC Bengaluru, audio maintenance contract bangalore, professional audio service bangalore" },
      { property: "og:title", content: "Major Clients — Wonderla, Bangalore Club & PROFX | AudioCare Bengaluru" },
      { property: "og:description", content: "AudioCare manages audio AMC for Wonderla Bangalore, Bangalore Club & serves as PROFX's Pan India vendor. 18+ years of trusted service." },
      { property: "og:url", content: "https://www.audiocareblr.com/about/clients" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "AudioCare Bengaluru" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Major Clients — Wonderla, Bangalore Club & PROFX | AudioCare" },
      { name: "twitter:description", content: "AudioCare provides commercial audio AMC for Wonderla, Bangalore Club & pan-India services for PROFX." },
    ],
  }),
  component: AboutClients,
});

const clients = [
  {
    name: "Wonderla Bengaluru",
    type: "Theme Park — Audio AMC",
    location: "Bengaluru, Karnataka",
    desc: "Wonderla is one of India's most popular amusement parks, attracting millions of visitors every year. AudioCare holds the comprehensive Annual Maintenance Contract for all audio systems across the park — from entrance PA systems and ride audio to event stage rigs and background music networks.",
    scope: ["Full Park PA System Maintenance", "Stage & Event Audio Support", "Ride Audio System Upkeep", "Background Music Network", "Emergency Audio Response", "Quarterly System Health Reports"],
    image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=1400&auto=format&fit=crop",
    stats: [
      { value: "200+", label: "Speakers Managed" },
      { value: "Annual", label: "AMC Partnership" },
      { value: "24/7", label: "Priority Support" },
    ],
  },
  {
    name: "Bangalore Club",
    type: "Premium Club — Audio AMC",
    location: "Race Course Road, Bengaluru",
    desc: "The Bangalore Club is one of India's oldest and most prestigious members' clubs, established in 1868. AudioCare manages the Audio Annual Maintenance Contract for all club venues — ensuring the distinguished membership enjoys flawless sound at every event, dining area, and conference facility.",
    scope: ["Dining Hall Background Music", "Banquet & Event Hall Audio", "Conference Room AV Systems", "Outdoor Venue Sound Systems", "Preventive Annual Maintenance", "Prompt On-Site Support"],
    image: "https://images.unsplash.com/photo-1545128485-c400e7702796?q=80&w=1400&auto=format&fit=crop",
    stats: [
      { value: "Est. 1868", label: "Client Since" },
      { value: "10+", label: "Venues Covered" },
      { value: "Zero", label: "Downtime Policy" },
    ],
  },
  {
    name: "PROFX",
    type: "Pan India — Service Vendor",
    location: "Pan India Operations",
    desc: "PROFX is a leading professional audio and events company with operations spanning across India. AudioCare is an empaneled Pan India Service Vendor for PROFX, providing on-ground technical support, equipment repair, and maintenance services whenever and wherever needed.",
    scope: ["On-Ground Equipment Repair", "Field Technical Support", "Pan India Service Coverage", "Event AV Maintenance", "Spare Parts Supply", "Emergency Response Team"],
    image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1400&auto=format&fit=crop",
    stats: [
      { value: "Pan India", label: "Coverage" },
      { value: "Empaneled", label: "Vendor Status" },
      { value: "Priority", label: "Dispatch" },
    ],
  },
];

const trustStats = [
  { icon: Award, value: "18+", label: "Years of Trusted Service" },
  { icon: Handshake, value: "50+", label: "Commercial Clients" },
  { icon: TrendingUp, value: "99%", label: "Client Retention Rate" },
  { icon: MapPin, value: "Pan India", label: "Service Reach" },
];

function AboutClients() {
  return (
    <div className="space-y-24 animate-fade-up">

      {/* Intro */}
      <div>
        <p className="text-primary font-bold uppercase tracking-widest text-xs mb-3">Client Portfolio</p>
        <h2 className="text-4xl font-display font-extrabold mb-5">Trusted by Bengaluru's Finest</h2>
        <p className="text-muted-foreground text-lg max-w-3xl leading-relaxed">
          Our most valuable credential is the trust placed in us by some of the region's most prestigious institutions. From iconic amusement parks to century-old clubs, AudioCare delivers reliable audio solutions that never let our clients down.
        </p>
      </div>

      {/* Trust stats bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {trustStats.map((s) => (
          <div key={s.label} className="bg-card border border-border rounded-2xl p-6 text-center shadow-soft">
            <s.icon className="w-7 h-7 text-primary mx-auto mb-3" />
            <div className="text-2xl font-display font-black text-foreground mb-1">{s.value}</div>
            <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Full-bleed intro image */}
      <div className="relative rounded-3xl overflow-hidden h-[320px]">
        <img
          src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1800&auto=format&fit=crop"
          alt="Live event audio"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 to-transparent flex items-center px-12">
          <div className="max-w-lg">
            <Quote className="w-10 h-10 text-primary mb-4" />
            <p className="text-white text-xl font-medium italic leading-relaxed">
              "When the audio fails, the event fails. AudioCare makes sure that never happens."
            </p>
            <p className="text-white/60 text-sm mt-4 font-semibold">— AudioCare's Promise to Every Client</p>
          </div>
        </div>
      </div>

      {/* Client Cards — premium stacked layout */}
      {clients.map((client, idx) => (
        <section key={client.name}>
          {/* Full-width image header for each client */}
          <div className="relative rounded-3xl overflow-hidden h-[300px] md:h-[380px] mb-10">
            <img src={client.image} alt={client.name} className="w-full h-full object-cover" loading="lazy" decoding="async" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <span className="bg-primary text-primary-foreground text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full inline-block mb-3">
                  {client.type}
                </span>
                <h3 className="text-white font-display font-extrabold text-3xl md:text-4xl">{client.name}</h3>
                <div className="flex items-center gap-2 mt-2 text-white/70 text-sm">
                  <MapPin className="w-4 h-4" /> {client.location}
                </div>
              </div>
              {/* Mini stats */}
              <div className="flex gap-4">
                {client.stats.map((s) => (
                  <div key={s.label} className="text-center bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-4 py-3">
                    <div className="text-white font-black text-lg leading-none">{s.value}</div>
                    <div className="text-white/70 text-xs mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Content below image */}
          <div className="grid md:grid-cols-2 gap-10 items-start">
            <div>
              <p className="text-muted-foreground leading-relaxed text-base">{client.desc}</p>
            </div>
            <div>
              <h4 className="font-bold text-sm uppercase tracking-wider text-muted-foreground mb-4">Scope of Work</h4>
              <div className="grid grid-cols-1 gap-2">
                {client.scope.map((s) => (
                  <div key={s} className="flex items-center gap-3 bg-muted border border-border rounded-xl px-4 py-3 text-sm font-medium">
                    <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                    {s}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {idx < clients.length - 1 && (
            <div className="mt-16 border-t border-border" />
          )}
        </section>
      ))}

      {/* Two-image grid section */}
      <section>
        <p className="text-primary font-bold uppercase tracking-widest text-xs mb-3">Commercial Installations</p>
        <h2 className="text-2xl font-display font-extrabold mb-6">Our Work in Commercial Spaces</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { src: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=800&auto=format&fit=crop", alt: "Concert audio" },
            { src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=800&auto=format&fit=crop", alt: "Event setup" },
            { src: "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?q=80&w=800&auto=format&fit=crop", alt: "Professional speakers" },
            { src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=800&auto=format&fit=crop", alt: "Sound system" },
            { src: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=800&auto=format&fit=crop", alt: "Conference room" },
            { src: "https://images.unsplash.com/photo-1517282009859-f000ec3b26fe?q=80&w=800&auto=format&fit=crop", alt: "Large venue" },
          ].map((img) => (
            <div key={img.alt} className="aspect-video rounded-xl overflow-hidden bg-muted group">
              <img src={img.src} alt={img.alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" decoding="async" />
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary text-primary-foreground rounded-3xl p-10 md:p-14 text-center">
        <h3 className="text-3xl md:text-4xl font-display font-extrabold mb-4">Need Audio Solutions for Your Business?</h3>
        <p className="text-primary-foreground/80 text-lg max-w-xl mx-auto mb-8">
          Whether it's a restaurant, hotel, school, auditorium or theme park — AudioCare has the expertise to design, install, and maintain the perfect audio system.
        </p>
        <Link to="/contact" className="inline-flex items-center gap-2 bg-white text-black font-bold px-8 py-4 rounded-xl hover:bg-gray-100 transition-colors text-base">
          Get a Free Consultation <ArrowRight className="w-5 h-5" />
        </Link>
      </section>

    </div>
  );
}
