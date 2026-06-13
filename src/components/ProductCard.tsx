import { Star, MessageCircle, Heart } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useState, useRef } from "react";
import type { Product } from "@/data/sampleData";

const WHATSAPP_NUMBER = "919945966499";

export function ProductCard({ p }: { p: Product }) {
  const discount = p.mrp ? Math.round(((p.mrp - p.price) / p.mrp) * 100) : 0;
  const [liked, setLiked] = useState(false);
  const cardRef = useRef<HTMLElement>(null);

  const onWhatsApp = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const msg = encodeURIComponent(
      `Hi AudioCare! I'm interested in *${p.name}*. Can you share more details and pricing?`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank");
  };

  const onMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    card.style.boxShadow = "0 20px 40px -12px rgba(0,0,0,0.18)";
  };

  const onMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0)";
    card.style.boxShadow = "";
  };

  return (
    <article
      ref={cardRef}
      className="rounded-2xl border border-border bg-card shadow-soft group relative flex flex-col overflow-hidden"
      style={{ transition: "transform 0.15s ease, box-shadow 0.3s ease" }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {/* Badge ribbon */}
      {p.badge && (
        <span className="absolute top-3 left-3 z-10 bg-gradient-to-r from-primary to-orange-400 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-md">
          {p.badge}
        </span>
      )}

      {/* Discount badge */}
      {discount > 0 && (
        <span className="absolute top-3 right-10 z-10 bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded-full">
          {discount}% OFF
        </span>
      )}

      {/* Wishlist */}
      <button
        onClick={(e) => { e.preventDefault(); setLiked(!liked); }}
        className="absolute top-3 right-3 z-10 w-7 h-7 rounded-full bg-white/80 dark:bg-card/80 backdrop-blur flex items-center justify-center shadow transition-transform active:scale-90"
        aria-label="Wishlist"
      >
        <Heart className={`w-3.5 h-3.5 transition-colors ${liked ? "fill-red-500 text-red-500" : "text-muted-foreground"}`} />
      </button>

      {/* Image */}
      <Link
        to="/shop/$productId"
        params={{ productId: p.id }}
        className="aspect-[4/3] bg-section overflow-hidden flex items-center justify-center"
      >
        <img
          src={p.img}
          alt={p.name}
          loading="lazy"
          className="max-h-full object-contain group-hover:scale-110 transition-transform duration-500"
        />
      </Link>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <Link to="/shop/$productId" params={{ productId: p.id }}>
          <h3 className="font-bold text-sm hover:text-primary transition-colors line-clamp-1">{p.name}</h3>
        </Link>
        <p className="text-xs text-muted-foreground mt-0.5">{p.categoryLabel} · {p.brand}</p>

        {/* Stars */}
        <div className="flex items-center gap-1 mt-1.5">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-3 h-3 ${i < Math.floor(p.rating) ? "fill-amber-400 text-amber-400" : "text-muted-foreground/30"}`}
            />
          ))}
          <span className="text-[10px] text-muted-foreground ml-1">({p.reviews})</span>
        </div>

        {/* Price + CTA */}
        <div className="mt-3 flex items-end justify-between gap-2">
          <div>
            <div className="font-display font-bold text-lg leading-none text-primary">
              ₹{p.price.toLocaleString("en-IN")}
            </div>
            {p.mrp && (
              <div className="text-[11px] text-muted-foreground line-through mt-0.5">
                ₹{p.mrp.toLocaleString("en-IN")}
              </div>
            )}
          </div>
          <button
            onClick={onWhatsApp}
            className="inline-flex items-center gap-1.5 text-xs font-semibold bg-[#25D366] hover:bg-[#1ebe5d] text-white px-3 py-2 rounded-xl transition-all hover:shadow-lg hover:-translate-y-0.5 active:scale-95"
          >
            <MessageCircle className="w-3.5 h-3.5" /> Enquire
          </button>
        </div>
      </div>
    </article>
  );
}
