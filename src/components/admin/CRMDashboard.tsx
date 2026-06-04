import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Package, Wrench, TrendingUp, Clock } from "lucide-react";
import { AnimatedSection } from "@/components/AnimatedSection";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

export function CRMDashboard() {
  const [stats, setStats] = useState({ orders: 0, revenue: 0, profit: 0, repairs: 0, pending: 0 });
  const [salesData, setSalesData] = useState<any[]>([]);
  const [statusData, setStatusData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const [{ data: o }, { data: r }] = await Promise.all([
      supabase.from("orders").select("*").order("created_at", { ascending: true }),
      supabase.from("repair_bookings").select("*"),
    ]);

    const ord = o ?? [];
    const rep = r ?? [];
    
    // Calculate simple stats
    const revenue = ord.reduce((s: number, order: any) => s + (order.total ?? 0), 0);
    // Rough profit estimate: 30% of revenue if cost_price isn't fully populated yet
    const profit = revenue * 0.3; 

    setStats({
      orders: ord.length,
      revenue,
      profit,
      repairs: rep.length,
      pending: rep.filter((x: any) => x.status === "booked").length,
    });

    // Group by date for line chart
    const dailySales: Record<string, number> = {};
    ord.forEach((order: any) => {
      const date = new Date(order.created_at).toLocaleDateString("en-IN", { month: "short", day: "numeric" });
      dailySales[date] = (dailySales[date] || 0) + (order.total ?? 0);
    });
    setSalesData(Object.entries(dailySales).map(([date, total]) => ({ date, total })).slice(-30)); // Last 30 days

    // Group by status for pie chart
    const statusCounts: Record<string, number> = {};
    ord.forEach((order: any) => {
      statusCounts[order.status] = (statusCounts[order.status] || 0) + 1;
    });
    setStatusData(Object.entries(statusCounts).map(([name, value]) => ({ name, value })));

    setLoading(false);
  };

  const statCards = [
    { icon: Package,    label: "Total Orders",  value: stats.orders,                       color: "text-blue-400" },
    { icon: TrendingUp, label: "Total Revenue", value: `₹${stats.revenue.toLocaleString("en-IN")}`, color: "text-green-400" },
    { icon: TrendingUp, label: "Est. Profit",   value: `₹${stats.profit.toLocaleString("en-IN")}`,  color: "text-primary" },
    { icon: Wrench,     label: "Repairs",       value: stats.repairs,                      color: "text-purple-400" },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#EF4444'];

  if (loading) return <div className="p-10 text-center text-muted-foreground animate-pulse">Loading CRM Data...</div>;

  return (
    <div className="space-y-6">
      <AnimatedSection direction="up">
        <h2 className="font-display font-black text-2xl">CRM Dashboard</h2>
        <p className="text-muted-foreground text-sm">Analytics and overview of AudioCare's performance.</p>
      </AnimatedSection>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((s, i) => (
          <AnimatedSection key={s.label} direction="up" delay={i * 80}>
            <div className="glass border border-border rounded-2xl p-5 hover:border-primary/50 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <s.icon className={`w-5 h-5 ${s.color}`} />
                <span className="text-xs text-muted-foreground">Lifetime</span>
              </div>
              <div className={`font-display font-black text-xl lg:text-2xl ${s.color}`}>{s.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
            </div>
          </AnimatedSection>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass border border-border rounded-2xl p-5">
          <h3 className="font-bold text-sm mb-4">Revenue Trend (Last 30 Active Days)</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis dataKey="date" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `₹${v/1000}k`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111', border: '1px solid #333', borderRadius: '12px' }}
                  formatter={(value: number) => [`₹${value.toLocaleString()}`, 'Revenue']}
                />
                <Line type="monotone" dataKey="total" stroke="#f97316" strokeWidth={3} dot={{ r: 4, fill: '#f97316', strokeWidth: 0 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass border border-border rounded-2xl p-5">
          <h3 className="font-bold text-sm mb-4">Order Status Distribution</h3>
          <div className="h-[300px] w-full flex flex-col items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={statusData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={5} dataKey="value">
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#111', border: '1px solid #333', borderRadius: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap gap-3 justify-center mt-2">
              {statusData.map((entry, i) => (
                <div key={entry.name} className="flex items-center gap-1.5 text-xs text-muted-foreground capitalize">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                  {entry.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
