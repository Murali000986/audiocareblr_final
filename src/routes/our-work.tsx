import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { OurWork } from "@/components/OurWork";

export const Route = createFileRoute("/our-work")({
  head: () => ({ meta: [{ title: "Our Work — AudioCare" }, { name: "description", content: "Real repairs. Real results. Browse our restoration portfolio." }] }),
  component: () => (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <h1 className="font-display text-4xl font-bold">Real Repairs. <span className="text-gradient-orange">Real Results.</span></h1>
      </main>
      <OurWork />
      <Footer />
    </div>
  ),
});
