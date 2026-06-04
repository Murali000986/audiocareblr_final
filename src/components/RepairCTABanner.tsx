import { Link } from "@tanstack/react-router";
import { Wrench, Clock, MapPin, Phone } from "lucide-react";

export function RepairCTABanner() {
  return (
    <section className="relative w-full overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1920&auto=format&fit=crop"
          alt="Audio Repair Service"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/80" />
        {/* Orange accent glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#e84e1b]/20 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left — text */}
          <div>
            <div className="inline-flex items-center gap-2 bg-[#e84e1b] text-white text-xs font-bold uppercase tracking-widest px-4 py-2 mb-6">
              <Wrench className="w-4 h-4" />
              Professional Repair Service
            </div>
            <h2 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white uppercase tracking-tight leading-[1.05]">
              WE FIX WHAT<br />
              <span className="text-[#e84e1b]">OTHERS CAN'T.</span>
            </h2>
            <p className="mt-5 text-white/80 text-lg leading-relaxed max-w-lg">
              Speakers, amplifiers, subwoofers, soundbars, receivers — our certified technicians repair all audio equipment with genuine parts and a service warranty.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/repair-service"
                className="inline-flex items-center gap-2 bg-[#e84e1b] hover:bg-[#c73d0f] text-white font-bold uppercase tracking-wider px-8 py-4 transition-colors"
              >
                <Wrench className="w-5 h-5" />
                Book a Repair
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 border-2 border-white/50 text-white hover:bg-white/10 font-bold uppercase tracking-wider px-8 py-4 transition-colors"
              >
                <Phone className="w-5 h-5" />
                Call Us
              </Link>
            </div>
          </div>

          {/* Right — service highlights */}
          <div className="grid grid-cols-2 gap-4">
            {[
              {
                icon: Wrench,
                title: "Speaker Repair",
                desc: "Cone replacement, voice coil, crossover repairs for all brands",
              },
              {
                icon: Wrench,
                title: "Amplifier Repair",
                desc: "Receivers, integrated amps, subwoofer modules — we fix all",
              },
              {
                icon: Clock,
                title: "Fast Turnaround",
                desc: "Most repairs completed within 24–48 hours with prior booking",
              },
              {
                icon: MapPin,
                title: "Free Doorstep Pickup",
                desc: "We pick up and deliver your equipment anywhere in the city",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="border border-white/15 bg-white/5 backdrop-blur-sm p-5 hover:border-[#e84e1b]/50 hover:bg-white/10 transition-all"
              >
                <item.icon className="w-6 h-6 text-[#e84e1b] mb-3" />
                <h3 className="text-white font-bold text-sm mb-1">{item.title}</h3>
                <p className="text-white/60 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
