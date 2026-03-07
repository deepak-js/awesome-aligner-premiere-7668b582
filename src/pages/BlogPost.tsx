import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SEOHead from '@/components/SEOHead';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Calendar, Clock, Share2, Facebook, Twitter, Linkedin, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface BlogPostData {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  category: string | null;
  featured_image_url: string | null;
  author_name: string;
  author_role: string;
  published_at: string | null;
  created_at: string;
}

// Fallback hardcoded posts
const fallbackPosts: Record<string, BlogPostData> = {
  "clear-aligners-vs-braces": {
    id: "1", title: "Clear Aligners vs. Traditional Braces: Which Is Right for You?", slug: "clear-aligners-vs-braces",
    excerpt: "Discover the key differences.", category: "Treatment Options",
    featured_image_url: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=1200&auto=format&fit=crop",
    author_name: "Dr. Sarah Mitchell", author_role: "Lead Orthodontist",
    published_at: "2025-12-20T00:00:00Z", created_at: "2025-12-20T00:00:00Z",
    content: "Choosing between clear aligners and traditional braces is one of the most important decisions in your orthodontic journey. Both options have their advantages, and the right choice depends on your needs, lifestyle, and treatment goals.\n\n## Understanding Traditional Braces\n\nTraditional metal braces have been the gold standard in orthodontics for decades. They consist of metal brackets bonded to each tooth, connected by wires that gradually move teeth into position.\n\n## The Clear Aligner Revolution\n\nClear aligners represent a modern approach to orthodontics. These custom-made, removable trays apply gentle pressure to shift teeth gradually. Each set is worn for about two weeks.\n\n## The Awesome Aligners Difference\n\nAt Awesome Aligners, we combine clear aligner technology with professional orthodontic oversight. Our aligners are crafted from premium materials that resist staining and provide superior comfort.",
  },
  "caring-for-clear-aligners": {
    id: "2", title: "The Complete Guide to Caring for Your Clear Aligners", slug: "caring-for-clear-aligners",
    excerpt: "Essential tips for keeping your aligners clean.", category: "Care Tips",
    featured_image_url: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=1200&auto=format&fit=crop",
    author_name: "Emily Chen", author_role: "Patient Care Specialist",
    published_at: "2025-12-15T00:00:00Z", created_at: "2025-12-15T00:00:00Z",
    content: "Proper care of your clear aligners is essential for achieving the best results. Follow these tips to keep your aligners clean, clear, and effective.\n\n## Daily Cleaning Routine\n\nClean your aligners every time you remove them. Rinse with lukewarm water and gently brush with a soft-bristled toothbrush. Avoid toothpaste, as it can scratch the surface.\n\n## Storage Best Practices\n\nAlways store your aligners in their protective case when not in use. Never wrap them in a napkin. Keep a backup case with you at all times.\n\n## When to Contact Support\n\nReach out if your aligners crack, cause persistent pain, or don't fit properly.",
  },
};

const BlogPost = () => {
  const { postId } = useParams<{ postId: string }>();
  const [post, setPost] = useState<BlogPostData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      if (!postId) { setLoading(false); return; }
      try {
        const { data, error } = await (supabase as any)
          .from("blog_posts")
          .select("*")
          .eq("slug", postId)
          .eq("is_published", true)
          .maybeSingle();

        if (error) throw error;
        setPost(data || fallbackPosts[postId] || null);
      } catch {
        setPost(fallbackPosts[postId] || null);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [postId]);

  const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });

  if (loading) {
    return (
      <main className="min-h-screen"><Header />
        <div className="pt-32 pb-20 flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>
        <Footer />
      </main>
    );
  }

  if (!post) {
    return (
      <main className="min-h-screen"><Header />
        <div className="pt-32 pb-20 text-center"><h1 className="text-3xl font-bold text-foreground mb-4">Article Not Found</h1><p className="text-muted-foreground mb-6">This article could not be found.</p><Button asChild><Link to="/blog"><ArrowLeft className="w-4 h-4 mr-2" />Back to Blog</Link></Button></div>
        <Footer />
      </main>
    );
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "author": { "@type": "Person", "name": post.author_name },
    "datePublished": post.published_at || post.created_at,
    "publisher": { "@type": "Organization", "name": "Awesome Aligners" },
    ...(post.featured_image_url ? { "image": post.featured_image_url } : {}),
  };

  const renderContent = (content: string) => {
    return content.split("\n\n").map((block, i) => {
      if (block.startsWith("## ")) return <h2 key={i} className="text-2xl font-bold mt-8 mb-4">{block.replace("## ", "")}</h2>;
      return <p key={i} className="text-muted-foreground leading-relaxed mb-4">{block}</p>;
    });
  };

  return (
    <main className="min-h-screen">
      <SEOHead title={`${post.title} | Awesome Aligners Blog`} description={post.excerpt || post.title} canonical={`https://awesomealigners.in/blog/${post.slug}`} ogImage={post.featured_image_url || "https://awesomealigners.in/og-image.jpg"} ogType="article" structuredData={structuredData} />
      <Header />

      <section className="pt-32 pb-8 bg-gradient-to-b from-primary/5 to-background">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <Button variant="ghost" size="sm" className="mb-6" asChild><Link to="/blog"><ArrowLeft className="w-4 h-4 mr-2" />Back to Blog</Link></Button>
          {post.category && <Badge variant="secondary" className="mb-4">{post.category}</Badge>}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">{post.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
            <div><p className="font-medium text-foreground">{post.author_name}</p><p className="text-sm">{post.author_role}</p></div>
            <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />{formatDate(post.published_at || post.created_at)}</span>
          </div>
        </div>
      </section>

      {post.featured_image_url && (
        <section className="pb-8 bg-background">
          <div className="max-w-5xl mx-auto px-4 md:px-8">
            <div className="aspect-video rounded-xl overflow-hidden"><img src={post.featured_image_url} alt={post.title} className="w-full h-full object-cover" /></div>
          </div>
        </section>
      )}

      <section className="py-12 bg-background">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-[1fr_250px] gap-12">
            <article className="prose prose-slate dark:prose-invert max-w-none">
              {post.content ? renderContent(post.content) : <p className="text-muted-foreground">Content coming soon.</p>}
            </article>
            <aside className="space-y-6">
              <Card><CardHeader><CardTitle className="text-lg flex items-center gap-2"><Share2 className="w-4 h-4" />Share</CardTitle></CardHeader><CardContent className="flex gap-2"><Button variant="outline" size="icon"><Facebook className="w-4 h-4" /></Button><Button variant="outline" size="icon"><Twitter className="w-4 h-4" /></Button><Button variant="outline" size="icon"><Linkedin className="w-4 h-4" /></Button></CardContent></Card>
              <Card className="bg-primary text-primary-foreground"><CardHeader><CardTitle className="text-lg">Ready to Start?</CardTitle></CardHeader><CardContent className="space-y-4"><p className="text-sm text-primary-foreground/80">Take our free assessment to see if clear aligners are right for you.</p><Button variant="secondary" className="w-full" asChild><Link to="/contact">Book Free Consultation</Link></Button></CardContent></Card>
            </aside>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default BlogPost;
