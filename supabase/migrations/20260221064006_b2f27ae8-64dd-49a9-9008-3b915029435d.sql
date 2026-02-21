
-- 1. contact_submissions table
CREATE TABLE public.contact_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit contact forms"
ON public.contact_submissions
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Admins can view contact submissions"
ON public.contact_submissions
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- 2. blog_posts table
CREATE TABLE public.blog_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT,
  category TEXT,
  featured_image_url TEXT,
  author_name TEXT NOT NULL DEFAULT 'Awesome Aligners Team',
  author_role TEXT NOT NULL DEFAULT 'Editorial',
  is_published BOOLEAN NOT NULL DEFAULT false,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published blog posts"
ON public.blog_posts
FOR SELECT
USING (is_published = true);

CREATE POLICY "Admins can view all blog posts"
ON public.blog_posts
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert blog posts"
ON public.blog_posts
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update blog posts"
ON public.blog_posts
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete blog posts"
ON public.blog_posts
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_blog_posts_updated_at
BEFORE UPDATE ON public.blog_posts
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- 3. seo_settings table (single row)
CREATE TABLE public.seo_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  google_analytics_id TEXT,
  search_console_code TEXT,
  facebook_pixel_id TEXT,
  custom_head_scripts TEXT,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.seo_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read SEO settings"
ON public.seo_settings
FOR SELECT
USING (true);

CREATE POLICY "Admins can update SEO settings"
ON public.seo_settings
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert SEO settings"
ON public.seo_settings
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Trigger for seo_settings updated_at
CREATE TRIGGER update_seo_settings_updated_at
BEFORE UPDATE ON public.seo_settings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Seed a default row for seo_settings
INSERT INTO public.seo_settings (google_analytics_id, search_console_code, facebook_pixel_id, custom_head_scripts)
VALUES (null, null, null, null);
