import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { supabase } from "@/lib/supabase";
import { type Product, products as fallbackProducts } from "@/data/sampleData";
import { mapSupabaseProduct } from "@/lib/productMapper";

type ProductsCacheCtx = {
  products: Product[];
  getById: (id: string) => Product | undefined;
  loading: boolean;
  refresh: () => void;
};

const ProductsCacheContext = createContext<ProductsCacheCtx | null>(null);

export function ProductsCacheProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(fallbackProducts);
  const [loading, setLoading] = useState(true);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    setLoading(true);
    supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: true })
      .then(({ data, error }) => {
        if (!error && data && data.length > 0) {
          setProducts(
            data.map((row) =>
              mapSupabaseProduct(row as Record<string, unknown>)
            )
          );
        }
        // If Supabase returns empty / error, keep fallback sampleData
        setLoading(false);
      });
  }, [tick]);

  const getById = (id: string) => products.find((p) => p.id === id);
  const refresh = () => setTick((t) => t + 1);

  return (
    <ProductsCacheContext.Provider value={{ products, getById, loading, refresh }}>
      {children}
    </ProductsCacheContext.Provider>
  );
}

export const useProductsCache = () => {
  const c = useContext(ProductsCacheContext);
  if (!c)
    throw new Error("useProductsCache must be inside ProductsCacheProvider");
  return c;
};
