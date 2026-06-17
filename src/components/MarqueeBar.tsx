export function MarqueeBar() {
  const items = [
    "FEEL THE BASS",
    "JBL · INFINITY · HARMAN KARDON",
    "19+ YEARS OF EXCELLENCE",
    "HOME THEATER INSTALLATION",
    "PICKUP & DELIVERY",
    "10,000+ REPAIRS DONE",
    "COMMERCIAL AUDIO AMC",
    "WONDERLA · BANGALORE CLUB · PROFX",
    "FEEL THE BASS",
    "JBL · INFINITY · HARMAN KARDON",
    "19+ YEARS OF EXCELLENCE",
    "HOME THEATER INSTALLATION",
    "PICKUP & DELIVERY",
    "10,000+ REPAIRS DONE",
    "COMMERCIAL AUDIO AMC",
    "WONDERLA · BANGALORE CLUB · PROFX",
  ];

  return (
    <div className="relative overflow-hidden bg-primary py-3 select-none">
      <div className="flex animate-marquee whitespace-nowrap">
        {items.map((item, i) => (
          <span key={i} className="flex items-center gap-6 text-primary-foreground font-bold text-xs tracking-[0.2em] mx-8">
            {item}
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary-foreground/60" />
          </span>
        ))}
      </div>
    </div>
  );
}
