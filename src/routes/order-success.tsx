import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CheckCircle2, Package, MessageCircle } from "lucide-react";

export const Route = createFileRoute("/order-success")({
  validateSearch: (s: Record<string, unknown>) => ({ id: typeof s.id === "string" ? s.id : "" }),
  head: () => ({ meta: [{ title: "Order Placed — AudioCare" }, { name: "description", content: "Your order has been placed." }, { name: "robots", content: "noindex" }] }),
  component: SuccessPage,
});

function SuccessPage() {
  const { id } = Route.useSearch();
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-2xl w-full mx-auto px-4 py-16 text-center">
        <div className="w-20 h-20 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto animate-float">
          <CheckCircle2 className="w-12 h-12" />
        </div>
        <h1 className="mt-6 font-display text-4xl font-bold">Order Placed Successfully!</h1>
        <p className="mt-2 text-muted-foreground">Thank you for shopping with AudioCare. We'll start preparing your order right away.</p>

        {id && (
          <div className="mt-8 inline-flex items-center gap-3 rounded-2xl border border-border bg-card px-6 py-4">
            <Package className="w-5 h-5 text-primary" />
            <div className="text-left">
              <div className="text-xs text-muted-foreground">Order ID</div>
              <div className="font-display font-bold text-lg">#{id}</div>
            </div>
          </div>
        )}

        <div className="mt-10 grid sm:grid-cols-3 gap-3 text-left">
          {[
            { t: "Order Confirmed", s: "We've received your order" },
            { t: "Preparing", s: "Your products are being packed" },
            { t: "Out for Delivery", s: "Soon at your doorstep" },
          ].map((s, i) => (
            <div key={s.t} className="rounded-xl border border-border p-4">
              <div className="text-xs text-primary font-bold">STEP {i + 1}</div>
              <div className="font-semibold text-sm mt-1">{s.t}</div>
              <div className="text-xs text-muted-foreground">{s.s}</div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link to="/shop" className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold shadow-card">
            Continue Shopping
          </Link>
          <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#25D366] text-white font-semibold">
            <MessageCircle className="w-4 h-4" /> Track on WhatsApp
          </a>
        </div>
      </main>
      <Footer />
    </div>
  );
}
