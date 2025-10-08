"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { motion } from "framer-motion";

interface QuoteFormData {
  name: string;
  email: string;
  eventType: string;
  eventDate: string;
  guests: string;
  message: string;
}

const initialData: QuoteFormData = {
  name: "",
  email: "",
  eventType: "",
  eventDate: "",
  guests: "",
  message: ""
};

export function QuoteForm() {
  const [formData, setFormData] = useState<QuoteFormData>(initialData);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleChange = (field: keyof QuoteFormData) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => ({}));
        throw new Error(payload?.message ?? "Unable to submit quote request.");
      }

      setStatus("success");
      setFormData(initialData);
    } catch (error) {
      console.error(error);
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong.");
      setStatus("error");
    }
  };

  return (
    <section id="quote" className="bg-white py-20">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-2">
        <div className="space-y-6">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            className="text-3xl font-bold text-brand-dark"
          >
            Request a Tailored Proposal
          </motion.h2>
          <p className="text-brand-dark/70">
            Share a few details and our team will respond within one business day with menu ideas, pricing guidance, and a personalized consultation.
          </p>
          <div className="rounded-3xl border border-brand-green/20 bg-brand-green/5 p-6" id="contact">
            <h3 className="text-lg font-semibold text-brand-green">Direct Contact</h3>
            <p className="mt-2 text-sm text-brand-dark/70">
              Prefer a conversation? Reach us at
              <a href="mailto:hello@harvesttableco.com" className="ml-1 font-medium text-brand-green">
                hello@harvesttableco.com
              </a>
              or call <span className="font-medium">+1 (555) 123-4567</span>.
            </p>
            <p className="mt-4 text-sm text-brand-dark/70">
              Service area: Downtown core and metropolitan surroundings within a 90-minute radius.
            </p>
          </div>
        </div>
        <motion.form
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          onSubmit={handleSubmit}
          className="space-y-4 rounded-3xl border border-brand-gold/30 bg-white/80 p-6 shadow-lg"
        >
          <div>
            <label htmlFor="name" className="text-sm font-medium text-brand-dark">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange("name")}
              className="mt-2 w-full rounded-xl border border-brand-green/20 bg-white px-4 py-2 text-sm focus:border-brand-gold focus:outline-none focus:ring-2 focus:ring-brand-gold/30"
              placeholder="Alex Morgan"
              autoComplete="name"
            />
          </div>
          <div>
            <label htmlFor="email" className="text-sm font-medium text-brand-dark">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange("email")}
              className="mt-2 w-full rounded-xl border border-brand-green/20 bg-white px-4 py-2 text-sm focus:border-brand-gold focus:outline-none focus:ring-2 focus:ring-brand-gold/30"
              placeholder="you@company.com"
              autoComplete="email"
            />
          </div>
          <div>
            <label htmlFor="eventType" className="text-sm font-medium text-brand-dark">
              Event Type
            </label>
            <input
              id="eventType"
              name="eventType"
              required
              value={formData.eventType}
              onChange={handleChange("eventType")}
              className="mt-2 w-full rounded-xl border border-brand-green/20 bg-white px-4 py-2 text-sm focus:border-brand-gold focus:outline-none focus:ring-2 focus:ring-brand-gold/30"
              placeholder="Executive Summit"
            />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label htmlFor="eventDate" className="text-sm font-medium text-brand-dark">
                Event Date
              </label>
              <input
                id="eventDate"
                name="eventDate"
                type="date"
                required
                value={formData.eventDate}
                onChange={handleChange("eventDate")}
                className="mt-2 w-full rounded-xl border border-brand-green/20 bg-white px-4 py-2 text-sm focus:border-brand-gold focus:outline-none focus:ring-2 focus:ring-brand-gold/30"
              />
            </div>
            <div>
              <label htmlFor="guests" className="text-sm font-medium text-brand-dark">
                Number of Guests
              </label>
              <input
                id="guests"
                name="guests"
                required
                value={formData.guests}
                onChange={handleChange("guests")}
                className="mt-2 w-full rounded-xl border border-brand-green/20 bg-white px-4 py-2 text-sm focus:border-brand-gold focus:outline-none focus:ring-2 focus:ring-brand-gold/30"
                placeholder="150"
              />
            </div>
          </div>
          <div>
            <label htmlFor="message" className="text-sm font-medium text-brand-dark">
              Additional Notes
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange("message")}
              className="mt-2 w-full rounded-xl border border-brand-green/20 bg-white px-4 py-2 text-sm focus:border-brand-gold focus:outline-none focus:ring-2 focus:ring-brand-gold/30"
              placeholder="Menu preferences, dietary restrictions, service style, etc."
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-full bg-brand-green px-4 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow hover:bg-brand-gold disabled:cursor-not-allowed disabled:bg-brand-green/40"
            disabled={status === "loading"}
          >
            {status === "loading" ? "Submitting..." : "Submit Request"}
          </button>
          {status === "success" ? (
            <p className="text-sm text-brand-green">Thank you! Our team will reach out shortly.</p>
          ) : null}
          {status === "error" ? (
            <p className="text-sm text-red-600">{errorMessage}</p>
          ) : null}
        </motion.form>
      </div>
    </section>
  );
}
