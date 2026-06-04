import { type ReactNode } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

type Direction = "up" | "down" | "left" | "right" | "zoom";

interface Props {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  className?: string;
  threshold?: number;
}

const getTransform = (d: Direction) => {
  switch (d) {
    case "left":  return "translateX(-60px)";
    case "right": return "translateX(60px)";
    case "down":  return "translateY(40px)";
    case "zoom":  return "scale(0.85)";
    default:      return "translateY(50px)";
  }
};

export function AnimatedSection({ children, direction = "up", delay = 0, className = "", threshold = 0.12 }: Props) {
  const { ref, isVisible } = useScrollAnimation(threshold);

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "none" : getTransform(direction),
        transition: `opacity 0.75s ease ${delay}ms, transform 0.75s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}
