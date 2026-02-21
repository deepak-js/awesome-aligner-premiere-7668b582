import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  Plus,
  Trash2,
  Edit,
  Loader2,
  FileText,
  ArrowLeft,
  Save,
  Eye,
  EyeOff,
  Calendar,
} from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  category: string | null;
  featured_image_url: string | null;
  author_name: string;
  author_role: string;
  is_published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

const emptyPost = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  category: "",
  featured_image_url: "",
  author_name: "Awesome Aligners Team",
  author_role: "Editorial",
  is_published: false,
};

const BlogManager = () => {
  const { toast } = useToast();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [view, setView] = useState<"list" | "edit">("list");
  const [editingPost, setEditingPost] = useState<Partial<BlogPost> | null>(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data, error } = await (supabase as any)
        .from("blog_posts")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error("Error fetching blog posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  };

  const handleCreate = () => {
    setEditingPost({ ...emptyPost });
    setView("edit");
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost({ ...post });
    setView("edit");
  };

  const handleSave = async () => {
    if (!editingPost?.title || !editingPost?.slug) {
      toast({ title: "Error", description: "Title and slug are required.", variant: "destructive" });
      return;
    }

    setSaving(true);
    try {
      if (editingPost.id) {
        // Update
        const { error } = await (supabase as any)
          .from("blog_posts")
          .update({
            title: editingPost.title,
            slug: editingPost.slug,
            excerpt: editingPost.excerpt,
            content: editingPost.content,
            category: editingPost.category,
            featured_image_url: editingPost.featured_image_url,
            author_name: editingPost.author_name,
            author_role: editingPost.author_role,
            is_published: editingPost.is_published,
            published_at: editingPost.is_published ? editingPost.published_at || new Date().toISOString() : null,
          })
          .eq("id", editingPost.id);

        if (error) throw error;
        toast({ title: "Post updated", description: "Blog post has been saved." });
      } else {
        // Create
        const { error } = await (supabase as any)
          .from("blog_posts")
          .insert({
            title: editingPost.title,
            slug: editingPost.slug,
            excerpt: editingPost.excerpt,
            content: editingPost.content,
            category: editingPost.category,
            featured_image_url: editingPost.featured_image_url,
            author_name: editingPost.author_name || "Awesome Aligners Team",
            author_role: editingPost.author_role || "Editorial",
            is_published: editingPost.is_published,
            published_at: editingPost.is_published ? new Date().toISOString() : null,
          });

        if (error) throw error;
        toast({ title: "Post created", description: "New blog post has been created." });
      }

      setView("list");
      setEditingPost(null);
      fetchPosts();
    } catch (error: any) {
      console.error("Error saving post:", error);
      toast({ title: "Error", description: error.message || "Failed to save post.", variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return;

    try {
      const { error } = await (supabase as any).from("blog_posts").delete().eq("id", id);
      if (error) throw error;
      toast({ title: "Post deleted" });
      fetchPosts();
    } catch (error) {
      toast({ title: "Error", description: "Failed to delete post.", variant: "destructive" });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (view === "edit" && editingPost) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => { setView("list"); setEditingPost(null); }}>
            <ArrowLeft className="h-4 w-4 mr-2" /> Back
          </Button>
          <h3 className="text-lg font-semibold">{editingPost.id ? "Edit Post" : "New Post"}</h3>
        </div>

        <div className="bg-card rounded-xl border border-border p-6 space-y-6">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label>Title</Label>
              <Input
                value={editingPost.title || ""}
                onChange={(e) => {
                  const title = e.target.value;
                  setEditingPost({
                    ...editingPost,
                    title,
                    slug: editingPost.id ? editingPost.slug : generateSlug(title),
                  });
                }}
                className="mt-1"
              />
            </div>
            <div>
              <Label>Slug</Label>
              <Input
                value={editingPost.slug || ""}
                onChange={(e) => setEditingPost({ ...editingPost, slug: e.target.value })}
                className="mt-1"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label>Category</Label>
              <Input
                value={editingPost.category || ""}
                onChange={(e) => setEditingPost({ ...editingPost, category: e.target.value })}
                placeholder="e.g. Treatment Options, Care Tips"
                className="mt-1"
              />
            </div>
            <div>
              <Label>Featured Image URL</Label>
              <Input
                value={editingPost.featured_image_url || ""}
                onChange={(e) => setEditingPost({ ...editingPost, featured_image_url: e.target.value })}
                placeholder="https://..."
                className="mt-1"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label>Author Name</Label>
              <Input
                value={editingPost.author_name || ""}
                onChange={(e) => setEditingPost({ ...editingPost, author_name: e.target.value })}
                className="mt-1"
              />
            </div>
            <div>
              <Label>Author Role</Label>
              <Input
                value={editingPost.author_role || ""}
                onChange={(e) => setEditingPost({ ...editingPost, author_role: e.target.value })}
                className="mt-1"
              />
            </div>
          </div>

          <div>
            <Label>Excerpt</Label>
            <Textarea
              value={editingPost.excerpt || ""}
              onChange={(e) => setEditingPost({ ...editingPost, excerpt: e.target.value })}
              placeholder="A short summary of the post..."
              className="mt-1"
              rows={2}
            />
          </div>

          <div>
            <Label>Content (Markdown supported)</Label>
            <Textarea
              value={editingPost.content || ""}
              onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
              placeholder="Write your blog post content here..."
              className="mt-1 font-mono text-sm"
              rows={16}
            />
          </div>

          <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/50">
            <div className="flex-1">
              <p className="font-medium text-sm">Publish Status</p>
              <p className="text-xs text-muted-foreground">
                {editingPost.is_published ? "This post is live and visible to everyone" : "This post is saved as a draft"}
              </p>
            </div>
            <Switch
              checked={editingPost.is_published ?? false}
              onCheckedChange={(checked) => setEditingPost({ ...editingPost, is_published: checked })}
            />
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => { setView("list"); setEditingPost(null); }}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={saving}>
            {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
            {editingPost.id ? "Update Post" : "Create Post"}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={handleCreate}>
          <Plus className="h-4 w-4 mr-2" /> New Blog Post
        </Button>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-16 bg-card rounded-xl border border-border">
          <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No blog posts yet</h3>
          <p className="text-muted-foreground mb-4">Create your first blog post to get started.</p>
          <Button onClick={handleCreate}>
            <Plus className="h-4 w-4 mr-2" /> Create First Post
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          {posts.map((post) => (
            <div key={post.id} className="p-4 rounded-xl bg-card border border-border flex items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold truncate">{post.title}</h3>
                  {post.is_published ? (
                    <Badge className="bg-emerald-500/20 text-emerald-600 flex-shrink-0">
                      <Eye className="h-3 w-3 mr-1" /> Published
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="flex-shrink-0">
                      <EyeOff className="h-3 w-3 mr-1" /> Draft
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  {post.category && <span>{post.category}</span>}
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {formatDate(post.created_at)}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={() => handleEdit(post)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(post.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogManager;
