import { products } from "@/data/sampleData";
import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { ProductCard } from "./ProductCard";

export function FeaturedProducts() {
  const featured = products.slice(0, 6);
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="grid lg:grid-cols-[260px_1fr] gap-6 items-start">
        <div>
          <h2 className="font-display text-3xl font-bold">Featured<br />Products</h2>
          <Link to="/shop" className="inline-flex items-center gap-1 text-xs font-semibold text-primary border border-primary rounded-full px-3 py-1.5 mt-3 hover:bg-primary hover:text-primary-foreground transition-colors">
            View All Products <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {featured.map((p) => <ProductCard key={p.id} p={p} />)}
        </div>
      </div>
    </section>
  );
}
