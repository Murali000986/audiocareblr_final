import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { supabase } from "@/lib/supabase";
import { Calendar, Tag, ArrowLeft, MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "919876543210";

export const Route = createFileRoute("/blog/$slug")({
  head: ({ loaderData }) => {
    const p = (loaderData as any)?.post;
    return {
      meta: [
        { title: `${p?.title ?? "Blog"} — AudioCare` },
        { name: "description", content: p?.excerpt ?? "Read the latest audio tips and guides from AudioCare." },
        { property: "og:title", content: `${p?.title ?? "Blog"} — AudioCare` },
        ...(p?.featured_image ? [{ property: "og:image", content: p.featured_image }] : []),
      ],
    };
  },
  loader: async ({ params }) => {
    const { data, error } = await supabase
      .from("blogs")
      .select("*")
      .eq("slug", params.slug)
      .eq("published", true)
      .single();

    if (error || !data) throw notFound();
    return { post: data };
  },
  notFoundComponent: () => (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 py-24 text-center">
        <h1 className="font-display text-4xl font-bold">Post Not Found</h1>
        <p className="text-muted-foreground mt-2">This blog post doesn't exist or has been removed.</p>
        <Link to="/blog" className="inline-block mt-6 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold">
          Back to Blog
        </Link>
      </main>
      <Footer />
    </div>
  ),
  component: BlogPostPage,
});

function BlogPostPage() {
  const { post } = Route.useLoaderData() as any;
  const waMsg = encodeURIComponent(`Hi AudioCare! I read your blog post "${post.title}" and have a question.`);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        {/* Back link */}
        <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" /> Back to Blog
        </Link>

        {/* Tags */}
        {post.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag: string) => (
              <span key={tag} className="inline-flex items-center gap-1 text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">
                <Tag className="w-3 h-3" /> {tag}
              </span>
            ))}
          </div>
        )}

        <h1 className="font-display text-3xl sm:text-4xl font-bold leading-tight">{post.title}</h1>

        <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            {new Date(post.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
          </span>
        </div>

        {/* Featured Image */}
        {post.featured_image && (
          <div className="mt-8 rounded-2xl overflow-hidden">
            <img
              src={post.featured_image}
              alt={post.title}
              className="w-full object-cover max-h-[480px]"
            />
          </div>
        )}

        {/* Excerpt */}
        {post.excerpt && (
          <p className="mt-8 text-lg text-muted-foreground leading-relaxed font-medium border-l-4 border-primary pl-4">
            {post.excerpt}
          </p>
        )}

        {/* Content */}
        <div
          className="mt-8 prose prose-neutral dark:prose-invert max-w-none text-foreground
            prose-headings:font-display prose-headings:font-bold
            prose-p:text-muted-foreground prose-p:leading-relaxed
            prose-a:text-primary prose-a:no-underline hover:prose-a:underline
            prose-img:rounded-xl prose-img:shadow-card
            prose-strong:text-foreground
            prose-ul:text-muted-foreground prose-ol:text-muted-foreground"
          style={{ whiteSpace: "pre-wrap" }}
        >
          {post.content}
        </div>

        {/* WhatsApp CTA */}
        <div className="mt-12 p-6 rounded-2xl bg-[#25D366]/10 border border-[#25D366]/30 text-center">
          <h3 className="font-bold text-lg">Have questions? Chat with us!</h3>
          <p className="text-sm text-muted-foreground mt-1 mb-4">
            Our audio experts are happy to help you find the right product or book a repair.
          </p>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${waMsg}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#25D366] text-white font-bold hover:opacity-90 transition-opacity"
          >
            <MessageCircle className="w-5 h-5" /> Chat on WhatsApp
          </a>
        </div>
      </main>
      <Footer />
    </div>
  );
}
