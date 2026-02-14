
# Chatbot Webhook Integration + Admin Page Redesign

## Overview
Replace the current hardcoded chatbot with a webhook-powered system that forwards user messages to an external service (like n8n) and displays the response. Add a new "Chatbot Settings" tab in the Admin page to configure the webhook URL and manage chatbot settings.

## What Changes

### 1. New Database Table: `chatbot_settings`
Store webhook configuration in the database so the admin can update it without code changes.

- `id` (uuid, primary key)
- `webhook_url` (text) -- the n8n webhook URL to forward messages to
- `bot_name` (text, default "Awesome Aligners")
- `welcome_message` (text)
- `fallback_message` (text) -- shown when webhook fails or is not configured
- `quick_replies` (jsonb) -- array of quick reply strings
- `is_active` (boolean, default true) -- enable/disable chatbot
- `updated_at` (timestamp)

RLS: Only admins can read/update this table.

### 2. New Edge Function: `chat-webhook`
A backend function that acts as a proxy between the frontend chat and the n8n webhook.

**Why a proxy?** The webhook URL is stored in the database (not exposed to the frontend), and we can add rate limiting or logging later.

**Flow:**
1. Frontend sends user message to this edge function
2. Edge function reads the webhook URL from `chatbot_settings`
3. Forwards the message to n8n webhook (POST with JSON body containing `message`, `session_id`, `timestamp`)
4. Returns n8n's response back to the frontend
5. If webhook is not configured or fails, returns the fallback message

### 3. Update `LiveChat.tsx`
- On mount, fetch chatbot settings (welcome message, quick replies, bot name, is_active)
- When user sends a message, call the `chat-webhook` edge function instead of using the hardcoded `botResponses` object
- Show a typing indicator while waiting for webhook response
- Handle errors gracefully with fallback message
- If `is_active` is false, hide the chat widget entirely

### 4. New Admin Tab: "Chatbot Settings"
Add a fourth tab to the Admin page with these sections:

**Webhook Configuration**
- Webhook URL input field (with a "Test" button to verify connectivity)
- Status indicator showing if webhook is configured and reachable

**Chat Widget Settings**
- Bot name (text input)
- Welcome message (textarea)
- Fallback message (textarea)
- Quick replies editor (add/remove/reorder quick reply buttons)
- Enable/Disable toggle for the entire chat widget

**Chat Logs** (future-ready)
- Placeholder section mentioning that chat logs can be viewed in n8n

### 5. Update Admin Stats
Add a new stat card showing chatbot status (Active/Inactive) alongside the existing Quiz Leads, Doctor Applications, Hot Leads, and Premium Tier cards.

---

## Technical Details

### Database Migration
```sql
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

-- Insert default row
INSERT INTO public.chatbot_settings (id) VALUES (gen_random_uuid());

-- RLS
ALTER TABLE public.chatbot_settings ENABLE ROW LEVEL SECURITY;

-- Anyone can read (needed for frontend chat widget)
CREATE POLICY "Anyone can read chatbot settings"
  ON public.chatbot_settings FOR SELECT
  TO authenticated, anon
  USING (true);

-- Only admins can update
CREATE POLICY "Admins can update chatbot settings"
  ON public.chatbot_settings FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));
```

### Edge Function: `chat-webhook`
- Reads `chatbot_settings` to get webhook URL
- POSTs to n8n webhook with: `{ message, session_id, timestamp }`
- Expects n8n to return: `{ reply: "..." }`
- Falls back to `fallback_message` on any error

### n8n Integration Pattern
The admin pastes their n8n webhook URL into the admin panel. On n8n's side, the workflow would be:
1. **Webhook trigger** receives the message
2. **AI/Logic nodes** process the message (e.g., OpenAI, custom logic)
3. **Respond to Webhook** node returns `{ reply: "..." }`

### Files to Create
- `supabase/functions/chat-webhook/index.ts`

### Files to Modify
- `src/components/LiveChat.tsx` -- webhook integration + dynamic settings
- `src/pages/Admin.tsx` -- new "Chatbot" tab with settings form
- `supabase/config.toml` -- add chat-webhook function config

### Component Structure for Admin Chatbot Tab
- `src/components/admin/ChatbotSettings.tsx` -- extracted component for the chatbot settings form (keeps Admin.tsx cleaner)
