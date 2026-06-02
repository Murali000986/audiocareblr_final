import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { products, type Product } from "@/data/sampleData";

type WishCtx = {
  ids: string[];
  count: number;
  has: (id: string) => boolean;
  toggle: (id: string) => void;
  remove: (id: string) => void;
  clear: () => void;
  detailed: Product[];
};

const WishContext = createContext<WishCtx | null>(null);
const KEY = "audiocare_wishlist_v1";

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [ids, setIds] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = typeof window !== "undefined" ? localStorage.getItem(KEY) : null;
      if (raw) setIds(JSON.parse(raw));
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem(KEY, JSON.stringify(ids));
  }, [ids, hydrated]);

  const has = (id: string) => ids.includes(id);
  const toggle = (id: string) => setIds((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));
  const remove = (id: string) => setIds((p) => p.filter((x) => x !== id));
  const clear = () => setIds([]);
  const detailed = ids.map((id) => products.find((p) => p.id === id)).filter((p): p is Product => !!p);

  return (
    <WishContext.Provider value={{ ids, count: ids.length, has, toggle, remove, clear, detailed }}>
      {children}
    </WishContext.Provider>
  );
}

export const useWishlist = () => {
  const c = useContext(WishContext);
  if (!c) throw new Error("useWishlist must be inside WishlistProvider");
  return c;
};
