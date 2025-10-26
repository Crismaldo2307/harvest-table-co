"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import knowledgeBase from "@/data/agent-knowledge.json";

interface ChatMessage {
  sender: "user" | "agent";
  content: string;
}

const initialMessages: ChatMessage[] = [
  {
    sender: "agent",
    content:
      "Hola, soy el asistente virtual de Cristian & Alonso Data. Pregunta por tendencias de renta, presión turística o cómo podemos ayudarte con datos."
  }
];

const keywords = {
  rent: ["renta", "alquiler", "precio"],
  tourism: ["turismo", "visitantes", "pernoctaciones"],
  commerce: ["comercio", "negocios", "retail"],
  district: ["distrito", "barrio", "zona"],
  contact: ["contacto", "correo", "email"],
  sources: ["fuente", "metodología", "datos"],
  services: ["servicio", "consultoría", "ayuda"],
  correlation: ["correlación", "relación", "impacto"]
};

function includesKeyword(message: string, group: keyof typeof keywords) {
  const tokens = keywords[group];
  return tokens.some((token) => message.includes(token));
}

function pickHighlight() {
  return knowledgeBase.highlights[Math.floor(Math.random() * knowledgeBase.highlights.length)];
}

function generateAgentResponse(input: string): string {
  const lower = input.toLowerCase();

  if (includesKeyword(lower, "rent")) {
    return "Entre 2015 y 2024 la renta media mensual pasó de 696 € a 1.139 €. El tramo 2022-2024 concentra el mayor repunte, acompañado por el regreso del turismo internacional.";
  }

  if (includesKeyword(lower, "tourism")) {
    return "Registramos 22,7 millones de pernoctaciones en 2024 y un coeficiente de correlación de 0,87 respecto a la renta media. Las viviendas turísticas suponen el 41 % del mix.";
  }

  if (includesKeyword(lower, "commerce")) {
    return "El índice de facturación comercial ha subido 18 puntos desde 2015. Ejes como Passeig de Gràcia y Poblenou son polos donde el alquiler supera los 1.050 € mensuales.";
  }

  if (includesKeyword(lower, "district")) {
    return "Ciutat Vella y l'Eixample concentran 13.865 viviendas turísticas registradas, con rentas medias de 1.214 € y 1.126 € respectivamente. Nou Barris se mantiene como zona accesible con 817 €.";
  }

  if (includesKeyword(lower, "correlation")) {
    return "Calculamos correlaciones con datos oficiales: turismo vs. renta = 0,87; comercio vs. renta = 0,81; empleo vs. renta = 0,76. Esto respalda la hipótesis de presión multifactorial.";
  }

  if (includesKeyword(lower, "sources")) {
    return "La base integra la Agència de l'Habitatge de Catalunya, padrones municipales, Turismo de Barcelona y BigQuery. Puedes revisar la metodología completa en la sección 'Metodología'.";
  }

  if (includesKeyword(lower, "services")) {
    return "Ofrecemos análisis por distrito, escenarios de rentabilidad y dashboards en Looker Studio. Cuéntame qué necesitas y derivaré la consulta a nuestro equipo.";
  }

  if (includesKeyword(lower, "contact")) {
    return "Puedes escribirnos a cmaldonadoa@student.eae.es o completar el formulario al final de la página para coordinar una reunión.";
  }

  const match = knowledgeBase.faq.find((item) => lower.includes(item.question.split(" ")[0]));
  if (match) {
    return match.answer;
  }

  return `${pickHighlight()} ¿Quieres profundizar en algún distrito o comparar escenarios con turismo y comercio?`;
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
        <span>{isOpen ? "Ocultar" : "Chat"}</span>
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
                <p className="text-sm font-semibold text-brand-dark">Asistente Barcelona Rent Pulse</p>
                <p className="text-xs text-brand-dark/60">Respuestas basadas en datasets auditables</p>
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
                  <div className="rounded-2xl bg-brand-gold/15 px-4 py-2 text-sm text-brand-dark/70">Analizando datos…</div>
                </div>
              ) : null}
            </div>
            <div className="mt-3 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Pregúntame por turismo o comercio"
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
