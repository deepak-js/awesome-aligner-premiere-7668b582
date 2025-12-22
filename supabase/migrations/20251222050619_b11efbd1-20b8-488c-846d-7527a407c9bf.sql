-- Create table for quiz leads (patient data capture)
CREATE TABLE public.quiz_leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  age_range TEXT,
  primary_concern TEXT,
  alignment_issues TEXT[],
  previous_treatment BOOLEAN DEFAULT false,
  treatment_timeline TEXT,
  budget_range TEXT,
  quiz_score INTEGER,
  recommendation TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for doctor partnership applications
CREATE TABLE public.doctor_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  clinic_name TEXT NOT NULL,
  clinic_address TEXT,
  city TEXT,
  state TEXT,
  years_experience INTEGER,
  specialty TEXT,
  current_aligner_brand TEXT,
  patients_per_month INTEGER,
  partnership_tier TEXT,
  message TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for case studies / gallery
CREATE TABLE public.case_studies (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  patient_age INTEGER,
  patient_gender TEXT,
  case_type TEXT NOT NULL,
  treatment_duration TEXT,
  description TEXT,
  before_image_url TEXT,
  after_image_url TEXT,
  doctor_name TEXT,
  clinic_name TEXT,
  testimonial TEXT,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.quiz_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.doctor_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.case_studies ENABLE ROW LEVEL SECURITY;

-- Quiz leads: Anyone can insert (public form), but only authenticated users can read
CREATE POLICY "Anyone can submit quiz leads" 
ON public.quiz_leads 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Authenticated users can view quiz leads" 
ON public.quiz_leads 
FOR SELECT 
USING (auth.role() = 'authenticated');

-- Doctor applications: Anyone can insert, authenticated can read
CREATE POLICY "Anyone can submit doctor applications" 
ON public.doctor_applications 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Authenticated users can view doctor applications" 
ON public.doctor_applications 
FOR SELECT 
USING (auth.role() = 'authenticated');

-- Case studies: Public read access (for gallery), authenticated can manage
CREATE POLICY "Anyone can view case studies" 
ON public.case_studies 
FOR SELECT 
USING (true);

CREATE POLICY "Authenticated users can manage case studies" 
ON public.case_studies 
FOR ALL 
USING (auth.role() = 'authenticated');

-- Insert sample case studies for the gallery
INSERT INTO public.case_studies (title, patient_age, patient_gender, case_type, treatment_duration, description, before_image_url, after_image_url, doctor_name, clinic_name, testimonial, featured) VALUES
('Crowding Correction', 28, 'Female', 'crowding', '8 months', 'Moderate crowding in upper and lower arches corrected with clear aligners.', 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=400', 'https://images.unsplash.com/photo-1581585635221-b0ea494d3f00?w=400', 'Dr. Sarah Chen', 'Smile Dental Clinic', 'I never thought my smile could look this good! The treatment was so comfortable.', true),
('Gap Closure', 35, 'Male', 'spacing', '6 months', 'Diastema and spacing issues resolved with precision aligners.', 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=400', 'https://images.unsplash.com/photo-1581585635221-b0ea494d3f00?w=400', 'Dr. Michael Park', 'Downtown Orthodontics', 'Finally confident to smile in photos!', true),
('Overbite Treatment', 24, 'Female', 'overbite', '12 months', 'Significant overbite corrected improving both aesthetics and function.', 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=400', 'https://images.unsplash.com/photo-1581585635221-b0ea494d3f00?w=400', 'Dr. Emily Rodriguez', 'Perfect Smile Center', 'My bite feels so much better now. Worth every moment!', false),
('Underbite Correction', 31, 'Male', 'underbite', '14 months', 'Mild to moderate underbite corrected with sequential aligner therapy.', 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=400', 'https://images.unsplash.com/photo-1581585635221-b0ea494d3f00?w=400', 'Dr. James Wilson', 'Elite Dental Care', 'The transformation is incredible. Thank you Awesome Aligners!', false),
('Crossbite Fix', 22, 'Female', 'crossbite', '10 months', 'Posterior crossbite corrected with customized aligner treatment plan.', 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=400', 'https://images.unsplash.com/photo-1581585635221-b0ea494d3f00?w=400', 'Dr. Lisa Thompson', 'Bright Smiles Dental', 'I can finally chew properly and my smile looks amazing!', true),
('Complex Case', 29, 'Male', 'complex', '18 months', 'Multiple alignment issues including crowding, rotation, and spacing addressed comprehensively.', 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=400', 'https://images.unsplash.com/photo-1581585635221-b0ea494d3f00?w=400', 'Dr. David Kim', 'Advanced Orthodontics', 'A complete transformation. Best decision I ever made for my dental health.', true);