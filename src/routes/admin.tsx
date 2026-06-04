import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { LogOut, LayoutDashboard, Package, ShoppingCart, Wrench, FileText, Menu, X } from "lucide-react";
import { AdminLogin } from "@/components/admin/AdminLogin";
import { CRMDashboard } from "@/components/admin/CRMDashboard";
import { AdminProducts } from "@/components/admin/AdminProducts";
import { AdminContent } from "@/components/admin/AdminContent";
import { toast } from "sonner";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin Portal — AudioCare" }] }),
  component: AdminPage,
});

function AdminPage() {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [activeTab, setActiveTab] = useState<"dashboard" | "products" | "orders" | "repairs" | "content">("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    checkAdmin();
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      checkAdmin();
    });
    return () => subscription.unsubscribe();
  }, []);

  const checkAdmin = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    const email = session?.user?.email;
    if (email?.includes("admin") || email === "murali701081@gmail.com") {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsAdmin(false);
    toast.success("Logged out from Admin Portal");
    navigate({ to: "/" });
  };

  if (isAdmin === null) return <div className="min-h-screen bg-background flex items-center justify-center">Loading...</div>;
  if (!isAdmin) return <AdminLogin onLogin={checkAdmin} />;

  const navItems = [
    { id: "dashboard", label: "CRM Dashboard", icon: LayoutDashboard },
    { id: "products", label: "Products", icon: Package },
    { id: "orders", label: "Orders", icon: ShoppingCart },
    { id: "repairs", label: "Repairs", icon: Wrench },
    { id: "content", label: "Content Mgmt", icon: FileText },
  ] as const;

  return (
    <div className="min-h-screen bg-background flex">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/60 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-section/80 backdrop-blur-xl border-r border-border transform transition-transform lg:relative lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="h-full flex flex-col">
          <div className="p-6 flex items-center justify-between">
            <Link to="/" className="text-primary font-display font-black text-xl">AudioCare</Link>
            <button className="lg:hidden" onClick={() => setSidebarOpen(false)}><X className="w-5 h-5" /></button>
          </div>
          
          <div className="px-4 py-2">
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-4 ml-2">Menu</p>
            <nav className="space-y-1.5">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => { setActiveTab(item.id); setSidebarOpen(false); }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold transition-all ${
                    activeTab === item.id ? "bg-primary text-primary-foreground shadow-card" : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="mt-auto p-4 border-t border-border">
            <div className="bg-background rounded-xl p-4 border border-border">
              <p className="text-xs font-bold mb-1">Admin User</p>
              <p className="text-[10px] text-muted-foreground mb-3 truncate">Super Admin</p>
              <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-red-500/10 text-red-500 text-xs font-bold hover:bg-red-500/20 transition-colors">
                <LogOut className="w-3.5 h-3.5" /> Logout
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 max-h-screen overflow-y-auto">
        <header className="sticky top-0 z-30 glass border-b border-border px-4 lg:px-8 py-4 flex items-center gap-4">
          <button className="lg:hidden p-2 rounded-md hover:bg-section" onClick={() => setSidebarOpen(true)}>
            <Menu className="w-5 h-5" />
          </button>
          <div>
            <h1 className="font-display font-black text-xl capitalize">{activeTab}</h1>
          </div>
        </header>

        <div className="flex-1 p-4 lg:p-8">
          {activeTab === "dashboard" && <CRMDashboard />}
          {activeTab === "products" && <AdminProducts />}
          {activeTab === "orders" && <OrdersView />}
          {activeTab === "repairs" && <RepairsView />}
          {activeTab === "content" && <AdminContent />}
        </div>
      </main>
    </div>
  );
}

// Minimal versions of Orders and Repairs views extracted from old admin.tsx
function OrdersView() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    setLoading(true);
    const { data } = await supabase.from("orders").select("*").order("created_at", { ascending: false });
    if (data) setOrders(data);
    setLoading(false);
  };
  useEffect(() => { fetchOrders(); }, []);

  const updateStatus = async (id: string, status: string) => {
    await supabase.from("orders").update({ status }).eq("id", id);
    fetchOrders();
  };

  const statuses = ["confirmed", "processing", "shipped", "delivered", "cancelled"];

  return (
    <div className="glass border border-border rounded-2xl overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-section/50">
            {["Order ID", "Date", "Total", "Status", "Action"].map(h => <th key={h} className="text-left px-4 py-3 text-xs font-bold text-muted-foreground uppercase">{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {loading ? <tr><td colSpan={5} className="p-4 text-center">Loading...</td></tr> : orders.map(o => (
            <tr key={o.id} className="border-b border-border hover:bg-section/30">
              <td className="px-4 py-3 font-mono text-xs">#{o.id.slice(0,8).toUpperCase()}</td>
              <td className="px-4 py-3 text-xs">{new Date(o.created_at).toLocaleDateString()}</td>
              <td className="px-4 py-3 font-bold">₹{o.total?.toLocaleString("en-IN") ?? "—"}</td>
              <td className="px-4 py-3">
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${o.status === 'delivered' ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'}`}>{o.status}</span>
              </td>
              <td className="px-4 py-3">
                <select value={o.status} onChange={e => updateStatus(o.id, e.target.value)} className="text-xs px-2 py-1 rounded border border-border bg-section cursor-pointer">
                  {statuses.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function RepairsView() {
  const [repairs, setRepairs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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
  };

  const statuses = ["booked", "picked-up", "in-repair", "done", "cancelled"];

  return (
    <div className="glass border border-border rounded-2xl overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-section/50">
            {["Ref", "Name", "Device", "Status", "Action"].map(h => <th key={h} className="text-left px-4 py-3 text-xs font-bold text-muted-foreground uppercase">{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {loading ? <tr><td colSpan={5} className="p-4 text-center">Loading...</td></tr> : repairs.map(r => (
            <tr key={r.id} className="border-b border-border hover:bg-section/30">
              <td className="px-4 py-3 font-mono text-xs text-primary">#{r.booking_ref}</td>
              <td className="px-4 py-3 text-xs">{r.name}</td>
              <td className="px-4 py-3 text-xs">{r.brand} {r.device}</td>
              <td className="px-4 py-3">
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${r.status === 'done' ? 'bg-green-500/20 text-green-400' : 'bg-purple-500/20 text-purple-400'}`}>{r.status}</span>
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
  );
}
