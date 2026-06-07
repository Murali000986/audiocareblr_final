import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, X, ImagePlus, Loader2, Eye, EyeOff, BookOpen, Tag } from "lucide-react";

interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image: string;
  tags: string[];
  published: boolean;
  created_at: string;
}

const emptyForm = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  featured_image: "",
  tags: "",
  published: false,
};

export function AdminBlogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [uploading, setUploading] = useState(false);

  const fetchBlogs = async () => {
    setLoading(true);
    const { data } = await supabase.from("blogs").select("*").order("created_at", { ascending: false });
    if (data) setBlogs(data as Blog[]);
    setLoading(false);
  };

  useEffect(() => { fetchBlogs(); }, []);

  const generateSlug = (title: string) =>
    title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  const handleTitleChange = (val: string) => {
    setForm((prev) => ({
      ...prev,
      title: val,
      // Only auto-generate slug if not editing
      slug: editingId ? prev.slug : generateSlug(val),
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    const file = e.target.files[0];
    if (file.size > 5 * 1024 * 1024) { toast.error("Image must be under 5MB"); return; }

    setUploading(true);
    toast.loading("Uploading image…", { id: "blog-upload" });
    const ext = file.name.split(".").pop();
    const path = `blogs/${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from("images").upload(path, file, { upsert: true });
    if (error) {
      toast.error(error.message, { id: "blog-upload" });
    } else {
      const { data } = supabase.storage.from("images").getPublicUrl(path);
      setForm((prev) => ({ ...prev, featured_image: data.publicUrl }));
      toast.success("Image uploaded!", { id: "blog-upload" });
    }
    setUploading(false);
  };

  const openCreate = () => {
    setForm(emptyForm);
    setEditingId(null);
    setIsModalOpen(true);
  };

  const openEdit = (b: Blog) => {
    setForm({
      title: b.title,
      slug: b.slug,
      excerpt: b.excerpt ?? "",
      content: b.content ?? "",
      featured_image: b.featured_image ?? "",
      tags: b.tags?.join(", ") ?? "",
      published: b.published,
    });
    setEditingId(b.id);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this blog post?")) return;
    const { error } = await supabase.from("blogs").delete().eq("id", id);
    if (error) toast.error(error.message);
    else { toast.success("Blog post deleted"); fetchBlogs(); }
  };

  const togglePublish = async (b: Blog) => {
    const { error } = await supabase.from("blogs").update({ published: !b.published }).eq("id", b.id);
    if (error) toast.error(error.message);
    else { toast.success(b.published ? "Post unpublished" : "Post published!"); fetchBlogs(); }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      title: form.title,
      slug: form.slug || generateSlug(form.title),
      excerpt: form.excerpt,
      content: form.content,
      featured_image: form.featured_image,
      tags: form.tags ? form.tags.split(",").map((t) => t.trim()).filter(Boolean) : [],
      published: form.published,
    };

    let error;
    if (editingId) {
      ({ error } = await supabase.from("blogs").update(payload).eq("id", editingId));
    } else {
      ({ error } = await supabase.from("blogs").insert(payload));
    }

    if (error) toast.error(error.message);
    else {
      toast.success(editingId ? "Blog updated!" : "Blog post created!");
      setIsModalOpen(false);
      fetchBlogs();
    }
  };

  const inputCls = "w-full px-3 py-2.5 bg-section/50 border border-border rounded-lg text-sm focus:outline-none focus:border-primary transition-colors";
  const labelCls = "block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display font-black text-2xl">Blog Posts</h2>
          <p className="text-muted-foreground text-sm mt-1">Create and manage blog articles visible on the website.</p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2.5 rounded-xl font-bold shadow-card hover:shadow-glow transition-all"
        >
          <Plus className="w-4 h-4" /> New Post
        </button>
      </div>

      {/* Blog List */}
      {loading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : blogs.length === 0 ? (
        <div className="text-center py-20 glass border border-border rounded-2xl">
          <BookOpen className="w-14 h-14 text-muted-foreground/30 mx-auto mb-4" />
          <h3 className="font-bold text-lg text-muted-foreground">No blog posts yet</h3>
          <p className="text-sm text-muted-foreground mt-1">Click "New Post" to create your first blog article.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {blogs.map((b) => (
            <div key={b.id} className="glass border border-border rounded-xl p-4 flex items-center gap-4 group">
              {/* Image thumbnail */}
              {b.featured_image ? (
                <img src={b.featured_image} alt={b.title} className="w-16 h-16 object-cover rounded-lg shrink-0" />
              ) : (
                <div className="w-16 h-16 bg-section rounded-lg flex items-center justify-center shrink-0">
                  <BookOpen className="w-6 h-6 text-muted-foreground/40" />
                </div>
              )}

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-bold text-sm truncate">{b.title}</h3>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${b.published ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"}`}>
                    {b.published ? "Published" : "Draft"}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{b.excerpt || "No excerpt"}</p>
                <div className="flex items-center gap-3 mt-1.5">
                  <span className="text-[10px] text-muted-foreground">
                    {new Date(b.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                  </span>
                  {b.tags?.length > 0 && (
                    <div className="flex items-center gap-1">
                      <Tag className="w-2.5 h-2.5 text-muted-foreground" />
                      <span className="text-[10px] text-muted-foreground">{b.tags.slice(0, 3).join(", ")}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => togglePublish(b)}
                  title={b.published ? "Unpublish" : "Publish"}
                  className={`p-2 rounded-lg transition-colors ${b.published ? "bg-green-500/10 text-green-400 hover:bg-green-500/20" : "bg-section hover:bg-yellow-500/20 hover:text-yellow-400"}`}
                >
                  {b.published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
                <button onClick={() => openEdit(b)} className="p-2 rounded-lg bg-section hover:bg-primary/20 hover:text-primary transition-colors">
                  <Pencil className="w-4 h-4" />
                </button>
                <button onClick={() => handleDelete(b.id)} className="p-2 rounded-lg bg-section hover:bg-red-500/20 hover:text-red-400 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-2xl glass border border-border rounded-3xl p-6 md:p-8 max-h-[92vh] overflow-y-auto relative animate-fade-up">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-5 right-5 p-2 rounded-full hover:bg-section transition-colors">
              <X className="w-5 h-5" />
            </button>
            <h3 className="font-display font-black text-2xl mb-6">{editingId ? "Edit Blog Post" : "New Blog Post"}</h3>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Title */}
              <div>
                <label className={labelCls}>Title *</label>
                <input type="text" required value={form.title} onChange={(e) => handleTitleChange(e.target.value)} className={inputCls} placeholder="e.g. How to Choose the Right Speaker" />
              </div>

              {/* Slug */}
              <div>
                <label className={labelCls}>URL Slug</label>
                <input type="text" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} className={inputCls} placeholder="auto-generated-from-title" />
                <p className="text-[10px] text-muted-foreground mt-1">This is the URL: /blog/<strong>{form.slug || "your-slug"}</strong></p>
              </div>

              {/* Excerpt */}
              <div>
                <label className={labelCls}>Excerpt (Short summary shown on blog list)</label>
                <textarea rows={2} value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} className={`${inputCls} resize-none`} placeholder="A short description of this post…" />
              </div>

              {/* Featured Image */}
              <div>
                <label className={labelCls}>Featured Image</label>
                <label className={`flex flex-col items-center justify-center gap-2 p-4 border-2 border-dashed rounded-xl cursor-pointer transition-colors ${uploading ? "opacity-50 cursor-not-allowed border-border" : "border-primary/40 hover:border-primary hover:bg-primary/5"}`}>
                  {uploading ? <Loader2 className="w-5 h-5 text-primary animate-spin" /> : <ImagePlus className="w-5 h-5 text-primary" />}
                  <span className="text-xs font-semibold text-primary">{uploading ? "Uploading…" : "Click to upload image"}</span>
                  <input type="file" accept="image/*" disabled={uploading} onChange={handleImageUpload} className="hidden" />
                </label>
                <div className="flex gap-2 items-center my-2">
                  <div className="flex-1 h-px bg-border" />
                  <span className="text-[10px] text-muted-foreground font-semibold">OR PASTE URL</span>
                  <div className="flex-1 h-px bg-border" />
                </div>
                <input type="url" value={form.featured_image} onChange={(e) => setForm({ ...form, featured_image: e.target.value })} placeholder="https://example.com/image.jpg" className={inputCls} />
                {form.featured_image && (
                  <div className="mt-3 rounded-xl overflow-hidden border border-green-500/30 bg-green-500/5">
                    <img src={form.featured_image} alt="Preview" className="w-full h-40 object-cover" />
                  </div>
                )}
              </div>

              {/* Content */}
              <div>
                <label className={labelCls}>Content *</label>
                <textarea
                  rows={12}
                  required
                  value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                  className={`${inputCls} resize-y font-mono text-xs`}
                  placeholder="Write your full blog post content here…&#10;&#10;Use blank lines to separate paragraphs."
                />
                <p className="text-[10px] text-muted-foreground mt-1">Tip: Use blank lines between paragraphs. Content will display as formatted text.</p>
              </div>

              {/* Tags */}
              <div>
                <label className={labelCls}>Tags (comma separated)</label>
                <input type="text" value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} className={inputCls} placeholder="e.g. Speaker, Repair, JBL, Tips" />
              </div>

              {/* Published toggle */}
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} className="w-4 h-4 accent-primary" />
                <div>
                  <span className="text-sm font-semibold">Publish immediately</span>
                  <p className="text-[10px] text-muted-foreground">If unchecked, saved as draft (not visible on website)</p>
                </div>
              </label>

              <button type="submit" className="w-full py-3 bg-primary text-primary-foreground font-bold rounded-xl hover:opacity-90 transition-opacity text-sm">
                {editingId ? "Update Post" : "Publish Post"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
