-- Create storage bucket for case study images
INSERT INTO storage.buckets (id, name, public)
VALUES ('case-studies', 'case-studies', true);

-- Allow anyone to view case study images (public bucket)
CREATE POLICY "Public can view case study images"
ON storage.objects FOR SELECT
USING (bucket_id = 'case-studies');

-- Allow authenticated users to upload case study images
CREATE POLICY "Authenticated users can upload case study images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'case-studies' AND auth.role() = 'authenticated');

-- Allow authenticated users to update their uploads
CREATE POLICY "Authenticated users can update case study images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'case-studies' AND auth.role() = 'authenticated');

-- Allow authenticated users to delete case study images
CREATE POLICY "Authenticated users can delete case study images"
ON storage.objects FOR DELETE
USING (bucket_id = 'case-studies' AND auth.role() = 'authenticated');