import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useCart } from "@/contexts/CartContext";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { ShoppingBag, CreditCard, Truck, ShieldCheck, MessageCircle } from "lucide-react";

const schema = z.object({
  name: z.string().trim().min(2, "Name is required").max(80),
  phone: z.string().trim().regex(/^\+?[0-9 -]{10,15}$/, "Enter a valid phone"),
  email: z.string().trim().email("Enter a valid email").max(120),
  address: z.string().trim().min(8, "Address is required").max(300),
  city: z.string().trim().min(2).max(60),
  pincode: z.string().trim().regex(/^[0-9]{6}$/, "Enter a valid 6-digit PIN"),
  notes: z.string().trim().max(300).optional().or(z.literal("")),
  payment: z.enum(["cod", "upi", "card"]),
});

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Checkout — AudioCare" }, { name: "description", content: "Complete your order securely." }] }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const { detailed, subtotal, clear, count } = useCart();
  const shipping = subtotal > 999 ? 0 : 99;
  const total = subtotal + shipping;
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", phone: "", email: "", address: "", city: "", pincode: "", notes: "", payment: "cod" as const });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  if (count === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="max-w-3xl mx-auto px-4 py-20 text-center">
          <ShoppingBag className="w-12 h-12 text-muted-foreground/40 mx-auto" />
          <h1 className="font-display text-3xl font-bold mt-4">Your cart is empty</h1>
          <Link to="/shop" className="inline-block mt-6 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold">
            Browse Shop
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const update = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const r = schema.safeParse(form);
    if (!r.success) {
      const errs: Record<string, string> = {};
      r.error.issues.forEach((i) => { if (i.path[0]) errs[i.path[0] as string] = i.message; });
      setErrors(errs);
      toast.error("Please fix the errors in the form");
      return;
    }
    setErrors({});
    setSubmitting(true);
    const orderId = "AC" + Date.now().toString().slice(-8);
    setTimeout(() => {
      clear();
      navigate({ to: "/order-success", search: { id: orderId } as any });
    }, 700);
  };

  const waMsg = encodeURIComponent(
    `Hi AudioCare, I'd like to order:\n${detailed.map((d) => `• ${d.qty} × ${d.product.name} — ₹${d.lineTotal.toLocaleString("en-IN")}`).join("\n")}\nTotal: ₹${total.toLocaleString("en-IN")}`,
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <h1 className="font-display text-4xl font-bold">Secure <span className="text-gradient-orange">Checkout</span></h1>
        <p className="text-muted-foreground mt-1">Complete your order in a few quick steps.</p>

        <form onSubmit={submit} className="mt-8 grid lg:grid-cols-[1fr_400px] gap-8">
          <div className="space-y-6">
            {/* Contact */}
            <section className="rounded-2xl border border-border bg-card p-6">
              <h2 className="font-display font-bold text-lg mb-4">Contact Details</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Full Name" name="name" value={form.name} onChange={update} error={errors.name} />
                <Field label="Phone" name="phone" value={form.phone} onChange={update} error={errors.phone} placeholder="+91 98765 43210" />
                <div className="sm:col-span-2">
                  <Field label="Email" name="email" value={form.email} onChange={update} error={errors.email} type="email" />
                </div>
              </div>
            </section>

            {/* Shipping */}
            <section className="rounded-2xl border border-border bg-card p-6">
              <h2 className="font-display font-bold text-lg mb-4">Shipping Address</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <Field label="Address" name="address" value={form.address} onChange={update} error={errors.address} placeholder="Flat, Building, Street" />
                </div>
                <Field label="City" name="city" value={form.city} onChange={update} error={errors.city} />
                <Field label="PIN Code" name="pincode" value={form.pincode} onChange={update} error={errors.pincode} placeholder="560034" />
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold mb-1.5">Order Notes (optional)</label>
                  <textarea
                    value={form.notes}
                    onChange={(e) => update("notes", e.target.value)}
                    rows={3}
                    maxLength={300}
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
            </section>

            {/* Payment */}
            <section className="rounded-2xl border border-border bg-card p-6">
              <h2 className="font-display font-bold text-lg mb-4">Payment Method</h2>
              <div className="grid sm:grid-cols-3 gap-3">
                {[
                  { v: "cod", label: "Cash on Delivery", desc: "Pay when delivered" },
                  { v: "upi", label: "UPI", desc: "GPay, PhonePe, Paytm" },
                  { v: "card", label: "Credit/Debit Card", desc: "Visa, Master, Rupay" },
                ].map((p) => (
                  <label
                    key={p.v}
                    className={`cursor-pointer rounded-xl border-2 p-4 transition-colors ${form.payment === p.v ? "border-primary bg-accent/40" : "border-border hover:border-primary/50"}`}
                  >
                    <input type="radio" name="payment" value={p.v} checked={form.payment === p.v} onChange={(e) => update("payment", e.target.value)} className="sr-only" />
                    <div className="font-semibold text-sm flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-primary" /> {p.label}
                    </div>
                    <div className="text-[11px] text-muted-foreground mt-1">{p.desc}</div>
                  </label>
                ))}
              </div>
            </section>
          </div>

          {/* Summary */}
          <aside className="rounded-2xl border border-border bg-card p-6 h-fit sticky top-24 shadow-soft">
            <h3 className="font-display font-bold text-lg">Order Summary</h3>
            <ul className="mt-4 space-y-3 max-h-64 overflow-y-auto">
              {detailed.map((d) => (
                <li key={d.product.id} className="flex gap-3 text-sm">
                  <div className="w-12 h-12 rounded-lg bg-section flex items-center justify-center shrink-0">
                    <img src={d.product.img} alt="" className="max-h-full object-contain" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">{d.product.name}</div>
                    <div className="text-xs text-muted-foreground">Qty {d.qty}</div>
                  </div>
                  <div className="font-semibold whitespace-nowrap">₹{d.lineTotal.toLocaleString("en-IN")}</div>
                </li>
              ))}
            </ul>
            <dl className="mt-4 pt-4 border-t border-border space-y-2 text-sm">
              <div className="flex justify-between"><dt className="text-muted-foreground">Subtotal</dt><dd>₹{subtotal.toLocaleString("en-IN")}</dd></div>
              <div className="flex justify-between"><dt className="text-muted-foreground">Shipping</dt><dd>{shipping === 0 ? "FREE" : `₹${shipping}`}</dd></div>
              <div className="flex justify-between font-display font-bold text-lg pt-2 border-t border-border"><dt>Total</dt><dd>₹{total.toLocaleString("en-IN")}</dd></div>
            </dl>
            <button
              type="submit"
              disabled={submitting}
              className="mt-5 w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold shadow-card hover:shadow-glow disabled:opacity-50"
            >
              {submitting ? "Placing order…" : `Place Order — ₹${total.toLocaleString("en-IN")}`}
            </button>
            <a
              href={`https://wa.me/919876543210?text=${waMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-[#25D366] text-white font-semibold text-sm"
            >
              <MessageCircle className="w-4 h-4" /> Order on WhatsApp
            </a>
            <div className="mt-5 grid grid-cols-2 gap-2 text-[11px] text-muted-foreground">
              <span className="flex items-center gap-1.5"><Truck className="w-3.5 h-3.5 text-primary" /> Fast delivery</span>
              <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-primary" /> Genuine products</span>
            </div>
          </aside>
        </form>
      </main>
      <Footer />
    </div>
  );
}

function Field({ label, name, value, onChange, error, type = "text", placeholder }: { label: string; name: any; value: string; onChange: (k: any, v: string) => void; error?: string; type?: string; placeholder?: string }) {
  return (
    <div>
      <label className="block text-xs font-semibold mb-1.5">{label}</label>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(name, e.target.value)}
        className={`w-full px-3 py-2.5 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary ${error ? "border-destructive" : "border-border"}`}
      />
      {error && <p className="text-xs text-destructive mt-1">{error}</p>}
    </div>
  );
}
