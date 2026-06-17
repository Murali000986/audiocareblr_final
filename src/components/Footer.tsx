import { Logo } from "./Logo";
import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Youtube, MessageCircle, Phone, Mail, MapPin, CheckCircle2 } from "lucide-react";

const WHATSAPP_NUMBER = "919945966499";

export function Footer() {
  return (
    <footer className="border-t border-border bg-section mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid md:grid-cols-2 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-1">
          <Logo showText={false} />
          <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
            Your trusted audio partner.<br />Products, repair & expert service.
          </p>
          <div className="flex gap-2 mt-4">
            <a href="#" aria-label="Facebook" className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="https://www.instagram.com/audiocare_blr/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="#" aria-label="YouTube" className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors">
              <Youtube className="w-4 h-4" />
            </a>
            <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:bg-[#25D366] hover:text-white hover:border-[#25D366] transition-colors">
              <MessageCircle className="w-4 h-4" />
            </a>
          </div>
          {/* Business Listings */}
          <div className="mt-5 space-y-1.5">
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Find Us On</p>
            <a href="https://www.justdial.com/Bangalore/Audio-Care-Opposite-Tas-Solution-Koramangala/080PXX80-XX80-140512201519-T5N8_BZDET" target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground hover:text-primary transition-colors block">› JustDial</a>
            <a href="https://www.indiamart.com/company/197264085/" target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground hover:text-primary transition-colors block">› IndiaMart</a>
            <a href="https://www.instagram.com/audiocare_blr/" target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground hover:text-primary transition-colors block">› Instagram</a>
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
              <a href="tel:+919945966499" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <span>+91 99459 66499</span>
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
              <div className="flex flex-col gap-3">
                <a href="https://maps.app.goo.gl/A5eJPPQdYyxD6g797?g_st" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  <span className="font-semibold block text-foreground">AUDIOCARE (Koramangala)</span>
                  Bengaluru
                </a>
                <a href="https://maps.app.goo.gl/ZUKo8JVv9Zaa5YCA6?g_st=awb" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  <span className="font-semibold block text-foreground">AUDIOCARE UNIT2 (Nagarabhavi)</span>
                  Bengaluru (Service Center)
                </a>
              </div>
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
          <h4 className="font-bold mb-3">Service Areas</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {[
              { to: "/areas/indiranagar",  label: "Indiranagar" },
              { to: "/areas/koramangala",  label: "Koramangala" },
              { to: "/areas/jayanagar",    label: "Jayanagar" },
              { to: "/areas/whitefield",   label: "Whitefield" },
              { to: "/areas/malleshwaram", label: "Malleshwaram" },
              { to: "/areas/nagarabhavi",  label: "Nagarabhavi" },
            ].map(({ to, label }) => (
              <li key={to}>
                <Link to={to} className="hover:text-primary transition-colors">› {label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-border py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row justify-between items-center text-xs text-muted-foreground gap-3">
          <div>
            © 2026 AudioCare. All rights reserved.
          </div>
          <div>
            <a href="https://baskgrowth.xyz/" target="_blank" rel="noopener noreferrer" className="font-medium hover:text-primary transition-colors hover:underline">Powered by BASK</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
