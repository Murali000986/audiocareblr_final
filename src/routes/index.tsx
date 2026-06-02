import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Categories } from "@/components/Categories";
import { RepairServices } from "@/components/RepairServices";
import { OurWork } from "@/components/OurWork";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { ReviewsSection } from "@/components/ReviewsSection";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AudioCare — Premium Speakers & Expert Repair Service" },
      { name: "description", content: "Buy premium speakers and book expert repair service for amplifiers, soundbars and home theatre systems at AudioCare." },
      { property: "og:title", content: "AudioCare — Feel Every Beat" },
      { property: "og:description", content: "Premium speakers, sound systems, and expert repair service — all in one place." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <Categories />
        <RepairServices />
        <OurWork />
        <FeaturedProducts />
        <ReviewsSection />
      </main>
      <Footer />
    </div>
  );
}
