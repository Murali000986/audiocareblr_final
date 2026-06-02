import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useWishlist } from "@/contexts/WishlistContext";
import { ProductCard } from "@/components/ProductCard";
import { Heart } from "lucide-react";

export const Route = createFileRoute("/wishlist")({
  head: () => ({ meta: [{ title: "Wishlist — AudioCare" }, { name: "description", content: "Products you saved for later." }] }),
  component: WishlistPage,
});

function WishlistPage() {
  const { detailed, clear } = useWishlist();
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex items-end justify-between flex-wrap gap-3">
          <div>
            <h1 className="font-display text-4xl font-bold">Your <span className="text-gradient-orange">Wishlist</span></h1>
            <p className="text-muted-foreground mt-1">{detailed.length} {detailed.length === 1 ? "item" : "items"} saved</p>
          </div>
          {detailed.length > 0 && (
            <button onClick={clear} className="text-xs font-semibold text-muted-foreground hover:text-destructive">Clear All</button>
          )}
        </div>

        {detailed.length === 0 ? (
          <div className="mt-12 text-center py-16 rounded-2xl border border-dashed border-border">
            <Heart className="w-12 h-12 text-muted-foreground/40 mx-auto" />
            <p className="mt-4 text-muted-foreground">No wishlist items yet</p>
            <Link to="/shop" className="inline-block mt-4 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold">
              Browse Shop
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {detailed.map((p) => <ProductCard key={p.id} p={p} />)}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
