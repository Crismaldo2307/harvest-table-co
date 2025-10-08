'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

const eventTypes = ['Corporate Event', 'Wedding', 'Private Celebration', 'Box Lunch / Coffee Break'];

type FormState = {
  status: 'idle' | 'loading' | 'success' | 'error';
  message: string;
};

export function QuoteForm() {
  const [formState, setFormState] = useState<FormState>({ status: 'idle', message: '' });

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    setFormState({ status: 'loading', message: 'Sending your request...' });

    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Unable to submit the quote request.');
      }

      setFormState({ status: 'success', message: 'Thank you! Our team will reach out shortly.' });
      event.currentTarget.reset();
    } catch (error) {
      console.error(error);
      setFormState({
        status: 'error',
        message: 'We could not process your request. Please try again or email concierge@harvesttableco.com.',
      });
    }
  }

  return (
    <section id="quote" className="bg-white py-24">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6 md:flex-row">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex-1 space-y-6"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-brand-gold">Request a Tailored Proposal</p>
          <h2 className="text-3xl font-semibold text-brand-dark md:text-4xl">
            Share your vision and we will curate the perfect menu
          </h2>
          <p className="text-brand-dark/70">
            Our smart planning engine syncs menus, logistics, and staffing in real-time. Tell us about your event and our
            concierge team will respond within one business day.
          </p>
          <div className="rounded-3xl border border-brand-gold/30 bg-brand-cream p-6 text-sm text-brand-dark/70">
            <p className="font-semibold text-brand-dark">What happens next?</p>
            <ul className="mt-3 space-y-2 list-disc pl-5">
              <li>We confirm availability and refine your menu within 24 hours.</li>
              <li>Receive a personalized proposal with pricing per guest.</li>
              <li>Track event milestones and updates through our digital client portal.</li>
            </ul>
          </div>
        </motion.div>
        <motion.form
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex-1 space-y-6 rounded-3xl border border-brand-gold/30 bg-brand-cream p-8 shadow-xl"
          onSubmit={handleSubmit}
        >
          <div className="grid gap-6 md:grid-cols-2">
            <label className="text-sm font-medium text-brand-dark">
              Full name
              <input
                name="name"
                required
                className="mt-2 w-full rounded-xl border border-brand-gold/40 bg-white px-4 py-3 text-brand-dark focus:border-brand-gold focus:outline-none"
                placeholder="Jordan Smith"
              />
            </label>
            <label className="text-sm font-medium text-brand-dark">
              Email
              <input
                name="email"
                type="email"
                required
                className="mt-2 w-full rounded-xl border border-brand-gold/40 bg-white px-4 py-3 text-brand-dark focus:border-brand-gold focus:outline-none"
                placeholder="hello@company.com"
              />
            </label>
            <label className="text-sm font-medium text-brand-dark">
              Event type
              <select
                name="eventType"
                required
                className="mt-2 w-full rounded-xl border border-brand-gold/40 bg-white px-4 py-3 text-brand-dark focus:border-brand-gold focus:outline-none"
                defaultValue=""
              >
                <option value="" disabled>
                  Select an event type
                </option>
                {eventTypes.map((eventType) => (
                  <option key={eventType} value={eventType}>
                    {eventType}
                  </option>
                ))}
              </select>
            </label>
            <label className="text-sm font-medium text-brand-dark">
              Event date
              <input
                name="eventDate"
                type="date"
                required
                className="mt-2 w-full rounded-xl border border-brand-gold/40 bg-white px-4 py-3 text-brand-dark focus:border-brand-gold focus:outline-none"
              />
            </label>
            <label className="text-sm font-medium text-brand-dark">
              Number of guests
              <input
                name="guestCount"
                type="number"
                min={1}
                required
                className="mt-2 w-full rounded-xl border border-brand-gold/40 bg-white px-4 py-3 text-brand-dark focus:border-brand-gold focus:outline-none"
                placeholder="150"
              />
            </label>
          </div>
          <label className="text-sm font-medium text-brand-dark">
            Event details
            <textarea
              name="message"
              rows={4}
              className="mt-2 w-full rounded-xl border border-brand-gold/40 bg-white px-4 py-3 text-brand-dark focus:border-brand-gold focus:outline-none"
              placeholder="Tell us about your menu preferences, venue, and special requests."
            />
          </label>
          <button
            type="submit"
            disabled={formState.status === 'loading'}
            className="w-full rounded-full bg-brand-green px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-lg transition-colors hover:bg-brand-gold disabled:cursor-not-allowed disabled:bg-brand-green/70"
          >
            {formState.status === 'loading' ? 'Sending...' : 'Submit Request'}
          </button>
          {formState.status !== 'idle' && (
            <p
              className={`text-sm font-medium ${
                formState.status === 'success' ? 'text-brand-green' : 'text-red-600'
              }`}
            >
              {formState.message}
            </p>
          )}
        </motion.form>
      </div>
    </section>
  );
}
