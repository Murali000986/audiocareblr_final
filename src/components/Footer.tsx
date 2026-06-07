import { Logo } from "./Logo";
import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Youtube, MessageCircle, Phone, Mail, MapPin, CheckCircle2 } from "lucide-react";

const WHATSAPP_NUMBER = "919876543210";

export function Footer() {
  return (
    <footer className="border-t border-border bg-section mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid md:grid-cols-2 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-1">
          <Logo />
          <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
            Your trusted audio partner.<br />Products, repair & expert service.
          </p>
          <div className="flex gap-2 mt-4">
            <a href="#" aria-label="Facebook" className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="#" aria-label="Instagram" className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="#" aria-label="YouTube" className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors">
              <Youtube className="w-4 h-4" />
            </a>
            <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:bg-[#25D366] hover:text-white hover:border-[#25D366] transition-colors">
              <MessageCircle className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-bold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {[
              { to: "/", label: "Home" },
              { to: "/shop", label: "Products" },
              { to: "/blog", label: "Blog" },
              { to: "/repair-service", label: "Repair Services" },
              { to: "/our-work", label: "Our Work" },
              { to: "/about", label: "About Us" },
              { to: "/contact", label: "Contact" },
            ].map(({ to, label }) => (
              <li key={to}>
                <Link to={to} className="hover:text-primary transition-colors">› {label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-3">Contact Us</h4>
          <ul className="space-y-2.5 text-sm text-muted-foreground">
            <li>
              <a href="tel:+919876543210" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <span>+91 98765 43210</span>
              </a>
            </li>
            <li>
              <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary transition-colors">
                <MessageCircle className="w-4 h-4 text-primary shrink-0" />
                <span>Chat on WhatsApp</span>
              </a>
            </li>
            <li>
              <a href="mailto:info@audiocare.in" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <span>info@audiocare.in</span>
              </a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" />
              <span>123, Sound Street, Near Central Mall, Koramangala, Bengaluru – 560034</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-3">Why AudioCare?</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {[
              "Expert & Certified Technicians",
              "Genuine & Original Parts",
              "Up to 3 Months Warranty",
              "Transparent Pricing",
              "Quick Turnaround Service",
            ].map((l) => (
              <li key={l} className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                {l}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-3">WhatsApp Enquiry</h4>
          <p className="text-sm text-muted-foreground mb-4">
            Interested in a product? Chat with us directly for the best price and availability.
          </p>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi AudioCare! I'd like to enquire about your products.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] text-white font-semibold px-4 py-2.5 rounded-xl hover:opacity-90 transition-opacity w-full justify-center"
          >
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
