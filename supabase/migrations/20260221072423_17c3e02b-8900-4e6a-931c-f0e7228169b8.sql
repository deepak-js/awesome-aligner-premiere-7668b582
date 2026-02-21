
-- Fix quiz_leads: restrict SELECT to admin only
DROP POLICY IF EXISTS "Authenticated users can view quiz leads" ON public.quiz_leads;
CREATE POLICY "Admins can view quiz leads"
ON public.quiz_leads FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

-- Fix doctor_applications: restrict SELECT to admin only
DROP POLICY IF EXISTS "Authenticated users can view doctor applications" ON public.doctor_applications;
CREATE POLICY "Admins can view doctor applications"
ON public.doctor_applications FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

-- Fix case_studies: replace overly permissive ALL policy with admin-only write policies
DROP POLICY IF EXISTS "Authenticated users can manage case studies" ON public.case_studies;
CREATE POLICY "Admins can insert case studies"
ON public.case_studies FOR INSERT
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update case studies"
ON public.case_studies FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete case studies"
ON public.case_studies FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));

-- Fix case-studies storage: restrict write operations to admin only
DROP POLICY IF EXISTS "Authenticated users can upload case study images" ON storage.objects;
CREATE POLICY "Admins can upload case study images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'case-studies' AND public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Authenticated users can update case study images" ON storage.objects;
CREATE POLICY "Admins can update case study images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'case-studies' AND public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Authenticated users can delete case study images" ON storage.objects;
CREATE POLICY "Admins can delete case study images"
ON storage.objects FOR DELETE
USING (bucket_id = 'case-studies' AND public.has_role(auth.uid(), 'admin'));
