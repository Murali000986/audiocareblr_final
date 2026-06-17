import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import { Wrench, CheckCircle2, MessageCircle, Truck, ShieldCheck, Clock, Info } from "lucide-react";
import { AnimatedSection } from "@/components/AnimatedSection";

const schema = z.object({
  name:    z.string().trim().min(2).max(80),
  phone:   z.string().trim().regex(/^\+?[0-9 -]{10,15}$/, "Enter a valid phone"),
  email:   z.string().trim().email("Enter a valid email"),
  device:  z.string().trim().min(2).max(80),
  brand:   z.string().trim().min(1).max(40),
  issue:   z.string().trim().min(10, "Describe the issue (min 10 chars)").max(500),
  pickup:  z.enum(["pickup", "drop"]),
  date:    z.string().min(1, "Pick a date"),
});

const repairServiceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Audio Equipment Repair",
  "provider": {
    "@type": "LocalBusiness",
    "name": "AudioCare",
    "url": "https://www.audiocareblr.com"
  },
  "areaServed": { "@type": "City", "name": "Bengaluru" },
  "description": "Expert repair service for speakers, amplifiers, soundbars, and home theatre systems in Bengaluru. Doorstep pickup and delivery.",
  "offers": {
    "@type": "Offer",
    "availability": "https://schema.org/InStock",
    "priceSpecification": { "@type": "PriceSpecification", "priceCurrency": "INR" }
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Speaker Repair Bengaluru", "description": "Expert speaker repair for all brands — JBL, Sony, Bose, Polk Audio and more." } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Amplifier Repair Bengaluru", "description": "Amplifier servicing and repair with genuine parts and 3-month warranty." } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Home Theatre Repair Bangalore", "description": "Full home theatre system troubleshooting, repair and calibration." } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Soundbar Repair Bangalore", "description": "Soundbar repair for all brands with pickup across Bengaluru." } }
    ]
  }
};

const repairFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How long does speaker repair take in Bengaluru?",
      "acceptedAnswer": { "@type": "Answer", "text": "Most repairs are completed within 48 hours. Complex repairs may take 3-5 business days. We will keep you updated via SMS and WhatsApp." }
    },
    {
      "@type": "Question",
      "name": "Do you offer pickup for speaker repair in Bangalore?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes! AudioCare offers doorstep pickup and delivery across all areas of Bengaluru including Koramangala, Indiranagar, Whitefield, Marathahalli and more." }
    },
    {
      "@type": "Question",
      "name": "What brands do you repair?",
      "acceptedAnswer": { "@type": "Answer", "text": "We repair all major audio brands including JBL, Sony, Bose, Harman Kardon, Infinity, Polk Audio, Yamaha, Denon, Pioneer, KEF, and many more." }
    },
    {
      "@type": "Question",
      "name": "Is there a warranty on repairs?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes, all repairs at AudioCare come with a 3-month warranty on parts and labor." }
    },
    {
      "@type": "Question",
      "name": "How do I book a repair?",
      "acceptedAnswer": { "@type": "Answer", "text": "Simply fill out the form on this page with your device details and preferred pickup date. Our team will call you within 2 hours to confirm." }
    }
  ]
};

export const Route = createFileRoute("/repair-service")({
  head: () => ({
    meta: [
      { title: "Speaker & Amplifier Repair in Bengaluru — Pickup | AudioCare" },
      { name: "description", content: "Book expert speaker, amplifier & soundbar repair in Bengaluru. Doorstep pickup across Bangalore. JBL, Sony, Bose, Harman repairs. 3-month warranty. 48-hr turnaround." },
      { name: "keywords", content: "speaker repair bengaluru, speaker repair bangalore, amplifier repair bengaluru, soundbar repair bangalore, JBL repair bengaluru, sony speaker repair bangalore, home theatre repair bangalore, pickup speaker repair bangalore" },
      { property: "og:title", content: "Speaker & Amplifier Repair in Bengaluru — Pickup | AudioCare" },
      { property: "og:description", content: "Expert audio equipment repair in Bengaluru. Doorstep pickup. JBL, Sony, Bose & all brands. 3-month warranty." },
      { property: "og:url", content: "https://www.audiocareblr.com/repair-service" },
    ],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(repairServiceSchema) },
      { type: "application/ld+json", children: JSON.stringify(repairFaqSchema) },
    ],
  }),
  component: RepairPage,
});


function RepairPage() {
  const { user } = useAuth();
  const emptyForm = { name: user?.user_metadata?.full_name ?? "", phone: "", email: user?.email ?? "", device: "", brand: "", issue: "", pickup: "pickup" as const, date: "" };
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const update = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const r = schema.safeParse(form);
    if (!r.success) {
      const errs: Record<string, string> = {};
      r.error.issues.forEach((i) => { if (i.path[0]) errs[i.path[0] as string] = i.message; });
      setErrors(errs);
      toast.error("Please fix the errors above");
      return;
    }
    setErrors({});
    setLoading(true);
    const bookingRef = "RP" + Date.now().toString().slice(-7);

    const { error } = await supabase.from("repair_bookings").insert({
      user_id:      user?.id ?? null,
      name:         form.name,
      phone:        form.phone,
      email:        form.email,
      device:       form.device,
      brand:        form.brand,
      issue:        form.issue,
      pickup_mode:  form.pickup,
      preferred_date: form.date,
      status:       "booked",
      booking_ref:  bookingRef,
    });

    if (error) { 
      setLoading(false);
      toast.error("Failed to submit. Please try again."); 
      return; 
    }

    // Send email notification to Admin
    try {
      await fetch("https://formsubmit.co/ajax/murali701081@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          _subject: `New Repair Booking: ${form.device} (${bookingRef})`,
          Name: form.name,
          Phone: form.phone,
          Email: form.email,
          Brand: form.brand,
          Device: form.device,
          Issue: form.issue,
          Pickup_Mode: form.pickup === "pickup" ? "Doorstep Pickup" : "Drop at Store",
          Preferred_Date: form.date,
          Booking_Reference: bookingRef,
          _template: "table"
        })
      });
    } catch (e) {
      console.error("Email notification failed", e);
    }

    setLoading(false);
    toast.success("Repair request submitted!");
    setDone(bookingRef);
    setForm(emptyForm);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden py-16 sm:py-20">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/10 rounded-full blur-[100px]" />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
            <AnimatedSection direction="up">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-xs font-bold text-primary mb-4">
                <Wrench className="w-3.5 h-3.5" /> Expert Repair Service
              </div>
              <h1 className="font-display text-4xl lg:text-6xl font-black leading-tight">
                Book a <span className="text-gradient-orange">Repair</span>
              </h1>
              <p className="text-muted-foreground mt-3 max-w-xl text-lg">
                Specialized in high-end audio equipment, speaker repair, and amplifier repair services in Bangalore. Expert technicians, genuine replacement parts, advanced diagnostics, and pickup & delivery can be arranged across Bengaluru for reliable and professional service.
              </p>
            </AnimatedSection>

            <div className="mt-8 grid sm:grid-cols-3 gap-4 max-w-2xl">
              {[
                { icon: Truck,       t: "Pickup",     s: "Doorstep service" },
                { icon: ShieldCheck, t: "3-Month Warranty", s: "On all repairs" },
                { icon: Clock,       t: "48-Hr Turnaround", s: "Fast & reliable" },
              ].map((b, i) => (
                <AnimatedSection key={b.t} direction="up" delay={i * 100}>
                  <div className="flex items-center gap-3 p-4 rounded-xl glass border border-border">
                    <div className="w-10 h-10 rounded-lg bg-primary/15 text-primary flex items-center justify-center shrink-0">
                      <b.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-bold text-sm">{b.t}</div>
                      <div className="text-xs text-muted-foreground">{b.s}</div>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Form */}
        <section className="max-w-2xl mx-auto px-4 sm:px-6 pb-16">
          <AnimatedSection direction="up" delay={200}>
            <div className="glass border border-border rounded-2xl p-6 sm:p-8 shadow-card">
              {done ? (
                <div className="text-center py-10">
                  <div className="w-16 h-16 rounded-full bg-primary/15 text-primary flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>
                  <h2 className="mt-4 font-display text-2xl font-bold">Booking Confirmed!</h2>
                  <p className="mt-2 text-muted-foreground">Our team will call you within 2 hours to confirm pickup.</p>
                  <div className="mt-5 inline-block glass border border-border rounded-xl px-6 py-3">
                    <div className="text-xs text-muted-foreground">Booking Reference</div>
                    <div className="font-display font-black text-2xl text-gradient-orange">#{done}</div>
                  </div>
                  <div className="mt-6 flex flex-wrap justify-center gap-3">
                    <button onClick={() => setDone(null)} className="px-5 py-2.5 rounded-xl border border-border font-semibold text-sm hover:bg-section transition-all">
                      Book Another
                    </button>
                    <a
                      href="https://wa.me/919945966499"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#25D366] text-white font-bold text-sm hover:opacity-90 transition-all"
                    >
                      <MessageCircle className="w-4 h-4" /> Chat on WhatsApp
                    </a>
                  </div>
                </div>
              ) : (
                <form onSubmit={submit} className="space-y-5">
                  <h2 className="font-display text-2xl font-bold">Tell us about your device</h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <RField label="Full Name"    name="name"   value={form.name}   onChange={update} error={errors.name} />
                    <RField label="Phone Number" name="phone"  value={form.phone}  onChange={update} error={errors.phone}  placeholder="+91 98765 43210" />
                    <RField label="Email"        name="email"  value={form.email}  onChange={update} error={errors.email}  type="email" />
                    <RField label="Brand"        name="brand"  value={form.brand}  onChange={update} error={errors.brand}  placeholder="JBL, Sony, Bose…" />
                    <div className="sm:col-span-2">
                      <RField label="Device / Model" name="device" value={form.device} onChange={update} error={errors.device} placeholder="e.g. JBL PartyBox 710" />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Describe the issue</label>
                      <textarea
                        value={form.issue}
                        onChange={(e) => update("issue", e.target.value)}
                        rows={4}
                        maxLength={500}
                        placeholder="No sound from left channel, distortion at high volume…"
                        className={`w-full px-3 py-2.5 rounded-xl border bg-section text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none ${errors.issue ? "border-destructive" : "border-border"}`}
                      />
                      {errors.issue && <p className="text-xs text-destructive mt-1">{errors.issue}</p>}
                    </div>

                    {/* Service mode */}
                    <div>
                      <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Service Mode</label>
                      <div className="grid grid-cols-2 gap-2">
                        {[{ v: "pickup", l: "Pickup" }, { v: "drop", l: "Drop at Store" }].map((p) => (
                          <label
                            key={p.v}
                            className={`cursor-pointer text-center text-sm font-bold py-2.5 rounded-xl border-2 transition-all ${
                              form.pickup === p.v ? "border-primary bg-primary/10 text-primary" : "border-border hover:border-primary/40"
                            }`}
                          >
                            <input type="radio" value={p.v} checked={form.pickup === p.v} onChange={(e) => update("pickup", e.target.value)} className="sr-only" />
                            {p.l}
                          </label>
                        ))}
                      </div>
                    </div>
                    <RField label="Preferred Date" name="date" value={form.date} onChange={update} error={errors.date} type="date" />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-primary text-primary-foreground font-bold text-sm hover:shadow-glow transition-all disabled:opacity-60 btn-press"
                  >
                    {loading ? (
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <><Wrench className="w-4 h-4" /> Submit Repair Request</>
                    )}
                  </button>
                  <p className="text-[11px] text-muted-foreground text-center">
                    By submitting, you agree to be contacted by AudioCare on the details provided.
                  </p>
                </form>
              )}
            </div>
          </AnimatedSection>
        </section>
        {/* Terms & Conditions */}
        <section className="max-w-2xl mx-auto px-4 sm:px-6 pb-16">
          <AnimatedSection direction="up" delay={300}>
            <div className="bg-muted/50 border border-border rounded-2xl p-6 sm:p-8">
              <div className="flex items-center gap-2 mb-4">
                <Info className="w-5 h-5 text-muted-foreground" />
                <h3 className="font-bold text-sm uppercase tracking-wider text-muted-foreground">Terms & Conditions</h3>
              </div>
              <ul className="space-y-3 text-xs sm:text-sm text-muted-foreground list-disc pl-5">
                <li><strong>Estimation Time:</strong> Product service estimation is provided within 4-5 working days from receipt.</li>
                <li><strong>Serviceability:</strong> Repair is strictly dependent on the availability of spare components.</li>
                <li><strong>Duration:</strong> Maximum service duration is 15 working days.</li>
                <li><strong>Testing Charges:</strong> A general testing charge of ₹350 applies after the quote (depends on product).</li>
                <li><strong>Storage Policy:</strong> Maximum storage limit is one month. After 45 days, the company will not be responsible for the product (will be treated as e-waste).</li>
                <li><strong>Vintage Models:</strong> For models 5 years or older, there is a 50:50 chance for repair depending on spare parts availability.</li>
                <li><strong>Liability:</strong> While servicing, in the rare case the product becomes dead, we are not responsible for the product.</li>
              </ul>
            </div>
          </AnimatedSection>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function RField({ label, name, value, onChange, error, type = "text", placeholder }: {
  label: string; name: any; value: string; onChange: (k: any, v: string) => void;
  error?: string; type?: string; placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-muted-foreground mb-1.5">{label}</label>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(name, e.target.value)}
        className={`w-full px-3 py-2.5 rounded-xl border bg-section text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all ${error ? "border-destructive" : "border-border"}`}
      />
      {error && <p className="text-xs text-destructive mt-1">{error}</p>}
    </div>
  );
}
