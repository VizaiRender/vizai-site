import { Footer } from "@/components/ui/footer";
import { BlogIndex } from "@/components/ui/blog-index";
import { blogIndexJsonLd } from "@/components/pages/blog-post-page";
import { postsIn } from "@/lib/blog";
import type { Lang } from "@/lib/routes";

export function BlogIndexPage({ lang }: { lang: Lang }) {
  const jsonLd = blogIndexJsonLd(lang, postsIn(lang).map((p) => p.slug));
  return (
    <main className="flex flex-col min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="flex-1 max-w-5xl mx-auto px-6 pb-16 w-full" style={{ paddingTop: "180px" }}>
        <BlogIndex />
      </section>
      <Footer />
    </main>
  );
}
