import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Star, Quote } from "lucide-react";
import { reviews as fallbackReviews } from "@/data/sampleData";
import { AnimatedSection } from "@/components/AnimatedSection";

type Testimonial = {
  id: string;
  name: string;
  role?: string;
  text: string;
  rating: number;
  avatar_url?: string;
};

function ReviewCard({ r }: { r: Testimonial }) {
  return (
    <div className="relative rounded-2xl border border-border bg-card p-5 shadow-soft hover:border-primary hover:shadow-card transition-all flex flex-col w-[300px] shrink-0 mx-3">
      <Quote className="w-6 h-6 text-primary/20 absolute top-4 right-4" />
      <div className="flex gap-0.5 mb-3">
        {[...Array(5)].map((_, j) => (
          <Star
            key={j}
            className={`w-3.5 h-3.5 ${j < r.rating ? "fill-amber-400 text-amber-400" : "text-muted-foreground/30"}`}
          />
        ))}
      </div>
      <p className="text-xs text-muted-foreground leading-relaxed flex-1 italic">"{r.text}"</p>
      <div className="flex items-center gap-3 mt-4 pt-4 border-t border-border">
        {r.avatar_url ? (
          <img src={r.avatar_url} alt={r.name} className="w-9 h-9 rounded-full object-cover" />
        ) : (
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-orange-400 flex items-center justify-center text-white font-bold text-sm shrink-0">
            {r.name.charAt(0).toUpperCase()}
          </div>
        )}
        <div>
          <div className="font-bold text-sm">{r.name}</div>
          {r.role && <div className="text-[10px] text-muted-foreground">{r.role}</div>}
        </div>
      </div>
    </div>
  );
}

export function ReviewsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("testimonials")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (!error && data && data.length > 0) {
          setTestimonials(data as Testimonial[]);
        } else {
          setTestimonials(
            fallbackReviews.map((r, i) => ({
              id: String(i),
              name: r.name,
              role: "Verified Customer",
              text: r.text,
              rating: r.rating,
            }))
          );
        }
        setLoading(false);
      });
  }, []);

  // Duplicate for infinite loop
  const doubled = [...testimonials, ...testimonials];
  const half = Math.ceil(doubled.length / 2);
  const row1 = doubled.slice(0, half);
  const row2 = doubled.slice(half);

  return (
    <section className="py-16 overflow-hidden">
      <AnimatedSection direction="up">
        <div className="text-center mb-12 px-4">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-3">
            Testimonials
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-black">
            What Our <span className="text-gradient-orange">Customers Say</span>
          </h2>
          <div className="w-16 h-1 bg-primary rounded-full mt-4 mx-auto" />
        </div>
      </AnimatedSection>

      {loading ? (
        <div className="flex gap-4 px-4 overflow-hidden">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="rounded-2xl border border-border bg-card p-5 animate-pulse h-40 w-[300px] shrink-0" />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {/* Row 1 — scrolls left */}
          <div className="flex overflow-hidden">
            <div className="flex animate-marquee-reviews">
              {[...row1, ...row1].map((r, i) => (
                <ReviewCard key={`r1-${r.id}-${i}`} r={r} />
              ))}
            </div>
          </div>
          {/* Row 2 — scrolls right */}
          {row2.length > 0 && (
            <div className="flex overflow-hidden">
              <div className="flex animate-marquee-reviews-reverse">
                {[...row2, ...row2].map((r, i) => (
                  <ReviewCard key={`r2-${r.id}-${i}`} r={r} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
