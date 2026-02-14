import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MessageCircle, X, Send, Bot, User, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

interface ChatbotSettings {
  bot_name: string;
  welcome_message: string;
  fallback_message: string;
  quick_replies: string[];
  is_active: boolean;
}

const defaultSettings: ChatbotSettings = {
  bot_name: "Awesome Aligners",
  welcome_message: "Hi! 👋 I'm here to help you with any questions about Awesome Aligners. How can I assist you today?",
  fallback_message: "Thanks for your message! Our team will get back to you soon.",
  quick_replies: ["What are the prices?", "How long is treatment?", "Book a consultation", "Talk to a human"],
  is_active: true,
};

const LiveChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [settings, setSettings] = useState<ChatbotSettings>(defaultSettings);
  const [settingsLoaded, setSettingsLoaded] = useState(false);
  const sessionIdRef = useRef(`session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const { data, error } = await (supabase as any)
          .from("chatbot_settings")
          .select("bot_name, welcome_message, fallback_message, quick_replies, is_active")
          .limit(1)
          .single();

        if (!error && data) {
          setSettings({
            bot_name: data.bot_name || defaultSettings.bot_name,
            welcome_message: data.welcome_message || defaultSettings.welcome_message,
            fallback_message: data.fallback_message || defaultSettings.fallback_message,
            quick_replies: Array.isArray(data.quick_replies)
              ? data.quick_replies
              : JSON.parse(data.quick_replies || "[]"),
            is_active: data.is_active ?? true,
          });
        }
      } catch (e) {
        console.error("Failed to load chatbot settings:", e);
      } finally {
        setSettingsLoaded(true);
      }
    };
    fetchSettings();
  }, []);

  useEffect(() => {
    if (settingsLoaded && messages.length === 0) {
      setMessages([
        { id: 1, text: settings.welcome_message, isBot: true, timestamp: new Date() },
      ]);
    }
  }, [settingsLoaded]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = async (text: string) => {
    if (!text.trim() || isTyping) return;

    const userMessage: Message = {
      id: Date.now(),
      text,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    try {
      const response = await supabase.functions.invoke("chat-webhook", {
        body: { message: text, session_id: sessionIdRef.current },
      });

      const reply = response.data?.reply || settings.fallback_message;

      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, text: reply, isBot: true, timestamp: new Date() },
      ]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, text: settings.fallback_message, isBot: true, timestamp: new Date() },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  if (!settings.is_active) return null;

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full shadow-lg ${isOpen ? "hidden" : ""}`}
        size="icon"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>

      {isOpen && (
        <Card className="fixed bottom-6 right-6 z-50 w-[360px] max-w-[calc(100vw-48px)] shadow-2xl animate-scale-in">
          <CardHeader className="flex flex-row items-center justify-between bg-primary text-primary-foreground rounded-t-lg p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                <Bot className="h-5 w-5" />
              </div>
              <div>
                <CardTitle className="text-base">{settings.bot_name}</CardTitle>
                <p className="text-xs text-primary-foreground/70">Usually replies instantly</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="text-primary-foreground hover:bg-primary-foreground/10"
            >
              <X className="h-5 w-5" />
            </Button>
          </CardHeader>

          <CardContent className="p-0">
            <div className="h-80 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-start gap-2 ${message.isBot ? "" : "flex-row-reverse"}`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.isBot ? "bg-primary/10" : "bg-muted"
                  }`}>
                    {message.isBot ? (
                      <Bot className="h-4 w-4 text-primary" />
                    ) : (
                      <User className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                      message.isBot
                        ? "bg-muted text-foreground"
                        : "bg-primary text-primary-foreground"
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex items-start gap-2">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-primary/10">
                    <Bot className="h-4 w-4 text-primary" />
                  </div>
                  <div className="bg-muted rounded-2xl px-4 py-3">
                    <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="px-4 pb-2">
              <div className="flex flex-wrap gap-2">
                {settings.quick_replies.map((reply) => (
                  <button
                    key={reply}
                    onClick={() => handleSend(reply)}
                    disabled={isTyping}
                    className="text-xs px-3 py-1.5 rounded-full border border-border hover:bg-muted transition-colors disabled:opacity-50"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-4 border-t border-border">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend(inputValue);
                }}
                className="flex gap-2"
              >
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1"
                  disabled={isTyping}
                />
                <Button type="submit" size="icon" disabled={isTyping || !inputValue.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default LiveChat;
