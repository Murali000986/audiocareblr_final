import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { s as supabase, a as useProductsCache } from "./router-DS6h6cMK.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { A as AnimatedSection } from "./AnimatedSection-CxAJpKfW.mjs";
import { X, p as LayoutDashboard, P as Package, B as BookOpen, I as Image, W as Wrench, q as Shield, r as LogOut, s as Menu, L as Lock, e as Mail, E as EyeOff, o as Eye, t as LoaderCircle, u as TrendingUp, l as Plus, v as Pencil, j as Trash2, w as ImagePlus, x as Tag, y as MessageSquareQuote, z as Briefcase, R as RefreshCw, C as Clock, D as CloudUpload, F as Download, G as Upload, J as FileBraces, K as TriangleAlert, a as CircleCheck, N as RotateCcw } from "../_libs/lucide-react.mjs";
import { R as ResponsiveContainer, L as LineChart, C as CartesianGrid, X as XAxis, Y as YAxis, T as Tooltip, a as Line, P as PieChart, b as Pie, c as Cell } from "../_libs/recharts.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/clsx.mjs";
import "../_libs/lodash.mjs";
import "../_libs/react-smooth.mjs";
import "../_libs/prop-types.mjs";
import "../_libs/fast-equals.mjs";
import "../_libs/tiny-invariant.mjs";
import "../_libs/react-is.mjs";
import "../_libs/d3-shape.mjs";
import "../_libs/d3-path.mjs";
import "../_libs/victory-vendor.mjs";
import "../_libs/d3-scale.mjs";
import "../_libs/internmap.mjs";
import "../_libs/d3-array.mjs";
import "../_libs/d3-time-format.mjs";
import "../_libs/d3-time.mjs";
import "../_libs/d3-interpolate.mjs";
import "../_libs/d3-color.mjs";
import "../_libs/d3-format.mjs";
import "../_libs/recharts-scale.mjs";
import "../_libs/decimal.js-light.mjs";
import "../_libs/eventemitter3.mjs";
const ADMIN_EMAILS = ["murali701081@gmail.com", "admin@audiocare.in"];
function AdminLogin({ onLogin }) {
  const [email, setEmail] = reactExports.useState("murali701081@gmail.com");
  const [password, setPassword] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(false);
  const [showPass, setShowPass] = reactExports.useState(false);
  const handleLogin = async (e) => {
    e.preventDefault();
    const loginEmail = email.trim().toLowerCase();
    if (!ADMIN_EMAILS.includes(loginEmail)) {
      toast.error("Unauthorized: This email is not an admin account.");
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email: loginEmail, password });
    if (error) {
      if (error.message.includes("Invalid login credentials")) {
        toast.error("Wrong email or password. Please check your credentials.", { duration: 5e3 });
      } else if (error.message.includes("Email not confirmed")) {
        toast.error("Email not confirmed. Check your inbox for a confirmation email.", { duration: 6e3 });
      } else {
        toast.error(error.message);
      }
    } else {
      toast.success("Logged in to Admin Portal!");
      onLogin();
    }
    setLoading(false);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-background flex items-center justify-center p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-md glass border border-border rounded-3xl p-8 shadow-2xl relative overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-20 -right-20 w-40 h-40 bg-primary/20 blur-[50px] rounded-full pointer-events-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -bottom-20 -left-20 w-40 h-40 bg-primary/20 blur-[50px] rounded-full pointer-events-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 text-center mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-8 h-8" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-black text-3xl", children: "Admin Portal" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-2 text-sm", children: "Sign in to manage AudioCare" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleLogin, className: "relative z-10 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5 ml-1", children: "Admin Email" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "email",
              required: true,
              value: email,
              onChange: (e) => setEmail(e.target.value),
              className: "w-full pl-10 pr-4 py-3 bg-section/50 border border-border rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all",
              placeholder: "murali701081@gmail.com",
              autoComplete: "email"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5 ml-1", children: "Password" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: showPass ? "text" : "password",
              required: true,
              value: password,
              onChange: (e) => setPassword(e.target.value),
              className: "w-full pl-10 pr-10 py-3 bg-section/50 border border-border rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all",
              placeholder: "••••••••",
              autoComplete: "current-password"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setShowPass((v) => !v),
              className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors",
              children: showPass ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-4 h-4" })
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "submit",
          disabled: loading,
          className: "w-full mt-2 py-3.5 bg-primary text-primary-foreground font-bold rounded-xl shadow-card hover:shadow-glow hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:hover:translate-y-0",
          children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-5 h-5 animate-spin" }) : "Sign In to Dashboard"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-xs text-muted-foreground mt-2", children: "Admin access only. Contact the site owner for credentials." })
    ] })
  ] }) });
}
function CRMDashboard() {
  const [stats, setStats] = reactExports.useState({ orders: 0, revenue: 0, profit: 0, repairs: 0, pending: 0 });
  const [salesData, setSalesData] = reactExports.useState([]);
  const [statusData, setStatusData] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    setLoading(true);
    const [{ data: o }, { data: r }] = await Promise.all([
      supabase.from("orders").select("*").order("created_at", { ascending: true }),
      supabase.from("repair_bookings").select("*")
    ]);
    const ord = o ?? [];
    const rep = r ?? [];
    const revenue = ord.reduce((s, order) => s + (order.total ?? 0), 0);
    const profit = revenue * 0.3;
    setStats({
      orders: ord.length,
      revenue,
      profit,
      repairs: rep.length,
      pending: rep.filter((x) => x.status === "booked").length
    });
    const dailySales = {};
    ord.forEach((order) => {
      const date = new Date(order.created_at).toLocaleDateString("en-IN", { month: "short", day: "numeric" });
      dailySales[date] = (dailySales[date] || 0) + (order.total ?? 0);
    });
    setSalesData(Object.entries(dailySales).map(([date, total]) => ({ date, total })).slice(-30));
    const statusCounts = {};
    ord.forEach((order) => {
      statusCounts[order.status] = (statusCounts[order.status] || 0) + 1;
    });
    setStatusData(Object.entries(statusCounts).map(([name, value]) => ({ name, value })));
    setLoading(false);
  };
  const statCards = [
    { icon: Package, label: "Total Orders", value: stats.orders, color: "text-blue-400" },
    { icon: TrendingUp, label: "Total Revenue", value: `₹${stats.revenue.toLocaleString("en-IN")}`, color: "text-green-400" },
    { icon: TrendingUp, label: "Est. Profit", value: `₹${stats.profit.toLocaleString("en-IN")}`, color: "text-primary" },
    { icon: Wrench, label: "Repairs", value: stats.repairs, color: "text-purple-400" }
  ];
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#EF4444"];
  if (loading) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-10 text-center text-muted-foreground animate-pulse", children: "Loading CRM Data..." });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(AnimatedSection, { direction: "up", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-black text-2xl", children: "CRM Dashboard" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Analytics and overview of AudioCare's performance." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4", children: statCards.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedSection, { direction: "up", delay: i * 80, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass border border-border rounded-2xl p-5 hover:border-primary/50 transition-colors", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(s.icon, { className: `w-5 h-5 ${s.color}` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Lifetime" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `font-display font-black text-xl lg:text-2xl ${s.color}`, children: s.value }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground mt-1", children: s.label })
    ] }) }, s.label)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-3 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2 glass border border-border rounded-2xl p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-sm mb-4", children: "Revenue Trend (Last 30 Active Days)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-[300px] w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(LineChart, { data: salesData, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "#ffffff10", vertical: false }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "date", stroke: "#888888", fontSize: 12, tickLine: false, axisLine: false }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { stroke: "#888888", fontSize: 12, tickLine: false, axisLine: false, tickFormatter: (v) => `₹${v / 1e3}k` }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Tooltip,
            {
              contentStyle: { backgroundColor: "#111", border: "1px solid #333", borderRadius: "12px" },
              formatter: (value) => [`₹${value.toLocaleString()}`, "Revenue"]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Line, { type: "monotone", dataKey: "total", stroke: "#f97316", strokeWidth: 3, dot: { r: 4, fill: "#f97316", strokeWidth: 0 }, activeDot: { r: 6 } })
        ] }) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass border border-border rounded-2xl p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-sm mb-4", children: "Order Status Distribution" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-[300px] w-full flex flex-col items-center justify-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(PieChart, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Pie, { data: statusData, cx: "50%", cy: "50%", innerRadius: 60, outerRadius: 90, paddingAngle: 5, dataKey: "value", children: statusData.map((entry, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(Cell, { fill: COLORS[index % COLORS.length] }, `cell-${index}`)) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { contentStyle: { backgroundColor: "#111", border: "1px solid #333", borderRadius: "12px" } })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-3 justify-center mt-2", children: statusData.map((entry, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-xs text-muted-foreground capitalize", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2.5 h-2.5 rounded-full", style: { backgroundColor: COLORS[i % COLORS.length] } }),
            entry.name
          ] }, entry.name)) })
        ] })
      ] })
    ] })
  ] });
}
const CATEGORIES = [
  { slug: "bluetooth", label: "Bluetooth Speaker" },
  { slug: "party", label: "Party Speaker" },
  { slug: "soundbar", label: "Soundbar" },
  { slug: "home-theatre", label: "Home Theatre" },
  { slug: "accessories", label: "Accessory" }
];
const emptyForm$1 = {
  name: "",
  category: "",
  brand: "",
  price: "",
  mrp: "",
  img_url: "",
  description: "",
  in_stock: true,
  is_best_seller: false,
  cost_price: ""
};
function AdminProducts() {
  const { products, loading, refresh } = useProductsCache();
  const [isModalOpen, setIsModalOpen] = reactExports.useState(false);
  const [editingId, setEditingId] = reactExports.useState(null);
  const [formData, setFormData] = reactExports.useState({ ...emptyForm$1 });
  const [uploading, setUploading] = reactExports.useState(false);
  const [submitting, setSubmitting] = reactExports.useState(false);
  const fileRef = reactExports.useRef(null);
  const handleImageUpload = async (e) => {
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
      const { error: uploadError } = await supabase.storage.from("images").upload(filePath, file, { upsert: true });
      if (uploadError) throw uploadError;
      const { data } = supabase.storage.from("images").getPublicUrl(filePath);
      setFormData((prev) => ({ ...prev, img_url: data.publicUrl }));
      toast.success("Image uploaded!", { id: "upload" });
    } catch (error) {
      toast.error(
        error?.message?.includes("Bucket not found") ? 'Storage bucket "images" not found. Please create it in Supabase → Storage.' : error?.message?.includes("row-level security") ? "Storage permission denied. Please set bucket policy to allow uploads." : error?.message || "Upload failed",
        { id: "upload" }
      );
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };
  const resetForm = () => {
    setFormData({ ...emptyForm$1 });
    setEditingId(null);
  };
  const openCreate = () => {
    resetForm();
    setIsModalOpen(true);
  };
  const handleEdit = (p) => {
    setFormData({
      name: p.name,
      category: p.category,
      brand: p.brand,
      price: p.price.toString(),
      mrp: p.mrp?.toString() || "",
      img_url: p.img,
      description: p.description,
      in_stock: p.inStock,
      is_best_seller: p.is_best_seller ?? false,
      cost_price: p.cost_price?.toString() || ""
    });
    setEditingId(p.id);
    setIsModalOpen(true);
  };
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) toast.error(error.message);
    else {
      toast.success("Product deleted");
      refresh();
    }
  };
  const generateSlug = (name) => name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  const getCategoryLabel = (slug) => CATEGORIES.find((c) => c.slug === slug)?.label || slug;
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      toast.error("Product name is required");
      return;
    }
    if (!formData.category.trim()) {
      toast.error("Category is required");
      return;
    }
    if (!formData.brand.trim()) {
      toast.error("Brand is required");
      return;
    }
    if (!formData.price || isNaN(Number(formData.price))) {
      toast.error("Valid price is required");
      return;
    }
    if (!formData.img_url.trim()) {
      toast.error("Please upload an image or paste an image URL");
      return;
    }
    setSubmitting(true);
    try {
      if (editingId) {
        const updatePayload = {
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
          cost_price: formData.cost_price ? Number(formData.cost_price) : null
        };
        const { error } = await supabase.from("products").update(updatePayload).eq("id", editingId);
        if (error) throw error;
        toast.success("Product updated!");
      } else {
        const slug = generateSlug(formData.name.trim());
        const insertPayload = {
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
          highlights: []
        };
        const { error } = await supabase.from("products").insert(insertPayload);
        if (error) {
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
    } catch (err) {
      toast.error(err?.message || "Failed to save product");
    } finally {
      setSubmitting(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-black text-2xl", children: "Products" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm mt-0.5", children: [
          "Manage your catalog, pricing, and stock.",
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-2 font-semibold text-primary", children: [
            products.length,
            " items"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: openCreate,
          className: "flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2.5 rounded-xl font-bold shadow-card hover:shadow-glow transition-all hover:-translate-y-0.5",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
            " Add Product"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "glass border border-border rounded-2xl overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center py-16 gap-3 text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-5 h-5 animate-spin" }),
      " Loading products…"
    ] }) : products.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-14 h-14 text-muted-foreground/30 mx-auto mb-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-semibold", children: "No products yet" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: 'Click "Add Product" to get started.' })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border bg-section/50", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 text-xs font-bold text-muted-foreground uppercase", children: "Image" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 text-xs font-bold text-muted-foreground uppercase", children: "Name" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 text-xs font-bold text-muted-foreground uppercase", children: "Brand / Cat" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 text-xs font-bold text-muted-foreground uppercase", children: "Price" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 text-xs font-bold text-muted-foreground uppercase", children: "Stock" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 text-xs font-bold text-muted-foreground uppercase", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: products.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border hover:bg-section/30 transition-colors", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: p.img, alt: p.name, className: "w-10 h-10 object-contain bg-white rounded-md p-1", onError: (e) => {
          e.target.src = "https://placehold.co/40x40/1a1a1a/888?text=No+Img";
        } }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 font-semibold max-w-[200px]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate block", children: p.name }),
          p.is_best_seller && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-0 mt-0.5 inline-block px-1.5 py-0.5 rounded text-[9px] font-bold bg-orange-500/20 text-orange-400", children: "BEST SELLER" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 text-xs text-muted-foreground", children: [
          p.brand,
          " • ",
          p.categoryLabel || p.category
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 font-bold text-primary", children: [
          "₹",
          p.price.toLocaleString("en-IN"),
          p.mrp && p.mrp > p.price && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-2 text-[10px] text-muted-foreground line-through font-normal", children: [
            "₹",
            p.mrp.toLocaleString("en-IN")
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `px-2 py-0.5 rounded-md text-[10px] font-bold uppercase ${p.inStock ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`, children: p.inStock ? "In Stock" : "Out of Stock" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => handleEdit(p),
              title: "Edit",
              className: "p-1.5 rounded-md bg-section hover:bg-primary/20 hover:text-primary transition-colors",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "w-3.5 h-3.5" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => handleDelete(p.id),
              title: "Delete",
              className: "p-1.5 rounded-md bg-section hover:bg-red-500/20 hover:text-red-400 transition-colors",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" })
            }
          )
        ] }) })
      ] }, p.id)) })
    ] }) }) }),
    isModalOpen && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-2xl glass border border-border rounded-3xl p-6 md:p-8 max-h-[92vh] overflow-y-auto relative animate-fade-up", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => {
            setIsModalOpen(false);
            resetForm();
          },
          className: "absolute top-6 right-6 p-2 rounded-full hover:bg-section transition-colors",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-5 h-5" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-black text-2xl mb-6", children: editingId ? "Edit Product" : "Add New Product" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1", children: "Product Name *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "text",
                required: true,
                value: formData.name,
                onChange: (e) => setFormData({ ...formData, name: e.target.value }),
                placeholder: "e.g. JBL Charge 5",
                className: "w-full px-3 py-2.5 bg-section/50 border border-border rounded-lg text-sm focus:outline-none focus:border-primary transition-colors"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1", children: "Brand *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "text",
                required: true,
                value: formData.brand,
                onChange: (e) => setFormData({ ...formData, brand: e.target.value }),
                placeholder: "e.g. JBL",
                className: "w-full px-3 py-2.5 bg-section/50 border border-border rounded-lg text-sm focus:outline-none focus:border-primary transition-colors"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1", children: "Category *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "select",
              {
                required: true,
                value: formData.category,
                onChange: (e) => setFormData({ ...formData, category: e.target.value }),
                className: "w-full px-3 py-2.5 bg-section/50 border border-border rounded-lg text-sm focus:outline-none focus:border-primary transition-colors cursor-pointer",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "— Select category —" }),
                  CATEGORIES.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: c.slug, children: c.label }, c.slug))
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1", children: "Selling Price (₹) *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "number",
                required: true,
                min: "0",
                value: formData.price,
                onChange: (e) => setFormData({ ...formData, price: e.target.value }),
                placeholder: "e.g. 12999",
                className: "w-full px-3 py-2.5 bg-section/50 border border-border rounded-lg text-sm focus:outline-none focus:border-primary transition-colors"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1", children: [
              "MRP (₹) ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground font-normal", children: "(optional)" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "number",
                min: "0",
                value: formData.mrp,
                onChange: (e) => setFormData({ ...formData, mrp: e.target.value }),
                placeholder: "e.g. 16999",
                className: "w-full px-3 py-2.5 bg-section/50 border border-border rounded-lg text-sm focus:outline-none focus:border-primary transition-colors"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1", children: [
              "Cost Price (₹) ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground font-normal", children: "(for profit calc)" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "number",
                min: "0",
                value: formData.cost_price,
                onChange: (e) => setFormData({ ...formData, cost_price: e.target.value }),
                placeholder: "e.g. 9000",
                className: "w-full px-3 py-2.5 bg-section/50 border border-border rounded-lg text-sm focus:outline-none focus:border-primary transition-colors"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2", children: "Product Image *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: `flex flex-col items-center justify-center gap-2 p-5 border-2 border-dashed rounded-xl cursor-pointer transition-colors ${uploading ? "opacity-50 cursor-not-allowed border-border" : "border-primary/40 hover:border-primary hover:bg-primary/5"}`, children: [
                uploading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-6 h-6 text-primary animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ImagePlus, { className: "w-6 h-6 text-primary" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-primary", children: uploading ? "Uploading…" : "Click to upload image" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground", children: "PNG, JPG, WEBP — max 5MB" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    ref: fileRef,
                    type: "file",
                    accept: "image/*",
                    disabled: uploading,
                    onChange: handleImageUpload,
                    className: "hidden"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 items-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-px bg-border" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground font-semibold", children: "OR PASTE URL" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-px bg-border" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "url",
                  value: formData.img_url,
                  onChange: (e) => setFormData((prev) => ({ ...prev, img_url: e.target.value })),
                  placeholder: "https://example.com/image.jpg",
                  className: "w-full px-3 py-2.5 bg-section/50 border border-border rounded-lg text-sm focus:outline-none focus:border-primary transition-colors"
                }
              )
            ] }),
            formData.img_url && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-center gap-3 p-3 border border-green-500/30 rounded-xl bg-green-500/5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: formData.img_url,
                  alt: "Preview",
                  className: "w-14 h-14 object-contain rounded-lg bg-white p-1 shrink-0",
                  onError: (e) => {
                    e.target.src = "https://placehold.co/56x56/1a1a1a/888?text=Error";
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-bold text-green-400", children: "Image Ready ✓" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground mt-0.5 truncate", children: formData.img_url })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setFormData((prev) => ({ ...prev, img_url: "" })),
                  className: "p-1.5 rounded-lg hover:bg-red-500/20 text-muted-foreground hover:text-red-400 transition-colors shrink-0",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
                }
              )
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1", children: "Description" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "textarea",
            {
              rows: 3,
              value: formData.description,
              onChange: (e) => setFormData({ ...formData, description: e.target.value }),
              placeholder: "Brief product description…",
              className: "w-full px-3 py-2.5 bg-section/50 border border-border rounded-lg text-sm focus:outline-none focus:border-primary transition-colors resize-none"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-6 py-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-2 cursor-pointer", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "checkbox",
                checked: formData.in_stock,
                onChange: (e) => setFormData({ ...formData, in_stock: e.target.checked }),
                className: "w-4 h-4 accent-primary"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold", children: "In Stock" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-2 cursor-pointer", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "checkbox",
                checked: formData.is_best_seller,
                onChange: (e) => setFormData({ ...formData, is_best_seller: e.target.checked }),
                className: "w-4 h-4 accent-primary"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-orange-400", children: "Mark as Best Seller" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "submit",
            disabled: submitting || uploading,
            className: "w-full py-3 bg-primary text-primary-foreground font-bold rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-50",
            children: submitting ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }),
              " Saving…"
            ] }) : editingId ? "Update Product" : "Save Product"
          }
        )
      ] })
    ] }) })
  ] });
}
function AdminContent() {
  const [testimonials, setTestimonials] = reactExports.useState([]);
  const [portfolio, setPortfolio] = reactExports.useState([]);
  const [gallery, setGallery] = reactExports.useState([]);
  const [activeTab, setActiveTab] = reactExports.useState("testimonials");
  const [isModalOpen, setIsModalOpen] = reactExports.useState(false);
  const [uploading, setUploading] = reactExports.useState(false);
  const [galleryUploading, setGalleryUploading] = reactExports.useState(false);
  const [portUploading, setPortUploading] = reactExports.useState(false);
  const [testForm, setTestForm] = reactExports.useState({ name: "", role: "", text: "", rating: "5", avatar_url: "" });
  const [portForm, setPortForm] = reactExports.useState({ title: "", category: "", img_url: "", description: "" });
  reactExports.useEffect(() => {
    fetchData();
  }, [activeTab]);
  const fetchData = async () => {
    if (activeTab === "testimonials") {
      const { data } = await supabase.from("testimonials").select("*").order("created_at", { ascending: false });
      if (data) setTestimonials(data);
    } else if (activeTab === "portfolio") {
      const { data } = await supabase.from("portfolio").select("*").order("created_at", { ascending: false });
      if (data) setPortfolio(data);
    } else {
      const { data } = await supabase.storage.from("images").list("gallery", { sortBy: { column: "created_at", order: "desc" } });
      if (data) setGallery(data);
    }
  };
  const handleDelete = async (id, table) => {
    if (!confirm("Delete this entry?")) return;
    const { error } = await supabase.from(table).delete().eq("id", id);
    if (error) toast.error(error.message);
    else {
      toast.success("Deleted");
      fetchData();
    }
  };
  const handleGalleryDelete = async (name) => {
    if (!confirm("Delete this image?")) return;
    const { error } = await supabase.storage.from("images").remove([`gallery/${name}`]);
    if (error) toast.error(error.message);
    else {
      toast.success("Image deleted");
      fetchData();
    }
  };
  const handleGalleryUpload = async (e) => {
    if (!e.target.files?.length) return;
    const files = Array.from(e.target.files);
    setGalleryUploading(true);
    toast.loading(`Uploading ${files.length} image(s)…`, { id: "gallery-upload" });
    let success = 0;
    for (const file of files) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error(`${file.name} is too large (max 5MB)`);
        continue;
      }
      const ext = file.name.split(".").pop();
      const path = `gallery/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { error } = await supabase.storage.from("images").upload(path, file, { upsert: true });
      if (!error) success++;
    }
    toast.success(`${success} image(s) uploaded!`, { id: "gallery-upload" });
    setGalleryUploading(false);
    fetchData();
  };
  const handlePortImageUpload = async (e) => {
    if (!e.target.files?.length) return;
    const file = e.target.files[0];
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be under 5MB");
      return;
    }
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
  const handleTestimonialSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from("testimonials").insert({ ...testForm, rating: parseInt(testForm.rating) });
    if (error) toast.error(error.message);
    else {
      toast.success("Testimonial added");
      setIsModalOpen(false);
      setTestForm({ name: "", role: "", text: "", rating: "5", avatar_url: "" });
      fetchData();
    }
  };
  const handlePortfolioSubmit = async (e) => {
    e.preventDefault();
    if (!portForm.img_url.trim()) {
      toast.error("Please upload an image or paste an image URL");
      return;
    }
    const { error } = await supabase.from("portfolio").insert(portForm);
    if (error) toast.error(error.message);
    else {
      toast.success("Portfolio item added");
      setIsModalOpen(false);
      setPortForm({ title: "", category: "", img_url: "", description: "" });
      fetchData();
    }
  };
  const inputCls = "w-full px-3 py-2 bg-section/50 border border-border rounded-lg text-sm focus:outline-none focus:border-primary";
  const getGalleryUrl = (name) => supabase.storage.from("images").getPublicUrl(`gallery/${name}`).data.publicUrl;
  const tabs = [
    { id: "testimonials", label: "Testimonials", icon: MessageSquareQuote },
    { id: "portfolio", label: "Our Work", icon: Briefcase },
    { id: "gallery", label: "Gallery", icon: Image }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-black text-2xl", children: "Content Management" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "Manage testimonials, portfolio, and image gallery." })
      ] }),
      activeTab !== "gallery" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: () => setIsModalOpen(true),
          className: "flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-xl font-bold shadow-card hover:shadow-glow transition-all",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
            " Add New"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 flex-wrap", children: tabs.map(({ id, label, icon: Icon }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        onClick: () => setActiveTab(id),
        className: `px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors ${activeTab === id ? "bg-primary text-primary-foreground" : "bg-section hover:bg-section/80"}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-4 h-4" }),
          " ",
          label
        ]
      },
      id
    )) }),
    activeTab === "gallery" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: `flex flex-col items-center justify-center gap-3 p-8 border-2 border-dashed rounded-2xl cursor-pointer transition-colors ${galleryUploading ? "opacity-50 cursor-not-allowed border-border" : "border-primary/40 hover:border-primary hover:bg-primary/5"}`, children: [
        galleryUploading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-8 h-8 text-primary animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ImagePlus, { className: "w-8 h-8 text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold text-primary", children: galleryUploading ? "Uploading…" : "Click to upload gallery images" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "PNG, JPG, WEBP — up to 5MB each. Multiple files allowed." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "file", accept: "image/*", multiple: true, disabled: galleryUploading, onChange: handleGalleryUpload, className: "hidden" })
      ] }),
      gallery.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-12 text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "w-12 h-12 mx-auto mb-3 opacity-30" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "No images yet — upload some above!" })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3", children: gallery.map((img) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative group rounded-xl overflow-hidden border border-border aspect-square", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: getGalleryUrl(img.name), alt: img.name, className: "w-full h-full object-cover" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => handleGalleryDelete(img.name),
            className: "p-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" })
          }
        ) })
      ] }, img.name)) })
    ] }),
    activeTab === "testimonials" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-4", children: testimonials.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass border border-border rounded-xl p-5 relative group", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => handleDelete(t.id, "testimonials"), className: "absolute top-3 right-3 p-1.5 rounded bg-red-500/10 text-red-400 opacity-0 group-hover:opacity-100 transition-opacity", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: t.avatar_url || `https://api.dicebear.com/7.x/initials/svg?seed=${t.name}`, className: "w-10 h-10 rounded-full", alt: t.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-sm", children: t.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground", children: t.role })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs italic text-muted-foreground line-clamp-3", children: [
        '"',
        t.text,
        '"'
      ] })
    ] }, t.id)) }),
    activeTab === "portfolio" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-4", children: portfolio.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass border border-border rounded-xl overflow-hidden relative group", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => handleDelete(p.id, "portfolio"), className: "absolute top-3 right-3 p-1.5 rounded bg-red-500/90 text-white opacity-0 group-hover:opacity-100 transition-opacity z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: p.img_url, className: "w-full h-40 object-cover", alt: p.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold text-primary uppercase", children: p.category }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-sm mt-1", children: p.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-2 line-clamp-2", children: p.description })
      ] })
    ] }, p.id)) }),
    isModalOpen && activeTab !== "gallery" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-md glass border border-border rounded-3xl p-6 relative animate-fade-up", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setIsModalOpen(false), className: "absolute top-5 right-5 p-2 rounded-full hover:bg-section transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-5 h-5" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display font-black text-xl mb-6", children: [
        "Add ",
        activeTab === "testimonials" ? "Testimonial" : "Portfolio Item"
      ] }),
      activeTab === "testimonials" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleTestimonialSubmit, className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", required: true, placeholder: "Name", value: testForm.name, onChange: (e) => setTestForm({ ...testForm, name: e.target.value }), className: inputCls }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", placeholder: "Role / Location", value: testForm.role, onChange: (e) => setTestForm({ ...testForm, role: e.target.value }), className: inputCls }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "url", placeholder: "Avatar URL (optional)", value: testForm.avatar_url, onChange: (e) => setTestForm({ ...testForm, avatar_url: e.target.value }), className: inputCls }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", min: "1", max: "5", required: true, placeholder: "Rating (1–5)", value: testForm.rating, onChange: (e) => setTestForm({ ...testForm, rating: e.target.value }), className: inputCls }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { required: true, placeholder: "Testimonial text", rows: 3, value: testForm.text, onChange: (e) => setTestForm({ ...testForm, text: e.target.value }), className: `${inputCls} resize-none` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", className: "w-full py-3 bg-primary text-primary-foreground font-bold rounded-xl hover:opacity-90", children: "Save Testimonial" })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handlePortfolioSubmit, className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", required: true, placeholder: "Project Title", value: portForm.title, onChange: (e) => setPortForm({ ...portForm, title: e.target.value }), className: inputCls }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", placeholder: "Category (e.g. Repair, Installation)", value: portForm.category, onChange: (e) => setPortForm({ ...portForm, category: e.target.value }), className: inputCls }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: `flex flex-col items-center justify-center gap-2 p-3 border-2 border-dashed rounded-xl cursor-pointer transition-colors ${portUploading ? "opacity-50 cursor-not-allowed border-border" : "border-primary/40 hover:border-primary hover:bg-primary/5"}`, children: [
            portUploading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 text-primary animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ImagePlus, { className: "w-4 h-4 text-primary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-primary", children: portUploading ? "Uploading…" : "Upload image" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "file", accept: "image/*", disabled: portUploading, onChange: handlePortImageUpload, className: "hidden" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "url", placeholder: "Or paste image URL", value: portForm.img_url, onChange: (e) => setPortForm({ ...portForm, img_url: e.target.value }), className: inputCls }),
          portForm.img_url && /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: portForm.img_url, alt: "Preview", className: "w-full h-24 object-cover rounded-lg border border-border" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { required: true, placeholder: "Project description", rows: 3, value: portForm.description, onChange: (e) => setPortForm({ ...portForm, description: e.target.value }), className: `${inputCls} resize-none` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", className: "w-full py-3 bg-primary text-primary-foreground font-bold rounded-xl hover:opacity-90", children: "Save Portfolio Item" })
      ] })
    ] }) })
  ] });
}
const emptyForm = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  featured_image: "",
  tags: "",
  published: false
};
function AdminBlogs() {
  const [blogs, setBlogs] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [isModalOpen, setIsModalOpen] = reactExports.useState(false);
  const [editingId, setEditingId] = reactExports.useState(null);
  const [form, setForm] = reactExports.useState(emptyForm);
  const [uploading, setUploading] = reactExports.useState(false);
  const fetchBlogs = async () => {
    setLoading(true);
    const { data } = await supabase.from("blogs").select("*").order("created_at", { ascending: false });
    if (data) setBlogs(data);
    setLoading(false);
  };
  reactExports.useEffect(() => {
    fetchBlogs();
  }, []);
  const generateSlug = (title) => title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  const handleTitleChange = (val) => {
    setForm((prev) => ({
      ...prev,
      title: val,
      // Only auto-generate slug if not editing
      slug: editingId ? prev.slug : generateSlug(val)
    }));
  };
  const handleImageUpload = async (e) => {
    if (!e.target.files?.length) return;
    const file = e.target.files[0];
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be under 5MB");
      return;
    }
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
  const openEdit = (b) => {
    setForm({
      title: b.title,
      slug: b.slug,
      excerpt: b.excerpt ?? "",
      content: b.content ?? "",
      featured_image: b.featured_image ?? "",
      tags: b.tags?.join(", ") ?? "",
      published: b.published
    });
    setEditingId(b.id);
    setIsModalOpen(true);
  };
  const handleDelete = async (id) => {
    if (!confirm("Delete this blog post?")) return;
    const { error } = await supabase.from("blogs").delete().eq("id", id);
    if (error) toast.error(error.message);
    else {
      toast.success("Blog post deleted");
      fetchBlogs();
    }
  };
  const togglePublish = async (b) => {
    const { error } = await supabase.from("blogs").update({ published: !b.published }).eq("id", b.id);
    if (error) toast.error(error.message);
    else {
      toast.success(b.published ? "Post unpublished" : "Post published!");
      fetchBlogs();
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      title: form.title,
      slug: form.slug || generateSlug(form.title),
      excerpt: form.excerpt,
      content: form.content,
      featured_image: form.featured_image,
      tags: form.tags ? form.tags.split(",").map((t) => t.trim()).filter(Boolean) : [],
      published: form.published
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-black text-2xl", children: "Blog Posts" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "Create and manage blog articles visible on the website." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: openCreate,
          className: "flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2.5 rounded-xl font-bold shadow-card hover:shadow-glow transition-all",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
            " New Post"
          ]
        }
      )
    ] }),
    loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-8 h-8 animate-spin text-primary" }) }) : blogs.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-20 glass border border-border rounded-2xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-14 h-14 text-muted-foreground/30 mx-auto mb-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-lg text-muted-foreground", children: "No blog posts yet" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: 'Click "New Post" to create your first blog article.' })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: blogs.map((b) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass border border-border rounded-xl p-4 flex items-center gap-4 group", children: [
      b.featured_image ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: b.featured_image, alt: b.title, className: "w-16 h-16 object-cover rounded-lg shrink-0" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 bg-section rounded-lg flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-6 h-6 text-muted-foreground/40" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-sm truncate", children: b.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-[10px] font-bold px-2 py-0.5 rounded-full ${b.published ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"}`, children: b.published ? "Published" : "Draft" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5 line-clamp-1", children: b.excerpt || "No excerpt" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mt-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground", children: new Date(b.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) }),
          b.tags?.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { className: "w-2.5 h-2.5 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground", children: b.tags.slice(0, 3).join(", ") })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 shrink-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => togglePublish(b),
            title: b.published ? "Unpublish" : "Publish",
            className: `p-2 rounded-lg transition-colors ${b.published ? "bg-green-500/10 text-green-400 hover:bg-green-500/20" : "bg-section hover:bg-yellow-500/20 hover:text-yellow-400"}`,
            children: b.published ? /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "w-4 h-4" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => openEdit(b), className: "p-2 rounded-lg bg-section hover:bg-primary/20 hover:text-primary transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "w-4 h-4" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => handleDelete(b.id), className: "p-2 rounded-lg bg-section hover:bg-red-500/20 hover:text-red-400 transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" }) })
      ] })
    ] }, b.id)) }),
    isModalOpen && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-2xl glass border border-border rounded-3xl p-6 md:p-8 max-h-[92vh] overflow-y-auto relative animate-fade-up", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setIsModalOpen(false), className: "absolute top-5 right-5 p-2 rounded-full hover:bg-section transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-5 h-5" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-black text-2xl mb-6", children: editingId ? "Edit Blog Post" : "New Blog Post" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: labelCls, children: "Title *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", required: true, value: form.title, onChange: (e) => handleTitleChange(e.target.value), className: inputCls, placeholder: "e.g. How to Choose the Right Speaker" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: labelCls, children: "URL Slug" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: form.slug, onChange: (e) => setForm({ ...form, slug: e.target.value }), className: inputCls, placeholder: "auto-generated-from-title" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-muted-foreground mt-1", children: [
            "This is the URL: /blog/",
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: form.slug || "your-slug" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: labelCls, children: "Excerpt (Short summary shown on blog list)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { rows: 2, value: form.excerpt, onChange: (e) => setForm({ ...form, excerpt: e.target.value }), className: `${inputCls} resize-none`, placeholder: "A short description of this post…" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: labelCls, children: "Featured Image" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: `flex flex-col items-center justify-center gap-2 p-4 border-2 border-dashed rounded-xl cursor-pointer transition-colors ${uploading ? "opacity-50 cursor-not-allowed border-border" : "border-primary/40 hover:border-primary hover:bg-primary/5"}`, children: [
            uploading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-5 h-5 text-primary animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ImagePlus, { className: "w-5 h-5 text-primary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-primary", children: uploading ? "Uploading…" : "Click to upload image" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "file", accept: "image/*", disabled: uploading, onChange: handleImageUpload, className: "hidden" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 items-center my-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-px bg-border" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground font-semibold", children: "OR PASTE URL" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-px bg-border" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "url", value: form.featured_image, onChange: (e) => setForm({ ...form, featured_image: e.target.value }), placeholder: "https://example.com/image.jpg", className: inputCls }),
          form.featured_image && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 rounded-xl overflow-hidden border border-green-500/30 bg-green-500/5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: form.featured_image, alt: "Preview", className: "w-full h-40 object-cover" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: labelCls, children: "Content *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "textarea",
            {
              rows: 12,
              required: true,
              value: form.content,
              onChange: (e) => setForm({ ...form, content: e.target.value }),
              className: `${inputCls} resize-y font-mono text-xs`,
              placeholder: "Write your full blog post content here…\n\nUse blank lines to separate paragraphs."
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground mt-1", children: "Tip: Use blank lines between paragraphs. Content will display as formatted text." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: labelCls, children: "Tags (comma separated)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: form.tags, onChange: (e) => setForm({ ...form, tags: e.target.value }), className: inputCls, placeholder: "e.g. Speaker, Repair, JBL, Tips" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-3 cursor-pointer", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: form.published, onChange: (e) => setForm({ ...form, published: e.target.checked }), className: "w-4 h-4 accent-primary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold", children: "Publish immediately" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground", children: "If unchecked, saved as draft (not visible on website)" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", className: "w-full py-3 bg-primary text-primary-foreground font-bold rounded-xl hover:opacity-90 transition-opacity text-sm", children: editingId ? "Update Post" : "Publish Post" })
      ] })
    ] }) })
  ] });
}
function AdminBackup() {
  const [backups, setBackups] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [backing, setBacking] = reactExports.useState(false);
  const [restoring, setRestoring] = reactExports.useState(null);
  const [uploadRestoring, setUploadRestoring] = reactExports.useState(false);
  const [deleting, setDeleting] = reactExports.useState(null);
  const [productCount, setProductCount] = reactExports.useState(null);
  const fileRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    fetchBackups();
    fetchProductCount();
  }, []);
  const fetchProductCount = async () => {
    const { count } = await supabase.from("products").select("*", { count: "exact", head: true });
    setProductCount(count ?? 0);
  };
  const fetchBackups = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.from("backups").select("*").order("created_at", { ascending: false });
      if (!error && data) {
        setBackups(data);
      } else {
        setBackups([]);
      }
    } catch {
      setBackups([]);
    }
    setLoading(false);
  };
  const handleBackupNow = async () => {
    setBacking(true);
    toast.loading("Creating backup…", { id: "backup" });
    try {
      const { data: products, error: fetchError } = await supabase.from("products").select("*").order("created_at", { ascending: true });
      if (fetchError) throw fetchError;
      if (!products || products.length === 0) {
        toast.error("No products to backup!", { id: "backup" });
        setBacking(false);
        return;
      }
      const now = /* @__PURE__ */ new Date();
      const label = `Backup — ${now.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      })}`;
      const backupData = {
        exported_at: now.toISOString(),
        product_count: products.length,
        version: "1.0",
        products
      };
      const jsonStr = JSON.stringify(backupData, null, 2);
      const blob = new Blob([jsonStr], { type: "application/json" });
      const fileName = `backup_${now.getTime()}.json`;
      const filePath = `backups/${fileName}`;
      const { error: uploadError } = await supabase.storage.from("images").upload(filePath, blob, { contentType: "application/json", upsert: true });
      if (uploadError) {
        console.warn("Storage upload failed:", uploadError.message);
      }
      const { error: insertError } = await supabase.from("backups").insert({
        label,
        product_count: products.length,
        file_path: filePath
      });
      if (insertError) {
        toast.error(
          "Backups table not found. Please run FINAL_FIX.sql in Supabase first!",
          { id: "backup", duration: 6e3 }
        );
        downloadJSON(jsonStr, fileName);
        setBacking(false);
        return;
      }
      downloadJSON(jsonStr, fileName);
      toast.success(
        `✅ Backup created — ${products.length} products saved & downloaded!`,
        { id: "backup", duration: 5e3 }
      );
      fetchBackups();
      fetchProductCount();
    } catch (err) {
      toast.error(err?.message || "Backup failed", { id: "backup" });
    } finally {
      setBacking(false);
    }
  };
  const downloadJSON = (jsonStr, fileName) => {
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
  };
  const downloadBackup = async (backup) => {
    toast.loading("Downloading backup…", { id: "dl-" + backup.id });
    try {
      const { data, error } = await supabase.storage.from("images").download(backup.file_path);
      if (error) throw error;
      const text = await data.text();
      downloadJSON(text, backup.file_path.split("/").pop() || "backup.json");
      toast.success("Downloaded!", { id: "dl-" + backup.id });
    } catch (err) {
      toast.error("Download failed: " + err.message, { id: "dl-" + backup.id });
    }
  };
  const restoreFromBackup = async (backup) => {
    if (!confirm(`Restore "${backup.label}"?

This will RE-INSERT ${backup.product_count} products. Existing products with the same ID will be skipped (upserted safely).`)) return;
    setRestoring(backup.id);
    toast.loading("Restoring products…", { id: "restore" });
    try {
      const { data, error } = await supabase.storage.from("images").download(backup.file_path);
      if (error) throw error;
      const text = await data.text();
      const parsed = JSON.parse(text);
      await restoreProducts(parsed.products);
      toast.success(
        `✅ Restored ${parsed.products.length} products successfully!`,
        { id: "restore", duration: 5e3 }
      );
      fetchProductCount();
    } catch (err) {
      toast.error(err?.message || "Restore failed", { id: "restore" });
    } finally {
      setRestoring(null);
    }
  };
  const restoreProducts = async (products) => {
    const CHUNK = 50;
    for (let i = 0; i < products.length; i += CHUNK) {
      const chunk = products.slice(i, i + CHUNK);
      const { error } = await supabase.from("products").upsert(chunk, { onConflict: "id" });
      if (error) throw error;
    }
  };
  const handleFileRestore = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.name.endsWith(".json")) {
      toast.error("Please select a valid .json backup file");
      return;
    }
    if (!confirm(`Restore from file "${file.name}"?

This will re-insert all products from the backup. Existing products with the same ID will be updated safely.`)) {
      if (fileRef.current) fileRef.current.value = "";
      return;
    }
    setUploadRestoring(true);
    toast.loading("Reading backup file…", { id: "file-restore" });
    try {
      const text = await file.text();
      const parsed = JSON.parse(text);
      if (!parsed.products || !Array.isArray(parsed.products)) {
        throw new Error("Invalid backup file format");
      }
      toast.loading(`Restoring ${parsed.products.length} products…`, { id: "file-restore" });
      await restoreProducts(parsed.products);
      toast.success(
        `✅ Restored ${parsed.products.length} products from file!`,
        { id: "file-restore", duration: 5e3 }
      );
      fetchProductCount();
    } catch (err) {
      toast.error(
        err?.message?.includes("JSON") ? "Invalid JSON file. Please use a valid AudioCare backup file." : err?.message || "Restore failed",
        { id: "file-restore" }
      );
    } finally {
      setUploadRestoring(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };
  const deleteBackup = async (backup) => {
    if (!confirm(`Delete backup "${backup.label}"? This cannot be undone.`)) return;
    setDeleting(backup.id);
    try {
      await supabase.storage.from("images").remove([backup.file_path]);
      const { error } = await supabase.from("backups").delete().eq("id", backup.id);
      if (error) throw error;
      toast.success("Backup deleted");
      setBackups((prev) => prev.filter((b) => b.id !== backup.id));
    } catch (err) {
      toast.error(err?.message || "Delete failed");
    } finally {
      setDeleting(null);
    }
  };
  const formatDate = (iso) => new Date(iso).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8 max-w-4xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-black text-2xl", children: "Backup & Restore" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-0.5", children: "Protect your product catalog. Backup now — restore instantly if data is lost." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: fetchBackups,
          className: "p-2 rounded-lg hover:bg-section transition-colors text-muted-foreground",
          title: "Refresh",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-4 h-4" })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-3 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass border border-border rounded-2xl p-5 flex items-center gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-5 h-5 text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-display font-black text-primary", children: productCount ?? "—" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Products in Database" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass border border-border rounded-2xl p-5 flex items-center gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-5 h-5 text-green-400" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold truncate", children: backups[0] ? formatDate(backups[0].created_at) : "Never" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Last backup" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass border border-border rounded-2xl p-5 flex items-center gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-5 h-5 text-blue-400" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-display font-black text-blue-400", children: backups.length }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Saved backups" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass border border-border rounded-2xl p-6 flex flex-col gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 mt-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CloudUpload, { className: "w-4 h-4 text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold", children: "Backup Now" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
              "Exports all ",
              productCount ?? "?",
              " products to JSON. Saves to Supabase Storage + downloads to your computer."
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: handleBackupNow,
            disabled: backing,
            className: "w-full py-3 bg-primary text-primary-foreground font-bold rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-50",
            children: backing ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }),
              " Creating Backup…"
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-4 h-4" }),
              " Create Backup & Download"
            ] })
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass border border-border rounded-2xl p-6 flex flex-col gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-xl bg-orange-500/10 flex items-center justify-center shrink-0 mt-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-4 h-4 text-orange-400" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold", children: "Restore from File" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Have a backup .json file on your computer? Upload it to restore all products instantly." })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: `w-full py-3 border-2 border-dashed border-orange-500/40 hover:border-orange-500 hover:bg-orange-500/5 text-orange-400 font-bold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer ${uploadRestoring ? "opacity-50 cursor-not-allowed" : ""}`, children: [
          uploadRestoring ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }),
            " Restoring…"
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FileBraces, { className: "w-4 h-4" }),
            " Upload .json Backup File"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              ref: fileRef,
              type: "file",
              accept: ".json,application/json",
              disabled: uploadRestoring,
              onChange: handleFileRestore,
              className: "hidden"
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 p-4 rounded-xl border border-yellow-500/30 bg-yellow-500/5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-4 h-4 text-yellow-400 shrink-0 mt-0.5" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-yellow-300", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Important:" }),
        " The backups table must exist in Supabase for cloud backup history to work. Run ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "bg-yellow-500/20 px-1 rounded", children: "FINAL_FIX.sql" }),
        " first, then add this SQL:",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "block mt-1 bg-black/30 p-2 rounded text-[10px] font-mono", children: `create table if not exists public.backups (id uuid primary key default gen_random_uuid(), label text, product_count integer, file_path text, created_at timestamptz default now()); alter table public.backups enable row level security; create policy "Admins can manage backups" on public.backups for all using (auth.jwt()->>'email' in ('admin@audiocare.in','murali701081@gmail.com'));` })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-lg mb-4", children: "Backup History" }),
      loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center py-12 text-muted-foreground gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-5 h-5 animate-spin" }),
        " Loading backups…"
      ] }) : backups.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-16 glass border border-dashed border-border rounded-2xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-12 h-12 text-muted-foreground/20 mx-auto mb-3" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-muted-foreground", children: "No backups yet" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: 'Click "Create Backup & Download" to make your first backup.' })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "glass border border-border rounded-2xl overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border bg-section/50", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 text-xs font-bold text-muted-foreground uppercase", children: "Label" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 text-xs font-bold text-muted-foreground uppercase", children: "Products" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 text-xs font-bold text-muted-foreground uppercase", children: "Date" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 text-xs font-bold text-muted-foreground uppercase", children: "Actions" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: backups.map((b) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border last:border-0 hover:bg-section/20 transition-colors", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3.5 h-3.5 text-green-400 shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-sm", children: b.label })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "px-2 py-0.5 rounded-md text-[10px] font-bold bg-primary/10 text-primary", children: [
            b.product_count,
            " products"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-xs text-muted-foreground", children: formatDate(b.created_at) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: () => downloadBackup(b),
                title: "Download backup file",
                className: "p-1.5 rounded-md bg-section hover:bg-blue-500/20 hover:text-blue-400 transition-colors",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-3.5 h-3.5" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: () => restoreFromBackup(b),
                disabled: !!restoring,
                title: "Restore from this backup",
                className: "p-1.5 rounded-md bg-section hover:bg-green-500/20 hover:text-green-400 transition-colors disabled:opacity-50",
                children: restoring === b.id ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-3.5 h-3.5 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "w-3.5 h-3.5" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: () => deleteBackup(b),
                disabled: deleting === b.id,
                title: "Delete backup",
                className: "p-1.5 rounded-md bg-section hover:bg-red-500/20 hover:text-red-400 transition-colors disabled:opacity-50",
                children: deleting === b.id ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-3.5 h-3.5 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" })
              }
            )
          ] }) })
        ] }, b.id)) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass border border-border rounded-2xl p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-bold mb-4 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-4 h-4 text-primary" }),
        " Emergency Recovery Guide"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("ol", { className: "space-y-3 text-sm text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-5 h-5 rounded-full bg-primary/20 text-primary text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5", children: "1" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "If tables are deleted:" }),
            " Run",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "text-primary bg-primary/10 px-1 py-0.5 rounded text-[11px]", children: "FINAL_FIX.sql" }),
            " ",
            "in Supabase SQL Editor to recreate all tables."
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-5 h-5 rounded-full bg-primary/20 text-primary text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5", children: "2" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "If products are missing:" }),
            " Use the",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Backup History" }),
            " above → click",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "w-3 h-3 inline text-green-400" }),
            " Restore on the latest backup."
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-5 h-5 rounded-full bg-primary/20 text-primary text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5", children: "3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "If you only have a downloaded file:" }),
            " Click",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Upload .json Backup File" }),
            " and pick the file from your computer."
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-5 h-5 rounded-full bg-primary/20 text-primary text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5", children: "4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Images are always safe:" }),
            " Photos live in Supabase Storage and survive table deletions — they reconnect automatically on restore."
          ] })
        ] })
      ] })
    ] })
  ] });
}
function AdminPage() {
  const [isAdmin, setIsAdmin] = reactExports.useState(null);
  const [activeTab, setActiveTab] = reactExports.useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = reactExports.useState(false);
  const navigate = useNavigate();
  reactExports.useEffect(() => {
    checkAdmin();
    const {
      data: {
        subscription
      }
    } = supabase.auth.onAuthStateChange(() => {
      checkAdmin();
    });
    return () => subscription.unsubscribe();
  }, []);
  const checkAdmin = async () => {
    const {
      data: {
        session
      }
    } = await supabase.auth.getSession();
    const email = session?.user?.email?.toLowerCase() ?? "";
    const isAdminEmail = email === "murali701081@gmail.com" || email === "admin@audiocare.in" || email.includes("admin");
    setIsAdmin(isAdminEmail && email.length > 0);
  };
  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsAdmin(false);
    toast.success("Logged out from Admin Portal");
    navigate({
      to: "/"
    });
  };
  if (isAdmin === null) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-background flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "animate-pulse text-muted-foreground", children: "Loading…" }) });
  if (!isAdmin) return /* @__PURE__ */ jsxRuntimeExports.jsx(AdminLogin, { onLogin: checkAdmin });
  const navItems = [{
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard
  }, {
    id: "products",
    label: "Products",
    icon: Package
  }, {
    id: "blogs",
    label: "Blog Posts",
    icon: BookOpen
  }, {
    id: "content",
    label: "Content",
    icon: Image
  }, {
    id: "repairs",
    label: "Repairs",
    icon: Wrench
  }, {
    id: "backup",
    label: "Backup & Restore",
    icon: Shield
  }];
  const tabLabels = {
    dashboard: "CRM Dashboard",
    products: "Products",
    blogs: "Blog Posts",
    content: "Content Management",
    repairs: "Repair Bookings",
    backup: "Backup & Restore"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background flex", children: [
    sidebarOpen && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 bg-black/60 z-40 lg:hidden", onClick: () => setSidebarOpen(false) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("aside", { className: `fixed inset-y-0 left-0 z-50 w-64 bg-section/80 backdrop-blur-xl border-r border-border transform transition-transform lg:relative lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-full flex flex-col", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 flex items-center justify-between border-b border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "text-primary font-display font-black text-xl", children: "AudioCare" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "lg:hidden p-1 hover:bg-section rounded-lg", onClick: () => setSidebarOpen(false), children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-5 h-5" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-3 py-4 flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-3 ml-2", children: "Menu" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "space-y-1", children: navItems.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => {
          setActiveTab(item.id);
          setSidebarOpen(false);
        }, className: `w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === item.id ? "bg-primary text-primary-foreground shadow-card" : "text-muted-foreground hover:bg-white/5 hover:text-foreground"}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(item.icon, { className: "w-4 h-4" }),
          item.label
        ] }, item.id)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 border-t border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-background rounded-xl p-4 border border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-bold mb-0.5", children: "Admin User" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground mb-3", children: "Super Admin" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: handleLogout, className: "w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-red-500/10 text-red-500 text-xs font-bold hover:bg-red-500/20 transition-colors", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "w-3.5 h-3.5" }),
          " Logout"
        ] })
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "flex-1 flex flex-col min-w-0 max-h-screen overflow-y-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "sticky top-0 z-30 glass border-b border-border px-4 lg:px-8 py-4 flex items-center gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "lg:hidden p-2 rounded-md hover:bg-section", onClick: () => setSidebarOpen(true), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "w-5 h-5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-black text-xl", children: tabLabels[activeTab] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 p-4 lg:p-8", children: [
        activeTab === "dashboard" && /* @__PURE__ */ jsxRuntimeExports.jsx(CRMDashboard, {}),
        activeTab === "products" && /* @__PURE__ */ jsxRuntimeExports.jsx(AdminProducts, {}),
        activeTab === "blogs" && /* @__PURE__ */ jsxRuntimeExports.jsx(AdminBlogs, {}),
        activeTab === "content" && /* @__PURE__ */ jsxRuntimeExports.jsx(AdminContent, {}),
        activeTab === "repairs" && /* @__PURE__ */ jsxRuntimeExports.jsx(RepairsView, {}),
        activeTab === "backup" && /* @__PURE__ */ jsxRuntimeExports.jsx(AdminBackup, {})
      ] })
    ] })
  ] });
}
function RepairsView() {
  const [repairs, setRepairs] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const fetchRepairs = async () => {
    setLoading(true);
    const {
      data
    } = await supabase.from("repair_bookings").select("*").order("created_at", {
      ascending: false
    });
    if (data) setRepairs(data);
    setLoading(false);
  };
  reactExports.useEffect(() => {
    fetchRepairs();
  }, []);
  const updateStatus = async (id, status) => {
    await supabase.from("repair_bookings").update({
      status
    }).eq("id", id);
    fetchRepairs();
  };
  const statuses = ["booked", "picked-up", "in-repair", "done", "cancelled"];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "glass border border-border rounded-2xl overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-b border-border bg-section/50", children: ["Ref", "Name", "Device", "Status", "Action"].map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 text-xs font-bold text-muted-foreground uppercase", children: h }, h)) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 5, className: "p-8 text-center text-muted-foreground", children: "Loading…" }) }) : repairs.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border hover:bg-section/30", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 font-mono text-xs text-primary", children: [
        "#",
        r.booking_ref
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-xs", children: r.name }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 text-xs", children: [
        r.brand,
        " ",
        r.device
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `px-2 py-0.5 rounded text-[10px] font-bold uppercase ${r.status === "done" ? "bg-green-500/20 text-green-400" : "bg-purple-500/20 text-purple-400"}`, children: r.status }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("select", { value: r.status, onChange: (e) => updateStatus(r.id, e.target.value), className: "text-xs px-2 py-1 rounded border border-border bg-section cursor-pointer", children: statuses.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: s, children: s }, s)) }) })
    ] }, r.id)) })
  ] }) }) });
}
export {
  AdminPage as component
};
