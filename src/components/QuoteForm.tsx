"use client";

import { ChangeEvent, FormEvent, useMemo, useState } from "react";
import { motion } from "framer-motion";

interface ContactFormData {
  name: string;
  company: string;
  email: string;
  topic: string;
  message: string;
}

const initialData: ContactFormData = {
  name: "",
  company: "",
  email: "",
  topic: "",
  message: ""
};

export function QuoteForm() {
  const [formData, setFormData] = useState<ContactFormData>(initialData);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const topics = useMemo(
    () => [
      "Inversión o colaboración",
      "Análisis personalizado por distrito",
      "Solicitud de datasets",
      "Prensa y medios",
      "Otro"
    ],
    []
  );

  const handleChange = (field: keyof ContactFormData) => (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [field]: event.target.value }));
    setStatus("idle");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      setStatus("error");
      return;
    }

    const subject = encodeURIComponent(`Contacto Barcelona Rent Pulse - ${formData.topic || "Consulta"}`);
    const bodyLines = [
      `Nombre: ${formData.name}`,
      `Empresa / organización: ${formData.company || "No especificado"}`,
      `Correo: ${formData.email}`,
      `Interés: ${formData.topic || "Consulta"}`,
      "", // blank line
      formData.message
    ];
    const body = encodeURIComponent(bodyLines.join("\n"));

    window.location.href = `mailto:cmaldonadoa@student.eae.es?subject=${subject}&body=${body}`;
    setStatus("success");
    setFormData(initialData);
  };

  return (
    <section id="contacto" className="bg-white py-20">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-2">
        <div className="space-y-6">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            className="text-3xl font-bold text-brand-dark"
          >
            Conversemos con datos en la mesa
          </motion.h2>
          <p className="text-brand-dark/70">
            Si lideras proyectos inmobiliarios, turísticos o comerciales en Barcelona, podemos ayudarte a anticipar zonas de riesgo, diseñar escenarios y trazar políticas de mitigación del impacto sobre la vivienda.
          </p>
          <div className="rounded-3xl border border-brand-green/20 bg-brand-green/5 p-6" id="contact">
            <h3 className="text-lg font-semibold text-brand-green">Contacto directo</h3>
            <p className="mt-2 text-sm text-brand-dark/70">
              Escríbenos a
              <a href="mailto:cmaldonadoa@student.eae.es" className="ml-1 font-medium text-brand-green">
                cmaldonadoa@student.eae.es
              </a>
              . Respondemos en menos de 48 horas laborables.
            </p>
            <p className="mt-4 text-sm text-brand-dark/70">
              También podemos agendar una sesión exploratoria para revisar tu cartera de activos o tu estrategia de expansión.
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
              Nombre completo
            </label>
            <input
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange("name")}
              className="mt-2 w-full rounded-xl border border-brand-green/20 bg-white px-4 py-2 text-sm focus:border-brand-gold focus:outline-none focus:ring-2 focus:ring-brand-gold/30"
              placeholder="Cristian Maldonado"
              autoComplete="name"
            />
          </div>
          <div>
            <label htmlFor="company" className="text-sm font-medium text-brand-dark">
              Empresa u organización
            </label>
            <input
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange("company")}
              className="mt-2 w-full rounded-xl border border-brand-green/20 bg-white px-4 py-2 text-sm focus:border-brand-gold focus:outline-none focus:ring-2 focus:ring-brand-gold/30"
              placeholder="Cristian & Alonso Data"
            />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label htmlFor="email" className="text-sm font-medium text-brand-dark">
                Correo electrónico
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange("email")}
                className="mt-2 w-full rounded-xl border border-brand-green/20 bg-white px-4 py-2 text-sm focus:border-brand-gold focus:outline-none focus:ring-2 focus:ring-brand-gold/30"
                placeholder="persona@empresa.com"
                autoComplete="email"
              />
            </div>
            <div>
              <label htmlFor="topic" className="text-sm font-medium text-brand-dark">
                Tema de interés
              </label>
              <select
                id="topic"
                name="topic"
                value={formData.topic}
                onChange={handleChange("topic")}
                className="mt-2 w-full rounded-xl border border-brand-green/20 bg-white px-4 py-2 text-sm focus:border-brand-gold focus:outline-none focus:ring-2 focus:ring-brand-gold/30"
              >
                <option value="">Selecciona una opción</option>
                {topics.map((topic) => (
                  <option key={topic} value={topic}>
                    {topic}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label htmlFor="message" className="text-sm font-medium text-brand-dark">
              Cuéntanos qué necesitas
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              required
              value={formData.message}
              onChange={handleChange("message")}
              className="mt-2 w-full rounded-xl border border-brand-green/20 bg-white px-4 py-2 text-sm focus:border-brand-gold focus:outline-none focus:ring-2 focus:ring-brand-gold/30"
              placeholder="Describe el reto, la zona de estudio o las preguntas que te gustaría responder."
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-full bg-brand-green px-4 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow hover:bg-brand-gold"
          >
            Enviar información
          </button>
          {status === "success" ? (
            <p className="text-sm text-brand-green">Abriremos tu gestor de correo para enviar la información.</p>
          ) : null}
          {status === "error" ? (
            <p className="text-sm text-red-600">Revisa que hayas completado nombre, correo y mensaje.</p>
          ) : null}
        </motion.form>
      </div>
    </section>
  );
}
