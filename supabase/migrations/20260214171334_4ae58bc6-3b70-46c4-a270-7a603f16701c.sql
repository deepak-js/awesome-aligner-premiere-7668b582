
CREATE TABLE public.chatbot_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  webhook_url text,
  bot_name text DEFAULT 'Awesome Aligners',
  welcome_message text DEFAULT 'Hi! I''m here to help you with any questions about Awesome Aligners. How can I assist you today?',
  fallback_message text DEFAULT 'Thanks for your message! Our team will get back to you soon.',
  quick_replies jsonb DEFAULT '["What are the prices?", "How long is treatment?", "Book a consultation", "Talk to a human"]'::jsonb,
  is_active boolean DEFAULT true,
  updated_at timestamptz DEFAULT now()
);

INSERT INTO public.chatbot_settings (id) VALUES (gen_random_uuid());

ALTER TABLE public.chatbot_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read chatbot settings"
  ON public.chatbot_settings FOR SELECT
  TO authenticated, anon
  USING (true);

CREATE POLICY "Admins can update chatbot settings"
  ON public.chatbot_settings FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));
