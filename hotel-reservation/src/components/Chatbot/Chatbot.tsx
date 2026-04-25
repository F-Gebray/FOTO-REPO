import { useState } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';
import { Button } from '../ui/Button';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{id: number, text: string, sender: 'bot' | 'user'}[]>([
    { id: 1, text: "Hi there! I'm your StayScout assistant. How can I help you today?", sender: 'bot' }
  ]);
  const [inputValue, setInputValue] = useState('');

  const autoReplies: Record<string, string> = {
    "cancellation": "Our cancellation policy allows free cancellation up to 48 hours before check-in for most bookings.",
    "payment": "We accept all major credit cards and PayPal. Payment is secure and encrypted.",
    "support": "You can reach our human support team at support@stayscout.com.",
    "default": "Thanks for your message! Since I'm a demo bot, I might not understand everything, but I'll make sure our team gets this."
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;
    
    const userMsg = { id: Date.now(), text: inputValue, sender: 'user' as const };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');

    setTimeout(() => {
      let replyText = autoReplies.default;
      const lowerInput = userMsg.text.toLowerCase();
      if (lowerInput.includes('cancel')) replyText = autoReplies.cancellation;
      else if (lowerInput.includes('pay')) replyText = autoReplies.payment;
      else if (lowerInput.includes('help') || lowerInput.includes('support')) replyText = autoReplies.support;

      setMessages(prev => [...prev, { id: Date.now(), text: replyText, sender: 'bot' }]);
    }, 1000);
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 h-14 w-14 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 z-50 ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
      >
        <MessageSquare className="h-6 w-6" />
      </button>

      <div className={`fixed bottom-6 right-6 w-80 sm:w-96 bg-background rounded-2xl shadow-2xl border border-border flex flex-col overflow-hidden transition-all duration-300 origin-bottom-right z-50 ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'}`}>
        <div className="bg-primary p-4 flex justify-between items-center text-primary-foreground">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            <span className="font-semibold">StayScout Assistant</span>
          </div>
          <button onClick={() => setIsOpen(false)} className="hover:bg-primary/20 p-1 rounded-full transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="flex-1 p-4 h-80 overflow-y-auto flex flex-col gap-3 bg-muted/20">
          {messages.map(m => (
            <div key={m.id} className={`max-w-[80%] p-3 rounded-2xl text-sm ${m.sender === 'user' ? 'bg-primary text-primary-foreground self-end rounded-br-none' : 'bg-background border border-border text-foreground self-start rounded-bl-none'}`}>
              {m.text}
            </div>
          ))}
        </div>

        <div className="p-3 border-t border-border bg-background flex gap-2">
          <input 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your message..."
            className="flex-1 px-3 py-2 border border-input rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          <Button onClick={handleSend} size="icon" className="rounded-xl shrink-0">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </>
  );
}
