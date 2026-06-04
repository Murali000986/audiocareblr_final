import { useEffect, useRef, useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

function Counter({ target, suffix = "", duration = 2000 }: { target: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const { ref, isVisible } = useScrollAnimation(0.3);
  const started = useRef(false);

  useEffect(() => {
    if (!isVisible || started.current) return;
    started.current = true;
    const steps = 60;
    const inc = target / steps;
    let current = 0;
    const interval = setInterval(() => {
      current += inc;
      if (current >= target) { setCount(target); clearInterval(interval); }
      else setCount(Math.floor(current));
    }, duration / steps);
    return () => clearInterval(interval);
  }, [isVisible, target, duration]);

  return (
    <span ref={ref as React.RefObject<HTMLSpanElement>} className="tabular-nums">
      {count.toLocaleString("en-IN")}{suffix}
    </span>
  );
}

const stats = [
  { value: 10000, suffix: "+", label: "Repairs Done", sub: "Since 2014" },
  { value: 50,   suffix: "+", label: "Premium Brands", sub: "Genuine products" },
  { value: 4.9,  suffix: "★", label: "Avg. Rating", sub: "From 5,000+ reviews" },
  { value: 48,   suffix: "hr", label: "Turnaround", sub: "Fast & reliable" },
];

export function StatsBar() {
  return (
    <section className="py-16 bg-section border-y border-border relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
        <div className="absolute bottom-0 right-1/4 w-96 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((s, i) => (
          <div key={s.label} className="text-center group">
            <div
              className="font-display font-black text-4xl sm:text-5xl text-gradient-orange animate-fade-up"
              style={{ animationDelay: `${i * 120}ms` }}
            >
              <Counter
                target={s.value}
                suffix={s.suffix}
                duration={1800}
              />
            </div>
            <div className="mt-2 font-bold text-sm text-foreground/90 animate-fade-up" style={{ animationDelay: `${i * 120 + 100}ms` }}>
              {s.label}
            </div>
            <div className="text-xs text-muted-foreground mt-0.5 animate-fade-up" style={{ animationDelay: `${i * 120 + 200}ms` }}>
              {s.sub}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
