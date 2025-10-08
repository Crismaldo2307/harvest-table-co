"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import demoData from "@/data/demo-data.json";

interface ChatMessage {
  sender: "user" | "agent";
  content: string;
}

const initialMessages: ChatMessage[] = [
  {
    sender: "agent",
    content:
      "Hi! I'm the Harvest Table virtual sales agent. Ask about services, pricing, or request a quick quote summary."
  }
];

function generateAgentResponse(input: string): string {
  const lower = input.toLowerCase();

  if (lower.includes("price") || lower.includes("cost") || lower.includes("pricing")) {
    return "Our menus start around $45 per guest for corporate menus and $60 per guest for private celebrations. Share your guest count for a tailored outline.";
  }

  if (lower.includes("event") && lower.includes("type")) {
    return "We support corporate conferences, executive meetings, weddings, private dinners, and elevated coffee breaks.";
  }

  if (lower.includes("quote") || lower.includes("proposal") || lower.includes("estimate")) {
    return "Happy to help! Please provide your name, event type, event date, and estimated guest count so our team can follow up with a detailed proposal.";
  }

  if (lower.includes("where") || lower.includes("location") || lower.includes("area") || lower.includes("city")) {
    return "We are based in the city center and serve surrounding metropolitan areas within a 90-minute radius.";
  }

  if (lower.includes("how long") || lower.includes("response")) {
    return "Our human specialists respond within one business day with curated menus and logistics insights.";
  }

  if (lower.includes("summary")) {
    return demoData.sampleQuote;
  }

  const fallback = demoData.faq.find((item) => lower.includes(item.question.toLowerCase().split(" ")[0]));
  if (fallback) {
    return fallback.answer;
  }

  return "Great question! I can share service options, sample pricing, or capture details for a quote—just let me know what you need.";
}

export function ChatAgent() {
  const [isOpen, setIsOpen] = useState(true);
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage: ChatMessage = { sender: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsSending(true);

    try {
      // Placeholder for future API integration
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 3000);
      const response = await fetch("/api/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage.content }),
        signal: controller.signal
      });
      clearTimeout(timeout);

      if (response.ok) {
        const data = await response.json();
        if (data?.reply) {
          setMessages((prev) => [...prev, { sender: "agent", content: data.reply as string }]);
          setIsSending(false);
          return;
        }
      }
    } catch (error) {
      console.warn("Agent API not connected yet", error);
    }

    const simulatedReply = generateAgentResponse(userMessage.content);
    setMessages((prev) => [...prev, { sender: "agent", content: simulatedReply }]);
    setIsSending(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2 rounded-full bg-brand-green px-4 py-3 text-sm font-semibold text-white shadow-lg hover:bg-brand-gold"
      >
        <span>{isOpen ? "Hide" : "Chat"}</span>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3h5.25M12 21a9 9 0 100-18 9 9 0 000 18z" />
        </svg>
      </button>
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
            className="w-80 rounded-3xl border border-brand-gold/40 bg-white p-4 shadow-2xl"
          >
            <div className="mb-3 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-brand-dark">Virtual Sales Agent</p>
                <p className="text-xs text-brand-dark/60">Powered by upcoming AI integration</p>
              </div>
              <span className="h-2 w-2 rounded-full bg-emerald-500" aria-label="Online status" />
            </div>
            <div className="max-h-72 space-y-3 overflow-y-auto pr-2">
              {messages.map((message, index) => (
                <div key={`${message.sender}-${index}`} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`rounded-2xl px-4 py-2 text-sm shadow-sm ${
                      message.sender === "user"
                        ? "bg-brand-green text-white"
                        : "bg-brand-gold/15 text-brand-dark"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              {isSending ? (
                <div className="flex justify-start">
                  <div className="rounded-2xl bg-brand-gold/15 px-4 py-2 text-sm text-brand-dark/70">Typing…</div>
                </div>
              ) : null}
            </div>
            <div className="mt-3 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Ask about services or pricing"
                className="flex-1 rounded-full border border-brand-green/30 px-3 py-2 text-sm focus:border-brand-gold focus:outline-none focus:ring-2 focus:ring-brand-gold/30"
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault();
                    sendMessage();
                  }
                }}
              />
              <button
                type="button"
                onClick={sendMessage}
                disabled={isSending}
                className="rounded-full bg-brand-green p-2 text-white shadow hover:bg-brand-gold disabled:cursor-not-allowed disabled:bg-brand-green/40"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3 3l18 9-18 9 3-9h12" />
                </svg>
              </button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
