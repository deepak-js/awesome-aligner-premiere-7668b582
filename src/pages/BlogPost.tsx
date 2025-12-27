import { useParams, Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Calendar, Clock, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';

const blogPostsData: Record<string, {
  title: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  content: string[];
  author: { name: string; role: string; avatar: string };
}> = {
  "clear-aligners-vs-braces": {
    title: "Clear Aligners vs. Traditional Braces: Which Is Right for You?",
    category: "Treatment Options",
    date: "December 20, 2024",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=1200&auto=format&fit=crop",
    author: {
      name: "Dr. Sarah Mitchell",
      role: "Lead Orthodontist",
      avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&auto=format&fit=crop",
    },
    content: [
      "Choosing between clear aligners and traditional braces is one of the most important decisions you'll make in your orthodontic journey. Both options have their advantages, and the right choice depends on your specific needs, lifestyle, and treatment goals.",
      "## Understanding Traditional Braces",
      "Traditional metal braces have been the gold standard in orthodontics for decades. They consist of metal brackets bonded to each tooth, connected by wires that gradually move teeth into position. Modern braces are smaller and more comfortable than ever before.",
      "**Advantages of Traditional Braces:**\n- Effective for complex cases and severe misalignment\n- No compliance required - they work 24/7\n- Often faster for complex movements\n- Lower upfront cost in some cases",
      "## The Clear Aligner Revolution",
      "Clear aligners represent a revolutionary approach to orthodontics. These custom-made, removable trays apply gentle pressure to shift teeth gradually. Each set of aligners is worn for about two weeks before moving to the next set in the series.",
      "**Advantages of Clear Aligners:**\n- Virtually invisible when worn\n- Removable for eating, drinking, and oral hygiene\n- More comfortable with no metal irritation\n- Fewer office visits required\n- Better for maintaining oral hygiene",
      "## Making Your Decision",
      "Consider clear aligners if you:\n- Have mild to moderate alignment issues\n- Value aesthetics and discretion\n- Can commit to wearing aligners 20-22 hours daily\n- Want the flexibility to remove them for special occasions",
      "Consider traditional braces if you:\n- Have complex orthodontic issues\n- Prefer a \"set it and forget it\" approach\n- Have concerns about compliance\n- Need significant bite correction",
      "## The Awesome Aligners Difference",
      "At Awesome Aligners, we combine the benefits of clear aligner technology with professional orthodontic oversight. Our aligners are crafted from premium materials that resist staining and provide superior comfort. Plus, our virtual monitoring ensures your treatment stays on track.",
      "Ready to find out which option is right for you? Take our free assessment quiz to get a personalized recommendation based on your unique smile goals.",
    ],
  },
  "caring-for-clear-aligners": {
    title: "The Complete Guide to Caring for Your Clear Aligners",
    category: "Care Tips",
    date: "December 15, 2024",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=1200&auto=format&fit=crop",
    author: {
      name: "Emily Chen",
      role: "Patient Care Specialist",
      avatar: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=100&auto=format&fit=crop",
    },
    content: [
      "Proper care of your clear aligners is essential for achieving the best results and maintaining your oral health throughout treatment. Follow these expert tips to keep your aligners clean, clear, and effective.",
      "## Daily Cleaning Routine",
      "Clean your aligners every time you remove them. Rinse them with lukewarm water (never hot, which can warp the plastic) and gently brush with a soft-bristled toothbrush. Avoid using toothpaste, as it can be abrasive and cause scratches where bacteria can hide.",
      "**Recommended cleaning products:**\n- Clear, unscented antibacterial soap\n- Specialized aligner cleaning crystals\n- Denture cleaning tablets (occasional deep clean)\n- Hydrogen peroxide solution (diluted)",
      "## Storage Best Practices",
      "Always store your aligners in their protective case when not in use. Never wrap them in a napkin or tissue - this is the #1 way aligners get accidentally thrown away! Keep a backup case with you at all times.",
      "## What to Avoid",
      "**Never do the following:**\n- Eat or drink anything besides water while wearing aligners\n- Use hot water to clean aligners\n- Leave aligners exposed to direct sunlight\n- Use colored or scented soaps\n- Chew gum while wearing aligners",
      "## Maintaining Fresh Breath",
      "To avoid bad breath while wearing aligners:\n- Brush and floss after every meal before reinserting aligners\n- Stay hydrated throughout the day\n- Use an alcohol-free mouthwash\n- Clean aligners thoroughly each time you remove them",
      "## When to Contact Support",
      "Reach out to our care team if:\n- Your aligners crack or break\n- Aligners cause persistent pain or discomfort\n- You lose a set of aligners\n- Aligners don't seem to fit properly\n- You notice any changes in your bite",
      "Following these care guidelines will help ensure your treatment progresses smoothly and you achieve the beautiful smile you deserve!",
    ],
  },
};

const defaultPost = {
  title: "Article Not Found",
  category: "Blog",
  date: "N/A",
  readTime: "N/A",
  image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=1200&auto=format&fit=crop",
  author: { name: "Awesome Aligners Team", role: "Editorial", avatar: "" },
  content: ["This article could not be found. Please check back later or explore our other articles."],
};

const BlogPost = () => {
  const { postId } = useParams<{ postId: string }>();
  const post = postId && blogPostsData[postId] ? blogPostsData[postId] : defaultPost;

  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Hero */}
      <section className="pt-32 pb-8 bg-gradient-to-b from-primary/5 to-background">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <Button variant="ghost" size="sm" className="mb-6" asChild>
            <Link to="/blog">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Link>
          </Button>
          <Badge variant="secondary" className="mb-4">{post.category}</Badge>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
            <div className="flex items-center gap-2">
              {post.author.avatar && (
                <img 
                  src={post.author.avatar} 
                  alt={post.author.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
              )}
              <div>
                <p className="font-medium text-foreground">{post.author.name}</p>
                <p className="text-sm">{post.author.role}</p>
              </div>
            </div>
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {post.date}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {post.readTime}
            </span>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="pb-8 bg-background">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <div className="aspect-video rounded-xl overflow-hidden">
            <img 
              src={post.image} 
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 bg-background">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-[1fr_250px] gap-12">
            {/* Article Content */}
            <article className="prose prose-slate dark:prose-invert max-w-none">
              {post.content.map((paragraph, index) => {
                if (paragraph.startsWith('## ')) {
                  return <h2 key={index}>{paragraph.replace('## ', '')}</h2>;
                }
                if (paragraph.startsWith('**') && paragraph.includes('\n')) {
                  const lines = paragraph.split('\n');
                  const title = lines[0].replace(/\*\*/g, '');
                  const items = lines.slice(1).map(l => l.replace('- ', ''));
                  return (
                    <div key={index}>
                      <p><strong>{title}</strong></p>
                      <ul>
                        {items.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  );
                }
                return <p key={index}>{paragraph}</p>;
              })}
            </article>

            {/* Sidebar */}
            <aside className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Share2 className="w-4 h-4" />
                    Share Article
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex gap-2">
                  <Button variant="outline" size="icon">
                    <Facebook className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Twitter className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Linkedin className="w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-primary text-primary-foreground">
                <CardHeader>
                  <CardTitle className="text-lg">Ready to Start?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-primary-foreground/80">
                    Take our free assessment to see if clear aligners are right for you.
                  </p>
                  <Button variant="secondary" className="w-full" asChild>
                    <Link to="/quiz">Take Free Quiz</Link>
                  </Button>
                </CardContent>
              </Card>
            </aside>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default BlogPost;
