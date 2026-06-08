import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
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
      { name: "description", content: "AudioCare — Bengaluru's trusted audio expert since 2007. Speaker & amplifier repair, home theatre installation, sound system setup. Free doorstep pickup across Bangalore." },
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
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Black+Ops+One&family=Manrope:wght@300;400;500;600;700;800&family=Sora:wght@400;500;600;700;800&display=swap",
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

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const location = useRouter().state.location;

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <ProductsCacheProvider>
            <div key={location.pathname} className="animate-fade-up">
              <Outlet />
            </div>
            <Toaster position="bottom-right" richColors />
          </ProductsCacheProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

