import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { Star, Phone, MessageCircle, ChevronRight, ShieldCheck, Wrench, ThumbsUp } from "lucide-react";
import { useMemo } from "react";
import { useProductsCache } from "@/contexts/ProductsCacheContext";
import { supabase } from "@/lib/supabase";
import { mapSupabaseProduct } from "@/lib/productMapper";
import { products as fallbackProducts } from "@/data/sampleData";

const WHATSAPP_NUMBER = "919876543210"; // Update to your real WhatsApp number

export const Route = createFileRoute("/shop/$productId")({
  head: ({ loaderData }) => {
    const p = (loaderData as any)?.product;
    return {
      meta: [
        { title: `${p?.name ?? "Product"} — AudioCare` },
        { name: "description", content: p?.description ?? "Explore premium audio products at AudioCare." },
        { property: "og:title", content: `${p?.name ?? "Product"} — AudioCare` },
        { property: "og:description", content: p?.description ?? "" },
        ...(p?.img ? [{ property: "og:image", content: p.img }] : []),
      ],
    };
  },
  loader: async ({ params }) => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", params.productId)
      .single();

    if (!error && data) {
      return { product: mapSupabaseProduct(data as Record<string, unknown>) };
    }

    const fallback = fallbackProducts.find((p) => p.id === params.productId);
    if (!fallback) throw notFound();
    return { product: fallback };
  },
  notFoundComponent: () => (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-24 text-center">
        <h1 className="font-display text-4xl font-bold">Product Not Found</h1>
        <p className="text-muted-foreground mt-2">The product you're looking for doesn't exist.</p>
        <Link to="/shop" className="inline-block mt-6 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold">
          Back to Products
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
  const { product: p } = Route.useLoaderData() as any;
  const { products } = useProductsCache();

  const discount = p.mrp ? Math.round(((p.mrp - p.price) / p.mrp) * 100) : 0;

  const related = useMemo(() => {
    return products.filter((x) => x.category === p.category && x.id !== p.id).slice(0, 3);
  }, [products, p.category, p.id]);

  const whatsappMsg = encodeURIComponent(
    `Hi AudioCare! I'm interested in *${p.name}* (₹${p.price.toLocaleString("en-IN")}). Can you share more details?`
  );
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMsg}`;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-6">
          <Link to="/" className="hover:text-primary">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to="/shop" className="hover:text-primary">Products</Link>
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
            <p className="text-xs text-muted-foreground mt-1">Price shown is indicative — contact us for best deal</p>

            <p className="mt-6 text-sm text-muted-foreground leading-relaxed">{p.description}</p>

            {p.highlights?.length > 0 && (
              <ul className="mt-5 space-y-2">
                {p.highlights.map((h: string) => (
                  <li key={h} className="flex items-start gap-2 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                    {h}
                  </li>
                ))}
              </ul>
            )}

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl bg-[#25D366] text-white font-bold text-base shadow-lg hover:opacity-90 transition-opacity"
              >
                <MessageCircle className="w-5 h-5" />
                Enquire on WhatsApp
              </a>
              <a
                href="tel:+919876543210"
                className="flex-1 inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl border-2 border-primary text-primary font-bold text-base hover:bg-primary hover:text-primary-foreground transition-all"
              >
                <Phone className="w-5 h-5" />
                Call Us
              </a>
            </div>

            <p className="text-center text-xs text-muted-foreground mt-3">
              💬 Chat with us on WhatsApp for the best price & availability
            </p>

            {/* Trust badges */}
            <div className="mt-8 grid grid-cols-3 gap-3">
              {[
                { icon: ShieldCheck, t: "Genuine Product", s: "100% authentic" },
                { icon: Wrench, t: "Expert Support", s: "Repair & service" },
                { icon: ThumbsUp, t: "Best Price", s: "Ask us for deals" },
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

        {/* Related Products */}
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
