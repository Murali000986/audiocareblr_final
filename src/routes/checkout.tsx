import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { MapPin, CreditCard, CheckCircle, ChevronRight, Truck, ShieldCheck, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Checkout — AudioCare" }] }),
  component: CheckoutPage,
});

type Step = "address" | "payment" | "confirm";

const STEPS: { id: Step; label: string; icon: any }[] = [
  { id: "address", label: "Address",  icon: MapPin },
  { id: "payment", label: "Payment",  icon: CreditCard },
  { id: "confirm", label: "Confirm",  icon: CheckCircle },
];

function CheckoutPage() {
  const { detailed, subtotal, clear } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("address");
  const [placing, setPlacing] = useState(false);

  const [addr, setAddr] = useState({
    name: user?.user_metadata?.full_name ?? "",
    phone: "",
    line1: "",
    city: "",
    state: "",
    pincode: "",
  });
  const [payMode, setPayMode] = useState<"cod" | "upi" | "card">("cod");
  const shipping = subtotal > 999 || subtotal === 0 ? 0 : 99;
  const total = subtotal + shipping;

  if (detailed.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 py-20 text-center">
          <h1 className="font-display text-3xl font-bold mb-4">Your cart is empty</h1>
          <Link to="/shop" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-bold hover:shadow-glow transition-all">
            Shop Now
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const stepIdx = STEPS.findIndex((s) => s.id === step);

  const placeOrder = async () => {
    setPlacing(true);
    const orderData = {
      user_id: user?.id ?? null,
      status: "confirmed",
      items: detailed.map((d) => ({ id: d.product.id, name: d.product.name, qty: d.qty, price: d.product.price })),
      subtotal,
      shipping,
      total,
      address: addr,
    };
    const { error } = await supabase.from("orders").insert(orderData);
    setPlacing(false);
    if (error) { toast.error("Failed to place order. Please try again."); return; }
    clear();
    navigate({ to: "/order-success" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <h1 className="font-display text-3xl font-bold mb-8">Checkout</h1>

        {/* Step indicator */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto">
          {STEPS.map((s, i) => (
            <div key={s.id} className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => i < stepIdx && setStep(s.id)}
                disabled={i > stepIdx}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                  s.id === step
                    ? "bg-primary text-primary-foreground"
                    : i < stepIdx
                    ? "bg-primary/20 text-primary cursor-pointer hover:bg-primary/30"
                    : "bg-section text-muted-foreground cursor-not-allowed"
                }`}
              >
                <s.icon className="w-3.5 h-3.5" /> {s.label}
              </button>
              {i < STEPS.length - 1 && <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-[1fr_360px] gap-8">
          {/* Left: step content */}
          <div className="border border-border bg-card rounded-2xl p-6 shadow-soft">
            {/* ADDRESS */}
            {step === "address" && (
              <div>
                <h2 className="font-display font-bold text-xl mb-5">Delivery Address</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { key: "name",    label: "Full Name",       placeholder: "John Doe" },
                    { key: "phone",   label: "Phone Number",    placeholder: "+91 98765 43210" },
                    { key: "line1",   label: "Address Line 1",  placeholder: "Flat/Street", colSpan: true },
                    { key: "city",    label: "City",            placeholder: "Bengaluru" },
                    { key: "state",   label: "State",           placeholder: "Karnataka" },
                    { key: "pincode", label: "Pincode",         placeholder: "560001" },
                  ].map((f) => (
                    <div key={f.key} className={f.colSpan ? "sm:col-span-2" : ""}>
                      <label className="block text-xs font-semibold text-muted-foreground mb-1.5">{f.label}</label>
                      <input
                        type="text"
                        value={(addr as any)[f.key]}
                        onChange={(e) => setAddr((a) => ({ ...a, [f.key]: e.target.value }))}
                        placeholder={f.placeholder}
                        className="w-full px-3 py-2.5 rounded-xl border border-border bg-section text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => {
                    if (!addr.name || !addr.phone || !addr.line1 || !addr.city || !addr.pincode) {
                      toast.error("Please fill all required fields"); return;
                    }
                    setStep("payment");
                  }}
                  className="mt-6 w-full sm:w-auto inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-primary text-primary-foreground font-bold text-sm hover:shadow-glow transition-all btn-press"
                >
                  Continue to Payment <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* PAYMENT */}
            {step === "payment" && (
              <div>
                <h2 className="font-display font-bold text-xl mb-5">Payment Method</h2>
                <div className="space-y-3">
                  {[
                    { id: "cod",  label: "Cash on Delivery", sub: "Pay when delivered" },
                    { id: "upi",  label: "UPI",              sub: "GPay, PhonePe, Paytm" },
                    { id: "card", label: "Card",             sub: "Credit / Debit card" },
                  ].map((p) => (
                    <label
                      key={p.id}
                      className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        payMode === p.id ? "border-primary bg-accent/20" : "border-border hover:border-primary/40"
                      }`}
                    >
                      <input type="radio" value={p.id} checked={payMode === p.id} onChange={() => setPayMode(p.id as any)} className="sr-only" />
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${payMode === p.id ? "border-primary" : "border-muted-foreground"}`}>
                        {payMode === p.id && <div className="w-2 h-2 rounded-full bg-primary" />}
                      </div>
                      <div>
                        <p className="font-semibold text-sm">{p.label}</p>
                        <p className="text-xs text-muted-foreground">{p.sub}</p>
                      </div>
                    </label>
                  ))}
                </div>
                <div className="mt-6 flex gap-3">
                  <button onClick={() => setStep("address")} className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-border text-sm font-semibold hover:bg-section transition-all">
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>
                  <button
                    onClick={() => setStep("confirm")}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-primary text-primary-foreground font-bold text-sm hover:shadow-glow transition-all btn-press"
                  >
                    Review Order <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* CONFIRM */}
            {step === "confirm" && (
              <div>
                <h2 className="font-display font-bold text-xl mb-5">Review & Place Order</h2>
                {/* Address summary */}
                <div className="rounded-xl border border-border p-4 mb-4 text-sm">
                  <p className="font-semibold mb-1 flex items-center gap-2"><MapPin className="w-4 h-4 text-primary" /> Delivery to</p>
                  <p className="text-muted-foreground">{addr.name} · {addr.phone}</p>
                  <p className="text-muted-foreground">{addr.line1}, {addr.city}, {addr.state} — {addr.pincode}</p>
                </div>
                {/* Items */}
                <div className="space-y-2 mb-4">
                  {detailed.map((d) => (
                    <div key={d.product.id} className="flex items-center gap-3 text-sm">
                      <div className="w-12 h-12 rounded-lg bg-section flex items-center justify-center shrink-0">
                        <img src={d.product.img} alt={d.product.name} className="max-h-full object-contain" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold truncate">{d.product.name}</p>
                        <p className="text-xs text-muted-foreground">Qty: {d.qty}</p>
                      </div>
                      <p className="font-bold shrink-0">₹{(Number(d.lineTotal) || 0).toLocaleString("en-IN")}</p>
                    </div>
                  ))}
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setStep("payment")} className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-border text-sm font-semibold hover:bg-section transition-all">
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>
                  <button
                    onClick={placeOrder}
                    disabled={placing}
                    className="flex-1 inline-flex items-center justify-center gap-2 py-3.5 rounded-xl bg-primary text-primary-foreground font-bold text-sm hover:shadow-glow transition-all disabled:opacity-60 btn-press"
                  >
                    {placing ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <CheckCircle className="w-4 h-4" />}
                    {placing ? "Placing Order…" : "Place Order"}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right: order summary */}
          <aside className="border border-border bg-card rounded-2xl p-5 h-fit sticky top-24 shadow-soft">
            <h3 className="font-display font-bold text-base mb-4">Order Summary</h3>
            <div className="space-y-3 mb-4">
              {detailed.map((d) => (
                <div key={d.product.id} className="flex items-center gap-2 text-sm">
                  <div className="w-10 h-10 rounded-lg bg-section flex items-center justify-center shrink-0">
                    <img src={d.product.img} alt={d.product.name} className="max-h-full object-contain" />
                  </div>
                  <p className="flex-1 text-xs font-medium line-clamp-1">{d.product.name} ×{d.qty}</p>
                  <p className="font-bold text-xs shrink-0">₹{(Number(d.lineTotal) || 0).toLocaleString("en-IN")}</p>
                </div>
              ))}
            </div>
            <div className="border-t border-border pt-3 space-y-1.5 text-sm">
              <div className="flex justify-between text-muted-foreground"><span>Subtotal</span><span>₹{(Number(subtotal) || 0).toLocaleString("en-IN")}</span></div>
              <div className="flex justify-between text-muted-foreground"><span>Shipping</span><span>{shipping === 0 ? "FREE" : `₹${shipping}`}</span></div>
              <div className="flex justify-between font-display font-bold text-base pt-2 border-t border-border"><span>Total</span><span>₹{(Number(total) || 0).toLocaleString("en-IN")}</span></div>
            </div>
            <div className="mt-4 space-y-2">
              {[{ icon: Truck, t: "Free delivery above ₹999" }, { icon: ShieldCheck, t: "Secure & encrypted checkout" }].map((b) => (
                <div key={b.t} className="flex items-center gap-2 text-xs text-muted-foreground">
                  <b.icon className="w-3.5 h-3.5 text-primary shrink-0" /> {b.t}
                </div>
              ))}
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
}
