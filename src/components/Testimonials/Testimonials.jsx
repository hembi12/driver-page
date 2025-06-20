// src/components/testimonials/Testimonials.jsx
import { useState, useEffect, useRef, useCallback } from "react";
import { Star } from "lucide-react";
import { testimonios } from "./data";

export default function Testimonials() {
  const [groupIndex, setGroupIndex] = useState(0);
  const groupSize = 3;
  const totalGroups = Math.ceil(testimonios.length / groupSize);
  const intervalRef = useRef(null);
  const resumeTimeoutRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

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

  const grupoActual = testimonios.slice(
    groupIndex * groupSize,
    groupIndex * groupSize + groupSize
  );

  return (
    <section
      id="reseñas"
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 bg-[url('/palace2.jpg')] bg-cover bg-center bg-no-repeat bg-fixed py-12"
    >
      <div className="max-w-6xl w-full px-4 sm:px-10 py-10 rounded-3xl bg-black/30 backdrop-blur-md shadow-xl border border-white/20">
        <h2 className="text-white text-2xl sm:text-3xl font-bold mb-10 text-center">
          Lo que dicen nuestros clientes
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {grupoActual.map((t) => (
            <div
              key={t.id}
              className="relative bg-black/10 p-6 rounded-xl border border-white/40 text-white min-h-[130px]"
            >
              <div className="absolute top-3 left-4 flex gap-1">
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

              <p className="text-sm sm:text-base italic mb-6 mt-6">"{t.texto}"</p>
              <p className="absolute bottom-3 left-4 text-xs text-white/70">{t.fecha}</p>
              <p className="absolute bottom-3 right-4 font-semibold text-sm">{`— ${t.nombre}`}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-8 gap-2">
          {Array.from({ length: totalGroups }).map((_, i) => (
            <button
              key={i}
              onClick={() => handleInteraction(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                groupIndex === i
                  ? "bg-white w-6"
                  : "bg-white/40 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}