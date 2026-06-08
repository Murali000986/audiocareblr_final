import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MapPin, Phone, ShieldCheck, Wrench, Clock, Star } from "lucide-react";

// The allowed areas based on our SEO strategy
const AREAS = [
  "indiranagar",
  "koramangala",
  "jayanagar",
  "whitefield",
  "malleshwaram"
] as const;

type Area = typeof AREAS[number];

const AREA_DETAILS: Record<Area, { name: string; description: string }> = {
  indiranagar: {
    name: "Indiranagar",
    description: "Expert audio equipment and speaker repair services in Indiranagar. Fast turnaround and guaranteed quality."
  },
  koramangala: {
    name: "Koramangala",
    description: "Premium home theatre installation and amplifier repair right here in Koramangala. Trusted since 2007."
  },
  jayanagar: {
    name: "Jayanagar",
    description: "Specialized vintage audio restoration and sound system setup for residents of Jayanagar."
  },
  whitefield: {
    name: "Whitefield",
    description: "Professional audio service center in Whitefield. We fix soundbars, speakers, and amplifiers with original parts."
  },
  malleshwaram: {
    name: "Malleshwaram",
    description: "Your local audio experts in Malleshwaram. We provide doorstep pickup for all audio repair needs."
  }
};

export const Route = createFileRoute("/areas/$area")({
  loader: ({ params }) => {
    const areaKey = params.area.toLowerCase() as Area;
    if (!AREAS.includes(areaKey)) {
      throw notFound();
    }
    return { area: areaKey, details: AREA_DETAILS[areaKey] };
  },
  head: ({ loaderData }) => {
    const { details } = loaderData as { details: { name: string, description: string } };
    return {
      meta: [
        { title: `Audio Repair & Service in ${details.name}, Bengaluru — AudioCare` },
        { name: "description", content: details.description },
        { property: "og:title", content: `Audio Repair in ${details.name} — AudioCare` },
        { property: "og:description", content: details.description },
      ]
    };
  },
  notFoundComponent: () => (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center px-4 text-center">
        <MapPin className="w-16 h-16 text-muted-foreground/30 mb-4" />
        <h1 className="font-display text-4xl font-bold">Area Not Found</h1>
        <p className="text-muted-foreground mt-2">We couldn't find the location you're looking for.</p>
        <Link to="/" className="inline-block mt-6 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold">
          Return Home
        </Link>
      </main>
      <Footer />
    </div>
  ),
  component: AreaPage,
});

function AreaPage() {
  const { details } = Route.useLoaderData() as any;

  return (
    <div className="min-h-screen bg-background flex flex-col animate-fade-up">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-section py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-6">
              <MapPin className="w-3.5 h-3.5" /> Serving {details.name}
            </span>
            <h1 className="font-display text-4xl md:text-6xl font-bold leading-tight">
              Premium Audio Repair in <span className="text-primary">{details.name}</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
              {details.description} We offer free diagnostics and doorstep pickup across {details.name} for all your audio needs.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="tel:09945966499" className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-xl font-bold hover:opacity-90 transition-opacity">
                <Phone className="w-5 h-5" />
                Call 099459 66499
              </a>
              <a href={`https://wa.me/919945966499?text=Hi%20AudioCare,%20I%20need%20audio%20repair%20service%20in%20${details.name}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-4 bg-[#25D366] text-white rounded-xl font-bold shadow-lg hover:opacity-90 transition-opacity">
                WhatsApp Us
              </a>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 px-4 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Wrench, title: "Expert Technicians", desc: "15+ years of experience repairing high-end audio gear." },
              { icon: ShieldCheck, title: "Genuine Parts", desc: "We use only authentic replacement parts for guaranteed performance." },
              { icon: Clock, title: "Fast Turnaround", desc: "Quick diagnostics and repair times, often within 48 hours." }
            ].map((feature, i) => (
              <div key={i} className="p-6 rounded-2xl bg-card border border-border text-center hover:shadow-card transition-shadow">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold text-lg">{feature.title}</h3>
                <p className="text-muted-foreground text-sm mt-2">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SEO Content / Services */}
        <section className="py-20 bg-section px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-3xl font-bold mb-8 text-center">Our Services in {details.name}</h2>
            <div className="space-y-8">
              <div className="bg-background p-8 rounded-2xl border border-border hover:border-primary/50 transition-colors">
                <h3 className="text-xl font-bold mb-3">Speaker & Subwoofer Repair</h3>
                <p className="text-muted-foreground">Whether it's a blown cone, distorted sound, or complete power failure, our technicians can restore your speakers to factory condition. We service all major brands in {details.name}.</p>
              </div>
              <div className="bg-background p-8 rounded-2xl border border-border hover:border-primary/50 transition-colors">
                <h3 className="text-xl font-bold mb-3">Amplifier & Receiver Servicing</h3>
                <p className="text-muted-foreground">Experiencing channel dropouts or overheating? We provide deep diagnostics and component-level repairs for modern AV receivers and vintage stereo amplifiers.</p>
              </div>
              <div className="bg-background p-8 rounded-2xl border border-border hover:border-primary/50 transition-colors">
                <h3 className="text-xl font-bold mb-3">Home Theatre Installation</h3>
                <p className="text-muted-foreground">Get the perfect acoustic setup for your home in {details.name}. We handle everything from wiring to acoustic calibration for a true cinematic experience.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonial snippet to build E-E-A-T */}
        <section className="py-20 px-4 max-w-4xl mx-auto text-center">
          <Star className="w-8 h-8 text-yellow-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-6">Trusted by Audio Lovers in Bengaluru</h2>
          <blockquote className="text-xl italic text-muted-foreground">
            "AudioCare fixed my vintage amplifier when no one else in {details.name} could. The sound quality is better than ever. Highly recommended for any serious audio repairs."
          </blockquote>
          <p className="mt-4 font-semibold">— Verified Customer from {details.name}</p>
        </section>
      </main>

      <Footer />
    </div>
  );
}
