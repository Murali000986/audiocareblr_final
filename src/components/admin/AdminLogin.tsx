import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { Lock, Mail, Loader2, Eye, EyeOff } from "lucide-react";

const ADMIN_EMAILS = ["murali701081@gmail.com", "admin@audiocare.in", "info@audiocare.in"];

export function AdminLogin({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState("murali701081@gmail.com");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const loginEmail = email.trim().toLowerCase();

    if (!ADMIN_EMAILS.includes(loginEmail)) {
      toast.error("Unauthorized: This email is not an admin account.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({ email: loginEmail, password });

    if (error) {
      // If credentials wrong, show helpful message
      if (error.message.includes("Invalid login credentials")) {
        toast.error("Wrong email or password. Please check your credentials.", { duration: 5000 });
      } else if (error.message.includes("Email not confirmed")) {
        toast.error("Email not confirmed. Check your inbox for a confirmation email.", { duration: 6000 });
      } else {
        toast.error(error.message);
      }
    } else {
      toast.success("Logged in to Admin Portal!");
      onLogin();
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md glass border border-border rounded-3xl p-8 shadow-2xl relative overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/20 blur-[50px] rounded-full pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-primary/20 blur-[50px] rounded-full pointer-events-none" />

        <div className="relative z-10 text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
            <Lock className="w-8 h-8" />
          </div>
          <h1 className="font-display font-black text-3xl">Admin Portal</h1>
          <p className="text-muted-foreground mt-2 text-sm">Sign in to manage AudioCare</p>
        </div>

        <form onSubmit={handleLogin} className="relative z-10 space-y-4">
          {/* Email */}
          <div>
            <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5 ml-1">
              Admin Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-section/50 border border-border rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                placeholder="murali701081@gmail.com"
                autoComplete="email"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5 ml-1">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type={showPass ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-3 bg-section/50 border border-border rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                placeholder="••••••••"
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPass((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3.5 bg-primary text-primary-foreground font-bold rounded-xl shadow-card hover:shadow-glow hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:hover:translate-y-0"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Sign In to Dashboard"}
          </button>

          <p className="text-center text-xs text-muted-foreground mt-2">
            Admin access only. Contact the site owner for credentials.
          </p>
        </form>
      </div>
    </div>
  );
}
