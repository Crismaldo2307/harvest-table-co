'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import demoData from '@/data/demo-data.json';

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};

function createId() {
  return Math.random().toString(36).slice(2, 9);
}

export function ChatAgent() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const greeting = useMemo(() => {
    const options = demoData.greetings;
    return options[Math.floor(Math.random() * options.length)];
  }, []);

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{ id: createId(), role: 'assistant', content: greeting }]);
    }
  }, [greeting, messages.length]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  async function handleSend(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { id: createId(), role: 'user', content: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/agent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: [...messages, userMessage].map(({ role, content }) => ({ role, content })) }),
      });

      if (response.ok) {
        const data = (await response.json()) as { reply: string };
        setMessages((prev) => [...prev, { id: createId(), role: 'assistant', content: data.reply }]);
      } else {
        throw new Error('Agent unavailable');
      }
    } catch (error) {
      console.error(error);
      const fallback = buildFallbackResponse(userMessage.content);
      setMessages((prev) => [...prev, { id: createId(), role: 'assistant', content: fallback }]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2 rounded-full bg-brand-green px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-brand-gold"
      >
        <span>Virtual Sales Agent</span>
        <motion.span animate={{ rotate: isOpen ? 180 : 0 }}>
          <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
          </svg>
        </motion.span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className="mt-3 w-80 overflow-hidden rounded-3xl border border-brand-gold/30 bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between bg-brand-green px-4 py-3 text-white">
              <div>
                <p className="text-sm font-semibold">Harvest Table Co.</p>
                <p className="text-xs text-white/80">AI Sales Agent Demo</p>
              </div>
              <span className="inline-flex h-2 w-2 rounded-full bg-emerald-300" aria-hidden />
            </div>
            <div className="flex max-h-80 flex-col gap-3 overflow-y-auto bg-brand-cream px-4 py-4 text-sm text-brand-dark">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'assistant' ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`rounded-2xl px-4 py-2 shadow ${
                      message.role === 'assistant'
                        ? 'bg-white text-brand-dark'
                        : 'bg-brand-green text-white'
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="rounded-2xl bg-white px-4 py-2 text-brand-dark shadow">Thinking…</div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            <form onSubmit={handleSend} className="border-t border-brand-gold/20 bg-white p-3">
              <div className="flex items-center gap-2">
                <input
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder="Ask about pricing or menus"
                  className="flex-1 rounded-full border border-brand-gold/30 px-4 py-2 text-sm focus:border-brand-gold focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="rounded-full bg-brand-green px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-brand-gold disabled:cursor-not-allowed disabled:bg-brand-green/70"
                >
                  Send
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function buildFallbackResponse(userInput: string) {
  const normalized = userInput.toLowerCase();
  const match = demoData.faqs.find((faq) => faq.keywords.some((keyword) => normalized.includes(keyword)));

  if (match) {
    return match.answer;
  }

  if (normalized.includes('quote') || normalized.includes('proposal')) {
    return demoData.quoteTemplate;
  }

  return "Thanks for your note! Share your event type, date, guest count, and any preferences so I can pass it to our human advisor.";
}
