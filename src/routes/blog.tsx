import { createFileRoute, Outlet } from "@tanstack/react-router";

// Parent layout route for /blog and /blog/$slug
export const Route = createFileRoute("/blog")({
  component: () => <Outlet />,
});
