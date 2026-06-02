import { Link } from "@tanstack/react-router";
import { X, Trash2, ShoppingBag, Plus, Minus } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useEffect } from "react";

export function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { detailed, subtotal, setQty, remove, count } = useCart();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60]">
      <div className="absolute inset-0 bg-black/50 animate-in fade-in" onClick={onClose} />
      <aside className="absolute right-0 top-0 bottom-0 w-full sm:w-[420px] bg-background border-l border-border flex flex-col animate-in slide-in-from-right">
        <header className="flex items-center justify-between p-5 border-b border-border">
          <h2 className="font-display font-bold text-lg flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-primary" /> Your Cart ({count})
          </h2>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-accent">
            <X className="w-5 h-5" />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {detailed.length === 0 ? (
            <div className="text-center py-16">
              <ShoppingBag className="w-12 h-12 text-muted-foreground/40 mx-auto" />
              <p className="mt-4 text-sm text-muted-foreground">Your cart is empty</p>
              <Link to="/shop" onClick={onClose} className="inline-block mt-4 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm">
                Browse Shop
              </Link>
            </div>
          ) : (
            detailed.map((d) => (
              <div key={d.product.id} className="flex gap-3 p-3 rounded-xl border border-border bg-card">
                <div className="w-20 h-20 rounded-lg bg-section flex items-center justify-center shrink-0">
                  <img src={d.product.img} alt={d.product.name} className="max-h-full object-contain" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h4 className="font-semibold text-sm truncate">{d.product.name}</h4>
                      <p className="text-[11px] text-muted-foreground">{d.product.brand}</p>
                    </div>
                    <button onClick={() => remove(d.product.id)} className="p-1 hover:text-destructive">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <div className="flex items-center border border-border rounded-lg">
                      <button onClick={() => setQty(d.product.id, d.qty - 1)} className="w-7 h-7 hover:bg-accent flex items-center justify-center">
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-8 text-center text-sm font-semibold">{d.qty}</span>
                      <button onClick={() => setQty(d.product.id, d.qty + 1)} className="w-7 h-7 hover:bg-accent flex items-center justify-center">
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <span className="font-display font-bold text-sm">₹{d.lineTotal.toLocaleString("en-IN")}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {detailed.length > 0 && (
          <footer className="border-t border-border p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Subtotal</span>
              <span className="font-display font-bold text-xl">₹{subtotal.toLocaleString("en-IN")}</span>
            </div>
            <Link to="/cart" onClick={onClose} className="block w-full text-center py-3 rounded-xl border-2 border-border font-semibold text-sm hover:border-primary">
              View Cart
            </Link>
            <Link to="/checkout" onClick={onClose} className="block w-full text-center py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm shadow-card hover:shadow-glow">
              Checkout →
            </Link>
          </footer>
        )}
      </aside>
    </div>
  );
}
