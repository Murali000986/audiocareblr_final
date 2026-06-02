import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { RepairServices } from "@/components/RepairServices";

export const Route = createFileRoute("/repair-service")({
  head: () => ({ meta: [{ title: "Repair Services — AudioCare" }, { name: "description", content: "Book expert repair for speakers, amplifiers, soundbars and home theatre systems." }] }),
  component: () => (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <h1 className="font-display text-4xl font-bold">Book a <span className="text-gradient-orange">Repair</span></h1>
        <p className="text-muted-foreground mt-2">Expert technicians. Genuine parts. Free pickup & delivery.</p>
      </main>
      <RepairServices />
      <Footer />
    </div>
  ),
});
