import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Toaster } from "sonner";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProductsCacheProvider } from "@/contexts/ProductsCacheContext";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <div className="text-8xl font-bold text-primary">404</div>
        <h2 className="mt-4 text-xl font-semibold">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">The page you're looking for doesn't exist or has been moved.</p>
        <div className="mt-8">
          <Link to="/" className="inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition-all hover:opacity-90">
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight">This page didn't load</h1>
        <p className="mt-2 text-sm text-muted-foreground">Something went wrong. Try refreshing or head back home.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="inline-flex items-center justify-center rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground transition-all hover:opacity-90"
          >
            Try again
          </button>
          <a href="/" className="inline-flex items-center justify-center rounded-xl border border-border px-5 py-2.5 text-sm font-bold hover:bg-accent transition-all">
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://www.audiocareblr.com/#business",
  "name": "AudioCare",
  "alternateName": ["AudioCare Bengaluru", "AudioCare Koramangala", "AudioCare Nagarabhavi"],
  "url": "https://www.audiocareblr.com",
  "logo": "https://www.audiocareblr.com/favicon.svg",
  "image": "https://www.audiocareblr.com/favicon.svg",
  "description": "AudioCare is Bengaluru's trusted audio service center offering speaker repair, amplifier service, home theatre installation, and professional sound system setup since 2007. Founded by Prakash, former service vendor for JBL, Infinity and Harman Kardon (Sahil International).",
  "telephone": "+91-99459-66499",
  "email": "murali701081@gmail.com",
  "founder": { "@type": "Person", "name": "Prakash", "jobTitle": "Founder & Head Technician" },
  "foundingDate": "2007",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "385, 17th F Main Rd, KHB Colony, 5th Block, Koramangala",
    "addressLocality": "Bengaluru",
    "addressRegion": "Karnataka",
    "postalCode": "560095",
    "addressCountry": "IN"
  },
  "location": [
    {
      "@type": "Place",
      "name": "AudioCare Koramangala",
      "url": "https://maps.app.goo.gl/A5eJPPQdYyxD6g797",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Koramangala, Bengaluru",
        "addressRegion": "Karnataka",
        "addressCountry": "IN"
      }
    },
    {
      "@type": "Place",
      "name": "AudioCare Unit2 Nagarabhavi",
      "url": "https://maps.app.goo.gl/ZUKo8JVv9Zaa5YCA6",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Nagarabhavi, Bengaluru",
        "addressRegion": "Karnataka",
        "addressCountry": "IN"
      }
    }
  ],
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "12.9716",
    "longitude": "77.5946"
  },
  "areaServed": [
    "Bengaluru", "Bangalore", "Whitefield", "Koramangala", "Indiranagar",
    "Marathahalli", "Electronic City", "HSR Layout", "Jayanagar", "BTM Layout",
    "Hebbal", "Yelahanka", "Bannerghatta Road", "Sarjapur Road",
    "Nagarabhavi", "Rajajinagar", "Malleshwaram", "Basavanagudi"
  ],
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
      "opens": "10:30",
      "closes": "20:00"
    }
  ],
  "priceRange": "₹₹",
  "currenciesAccepted": "INR",
  "paymentAccepted": "Cash, UPI, Credit Card, Debit Card",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Audio Services",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Speaker Repair" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Amplifier Repair" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Home Theatre Installation" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Sound System Setup" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Annual Maintenance Contract (AMC)" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Soundbar Repair" } }
    ]
  },
  "sameAs": [
    "https://www.audiocareblr.com",
    "https://wa.me/919945966499",
    "https://www.instagram.com/audiocare_blr/",
    "https://www.justdial.com/Bangalore/Audio-Care-Opposite-Tas-Solution-Koramangala/080PXX80-XX80-140512201519-T5N8_BZDET",
    "https://www.indiamart.com/company/197264085/"
  ]
};

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "AudioCare Bengaluru — Speaker Repair, Home Theatre & Sound Systems" },
      { name: "description", content: "AudioCare — Bengaluru's trusted audio expert since 2007. Speaker & amplifier repair, home theatre installation, sound system setup. Doorstep pickup across Bangalore." },
      { name: "keywords", content: "speaker repair bangalore, amplifier repair bengaluru, home theatre installation bangalore, audio repair bengaluru, JBL repair bangalore, sound system setup bengaluru, audiocare blr" },
      { name: "author", content: "AudioCare Bengaluru" },
      { name: "robots", content: "index, follow" },
      { name: "theme-color", content: "#f97316" },
      // Open Graph
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "AudioCare Bengaluru" },
      { property: "og:title", content: "AudioCare Bengaluru — Feel Every Beat" },
      { property: "og:description", content: "Bengaluru's trusted audio experts since 2007. Speaker repair, home theatre installation & premium sound systems." },
      { property: "og:url", content: "https://www.audiocareblr.com" },
      { property: "og:locale", content: "en_IN" },
      // Twitter
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "AudioCare Bengaluru — Speaker Repair & Home Theatre" },
      { name: "twitter:description", content: "Bengaluru's trusted audio experts since 2007." },
      // Geo tags for local SEO
      { name: "geo.region", content: "IN-KA" },
      { name: "geo.placename", content: "Bengaluru" },
      { name: "geo.position", content: "12.9716;77.5946" },
      { name: "ICBM", content: "12.9716, 77.5946" },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      // Preload most-used font weight for faster first paint
      {
        rel: "preload",
        href: "https://fonts.gstatic.com/s/manrope/v15/xn7gYHE41ni1AdIRggexSg.woff2",
        as: "font",
        type: "font/woff2",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        // font-display=swap ensures text is visible immediately using fallback font while custom font loads
        href: "https://fonts.googleapis.com/css2?family=Great+Vibes&family=Manrope:wght@400;600;700;800&family=Sora:wght@500;600;700;800&display=swap",
      },
      { rel: "sitemap", type: "application/xml", href: "/sitemap.xml" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(localBusinessSchema),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    // No forced dark class — ThemeProvider handles this at runtime
    <html lang="en">
      <head>
        {/* Inline script to set theme before paint (prevents flash) */}
        <script dangerouslySetInnerHTML={{
          __html: `
            (function() {
              try {
                var t = localStorage.getItem('theme');
                if (t === 'dark') {
                  document.documentElement.classList.add('dark');
                }
              } catch(e) {}
            })();
          `
        }} />
        <HeadContent />
      </head>
      <body className="antialiased bg-background text-foreground">
        {children}
        <Scripts />
      </body>
    </html>
  );
}

/** Slim orange top bar that shows while a page is loading — like YouTube/GitHub */
function NavigationProgress() {
  const isLoading = useRouterState({ select: (s) => s.status === "pending" });
  const [width, setWidth] = useState(0);
  const [visible, setVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isLoading) {
      setVisible(true);
      setWidth(15);
      timerRef.current = setInterval(() => {
        setWidth((w) => {
          if (w >= 85) { if (timerRef.current) clearInterval(timerRef.current); return 85; }
          return w + (90 - w) * 0.08;
        });
      }, 100);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
      setWidth(100);
      const t = setTimeout(() => { setVisible(false); setWidth(0); }, 300);
      return () => clearTimeout(t);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isLoading]);

  if (!visible) return null;
  return (
    <div
      style={{
        position: "fixed", top: 0, left: 0, zIndex: 9999,
        height: "3px",
        width: `${width}%`,
        background: "linear-gradient(90deg, oklch(0.68 0.21 42), oklch(0.76 0.2 52))",
        transition: width === 100 ? "width 0.2s ease" : "width 0.4s ease",
        boxShadow: "0 0 12px 2px oklch(0.68 0.21 42 / 0.6)",
        borderRadius: "0 2px 2px 0",
      }}
    />
  );
}

function FloatingWhatsApp() {
  return (
    <a
      href="https://wa.me/919945966499?text=Hi%20AudioCare!%20I%20need%20help%20with%20my%20audio%20equipment."
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-[999] w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-xl animate-pulse-ring hover:scale-110 transition-transform"
    >
      <svg viewBox="0 0 24 24" className="w-7 h-7 fill-white" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    </a>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const location = useRouter().state.location;

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <ProductsCacheProvider>
            <NavigationProgress />
            <div key={location.pathname} className="animate-fade-up">
              <Outlet />
            </div>
            <FloatingWhatsApp />
            <Toaster position="bottom-right" richColors />
          </ProductsCacheProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

