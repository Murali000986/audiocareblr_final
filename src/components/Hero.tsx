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
    <section className="w-full relative overflow-hidden bg-gray-50">
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
              <div className="relative w-full h-[560px] lg:h-[680px] flex items-end pb-12 sm:pb-16 lg:pb-24">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content - Anchored bottom left */}
                <div className="relative z-10 w-full max-w-[90%] md:max-w-2xl">
                  <div className="bg-white/95 backdrop-blur-xl p-8 sm:p-10 lg:p-12 rounded-r-[2.5rem] shadow-[20px_20px_60px_-15px_rgba(0,0,0,0.3)] transform transition-all border-y border-r border-white/50">
                    {/* Tag */}
                    <div
                      className="inline-block text-white text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] px-3 py-1.5 sm:px-4 sm:py-2 rounded-full mb-4 sm:mb-6 shadow-sm"
                      style={{ backgroundColor: slide.accent }}
                    >
                      {slide.tag}
                    </div>
                    {/* Title */}
                    <h1 
                      className="font-display font-extrabold tracking-tight text-3xl sm:text-4xl lg:text-5xl uppercase leading-[1.05]"
                      style={{ color: slide.accent }}
                    >
                      {slide.title}
                    </h1>
                    {/* Subtitle */}
                    <p className="mt-4 sm:mt-6 text-sm sm:text-base text-gray-700 max-w-lg font-medium leading-relaxed">
                      {slide.subtitle}
                    </p>
                    {/* CTA */}
                    <div className="mt-6 sm:mt-8 flex flex-wrap gap-3 sm:gap-4">
                      <Link
                        to={slide.ctaLink as any}
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 sm:px-8 sm:py-4 text-white text-sm sm:text-base font-bold uppercase tracking-wider transition-all hover:brightness-110 hover:-translate-y-0.5 rounded-full shadow-md"
                        style={{ backgroundColor: slide.accent }}
                      >
                        {slide.cta} <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Slide counter */}
                <div className="absolute bottom-8 left-6 sm:left-10 z-20 flex items-center gap-3 bg-white/40 backdrop-blur-md px-4 py-3 rounded-full shadow-md">
                  {slides.map((_, i) => (
                    <div
                      key={i}
                      className="h-[4px] rounded-full transition-all duration-500"
                      style={{
                        width: i === current ? "40px" : "16px",
                        backgroundColor: i === current ? slide.accent : "rgba(0,0,0,0.3)",
                      }}
                    />
                  ))}
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation arrows */}
        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-20 h-12 w-12 border-none bg-white/60 hover:bg-white/90 text-gray-900 backdrop-blur-md rounded-full shadow-lg" />
        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-20 h-12 w-12 border-none bg-white/60 hover:bg-white/90 text-gray-900 backdrop-blur-md rounded-full shadow-lg" />
      </Carousel>
    </section>
  );
}
