import { Logo } from "./Logo";
import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Youtube, MessageCircle, Phone, Mail, MapPin, CheckCircle2, Send } from "lucide-react";
import { useState } from "react";

const WHATSAPP_NUMBER = "919945966499";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="relative mt-10 overflow-hidden">
      {/* Dark gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 dark:from-black dark:via-gray-950 dark:to-black" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_oklch(0.68_0.21_42_/_0.08),_transparent_60%)]" />

      <div className="relative z-10">
        {/* Newsletter banner */}
        <div className="border-b border-white/10 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-white font-display font-bold text-xl">Stay in the loop 🎵</h3>
              <p className="text-white/50 text-sm mt-1">Get exclusive deals, new arrivals & audio tips.</p>
            </div>
            <form onSubmit={handleSubscribe} className="flex gap-2 w-full sm:w-auto">
              {subscribed ? (
                <div className="flex items-center gap-2 text-green-400 font-semibold text-sm">
                  <CheckCircle2 className="w-5 h-5" /> You're subscribed!
                </div>
              ) : (
                <>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="flex-1 sm:w-64 px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 text-sm focus:outline-none focus:border-primary focus:bg-white/15 transition-all"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-white font-semibold text-sm flex items-center gap-2 transition-all hover:-translate-y-0.5 hover:shadow-glow"
                  >
                    <Send className="w-4 h-4" /> Subscribe
                  </button>
                </>
              )}
            </form>
          </div>
        </div>

        {/* Main footer grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-1">
            <div className="brightness-0 invert opacity-90">
              <Logo showText={false} />
            </div>
            <p className="text-sm text-white/50 mt-3 leading-relaxed">
              Your trusted audio partner.<br />Products, repair & expert service.
            </p>
            <div className="flex gap-2 mt-5">
              {[
                { href: "#", icon: <Facebook className="w-4 h-4" />, label: "Facebook" },
                { href: "https://www.instagram.com/audiocare_blr/", icon: <Instagram className="w-4 h-4" />, label: "Instagram" },
                { href: "#", icon: <Youtube className="w-4 h-4" />, label: "YouTube" },
                { href: `https://wa.me/${WHATSAPP_NUMBER}`, icon: <MessageCircle className="w-4 h-4" />, label: "WhatsApp", green: true },
              ].map(({ href, icon, label, green }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={`w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:scale-110 transition-all ${green ? "hover:bg-[#25D366] hover:border-[#25D366] hover:text-white" : "hover:bg-primary hover:border-primary hover:text-white"}`}
                >
                  {icon}
                </a>
              ))}
            </div>
            <div className="mt-5 space-y-1.5">
              <p className="text-[10px] font-bold uppercase tracking-widest text-white/30">Find Us On</p>
              <a href="https://www.justdial.com/Bangalore/Audio-Care-Opposite-Tas-Solution-Koramangala/080PXX80-XX80-140512201519-T5N8_BZDET" target="_blank" rel="noopener noreferrer" className="text-xs text-white/50 hover:text-primary transition-colors block">› JustDial</a>
              <a href="https://www.indiamart.com/company/197264085/" target="_blank" rel="noopener noreferrer" className="text-xs text-white/50 hover:text-primary transition-colors block">› IndiaMart</a>
              <a href="https://www.instagram.com/audiocare_blr/" target="_blank" rel="noopener noreferrer" className="text-xs text-white/50 hover:text-primary transition-colors block">› Instagram</a>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2.5 text-sm text-white/50">
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
            <h4 className="font-bold mb-4 text-white">Contact Us</h4>
            <ul className="space-y-3 text-sm text-white/50">
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
                    <span className="font-semibold block text-white/70">AUDIOCARE (Koramangala)</span>
                    Bengaluru
                  </a>
                  <a href="https://maps.app.goo.gl/ZUKo8JVv9Zaa5YCA6?g_st=awb" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                    <span className="font-semibold block text-white/70">AUDIOCARE UNIT2 (Nagarabhavi)</span>
                    Bengaluru (Service Center)
                  </a>
                </div>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-white">Why AudioCare?</h4>
            <ul className="space-y-2.5 text-sm text-white/50">
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
            <h4 className="font-bold mb-4 text-white">Service Areas</h4>
            <ul className="space-y-2.5 text-sm text-white/50">
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

        {/* Bottom bar */}
        <div className="border-t border-white/10 py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row justify-between items-center text-xs text-white/30 gap-3">
            <div>© 2026 AudioCare. All rights reserved.</div>
            <div>
              <a href="https://baskgrowth.xyz/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors hover:underline">
                Powered by BASK
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
