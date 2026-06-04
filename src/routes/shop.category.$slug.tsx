import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ShopBrowser } from "@/components/ShopBrowser";
import { categories } from "@/data/sampleData";
import { ChevronRight } from "lucide-react";

export const Route = createFileRoute("/shop/category/$slug")({
  head: ({ params }) => {
    const c = categories.find((x) => x.slug === params.slug);
    return {
      meta: [
        { title: `${c?.name ?? "Category"} — AudioCare` },
        { name: "description", content: `Shop premium ${c?.name ?? "audio"} at AudioCare with the best brands and prices.` },
        { property: "og:title", content: `${c?.name ?? "Category"} — AudioCare` },
        { property: "og:description", content: `Shop premium ${c?.name ?? "audio products"} at AudioCare.` },
      ],
    };
  },
  loader: ({ params }) => {
    const category = categories.find((c) => c.slug === params.slug);
    if (!category) throw notFound();
    return { category };
  },
  notFoundComponent: () => (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-24 text-center">
        <h1 className="font-display text-4xl font-bold">Category Not Found</h1>
        <Link to="/shop" className="inline-block mt-6 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold">
          Back to Shop
        </Link>
      </main>
      <Footer />
    </div>
  ),
  errorComponent: ({ error, reset }) => (
    <div className="p-10 text-center">
      <p>Error: {error.message}</p>
      <button onClick={reset} className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded">Retry</button>
    </div>
  ),
  component: CategoryPage,
});

function CategoryPage() {
  const { category } = Route.useLoaderData() as any;
  const { slug } = Route.useParams();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-4">
          <Link to="/" className="hover:text-primary">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to="/shop" className="hover:text-primary">Shop</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-foreground font-medium">{category.name}</span>
        </nav>

        <header className="mb-8 flex items-center gap-4">
          <img src={category.img} alt={category.name} className="w-20 h-20 object-contain hidden sm:block" />
          <div>
            <h1 className="font-display text-4xl font-bold">
              <span className="text-gradient-orange">{category.name}</span>
            </h1>
            <p className="text-muted-foreground mt-1">Premium {category.name.toLowerCase()} — handpicked by AudioCare.</p>
          </div>
        </header>

        <ShopBrowser key={slug} initialCategory={slug} />
      </main>
      <Footer />
    </div>
  );
}
