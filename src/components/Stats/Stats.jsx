import { useEffect, useRef, useState, lazy, Suspense } from "react";

const StatsGrid = lazy(() => import("./StatsGrid")); // carga diferida

export default function Stats() {
  const sectionRef = useRef(null);
  const [showBackground, setShowBackground] = useState(false);
  const [showStats, setShowStats] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowBackground(true);
          setShowStats(true);
          if (sectionRef.current) observer.unobserve(sectionRef.current);
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
      id="experiencia"
      aria-labelledby="stats-title"
      className={`min-h-screen flex items-center justify-center px-4 sm:px-6 py-16 transition-colors duration-1000 ${
        showBackground
          ? "bg-[url('images/mexico.webp')] bg-cover bg-center bg-no-repeat bg-scroll md:bg-fixed"
          : "bg-black"
      }`}
    >
      {showStats && (
        <Suspense
          fallback={
            <p className="text-white text-center" role="status" aria-live="polite">
              Cargando estadísticas...
            </p>
          }
        >
          <StatsGrid />
        </Suspense>
      )}
    </section>
  );
}