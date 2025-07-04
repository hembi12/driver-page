import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "¿Cómo puedo solicitar una cotización?",
    answer:
      "Completa el formulario en la página de inicio con los detalles de tu viaje. En pocos minutos recibirás respuesta.",
  },
  {
    question: "¿Ofrecen traslados al aeropuerto?",
    answer:
      "Sí, contamos con traslados desde y hacia cualquier aeropuerto de CDMX y alrededores.",
  },
  {
    question: "¿Puedo viajar con mi mascota?",
    answer:
      "¡Claro! Tenemos opción de viajes pet friendly para que tu mascota viaje contigo con seguridad.",
  },
  {
    question: "¿Qué métodos de pago aceptan?",
    answer:
      "Aceptamos efectivo, tarjetas de débito/crédito, transferencia bancaria y MercadoPago.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleIndex = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="preguntas-frecuentes" // ✅ coincide con el enlace del Navbar
      aria-labelledby="faq-title"
      className="py-20 px-4 bg-white text-gray-800 border-t border-gray-200"
    >
      <div className="max-w-6xl mx-auto px-4 text-center mb-4">
        <h2
          id="faq-title"
          className="text-4xl sm:text-5xl font-bold text-neutral-900 mb-4"
        >
          Preguntas Frecuentes
        </h2>
        <p className="text-lg text-gray-600">
          Encuentra respuestas rápidas sobre nuestros servicios y atención
        </p>
      </div>

      <div className="max-w-2xl mx-auto divide-y divide-gray-300">
        {faqs.map((faq, index) => (
          <article key={index} className="py-6" aria-labelledby={`faq-${index}`}>
            <button
              type="button"
              aria-expanded={openIndex === index}
              aria-controls={`faq-body-${index}`}
              onClick={() => toggleIndex(index)}
              className="w-full flex justify-between items-center text-left font-semibold text-gray-900 hover:text-blue-600 transition"
            >
              <span id={`faq-${index}`}>{faq.question}</span>
              {openIndex === index ? (
                <Minus className="w-5 h-5 shrink-0" />
              ) : (
                <Plus className="w-5 h-5 shrink-0" />
              )}
            </button>
            {openIndex === index && (
              <div
                id={`faq-body-${index}`}
                className="mt-3 text-gray-600 text-sm"
              >
                {faq.answer}
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}