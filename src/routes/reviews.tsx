import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ReviewsSection } from "@/components/ReviewsSection";

export const Route = createFileRoute("/reviews")({
  head: () => ({ meta: [{ title: "Reviews — AudioCare" }, { name: "description", content: "Verified customer reviews and ratings for AudioCare." }] }),
  component: () => (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <h1 className="font-display text-4xl font-bold">Customer <span className="text-gradient-orange">Reviews</span></h1>
      </main>
      <ReviewsSection />
      <Footer />
    </div>
  ),
});
