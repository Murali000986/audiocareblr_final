import { Link } from "@tanstack/react-router";
import { ArrowRight, PlayCircle, Music2 } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
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
  const plugin = useRef(Autoplay({ delay: 6000, stopOnInteraction: true }));
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());
    
    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };
    
    api.on("select", onSelect);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        api.scrollPrev();
      } else if (e.key === "ArrowRight") {
        api.scrollNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      api.off("select", onSelect);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [api]);

  return (
    <section className="w-full relative overflow-hidden bg-black h-[100svh] min-h-[600px] flex items-center justify-center">
      <Carousel
        plugins={[plugin.current]}
        className="w-full h-full absolute inset-0"
        opts={{ loop: true, align: "start" }}
        setApi={setApi}
      >
        <CarouselContent className="h-full ml-0">
          {slides.map((slide, index) => {
            const isActive = current === index;
            return (
              <CarouselItem key={slide.id} className="pl-0 h-full relative">
                {/* Cinematic Background Image with Zoom Effect */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className={`w-full h-full object-cover transition-transform duration-[10000ms] ease-out ${
                      isActive ? 'scale-110' : 'scale-100'
                    }`}
                  />
                  {/* Heavy dark gradient overlay for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent z-10" />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10" />
                </div>

                {/* Content */}
                <div className="relative z-20 h-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 flex flex-col justify-center">
                  <div className={`max-w-3xl transform transition-all duration-1000 delay-300 ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
                    
                    {/* Glowing Tag */}
                    <div className="flex items-center gap-3 mb-6">
                      <span className="flex h-3 w-3 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: slide.accent }}></span>
                        <span className="relative inline-flex rounded-full h-3 w-3" style={{ backgroundColor: slide.accent }}></span>
                      </span>
                      <span 
                        className="text-xs sm:text-sm font-bold uppercase tracking-[0.3em] text-white/90 drop-shadow-md"
                        style={{ color: slide.accent, filter: "brightness(1.5)" }}
                      >
                        {slide.tag}
                      </span>
                    </div>

                    {/* Massive Title */}
                    <h1 className="font-display font-black tracking-tighter text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white leading-[1.05] drop-shadow-2xl">
                      {slide.title.split(' ').map((word, i) => (
                        <span key={i} className="inline-block mr-[0.3em]">
                          {i === slide.title.split(' ').length - 1 ? (
                            <span style={{ color: slide.accent, filter: "brightness(1.2)" }}>{word}</span>
                          ) : (
                            word
                          )}
                        </span>
                      ))}
                    </h1>

                    {/* Subtitle */}
                    <p className="mt-6 sm:mt-8 text-base sm:text-lg md:text-xl text-white/80 max-w-2xl font-medium leading-relaxed drop-shadow-md">
                      {slide.subtitle}
                    </p>

                    {/* CTAs */}
                    <div className="mt-10 flex flex-wrap items-center gap-4 sm:gap-6">
                      <Link
                        to={slide.ctaLink as any}
                        className="group relative inline-flex items-center justify-center px-8 py-4 text-white font-bold uppercase tracking-widest overflow-hidden rounded-full shadow-2xl transition-all hover:scale-105 active:scale-95"
                        style={{ backgroundColor: slide.accent }}
                      >
                        <span className="absolute inset-0 w-full h-full bg-white/20 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                        <span className="relative flex items-center gap-2">
                          {slide.cta} 
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </Link>
                      
                      <Link
                        to="/our-work"
                        className="inline-flex items-center gap-3 px-6 py-4 text-white font-bold tracking-widest uppercase hover:text-white/70 transition-colors"
                      >
                        <PlayCircle className="w-6 h-6" />
                        Watch Video
                      </Link>
                    </div>

                  </div>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>

      {/* Decorative Sound Wave SVG (Absolute Bottom) */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-20 pointer-events-none opacity-30">
        <svg className="relative block w-[calc(100%+1.3px)] h-[80px] sm:h-[120px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" fill="#FFFFFF"></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-51.24V0Z" opacity=".5" fill="#FFFFFF"></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="#FFFFFF"></path>
        </svg>
      </div>

      {/* Modern Slide Indicators */}
      <div className="absolute right-6 sm:right-12 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-4">
        {slides.map((slide, i) => (
          <button
            key={i}
            onClick={() => api?.scrollTo(i)}
            className="group relative flex items-center justify-end w-12 h-4"
            aria-label={`Go to slide ${i + 1}`}
          >
            <div 
              className={`h-[2px] transition-all duration-500 absolute right-0 ${i === current ? 'w-12' : 'w-4 group-hover:w-8 bg-white/50'}`}
              style={{ backgroundColor: i === current ? slide.accent : undefined }}
            />
          </button>
        ))}
      </div>
    </section>
  );
}
