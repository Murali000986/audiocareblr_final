import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ShopBrowser } from "@/components/ShopBrowser";
import { Link } from "@tanstack/react-router";
import { categories } from "@/data/sampleData";

export const Route = createFileRoute("/shop/")({
  head: () => ({
    meta: [
      { title: "Shop Premium Speakers & Audio — AudioCare" },
      { name: "description", content: "Shop premium Bluetooth speakers, soundbars, party speakers, home theatre & accessories from JBL, Sony, Bose, boAt and more." },
      { property: "og:title", content: "Shop Premium Speakers & Audio — AudioCare" },
      { property: "og:description", content: "Browse our complete catalog of premium speakers and audio products." },
    ],
  }),
  component: ShopPage,
});

function ShopPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <header className="mb-8">
          <h1 className="font-display text-4xl lg:text-5xl font-bold">
            Shop <span className="text-gradient-orange">Speakers</span>
          </h1>
          <p className="text-muted-foreground mt-2 max-w-xl">
            Browse premium audio products from the world's best brands — curated by AudioCare.
          </p>

          {/* Category pills */}
          <div className="mt-5 flex flex-wrap gap-2">
            {categories.map((c) => (
              <Link
                key={c.slug}
                to="/shop/category/$slug"
                params={{ slug: c.slug }}
                className="text-xs font-semibold px-4 py-2 rounded-full border border-border hover:border-primary hover:text-primary transition-colors"
              >
                {c.name}
              </Link>
            ))}
          </div>
        </header>

        <ShopBrowser />
      </main>
      <Footer />
    </div>
  );
}
