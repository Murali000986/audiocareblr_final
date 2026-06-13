import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { LogOut, LayoutDashboard, Package, Wrench, Menu, X, BookOpen, Image, Shield } from "lucide-react";
import { AdminLogin } from "@/components/admin/AdminLogin";
import { CRMDashboard } from "@/components/admin/CRMDashboard";
import { AdminProducts } from "@/components/admin/AdminProducts";
import { AdminContent } from "@/components/admin/AdminContent";
import { AdminBlogs } from "@/components/admin/AdminBlogs";
import { AdminBackup } from "@/components/admin/AdminBackup";
import { toast } from "sonner";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin Portal — AudioCare" }] }),
  component: AdminPage,
});

function AdminPage() {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [activeTab, setActiveTab] = useState<"dashboard" | "products" | "repairs" | "content" | "blogs" | "backup">("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    checkAdmin();
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => { checkAdmin(); });
    return () => subscription.unsubscribe();
  }, []);

  const ADMIN_EMAILS = ["murali701081@gmail.com", "admin@audiocare.in", "info@audiocare.in", "audiocareblr@gmail.com"];

  const checkAdmin = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    const email = session?.user?.email?.toLowerCase() ?? "";
    const isAdminEmail = ADMIN_EMAILS.includes(email) || email.includes("admin");
    if (session && !isAdminEmail) {
      // Signed in with Google but not an admin email — sign them out immediately
      await supabase.auth.signOut();
      setIsAdmin(false);
      return;
    }
    setIsAdmin(isAdminEmail && email.length > 0);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsAdmin(false);
    toast.success("Logged out from Admin Portal");
    navigate({ to: "/" });
  };

  if (isAdmin === null) return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="animate-pulse text-muted-foreground">Loading…</div>
    </div>
  );
  if (!isAdmin) return <AdminLogin onLogin={checkAdmin} />;

  const navItems = [
    { id: "dashboard", label: "Dashboard",      icon: LayoutDashboard },
    { id: "products",  label: "Products",       icon: Package },
    { id: "blogs",     label: "Blog Posts",     icon: BookOpen },
    { id: "content",   label: "Content",        icon: Image },
    { id: "repairs",   label: "Repairs",        icon: Wrench },
    { id: "backup",    label: "Backup & Restore", icon: Shield },
  ] as const;

  const tabLabels: Record<string, string> = {
    dashboard: "CRM Dashboard",
    products: "Products",
    blogs: "Blog Posts",
    content: "Content Management",
    repairs: "Repair Bookings",
    backup: "Backup & Restore",
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/60 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-section/80 backdrop-blur-xl border-r border-border transform transition-transform lg:relative lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="h-full flex flex-col">
          <div className="p-6 flex items-center justify-between border-b border-border">
            <Link to="/" className="text-primary font-display font-black text-xl">AudioCare</Link>
            <button className="lg:hidden p-1 hover:bg-section rounded-lg" onClick={() => setSidebarOpen(false)}>
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="px-3 py-4 flex-1">
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-3 ml-2">Menu</p>
            <nav className="space-y-1">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => { setActiveTab(item.id); setSidebarOpen(false); }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold transition-all ${
                    activeTab === item.id
                      ? "bg-primary text-primary-foreground shadow-card"
                      : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-4 border-t border-border">
            <div className="bg-background rounded-xl p-4 border border-border">
              <p className="text-xs font-bold mb-0.5">Admin User</p>
              <p className="text-[10px] text-muted-foreground mb-3">Super Admin</p>
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-red-500/10 text-red-500 text-xs font-bold hover:bg-red-500/20 transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" /> Logout
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col min-w-0 max-h-screen overflow-y-auto">
        <header className="sticky top-0 z-30 glass border-b border-border px-4 lg:px-8 py-4 flex items-center gap-4">
          <button className="lg:hidden p-2 rounded-md hover:bg-section" onClick={() => setSidebarOpen(true)}>
            <Menu className="w-5 h-5" />
          </button>
          <h1 className="font-display font-black text-xl">{tabLabels[activeTab]}</h1>
        </header>

        <div className="flex-1 p-4 lg:p-8">
          {activeTab === "dashboard" && <CRMDashboard />}
          {activeTab === "products"  && <AdminProducts />}
          {activeTab === "blogs"     && <AdminBlogs />}
          {activeTab === "content"   && <AdminContent />}
          {activeTab === "repairs"   && <RepairsView />}
          {activeTab === "backup"    && <AdminBackup />}
        </div>
      </main>
    </div>
  );
}

function RepairsView() {
  const [repairs, setRepairs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRepair, setSelectedRepair] = useState<any | null>(null);

  const fetchRepairs = async () => {
    setLoading(true);
    const { data } = await supabase.from("repair_bookings").select("*").order("created_at", { ascending: false });
    if (data) setRepairs(data);
    setLoading(false);
  };
  useEffect(() => { fetchRepairs(); }, []);

  const updateStatus = async (id: string, status: string) => {
    await supabase.from("repair_bookings").update({ status }).eq("id", id);
    fetchRepairs();
    if (selectedRepair?.id === id) setSelectedRepair({ ...selectedRepair, status });
  };

  const statuses = ["booked", "picked-up", "in-repair", "done", "cancelled"];

  return (
    <>
      <div className="glass border border-border rounded-2xl overflow-hidden relative">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-section/50">
                {["Ref", "Name", "Device", "Status", "Action"].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-bold text-muted-foreground uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading
                ? <tr><td colSpan={5} className="p-8 text-center text-muted-foreground">Loading…</td></tr>
                : repairs.map(r => (
                  <tr key={r.id} className="border-b border-border hover:bg-section/30">
                    <td 
                      className="px-4 py-3 font-mono text-xs text-primary cursor-pointer hover:underline"
                      onClick={() => setSelectedRepair(r)}
                    >
                      #{r.booking_ref}
                    </td>
                    <td className="px-4 py-3 text-xs">
                      <div className="font-bold">{r.name}</div>
                      <div className="text-[10px] text-muted-foreground">{r.phone}</div>
                    </td>
                    <td className="px-4 py-3 text-xs">{r.brand} {r.device}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${r.status === "done" ? "bg-green-500/20 text-green-400" : "bg-purple-500/20 text-purple-400"}`}>
                        {r.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <select value={r.status} onChange={e => updateStatus(r.id, e.target.value)} className="text-xs px-2 py-1 rounded border border-border bg-section cursor-pointer">
                        {statuses.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Repair Details Modal */}
      {selectedRepair && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-lg glass border border-border rounded-3xl p-6 relative animate-fade-up">
            <button onClick={() => setSelectedRepair(null)} className="absolute top-5 right-5 p-2 rounded-full hover:bg-section transition-colors">
              <X className="w-5 h-5" />
            </button>
            <h3 className="font-display font-black text-xl mb-1">Repair Details</h3>
            <p className="text-primary font-mono text-sm mb-6">#{selectedRepair.booking_ref}</p>
            
            <div className="space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-4">
                <div><span className="block text-xs text-muted-foreground mb-1">Customer Name</span> <span className="font-bold">{selectedRepair.name}</span></div>
                <div><span className="block text-xs text-muted-foreground mb-1">Phone Number</span> <a href={`tel:${selectedRepair.phone}`} className="text-primary hover:underline">{selectedRepair.phone}</a></div>
                <div><span className="block text-xs text-muted-foreground mb-1">Email Address</span> <a href={`mailto:${selectedRepair.email}`} className="text-primary hover:underline">{selectedRepair.email}</a></div>
                <div><span className="block text-xs text-muted-foreground mb-1">Preferred Date</span> <span>{selectedRepair.preferred_date || "Not set"}</span></div>
              </div>
              
              <div className="border-t border-border pt-4 mt-4">
                <span className="block text-xs text-muted-foreground mb-1">Device & Brand</span>
                <div className="font-bold">{selectedRepair.brand} — {selectedRepair.device}</div>
              </div>
              
              <div>
                <span className="block text-xs text-muted-foreground mb-1">Reported Issue</span>
                <div className="bg-section p-3 rounded-xl border border-border text-muted-foreground whitespace-pre-wrap">
                  {selectedRepair.issue}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 border-t border-border pt-4">
                <div>
                  <span className="block text-xs text-muted-foreground mb-1">Service Mode</span>
                  <span className="capitalize font-bold">{selectedRepair.pickup_mode === "pickup" ? "Free Doorstep Pickup" : "Drop at Store"}</span>
                </div>
                <div>
                  <span className="block text-xs text-muted-foreground mb-1">Current Status</span>
                  <select value={selectedRepair.status} onChange={e => updateStatus(selectedRepair.id, e.target.value)} className="w-full text-xs px-2 py-1.5 rounded border border-border bg-section cursor-pointer">
                    {statuses.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
