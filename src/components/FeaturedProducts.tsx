import { products } from "@/data/sampleData";
import { Star, ShoppingCart, ArrowRight } from "lucide-react";

export function FeaturedProducts() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="grid lg:grid-cols-[260px_1fr] gap-6 items-start">
        <div>
          <h2 className="font-display text-3xl font-bold">Featured<br />Products</h2>
          <a href="/shop" className="inline-flex items-center gap-1 text-xs font-semibold text-primary border border-primary rounded-full px-3 py-1.5 mt-3 hover:bg-primary hover:text-primary-foreground transition-colors">
            View All Products <ArrowRight className="w-3 h-3" />
          </a>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
          {products.map((p) => (
            <article key={p.id} className="rounded-2xl border border-border bg-card p-4 shadow-soft hover:shadow-card hover:-translate-y-1 transition-all group relative">
              {p.badge && (
                <span className="absolute top-3 left-3 z-10 bg-primary text-primary-foreground text-[10px] font-bold px-2 py-1 rounded">{p.badge}</span>
              )}
              <div className="aspect-[4/3] rounded-xl bg-section overflow-hidden flex items-center justify-center">
                <img src={p.img} alt={p.name} loading="lazy" className="max-h-full object-contain group-hover:scale-110 transition-transform" />
              </div>
              <div className="mt-3">
                <h3 className="font-bold text-sm">{p.name}</h3>
                <p className="text-xs text-muted-foreground">{p.category}</p>
                <div className="flex items-center gap-1 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-3 h-3 ${i < Math.floor(p.rating) ? "fill-primary text-primary" : "text-muted-foreground/30"}`} />
                  ))}
                  <span className="text-[10px] text-muted-foreground ml-1">({p.reviews})</span>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <span className="font-display font-bold text-lg">₹{p.price.toLocaleString("en-IN")}</span>
                  <button className="inline-flex items-center gap-1 text-xs font-semibold bg-primary text-primary-foreground px-3 py-1.5 rounded-lg hover:opacity-90">
                    <ShoppingCart className="w-3 h-3" /> Add to Cart
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
