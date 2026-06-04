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
          // Fallback: map sampleData reviews to our shape
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

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
      <AnimatedSection direction="up">
        <div className="text-center mb-12">
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
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="rounded-2xl border border-border bg-card p-5 animate-pulse h-40" />
          ))}
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {testimonials.map((r, i) => (
            <AnimatedSection key={r.id} direction="up" delay={i * 80}>
              <div className="relative rounded-2xl border border-border bg-card p-5 shadow-soft hover:border-primary hover:shadow-card transition-all h-full flex flex-col">
                {/* Quote icon */}
                <Quote className="w-6 h-6 text-primary/30 absolute top-4 right-4" />

                {/* Stars */}
                <div className="flex gap-0.5 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star
                      key={j}
                      className={`w-3.5 h-3.5 ${j < r.rating ? "fill-primary text-primary" : "text-muted-foreground/30"}`}
                    />
                  ))}
                </div>

                {/* Review text */}
                <p className="text-xs text-muted-foreground leading-relaxed flex-1 italic">
                  "{r.text}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 mt-4 pt-4 border-t border-border">
                  {r.avatar_url ? (
                    <img src={r.avatar_url} alt={r.name} className="w-9 h-9 rounded-full object-cover" />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center text-primary-foreground font-bold text-sm flex-shrink-0">
                      {r.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div>
                    <div className="font-bold text-sm">{r.name}</div>
                    {r.role && <div className="text-[10px] text-muted-foreground">{r.role}</div>}
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      )}
    </section>
  );
}
