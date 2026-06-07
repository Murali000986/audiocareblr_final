import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ShopBrowser } from "@/components/ShopBrowser";
import { Link } from "@tanstack/react-router";
import { categories } from "@/data/sampleData";

export const Route = createFileRoute("/shop/")({
  validateSearch: (s: Record<string, unknown>): { q?: string } => ({ q: typeof s.q === "string" ? s.q : undefined }),
  head: () => ({
    meta: [
      { title: "Buy Speakers, Soundbars & Home Theatre in Bengaluru — AudioCare" },
      { name: "description", content: "Shop premium JBL, Sony, Bose, Yamaha speakers, soundbars, home theatre systems and audio accessories in Bengaluru. Best prices, expert advice, and professional service in Bangalore." },
      { name: "keywords", content: "buy speakers bengaluru, JBL speakers bangalore, soundbar bengaluru, home theatre price bangalore, buy audio equipment bangalore, sony speakers bengaluru, audio shop bangalore, best audio store near me" },
      { property: "og:title", content: "Buy Speakers & Home Theatre in Bengaluru — AudioCare" },
      { property: "og:description", content: "Premium JBL, Sony, Bose speakers & home theatre systems in Bengaluru. Expert advice, best prices, and reliable audio solutions in Bangalore." },
      { property: "og:url", content: "https://www.audiocareblr.com/shop" },
    ],
  }),
  component: ShopPage,
});

function ShopPage() {
  const { q } = Route.useSearch();
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <header className="mb-8">
          <h1 className="font-display text-4xl lg:text-5xl font-bold">
            Our <span className="text-gradient-orange">Products</span>
          </h1>
          <p className="text-muted-foreground mt-2 max-w-xl">
            Explore our range of premium audio products — enquire on WhatsApp for pricing and availability.
          </p>
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
        <ShopBrowser key={q} initialQuery={q} />
      </main>
      <Footer />
    </div>
  );
}
