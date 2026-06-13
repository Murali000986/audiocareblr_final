import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { Lock, Loader2, Shield } from "lucide-react";

const ADMIN_EMAILS = ["murali701081@gmail.com", "admin@audiocare.in", "info@audiocare.in", "audiocareblr@gmail.com"];

// Google "G" SVG icon
function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
      <path fill="none" d="M0 0h48v48H0z"/>
    </svg>
  );
}

export function AdminLogin({ onLogin }: { onLogin: () => void }) {
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/admin`,
        queryParams: {
          access_type: "offline",
          prompt: "select_account",
        },
      },
    });

    if (error) {
      toast.error(error.message);
      setLoading(false);
    }
    // On success, Supabase redirects the browser to Google — no further action needed here
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md glass border border-border rounded-3xl p-8 shadow-2xl relative overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/20 blur-[50px] rounded-full pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-primary/20 blur-[50px] rounded-full pointer-events-none" />

        <div className="relative z-10 text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
            <Shield className="w-8 h-8" />
          </div>
          <h1 className="font-display font-black text-3xl">Admin Portal</h1>
          <p className="text-muted-foreground mt-2 text-sm">Sign in with your Google account to manage AudioCare</p>
        </div>

        <div className="relative z-10 space-y-4">
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 py-3.5 bg-white text-gray-800 font-bold rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all border border-gray-200 disabled:opacity-50 disabled:hover:translate-y-0"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin text-gray-500" />
            ) : (
              <GoogleIcon />
            )}
            {loading ? "Redirecting to Google…" : "Sign in with Google"}
          </button>

          <div className="flex items-center gap-3 my-4">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-muted-foreground">Authorized accounts only</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          <div className="bg-section/50 rounded-xl border border-border p-4 text-xs text-muted-foreground text-center">
            <Lock className="w-4 h-4 mx-auto mb-2 text-primary" />
            Only pre-approved Google accounts can access this portal. Contact the site owner to request access.
          </div>
        </div>
      </div>
    </div>
  );
}
