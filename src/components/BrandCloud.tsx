export function BrandCloud() {
  const brands: Array<{ name: string; img?: string; text?: string; textStyle?: string }> = [
    { name: "Klipsch",       img: "/logos/klipsch.svg" },
    { name: "Polk Audio",    img: "/logos/polkaudio.svg" },
    { name: "FOCAL",         img: "/logos/focal.svg" },
    { name: "ELAC",          img: "/logos/elac.svg" },
    { name: "KEF",           img: "/logos/kef.svg" },
    { name: "JBL",           img: "/logos/jbl.svg" },
    { name: "SONY",          img: "/logos/sony.svg" },
    { name: "BenQ",          img: "/logos/benq.svg" },
    { name: "EPSON",         img: "/logos/epson.svg" },
    { name: "JVC",           img: "/logos/jvc.svg" },
    { name: "YAMAHA",        img: "/logos/yamaha.svg" },
    { name: "DENON",         img: "/logos/denon.svg" },
    { name: "Pioneer",       img: "/logos/pioneer.svg" },
    { name: "Marantz",       img: "/logos/marantz.svg" },
    
    // Text-based for brands without SVGs
    { name: "Optoma",        text: "Optoma",        textStyle: "font-bold text-3xl italic tracking-tight text-red-500" },
    { name: "REL",           text: "REL",           textStyle: "font-serif font-black text-4xl tracking-widest text-blue-800 uppercase" },
    { name: "Q Acoustics",   text: "Q Acoustics",   textStyle: "font-display font-bold text-2xl tracking-tight" },
    { name: "MISSION",       text: "MISSION",       textStyle: "font-bold text-xl tracking-[0.25em] border-2 border-current px-3 py-1 uppercase" },
    { name: "jamo",          text: "jamo",          textStyle: "font-bold text-3xl tracking-tighter italic lowercase" },
    { name: "TAGA",          text: "TAGA",          textStyle: "font-serif font-black text-3xl tracking-widest uppercase" },
    { name: "MONITOR AUDIO", text: "MONITOR AUDIO", textStyle: "font-bold text-2xl tracking-tighter uppercase" },
  ];

  return (
    <section className="py-16 bg-background border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-12 text-center">
          Trusted By The Best In Audio
        </p>

        <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-10">
          {brands.map((brand) => (
            <div
              key={brand.name}
              className="grayscale opacity-60 hover:grayscale-0 hover:opacity-100 hover:scale-110 transition-all duration-300 cursor-default select-none flex items-center justify-center"
              title={brand.name}
            >
              {brand.img ? (
                <img
                  src={brand.img}
                  alt={brand.name}
                  className="h-10 w-auto max-w-[130px] object-contain dark:brightness-200 dark:contrast-200"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    const el = e.currentTarget.nextElementSibling as HTMLElement;
                    if (el) el.style.display = "block";
                  }}
                />
              ) : null}
              <span
                style={{ display: brand.img ? "none" : "block" }}
                className={`text-foreground/70 ${brand.textStyle ?? "font-bold text-xl uppercase tracking-widest"}`}
              >
                {brand.text ?? brand.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
