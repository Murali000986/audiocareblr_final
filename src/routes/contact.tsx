import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [{ title: "Contact — AudioCare" }, { name: "description", content: "Get in touch with AudioCare for sales, service and support." }] }),
  component: () => (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <h1 className="font-display text-4xl font-bold">Get in <span className="text-gradient-orange">Touch</span></h1>
        <div className="grid md:grid-cols-2 gap-6 mt-8 max-w-3xl">
          {[
            { Icon: Phone, label: "Call", value: "+91 98765 43210" },
            { Icon: MessageCircle, label: "WhatsApp", value: "Chat with us" },
            { Icon: Mail, label: "Email", value: "info@audiocare.in" },
            { Icon: MapPin, label: "Visit", value: "Koramangala, Bengaluru" },
          ].map(({ Icon, label, value }) => (
            <div key={label} className="rounded-2xl border border-border bg-card p-5 shadow-soft flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-accent text-primary flex items-center justify-center"><Icon className="w-5 h-5" /></div>
              <div><div className="text-xs text-muted-foreground">{label}</div><div className="font-semibold">{value}</div></div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  ),
});
