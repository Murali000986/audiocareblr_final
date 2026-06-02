import { Logo } from "./Logo";
import { Facebook, Instagram, Youtube, MessageCircle, Phone, Mail, MapPin, CheckCircle2 } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-section mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid md:grid-cols-2 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-1">
          <Logo />
          <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
            Buy the best. Repair with trust.<br />Upgrade your sound experience.
          </p>
          <div className="flex gap-2 mt-4">
            {[Facebook, Instagram, Youtube, MessageCircle].map((Icon, i) => (
              <a key={i} href="#" className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors">
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-bold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {["Home", "Shop", "Repair Services", "Our Work", "Sound Experience", "Reviews", "Contact"].map((l) => (
              <li key={l}><a href="#" className="hover:text-primary transition-colors">› {l}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-3">Contact Us</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2"><Phone className="w-4 h-4 text-primary" /> +91 98765 43210</li>
            <li className="flex items-center gap-2"><MessageCircle className="w-4 h-4 text-primary" /> Chat on WhatsApp</li>
            <li className="flex items-center gap-2"><Mail className="w-4 h-4 text-primary" /> info@audiocare.in</li>
            <li className="flex items-start gap-2"><MapPin className="w-4 h-4 text-primary mt-0.5" /> 123, Sound Street, Near Central Mall, Koramangala, Bengaluru – 560034</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-3">Why Choose AudioCare?</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {["Expert & Certified Technicians", "Genuine & 100% Original Parts", "Up to 3 Months Warranty", "Transparent Pricing", "Quick Service & Fast Approach"].map((l) => (
              <li key={l} className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />{l}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-3">WhatsApp Enquiry</h4>
          <p className="text-sm text-muted-foreground mb-3">Have a question? Chat with us on WhatsApp for quick support.</p>
          <a href="#" className="inline-flex items-center gap-2 bg-[#25D366] text-white font-semibold px-4 py-2.5 rounded-xl hover:opacity-90 transition-opacity w-full justify-center">
            <MessageCircle className="w-4 h-4" /> Chat on WhatsApp
          </a>
        </div>
      </div>
      <div className="border-t border-border py-4 text-center text-xs text-muted-foreground">
        © 2026 AudioCare. All rights reserved.
      </div>
    </footer>
  );
}
