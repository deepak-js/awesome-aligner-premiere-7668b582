-- Allow admins to update doctor applications (for status management)
CREATE POLICY "Admins can update doctor applications"
ON public.doctor_applications
FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

-- Allow admins to delete doctor applications
CREATE POLICY "Admins can delete doctor applications"
ON public.doctor_applications
FOR DELETE
USING (public.has_role(auth.uid(), 'admin'::app_role));