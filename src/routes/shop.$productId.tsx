import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/data/sampleData";
import { Star, ShoppingCart, Heart, Truck, ShieldCheck, RotateCcw, ChevronRight, MessageCircle } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { toast } from "sonner";

export const Route = createFileRoute("/shop/$productId")({
  head: ({ params }) => {
    const p = products.find((x) => x.id === params.productId);
    return {
      meta: [
        { title: `${p?.name ?? "Product"} — AudioCare` },
        { name: "description", content: p?.description ?? "Shop premium speakers at AudioCare." },
        { property: "og:title", content: `${p?.name ?? "Product"} — AudioCare` },
        { property: "og:description", content: p?.description ?? "" },
        ...(p?.img ? [{ property: "og:image", content: p.img }] : []),
      ],
    };
  },
  loader: ({ params }) => {
    const product = products.find((p) => p.id === params.productId);
    if (!product) throw notFound();
    return { product };
  },
  notFoundComponent: () => (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-24 text-center">
        <h1 className="font-display text-4xl font-bold">Product Not Found</h1>
        <p className="text-muted-foreground mt-2">The product you're looking for doesn't exist.</p>
        <Link to="/shop" className="inline-block mt-6 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold">
          Back to Shop
        </Link>
      </main>
      <Footer />
    </div>
  ),
  errorComponent: ({ error, reset }) => (
    <div className="p-10 text-center">
      <p>Something went wrong: {error.message}</p>
      <button onClick={reset} className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded">Retry</button>
    </div>
  ),
  component: ProductDetailPage,
});

function ProductDetailPage() {
  const { product: p } = Route.useLoaderData();
  const [qty, setQty] = useState(1);
  const cart = useCart();
  const wish = useWishlist();
  const wished = wish.has(p.id);
  const discount = p.mrp ? Math.round(((p.mrp - p.price) / p.mrp) * 100) : 0;
  const related = products.filter((x) => x.category === p.category && x.id !== p.id).slice(0, 3);

  const addToCart = () => { cart.add(p.id, qty); toast.success(`${qty} × ${p.name} added to cart`); };
  const toggleWish = () => { wish.toggle(p.id); toast.success(wished ? "Removed from wishlist" : "Added to wishlist"); };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-6">
          <Link to="/" className="hover:text-primary">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to="/shop" className="hover:text-primary">Shop</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to="/shop/category/$slug" params={{ slug: p.category }} className="hover:text-primary">
            {p.categoryLabel}
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-foreground font-medium">{p.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Image */}
          <div className="relative rounded-3xl bg-section p-8 lg:p-12 flex items-center justify-center min-h-[400px]">
            {p.badge && (
              <span className="absolute top-4 left-4 bg-primary text-primary-foreground text-xs font-bold px-3 py-1.5 rounded-lg">
                {p.badge}
              </span>
            )}
            <img src={p.img} alt={p.name} className="max-h-[420px] object-contain drop-shadow-2xl" />
          </div>

          {/* Details */}
          <div>
            <p className="text-xs font-semibold text-primary uppercase tracking-wider">{p.brand} · {p.categoryLabel}</p>
            <h1 className="font-display text-3xl lg:text-4xl font-bold mt-2">{p.name}</h1>

            <div className="flex items-center gap-3 mt-3">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < Math.floor(p.rating) ? "fill-primary text-primary" : "text-muted-foreground/30"}`} />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">{p.rating} · {p.reviews} reviews</span>
            </div>

            <div className="mt-6 flex items-end gap-3">
              <span className="font-display text-4xl font-bold">₹{p.price.toLocaleString("en-IN")}</span>
              {p.mrp && (
                <>
                  <span className="text-lg text-muted-foreground line-through">₹{p.mrp.toLocaleString("en-IN")}</span>
                  <span className="text-sm font-semibold text-primary">{discount}% off</span>
                </>
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Inclusive of all taxes</p>

            <p className="mt-6 text-sm text-muted-foreground leading-relaxed">{p.description}</p>

            <ul className="mt-5 space-y-2">
              {p.highlights.map((h: string) => (
                <li key={h} className="flex items-start gap-2 text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  {h}
                </li>
              ))}
            </ul>

            {/* Qty + CTAs */}
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <div className="flex items-center border-2 border-border rounded-xl">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-10 h-11 hover:bg-accent">−</button>
                <span className="w-10 text-center font-semibold">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="w-10 h-11 hover:bg-accent">+</button>
              </div>
              <button
                disabled={!p.inStock}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold shadow-card hover:shadow-glow disabled:opacity-50"
              >
                <ShoppingCart className="w-4 h-4" /> Add to Cart
              </button>
              <button className="inline-flex items-center justify-center w-11 h-11 rounded-xl border-2 border-border hover:border-primary hover:text-primary">
                <Heart className="w-5 h-5" />
              </button>
              <a
                href="https://wa.me/919876543210"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#25D366] text-white font-semibold"
              >
                <MessageCircle className="w-4 h-4" /> Enquire
              </a>
            </div>

            {/* Trust badges */}
            <div className="mt-8 grid grid-cols-3 gap-3">
              {[
                { icon: Truck, t: "Free Delivery", s: "Above ₹999" },
                { icon: ShieldCheck, t: "1 Yr Warranty", s: "Genuine product" },
                { icon: RotateCcw, t: "7-Day Return", s: "Easy refund" },
              ].map((b) => (
                <div key={b.t} className="rounded-xl border border-border p-3 text-center">
                  <b.icon className="w-5 h-5 text-primary mx-auto" />
                  <div className="text-xs font-semibold mt-1.5">{b.t}</div>
                  <div className="text-[10px] text-muted-foreground">{b.s}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="font-display text-2xl font-bold mb-5">You may also like</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {related.map((r) => <ProductCard key={r.id} p={r} />)}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}
