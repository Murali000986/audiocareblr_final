export function BrandCloud() {
  const brands = [
    { name: "Klipsch", img: "/logos/klipsch.png" },
    { name: "Polk Audio", img: "/logos/polkaudio.png" },
    { name: "FOCAL", img: "/logos/focal.png" },
    { name: "ELAC", img: "/logos/elac.png" },
    { name: "KEF", img: "/logos/kef.png" },
    { name: "JBL", img: "/logos/jbl.png" },
    { name: "SONY", img: "/logos/sony.png" },
    { name: "BenQ", img: "/logos/benq.png" },
    { name: "Optoma", img: "/logos/optoma.png" },
    { name: "EPSON", img: "/logos/epson.png" },
    { name: "JVC", img: "/logos/jvc.png" },
    { name: "YAMAHA", img: "/logos/yamaha.png" },
    { name: "DENON", img: "/logos/denon.png" },
    { name: "Pioneer", img: "/logos/pioneer.png" },
    { name: "Marantz", img: "/logos/marantz.png" },
    { name: "MISSION", img: "/logos/mission.png" },
    { name: "Jamo", img: "/logos/jamo.png" },
    { name: "REL", img: "/logos/rel.png" },
    { name: "TAGA", img: "/logos/taga.png" },
    { name: "MONITOR AUDIO", img: "/logos/monitoraudio.png" },
    { name: "Q Acoustics", img: "/logos/qacoustics.png" },
  ];

  // Duplicate the array to create a seamless infinite loop
  const scrollBrands = [...brands, ...brands];

  return (
    <section className="py-20 bg-background border-y border-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-16">
          Trusted By The Best In Audio
        </p>
      </div>
      
      {/* Marquee Wrapper */}
      <div className="relative w-full overflow-hidden flex group">
        <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused] items-center gap-20 px-10">
          {scrollBrands.map((brand, i) => (
            <div 
              key={`${brand.name}-${i}`} 
              className="grayscale opacity-50 hover:grayscale-0 hover:opacity-100 hover:scale-[1.15] hover:-translate-y-1 transition-all duration-300 cursor-default select-none flex items-center justify-center h-16 w-32 shrink-0"
              title={brand.name}
            >
              <img 
                src={brand.img} 
                alt={brand.name} 
                className="max-h-12 w-auto object-contain dark:brightness-200 dark:contrast-200" 
                onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextElementSibling?.classList.remove('hidden'); }}
              />
              <div className="hidden font-bold text-xl uppercase tracking-wider text-foreground whitespace-nowrap">
                {brand.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
