import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot } from "lucide-react";

interface ChatMessage {
  id: string;
  sender: "user" | "bot";
  text: string;
}

export const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "initial",
      sender: "bot",
      text: "Hello! Welcome to FG-Store Retail. How can I help you style your day?",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: "user",
      text: input,
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const responses = [
        "That's a great question! Our support team will reach out to you with details.",
        "Yes, we offer free shipping on all orders over $100.",
        "You can find our return policy at the bottom of the page.",
        "Our latest collection just dropped! Have you checked out the home page?",
        "I'm just a simple bot, but I think you have excellent taste in fashion.",
      ];
      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        text: responses[Math.floor(Math.random() * responses.length)],
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 1500); // 1.5 second delay
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 lg:bottom-10 lg:right-10 z-[80] p-4 bg-primary-600 text-white rounded-full shadow-2xl shadow-primary-600/30 hover:bg-primary-700 transition-all hover:scale-110 active:scale-95 ${isOpen ? "scale-0 opacity-0 pointer-events-none" : "scale-100 opacity-100"}`}
        aria-label="Open support chat"
      >
        <MessageCircle className="w-7 h-7" />
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500"></span>
        </span>
      </button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-6 right-6 lg:bottom-10 lg:right-10 z-[90] w-[350px] max-w-[calc(100vw-3rem)] h-[500px] max-h-[calc(100vh-6rem)] bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-2xl flex flex-col transform transition-all duration-300 origin-bottom-right ${isOpen ? "scale-100 opacity-100" : "scale-75 opacity-0 pointer-events-none"}`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-100 dark:border-gray-800 bg-primary-600 text-white rounded-t-2xl">
          <div className="flex items-center gap-2">
            <Bot className="w-5 h-5 opacity-90" />
            <div>
              <h3 className="font-bold text-sm">FG-store Stylist</h3>
              <p className="text-xs text-primary-100 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-400 inline-block"></span>{" "}
                Online
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 hover:bg-primary-700 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-950">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col max-w-[85%] ${msg.sender === "user" ? "ml-auto items-end" : "mr-auto items-start"}`}
            >
              <div
                className={`py-2 px-4 rounded-2xl shadow-sm text-sm ${
                  msg.sender === "user"
                    ? "bg-primary-600 text-white rounded-br-sm"
                    : "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 border border-gray-100 dark:border-gray-700 rounded-bl-sm"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex items-start mr-auto">
              <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl rounded-bl-sm py-3 px-4 shadow-sm flex gap-1">
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 rounded-b-2xl">
          <form onSubmit={handleSend} className="flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about a product..."
              className="flex-1 py-3 px-4 bg-gray-100 dark:bg-gray-800 border-transparent focus:border-primary-500 focus:bg-white dark:focus:bg-gray-700 focus:ring-0 rounded-full text-sm text-gray-900 dark:text-white transition-all outline-none"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="p-3 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              <Send className="w-4 h-4 group-hover:scale-110 transition-transform" />
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
