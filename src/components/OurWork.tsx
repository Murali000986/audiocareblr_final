import { portfolio } from "@/data/sampleData";
import { ArrowRight } from "lucide-react";

export function OurWork() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="grid lg:grid-cols-[260px_1fr] gap-6 items-start">
        <div>
          <h2 className="font-display text-3xl font-bold">Our Work</h2>
          <p className="text-sm text-muted-foreground mt-2">Real Repairs.<br />Real Results.</p>
          <a href="/our-work" className="inline-flex items-center gap-1 text-xs font-semibold text-primary border border-primary rounded-full px-3 py-1.5 mt-3 hover:bg-primary hover:text-primary-foreground transition-colors">
            View More Work <ArrowRight className="w-3 h-3" />
          </a>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {portfolio.map((p, i) => (
            <div key={i} className="relative rounded-2xl overflow-hidden border border-border bg-card shadow-soft group">
              <div className="grid grid-cols-2 relative">
                <div className="relative aspect-square overflow-hidden">
                  <img src={p.before} alt="Before" loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  <span className="absolute bottom-2 left-2 bg-foreground/80 text-background text-[10px] font-bold px-2 py-1 rounded">Before</span>
                </div>
                <div className="relative aspect-square overflow-hidden">
                  <img src={p.after} alt="After" loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  <span className="absolute bottom-2 right-2 bg-primary text-primary-foreground text-[10px] font-bold px-2 py-1 rounded">After</span>
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-glow">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
