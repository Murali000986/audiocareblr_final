import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { ArrowRight, Briefcase } from "lucide-react";
import { AnimatedSection } from "@/components/AnimatedSection";

type PortfolioItem = {
  id: string;
  title: string;
  category?: string;
  img_url: string;
  description?: string;
};

// Fallback static items in case Supabase is empty
const fallbackItems: PortfolioItem[] = [
  { id: "1", title: "JBL Speaker Restoration", category: "Repair", img_url: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=400&q=80", description: "Full driver replacement and cabinet refinishing." },
  { id: "2", title: "Vintage Turntable Fix", category: "Restoration", img_url: "https://images.unsplash.com/photo-1593697909822-90e7c0e4da3c?w=400&q=80", description: "Belt replacement and platter balancing." },
  { id: "3", title: "Soundbar Installation", category: "Installation", img_url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80", description: "Wall-mounted surround sound setup." },
];

export function OurWork({ limit }: { limit?: number }) {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let query = supabase
      .from("portfolio")
      .select("*")
      .order("created_at", { ascending: false });

    if (limit) query = query.limit(limit);

    query.then(({ data, error }) => {
      if (!error && data && data.length > 0) {
        setItems(data as PortfolioItem[]);
      } else {
        setItems(limit ? fallbackItems.slice(0, limit) : fallbackItems);
      }
      setLoading(false);
    });
  }, [limit]);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <div className="grid lg:grid-cols-[280px_1fr] gap-8 items-start">
        {/* Left: Heading */}
        <AnimatedSection direction="left">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-3">
              <Briefcase className="w-3 h-3" /> Portfolio
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-black leading-tight">
              Our <span className="text-gradient-orange">Work</span>
            </h2>
            <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
              Real repairs. Real results.<br />Every job done with care.
            </p>
            <a
              href="/our-work"
              className="inline-flex items-center gap-2 text-xs font-bold text-primary border border-primary/50 rounded-full px-4 py-2 mt-5 hover:bg-primary hover:text-primary-foreground transition-all hover:border-primary hover:shadow-glow"
            >
              View All Work <ArrowRight className="w-3 h-3" />
            </a>
          </div>
        </AnimatedSection>

        {/* Right: Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {loading
            ? [...Array(3)].map((_, i) => (
                <div key={i} className="rounded-2xl border border-border bg-card animate-pulse h-52" />
              ))
            : items.map((item, i) => (
                <AnimatedSection key={item.id} direction="up" delay={i * 80}>
                  <div className="relative rounded-2xl overflow-hidden border border-border bg-card shadow-soft group hover:border-primary hover:shadow-card transition-all">
                    <div className="relative aspect-video overflow-hidden">
                      <img
                        src={item.img_url}
                        alt={item.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {/* Category badge */}
                      {item.category && (
                        <span className="absolute top-2 left-2 bg-primary text-primary-foreground text-[10px] font-bold px-2 py-1 rounded-md">
                          {item.category}
                        </span>
                      )}
                    </div>
                    <div className="p-4">
                      <p className="font-bold text-sm">{item.title}</p>
                      {item.description && (
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{item.description}</p>
                      )}
                    </div>
                  </div>
                </AnimatedSection>
              ))}
        </div>
      </div>
    </section>
  );
}
