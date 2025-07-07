import { useState, useEffect, useRef, useCallback } from "react";
import { Star } from "lucide-react";
import { testimonios } from "./data";

export default function Testimonials() {
  const [groupIndex, setGroupIndex] = useState(0);
  const groupSize = 3;
  const totalGroups = Math.ceil(testimonios.length / groupSize);
  const intervalRef = useRef(null);
  const resumeTimeoutRef = useRef(null);
  const sectionRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [showBackground, setShowBackground] = useState(false);

  const handleInteraction = (index) => {
    setGroupIndex(index);
    setIsPaused(true);
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 15000);
  };

  const nextGroup = useCallback(() => {
    setGroupIndex((prev) => (prev + 1) % totalGroups);
  }, [totalGroups]);

  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = setInterval(nextGroup, 6000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isPaused, nextGroup]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowBackground(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="reseñas"
      aria-label="Testimonios de clientes"
      className={`min-h-screen flex items-center justify-center px-4 sm:px-6 py-12 transition-colors duration-1000 ${
        showBackground
          ? "bg-[url('/images/palace2.webp')] bg-cover bg-center bg-no-repeat bg-fixed"
          : "bg-black"
      }`}
    >
      <article
        role="region"
        aria-labelledby="testimonials-heading"
        className="max-w-6xl w-full px-4 sm:px-10 py-10 rounded-3xl bg-black/30 backdrop-blur-md shadow-xl border border-white/20"
      >
        <h2
          id="testimonials-heading"
          className="text-white text-4xl sm:text-5xl font-bold mb-4 text-center"
        >
          Lo que dicen nuestros clientes
        </h2>
        <p className="text-center text-white/80 text-base max-w-2xl mx-auto mb-10">
          Cada testimonio refleja la experiencia real de quienes confiaron en
          nosotros. Gracias por ser parte de este camino.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {testimonios
            .slice(groupIndex * groupSize, groupIndex * groupSize + groupSize)
            .map((t) => (
              <div
                key={t.id}
                className="relative bg-black/10 p-6 rounded-xl border border-white/40 text-white min-h-[130px]"
              >
                <div className="absolute top-3 left-4 flex items-center gap-2 text-white text-xs sm:text-sm">
                  <span>{t.servicio}</span>
                  <div className="flex gap-1" aria-hidden="true">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < t.calificacion
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-white/30"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm sm:text-base italic mb-6 mt-6">
                  "{t.texto}"
                </p>
                <p className="absolute bottom-3 left-4 text-xs text-white/70">
                  {t.fecha}
                </p>
                <p className="absolute bottom-3 right-4 font-semibold text-sm">{`— ${t.nombre}`}</p>
              </div>
            ))}
        </div>

        <div
          className="flex justify-center mt-8 gap-2"
          role="tablist"
          aria-label="Navegación de testimonios"
        >
          {Array.from({ length: totalGroups }).map((_, i) => (
            <button
              key={i}
              onClick={() => handleInteraction(i)}
              aria-label={`Mostrar grupo de testimonios ${i + 1}`}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                groupIndex === i
                  ? "bg-white w-6"
                  : "bg-white/40 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
      </article>
    </section>
  );
}
