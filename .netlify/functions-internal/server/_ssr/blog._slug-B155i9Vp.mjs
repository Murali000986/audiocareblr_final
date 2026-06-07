import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { N as Navbar, F as Footer } from "./Footer-n3lcnv-q.mjs";
import { e as Route$4 } from "./router-DS6h6cMK.mjs";
import "../_libs/sonner.mjs";
import { A as ArrowLeft, x as Tag, _ as Calendar, M as MessageCircle } from "../_libs/lucide-react.mjs";
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
const WHATSAPP_NUMBER = "919876543210";
function BlogPostPage() {
  const {
    post
  } = Route$4.useLoaderData();
  const waMsg = encodeURIComponent(`Hi AudioCare! I read your blog post "${post.title}" and have a question.`);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "max-w-3xl mx-auto px-4 sm:px-6 py-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/blog", className: "inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
        " Back to Blog"
      ] }),
      post.tags?.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2 mb-4", children: post.tags.map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { className: "w-3 h-3" }),
        " ",
        tag
      ] }, tag)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl sm:text-4xl font-bold leading-tight", children: post.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-4 mt-4 text-sm text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-4 h-4" }),
        new Date(post.created_at).toLocaleDateString("en-IN", {
          day: "numeric",
          month: "long",
          year: "numeric"
        })
      ] }) }),
      post.featured_image && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 rounded-2xl overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: post.featured_image, alt: post.title, className: "w-full object-cover max-h-[480px]" }) }),
      post.excerpt && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-8 text-lg text-muted-foreground leading-relaxed font-medium border-l-4 border-primary pl-4", children: post.excerpt }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 prose prose-neutral dark:prose-invert max-w-none text-foreground\n            prose-headings:font-display prose-headings:font-bold\n            prose-p:text-muted-foreground prose-p:leading-relaxed\n            prose-a:text-primary prose-a:no-underline hover:prose-a:underline\n            prose-img:rounded-xl prose-img:shadow-card\n            prose-strong:text-foreground\n            prose-ul:text-muted-foreground prose-ol:text-muted-foreground", style: {
        whiteSpace: "pre-wrap"
      }, children: post.content }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-12 p-6 rounded-2xl bg-[#25D366]/10 border border-[#25D366]/30 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-lg", children: "Have questions? Chat with us!" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1 mb-4", children: "Our audio experts are happy to help you find the right product or book a repair." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: `https://wa.me/${WHATSAPP_NUMBER}?text=${waMsg}`, target: "_blank", rel: "noopener noreferrer", className: "inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#25D366] text-white font-bold hover:opacity-90 transition-opacity", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-5 h-5" }),
          " Chat on WhatsApp"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
export {
  BlogPostPage as component
};
