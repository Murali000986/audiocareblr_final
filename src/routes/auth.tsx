import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { Music2, Loader2, LogIn } from "lucide-react";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign In — AudioCare" },
      { name: "description", content: "Sign in to your AudioCare account with Google." },
    ],
  }),
  component: AuthPage,
});

function GoogleIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
    </svg>
  );
}

function AuthPage() {
  const [loading, setLoading] = useState(false);
  const { signInWithGoogle, user } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (user) navigate({ to: "/" });
  }, [user]);

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await signInWithGoogle();
      // Supabase redirects to Google — page will navigate away
    } catch (error: any) {
      toast.error(error.message || "Failed to start Google sign-in");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-primary/5 rounded-full blur-[80px]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="w-full max-w-sm relative">
        {/* Logo */}
        <Link to="/" className="flex items-center justify-center gap-2 mb-10">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-glow">
            <Music2 className="w-6 h-6 text-primary-foreground" />
          </div>
          <span className="font-display font-black text-2xl text-gradient-orange">AudioCare</span>
        </Link>

        {/* Card */}
        <div className="glass border border-border rounded-2xl p-8 shadow-card text-center">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary mb-5">
            <LogIn className="w-8 h-8" />
          </div>

          <h1 className="font-display font-black text-2xl mb-2">Welcome Back</h1>
          <p className="text-muted-foreground text-sm mb-8">
            Sign in to your AudioCare account to track orders, save wishlists, and more.
          </p>

          {/* Google Sign-In */}
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 py-4 rounded-xl bg-white text-gray-800 font-bold text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all border border-gray-200 disabled:opacity-60 disabled:hover:translate-y-0"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin text-gray-500" />
            ) : (
              <GoogleIcon />
            )}
            {loading ? "Redirecting to Google…" : "Continue with Google"}
          </button>

          <p className="text-center text-xs text-muted-foreground mt-6">
            By signing in, you agree to AudioCare's{" "}
            <Link to="/" className="text-primary hover:underline">Terms</Link> &{" "}
            <Link to="/" className="text-primary hover:underline">Privacy Policy</Link>.
          </p>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6">
          <Link to="/" className="hover:text-foreground transition-colors">← Back to Home</Link>
        </p>
      </div>
    </div>
  );
}
