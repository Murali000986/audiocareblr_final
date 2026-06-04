import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { useProductsCache } from "@/contexts/ProductsCacheContext";
import type { Product } from "@/data/sampleData";

export type CartItem = { id: string; qty: number };

type CartCtx = {
  items: CartItem[];
  count: number;
  subtotal: number;
  add: (id: string, qty?: number) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  detailed: Array<{ product: Product; qty: number; lineTotal: number }>;
};

const CartContext = createContext<CartCtx | null>(null);
const KEY = "audiocare_cart_v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const { getById } = useProductsCache();

  useEffect(() => {
    try {
      const raw = typeof window !== "undefined" ? localStorage.getItem(KEY) : null;
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          setItems(parsed);
        } else {
          setItems([]);
          localStorage.removeItem(KEY);
        }
      }
    } catch {
      setItems([]);
      localStorage.removeItem(KEY);
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem(KEY, JSON.stringify(items));
  }, [items, hydrated]);

  const add = (id: string, qty = 1) =>
    setItems((p) => {
      const ex = p.find((i) => i.id === id);
      return ex
        ? p.map((i) => (i.id === id ? { ...i, qty: i.qty + qty } : i))
        : [...p, { id, qty }];
    });

  const remove = (id: string) => setItems((p) => p.filter((i) => i.id !== id));

  const setQty = (id: string, qty: number) =>
    setItems((p) =>
      qty <= 0
        ? p.filter((i) => i.id !== id)
        : p.map((i) => (i.id === id ? { ...i, qty } : i))
    );

  const clear = () => setItems([]);

  const detailed = items
    .map((i) => {
      const product = getById(i.id);
      return product
        ? { product, qty: i.qty, lineTotal: (Number(product.price) || 0) * (Number(i.qty) || 1) }
        : null;
    })
    .filter(
      (x): x is { product: Product; qty: number; lineTotal: number } =>
        x !== null
    );

  const subtotal = detailed.reduce((s, d) => s + d.lineTotal, 0);
  const count = items.reduce((s, i) => s + i.qty, 0);

  return (
    <CartContext.Provider
      value={{ items, count, subtotal, add, remove, setQty, clear, detailed }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const c = useContext(CartContext);
  if (!c) throw new Error("useCart must be inside CartProvider");
  return c;
};
