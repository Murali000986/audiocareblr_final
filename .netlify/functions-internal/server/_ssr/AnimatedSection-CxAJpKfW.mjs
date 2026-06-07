import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
function useScrollAnimation(threshold = 0.15) {
  const ref = reactExports.useRef(null);
  const [isVisible, setIsVisible] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, isVisible };
}
const getTransform = (d) => {
  switch (d) {
    case "left":
      return "translateX(-60px)";
    case "right":
      return "translateX(60px)";
    case "down":
      return "translateY(40px)";
    case "zoom":
      return "scale(0.85)";
    default:
      return "translateY(50px)";
  }
};
function AnimatedSection({ children, direction = "up", delay = 0, className = "", threshold = 0.12 }) {
  const { ref, isVisible } = useScrollAnimation(threshold);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      ref,
      className,
      style: {
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "none" : getTransform(direction),
        transition: `opacity 0.75s ease ${delay}ms, transform 0.75s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
        willChange: "opacity, transform"
      },
      children
    }
  );
}
export {
  AnimatedSection as A,
  useScrollAnimation as u
};
