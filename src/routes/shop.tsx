import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FeaturedProducts } from "@/components/FeaturedProducts";

export const Route = createFileRoute("/shop")({
  head: () => ({ meta: [{ title: "Shop — AudioCare" }, { name: "description", content: "Shop premium speakers, soundbars, home theatre and accessories at AudioCare." }] }),
  component: () => (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <h1 className="font-display text-4xl font-bold">Shop <span className="text-gradient-orange">Speakers</span></h1>
        <p className="text-muted-foreground mt-2">Browse our complete catalog of premium audio products.</p>
      </main>
      <FeaturedProducts />
      <Footer />
    </div>
  ),
});
