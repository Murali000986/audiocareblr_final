export function BrandCloud() {
  const brands: Array<{ name: string; img?: string; text?: string; textStyle?: string }> = [
    { name: "Klipsch",       img: "/logos/klipsch.png" },
    { name: "Polk Audio",    img: "/logos/polkaudio.png" },
    { name: "FOCAL",         img: "/logos/focal.png" },
    { name: "ELAC",          img: "/logos/elac.png" },
    { name: "KEF",           img: "/logos/kef.png" },
    { name: "JBL",           img: "/logos/jbl.png" },
    { name: "SONY",          img: "/logos/sony.png" },
    { name: "BenQ",          img: "/logos/benq.png" },
    { name: "Optoma",        img: "/logos/optoma.png" },
    { name: "EPSON",         img: "/logos/epson.png" },
    { name: "JVC",           img: "/logos/jvc.png" },
    { name: "YAMAHA",        img: "/logos/yamaha.png" },
    { name: "DENON",         img: "/logos/denon.png" },
    { name: "Pioneer",       img: "/logos/pioneer.png" },
    { name: "Marantz",       img: "/logos/marantz.png" },
    { name: "REL",           img: "/logos/rel.png" },
    { name: "Q Acoustics",   img: "/logos/qacoustics.png" },
    // Text-based for brands without icons
    { name: "MISSION",       text: "MISSION",       textStyle: "font-bold text-xl tracking-[0.25em] border-2 border-current px-3 py-1" },
    { name: "jamo",          text: "jamo",          textStyle: "font-bold text-2xl tracking-tight italic" },
    { name: "TAGA",          text: "TAGA",          textStyle: "font-bold text-2xl tracking-widest" },
    { name: "MONITOR AUDIO", text: "MONITOR AUDIO", textStyle: "font-bold text-base tracking-widest" },
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
