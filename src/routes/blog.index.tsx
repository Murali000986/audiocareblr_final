import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { supabase } from "@/lib/supabase";
import { Calendar, Tag, ArrowRight, BookOpen } from "lucide-react";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Blog — AudioCare" },
      { name: "description", content: "Tips, guides, and news about audio equipment, speakers, home theater, and repair from AudioCare experts." },
    ],
  }),
  loader: async () => {
    const { data } = await supabase
      .from("blogs")
      .select("id, title, slug, excerpt, featured_image, tags, created_at")
      .eq("published", true)
      .order("created_at", { ascending: false });
    return { posts: data ?? [] };
  },
  component: BlogListPage,
});

function BlogListPage() {
  const { posts } = Route.useLoaderData() as any;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-widest bg-primary/10 px-4 py-2 rounded-full mb-4">
            <BookOpen className="w-3.5 h-3.5" /> Our Blog
          </span>
          <h1 className="font-display text-4xl lg:text-5xl font-bold mt-2">
            Audio <span className="text-primary">Insights</span>
          </h1>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
            Tips, guides, and expert advice on audio equipment, home theater setup, speaker repair, and more.
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-24">
            <BookOpen className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-muted-foreground">No posts yet</h2>
            <p className="text-sm text-muted-foreground mt-2">Check back soon — we're working on some great content!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post: any) => (
              <Link
                key={post.id}
                to="/blog/$slug"
                params={{ slug: post.slug }}
                className="group rounded-2xl border border-border bg-card overflow-hidden hover:shadow-card hover:-translate-y-1 transition-all"
              >
                {post.featured_image ? (
                  <div className="aspect-[16/9] overflow-hidden bg-section">
                    <img
                      src={post.featured_image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ) : (
                  <div className="aspect-[16/9] bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                    <BookOpen className="w-12 h-12 text-primary/30" />
                  </div>
                )}
                <div className="p-5">
                  {post.tags?.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {post.tags.slice(0, 3).map((tag: string) => (
                        <span key={tag} className="inline-flex items-center gap-1 text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                          <Tag className="w-2.5 h-2.5" /> {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  <h2 className="font-bold text-base line-clamp-2 group-hover:text-primary transition-colors">{post.title}</h2>
                  {post.excerpt && (
                    <p className="text-sm text-muted-foreground mt-2 line-clamp-3">{post.excerpt}</p>
                  )}
                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
                    <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(post.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                    </span>
                    <span className="flex items-center gap-1 text-xs font-semibold text-primary">
                      Read more <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
