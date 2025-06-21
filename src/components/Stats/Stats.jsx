import { useEffect, useRef, useState, lazy, Suspense } from "react";
import { Helmet } from "react-helmet-async";

const StatsGrid = lazy(() => import("./StatsGrid")); // nuevo componente separado

export default function Stats() {
  const sectionRef = useRef(null);
  const [showBackground, setShowBackground] = useState(false);
  const [showStats, setShowStats] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowBackground(true);
          setShowStats(true); // solo cuando está visible se monta el componente
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
      id="experiencia"
      aria-labelledby="stats-title"
      className={`min-h-screen flex items-center justify-center px-4 sm:px-6 py-16 transition-colors duration-1000 ${
        showBackground
          ? "bg-[url('/mexico.webp')] bg-cover bg-center bg-no-repeat bg-fixed"
          : "bg-black"
      }`}
    >
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "HM Mobility",
            "url": "https://tusitio.com",
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.97",
              "reviewCount": "26100",
            },
            "foundingDate": "2015",
            "areaServed": {
              "@type": "Place",
              "name": "CDMX y alrededores",
            },
            "description":
              "Empresa de transporte privado con 9 años de experiencia, más de 29,000 viajes completados y una tasa de puntualidad del 99%.",
          })}
        </script>
      </Helmet>

      {showStats && (
        <Suspense fallback={<p className="text-white text-center">Cargando estadísticas...</p>}>
          <StatsGrid />
        </Suspense>
      )}
    </section>
  );
}