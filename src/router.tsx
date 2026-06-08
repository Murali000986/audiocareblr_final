import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // Cache data for 5 minutes — no repeat Supabase calls for same data
        staleTime: 5 * 60 * 1000,
        // Only retry once on failure (default is 3)
        retry: 1,
        // Don't refetch when user switches browser tabs
        refetchOnWindowFocus: false,
        // Don't refetch when user reconnects to internet
        refetchOnReconnect: false,
      },
    },
  });

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    // Preload next page data when user hovers a link (instant navigation)
    defaultPreload: "intent",
    // Small delay so accidental hovers don't trigger fetches
    defaultPreloadDelay: 80,
    // Keep preloaded data fresh for 30 seconds
    defaultPreloadStaleTime: 30_000,
  });

  return router;
};
