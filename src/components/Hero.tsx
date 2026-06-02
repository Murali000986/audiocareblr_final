import { ShoppingCart, Wrench, ShieldCheck, Settings2, Truck, Play, Pause } from "lucide-react";
import speakerVideo from "@/assets/speaker.webm.asset.json";
import { Link } from "@tanstack/react-router";
import { useRef, useState } from "react";

export function Hero() {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio("https://cdn.pixabay.com/audio/2022/10/25/audio_8b1e1bd2e6.mp3");
      audioRef.current.loop = true;
      audioRef.current.volume = 0.5;
    }
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play().catch(() => {});
      setPlaying(true);
    }
  };

  return (
    <section className="relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "var(--gradient-hero-light)" }}
      />
      <div className="dark:block hidden absolute inset-0 pointer-events-none" style={{ background: "var(--gradient-hero-dark)" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-16 lg:pt-20 lg:pb-24 grid lg:grid-cols-2 gap-10 items-center relative">
        <div className="animate-fade-up">
          <h1 className="font-display font-extrabold tracking-tight text-5xl sm:text-6xl lg:text-7xl leading-[1.05]">
            Feel Every <span className="text-gradient-orange">Beat.</span>
          </h1>
          <p className="mt-5 text-lg sm:text-xl text-muted-foreground max-w-lg">
            Buy. Repair. Upgrade Your Sound.
          </p>
          <p className="mt-3 text-base text-muted-foreground/80 max-w-lg">
            Premium speakers, sound systems, and expert repair service — all in one place.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/shop"
              className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-primary text-primary-foreground font-semibold shadow-card hover:shadow-glow hover:-translate-y-0.5 transition-all"
            >
              <ShoppingCart className="w-5 h-5" />
              Shop Speakers
            </Link>
            <Link
              to="/repair-service"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl border-2 border-border bg-card font-semibold hover:border-primary hover:-translate-y-0.5 transition-all"
            >
              <Wrench className="w-5 h-5" />
              Book a Repair
            </Link>
          </div>

          <div className="mt-10 grid sm:grid-cols-3 gap-4 max-w-2xl">
            {[
              { icon: ShieldCheck, title: "100% Genuine", sub: "Trusted Brands. Original Quality." },
              { icon: Settings2, title: "Expert Technicians", sub: "Skilled. Certified. Reliable." },
              { icon: Truck, title: "Fast & Reliable", sub: "Quick Repairs. On Time." },
            ].map((t) => (
              <div key={t.title} className="flex items-start gap-3">
                <div className="shrink-0 w-10 h-10 rounded-xl bg-accent text-primary flex items-center justify-center">
                  <t.icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-semibold text-sm">{t.title}</div>
                  <div className="text-xs text-muted-foreground">{t.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative flex items-center justify-center min-h-[400px] lg:min-h-[520px]">
          {/* Sound waves */}
          {playing && (
            <>
              <div className="absolute top-1/2 left-0 w-1/2 h-32 -translate-y-1/2 pointer-events-none">
                <div className="absolute inset-0 border-r-4 border-primary/60 rounded-r-full animate-wave" style={{ animationDelay: "0s" }} />
                <div className="absolute inset-0 border-r-4 border-primary/40 rounded-r-full animate-wave" style={{ animationDelay: "0.4s" }} />
                <div className="absolute inset-0 border-r-4 border-primary/30 rounded-r-full animate-wave" style={{ animationDelay: "0.8s" }} />
              </div>
              <div className="absolute top-1/2 right-0 w-1/2 h-32 -translate-y-1/2 pointer-events-none">
                <div className="absolute inset-0 border-l-4 border-primary/60 rounded-l-full animate-wave" style={{ animationDelay: "0s" }} />
                <div className="absolute inset-0 border-l-4 border-primary/40 rounded-l-full animate-wave" style={{ animationDelay: "0.4s" }} />
                <div className="absolute inset-0 border-l-4 border-primary/30 rounded-l-full animate-wave" style={{ animationDelay: "0.8s" }} />
              </div>
            </>
          )}

          <video
            src={speakerVideo.url}
            autoPlay
            loop
            muted
            playsInline
            aria-label="AudioCare premium speaker"
            className={`relative z-10 max-w-full h-auto animate-float ${playing ? "animate-cone" : ""}`}
            style={{ filter: "drop-shadow(0 30px 60px rgba(255,106,0,0.45))" }}
          />

          {/* Tap to experience widget */}
          <button
            onClick={togglePlay}
            className="absolute bottom-2 right-2 lg:bottom-6 lg:right-0 z-20 flex items-center gap-3 bg-card border border-border rounded-2xl px-4 py-3 shadow-card hover:shadow-glow transition-all"
          >
            <div className="flex items-end gap-[3px] h-6 w-16">
              {[0.4, 0.7, 0.5, 0.9, 0.6, 0.8, 0.4, 0.7, 0.5, 0.9, 0.6, 0.4].map((s, i) => (
                <span
                  key={i}
                  className={`flex-1 bg-primary rounded-sm ${playing ? "animate-eq" : ""}`}
                  style={{ height: `${s * 100}%`, animationDelay: `${i * 0.07}s` }}
                />
              ))}
            </div>
            <div className="text-left">
              <div className="text-xs font-semibold">Tap to Experience Sound</div>
            </div>
            <div className="w-9 h-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center shrink-0">
              {playing ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}
