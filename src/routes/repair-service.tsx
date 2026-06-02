import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { RepairServices } from "@/components/RepairServices";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Wrench, CheckCircle2, MessageCircle, Truck, ShieldCheck, Clock } from "lucide-react";

const schema = z.object({
  name: z.string().trim().min(2, "Name is required").max(80),
  phone: z.string().trim().regex(/^\+?[0-9 -]{10,15}$/, "Enter a valid phone"),
  email: z.string().trim().email("Enter a valid email").max(120),
  device: z.string().trim().min(2, "Tell us the device").max(80),
  brand: z.string().trim().min(2).max(40),
  issue: z.string().trim().min(10, "Describe the issue (min 10 chars)").max(500),
  pickup: z.enum(["pickup", "drop"]),
  date: z.string().min(1, "Pick a date"),
});

export const Route = createFileRoute("/repair-service")({
  head: () => ({
    meta: [
      { title: "Book a Speaker Repair — AudioCare" },
      { name: "description", content: "Expert speaker, amplifier and soundbar repair. Free pickup & delivery in Bengaluru. Book online in 60 seconds." },
      { property: "og:title", content: "Book a Speaker Repair — AudioCare" },
      { property: "og:description", content: "Expert repair, genuine parts, up to 3 months warranty." },
    ],
  }),
  component: RepairPage,
});

function RepairPage() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", device: "", brand: "", issue: "", pickup: "pickup" as const, date: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState<string | null>(null);
  const update = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const r = schema.safeParse(form);
    if (!r.success) {
      const errs: Record<string, string> = {};
      r.error.issues.forEach((i) => { if (i.path[0]) errs[i.path[0] as string] = i.message; });
      setErrors(errs);
      toast.error("Please fix the errors");
      return;
    }
    setErrors({});
    const bookingId = "RP" + Date.now().toString().slice(-7);
    toast.success("Repair request submitted!");
    setDone(bookingId);
    setForm({ name: "", phone: "", email: "", device: "", brand: "", issue: "", pickup: "pickup", date: "" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent text-primary text-xs font-semibold">
            <Wrench className="w-3.5 h-3.5" /> Expert Repair Service
          </div>
          <h1 className="font-display text-4xl lg:text-5xl font-bold mt-3">
            Book a <span className="text-gradient-orange">Repair</span>
          </h1>
          <p className="text-muted-foreground mt-2 max-w-xl">
            Expert technicians. Genuine parts. Free pickup & delivery across Bengaluru.
          </p>

          <div className="mt-6 grid sm:grid-cols-3 gap-3 max-w-3xl">
            {[
              { icon: Truck, t: "Free Pickup", s: "Doorstep service" },
              { icon: ShieldCheck, t: "3-Month Warranty", s: "On all repairs" },
              { icon: Clock, t: "48-Hr Turnaround", s: "Fast service" },
            ].map((b) => (
              <div key={b.t} className="rounded-xl border border-border p-3 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-accent text-primary flex items-center justify-center">
                  <b.icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-semibold text-sm">{b.t}</div>
                  <div className="text-xs text-muted-foreground">{b.s}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <RepairServices />

        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
          <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-card">
            {done ? (
              <div className="text-center py-10">
                <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <h2 className="mt-4 font-display text-2xl font-bold">Booking Confirmed!</h2>
                <p className="mt-1 text-muted-foreground">Our team will call you within 2 hours to confirm pickup.</p>
                <div className="mt-5 inline-block rounded-xl border border-border px-5 py-3">
                  <div className="text-xs text-muted-foreground">Booking ID</div>
                  <div className="font-display font-bold text-lg">#{done}</div>
                </div>
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  <button onClick={() => setDone(null)} className="px-5 py-2.5 rounded-xl border-2 border-border font-semibold text-sm">
                    Book Another
                  </button>
                  <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#25D366] text-white font-semibold text-sm">
                    <MessageCircle className="w-4 h-4" /> Chat with us
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-5">
                <h2 className="font-display text-2xl font-bold">Tell us about your device</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <RField label="Full Name" name="name" value={form.name} onChange={update} error={errors.name} />
                  <RField label="Phone" name="phone" value={form.phone} onChange={update} error={errors.phone} placeholder="+91 98765 43210" />
                  <RField label="Email" name="email" value={form.email} onChange={update} error={errors.email} type="email" />
                  <RField label="Brand" name="brand" value={form.brand} onChange={update} error={errors.brand} placeholder="JBL, Sony, Bose…" />
                  <div className="sm:col-span-2">
                    <RField label="Device / Model" name="device" value={form.device} onChange={update} error={errors.device} placeholder="e.g. JBL PartyBox 710" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold mb-1.5">Describe the issue</label>
                    <textarea
                      value={form.issue}
                      onChange={(e) => update("issue", e.target.value)}
                      rows={4}
                      maxLength={500}
                      placeholder="No sound from left channel, distortion at high volume…"
                      className={`w-full px-3 py-2.5 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary ${errors.issue ? "border-destructive" : "border-border"}`}
                    />
                    {errors.issue && <p className="text-xs text-destructive mt-1">{errors.issue}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1.5">Service Mode</label>
                    <div className="grid grid-cols-2 gap-2">
                      {[{ v: "pickup", l: "Free Pickup" }, { v: "drop", l: "Drop at Store" }].map((p) => (
                        <label key={p.v} className={`cursor-pointer text-center text-sm font-semibold py-2.5 rounded-lg border-2 ${form.pickup === p.v ? "border-primary bg-accent/40 text-primary" : "border-border"}`}>
                          <input type="radio" value={p.v} checked={form.pickup === p.v} onChange={(e) => update("pickup", e.target.value)} className="sr-only" />
                          {p.l}
                        </label>
                      ))}
                    </div>
                  </div>
                  <RField label="Preferred Date" name="date" value={form.date} onChange={update} error={errors.date} type="date" />
                </div>

                <button type="submit" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold shadow-card hover:shadow-glow">
                  <Wrench className="w-4 h-4" /> Submit Repair Request
                </button>
                <p className="text-[11px] text-muted-foreground">
                  By submitting, you agree to be contacted by AudioCare on the phone/email provided.
                </p>
              </form>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function RField({ label, name, value, onChange, error, type = "text", placeholder }: { label: string; name: any; value: string; onChange: (k: any, v: string) => void; error?: string; type?: string; placeholder?: string }) {
  return (
    <div>
      <label className="block text-xs font-semibold mb-1.5">{label}</label>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(name, e.target.value)}
        className={`w-full px-3 py-2.5 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary ${error ? "border-destructive" : "border-border"}`}
      />
      {error && <p className="text-xs text-destructive mt-1">{error}</p>}
    </div>
  );
}
