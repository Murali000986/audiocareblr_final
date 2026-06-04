import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { CheckCircle2, ShoppingBag, Home, Package } from "lucide-react";

export const Route = createFileRoute("/order-success")({
  head: () => ({ meta: [{ title: "Order Confirmed — AudioCare" }] }),
  component: OrderSuccessPage,
});

function Confetti() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ["#ff4d00", "#ff8c42", "#ffffff", "#ffcc00", "#ff6b6b", "#4ecdc4"];
    const pieces: { x: number; y: number; w: number; h: number; color: string; speed: number; angle: number; rot: number; rotSpeed: number }[] = [];

    for (let i = 0; i < 140; i++) {
      pieces.push({
        x:        Math.random() * canvas.width,
        y:        Math.random() * canvas.height - canvas.height,
        w:        Math.random() * 10 + 5,
        h:        Math.random() * 6 + 3,
        color:    colors[Math.floor(Math.random() * colors.length)],
        speed:    Math.random() * 3 + 2,
        angle:    Math.random() * 360,
        rot:      Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 6,
      });
    }

    let frame: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let allDone = true;
      pieces.forEach((p) => {
        p.y       += p.speed;
        p.rot     += p.rotSpeed;
        p.angle   += 1;
        if (p.y < canvas.height + 20) allDone = false;
        ctx.save();
        ctx.translate(p.x + p.w / 2, p.y + p.h / 2);
        ctx.rotate((p.rot * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, 1 - p.y / canvas.height);
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      });
      if (!allDone) frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-50" />;
}

function OrderSuccessPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 relative overflow-hidden">
      <Confetti />

      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative text-center max-w-md animate-fade-up">
        {/* Icon */}
        <div className="w-24 h-24 rounded-full bg-primary/15 border-2 border-primary/40 flex items-center justify-center mx-auto mb-6 glow-subtle">
          <CheckCircle2 className="w-12 h-12 text-primary" />
        </div>

        <h1 className="font-display font-black text-4xl sm:text-5xl text-gradient-orange mb-3">
          Order Placed!
        </h1>
        <p className="text-foreground font-bold text-xl mb-2">Thank you for your order 🎉</p>
        <p className="text-muted-foreground text-sm leading-relaxed mb-8">
          Your order has been confirmed and is being processed. You'll receive a confirmation email with tracking details shortly.
        </p>

        {/* Info card */}
        <div className="glass border border-border rounded-2xl p-5 mb-8 text-left space-y-3">
          {[
            { icon: Package, label: "Processing Time", value: "1–2 business days" },
            { icon: ShoppingBag, label: "Delivery",    value: "3–5 business days across India" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center shrink-0">
                <item.icon className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{item.label}</p>
                <p className="text-sm font-semibold">{item.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/account"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-bold text-sm hover:shadow-glow transition-all btn-press"
          >
            <Package className="w-4 h-4" /> Track Order
          </Link>
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl glass border border-border font-bold text-sm hover:border-primary transition-all"
          >
            <Home className="w-4 h-4" /> Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
