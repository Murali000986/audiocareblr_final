export function BrandCloud() {
  const brands = [
    { name: "Klipsch", img: "https://upload.wikimedia.org/wikipedia/commons/3/30/Klipsch_logo.svg", class: "font-display font-black text-2xl tracking-tighter text-foreground" },
    { name: "Polk Audio", img: "https://upload.wikimedia.org/wikipedia/commons/6/6f/Polk_Audio_logo.svg", class: "font-sans font-bold text-2xl text-red-600 tracking-tight lowercase" },
    { name: "FOCAL", img: "https://upload.wikimedia.org/wikipedia/commons/1/1a/Focal_logo.svg", class: "font-sans font-light text-3xl tracking-[0.2em] uppercase text-foreground" },
    { name: "ELAC", class: "font-display font-black text-3xl tracking-widest uppercase text-foreground" },
    { name: "KEF", img: "https://upload.wikimedia.org/wikipedia/commons/0/05/KEF_logo.svg", class: "font-display font-black text-4xl text-sky-700 tracking-tight uppercase" },
    { name: "JBL", img: "https://upload.wikimedia.org/wikipedia/commons/e/ea/JBL_logo.svg", class: "font-display font-black text-3xl bg-orange-600 text-white px-3 py-1 tracking-tighter rounded-sm" },
    { name: "SONY", img: "https://upload.wikimedia.org/wikipedia/commons/b/b3/Sony_logo.svg", class: "font-serif font-black text-4xl tracking-widest uppercase text-foreground" },
    { name: "BenQ", img: "https://upload.wikimedia.org/wikipedia/commons/7/7b/BenQ_logo.svg", class: "font-sans font-black text-3xl text-purple-700 tracking-tight" },
    { name: "Optoma", img: "https://upload.wikimedia.org/wikipedia/commons/e/e0/Optoma_logo.svg", class: "font-sans font-bold text-3xl italic tracking-tight text-red-500" },
    { name: "EPSON", img: "https://upload.wikimedia.org/wikipedia/commons/4/46/Epson_logo.svg", class: "font-display font-black text-3xl text-blue-600 tracking-widest uppercase" },
    { name: "JVC", img: "https://upload.wikimedia.org/wikipedia/commons/b/b0/JVC_logo.svg", class: "font-sans font-black text-3xl text-red-600 tracking-widest uppercase" },
    { name: "YAMAHA", img: "https://upload.wikimedia.org/wikipedia/commons/4/41/Yamaha_logo.svg", class: "font-sans font-black text-3xl text-blue-800 tracking-widest uppercase" },
    { name: "DENON", img: "https://upload.wikimedia.org/wikipedia/commons/1/15/Denon_logo.svg", class: "font-serif font-black text-3xl tracking-widest uppercase text-foreground" },
    { name: "Pioneer", img: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Pioneer_logo.svg", class: "font-sans font-black text-3xl text-red-600 italic tracking-tighter" },
    { name: "marantz", class: "font-serif font-bold text-3xl text-yellow-600 tracking-widest lowercase" },
    { name: "MISSION", class: "font-display font-bold text-2xl tracking-widest border-[3px] border-foreground px-3 py-0.5 uppercase text-foreground" },
    { name: "jamo", class: "font-sans font-bold text-3xl tracking-tighter lowercase italic text-foreground" },
    { name: "REL", class: "font-serif font-black text-4xl text-blue-800 tracking-widest uppercase" },
    { name: "TAGA", class: "font-serif font-black text-3xl tracking-widest uppercase text-foreground" },
    { name: "MONITOR AUDIO", class: "font-sans font-black text-2xl tracking-tighter uppercase text-foreground" },
    { name: "Q Acoustics", class: "font-display font-bold text-2xl tracking-tight text-foreground" },
  ];

  return (
    <section className="py-20 bg-background border-y border-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-16">
          Trusted By The Best In Audio
        </p>
        
        <div className="flex flex-wrap justify-center items-center gap-x-14 gap-y-12">
          {brands.map((brand) => (
            <div 
              key={brand.name} 
              // Grayscale by default, full color + pop out effect on hover
              className="grayscale opacity-50 hover:grayscale-0 hover:opacity-100 hover:scale-[1.15] hover:-translate-y-1 transition-all duration-300 cursor-default select-none flex items-center justify-center h-16"
              title={brand.name}
            >
              {brand.img ? (
                <img 
                  src={brand.img} 
                  alt={brand.name} 
                  className="max-h-12 max-w-[140px] object-contain dark:brightness-200 dark:contrast-200" 
                  onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextElementSibling?.classList.remove('hidden'); }}
                />
              ) : null}
              
              <div className={`${brand.class} ${brand.img ? 'hidden' : ''}`}>
                {brand.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
