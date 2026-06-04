import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { Plus, Trash2, X, MessageSquareQuote, Briefcase } from "lucide-react";

export function AdminContent() {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [portfolio, setPortfolio] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<"testimonials" | "portfolio">("testimonials");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Forms
  const [testForm, setTestForm] = useState({ name: "", role: "", text: "", rating: "5", avatar_url: "" });
  const [portForm, setPortForm] = useState({ title: "", category: "", img_url: "", description: "" });

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    if (activeTab === "testimonials") {
      const { data } = await supabase.from("testimonials").select("*").order("created_at", { ascending: false });
      if (data) setTestimonials(data);
    } else {
      const { data } = await supabase.from("portfolio").select("*").order("created_at", { ascending: false });
      if (data) setPortfolio(data);
    }
  };

  const handleDelete = async (id: string, table: string) => {
    if (!confirm("Delete this entry?")) return;
    const { error } = await supabase.from(table).delete().eq("id", id);
    if (error) toast.error(error.message);
    else { toast.success("Deleted successfully"); fetchData(); }
  };

  const handleTestimonialSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from("testimonials").insert({
      ...testForm,
      rating: parseInt(testForm.rating)
    });
    if (error) toast.error(error.message);
    else { toast.success("Testimonial added"); setIsModalOpen(false); setTestForm({ name: "", role: "", text: "", rating: "5", avatar_url: "" }); fetchData(); }
  };

  const handlePortfolioSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from("portfolio").insert(portForm);
    if (error) toast.error(error.message);
    else { toast.success("Portfolio item added"); setIsModalOpen(false); setPortForm({ title: "", category: "", img_url: "", description: "" }); fetchData(); }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display font-black text-2xl">Content Management</h2>
          <p className="text-muted-foreground text-sm">Manage website content (Testimonials, Portfolio).</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-xl font-bold shadow-card hover:shadow-glow transition-all"
        >
          <Plus className="w-4 h-4" /> Add New
        </button>
      </div>

      <div className="flex gap-2">
        <button onClick={() => setActiveTab("testimonials")} className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 ${activeTab === "testimonials" ? "bg-primary text-primary-foreground" : "bg-section hover:bg-section/80"}`}>
          <MessageSquareQuote className="w-4 h-4" /> Testimonials
        </button>
        <button onClick={() => setActiveTab("portfolio")} className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 ${activeTab === "portfolio" ? "bg-primary text-primary-foreground" : "bg-section hover:bg-section/80"}`}>
          <Briefcase className="w-4 h-4" /> Our Work
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {activeTab === "testimonials" && testimonials.map(t => (
          <div key={t.id} className="glass border border-border rounded-xl p-5 relative group">
            <button onClick={() => handleDelete(t.id, "testimonials")} className="absolute top-3 right-3 p-1.5 rounded bg-red-500/10 text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 className="w-4 h-4" /></button>
            <div className="flex items-center gap-3 mb-3">
              <img src={t.avatar_url || `https://api.dicebear.com/7.x/initials/svg?seed=${t.name}`} className="w-10 h-10 rounded-full" />
              <div>
                <p className="font-bold text-sm">{t.name}</p>
                <p className="text-[10px] text-muted-foreground">{t.role}</p>
              </div>
            </div>
            <p className="text-xs italic text-muted-foreground line-clamp-3">"{t.text}"</p>
          </div>
        ))}

        {activeTab === "portfolio" && portfolio.map(p => (
          <div key={p.id} className="glass border border-border rounded-xl overflow-hidden relative group">
            <button onClick={() => handleDelete(p.id, "portfolio")} className="absolute top-3 right-3 p-1.5 rounded bg-red-500/90 text-white opacity-0 group-hover:opacity-100 transition-opacity z-10"><Trash2 className="w-4 h-4" /></button>
            <img src={p.img_url} className="w-full h-40 object-cover" />
            <div className="p-4">
              <span className="text-[10px] font-bold text-primary uppercase">{p.category}</span>
              <p className="font-bold text-sm mt-1">{p.title}</p>
              <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{p.description}</p>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-md glass border border-border rounded-3xl p-6 relative animate-fade-up">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 p-2 rounded-full hover:bg-section transition-colors">
              <X className="w-5 h-5" />
            </button>
            <h3 className="font-display font-black text-xl mb-6">Add {activeTab === "testimonials" ? "Testimonial" : "Portfolio Item"}</h3>
            
            {activeTab === "testimonials" ? (
              <form onSubmit={handleTestimonialSubmit} className="space-y-4">
                <input type="text" required placeholder="Name" value={testForm.name} onChange={e => setTestForm({...testForm, name: e.target.value})} className="w-full px-3 py-2 bg-section/50 border border-border rounded-lg text-sm" />
                <input type="text" placeholder="Role / Location" value={testForm.role} onChange={e => setTestForm({...testForm, role: e.target.value})} className="w-full px-3 py-2 bg-section/50 border border-border rounded-lg text-sm" />
                <input type="url" placeholder="Avatar URL (Optional)" value={testForm.avatar_url} onChange={e => setTestForm({...testForm, avatar_url: e.target.value})} className="w-full px-3 py-2 bg-section/50 border border-border rounded-lg text-sm" />
                <input type="number" min="1" max="5" required placeholder="Rating (1-5)" value={testForm.rating} onChange={e => setTestForm({...testForm, rating: e.target.value})} className="w-full px-3 py-2 bg-section/50 border border-border rounded-lg text-sm" />
                <textarea required placeholder="Testimonial Text" rows={3} value={testForm.text} onChange={e => setTestForm({...testForm, text: e.target.value})} className="w-full px-3 py-2 bg-section/50 border border-border rounded-lg text-sm resize-none" />
                <button type="submit" className="w-full py-3 bg-primary text-primary-foreground font-bold rounded-xl hover:opacity-90 transition-opacity">Save Testimonial</button>
              </form>
            ) : (
              <form onSubmit={handlePortfolioSubmit} className="space-y-4">
                <input type="text" required placeholder="Project Title" value={portForm.title} onChange={e => setPortForm({...portForm, title: e.target.value})} className="w-full px-3 py-2 bg-section/50 border border-border rounded-lg text-sm" />
                <input type="text" placeholder="Category (e.g. Repair, Installation)" value={portForm.category} onChange={e => setPortForm({...portForm, category: e.target.value})} className="w-full px-3 py-2 bg-section/50 border border-border rounded-lg text-sm" />
                <input type="url" required placeholder="Image URL" value={portForm.img_url} onChange={e => setPortForm({...portForm, img_url: e.target.value})} className="w-full px-3 py-2 bg-section/50 border border-border rounded-lg text-sm" />
                <textarea required placeholder="Project Description" rows={3} value={portForm.description} onChange={e => setPortForm({...portForm, description: e.target.value})} className="w-full px-3 py-2 bg-section/50 border border-border rounded-lg text-sm resize-none" />
                <button type="submit" className="w-full py-3 bg-primary text-primary-foreground font-bold rounded-xl hover:opacity-90 transition-opacity">Save Portfolio Item</button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
