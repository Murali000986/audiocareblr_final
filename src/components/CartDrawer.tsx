import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useCart } from "@/contexts/CartContext";
import { useEffect } from "react";

export function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { detailed, subtotal, setQty, remove, count } = useCart();
  const shipping = subtotal > 999 || subtotal === 0 ? 0 : 99;
  const total = subtotal + shipping;

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const fn = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [open, onClose]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm transition-opacity duration-300 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
      />

      {/* Drawer */}
      <aside
        className={`fixed right-0 top-0 bottom-0 z-[70] w-full max-w-[420px] bg-background border-l border-border flex flex-col transition-transform duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="shrink-0 flex items-center justify-between px-5 py-4 border-b border-border">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-primary" />
            <h2 className="font-display font-bold text-lg">Cart</h2>
            {count > 0 && (
              <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">
                {count}
              </span>
            )}
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-lg hover:bg-accent flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 min-h-0 overflow-y-auto px-5 py-4 space-y-3">
          {detailed.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center gap-4 text-center py-16">
              <div className="w-16 h-16 rounded-full bg-section flex items-center justify-center">
                <ShoppingBag className="w-8 h-8 text-muted-foreground/40" />
              </div>
              <p className="text-muted-foreground font-medium">Your cart is empty</p>
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-bold hover:shadow-glow transition-all"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            detailed.map((d) => (
              <div
                key={d.product.id}
                className="flex gap-3 p-3 rounded-xl border border-border bg-card group"
              >
                <Link to="/shop/$productId" params={{ productId: d.product.id }} onClick={onClose}>
                  <div className="w-20 h-20 rounded-lg bg-section flex items-center justify-center shrink-0">
                    <img src={d.product.img} alt={d.product.name} className="max-h-full object-contain" />
                  </div>
                </Link>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-1">
                    <Link to="/shop/$productId" params={{ productId: d.product.id }} onClick={onClose}>
                      <p className="font-semibold text-sm hover:text-primary transition-colors line-clamp-1">{d.product.name}</p>
                    </Link>
                    <button onClick={() => remove(d.product.id)} className="shrink-0 p-1 rounded hover:text-destructive text-muted-foreground transition-colors opacity-0 group-hover:opacity-100">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{d.product.brand}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <div className="flex items-center border border-border rounded-lg overflow-hidden">
                      <button onClick={() => setQty(d.product.id, d.qty - 1)} className="w-7 h-7 hover:bg-accent flex items-center justify-center transition-colors">
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-8 text-center text-sm font-semibold">{d.qty}</span>
                      <button onClick={() => setQty(d.product.id, d.qty + 1)} className="w-7 h-7 hover:bg-accent flex items-center justify-center transition-colors">
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <span className="font-display font-bold text-sm">₹{(Number(d.lineTotal) || 0).toLocaleString("en-IN")}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {detailed.length > 0 && (
          <div className="shrink-0 px-5 py-4 border-t border-border space-y-3 bg-background">
            {shipping === 0 && subtotal > 0 && (
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/10 border border-primary/20 text-xs text-primary font-semibold">
                🎉 Free delivery unlocked!
              </div>
            )}
            <div className="space-y-1 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span><span>₹{(Number(subtotal) || 0).toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Shipping</span><span>{shipping === 0 ? "FREE" : `₹${shipping}`}</span>
              </div>
              <div className="flex justify-between font-display font-bold text-base pt-2 border-t border-border">
                <span>Total</span><span>₹{(Number(total) || 0).toLocaleString("en-IN")}</span>
              </div>
            </div>
            <Link
              to="/checkout"
              onClick={onClose}
              className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-bold text-sm hover:shadow-glow transition-all btn-press"
            >
              Checkout <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/cart" onClick={onClose} className="block text-center text-xs text-muted-foreground hover:text-primary font-semibold">
              View full cart
            </Link>
          </div>
        )}
      </aside>
    </>
  );
}
