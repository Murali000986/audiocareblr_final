import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { Package, Wrench, Heart, User, ChevronDown, ChevronRight, CheckCircle2, Clock, Truck, Star } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/account")({
  head: () => ({ meta: [{ title: "My Account — AudioCare" }] }),
  component: AccountPage,
});

type Tab = "orders" | "repairs" | "wishlist" | "profile";

function AccountPage() {
  const { user, signOut } = useAuth();
  const [tab, setTab] = useState<Tab>("orders");
  const [orders, setOrders] = useState<any[]>([]);
  const [repairs, setRepairs] = useState<any[]>([]);
  const [profileName, setProfileName] = useState(user?.user_metadata?.full_name ?? "");
  const [profilePhone, setProfilePhone] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user) return;
    // Fetch orders
    supabase
      .from("orders")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .then(({ data }) => setOrders(data ?? []));

    // Fetch repairs
    supabase
      .from("repair_bookings")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .then(({ data }) => setRepairs(data ?? []));

    // Fetch profile
    supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single()
      .then(({ data }) => {
        if (data) {
          setProfileName(data.full_name ?? "");
          setProfilePhone(data.phone ?? "");
        }
      });
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center px-4">
          <div className="text-center max-w-sm">
            <div className="w-16 h-16 rounded-full bg-section flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8 text-muted-foreground" />
            </div>
            <h1 className="font-display text-2xl font-bold mb-2">Sign in to continue</h1>
            <p className="text-muted-foreground text-sm mb-6">Access your orders, repairs, and wishlist.</p>
            <Link to="/auth" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-bold hover:shadow-glow transition-all">
              Login / Sign Up <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const saveProfile = async () => {
    setSaving(true);
    const { error } = await supabase.from("profiles").upsert({
      id: user.id,
      full_name: profileName,
      phone: profilePhone,
    });
    setSaving(false);
    if (error) toast.error("Failed to save profile");
    else toast.success("Profile updated!");
  };

  const tabs: { id: Tab; icon: any; label: string }[] = [
    { id: "orders",   icon: Package, label: "My Orders" },
    { id: "repairs",  icon: Wrench,  label: "Repairs" },
    { id: "wishlist", icon: Heart,   label: "Wishlist" },
    { id: "profile",  icon: User,    label: "Profile" },
  ];

  const statusColor = (s: string) => {
    if (s === "delivered" || s === "done") return "text-green-400";
    if (s === "shipped" || s === "in-repair") return "text-blue-400";
    return "text-yellow-400";
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-display font-bold text-xl">
            {(user.user_metadata?.full_name ?? user.email ?? "U")[0].toUpperCase()}
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold">{user.user_metadata?.full_name ?? "My Account"}</h1>
            <p className="text-muted-foreground text-sm">{user.email}</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-[220px_1fr] gap-6">
          {/* Sidebar tabs */}
          <nav className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
                  tab === t.id ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-section hover:text-foreground"
                }`}
              >
                <t.icon className="w-4 h-4" /> {t.label}
              </button>
            ))}
            <button
              onClick={() => { signOut(); }}
              className="flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-semibold text-destructive hover:bg-destructive/10 transition-all mt-auto"
            >
              Sign Out
            </button>
          </nav>

          {/* Content */}
          <div>
            {/* Orders */}
            {tab === "orders" && (
              <div className="space-y-3">
                <h2 className="font-display font-bold text-xl mb-4">My Orders</h2>
                {orders.length === 0 ? (
                  <div className="text-center py-16 border border-dashed border-border rounded-2xl">
                    <Package className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
                    <p className="text-muted-foreground">No orders yet</p>
                    <Link to="/shop" className="mt-3 inline-block text-primary font-semibold text-sm">Start Shopping →</Link>
                  </div>
                ) : orders.map((o) => (
                  <div key={o.id} className="border border-border bg-card rounded-2xl p-5">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="font-semibold text-sm">Order #{o.id.slice(0, 8).toUpperCase()}</p>
                        <p className="text-xs text-muted-foreground">{new Date(o.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</p>
                      </div>
                      <span className={`text-xs font-bold uppercase ${statusColor(o.status)}`}>{o.status}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{Array.isArray(o.items) ? o.items.length : 0} item(s)</span>
                      <span className="font-display font-bold">₹{o.total?.toLocaleString("en-IN")}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Repairs */}
            {tab === "repairs" && (
              <div className="space-y-3">
                <h2 className="font-display font-bold text-xl mb-4">Repair Bookings</h2>
                {repairs.length === 0 ? (
                  <div className="text-center py-16 border border-dashed border-border rounded-2xl">
                    <Wrench className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
                    <p className="text-muted-foreground">No repair bookings yet</p>
                    <Link to="/repair-service" className="mt-3 inline-block text-primary font-semibold text-sm">Book a Repair →</Link>
                  </div>
                ) : repairs.map((r) => {
                  const steps = ["Booked", "Picked Up", "In Repair", "Done"];
                  const stepIdx = r.status === "done" ? 3 : r.status === "in-repair" ? 2 : r.status === "picked-up" ? 1 : 0;
                  return (
                    <div key={r.id} className="border border-border bg-card rounded-2xl p-5">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <p className="font-semibold text-sm">{r.device} — {r.brand}</p>
                          <p className="text-xs text-muted-foreground">Ref: #{r.booking_ref}</p>
                        </div>
                        <span className={`text-xs font-bold uppercase ${statusColor(r.status)}`}>{r.status}</span>
                      </div>
                      {/* Tracker */}
                      <div className="flex items-center gap-1 mt-3">
                        {steps.map((s, i) => (
                          <div key={s} className="flex items-center gap-1 flex-1 min-w-0">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-[9px] font-bold ${i <= stepIdx ? "bg-primary text-primary-foreground" : "bg-section text-muted-foreground"}`}>
                              {i <= stepIdx ? <CheckCircle2 className="w-3.5 h-3.5" /> : i + 1}
                            </div>
                            <span className="text-[9px] text-muted-foreground truncate hidden sm:block">{s}</span>
                            {i < steps.length - 1 && <div className={`flex-1 h-0.5 ${i < stepIdx ? "bg-primary" : "bg-border"}`} />}
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Wishlist */}
            {tab === "wishlist" && (
              <div>
                <h2 className="font-display font-bold text-xl mb-4">My Wishlist</h2>
                <div className="text-center py-16 border border-dashed border-border rounded-2xl">
                  <Heart className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
                  <p className="text-muted-foreground">Browse products and add to wishlist</p>
                  <Link to="/shop" className="mt-3 inline-block text-primary font-semibold text-sm">Browse Shop →</Link>
                </div>
              </div>
            )}

            {/* Profile */}
            {tab === "profile" && (
              <div className="max-w-md">
                <h2 className="font-display font-bold text-xl mb-6">Profile</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Full Name</label>
                    <input
                      type="text"
                      value={profileName}
                      onChange={(e) => setProfileName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-section text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Email</label>
                    <input
                      type="email"
                      value={user.email ?? ""}
                      disabled
                      className="w-full px-4 py-3 rounded-xl border border-border bg-section text-sm opacity-50 cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Phone</label>
                    <input
                      type="tel"
                      value={profilePhone}
                      onChange={(e) => setProfilePhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-3 rounded-xl border border-border bg-section text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <button
                    onClick={saveProfile}
                    disabled={saving}
                    className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-bold text-sm hover:shadow-glow transition-all disabled:opacity-60 btn-press"
                  >
                    {saving ? "Saving…" : "Save Changes"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
