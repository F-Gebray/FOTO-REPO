import { useEffect, useRef, useState } from "react";
import { MessageSquare, X, Send } from "lucide-react";
import { Button } from "../ui/Button";

type Message = {
  id: number;
  text: string;
  sender: "bot" | "user";
  showSupport?: boolean;
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi 👋 I'm your StayComfort assistant. Ask me about bookings, payments, or cancellations.",
      sender: "bot",
    },
  ]);

  // 🔍 Simple escalation logic
  const needsSupport = (text: string) => {
    const t = text.toLowerCase();
    return (
      t.includes("human") ||
      t.includes("agent") ||
      t.includes("complaint") ||
      t.includes("refund") ||
      t.includes("not working") ||
      t.includes("problem")
    );
  };

  // 🤖 Simple AI-style responses (no backend)
  const getAIReply = (text: string) => {
    const t = text.toLowerCase();

    if (t.includes("cancel")) {
      return "You can cancel most bookings free of charge up to 48 hours before check-in.";
    }

    if (t.includes("pay")) {
      return "We accept Visa, Mastercard, Amex, and PayPal. Payments are secure and encrypted.";
    }

    if (t.includes("book")) {
      return "You can search hotels, choose dates, and book instantly with confirmation.";
    }

    return "I can help with bookings, payments, and cancellations. If you need more help, you can contact support below.";
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMsg: Message = {
      id: Date.now(),
      text: inputValue,
      sender: "user",
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      // 🚨 SUPPORT ESCALATION
      if (needsSupport(userMsg.text)) {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 1,
            text: "I understand your issue. You can contact our support team below:",
            sender: "bot",
            showSupport: true,
          },
        ]);
        setIsTyping(false);
        return;
      }

      // 🤖 NORMAL AI RESPONSE
      const reply = getAIReply(userMsg.text);

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: reply,
          sender: "bot",
        },
      ]);

      setIsTyping(false);
    }, 800);
  };

  // auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 h-14 w-14 bg-primary text-white rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-all z-50 ${
          isOpen ? "hidden" : "flex"
        }`}
      >
        <MessageSquare className="h-6 w-6" />
      </button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-6 right-6 w-80 sm:w-96 bg-background rounded-2xl shadow-2xl border border-border flex flex-col overflow-hidden transition-all duration-300 z-50 ${
          isOpen
            ? "opacity-100 scale-100"
            : "opacity-0 scale-0 pointer-events-none"
        }`}
      >
        {/* Header */}
        <div className="bg-primary p-4 flex justify-between items-center text-white">
          <span className="font-semibold">StayComfort Assistant</span>

          <button
            onClick={() => setIsOpen(false)}
            className="hover:bg-white/20 p-1 rounded-full"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 h-80 overflow-y-auto flex flex-col gap-3 bg-muted/20">
          {messages.map((m) => (
            <div key={m.id} className="flex flex-col gap-2">
              <div
                className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm ${
                  m.sender === "user"
                    ? "bg-primary text-white self-end rounded-br-none"
                    : "bg-background border border-border self-start rounded-bl-none"
                }`}
              >
                {m.text}
              </div>

              {/* 💬 Support buttons */}
              {m.showSupport && (
                <div className="flex flex-col gap-2 ml-2">
                  <button className="text-sm px-3 py-2 rounded-xl border border-border hover:bg-muted transition">
                    💬 Live Chat Support
                  </button>
                  <button className="text-sm px-3 py-2 rounded-xl border border-border hover:bg-muted transition">
                    📧 Email: support@stayscout.com
                  </button>
                  <a
                    href="tel:+1800123456"
                    className="text-sm px-3 py-2 rounded-xl border border-border hover:bg-muted transition text-center"
                  >
                    📞 Call Support
                  </a>
                </div>
              )}
            </div>
          ))}

          {/* typing */}
          {isTyping && (
            <div className="text-xs text-muted-foreground">
              Assistant is typing...
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="p-3 border-t border-border flex gap-2">
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask about bookings, payments..."
            className="flex-1 px-3 py-2 border border-input rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          />

          <Button onClick={handleSend} size="icon" className="rounded-xl">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </>
  );
}
