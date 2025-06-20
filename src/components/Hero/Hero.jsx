import { useState, useEffect, useRef, useCallback } from "react";
import HeroTabs from "./HeroTabs";
import { Helmet } from "react-helmet-async";

const tabs = [
  { id: "inicio", label: "Inicio" },
  { id: "reservar", label: "Reservar" },
  { id: "pagos", label: "Pagos" },
  { id: "beneficios", label: "Beneficios" },
];

export default function Hero() {
  const [activeTab, setActiveTab] = useState("inicio");
  const [isPaused, setIsPaused] = useState(false);
  const [showBackground, setShowBackground] = useState(false);
  const sectionRef = useRef(null);

  const lastInteractionRef = useRef(Date.now());
  const intervalRef = useRef(null);
  const resumeTimeoutRef = useRef(null);

  const nextTab = useCallback((currentTab) => {
    const currentIndex = tabs.findIndex((tab) => tab.id === currentTab);
    const nextIndex = (currentIndex + 1) % tabs.length;
    return tabs[nextIndex].id;
  }, []);

  const handleInteraction = (tabId) => {
    setActiveTab(tabId);
    setIsPaused(true);
    lastInteractionRef.current = Date.now();

    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
    }

    resumeTimeoutRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 15000);
  };

  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = setInterval(() => {
        setActiveTab((prev) => nextTab(prev));
      }, 6000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isPaused, nextTab]);

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
      id="inicio"
      className={`h-screen flex items-center justify-center px-4 sm:px-6 transition-colors duration-1000 ${
        showBackground
          ? "bg-[url('/hero-bg.webp')] bg-cover bg-center bg-no-repeat bg-fixed"
          : "bg-black"
      }`}
      aria-label="Sección principal de bienvenida"
    >
      <Helmet>
        <title>HM Mobility | Viajes Privados y Traslados en CDMX</title>
        <meta
          name="description"
          content="Reserva traslados cómodos, puntuales y pet friendly con HM Mobility en CDMX y más allá."
        />
      </Helmet>

      <div className="max-w-lg w-full px-6 sm:px-10 py-8 rounded-3xl bg-black/30 backdrop-blur-md shadow-xl border border-white/20">
        <div className="min-h-[450px] flex flex-col items-center justify-center text-center space-y-6">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
              Viaja cómodo, seguro y a tiempo
            </h1>
            <p className="text-white/90 text-sm sm:text-base max-w-sm mx-auto">
              Servicios privados, traslados al aeropuerto, viajes pet friendly y más.
            </p>
          </div>

          <div className="w-full transition-all duration-300 ease-out">
            <HeroTabs activeTab={activeTab} onTabChange={handleInteraction} />
          </div>
        </div>

        <div className="flex justify-center mt-6 gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleInteraction(tab.id)}
              aria-label={`Ir a ${tab.label}`}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                activeTab === tab.id
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