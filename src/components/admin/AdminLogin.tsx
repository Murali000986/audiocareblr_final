import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { Lock, Mail, Loader2 } from "lucide-react";

export function AdminLogin({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState("murali701081@gmail.com");
  const [password, setPassword] = useState("Murali@123@Rithika");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    if (!email.includes("admin") && email !== "murali701081@gmail.com") {
      toast.error("Unauthorized: Must use an admin account.");
      setLoading(false);
      return;
    }

    // Try to sign in
    let { error } = await supabase.auth.signInWithPassword({ email, password });

    // If account doesn't exist, try to sign up automatically so the user doesn't have to use the dashboard
    if (error && error.message.includes("Invalid login credentials")) {
      const { error: signUpError } = await supabase.auth.signUp({ email, password });
      if (!signUpError) {
        // Sign up worked (and assuming auto-confirm is on), try signing in again
        const { error: retryError } = await supabase.auth.signInWithPassword({ email, password });
        error = retryError;
      }
    }

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Admin logged in successfully");
      onLogin();
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md glass border border-border rounded-3xl p-8 shadow-2xl relative overflow-hidden">
        {/* Decorative background blur */}
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
                placeholder="admin@audiocare.in"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5 ml-1">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-section/50 border border-border rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-6 py-3.5 bg-primary text-primary-foreground font-bold rounded-xl shadow-card hover:shadow-glow hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:hover:translate-y-0"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Sign In to Dashboard"}
          </button>
        </form>
      </div>
    </div>
  );
}

