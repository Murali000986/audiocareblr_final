import type { Product } from "@/data/sampleData";

/** Map a raw Supabase `products` row → frontend Product shape */
export function mapSupabaseProduct(row: Record<string, unknown>): Product {
  return {
    id: row.id as string,
    name: row.name as string,
    category: row.category as string,
    categoryLabel: (row.category_label ?? row.category) as string,
    brand: row.brand as string,
    price: Number(row.price),
    mrp: row.mrp != null ? Number(row.mrp) : undefined,
    rating: Number(row.rating ?? 4.5),
    reviews: Number(row.reviews_count ?? 0),
    badge: (row.badge as string | null) ?? undefined,
    img: (row.img_url as string) ?? "",
    description: (row.description as string) ?? "",
    highlights: Array.isArray(row.highlights) ? (row.highlights as string[]) : [],
    inStock: (row.in_stock as boolean) ?? true,
    // Extra admin fields (typed as `any` on Product via cast)
    is_best_seller: (row.is_best_seller as boolean) ?? false,
    cost_price: row.cost_price != null ? Number(row.cost_price) : null,
  } as Product & { is_best_seller: boolean; cost_price: number | null };
}
