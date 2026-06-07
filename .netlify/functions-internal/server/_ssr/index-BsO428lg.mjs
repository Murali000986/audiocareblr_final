import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { N as Navbar, F as Footer } from "./Footer-n3lcnv-q.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useEmblaCarousel } from "../_libs/embla-carousel-react.mjs";
import { c as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { S as Slot } from "../_libs/radix-ui__react-slot.mjs";
import { c as cva } from "../_libs/class-variance-authority.mjs";
import { A as Autoplay } from "../_libs/embla-carousel-autoplay.mjs";
import { u as useScrollAnimation } from "./AnimatedSection-CxAJpKfW.mjs";
import { P as ProductCard } from "./ProductCard-BrW1dAPZ.mjs";
import { a as useProductsCache } from "./router-DS6h6cMK.mjs";
import { S as SkeletonCard } from "./SkeletonCard-c9stZMFV.mjs";
import { O as OurWork } from "./OurWork-DDyKtagk.mjs";
import { R as ReviewsSection } from "./ReviewsSection-DN2nsuHh.mjs";
import "../_libs/sonner.mjs";
import { m as ArrowRight, W as Wrench, d as Phone, C as Clock, f as MapPin, A as ArrowLeft } from "../_libs/lucide-react.mjs";
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
import "../_libs/embla-carousel-reactive-utils.mjs";
import "../_libs/embla-carousel.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
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
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const Button = reactExports.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Comp, { className: cn(buttonVariants({ variant, size, className })), ref, ...props });
  }
);
Button.displayName = "Button";
const CarouselContext = reactExports.createContext(null);
function useCarousel() {
  const context = reactExports.useContext(CarouselContext);
  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }
  return context;
}
const Carousel = reactExports.forwardRef(({ orientation = "horizontal", opts, setApi, plugins, className, children, ...props }, ref) => {
  const [carouselRef, api] = useEmblaCarousel(
    {
      ...opts,
      axis: orientation === "horizontal" ? "x" : "y"
    },
    plugins
  );
  const [canScrollPrev, setCanScrollPrev] = reactExports.useState(false);
  const [canScrollNext, setCanScrollNext] = reactExports.useState(false);
  const onSelect = reactExports.useCallback((api2) => {
    if (!api2) {
      return;
    }
    setCanScrollPrev(api2.canScrollPrev());
    setCanScrollNext(api2.canScrollNext());
  }, []);
  const scrollPrev = reactExports.useCallback(() => {
    api?.scrollPrev();
  }, [api]);
  const scrollNext = reactExports.useCallback(() => {
    api?.scrollNext();
  }, [api]);
  const handleKeyDown = reactExports.useCallback(
    (event) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        scrollPrev();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        scrollNext();
      }
    },
    [scrollPrev, scrollNext]
  );
  reactExports.useEffect(() => {
    if (!api || !setApi) {
      return;
    }
    setApi(api);
  }, [api, setApi]);
  reactExports.useEffect(() => {
    if (!api) {
      return;
    }
    onSelect(api);
    api.on("reInit", onSelect);
    api.on("select", onSelect);
    return () => {
      api?.off("select", onSelect);
    };
  }, [api, onSelect]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    CarouselContext.Provider,
    {
      value: {
        carouselRef,
        api,
        opts,
        orientation: orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext
      },
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          ref,
          onKeyDownCapture: handleKeyDown,
          className: cn("relative", className),
          role: "region",
          "aria-roledescription": "carousel",
          ...props,
          children
        }
      )
    }
  );
});
Carousel.displayName = "Carousel";
const CarouselContent = reactExports.forwardRef(
  ({ className, ...props }, ref) => {
    const { carouselRef, orientation } = useCarousel();
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: carouselRef, className: "overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        ref,
        className: cn(
          "flex",
          orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
          className
        ),
        ...props
      }
    ) });
  }
);
CarouselContent.displayName = "CarouselContent";
const CarouselItem = reactExports.forwardRef(
  ({ className, ...props }, ref) => {
    const { orientation } = useCarousel();
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        ref,
        role: "group",
        "aria-roledescription": "slide",
        className: cn(
          "min-w-0 shrink-0 grow-0 basis-full",
          orientation === "horizontal" ? "pl-4" : "pt-4",
          className
        ),
        ...props
      }
    );
  }
);
CarouselItem.displayName = "CarouselItem";
const CarouselPrevious = reactExports.forwardRef(
  ({ className, variant = "outline", size = "icon", ...props }, ref) => {
    const { orientation, scrollPrev, canScrollPrev } = useCarousel();
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Button,
      {
        ref,
        variant,
        size,
        className: cn(
          "absolute  h-8 w-8 rounded-full",
          orientation === "horizontal" ? "-left-12 top-1/2 -translate-y-1/2" : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
          className
        ),
        disabled: !canScrollPrev,
        onClick: scrollPrev,
        ...props,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Previous slide" })
        ]
      }
    );
  }
);
CarouselPrevious.displayName = "CarouselPrevious";
const CarouselNext = reactExports.forwardRef(
  ({ className, variant = "outline", size = "icon", ...props }, ref) => {
    const { orientation, scrollNext, canScrollNext } = useCarousel();
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Button,
      {
        ref,
        variant,
        size,
        className: cn(
          "absolute h-8 w-8 rounded-full",
          orientation === "horizontal" ? "-right-12 top-1/2 -translate-y-1/2" : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
          className
        ),
        disabled: !canScrollNext,
        onClick: scrollNext,
        ...props,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Next slide" })
        ]
      }
    );
  }
);
CarouselNext.displayName = "CarouselNext";
const slides = [
  {
    id: 1,
    tag: "Premium Installation",
    title: "HOME THEATER THAT BLOWS YOUR MIND",
    subtitle: "We design, supply & install complete home theater systems — surround sound, projectors, and acoustic treatment. Cinema-grade experience at home.",
    image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?q=80&w=1920&auto=format&fit=crop",
    cta: "Explore Home Theater",
    ctaLink: "/shop/category/home-theatre",
    accent: "#e84e1b"
  },
  {
    id: 2,
    tag: "Expert Repair Service",
    title: "WE REPAIR ALL AUDIO EQUIPMENT",
    subtitle: "Speaker cones, amplifiers, soundbars, subwoofers — our certified technicians fix it all. Free pickup & delivery at your doorstep.",
    image: "https://images.unsplash.com/photo-1599669454699-248893623440?q=80&w=1920&auto=format&fit=crop",
    cta: "Book a Repair",
    ctaLink: "/repair-service",
    accent: "#1f5c2e"
  },
  {
    id: 3,
    tag: "Premium Sound Systems",
    title: "SURROUND SOUND FOR EVERY SPACE",
    subtitle: "From compact soundbars to multi-room audio setups — premium JBL, Sony, Bose & more. Experience music the way it was meant to be heard.",
    image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?q=80&w=1920&auto=format&fit=crop",
    cta: "Shop Sound Systems",
    ctaLink: "/shop",
    accent: "#1a3c6e"
  },
  {
    id: 4,
    tag: "Theater & Auditorium",
    title: "PROFESSIONAL THEATER AUDIO SOLUTIONS",
    subtitle: "Complete audio-visual solutions for theaters, auditoriums, conference halls and events. Clarity that carries every word, every note.",
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1920&auto=format&fit=crop",
    cta: "Get a Quote",
    ctaLink: "/contact",
    accent: "#5b21b6"
  }
];
function Hero() {
  const plugin = reactExports.useRef(Autoplay({ delay: 5e3, stopOnInteraction: true }));
  const [current, setCurrent] = reactExports.useState(0);
  reactExports.useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5e3);
    return () => clearInterval(interval);
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "w-full relative overflow-hidden bg-black", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Carousel,
    {
      plugins: [plugin.current],
      className: "w-full",
      opts: { loop: true },
      setApi: (api) => {
        if (!api) return;
        api.on("select", () => setCurrent(api.selectedScrollSnap()));
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CarouselContent, { className: "-ml-0", children: slides.map((slide) => /* @__PURE__ */ jsxRuntimeExports.jsx(CarouselItem, { className: "pl-0 min-w-0 basis-full", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full h-[560px] lg:h-[680px] flex items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 z-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: slide.image,
                alt: slide.title,
                className: "w-full h-full object-cover"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-black/10" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-10 max-w-7xl mx-auto px-6 sm:px-10 w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "inline-block text-white text-xs font-bold uppercase tracking-[0.2em] px-3 py-1.5 rounded-sm mb-5",
                style: { backgroundColor: slide.accent },
                children: slide.tag
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-extrabold tracking-tight text-white text-4xl sm:text-5xl lg:text-6xl uppercase leading-[1.05]", children: slide.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-5 text-base sm:text-lg text-white/85 max-w-xl font-normal leading-relaxed", children: slide.subtitle }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 flex flex-wrap gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Link,
                {
                  to: slide.ctaLink,
                  className: "inline-flex items-center justify-center gap-2 px-8 py-4 text-white font-bold uppercase tracking-wider transition-all hover:brightness-110 hover:-translate-y-0.5",
                  style: { backgroundColor: slide.accent },
                  children: [
                    slide.cta,
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-5 h-5" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Link,
                {
                  to: "/shop",
                  className: "inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white/60 text-white font-bold uppercase tracking-wider hover:bg-white/10 transition-all",
                  children: "View All Products"
                }
              )
            ] })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-8 left-6 sm:left-10 z-20 flex items-center gap-3", children: slides.map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "h-[3px] rounded-full transition-all duration-500",
              style: {
                width: i === current ? "40px" : "16px",
                backgroundColor: i === current ? slide.accent : "rgba(255,255,255,0.4)"
              }
            },
            i
          )) })
        ] }) }, slide.id)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CarouselPrevious, { className: "absolute left-4 top-1/2 -translate-y-1/2 z-20 h-12 w-12 border-none bg-white/10 hover:bg-white/25 text-white backdrop-blur-sm rounded-none" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CarouselNext, { className: "absolute right-4 top-1/2 -translate-y-1/2 z-20 h-12 w-12 border-none bg-white/10 hover:bg-white/25 text-white backdrop-blur-sm rounded-none" })
      ]
    }
  ) });
}
function MarqueeBar() {
  const items = [
    "FEEL THE BASS",
    "JBL · INFINITY · HARMAN KARDON",
    "18+ YEARS OF EXCELLENCE",
    "HOME THEATER INSTALLATION",
    "FREE PICKUP & DELIVERY",
    "10,000+ REPAIRS DONE",
    "COMMERCIAL AUDIO AMC",
    "WONDERLA · BANGALORE CLUB · PROFX",
    "FEEL THE BASS",
    "JBL · INFINITY · HARMAN KARDON",
    "18+ YEARS OF EXCELLENCE",
    "HOME THEATER INSTALLATION",
    "FREE PICKUP & DELIVERY",
    "10,000+ REPAIRS DONE",
    "COMMERCIAL AUDIO AMC",
    "WONDERLA · BANGALORE CLUB · PROFX"
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative overflow-hidden bg-primary py-3 select-none", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex animate-marquee whitespace-nowrap", children: items.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-6 text-primary-foreground font-bold text-xs tracking-[0.2em] mx-8", children: [
    item,
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block w-1.5 h-1.5 rounded-full bg-primary-foreground/60" })
  ] }, i)) }) });
}
function BrandCloud() {
  const brands = [
    { name: "Klipsch", img: "https://upload.wikimedia.org/wikipedia/commons/3/30/Klipsch_logo.svg", class: "font-display font-black text-2xl tracking-tighter text-foreground" },
    { name: "Polk Audio", img: "https://upload.wikimedia.org/wikipedia/commons/6/6f/Polk_Audio_logo.svg", class: "font-sans font-bold text-2xl text-red-600 tracking-tight lowercase" },
    { name: "FOCAL", img: "https://upload.wikimedia.org/wikipedia/commons/1/1a/Focal_logo.svg", class: "font-sans font-light text-3xl tracking-[0.2em] uppercase text-foreground" },
    { name: "ELAC", class: "font-display font-black text-3xl tracking-widest uppercase text-foreground" },
    { name: "KEF", img: "https://upload.wikimedia.org/wikipedia/commons/0/05/KEF_logo.svg", class: "font-display font-black text-4xl text-sky-700 tracking-tight uppercase" },
    { name: "JBL", img: "https://upload.wikimedia.org/wikipedia/commons/e/ea/JBL_logo.svg", class: "font-display font-black text-3xl bg-orange-600 text-white px-3 py-1 tracking-tighter rounded-sm" },
    { name: "SONY", img: "https://upload.wikimedia.org/wikipedia/commons/b/b3/Sony_logo.svg", class: "font-serif font-black text-4xl tracking-widest uppercase text-foreground" },
    { name: "BenQ", img: "https://upload.wikimedia.org/wikipedia/commons/7/7b/BenQ_logo.svg", class: "font-sans font-black text-3xl text-purple-700 tracking-tight" },
    { name: "Optoma", img: "https://upload.wikimedia.org/wikipedia/commons/e/e0/Optoma_logo.svg", class: "font-sans font-bold text-3xl italic tracking-tight text-red-500" },
    { name: "EPSON", img: "https://upload.wikimedia.org/wikipedia/commons/4/46/Epson_logo.svg", class: "font-display font-black text-3xl text-blue-600 tracking-widest uppercase" },
    { name: "JVC", img: "https://upload.wikimedia.org/wikipedia/commons/b/b0/JVC_logo.svg", class: "font-sans font-black text-3xl text-red-600 tracking-widest uppercase" },
    { name: "YAMAHA", img: "https://upload.wikimedia.org/wikipedia/commons/4/41/Yamaha_logo.svg", class: "font-sans font-black text-3xl text-blue-800 tracking-widest uppercase" },
    { name: "DENON", img: "https://upload.wikimedia.org/wikipedia/commons/1/15/Denon_logo.svg", class: "font-serif font-black text-3xl tracking-widest uppercase text-foreground" },
    { name: "Pioneer", img: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Pioneer_logo.svg", class: "font-sans font-black text-3xl text-red-600 italic tracking-tighter" },
    { name: "marantz", class: "font-serif font-bold text-3xl text-yellow-600 tracking-widest lowercase" },
    { name: "MISSION", class: "font-display font-bold text-2xl tracking-widest border-[3px] border-foreground px-3 py-0.5 uppercase text-foreground" },
    { name: "jamo", class: "font-sans font-bold text-3xl tracking-tighter lowercase italic text-foreground" },
    { name: "REL", class: "font-serif font-black text-4xl text-blue-800 tracking-widest uppercase" },
    { name: "TAGA", class: "font-serif font-black text-3xl tracking-widest uppercase text-foreground" },
    { name: "MONITOR AUDIO", class: "font-sans font-black text-2xl tracking-tighter uppercase text-foreground" },
    { name: "Q Acoustics", class: "font-display font-bold text-2xl tracking-tight text-foreground" }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-20 bg-background border-y border-border overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-bold uppercase tracking-widest text-muted-foreground mb-16", children: "Trusted By The Best In Audio" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap justify-center items-center gap-x-14 gap-y-12", children: brands.map((brand) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "grayscale opacity-50 hover:grayscale-0 hover:opacity-100 hover:scale-[1.15] hover:-translate-y-1 transition-all duration-300 cursor-default select-none flex items-center justify-center h-16",
        title: brand.name,
        children: [
          brand.img ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: brand.img,
              alt: brand.name,
              className: "max-h-12 max-w-[140px] object-contain dark:brightness-200 dark:contrast-200",
              onError: (e) => {
                e.currentTarget.style.display = "none";
                e.currentTarget.nextElementSibling?.classList.remove("hidden");
              }
            }
          ) : null,
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `${brand.class} ${brand.img ? "hidden" : ""}`, children: brand.name })
        ]
      },
      brand.name
    )) })
  ] }) });
}
function PromoBanners() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "w-full bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative group overflow-hidden bg-black min-h-[420px] lg:min-h-[500px] flex items-end", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1200&auto=format&fit=crop",
            alt: "Home Theater Setup",
            className: "absolute inset-0 w-full h-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-105"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 p-8 md:p-12 w-full", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block bg-[#e84e1b] text-white text-xs font-bold uppercase tracking-widest px-3 py-1 mb-4", children: "Home Theater" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-3xl md:text-4xl lg:text-5xl font-extrabold text-white uppercase tracking-tight leading-tight mb-3 font-display", children: [
            "CINEMA IN YOUR",
            /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
            "LIVING ROOM"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/80 text-base font-medium mb-7 max-w-sm", children: "Complete home theater design, supply & installation — Dolby Atmos, 4K, acoustic panels and smart controls." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/shop/category/$slug",
              params: { slug: "home-theatre" },
              className: "inline-flex items-center gap-2 bg-white text-black font-bold uppercase tracking-wider px-7 py-3 hover:bg-gray-100 transition-colors",
              children: [
                "Shop Now ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" })
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative group overflow-hidden bg-black min-h-[420px] lg:min-h-[500px] flex items-end", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=1200&auto=format&fit=crop",
            alt: "Premium Sound Systems",
            className: "absolute inset-0 w-full h-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-105"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 p-8 md:p-12 w-full", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block bg-[#1a3c6e] text-white text-xs font-bold uppercase tracking-widest px-3 py-1 mb-4", children: "Sound Systems" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-3xl md:text-4xl lg:text-5xl font-extrabold text-white uppercase tracking-tight leading-tight mb-3 font-display", children: [
            "HEAR EVERY DETAIL,",
            /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
            "FEEL EVERY BEAT"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/80 text-base font-medium mb-7 max-w-sm", children: "JBL, Sony, Bose & Marshall — premium speakers, soundbars, and party systems. Starting at ₹2,999." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/shop",
              className: "inline-flex items-center gap-2 bg-white text-black font-bold uppercase tracking-wider px-7 py-3 hover:bg-gray-100 transition-colors",
              children: [
                "Shop Now ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" })
              ]
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-border border-t border-border bg-card", children: [
      { icon: "🚚", title: "Free Pickup & Delivery", sub: "For all repair orders across the city" },
      { icon: "🛡️", title: "100% Genuine Parts", sub: "Original brand components only" },
      { icon: "⚡", title: "Same-Day Service", sub: "Fast turnaround on most repairs" },
      { icon: "📞", title: "Expert Support", sub: "Call us anytime for audio advice" }
    ].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 px-6 py-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl", children: item.icon }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-sm", children: item.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs mt-0.5", children: item.sub })
      ] })
    ] }, item.title)) })
  ] });
}
const services = [
  {
    id: 1,
    title: "Home Theater",
    description: "Transform any room into a private cinema. We supply and install complete home theater systems with Dolby Atmos surround sound, 4K projectors, acoustic panels, and smart controls.",
    image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?q=80&w=900&auto=format&fit=crop",
    link: "/shop/category/home-theatre",
    tag: "Design & Install",
    points: ["Dolby Atmos / DTS:X Surround", "4K Projector Setup", "Acoustic Treatment", "Smart Remote Control"],
    accent: "#e84e1b"
  },
  {
    id: 2,
    title: "Theater & Auditorium",
    description: "Professional audio-visual solutions for theaters, auditoriums, schools, and conference halls. Crisp, powerful sound that fills every seat — engineered for large spaces.",
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=900&auto=format&fit=crop",
    link: "/contact",
    tag: "Professional AV",
    points: ["Large Venue Sound Design", "Line Array Speaker Systems", "AV Integration", "Conference & Boardroom"],
    accent: "#5b21b6"
  },
  {
    id: 3,
    title: "Sound Systems",
    description: "Whether it's a premium soundbar, multi-room audio, or a full hi-fi setup — we carry top brands like JBL, Sony, Bose, and Marshall. Your perfect sound system is here.",
    image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?q=80&w=900&auto=format&fit=crop",
    link: "/shop",
    tag: "Buy & Experience",
    points: ["Premium Brand Selection", "Soundbars & Subwoofers", "Multi-room Audio", "Party Speakers"],
    accent: "#1a3c6e"
  },
  {
    id: 4,
    title: "Audio Repair Service",
    description: "Expert repair for all audio equipment — speakers, amplifiers, subwoofers, soundbars, receivers. Certified technicians, genuine parts, and free pickup & delivery.",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=900&auto=format&fit=crop",
    link: "/repair-service",
    tag: "Repair & Restore",
    points: ["Speaker Cone Replacement", "Amplifier Repair", "Soundbar Servicing", "Free Doorstep Pickup"],
    accent: "#1f5c2e"
  }
];
function ServicesShowcase() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "w-full bg-background py-20 px-4 sm:px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-14", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary font-bold uppercase tracking-[0.2em] text-sm mb-3", children: "Everything Audio, Under One Roof" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-extrabold text-4xl sm:text-5xl tracking-tight", children: "What We Do" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-muted-foreground text-lg max-w-2xl mx-auto", children: "From home theaters and professional audio installations to speaker repair — AudioCare is your complete audio solutions partner." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-8", children: services.map((service, idx) => {
      const isEven = idx % 2 === 0;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: `group flex flex-col ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"} rounded-2xl overflow-hidden border border-border shadow-soft hover:shadow-lg transition-shadow`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full lg:w-[55%] h-64 sm:h-80 lg:h-[420px] overflow-hidden bg-muted flex-shrink-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: service.image,
                  alt: service.title,
                  className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "absolute top-5 left-5 text-white text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-sm",
                  style: { backgroundColor: service.accent },
                  children: service.tag
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col justify-center p-8 sm:p-10 lg:p-14 bg-card w-full", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "h3",
                {
                  className: "font-display font-extrabold text-3xl sm:text-4xl tracking-tight",
                  children: service.title
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-muted-foreground leading-relaxed text-base sm:text-lg max-w-lg", children: service.description }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2", children: service.points.map((point) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-2 text-sm font-medium text-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "w-1.5 h-1.5 rounded-full flex-shrink-0",
                    style: { backgroundColor: service.accent }
                  }
                ),
                point
              ] }, point)) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Link,
                {
                  to: service.link,
                  className: "inline-flex items-center gap-2 font-bold uppercase tracking-wider text-sm px-7 py-3.5 text-white transition-all hover:brightness-110 hover:-translate-y-0.5",
                  style: { backgroundColor: service.accent },
                  children: [
                    service.id === 4 ? "Book Repair Now" : service.id === 2 ? "Get a Quote" : "Explore More",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" })
                  ]
                }
              ) })
            ] })
          ]
        },
        service.id
      );
    }) })
  ] }) });
}
function Counter({ target, suffix = "", duration = 2e3 }) {
  const [count, setCount] = reactExports.useState(0);
  const { ref, isVisible } = useScrollAnimation(0.3);
  const started = reactExports.useRef(false);
  reactExports.useEffect(() => {
    if (!isVisible || started.current) return;
    started.current = true;
    const steps = 60;
    const inc = target / steps;
    let current = 0;
    const interval = setInterval(() => {
      current += inc;
      if (current >= target) {
        setCount(target);
        clearInterval(interval);
      } else setCount(Math.floor(current));
    }, duration / steps);
    return () => clearInterval(interval);
  }, [isVisible, target, duration]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { ref, className: "tabular-nums", children: [
    count.toLocaleString("en-IN"),
    suffix
  ] });
}
const stats = [
  { value: 1e4, suffix: "+", label: "Repairs Done", sub: "Since 2014" },
  { value: 50, suffix: "+", label: "Premium Brands", sub: "Genuine products" },
  { value: 4.9, suffix: "★", label: "Avg. Rating", sub: "From 5,000+ reviews" },
  { value: 48, suffix: "hr", label: "Turnaround", sub: "Fast & reliable" }
];
function StatsBar() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "py-16 bg-section border-y border-border relative overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 pointer-events-none", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 left-1/4 w-96 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 right-1/4 w-96 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-2 lg:grid-cols-4 gap-8", children: stats.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center group", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "font-display font-black text-4xl sm:text-5xl text-gradient-orange animate-fade-up",
          style: { animationDelay: `${i * 120}ms` },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Counter,
            {
              target: s.value,
              suffix: s.suffix,
              duration: 1800
            }
          )
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 font-bold text-sm text-foreground/90 animate-fade-up", style: { animationDelay: `${i * 120 + 100}ms` }, children: s.label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground mt-0.5 animate-fade-up", style: { animationDelay: `${i * 120 + 200}ms` }, children: s.sub })
    ] }, s.label)) })
  ] });
}
function ImageGallery() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-20 bg-background overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl sm:text-4xl font-display font-extrabold tracking-tight mb-3", children: "Audio Inspiration" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-lg", children: "Explore our premium installations and top-tier audio equipment setups." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/our-work", className: "inline-flex items-center gap-2 font-bold text-primary hover:underline shrink-0", children: [
        "View Portfolio ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-2 row-span-2 rounded-2xl overflow-hidden relative group", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: "https://images.unsplash.com/photo-1593784991095-a205069470b6?q=80&w=1200&auto=format&fit=crop",
          alt: "Home Theater",
          className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-1 row-span-1 rounded-2xl overflow-hidden relative group", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: "https://images.unsplash.com/photo-1545454675-3531b543be5d?q=80&w=600&auto=format&fit=crop",
          alt: "Premium Speakers",
          className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-1 row-span-2 rounded-2xl overflow-hidden relative group", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=600&auto=format&fit=crop",
          alt: "Auditorium Audio",
          className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-1 row-span-1 rounded-2xl overflow-hidden relative group", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=600&auto=format&fit=crop",
          alt: "Soundbar Setup",
          className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        }
      ) })
    ] })
  ] }) });
}
const categoryCards = [
  {
    slug: "home-theatre",
    label: "Home Theater",
    desc: "Complete cinema setups",
    image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?q=80&w=800&auto=format&fit=crop",
    accent: "#e84e1b"
  },
  {
    slug: "soundbar",
    label: "Soundbars",
    desc: "Immersive wall sound",
    image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?q=80&w=800&auto=format&fit=crop",
    accent: "#1a3c6e"
  },
  {
    slug: "bluetooth",
    label: "Bluetooth Speakers",
    desc: "Portable & powerful",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=800&auto=format&fit=crop",
    accent: "#5b21b6"
  },
  {
    slug: "party",
    label: "Party Speakers",
    desc: "Massive bass & lights",
    image: "https://images.unsplash.com/photo-1520166970742-99d863ff1c83?q=80&w=800&auto=format&fit=crop",
    accent: "#b91c1c"
  },
  {
    slug: "accessories",
    label: "Accessories",
    desc: "Cables, stands & more",
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=800&auto=format&fit=crop",
    accent: "#1f5c2e"
  }
];
function Categories() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "w-full bg-[#f6f6f6] dark:bg-[#0f0f0f] py-16 px-4 sm:px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary font-bold uppercase tracking-[0.2em] text-xs mb-2", children: "Browse by Category" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-extrabold text-3xl sm:text-4xl tracking-tight", children: "Shop Our Products" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: "/shop",
          className: "text-sm font-bold uppercase tracking-wider text-primary hover:underline flex items-center gap-1 shrink-0",
          children: "View All →"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4", children: categoryCards.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Link,
      {
        to: "/shop/category/$slug",
        params: { slug: cat.slug },
        className: "group relative overflow-hidden rounded-xl bg-black aspect-[3/4] flex flex-col justify-end shadow-soft",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: cat.image,
              alt: cat.label,
              loading: "lazy",
              className: "absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white font-extrabold text-base leading-tight font-display", children: cat.label }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/70 text-xs mt-0.5", children: cat.desc }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "mt-3 text-white text-xs font-bold uppercase tracking-widest flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity",
                children: "Shop Now →"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute top-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity",
              style: { backgroundColor: cat.accent }
            }
          )
        ]
      },
      cat.slug
    )) })
  ] }) });
}
function RepairCTABanner() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative w-full overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 z-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1920&auto=format&fit=crop",
          alt: "Audio Repair Service",
          className: "w-full h-full object-cover"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-black/80" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-[#e84e1b]/20 via-transparent to-transparent" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-10 max-w-7xl mx-auto px-6 sm:px-10 py-20 lg:py-28", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-2 gap-12 items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 bg-[#e84e1b] text-white text-xs font-bold uppercase tracking-widest px-4 py-2 mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Wrench, { className: "w-4 h-4" }),
          "Professional Repair Service"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white uppercase tracking-tight leading-[1.05]", children: [
          "WE FIX WHAT",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[#e84e1b]", children: "OTHERS CAN'T." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-5 text-white/80 text-lg leading-relaxed max-w-lg", children: "Speakers, amplifiers, subwoofers, soundbars, receivers — our certified technicians repair all audio equipment with genuine parts and a service warranty." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 flex flex-wrap gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/repair-service",
              className: "inline-flex items-center gap-2 bg-[#e84e1b] hover:bg-[#c73d0f] text-white font-bold uppercase tracking-wider px-8 py-4 transition-colors",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Wrench, { className: "w-5 h-5" }),
                "Book a Repair"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/contact",
              className: "inline-flex items-center gap-2 border-2 border-white/50 text-white hover:bg-white/10 font-bold uppercase tracking-wider px-8 py-4 transition-colors",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-5 h-5" }),
                "Call Us"
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-4", children: [
        {
          icon: Wrench,
          title: "Speaker Repair",
          desc: "Cone replacement, voice coil, crossover repairs for all brands"
        },
        {
          icon: Wrench,
          title: "Amplifier Repair",
          desc: "Receivers, integrated amps, subwoofer modules — we fix all"
        },
        {
          icon: Clock,
          title: "Fast Turnaround",
          desc: "Most repairs completed within 24–48 hours with prior booking"
        },
        {
          icon: MapPin,
          title: "Free Doorstep Pickup",
          desc: "We pick up and deliver your equipment anywhere in the city"
        }
      ].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "border border-white/15 bg-white/5 backdrop-blur-sm p-5 hover:border-[#e84e1b]/50 hover:bg-white/10 transition-all",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(item.icon, { className: "w-6 h-6 text-[#e84e1b] mb-3" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-white font-bold text-sm mb-1", children: item.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/60 text-xs leading-relaxed", children: item.desc })
          ]
        },
        item.title
      )) })
    ] }) })
  ] });
}
function FeaturedProducts() {
  const { products, loading } = useProductsCache();
  const featured = products.slice(0, 6);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "max-w-7xl mx-auto px-4 sm:px-6 py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-[260px_1fr] gap-6 items-start", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-3xl font-bold", children: [
        "Featured",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        "Products"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/shop", className: "inline-flex items-center gap-1 text-xs font-semibold text-primary border border-primary rounded-full px-3 py-1.5 mt-3 hover:bg-primary hover:text-primary-foreground transition-colors", children: [
        "View All Products ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-3 h-3" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-4", children: loading ? [...Array(6)].map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonCard, {}, i)) : featured.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(ProductCard, { p }, p.id)) })
  ] }) });
}
function Index() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Hero, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MarqueeBar, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(BrandCloud, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(PromoBanners, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ServicesShowcase, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatsBar, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ImageGallery, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Categories, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(RepairCTABanner, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FeaturedProducts, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(OurWork, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ReviewsSection, {})
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
export {
  Index as component
};
