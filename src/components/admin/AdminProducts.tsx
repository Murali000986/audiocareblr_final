import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, X, ImagePlus, Loader2 } from "lucide-react";
import { useProductsCache } from "@/contexts/ProductsCacheContext";
import type { Product } from "@/data/sampleData";

export function AdminProducts() {
  const { products, refresh } = useProductsCache();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
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
  });

  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (!e.target.files || e.target.files.length === 0) return;
      const file = e.target.files[0];

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image must be smaller than 5MB');
        return;
      }

      setUploading(true);
      toast.loading("Uploading image...", { id: "upload" });
      
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `products/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, file, { upsert: true });
      
      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from('images').getPublicUrl(filePath);
      // Use functional update to avoid stale closure
      setFormData(prev => ({ ...prev, img_url: data.publicUrl }));
      toast.success('Image uploaded!', { id: "upload" });
    } catch (error: any) {
      toast.error(error.message || 'Upload failed — make sure the "images" bucket exists in Supabase Storage', { id: "upload" });
    } finally {
      setUploading(false);
    }
  };

  const resetForm = () => {
    setFormData({ name: "", category: "", brand: "", price: "", mrp: "", img_url: "", description: "", in_stock: true, is_best_seller: false, cost_price: "" });
    setEditingId(null);
  };

  const handleEdit = (p: Product) => {
    // we need raw data if possible, but we can infer from product
    setFormData({
      name: p.name,
      category: p.category,
      brand: p.brand,
      price: p.price.toString(),
      mrp: p.mrp?.toString() || "",
      img_url: p.img,
      description: p.description,
      in_stock: p.inStock,
      is_best_seller: (p as any).is_best_seller || false,
      cost_price: (p as any).cost_price?.toString() || "",
    });
    setEditingId(p.id);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) toast.error(error.message);
    else { toast.success("Product deleted"); refresh(); }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.img_url) {
      toast.error("Please upload an image or provide an Image URL");
      return;
    }

    const payload = {
      id: editingId || formData.name.toLowerCase().replace(/\s+/g, '-'),
      name: formData.name,
      category: formData.category,
      brand: formData.brand,
      price: Number(formData.price),
      mrp: formData.mrp ? Number(formData.mrp) : null,
      img_url: formData.img_url,
      description: formData.description,
      in_stock: formData.in_stock,
      is_best_seller: formData.is_best_seller,
      cost_price: formData.cost_price ? Number(formData.cost_price) : null,
    };

    let error;
    if (editingId) {
      const res = await supabase.from("products").update(payload).eq("id", editingId);
      error = res.error;
    } else {
      const res = await supabase.from("products").insert(payload);
      error = res.error;
    }

    if (error) {
      toast.error(error.message);
    } else {
      toast.success(editingId ? "Product updated" : "Product added");
      setIsModalOpen(false);
      resetForm();
      refresh(); // Refresh the global cache
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display font-black text-2xl">Products</h2>
          <p className="text-muted-foreground text-sm">Manage your catalog, pricing, and stock.</p>
        </div>
        <button 
          onClick={() => { resetForm(); setIsModalOpen(true); }}
          className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-xl font-bold shadow-card hover:shadow-glow transition-all"
        >
          <Plus className="w-4 h-4" /> Add Product
        </button>
      </div>

      <div className="glass border border-border rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
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
              {products.map(p => (
                <tr key={p.id} className="border-b border-border hover:bg-section/30 transition-colors">
                  <td className="px-4 py-3"><img src={p.img} alt={p.name} className="w-10 h-10 object-contain bg-white rounded-md p-1" /></td>
                  <td className="px-4 py-3 font-semibold">
                    {p.name}
                    {(p as any).is_best_seller && <span className="ml-2 px-1.5 py-0.5 rounded text-[9px] font-bold bg-orange-500/20 text-orange-400">BEST SELLER</span>}
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">{p.brand} • {p.category}</td>
                  <td className="px-4 py-3 font-bold text-primary">₹{p.price.toLocaleString("en-IN")}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase ${p.inStock ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
                      {p.inStock ? "In Stock" : "Out of Stock"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button onClick={() => handleEdit(p)} className="p-1.5 rounded-md bg-section hover:bg-primary/20 hover:text-primary transition-colors"><Pencil className="w-3.5 h-3.5" /></button>
                      <button onClick={() => handleDelete(p.id)} className="p-1.5 rounded-md bg-section hover:bg-red-500/20 hover:text-red-400 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-2xl glass border border-border rounded-3xl p-6 md:p-8 max-h-[90vh] overflow-y-auto relative animate-fade-up">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 p-2 rounded-full hover:bg-section transition-colors">
              <X className="w-5 h-5" />
            </button>
            <h3 className="font-display font-black text-2xl mb-6">{editingId ? "Edit Product" : "Add New Product"}</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-muted-foreground uppercase mb-1">Product Name *</label>
                  <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-3 py-2 bg-section/50 border border-border rounded-lg text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-muted-foreground uppercase mb-1">Brand *</label>
                  <input type="text" required value={formData.brand} onChange={e => setFormData({...formData, brand: e.target.value})} className="w-full px-3 py-2 bg-section/50 border border-border rounded-lg text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-muted-foreground uppercase mb-1">Category (Slug) *</label>
                  <input type="text" required value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} placeholder="e.g. bluetooth-speakers" className="w-full px-3 py-2 bg-section/50 border border-border rounded-lg text-sm" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-muted-foreground uppercase mb-2">Product Image *</label>
                  <div className="flex flex-col gap-3">
                    {/* Upload zone */}
                    <label className={`flex flex-col items-center justify-center gap-2 p-4 border-2 border-dashed rounded-xl cursor-pointer transition-colors ${uploading ? 'opacity-50 cursor-not-allowed border-border' : 'border-primary/40 hover:border-primary hover:bg-primary/5'}`}>
                      {uploading ? (
                        <Loader2 className="w-6 h-6 text-primary animate-spin" />
                      ) : (
                        <ImagePlus className="w-6 h-6 text-primary" />
                      )}
                      <span className="text-xs font-semibold text-primary">{uploading ? 'Uploading...' : 'Click to upload image'}</span>
                      <span className="text-[10px] text-muted-foreground">PNG, JPG, WEBP up to 5MB</span>
                      <input type="file" accept="image/*" disabled={uploading} onChange={handleImageUpload} className="hidden" />
                    </label>
                    {/* OR paste URL */}
                    <div className="flex gap-2 items-center">
                      <div className="flex-1 h-px bg-border" />
                      <span className="text-[10px] text-muted-foreground font-semibold">OR PASTE URL</span>
                      <div className="flex-1 h-px bg-border" />
                    </div>
                    <input type="url" value={formData.img_url} onChange={e => setFormData(prev => ({...prev, img_url: e.target.value}))} placeholder="https://example.com/image.jpg" className="w-full px-3 py-2 bg-section/50 border border-border rounded-lg text-sm" />
                  </div>
                  {/* Preview */}
                  {formData.img_url && (
                    <div className="mt-3 flex items-center gap-3 p-3 border border-green-500/30 rounded-xl bg-green-500/5">
                      <img src={formData.img_url} alt="Preview" className="w-14 h-14 object-contain rounded-lg bg-white p-1" />
                      <div>
                        <p className="text-xs font-bold text-green-400">Image Ready ✓</p>
                        <p className="text-[10px] text-muted-foreground mt-0.5 truncate max-w-[200px]">{formData.img_url}</p>
                      </div>
                      <button type="button" onClick={() => setFormData(prev => ({...prev, img_url: ''}))} className="ml-auto p-1 rounded hover:bg-red-500/20 text-muted-foreground hover:text-red-400 transition-colors">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-bold text-muted-foreground uppercase mb-1">Selling Price (₹) *</label>
                  <input type="number" required min="0" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full px-3 py-2 bg-section/50 border border-border rounded-lg text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-muted-foreground uppercase mb-1">MRP (₹)</label>
                  <input type="number" min="0" value={formData.mrp} onChange={e => setFormData({...formData, mrp: e.target.value})} className="w-full px-3 py-2 bg-section/50 border border-border rounded-lg text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-muted-foreground uppercase mb-1">Cost Price (₹) (For CRM Profit)</label>
                  <input type="number" min="0" value={formData.cost_price} onChange={e => setFormData({...formData, cost_price: e.target.value})} className="w-full px-3 py-2 bg-section/50 border border-border rounded-lg text-sm" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-muted-foreground uppercase mb-1">Description</label>
                <textarea rows={3} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full px-3 py-2 bg-section/50 border border-border rounded-lg text-sm resize-none" />
              </div>

              <div className="flex gap-6 py-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={formData.in_stock} onChange={e => setFormData({...formData, in_stock: e.target.checked})} className="w-4 h-4 accent-primary" />
                  <span className="text-sm font-semibold">In Stock</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={formData.is_best_seller} onChange={e => setFormData({...formData, is_best_seller: e.target.checked})} className="w-4 h-4 accent-primary" />
                  <span className="text-sm font-semibold text-orange-400">Mark as Best Seller</span>
                </label>
              </div>

              <button type="submit" className="w-full py-3 bg-primary text-primary-foreground font-bold rounded-xl hover:opacity-90 transition-opacity">
                {editingId ? "Update Product" : "Save Product"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
