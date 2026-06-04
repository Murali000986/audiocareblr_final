import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useCart } from "@/contexts/CartContext";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Cart — AudioCare" }, { name: "description", content: "Review your cart and checkout." }] }),
  component: CartPage,
});

function CartPage() {
  const { detailed, subtotal, setQty, remove, clear, count } = useCart();
  const shipping = subtotal > 999 || subtotal === 0 ? 0 : 99;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <h1 className="font-display text-4xl font-bold">Your <span className="text-gradient-orange">Cart</span></h1>
        <p className="text-muted-foreground mt-1">{count} {count === 1 ? "item" : "items"}</p>

        {detailed.length === 0 ? (
          <div className="mt-12 text-center py-16 rounded-2xl border border-dashed border-border">
            <ShoppingBag className="w-12 h-12 text-muted-foreground/40 mx-auto" />
            <p className="mt-4 text-muted-foreground">Your cart is empty</p>
            <Link to="/shop" className="inline-block mt-4 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid lg:grid-cols-[1fr_380px] gap-8">
            <div className="space-y-3">
              {detailed.map((d) => (
                <div key={d.product.id} className="flex gap-4 p-4 rounded-2xl border border-border bg-card">
                  <Link to="/shop/$productId" params={{ productId: d.product.id }} className="w-24 h-24 sm:w-32 sm:h-32 rounded-xl bg-section flex items-center justify-center shrink-0">
                    <img src={d.product.img} alt={d.product.name} className="max-h-full object-contain" />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <Link to="/shop/$productId" params={{ productId: d.product.id }}>
                          <h3 className="font-semibold text-base hover:text-primary truncate">{d.product.name}</h3>
                        </Link>
                        <p className="text-xs text-muted-foreground">{d.product.brand} · {d.product.categoryLabel}</p>
                        <p className="font-display font-bold text-lg mt-2">₹{(Number(d.product.price) || 0).toLocaleString("en-IN")}</p>
                      </div>
                      <button onClick={() => remove(d.product.id)} className="p-2 hover:text-destructive">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center border-2 border-border rounded-xl">
                        <button onClick={() => setQty(d.product.id, d.qty - 1)} className="w-9 h-9 hover:bg-accent flex items-center justify-center">
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-10 text-center font-semibold">{d.qty}</span>
                        <button onClick={() => setQty(d.product.id, d.qty + 1)} className="w-9 h-9 hover:bg-accent flex items-center justify-center">
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-muted-foreground">Subtotal</div>
                        <div className="font-display font-bold">₹{(Number(d.lineTotal) || 0).toLocaleString("en-IN")}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <button onClick={clear} className="text-xs text-muted-foreground hover:text-destructive font-semibold mt-2">
                Clear Cart
              </button>
            </div>

            <aside className="rounded-2xl border border-border bg-card p-6 h-fit sticky top-24 shadow-soft">
              <h3 className="font-display font-bold text-lg">Order Summary</h3>
              <dl className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between"><dt className="text-muted-foreground">Subtotal</dt><dd>₹{(Number(subtotal) || 0).toLocaleString("en-IN")}</dd></div>
                <div className="flex justify-between"><dt className="text-muted-foreground">Shipping</dt><dd>{shipping === 0 ? "FREE" : `₹${shipping}`}</dd></div>
                {shipping === 0 && subtotal > 0 && <p className="text-[11px] text-primary">🎉 Free delivery unlocked</p>}
                <div className="border-t border-border pt-3 flex justify-between font-display font-bold text-lg">
                  <dt>Total</dt><dd>₹{(Number(total) || 0).toLocaleString("en-IN")}</dd>
                </div>
              </dl>
              <Link to="/checkout" className="mt-5 flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold shadow-card hover:shadow-glow">
                Checkout <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/shop" className="mt-3 block text-center text-sm text-muted-foreground hover:text-primary font-semibold">
                ← Continue Shopping
              </Link>
            </aside>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
