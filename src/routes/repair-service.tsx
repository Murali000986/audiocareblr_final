import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import { Wrench, CheckCircle2, MessageCircle, Truck, ShieldCheck, Clock } from "lucide-react";
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

export const Route = createFileRoute("/repair-service")({
  head: () => ({
    meta: [
      { title: "Book a Speaker Repair — AudioCare" },
      { name: "description", content: "Expert speaker, amplifier and soundbar repair. Free pickup & delivery in Bengaluru. Book online in 60 seconds." },
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

    setLoading(false);
    if (error) { toast.error("Failed to submit. Please try again."); return; }
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
                Expert technicians · Genuine parts · Free pickup & delivery across Bengaluru.
              </p>
            </AnimatedSection>

            <div className="mt-8 grid sm:grid-cols-3 gap-4 max-w-2xl">
              {[
                { icon: Truck,       t: "Free Pickup",     s: "Doorstep service" },
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
                      href="https://wa.me/919876543210"
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
                        {[{ v: "pickup", l: "Free Pickup" }, { v: "drop", l: "Drop at Store" }].map((p) => (
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
