

# Fix: Webhook Test Not Reaching n8n

## Problem
When you enter a webhook URL and click "Test", no request reaches n8n because:
- The Test button calls the `chat-webhook` edge function
- The edge function reads the webhook URL **from the database**
- But the URL hasn't been saved yet (it's only in the browser form state)
- So the edge function sees `webhook_url: null` and returns the fallback message without contacting n8n

## Solution
Update the Test flow so the webhook URL is sent directly to the edge function, bypassing the database lookup for testing purposes.

### 1. Update the `chat-webhook` edge function
- Accept an optional `webhook_url` parameter in the request body
- If provided, use it directly instead of reading from the database (for testing)
- If not provided, read from the database as usual (for normal chat)

### 2. Update the Test button in `ChatbotSettings.tsx`
- Pass the webhook URL from the form directly in the test request body
- This way testing works immediately without needing to save first

---

## Technical Details

### Edge Function Change (`supabase/functions/chat-webhook/index.ts`)
- Add `webhook_url` to the destructured request body
- If `webhook_url` is provided in the request, use it directly
- Otherwise, fall back to reading from `chatbot_settings` table (existing behavior)

### Frontend Change (`src/components/admin/ChatbotSettings.tsx`)
- In `handleTestWebhook`, include `webhook_url: settings.webhook_url` in the request body sent to the edge function

### Files Modified
- `supabase/functions/chat-webhook/index.ts`
- `src/components/admin/ChatbotSettings.tsx`
