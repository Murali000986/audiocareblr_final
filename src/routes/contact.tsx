import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Phone, Mail, MapPin, MessageCircle, CheckCircle2 } from "lucide-react";

const schema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(120),
  phone: z.string().trim().regex(/^\+?[0-9 -]{10,15}$/, "Enter a valid phone"),
  subject: z.string().trim().min(2).max(120),
  message: z.string().trim().min(10).max(1000),
});

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact AudioCare — Speaker Repair & Sales" },
      { name: "description", content: "Get in touch with AudioCare in Bengaluru — call, WhatsApp, email or visit our store in Koramangala." },
      { property: "og:title", content: "Contact AudioCare — Speaker Repair & Sales" },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);
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
    setSent(true);
    toast.success("Message sent — we'll reply within 24 hours");
    setForm({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <h1 className="font-display text-4xl lg:text-5xl font-bold">
          Get in <span className="text-gradient-orange">Touch</span>
        </h1>
        <p className="text-muted-foreground mt-2 max-w-xl">
          Have a question, a repair enquiry or a bulk order? We'd love to hear from you.
        </p>

        <div className="mt-10 grid lg:grid-cols-[1fr_400px] gap-8">
          <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-card">
            {sent ? (
              <div className="text-center py-10">
                <CheckCircle2 className="w-12 h-12 text-primary mx-auto" />
                <h2 className="mt-3 font-display text-2xl font-bold">Message Sent!</h2>
                <p className="mt-1 text-muted-foreground">We'll get back to you within 24 hours.</p>
                <button onClick={() => setSent(false)} className="mt-5 px-5 py-2.5 rounded-xl border-2 border-border text-sm font-semibold">
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <CField label="Full Name" name="name" value={form.name} onChange={update} error={errors.name} />
                  <CField label="Email" name="email" value={form.email} onChange={update} error={errors.email} type="email" />
                  <CField label="Phone" name="phone" value={form.phone} onChange={update} error={errors.phone} placeholder="+91 98765 43210" />
                  <CField label="Subject" name="subject" value={form.subject} onChange={update} error={errors.subject} />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1.5">Message</label>
                  <textarea
                    value={form.message}
                    onChange={(e) => update("message", e.target.value)}
                    rows={5}
                    maxLength={1000}
                    className={`w-full px-3 py-2.5 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary ${errors.message ? "border-destructive" : "border-border"}`}
                  />
                  {errors.message && <p className="text-xs text-destructive mt-1">{errors.message}</p>}
                </div>
                <button type="submit" className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold shadow-card hover:shadow-glow">
                  Send Message
                </button>
              </form>
            )}
          </div>

          <aside className="space-y-3">
            {[
              { Icon: Phone, t: "Call Us", s: "+91 98765 43210", href: "tel:+919876543210" },
              { Icon: MessageCircle, t: "WhatsApp", s: "Chat 9 AM – 9 PM", href: "https://wa.me/919876543210" },
              { Icon: Mail, t: "Email", s: "info@audiocare.in", href: "mailto:info@audiocare.in" },
              { Icon: MapPin, t: "Visit Store", s: "Koramangala, Bengaluru – 560034", href: "#" },
            ].map((c) => (
              <a key={c.t} href={c.href} className="flex items-start gap-3 p-4 rounded-2xl border border-border bg-card hover:border-primary transition-colors">
                <div className="w-10 h-10 rounded-xl bg-accent text-primary flex items-center justify-center shrink-0">
                  <c.Icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-semibold text-sm">{c.t}</div>
                  <div className="text-xs text-muted-foreground">{c.s}</div>
                </div>
              </a>
            ))}
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function CField({ label, name, value, onChange, error, type = "text", placeholder }: { label: string; name: any; value: string; onChange: (k: any, v: string) => void; error?: string; type?: string; placeholder?: string }) {
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
