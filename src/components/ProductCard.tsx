import { Star, ShoppingCart } from "lucide-react";
import { Link } from "@tanstack/react-router";
import type { Product } from "@/data/sampleData";

export function ProductCard({ p }: { p: Product }) {
  const discount = p.mrp ? Math.round(((p.mrp - p.price) / p.mrp) * 100) : 0;
  return (
    <article className="rounded-2xl border border-border bg-card p-4 shadow-soft hover:shadow-card hover:-translate-y-1 transition-all group relative flex flex-col">
      {p.badge && (
        <span className="absolute top-3 left-3 z-10 bg-primary text-primary-foreground text-[10px] font-bold px-2 py-1 rounded">
          {p.badge}
        </span>
      )}
      {discount > 0 && (
        <span className="absolute top-3 right-3 z-10 bg-accent text-primary text-[10px] font-bold px-2 py-1 rounded">
          {discount}% OFF
        </span>
      )}
      <Link
        to="/shop/$productId"
        params={{ productId: p.id }}
        className="aspect-[4/3] rounded-xl bg-section overflow-hidden flex items-center justify-center"
      >
        <img
          src={p.img}
          alt={p.name}
          loading="lazy"
          className="max-h-full object-contain group-hover:scale-110 transition-transform"
        />
      </Link>
      <div className="mt-3 flex flex-col flex-1">
        <Link to="/shop/$productId" params={{ productId: p.id }}>
          <h3 className="font-bold text-sm hover:text-primary transition-colors line-clamp-1">{p.name}</h3>
        </Link>
        <p className="text-xs text-muted-foreground">{p.categoryLabel} · {p.brand}</p>
        <div className="flex items-center gap-1 mt-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-3 h-3 ${i < Math.floor(p.rating) ? "fill-primary text-primary" : "text-muted-foreground/30"}`}
            />
          ))}
          <span className="text-[10px] text-muted-foreground ml-1">({p.reviews})</span>
        </div>
        <div className="mt-3 flex items-end justify-between gap-2">
          <div>
            <div className="font-display font-bold text-lg leading-none">₹{p.price.toLocaleString("en-IN")}</div>
            {p.mrp && (
              <div className="text-[11px] text-muted-foreground line-through mt-1">
                ₹{p.mrp.toLocaleString("en-IN")}
              </div>
            )}
          </div>
          <button
            disabled={!p.inStock}
            className="inline-flex items-center gap-1 text-xs font-semibold bg-primary text-primary-foreground px-3 py-2 rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ShoppingCart className="w-3 h-3" /> {p.inStock ? "Add" : "Sold Out"}
          </button>
        </div>
      </div>
    </article>
  );
}
