export function BrandCloud() {
  return (
    <section className="py-12 bg-white dark:bg-black border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-8">
          Trusted By The Best In Audio
        </p>
        <div className="flex flex-wrap justify-center items-center gap-12 sm:gap-20 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
          {/* Using text for brands since we don't have SVG logos, but styled heavily to look like logos */}
          <div className="font-display font-black text-3xl tracking-tighter">JBL</div>
          <div className="font-display font-bold text-2xl tracking-widest uppercase">Infinity</div>
          <div className="font-sans font-light text-xl tracking-[0.2em] uppercase">Harman/Kardon</div>
          <div className="font-display font-bold text-2xl italic tracking-tight">SONY</div>
          <div className="font-sans font-extrabold text-2xl tracking-tight uppercase">BOSE</div>
        </div>
      </div>
    </section>
  );
}
