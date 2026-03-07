import { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SEOHead from '@/components/SEOHead';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import BlogCardSkeleton from '@/components/skeletons/BlogCardSkeleton';
import { supabase } from '@/integrations/supabase/client';
import heroGradientBg from '@/assets/hero-gradient-bg.jpeg';
import { useToast } from '@/hooks/use-toast';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  category: string | null;
  featured_image_url: string | null;
  author_name: string;
  published_at: string | null;
  created_at: string;
}

// Fallback hardcoded posts (used if DB is empty)
const fallbackPosts: BlogPost[] = [
  { id: "clear-aligners-vs-braces", title: "Clear Aligners vs. Traditional Braces: Which Is Right for You?", slug: "clear-aligners-vs-braces", excerpt: "Discover the key differences between clear aligners and metal braces to make an informed decision about your orthodontic treatment.", category: "Treatment Options", featured_image_url: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800&auto=format&fit=crop", author_name: "Awesome Aligners Team", published_at: "2025-12-20T00:00:00Z", created_at: "2025-12-20T00:00:00Z" },
  { id: "caring-for-clear-aligners", title: "The Complete Guide to Caring for Your Clear Aligners", slug: "caring-for-clear-aligners", excerpt: "Learn essential tips for keeping your aligners clean, clear, and effective throughout your treatment.", category: "Care Tips", featured_image_url: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=800&auto=format&fit=crop", author_name: "Awesome Aligners Team", published_at: "2025-12-15T00:00:00Z", created_at: "2025-12-15T00:00:00Z" },
  { id: "foods-to-avoid", title: "Foods and Drinks to Avoid While Wearing Clear Aligners", slug: "foods-to-avoid", excerpt: "Protect your aligners and maintain your oral health by knowing which foods and beverages can cause damage.", category: "Care Tips", featured_image_url: "https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=800&auto=format&fit=crop", author_name: "Awesome Aligners Team", published_at: "2025-12-10T00:00:00Z", created_at: "2025-12-10T00:00:00Z" },
  { id: "smile-confidence-study", title: "How Your Smile Affects Confidence: What Research Shows", slug: "smile-confidence-study", excerpt: "Explore the science behind the connection between a great smile and improved self-esteem.", category: "Lifestyle", featured_image_url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&auto=format&fit=crop", author_name: "Awesome Aligners Team", published_at: "2026-01-05T00:00:00Z", created_at: "2026-01-05T00:00:00Z" },
  { id: "treatment-timeline", title: "What to Expect: Your Clear Aligner Treatment Timeline", slug: "treatment-timeline", excerpt: "A month-by-month breakdown of what happens during your clear aligner journey.", category: "Treatment Options", featured_image_url: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&auto=format&fit=crop", author_name: "Awesome Aligners Team", published_at: "2026-01-12T00:00:00Z", created_at: "2026-01-12T00:00:00Z" },
  { id: "adult-orthodontics", title: "Never Too Late: Adult Orthodontics on the Rise", slug: "adult-orthodontics", excerpt: "Why more adults than ever are choosing clear aligners and what makes modern treatment ideal for busy professionals.", category: "Lifestyle", featured_image_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop", author_name: "Awesome Aligners Team", published_at: "2026-01-18T00:00:00Z", created_at: "2026-01-18T00:00:00Z" },
];

const NewsletterForm = () => {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitting(true);
    try {
      await (supabase as any).from("contact_submissions").insert({
        name: "Newsletter Subscriber",
        email: email.trim(),
        subject: "Newsletter Subscription",
        message: "Subscribed to blog newsletter.",
      });
      toast({ title: "Subscribed!", description: "You'll receive our latest articles and offers." });
      setEmail("");
    } catch {
      toast({ title: "Something went wrong", description: "Please try again.", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
      <input
        type="email"
        required
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="flex-1 px-4 py-3 rounded-md bg-primary-foreground text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary-foreground/50"
      />
      <Button size="lg" variant="secondary" type="submit" disabled={submitting}>
        {submitting ? "Subscribing..." : "Subscribe"}
      </Button>
    </form>
  );
};

const Blog = () => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data, error } = await (supabase as any)
          .from("blog_posts")
          .select("id, title, slug, excerpt, category, featured_image_url, author_name, published_at, created_at")
          .eq("is_published", true)
          .order("published_at", { ascending: false });

        if (error) throw error;
        setPosts(data && data.length > 0 ? data : fallbackPosts);
      } catch {
        setPosts(fallbackPosts);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });

  return (
    <main className="min-h-screen">
      <SEOHead
        title="Blog | Clear Aligner Tips & Insights | Awesome Aligners"
        description="Read expert advice, treatment insights, and tips about clear aligners. Stay informed about the latest in orthodontic care."
        canonical="https://awesomealigners.in/blog"
        ogImage="https://awesomealigners.in/og-image.jpg"
      />
      <Header />

      <section className="relative pt-32 pb-16 overflow-hidden" style={{ backgroundImage: `url(${heroGradientBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 text-center">
          <Badge variant="secondary" className="mb-4 bg-white/10 text-white border-white/20">Resources & Insights</Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">Smile Blog</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">Expert advice, treatment insights, and tips to help you achieve and maintain your perfect smile.</p>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h2 className="text-2xl font-bold text-foreground mb-8">Latest Articles</h2>
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">{[1, 2, 3, 4, 5, 6].map((i) => <BlogCardSkeleton key={i} />)}</div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <Card key={post.id} className="overflow-hidden group hover:shadow-lg transition-shadow">
                  {post.featured_image_url && (
                    <div className="aspect-video overflow-hidden">
                      <img src={post.featured_image_url} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    </div>
                  )}
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2 mb-2">
                      {post.category && <Badge variant="outline" className="text-xs">{post.category}</Badge>}
                    </div>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors line-clamp-2">
                      <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <div className="flex items-center justify-between w-full text-sm text-muted-foreground">
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{formatDate(post.published_at || post.created_at)}</span>
                      <Button variant="ghost" size="sm" asChild><Link to={`/blog/${post.slug}`}>Read More <ArrowRight className="w-4 h-4 ml-1" /></Link></Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-20 bg-primary">
        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">Stay Informed</h2>
          <p className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto">Subscribe to our newsletter for the latest tips, trends, and exclusive offers.</p>
          <NewsletterForm />
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Blog;
