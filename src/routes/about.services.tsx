import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, ArrowRight, Home, Building, Wrench, Clock, Shield, Zap } from "lucide-react";

export const Route = createFileRoute("/about/services")({
  head: () => ({
    meta: [
      { title: "Audio Services in Bengaluru — Home Theatre, Repair & AMC | AudioCare" },
      { name: "description", content: "AudioCare Bengaluru offers Home Audio setup, Commercial Audio systems, Speaker & Amplifier Repair, Home Theatre Installation, and Annual Maintenance Contracts (AMC). Serving Bangalore since 2007." },
      { name: "keywords", content: "home theater installation Bengaluru, audio repair bangalore, commercial audio Bengaluru, speaker installation bangalore, AMC audio bangalore, amplifier service bengaluru, soundbar repair bangalore, home theatre setup bangalore, PROFX service vendor, audio AMC bangalore" },
      { property: "og:title", content: "Audio Services in Bengaluru — Home Theatre, Repair & AMC | AudioCare" },
      { property: "og:description", content: "Home theatre installation, speaker repair, commercial audio & AMC services in Bengaluru since 2007. Expert team, genuine parts, free pickup." },
      { property: "og:url", content: "https://www.audiocareblr.com/about/services" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "AudioCare Bengaluru" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Audio Services in Bengaluru — Home Theatre, Repair & AMC | AudioCare" },
      { name: "twitter:description", content: "Home theatre installation, speaker repair & AMC in Bengaluru. AudioCare since 2007." },
    ],
  }),
  component: AboutServices,
});

const mainServices = [
  {
    icon: Home,
    title: "Home Audio Solutions",
    desc: "Transform your living room into a private cinema. We design, supply and install complete home theater systems — from entry-level setups to fully immersive Dolby Atmos rooms.",
    features: ["Home Theater Design & Setup", "Dolby Atmos & DTS:X Systems", "4K Projector Installation", "Acoustic Treatment & Soundproofing", "Smart Home Audio Integration", "Dedicated Listening Rooms"],
    image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?q=80&w=1000&auto=format&fit=crop",
  },
  {
    icon: Building,
    title: "Commercial Audio Solutions",
    desc: "From restaurants and hotels to auditoriums and theme parks, we design and deploy professional audio systems that deliver crystal-clear sound at any scale.",
    features: ["Background Music Systems", "PA & Public Address Systems", "Conference Room Audio-Video", "Line Array Speaker Systems", "Auditorium & Theater AV", "Outdoor Event Systems"],
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1000&auto=format&fit=crop",
  },
  {
    icon: Wrench,
    title: "Repair & Service",
    desc: "Our certified technicians repair all major brands of audio equipment — speakers, amplifiers, subwoofers, soundbars and receivers — with genuine parts and a service warranty.",
    features: ["Speaker Cone & Surround Repair", "Amplifier Board Repair", "Subwoofer Reconing", "Soundbar Motherboard Service", "AV Receiver Repair", "Free Doorstep Pickup & Drop"],
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1000&auto=format&fit=crop",
  },
  {
    icon: Shield,
    title: "Annual Maintenance Contracts (AMC)",
    desc: "Keep your audio infrastructure at peak performance year-round. Our AMC packages provide scheduled maintenance, priority support, and emergency response to minimize downtime.",
    features: ["Scheduled Preventive Maintenance", "Priority Emergency Support", "System Health Diagnostics", "Parts Replacement Coverage", "Remote Troubleshooting", "24/7 Helpline Access"],
    image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1000&auto=format&fit=crop",
  },
];

const whyChooseUs = [
  { icon: Zap, title: "Fast Turnaround", desc: "Most repairs in 24–48 hours." },
  { icon: Shield, title: "Warranty on Repairs", desc: "Every repair comes with a service warranty." },
  { icon: CheckCircle2, title: "Genuine Parts", desc: "We use only original manufacturer parts." },
  { icon: Clock, title: "18+ Years Experience", desc: "Trusted by thousands since 2007." },
];

function AboutServices() {
  return (
    <div className="space-y-24 animate-fade-up">
      {/* Intro */}
      <div>
        <p className="text-primary font-bold uppercase tracking-widest text-xs mb-3">What We Offer</p>
        <h2 className="text-4xl font-display font-extrabold mb-4">Comprehensive Audio Services</h2>
        <p className="text-muted-foreground text-lg max-w-3xl leading-relaxed">
          From designing the perfect home theater to maintaining the sound systems of Bengaluru's most iconic venues, AudioCare handles every aspect of the audio journey — sales, installation, repair, and long-term maintenance.
        </p>
      </div>

      {/* Service Detail Cards */}
      {mainServices.map((service, idx) => (
        <section key={service.title} className={`grid md:grid-cols-2 gap-10 items-center ${idx % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""}`}>
          {/* Text */}
          <div>
            <div className="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-5">
              <service.icon className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-display font-extrabold mb-4">{service.title}</h3>
            <p className="text-muted-foreground leading-relaxed mb-6">{service.desc}</p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {service.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-foreground">
                  <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
          {/* Image */}
          <div className="relative h-[350px] rounded-3xl overflow-hidden shadow-xl">
            <img src={service.image} alt={service.title} className="w-full h-full object-cover" loading="lazy" decoding="async" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-6 left-6">
              <span className="bg-primary text-primary-foreground font-bold text-xs uppercase tracking-widest px-3 py-1.5 rounded-full">
                {service.title}
              </span>
            </div>
          </div>
        </section>
      ))}

      {/* WHY CHOOSE US */}
      <section className="bg-muted border border-border rounded-3xl p-10">
        <p className="text-primary font-bold uppercase tracking-widest text-xs mb-3 text-center">Our Edge</p>
        <h2 className="text-3xl font-display font-extrabold mb-10 text-center">Why Choose AudioCare?</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {whyChooseUs.map((w) => (
            <div key={w.title} className="text-center bg-background border border-border rounded-2xl p-6 shadow-soft">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                <w.icon className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base mb-2">{w.title}</h3>
              <p className="text-muted-foreground text-sm">{w.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FULL WIDTH BANNER */}
      <section className="relative rounded-3xl overflow-hidden h-[300px] flex items-center">
        <img
          src="https://images.unsplash.com/photo-1520166970742-99d863ff1c83?q=80&w=1600&auto=format&fit=crop"
          alt="Audio Solutions"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/65" />
        <div className="relative z-10 px-10">
          <h3 className="text-white text-3xl md:text-4xl font-display font-extrabold mb-4">Ready to upgrade your audio?</h3>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-bold px-7 py-3.5 rounded-xl hover:bg-primary/90 transition-colors"
          >
            Book a Consultation <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

    </div>
  );
}
