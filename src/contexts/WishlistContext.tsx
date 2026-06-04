import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { supabase } from "@/lib/supabase";
import { useProductsCache } from "@/contexts/ProductsCacheContext";
import type { Product } from "@/data/sampleData";

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
  const [userId, setUserId] = useState<string | null>(null);
  const { getById } = useProductsCache();

  // Track auth state
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUserId(session?.user?.id ?? null);
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_e, session) => {
      setUserId(session?.user?.id ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  // Load wishlist — Supabase when logged in (merged with local), localStorage for guests
  useEffect(() => {
    setHydrated(false);

    // Always read localStorage first as an immediate baseline
    let localIds: string[] = [];
    try {
      const raw = typeof window !== "undefined" ? localStorage.getItem(KEY) : null;
      if (raw) localIds = JSON.parse(raw);
    } catch {}

    if (userId) {
      // Logged in: fetch from Supabase, then merge with any locally-saved items
      supabase
        .from("wishlist")
        .select("product_id")
        .eq("user_id", userId)
        .then(async ({ data }) => {
          const dbIds = data ? data.map((r: { product_id: string }) => r.product_id) : [];
          // Union: Supabase + any guest items that weren't synced yet
          const merged = Array.from(new Set([...dbIds, ...localIds]));
          setIds(merged);

          // Push un-synced local items up to Supabase
          const toSync = localIds.filter(id => !dbIds.includes(id));
          if (toSync.length > 0) {
            await supabase.from("wishlist").upsert(
              toSync.map(id => ({ user_id: userId, product_id: id })),
              { onConflict: "user_id,product_id" }
            );
          }

          setHydrated(true);
        });
    } else {
      // Guest: use localStorage only
      setIds(localIds);
      setHydrated(true);
    }
  }, [userId]);

  // Always persist current ids to localStorage (backup for guests AND logged-in users)
  useEffect(() => {
    if (hydrated) {
      localStorage.setItem(KEY, JSON.stringify(ids));
    }
  }, [ids, hydrated]);

  const has = (id: string) => ids.includes(id);

  const toggle = (id: string) => {
    const alreadyIn = ids.includes(id);
    // Optimistic update
    setIds((p) => (alreadyIn ? p.filter((x) => x !== id) : [...p, id]));
    // Sync to Supabase if logged in
    if (userId) {
      if (alreadyIn) {
        supabase.from("wishlist").delete().eq("user_id", userId).eq("product_id", id);
      } else {
        supabase.from("wishlist").upsert(
          { user_id: userId, product_id: id },
          { onConflict: "user_id,product_id" }
        );
      }
    }
  };

  const remove = (id: string) => {
    setIds((p) => p.filter((x) => x !== id));
    if (userId) {
      supabase
        .from("wishlist")
        .delete()
        .eq("user_id", userId)
        .eq("product_id", id);
    }
  };

  const clear = () => {
    setIds([]);
    localStorage.removeItem(KEY);
    if (userId) {
      supabase.from("wishlist").delete().eq("user_id", userId);
    }
  };

  const detailed = ids
    .map((id) => getById(id))
    .filter((p): p is Product => !!p);

  return (
    <WishContext.Provider
      value={{ ids, count: ids.length, has, toggle, remove, clear, detailed }}
    >
      {children}
    </WishContext.Provider>
  );
}

export const useWishlist = () => {
  const c = useContext(WishContext);
  if (!c) throw new Error("useWishlist must be inside WishlistProvider");
  return c;
};
