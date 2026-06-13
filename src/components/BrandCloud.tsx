import { Speaker, Radio, Projector } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

export function BrandCloud() {
  const categories = [
    {
      id: "speakers",
      title: "Speakers & Subwoofers",
      icon: <Speaker className="w-5 h-5 mr-2 text-primary" />,
      brands: [
        { name: "B&W",           img: "/logos/bw.png" },
        { name: "Focal",         img: "/logos/focal.svg" },
        { name: "Kef",           img: "/logos/kef.svg" },
        { name: "Monitor Audio", img: "/logos/monitoraudio.png" },
        { name: "Klipsch",       img: "/logos/klipsch.svg" },
        { name: "Polk Audio",    img: "/logos/polkaudio.svg" },
        { name: "JBL",           img: "/logos/jbl.svg" },
        { name: "ELAC",          img: "/logos/elac.svg" },
        { name: "Q Acoustics",   img: "/logos/qacoustics.png" },
        { name: "Mission",       img: "/logos/mission.png" },
        { name: "Jamo",          text: "jamo",          textStyle: "font-bold text-3xl tracking-tighter italic lowercase text-cyan-600" },
        { name: "Dali",          img: "/logos/dali.png" },
        { name: "Sonos",         img: "/logos/sonos.png" },
        { name: "B&O",           img: "/logos/bangolufsen.png" },
        { name: "REL",           text: "REL",           textStyle: "font-serif font-black text-4xl tracking-widest text-blue-800 uppercase" },
        { name: "Wharfedale",    img: "/logos/wharfedale.png" },
        { name: "Burmester",     img: "/logos/burmester.png" },
        { name: "Tannoy",        img: "/logos/tannoy.png" },
      ]
    },
    {
      id: "amplifiers",
      title: "Amplifiers & Receivers",
      icon: <Radio className="w-5 h-5 mr-2 text-primary" />,
      brands: [
        { name: "Marantz",         img: "/logos/marantz.svg" },
        { name: "DENON",           img: "/logos/denon.svg" },
        { name: "NAD",             img: "/logos/nad.png" },
        { name: "CAMBRIDGE Audio", img: "/logos/cambridgeaudio.png" },
        { name: "Arcam",           text: "ARCAM",           textStyle: "font-bold text-2xl tracking-widest uppercase text-slate-500" },
        { name: "audiolab",        img: "/logos/audiolab.png" },
      ]
    },
    {
      id: "projectors",
      title: "Projectors & Displays",
      icon: <Projector className="w-5 h-5 mr-2 text-primary" />,
      brands: [
        { name: "Sony",          img: "/logos/sony.svg" },
        { name: "JVC",           img: "/logos/jvc.svg" },
        { name: "Optoma",        img: "/logos/optoma.png" },
        { name: "Epson",         img: "/logos/epson.svg" },
        { name: "BenQ",          img: "/logos/benq.svg" },
      ]
    }
  ];

  return (
    <section className="py-24 relative border-y border-border overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_oklch(0.68_0.21_42_/_0.03),_transparent_70%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 space-y-24">
        <div className="text-center">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-primary mb-3">
            Trusted By The Best
          </p>
          <h2 className="text-4xl font-display font-black text-foreground">
            Our Premium Brand Partners
          </h2>
        </div>

        {categories.map((category, index) => (
          <div key={category.id} className="relative w-full">
            <div className="flex items-center mb-10 pb-6 relative">
              <div className="bg-primary/10 p-3 rounded-xl mr-4 text-primary shadow-sm">
                {category.icon}
              </div>
              <h3 className="text-2xl font-bold uppercase tracking-widest text-foreground">
                {category.title}
              </h3>
              {/* Glowing divider line */}
              <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-primary via-primary-glow to-transparent opacity-50" />
              <div className="absolute bottom-[-1px] left-0 w-1/3 h-[3px] bg-primary rounded-full shadow-[0_0_15px_rgba(232,78,27,0.8)]" />
            </div>
            
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              plugins={[
                Autoplay({
                  delay: 2000,
                  stopOnInteraction: false,
                }),
              ]}
              className="w-full"
            >
              <CarouselContent className="-ml-2 md:-ml-4 items-center">
                {category.brands.map((brand, i) => (
                  <CarouselItem key={`${brand.name}-${i}`} className="pl-2 md:pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6">
                    <div className="flex h-[100px] items-center justify-center p-4 hover:scale-110 transition-all duration-500 group/brand cursor-default">
                      {brand.img ? (
                        <img
                          src={brand.img}
                          alt={brand.name}
                          className="h-16 sm:h-20 w-auto max-w-[180px] object-contain dark:brightness-200 dark:contrast-200 transition-transform duration-300 drop-shadow-sm"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                            const el = e.currentTarget.nextElementSibling as HTMLElement;
                            if (el) el.style.display = "block";
                          }}
                        />
                      ) : null}
                      <span
                        style={{ display: brand.img ? "none" : "block" }}
                        className={`text-foreground/50 group-hover/brand:text-foreground text-center transition-colors duration-500 ${brand.textStyle ?? "font-bold text-xl uppercase tracking-widest"}`}
                      >
                        {brand.text ?? brand.name}
                      </span>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        ))}
      </div>
    </section>
  );
}
