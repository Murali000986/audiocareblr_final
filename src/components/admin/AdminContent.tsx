import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { Plus, Trash2, X, MessageSquareQuote, Briefcase, ImageIcon, Loader2, ImagePlus } from "lucide-react";

type ContentTab = "testimonials" | "portfolio" | "gallery";

export function AdminContent() {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [portfolio, setPortfolio] = useState<any[]>([]);
  const [gallery, setGallery] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<ContentTab>("testimonials");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [galleryUploading, setGalleryUploading] = useState(false);
  const [portUploading, setPortUploading] = useState(false);

  const [testForm, setTestForm] = useState({ name: "", role: "", text: "", rating: "5", avatar_url: "" });
  const [portForm, setPortForm] = useState({ title: "", category: "", img_url: "", description: "" });

  useEffect(() => { fetchData(); }, [activeTab]);

  const fetchData = async () => {
    if (activeTab === "testimonials") {
      const { data } = await supabase.from("testimonials").select("*").order("created_at", { ascending: false });
      if (data) setTestimonials(data);
    } else if (activeTab === "portfolio") {
      const { data } = await supabase.from("portfolio").select("*").order("created_at", { ascending: false });
      if (data) setPortfolio(data);
    } else {
      // Gallery from Supabase Storage
      const { data } = await supabase.storage.from("images").list("gallery", { sortBy: { column: "created_at", order: "desc" } });
      if (data) setGallery(data);
    }
  };

  const handleDelete = async (id: string, table: string) => {
    if (!confirm("Delete this entry?")) return;
    const { error } = await supabase.from(table).delete().eq("id", id);
    if (error) toast.error(error.message);
    else { toast.success("Deleted"); fetchData(); }
  };

  const handleGalleryDelete = async (name: string) => {
    if (!confirm("Delete this image?")) return;
    const { error } = await supabase.storage.from("images").remove([`gallery/${name}`]);
    if (error) toast.error(error.message);
    else { toast.success("Image deleted"); fetchData(); }
  };

  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    const files = Array.from(e.target.files);
    setGalleryUploading(true);
    toast.loading(`Uploading ${files.length} image(s)…`, { id: "gallery-upload" });

    let success = 0;
    for (const file of files) {
      if (file.size > 5 * 1024 * 1024) { toast.error(`${file.name} is too large (max 5MB)`); continue; }
      const ext = file.name.split(".").pop();
      const path = `gallery/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { error } = await supabase.storage.from("images").upload(path, file, { upsert: true });
      if (!error) success++;
    }

    toast.success(`${success} image(s) uploaded!`, { id: "gallery-upload" });
    setGalleryUploading(false);
    fetchData();
  };

  const handlePortImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    const file = e.target.files[0];
    if (file.size > 5 * 1024 * 1024) { toast.error("Image must be under 5MB"); return; }

    setPortUploading(true);
    toast.loading("Uploading image…", { id: "port-upload" });
    const ext = file.name.split(".").pop();
    const path = `portfolio/${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from("images").upload(path, file, { upsert: true });
    if (error) {
      toast.error(error.message, { id: "port-upload" });
    } else {
      const { data } = supabase.storage.from("images").getPublicUrl(path);
      setPortForm((prev) => ({ ...prev, img_url: data.publicUrl }));
      toast.success("Image uploaded!", { id: "port-upload" });
    }
    setPortUploading(false);
  };

  const handleTestimonialSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from("testimonials").insert({ ...testForm, rating: parseInt(testForm.rating) });
    if (error) toast.error(error.message);
    else { toast.success("Testimonial added"); setIsModalOpen(false); setTestForm({ name: "", role: "", text: "", rating: "5", avatar_url: "" }); fetchData(); }
  };

  const handlePortfolioSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!portForm.img_url.trim()) {
      toast.error("Please upload an image or paste an image URL");
      return;
    }
    const { error } = await supabase.from("portfolio").insert(portForm);
    if (error) toast.error(error.message);
    else { toast.success("Portfolio item added"); setIsModalOpen(false); setPortForm({ title: "", category: "", img_url: "", description: "" }); fetchData(); }
  };

  const inputCls = "w-full px-3 py-2 bg-section/50 border border-border rounded-lg text-sm focus:outline-none focus:border-primary";

  const getGalleryUrl = (name: string) =>
    supabase.storage.from("images").getPublicUrl(`gallery/${name}`).data.publicUrl;

  const tabs: { id: ContentTab; label: string; icon: any }[] = [
    { id: "testimonials", label: "Testimonials", icon: MessageSquareQuote },
    { id: "portfolio", label: "Our Work", icon: Briefcase },
    { id: "gallery", label: "Gallery", icon: ImageIcon },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display font-black text-2xl">Content Management</h2>
          <p className="text-muted-foreground text-sm mt-1">Manage testimonials, portfolio, and image gallery.</p>
        </div>
        {activeTab !== "gallery" && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-xl font-bold shadow-card hover:shadow-glow transition-all"
          >
            <Plus className="w-4 h-4" /> Add New
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 flex-wrap">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors ${activeTab === id ? "bg-primary text-primary-foreground" : "bg-section hover:bg-section/80"}`}
          >
            <Icon className="w-4 h-4" /> {label}
          </button>
        ))}
      </div>

      {/* Gallery Tab */}
      {activeTab === "gallery" && (
        <div className="space-y-4">
          {/* Upload zone */}
          <label className={`flex flex-col items-center justify-center gap-3 p-8 border-2 border-dashed rounded-2xl cursor-pointer transition-colors ${galleryUploading ? "opacity-50 cursor-not-allowed border-border" : "border-primary/40 hover:border-primary hover:bg-primary/5"}`}>
            {galleryUploading ? (
              <Loader2 className="w-8 h-8 text-primary animate-spin" />
            ) : (
              <ImagePlus className="w-8 h-8 text-primary" />
            )}
            <div className="text-center">
              <p className="text-sm font-bold text-primary">{galleryUploading ? "Uploading…" : "Click to upload gallery images"}</p>
              <p className="text-xs text-muted-foreground mt-1">PNG, JPG, WEBP — up to 5MB each. Multiple files allowed.</p>
            </div>
            <input type="file" accept="image/*" multiple disabled={galleryUploading} onChange={handleGalleryUpload} className="hidden" />
          </label>

          {/* Gallery grid */}
          {gallery.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <ImageIcon className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p className="text-sm">No images yet — upload some above!</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {gallery.map((img) => (
                <div key={img.name} className="relative group rounded-xl overflow-hidden border border-border aspect-square">
                  <img src={getGalleryUrl(img.name)} alt={img.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button
                      onClick={() => handleGalleryDelete(img.name)}
                      className="p-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Testimonials */}
      {activeTab === "testimonials" && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {testimonials.map(t => (
            <div key={t.id} className="glass border border-border rounded-xl p-5 relative group">
              <button onClick={() => handleDelete(t.id, "testimonials")} className="absolute top-3 right-3 p-1.5 rounded bg-red-500/10 text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 className="w-4 h-4" /></button>
              <div className="flex items-center gap-3 mb-3">
                <img src={t.avatar_url || `https://api.dicebear.com/7.x/initials/svg?seed=${t.name}`} className="w-10 h-10 rounded-full" alt={t.name} />
                <div>
                  <p className="font-bold text-sm">{t.name}</p>
                  <p className="text-[10px] text-muted-foreground">{t.role}</p>
                </div>
              </div>
              <p className="text-xs italic text-muted-foreground line-clamp-3">"{t.text}"</p>
            </div>
          ))}
        </div>
      )}

      {/* Portfolio */}
      {activeTab === "portfolio" && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {portfolio.map(p => (
            <div key={p.id} className="glass border border-border rounded-xl overflow-hidden relative group">
              <button onClick={() => handleDelete(p.id, "portfolio")} className="absolute top-3 right-3 p-1.5 rounded bg-red-500/90 text-white opacity-0 group-hover:opacity-100 transition-opacity z-10"><Trash2 className="w-4 h-4" /></button>
              <img src={p.img_url} className="w-full h-40 object-cover" alt={p.title} />
              <div className="p-4">
                <span className="text-[10px] font-bold text-primary uppercase">{p.category}</span>
                <p className="font-bold text-sm mt-1">{p.title}</p>
                <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{p.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Modal */}
      {isModalOpen && activeTab !== "gallery" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-md glass border border-border rounded-3xl p-6 relative animate-fade-up">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-5 right-5 p-2 rounded-full hover:bg-section transition-colors"><X className="w-5 h-5" /></button>
            <h3 className="font-display font-black text-xl mb-6">Add {activeTab === "testimonials" ? "Testimonial" : "Portfolio Item"}</h3>

            {activeTab === "testimonials" ? (
              <form onSubmit={handleTestimonialSubmit} className="space-y-4">
                <input type="text" required placeholder="Name" value={testForm.name} onChange={e => setTestForm({ ...testForm, name: e.target.value })} className={inputCls} />
                <input type="text" placeholder="Role / Location" value={testForm.role} onChange={e => setTestForm({ ...testForm, role: e.target.value })} className={inputCls} />
                <input type="url" placeholder="Avatar URL (optional)" value={testForm.avatar_url} onChange={e => setTestForm({ ...testForm, avatar_url: e.target.value })} className={inputCls} />
                <input type="number" min="1" max="5" required placeholder="Rating (1–5)" value={testForm.rating} onChange={e => setTestForm({ ...testForm, rating: e.target.value })} className={inputCls} />
                <textarea required placeholder="Testimonial text" rows={3} value={testForm.text} onChange={e => setTestForm({ ...testForm, text: e.target.value })} className={`${inputCls} resize-none`} />
                <button type="submit" className="w-full py-3 bg-primary text-primary-foreground font-bold rounded-xl hover:opacity-90">Save Testimonial</button>
              </form>
            ) : (
              <form onSubmit={handlePortfolioSubmit} className="space-y-4">
                <input type="text" required placeholder="Project Title" value={portForm.title} onChange={e => setPortForm({ ...portForm, title: e.target.value })} className={inputCls} />
                <input type="text" placeholder="Category (e.g. Repair, Installation)" value={portForm.category} onChange={e => setPortForm({ ...portForm, category: e.target.value })} className={inputCls} />
                <div className="space-y-1.5">
                  <label className={`flex flex-col items-center justify-center gap-2 p-3 border-2 border-dashed rounded-xl cursor-pointer transition-colors ${portUploading ? "opacity-50 cursor-not-allowed border-border" : "border-primary/40 hover:border-primary hover:bg-primary/5"}`}>
                    {portUploading ? <Loader2 className="w-4 h-4 text-primary animate-spin" /> : <ImagePlus className="w-4 h-4 text-primary" />}
                    <span className="text-xs font-semibold text-primary">{portUploading ? "Uploading…" : "Upload image"}</span>
                    <input type="file" accept="image/*" disabled={portUploading} onChange={handlePortImageUpload} className="hidden" />
                  </label>
                  <input type="url" placeholder="Or paste image URL" value={portForm.img_url} onChange={e => setPortForm({ ...portForm, img_url: e.target.value })} className={inputCls} />
                  {portForm.img_url && (
                    <img src={portForm.img_url} alt="Preview" className="w-full h-24 object-cover rounded-lg border border-border" />
                  )}
                </div>
                <textarea required placeholder="Project description" rows={3} value={portForm.description} onChange={e => setPortForm({ ...portForm, description: e.target.value })} className={`${inputCls} resize-none`} />
                <button type="submit" className="w-full py-3 bg-primary text-primary-foreground font-bold rounded-xl hover:opacity-90">Save Portfolio Item</button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
