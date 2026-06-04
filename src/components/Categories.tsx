import { Link } from "@tanstack/react-router";

const categoryCards = [
  {
    slug: "home-theatre",
    label: "Home Theater",
    desc: "Complete cinema setups",
    image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?q=80&w=800&auto=format&fit=crop",
    accent: "#e84e1b",
  },
  {
    slug: "soundbar",
    label: "Soundbars",
    desc: "Immersive wall sound",
    image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?q=80&w=800&auto=format&fit=crop",
    accent: "#1a3c6e",
  },
  {
    slug: "bluetooth",
    label: "Bluetooth Speakers",
    desc: "Portable & powerful",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=800&auto=format&fit=crop",
    accent: "#5b21b6",
  },
  {
    slug: "party",
    label: "Party Speakers",
    desc: "Massive bass & lights",
    image: "https://images.unsplash.com/photo-1520166970742-99d863ff1c83?q=80&w=800&auto=format&fit=crop",
    accent: "#b91c1c",
  },
  {
    slug: "accessories",
    label: "Accessories",
    desc: "Cables, stands & more",
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=800&auto=format&fit=crop",
    accent: "#1f5c2e",
  },
];

export function Categories() {
  return (
    <section className="w-full bg-[#f6f6f6] dark:bg-[#0f0f0f] py-16 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <p className="text-primary font-bold uppercase tracking-[0.2em] text-xs mb-2">
              Browse by Category
            </p>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl tracking-tight">
              Shop Our Products
            </h2>
          </div>
          <Link
            to="/shop"
            className="text-sm font-bold uppercase tracking-wider text-primary hover:underline flex items-center gap-1 shrink-0"
          >
            View All →
          </Link>
        </div>

        {/* Grid: 2 large + 3 small */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categoryCards.map((cat) => (
            <Link
              key={cat.slug}
              to="/shop/category/$slug"
              params={{ slug: cat.slug }}
              className="group relative overflow-hidden rounded-xl bg-black aspect-[3/4] flex flex-col justify-end shadow-soft"
            >
              {/* Image */}
              <img
                src={cat.image}
                alt={cat.label}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
              {/* Content */}
              <div className="relative z-10 p-4">
                <p className="text-white font-extrabold text-base leading-tight font-display">
                  {cat.label}
                </p>
                <p className="text-white/70 text-xs mt-0.5">{cat.desc}</p>
                <div
                  className="mt-3 text-white text-xs font-bold uppercase tracking-widest flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  Shop Now →
                </div>
              </div>
              {/* Accent top bar */}
              <div
                className="absolute top-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ backgroundColor: cat.accent }}
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
