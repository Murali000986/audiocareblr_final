import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRef, useState, useEffect } from "react";
import bannerOld from "../audio_care_cen/audio_care_banner_1897x835.jpg";
import bannerNew from "../audio_care_cen/ChatGPT Image Jun 8, 2026, 09_07_37 PM.png";

const slides = [
  {
    id: 1,
    tag: "Musical Heritage",
    title: "CELEBRATING LEGENDARY VOICES",
    subtitle: "Experience the timeless melodies of the greatest artists. We bring classic voices to life with premium audio equipment, meticulous restoration, and unmatched sound clarity.",
    image: bannerNew,
    cta: "Explore Our Services",
    ctaLink: "/repair-service",
    accent: "#e84e1b",
  },
  {
    id: 2,
    tag: "Expert Repair Service",
    title: "WE REPAIR ALL AUDIO EQUIPMENT",
    subtitle: "Expert audio repair service in Bangalore. From JBL speaker repair to amplifier and subwoofer repair in Bangalore, we fix it all. Speaker repair near me with free pickup.",
    image: "https://images.unsplash.com/photo-1599669454699-248893623440?q=80&w=1920&auto=format&fit=crop",
    cta: "Book a Repair",
    ctaLink: "/repair-service",
    accent: "#1f5c2e",
  },
  {
    id: 3,
    tag: "Audio Care Excellence",
    title: "YOUR TRUSTED AUDIO EXPERTS",
    subtitle: "For decades, Audio Care has been the most trusted destination for audiophiles in Bangalore. From vintage restorations to modern installations, we are passionate about perfect sound.",
    image: bannerOld,
    cta: "Shop Your Feel",
    ctaLink: "/shop",
    accent: "#1a3c6e",
  },
  {
    id: 4,
    tag: "Theater & Auditorium",
    title: "PROFESSIONAL THEATER AUDIO SOLUTIONS",
    subtitle: "Complete audio-visual solutions for theaters, auditoriums, conference halls and events. Clarity that carries every word, every note.",
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1920&auto=format&fit=crop",
    cta: "Get an Enquiry",
    ctaLink: "/contact",
    accent: "#5b21b6",
  },
];

export function Hero() {
  const plugin = useRef(Autoplay({ delay: 5000, stopOnInteraction: true }));
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full relative overflow-hidden bg-black">
      <Carousel
        plugins={[plugin.current]}
        className="w-full"
        opts={{ loop: true }}
        setApi={(api) => {
          if (!api) return;
          api.on("select", () => setCurrent(api.selectedScrollSnap()));
        }}
      >
        <CarouselContent className="-ml-0">
          {slides.map((slide) => (
            <CarouselItem key={slide.id} className="pl-0 min-w-0 basis-full">
              <div className="relative w-full h-[560px] lg:h-[680px] flex items-center">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                  />
                  {/* Left-side dark gradient overlay for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
                </div>

                {/* Content */}
                <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 w-full">
                  <div className="max-w-2xl">
                    {/* Tag */}
                    <div
                      className="inline-block text-white text-xs font-bold uppercase tracking-[0.2em] px-3 py-1.5 rounded-sm mb-5"
                      style={{ backgroundColor: slide.accent }}
                    >
                      {slide.tag}
                    </div>
                    {/* Title */}
                    <h1 className="font-display font-extrabold tracking-tight text-white text-4xl sm:text-5xl lg:text-6xl uppercase leading-[1.05] [text-shadow:_0_4px_12px_rgb(0_0_0_/_0.8)]">
                      {slide.title}
                    </h1>
                    {/* Subtitle */}
                    <p className="mt-5 text-base sm:text-lg text-white/90 max-w-xl font-normal leading-relaxed [text-shadow:_0_2px_8px_rgb(0_0_0_/_0.8)]">
                      {slide.subtitle}
                    </p>
                    {/* CTA */}
                    <div className="mt-8 flex flex-wrap gap-3">
                      <Link
                        to={slide.ctaLink as any}
                        className="inline-flex items-center justify-center gap-2 px-8 py-4 text-white font-bold uppercase tracking-wider transition-all hover:brightness-110 hover:-translate-y-0.5"
                        style={{ backgroundColor: slide.accent }}
                      >
                        {slide.cta} <ArrowRight className="w-5 h-5" />
                      </Link>
                      <Link
                        to="/shop"
                        className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white/60 text-white font-bold uppercase tracking-wider hover:bg-white/10 transition-all"
                      >
                        View All Products
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Slide counter */}
                <div className="absolute bottom-8 left-6 sm:left-10 z-20 flex items-center gap-3">
                  {slides.map((_, i) => (
                    <div
                      key={i}
                      className="h-[3px] rounded-full transition-all duration-500"
                      style={{
                        width: i === current ? "40px" : "16px",
                        backgroundColor: i === current ? slide.accent : "rgba(255,255,255,0.4)",
                      }}
                    />
                  ))}
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation arrows */}
        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-20 h-12 w-12 border-none bg-white/10 hover:bg-white/25 text-white backdrop-blur-sm rounded-none" />
        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-20 h-12 w-12 border-none bg-white/10 hover:bg-white/25 text-white backdrop-blur-sm rounded-none" />
      </Carousel>
    </section>
  );
}
