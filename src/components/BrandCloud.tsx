export function BrandCloud() {
  const brands = [
    { name: "Klipsch", img: "https://logo.clearbit.com/klipsch.com" },
    { name: "Polk Audio", img: "https://logo.clearbit.com/polkaudio.com" },
    { name: "FOCAL", img: "https://logo.clearbit.com/focal.com" },
    { name: "ELAC", img: "https://logo.clearbit.com/elac.com" },
    { name: "KEF", img: "https://logo.clearbit.com/kef.com" },
    { name: "JBL", img: "https://logo.clearbit.com/jbl.com" },
    { name: "SONY", img: "https://logo.clearbit.com/sony.com" },
    { name: "BenQ", img: "https://logo.clearbit.com/benq.com" },
    { name: "Optoma", img: "https://logo.clearbit.com/optoma.com" },
    { name: "EPSON", img: "https://logo.clearbit.com/epson.com" },
    { name: "JVC", img: "https://logo.clearbit.com/jvc.com" },
    { name: "YAMAHA", img: "https://logo.clearbit.com/yamaha.com" },
    { name: "DENON", img: "https://logo.clearbit.com/denon.com" },
    { name: "Pioneer", img: "https://logo.clearbit.com/pioneer.com" },
    { name: "Marantz", img: "https://logo.clearbit.com/marantz.com" },
    { name: "MISSION", img: "https://logo.clearbit.com/mission.co.uk" },
    { name: "Jamo", img: "https://logo.clearbit.com/jamo.com" },
    { name: "REL", img: "https://logo.clearbit.com/rel.net" },
    { name: "TAGA", img: "https://logo.clearbit.com/taga-audio.com" },
    { name: "MONITOR AUDIO", img: "https://logo.clearbit.com/monitoraudio.com" },
    { name: "Q Acoustics", img: "https://logo.clearbit.com/qacoustics.co.uk" },
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
