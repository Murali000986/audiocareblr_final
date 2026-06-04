# Netlify Deployment Fix Results

## Issues Found
1. **Wrong Nitro preset**: `vite.config.ts` was using the `vercel` preset instead of `netlify`. This caused Nitro to generate output in the Vercel Build Output API format (`.vercel/output/`), which Netlify could not serve, leading to 404 errors across all routes.
2. **Missing Configuration**: There was no `netlify.toml` file to instruct Netlify on the correct build command and publish directory.
3. **Leftover Vercel Config**: `vercel.json` was present in the project but no longer needed.

## Fixes Implemented
1. **Updated Vite Config**: Changed the Nitro preset in `vite.config.ts` from `vercel` to `netlify` so that Nitro outputs the correct directory structure (`dist/` for static assets and `.netlify/functions-internal/` for serverless functions).
2. **Created `netlify.toml`**: Added the required configuration for Netlify deployment:
   ```toml
   [build]
     command = "npm run build"
     publish = "dist"
   ```
3. **Cleaned up Vercel Config**: Removed the unnecessary `vercel.json` file.

With these changes, Netlify should correctly build the TanStack Start app and automatically detect and serve the Nitro SSR functions, resolving the 404 errors during preview and deployment.
