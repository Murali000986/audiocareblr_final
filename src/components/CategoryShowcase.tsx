import { Link } from "@tanstack/react-router";
import { AnimatedSection } from "@/components/AnimatedSection";
import bluetooth from "@/assets/prod-bluetooth.jpg";
import party from "@/assets/prod-party.jpg";
import soundbar from "@/assets/prod-soundbar.jpg";
import hometheatre from "@/assets/prod-hometheatre.jpg";

const showcases = [
  {
    slug: "bluetooth",
    title: "Bluetooth Speakers",
    tagline: "Take the Party Anywhere",
    desc: "Portable, powerful, and built to last. Our bluetooth speakers deliver studio-quality sound wherever you go — beach, backyard, or beyond.",
    img: bluetooth,
    accent: "from-orange-500/30",
    cta: "Shop Bluetooth",
    dir: "left" as const,
  },
  {
    slug: "party",
    title: "Party Speakers",
    tagline: "Make Every Night Unforgettable",
    desc: "Built for massive volume, deep bass, and LED light shows. Party speakers that turn any space into a festival.",
    img: party,
    accent: "from-red-500/20",
    cta: "Shop Party",
    dir: "right" as const,
  },
  {
    slug: "soundbar",
    title: "Soundbars",
    tagline: "Cinema Sound at Home",
    desc: "Transform your living room into a theatre. Dolby Atmos, DTS:X, and ultra-wide sound stages for the ultimate movie experience.",
    img: soundbar,
    accent: "from-blue-500/20",
    cta: "Shop Soundbars",
    dir: "left" as const,
  },
  {
    slug: "home-theatre",
    title: "Home Theatre",
    tagline: "Feel Every Explosion",
    desc: "Immersive surround sound that puts you at the centre of the action. True 5.1 and 7.1 systems from the world's top brands.",
    img: hometheatre,
    accent: "from-purple-500/20",
    cta: "Shop Home Theatre",
    dir: "right" as const,
  },
];

export function CategoryShowcase() {
  return (
    <section className="py-4 overflow-hidden">
      {showcases.map((item, i) => {
        const reversed = i % 2 !== 0;
        return (
          <div key={item.slug} className="relative min-h-[420px] sm:min-h-[500px] flex items-center overflow-hidden group border-b border-border last:border-0">
            {/* BG image with dark overlay */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-[1.2s] group-hover:scale-105"
              style={{ backgroundImage: `url(${item.img})` }}
            />
            <div className={`absolute inset-0 bg-gradient-to-r ${item.accent} to-background/95`} />
            <div className="absolute inset-0 bg-background/60" />

            <div className={`relative max-w-7xl mx-auto px-4 sm:px-6 w-full grid lg:grid-cols-2 gap-8 items-center py-16`}>
              {/* Text side */}
              <AnimatedSection
                direction={reversed ? "right" : "left"}
                delay={100}
                className={reversed ? "lg:order-2" : ""}
              >
                <p className="text-primary font-bold text-xs tracking-[0.25em] uppercase mb-3">
                  AudioCare Collection
                </p>
                <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl leading-[1.0] text-white">
                  {item.title}
                </h2>
                <p className="mt-2 text-xl font-semibold text-gradient-orange">{item.tagline}</p>
                <p className="mt-4 text-muted-foreground text-base max-w-md leading-relaxed">{item.desc}</p>
                <Link
                  to="/shop/category/$slug"
                  params={{ slug: item.slug }}
                  className="mt-8 inline-flex items-center gap-2 px-8 py-3.5 bg-primary text-primary-foreground rounded-xl font-bold hover:shadow-glow hover:-translate-y-0.5 transition-all duration-300 btn-press"
                >
                  {item.cta}
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
                </Link>
              </AnimatedSection>

              {/* Image side (floating) */}
              <AnimatedSection
                direction={reversed ? "left" : "right"}
                delay={200}
                className={`flex items-center justify-center ${reversed ? "lg:order-1" : ""}`}
              >
                <div className="relative w-72 h-72 sm:w-96 sm:h-96">
                  <div className="absolute inset-0 rounded-full bg-primary/10 blur-3xl" />
                  <img
                    src={item.img}
                    alt={item.title}
                    className="relative z-10 w-full h-full object-contain drop-shadow-2xl animate-float group-hover:scale-105 transition-transform duration-700"
                    style={{ filter: "drop-shadow(0 30px 60px rgba(255,80,0,0.4))" }}
                  />
                </div>
              </AnimatedSection>
            </div>
          </div>
        );
      })}
    </section>
  );
}
