'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, User, Flame, MessageCircle } from 'lucide-react';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: '🔥 Hi! I am CodeWithGandhi AI Assistant. Ask me about membership fees, class timetables, trainers, or free trial passes!',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const quickChips = [
    'Plans & Fees',
    'Timings',
    'Free Trial',
    'Trainers',
    'Locations',
    'Talk to Human',
  ];

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    if (query === 'Talk to Human') {
      window.open(
        `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919876543210'}?text=Hi!%20I%20want%20to%20speak%20with%20a%20human%20gym%20advisor.`,
        '_blank'
      );
      return;
    }

    const newMessages: ChatMessage[] = [...messages, { role: 'user', content: query }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });
      const data = await res.json();
      if (data.content) {
        setMessages([...newMessages, { role: 'assistant', content: data.content }]);
      }
    } catch (e) {
      setMessages([
        ...newMessages,
        { role: 'assistant', content: 'Apologies, I encountered an issue. Please connect with our team on WhatsApp.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Trigger Button */}
      {!isOpen && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-[#FF4B1F] to-[#FF8000] text-white flex items-center justify-center shadow-[0_0_25px_rgba(255,75,31,0.6)] hover:scale-110 transition-transform group"
          aria-label="Open AI Assistant"
        >
          <Bot className="w-7 h-7 text-black group-hover:rotate-12 transition-transform" />
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-400 border-2 border-black animate-ping" />
        </motion.button>
      )}

      {/* Chat Window Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="w-[360px] sm:w-[400px] h-[520px] bg-[#120B08] border border-white/20 rounded-3xl shadow-2xl flex flex-col overflow-hidden backdrop-blur-2xl"
          >
            {/* Header */}
            <div className="p-4 bg-[#1F130E] border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#FF4B1F] to-[#FF9F45] flex items-center justify-center shadow-[0_0_10px_#FF4B1F]">
                  <Flame className="w-5 h-5 text-black fill-black" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm text-white flex items-center gap-1">
                    CodeWithGandhi AI <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#FF4B1F]/20 text-[#FF4B1F]">LIVE</span>
                  </h4>
                  <span className="text-[10px] text-stone-400 font-mono">Instant Gym Concierge</span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-stone-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Chips Bar */}
            <div className="px-3 py-2 bg-black/40 border-b border-white/5 flex gap-1.5 overflow-x-auto scrollbar-none">
              {quickChips.map((chip) => (
                <button
                  key={chip}
                  onClick={() => handleSend(chip)}
                  className="px-2.5 py-1 rounded-full bg-white/5 hover:bg-[#FF4B1F]/20 border border-white/10 hover:border-[#FF4B1F] text-[11px] text-stone-300 hover:text-white whitespace-nowrap transition-colors"
                >
                  {chip}
                </button>
              ))}
            </div>

            {/* Message Area */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 font-sans text-xs">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex items-start gap-2 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {m.role === 'assistant' && (
                    <div className="w-7 h-7 rounded-full bg-[#FF4B1F]/20 border border-[#FF4B1F]/40 flex items-center justify-center shrink-0">
                      <Bot className="w-4 h-4 text-[#FF4B1F]" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl whitespace-pre-line leading-relaxed ${m.role === 'user'
                        ? 'bg-[#FF4B1F] text-white font-medium rounded-tr-none shadow-md'
                        : 'bg-white/5 border border-white/10 text-stone-200 rounded-tl-none'
                      }`}
                  >
                    {m.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex items-center gap-2 text-stone-400 text-xs">
                  <Bot className="w-4 h-4 animate-spin text-[#FF4B1F]" />
                  <span>CodeWithGandhi AI is thinking...</span>
                </div>
              )}
            </div>

            {/* Input Bar */}
            <div className="p-3 bg-[#1F130E] border-t border-white/10 flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about plans, timing, trial..."
                className="flex-1 bg-black/50 border border-white/10 rounded-full px-4 py-2 text-xs text-white placeholder-stone-500 outline-none focus:border-[#FF4B1F]"
              />
              <button
                onClick={() => handleSend()}
                className="p-2.5 rounded-full bg-[#FF4B1F] text-white hover:bg-[#FF8000] transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
