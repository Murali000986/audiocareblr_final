import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/sound-experience")({
  head: () => ({ meta: [{ title: "Sound Experience — AudioCare" }, { name: "description", content: "Tap to experience premium sound modes — bass, party, movie and clear voice." }] }),
  component: () => (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <h1 className="font-display text-4xl font-bold">Sound <span className="text-gradient-orange">Experience</span></h1>
        <p className="text-muted-foreground mt-2">Interactive sound modes coming soon.</p>
      </main>
      <Footer />
    </div>
  ),
});
