import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { MarqueeBar } from "@/components/MarqueeBar";
import { BrandCloud } from "@/components/BrandCloud";
import { PromoBanners } from "@/components/PromoBanners";
import { ServicesShowcase } from "@/components/ServicesShowcase";
import { StatsBar } from "@/components/StatsBar";
import { ImageGallery } from "@/components/ImageGallery";
import { Categories } from "@/components/Categories";
import { RepairCTABanner } from "@/components/RepairCTABanner";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { OurWork } from "@/components/OurWork";
import { ReviewsSection } from "@/components/ReviewsSection";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AudioCare — Home Theater, Sound Systems & Expert Audio Repair" },
      {
        name: "description",
        content:
          "AudioCare offers home theater installation, professional sound systems, theater & auditorium audio, and expert repair for all audio equipment. Free doorstep pickup.",
      },
      { property: "og:title", content: "AudioCare — Everything Audio, Under One Roof" },
      {
        property: "og:description",
        content:
          "Home Theater • Sound Systems • Theater Audio • Speaker & Amplifier Repair — all at AudioCare.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        {/* 1. Full-width hero carousel — 4 service slides */}
        <Hero />

        {/* 2. Scrolling brand/service announcement bar */}
        <MarqueeBar />

        <BrandCloud />

        {/* 3. Two promo banners (Home Theater + Sound Systems) + trust bar */}
        <PromoBanners />

        {/* 4. "What We Do" — alternating image+content cards for all 4 services */}
        <ServicesShowcase />

        {/* 5. Animated stats counter */}
        <StatsBar />

        <ImageGallery />

        {/* 6. Shop by Category — image tiles */}
        <Categories />

        {/* 7. Repair CTA — full-width dark banner */}
        <RepairCTABanner />

        {/* 8. Featured Products */}
        <FeaturedProducts />

        {/* 9. Our Work / Before-After gallery */}
        <OurWork />

        {/* 10. Customer Reviews */}
        <ReviewsSection />
      </main>
      <Footer />
    </div>
  );
}
