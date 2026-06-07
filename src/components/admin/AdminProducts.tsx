import { useState, useRef } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, X, ImagePlus, Loader2, Package } from "lucide-react";
import { useProductsCache } from "@/contexts/ProductsCacheContext";
import type { Product } from "@/data/sampleData";

const CATEGORIES = [
  { slug: "bluetooth",    label: "Bluetooth Speaker" },
  { slug: "party",        label: "Party Speaker" },
  { slug: "soundbar",     label: "Soundbar" },
  { slug: "home-theatre", label: "Home Theatre" },
  { slug: "accessories",  label: "Accessory" },
];

const emptyForm = {
  name: "",
  category: "",
  brand: "",
  price: "",
  mrp: "",
  img_url: "",
  description: "",
  in_stock: true,
  is_best_seller: false,
  cost_price: "",
};

export function AdminProducts() {
  const { products, loading, refresh } = useProductsCache();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ ...emptyForm });
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (!e.target.files || e.target.files.length === 0) return;
      const file = e.target.files[0];

      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image must be smaller than 5MB");
        return;
      }

      setUploading(true);
      toast.loading("Uploading image...", { id: "upload" });

      const fileExt = file.name.split(".").pop()?.toLowerCase() || "jpg";
      const fileName = `product_${Date.now()}.${fileExt}`;
      const filePath = `products/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("images")
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from("images").getPublicUrl(filePath);
      setFormData((prev) => ({ ...prev, img_url: data.publicUrl }));
      toast.success("Image uploaded!", { id: "upload" });
    } catch (error: any) {
      toast.error(
        error?.message?.includes("Bucket not found")
          ? 'Storage bucket "images" not found. Please create it in Supabase → Storage.'
          : error?.message?.includes("row-level security")
          ? "Storage permission denied. Please set bucket policy to allow uploads."
          : error?.message || "Upload failed",
        { id: "upload" }
      );
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  const resetForm = () => {
    setFormData({ ...emptyForm });
    setEditingId(null);
  };

  const openCreate = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const handleEdit = (p: Product) => {
    setFormData({
      name: p.name,
      category: p.category,
      brand: p.brand,
      price: p.price.toString(),
      mrp: p.mrp?.toString() || "",
      img_url: p.img,
      description: p.description,
      in_stock: p.inStock,
      is_best_seller: (p as any).is_best_seller ?? false,
      cost_price: (p as any).cost_price?.toString() || "",
    });
    setEditingId(p.id);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) toast.error(error.message);
    else {
      toast.success("Product deleted");
      refresh();
    }
  };

  const generateSlug = (name: string) =>
    name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

  const getCategoryLabel = (slug: string) =>
    CATEGORIES.find((c) => c.slug === slug)?.label || slug;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) { toast.error("Product name is required"); return; }
    if (!formData.category.trim()) { toast.error("Category is required"); return; }
    if (!formData.brand.trim()) { toast.error("Brand is required"); return; }
    if (!formData.price || isNaN(Number(formData.price))) { toast.error("Valid price is required"); return; }
    if (!formData.img_url.trim()) { toast.error("Please upload an image or paste an image URL"); return; }

    setSubmitting(true);

    try {
      if (editingId) {
        // UPDATE — don't include id in payload body
        const updatePayload: Record<string, unknown> = {
          name: formData.name.trim(),
          category: formData.category.trim(),
          category_label: getCategoryLabel(formData.category.trim()),
          brand: formData.brand.trim(),
          price: Number(formData.price),
          mrp: formData.mrp ? Number(formData.mrp) : null,
          img_url: formData.img_url.trim(),
          description: formData.description.trim(),
          in_stock: formData.in_stock,
          is_best_seller: formData.is_best_seller,
          cost_price: formData.cost_price ? Number(formData.cost_price) : null,
        };

        const { error } = await supabase
          .from("products")
          .update(updatePayload)
          .eq("id", editingId);

        if (error) throw error;
        toast.success("Product updated!");
      } else {
        // INSERT — let DB auto-generate id (uuid), include all required fields
        const slug = generateSlug(formData.name.trim());
        const insertPayload: Record<string, unknown> = {
          id: slug,
          name: formData.name.trim(),
          slug,
          category: formData.category.trim(),
          category_label: getCategoryLabel(formData.category.trim()),
          brand: formData.brand.trim(),
          price: Number(formData.price),
          mrp: formData.mrp ? Number(formData.mrp) : null,
          img_url: formData.img_url.trim(),
          description: formData.description.trim(),
          in_stock: formData.in_stock,
          is_best_seller: formData.is_best_seller,
          cost_price: formData.cost_price ? Number(formData.cost_price) : null,
          rating: 4.5,
          reviews_count: 0,
          highlights: [],
        };

        const { error } = await supabase.from("products").insert(insertPayload);
        if (error) {
          // If slug already exists, append timestamp
          if (error.message?.includes("duplicate") || error.message?.includes("unique")) {
            const newSlug = `${slug}-${Date.now()}`;
            insertPayload.id = newSlug;
            insertPayload.slug = newSlug;
            const { error: retryError } = await supabase.from("products").insert(insertPayload);
            if (retryError) throw retryError;
          } else {
            throw error;
          }
        }
        toast.success("Product added!");
      }

      setIsModalOpen(false);
      resetForm();
      refresh();
    } catch (err: any) {
      toast.error(err?.message || "Failed to save product");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display font-black text-2xl">Products</h2>
          <p className="text-muted-foreground text-sm mt-0.5">
            Manage your catalog, pricing, and stock.
            <span className="ml-2 font-semibold text-primary">{products.length} items</span>
          </p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2.5 rounded-xl font-bold shadow-card hover:shadow-glow transition-all hover:-translate-y-0.5"
        >
          <Plus className="w-4 h-4" /> Add Product
        </button>
      </div>

      {/* Product table */}
      <div className="glass border border-border rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          {loading ? (
            <div className="flex items-center justify-center py-16 gap-3 text-muted-foreground">
              <Loader2 className="w-5 h-5 animate-spin" /> Loading products…
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20">
              <Package className="w-14 h-14 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground font-semibold">No products yet</p>
              <p className="text-sm text-muted-foreground mt-1">Click "Add Product" to get started.</p>
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-section/50">
                  <th className="text-left px-4 py-3 text-xs font-bold text-muted-foreground uppercase">Image</th>
                  <th className="text-left px-4 py-3 text-xs font-bold text-muted-foreground uppercase">Name</th>
                  <th className="text-left px-4 py-3 text-xs font-bold text-muted-foreground uppercase">Brand / Cat</th>
                  <th className="text-left px-4 py-3 text-xs font-bold text-muted-foreground uppercase">Price</th>
                  <th className="text-left px-4 py-3 text-xs font-bold text-muted-foreground uppercase">Stock</th>
                  <th className="text-left px-4 py-3 text-xs font-bold text-muted-foreground uppercase">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.id} className="border-b border-border hover:bg-section/30 transition-colors">
                    <td className="px-4 py-3">
                      <img src={p.img} alt={p.name} className="w-10 h-10 object-contain bg-white rounded-md p-1" onError={(e) => { (e.target as HTMLImageElement).src = "https://placehold.co/40x40/1a1a1a/888?text=No+Img"; }} />
                    </td>
                    <td className="px-4 py-3 font-semibold max-w-[200px]">
                      <span className="truncate block">{p.name}</span>
                      {(p as any).is_best_seller && (
                        <span className="ml-0 mt-0.5 inline-block px-1.5 py-0.5 rounded text-[9px] font-bold bg-orange-500/20 text-orange-400">
                          BEST SELLER
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-xs text-muted-foreground">
                      {p.brand} • {p.categoryLabel || p.category}
                    </td>
                    <td className="px-4 py-3 font-bold text-primary">
                      ₹{p.price.toLocaleString("en-IN")}
                      {p.mrp && p.mrp > p.price && (
                        <span className="ml-2 text-[10px] text-muted-foreground line-through font-normal">
                          ₹{p.mrp.toLocaleString("en-IN")}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase ${p.inStock ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
                        {p.inStock ? "In Stock" : "Out of Stock"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(p)}
                          title="Edit"
                          className="p-1.5 rounded-md bg-section hover:bg-primary/20 hover:text-primary transition-colors"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(p.id)}
                          title="Delete"
                          className="p-1.5 rounded-md bg-section hover:bg-red-500/20 hover:text-red-400 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-2xl glass border border-border rounded-3xl p-6 md:p-8 max-h-[92vh] overflow-y-auto relative animate-fade-up">
            <button
              onClick={() => { setIsModalOpen(false); resetForm(); }}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-section transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="font-display font-black text-2xl mb-6">
              {editingId ? "Edit Product" : "Add New Product"}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                {/* Name */}
                <div>
                  <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. JBL Charge 5"
                    className="w-full px-3 py-2.5 bg-section/50 border border-border rounded-lg text-sm focus:outline-none focus:border-primary transition-colors"
                  />
                </div>

                {/* Brand */}
                <div>
                  <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">
                    Brand *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    placeholder="e.g. JBL"
                    className="w-full px-3 py-2.5 bg-section/50 border border-border rounded-lg text-sm focus:outline-none focus:border-primary transition-colors"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">
                    Category *
                  </label>
                  <select
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2.5 bg-section/50 border border-border rounded-lg text-sm focus:outline-none focus:border-primary transition-colors cursor-pointer"
                  >
                    <option value="">— Select category —</option>
                    {CATEGORIES.map((c) => (
                      <option key={c.slug} value={c.slug}>{c.label}</option>
                    ))}
                  </select>
                </div>

                {/* Selling Price */}
                <div>
                  <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">
                    Selling Price (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="e.g. 12999"
                    className="w-full px-3 py-2.5 bg-section/50 border border-border rounded-lg text-sm focus:outline-none focus:border-primary transition-colors"
                  />
                </div>

                {/* MRP */}
                <div>
                  <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">
                    MRP (₹) <span className="text-muted-foreground font-normal">(optional)</span>
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.mrp}
                    onChange={(e) => setFormData({ ...formData, mrp: e.target.value })}
                    placeholder="e.g. 16999"
                    className="w-full px-3 py-2.5 bg-section/50 border border-border rounded-lg text-sm focus:outline-none focus:border-primary transition-colors"
                  />
                </div>

                {/* Cost Price */}
                <div>
                  <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">
                    Cost Price (₹) <span className="text-muted-foreground font-normal">(for profit calc)</span>
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.cost_price}
                    onChange={(e) => setFormData({ ...formData, cost_price: e.target.value })}
                    placeholder="e.g. 9000"
                    className="w-full px-3 py-2.5 bg-section/50 border border-border rounded-lg text-sm focus:outline-none focus:border-primary transition-colors"
                  />
                </div>

                {/* Image Upload — full width */}
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
                    Product Image *
                  </label>
                  <div className="flex flex-col gap-3">
                    {/* Upload zone */}
                    <label className={`flex flex-col items-center justify-center gap-2 p-5 border-2 border-dashed rounded-xl cursor-pointer transition-colors ${uploading ? "opacity-50 cursor-not-allowed border-border" : "border-primary/40 hover:border-primary hover:bg-primary/5"}`}>
                      {uploading ? (
                        <Loader2 className="w-6 h-6 text-primary animate-spin" />
                      ) : (
                        <ImagePlus className="w-6 h-6 text-primary" />
                      )}
                      <span className="text-xs font-semibold text-primary">
                        {uploading ? "Uploading…" : "Click to upload image"}
                      </span>
                      <span className="text-[10px] text-muted-foreground">PNG, JPG, WEBP — max 5MB</span>
                      <input
                        ref={fileRef}
                        type="file"
                        accept="image/*"
                        disabled={uploading}
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>

                    {/* OR paste URL */}
                    <div className="flex gap-2 items-center">
                      <div className="flex-1 h-px bg-border" />
                      <span className="text-[10px] text-muted-foreground font-semibold">OR PASTE URL</span>
                      <div className="flex-1 h-px bg-border" />
                    </div>
                    <input
                      type="url"
                      value={formData.img_url}
                      onChange={(e) => setFormData((prev) => ({ ...prev, img_url: e.target.value }))}
                      placeholder="https://example.com/image.jpg"
                      className="w-full px-3 py-2.5 bg-section/50 border border-border rounded-lg text-sm focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>

                  {/* Preview */}
                  {formData.img_url && (
                    <div className="mt-3 flex items-center gap-3 p-3 border border-green-500/30 rounded-xl bg-green-500/5">
                      <img
                        src={formData.img_url}
                        alt="Preview"
                        className="w-14 h-14 object-contain rounded-lg bg-white p-1 shrink-0"
                        onError={(e) => { (e.target as HTMLImageElement).src = "https://placehold.co/56x56/1a1a1a/888?text=Error"; }}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-green-400">Image Ready ✓</p>
                        <p className="text-[10px] text-muted-foreground mt-0.5 truncate">{formData.img_url}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setFormData((prev) => ({ ...prev, img_url: "" }))}
                        className="p-1.5 rounded-lg hover:bg-red-500/20 text-muted-foreground hover:text-red-400 transition-colors shrink-0"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Brief product description…"
                  className="w-full px-3 py-2.5 bg-section/50 border border-border rounded-lg text-sm focus:outline-none focus:border-primary transition-colors resize-none"
                />
              </div>

              {/* Checkboxes */}
              <div className="flex flex-wrap gap-6 py-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.in_stock}
                    onChange={(e) => setFormData({ ...formData, in_stock: e.target.checked })}
                    className="w-4 h-4 accent-primary"
                  />
                  <span className="text-sm font-semibold">In Stock</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.is_best_seller}
                    onChange={(e) => setFormData({ ...formData, is_best_seller: e.target.checked })}
                    className="w-4 h-4 accent-primary"
                  />
                  <span className="text-sm font-semibold text-orange-400">Mark as Best Seller</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={submitting || uploading}
                className="w-full py-3 bg-primary text-primary-foreground font-bold rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {submitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving…</> : (editingId ? "Update Product" : "Save Product")}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
