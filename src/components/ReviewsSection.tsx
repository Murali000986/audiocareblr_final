import { reviews } from "@/data/sampleData";
import { Star } from "lucide-react";

export function ReviewsSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <h2 className="font-display text-3xl font-bold">What Our Customers Say</h2>
      <div className="w-12 h-1 bg-primary rounded mt-2 mb-6" />
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {reviews.map((r) => (
          <div key={r.name} className="rounded-2xl border border-border bg-card p-5 shadow-soft hover:border-primary transition-all">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center text-primary-foreground font-bold">
                {r.name.charAt(0)}
              </div>
              <div>
                <div className="font-bold text-sm">{r.name}</div>
                <div className="flex gap-0.5">
                  {[...Array(r.rating)].map((_, i) => <Star key={i} className="w-3 h-3 fill-primary text-primary" />)}
                </div>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-3 leading-relaxed">{r.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
